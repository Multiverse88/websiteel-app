-- "Interested Service" (see CONTEXT.md): the actual WA message text per
-- click, more specific than "product" (page path) alone — distinguishes
-- multiple packages/buttons on the same page.
ALTER TABLE "WhatsAppClick" ADD COLUMN "service" TEXT;
