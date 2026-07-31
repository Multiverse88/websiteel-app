"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader2, Download, BarChart3, Users, MailOpen, MousePointerClick, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCampaignAction, cancelCampaignAction } from "../../actions";

export default function CampaignDetailClient({ campaign, totalRecipients, totalSent, totalOpened, totalClicked }: any) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalPending = campaign.recipients.filter((r: any) => r.status === "pending").length;
  const totalFailed = campaign.recipients.filter((r: any) => r.status === "failed").length;
  const totalBounced = campaign.recipients.filter((r: any) => r.bouncedAt !== null).length;

  useEffect(() => {
    if (totalPending > 0) {
      const interval = setInterval(() => {
        router.refresh();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [totalPending, router]);

  // Hourly Activity Array (grouping by 3 hours: 0-2, 3-5, 6-8, 9-11, 12-14, 15-17, 18-20, 21-23)
  const hourly = new Array(8).fill(0);
  campaign.recipients.forEach((r: any) => {
    if (r.openedAt) {
      const hour = new Date(r.openedAt).getHours();
      hourly[Math.floor(hour / 3)]++;
    }
  });
  const maxHour = Math.max(...hourly, 1);
  const peakHour = hourly.indexOf(Math.max(...hourly));

  // Device Breakdown
  const deviceMap: Record<string, number> = {};
  campaign.recipients.forEach((r: any) => {
    if (r.device) {
      deviceMap[r.device] = (deviceMap[r.device] || 0) + 1;
    }
  });

  const totalDeviceCount = Object.values(deviceMap).reduce((a, b) => a + b, 0);
  const devices = totalDeviceCount > 0
    ? Object.entries(deviceMap).map(([label, count]) => ({
        label,
        pct: Math.round((count as number / totalDeviceCount) * 100)
      })).sort((a, b) => b.pct - a.pct).slice(0, 4)
    : [];

  // Tooltip Logic
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });
  const showTooltip = (e: React.MouseEvent, content: string) => setTooltip({ visible: true, x: e.clientX, y: e.clientY, content });
  const hideTooltip = () => setTooltip({ visible: false, x: 0, y: 0, content: "" });
  const moveTooltip = (e: React.MouseEvent) => setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));

  // Filtering Logic
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredRecipients = campaign.recipients.filter((r: any) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "sent") return r.status === "sent";
    if (filterStatus === "opened") return r.openedAt !== null;
    if (filterStatus === "clicked") return r.clickedAt !== null;
    if (filterStatus === "failed") return r.status === "failed" || r.bouncedAt !== null;
    return true;
  });

  const totalPages = Math.ceil(filteredRecipients.length / itemsPerPage);
  const paginatedRecipients = filteredRecipients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const clickRate = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;

  const links = campaign.links ? [...campaign.links].sort((a: any, b: any) => b.clicks - a.clicks) : [];
  const maxClick = Math.max(...links.map((l: any) => l.clicks), 1);

  // CSV Export Logic
  const handleExportCSV = () => {
    const headers = ["Nama", "Email", "Status", "Dikirim Pada", "Buka Pertama", "Jumlah Buka", "Klik Link", "Device"];
    const rows = filteredRecipients.map((r: any) => [
      `"${r.contact.name || ''}"`,
      `"${r.contact.email}"`,
      r.status,
      r.sentAt ? new Date(r.sentAt).toISOString() : "",
      r.openedAt ? new Date(r.openedAt).toISOString() : "",
      r.openCount || 0,
      r.clickedAt ? new Date(r.clickedAt).toISOString() : "",
      `"${r.device || ''}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r: any[]) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `campaign_report_${campaign.id}_${filterStatus}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getInitials = (email: string) => {
    if (!email) return "?";
    return email.substring(0, 2).toUpperCase();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">

        {/* ── Top Bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
          <div className="flex items-start gap-4">
            <Link
              href="/dashboard/email-blast/riwayat"
              className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors hover:bg-[var(--color-primary-light)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
                  RIWAYAT CAMPAIGN
                </span>
                {campaign.status === "completed" || campaign.status === "sent" ? (
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full bg-emerald-50 text-emerald-700">
                    COMPLETED
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full" style={{ background: "var(--color-border)", color: "var(--color-text-muted)" }}>
                    {campaign.status.toUpperCase()}
                  </span>
                )}
                {totalPending > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full bg-amber-50 text-amber-700 flex items-center gap-1">
                    <Loader2 className="w-3 h-3 animate-spin" /> PROSES ({totalPending})
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-text-main)" }}>
                {campaign.internalName || campaign.subject}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {totalPending > 0 && (
              <button
                onClick={async () => {
                  if (confirm("Yakin ingin membatalkan sisa antrean campaign ini?")) {
                    await cancelCampaignAction(campaign.id);
                  }
                }}
                className="px-4 py-2 text-[13px] font-semibold rounded-xl border transition-colors hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
              >
                Batalkan Sisa
              </button>
            )}
            {campaign.status !== "processing" && (
              <>
                <Link
                  href={`/dashboard/email-blast/riwayat/${campaign.id}/edit`}
                  className="px-4 py-2 text-[13px] font-semibold rounded-xl border transition-colors hover:bg-gray-50"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-main)" }}
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (confirm("Yakin ingin menghapus campaign ini secara permanen?")) {
                      const res = await deleteCampaignAction(campaign.id);
                      if (res.success) {
                        router.push("/dashboard/email-blast/riwayat");
                      } else {
                        alert(res.error);
                      }
                    }
                  }}
                  className="px-4 py-2 text-[13px] font-semibold rounded-xl border transition-colors hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
                >
                  <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                  Hapus
                </button>
              </>
            )}
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 text-[13px] font-semibold rounded-xl text-white transition-all hover:opacity-90 shadow-subtle"
              style={{ background: "var(--color-primary)" }}
            >
              <Download className="w-3.5 h-3.5 inline mr-1.5" />
              Export CSV ({filteredRecipients.length})
            </button>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Sent */}
          <div className="rounded-2xl p-5 border shadow-subtle hover:shadow-medium transition-shadow relative overflow-hidden" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: "var(--color-text-disabled)" }} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>Terkirim</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-border)" }}>
                <MailOpen className="w-4 h-4" style={{ color: "var(--color-text-muted)" }} />
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight" style={{ color: "var(--color-text-main)" }}>{totalSent}</div>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
              <div className="h-full rounded-full" style={{ width: "100%", background: "var(--color-text-disabled)" }} />
            </div>
          </div>

          {/* Total Opened */}
          <div className="rounded-2xl p-5 border shadow-subtle hover:shadow-medium transition-shadow relative overflow-hidden" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-amber-400" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>Dibuka</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50">
                <BarChart3 className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--color-text-main)" }}>{totalOpened}</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700">{openRate}%</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
              <div className="h-full rounded-full bg-amber-400 transition-all duration-500" style={{ width: `${openRate}%` }} />
            </div>
          </div>

          {/* Total Clicked */}
          <div className="rounded-2xl p-5 border shadow-subtle hover:shadow-medium transition-shadow relative overflow-hidden" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: "var(--color-primary)" }} />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>Diklik</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--color-primary-light)" }}>
                <MousePointerClick className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight" style={{ color: "var(--color-text-main)" }}>{totalClicked}</span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-md" style={{ background: "var(--color-border)", color: "var(--color-text-muted)" }}>{clickRate}%</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${clickRate}%`, background: "var(--color-primary)" }} />
            </div>
          </div>

          {/* Failed / Bounced */}
          <div className="rounded-2xl p-5 border shadow-subtle hover:shadow-medium transition-shadow relative overflow-hidden" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-red-500" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>Gagal</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-50">
                <span className="text-sm font-bold text-red-500">!</span>
              </div>
            </div>
            <div className="text-3xl font-bold tracking-tight text-red-600">{totalFailed + totalBounced}</div>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
              <div className="h-full rounded-full bg-red-400" style={{ width: "100%" }} />
            </div>
          </div>
        </div>

        {/* ── Contact Activity Table ── */}
        <div className="rounded-2xl border shadow-subtle mb-6 overflow-hidden" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
            <h3 className="text-sm font-bold" style={{ color: "var(--color-text-main)" }}>Aktivitas Kontak Detail</h3>
            <select
              className="text-[12px] font-semibold px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-colors focus:border-[var(--color-primary)]"
              style={{ borderColor: "var(--color-border)", color: "var(--color-text-main)", background: "var(--color-surface)" }}
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">Semua Status</option>
              <option value="sent">Terkirim</option>
              <option value="opened">Dibuka</option>
              <option value="clicked">Diklik</option>
              <option value="failed">Gagal / Bounced</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--color-border)" }}>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider px-6 py-3" style={{ color: "var(--color-text-muted)" }}>Email</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider px-4 py-3" style={{ color: "var(--color-text-muted)" }}>Status</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider px-4 py-3" style={{ color: "var(--color-text-muted)" }}>Opened</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider px-4 py-3" style={{ color: "var(--color-text-muted)" }}>Clicked</th>
                  <th className="text-left text-[10px] font-bold uppercase tracking-wider px-4 py-3" style={{ color: "var(--color-text-muted)" }}>Total Buka</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRecipients.length > 0 ? paginatedRecipients.map((r: any, i: number) => (
                  <tr
                    key={i}
                    className="border-b transition-colors hover:bg-gray-50/50"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0" style={{ background: "var(--color-border)", color: "var(--color-text-muted)" }}>
                          {getInitials(r.contact.email)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold truncate max-w-[220px]" style={{ color: "var(--color-text-main)" }} title={r.contact.email}>
                            {r.contact.email}
                          </div>
                          <div className="text-[11px] truncate max-w-[220px]" style={{ color: "var(--color-text-disabled)" }} title={r.contact.name || "Unknown"}>
                            {r.contact.name || "Unknown"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wide rounded-full ${
                        r.status === "sent" && r.openedAt
                          ? "bg-emerald-50 text-emerald-700"
                          : r.status === "failed"
                            ? "bg-red-50 text-red-600"
                            : ""
                      }`} style={r.status === "sent" && !r.openedAt ? { background: "var(--color-border)", color: "var(--color-text-muted)" } : undefined}>
                        {r.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[12px] font-medium" style={{ color: r.openedAt ? "var(--color-text-main)" : "var(--color-text-disabled)" }}>
                      {r.openedAt ? new Date(r.openedAt).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
                    </td>
                    <td className="px-4 py-3 text-[12px] font-medium" style={{ color: r.clickedAt ? "var(--color-text-main)" : "var(--color-text-disabled)" }}>
                      {r.clickedAt ? new Date(r.clickedAt).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}
                    </td>
                    <td className="px-4 py-3 text-[12px] font-semibold" style={{ color: r.openCount > 0 ? "var(--color-text-main)" : "var(--color-text-disabled)" }}>
                      {r.openCount > 0 ? `${r.openCount}x` : "—"}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-[13px]" style={{ color: "var(--color-text-disabled)" }}>
                      Belum ada penerima
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t" style={{ borderColor: "var(--color-border)" }}>
            <div className="flex items-center gap-3">
              <span className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                {new Date().toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} ·{" "}
                {filteredRecipients.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredRecipients.length)} dari {filteredRecipients.length}
              </span>
              <select
                className="text-[11px] px-2 py-1 rounded-md border outline-none"
                style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-[11px] font-semibold rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-main)" }}
                >
                  Sebelumnya
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-[11px] font-semibold rounded-lg border transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-main)" }}
                >
                  Selanjutnya
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Chart + Side Panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 mb-6">
          {/* Hourly Activity Chart */}
          <div className="rounded-2xl border p-6 shadow-subtle" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
            <h3 className="text-sm font-bold mb-5" style={{ color: "var(--color-text-main)" }}>Aktivitas Buka Email per Jam</h3>
            <div className="h-[180px] flex items-end gap-1.5 px-1">
              {hourly.map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md relative cursor-pointer transition-all duration-200 hover:opacity-80 min-h-[3px]"
                  style={{
                    height: `${Math.max((v / maxHour) * 100, 3)}%`,
                    background: i === peakHour && v > 0 ? "var(--color-primary)" : "var(--color-border)",
                  }}
                  onMouseEnter={(e) => showTooltip(e, `Pukul ${String(i * 3).padStart(2, "0")}:00 – ${String(i * 3 + 2).padStart(2, "0")}:59\nDibuka: ${v}`)}
                  onMouseLeave={hideTooltip}
                  onMouseMove={moveTooltip}
                />
              ))}
            </div>
            <div className="grid grid-cols-8 gap-1.5 mt-2 px-1">
              {["00", "03", "06", "09", "12", "15", "18", "21"].map((label, i) => (
                <span key={i} className="text-center text-[10px] font-medium" style={{ color: "var(--color-text-disabled)" }}>{label}</span>
              ))}
            </div>
            <div className="mt-4 px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-2.5">
              <span className="text-sm mt-0.5">💡</span>
              <span className="text-[12px] leading-relaxed text-amber-800">
                Peak aktivitas sering terjadi pada siang hari (12.00). Jadwalkan blast berikutnya pada jam tersebut untuk open rate lebih tinggi.
              </span>
            </div>
          </div>

          {/* Side Panel */}
          <div className="flex flex-col gap-4">
            {/* Top Links */}
            <div className="rounded-2xl border p-5 shadow-subtle flex-1" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: "var(--color-text-main)" }}>Link Paling Banyak Diklik</h3>
              {links.length > 0 ? (
                <div className="space-y-3">
                  {links.slice(0, 3).map((l: any, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--color-primary-light)" }}>
                        <ExternalLink className="w-3.5 h-3.5" style={{ color: "var(--color-primary)" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium truncate" style={{ color: "var(--color-text-main)" }} title={l.url}>
                          {l.url.replace(/^https?:\/\//, "")}
                        </div>
                        <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                          <div className="h-full rounded-full" style={{ width: `${(l.clicks / maxClick) * 100}%`, background: "var(--color-primary)" }} />
                        </div>
                      </div>
                      <span className="text-[12px] font-bold shrink-0" style={{ color: "var(--color-text-main)" }}>{l.clicks}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <ExternalLink className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--color-text-disabled)" }} />
                  <p className="text-[12px]" style={{ color: "var(--color-text-disabled)" }}>Belum ada link yang diklik</p>
                </div>
              )}
            </div>

            {/* Device Breakdown */}
            <div className="rounded-2xl border p-5 shadow-subtle" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
              <h3 className="text-sm font-bold mb-4" style={{ color: "var(--color-text-main)" }}>Dibuka via</h3>
              {devices.length > 0 ? (
                <div className="space-y-3">
                  {devices.map((d, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold uppercase" style={{ background: "var(--color-border)", color: "var(--color-text-muted)" }}>
                        {d.label.substring(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-medium" style={{ color: "var(--color-text-main)" }}>{d.label}</div>
                        <div className="mt-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                          <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: "var(--color-primary)" }} />
                        </div>
                      </div>
                      <span className="text-[12px] font-bold shrink-0" style={{ color: "var(--color-text-main)" }}>{d.pct}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Users className="w-6 h-6 mx-auto mb-2" style={{ color: "var(--color-text-disabled)" }} />
                  <p className="text-[12px]" style={{ color: "var(--color-text-disabled)" }}>Belum ada data perangkat</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Email Preview ── */}
        <div className="rounded-2xl border shadow-subtle overflow-hidden" style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
            <h3 className="text-sm font-bold" style={{ color: "var(--color-text-main)" }}>
              Tampilan Email
              <span className="font-normal ml-2 text-[11px]" style={{ color: "var(--color-text-disabled)" }}>— hanya HTML yang berhasil dimuat</span>
            </h3>
          </div>
          <div className="border-t" style={{ borderColor: "var(--color-border)" }}>
            <div className="p-4" style={{ background: "#FAFAFA" }}>
              <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--color-border)" }}>
                <div className="px-5 py-3 flex items-center gap-3" style={{ background: "var(--color-primary)" }}>
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[12px] font-extrabold" style={{ color: "var(--color-primary)" }}>EL</div>
                  <div className="text-white">
                    <div className="text-[14px] font-bold leading-tight">EasyLegal</div>
                    <div className="text-[9px] tracking-wider opacity-75 uppercase">It&apos;s Easy to be Legal</div>
                  </div>
                </div>
                <iframe
                  srcDoc={campaign.bodyHtml}
                  title="Email Preview"
                  className="w-full bg-white"
                  style={{ height: "500px", border: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tooltip ── */}
      {mounted && tooltip.visible && (
        <div
          className="fixed z-[99999] pointer-events-none px-2.5 py-1.5 rounded-lg text-white text-[12px] font-medium leading-snug shadow-lg"
          style={{
            top: tooltip.y - 10,
            left: tooltip.x + 15,
            transform: "translateY(-100%)",
            background: "var(--color-text-main)",
            whiteSpace: "pre-line",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
