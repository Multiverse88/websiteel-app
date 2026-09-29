import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import {
  aggregatePageTrafficRows,
  buildPageTrafficWorkbook,
  calculateSharePercent,
  monthWeekRanges,
  parsePageTrafficQuery,
} from "./analytics-service";

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

test("September 2026 splits into Monday-Sunday ranges clipped to the month", () => {
  assert.deepEqual(monthWeekRanges(2026, 9), [
    { start: "2026-09-01", end: "2026-09-06", label: "1-6 Sep" },
    { start: "2026-09-07", end: "2026-09-13", label: "7-13 Sep" },
    { start: "2026-09-14", end: "2026-09-20", label: "14-20 Sep" },
    { start: "2026-09-21", end: "2026-09-27", label: "21-27 Sep" },
    { start: "2026-09-28", end: "2026-09-30", label: "28-30 Sep" },
  ]);
});

test("page traffic query validates month, year, and supported domain", () => {
  assert.deepEqual(parsePageTrafficQuery({ year: "2026", month: "9", domain: "easylegal.id" }), {
    year: 2026,
    month: 9,
    domain: "easylegal.id",
  });
  assert.throws(() => parsePageTrafficQuery({ year: "2026", month: "13", domain: "all" }), /Bulan/);
  assert.throws(() => parsePageTrafficQuery({ year: "2019", month: "9", domain: "all" }), /Tahun/);
  assert.throws(() => parsePageTrafficQuery({ year: "2026", month: "9", domain: "example.com" }), /Domain/);
});

test("page traffic aggregation totals known GA4 rows without double-counting metrics", () => {
  const ranges = monthWeekRanges(2026, 9);
  const rows = aggregatePageTrafficRows([
    { hostname: "easylegal.id", path: "/izin", title: "Izin", date: "20260901", views: 10, users: 8, sessions: 9, engagedSessions: 6, engagementDuration: 90 },
    { hostname: "www.easylegal.id", path: "/izin", title: "Izin", date: "20260908", views: 5, users: 4, sessions: 5, engagedSessions: 3, engagementDuration: 40 },
    { hostname: "easylegal.co.id", path: "/pt", title: "PT", date: "20260902", views: 20, users: 15, sessions: 18, engagedSessions: 12, engagementDuration: 180 },
  ], ranges);

  assert.deepEqual(rows, [
    {
      domain: "easylegal.co.id", path: "/pt", title: "PT", weeklyViews: [20, 0, 0, 0, 0],
      totalViews: 20, users: 15, sessions: 18, viewsPerUser: 1.33, engagementRate: 66.67, averageEngagementSeconds: 12,
    },
    {
      domain: "easylegal.id", path: "/izin", title: "Izin", weeklyViews: [10, 5, 0, 0, 0],
      totalViews: 15, users: 12, sessions: 14, viewsPerUser: 1.25, engagementRate: 64.29, averageEngagementSeconds: 10.83,
    },
  ]);
});

test("page traffic workbook keeps monthly users distinct from daily view rows", async () => {
  const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
  const originalFetch = global.fetch;
  const originalEnv = {
    propertyId: process.env.GA4_PROPERTY_ID_EASYLEGAL_ID,
    sharedPropertyId: process.env.GA4_PROPERTY_ID_SHARED,
    serviceAccount: process.env.GA4_SERVICE_ACCOUNT_JSON,
  };
  process.env.GA4_PROPERTY_ID_EASYLEGAL_ID = "property-id";
  process.env.GA4_PROPERTY_ID_SHARED = "shared-property-id";
  process.env.GA4_SERVICE_ACCOUNT_JSON = JSON.stringify({
    client_email: "ga4-test@example.invalid",
    private_key: privateKey.export({ type: "pkcs8", format: "pem" }),
  });

  global.fetch = async (input, init) => {
    const url = String(input);
    if (url === "https://oauth2.googleapis.com/token") {
      return { ok: true, json: async () => ({ access_token: "test-token" }) } as Response;
    }
    const body = JSON.parse(String(init?.body));
    const isPrimaryProperty = url.includes("/properties/property-id:");
    if (!isPrimaryProperty) return { ok: true, json: async () => ({ rows: [], rowCount: 0 }) } as Response;
    const hasDateDimension = body.dimensions.some((dimension: { name: string }) => dimension.name === "date");
    if (hasDateDimension) {
      return {
        ok: true,
        json: async () => ({
          rowCount: 2,
          rows: [
            { dimensionValues: [{ value: "easylegal.id" }, { value: "/izin" }, { value: "Izin" }, { value: "20260901" }], metricValues: [{ value: "10" }] },
            { dimensionValues: [{ value: "easylegal.id" }, { value: "/izin" }, { value: "Izin" }, { value: "20260908" }], metricValues: [{ value: "5" }] },
          ],
        }),
      } as Response;
    }
    return {
      ok: true,
      json: async () => ({
        rowCount: 1,
        rows: [{
          dimensionValues: [{ value: "easylegal.id" }, { value: "/izin" }, { value: "Izin" }],
          metricValues: [{ value: "8" }, { value: "9" }, { value: "6" }, { value: "90" }],
        }],
      }),
    } as Response;
  };
  try {
    const workbook = await buildPageTrafficWorkbook({ year: 2026, month: 9, domain: "all" });
    const row = workbook.getWorksheet("Performa Halaman")!.getRow(2);
    assert.equal(row.getCell("totalViews").value, 15);
    assert.equal(row.getCell("users").value, 8);
    assert.equal(row.getCell("sessions").value, 9);
    assert.equal(row.getCell("viewsPerUser").value, 1.88);
  } finally {
    global.fetch = originalFetch;
    if (originalEnv.propertyId === undefined) delete process.env.GA4_PROPERTY_ID_EASYLEGAL_ID;
    else process.env.GA4_PROPERTY_ID_EASYLEGAL_ID = originalEnv.propertyId;
    if (originalEnv.sharedPropertyId === undefined) delete process.env.GA4_PROPERTY_ID_SHARED;
    else process.env.GA4_PROPERTY_ID_SHARED = originalEnv.sharedPropertyId;
    if (originalEnv.serviceAccount === undefined) delete process.env.GA4_SERVICE_ACCOUNT_JSON;
    else process.env.GA4_SERVICE_ACCOUNT_JSON = originalEnv.serviceAccount;
  }
});
