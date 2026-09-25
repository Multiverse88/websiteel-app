import assert from "node:assert/strict";
import test from "node:test";
import { summarizeLeadsByNumber } from "./lead-exporter";

const num = (number: string, label: string | null = null, isActive = true) => ({
  number,
  label,
  clickCount: 0,
  isActive,
  createdAt: new Date("2026-01-01T00:00:00Z"),
});

const lead = (number: string | null, status = "NEW", orderValue: number | null = null) => ({
  leadCode: "EL-X",
  status,
  service: null,
  product: null,
  sourceCode: "direct",
  source: null,
  channel: "wa",
  domain: null,
  number: number ? { number, label: null } : null,
  orderValue,
  notes: null,
  lostReason: null,
  createdAt: new Date("2026-01-01T00:00:00Z"),
  isSuspectedBot: false,
  updatedAt: new Date("2026-01-01T00:00:00Z"),
  wonAt: null,
  lostAt: null,
});

test("zero-lead and inactive numbers stay visible, closed value rolls up", () => {
  const out = summarizeLeadsByNumber(
    [lead("A"), lead("A"), lead("A", "WON", 1_000_000), lead("B"), lead("GHOST")],
    [num("A", "CS Satu"), num("B"), num("C", "CS Tiga", false)],
  );
  // sorted by lead count desc: A(3) > B(1) = GHOST(1) > C(0); ties by number
  assert.deepEqual(
    out.map((d) => [d.number, d.leadCount, d.wonCount, d.wonValue, d.sharePct, d.isActive]),
    [
      ["A", 3, 1, 1_000_000, 60, true],
      ["B", 1, 0, 0, 20, true],
      ["GHOST", 1, 0, 0, 20, true],
      ["C", 0, 0, 0, 0, false],
    ],
  );
  assert.equal(out[0].label, "CS Satu");
});

test("leads without a destination number group under (tanpa nomor)", () => {
  const out = summarizeLeadsByNumber([lead(null), lead(null)], []);
  assert.equal(out.length, 1);
  assert.equal(out[0].number, "(tanpa nomor)");
  assert.equal(out[0].leadCount, 2);
  assert.equal(out[0].sharePct, 100);
});
