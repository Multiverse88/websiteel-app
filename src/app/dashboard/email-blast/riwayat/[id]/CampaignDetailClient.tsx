"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Clock, MailOpen, AlertCircle, CheckCircle2, User, MousePointerClick, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCampaignAction, cancelCampaignAction } from "../../actions";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CampaignDetailClient({ campaign, totalRecipients, totalSent, totalOpened, totalClicked }: any) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const totalPending = campaign.recipients.filter((r: any) => r.status === "pending").length;

  useEffect(() => {
    setMounted(true);
    
    // Auto-refresh every 3 seconds if there are pending recipients
    if (totalPending > 0) {
      const interval = setInterval(() => {
        router.refresh();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [totalPending, router]);

  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const clickRate = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;

  // Prepare Chart Data (group opens by hour)
  const hourlyData = campaign.recipients.reduce((acc: any, r: any) => {
    if (r.openedAt) {
      const hour = new Date(r.openedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      if (!acc[hour]) acc[hour] = { time: hour, Opens: 0 };
      acc[hour].Opens++;
    }
    return acc;
  }, {});
  
  const chartData = Object.values(hourlyData).sort((a: any, b: any) => a.time.localeCompare(b.time));

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

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFA] text-[#111111] font-sans">
      <header className="px-8 pt-16 pb-8 max-w-5xl mx-auto w-full">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
          <Link
            href="/dashboard/email-blast/riwayat"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#787774] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Riwayat
          </Link>
          <div className="flex items-center gap-2">
            {totalPending > 0 && (
              <button 
                onClick={async () => {
                  if (confirm("Yakin ingin membatalkan sisa antrean campaign ini?")) {
                    await cancelCampaignAction(campaign.id);
                  }
                }}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-md hover:bg-amber-100 transition-colors"
              >
                Batalkan
              </button>
            )}
            {campaign.status !== "processing" && (
              <>
                <Link
                  href={`/dashboard/email-blast/riwayat/${campaign.id}/edit`}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-[#111111] bg-white border border-[#EAEAEA] px-4 py-2 rounded-md hover:bg-[#F7F6F3] transition-colors"
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
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-md hover:bg-red-100 transition-colors"
                >
                  Hapus
                </button>
              </>
            )}
            <button 
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#111111] bg-white border border-[#EAEAEA] px-4 py-2 rounded-md hover:bg-[#F7F6F3] transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
        <h1 className="text-[32px] font-semibold tracking-tight text-[#111111] leading-tight flex items-center gap-3">
          {campaign.internalName || campaign.subject}
          {totalPending > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FBFBFA] border border-[#EAEAEA] text-[#111111] text-[13px] font-semibold rounded-full shadow-sm mt-1">
              <Loader2 className="w-4 h-4 animate-spin text-[#d62828]" />
              Sedang Memproses ({totalPending} tersisa)
            </span>
          )}
        </h1>
        <p className="text-[15px] text-[#787774] mt-2 max-w-xl leading-relaxed">
          {campaign.previewText || "Laporan performa campaign email."}
        </p>
      </header>

      <main className="px-8 pb-24 max-w-5xl mx-auto w-full flex-grow space-y-8">
        
        {/* FUNNEL ACCENT */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-5">
            <p className="text-[13px] text-[#787774] font-medium">Antrian</p>
            <h3 className="text-[24px] font-semibold text-[#111111] leading-none mt-2">{totalRecipients}</h3>
          </div>
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-5">
            <p className="text-[13px] text-[#787774] font-medium">Terkirim</p>
            <h3 className="text-[24px] font-semibold text-[#111111] leading-none mt-2">{totalSent}</h3>
          </div>
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-5">
            <p className="text-[13px] text-[#787774] font-medium">Open Rate</p>
            <h3 className="text-[24px] font-semibold text-[#111111] leading-none mt-2">
              {openRate}% <span className="text-[14px] text-[#787774] font-normal">({totalOpened})</span>
            </h3>
          </div>
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-5">
            <p className="text-[13px] text-[#787774] font-medium">Click-to-Open</p>
            <h3 className="text-[24px] font-semibold text-[#111111] leading-none mt-2">
              {clickRate}% <span className="text-[14px] text-[#787774] font-normal">({totalClicked})</span>
            </h3>
          </div>
        </div>

        {/* CHART TIMELINE */}
        {mounted && chartData.length > 0 && (
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-8">
            <h3 className="text-[14px] font-semibold text-[#111111] mb-6">Timeline Pembukaan Email</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOpens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#111111" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#111111" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#787774" }} dy={10} />
                  <Tooltip cursor={{ fill: "#F7F6F3" }} contentStyle={{ borderRadius: "8px", border: "1px solid #EAEAEA", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontSize: "13px" }} />
                  <Area type="monotone" dataKey="Opens" stroke="#111111" strokeWidth={2} fillOpacity={1} fill="url(#colorOpens)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* LIST SECTION */}
        <div className="bg-white border border-[#EAEAEA] rounded-[12px] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EAEAEA] bg-[#F7F6F3]">
            <h3 className="text-[14px] font-semibold text-[#111111]">Laporan Pengiriman Detail</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EAEAEA]">
                  <th className="px-6 py-3 text-[12px] font-medium text-[#787774] uppercase tracking-widest">Penerima</th>
                  <th className="px-6 py-3 text-[12px] font-medium text-[#787774] uppercase tracking-widest text-center">Status</th>
                  <th className="px-6 py-3 text-[12px] font-medium text-[#787774] uppercase tracking-widest text-center">Dibuka (Total)</th>
                  <th className="px-6 py-3 text-[12px] font-medium text-[#787774] uppercase tracking-widest text-center">Interaksi Link</th>
                  <th className="px-6 py-3 text-[12px] font-medium text-[#787774] uppercase tracking-widest text-center">Perangkat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {campaign.recipients.map((recipient: any) => (
                  <tr key={recipient.id} className="hover:bg-[#FBFBFA] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EAEAEA] flex items-center justify-center text-[#787774]">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-[14px] font-medium text-[#111111]">
                            {recipient.contact.email}
                          </div>
                          {recipient.contact.name && (
                            <div className="text-[12px] text-[#787774]">
                              {recipient.contact.name}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {recipient.status === "sent" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EDF3EC] text-[#346538] text-[11px] font-semibold tracking-widest uppercase rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Terkirim
                        </span>
                      ) : recipient.status === "failed" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FDEBEC] text-[#9F2F2D] text-[11px] font-semibold tracking-widest uppercase rounded-full">
                          <AlertCircle className="w-3.5 h-3.5" /> Gagal
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFBEA] text-[#B8860B] border border-[#FBE5A1] text-[11px] font-semibold tracking-widest uppercase rounded-full">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {recipient.openedAt ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#E1F3FE] text-[#1F6C9F] text-[11px] font-semibold tracking-widest uppercase rounded-full">
                          <MailOpen className="w-3.5 h-3.5" /> {recipient.openCount}x Dibuka
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#787774] italic">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {recipient.clickedAt ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FDF0E1] text-[#98530B] text-[11px] font-semibold tracking-widest uppercase rounded-full">
                          <MousePointerClick className="w-3.5 h-3.5" /> Diklik
                        </span>
                      ) : (
                        <span className="text-[13px] text-[#787774] italic">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center max-w-[120px] truncate">
                      <span className="text-[12px] text-[#787774]" title={recipient.device}>
                        {recipient.device ? (recipient.device.length > 20 ? recipient.device.substring(0,20)+'...' : recipient.device) : "-"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
