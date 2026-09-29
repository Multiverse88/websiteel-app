# Competitor Scraper Design

**Status:** Approved design, pending implementation plan  
**Date:** 2026-09-29  
**Owner:** EasyLegal engineering

## Problem

EasyLegal needs an internal admin feature that collects public SEO and service information from competitor websites. The current system has no crawler, competitor data model, crawl job lifecycle, or dashboard for reviewing changes.

Scrapy is Python/Twisted-based, while the existing admin API is Node.js/Express. Long-running crawls must not block or destabilize the API process.

## Goals

1. Let an authenticated admin register competitor websites.
2. Let an authenticated admin start a crawl manually.
3. Discover pages through same-domain sitemaps and internal links.
4. Extract public SEO and service signals from standard HTML pages.
5. Persist every crawl as an immutable snapshot.
6. Compare the latest successful crawl with the previous successful crawl.
7. Show crawl status, extracted pages, prices, calls to action, and changes in the admin dashboard.
8. Keep crawl load conservative and respect `robots.txt`.

## Non-goals

- Scheduled or recurring crawls.
- JavaScript/browser rendering.
- Login, CAPTCHA bypass, proxy rotation, fingerprint evasion, or anti-bot circumvention.
- Scraping social networks, marketplaces, private pages, or personal data.
- AI summarization or automatic content generation.
- Automatic publication of competitor content.
- Unlimited crawling or crawling outside the registered domain.

## Decisions

### Separate Python worker

Add `apps/scraper`, deployed as a separate `competitor-scraper` container. The worker owns Scrapy execution. The existing Node API remains the only public API and the only service used by the admin dashboard.

This avoids mixing Python/Twisted lifecycle with Express and prevents crawler failures or resource spikes from taking down the admin API.

### PostgreSQL as the job queue

Use the existing PostgreSQL database instead of Redis, RabbitMQ, or Scrapyd.

The API inserts a `PENDING` crawl record. One worker claims the oldest pending job atomically with `SELECT ... FOR UPDATE SKIP LOCKED`, marks it `RUNNING`, executes Scrapy, writes snapshots, and records the terminal status.

Only one worker process is deployed initially. The claiming query still prevents duplicate work if another worker is added later.

### Static HTML only

Version one uses Scrapy's HTTP downloader. Pages whose useful content is absent from the HTML response are marked `UNSUPPORTED_DYNAMIC`. Playwright is not installed.

### Immutable snapshots

Every crawl stores its own page snapshots. Historical rows are not overwritten. The API compares the latest successful or partial run with the previous successful or partial run.

## Architecture

```text
Admin dashboard
    |
    | authenticated HTTP
    v
Node/Express admin API
    |
    | Prisma: create/read jobs and results
    v
PostgreSQL
    ^
    | claim pending job + write snapshots
    |
Python worker -> Scrapy spider -> public competitor website
```

### Responsibilities

#### Admin dashboard

- Manage competitor sites.
- Trigger manual crawls.
- Poll crawl status while a run is active.
- Display overview, pages, extracted commercial signals, and changes.
- Never communicate directly with the Python worker.

#### Node API

- Authenticate and authorize admin operations.
- Validate competitor URLs.
- Create crawl jobs.
- Expose crawl state, snapshots, and diffs.
- Prevent more than one active crawl per competitor.
- Never execute Scrapy or wait for a crawl to finish.

#### Python worker

- Claim pending jobs.
- Revalidate target safety before network access.
- Run one Scrapy subprocess per job.
- Enforce scope, limits, throttling, and robots rules.
- Extract and persist normalized snapshots.
- Record counters, errors, and terminal status.

## Data model

### `CompetitorSite`

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID primary key |
| `name` | String | Admin-facing competitor name |
| `baseUrl` | String | Normalized HTTPS/HTTP origin |
| `hostname` | String | Lowercase hostname, unique |
| `isActive` | Boolean | Defaults to true |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Update timestamp |

### `CompetitorCrawl`

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID primary key |
| `competitorId` | String | Relation to `CompetitorSite` |
| `status` | Enum | `PENDING`, `RUNNING`, `SUCCEEDED`, `PARTIAL`, `FAILED`, `CANCELLED` |
| `requestedByUserId` | String? | Admin user when available |
| `startedAt` | DateTime? | Set by worker |
| `finishedAt` | DateTime? | Set on terminal state |
| `pagesDiscovered` | Int | Defaults to zero |
| `pagesScraped` | Int | Successful HTML snapshots |
| `pagesFailed` | Int | Failed or rejected pages |
| `errorMessage` | String? | Run-level failure summary |
| `stats` | Json? | Bounded Scrapy counters and timing |
| `createdAt` | DateTime | Queue order |

Indexes: `(competitorId, createdAt)`, `(status, createdAt)`.

### `CompetitorPageSnapshot`

| Field | Type | Notes |
|---|---|---|
| `id` | String | CUID primary key |
| `crawlId` | String | Relation to `CompetitorCrawl`, cascade delete |
| `competitorId` | String | Query/index convenience |
| `url` | String | Final normalized URL |
| `path` | String | Path and stable query when allowed |
| `statusCode` | Int | HTTP response status |
| `contentType` | String? | Accepted HTML/XML content type |
| `canonicalUrl` | String? | Parsed canonical URL |
| `title` | String? | Document title |
| `metaDescription` | String? | Description meta tag |
| `h1` | String? | First H1 |
| `headings` | Json | Ordered H1-H3 values |
| `mainText` | String? | Clean visible main content, capped at 100 KB |
| `priceTexts` | Json | Deduplicated public `Rp`/`IDR` strings |
| `ctas` | Json | Bounded list of label and same/public target URL |
| `contentHash` | String | SHA-256 of normalized extracted fields |
| `classification` | Enum | `CONTENT`, `SERVICE`, `ARTICLE`, `OTHER`, `UNSUPPORTED_DYNAMIC` |
| `scrapedAt` | DateTime | Extraction timestamp |

Constraint: unique `(crawlId, url)`. Indexes: `(competitorId, url)`, `(crawlId, classification)`.

Raw HTML is not stored. This limits storage growth and avoids retaining scripts, trackers, or unrelated personal data.

## Crawl lifecycle

1. Admin requests a crawl.
2. API rejects the request if the competitor is inactive or already has a `PENDING`/`RUNNING` crawl.
3. API creates a `PENDING` row and immediately returns HTTP 202 with the crawl ID.
4. Worker claims the oldest pending row and marks it `RUNNING`.
5. Worker starts a fresh Scrapy subprocess for that crawl.
6. Spider requests `robots.txt`, then known sitemap locations and the base URL.
7. Spider follows allowed sitemap entries and same-host internal links.
8. Item pipeline normalizes and inserts snapshots in bounded batches.
9. Worker records:
   - `SUCCEEDED` when crawl completes without page failures.
   - `PARTIAL` when useful snapshots exist but some pages failed or limits interrupted discovery.
   - `FAILED` when no useful snapshot is produced or a run-level error occurs.
10. Dashboard polling stops on a terminal status and loads summary/results.

If a worker dies, a `RUNNING` job older than 30 minutes is treated as stale. On worker startup, stale jobs become `FAILED` with an explicit recovery reason. Version one does not retry automatically; an admin can run a new crawl.

## Discovery and scope rules

- Seed URLs: registered base URL, `/robots.txt`, `/sitemap.xml`, and sitemap URLs declared by robots.
- Follow sitemap indexes recursively within limits.
- Follow links only when the normalized hostname equals the registered hostname or its `www` equivalent.
- Reject cross-domain redirects before following them.
- Ignore fragments.
- Drop common tracking parameters (`utm_*`, `gclid`, `fbclid`).
- Ignore logout, login, cart, checkout, account, search, and calendar-like URL patterns.
- Maximum 500 accepted pages per crawl.
- Maximum link depth 5.
- Maximum run time 20 minutes.
- Maximum response body 5 MB.
- Accept HTML and XML only.

## Extraction

### SEO fields

- Final URL and status code.
- Canonical URL.
- `<title>`.
- Meta description.
- Ordered H1-H3 headings.
- Main visible text.

### Service signals

- Price strings containing `Rp`, `IDR`, or common Indonesian currency formatting.
- CTA labels and destinations from visible links/buttons.
- Service-page classification from URL, structured data, headings, and price/CTA presence.

Main text selection order:

1. `<main>`.
2. `<article>`.
3. Largest content-like container after removing script, style, nav, footer, form, and hidden elements.
4. Cleaned body text fallback.

Whitespace is normalized before hashing. Lists are deduplicated while preserving document order.

Generic extraction does not promise semantic package names or exact price-to-package relationships. Site-specific spiders are deferred until observed extraction failures justify them.

## Change detection

Compare snapshots by normalized URL between the latest two terminal runs with useful results.

Change types:

- `ADDED_PAGE`
- `REMOVED_PAGE`
- `SEO_CHANGED` for title, description, canonical, or headings
- `CONTENT_CHANGED` when `contentHash` changes
- `PRICE_CHANGED` when normalized price lists differ
- `CTA_CHANGED` when normalized CTA lists differ
- `STATUS_CHANGED` when HTTP status differs

The API computes field-level differences on request. No separate diff table is added in version one.

## API contract

All endpoints require the existing admin JWT middleware.

### Sites

- `GET /api/v1/competitors`
- `POST /api/v1/competitors`
- `PATCH /api/v1/competitors/:id`
- `DELETE /api/v1/competitors/:id`

Deletion is rejected while a crawl is active. Normal deletion cascades historical crawls and snapshots after explicit confirmation in the dashboard.

### Crawls

- `POST /api/v1/competitors/:id/crawls` → HTTP 202
- `GET /api/v1/competitors/:id/crawls`
- `GET /api/v1/competitor-crawls/:crawlId`
- `GET /api/v1/competitor-crawls/:crawlId/pages`
- `GET /api/v1/competitor-crawls/:crawlId/changes`

Page query parameters: `search`, `classification`, `changedOnly`, `statusCode`, `page`, and `limit` capped at 100.

## Admin interface

Add `#/competitors` to the existing hash router and navigation.

### Competitor list

- Name and hostname.
- Active status.
- Latest crawl status/time.
- Extracted page count.
- “Jalankan Crawl” action.
- Add/edit/deactivate/delete actions.

### Competitor detail

- Current run progress and counters.
- Latest summary cards: pages, service pages, detected prices, changed pages, failures.
- `Halaman` table with URL, classification, title, status, prices, and scrape time.
- `Perubahan` table grouped by change type with before/after values.
- Previous crawl selector for historical inspection.

The dashboard polls every five seconds only while a crawl is `PENDING` or `RUNNING`.

## Safety and crawl etiquette

- `ROBOTSTXT_OBEY = true`.
- AutoThrottle enabled.
- `DOWNLOAD_DELAY = 1.0` second minimum.
- `CONCURRENT_REQUESTS_PER_DOMAIN = 2`.
- `AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0`.
- User-Agent identifies EasyLegal's competitor research crawler and includes a contact URL/email configured through environment variables.
- No cookies are persisted between crawl runs.
- Retry only transient HTTP/network failures with a low bounded retry count.
- Respect 429 and 503 responses; AutoThrottle must not speed up on errors.

## SSRF and network controls

URL validation occurs both in the Node API and immediately before every worker request.

Reject:

- Schemes other than HTTP/HTTPS.
- URLs containing credentials.
- `localhost` and single-label hostnames.
- Loopback, private, link-local, multicast, reserved, and unspecified IPv4/IPv6 addresses.
- Hostnames that resolve to blocked addresses.
- Redirects to blocked addresses or outside the registered hostname scope.
- Non-standard ports unless explicitly allowed by future configuration.

DNS must be resolved again at request time to reduce DNS rebinding risk.

## Deployment

Add `competitor-scraper` to `docker-compose.infra.dokploy.yml`:

- Python 3.12 slim image.
- Dependencies pinned in `requirements.txt`.
- Existing `DATABASE_URL` passed through environment.
- No public ports or Traefik labels.
- Connected to the existing `dokploy-network` and `easylegal` networks only as required for PostgreSQL access.
- Memory and CPU limits applied through deployment configuration.
- `restart: unless-stopped`.

Initial Python dependencies:

- `Scrapy`
- `psycopg[binary]`

No Scrapy browser integration, Scrapyd, Redis client, or task queue package.

## Observability

- Structured worker logs include crawl ID, competitor ID, hostname, URL count, status, and duration.
- Do not log page body text or database credentials.
- Persist bounded Scrapy stats in `CompetitorCrawl.stats`.
- API health remains independent of worker health.
- Dashboard visibly distinguishes queued, running, partial, failed, and stale-worker failures.

## Error handling

- Invalid target: reject before creating a job.
- robots.txt denial: record failed/partial run with a clear reason.
- Sitemap unavailable: continue from the base URL.
- Individual page failure: increment `pagesFailed`; continue crawl.
- Database write failure: terminate run as failed to avoid misleading partial persistence.
- Worker termination: stale-job recovery marks the run failed on restart.
- Dynamic page: save metadata available from HTML and classify `UNSUPPORTED_DYNAMIC` when main content is effectively empty.

## Validation

### Unit checks

- URL normalization and blocked-network validation, including redirect targets and IPv6.
- Price extraction and normalization.
- CTA extraction and bounds.
- Main-text extraction fallbacks.
- Content hashing stability.
- Crawl state transitions and one-active-run invariant.
- Snapshot diff classification.

### Integration checks

- Local fixture site with robots, sitemap index, pagination, duplicate URLs, redirects, prices, and malformed pages.
- Worker claims one pending job and persists snapshots.
- API returns status, paginated pages, and diffs.
- Failed and partial crawls preserve accurate counters.

### End-to-end smoke

1. Add the local fixture competitor through the dashboard.
2. Start a crawl.
3. Observe `PENDING → RUNNING → SUCCEEDED`.
4. Confirm SEO fields, price strings, and CTAs in the dashboard.
5. Modify the fixture and run again.
6. Confirm added, removed, SEO, price, CTA, and content changes.

No test targets a real competitor domain. Production smoke uses one explicitly approved public domain with conservative limits.

## Migration and rollback

Migration adds only new tables and enums; existing application data is unchanged.

Rollback order:

1. Stop and remove `competitor-scraper`.
2. Remove dashboard route/navigation and API routes.
3. Keep tables temporarily if historical data must be retained.
4. Drop new tables/enums only after confirming no retained data is required.

Because the worker has no public route and the feature is admin-only, deployment can be staged: database migration, API, worker, then dashboard.

## Acceptance criteria

- Admin can add a safe public competitor origin.
- Admin can start one manual crawl per competitor at a time.
- API returns immediately with a crawl ID.
- Worker respects robots, same-domain scope, page/depth/time limits, and throttling.
- A 500-page crawl does not block or restart the Node API.
- Successful crawl results appear in the admin dashboard.
- A second crawl shows field-level page changes against the previous useful run.
- JavaScript-only pages are identified without installing a browser runtime.
- Private/internal network targets and unsafe redirects are rejected.
- Existing web, API, and dashboard builds continue to pass.

## Primary references

- Scrapy overview and asynchronous crawl model: https://docs.scrapy.org/en/latest/intro/overview.html
- Scrapy architecture and item pipelines: https://docs.scrapy.org/en/latest/topics/architecture.html
- Running Scrapy inside applications and reactor constraints: https://docs.scrapy.org/en/latest/topics/practices.html#run-scrapy-from-a-script
- AutoThrottle behavior and settings: https://docs.scrapy.org/en/latest/topics/autothrottle.html
- Scrapy deployment options: https://docs.scrapy.org/en/latest/topics/deploy.html
