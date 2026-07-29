"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Loader2, Download } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCampaignAction, cancelCampaignAction } from "../../actions";

export default function CampaignDetailClient({ campaign, totalRecipients, totalSent, totalOpened, totalClicked }: any) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const totalPending = campaign.recipients.filter((r: any) => r.status === "pending").length;
  const totalFailed = campaign.recipients.filter((r: any) => r.status === "failed").length;
  const totalBounced = campaign.recipients.filter((r: any) => r.bouncedAt !== null).length;

  useEffect(() => {
    setMounted(true);
    if (totalPending > 0) {
      const interval = setInterval(() => {
        router.refresh();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [totalPending, router]);

  // Hourly Activity Array
  const hourly = new Array(24).fill(0);
  campaign.recipients.forEach((r: any) => {
    if (r.openedAt) {
      const hour = new Date(r.openedAt).getHours();
      hourly[hour]++;
    }
  });
  const maxHour = Math.max(...hourly, 1);

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
    : [
        { label: 'Belum ada data', pct: 0 }
      ];

  // Tooltip Logic
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });
  const showTooltip = (e: React.MouseEvent, content: string) => setTooltip({ visible: true, x: e.clientX, y: e.clientY, content });
  const hideTooltip = () => setTooltip({ visible: false, x: 0, y: 0, content: "" });
  const moveTooltip = (e: React.MouseEvent) => setTooltip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));

  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const clickRate = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;

  // CSV Export Logic
  const handleExportCSV = () => {
    const headers = ["Nama", "Email", "Status", "Dikirim Pada", "Buka Pertama", "Jumlah Buka", "Klik Link", "Device"];
    const rows = campaign.recipients.map((r: any) => [
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
    link.download = `campaign_report_${campaign.id}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) return null;

  return (
    <>
      <style jsx>{`
        .stat-page {
          --bg: #ECEAE5;
          --card: #fbfaf8;
          --border: #E4E1DA;
          --ink: #15151B;
          --sub: #8A867D;
          --faint: #B0ADA5;
          --bar: #FFD96A;
          --gold: #FFB300;
          --green: #128C7E;
          --red: #980203;
          --green-bg: #EAF3EC;
          --red-bg: #FBEAEA;
          --radius: 16px;
          background: var(--bg);
          color: var(--ink);
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }

        .section-label {
          font-family:'Poppins',sans-serif; font-size:13px; font-weight:600;
          text-transform:uppercase; letter-spacing:0.06em; color:var(--sub);
          margin: 36px 0 14px;
        }
        .section-label:first-of-type { margin-top:0; }

        .chart-card {
          background:var(--card); border:1px solid var(--border); border-radius:var(--radius);
          padding:22px 24px;
        }
        .chart-card-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
        .chart-title { display:flex; align-items:center; gap:9px; font-size:14px; font-weight:600; }
        .chart-title .icon-badge { width:24px; height:24px; }
        
        .icon-badge {
          width:26px; height:26px; border-radius:8px; background:#F1EFEA;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .icon-badge svg { width:14px; height:14px; stroke:var(--ink); }

        .two-col { display:grid; grid-template-columns: 1.6fr 1fr; gap:14px; align-items:start; }

        /* hourly heatmap */
        .hour-grid { display:grid; grid-template-columns:repeat(24,1fr); gap:3px; align-items:end; height:120px; }
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
          .two-col { grid-template-columns:1fr; }
          .hour-grid, .hour-labels { grid-template-columns:repeat(12,1fr); }
        }
      `}</style>
      
      <div className="stat-page pb-20">
        
        {/* Header (Top navigation stays standard tailwind) */}
        <div className="sticky top-0 z-40 bg-[#ECEAE5]/80 backdrop-blur-md border-b border-[#E4E1DA]">
          <div className="w-full mx-auto px-10 h-[70px] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/email-blast/riwayat" className="w-8 h-8 rounded-full border border-[#E4E1DA] flex items-center justify-center text-[#15151B] hover:bg-white transition-colors bg-[#Fbfaf8]">
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <div>
                <div className="text-[11px] font-bold tracking-widest text-[#8A867D] uppercase mb-0.5 flex items-center gap-2">
                  Riwayat Campaign
                  <span className={`px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full border ${
                    campaign.status === 'completed' || campaign.status === 'sent' 
                      ? 'border-[#25D366]/30 text-[#128C7E] bg-[#25D366]/10' 
                      : 'border-[#E4E1DA] text-[#8A867D] bg-white'
                  }`}>
                    {campaign.status}
                  </span>
                  {totalPending > 0 && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-[#FBFBFA] border border-[#EAEAEA] text-[#111111] text-[9px] font-semibold rounded-full shadow-sm">
                      <Loader2 className="w-3 h-3 animate-spin text-[#d62828]" />
                      Memproses ({totalPending})
                    </span>
                  )}
                </div>
                <div className="text-[16px] font-semibold tracking-tight">{campaign.internalName || campaign.subject}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {totalPending > 0 && (
                <button 
                  onClick={async () => {
                    if (confirm("Yakin ingin membatalkan sisa antrean campaign ini?")) {
                      await cancelCampaignAction(campaign.id);
                    }
                  }}
                  className="inline-flex items-center gap-2 text-[12px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md hover:bg-amber-100 transition-colors"
                >
                  Batalkan
                </button>
              )}
              {campaign.status !== "processing" && (
                <>
                  <Link
                    href={`/dashboard/email-blast/riwayat/${campaign.id}/edit`}
                    className="inline-flex items-center gap-2 text-[12px] font-medium text-[#111111] bg-[#fbfaf8] border border-[#E4E1DA] px-3 py-1.5 rounded-md hover:bg-white transition-colors"
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
                    className="inline-flex items-center gap-2 text-[12px] font-medium text-[#980203] bg-red-50 border border-red-200 px-3 py-1.5 rounded-md hover:bg-red-100 transition-colors"
                  >
                    Hapus
                  </button>
                </>
              )}
              <button 
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 text-[12px] font-medium text-[#111111] bg-[#111] text-white px-3 py-1.5 rounded-md hover:bg-[#333] transition-colors"
              >
                <Download className="w-3 h-3" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto px-10 mt-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-5 flex flex-col justify-between h-[120px]">
              <div className="text-[12px] font-medium text-[#8A867D]">Total Terkirim</div>
              <div className="flex items-end justify-between">
                <div className="text-[32px] font-semibold tracking-tighter leading-none">{totalSent}</div>
              </div>
            </div>

            <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-5 flex flex-col justify-between h-[120px]">
              <div className="text-[12px] font-medium text-[#8A867D]">Total Dibuka</div>
              <div className="flex items-end justify-between">
                <div className="text-[32px] font-semibold tracking-tighter leading-none">{totalOpened}</div>
                <div className="text-[13px] font-medium text-[#8A867D] mb-1">{openRate}%</div>
              </div>
              <div className="w-full h-1 bg-[#E4E1DA] mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-[#15151B]" style={{ width: `${openRate}%` }}></div>
              </div>
            </div>

            <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-5 flex flex-col justify-between h-[120px]">
              <div className="text-[12px] font-medium text-[#8A867D]">Total Diklik</div>
              <div className="flex items-end justify-between">
                <div className="text-[32px] font-semibold tracking-tighter leading-none">{totalClicked}</div>
                <div className="text-[13px] font-medium text-[#8A867D] mb-1">{clickRate}%</div>
              </div>
              <div className="w-full h-1 bg-[#E4E1DA] mt-3 rounded-full overflow-hidden">
                <div className="h-full bg-[#FFD96A]" style={{ width: `${clickRate}%` }}></div>
              </div>
            </div>

            <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-5 flex flex-col justify-between h-[120px]">
              <div className="text-[12px] font-medium text-[#8A867D]">Gagal / Bounced</div>
              <div className="flex items-end justify-between">
                <div className="text-[32px] font-semibold tracking-tighter leading-none text-[#980203]">{totalFailed + totalBounced}</div>
              </div>
            </div>
          </div>

          <div className="two-col mb-8">
            <div>
              <div className="section-label" style={{ marginTop: 0 }}>Waktu Pembukaan (24 Jam)</div>
              <div className="chart-card" style={{ paddingBottom: '32px' }}>
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
                        height: Math.max((v / maxHour) * 100, 3) + '%', 
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

            <div>
              <div className="section-label" style={{ marginTop: 0 }}>Perangkat Penerima</div>
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
              
              <div className="chart-card mt-4 p-5">
                <div className="text-[11px] font-bold tracking-widest text-[#8A867D] uppercase mb-4">Informasi Tambahan</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] text-[#8A867D] mb-1">Subjek Email</div>
                    <div className="text-[13px] font-medium leading-tight">{campaign.subject}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#8A867D] mb-1">Dibuat Pada</div>
                    <div className="text-[13px] font-medium leading-tight">{new Date(campaign.createdAt).toLocaleString('id-ID')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recipients Table */}
          <div className="section-label">Aktivitas Kontak Detail</div>
          <div className="chart-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#E4E1DA] bg-[#fbfaf8]">
                    <th className="px-6 py-4 text-[11.5px] font-medium tracking-widest text-[#8A867D] uppercase">Email</th>
                    <th className="px-6 py-4 text-[11.5px] font-medium tracking-widest text-[#8A867D] uppercase">Status</th>
                    <th className="px-6 py-4 text-[11.5px] font-medium tracking-widest text-[#8A867D] uppercase">Opened</th>
                    <th className="px-6 py-4 text-[11.5px] font-medium tracking-widest text-[#8A867D] uppercase">Clicked</th>
                    <th className="px-6 py-4 text-[11.5px] font-medium tracking-widest text-[#8A867D] uppercase">Total Buka</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E1DA]/50">
                  {campaign.recipients.length > 0 ? campaign.recipients.map((r: any, i: number) => (
                    <tr key={i} className="hover:bg-[#F9F9F8] transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-[13.5px] font-medium text-[#111]">{r.contact.email}</div>
                        <div className="text-[11.5px] text-[#8A867D] mt-0.5">{r.contact.name || "Unknown"}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider ${
                          r.status === 'sent' ? 'bg-[#EAF3EC] text-[#128C7E]' : 
                          r.status === 'failed' ? 'bg-[#FBEAEA] text-[#980203]' : 
                          'bg-[#EDEAE2] text-[#8A867D]'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[13px] font-medium">{r.openedAt ? new Date(r.openedAt).toLocaleString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'}) : '—'}</div>
                        {r.openedAt && <div className="text-[11.5px] text-[#8A867D] mt-1">{r.device}</div>}
                      </td>
                      <td className="px-6 py-4 text-[13px] font-medium text-[#111]">
                        {r.clickedAt ? new Date(r.clickedAt).toLocaleString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'}) : '—'}
                      </td>
                      <td className="px-6 py-4 text-[13px] font-semibold text-[#111]">
                        {r.openCount > 0 ? `${r.openCount}x` : '—'}
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-[13px] text-[#8A867D]">
                        Belum ada penerima
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
