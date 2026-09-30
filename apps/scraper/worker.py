"""
Competitor Scraper Worker Daemon.
Polls PostgreSQL for PENDING crawl jobs, verifies target safety, executes Scrapy,
and updates crawl progress and completion status.
"""

from __future__ import annotations

import logging
import os
import signal
import subprocess
import sys
import time
from datetime import datetime, timezone
from urllib.parse import parse_qs, urlparse

from utils.url_guard import is_safe_url

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("competitor_worker")

RUNNING = True


def signal_handler(signum, frame):
    global RUNNING
    logger.info("Received termination signal %s. Shutting down worker...", signum)
    RUNNING = False


signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


def clean_db_url(raw_url: str) -> tuple[str, str | None]:
    """Parse DATABASE_URL and extract schema parameter if present."""
    if not raw_url:
        return "", None
    parsed = urlparse(raw_url)
    qs = parse_qs(parsed.query)
    schema = qs.get("schema", [None])[0]
    clean_query = "&".join(f"{k}={v[0]}" for k, v in qs.items() if k != "schema")
    cleaned_url = parsed._replace(query=clean_query).geturl()
    return cleaned_url, schema


def setup_search_path(conn, schema: str | None = None) -> None:
    """Ensure both custom schema, 'easylegal', and 'public' are in search_path."""
    targets = [schema, "easylegal", "public"] if schema else ["easylegal", "public"]
    valid = []
    for s in targets:
        if s and s not in valid:
            valid.append(s)
    with conn.cursor() as cur:
        cur.execute(f"SET search_path TO {', '.join(valid)};")


def get_connection(db_url: str):
    """Open a new PostgreSQL connection with autocommit and set search_path."""
    import psycopg

    cleaned_url, schema = clean_db_url(db_url)
    conn = psycopg.connect(cleaned_url, autocommit=True)
    setup_search_path(conn, schema)
    return conn

def recover_stale_crawls(conn) -> int:
    """Mark RUNNING crawls older than 30 minutes as FAILED."""
    sql = """
        UPDATE "CompetitorCrawl"
        SET status = 'FAILED'::"CrawlStatus",
            "errorMessage" = 'Crawl timed out or worker process was terminated',
            "finishedAt" = CURRENT_TIMESTAMP,
            "updatedAt" = CURRENT_TIMESTAMP
        WHERE status = 'RUNNING'::"CrawlStatus"
          AND "startedAt" < CURRENT_TIMESTAMP - INTERVAL '30 minutes';
    """
    with conn.cursor() as cur:
        cur.execute(sql)
        return cur.rowcount


def claim_next_job(conn) -> dict | None:
    """Find and lock the oldest PENDING crawl job."""
    sql = """
        SELECT
            c.id AS crawl_id,
            c."competitorId" AS competitor_id,
            s.name AS site_name,
            s."baseUrl" AS base_url,
            s.hostname AS hostname,
            s."isActive" AS is_active
        FROM "CompetitorCrawl" c
        JOIN "CompetitorSite" s ON c."competitorId" = s.id
        WHERE c.status = 'PENDING'::"CrawlStatus"
        ORDER BY c."createdAt" ASC
        LIMIT 1
        FOR UPDATE SKIP LOCKED;
    """
    with conn.cursor() as cur:
        cur.execute(sql)
        row = cur.fetchone()
        if not row:
            return None
        return {
            "crawl_id": row[0],
            "competitor_id": row[1],
            "site_name": row[2],
            "base_url": row[3],
            "hostname": row[4],
            "is_active": row[5],
        }


def mark_crawl_failed(conn, crawl_id: str, reason: str) -> None:
    sql = """
        UPDATE "CompetitorCrawl"
        SET status = 'FAILED'::"CrawlStatus",
            "errorMessage" = %s,
            "finishedAt" = CURRENT_TIMESTAMP,
            "updatedAt" = CURRENT_TIMESTAMP
        WHERE id = %s;
    """
    with conn.cursor() as cur:
        cur.execute(sql, (reason, crawl_id))


def mark_crawl_running(conn, crawl_id: str) -> None:
    sql = """
        UPDATE "CompetitorCrawl"
        SET status = 'RUNNING'::"CrawlStatus",
            "startedAt" = CURRENT_TIMESTAMP,
            "updatedAt" = CURRENT_TIMESTAMP
        WHERE id = %s;
    """
    with conn.cursor() as cur:
        cur.execute(sql, (crawl_id,))


def finalize_crawl(conn, crawl_id: str, return_code: int, error_output: str = "") -> None:
    # Check count of successfully scraped pages
    count_sql = """
        SELECT COUNT(*) FROM "CompetitorPageSnapshot" WHERE "crawlId" = %s;
    """
    with conn.cursor() as cur:
        cur.execute(count_sql, (crawl_id,))
        scraped_count = cur.fetchone()[0]

    if scraped_count > 0 and return_code == 0:
        status = "SUCCEEDED"
        error_msg = None
    elif scraped_count > 0:
        status = "PARTIAL"
        error_msg = error_output[:1000] if error_output else "Crawl finished with partial page warnings"
    else:
        status = "FAILED"
        error_msg = error_output[:1000] if error_output else "No pages could be scraped from target"

    update_sql = """
        UPDATE "CompetitorCrawl"
        SET status = %s::"CrawlStatus",
            "pagesScraped" = %s,
            "errorMessage" = %s,
            "finishedAt" = CURRENT_TIMESTAMP,
            "updatedAt" = CURRENT_TIMESTAMP
        WHERE id = %s;
    """
    with conn.cursor() as cur:
        cur.execute(update_sql, (status, scraped_count, error_msg, crawl_id))

    logger.info("Crawl %s finalized with status %s (%d pages scraped)", crawl_id, status, scraped_count)


def run_worker():
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        logger.error("DATABASE_URL environment variable is required to run worker.")
        sys.exit(1)

    logger.info("Starting Competitor Scraper Worker...")
    try:
        conn = get_connection(db_url)
    except Exception as e:
        logger.error("Database connection failed: %s", e)
        sys.exit(1)

    try:
        recovered = recover_stale_crawls(conn)
        if recovered > 0:
            logger.info("Recovered %d stale crawl(s) from previous worker run.", recovered)
    except Exception as e:
        logger.warning("Stale crawl recovery failed: %s", e)

    while RUNNING:
        try:
            job = claim_next_job(conn)
            if not job:
                time.sleep(5)
                continue

            crawl_id = job["crawl_id"]
            site_name = job["site_name"]
            base_url = job["base_url"]
            hostname = job["hostname"]
            is_active = job["is_active"]

            logger.info("Claimed crawl %s for competitor '%s' (%s)", crawl_id, site_name, hostname)

            if not is_active:
                logger.warning("Competitor '%s' is inactive. Marking crawl as failed.", site_name)
                mark_crawl_failed(conn, crawl_id, "Competitor site is disabled.")
                continue

            is_safe, reason = is_safe_url(base_url, resolve_dns=True)
            if not is_safe:
                logger.warning("Target URL '%s' failed safety validation: %s", base_url, reason)
                mark_crawl_failed(conn, crawl_id, f"Unsafe target URL: {reason}")
                continue

            mark_crawl_running(conn, crawl_id)

            # Launch Scrapy subprocess
            cmd = [
                sys.executable,
                "-m",
                "scrapy",
                "crawl",
                "competitor",
                "-a",
                f"crawl_id={crawl_id}",
                "-a",
                f"competitor_id={job['competitor_id']}",
                "-a",
                f"allowed_hostname={hostname}",
                "-a",
                f"start_url={base_url}",
            ]

            logger.info("Executing Scrapy: %s", " ".join(cmd))
            start_time = time.time()
            proc = subprocess.Popen(
                cmd,
                cwd=os.path.dirname(os.path.abspath(__file__)),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                bufsize=1,
            )

            output_lines = []
            try:
                if proc.stdout:
                    for line in proc.stdout:
                        output_lines.append(line)
                        sys.stdout.write(f"[SCRAPY] {line}")
                        sys.stdout.flush()
                proc.wait(timeout=1250)
                full_output = "".join(output_lines)
                duration = time.time() - start_time
                logger.info("Scrapy process finished in %.1f seconds with exit code %d", duration, proc.returncode)
                finalize_crawl(conn, crawl_id, proc.returncode, full_output)
            except subprocess.TimeoutExpired:
                proc.kill()
                logger.error("Scrapy process timed out after 1250 seconds. Terminating.")
                finalize_crawl(conn, crawl_id, -1, "Crawl timed out after 20 minutes")
        except Exception as e:
            logger.error("Worker error encountered in main loop: %s", e)
            time.sleep(5)

    try:
        conn.close()
    except Exception:
        pass
    logger.info("Worker stopped cleanly.")


if __name__ == "__main__":
    run_worker()
