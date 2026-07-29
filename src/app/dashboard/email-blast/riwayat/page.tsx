import React from "react";
import Link from "next/link";
import { ArrowLeft, Send, Clock, CheckCircle2, AlertCircle, Users } from "lucide-react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EmailBlastRiwayatPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Fetch campaigns
  const campaigns = await prisma.emailCampaign.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { recipients: true },
      },
    },
  });

  const completedCount = campaigns.filter((c: any) => c.status === "completed").length;
  const scheduledCount = campaigns.filter((c: any) => c.status === "scheduled").length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/email-blast"
              className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-[22px] font-extrabold text-gray-900 tracking-tight">Riwayat Campaign</h1>
              <p className="text-[14px] text-gray-500 mt-1 font-medium">
                {campaigns.length} total · {completedCount} selesai · {scheduledCount} terjadwal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/email-blast/baru"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[14px] font-bold bg-[#d62828] text-white hover:bg-[#b20112] shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              Buat Baru
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="py-8 flex-grow">
        <div className="max-w-[1200px] mx-auto px-6 space-y-6">
          
          {campaigns.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-10 text-center">
              <h3 className="text-[16px] font-extrabold text-gray-900 mb-2">Belum ada campaign</h3>
              <p className="text-[16px] text-gray-500">
                Silakan buat campaign email baru untuk mulai mengirim blast.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] overflow-hidden">
              <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-[14px] font-extrabold text-gray-400 uppercase tracking-wider">
                <div className="col-span-5">Subject Campaign</div>
                <div className="col-span-3">Tanggal</div>
                <div className="col-span-2 text-center">Penerima</div>
                <div className="col-span-2 text-right">Status</div>
              </div>
              
              {campaigns.map((campaign: any) => (
                <Link
                  href={`/dashboard/email-blast/riwayat/${campaign.id}`}
                  key={campaign.id}
                  className="grid grid-cols-12 gap-3 px-5 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
                >
                  <div className="col-span-5">
                    <span className="text-[14px] font-bold text-[#111111] block hover:underline">
                      {campaign.subject}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-[14px] text-gray-500 flex items-center gap-1.5">
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
                  <div className="col-span-2 flex justify-center text-center">
                    <span className="text-[14px] font-medium text-gray-600 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gray-400" />
                      {campaign._count.recipients}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[12px] font-bold border shrink-0 ${
                        campaign.status === "completed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : campaign.status === "scheduled"
                          ? "bg-blue-50 text-blue-700 border-blue-200/60"
                          : campaign.status === "processing"
                          ? "bg-amber-50 text-amber-700 border-amber-200/60"
                          : "bg-gray-100 text-gray-700 border-gray-200/60"
                      }`}
                    >
                      {campaign.status === "completed" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {campaign.status === "scheduled" && <Clock className="w-3.5 h-3.5" />}
                      {campaign.status === "processing" && <AlertCircle className="w-3.5 h-3.5" />}
                      {campaign.status.toUpperCase()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
