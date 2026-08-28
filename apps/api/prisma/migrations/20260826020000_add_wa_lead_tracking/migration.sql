-- Lead tracking on top of the WA rotator: each click gets a leadCode
-- embedded in the WA message text, and a status lifecycle up to closing.
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'NEGOTIATING', 'CLOSED_WON', 'CLOSED_LOST');

ALTER TABLE "WhatsAppClick"
  ADD COLUMN "leadCode" TEXT,
  ADD COLUMN "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
  ADD COLUMN "notes" TEXT,
  ADD COLUMN "source" TEXT,
  ADD COLUMN "product" TEXT,
  ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill existing rows (pre-dating this feature) with a unique code so
-- the column can be made NOT NULL + UNIQUE.
UPDATE "WhatsAppClick" SET "leadCode" = 'EL-' || upper(substr(md5(random()::text || id), 1, 6)) WHERE "leadCode" IS NULL;

ALTER TABLE "WhatsAppClick" ALTER COLUMN "leadCode" SET NOT NULL;
CREATE UNIQUE INDEX "WhatsAppClick_leadCode_key" ON "WhatsAppClick"("leadCode");
CREATE INDEX "WhatsAppClick_status_idx" ON "WhatsAppClick"("status");
CREATE INDEX "WhatsAppClick_source_idx" ON "WhatsAppClick"("source");
CREATE INDEX "WhatsAppClick_product_idx" ON "WhatsAppClick"("product");
