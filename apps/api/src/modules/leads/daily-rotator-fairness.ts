const WIB_OFFSET_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type DailyClickCount = {
  numberId: string;
  count: number;
};

export type RotatorNumber = {
  id: string;
  createdAt: Date;
};

/** Rentang satu hari kalender WIB, disimpan sebagai timestamp UTC. */
export function getWibDayRange(now = new Date()): { start: Date; end: Date } {
  const wibNow = new Date(now.getTime() + WIB_OFFSET_MS);
  const start = new Date(
    Date.UTC(wibNow.getUTCFullYear(), wibNow.getUTCMonth(), wibNow.getUTCDate()) - WIB_OFFSET_MS,
  );
  return { start, end: new Date(start.getTime() + DAY_MS) };
}

/** Pilih nomor dengan klik hari ini paling sedikit; usia lalu id memecah seri secara deterministik. */
export function chooseDailyFairNumber<T extends RotatorNumber>(
  numbers: readonly T[],
  dailyCounts: readonly DailyClickCount[],
): T | null {
  const countsByNumber = new Map(dailyCounts.map(({ numberId, count }) => [numberId, count]));
  let selected: T | null = null;
  let selectedCount = Number.POSITIVE_INFINITY;

  for (const number of numbers) {
    const count = countsByNumber.get(number.id) ?? 0;
    if (
      count < selectedCount ||
      (count === selectedCount && selected !== null && number.createdAt < selected.createdAt) ||
      (count === selectedCount && selected !== null && number.createdAt.getTime() === selected.createdAt.getTime() && number.id < selected.id)
    ) {
      selected = number;
      selectedCount = count;
    }
  }

  return selected;
}
