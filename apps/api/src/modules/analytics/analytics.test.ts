import test from "node:test";
import assert from "node:assert/strict";
import { calculateSharePercent } from "./analytics-service";

test("calculateSharePercent returns 0 when total is zero or negative", () => {
  assert.equal(calculateSharePercent(0, 0), 0);
  assert.equal(calculateSharePercent(5, 0), 0);
  assert.equal(calculateSharePercent(5, -10), 0);
});

test("calculateSharePercent computes accurate percentage rounded to 1 decimal", () => {
  assert.equal(calculateSharePercent(10, 100), 10);
  assert.equal(calculateSharePercent(1, 3), 33.3);
  assert.equal(calculateSharePercent(2, 3), 66.7);
  assert.equal(calculateSharePercent(142, 1420), 10);
  assert.equal(calculateSharePercent(197, 25830), 0.8);
});

test("calculateSharePercent handles 100% share", () => {
  assert.equal(calculateSharePercent(50, 50), 100);
});
