"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Users, Clock, ArrowRight, BarChart2, MailOpen, Activity, MousePointerClick } from "lucide-react";
import { SmtpSettingsModal, ImportCsvButton } from "./client-components";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface Props {
  activeCount: number;
  inactiveCount: number;
  campaignsCount: number;
  initialSmtpConfig: any;
}

export default function MinimalistDashboardClient({
  activeCount,
  inactiveCount,
  campaignsCount,
  initialSmtpConfig,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              href="/dashboard"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#787774] hover:text-[#111111] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
            <div>
              <h1 className="text-[32px] font-semibold tracking-tight text-[#111111] leading-tight">
                Email Blast
              </h1>
              <p className="text-[15px] text-[#787774] mt-2 max-w-md leading-relaxed">
                Platform penyiaran pesan. Kelola database kontak dan pantau performa campaign dalam satu antarmuka sederhana.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <SmtpSettingsModal initialConfig={initialSmtpConfig} />
              <Link
                href="/dashboard/email-blast/baru"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111111] text-white rounded-md text-[14px] font-medium hover:bg-[#333333] active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                Buat Campaign Baru
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="px-8 pb-24 max-w-5xl mx-auto w-full flex-grow">
        {/* STATS LINK CARD */}
        <div 
          className={`bg-white border border-[#EAEAEA] rounded-[12px] p-8 mb-6 flex flex-col sm:flex-row items-center justify-between transition-all duration-700 ease-out transform ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <div>
            <h3 className="text-[18px] font-semibold text-[#111111] mb-1">Statistik & Analitik</h3>
            <p className="text-[14px] text-[#787774]">Pantau laporan pengiriman, tingkat open rate, dan click rate dari campaign Anda.</p>
          </div>
          <Link
            href="/dashboard/email-blast/statistik"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#F7F6F3] text-[#111111] border border-[#EAEAEA] rounded-md text-[14px] font-medium hover:bg-[#EAEAEA] transition-all whitespace-nowrap"
          >
            <BarChart2 className="w-4 h-4" />
            Lihat Statistik
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card: Contacts */}
          <div 
            className={`bg-white border border-[#EAEAEA] rounded-[12px] p-8 flex flex-col justify-between min-h-[280px] transition-all duration-700 ease-out transform ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-[#F7F6F3] border border-[#EAEAEA] rounded-lg flex items-center justify-center text-[#111111]">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-[#EDF3EC] text-[#346538] text-[11px] font-semibold tracking-widest uppercase rounded-full">
                    {activeCount} Aktif
                  </span>
                  <span className="px-2.5 py-1 bg-[#FDEBEC] text-[#9F2F2D] text-[11px] font-semibold tracking-widest uppercase rounded-full">
                    {inactiveCount} Pasif
                  </span>
                </div>
              </div>
              <h2 className="text-[36px] font-semibold tracking-tight text-[#111111] leading-none mb-2">
                {activeCount + inactiveCount}
              </h2>
              <h3 className="text-[14px] font-medium text-[#787774] mb-4">Total Kontak Disimpan</h3>
              <p className="text-[14px] text-[#787774] leading-relaxed">
                Database penerima untuk broadcast email. Anda dapat menambahkan kontak secara manual atau melalui impor CSV.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between border-t border-[#EAEAEA] pt-6">
              <ImportCsvButton />
              <Link
                href="/dashboard/email-blast/kontak"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111111] hover:text-[#787774] transition-colors group"
              >
                Kelola Kontak
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card: Campaigns */}
          <div 
            className={`bg-white border border-[#EAEAEA] rounded-[12px] p-8 flex flex-col justify-between min-h-[280px] transition-all duration-700 ease-out transform ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-[#F7F6F3] border border-[#EAEAEA] rounded-lg flex items-center justify-center text-[#111111]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <h2 className="text-[36px] font-semibold tracking-tight text-[#111111] leading-none mb-2">
                {campaignsCount}
              </h2>
              <h3 className="text-[14px] font-medium text-[#787774] mb-4">Campaign Terkirim & Terjadwal</h3>
              <p className="text-[14px] text-[#787774] leading-relaxed">
                Log riwayat semua pesan broadcast yang telah dikonfigurasi. Pantau status pengiriman secara real-time.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-end border-t border-[#EAEAEA] pt-6">
              <Link
                href="/dashboard/email-blast/riwayat"
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#111111] hover:text-[#787774] transition-colors group"
              >
                Lihat Riwayat
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
