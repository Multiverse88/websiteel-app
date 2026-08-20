-- AlterTable
ALTER TABLE "Redirect" ADD COLUMN "domain" TEXT NOT NULL DEFAULT 'easylegal.my.id';

-- DropIndex
DROP INDEX "Redirect_slug_key";

-- DropIndex
DROP INDEX "Redirect_slug_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_domain_slug_key" ON "Redirect"("domain", "slug");

-- CreateIndex
CREATE INDEX "Redirect_domain_slug_idx" ON "Redirect"("domain", "slug");
