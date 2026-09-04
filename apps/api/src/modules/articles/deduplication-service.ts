/**
 * Deduplication Service — title similarity via Postgres pg_trgm.
 * ponytail: adds content/excerpt weighting when false positives appear.
 */
import { prisma } from "../../lib/prisma";

export interface DedupResult {
  similarity: number;
  matchedSlug: string;
  matchedTitle: string;
}

export async function checkDeduplication(params: {
  title: string;
  excerpt?: string;
  content?: string;
  site: string;
  existingSlug?: string;
  threshold?: number;
}): Promise<{ risk: "low" | "medium" | "high"; results: DedupResult[] }> {
  const { title, site, existingSlug, threshold = 0.4 } = params;
  const cleanTitle = (title || "").trim();

  if (!cleanTitle) {
    return { risk: "low", results: [] };
  }

  const rows = await prisma.$queryRaw<Array<{ slug: string; title: string; score: number }>>`
    SELECT
      slug,
      title,
      similarity(title, ${cleanTitle})::float AS score
    FROM "Article"
    WHERE site = ${site}
      AND status = 'published'
      AND (${existingSlug || null}::text IS NULL OR slug != ${existingSlug || ""})
      AND similarity(title, ${cleanTitle}) >= ${threshold}
    ORDER BY score DESC
    LIMIT 10
  `;

  const results: DedupResult[] = rows.map((row) => ({
    similarity: Math.round(row.score * 100) / 100,
    matchedSlug: row.slug,
    matchedTitle: row.title,
  }));

  let risk: "low" | "medium" | "high" = "low";
  if (results.length > 0) {
    risk = results.some((r) => r.similarity >= 0.75) ? "high" : "medium";
  }

  return { risk, results };
}
