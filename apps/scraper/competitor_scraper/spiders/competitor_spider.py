"""
Scrapy spider for crawling a competitor website, discovering sitemaps and internal links,
and extracting structured SEO and service snapshots.
"""

from __future__ import annotations

import logging
import re
from urllib.parse import urljoin, urlparse
try:
    import scrapy
except ImportError:
    class _MockScrapy:
        class Spider:
            def __init__(self, *args, **kwargs):
                pass
        class Request:
            def __init__(self, url, callback=None, errback=None, meta=None):
                self.url = url
                self.callback = callback
                self.errback = errback
                self.meta = meta or {}
    scrapy = _MockScrapy()
from competitor_scraper.items import CompetitorPageSnapshotItem
from utils.extractor import extract_page_data
from utils.url_guard import is_ignored_path, is_same_domain, normalize_hostname, normalize_url

logger = logging.getLogger(__name__)


class CompetitorSpider(scrapy.Spider):
    name = "competitor"
    handle_httpstatus_list = [400, 401, 403, 404, 500, 502, 503]

    def __init__(
        self,
        crawl_id: str | None = None,
        competitor_id: str | None = None,
        allowed_hostname: str | None = None,
        start_url: str | None = None,
        *args,
        **kwargs,
    ):
        super().__init__(*args, **kwargs)
        self.crawl_id = crawl_id or "dry_run"
        self.competitor_id = competitor_id or "dry_run"
        self.allowed_hostname = allowed_hostname or ""
        self.start_url = start_url or ""
        self.seen_urls: set[str] = set()
        self.discovered_count: int = 0

        clean_host = normalize_hostname(self.allowed_hostname)
        self.allowed_domains = [clean_host, f"www.{clean_host}"] if clean_host else []

    def start_requests(self):
        if not self.start_url or not self.allowed_hostname:
            logger.error("Spider requires start_url and allowed_hostname arguments")
            return

        base_clean = self.start_url.rstrip("/")

        # 1. Try sitemap.xml
        sitemap_url = f"{base_clean}/sitemap.xml"
        yield scrapy.Request(
            sitemap_url,
            callback=self.parse_sitemap,
            errback=self.handle_sitemap_error,
            meta={"dont_obey_robotstxt": False},
        )

        # 2. Seed with homepage
        yield scrapy.Request(
            base_clean + "/",
            callback=self.parse_page,
            errback=self.handle_page_error,
        )

    def parse_sitemap(self, response):
        """Parse sitemap XML and queue all declared URLs."""
        content_type = response.headers.get(b"Content-Type", b"").decode("utf-8", "ignore").lower()
        if "xml" not in content_type and not response.text.strip().startswith("<?xml"):
            # Not an XML sitemap, ignore silently
            return

        # Extract <loc> URLs via regex (namespace-agnostic) with xpath fallback
        locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", response.text, re.IGNORECASE)
        if not locs:
            locs = response.xpath('//*[local-name()="loc"]/text()').getall()

        for raw_loc in locs:
            loc = raw_loc.strip()
            if not loc:
                continue

            parsed = urlparse(loc)
            # Sitemap index pointing to nested sitemap
            if loc.endswith(".xml") or "sitemap" in parsed.path.lower():
                yield scrapy.Request(loc, callback=self.parse_sitemap, errback=self.handle_sitemap_error)
                continue

            clean_loc = normalize_url(loc)
            if (
                is_same_domain(clean_loc, self.allowed_hostname)
                and not is_ignored_path(parsed.path)
                and clean_loc not in self.seen_urls
            ):
                self.discovered_count += 1
                yield scrapy.Request(clean_loc, callback=self.parse_page, errback=self.handle_page_error)

    def handle_sitemap_error(self, failure):
        logger.debug("Sitemap discovery not available: %s", failure.value)

    def handle_page_error(self, failure):
        logger.warning("Failed to crawl page: %s", failure.value)

    def parse_page(self, response):
        """Extract SEO and commercial signals and follow in-domain links."""
        content_type = response.headers.get(b"Content-Type", b"").decode("utf-8", "ignore").lower()
        # Accept text/html or application/xhtml+xml
        if content_type and not any(ct in content_type for ct in ("text/html", "xhtml")):
            return

        normalized = normalize_url(response.url)
        if normalized in self.seen_urls:
            return
        self.seen_urls.add(normalized)

        path = urlparse(normalized).path or "/"

        extracted = extract_page_data(response.text, normalized)

        yield CompetitorPageSnapshotItem(
            crawl_id=self.crawl_id,
            competitor_id=self.competitor_id,
            url=normalized,
            path=path,
            status_code=response.status,
            content_type=content_type[:100] if content_type else None,
            canonical_url=extracted["canonicalUrl"],
            title=extracted["title"],
            meta_description=extracted["metaDescription"],
            h1=extracted["h1"],
            headings=extracted["headings"],
            main_text=extracted["mainText"],
            price_texts=extracted["priceTexts"],
            ctas=extracted["ctas"],
            content_hash=extracted["contentHash"],
            classification=extracted["classification"],
            scraped_at=None,
        )

        # Discover and follow same-domain links
        links = response.css("a::attr(href)").getall()
        for raw_link in links:
            if not raw_link or raw_link.startswith(("#", "javascript:", "mailto:", "tel:")):
                continue

            target_abs = urljoin(response.url, raw_link)
            target_clean = normalize_url(target_abs)
            target_parsed = urlparse(target_clean)

            if (
                is_same_domain(target_clean, self.allowed_hostname)
                and not is_ignored_path(target_parsed.path)
                and target_clean not in self.seen_urls
            ):
                self.discovered_count += 1
                yield response.follow(target_clean, callback=self.parse_page, errback=self.handle_page_error)
