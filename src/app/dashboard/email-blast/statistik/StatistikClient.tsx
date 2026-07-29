"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
  sentThisWeek: number;
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  totalFailed: number;
  activityData: { day: string; sent: number; open: number }[];
  campaignsTrend: { id: string; name: string; brand: string; status: string; sent: number; open: number; click: number }[];
  campaignRows: { id: string; name: string; brand: string; status: string; sent: number; open: number; click: number }[];
  topContacts: { name: string; meta: string; stat: string }[];
  coldContacts: { name: string; meta: string }[];
  links: { label: string; url: string; count: number }[];
  devices: { label: string; pct: number }[];
  hourly: number[];
}

export default function StatistikClient({
  sentThisWeek,
  totalSent,
  totalOpened,
  totalClicked,
  totalBounced,
  totalFailed,
  activityData,
  campaignsTrend,
  campaignRows,
  topContacts,
  coldContacts,
  links,
  devices,
  hourly
}: Props) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; content: string }>({ visible: false, x: 0, y: 0, content: '' });

  const showTooltip = (e: React.MouseEvent, content: string) => {
    setTooltip({ visible: true, x: e.clientX, y: e.clientY, content });
  };
  const hideTooltip = () => setTooltip(prev => ({ ...prev, visible: false }));
  const moveTooltip = (e: React.MouseEvent) => {
    if (tooltip.visible) setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));
  };

  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const clickRate = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;
  const bounceRate = totalSent > 0 ? Math.round((totalBounced / totalSent) * 100) : 0;
  
  const maxSent = Math.max(...activityData.map(d => d.sent), 1);

  const w = 1090, h = 190, padX = 30, padY = 24;
  const maxTrend = 50;
  const buildLineSVG = (key: 'open'|'click') => {
    if (campaignsTrend.length === 0) return '';
    if (campaignsTrend.length === 1) {
      const x = padX;
      const y = h - padY - (campaignsTrend[0][key] / maxTrend) * (h - padY * 2);
      return `${x},${y} ${w-padX},${y}`; // Flat line if only 1 data point
    }
    return campaignsTrend.map((d, i) => {
      const step = (w - padX * 2) / (campaignsTrend.length - 1);
      const x = padX + i * step;
      const y = h - padY - (d[key] / maxTrend) * (h - padY * 2);
      return `${x},${y}`;
    }).join(' ');
  };

  const maxClick = Math.max(...links.map(l => l.count), 1);
  const maxHour = Math.max(...hourly, 1);

  const initials = (name: string) => name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase();

  return (
    <>
      <style>{`
        .stat-page {
          --bg: #F7F5F1;
          --card: #FFFFFF;
          --border: #E8E4DC;
          --ink: #1A1A18;
          --sub: #8A867D;
          --faint: #C9C4B8;
          --bar: #171614;
          --red: #980203;
          --gold: #FFD96A;
          --green: #2E6B3E;
          --green-bg: #EAF3EC;
          --red-bg: #FBEAEA;
          --radius: 16px;
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          padding: 32px 40px 80px;
          -webkit-font-smoothing: antialiased;
        }
        .stat-wrap { max-width: 1180px; margin: 0 auto; }

        /* header */
        .page-header {
          display:flex; justify-content:space-between; align-items:flex-end;
          margin-bottom: 28px; gap:20px; flex-wrap:wrap;
        }
        .page-header h1 {
          font-family:'Poppins',sans-serif; font-weight:600; font-size:26px; letter-spacing:-0.01em;
        }
        .page-header p { color:var(--sub); font-size:14px; margin-top:4px; }
        .controls { display:flex; gap:10px; }
        .select-pill {
          background:var(--card); border:1px solid var(--border); border-radius:10px;
          padding:9px 14px; font-size:13px; font-weight:500; color:var(--ink);
          display:flex; align-items:center; gap:8px; cursor:pointer;
        }
        .select-pill span.dot { width:6px; height:6px; border-radius:50%; background:var(--bar); }

        /* section label */
        .section-label {
          font-family:'Poppins',sans-serif; font-size:13px; font-weight:600;
          text-transform:uppercase; letter-spacing:0.06em; color:var(--sub);
          margin: 36px 0 14px;
        }
        .section-label:first-of-type { margin-top:0; }

        /* metric grid */
        .metric-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .metric-card {
          background:var(--card); border:1px solid var(--border); border-radius:var(--radius);
          padding:18px 20px;
        }
        .metric-top { display:flex; align-items:center; gap:8px; margin-bottom:14px; }
        .icon-badge {
          width:26px; height:26px; border-radius:8px; background:#F1EFEA;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .icon-badge svg { width:14px; height:14px; stroke:var(--ink); }
        .metric-top .label { font-size:13px; color:var(--sub); font-weight:500; }
        .metric-value { font-size:26px; font-weight:700; letter-spacing:-0.02em; display:flex; align-items:baseline; gap:6px; }
        .metric-value .sub-count { font-size:13px; color:var(--sub); font-weight:500; }
        .metric-value .trend { font-size:12px; font-weight:600; margin-left:auto; padding:3px 7px; border-radius:6px; }
        .trend.up { color:var(--green); background:var(--green-bg); }
        .trend.down { color:var(--red); background:var(--red-bg); }
        .metric-card.warn .metric-value { color:var(--red); }

        /* charts card */
        .chart-card {
          background:var(--card); border:1px solid var(--border); border-radius:var(--radius);
          padding:22px 24px;
        }
        .chart-card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .chart-title { display:flex; align-items:center; gap:9px; font-size:14px; font-weight:600; }
        .chart-title .icon-badge { width:24px; height:24px; }
        .legend { display:flex; gap:16px; font-size:12px; color:var(--sub); }
        .legend-item { display:flex; align-items:center; gap:6px; }
        .legend-dot { width:8px; height:8px; border-radius:2px; }

        .two-col { display:grid; grid-template-columns: 1.3fr 1fr; gap:14px; align-items:start; }

        /* bars */
        .bar-row { display:flex; align-items:flex-end; gap:18px; height:170px; padding-top:10px; }
        .bar-col { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:flex-end; height:100%; gap:8px; }
        .bar-stack { width:100%; max-width:34px; display:flex; flex-direction:column-reverse; align-items:center; border-radius:6px 6px 3px 3px; overflow:hidden; }
        .bar-seg-sent { width:100%; background:#EDEAE2; }
        .bar-seg-open { width:100%; background:var(--bar); }
        .bar-col .day-label { font-size:11px; color:var(--sub); }

        /* trend line svg */
        .trend-wrap { width:100%; overflow:hidden; }

        /* table */
        .stat-page table { width:100%; border-collapse:collapse; font-size:13px; }
        .stat-page thead th {
          text-align:left; font-weight:500; color:var(--sub); font-size:11.5px;
          text-transform:uppercase; letter-spacing:0.04em; padding:0 10px 10px; border-bottom:1px solid var(--border);
        }
        .stat-page tbody td { padding:13px 10px; border-bottom:1px solid var(--border); vertical-align:middle; }
        .stat-page tbody tr:last-child td { border-bottom:none; }
        .campaign-name { font-weight:600; font-size:13.5px; }
        .campaign-brand { font-size:11.5px; color:var(--sub); margin-top:2px; }
        .badge { font-size:11px; font-weight:600; padding:4px 9px; border-radius:20px; display:inline-block; }
        .badge.sent { background:var(--green-bg); color:var(--green); }
        .badge.scheduled { background:#F1EFEA; color:var(--sub); }
        .badge.draft { background:#F1EFEA; color:var(--faint); }
        .mini-bar-bg { background:#EDEAE2; border-radius:4px; height:6px; width:70px; overflow:hidden; }
        .mini-bar-fill { height:100%; background:var(--bar); border-radius:4px; }
        .rate-cell { display:flex; align-items:center; gap:8px; }
        .rate-num { font-weight:600; width:36px; }

        /* contact lists */
        .contact-list { display:flex; flex-direction:column; gap:2px; }
        .contact-row { display:flex; align-items:center; gap:10px; padding:10px 0; border-bottom:1px solid var(--border); }
        .contact-row:last-child { border-bottom:none; }
        .avatar {
          width:32px; height:32px; border-radius:50%; background:var(--ink); color:#fff;
          display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; flex-shrink:0;
        }
        .avatar.ghost { background:#EDEAE2; color:var(--sub); }
        .contact-info { flex:1; min-width:0; }
        .contact-name { font-size:13px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .contact-meta { font-size:11.5px; color:var(--sub); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .contact-stat { font-size:12px; font-weight:600; color:var(--sub); text-align:right; }
        .contact-stat.hot { color:var(--green); }
        .contact-stat.cold { color:var(--red); }

        /* link clicks */
        .link-row { display:flex; align-items:center; gap:12px; padding:10px 0; }
        .link-info { flex:1; min-width:0; }
        .link-label { font-size:13px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .link-url { font-size:11px; color:var(--sub); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .link-count { font-size:13px; font-weight:700; width:34px; text-align:right; }
        .link-bar-bg { flex:2; background:#EDEAE2; border-radius:4px; height:8px; overflow:hidden; }
        .link-bar-fill { height:100%; background:var(--gold); border-radius:4px; }

        /* hourly heatmap */
        .hour-grid { display:grid; grid-template-columns:repeat(24,1fr); gap:3px; align-items:end; height:90px; }
        .hour-bar { background:var(--bar); border-radius:3px 3px 1px 1px; }
        .hour-labels { display:grid; grid-template-columns:repeat(24,1fr); gap:3px; margin-top:6px; }
        .hour-labels span { font-size:8.5px; color:var(--faint); text-align:center; }
        .peak-note { margin-top:14px; padding:10px 12px; background:#FFFBF0; border:1px solid #F0E4BE; border-radius:10px; font-size:12.5px; color:#7A5C00; }

        /* device breakdown */
        .device-row { display:flex; align-items:center; gap:12px; padding:9px 0; }
        .device-label { width:80px; font-size:12.5px; font-weight:500; color:var(--sub); }
        .device-bar-bg { flex:1; background:#EDEAE2; border-radius:4px; height:10px; overflow:hidden; }
        .device-bar-fill { height:100%; border-radius:4px; background:var(--ink); }
        .device-pct { width:38px; text-align:right; font-size:12.5px; font-weight:600; }

        @media (max-width: 880px){
          .stat-page { padding:24px 16px 60px; }
          .metric-grid { grid-template-columns:repeat(2,1fr); }
          .two-col { grid-template-columns:1fr; }
          .hour-grid, .hour-labels { grid-template-columns:repeat(12,1fr); }
        }
      `}</style>
      
      <div className={`stat-page transition-all duration-700 ease-out transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <div className="stat-wrap">

          <div className="flex mb-4">
            <Link
              href="/dashboard/email-blast"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#787774] hover:text-[#111111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>

          <div className="page-header">
            <div>
              <h1>Statistik Campaign</h1>
              <p>Pantau performa email blast Anda secara mendetail.</p>
            </div>
            <div className="controls">
              <div className="select-pill"><span className="dot"></span> Semua Brand</div>
              <div className="select-pill"><span className="dot"></span> 7 Hari Terakhir</div>
            </div>
          </div>

          {/* ROW 1: metrics utama */}
          <div className="metric-grid">
            <div className="metric-card">
              <div className="metric-top">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7Z"/></svg>
                </div>
                <span className="label">Terkirim (7 Hari)</span>
              </div>
              <div className="metric-value">{sentThisWeek}</div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/></svg>
                </div>
                <span className="label">Total Terkirim</span>
              </div>
              <div className="metric-value">{totalSent}</div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M22 6 12 13 2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
                </div>
                <span className="label">Open Rate</span>
              </div>
              <div className="metric-value">{openRate}% <span className="sub-count">({totalOpened})</span></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 1 1-3-3L19 9"/></svg>
                </div>
                <span className="label">Click Rate</span>
              </div>
              <div className="metric-value">{clickRate}% <span className="sub-count">({totalClicked})</span></div>
            </div>
          </div>

          {/* ROW 2: metrics kesehatan list */}
          <div className="metric-grid" style={{ marginTop: 14 }}>
            <div className="metric-card warn">
              <div className="metric-top">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <span className="label">Bounce Rate</span>
              </div>
              <div className="metric-value">{bounceRate}% <span className="sub-count">({totalBounced})</span></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </div>
                <span className="label">Unsubscribe Rate</span>
              </div>
              <div className="metric-value">0% <span className="sub-count">(0)</span></div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>
                </div>
                <span className="label">Click-to-Open Rate</span>
              </div>
              <div className="metric-value">{(openRate > 0 ? Math.round((clickRate/openRate)*100) : 0)}%</div>
            </div>
            <div className="metric-card">
              <div className="metric-top">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m22 4-10 10-3-3"/></svg>
                </div>
                <span className="label">Delivered / Gagal</span>
              </div>
              <div className="metric-value">{totalSent} <span className="sub-count">/ {totalFailed}</span></div>
            </div>
          </div>

          {/* Aktivitas 7 hari */}
          <div className="section-label">Aktivitas</div>
          <div className="chart-card">
            <div className="chart-card-head">
              <div className="chart-title">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                </div>
                Aktivitas Keseluruhan (7 Hari Terakhir)
              </div>
              <div className="legend">
                <div className="legend-item"><span className="legend-dot" style={{ background: '#EDEAE2' }}></span> Terkirim</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--bar)' }}></span> Dibuka</div>
              </div>
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

          {/* Trend antar campaign */}
          <div className="section-label">Tren Performa</div>
          <div className="chart-card">
            <div className="chart-card-head">
              <div className="chart-title">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                </div>
                Open Rate &amp; Click Rate — {campaignsTrend.length || 6} Campaign Terakhir
              </div>
              <div className="legend">
                <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--ink)', borderRadius: '50%' }}></span> Open Rate</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: 'var(--gold)', borderRadius: '50%' }}></span> Click Rate</div>
              </div>
            </div>
            <div className="trend-wrap">
              {campaignsTrend.length > 0 ? (
                <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="200">
                  {[0, 1, 2, 3].map(i => {
                    const y = padY + i * ((h - padY * 2) / 3);
                    return <line key={i} x1={padX} y1={y} x2={w - padX} y2={y} stroke="#EDEAE2" strokeWidth="1" />;
                  })}
                  
                  <polyline points={buildLineSVG('open')} fill="none" stroke="#171614" strokeWidth="2.2" />
                  <polyline points={buildLineSVG('click')} fill="none" stroke="#FFD96A" strokeWidth="2.2" />
                  
                  {campaignsTrend.length === 1 ? (
                    <>
                      {/* Hitbox for single item */}
                      <rect x={0} y={0} width={w} height={h} fill="transparent" style={{ cursor: 'pointer' }} onMouseEnter={(e) => showTooltip(e, `${campaignsTrend[0].name}\nOpen: ${campaignsTrend[0].open}% | Click: ${campaignsTrend[0].click}%`)} onMouseLeave={hideTooltip} onMouseMove={moveTooltip} />

                      <circle cx={padX} cy={h - padY - (campaignsTrend[0].open / maxTrend) * (h - padY * 2)} r="4" fill="#171614" onMouseEnter={(e) => showTooltip(e, `Open Rate: ${campaignsTrend[0].open}%`)} onMouseLeave={hideTooltip} onMouseMove={moveTooltip} />
                      <circle cx={w-padX} cy={h - padY - (campaignsTrend[0].open / maxTrend) * (h - padY * 2)} r="4" fill="#171614" onMouseEnter={(e) => showTooltip(e, `Open Rate: ${campaignsTrend[0].open}%`)} onMouseLeave={hideTooltip} onMouseMove={moveTooltip} />
                      <circle cx={padX} cy={h - padY - (campaignsTrend[0].click / maxTrend) * (h - padY * 2)} r="4" fill="#FFD96A" stroke="#171614" strokeWidth="1" onMouseEnter={(e) => showTooltip(e, `Click Rate: ${campaignsTrend[0].click}%`)} onMouseLeave={hideTooltip} onMouseMove={moveTooltip} />
                      <circle cx={w-padX} cy={h - padY - (campaignsTrend[0].click / maxTrend) * (h - padY * 2)} r="4" fill="#FFD96A" stroke="#171614" strokeWidth="1" onMouseEnter={(e) => showTooltip(e, `Click Rate: ${campaignsTrend[0].click}%`)} onMouseLeave={hideTooltip} onMouseMove={moveTooltip} />
                      
                      <text x={padX} y={h - 2} fontSize="11" fill="#8A867D" textAnchor="middle" fontFamily="Inter" style={{ cursor: 'pointer' }} onMouseEnter={(e) => showTooltip(e, `${campaignsTrend[0].name}\nOpen: ${campaignsTrend[0].open}% | Click: ${campaignsTrend[0].click}%`)} onMouseLeave={hideTooltip} onMouseMove={moveTooltip}>
                        {campaignsTrend[0].name}
                      </text>
                      <text x={w-padX} y={h - 2} fontSize="11" fill="#8A867D" textAnchor="middle" fontFamily="Inter" style={{ cursor: 'pointer' }} onMouseEnter={(e) => showTooltip(e, `${campaignsTrend[0].name}\nOpen: ${campaignsTrend[0].open}% | Click: ${campaignsTrend[0].click}%`)} onMouseLeave={hideTooltip} onMouseMove={moveTooltip}>
                        {campaignsTrend[0].name}
                      </text>
                    </>
                  ) : (
                    <>
                      {campaignsTrend.map((d, i) => {
                        const step = (w - padX * 2) / (campaignsTrend.length - 1);
                        const x = padX + i * step;
                        const y = h - padY - (d.open / maxTrend) * (h - padY * 2);
                        return (
                          <circle key={`o-${i}`} cx={x} cy={y} r="4" fill="#171614" style={{ pointerEvents: 'none' }} />
                        );
                      })}
                      {campaignsTrend.map((d, i) => {
                        const step = (w - padX * 2) / (campaignsTrend.length - 1);
                        const x = padX + i * step;
                        const y = h - padY - (d.click / maxTrend) * (h - padY * 2);
                        return (
                          <circle key={`c-${i}`} cx={x} cy={y} r="4" fill="#FFD96A" stroke="#171614" strokeWidth="1" style={{ pointerEvents: 'none' }} />
                        );
                      })}
                      {campaignsTrend.map((d, i) => {
                        const step = (w - padX * 2) / (campaignsTrend.length - 1);
                        const x = padX + i * step;
                        return (
                          <text key={`t-${i}`} x={x} y={h - 2} fontSize="11" fill="#8A867D" textAnchor="middle" fontFamily="Inter" style={{ pointerEvents: 'none' }}>
                            {d.name}
                          </text>
                        );
                      })}

                      {/* Interactive Hitboxes */}
                      {campaignsTrend.map((d, i) => {
                        const step = (w - padX * 2) / (campaignsTrend.length - 1);
                        const x = padX + i * step;
                        return (
                          <rect 
                            key={`hitbox-${i}`} 
                            x={x - step / 2} 
                            y={0} 
                            width={step} 
                            height={h} 
                            fill="transparent" 
                            style={{ cursor: 'pointer' }}
                            onMouseEnter={(e) => showTooltip(e, `${d.name}\nOpen: ${d.open}% | Click: ${d.click}%`)} 
                            onMouseLeave={hideTooltip} 
                            onMouseMove={moveTooltip} 
                          />
                        );
                      })}
                    </>
                  )}
                </svg>
              ) : (
                <div className="flex items-center justify-center h-full text-[#8A867D] text-[13px] py-10">Belum ada campaign</div>
              )}
            </div>
          </div>

          {/* Ranking campaign */}
          <div className="section-label">Ranking Campaign</div>
          <div className="chart-card" style={{ padding: '20px 12px 8px', overflowX: 'auto' }}>
            {campaignRows.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th style={{ paddingLeft: 12 }}>Campaign</th>
                    <th>Status</th>
                    <th>Terkirim</th>
                    <th>Open Rate</th>
                    <th>Click Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignRows.map((c, i) => (
                    <tr 
                      key={i} 
                      onClick={() => router.push(`/dashboard/email-blast/statistik/${c.id}`)}
                      style={{ cursor: "pointer" }}
                      className="hover:bg-[#F9F9F8] transition-colors"
                    >
                      <td style={{ paddingLeft: 12 }}>
                        <div className="campaign-name">{c.name}</div>
                        <div className="campaign-brand">{c.brand}</div>
                      </td>
                      <td>
                        <span className={`badge ${c.status}`}>
                          {c.status === 'sent' ? 'Terkirim' : c.status === 'scheduled' ? 'Terjadwal' : c.status === 'processing' ? 'Proses' : c.status === 'draft' ? 'Draft' : c.status}
                        </span>
                      </td>
                      <td>{c.sent > 0 ? c.sent : '—'}</td>
                      <td>
                        <div className="rate-cell">
                          <span className="rate-num">{c.open}%</span>
                          <div className="mini-bar-bg"><div className="mini-bar-fill" style={{ width: `${c.open}%` }}></div></div>
                        </div>
                      </td>
                      <td>
                        <div className="rate-cell">
                          <span className="rate-num">{c.click}%</span>
                          <div className="mini-bar-bg"><div className="mini-bar-fill" style={{ width: `${c.click * 2}%`, background: 'var(--gold)' }}></div></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center text-[#8A867D] text-[13px] py-6">Belum ada data campaign</div>
            )}
          </div>

          {/* Engagement level */}
          <div className="section-label">Engagement Kontak</div>
          <div className="two-col">
            <div className="chart-card">
              <div className="chart-card-head">
                <div className="chart-title">
                  <div className="icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M22 12a10 10 0 1 1-6.22-9.25"/><path d="M22 2 12 12"/></svg>
                  </div>
                  Kontak Paling Aktif
                </div>
              </div>
              <div className="contact-list">
                {topContacts.length > 0 ? topContacts.map((c, i) => (
                  <div className="contact-row" key={i}>
                    <div className="avatar">{initials(c.name)}</div>
                    <div className="contact-info">
                      <div className="contact-name" title={c.name}>{c.name}</div>
                      <div className="contact-meta" title={c.meta}>{c.meta}</div>
                    </div>
                    <div className="contact-stat hot">{c.stat}</div>
                  </div>
                )) : <div className="text-[13px] text-[#8A867D] py-2">Belum ada aktivitas pembukaan.</div>}
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-head">
                <div className="chart-title">
                  <div className="icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" opacity="0"/><path d="M17 3 3 17M17 17 3 3"/></svg>
                  </div>
                  Belum Pernah Membuka
                </div>
              </div>
              <div className="contact-list">
                {coldContacts.length > 0 ? coldContacts.map((c, i) => (
                  <div className="contact-row" key={i}>
                    <div className="avatar ghost">{initials(c.name)}</div>
                    <div className="contact-info">
                      <div className="contact-name" title={c.name}>{c.name}</div>
                      <div className="contact-meta" title={c.meta}>{c.meta}</div>
                    </div>
                    <div className="contact-stat cold">●</div>
                  </div>
                )) : <div className="text-[13px] text-[#8A867D] py-2">Belum ada data.</div>}
              </div>
            </div>
          </div>

          {/* Link clicks & device */}
          <div className="section-label">Detail Klik &amp; Perangkat</div>
          <div className="two-col">
            <div className="chart-card">
              <div className="chart-card-head">
                <div className="chart-title">
                  <div className="icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  </div>
                  Link Paling Banyak Diklik
                </div>
              </div>
              <div>
                {links.map((l, i) => (
                  <div className="link-row" key={i}>
                    <div className="link-info">
                      <div className="link-label" title={l.label}>{l.label}</div>
                      <div className="link-url" title={l.url}>{l.url}</div>
                    </div>
                    <div className="link-bar-bg"><div className="link-bar-fill" style={{ width: `${(l.count / maxClick) * 100}%` }}></div></div>
                    <div className="link-count">{l.count}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-card">
              <div className="chart-card-head">
                <div className="chart-title">
                  <div className="icon-badge">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="18" x2="8.01" y2="18"/></svg>
                  </div>
                  Dibuka via
                </div>
              </div>
              <div>
                {devices.map((d, i) => (
                  <div className="device-row" key={i}>
                    <div className="device-label">{d.label}</div>
                    <div className="device-bar-bg"><div className="device-bar-fill" style={{ width: `${d.pct}%` }}></div></div>
                    <div className="device-pct">{d.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* jam responsif */}
          <div className="section-label">Waktu Paling Responsif</div>
          <div className="chart-card">
            <div className="chart-card-head">
              <div className="chart-title">
                <div className="icon-badge">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                Aktivitas Buka Email per Jam
              </div>
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
                    opacity: (0.15 + (v / maxHour) * 0.85).toFixed(2) 
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
              Peak aktivitas sering terjadi pada siang hari. Jadwalkan blast berikutnya pada jam tersebut untuk open rate lebih tinggi.
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
            background: '#1A1A18',
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
