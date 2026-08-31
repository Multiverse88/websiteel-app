-- Adds a domain axis to the WA rotator's page override: existing rows get
-- domain = "" (applies to every domain, matching their current behavior)
-- and the unique constraint moves from (path, ctaId) to (path, ctaId,
-- domain) so a page/button can now have a separate override per domain
-- (e.g. easylegal.biz.id vs easylegal.co.id) alongside an "all domains" row.
ALTER TABLE "WhatsAppPageConfig" ADD COLUMN "domain" TEXT NOT NULL DEFAULT '';

DROP INDEX "WhatsAppPageConfig_path_ctaId_key";

CREATE UNIQUE INDEX "WhatsAppPageConfig_path_ctaId_domain_key" ON "WhatsAppPageConfig"("path", "ctaId", "domain");
