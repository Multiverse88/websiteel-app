import React from "react";
import Link from "next/link";
import { ArrowLeft, Settings, ToggleRight, Mail, Users } from "lucide-react";
import { getNewsletterSettings } from "./actions";
import { SettingsForm, SmtpTestCard } from "./client-components";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewsletterSettingsPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const initialSettings = await getNewsletterSettings();

  // Ambil stat pendukung untuk ditampilkan di sidebar settings
  const activeSubscribers = await prisma.newsletterSubscriber.count({
    where: { isActive: true },
  });

  const totalBroadcasts = await prisma.newsletterBroadcast.count();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-150 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/newsletter"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              title="Kembali ke Newsletter"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-[#990202]">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-black text-gray-900 tracking-tight leading-none">
                  Pengaturan Otomatisasi
                </h1>
                <p className="text-[11px] text-gray-500 font-medium mt-1">
                  Atur alur pengiriman email otomatis newsletter
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-lg transition-all"
          >
            Dashboard Utama
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Settings Form */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <SettingsForm initialSettings={initialSettings} />
        </div>

        {/* Right Column - Info / Stats Sidebar */}
        <div className="flex flex-col gap-6">
          {/* SMTP Test Card */}
          <SmtpTestCard />

          {/* Ringkasan Status Otomatisasi */}
          <div className="bg-white rounded-xl shadow-md border border-black/[0.03] p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2 flex items-center gap-1.5">
              <ToggleRight className="w-4 h-4 text-[#990202]" /> Ringkasan Newsletter
            </h3>

            <div className="flex flex-col gap-3.5">
              {/* Stat 1 */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-gray-400" /> Subscriber Aktif
                </span>
                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full">
                  {activeSubscribers} orang
                </span>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 font-medium flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400" /> Total Broadcast Sent
                </span>
                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-full">
                  {totalBroadcasts} kali
                </span>
              </div>
            </div>
          </div>

          {/* Panduan Placeholder Tagging */}
          <div className="bg-white rounded-xl shadow-md border border-black/[0.03] p-6 shadow-sm flex flex-col gap-3 text-xs leading-relaxed text-gray-600">
            <h3 className="font-bold text-gray-900 text-sm border-b border-gray-100 pb-2">
              💡 Panduan Placeholder Tagging
            </h3>
            <p>
              Gunakan tanda kurung kurawal ganda berikut untuk memasukkan informasi artikel secara dinamis ke dalam subjek atau pesan pembuka:
            </p>
            <ul className="list-disc pl-4 space-y-1.5 text-gray-500">
              <li>
                <code className="text-[#990202] font-semibold">{"{{title}}"}</code>: Menampilkan judul lengkap dari artikel baru Anda.
              </li>
              <li>
                <code className="text-[#990202] font-semibold">{"{{category}}"}</code>: Menyisipkan kategori artikel (contoh: Legalitas).
              </li>
            </ul>
            <div className="p-3 bg-red-50/50 rounded-lg text-[11px] text-gray-500 border border-red-100/50 mt-1">
              <b>Catatan:</b> Pastikan penulisan placeholder menggunakan kurung kurawal ganda persis seperti di atas agar dibaca sempurna oleh sistem.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
