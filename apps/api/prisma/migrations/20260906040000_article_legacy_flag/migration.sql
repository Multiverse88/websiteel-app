-- Distinguishes the pre-multi-site-split seed articles (site:
-- "easylegal.biz.id" by default, ~200 rows) from new articles a dashboard
-- user explicitly targets at "easylegal.biz.id" via the Site selector.
-- Without this flag both cases share the exact same site value and are
-- indistinguishable, so a brand-new biz.id-targeted post was incorrectly
-- broadcast to co.id/easylegal.id too (same "legacy inclusion" behavior
-- meant only for the old pre-split articles).
ALTER TABLE "Article" ADD COLUMN "legacy" BOOLEAN NOT NULL DEFAULT false;

-- One-time backfill: everything that already has site="easylegal.biz.id"
-- at the time this migration runs predates the per-domain Site selector
-- feature entirely, so it's unambiguously legacy. Anything inserted after
-- this point defaults to legacy=false per the schema default above.
UPDATE "Article" SET "legacy" = true WHERE "site" = 'easylegal.biz.id';
