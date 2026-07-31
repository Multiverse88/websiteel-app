"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Send, Users, Clock, ArrowRight, BarChart2 } from "lucide-react";
import { SmtpSettingsModal, ImportCsvButton } from "./client-components";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";
import DashboardCard from "@/components/dashboard/ui/DashboardCard";
import DashboardButton from "@/components/dashboard/ui/DashboardButton";
import DashboardBadge from "@/components/dashboard/ui/DashboardBadge";

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
    <div>
      <DashboardHeader
        title="Email Blast"
        description="Platform penyiaran pesan. Kelola database kontak dan pantau performa campaign."
        action={
          <div className="flex items-center gap-3">
            <SmtpSettingsModal initialConfig={initialSmtpConfig} />
            <Link href="/dashboard/email-blast/baru">
              <DashboardButton icon={Send}>Buat Campaign Baru</DashboardButton>
            </Link>
          </div>
        }
      />
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        {/* Stats Link Card */}
        <DashboardCard hover className="p-6 flex flex-col sm:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Statistik & Analitik</h3>
            <p className="text-[14px] text-gray-500">Pantau laporan pengiriman, tingkat open rate, dan click rate.</p>
          </div>
          <Link href="/dashboard/email-blast/statistik">
            <DashboardButton variant="secondary" icon={BarChart2} className="mt-4 sm:mt-0">
              Lihat Statistik
            </DashboardButton>
          </Link>
        </DashboardCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Contacts */}
          <DashboardCard hover className="p-6 flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-[#990202]">
                  <Users className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <DashboardBadge variant="success">{activeCount} Aktif</DashboardBadge>
                  <DashboardBadge variant="neutral">{inactiveCount} Pasif</DashboardBadge>
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-none mb-2">
                {activeCount + inactiveCount}
              </h2>
              <h3 className="text-[14px] font-semibold text-gray-500 mb-3">Total Kontak Disimpan</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Database penerima untuk broadcast email. Tambahkan kontak secara manual atau melalui impor CSV.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
              <ImportCsvButton />
              <Link
                href="/dashboard/email-blast/kontak"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-700 hover:text-[#990202] transition-colors group"
              >
                Kelola Kontak
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </DashboardCard>

          {/* Card: Campaigns */}
          <DashboardCard hover className="p-6 flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-[#990202]">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 leading-none mb-2">
                {campaignsCount}
              </h2>
              <h3 className="text-[14px] font-semibold text-gray-500 mb-3">Campaign Terkirim & Terjadwal</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">
                Log riwayat semua pesan broadcast. Pantau status pengiriman secara real-time.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-end border-t border-gray-100 pt-4">
              <Link
                href="/dashboard/email-blast/riwayat"
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-gray-700 hover:text-[#990202] transition-colors group"
              >
                Lihat Riwayat
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
