import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Users, Send, Calendar, Clock, CheckCircle2, Settings, AlertCircle, XCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { BroadcastButton, SubscriberActions } from "./client-components";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function NewsletterDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Fetch all subscribers
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: "desc" },
  });

  // Fetch broadcast history
  const broadcasts = await prisma.newsletterBroadcast.findMany({
    orderBy: { sentAt: "desc" },
    take: 10,
  });

  // Fetch recent articles for broadcast
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      createdAt: true,
    },
  });

  // Get broadcast article IDs and count per article
  const broadcastArticleIds = new Set(broadcasts.map((b) => b.articleId));
  const broadcastCountMap = new Map<string, number>();
  for (const b of broadcasts) {
    broadcastCountMap.set(b.articleId, (broadcastCountMap.get(b.articleId) || 0) + 1);
  }

  // Fetch recent email logs
  const emailLogs = await prisma.emailLog.findMany({
    orderBy: { sentAt: "desc" },
    take: 50,
    select: {
      id: true,
      recipient: true,
      subject: true,
      status: true,
      errorMessage: true,
      source: true,
      sentAt: true,
    },
  });

  const activeCount = subscribers.filter((s) => s.isActive).length;
  const inactiveCount = subscribers.length - activeCount;

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-inter text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
                Newsletter
              </h1>
              <p className="text-[14px] text-gray-500 mt-1">
                Kelola subscriber dan kirim broadcast artikel terbaru.
              </p>
            </div>
            <div>
              <Link
                href="/dashboard/newsletter/settings"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-gray-700 hover:text-gray-900 border border-gray-200/80 hover:bg-gray-50 shadow-sm transition-all"
              >
                <Settings className="w-4 h-4 text-gray-500" />
                Atur Otomatisasi
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-[#FAFAFA] rounded-xl border border-gray-200/60 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#FFF5F5] border border-red-100/50 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#990202]" />
              </div>
              <div>
                <div className="text-[24px] font-extrabold text-gray-950 leading-none">{activeCount}</div>
                <div className="text-[12px] text-gray-500 mt-1 font-medium">Subscriber Aktif</div>
              </div>
            </div>
            <div className="bg-[#FAFAFA] rounded-xl border border-gray-200/60 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gray-100 border border-gray-200/60 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <div className="text-[24px] font-extrabold text-gray-950 leading-none">{subscribers.length}</div>
                <div className="text-[12px] text-gray-500 mt-1 font-medium">Total Subscriber</div>
              </div>
            </div>
            <div className="bg-[#FAFAFA] rounded-xl border border-gray-200/60 p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/50 flex items-center justify-center flex-shrink-0">
                <Send className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-[24px] font-extrabold text-gray-950 leading-none">{broadcasts.length}</div>
                <div className="text-[12px] text-gray-500 mt-1 font-medium">Broadcast Terkirim</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-10 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT: Subscribers List */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[18px] font-extrabold text-gray-900">
                  Daftar Subscriber
                </h2>
                <span className="text-[12px] font-bold text-gray-400">
                  {activeCount} aktif · {inactiveCount} nonaktif
                </span>
              </div>

              {subscribers.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7 text-[#990202]" />
                  </div>
                  <h3 className="text-[16px] font-extrabold text-gray-900 mb-2">Belum ada subscriber</h3>
                  <p className="text-[13px] text-gray-500">
                    Subscriber akan muncul di sini ketika pengunjung mendaftar newsletter.
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                    <div className="col-span-5">Email</div>
                    <div className="col-span-3">Tanggal Daftar</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2 text-right">Aksi</div>
                  </div>

                  {/* Table Rows */}
                  {subscribers.map((subscriber) => (
                    <div
                      key={subscriber.id}
                      className="grid grid-cols-12 gap-3 px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
                    >
                      {/* Email */}
                      <div className="col-span-5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[10px] font-black text-[#990202] flex-shrink-0">
                            {subscriber.email.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-[13px] font-bold text-gray-900 truncate">
                            {subscriber.email}
                          </span>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-1.5 text-[12px] text-gray-500">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span>
                            {new Date(subscriber.subscribedAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-2 flex justify-center">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold ${
                            subscriber.isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                              : "bg-gray-100 text-gray-500 border border-gray-200/60"
                          }`}
                        >
                          {subscriber.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex justify-end">
                        <SubscriberActions id={subscriber.id} isActive={subscriber.isActive} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: Broadcast Panel */}
            <div className="lg:col-span-5">
              {/* Send Broadcast */}
              <h2 className="text-[18px] font-extrabold text-gray-900 mb-5">
                Kirim Broadcast
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
                <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">
                  Pilih artikel untuk dikirim ke <strong className="text-gray-900">{activeCount} subscriber</strong> aktif:
                </p>

                {articles.length === 0 ? (
                  <p className="text-[13px] text-gray-400 italic">Belum ada artikel.</p>
                ) : (
                  <div className="space-y-3">
                    {articles.map((article) => {
                      const alreadySent = broadcastArticleIds.has(article.id);
                      return (
                        <div
                          key={article.id}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FAFAFA] border border-gray-100"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold bg-red-50 text-[#990202] border border-red-100/50">
                                {article.category}
                              </span>
                              {alreadySent && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/50">
                                  <CheckCircle2 className="w-2.5 h-2.5" />
                                  Terkirim {broadcastCountMap.get(article.id) || 0}x
                                </span>
                              )}
                            </div>
                            <p className="text-[13px] font-bold text-gray-900 line-clamp-1">
                              {article.title}
                            </p>
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(article.createdAt).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                          <BroadcastButton articleId={article.id} articleTitle={article.title} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Broadcast History */}
              <h2 className="text-[18px] font-extrabold text-gray-900 mb-5">
                Riwayat Broadcast
              </h2>
              {broadcasts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <p className="text-[13px] text-gray-400">Belum ada broadcast yang dikirim.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  {broadcasts.map((broadcast, idx) => (
                    <div
                      key={broadcast.id}
                      className={`flex items-center gap-3.5 px-5 py-3.5 ${
                        idx < broadcasts.length - 1 ? "border-b border-gray-50" : ""
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <Send className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-bold text-gray-900 line-clamp-1">
                          {broadcast.articleTitle}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {broadcast.totalSent} subscriber
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(broadcast.sentAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Email Delivery Logs */}
              <h2 className="text-[18px] font-extrabold text-gray-900 mt-8 mb-5">
                Log Pengiriman
              </h2>
              {emailLogs.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                  <p className="text-[13px] text-gray-400">Belum ada log pengiriman email.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-gray-50 border-b border-gray-100 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                    <div className="col-span-4">Email</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2 text-center">Sumber</div>
                    <div className="col-span-4">Tanggal</div>
                  </div>

                  {emailLogs.map((log, idx) => (
                    <div
                      key={log.id}
                      className={`px-5 py-3.5 ${
                        idx < emailLogs.length - 1 ? "border-b border-gray-50" : ""
                      } hover:bg-gray-50/50 transition-colors`}
                    >
                      <div className="grid grid-cols-12 gap-3 items-center">
                        {/* Email */}
                        <div className="col-span-4">
                          <span className="text-[13px] font-bold text-gray-900 truncate block">
                            {log.recipient}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <div className="col-span-2 flex justify-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold ${
                              log.status === "sent"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                : log.status === "simulated"
                                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                                : "bg-red-50 text-red-700 border border-red-200/60"
                            }`}
                          >
                            {log.status === "sent" ? (
                              <CheckCircle2 className="w-2.5 h-2.5" />
                            ) : log.status === "simulated" ? (
                              <AlertCircle className="w-2.5 h-2.5" />
                            ) : (
                              <XCircle className="w-2.5 h-2.5" />
                            )}
                            {log.status === "sent" ? "Terkirim" : log.status === "simulated" ? "Simulasi" : "Gagal"}
                          </span>
                        </div>

                        {/* Source */}
                        <div className="col-span-2 flex justify-center">
                          <span className="inline-flex px-2 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-600 border border-gray-200/60">
                            {log.source === "broadcast" ? "Manual" : "Otomatis"}
                          </span>
                        </div>

                        {/* Date */}
                        <div className="col-span-4">
                          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>
                              {new Date(log.sentAt).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Error message if failed */}
                      {log.status === "failed" && log.errorMessage && (
                        <div className="mt-2 ml-1 p-2 rounded-md bg-red-50 border border-red-100">
                          <p className="text-[11px] text-red-600 font-medium">
                            {log.errorMessage}
                          </p>
                        </div>
                      )}
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
