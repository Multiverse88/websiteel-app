-- Per-article FAQ list, rendered at the end of the article via the shared <FAQ> component.
ALTER TABLE "Article" ADD COLUMN "faq" JSONB;
