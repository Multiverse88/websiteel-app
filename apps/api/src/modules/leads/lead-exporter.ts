import ExcelJS from "exceljs";
import { getDefaultFollowUpAdvice, prettifyServiceName } from "./lead-cleaner";
import type { ExportAIInsight } from "./ai-export-service";
import { SOURCE_LABELS } from "./lead-domain";

const CRIMSON = "FF990202";
const CRIMSON_LIGHT = "FFFEEAEA";
const GRAY_DARK = "FF374151";
const GRAY_LIGHT = "FFF3F4F6";

type LeadForExport = {
  leadCode: string;
  status: string;
  service: string | null;
  product: string | null;
  sourceCode: string;
  source: string | null;
  channel: string;
  domain: string | null;
  number: { number: string; label: string | null } | null;
  orderValue: number | null;
  notes: string | null;
  lostReason: string | null;
  createdAt: Date;
  isSuspectedBot: boolean;
  updatedAt: Date;
  wonAt: Date | null;
  lostAt: Date | null;
};

type NumberForExport = {
  number: string;
  label: string | null;
  clickCount: number;
  isActive: boolean;
  createdAt: Date;
};

function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "";
  return new Date(d).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function humanStatus(s: string): string {
  const map: Record<string, string> = {
    NEW: "Baru",
    CONTACTED: "Dihubungi",
    QUALIFIED: "Terkualifikasi",
    PROPOSAL: "Penawaran/Nego",
    WON: "Closing",
    LOST: "Tidak Jadi",
  };
  return map[s] || s;
}

function humanTemperature(s: string): string {
  if (s === "WON") return "HOT";
  if (s === "NEW" || s === "LOST") return "COLD";
  return "WARM";
}

function styleHeaderRow(row: ExcelJS.Row) {
  row.height = 22;
  row.eachCell((cell) => {
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: CRIMSON } };
    cell.font = { color: { argb: "FFFFFFFF" }, bold: true, size: 10 };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "thin", color: { argb: "FFD1D5DB" } },
      left: { style: "thin", color: { argb: "FFD1D5DB" } },
      bottom: { style: "thin", color: { argb: "FFD1D5DB" } },
      right: { style: "thin", color: { argb: "FFD1D5DB" } },
    };
  });
}

function styleDataCell(cell: ExcelJS.Cell, isAlt: boolean) {
  cell.font = { size: 10, color: { argb: GRAY_DARK } };
  cell.alignment = { vertical: "middle", wrapText: true };
  if (isAlt) cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: GRAY_LIGHT } };
  cell.border = {
    top: { style: "thin", color: { argb: "FFE5E7EB" } },
    left: { style: "thin", color: { argb: "FFE5E7EB" } },
    bottom: { style: "thin", color: { argb: "FFE5E7EB" } },
    right: { style: "thin", color: { argb: "FFE5E7EB" } },
  };
}

export async function buildLeadsExportWorkbook(params: {
  leads: LeadForExport[];
  numbers: NumberForExport[];
  type: "leads" | "numbers" | "all";
  periodLabel: string;
  withAI: boolean;
  aiInsight?: ExportAIInsight | null;
}): Promise<ExcelJS.Workbook> {
  const { leads, numbers, type, periodLabel, withAI, aiInsight } = params;
  const wb = new ExcelJS.Workbook();
  wb.creator = "EasyLegal";
  wb.created = new Date();

  // --- Derived metrics ---
  const funnel: Record<string, number> = {};
  let totalWonValue = 0;
  const bySource: Record<string, number> = {};
  const byDomain: Record<string, number> = {};
  for (const l of leads) {
    funnel[l.status] = (funnel[l.status] || 0) + 1;
    if (l.status === "WON" && l.orderValue) totalWonValue += l.orderValue;
    const src = l.sourceCode || "unknown";
    bySource[src] = (bySource[src] || 0) + 1;
    const dom = l.domain || "Tidak diketahui";
    byDomain[dom] = (byDomain[dom] || 0) + 1;
  }
  const total = leads.length;
  const won = funnel.WON || 0;
  const conversion = total > 0 ? (won / total) * 100 : 0;
  const totalClicks = numbers.reduce((s, n) => s + n.clickCount, 0);

  // ========== Sheet 1: Ringkasan & AI Insight ==========
  const wsSummary = wb.addWorksheet("Ringkasan & Insight", {
    properties: { tabColor: { argb: CRIMSON } },
  });
  wsSummary.columns = [
    { header: "", key: "a", width: 32 },
    { header: "", key: "b", width: 22 },
    { header: "", key: "c", width: 22 },
    { header: "", key: "d", width: 18 },
  ];

  // Title
  const titleRow = wsSummary.addRow(["Ringkasan Export WhatsApp Rotator"]);
  titleRow.font = { size: 16, bold: true, color: { argb: CRIMSON } };
  titleRow.height = 28;
  wsSummary.mergeCells(`A1:D1`);
  wsSummary.addRow([`Periode: ${periodLabel}`]).font = { size: 10, color: { argb: "FF6B7280" }, italic: true };
  wsSummary.addRow([`Diekspor: ${fmtDate(new Date())}  •  Total Leads: ${total}  •  Total Nomor CS: ${numbers.length}`]).font = {
    size: 9,
    color: { argb: "FF6B7280" },
  };
  wsSummary.addRow([]);

  // KPI block
  const kpiHeader = wsSummary.addRow(["Metrik Utama", "Nilai", "", ""]);
  kpiHeader.eachCell((c) => {
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: CRIMSON } };
    c.font = { color: { argb: "FFFFFFFF" }, bold: true, size: 10 };
    c.alignment = { horizontal: "center", vertical: "middle" };
  });
  kpiHeader.height = 20;
  wsSummary.mergeCells(`C${kpiHeader.number}:D${kpiHeader.number}`);
  const kpis: [string, string][] = [
    ["Total Leads Masuk", String(total)],
    ["Closing (WON)", String(won)],
    ["Conversion Rate", `${conversion.toFixed(1)}%`],
    ["Total Nilai Order WON", `Rp ${totalWonValue.toLocaleString("id-ID")}`],
    ["Leads Batal (LOST)", String(funnel.LOST || 0)],
    ["Pipeline Aktif (Contacted+Qualified+Proposal)", String((funnel.CONTACTED || 0) + (funnel.QUALIFIED || 0) + (funnel.PROPOSAL || 0))],
  ];
  kpis.forEach(([k, v], idx) => {
    const r = wsSummary.addRow([k, v]);
    r.eachCell((c) => {
      c.font = { size: 10, color: { argb: GRAY_DARK } };
      c.alignment = { vertical: "middle" };
      if (idx % 2 === 0) c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF8F0" } };
      c.border = { top: { style: "thin", color: { argb: "FFE5E7EB" } }, left: { style: "thin", color: { argb: "FFE5E7EB" } }, bottom: { style: "thin", color: { argb: "FFE5E7EB" } }, right: { style: "thin", color: { argb: "FFE5E7EB" } } };
    });
    if (k.includes("Conversion") || k.includes("Nilai Order")) {
      r.getCell(2).font = { bold: true, color: { argb: CRIMSON }, size: 11 };
    }
    wsSummary.mergeCells(`B${r.number}:D${r.number}`);
  });
  wsSummary.addRow([]);

  // Funnel table
  const funnelTitle = wsSummary.addRow(["Funnel Status"]);
  funnelTitle.font = { bold: true, color: { argb: CRIMSON }, size: 11 };
  const funnelHeader = wsSummary.addRow(["Status", "Jumlah", "Persentase", ""]);
  styleHeaderRow(funnelHeader);
  wsSummary.mergeCells(`C${funnelHeader.number}:D${funnelHeader.number}`);
  (["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"] as const).forEach((s, idx) => {
    const count = funnel[s] || 0;
    const pct = total > 0 ? (count / total) * 100 : 0;
    const r = wsSummary.addRow([humanStatus(s), count, `${pct.toFixed(1)}%`]);
    r.eachCell((c) => styleDataCell(c, idx % 2 === 0));
    (r.getCell(2) as ExcelJS.Cell).numFmt = "#,##0";
    wsSummary.mergeCells(`C${r.number}:D${r.number}`);
  });
  wsSummary.addRow([]);

  // By source
  if (Object.keys(bySource).length > 0) {
    const t = wsSummary.addRow(["Leads per Sumber Trafik"]);
    t.font = { bold: true, color: { argb: CRIMSON }, size: 11 };
    const h = wsSummary.addRow(["Sumber", "Jumlah", "Share", ""]);
    styleHeaderRow(h);
    wsSummary.mergeCells(`C${h.number}:D${h.number}`);
    Object.entries(bySource)
      .sort((a, b) => b[1] - a[1])
      .forEach(([src, cnt], idx) => {
        const label = (SOURCE_LABELS as Record<string, string>)[src] || src;
        const share = total > 0 ? (cnt / total) * 100 : 0;
        const r = wsSummary.addRow([label, cnt, `${share.toFixed(1)}%`]);
        r.eachCell((c) => styleDataCell(c, idx % 2 === 0));
        wsSummary.mergeCells(`C${r.number}:D${r.number}`);
      });
    wsSummary.addRow([]);
  }

  // AI Insight section
  if (withAI && aiInsight) {
    const aiTitle = wsSummary.addRow(["✨ Analisis & Rekomendasi AI"]);
    aiTitle.font = { bold: true, color: { argb: CRIMSON }, size: 12 };
    aiTitle.fill = { type: "pattern", pattern: "solid", fgColor: { argb: CRIMSON_LIGHT } };
    wsSummary.mergeCells(`A${aiTitle.number}:D${aiTitle.number}`);
    aiTitle.height = 24;

    const addSection = (heading: string, lines: string[]) => {
      const hr = wsSummary.addRow([heading]);
      hr.font = { bold: true, size: 10, color: { argb: GRAY_DARK } };
      hr.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF3E0" } };
      wsSummary.mergeCells(`A${hr.number}:D${hr.number}`);
      for (const line of lines) {
        const rr = wsSummary.addRow([`•  ${line}`]);
        rr.font = { size: 10, color: { argb: GRAY_DARK } };
        rr.alignment = { wrapText: true, vertical: "top" };
        wsSummary.mergeCells(`A${rr.number}:D${rr.number}`);
        rr.height = 18;
      }
      wsSummary.addRow([]);
    };

    const summaryLines = aiInsight.executiveSummary
      .split(/(?<=\.)\s+/)
      .filter(Boolean)
      .slice(0, 6);
    const execRow = wsSummary.addRow([aiInsight.executiveSummary]);
    execRow.font = { size: 10, color: { argb: GRAY_DARK }, italic: true };
    execRow.alignment = { wrapText: true, vertical: "top" };
    wsSummary.mergeCells(`A${execRow.number}:D${execRow.number}`);
    execRow.height = 36;
    wsSummary.addRow([]);

    if (aiInsight.keyFindings?.length) addSection("Temuan Kunci", aiInsight.keyFindings);
    if (aiInsight.conversionAdvice?.length) addSection("Saran Peningkatan Konversi", aiInsight.conversionAdvice);
    if (aiInsight.closingTactics?.length) addSection("Taktik Closing untuk Tim CS/Sales", aiInsight.closingTactics);
  } else if (withAI && !aiInsight) {
    const r = wsSummary.addRow(["Analisis AI tidak tersedia untuk export ini (kunci API belum dikonfigurasi atau layanan AI sedang tidak merespons). Laporan tetap rapi dengan ringkasan deterministik di atas."]);
    r.font = { size: 9, color: { argb: "FF9CA3AF" }, italic: true };
    r.alignment = { wrapText: true };
    wsSummary.mergeCells(`A${r.number}:D${r.number}`);
  }

  // Auto height tweak
  wsSummary.eachRow((row) => {
    if (!row.height) row.height = 16;
  });

  // ========== Sheet 2: Leads ==========
  if (type === "leads" || type === "all") {
    const ws = wb.addWorksheet("Leads", { properties: { tabColor: { argb: "FF10B981" } } });
    const headers = [
      "Kode Lead",
      "Status",
      "Temperature",
      "Layanan",
      "Halaman",
      "Sumber",
      "Channel",
      "Domain",
      "Nomor Tujuan",
      "Label CS",
      "Nilai Order (IDR)",
      "Catatan",
      "Alasan Batal",
      "Saran Follow-Up CS",
      "Tanggal Masuk",
      "Tanggal Update",
      "Tanggal Closing",
      "Tanggal Batal",
      "Terindikasi Bot",
    ];
    const headerRow = ws.addRow(headers);
    styleHeaderRow(headerRow);
    ws.views = [{ state: "frozen", ySplit: 1 }];
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: headers.length } };

    leads.forEach((l, idx) => {
      const serviceName = prettifyServiceName(l.service, l.product);
      const row = ws.addRow([
        l.leadCode,
        humanStatus(l.status),
        humanTemperature(l.status),
        serviceName,
        l.product || "",
        (SOURCE_LABELS as Record<string, string>)[l.sourceCode] || l.source || l.sourceCode || "",
        l.channel || "",
        l.domain || "",
        l.number?.number || "",
        l.number?.label || "",
        l.orderValue ?? "",
        (l.notes || "").trim(),
        (l.lostReason || "").trim(),
        getDefaultFollowUpAdvice(l.status, serviceName, l.lostReason),
        fmtDate(l.createdAt),
        fmtDate(l.updatedAt),
        fmtDate(l.wonAt),
        fmtDate(l.lostAt),
        l.isSuspectedBot ? "Ya (crawl/bot terdeteksi retroaktif)" : "",
      ]);
      row.eachCell((cell, colNumber) => {
        styleDataCell(cell, idx % 2 === 0);
        // Right-align currency, mono for lead code
        if (colNumber === 11 && typeof l.orderValue === "number") {
          (cell as ExcelJS.Cell).numFmt = "#,##0";
          cell.alignment = { horizontal: "right", vertical: "middle" };
        }
        if (colNumber === 1) {
          cell.font = { ...(cell.font as object), name: "Consolas", size: 10 } as ExcelJS.Font;
        }
        // Color status pill-like via font color
        if (colNumber === 2) {
          const colorMap: Record<string, string> = {
            Baru: "FF3B82F6",
            Dihubungi: "FFD97706",
            Terkualifikasi: "FF6366F1",
            "Penawaran/Nego": "FF8B5CF6",
            Closing: "FF059669",
            "Tidak Jadi": "FF9CA3AF",
          };
          const c = colorMap[String(cell.value)] || GRAY_DARK;
          cell.font = { bold: true, color: { argb: c }, size: 10 } as ExcelJS.Font;
        }
      });
      row.height = 18;
      // Wrap long columns
      [4, 5, 12, 14].forEach((col) => {
        const cell = row.getCell(col);
        cell.alignment = { wrapText: true, vertical: "middle" };
      });
    });

    ws.columns = [
      { width: 14 },
      { width: 16 },
      { width: 13 },
      { width: 32 },
      { width: 28 },
      { width: 16 },
      { width: 16 },
      { width: 18 },
      { width: 16 },
      { width: 16 },
      { width: 18 },
      { width: 30 },
      { width: 22 },
      { width: 42 },
      { width: 18 },
      { width: 18 },
      { width: 18 },
      { width: 18 },
      { width: 26 },
    ];
  }

  // ========== Sheet 3: Nomor Rotator ==========
  if (type === "numbers" || type === "all") {
    const ws = wb.addWorksheet("Nomor Rotator", { properties: { tabColor: { argb: "FF0EA5E9" } } });
    const headers = ["Nomor", "Label CS", "Jumlah Klik", "Share (%)", "Status", "Tanggal Dibuat"];
    const hr = ws.addRow(headers);
    styleHeaderRow(hr);
    ws.views = [{ state: "frozen", ySplit: 1 }];
    ws.autoFilter = { from: { row: 1, column: 1 }, to: { row: 1, column: headers.length } };
    numbers.forEach((n, idx) => {
      const share = totalClicks > 0 ? (n.clickCount / totalClicks) * 100 : 0;
      const row = ws.addRow([n.number, n.label || "", n.clickCount, Number(share.toFixed(1)), n.isActive ? "Aktif" : "Nonaktif", fmtDate(n.createdAt)]);
      row.eachCell((cell, col) => {
        styleDataCell(cell, idx % 2 === 0);
        if (col === 3) (cell as ExcelJS.Cell).numFmt = "#,##0";
        if (col === 4) (cell as ExcelJS.Cell).numFmt = "0.0";
      });
      row.height = 18;
    });
    ws.columns = [{ width: 18 }, { width: 22 }, { width: 14 }, { width: 12 }, { width: 12 }, { width: 20 }];
  }

  return wb;
}

export function buildLeadsCsv(
  leads: LeadForExport[],
  withAI: boolean,
): string {
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return /["\n\r,;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const headers = [
    "Kode Lead",
    "Status",
    "Temperature",
    "Layanan",
    "Halaman",
    "Sumber",
    "Channel",
    "Domain",
    "Nomor Tujuan",
    "Label CS",
    "Nilai Order (IDR)",
    "Catatan",
    "Alasan Batal",
    ...(withAI ? ["Saran Follow-Up CS"] : []),
    "Tanggal Masuk",
    "Tanggal Update",
    "Terindikasi Bot",
  ];
  const rows = leads.map((l) => {
    const serviceName = prettifyServiceName(l.service, l.product);
    const base: Record<string, unknown> = {
      "Kode Lead": l.leadCode,
      Status: humanStatus(l.status),
      Temperature: humanTemperature(l.status),
      Layanan: serviceName,
      Halaman: l.product || "",
      Sumber: (SOURCE_LABELS as Record<string, string>)[l.sourceCode] || l.source || "",
      Channel: l.channel || "",
      Domain: l.domain || "",
      "Nomor Tujuan": l.number?.number || "",
      "Label CS": l.number?.label || "",
      "Nilai Order (IDR)": l.orderValue ?? "",
      Catatan: l.notes || "",
      "Alasan Batal": l.lostReason || "",
      "Tanggal Masuk": fmtDate(l.createdAt),
      "Tanggal Update": fmtDate(l.updatedAt),
      "Terindikasi Bot": l.isSuspectedBot ? "Ya (crawl/bot terdeteksi retroaktif)" : "",
    };
    if (withAI) (base as Record<string, unknown>)["Saran Follow-Up CS"] = getDefaultFollowUpAdvice(l.status, serviceName, l.lostReason);
    return base;
  });
  const lines = [headers.map(escape).join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))];
  return "﻿" + lines.join("\n");
}

export function buildNumbersCsv(numbers: NumberForExport[]): string {
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    const s = String(v);
    return /["\n\r,;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const totalClicks = numbers.reduce((s, n) => s + n.clickCount, 0);
  const headers = ["Nomor", "Label CS", "Jumlah Klik", "Share (%)", "Status", "Tanggal Dibuat"];
  const rows: Record<string, unknown>[] = numbers.map((n) => ({
    Nomor: n.number,
    "Label CS": n.label || "",
    "Jumlah Klik": n.clickCount,
    "Share (%)": totalClicks > 0 ? Number(((n.clickCount / totalClicks) * 100).toFixed(1)) : 0,
    Status: n.isActive ? "Aktif" : "Nonaktif",
    "Tanggal Dibuat": fmtDate(n.createdAt),
  }));
  const lines = [headers.map(escape).join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))];
  return "﻿" + lines.join("\n");
}
