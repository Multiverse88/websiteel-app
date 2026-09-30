"""
Scrapy item definitions for competitor page snapshots.
"""

try:
    import scrapy

    class CompetitorPageSnapshotItem(scrapy.Item):
        crawl_id = scrapy.Field()
        competitor_id = scrapy.Field()
        url = scrapy.Field()
        path = scrapy.Field()
        status_code = scrapy.Field()
        content_type = scrapy.Field()
        canonical_url = scrapy.Field()
        title = scrapy.Field()
        meta_description = scrapy.Field()
        h1 = scrapy.Field()
        keywords = scrapy.Field()
        headings = scrapy.Field()
        main_text = scrapy.Field()
        price_texts = scrapy.Field()
        ctas = scrapy.Field()
        content_hash = scrapy.Field()
        classification = scrapy.Field()
        scraped_at = scrapy.Field()
except ImportError:
    class CompetitorPageSnapshotItem(dict):
        def __init__(self, **kwargs):
            super().__init__(**kwargs)
