-- In-house WhatsApp CTA rotator (replaces mauorder.online)
CREATE TABLE "WhatsAppNumber" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "label" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "clickCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WhatsAppNumber_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WhatsAppNumber_number_key" ON "WhatsAppNumber"("number");

CREATE TABLE "WhatsAppClick" (
    "id" TEXT NOT NULL,
    "numberId" TEXT NOT NULL,
    "domain" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WhatsAppClick_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "WhatsAppClick_numberId_idx" ON "WhatsAppClick"("numberId");
CREATE INDEX "WhatsAppClick_createdAt_idx" ON "WhatsAppClick"("createdAt");

ALTER TABLE "WhatsAppClick" ADD CONSTRAINT "WhatsAppClick_numberId_fkey"
  FOREIGN KEY ("numberId") REFERENCES "WhatsAppNumber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
