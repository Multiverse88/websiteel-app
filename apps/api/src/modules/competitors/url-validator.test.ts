import { test } from "node:test";
import assert from "node:assert/strict";
import { validateCompetitorUrl } from "./url-validator";

test("validateCompetitorUrl accepts valid public origins", () => {
  const r1 = validateCompetitorUrl("https://legalitas-kita.com");
  assert.equal(r1.isValid, true);
  assert.equal(r1.baseUrl, "https://legalitas-kita.com");
  assert.equal(r1.hostname, "legalitas-kita.com");

  const r2 = validateCompetitorUrl("http://sub.domain.co.id/layanan/paket");
  assert.equal(r2.isValid, true);
  assert.equal(r2.baseUrl, "http://sub.domain.co.id");
  assert.equal(r2.hostname, "sub.domain.co.id");
});

test("validateCompetitorUrl prepends https if missing", () => {
  const r = validateCompetitorUrl("izinusaha.id");
  assert.equal(r.isValid, true);
  assert.equal(r.baseUrl, "https://izinusaha.id");
  assert.equal(r.hostname, "izinusaha.id");
});

test("validateCompetitorUrl rejects credentials in URL", () => {
  const r = validateCompetitorUrl("https://admin:pass@competitor.com");
  assert.equal(r.isValid, false);
  assert.match(r.error || "", /username atau password/);
});

test("validateCompetitorUrl rejects non-http protocols", () => {
  const r = validateCompetitorUrl("ftp://competitor.com");
  assert.equal(r.isValid, false);
  assert.match(r.error || "", /HTTP dan HTTPS/);
});

test("validateCompetitorUrl rejects localhost and private IP addresses", () => {
  assert.equal(validateCompetitorUrl("http://localhost:3000").isValid, false);
  assert.equal(validateCompetitorUrl("http://127.0.0.1:4000").isValid, false);
  assert.equal(validateCompetitorUrl("http://192.168.1.1").isValid, false);
  assert.equal(validateCompetitorUrl("http://10.0.0.5").isValid, false);
  assert.equal(validateCompetitorUrl("http://172.16.0.1").isValid, false);
});
