/**
 * Deduplication Service — keyword overlap for article similarity detection
 * Uses cosine similarity on keyword frequency vectors (no ML model required).
 */
import { prisma } from "../../lib/prisma";

const STOP_WORDS = new Set([
  "dan", "yang", "di", "ke", "dari", "untuk", "ini", "itu", "dengan", "pada",
  "adalah", "akan", "juga", "atau", "tidak", "sudah", "karena", "sehingga",
  "the", "and", "is", "in", "to", "for", "of", "a", "an", "with", "as",
  "at", "by", "or", "on", "it", "its", "this", "that", "are", "was", "been",
]);

function extractKeywords(text: string): Map<string, number> {
  return text.toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u024f\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w))
    .reduce((map, w) => { map.set(w, (map.get(w) || 0) + 1); return map; }, new Map<string, number>());
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, magA = 0, magB = 0;
  for (const [k, va] of a) {
    const vb = b.get(k) || 0;
    dot += va * vb;
    magA += va * va;
    magB += vb * vb;
  }
  return (magA === 0 || magB === 0) ? 0 : dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export interface DedupResult {
  similarity: number;
  matchedSlug: string;
  matchedTitle: string;
}

export async function checkDeduplication(params: {
  title: string;
  excerpt: string;
  content: string;
  site: string;
  existingSlug?: string;
  threshold?: number;
}): Promise<{ risk: "low" | "medium" | "high"; results: DedupResult[] }> {
  const { title, excerpt, content, site, existingSlug, threshold = 0.55 } = params;
  const draftKeywords = extractKeywords([title, excerpt, content].filter(Boolean).join(" "));

  const existing = await prisma.article.findMany({
    where: { site, status: "published", ...(existingSlug ? { slug: { not: existingSlug } } : {}) },
    select: { id: true, slug: true, title: true, excerpt: true, content: true },
    take: 10,
    orderBy: { publishedAt: "desc" },
  });

  const results: DedupResult[] = [];
  for (const article of existing) {
    const artKeywords = extractKeywords([article.title, article.excerpt, article.content].filter(Boolean).join(" "));
    const sim = cosineSimilarity(draftKeywords, artKeywords);
    if (sim >= threshold) {
      results.push({
        similarity: Math.round(sim * 100) / 100,
        matchedSlug: article.slug,
        matchedTitle: article.title,
      });
    }
  }

  results.sort((a, b) => b.similarity - a.similarity);

  let risk: "low" | "medium" | "high" = "low";
  if (results.length > 0) risk = results.some((r) => r.similarity >= 0.75) ? "high" : "medium";

  return { risk, results };
}
