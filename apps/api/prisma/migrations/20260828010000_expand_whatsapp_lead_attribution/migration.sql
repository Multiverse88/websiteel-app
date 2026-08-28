-- Expand the existing WhatsAppClick lead record without dropping legacy data.
-- Keep the table name for backwards compatibility during the first release.

CREATE TYPE "AttributionChannel" AS ENUM (
  'GOOGLE_ADS', 'META_ADS', 'ORGANIC_SEARCH', 'REFERRAL',
  'DIRECT', 'OTHER', 'UNKNOWN'
);
CREATE TYPE "LeadEventType" AS ENUM (
  'WHATSAPP_CTA_CLICKED', 'WHATSAPP_REDIRECTED', 'CONVERSATION_CONFIRMED',
  'STAGE_CHANGED', 'NOTE_ADDED', 'LEAD_REOPENED'
);

ALTER TYPE "LeadStatus" RENAME TO "LeadStatus_old";
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST');
ALTER TABLE "WhatsAppClick" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "WhatsAppClick"
  ALTER COLUMN "status" TYPE "LeadStatus"
  USING (
    CASE "status"::text
      WHEN 'NEGOTIATING' THEN 'PROPOSAL'
      WHEN 'CLOSED_WON' THEN 'WON'
      WHEN 'CLOSED_LOST' THEN 'LOST'
      ELSE "status"::text
    END
  )::"LeadStatus";
ALTER TABLE "WhatsAppClick" ALTER COLUMN "status" SET DEFAULT 'NEW';
DROP TYPE "LeadStatus_old";

ALTER TABLE "WhatsAppClick"
  ADD COLUMN "sourceCode" TEXT NOT NULL DEFAULT 'unknown',
  ADD COLUMN "channel" "AttributionChannel" NOT NULL DEFAULT 'UNKNOWN',
  ADD COLUMN "referralCode" TEXT,
  ADD COLUMN "utmSource" TEXT,
  ADD COLUMN "utmMedium" TEXT,
  ADD COLUMN "utmCampaign" TEXT,
  ADD COLUMN "utmContent" TEXT,
  ADD COLUMN "utmTerm" TEXT,
  ADD COLUMN "gclid" TEXT,
  ADD COLUMN "fbclid" TEXT,
  ADD COLUMN "entryUrl" TEXT,
  ADD COLUMN "entryPath" TEXT,
  ADD COLUMN "referrerUrl" TEXT,
  ADD COLUMN "ctaId" TEXT,
  ADD COLUMN "ctaLabel" TEXT,
  ADD COLUMN "anonymousSessionId" TEXT,
  ADD COLUMN "deduplicationKey" TEXT,
  ADD COLUMN "lostReason" TEXT,
  ADD COLUMN "orderValue" INTEGER,
  ADD COLUMN "currency" TEXT NOT NULL DEFAULT 'IDR',
  ADD COLUMN "wonAt" TIMESTAMP(3),
  ADD COLUMN "lostAt" TIMESTAMP(3);

UPDATE "WhatsAppClick"
SET
  "sourceCode" = CASE
    WHEN lower(coalesce("source", '')) = 'gads' THEN 'gads'
    WHEN lower(coalesce("source", '')) = 'metaads' THEN 'metaads'
    WHEN lower(coalesce("source", '')) IN ('seo', 'googleseo') THEN 'googleseo'
    WHEN lower(coalesce("source", '')) = 'direct' THEN 'direct'
    ELSE 'unknown'
  END,
  "channel" = CASE
    WHEN lower(coalesce("source", '')) = 'gads' THEN 'GOOGLE_ADS'::"AttributionChannel"
    WHEN lower(coalesce("source", '')) = 'metaads' THEN 'META_ADS'::"AttributionChannel"
    WHEN lower(coalesce("source", '')) IN ('seo', 'googleseo') THEN 'ORGANIC_SEARCH'::"AttributionChannel"
    WHEN lower(coalesce("source", '')) = 'direct' THEN 'DIRECT'::"AttributionChannel"
    ELSE 'UNKNOWN'::"AttributionChannel"
  END;

CREATE TABLE "LeadEvent" (
  "id" TEXT NOT NULL,
  "leadId" TEXT NOT NULL,
  "type" "LeadEventType" NOT NULL,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LeadEvent_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "LeadStageHistory" (
  "id" TEXT NOT NULL,
  "leadId" TEXT NOT NULL,
  "fromStage" "LeadStatus" NOT NULL,
  "toStage" "LeadStatus" NOT NULL,
  "changedByUserId" TEXT,
  "reason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "LeadStageHistory_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "LeadEvent" ADD CONSTRAINT "LeadEvent_leadId_fkey"
  FOREIGN KEY ("leadId") REFERENCES "WhatsAppClick"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "LeadStageHistory" ADD CONSTRAINT "LeadStageHistory_leadId_fkey"
  FOREIGN KEY ("leadId") REFERENCES "WhatsAppClick"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "WhatsAppClick_channel_createdAt_idx" ON "WhatsAppClick"("channel", "createdAt");
CREATE INDEX "WhatsAppClick_referralCode_createdAt_idx" ON "WhatsAppClick"("referralCode", "createdAt");
CREATE INDEX "WhatsAppClick_deduplicationKey_createdAt_idx" ON "WhatsAppClick"("deduplicationKey", "createdAt");
CREATE INDEX "LeadEvent_leadId_createdAt_idx" ON "LeadEvent"("leadId", "createdAt");
CREATE INDEX "LeadEvent_type_createdAt_idx" ON "LeadEvent"("type", "createdAt");
CREATE INDEX "LeadStageHistory_leadId_createdAt_idx" ON "LeadStageHistory"("leadId", "createdAt");
