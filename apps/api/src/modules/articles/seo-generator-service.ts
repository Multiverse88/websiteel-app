import { getAIClient, supportsJsonFormat } from "../../lib/ai-client";

export interface GenerateSEOSnippetInput {
  title: string;
  excerpt?: string;
  content?: string;
  focusKeyword?: string;
  site?: string;
}

export interface GenerateSEOSnippetResult {
  seoTitle: string;
  seoDesc: string;
  focusKeyword: string;
  strategy: string;
}

function cleanTitle(title: string): string {
  return title
    .replace(/\s*[-|—]\s*EasyLegal\s*$/i, "")
    .trim();
}

function truncateToWord(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  const sub = str.slice(0, maxLen);
  const lastSpace = sub.lastIndexOf(" ");
  return lastSpace > maxLen * 0.7 ? sub.slice(0, lastSpace) : sub;
}

/**
 * Robust rule-based fallback when AI client is unavailable or times out.
 */
function generateFallbackSEO(input: GenerateSEOSnippetInput): GenerateSEOSnippetResult {
  const brandSuffix = " - EasyLegal";
  const rawTitle = cleanTitle(input.title || "Layanan Legalitas Bisnis");
  const keyword = (input.focusKeyword || "").trim() || rawTitle.split(" ").slice(0, 4).join(" ");
  
  // 1. Generate SEO Title (ideal: 45-60 chars)
  const maxTitleBody = 60 - brandSuffix.length;
  let candidateTitle = rawTitle;
  if (candidateTitle.length > maxTitleBody) {
    candidateTitle = truncateToWord(candidateTitle, maxTitleBody);
  }
  const seoTitle = `${candidateTitle}${brandSuffix}`;

  // 2. Generate Meta Description (ideal: 125-155 chars)
  let baseDesc = (input.excerpt || "").trim();
  if (!baseDesc && input.content) {
    // Strip markdown formatting for clean plain text
    baseDesc = input.content
      .replace(/^#+.*$/gm, "")
      .replace(/[*_#`~\[\]]/g, "")
      .replace(/\n+/g, " ")
      .trim();
  }

  let seoDesc = "";
  if (baseDesc.length >= 70) {
    const truncated = truncateToWord(baseDesc, 125);
    seoDesc = `${truncated}. Simak panduan lengkapnya di EasyLegal!`;
    if (seoDesc.length > 158) {
      seoDesc = `${truncateToWord(baseDesc, 140)}...`;
    }
  } else {
    seoDesc = `Butuh panduan lengkap seputar ${keyword}? Simak syarat, prosedur resmi, dan biaya terbarunya bersama EasyLegal. Konsultasi gratis sekarang!`;
    if (seoDesc.length > 158) {
      seoDesc = `Panduan lengkap seputar ${keyword}: syarat, prosedur resmi, dan estimasi biaya terkini bersama EasyLegal. Konsultasikan bisnis Anda sekarang!`;
    }
  }

  return {
    seoTitle,
    seoDesc,
    focusKeyword: keyword,
    strategy: "Dibuat otomatis berbasis kaidah SEO (keyword-optimized + SERP length bounds).",
  };
}

/**
 * Generate high-CTR, SEO-optimized title and meta description using AI (with fallback).
 */
export async function generateSEOSnippet(input: GenerateSEOSnippetInput): Promise<GenerateSEOSnippetResult> {
  const fallback = generateFallbackSEO(input);
  const client = getAIClient();

  if (!client) {
    return fallback;
  }

  const model = process.env.AI_ROUTER_MODEL_REVIEW || process.env.AI_ROUTER_MODEL || "ArticleAI";
  const siteDomain = input.site || "easylegal.id";
  const cleanedInputTitle = cleanTitle(input.title || "");
  const trimmedContentSample = (input.content || "").slice(0, 2500);

  const systemPrompt = `Anda adalah Senior SEO Specialist & Copywriter untuk platform EasyLegal (${siteDomain}).
Tugas Anda adalah membuat SEO Title dan Meta Description yang sangat optimal untuk ranking Google SERP dan memiliki CTR (Click-Through Rate) tinggi.

Kaidah Wajib:
1. "seoTitle":
   - Panjang WAJIB antara 45 - 60 karakter (termasuk suffix " - EasyLegal").
   - Letakkan kata kunci utama di depan atau sedekat mungkin ke awal judul.
   - Akhiri WAJIB dengan suffix " - EasyLegal".
   - Gunakan trigger CTR profesional jika relevan: "Panduan Lengkap", "Syarat & Cara", "Resmi & Cepat", atau tahun berjalan (2026).
   - Jangan gunakan clickbait berlebihan.

2. "seoDesc":
   - Panjang WAJIB antara 125 - 155 karakter (jangan kurang dari 120, jangan lebih dari 160 agar tidak terpotong di mobile/desktop Google).
   - Sertakan kata kunci utama secara alami di kalimat pertama.
   - Berikan ringkasan nilai manfaat / jawaban atas search intent pencari.
   - Berikan Call-To-Action (CTA) aktif di akhir (contoh: "Simak syarat & panduan lengkapnya!", "Konsultasi gratis sekarang!").

3. "focusKeyword":
   - Kata kunci pencarian utama Google (2-4 kata).

4. "strategy":
   - Penjelasan 1 kalimat alasan pemilihan title dan description ini.

Format output WAJIB JSON persis:
{
  "seoTitle": "...",
  "seoDesc": "...",
  "focusKeyword": "...",
  "strategy": "..."
}`;

  const userPrompt = `Data Artikel:
- Judul Asli: ${cleanedInputTitle || "Tidak ada judul"}
- Focus Keyword Target: ${input.focusKeyword || "(Tentukan dari konten/judul)"}
- Kutipan/Excerpt: ${input.excerpt || "Tidak ada"}
- Sampel Isi Artikel:
${trimmedContentSample || cleanedInputTitle}

Hasilkan SEO Title dan Meta Description terbaik dalam bahasa Indonesia yang sesuai standar Google SERP.`;

  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3,
      ...(supportsJsonFormat() ? { response_format: { type: "json_object" } } : {}),
    });

    const raw = response.choices?.[0]?.message?.content?.trim() || "";
    if (!raw) return fallback;

    const firstBrace = raw.indexOf("{");
    const lastBrace = raw.lastIndexOf("}");
    if (firstBrace === -1 || lastBrace === -1) return fallback;

    const parsed = JSON.parse(raw.slice(firstBrace, lastBrace + 1));
    const generatedTitle = typeof parsed.seoTitle === "string" && parsed.seoTitle.trim() ? parsed.seoTitle.trim() : fallback.seoTitle;
    const generatedDesc = typeof parsed.seoDesc === "string" && parsed.seoDesc.trim() ? parsed.seoDesc.trim() : fallback.seoDesc;
    const generatedKeyword = typeof parsed.focusKeyword === "string" && parsed.focusKeyword.trim() ? parsed.focusKeyword.trim() : fallback.focusKeyword;

    // Ensure title has proper brand suffix
    let finalTitle = generatedTitle;
    if (!finalTitle.includes("EasyLegal")) {
      finalTitle = `${cleanTitle(finalTitle)} - EasyLegal`;
    }

    return {
      seoTitle: finalTitle,
      seoDesc: generatedDesc,
      focusKeyword: generatedKeyword,
      strategy: typeof parsed.strategy === "string" && parsed.strategy.trim() ? parsed.strategy.trim() : fallback.strategy,
    };
  } catch (err) {
    console.warn("AI SEO snippet generation error, using fallback:", err);
    return fallback;
  }
}
