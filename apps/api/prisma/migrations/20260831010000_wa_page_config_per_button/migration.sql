-- Adds per-button granularity to the WA rotator's page override: existing
-- rows get ctaId = "" (whole-page override, matching their current
-- behavior) and the unique constraint moves from (path) to (path, ctaId) so
-- a page can now have both a whole-page row and any number of
-- button-specific rows alongside it.
ALTER TABLE "WhatsAppPageConfig" ADD COLUMN "ctaId" TEXT NOT NULL DEFAULT '';

DROP INDEX "WhatsAppPageConfig_path_key";

CREATE UNIQUE INDEX "WhatsAppPageConfig_path_ctaId_key" ON "WhatsAppPageConfig"("path", "ctaId");
