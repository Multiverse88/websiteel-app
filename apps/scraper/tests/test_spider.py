import unittest
from competitor_scraper.spiders.competitor_spider import CompetitorSpider
from competitor_scraper.pipelines import clean_db_url, PostgresWriterPipeline


class MockResponse:
    def __init__(self, url: str, text: str, status: int = 200, headers: dict | None = None):
        self.url = url
        self.text = text
        self.status = status
        self.headers = headers or {b"Content-Type": b"text/html; charset=utf-8"}

    @property
    def body(self):
        return self.text.encode("utf-8")

    def css(self, selector: str):
        # Lightweight selector mock for testing
        class CssMock:
            def getall(s):
                return ["/layanan/pt-pma", "https://other.com/out"]
        return CssMock()

    def follow(self, url: str, callback=None, errback=None):
        return {"url": url, "callback": callback, "errback": errback}


class SpiderTestCase(unittest.TestCase):
    def test_clean_db_url_strips_schema(self):
        raw = "postgresql://user:pass@127.0.0.1:5432/db?schema=easylegal&sslmode=disable"
        clean, schema = clean_db_url(raw)
        self.assertEqual(schema, "easylegal")
        self.assertNotIn("schema=", clean)
        self.assertIn("sslmode=disable", clean)

    def test_spider_init_domain(self):
        spider = CompetitorSpider(
            crawl_id="c_1",
            competitor_id="comp_1",
            allowed_hostname="competitor.com",
            start_url="https://competitor.com",
        )
        self.assertIn("competitor.com", spider.allowed_domains)
        self.assertIn("www.competitor.com", spider.allowed_domains)

    def test_spider_start_yields_sitemap(self):
        import asyncio

        spider = CompetitorSpider(
            crawl_id="c_1",
            competitor_id="comp_1",
            allowed_hostname="competitor.com",
            start_url="https://competitor.com",
        )

        async def collect():
            return [r async for r in spider.start()]

        requests = asyncio.run(collect())
        self.assertEqual(len(requests), 1)
        self.assertEqual(requests[0].url, "https://competitor.com/sitemap.xml")

    def test_spider_parse_sitemap_extracts_locs_and_homepage(self):
        spider = CompetitorSpider(
            crawl_id="c_1",
            competitor_id="comp_1",
            allowed_hostname="competitor.com",
            start_url="https://competitor.com",
        )
        xml = """<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url><loc>https://competitor.com/layanan/pt</loc></url>
            <url><loc>https://competitor.com/layanan/cv</loc></url>
        </urlset>"""
        response = MockResponse(
            "https://competitor.com/sitemap.xml",
            xml,
            headers={b"Content-Type": b"application/xml"},
        )
        requests = list(spider.parse_sitemap(response))
        urls = {r.url for r in requests}
        self.assertIn("https://competitor.com/layanan/pt", urls)
        self.assertIn("https://competitor.com/layanan/cv", urls)
        self.assertIn("https://competitor.com/", urls)
        self.assertTrue(spider.sitemap_found)

    def test_sitemap_page_request_produces_snapshot(self):
        spider = CompetitorSpider(
            crawl_id="c_1",
            competitor_id="comp_1",
            allowed_hostname="competitor.com",
            start_url="https://competitor.com",
        )
        sitemap = MockResponse(
            "https://competitor.com/sitemap.xml",
            """<?xml version="1.0"?>
            <urlset><url><loc>https://competitor.com/layanan/pt</loc></url></urlset>""",
            headers={b"Content-Type": b"application/xml"},
        )
        request = next(r for r in spider.parse_sitemap(sitemap) if r.url.endswith("/layanan/pt"))
        page = MockResponse(
            request.url,
            """<html><head>
            <title>Jasa Pendirian PT</title>
            <meta name="keywords" content="pendirian pt, izin usaha">
            </head><body><h1>Pendirian PT Lengkap</h1></body></html>""",
        )

        items = list(request.callback(page))

        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["url"], "https://competitor.com/layanan/pt")
        self.assertEqual(items[0]["title"], "Jasa Pendirian PT")
        self.assertEqual(items[0]["h1"], "Pendirian PT Lengkap")
        self.assertEqual(items[0]["keywords"], "pendirian pt, izin usaha")

    def test_spider_parse_sitemap_fallback_on_non_xml(self):
        spider = CompetitorSpider(
            crawl_id="c_1",
            competitor_id="comp_1",
            allowed_hostname="competitor.com",
            start_url="https://competitor.com",
        )
        response = MockResponse(
            "https://competitor.com/sitemap.xml",
            "<html>404 Not Found</html>",
            status=404,
            headers={b"Content-Type": b"text/html"},
        )
        requests = list(spider.parse_sitemap(response))
        self.assertEqual(len(requests), 1)
        self.assertEqual(requests[0].url, "https://competitor.com/")
        self.assertFalse(spider.sitemap_found)
    def test_spider_start_without_args_yields_nothing(self):
        import asyncio

        spider = CompetitorSpider()

        async def collect():
            return [r async for r in spider.start()]

        requests = asyncio.run(collect())
        self.assertEqual(requests, [])

    def test_spider_parse_page(self):
        spider = CompetitorSpider(
            crawl_id="c_1",
            competitor_id="comp_1",
            allowed_hostname="competitor.com",
            start_url="https://competitor.com",
        )
        html = """
        <html>
          <head><title>Jasa Pendirian PT</title></head>
          <body>
            <main>
              <h1>Pendirian PT Lengkap</h1>
              <p>Biaya mulai Rp 3.500.000 resmi.</p>
              <a href="https://wa.me/62811">Konsultasi WA</a>
            </main>
          </body>
        </html>
        """
        response = MockResponse("https://competitor.com/layanan/pt", html)
        items = list(spider.parse_page(response))
        self.assertEqual(len(items), 2)
        item = items[0]
        self.assertEqual(item["url"], "https://competitor.com/layanan/pt")
        self.assertEqual(item["title"], "Jasa Pendirian PT")
        self.assertEqual(item["classification"], "SERVICE")
        self.assertIn("Rp 3.500.000", item["price_texts"])
        followed = items[1]
        self.assertEqual(followed["url"], "https://competitor.com/layanan/pt-pma")

    def test_pipeline_dry_run(self):
        pipeline = PostgresWriterPipeline()
        self.assertIsNone(pipeline.conn)
        item = {
            "crawl_id": "c_1",
            "competitor_id": "s_1",
            "url": "https://competitor.com/",
            "path": "/",
            "status_code": 200,
        }
        res = pipeline.process_item(item, None)
        self.assertEqual(res, item)


if __name__ == "__main__":
    unittest.main()
