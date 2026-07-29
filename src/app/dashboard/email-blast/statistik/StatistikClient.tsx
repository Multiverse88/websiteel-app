"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, BarChart2, MailOpen, Activity, MousePointerClick } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  sentThisWeek: number;
  totalSent: number;
  totalOpened: number;
  totalClicked: number;
  chartData: any[];
}

export default function StatistikClient({
  sentThisWeek,
  totalSent,
  totalOpened,
  totalClicked,
  chartData,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const clickRate = totalOpened > 0 ? Math.round((totalClicked / totalOpened) * 100) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFA] text-[#111111] font-sans">
      {/* HEADER SECTION */}
      <header className="px-8 pt-16 pb-8 max-w-5xl mx-auto w-full">
        <div 
          className={`flex flex-col gap-4 transition-all duration-700 ease-out transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard/email-blast"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#787774] hover:text-[#111111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
            <div>
              <h1 className="text-[32px] font-semibold tracking-tight text-[#111111] leading-tight">
                Statistik Campaign
              </h1>
              <p className="text-[15px] text-[#787774] mt-2 max-w-md leading-relaxed">
                Pantau performa email blast Anda secara mendetail.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="px-8 pb-24 max-w-5xl mx-auto w-full flex-grow">
        
        {/* STATS ACCENT */}
        <div 
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 transition-all duration-700 ease-out transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-5 flex flex-col justify-center">
            <p className="text-[13px] text-[#787774] font-medium flex items-center gap-2">
              <Send className="w-3.5 h-3.5" /> Terkirim (7 Hari)
            </p>
            <h3 className="text-[24px] font-semibold text-[#111111] leading-none mt-2">{sentThisWeek}</h3>
          </div>
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-5 flex flex-col justify-center">
            <p className="text-[13px] text-[#787774] font-medium flex items-center gap-2">
              <BarChart2 className="w-3.5 h-3.5" /> Total Terkirim
            </p>
            <h3 className="text-[24px] font-semibold text-[#111111] leading-none mt-2">{totalSent}</h3>
          </div>
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-5 flex flex-col justify-center">
            <p className="text-[13px] text-[#787774] font-medium flex items-center gap-2">
              <MailOpen className="w-3.5 h-3.5" /> Open Rate
            </p>
            <h3 className="text-[24px] font-semibold text-[#111111] leading-none mt-2">
              {openRate}% <span className="text-[14px] text-[#787774] font-normal">({totalOpened})</span>
            </h3>
          </div>
          <div className="bg-white border border-[#EAEAEA] rounded-[12px] p-5 flex flex-col justify-center">
            <p className="text-[13px] text-[#787774] font-medium flex items-center gap-2">
              <MousePointerClick className="w-3.5 h-3.5" /> Click Rate
            </p>
            <h3 className="text-[24px] font-semibold text-[#111111] leading-none mt-2">
              {clickRate}% <span className="text-[14px] text-[#787774] font-normal">({totalClicked})</span>
            </h3>
          </div>
        </div>

        {/* CHART SECTION */}
        <div 
          className={`bg-white border border-[#EAEAEA] rounded-[12px] p-8 mb-6 transition-all duration-700 ease-out transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-[#111111]" />
            <h3 className="text-[16px] font-semibold text-[#111111]">Aktivitas Keseluruhan (7 Hari Terakhir)</h3>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAEAEA" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#787774" }} dy={10} />
                <Tooltip 
                  cursor={{ fill: "#F7F6F3" }} 
                  contentStyle={{ borderRadius: "8px", border: "1px solid #EAEAEA", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontSize: "13px" }} 
                />
                <Bar dataKey="Terkirim" fill="#111111" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Dibuka" fill="#787774" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="Diklik" fill="#EAEAEA" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
