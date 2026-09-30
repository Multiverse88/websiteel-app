"""
Item pipeline to persist competitor page snapshots directly to PostgreSQL.
"""

from __future__ import annotations

import json
import logging
import os
import uuid
from datetime import datetime, timezone
from urllib.parse import parse_qs, urlparse

logger = logging.getLogger(__name__)


def clean_db_url(raw_url: str) -> tuple[str, str | None]:
    """Parse DATABASE_URL and extract schema parameter if present."""
    if not raw_url:
        return "", None
    parsed = urlparse(raw_url)
    qs = parse_qs(parsed.query)
    schema = qs.get("schema", [None])[0]
    # Remove schema from query to prevent psycopg connection errors
    clean_query = "&".join(f"{k}={v[0]}" for k, v in qs.items() if k != "schema")
    cleaned_url = parsed._replace(query=clean_query).geturl()
    return cleaned_url, schema


class PostgresWriterPipeline:
    """Writes scraped page items to CompetitorPageSnapshot and updates CompetitorCrawl."""

    def __init__(self) -> None:
        self.conn = None
        self.schema = None
        self.db_url = os.environ.get("DATABASE_URL", "")

    def open_spider(self, spider):
        if not self.db_url:
            logger.warning("DATABASE_URL is not set; PostgresWriterPipeline will operate in dry-run mode.")
            return

        try:
            import psycopg

            conn_url, self.schema = clean_db_url(self.db_url)
            self.conn = psycopg.connect(conn_url, autocommit=True)
            targets = [self.schema, "easylegal", "public"] if self.schema else ["easylegal", "public"]
            valid = [s for s in targets if s]
            with self.conn.cursor() as cur:
                cur.execute(f"SET search_path TO {', '.join(valid)};")
            logger.info("Connected to PostgreSQL (search_path=%s) for crawl %s", ', '.join(valid), getattr(spider, "crawl_id", "unknown"))
        except Exception as e:
            logger.error("Failed to connect to PostgreSQL: %s", e)
            self.conn = None

    def close_spider(self, spider):
        if self.conn:
            try:
                self.conn.close()
            except Exception:
                pass
            self.conn = None

    def process_item(self, item, spider):
        if not self.conn:
            # Dry run / memory fallback
            return item

        snapshot_id = "sn_" + uuid.uuid4().hex[:22]
        crawl_id = item["crawl_id"]
        competitor_id = item["competitor_id"]
        url = item["url"]
        path = item.get("path") or "/"
        status_code = int(item.get("status_code", 200))
        content_type = item.get("content_type")
        canonical_url = item.get("canonical_url")
        title = item.get("title") or ""
        meta_description = item.get("meta_description")
        h1 = item.get("h1")
        headings = json.dumps(item.get("headings") or [], ensure_ascii=False)
        main_text = item.get("main_text") or ""
        price_texts = json.dumps(item.get("price_texts") or [], ensure_ascii=False)
        ctas = json.dumps(item.get("ctas") or [], ensure_ascii=False)
        content_hash = item.get("content_hash") or ""
        classification = item.get("classification") or "CONTENT"
        scraped_at = item.get("scraped_at") or datetime.now(timezone.utc)

        sql_insert_snapshot = """
            INSERT INTO "CompetitorPageSnapshot" (
                "id", "crawlId", "competitorId", "url", "path", "statusCode",
                "contentType", "canonicalUrl", "title", "metaDescription", "h1",
                "headings", "mainText", "priceTexts", "ctas", "contentHash",
                "classification", "scrapedAt"
            ) VALUES (
                %s, %s, %s, %s, %s, %s,
                %s, %s, %s, %s, %s,
                %s::jsonb, %s, %s::jsonb, %s::jsonb, %s,
                %s::"PageClassification", %s
            )
            ON CONFLICT ("crawlId", "url") DO UPDATE SET
                "statusCode" = EXCLUDED."statusCode",
                "contentType" = EXCLUDED."contentType",
                "canonicalUrl" = EXCLUDED."canonicalUrl",
                "title" = EXCLUDED."title",
                "metaDescription" = EXCLUDED."metaDescription",
                "h1" = EXCLUDED."h1",
                "headings" = EXCLUDED."headings",
                "mainText" = EXCLUDED."mainText",
                "priceTexts" = EXCLUDED."priceTexts",
                "ctas" = EXCLUDED."ctas",
                "contentHash" = EXCLUDED."contentHash",
                "classification" = EXCLUDED."classification",
                "scrapedAt" = EXCLUDED."scrapedAt";
        """

        sql_update_crawl = """
            UPDATE "CompetitorCrawl"
            SET "pagesScraped" = "pagesScraped" + 1,
                "updatedAt" = CURRENT_TIMESTAMP
            WHERE "id" = %s;
        """

        try:
            with self.conn.cursor() as cur:
                cur.execute(
                    sql_insert_snapshot,
                    (
                        snapshot_id,
                        crawl_id,
                        competitor_id,
                        url,
                        path,
                        status_code,
                        content_type,
                        canonical_url,
                        title,
                        meta_description,
                        h1,
                        headings,
                        main_text,
                        price_texts,
                        ctas,
                        content_hash,
                        classification,
                        scraped_at,
                    ),
                )
                cur.execute(sql_update_crawl, (crawl_id,))
        except Exception as e:
            logger.error("PIPELINE_ERROR: Failed to insert snapshot for %s: %s", url, e)
            import sys
            sys.stderr.write(f"PIPELINE_ERROR: Failed to insert snapshot for {url}: {e}\n")
            sys.stderr.flush()
        return item
