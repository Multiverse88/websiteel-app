import OpenAI from "openai";

export interface ExportAIInsight {
  executiveSummary: string;
  keyFindings: string[];
  conversionAdvice: string[];
  closingTactics: string[];
}

function getAIClient(): OpenAI | null {
  const apiKey = process.env.AI_ROUTER_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  const baseURL = process.env.AI_ROUTER_BASE_URL;
  return new OpenAI({
    apiKey,
    ...(baseURL ? { baseURL } : {}),
  });
}

export async function generateExportAIInsight(params: {
  totalLeads: number;
  funnel: Record<string, number>;
  sourceBreakdown: Record<string, number>;
  domainBreakdown: Record<string, number>;
  totalWonValue: number;
  periodLabel: string;
}): Promise<ExportAIInsight> {
  const { totalLeads, funnel, sourceBreakdown, domainBreakdown, totalWonValue, periodLabel } = params;

  // Fallback statistik deterministic jika AI tidak aktif atau gagal
  const fallbackInsight: ExportAIInsight = {
    executiveSummary: `Laporan performa WhatsApp Rotator periode ${periodLabel} mencatat total ${totalLeads} lead masuk. Dengan total closing (WON) sebanyak ${funnel.WON || 0} lead senilai Rp ${(totalWonValue || 0).toLocaleString("id-ID")}, konversi berada di kisaran ${totalLeads > 0 ? ((funnel.WON || 0) / totalLeads * 100).toFixed(1) : 0}%. Sumber trafik terkuat adalah ${Object.entries(sourceBreakdown).sort((a, b) => b[1] - a[1])[0]?.[0] || "Direct"}.`,
    keyFindings: [
      `Total lead terdaftar dalam periode ini: ${totalLeads} lead.`,
      `Status Funnel: Baru (${funnel.NEW || 0}), Dihubungi (${funnel.CONTACTED || 0}), Kualifikasi (${funnel.QUALIFIED || 0}), Penawaran (${funnel.PROPOSAL || 0}), Closing (${funnel.WON || 0}), Batal (${funnel.LOST || 0}).`,
      `Distribusi domain aktif: ${Object.entries(domainBreakdown).map(([d, c]) => `${d || 'Semua'}: ${c}`).join(", ") || "-"}`,
    ],
    conversionAdvice: [
      "Percepat first-response time di bawah 5 menit untuk meningkatkan konversi status Baru ke Dihubungi.",
      "Lakukan follow-up terjadwal H+1 dan H+3 untuk lead berstatus Penawaran/Nego (PROPOSAL) agar tidak dingin.",
      "Catat alasan batal (Lost Reason) secara disiplin untuk evaluasi strategi harga atau kecepatan respons.",
    ],
    closingTactics: [
      "Gunakan penawaran bundling layanan (misal: PT Perorangan + Rekening Bisnis + NIB OSS) untuk menaikkan nilai order.",
      "Tawarkan kemudahan termin pembayaran (DP 50% diawal, pelunasan saat SK Kemenkumham terbit).",
      "Kirimkan portfolio dan testimoni klien sejenis saat mengirimkan proposal konsultasi.",
    ],
  };

  const client = getAIClient();
  if (!client) return fallbackInsight;

  const model = process.env.AI_ROUTER_MODEL_REVIEW || "ArticleAI";
  const prompt = `Anda adalah Business Analyst & Legal Sales Consultant senior di EasyLegal Indonesia.
Analisis data performa lead WhatsApp berikut untuk periode: "${periodLabel}".

DATA METRICS:
- Total Leads Masuk: ${totalLeads}
- Status Funnel:
  * Baru (NEW): ${funnel.NEW || 0}
  * Dihubungi (CONTACTED): ${funnel.CONTACTED || 0}
  * Terkualifikasi (QUALIFIED): ${funnel.QUALIFIED || 0}
  * Penawaran/Proposal (PROPOSAL): ${funnel.PROPOSAL || 0}
  * Closing / Selesai (WON): ${funnel.WON || 0}
  * Batal / Tidak Jadi (LOST): ${funnel.LOST || 0}
- Total Nilai Order WON: Rp ${(totalWonValue || 0).toLocaleString("id-ID")}
- Breakdown Sumber Lead: ${JSON.stringify(sourceBreakdown)}
- Breakdown Domain: ${JSON.stringify(domainBreakdown)}

TUGAS:
Kembalikan respon dalam format JSON valid PERSIS dengan struktur:
{
  "executiveSummary": "Paragraf ringkas 3-4 kalimat dalam Bahasa Indonesia yang profesional dan tajam, menyimpulkan kesehatan funnel, tingkat konversi, dan performa lead periode ini.",
  "keyFindings": ["Temuan 1", "Temuan 2", "Temuan 3"],
  "conversionAdvice": ["Saran praktis 1 untuk meningkatkan konversi", "Saran praktis 2", "Saran praktis 3"],
  "closingTactics": ["Taktik penutupan deals (closing) 1", "Taktik closing 2", "Taktik closing 3"]
}
HANYA kembalikan objek JSON valid tanpa markdown backticks atau teks tambahan.`;

  try {
    const supportsJsonFormat =
      !!process.env.AI_ROUTER_BASE_URL?.includes("openai") ||
      !!process.env.AI_ROUTER_MODEL_REVIEW?.toLowerCase().includes("gpt");

    const response = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 1500,
      ...(supportsJsonFormat ? { response_format: { type: "json_object" } } : {}),
    });

    const raw = response.choices[0]?.message?.content?.trim() || "{}";
    const cleaned = raw.replace(/^```json\s*/i, "").replace(/\s*```$/i, "").trim();
    const parsed = JSON.parse(cleaned);

    if (parsed.executiveSummary && Array.isArray(parsed.keyFindings)) {
      return {
        executiveSummary: parsed.executiveSummary || fallbackInsight.executiveSummary,
        keyFindings: parsed.keyFindings || fallbackInsight.keyFindings,
        conversionAdvice: parsed.conversionAdvice || fallbackInsight.conversionAdvice,
        closingTactics: parsed.closingTactics || fallbackInsight.closingTactics,
      };
    }
    return fallbackInsight;
  } catch (err) {
    console.warn("Gagal memanggil AI untuk export lead insight, menggunakan fallback cerdas:", err);
    return fallbackInsight;
  }
}
