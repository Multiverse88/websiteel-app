import assert from "node:assert/strict";
import { test } from "node:test";
import { parseAIResponse } from "./ai-review-service";

const validReview = {
  opinion: "Tulisan ini sudah fokus, tetapi judulnya masih bisa dibuat lebih spesifik.",
  guidance: [{ field: "title", severity: "warning", message: "Tambahkan manfaat utama pada judul." }],
  seoScore: 72,
  titleScore: "needs-improvement",
  titleReason: "Judul belum menyebutkan manfaat utama.",
  metaScore: "good",
  metaReason: "Meta deskripsi cukup jelas.",
  contentScore: "good",
  contentReason: "Isi artikel terstruktur.",
  readabilityScore: 78,
  duplicateRisk: "low",
  similarArticles: [],
  suggestions: ["Perjelas manfaat pada judul."],
};

test("mengambil JSON valid ketika model menambahkan kalimat pembuka", async () => {
  const raw = `Berikut analisis saya:\n\`\`\`json\n${JSON.stringify(validReview)}\n\`\`\``;
  const result = await parseAIResponse(raw);

  assert.equal(result.opinion, validReview.opinion);
  assert.equal(result.titleReason, validReview.titleReason);
  assert.notEqual(result.titleReason, "Could not parse AI response");
});

test("menolak respons JSON yang terpotong agar caller dapat mencoba ulang", async () => {
  await assert.rejects(
    () => parseAIResponse('{"seoScore":72,"opinion":"Tulisan ini'),
    /complete JSON object/,
  );
});
