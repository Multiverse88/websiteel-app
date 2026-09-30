-- CreateEnum
CREATE TYPE "CrawlStatus" AS ENUM ('PENDING', 'RUNNING', 'SUCCEEDED', 'PARTIAL', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PageClassification" AS ENUM ('CONTENT', 'SERVICE', 'ARTICLE', 'OTHER', 'UNSUPPORTED_DYNAMIC');

-- CreateTable
CREATE TABLE "CompetitorSite" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "hostname" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitorSite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompetitorSite_hostname_key" ON "CompetitorSite"("hostname");
CREATE INDEX "CompetitorSite_hostname_idx" ON "CompetitorSite"("hostname");
CREATE INDEX "CompetitorSite_isActive_idx" ON "CompetitorSite"("isActive");

-- CreateTable
CREATE TABLE "CompetitorCrawl" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "status" "CrawlStatus" NOT NULL DEFAULT 'PENDING',
    "requestedByUserId" TEXT,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "pagesDiscovered" INTEGER NOT NULL DEFAULT 0,
    "pagesScraped" INTEGER NOT NULL DEFAULT 0,
    "pagesFailed" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "stats" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitorCrawl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CompetitorCrawl_competitorId_createdAt_idx" ON "CompetitorCrawl"("competitorId", "createdAt");
CREATE INDEX "CompetitorCrawl_status_createdAt_idx" ON "CompetitorCrawl"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "CompetitorCrawl" ADD CONSTRAINT "CompetitorCrawl_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "CompetitorSite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "CompetitorPageSnapshot" (
    "id" TEXT NOT NULL,
    "crawlId" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "contentType" TEXT,
    "canonicalUrl" TEXT,
    "title" TEXT,
    "metaDescription" TEXT,
    "h1" TEXT,
    "headings" JSONB NOT NULL DEFAULT '[]',
    "mainText" TEXT,
    "priceTexts" JSONB NOT NULL DEFAULT '[]',
    "ctas" JSONB NOT NULL DEFAULT '[]',
    "contentHash" TEXT NOT NULL,
    "classification" "PageClassification" NOT NULL DEFAULT 'CONTENT',
    "scrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitorPageSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompetitorPageSnapshot_crawlId_url_key" ON "CompetitorPageSnapshot"("crawlId", "url");
CREATE INDEX "CompetitorPageSnapshot_competitorId_url_idx" ON "CompetitorPageSnapshot"("competitorId", "url");
CREATE INDEX "CompetitorPageSnapshot_crawlId_classification_idx" ON "CompetitorPageSnapshot"("crawlId", "classification");

-- AddForeignKey
ALTER TABLE "CompetitorPageSnapshot" ADD CONSTRAINT "CompetitorPageSnapshot_crawlId_fkey" FOREIGN KEY ("crawlId") REFERENCES "CompetitorCrawl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
