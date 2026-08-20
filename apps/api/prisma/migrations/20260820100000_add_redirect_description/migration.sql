-- AlterTable: optional share-preview text shown to link-preview crawlers
-- (WhatsApp/Facebook/etc.) instead of falling through to the destination
-- page's own OG tags. NULL = fall back to normal instant redirect behavior.
ALTER TABLE "Redirect" ADD COLUMN "description" TEXT;
