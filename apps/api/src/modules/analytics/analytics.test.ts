import test from "node:test";
import assert from "node:assert/strict";
import { calculateClosingRate } from "./analytics-service";

test("calculateClosingRate returns 0 when total is zero or negative", () => {
  assert.equal(calculateClosingRate(0, 0), 0);
  assert.equal(calculateClosingRate(5, 0), 0);
  assert.equal(calculateClosingRate(5, -10), 0);
});

test("calculateClosingRate computes accurate percentage rounded to 1 decimal", () => {
  assert.equal(calculateClosingRate(10, 100), 10);
  assert.equal(calculateClosingRate(1, 3), 33.3);
  assert.equal(calculateClosingRate(2, 3), 66.7);
  assert.equal(calculateClosingRate(142, 1420), 10);
  assert.equal(calculateClosingRate(15, 90), 16.7);
});

test("calculateClosingRate handles 100% conversion", () => {
  assert.equal(calculateClosingRate(50, 50), 100);
});
