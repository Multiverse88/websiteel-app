"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  campaignName: string;
  campaignStatus: string;
  sentThisWeek: number;
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  totalFailed: number;
  activityData: { day: string; sent: number; open: number }[];
  dailyTrend: { day: string; openRate: number; clickRate: number }[];
  topContacts: { name: string; meta: string; stat: string }[];
  coldContacts: { name: string; meta: string }[];
  links: { label: string; url: string; count: number }[];
  devices: { label: string; pct: number }[];
  hourly: number[];
}

export default function CampaignStatistikClient({
  campaignName,
  campaignStatus,
  sentThisWeek,
  totalSent,
  totalOpened,
  totalClicked,
  totalBounced,
  totalFailed,
  activityData,
  dailyTrend,
  topContacts,
  coldContacts,
  links,
  devices,
  hourly,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: string }>({ visible: false, x: 0, y: 0, content: "" });
  const showTooltip = (e: React.MouseEvent, content: string) => setTooltip({ visible: true, x: e.clientX, y: e.clientY, content });
  const hideTooltip = () => setTooltip((p) => ({ ...p, visible: false }));
  const moveTooltip = (e: React.MouseEvent) => { if (tooltip.visible) setTooltip((p) => ({ ...p, x: e.clientX, y: e.clientY })); };

  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const clickRate = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;
  const bounceRate = totalSent > 0 ? Math.round((totalBounced / totalSent) * 100) : 0;
  const ctoRate = openRate > 0 ? Math.round((clickRate / openRate) * 100) : 0;

  const maxSent = Math.max(...activityData.map((d) => d.sent), 1);
  const maxClick = Math.max(...links.map((l) => l.count), 1);
  const maxHour = Math.max(...hourly, 1);

  // Trend line chart
  const w = 1090, h = 190, padX = 40, padY = 24;
  const maxTrend = Math.max(...dailyTrend.map((d) => Math.max(d.openRate, d.clickRate)), 10);
  const trendMax = Math.ceil(maxTrend / 10) * 10;
  const buildLineSVG = (key: "openRate" | "clickRate") => {
    if (dailyTrend.length === 0) return "";
    if (dailyTrend.length === 1) {
      const x = padX;
      const y = h - padY - (dailyTrend[0][key] / trendMax) * (h - padY * 2);
      return `${x},${y} ${w - padX},${y}`;
    }
    return dailyTrend
      .map((d, i) => {
        const step = (w - padX * 2) / (dailyTrend.length - 1);
        const x = padX + i * step;
        const y = h - padY - (d[key] / trendMax) * (h - padY * 2);
        return `${x},${y}`;
      })
      .join(" ");
  };

  const initials = (name: string) => name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const statusLabel: Record<string, string> = { sent: "Terkirim", completed: "Selesai", scheduled: "Terjadwal", processing: "Proses", draft: "Draft", failed: "Gagal" };

  return (
    <>
      <style>{`
        .stat-page {
          --bg: #F5F5F7;
          --card: #FFFFFF;
          --border: #E7E7EA;
          --ink: #18181B;
          --sub: #71717A;
          --faint: #A1A1AA;
          --red: #980203;
          --red-dark: #6e0102;
          --gold: #FFD96A;
          --green: #0F9D58;
          --green-bg: #E7F6EC;
          --red-bg: #FDEDEC;
          --radius: 14px;
          background: var(--bg);
          color: var(--ink);
          font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          margin: -32px -32px -32px -32px;
        }
        .stat-wrap { max-width: 1180px; margin: 0 auto; padding: 32px 32px 80px; }

        .page-header {
          display:flex; justify-content:space-between; align-items:flex-end;
          margin-bottom: 28px; gap:20px; flex-wrap:wrap;
        }
        .page-header h1 { font-size:22px; font-weight:700; letter-spacing:-0.01em; margin:0; }
        .page-header p { color:var(--sub); font-size:13px; margin-top:4px; }
        .campaign-badge {
          display:inline-flex; align-items:center; gap:6px;
          font-size:11px; font-weight:700; padding:4px 10px; border-radius:99px; letter-spacing:.03em;
        }
        .campaign-badge.sent, .campaign-badge.completed { background:var(--green-bg); color:var(--green); }
        .campaign-badge.scheduled { background:#F1EFEA; color:var(--sub); }
        .campaign-badge.draft { background:#F1EFEA; color:var(--faint); }
        .campaign-badge.processing { background:var(--red-bg); color:var(--red); }
        .campaign-badge.failed { background:var(--red-bg); color:var(--red); }

        .section-label {
          font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.08em;
          color:var(--sub); margin: 28px 0 12px;
        }

        .metric-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .metric-card {
          background:var(--card); border:1px solid var(--border); border-radius:var(--radius);
          padding:18px 20px;
        }
        .metric-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .metric-label { font-size:12px; color:var(--sub); font-weight:600; }
        .metric-value { font-size:28px; font-weight:700; letter-spacing:-0.02em; display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; }
        .metric-value .sub-count { font-size:13px; color:var(--sub); font-weight:500; }
        .metric-pct { font-size:11px; font-weight:700; padding:2px 7px; border-radius:6px; }
        .pct-good { background:var(--green-bg); color:var(--green); }
        .pct-neutral { background:#F2F2F4; color:var(--sub); }
        .pct-bad { background:var(--red-bg); color:var(--red); }
        .metric-bar { height:4px; border-radius:99px; background:#F0F0F2; margin-top:12px; overflow:hidden; }
        .metric-bar-fill { height:100%; border-radius:99px; }
        .metric-card.warn .metric-value { color: var(--red); }

        .chart-card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius); padding:20px; }
        .chart-card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .chart-title { font-size:13px; font-weight:700; display:flex; align-items:center; gap:8px; margin:0; }

        .two-col { display:grid; grid-template-columns:1.3fr 1fr; gap:14px; align-items:start; }

        .trend-wrap { width:100%; overflow:hidden; }

        .bar-row { display:flex; align-items:flex-end; gap:14px; height:170px; padding-top:10px; }
        .bar-col { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%; gap:8px; }
        .bar-stack { width:100%; max-width:34px; display:flex; flex-direction:column-reverse; align-items:center; border-radius:6px 6px 3px 3px; overflow:hidden; }
        .bar-seg-sent { width:100%; background:#EDEAE2; }
        .bar-seg-open { width:100%; background:var(--red); }
        .bar-col .day-label { font-size:11px; color:var(--sub); }

        .contact-list { display:flex; flex-direction:column; gap:2px; }
        .contact-row { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid #F2F2F4; }
        .contact-row:last-child { border-bottom:none; }
        .avatar {
          width:30px; height:30px; border-radius:50%; background:var(--ink); color:#fff;
          display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; flex-shrink:0;
          text-transform:uppercase;
        }
        .avatar.ghost { background:#F0F0F2; color:var(--sub); }
        .contact-info { flex:1; min-width:0; }
        .contact-name { font-size:12.5px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .contact-meta { font-size:11.5px; color:var(--sub); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .contact-stat { font-size:12px; font-weight:700; color:var(--sub); text-align:right; white-space:nowrap; }
        .contact-stat.hot { color:var(--green); }
        .contact-stat.cold { color:var(--red); }

        .link-row { display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid #F2F2F4; }
        .link-row:last-child { border-bottom:none; }
        .link-info { flex:1; min-width:0; }
        .link-label { font-size:12.5px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .link-url { font-size:11px; color:var(--sub); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .link-count { font-size:12.5px; font-weight:700; width:34px; text-align:right; flex-shrink:0; }
        .link-bar-bg { flex:2; background:#F0F0F2; border-radius:4px; height:6px; overflow:hidden; }
        .link-bar-fill { height:100%; background:var(--gold); border-radius:4px; }

        .hour-grid { display:grid; grid-template-columns:repeat(24,1fr); gap:3px; align-items:end; height:90px; }
        .hour-bar { background:var(--red); border-radius:3px 3px 1px 1px; }
        .hour-labels { display:grid; grid-template-columns:repeat(24,1fr); gap:3px; margin-top:6px; }
        .hour-labels span { font-size:8.5px; color:var(--faint); text-align:center; }
        .peak-note { margin-top:14px; padding:10px 14px; background:#FFF8E8; border:1px solid #FBE7B4; border-radius:10px; font-size:12.5px; color:#7A5B00; line-height:1.5; }

        .device-row { display:flex; align-items:center; gap:12px; padding:9px 0; border-bottom:1px solid #F2F2F4; }
        .device-row:last-child { border-bottom:none; }
        .device-label { width:90px; font-size:12.5px; font-weight:500; color:var(--sub); flex-shrink:0; }
        .device-bar-bg { flex:1; background:#F0F0F2; border-radius:4px; height:8px; overflow:hidden; }
        .device-bar-fill { height:100%; border-radius:4px; background:var(--red); }
        .device-pct { width:38px; text-align:right; font-size:12.5px; font-weight:700; flex-shrink:0; }

        @media (max-width: 900px){
          .metric-grid { grid-template-columns:repeat(2,1fr); }
          .two-col { grid-template-columns:1fr; }
          .hour-grid, .hour-labels { grid-template-columns:repeat(12,1fr); }
        }
      `}</style>

      <div className={`stat-page transition-all duration-700 ease-out transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <div className="stat-wrap">

          {/* Back */}
          <Link
            href="/dashboard/email-blast/statistik"
            className="inline-flex items-center gap-2 text-[12px] font-medium text-[#71717A] hover:text-[#18181B] transition-colors mb-5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Statistik
          </Link>

          {/* Header */}
          <div className="page-header">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: "var(--sub)" }}>
                  STATISTIK CAMPAIGN
                </span>
                <span className={`campaign-badge ${campaignStatus}`}>
                  {statusLabel[campaignStatus] || campaignStatus}
                </span>
              </div>
              <h1>{campaignName}</h1>
            </div>
          </div>

          {/* ROW 1: metrics utama */}
          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Terkirim (7 Hari)</span>
                <div style={{ width:24, height:24, borderRadius:8, background:'#F5F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>
                </div>
              </div>
              <div className="metric-value">{sentThisWeek}</div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{ width: '100%', background: 'var(--faint)' }}></div></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Total Terkirim</span>
                <div style={{ width:24, height:24, borderRadius:8, background:'#F5F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></svg>
                </div>
              </div>
              <div className="metric-value">{totalSent}</div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{ width: '100%', background: 'var(--faint)' }}></div></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Open Rate</span>
                <div style={{ width:24, height:24, borderRadius:8, background:'#F5F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><path d="M22 6 12 13 2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                </div>
              </div>
              <div className="metric-value">
                {openRate}%
                <span className="sub-count">({totalOpened})</span>
                <span className={`metric-pct ${openRate >= 20 ? 'pct-good' : openRate >= 10 ? 'pct-neutral' : 'pct-bad'}`}>
                  {openRate >= 20 ? '↑ Bagus' : openRate >= 10 ? 'Sedang' : '↓ Rendah'}
                </span>
              </div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{ width: `${Math.min(openRate * 2, 100)}%`, background: 'var(--gold)' }}></div></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Click Rate</span>
                <div style={{ width:24, height:24, borderRadius:8, background:'#F5F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 1 1-3-3L19 9"/></svg>
                </div>
              </div>
              <div className="metric-value">
                {clickRate}%
                <span className="sub-count">({totalClicked})</span>
              </div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{ width: `${Math.min(clickRate * 4, 100)}%`, background: 'var(--red)' }}></div></div>
            </div>
          </div>

          {/* ROW 2: metrics kesehatan */}
          <div className="metric-grid" style={{ marginTop: 14 }}>
            <div className="metric-card warn">
              <div className="metric-top">
                <span className="metric-label">Bounce Rate</span>
                <div style={{ width:24, height:24, borderRadius:8, background:'#F5F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
              </div>
              <div className="metric-value">{bounceRate}% <span className="sub-count">({totalBounced})</span></div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{ width: `${Math.min(bounceRate * 5, 100)}%`, background: 'var(--red)' }}></div></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Unsubscribe Rate</span>
                <div style={{ width:24, height:24, borderRadius:8, background:'#F5F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </div>
              </div>
              <div className="metric-value">0% <span className="sub-count">(0)</span></div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{ width: '0%', background: 'var(--faint)' }}></div></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Click-to-Open Rate</span>
                <div style={{ width:24, height:24, borderRadius:8, background:'#F5F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
                </div>
              </div>
              <div className="metric-value">{ctoRate}%</div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{ width: `${Math.min(ctoRate, 100)}%`, background: 'var(--gold)' }}></div></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <span className="metric-label">Delivered / Gagal</span>
                <div style={{ width:24, height:24, borderRadius:8, background:'#F5F5F7', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717A" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-10 10-3-3"/></svg>
                </div>
              </div>
              <div className="metric-value">{totalSent} <span className="sub-count">/ {totalFailed}</span></div>
              <div className="metric-bar"><div className="metric-bar-fill" style={{ width: totalFailed + totalSent > 0 ? `${Math.round((totalSent / (totalFailed + totalSent)) * 100)}%` : '100%', background: 'var(--green)' }}></div></div>
            </div>
          </div>

          {/* Aktivitas 7 hari */}
          <div className="section-label">Aktivitas</div>
          <div className="chart-card">
            <div className="chart-card-head">
              <div className="chart-title">🕐 Aktivitas Campaign (7 Hari Terakhir)</div>
            </div>
            <div className="bar-row">
              {activityData.map((d, i) => {
                const totalH = 140;
                const sentH = Math.max((d.sent / maxSent) * totalH, d.sent > 0 ? 6 : 0);
                const openH = d.sent > 0 ? Math.max((d.open / maxSent) * totalH, d.open > 0 ? 4 : 0) : 0;
                return (
                  <div
                    key={i}
                    className="bar-col"
                    onMouseEnter={(e) => showTooltip(e, `${d.day}\nTerkirim: ${d.sent}\nDibuka: ${d.open}`)}
                    onMouseLeave={hideTooltip}
                    onMouseMove={moveTooltip}
                  >
                    <div className="bar-stack" style={{ height: sentH }}>
                      <div className="bar-seg-open" style={{ height: openH }}></div>
                      <div className="bar-seg-sent" style={{ height: Math.max(0, sentH - openH) }}></div>
                    </div>
                    <div className="day-label">{d.day}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Trend harian */}
          <div className="section-label">Tren Performa</div>
          <div className="chart-card">
            <div className="chart-card-head">
              <div className="chart-title">📈 Open Rate & Click Rate Harian</div>
              <div className="legend">
                <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--red)', borderRadius: '50%' }}></span> Open Rate</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--gold)', borderRadius: '50%' }}></span> Click Rate</div>
              </div>
            </div>
            <div className="trend-wrap">
              {dailyTrend.length > 0 ? (
                <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="200">
                  {[0, 0.25, 0.5, 0.75, 1].map((frac, i) => {
                    const y = h - padY - frac * (h - padY * 2);
                    const val = Math.round(trendMax * frac);
                    return (
                      <React.Fragment key={`y-${i}`}>
                        <line x1={padX} y1={y} x2={w - padX} y2={y} stroke="#F2F2F4" strokeWidth="1" />
                        <text x={padX - 6} y={y + 3} fontSize="10" fill="#A1A1AA" textAnchor="end" fontFamily="'Segoe UI', sans-serif">{val}%</text>
                      </React.Fragment>
                    );
                  })}
                  <polyline points={buildLineSVG("openRate")} fill="none" stroke="var(--red)" strokeWidth="2.2" />
                  <polyline points={buildLineSVG("clickRate")} fill="none" stroke="#FFD96A" strokeWidth="2.2" />
                  {dailyTrend.length === 1 ? (
                    <>
                      <rect x={0} y={0} width={w} height={h} fill="transparent" style={{ cursor: "pointer" }} onMouseEnter={(e) => showTooltip(e, `${dailyTrend[0].day}\nOpen: ${dailyTrend[0].openRate}% | Click: ${dailyTrend[0].clickRate}%`)} onMouseLeave={hideTooltip} onMouseMove={moveTooltip} />
                      <circle cx={padX} cy={h - padY - (dailyTrend[0].openRate / trendMax) * (h - padY * 2)} r="4" fill="var(--red)" />
                      <circle cx={w - padX} cy={h - padY - (dailyTrend[0].openRate / trendMax) * (h - padY * 2)} r="4" fill="var(--red)" />
                      <circle cx={padX} cy={h - padY - (dailyTrend[0].clickRate / trendMax) * (h - padY * 2)} r="4" fill="#FFD96A" stroke="var(--red)" strokeWidth="1" />
                      <circle cx={w - padX} cy={h - padY - (dailyTrend[0].clickRate / trendMax) * (h - padY * 2)} r="4" fill="#FFD96A" stroke="var(--red)" strokeWidth="1" />
                      <text x={padX} y={h - 2} fontSize="11" fill="#A1A1AA" textAnchor="middle" fontFamily="'Segoe UI', sans-serif">{dailyTrend[0].day}</text>
                    </>
                  ) : (
                    <>
                      {dailyTrend.map((d, i) => {
                        const step = (w - padX * 2) / (dailyTrend.length - 1);
                        const x = padX + i * step;
                        const y = h - padY - (d.openRate / trendMax) * (h - padY * 2);
                        return <circle key={`o-${i}`} cx={x} cy={y} r="4" fill="var(--red)" style={{ pointerEvents: "none" }} />;
                      })}
                      {dailyTrend.map((d, i) => {
                        const step = (w - padX * 2) / (dailyTrend.length - 1);
                        const x = padX + i * step;
                        const y = h - padY - (d.clickRate / trendMax) * (h - padY * 2);
                        return <circle key={`c-${i}`} cx={x} cy={y} r="4" fill="#FFD96A" stroke="var(--red)" strokeWidth="1" style={{ pointerEvents: "none" }} />;
                      })}
                      {dailyTrend.map((d, i) => {
                        const step = (w - padX * 2) / (dailyTrend.length - 1);
                        const x = padX + i * step;
                        return (
                          <text key={`t-${i}`} x={x} y={h - 2} fontSize="10" fill="#A1A1AA" textAnchor="middle" fontFamily="'Segoe UI', sans-serif" style={{ pointerEvents: "none" }}>
                            {d.day}
                          </text>
                        );
                      })}
                      {dailyTrend.map((d, i) => {
                        const step = (w - padX * 2) / (dailyTrend.length - 1);
                        const x = padX + i * step;
                        return (
                          <rect
                            key={`hitbox-${i}`}
                            x={x - step / 2} y={0} width={step} height={h}
                            fill="transparent" style={{ cursor: "pointer" }}
                            onMouseEnter={(e) => showTooltip(e, `${d.day}\nOpen: ${d.openRate}% | Click: ${d.clickRate}%`)}
                            onMouseLeave={hideTooltip} onMouseMove={moveTooltip}
                          />
                        );
                      })}
                    </>
                  )}
                </svg>
              ) : (
                <div style={{ textAlign: "center", color: "var(--sub)", fontSize: "13px", padding: "40px 0" }}>Belum ada data</div>
              )}
            </div>
          </div>

          {/* Engagement level */}
          <div className="section-label">Engagement Kontak</div>
          <div className="two-col">
            <div className="chart-card">
              <div className="chart-card-head" style={{ marginBottom: 0 }}>
                <div className="chart-title">🔥 Kontak Paling Aktif</div>
              </div>
              <div className="contact-list" style={{ marginTop: 14 }}>
                {topContacts.length > 0 ? topContacts.map((c, i) => (
                  <div className="contact-row" key={i}>
                    <div className="avatar">{initials(c.name)}</div>
                    <div className="contact-info">
                      <div className="contact-name" title={c.name}>{c.name}</div>
                      <div className="contact-meta" title={c.meta}>{c.meta}</div>
                    </div>
                    <div className="contact-stat hot">{c.stat}</div>
                  </div>
                )) : <div style={{ fontSize: '13px', color: 'var(--sub)', padding: '8px 0' }}>Belum ada aktivitas pembukaan.</div>}
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-head" style={{ marginBottom: 0 }}>
                <div className="chart-title">❄️ Belum Pernah Membuka</div>
              </div>
              <div className="contact-list" style={{ marginTop: 14 }}>
                {coldContacts.length > 0 ? coldContacts.map((c, i) => (
                  <div className="contact-row" key={i}>
                    <div className="avatar ghost">{initials(c.name)}</div>
                    <div className="contact-info">
                      <div className="contact-name" title={c.name}>{c.name}</div>
                      <div className="contact-meta" title={c.meta}>{c.meta}</div>
                    </div>
                    <div className="contact-stat cold">●</div>
                  </div>
                )) : <div style={{ fontSize: '13px', color: 'var(--sub)', padding: '8px 0' }}>Semua kontak sudah membuka email.</div>}
              </div>
            </div>
          </div>

          {/* Link clicks & device */}
          <div className="section-label">Detail Klik & Perangkat</div>
          <div className="two-col">
            <div className="chart-card">
              <div className="chart-card-head" style={{ marginBottom: 0 }}>
                <div className="chart-title">🔗 Link Paling Banyak Diklik</div>
              </div>
              <div style={{ marginTop: 14 }}>
                {links.length > 0 ? links.map((l, i) => (
                  <div className="link-row" key={i}>
                    <div className="link-info">
                      <div className="link-label" title={l.label}>{l.label}</div>
                      <div className="link-url" title={l.url}>{l.url}</div>
                    </div>
                    <div className="link-bar-bg"><div className="link-bar-fill" style={{ width: `${(l.count / maxClick) * 100}%` }}></div></div>
                    <div className="link-count">{l.count}</div>
                  </div>
                )) : (
                  <div style={{ textAlign: 'center', padding: '22px 0', color: 'var(--sub)', fontSize: '13px' }}>
                    <div style={{ fontSize: '22px', marginBottom: '6px' }}>🔗</div>
                    Belum ada link yang diklik
                  </div>
                )}
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-head" style={{ marginBottom: 0 }}>
                <div className="chart-title">📱 Dibuka via</div>
              </div>
              <div style={{ marginTop: 14 }}>
                {devices.length > 0 ? devices.map((d, i) => (
                  <div className="device-row" key={i}>
                    <div className="device-label">{d.label}</div>
                    <div className="device-bar-bg"><div className="device-bar-fill" style={{ width: `${d.pct}%` }}></div></div>
                    <div className="device-pct">{d.pct}%</div>
                  </div>
                )) : (
                  <div style={{ textAlign: 'center', padding: '22px 0', color: 'var(--sub)', fontSize: '13px' }}>
                    <div style={{ fontSize: '22px', marginBottom: '6px' }}>📱</div>
                    Belum ada data perangkat
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Waktu responsif */}
          <div className="section-label">Waktu Paling Responsif</div>
          <div className="chart-card">
            <div className="chart-card-head">
              <div className="chart-title">🕐 Aktivitas Buka Email per Jam</div>
            </div>
            <div className="hour-grid">
              {hourly.map((v, i) => (
                <div
                  key={i}
                  className="hour-bar"
                  onMouseEnter={(e) => showTooltip(e, `Pukul ${String(i).padStart(2, '0')}:00\nJumlah Dibuka: ${v}`)}
                  onMouseLeave={hideTooltip}
                  onMouseMove={moveTooltip}
                  style={{
                    height: Math.max((v / maxHour) * 80, 3) + 'px',
                    opacity: (0.15 + (v / maxHour) * 0.85) as any
                  }}
                />
              ))}
            </div>
            <div className="hour-labels">
              {hourly.map((_, i) => (
                <span key={i}>{i % 3 === 0 ? i : ''}</span>
              ))}
            </div>
            <div className="peak-note">
              💡 Peak aktivitas sering terjadi pada siang hari. Jadwalkan blast berikutnya pada jam tersebut untuk open rate lebih tinggi.
            </div>
          </div>

        </div>
      </div>

      {mounted && tooltip.visible && (
        <div
          style={{
            position: 'fixed',
            top: tooltip.y - 10,
            left: tooltip.x + 15,
            transform: 'translateY(-100%)',
            background: '#18181B',
            color: '#FFFFFF',
            padding: '6px 10px',
            borderRadius: '6px',
            fontSize: '12px',
            pointerEvents: 'none',
            zIndex: 99999,
            whiteSpace: 'pre-line',
            lineHeight: 1.4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
}
