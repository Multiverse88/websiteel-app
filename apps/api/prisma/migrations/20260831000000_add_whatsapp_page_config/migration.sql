-- Per-page override for the WhatsApp rotator: custom autotext and/or a
-- restricted number pool for one page, keyed by the same page-path string
-- getWhatsAppLink() clicks already send as `product`.
CREATE TABLE "WhatsAppPageConfig" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "message" TEXT,
    "numberIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhatsAppPageConfig_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WhatsAppPageConfig_path_key" ON "WhatsAppPageConfig"("path");
