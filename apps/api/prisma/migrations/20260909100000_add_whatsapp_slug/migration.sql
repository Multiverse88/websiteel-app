-- CreateTable
CREATE TABLE "WhatsAppSlug" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT NOT NULL DEFAULT '',
    "source" TEXT NOT NULL DEFAULT 'direct',
    "message" TEXT,
    "numberIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhatsAppSlug_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WhatsAppSlug_domain_slug_idx" ON "WhatsAppSlug"("domain", "slug");

-- CreateIndex
CREATE INDEX "WhatsAppSlug_slug_idx" ON "WhatsAppSlug"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "WhatsAppSlug_domain_slug_key" ON "WhatsAppSlug"("domain", "slug");
