import OpenAI from "openai";
import { prisma } from "../../lib/prisma";

export interface AIReviewResult {
  opinion: string;
  guidance: Array<{
    field: "title" | "excerpt" | "content" | "keyword";
    severity: "suggestion" | "warning" | "critical";
    message: string;
  }>;
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

const scoreLabels = ["excellent", "good", "needs-improvement", "poor"] as const;
const guidanceFields = ["title", "excerpt", "content", "keyword"] as const;
const guidanceSeverities = ["suggestion", "warning", "critical"] as const;

function fallbackReview(): AIReviewResult {
  return {
    opinion: "Saya belum bisa menyelesaikan analisis AI saat ini. Sambil menunggu pembaruan berikutnya, periksa kembali kejelasan judul, kutipan, dan struktur isi artikel.",
    guidance: [],
    seoScore: 50,
    titleScore: "needs-improvement",
    titleReason: "Judul perlu diperiksa kembali agar lebih jelas dan spesifik.",
    metaScore: "needs-improvement",
    metaReason: "Kutipan perlu diperiksa kembali agar merangkum manfaat utama artikel.",
    contentScore: "needs-improvement",
    contentReason: "Isi artikel perlu diperiksa kembali dari sisi struktur dan keterbacaan.",
    readabilityScore: 50,
    duplicateRisk: "medium",
    similarArticles: [],
    suggestions: ["Periksa kembali judul, kutipan, dan struktur isi artikel."],
  };
}

export async function parseAIResponse(raw: string): Promise<AIReviewResult> {
  const withoutFences = raw
    .trim()
    .replace(/```(?:json)?\s*/gi, "")
    .replace(/```/g, "")
    .trim();
  const firstBrace = withoutFences.indexOf("{");
  const lastBrace = withoutFences.lastIndexOf("}");

  if (firstBrace < 0 || lastBrace <= firstBrace) {
    throw new Error("AI review response does not contain a complete JSON object");
  }

  const parsed = JSON.parse(withoutFences.slice(firstBrace, lastBrace + 1)) as Record<string, any>;
  if (typeof parsed.seoScore !== "number") {
    throw new Error("AI review response is missing seoScore");
  }

  const fallback = fallbackReview();
  const normalizeScore = (value: unknown) => scoreLabels.includes(value as any)
    ? value as AIReviewResult["titleScore"]
    : "needs-improvement";

  return {
    opinion: typeof parsed.opinion === "string" && parsed.opinion.trim() ? parsed.opinion.trim() : fallback.opinion,
    guidance: Array.isArray(parsed.guidance)
      ? parsed.guidance
        .filter((item: any) => item && guidanceFields.includes(item.field) && typeof item.message === "string" && item.message.trim())
        .slice(0, 5)
        .map((item: any) => ({
          field: item.field,
          severity: guidanceSeverities.includes(item.severity) ? item.severity : "suggestion",
          message: item.message.trim(),
        }))
      : [],
    seoScore: Math.max(0, Math.min(100, Math.round(parsed.seoScore))),
    titleScore: normalizeScore(parsed.titleScore),
    titleReason: typeof parsed.titleReason === "string" && parsed.titleReason.trim() ? parsed.titleReason.trim() : fallback.titleReason,
    metaScore: normalizeScore(parsed.metaScore),
    metaReason: typeof parsed.metaReason === "string" && parsed.metaReason.trim() ? parsed.metaReason.trim() : fallback.metaReason,
    contentScore: normalizeScore(parsed.contentScore),
    contentReason: typeof parsed.contentReason === "string" && parsed.contentReason.trim() ? parsed.contentReason.trim() : fallback.contentReason,
    readabilityScore: typeof parsed.readabilityScore === "number" ? Math.max(0, Math.min(100, Math.round(parsed.readabilityScore))) : fallback.readabilityScore,
    duplicateRisk: ["low", "medium", "high"].includes(parsed.duplicateRisk) ? parsed.duplicateRisk : fallback.duplicateRisk,
    similarArticles: Array.isArray(parsed.similarArticles) ? parsed.similarArticles : [],
    suggestions: Array.isArray(parsed.suggestions)
      ? parsed.suggestions.filter((item: unknown) => typeof item === "string" && item.trim()).slice(0, 5)
      : fallback.suggestions,
    recommendedTitle: typeof parsed.recommendedTitle === "string" ? parsed.recommendedTitle.trim() : undefined,
    recommendedMetaDescription: typeof parsed.recommendedMetaDescription === "string" ? parsed.recommendedMetaDescription.trim() : undefined,
    targetKeyword: typeof parsed.targetKeyword === "string" ? parsed.targetKeyword.trim() : undefined,
  };
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

  const prompt = `You are a proactive AI writing companion and an expert SEO and legal-content analyst. Read the draft as a thoughtful editor: give an honest, direct, and helpful opinion without waiting to be asked. All explanatory text MUST be written in natural Indonesian. Score the article draft below.

ARTICLE:
Title: "${title}"
Excerpt: "${excerpt}"
Content preview: ${fullText.slice(0, 1500)}
Target keyword: ${keyword || "auto-detect"}
Site: ${site}${similarContext}

Return ONLY valid JSON (no markdown fences):
{
  "opinion": "<pendapat utama yang langsung, suportif, dan spesifik dalam 1-2 kalimat bahasa Indonesia>",
  "guidance": [
    {
      "field": "title|excerpt|content|keyword",
      "severity": "suggestion|warning|critical",
      "message": "<saran spesifik dalam bahasa Indonesia yang menjelaskan apa yang perlu diperbaiki pada field tersebut>"
    }
  ],
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
    max_tokens: 1400,
  });

  const raw = resp.choices[0]?.message?.content || "{}";
  try {
    return await parseAIResponse(raw);
  } catch (firstError) {
    console.warn("AI review returned invalid JSON; retrying once", {
      finishReason: resp.choices[0]?.finish_reason,
      responseLength: raw.length,
      reason: firstError instanceof Error ? firstError.message : "unknown parse error",
    });

    const retry = await client.chat.completions.create({
      model,
      messages: [{
        role: "user",
        content: `${prompt}\n\nIMPORTANT: The previous attempt was incomplete or invalid. Return one COMPLETE JSON object only. Keep every explanation concise so the response is not truncated.`,
      }],
      temperature: 0.1,
      max_tokens: 1600,
    });
    const retryRaw = retry.choices[0]?.message?.content || "{}";

    try {
      return await parseAIResponse(retryRaw);
    } catch (retryError) {
      console.error("AI review JSON retry failed", {
        finishReason: retry.choices[0]?.finish_reason,
        responseLength: retryRaw.length,
        reason: retryError instanceof Error ? retryError.message : "unknown parse error",
      });
      return fallbackReview();
    }
  }
}
