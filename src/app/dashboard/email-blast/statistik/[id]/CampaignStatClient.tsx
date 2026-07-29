"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
  campaign: {
    id: string;
    name: string;
    subject: string;
    status: string;
    createdAt: string;
  };
  stats: {
    totalSent: number;
    totalFailed: number;
    totalOpened: number;
    totalClicked: number;
    totalBounced: number;
  };
  recipients: {
    email: string;
    name: string;
    status: string;
    openedAt: string | null;
    clickedAt: string | null;
    device: string;
    openCount: number;
  }[];
  hourly: number[];
  devices: { label: string; pct: number }[];
}

export default function CampaignStatClient({
  campaign,
  stats,
  recipients,
  hourly,
  devices
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Chart setup
  const w = 600;
  const h = 180;
  const padX = 20;
  const padY = 20;

  // Generate hourly path
  let hourlyPath = "";
  const maxHourly = Math.max(...hourly, 1);
  if (hourly.length > 0) {
    hourly.forEach((val, i) => {
      const step = (w - padX * 2) / 23;
      const x = padX + i * step;
      const y = h - padY - (val / maxHourly) * (h - padY * 2);
      if (i === 0) hourlyPath += `M ${x},${y} `;
      else hourlyPath += `L ${x},${y} `;
    });
  }

  // Tooltip
  const [ttip, setTtip] = useState({ show: false, x: 0, y: 0, text: '' });
  const showTooltip = (e: any, text: string) => setTtip({ show: true, x: e.clientX, y: e.clientY, text });
  const hideTooltip = () => setTtip({ show: false, x: 0, y: 0, text: '' });
  const moveTooltip = (e: any) => setTtip(prev => ({ ...prev, x: e.clientX, y: e.clientY }));

  function initials(name: string) {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  }

  const openRate = stats.totalSent > 0 ? Math.round((stats.totalOpened / stats.totalSent) * 100) : 0;
  const clickRate = stats.totalOpened > 0 ? Math.round((stats.totalClicked / stats.totalOpened) * 100) : 0;

  return (
    <div className="bg-[#ECEAE5] min-h-screen text-[#15151B] font-['Inter',sans-serif] selection:bg-[#15151B] selection:text-white pb-20">
      
      {ttip.show && (
        <div style={{
          position: 'fixed',
          top: ttip.y - 10,
          left: ttip.x + 15,
          background: '#15151b',
          color: '#fff',
          padding: '6px 10px',
          fontSize: '11px',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 9999,
          whiteSpace: 'pre-wrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {ttip.text}
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#ECEAE5]/80 backdrop-blur-md border-b border-[#E4E1DA]">
        <div className="max-w-[1000px] mx-auto px-6 h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/email-blast/statistik" className="w-8 h-8 rounded-full border border-[#E4E1DA] flex items-center justify-center text-[#15151B] hover:bg-white transition-colors bg-[#Fbfaf8]">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-[11px] font-bold tracking-widest text-[#8A867D] uppercase mb-0.5">Detail Campaign</div>
              <div className="text-[16px] font-semibold tracking-tight">{campaign.name}</div>
            </div>
          </div>
          <div>
            <span className={`px-3 py-1 text-[11px] font-bold tracking-wider uppercase rounded-full border ${
              campaign.status === 'completed' || campaign.status === 'sent' 
                ? 'border-[#25D366]/30 text-[#128C7E] bg-[#25D366]/10' 
                : 'border-[#E4E1DA] text-[#8A867D] bg-white'
            }`}>
              {campaign.status}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-5 flex flex-col justify-between h-[120px]">
            <div className="text-[12px] font-medium text-[#8A867D]">Total Terkirim</div>
            <div className="flex items-end justify-between">
              <div className="text-[32px] font-semibold tracking-tighter leading-none">{stats.totalSent}</div>
            </div>
          </div>

          <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-5 flex flex-col justify-between h-[120px]">
            <div className="text-[12px] font-medium text-[#8A867D]">Total Dibuka</div>
            <div className="flex items-end justify-between">
              <div className="text-[32px] font-semibold tracking-tighter leading-none">{stats.totalOpened}</div>
              <div className="text-[13px] font-medium text-[#8A867D] mb-1">{openRate}%</div>
            </div>
            <div className="w-full h-1 bg-[#E4E1DA] mt-3 rounded-full overflow-hidden">
              <div className="h-full bg-[#15151B]" style={{ width: `${openRate}%` }}></div>
            </div>
          </div>

          <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-5 flex flex-col justify-between h-[120px]">
            <div className="text-[12px] font-medium text-[#8A867D]">Total Diklik</div>
            <div className="flex items-end justify-between">
              <div className="text-[32px] font-semibold tracking-tighter leading-none">{stats.totalClicked}</div>
              <div className="text-[13px] font-medium text-[#8A867D] mb-1">{clickRate}%</div>
            </div>
            <div className="w-full h-1 bg-[#E4E1DA] mt-3 rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD96A]" style={{ width: `${clickRate}%` }}></div>
            </div>
          </div>

          <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-5 flex flex-col justify-between h-[120px]">
            <div className="text-[12px] font-medium text-[#8A867D]">Gagal / Bounced</div>
            <div className="flex items-end justify-between">
              <div className="text-[32px] font-semibold tracking-tighter leading-none text-[#980203]">{stats.totalFailed + stats.totalBounced}</div>
            </div>
          </div>

        </div>

        {/* Info detail */}
        <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-6 mb-8">
          <div className="text-[11px] font-bold tracking-widest text-[#8A867D] uppercase mb-4">Informasi Campaign</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-[12px] text-[#8A867D] mb-1">Subjek Email</div>
              <div className="text-[14px] font-medium">{campaign.subject}</div>
            </div>
            <div>
              <div className="text-[12px] text-[#8A867D] mb-1">Dibuat Pada</div>
              <div className="text-[14px] font-medium">{new Date(campaign.createdAt).toLocaleString('id-ID')}</div>
            </div>
          </div>
        </div>

        {/* Heatmap & Devices */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          <div className="lg:col-span-2 bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-6">
            <div className="text-[11px] font-bold tracking-widest text-[#8A867D] uppercase mb-6 flex items-center justify-between">
              <span>Waktu Pembukaan (24 Jam)</span>
            </div>
            <div className="relative w-full overflow-hidden">
              <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="200" style={{ overflow: 'visible' }}>
                {/* Grid */}
                {[0, 1, 2, 3].map(i => {
                  const y = padY + i * ((h - padY * 2) / 3);
                  return <line key={i} x1={padX} y1={y} x2={w - padX} y2={y} stroke="#E4E1DA" strokeWidth="1" strokeDasharray="4 4" />;
                })}
                <path d={hourlyPath} fill="none" stroke="#15151B" strokeWidth="2.5" />
                
                {hourly.map((val, i) => {
                  if (val === 0) return null;
                  const step = (w - padX * 2) / 23;
                  const x = padX + i * step;
                  const y = h - padY - (val / maxHourly) * (h - padY * 2);
                  return (
                    <circle 
                      key={i} 
                      cx={x} 
                      cy={y} 
                      r="4" 
                      fill="#FFD96A" 
                      stroke="#15151B" 
                      strokeWidth="1.5"
                      style={{ cursor: 'pointer', pointerEvents: 'all' }}
                      onMouseEnter={(e) => showTooltip(e, `Jam ${String(i).padStart(2,'0')}:00\n${val} kali dibuka`)} 
                      onMouseLeave={hideTooltip} 
                      onMouseMove={moveTooltip}
                    />
                  );
                })}

                {/* X axis labels (0, 6, 12, 18, 23) */}
                {[0, 6, 12, 18, 23].map(hour => {
                  const step = (w - padX * 2) / 23;
                  const x = padX + hour * step;
                  return (
                    <text key={hour} x={x} y={h - 2} fontSize="10" fill="#8A867D" textAnchor="middle" fontFamily="Inter">
                      {String(hour).padStart(2,'0')}:00
                    </text>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg p-6">
            <div className="text-[11px] font-bold tracking-widest text-[#8A867D] uppercase mb-6">Perangkat Penerima</div>
            <div className="flex flex-col gap-4">
              {devices.map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[13px] mb-1.5">
                    <span className="font-medium">{d.label}</span>
                    <span className="text-[#8A867D]">{d.pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E4E1DA] rounded-full overflow-hidden">
                    <div className="h-full bg-[#15151B]" style={{ width: `${d.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Recipients Table */}
        <div className="bg-[#fbfaf8] border border-[#E4E1DA] rounded-lg overflow-hidden">
          <div className="p-5 border-b border-[#E4E1DA]">
            <div className="text-[11px] font-bold tracking-widest text-[#8A867D] uppercase">Aktivitas Penerima</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-[#E4E1DA]">
                  <th className="px-5 py-3 text-[11px] font-medium tracking-wider text-[#8A867D] uppercase">Email</th>
                  <th className="px-5 py-3 text-[11px] font-medium tracking-wider text-[#8A867D] uppercase">Status</th>
                  <th className="px-5 py-3 text-[11px] font-medium tracking-wider text-[#8A867D] uppercase">Opened</th>
                  <th className="px-5 py-3 text-[11px] font-medium tracking-wider text-[#8A867D] uppercase">Clicked</th>
                  <th className="px-5 py-3 text-[11px] font-medium tracking-wider text-[#8A867D] uppercase">Total Buka</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E1DA]/50">
                {recipients.length > 0 ? recipients.map((r, i) => (
                  <tr key={i} className="hover:bg-[#F9F9F8] transition-colors">
                    <td className="px-5 py-4">
                      <div className="text-[14px] font-medium text-[#111]">{r.email}</div>
                      <div className="text-[12px] text-[#8A867D]">{r.name}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium uppercase tracking-wider ${
                        r.status === 'sent' ? 'bg-[#25D366]/10 text-[#128C7E]' : 
                        r.status === 'failed' ? 'bg-[#980203]/10 text-[#980203]' : 
                        'bg-[#E4E1DA] text-[#8A867D]'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-[13px]">{r.openedAt ? new Date(r.openedAt).toLocaleString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'}) : '—'}</div>
                      {r.openedAt && <div className="text-[11px] text-[#8A867D] mt-0.5">{r.device}</div>}
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#111]">
                      {r.clickedAt ? new Date(r.clickedAt).toLocaleString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'}) : '—'}
                    </td>
                    <td className="px-5 py-4 text-[13px] font-medium text-[#111]">
                      {r.openCount > 0 ? `${r.openCount}x` : '—'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-[13px] text-[#8A867D]">
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
  );
}
