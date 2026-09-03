import assert from "node:assert/strict";
import test from "node:test";
import {
  buildWhatsAppMessage,
  classifyAttribution,
  getLeadTemperature,
  isValidStageTransition,
  normalizeLeadDomain,
} from "./lead-domain";

test("Google Ads click id is classified as gads", () => {
  assert.equal(classifyAttribution({ gclid: "abc123" }, null).sourceCode, "gads");
});

test("Meta click id is classified as metaads", () => {
  assert.equal(classifyAttribution({ fbclid: "meta123" }, null).sourceCode, "metaads");
});

test("Google organic referrer is classified as googleseo", () => {
  assert.equal(
    classifyAttribution({}, "https://www.google.com/search?q=pendirian+pt").sourceCode,
    "googleseo",
  );
});

test("untrusted source query cannot invent a source code", () => {
  assert.equal(classifyAttribution({ source: "<script>" }, null).sourceCode, "direct");
});

test("WhatsApp message carries source domain and lead code once", () => {
  assert.equal(
    buildWhatsAppMessage(
      "Halo EasyLegal, saya ingin konsultasi PT.",
      "EL-A7K9Q2",
      "gads",
      "easylegal.biz.id",
      "Naufal",
    ),
    "Hallo Kak Naufal saya ingin konsultasi PT. (Google Ads; easylegal.biz.id | Ref: EL-A7K9Q2)",
  );
});

test("lead domains are normalized against the public-site allowlist", () => {
  assert.equal(normalizeLeadDomain("easylegal.biz.id"), "easylegal.biz.id");
  assert.equal(normalizeLeadDomain("www.easylegal.co.id"), "easylegal.co.id");
  assert.equal(normalizeLeadDomain("easylegal.id"), "easylegal.id");
  assert.equal(normalizeLeadDomain("evil.example"), null);
});

test("temperature is derived from stage", () => {
  assert.equal(getLeadTemperature("NEW"), "COLD");
  assert.equal(getLeadTemperature("CONTACTED"), "WARM");
  assert.equal(getLeadTemperature("QUALIFIED"), "WARM");
  assert.equal(getLeadTemperature("PROPOSAL"), "WARM");
  assert.equal(getLeadTemperature("WON"), "HOT");
  assert.equal(getLeadTemperature("LOST"), "COLD");
});

test("Lead Stage transition rejects skipping directly from NEW to WON", () => {
  assert.equal(isValidStageTransition("NEW", "CONTACTED"), true);
  assert.equal(isValidStageTransition("NEW", "WON"), false);
  assert.equal(isValidStageTransition("PROPOSAL", "WON"), true);
  assert.equal(isValidStageTransition("LOST", "CONTACTED"), true);
});
