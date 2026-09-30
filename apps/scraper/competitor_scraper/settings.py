"""
Scrapy settings for competitor_scraper.
"""

import os

BOT_NAME = "competitor_scraper"

SPIDER_MODULES = ["competitor_scraper.spiders"]
NEWSPIDER_MODULE = "competitor_scraper.spiders"

# Crawl etiquette and politeness
ROBOTSTXT_OBEY = os.environ.get("SCRAPER_ROBOTSTXT_OBEY", "false").lower() in ("true", "1")
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 1.0
AUTOTHROTTLE_MAX_DELAY = 10.0
AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
DOWNLOAD_DELAY = 1.0
CONCURRENT_REQUESTS_PER_DOMAIN = 2
DOWNLOAD_TIMEOUT = 15
DEPTH_LIMIT = 5

# Hard safety caps
CLOSESPIDER_PAGECOUNT = 500
CLOSESPIDER_TIMEOUT = 1200  # 20 minutes

# User agent identifying EasyLegal's research crawler
USER_AGENT = os.environ.get(
    "SCRAPER_USER_AGENT",
    "EasyLegal-Bot/1.0 (+https://easylegal.biz.id/bot-info; bot@easylegal.biz.id)",
)

# Reject unsafe URLs and cross-domain redirects before downloading
DOWNLOADER_MIDDLEWARES = {
    "competitor_scraper.middlewares.SafeUrlDownloaderMiddleware": 50,
}

# Store extracted snapshots in PostgreSQL
ITEM_PIPELINES = {
    "competitor_scraper.pipelines.PostgresWriterPipeline": 300,
}

# Do not retain cookies or sessions across crawl requests
COOKIES_ENABLED = False
HTTPCACHE_ENABLED = False

# Logging
LOG_LEVEL = os.environ.get("SCRAPER_LOG_LEVEL", "INFO")
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"
