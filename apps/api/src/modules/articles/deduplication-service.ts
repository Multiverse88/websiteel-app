/**
 * Deduplication Service — compares title, excerpt, and article body against
 * every stored article on the same site using Postgres pg_trgm.
 */
import { prisma } from "../../lib/prisma";

export interface DedupResult {
  similarity: number;
  titleSimilarity: number;
  excerptSimilarity: number;
  contentSimilarity: number;
  matchedSlug: string;
  matchedTitle: string;
}

export function classifyDuplicateRisk(results: DedupResult[]): "low" | "medium" | "high" {
  if (results.some((result) =>
    result.titleSimilarity >= 0.75
    || result.excerptSimilarity >= 0.85
    || result.contentSimilarity >= 0.72
  )) return "high";
  return results.length > 0 ? "medium" : "low";
}

export async function checkDeduplication(params: {
  title: string;
  excerpt?: string;
  content?: string;
  site: string;
  existingSlug?: string;
  threshold?: number;
}): Promise<{ risk: "low" | "medium" | "high"; results: DedupResult[]; candidates: DedupResult[] }> {
  const { title, excerpt = "", content = "", site, existingSlug, threshold = 0.4 } = params;
  const cleanTitle = (title || "").trim();
  const cleanExcerpt = excerpt.trim().slice(0, 2000);
  const cleanContent = content.trim().slice(0, 6000);

  if (!cleanTitle) {
    return { risk: "low", results: [], candidates: [] };
  }

  const rows = await prisma.$queryRaw<Array<{
    slug: string;
    title: string;
    score: number;
    title_score: number;
    excerpt_score: number;
    content_score: number;
  }>>`
    WITH similarity_scores AS (
      SELECT
        slug,
        title,
        similarity(LOWER(title), LOWER(${cleanTitle}))::float AS title_score,
        CASE
          WHEN ${cleanExcerpt} = '' THEN 0
          ELSE similarity(LOWER(LEFT(excerpt, 2000)), LOWER(${cleanExcerpt}))::float
        END AS excerpt_score,
        CASE
          WHEN ${cleanContent} = '' THEN 0
          ELSE similarity(LOWER(LEFT(content, 6000)), LOWER(${cleanContent}))::float
        END AS content_score
      FROM "Article"
      WHERE site = ${site}
        AND (${existingSlug || null}::text IS NULL OR slug != ${existingSlug || ""})
    )
    SELECT
      slug,
      title,
      title_score,
      excerpt_score,
      content_score,
      GREATEST(title_score, excerpt_score, content_score)::float AS score
    FROM similarity_scores
    ORDER BY score DESC
    LIMIT 10
  `;

  const candidates: DedupResult[] = rows.map((row) => ({
    similarity: Math.round(row.score * 100) / 100,
    titleSimilarity: Math.round(row.title_score * 100) / 100,
    excerptSimilarity: Math.round(row.excerpt_score * 100) / 100,
    contentSimilarity: Math.round(row.content_score * 100) / 100,
    matchedSlug: row.slug,
    matchedTitle: row.title,
  }));
  const results = candidates.filter((result) => result.similarity >= threshold);

  return { risk: classifyDuplicateRisk(results), results, candidates };
}
