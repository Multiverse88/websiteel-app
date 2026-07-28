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

              {/* Form Tambah Kontak */}
              <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-5 mb-6">
                <h3 className="text-[14px] font-bold text-gray-700 mb-3">Tambah Kontak Cepat</h3>
                <form action={async (formData) => {
                  "use server";
                  await addContactAction(formData);
                }} className="flex gap-3">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828]"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Nama (Opsional)"
                    className="w-[150px] px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-1.5 text-[14px]"
                  >
                    <UserPlus className="w-4 h-4" />
                    Tambah
                  </button>
                </form>
              </div>

              {contacts.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-10 text-center">
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-2">Belum ada kontak</h3>
                  <p className="text-[16px] text-gray-500">
                    Silakan tambahkan kontak email untuk mulai mengirim blast.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] overflow-hidden">
                  <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-[14px] font-extrabold text-gray-400 uppercase tracking-wider">
                    <div className="col-span-4">Email</div>
                    <div className="col-span-3">Nama</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-3 text-right">Aksi</div>
                  </div>
                  
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
                    >
                      <div className="col-span-4">
                        <span className="text-[14px] font-bold text-gray-900 truncate block">
                          {contact.email}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <span className="text-[14px] text-gray-500 truncate block">
                          {contact.name || "-"}
                        </span>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-md text-[12px] font-bold ${
                            contact.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-gray-100 text-gray-500 border border-black/[0.04]"
                          }`}
                        >
                          {contact.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-end">
                        <ContactActions id={contact.id} isActive={contact.isActive} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
