import React from "react";
import Link from "next/link";
import { ArrowLeft, Send, Users, UserPlus, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ContactActions, ImportCsvButton, SmtpSettingsModal } from "./client-components";
import { addContactAction, getSmtpSettingsAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function EmailBlastDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const initialSmtpConfig = await getSmtpSettingsAction();

  // Fetch all contacts
  const contacts = await prisma.blastContact.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Fetch campaigns
  const campaigns = await prisma.emailCampaign.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { recipients: true },
      },
    },
  });

  const activeCount = contacts.filter(c => c.isActive).length;
  const inactiveCount = contacts.length - activeCount;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-[16px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-heading text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
                Email Blast
              </h1>
              <p className="text-[16px] text-gray-500 mt-1">
                Kelola kontak dan kirim email promosi / pengumuman.
              </p>
            </div>
            <div>
              <Link
                href="/dashboard/email-blast/baru"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[16px] font-bold bg-[#d62828] text-white hover:bg-[#b20112] shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                Buat Campaign Baru
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-10 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: Kontak Blast */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[16px] font-extrabold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  Daftar Kontak
                </h2>
                <div className="flex items-center gap-4">
                  <span className="text-[16px] font-bold text-gray-400">
                    {activeCount} aktif · {inactiveCount} nonaktif
                  </span>
                  <SmtpSettingsModal initialConfig={initialSmtpConfig} />
                  <ImportCsvButton />
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-[18px] font-extrabold text-gray-900 mb-2">Kelola Semua Kontak Email</h3>
                <p className="text-[15px] text-gray-500 mb-6 max-w-sm">
                  Anda memiliki total {activeCount + inactiveCount} kontak. Klik tombol di bawah ini untuk melihat daftar lengkap, mengaktifkan/menonaktifkan, atau menambah kontak baru.
                </p>
                <Link
                  href="/dashboard/email-blast/kontak"
                  className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <Users className="w-4 h-4" />
                  Lihat & Kelola Kontak
                </Link>
              </div>
            </div>

            {/* RIGHT: Campaigns */}
            <div className="lg:col-span-5">
              <h2 className="text-[16px] font-extrabold text-gray-900 mb-5 flex items-center gap-2">
                <Send className="w-5 h-5 text-[#d62828]" />
                Riwayat Campaign
              </h2>
              
              {campaigns.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-8 text-center">
                  <p className="text-[16px] text-gray-500">Belum ada campaign yang dibuat.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-black/[0.04] p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-[16px] font-bold text-gray-900 leading-tight">
                          {campaign.subject}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[12px] font-bold border shrink-0 ${
                            campaign.status === "completed"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : campaign.status === "scheduled"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : campaign.status === "processing"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }`}
                        >
                          {campaign.status === "completed" && <CheckCircle2 className="w-3 h-3" />}
                          {campaign.status === "scheduled" && <Clock className="w-3 h-3" />}
                          {campaign.status === "processing" && <AlertCircle className="w-3 h-3" />}
                          {campaign.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-[14px] text-gray-500 mt-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          {campaign._count.recipients} Penerima
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {campaign.scheduledAt 
                            ? new Date(campaign.scheduledAt).toLocaleDateString("id-ID", {
                                day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                              })
                            : new Date(campaign.createdAt).toLocaleDateString("id-ID", {
                                day: "numeric", month: "short", year: "numeric"
                              })
                          }
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
