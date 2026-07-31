import React from "react";
import Link from "next/link";
import { Mail, Users, Send, Calendar, Clock, CheckCircle2, Settings, AlertCircle, XCircle } from "lucide-react";
import { prisma } from "@/lib/db";
import { BroadcastButton, SubscriberActions } from "./client-components";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";
import DashboardCard from "@/components/dashboard/ui/DashboardCard";
import DashboardButton from "@/components/dashboard/ui/DashboardButton";
import DashboardBadge from "@/components/dashboard/ui/DashboardBadge";
import DashboardEmpty from "@/components/dashboard/ui/DashboardEmpty";

export const dynamic = "force-dynamic";

export default async function NewsletterDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Fetch all subscribers
  const subscribers = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: "desc" },
    select: { id: true, email: true, isActive: true, subscribedAt: true }
  });

  // Fetch broadcast history
  const broadcasts = await prisma.newsletterBroadcast.findMany({
    orderBy: { sentAt: "desc" },
    take: 10,
    select: { id: true, articleId: true, articleTitle: true, totalSent: true, sentAt: true }
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
  const broadcastArticleIds = new Set(broadcasts.map((b: { articleId: string }) => b.articleId));
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

  const activeCount = subscribers.filter((s: { isActive: boolean }) => s.isActive).length;
  const inactiveCount = subscribers.length - activeCount;

  const stats = [
    { label: "Subscriber Aktif", value: activeCount, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Subscriber", value: subscribers.length, icon: Mail, color: "text-[#990202]", bg: "bg-red-50" },
    { label: "Broadcast Terkirim", value: broadcasts.length, icon: Send, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div>
      <DashboardHeader
        title="Newsletter"
        description="Kelola subscriber dan kirim broadcast artikel terbaru."
        action={
          <Link href="/dashboard/newsletter/settings">
            <DashboardButton variant="secondary" icon={Settings}>Atur Otomatisasi</DashboardButton>
          </Link>
        }
      />
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <DashboardCard key={stat.label} hover className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 leading-none">{stat.value.toLocaleString("id-ID")}</div>
                <div className="text-[13px] text-gray-500 mt-1.5 font-medium">{stat.label}</div>
              </div>
            </DashboardCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Subscribers List */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Daftar Subscriber</h2>
              <span className="text-[13px] text-gray-500">
                {activeCount} aktif · {inactiveCount} nonaktif
              </span>
            </div>

            {subscribers.length === 0 ? (
              <DashboardCard className="p-12">
                <DashboardEmpty
                  icon={Mail}
                  title="Belum ada subscriber"
                  description="Subscriber akan muncul di sini ketika pengunjung mendaftar newsletter."
                />
              </DashboardCard>
            ) : (
              <DashboardCard className="overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {subscribers.map((subscriber: { id: string; email: string; isActive: boolean; subscribedAt: Date }) => (
                    <div
                      key={subscriber.id}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[13px] font-bold text-gray-700 flex-shrink-0">
                        {subscriber.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[14px] font-medium text-gray-900 truncate block">
                          {subscriber.email}
                        </span>
                        <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-0.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(subscriber.subscribedAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <DashboardBadge variant={subscriber.isActive ? "success" : "neutral"}>
                        {subscriber.isActive ? "Aktif" : "Nonaktif"}
                      </DashboardBadge>
                      <SubscriberActions id={subscriber.id} isActive={subscriber.isActive} />
                    </div>
                  ))}
                </div>
              </DashboardCard>
            )}
          </div>

          {/* RIGHT: Broadcast Panel */}
          <div className="lg:col-span-5 space-y-8">
            {/* Send Broadcast */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Kirim Broadcast</h2>
              <DashboardCard className="p-6">
                <p className="text-[14px] text-gray-500 mb-4">
                  Pilih artikel untuk dikirim ke <strong className="text-gray-900">{activeCount} subscriber</strong> aktif:
                </p>

                {articles.length === 0 ? (
                  <p className="text-[14px] text-gray-500 italic">Belum ada artikel.</p>
                ) : (
                  <div className="space-y-3">
                    {articles.map((article: { id: string; title: string; slug: string; category: string; createdAt: Date }) => {
                      const alreadySent = broadcastArticleIds.has(article.id);
                      return (
                        <div
                          key={article.id}
                          className="flex items-center justify-between gap-3 p-4 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                              <DashboardBadge variant="neutral">{article.category}</DashboardBadge>
                              {alreadySent && (
                                <DashboardBadge variant="success">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Terkirim {broadcastCountMap.get(article.id) || 0}x
                                </DashboardBadge>
                              )}
                            </div>
                            <p className="text-[14px] font-medium text-gray-900 line-clamp-1">
                              {article.title}
                            </p>
                            <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-1">
                              <Calendar className="w-3.5 h-3.5" />
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
              </DashboardCard>
            </div>

            {/* Broadcast History */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Riwayat Broadcast</h2>
              {broadcasts.length === 0 ? (
                <DashboardCard className="p-8 text-center">
                  <p className="text-[14px] text-gray-500">Belum ada broadcast yang dikirim.</p>
                </DashboardCard>
              ) : (
                <DashboardCard className="overflow-hidden">
                  <div className="divide-y divide-gray-100">
                    {broadcasts.map((broadcast: { id: string; articleId: string; articleTitle: string; totalSent: number; sentAt: Date }) => (
                      <div key={broadcast.id} className="flex items-center gap-4 px-5 py-4">
                        <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                          <Send className="w-5 h-5 text-[#990202]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-medium text-gray-900 line-clamp-1">
                            {broadcast.articleTitle}
                          </p>
                          <div className="flex items-center gap-4 text-[12px] text-gray-500 mt-1">
                            <span className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" />
                              {broadcast.totalSent} subscriber
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
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
                </DashboardCard>
              )}
            </div>

            {/* Email Delivery Logs */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Log Pengiriman</h2>
              {emailLogs.length === 0 ? (
                <DashboardCard className="p-8 text-center">
                  <p className="text-[14px] text-gray-500">Belum ada log pengiriman email.</p>
                </DashboardCard>
              ) : (
                <DashboardCard className="overflow-hidden">
                  <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                    {emailLogs.map((log: { id: string; recipient: string; subject: string; status: string; errorMessage: string | null; source: string; sentAt: Date }) => (
                      <div key={log.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[13px] font-medium text-gray-900 truncate flex-1">
                            {log.recipient}
                          </span>
                          <DashboardBadge variant={
                            log.status === "sent" ? "success" :
                            log.status === "simulated" ? "warning" : "error"
                          }>
                            {log.status === "sent" ? "Terkirim" : log.status === "simulated" ? "Simulasi" : "Gagal"}
                          </DashboardBadge>
                        </div>
                        <div className="flex items-center gap-4 mt-1.5">
                          <DashboardBadge variant="neutral">
                            {log.source === "broadcast" ? "Manual" : "Otomatis"}
                          </DashboardBadge>
                          <span className="flex items-center gap-1.5 text-[11px] text-gray-500">
                            <Clock className="w-3 h-3" />
                            {new Date(log.sentAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        {log.status === "failed" && log.errorMessage && (
                          <div className="mt-2 p-2 rounded-lg bg-red-50 border border-red-100">
                            <p className="text-[12px] text-red-600">{log.errorMessage}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </DashboardCard>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
