# APOS-007 — Competitor Scraper Feature

- **Owner**: fullstackiteasylegal
- **Status**: Completed
- **Priority**: High
- **Type**: Significant (architecture addition: Python Scrapy worker + PostgreSQL queue + Express API + React dashboard)
- **Scope**: `apps/api`, `apps/scraper`, `infra/admin-dashboard`, `docker-compose.infra.dokploy.yml`
- **References**: `docs/superpowers/specs/2026-09-29-competitor-scraper-design.md`

## Scope
Menerapkan fitur internal untuk admin EasyLegal guna memonitor website kompetitor secara berkala atau on-demand dengan Scrapy:
1. Skema database: model `CompetitorSite`, `CompetitorCrawl`, `CompetitorPageSnapshot`, enum `CrawlStatus`, `PageClassification`.
2. Worker Python Scrapy (`apps/scraper`) yang mengkonsumsi antrean `PENDING` dari database PostgreSQL, menghormati `robots.txt`, autothrottle, SSRF guard, dan menyimpan snapshot terstruktur.
3. REST API di `apps/api` untuk CRUD competitor site, trigger crawl job manual (HTTP 202), status job, daftar halaman snapshot, dan kalkulasi diff antar-crawl.
4. UI admin di `infra/admin-dashboard` (`#/competitors` dan `#/competitors/:id`) untuk input domain, trigger crawl, melihat progres run, daftar halaman hasil scrape, dan highlight perubahan SEO/harga/CTA.
5. Konfigurasi deployment container `competitor-scraper` di `docker-compose.infra.dokploy.yml`.

## Acceptance Criteria
- [x] Model Prisma terdefinisi, Prisma Client ter-generate, dan migration SQL tersedia.
- [x] Scrapy spider meng-crawl halaman same-domain lewat sitemap & internal link dengan limit (max 500 pages, depth 5, timeout 20 min).
- [x] Ekstraksi SEO (title, meta, h1, headings, mainText) dan service signals (harga Rp/IDR, CTA) tersimpan ke database.
- [x] Safe URL validation menolak IP lokal/private, non-HTTP/HTTPS, dan redirect lintas domain.
- [x] Express API mengekspos endpoint kompetitor, job creation, snapshots, dan diff.
- [x] Admin dashboard menampilkan daftar kompetitor, detail crawl, tabel snapshot dengan filter, dan tabel perubahan.
- [x] Typecheck dan build berhasil pada API dan dashboard.
- [x] Unit & integration tests menguji safety check, extraction parser, diff logic, dan API routes.

## Validation
- `python3 tests/test_runner.py` di `apps/scraper`: 6 tests passing (URL guard, extractor, spider parse, pipeline dry run).
- `npm test` di `apps/api`: 40 tests passing (including crawl diff computation and competitor URL safety validation).
- `npm run build` di `apps/api`: berhasil tanpa error TypeScript.
- `npm run build` di `infra/admin-dashboard`: berhasil tanpa error TypeScript/Vite.
- `npm run test:docker-context` dan `test:wa-inventory`: PASS.

## 2026-09-30 — Sitemap Metadata Fix
- Scrapy 2.13+ now starts through `async def start()` and requests `/sitemap.xml` first.
- Sitemap URLs are queued separately from parsed URLs, preventing scheduled pages from being skipped before extraction.
- Snapshot output now persists and exposes `keywords` together with URL, title, and H1.
- Invalid or empty sitemaps fall back to same-domain link crawling from the homepage.
- Validation: scraper `43 passed`; API `40 passed` plus TypeScript build; dashboard TypeScript/Vite build; real crawl of `legalitas.org` produced 18 snapshots with URL, title, H1, and keywords.
