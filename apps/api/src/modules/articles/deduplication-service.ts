/**
 * Deduplication Service — compares title, excerpt, article body, and
 * focus keyword against every stored article on the same site.
 * Uses Postgres pg_trgm for text similarity and keyword matching
 * to detect both duplicate content and keyword cannibalization.
 */
import { prisma } from "../../lib/prisma";

export interface DedupResult {
  similarity: number;
  titleSimilarity: number;
  excerptSimilarity: number;
  contentSimilarity: number;
  matchedSlug: string;
  matchedTitle: string;
  /** true when both articles target the same or very similar focus keyword */
  keywordCannibalization: boolean;
  /** the matched article's focus keyword (if any) */
  matchedFocusKeyword: string;
}

export function classifyDuplicateRisk(results: DedupResult[]): "low" | "medium" | "high" {
  if (results.some((result) =>
    result.titleSimilarity >= 0.75
    || result.excerptSimilarity >= 0.85
    || result.contentSimilarity >= 0.72
  )) return "high";
  return results.length > 0 ? "medium" : "low";
}

/** Normalize a keyword for comparison: lowercase, trim, remove extra spaces */
function normalizeKeyword(kw: string): string {
  return kw.toLowerCase().trim().replace(/\s+/g, " ");
}

/** Check if two keywords indicate cannibalization (exact match or one contains the other) */
function keywordsCannibalize(a: string, b: string): boolean {
  if (!a || !b) return false;
  const na = normalizeKeyword(a);
  const nb = normalizeKeyword(b);
  if (na === nb) return true;
  if (na.includes(nb) || nb.includes(na)) return true;
  // Check word overlap: if >70% of words overlap, treat as cannibalization
  const wordsA = na.split(" ");
  const wordsB = nb.split(" ");
  const overlap = wordsA.filter((w) => wordsB.includes(w)).length;
  const minLen = Math.min(wordsA.length, wordsB.length);
  return minLen >= 2 && overlap / minLen >= 0.7;
}

export async function checkDeduplication(params: {
  title: string;
  excerpt?: string;
  content?: string;
  site: string;
  existingSlug?: string;
  threshold?: number;
  focusKeyword?: string;
}): Promise<{ risk: "low" | "medium" | "high"; results: DedupResult[]; candidates: DedupResult[] }> {
  const { title, excerpt = "", content = "", site, existingSlug, threshold = 0.4, focusKeyword } = params;
  const cleanTitle = (title || "").trim();
  const cleanExcerpt = excerpt.trim().slice(0, 2000);
  const cleanContent = content.trim().slice(0, 6000);

  if (!cleanTitle) {
    return { risk: "low", results: [], candidates: [] };
  }

  const rows = await prisma.$queryRaw<Array<{
    slug: string;
    title: string;
    focus_keyword: string | null;
    score: number;
    title_score: number;
    excerpt_score: number;
    content_score: number;
  }>>`
    WITH similarity_scores AS (
      SELECT
        slug,
        title,
        "focusKeyword" AS focus_keyword,
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
      focus_keyword,
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
    keywordCannibalization: keywordsCannibalize(focusKeyword || "", row.focus_keyword || ""),
    matchedFocusKeyword: row.focus_keyword || "",
  }));
  const results = candidates.filter((result) => result.similarity >= threshold);

  // Upgrade risk if keyword cannibalization is detected among close matches
  let risk = classifyDuplicateRisk(results);
  if (risk === "low" && results.some((r) => r.keywordCannibalization && r.similarity >= 0.25)) {
    risk = "medium";
  }

  return { risk, results, candidates };
}
