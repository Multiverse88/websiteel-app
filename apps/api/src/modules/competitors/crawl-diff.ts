export interface SnapshotSummary {
  url: string;
  statusCode: number;
  title: string | null;
  metaDescription: string | null;
  h1: string | null;
  headings: unknown;
  mainText: string | null;
  priceTexts: unknown;
  ctas: unknown;
  contentHash: string;
  classification: string;
}

export interface DiffDetail {
  field: string;
  before: unknown;
  after: unknown;
}

export interface DiffItem {
  url: string;
  changeTypes: ("ADDED_PAGE" | "REMOVED_PAGE" | "SEO_CHANGED" | "PRICE_CHANGED" | "CTA_CHANGED" | "STATUS_CHANGED" | "CONTENT_CHANGED")[];
  details: DiffDetail[];
}

export interface DiffResult {
  currentCrawlId: string;
  previousCrawlId: string | null;
  summary: {
    added: number;
    removed: number;
    changed: number;
    unchanged: number;
  };
  changes: DiffItem[];
}

export function computeCrawlDiff(
  currentCrawlId: string,
  currentSnapshots: SnapshotSummary[],
  previousCrawlId: string | null,
  previousSnapshots: SnapshotSummary[],
): DiffResult {
  if (!previousCrawlId || previousSnapshots.length === 0) {
    const changes: DiffItem[] = currentSnapshots.map((s) => ({
      url: s.url,
      changeTypes: ["ADDED_PAGE"],
      details: [{ field: "page", before: null, after: s.url }],
    }));
    return {
      currentCrawlId,
      previousCrawlId: null,
      summary: {
        added: currentSnapshots.length,
        removed: 0,
        changed: 0,
        unchanged: 0,
      },
      changes,
    };
  }

  const prevMap = new Map<string, SnapshotSummary>();
  for (const p of previousSnapshots) {
    prevMap.set(p.url, p);
  }

  const currentUrls = new Set<string>();
  const changes: DiffItem[] = [];
  let unchangedCount = 0;

  for (const curr of currentSnapshots) {
    currentUrls.add(curr.url);
    const prev = prevMap.get(curr.url);

    if (!prev) {
      changes.push({
        url: curr.url,
        changeTypes: ["ADDED_PAGE"],
        details: [{ field: "page", before: null, after: curr.url }],
      });
      continue;
    }

    const details: DiffDetail[] = [];
    const changeTypes: DiffItem["changeTypes"] = [];

    if (curr.statusCode !== prev.statusCode) {
      changeTypes.push("STATUS_CHANGED");
      details.push({ field: "statusCode", before: prev.statusCode, after: curr.statusCode });
    }

    if (curr.title !== prev.title) {
      changeTypes.push("SEO_CHANGED");
      details.push({ field: "title", before: prev.title, after: curr.title });
    }

    if (curr.metaDescription !== prev.metaDescription) {
      if (!changeTypes.includes("SEO_CHANGED")) changeTypes.push("SEO_CHANGED");
      details.push({ field: "metaDescription", before: prev.metaDescription, after: curr.metaDescription });
    }

    if (curr.h1 !== prev.h1) {
      if (!changeTypes.includes("SEO_CHANGED")) changeTypes.push("SEO_CHANGED");
      details.push({ field: "h1", before: prev.h1, after: curr.h1 });
    }

    const currPrices = Array.isArray(curr.priceTexts) ? curr.priceTexts : [];
    const prevPrices = Array.isArray(prev.priceTexts) ? prev.priceTexts : [];
    if (JSON.stringify(currPrices.sort()) !== JSON.stringify(prevPrices.sort())) {
      changeTypes.push("PRICE_CHANGED");
      details.push({ field: "priceTexts", before: prevPrices, after: currPrices });
    }

    const currCtas = Array.isArray(curr.ctas) ? curr.ctas : [];
    const prevCtas = Array.isArray(prev.ctas) ? prev.ctas : [];
    if (JSON.stringify(currCtas) !== JSON.stringify(prevCtas)) {
      changeTypes.push("CTA_CHANGED");
      details.push({ field: "ctas", before: prevCtas, after: currCtas });
    }

    if (curr.contentHash !== prev.contentHash && changeTypes.length === 0) {
      changeTypes.push("CONTENT_CHANGED");
      details.push({ field: "content", before: "Versi sebelumnya", after: "Konten diperbarui" });
    }

    if (changeTypes.length > 0) {
      changes.push({ url: curr.url, changeTypes, details });
    } else {
      unchangedCount++;
    }
  }

  let removedCount = 0;
  for (const prev of previousSnapshots) {
    if (!currentUrls.has(prev.url)) {
      removedCount++;
      changes.push({
        url: prev.url,
        changeTypes: ["REMOVED_PAGE"],
        details: [{ field: "page", before: prev.url, after: null }],
      });
    }
  }

  const addedCount = changes.filter((c) => c.changeTypes.includes("ADDED_PAGE")).length;
  const changedCount = changes.length - addedCount - removedCount;

  return {
    currentCrawlId,
    previousCrawlId,
    summary: {
      added: addedCount,
      removed: removedCount,
      changed: changedCount,
      unchanged: unchangedCount,
    },
    changes,
  };
}
