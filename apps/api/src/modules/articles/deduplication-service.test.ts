import assert from "node:assert/strict";
import { test } from "node:test";
import { classifyDuplicateRisk, type DedupResult } from "./deduplication-service";

const match = (overrides: Partial<DedupResult>): DedupResult => ({
  similarity: 0.5,
  titleSimilarity: 0.5,
  excerptSimilarity: 0.2,
  contentSimilarity: 0.2,
  matchedSlug: "artikel-lama",
  matchedTitle: "Artikel Lama",
  keywordCannibalization: false,
  matchedFocusKeyword: "",
  ...overrides,
});

test("risiko tinggi bila judul sangat mirip", () => {
  assert.equal(classifyDuplicateRisk([match({ titleSimilarity: 0.81 })]), "high");
});

test("risiko tinggi bila isi artikel sangat mirip walau judul berbeda", () => {
  assert.equal(classifyDuplicateRisk([match({ titleSimilarity: 0.2, contentSimilarity: 0.88 })]), "high");
});

test("risiko sedang untuk kemiripan yang perlu ditinjau", () => {
  assert.equal(classifyDuplicateRisk([match({ similarity: 0.48 })]), "medium");
});

test("risiko rendah bila tidak ada artikel yang mirip", () => {
  assert.equal(classifyDuplicateRisk([]), "low");
});
