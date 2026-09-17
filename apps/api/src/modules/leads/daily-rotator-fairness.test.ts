import assert from "node:assert/strict";
import test from "node:test";
import { chooseDailyFairNumber, getWibDayRange, wibDateStart } from "./daily-rotator-fairness";

const numbers = [
  { id: "cs-a", createdAt: new Date("2026-01-01T00:00:00.000Z"), clickCount: 10_000 },
  { id: "cs-b", createdAt: new Date("2026-01-02T00:00:00.000Z"), clickCount: 1 },
  { id: "cs-c", createdAt: new Date("2026-01-03T00:00:00.000Z"), clickCount: 500 },
];

test("hari rotator berganti tepat pukul 00.00 WIB", () => {
  assert.deepEqual(getWibDayRange(new Date("2026-09-15T16:59:59.999Z")), {
    start: new Date("2026-09-14T17:00:00.000Z"),
    end: new Date("2026-09-15T17:00:00.000Z"),
  });
  assert.deepEqual(getWibDayRange(new Date("2026-09-15T17:00:00.000Z")), {
    start: new Date("2026-09-15T17:00:00.000Z"),
    end: new Date("2026-09-16T17:00:00.000Z"),
  });
});

test("wibDateStart mengembalikan awal hari WIB, bukan awal hari UTC server", () => {
  // "2026-09-17" (WIB) dimulai jam 17:00 UTC tanggal 16, BUKAN 00:00 UTC
  // tanggal 17 — inilah bug yang bikin tab Leads "Hari Ini" (91 lead)
  // tidak cocok dengan tab Nomor & Fairness "Hari Ini" (120 klik): sebelum
  // fix ini, filter tanggal leads memakai hari kalender UTC server dan
  // kehilangan klik WIB 00:00–07:00 pagi itu.
  assert.deepEqual(wibDateStart("2026-09-17"), new Date("2026-09-16T17:00:00.000Z"));
});

test("wibDateStart menolak format tanggal yang tidak valid", () => {
  assert.equal(wibDateStart("bukan-tanggal"), null);
  assert.equal(wibDateStart(""), null);
});

test("total historis tidak memengaruhi fairness hari ini", () => {
  const selected = chooseDailyFairNumber(numbers, [
    { numberId: "cs-a", count: 0 },
    { numberId: "cs-b", count: 2 },
    { numberId: "cs-c", count: 1 },
  ]);

  assert.equal(selected?.id, "cs-a");
});

test("nomor yang aktif kembali tetap membawa jumlah klik hari ini", () => {
  const selected = chooseDailyFairNumber(numbers, [
    { numberId: "cs-a", count: 3 },
    { numberId: "cs-b", count: 1 },
    { numberId: "cs-c", count: 2 },
  ]);

  assert.equal(selected?.id, "cs-b");
});

test("pembagian harian menjaga selisih antar nomor maksimal satu", () => {
  const counts = new Map(numbers.map((number) => [number.id, 0]));

  for (let click = 0; click < 10; click++) {
    const selected = chooseDailyFairNumber(
      numbers,
      [...counts].map(([numberId, count]) => ({ numberId, count })),
    );
    assert.ok(selected);
    counts.set(selected.id, (counts.get(selected.id) ?? 0) + 1);
  }

  assert.deepEqual([...counts.values()], [4, 3, 3]);
});
