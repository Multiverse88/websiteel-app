import assert from "node:assert/strict";
import test from "node:test";
import {
  buildWhatsAppMessage,
  classifyAttribution,
  getLeadTemperature,
  isValidStageTransition,
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

test("WhatsApp message carries the public Lead Code and canonical source", () => {
  assert.equal(
    buildWhatsAppMessage("Halo, saya ingin konsultasi PT.", "EL-A7K9Q2", "gads"),
    "Halo, saya ingin konsultasi PT.\n\n[Ref: EL-A7K9Q2 | Source: gads]",
  );
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
