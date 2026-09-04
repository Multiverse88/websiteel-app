import OpenAI from "openai";
import { prisma } from "../../lib/prisma";

export interface AIReviewResult {
  guidance: Array<{
    field: "title" | "excerpt" | "content" | "keyword";
    severity: "suggestion" | "warning";
    message: string;
  }>;
  suggestions: string[];
  recommendedTitle: string;
  recommendedMetaDescription: string;
  recommendedOutline: string[];
  exampleParagraph: string;
  targetKeyword: string;
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

const guidanceFields = ["title", "excerpt", "content", "keyword"] as const;
const guidanceSeverities = ["suggestion", "warning"] as const;

function fallbackReview(): AIReviewResult {
  return {
    guidance: [],
    suggestions: ["Buat judul lebih spesifik, tulis kutipan yang menjelaskan manfaat, lalu pecah isi artikel menjadi beberapa subjudul."],
    recommendedTitle: "",
    recommendedMetaDescription: "",
    recommendedOutline: [],
    exampleParagraph: "",
    targetKeyword: "",
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
  if (!Array.isArray(parsed.guidance) && !Array.isArray(parsed.suggestions) && typeof parsed.recommendedTitle !== "string") {
    throw new Error("AI review response does not contain actionable suggestions");
  }

  const fallback = fallbackReview();

  return {
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
    suggestions: Array.isArray(parsed.suggestions)
      ? parsed.suggestions.filter((item: unknown) => typeof item === "string" && item.trim()).slice(0, 5)
      : fallback.suggestions,
    recommendedTitle: typeof parsed.recommendedTitle === "string" ? parsed.recommendedTitle.trim() : "",
    recommendedMetaDescription: typeof parsed.recommendedMetaDescription === "string" ? parsed.recommendedMetaDescription.trim() : "",
    recommendedOutline: Array.isArray(parsed.recommendedOutline)
      ? parsed.recommendedOutline.filter((item: unknown) => typeof item === "string" && item.trim()).slice(0, 7)
      : [],
    exampleParagraph: typeof parsed.exampleParagraph === "string" ? parsed.exampleParagraph.trim() : "",
    targetKeyword: typeof parsed.targetKeyword === "string" ? parsed.targetKeyword.trim() : "",
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

  const prompt = `You are a proactive Indonesian writing companion for legal-business articles. Read the draft and return ONLY concrete, ready-to-use writing suggestions. Do not give scores, grades, diagnoses, criticism, or general opinions. Show the writer exactly what a better title, meta description, keyword, article structure, and example paragraph could look like. All text MUST use natural Indonesian and must remain legally cautious—do not invent regulations, prices, deadlines, or guarantees.

ARTICLE:
Title: "${title}"
Excerpt: "${excerpt}"
Content preview: ${fullText.slice(0, 1500)}
Target keyword: ${keyword || "auto-detect"}
Site: ${site}${similarContext}

Return ONLY valid JSON (no markdown fences):
{
  "guidance": [
    {
      "field": "title|excerpt|content|keyword",
      "severity": "suggestion|warning",
      "message": "<saran siap pakai; sertakan contoh pengganti yang konkret, bukan sekadar menjelaskan kekurangan>"
    }
  ],
  "suggestions": ["<3 saran praktis dan spesifik>"],
  "recommendedTitle": "<satu contoh judul siap pakai, idealnya 30-60 karakter>",
  "recommendedMetaDescription": "<satu contoh kutipan siap pakai, idealnya 120-160 karakter>",
  "recommendedOutline": ["<4-7 contoh subjudul artikel tanpa tanda ###>"],
  "exampleParagraph": "<contoh pengembangan isi 2-4 kalimat yang sesuai dengan draft>",
  "targetKeyword": "<detected keyword>"
}`;

  const client = getAIClient();
  const model = process.env.AI_ROUTER_MODEL_REVIEW || "ArticleAI";

  const resp = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    max_tokens: 1200,
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
      max_tokens: 1400,
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
