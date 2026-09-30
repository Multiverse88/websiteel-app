"""
Content, SEO, and commercial signal extractor for competitor websites.
Parses HTML without external non-standard dependencies.
Works with Scrapy Selector / Response and plain HTML strings.
"""

from __future__ import annotations

import hashlib
import json
import re
from html import unescape
from html.parser import HTMLParser
from typing import Any
from urllib.parse import urljoin

# Indonesian currency regex patterns:
# e.g. Rp 5.000.000, Rp. 2,500,000, IDR 750.000, Rp500rb, Rp 15 Juta, Rp 1,5jt
_PRICE_REGEX = re.compile(
    r"(?:(?:Rp\.?|IDR)\s*[\d\.,]+(?:\s*(?:juta|jt|ribu|rb|miliar|m|k))?|"
    r"[\d\.,]+\s*(?:juta|jt|ribu|rb)\s*rupiah)",
    re.IGNORECASE,
)

# Call-to-action keywords for Indonesian legal/business services
_CTA_KEYWORDS = re.compile(
    r"\b(?:konsultasi|hubungi|whatsapp|wa|pesan|daftar|order|beli|tanya|mulai|kontak|jadwalkan|ajukan|ambil|chat)\b",
    re.IGNORECASE,
)

# Service keywords in paths
_SERVICE_PATH_REGEX = re.compile(
    r"/(?:layanan|service|services|paket|produk|product|pricing|biaya|tarif|pendirian|izin|haki|merek|iso)/",
    re.IGNORECASE,
)

# Article keywords in paths
_ARTICLE_PATH_REGEX = re.compile(
    r"/(?:artikel|article|blog|news|berita|post|posts|wawasan|edukasi)/",
    re.IGNORECASE,
)

# Tags to completely drop during main text extraction
_DROP_TAGS = {
    "script",
    "style",
    "noscript",
    "header",
    "footer",
    "nav",
    "form",
    "svg",
    "button",
    "iframe",
    "select",
    "option",
}


class _TextExtractor(HTMLParser):
    """Clean HTML parser that drops boilerplate tags and normalizes whitespace."""

    def __init__(self) -> None:
        super().__init__()
        self._drop_depth = 0
        self._text_chunks: list[str] = []
        self._in_title = False
        self._title_chunks: list[str] = []
        self._in_h1 = False
        self._h1_chunks: list[str] = []
        self.headings: list[dict[str, Any]] = []
        self._current_heading_tag: str | None = None
        self._current_heading_chunks: list[str] = []
        self.canonical: str | None = None
        self.meta_description: str | None = None
        self.meta_keywords: str | None = None
        self.ctas: list[dict[str, str]] = []
        self._current_anchor_href: str | None = None
        self._current_anchor_chunks: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag_lower = tag.lower()
        attr_dict = {k.lower(): (v or "") for k, v in attrs}

        if tag_lower in _DROP_TAGS:
            self._drop_depth += 1
            return

        if self._drop_depth > 0:
            return

        if tag_lower == "title":
            self._in_title = True
        elif tag_lower == "h1":
            self._in_h1 = True
            self._current_heading_tag = "h1"
            self._current_heading_chunks = []
        elif tag_lower in ("h2", "h3"):
            self._current_heading_tag = tag_lower
            self._current_heading_chunks = []
        elif tag_lower == "link" and attr_dict.get("rel") == "canonical":
            self.canonical = attr_dict.get("href")
        elif tag_lower == "meta":
            name = attr_dict.get("name", "").lower()
            prop = attr_dict.get("property", "").lower()
            if (name == "description" or prop == "og:description") and not self.meta_description:
                self.meta_description = attr_dict.get("content")
            elif (name in ("keywords", "news_keywords") or prop == "keywords") and not self.meta_keywords:
                self.meta_keywords = attr_dict.get("content")
        elif tag_lower == "a":
            href = attr_dict.get("href")
            if href and not href.startswith(("#", "javascript:", "mailto:", "tel:")):
                self._current_anchor_href = href
                self._current_anchor_chunks = []

    def handle_endtag(self, tag: str) -> None:
        tag_lower = tag.lower()

        if tag_lower in _DROP_TAGS:
            if self._drop_depth > 0:
                self._drop_depth -= 1
            return

        if self._drop_depth > 0:
            return

        if tag_lower == "title":
            self._in_title = False
        elif tag_lower == "h1":
            self._in_h1 = False
            if self._current_heading_chunks:
                text = " ".join(self._current_heading_chunks).strip()
                if text:
                    self.headings.append({"level": 1, "text": text})
            self._current_heading_tag = None
            self._current_heading_chunks = []
        elif tag_lower in ("h2", "h3") and self._current_heading_tag == tag_lower:
            if self._current_heading_chunks:
                level = 2 if tag_lower == "h2" else 3
                text = " ".join(self._current_heading_chunks).strip()
                if text:
                    self.headings.append({"level": level, "text": text})
            self._current_heading_tag = None
            self._current_heading_chunks = []
        elif tag_lower == "a" and self._current_anchor_href is not None:
            text = " ".join(self._current_anchor_chunks).strip()
            href = self._current_anchor_href
            if text and (_CTA_KEYWORDS.search(text) or "wa.me" in href or "whatsapp" in href):
                if len(self.ctas) < 20:
                    self.ctas.append({"label": text[:100], "url": href[:500]})
            self._current_anchor_href = None
            self._current_anchor_chunks = []

    def handle_data(self, data: str) -> None:
        if self._drop_depth > 0:
            return

        cleaned = data.strip()
        if not cleaned:
            return

        if self._in_title:
            self._title_chunks.append(cleaned)
        elif self._in_h1:
            self._h1_chunks.append(cleaned)
            self._text_chunks.append(cleaned)
        else:
            self._text_chunks.append(cleaned)

        if self._current_heading_tag:
            self._current_heading_chunks.append(cleaned)

        if self._current_anchor_href is not None:
            self._current_anchor_chunks.append(cleaned)

    def get_title(self) -> str:
        return unescape(" ".join(self._title_chunks)).strip()

    def get_h1(self) -> str:
        return unescape(" ".join(self._h1_chunks)).strip()

    def get_main_text(self) -> str:
        raw = " ".join(self._text_chunks)
        # Normalize repeated whitespace
        normalized = re.sub(r"\s+", " ", unescape(raw)).strip()
        # Cap at 100 KB
        return normalized[:100_000]


def extract_keywords(
    meta_keywords: str | None,
    title: str,
    h1: str | None,
) -> str | None:
    """Extract or derive clean keyword list from meta tags, headings, and title."""
    if meta_keywords and meta_keywords.strip():
        parts = [k.strip() for k in re.split(r"[,;]+", meta_keywords) if k.strip()]
        if parts:
            return ", ".join(parts[:15])

    text_source = f"{h1 or ''} {title}".strip()
    if not text_source:
        return None

    common_terms = [
        "Pendirian PT", "Pembuatan PT", "PT Perorangan", "Pendirian CV", "Pembuatan CV",
        "Izin Usaha", "NIB", "OSS", "HAKI", "Merek", "Amdal", "BPOM", "ISO",
        "Perizinan", "Yayasan", "Koperasi", "Virtual Office", "PMA", "Legalitas",
    ]
    candidates: list[str] = []
    seen = set()
    for term in common_terms:
        if term.lower() in text_source.lower() and term.lower() not in seen:
            seen.add(term.lower())
            candidates.append(term)

    if candidates:
        return ", ".join(candidates[:10])

    if h1 and len(h1) < 80:
        return h1
    if title and len(title) < 80:
        return title

    return None


def extract_page_data(html: str, base_url: str) -> dict[str, Any]:
    """
    Parse HTML and extract SEO fields, main text, price strings, and CTAs.
    Returns normalized dictionary ready for snapshot persistence.
    """
    if not html:
        return {
            "title": "",
            "metaDescription": None,
            "canonicalUrl": None,
            "h1": None,
            "keywords": None,
            "headings": [],
            "mainText": "",
            "priceTexts": [],
            "ctas": [],
            "classification": "OTHER",
            "contentHash": compute_content_hash({}),
        }

    parser = _TextExtractor()
    try:
        parser.feed(html)
    except Exception:
        pass

    title = parser.get_title()
    meta_description = unescape(parser.meta_description.strip()) if parser.meta_description else None
    canonical_url = parser.canonical.strip() if parser.canonical else None
    raw_h1 = parser.get_h1()
    h1 = " ".join(raw_h1.split()) if raw_h1 else None
    meta_keywords = unescape(parser.meta_keywords.strip()) if parser.meta_keywords else None
    keywords = extract_keywords(meta_keywords, title, h1)
    headings = parser.headings
    main_text = parser.get_main_text()

    # Absolute URL for CTAs
    resolved_ctas: list[dict[str, str]] = []
    seen_ctas = set()
    for cta in parser.ctas:
        target_url = urljoin(base_url, cta["url"])
        key = (cta["label"].lower(), target_url.lower())
        if key not in seen_ctas:
            seen_ctas.add(key)
            resolved_ctas.append({"label": cta["label"], "url": target_url})

    # Price extraction from main text and headings
    prices = extract_prices(main_text)

    # Classify page
    classification = classify_page(base_url, title, main_text, prices, resolved_ctas, html)

    extracted_dict = {
        "title": title,
        "metaDescription": meta_description,
        "canonicalUrl": canonical_url,
        "h1": h1,
        "keywords": keywords,
        "headings": headings,
        "mainText": main_text,
        "priceTexts": prices,
        "ctas": resolved_ctas,
        "classification": classification,
    }

    extracted_dict["contentHash"] = compute_content_hash(extracted_dict)
    return extracted_dict


def extract_prices(text: str) -> list[str]:
    """Extract and deduplicate Indonesian price patterns from text."""
    if not text:
        return []

    found = []
    seen = set()
    for match in _PRICE_REGEX.finditer(text):
        raw = match.group(0).strip()
        # Normalize multiple spaces
        clean = re.sub(r"\s+", " ", raw)
        normalized_key = clean.lower().replace(" ", "").replace(".", "")
        if normalized_key not in seen:
            seen.add(normalized_key)
            found.append(clean)
    return found[:50]


def classify_page(
    url: str,
    title: str,
    main_text: str,
    prices: list[str],
    ctas: list[dict[str, str]],
    html: str = "",
) -> str:
    """
    Classify page into one of PageClassification enums:
    CONTENT, SERVICE, ARTICLE, OTHER, UNSUPPORTED_DYNAMIC
    """
    # Dynamic page detection: almost no visible text but SPA markers present
    if len(main_text.strip()) < 80:
        html_lower = html.lower()
        if (
            "id=\"root\"" in html_lower
            or "id=\"__next\"" in html_lower
            or "id=\"app\"" in html_lower
            or "enable javascript" in html_lower
            or "requires javascript" in html_lower
        ):
            return "UNSUPPORTED_DYNAMIC"

    # Service page: explicit path pattern or has prices & CTA
    if _SERVICE_PATH_REGEX.search(url):
        return "SERVICE"

    title_lower = title.lower()
    if any(k in title_lower for k in ("jasa", "layanan", "paket", "biaya", "harga", "pendirian")):
        return "SERVICE"

    if len(prices) > 0 and len(ctas) > 0:
        return "SERVICE"

    # Article page
    if _ARTICLE_PATH_REGEX.search(url):
        return "ARTICLE"

    if any(k in title_lower for k in ("cara", "panduan", "syarat", "pengertian", "tips", "hukum")):
        return "ARTICLE"

    if len(main_text) >= 150:
        return "CONTENT"

    return "OTHER"


def compute_content_hash(fields: dict[str, Any]) -> str:
    """Compute deterministic SHA-256 hash of extracted fields."""
    canonical_payload = {
        "title": fields.get("title") or "",
        "metaDescription": fields.get("metaDescription") or "",
        "h1": fields.get("h1") or "",
        "keywords": fields.get("keywords") or "",
        "headings": fields.get("headings") or [],
        "mainText": fields.get("mainText") or "",
        "priceTexts": sorted(fields.get("priceTexts") or []),
        "ctas": fields.get("ctas") or [],
    }
    encoded = json.dumps(canonical_payload, sort_keys=True, ensure_ascii=False).encode("utf-8")
    return hashlib.sha256(encoded).hexdigest()
