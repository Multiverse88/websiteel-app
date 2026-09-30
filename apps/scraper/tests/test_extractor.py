import pytest
from utils.extractor import extract_page_data, extract_prices, classify_page, compute_content_hash


def test_extract_page_data_service():
    html = """
    <!DOCTYPE html>
    <html>
      <head>
        <title>Jasa Pendirian PT Murah & Cepat - LegalIn</title>
        <meta name="description" content="Paket pendirian PT lengkap SK Kemenkumham, NIB OSS, dan NPWP.">
        <link rel="canonical" href="https://legalin.id/jasa-pt">
      </head>
      <body>
        <nav><a href="/home">Beranda</a></nav>
        <main>
          <h1>Jasa Pendirian PT Profesional</h1>
          <h2>Paket Pendirian PT Kilat</h2>
          <p>Dapatkan izin usaha legal lengkap mulai dari <strong>Rp 4.500.000</strong> saja.</p>
          <p>Tersedia juga paket lengkap PT PMA seharga IDR 12.000.000.</p>
          <a href="https://wa.me/628123456789?text=halo" class="btn">Konsultasi WhatsApp Sekarang</a>
          <h3>Syarat Dokumen</h3>
          <p>KTP dan NPWP para pendiri perusahaan.</p>
        </main>
        <footer><p>Hak Cipta 2026</p></footer>
      </body>
    </html>
    """
    data = extract_page_data(html, "https://legalin.id/jasa-pt")
    assert data["title"] == "Jasa Pendirian PT Murah & Cepat - LegalIn"
    assert "Paket pendirian PT" in data["metaDescription"]
    assert data["canonicalUrl"] == "https://legalin.id/jasa-pt"
    assert data["h1"] == "Jasa Pendirian PT Profesional"
    assert len(data["headings"]) == 3
    assert data["headings"][0] == {"level": 1, "text": "Jasa Pendirian PT Profesional"}
    assert data["headings"][1] == {"level": 2, "text": "Paket Pendirian PT Kilat"}
    assert data["headings"][2] == {"level": 3, "text": "Syarat Dokumen"}
    assert "Dapatkan izin usaha legal" in data["mainText"]
    assert "Hak Cipta" not in data["mainText"]
    assert "Beranda" not in data["mainText"]
    assert len(data["priceTexts"]) >= 2
    assert any("4.500.000" in p for p in data["priceTexts"])
    assert any("12.000.000" in p for p in data["priceTexts"])
    assert len(data["ctas"]) >= 1
    assert "wa.me" in data["ctas"][0]["url"]
    assert data["classification"] == "SERVICE"
    assert len(data["contentHash"]) == 64


def test_classify_page_unsupported_dynamic():
    html = """
    <!DOCTYPE html>
    <html>
      <head><title>App</title></head>
      <body>
        <div id="root"></div>
        <script src="/app.js"></script>
      </body>
    </html>
    """
    data = extract_page_data(html, "https://spa.com/app")
    assert data["classification"] == "UNSUPPORTED_DYNAMIC"


def test_extract_prices_various_formats():
    text = "Harga paket A adalah Rp. 2.500.000, paket B Rp500rb, dan paket C IDR 15.000.000 atau Rp 2,5 Juta."
    prices = extract_prices(text)
    assert len(prices) >= 3


def test_compute_content_hash_deterministic():
    payload1 = {
        "title": "Judul A",
        "metaDescription": "Desc A",
        "h1": "H1",
        "headings": [{"level": 1, "text": "H1"}],
        "mainText": "Isi teks",
        "priceTexts": ["Rp 1.000.000"],
        "ctas": [{"label": "Hubungi", "url": "https://example.com"}],
    }
    payload2 = dict(payload1)
    assert compute_content_hash(payload1) == compute_content_hash(payload2)
