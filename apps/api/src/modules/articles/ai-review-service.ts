import OpenAI from "openai";
import { prisma } from "../../lib/prisma";

export interface AIReviewResult {
  seoScore: number;
  titleScore: "excellent" | "good" | "needs-improvement" | "poor";
  titleReason: string;
  metaScore: "excellent" | "good" | "needs-improvement" | "poor";
  metaReason: string;
  contentScore: "excellent" | "good" | "needs-improvement" | "poor";
  contentReason: string;
  readabilityScore: number;
  duplicateRisk: "low" | "medium" | "high";
  similarArticles: Array<{ title: string; slug: string; similarity: number }>;
  suggestions: string[];
  recommendedTitle?: string;
  recommendedMetaDescription?: string;
  targetKeyword?: string;
}

function getAIClient(): OpenAI {
  const apiKey = process.env.AI_ROUTER_API_KEY;
  const baseURL = process.env.AI_ROUTER_BASE_URL;

  if (!apiKey) {
    throw new Error("AI_ROUTER_API_KEY is required");
  }

  return new OpenAI({
    apiKey,
    ...(baseURL ? { baseURL } : {}),
  });
}

async function parseAIResponse(raw: string): Promise<AIReviewResult> {
  try {
    const cleaned = raw.trim().replace(/```json\s*/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleaned) as AIReviewResult;
  } catch {
    return {
      seoScore: 50,
      titleScore: "needs-improvement",
      titleReason: "Could not parse AI response",
      metaScore: "needs-improvement",
      metaReason: "Could not parse AI response",
      contentScore: "needs-improvement",
      contentReason: "Could not parse AI response",
      readabilityScore: 50,
      duplicateRisk: "medium",
      similarArticles: [],
      suggestions: ["Review the article manually for SEO improvements"],
    };
  }
}

export async function getAIReview(params: {
  title: string;
  excerpt: string;
  content: string;
  site: string;
  keyword?: string;
  existingSlug?: string;
}): Promise<AIReviewResult> {
  const { title, excerpt, content, site, keyword, existingSlug } = params;
  const fullText = [title, excerpt, content].filter(Boolean).join(" ").slice(0, 3000);

  let similarArticles: Array<{ title: string; slug: string }> = [];
  try {
    similarArticles = await prisma.article.findMany({
      where: { site, status: "published", ...(existingSlug ? { slug: { not: existingSlug } } : {}) },
      select: { title: true, slug: true },
      take: 5,
      orderBy: { publishedAt: "desc" },
    });
  } catch { /* non-fatal */ }

  const similarContext = similarArticles.length > 0
    ? `\nExisting articles on this site:\n${similarArticles.map((a, i) => `${i + 1}. "${a.title}" (${a.slug})`).join("\n")}`
    : "";

  const prompt = `You are an expert SEO and legal-content analyst. Score the article draft below.

ARTICLE:
Title: "${title}"
Excerpt: "${excerpt}"
Content preview: ${fullText.slice(0, 1500)}
Target keyword: ${keyword || "auto-detect"}
Site: ${site}${similarContext}

Return ONLY valid JSON (no markdown fences):
{
  "seoScore": <0-100>,
  "titleScore": "excellent|good|needs-improvement|poor",
  "titleReason": "<brief reason>",
  "metaScore": "excellent|good|needs-improvement|poor",
  "metaReason": "<brief reason>",
  "contentScore": "excellent|good|needs-improvement|poor",
  "contentReason": "<brief reason>",
  "readabilityScore": <0-100>,
  "duplicateRisk": "low|medium|high",
  "similarArticles": [],
  "suggestions": ["<tip 1>", "<tip 2>", "<tip 3>"],
  "recommendedTitle": "<optional>",
  "recommendedMetaDescription": "<optional, max 160 chars>",
  "targetKeyword": "<detected keyword>"
}`;

  const client = getAIClient();
  const model = process.env.AI_ROUTER_MODEL_REVIEW || "ArticleAI";

  const resp = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    max_tokens: 800,
  });

  const raw = resp.choices[0]?.message?.content || "{}";
  return parseAIResponse(raw);
}
