import OpenAI from "openai";
import { checkDeduplication, type DedupResult } from "./deduplication-service";

export interface AIReviewResult {
  guidance: Array<{
    field: "title" | "excerpt" | "content" | "keyword";
    severity: "suggestion" | "warning";
    message: string;
    location: string;
    problem: string;
    action: string;
    example: string;
    reason: string;
  }>;
  suggestions: string[];
  recommendedTitle: string;
  recommendedMetaDescription: string;
  recommendedOutline: string[];
  exampleParagraph: string;
  targetKeyword: string;
  editOperations: Array<{
    id: string;
    field: "title" | "excerpt" | "content" | "keyword";
    operation: "replace" | "insert_after" | "delete";
    targetText: string;
    replacementText: string;
    reason: string;
  }>;
  contentGaps: Array<{
    topic: string;
    location: string;
    whyNeeded: string;
    suggestedContent: string;
  }>;
  verificationNeeded: Array<{
    claim: string;
    location: string;
    requiredSource: string;
  }>;
  seoSupport: {
    searchIntent: string;
    recommendedSlug: string;
    indexingSuggestions: Array<{
      area: string;
      currentIssue: string;
      action: string;
      implementation: string;
      expectedResult: string;
    }>;
    internalLinks: Array<{
      anchorText: string;
      targetTitle: string;
      targetSlug: string;
    }>;
    faqSuggestions: Array<{
      question: string;
      answer: string;
    }>;
  };
  duplicateCheck: {
    risk: "low" | "medium" | "high";
    blocked: boolean;
    results: DedupResult[];
  };
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
const reviewModes = ["complete", "seo", "legal", "readability", "conversion"] as const;

export type AIReviewMode = typeof reviewModes[number];
type AIEditOperation = AIReviewResult["editOperations"][number];

export function filterSafeEditOperations(
  edits: AIEditOperation[],
  sources: Record<"title" | "excerpt" | "content" | "keyword", string>,
): AIEditOperation[] {
  return edits
    .filter((edit) => {
      const source = sources[edit.field];
      const firstMatch = source.indexOf(edit.targetText);
      const isUniqueExactTarget = firstMatch >= 0 && source.indexOf(edit.targetText, firstMatch + edit.targetText.length) < 0;
      const hasValidReplacement = edit.operation === "delete"
        ? edit.replacementText === ""
        : edit.replacementText.length > 0 && edit.replacementText !== edit.targetText;
      return isUniqueExactTarget && hasValidReplacement;
    })
    .map((edit, index) => ({ ...edit, id: `edit-${index + 1}` }));
}

type GuidanceField = typeof guidanceFields[number];

export function inferGuidanceField(declaredField: unknown, message: string): GuidanceField {
  const normalized = message.toLowerCase();
  const fieldTerms: Array<{ field: GuidanceField; terms: string[] }> = [
    { field: "title", terms: ["judul", "headline", "title"] },
    { field: "excerpt", terms: ["kutipan", "meta description", "meta deskripsi", "deskripsi meta", "excerpt"] },
    { field: "keyword", terms: ["kata kunci", "keyword", "frasa kunci"] },
    { field: "content", terms: ["isi artikel", "struktur artikel", "kerangka", "subjudul", "paragraf", "konten", "pembahasan"] },
  ];

  const detected = fieldTerms
    .flatMap(({ field, terms }) => terms.map((term) => ({ field, index: normalized.indexOf(term) })))
    .filter(({ index }) => index >= 0)
    .sort((a, b) => a.index - b.index)[0]?.field;

  if (detected) return detected;
  return guidanceFields.includes(declaredField as GuidanceField) ? declaredField as GuidanceField : "content";
}

function fallbackReview(): AIReviewResult {
  return {
    guidance: [],
    suggestions: ["Buat judul lebih spesifik, tulis kutipan yang menjelaskan manfaat, lalu pecah isi artikel menjadi beberapa subjudul."],
    recommendedTitle: "",
    recommendedMetaDescription: "",
    recommendedOutline: [],
    exampleParagraph: "",
    targetKeyword: "",
    editOperations: [],
    contentGaps: [],
    verificationNeeded: [],
    seoSupport: {
      searchIntent: "",
      recommendedSlug: "",
      indexingSuggestions: [{
        area: "Struktur artikel",
        currentIssue: "Draft belum cukup lengkap untuk dinilai secara spesifik.",
        action: "Lengkapi judul, kutipan, dan isi utama artikel.",
        implementation: "Gunakan judul yang unik, susun isi dengan subjudul yang jelas, lalu jawab kebutuhan pembaca secara langsung.",
        expectedResult: "AI dapat memberikan rekomendasi SEO yang lebih tepat untuk setiap bagian artikel.",
      }],
      internalLinks: [],
      faqSuggestions: [],
    },
    duplicateCheck: { risk: "low", blocked: false, results: [] },
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
          field: inferGuidanceField(item.field, item.message),
          severity: guidanceSeverities.includes(item.severity) ? item.severity : "suggestion",
          message: item.message.trim(),
          location: typeof item.location === "string" ? item.location.trim() : "",
          problem: typeof item.problem === "string" ? item.problem.trim() : "",
          action: typeof item.action === "string" ? item.action.trim() : item.message.trim(),
          example: typeof item.example === "string" ? item.example.trim() : "",
          reason: typeof item.reason === "string" ? item.reason.trim() : "",
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
    editOperations: Array.isArray(parsed.editOperations)
      ? parsed.editOperations
        .filter((item: any) => item && guidanceFields.includes(item.field) && ["replace", "insert_after", "delete"].includes(item.operation) && typeof item.targetText === "string" && item.targetText.trim())
        .slice(0, 5)
        .map((item: any, index: number) => ({
          id: typeof item.id === "string" && item.id.trim() ? item.id.trim() : `edit-${index + 1}`,
          field: item.field,
          operation: item.operation,
          targetText: item.targetText.trim(),
          replacementText: typeof item.replacementText === "string" ? item.replacementText.trim() : "",
          reason: typeof item.reason === "string" ? item.reason.trim() : "",
        }))
      : [],
    contentGaps: Array.isArray(parsed.contentGaps)
      ? parsed.contentGaps
        .filter((item: any) => item && typeof item.topic === "string" && item.topic.trim() && typeof item.suggestedContent === "string" && item.suggestedContent.trim())
        .slice(0, 5)
        .map((item: any) => ({
          topic: item.topic.trim(),
          location: typeof item.location === "string" ? item.location.trim() : "Isi artikel",
          whyNeeded: typeof item.whyNeeded === "string" ? item.whyNeeded.trim() : "",
          suggestedContent: item.suggestedContent.trim(),
        }))
      : [],
    verificationNeeded: Array.isArray(parsed.verificationNeeded)
      ? parsed.verificationNeeded
        .filter((item: any) => item && typeof item.claim === "string" && item.claim.trim())
        .slice(0, 5)
        .map((item: any) => ({
          claim: item.claim.trim(),
          location: typeof item.location === "string" ? item.location.trim() : "Isi artikel",
          requiredSource: typeof item.requiredSource === "string" ? item.requiredSource.trim() : "Sumber resmi pemerintah atau regulasi yang berlaku",
        }))
      : [],
    seoSupport: {
      searchIntent: typeof parsed.seoSupport?.searchIntent === "string" ? parsed.seoSupport.searchIntent.trim() : "",
      recommendedSlug: typeof parsed.seoSupport?.recommendedSlug === "string"
        ? parsed.seoSupport.recommendedSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
        : "",
      indexingSuggestions: Array.isArray(parsed.seoSupport?.indexingSuggestions)
        ? parsed.seoSupport.indexingSuggestions
          .filter((item: unknown) =>
            (typeof item === "string" && item.trim())
            || (item && typeof item === "object" && typeof (item as any).action === "string" && (item as any).action.trim())
          )
          .slice(0, 5)
          .map((item: any) => typeof item === "string"
            ? {
                area: "SEO on-page",
                currentIssue: "",
                action: item.trim(),
                implementation: item.trim(),
                expectedResult: "Membantu mesin pencari memahami topik dan struktur halaman.",
              }
            : {
                area: typeof item.area === "string" ? item.area.trim() : "SEO on-page",
                currentIssue: typeof item.currentIssue === "string" ? item.currentIssue.trim() : "",
                action: item.action.trim(),
                implementation: typeof item.implementation === "string" ? item.implementation.trim() : item.action.trim(),
                expectedResult: typeof item.expectedResult === "string" ? item.expectedResult.trim() : "",
              })
        : fallback.seoSupport.indexingSuggestions,
      internalLinks: Array.isArray(parsed.seoSupport?.internalLinks)
        ? parsed.seoSupport.internalLinks
          .filter((item: any) => item && typeof item.anchorText === "string" && typeof item.targetTitle === "string" && typeof item.targetSlug === "string")
          .slice(0, 3)
          .map((item: any) => ({
            anchorText: item.anchorText.trim(),
            targetTitle: item.targetTitle.trim(),
            targetSlug: item.targetSlug.trim(),
          }))
        : [],
      faqSuggestions: Array.isArray(parsed.seoSupport?.faqSuggestions)
        ? parsed.seoSupport.faqSuggestions
          .filter((item: any) => item && typeof item.question === "string" && item.question.trim() && typeof item.answer === "string" && item.answer.trim())
          .slice(0, 4)
          .map((item: any) => ({ question: item.question.trim(), answer: item.answer.trim() }))
        : [],
    },
    duplicateCheck: { risk: "low", blocked: false, results: [] },
  };
}

export async function getAIReview(params: {
  title: string;
  excerpt: string;
  content: string;
  site: string;
  keyword?: string;
  existingSlug?: string;
  reviewMode?: AIReviewMode;
}): Promise<AIReviewResult> {
  const { title, excerpt, content, site, keyword, existingSlug } = params;
  const reviewMode = reviewModes.includes(params.reviewMode as AIReviewMode) ? params.reviewMode as AIReviewMode : "complete";

  // Sebagian besar artikel dapat dikirim penuh. Untuk draft yang sangat panjang,
  // tetap sertakan awal, tengah, dan akhir agar AI tidak hanya menilai pembuka.
  const MAX_CONTENT_CHARS = 60_000;
  const contentForReview = content.length <= MAX_CONTENT_CHARS
    ? content
    : [
        content.slice(0, 24_000),
        "\n\n[... bagian panjang diringkas oleh sistem ...]\n\n",
        content.slice(Math.floor(content.length / 2) - 6_000, Math.floor(content.length / 2) + 6_000),
        "\n\n[... menuju bagian akhir ...]\n\n",
        content.slice(-24_000),
      ].join("");
  const numberedContent = contentForReview
    .split(/\n{2,}/)
    .map((block, index) => `[B${index + 1}] ${block.trim()}`)
    .filter((block) => !/^\[B\d+\]\s*$/.test(block))
    .join("\n\n");

  let duplicateCheck: Awaited<ReturnType<typeof checkDeduplication>> = { risk: "low", results: [], candidates: [] };
  try {
    duplicateCheck = await checkDeduplication({
      title,
      excerpt,
      content,
      site,
      existingSlug,
    });
  } catch { /* non-fatal */ }

  const duplicateContext = duplicateCheck.results.length > 0
    ? `\nDATABASE COMPARISON — these existing articles are similar to the draft:\n${duplicateCheck.results.slice(0, 5).map((article, index) =>
      `${index + 1}. "${article.matchedTitle}" — overall ${Math.round(article.similarity * 100)}%, title ${Math.round(article.titleSimilarity * 100)}%, excerpt ${Math.round(article.excerptSimilarity * 100)}%, content ${Math.round(article.contentSimilarity * 100)}%`
    ).join("\n")}\nDuplicate risk: ${duplicateCheck.risk}. Every recommendation must use a clearly different title and editorial angle.`
    : "\nDATABASE COMPARISON — no materially similar existing article was found.";
  const internalLinkContext = duplicateCheck.candidates.length > 0
    ? `\nINTERNAL LINK CANDIDATES — only recommend links from this exact list:\n${duplicateCheck.candidates.slice(0, 8).map((article) =>
      `- "${article.matchedTitle}" → /artikel/${article.matchedSlug}`
    ).join("\n")}`
    : "\nINTERNAL LINK CANDIDATES — none available; return an empty internalLinks array.";

  const modeInstructions: Record<AIReviewMode, string> = {
    complete: "Review SEO, legal caution, readability, structure, and conversion in balanced priority order.",
    seo: "Prioritize search intent, title/meta, keyword placement, headings, content coverage, and internal linking.",
    legal: "Prioritize unsupported legal, tax, price, deadline, eligibility, and regulatory claims. Do not declare a claim true without a provided source.",
    readability: "Prioritize clarity, paragraph length, logical flow, repetition, terminology, and reader comprehension.",
    conversion: "Prioritize usefulness, trust, service relevance, CTA clarity, and the reader's next step without making guarantees.",
  };

  const prompt = `You are a proactive Indonesian writing companion for legal-business articles. Read the actual draft carefully and return ONLY concrete, ready-to-use writing suggestions. Do not give scores, grades, vague criticism, or generic advice. Every recommendation must clearly explain: the exact location, what is currently wrong or missing, what must be changed, how to change it step by step, a ready-to-use example, and why that change helps. Quote a short phrase from the draft when useful so the writer can find the exact passage. All text MUST use natural Indonesian and must remain legally cautious—do not invent regulations, prices, deadlines, or guarantees.

REVIEW MODE: ${reviewMode}
MODE PRIORITY: ${modeInstructions[reviewMode]}

ARTICLE:
Title: "${title}"
Excerpt: "${excerpt}"
Target keyword: ${keyword || "auto-detect"}
Site: ${site}
Full content (paragraph markers [B#] are location aids only and are not part of the article):
${numberedContent}${duplicateContext}${internalLinkContext}

Return ONLY valid JSON (no markdown fences):
{
  "guidance": [
    {
      "field": "title|excerpt|content|keyword",
      "severity": "suggestion|warning",
      "message": "<ringkasan perubahan yang paling penting dalam satu kalimat>",
      "location": "<lokasi spesifik, misalnya Judul artikel atau Paragraf pembuka yang diawali ...>",
      "problem": "<jelaskan kondisi draft saat ini dan mengapa belum efektif>",
      "action": "<perintah perubahan yang spesifik; sebutkan teks mana yang diganti, ditambah, dipindah, atau dihapus>",
      "example": "<teks pengganti atau tambahan yang siap ditempel>",
      "reason": "<dampak perubahan bagi pembaca atau SEO dalam satu kalimat>"
    }
  ],
  "suggestions": ["<3 saran praktis dan spesifik>"],
  "recommendedTitle": "<satu contoh judul siap pakai, idealnya 30-60 karakter>",
  "recommendedMetaDescription": "<satu contoh kutipan siap pakai, idealnya 120-160 karakter>",
  "recommendedOutline": ["<4-7 contoh subjudul artikel tanpa tanda ###>"],
  "exampleParagraph": "<contoh pengembangan isi 2-4 kalimat yang sesuai dengan draft>",
  "targetKeyword": "<detected keyword>",
  "editOperations": [
    {
      "id": "edit-1",
      "field": "title|excerpt|content|keyword",
      "operation": "replace|insert_after|delete",
      "targetText": "<salinan teks target PERSIS dari draft, tanpa marker [B#]>",
      "replacementText": "<hasil pengganti atau teks tambahan siap pakai; kosong hanya untuk delete>",
      "reason": "<alasan spesifik perubahan>"
    }
  ],
  "contentGaps": [
    {
      "topic": "<pembahasan penting yang belum ada>",
      "location": "<setelah heading/paragraf mana sebaiknya ditambahkan>",
      "whyNeeded": "<alasan pembaca membutuhkan bagian ini>",
      "suggestedContent": "<contoh isi siap pakai; gunakan placeholder jika fakta belum tersedia>"
    }
  ],
  "verificationNeeded": [
    {
      "claim": "<salinan klaim hukum/pajak/biaya/tenggat yang perlu diverifikasi>",
      "location": "<marker paragraf dan kata pembukanya>",
      "requiredSource": "<jenis sumber resmi yang harus diperiksa>"
    }
  ],
  "seoSupport": {
    "searchIntent": "<informational|commercial|transactional serta kebutuhan spesifik pengguna>",
    "recommendedSlug": "<slug pendek, deskriptif, huruf kecil, memakai tanda hubung>",
    "indexingSuggestions": [
      {
        "area": "<contoh: Judul dan keyword|Meta description|Heading|Isi|Internal link>",
        "currentIssue": "<kondisi spesifik yang ditemukan pada draft>",
        "action": "<apa yang harus diubah>",
        "implementation": "<cara mengubahnya secara spesifik, termasuk posisi dan contoh bila perlu>",
        "expectedResult": "<hasil yang diharapkan tanpa menjanjikan ranking atau indexing>"
      }
    ],
    "internalLinks": [
      {
        "anchorText": "<anchor deskriptif yang alami>",
        "targetTitle": "<judul persis dari INTERNAL LINK CANDIDATES>",
        "targetSlug": "<slug persis dari INTERNAL LINK CANDIDATES>"
      }
    ],
    "faqSuggestions": [
      {
        "question": "<pertanyaan nyata yang relevan dengan search intent>",
        "answer": "<jawaban ringkas, akurat, dan dapat tampil langsung di artikel>"
      }
    ]
  }
}

Guidance rules:
- One guidance item may discuss ONLY one field.
- Never combine title, excerpt, keyword, and content advice in one message.
- The field value must exactly match the subject of its message.
- Return 3-5 guidance items, ordered from the most important change.
- Never say only “buat lebih spesifik”, “tambahkan keyword”, “perbaiki struktur”, or similar. State the exact words/section to change and provide the resulting text.
- The example must be directly usable and consistent with the facts already present in the draft. If facts are missing, use a clearly marked placeholder such as [masukkan biaya resmi terbaru], never fabricate it.
- For content guidance, identify the paragraph or heading using its opening words, then say whether to replace, add after, move, or delete it.
- editOperations are the only changes the UI may apply automatically. targetText MUST be copied character-for-character from the supplied title, excerpt, keyword, or article content. Never include [B#] markers. Prefer a unique target of 20-300 characters.
- For replace, replacementText is the complete text that replaces targetText. For insert_after, targetText is the exact anchor and replacementText is only the new content. For delete, replacementText must be empty.
- Return no more than 5 safe editOperations. Do not return an operation if you cannot quote an exact target from the draft.
- contentGaps must be specific to this draft, not a generic article checklist. Return at most 4.
- Put claims requiring current official confirmation in verificationNeeded. Do not provide invented citations or URLs. Return an empty array when there is no such claim.
- Optimize for people-first, unique, crawlable content: descriptive unique title, useful meta description, natural keyword placement, semantic headings, descriptive internal-link anchors, and questions that the visible article actually answers.
- Never keyword-stuff and never promise that Google will index or rank the page.
- Internal links must use exact titles and slugs from INTERNAL LINK CANDIDATES. Never invent a URL.`;

  const client = getAIClient();
  const model = process.env.AI_ROUTER_MODEL_REVIEW || "ArticleAI";
  const attachDuplicateCheck = (review: AIReviewResult): AIReviewResult => {
    const allowedLinks = new Map(duplicateCheck.candidates.map((article) => [article.matchedSlug, article.matchedTitle]));
    const sourceByField: Record<"title" | "excerpt" | "content" | "keyword", string> = {
      title,
      excerpt,
      content,
      keyword: keyword || "",
    };
    const safeEditOperations = filterSafeEditOperations(review.editOperations, sourceByField);

    return {
      ...review,
      editOperations: safeEditOperations,
      seoSupport: {
        ...review.seoSupport,
        internalLinks: review.seoSupport.internalLinks.filter((link) =>
          allowedLinks.get(link.targetSlug) === link.targetTitle
        ),
      },
      duplicateCheck: {
        risk: duplicateCheck.risk,
        blocked: duplicateCheck.risk === "high",
        results: duplicateCheck.results,
      },
    };
  };

  const resp = await client.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
    max_tokens: 1800,
  });

  const raw = resp.choices[0]?.message?.content || "{}";
  try {
    return attachDuplicateCheck(await parseAIResponse(raw));
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
      max_tokens: 2200,
    });
    const retryRaw = retry.choices[0]?.message?.content || "{}";

    try {
      return attachDuplicateCheck(await parseAIResponse(retryRaw));
    } catch (retryError) {
      console.error("AI review JSON retry failed", {
        finishReason: retry.choices[0]?.finish_reason,
        responseLength: retryRaw.length,
        reason: retryError instanceof Error ? retryError.message : "unknown parse error",
      });
      return attachDuplicateCheck(fallbackReview());
    }
  }
}
