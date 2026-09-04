import assert from "node:assert/strict";
import { test } from "node:test";
import { parseAIResponse } from "./ai-review-service";

const validReview = {
  guidance: [{ field: "title", severity: "warning", message: "Gunakan judul: Panduan Praktis Mengurus NIB untuk UMKM." }],
  suggestions: ["Gunakan subjudul untuk setiap tahapan."],
  recommendedTitle: "Panduan Praktis Mengurus NIB untuk UMKM",
  recommendedMetaDescription: "Pelajari tahapan mengurus NIB untuk UMKM secara runtut, mulai dari persiapan data hingga pengecekan dokumen usaha.",
  recommendedOutline: ["Apa Itu NIB?", "Dokumen yang Perlu Disiapkan"],
  exampleParagraph: "NIB menjadi identitas bagi pelaku usaha dalam menjalankan kegiatan bisnisnya.",
  targetKeyword: "cara mengurus NIB",
};

test("mengambil JSON valid ketika model menambahkan kalimat pembuka", async () => {
  const raw = `Berikut analisis saya:\n\`\`\`json\n${JSON.stringify(validReview)}\n\`\`\``;
  const result = await parseAIResponse(raw);

  assert.equal(result.recommendedTitle, validReview.recommendedTitle);
  assert.deepEqual(result.recommendedOutline, validReview.recommendedOutline);
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
