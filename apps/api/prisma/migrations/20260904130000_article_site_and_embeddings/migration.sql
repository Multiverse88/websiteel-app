-- Adds multi-site support to Article (default = the site every existing
-- row already belongs to) and the ArticleEmbedding table for dedup/semantic
-- search. schema.prisma declared these since commit be56537 but no
-- migration file was ever generated for them, so the DB was still on the
-- old single-site slug-unique shape.
ALTER TABLE "Article" ADD COLUMN "site" TEXT NOT NULL DEFAULT 'easylegal.biz.id';

DROP INDEX "Article_slug_key";

CREATE UNIQUE INDEX "Article_site_slug_key" ON "Article"("site", "slug");
CREATE INDEX "Article_site_status_idx" ON "Article"("site", "status");

CREATE TABLE "ArticleEmbedding" (
    "id" TEXT NOT NULL DEFAULT md5(random()::text || clock_timestamp()::text),
    "articleId" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "embedding" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArticleEmbedding_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ArticleEmbedding_site_publishedAt_idx" ON "ArticleEmbedding"("site", "publishedAt");
CREATE INDEX "ArticleEmbedding_articleId_idx" ON "ArticleEmbedding"("articleId");

ALTER TABLE "ArticleEmbedding" ADD CONSTRAINT "ArticleEmbedding_articleId_fkey"
    FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;
