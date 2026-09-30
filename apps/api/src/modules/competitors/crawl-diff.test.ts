import { test } from "node:test";
import assert from "node:assert/strict";
import { computeCrawlDiff, SnapshotSummary } from "./crawl-diff";

test("computeCrawlDiff marks all pages as ADDED when no previous crawl exists", () => {
  const current: SnapshotSummary[] = [
    {
      url: "https://comp.com/",
      statusCode: 200,
      title: "Home",
      metaDescription: "Desc",
      h1: "Title",
      headings: [],
      mainText: "Text",
      priceTexts: [],
      ctas: [],
      contentHash: "hash1",
      classification: "CONTENT",
    },
  ];

  const diff = computeCrawlDiff("crawl_2", current, null, []);
  assert.equal(diff.summary.added, 1);
  assert.equal(diff.summary.removed, 0);
  assert.equal(diff.summary.changed, 0);
  assert.equal(diff.summary.unchanged, 0);
  assert.equal(diff.changes[0].changeTypes[0], "ADDED_PAGE");
});

test("computeCrawlDiff detects SEO, price, CTA and removed changes accurately", () => {
  const prev: SnapshotSummary[] = [
    {
      url: "https://comp.com/layanan/pt",
      statusCode: 200,
      title: "PT Lama",
      metaDescription: "Desc Lama",
      h1: "H1 Lama",
      headings: [],
      mainText: "Text Lama",
      priceTexts: ["Rp 3.000.000"],
      ctas: [{ label: "Chat CS", url: "https://wa.me/1" }],
      contentHash: "hash_old",
      classification: "SERVICE",
    },
    {
      url: "https://comp.com/promo-expired",
      statusCode: 200,
      title: "Promo",
      metaDescription: null,
      h1: null,
      headings: [],
      mainText: "",
      priceTexts: [],
      ctas: [],
      contentHash: "hash_promo",
      classification: "CONTENT",
    },
  ];

  const curr: SnapshotSummary[] = [
    {
      url: "https://comp.com/layanan/pt",
      statusCode: 200,
      title: "PT Baru - Diskon 20%",
      metaDescription: "Desc Baru",
      h1: "H1 Baru",
      headings: [],
      mainText: "Text Baru",
      priceTexts: ["Rp 2.500.000"],
      ctas: [{ label: "Chat CS Baru", url: "https://wa.me/2" }],
      contentHash: "hash_new",
      classification: "SERVICE",
    },
    {
      url: "https://comp.com/layanan/cv",
      statusCode: 200,
      title: "Jasa CV",
      metaDescription: null,
      h1: null,
      headings: [],
      mainText: "",
      priceTexts: [],
      ctas: [],
      contentHash: "hash_cv",
      classification: "SERVICE",
    },
  ];

  const diff = computeCrawlDiff("crawl_2", curr, "crawl_1", prev);
  assert.equal(diff.summary.added, 1); // /layanan/cv
  assert.equal(diff.summary.removed, 1); // /promo-expired
  assert.equal(diff.summary.changed, 1); // /layanan/pt
  assert.equal(diff.summary.unchanged, 0);

  const ptChange = diff.changes.find((c) => c.url === "https://comp.com/layanan/pt");
  assert.ok(ptChange);
  assert.ok(ptChange.changeTypes.includes("SEO_CHANGED"));
  assert.ok(ptChange.changeTypes.includes("PRICE_CHANGED"));
  assert.ok(ptChange.changeTypes.includes("CTA_CHANGED"));

  const removedChange = diff.changes.find((c) => c.url === "https://comp.com/promo-expired");
  assert.ok(removedChange);
  assert.ok(removedChange.changeTypes.includes("REMOVED_PAGE"));
});
