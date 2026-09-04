import assert from "node:assert/strict";
import { test } from "node:test";
import { parseAIResponse } from "./ai-review-service";

const validReview = {
  guidance: [{
    field: "title",
    severity: "warning",
    message: "Ubah judul agar manfaat dan pembacanya langsung terlihat.",
    location: "Judul artikel",
    problem: "Judul belum menyebutkan bahwa panduan ditujukan untuk UMKM.",
    action: "Ganti judul saat ini dengan judul yang memuat tindakan, topik, dan sasaran pembaca.",
    example: "Panduan Praktis Mengurus NIB untuk UMKM",
    reason: "Pembaca dapat langsung memahami isi dan relevansi artikel.",
  }],
  suggestions: ["Gunakan subjudul untuk setiap tahapan."],
  recommendedTitle: "Panduan Praktis Mengurus NIB untuk UMKM",
  recommendedMetaDescription: "Pelajari tahapan mengurus NIB untuk UMKM secara runtut, mulai dari persiapan data hingga pengecekan dokumen usaha.",
  recommendedOutline: ["Apa Itu NIB?", "Dokumen yang Perlu Disiapkan"],
  exampleParagraph: "NIB menjadi identitas bagi pelaku usaha dalam menjalankan kegiatan bisnisnya.",
  targetKeyword: "cara mengurus NIB",
  seoSupport: {
    searchIntent: "Informasional: pengguna ingin memahami tahapan mengurus NIB.",
    recommendedSlug: "cara-mengurus-nib-umkm",
    indexingSuggestions: [{
      area: "Judul dan keyword",
      currentIssue: "Kata kunci belum terlihat pada judul.",
      action: "Masukkan frasa cara mengurus NIB pada judul.",
      implementation: "Gunakan judul Panduan Cara Mengurus NIB untuk UMKM.",
      expectedResult: "Topik utama halaman menjadi lebih mudah dipahami.",
    }],
    internalLinks: [],
    faqSuggestions: [{ question: "Apa itu NIB?", answer: "NIB adalah identitas pelaku usaha yang diterbitkan melalui sistem OSS." }],
  },
};

test("mengambil JSON valid ketika model menambahkan kalimat pembuka", async () => {
  const raw = `Berikut analisis saya:\n\`\`\`json\n${JSON.stringify(validReview)}\n\`\`\``;
  const result = await parseAIResponse(raw);

  assert.equal(result.recommendedTitle, validReview.recommendedTitle);
  assert.deepEqual(result.recommendedOutline, validReview.recommendedOutline);
  assert.equal(result.seoSupport.recommendedSlug, validReview.seoSupport.recommendedSlug);
  assert.equal(result.seoSupport.faqSuggestions[0]?.question, "Apa itu NIB?");
  assert.equal(result.guidance[0]?.action, validReview.guidance[0].action);
  assert.equal(result.guidance[0]?.example, validReview.guidance[0].example);
  assert.equal(result.seoSupport.indexingSuggestions[0]?.area, "Judul dan keyword");
});

test("mengubah saran SEO format lama menjadi rincian yang tetap dapat ditampilkan", async () => {
  const raw = JSON.stringify({
    ...validReview,
    seoSupport: {
      ...validReview.seoSupport,
      indexingSuggestions: ["Tambahkan kata kunci secara alami pada judul."],
    },
  });

  const result = await parseAIResponse(raw);
  assert.equal(result.seoSupport.indexingSuggestions[0]?.action, "Tambahkan kata kunci secara alami pada judul.");
  assert.equal(result.seoSupport.indexingSuggestions[0]?.area, "SEO on-page");
});

test("menolak respons JSON yang terpotong agar caller dapat mencoba ulang", async () => {
  await assert.rejects(
    () => parseAIResponse('{"recommendedTitle":"Panduan Mengurus NIB'),
    /complete JSON object/,
  );
});

test("mengarahkan saran judul ke field judul meskipun model salah memberi label content", async () => {
  const raw = JSON.stringify({
    ...validReview,
    guidance: [{
      field: "content",
      severity: "suggestion",
      message: "Buat judul lebih spesifik dengan menambahkan manfaat utama.",
    }],
  });

  const result = await parseAIResponse(raw);
  assert.equal(result.guidance[0]?.field, "title");
});
