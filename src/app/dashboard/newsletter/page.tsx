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

const SUB_PER_PAGE = 10;
const LOG_PER_PAGE = 15;

export default async function NewsletterDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ subPage?: string; logPage?: string }>;
}) {
  const params = await searchParams;
  const subPage = Math.max(1, parseInt(params.subPage || "1", 10));
  const logPage = Math.max(1, parseInt(params.logPage || "1", 10));

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Fetch subscribers with pagination
  const [subscribers, totalSubscribers] = await Promise.all([
    prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: "desc" },
      skip: (subPage - 1) * SUB_PER_PAGE,
      take: SUB_PER_PAGE,
      select: { id: true, email: true, isActive: true, subscribedAt: true }
    }),
    prisma.newsletterSubscriber.count(),
  ]);
  const totalSubPages = Math.max(1, Math.ceil(totalSubscribers / SUB_PER_PAGE));

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

  // Fetch email logs with pagination
  const [emailLogs, totalLogs] = await Promise.all([
    prisma.emailLog.findMany({
      orderBy: { sentAt: "desc" },
      skip: (logPage - 1) * LOG_PER_PAGE,
      take: LOG_PER_PAGE,
      select: {
        id: true,
        recipient: true,
        subject: true,
        status: true,
        errorMessage: true,
        source: true,
        sentAt: true,
      },
    }),
    prisma.emailLog.count(),
  ]);
  const totalLogPages = Math.max(1, Math.ceil(totalLogs / LOG_PER_PAGE));

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
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        {/* Stats Cards - Bento Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <DashboardCard key={stat.label} hover className="p-5 flex items-center gap-4">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 leading-none">{stat.value.toLocaleString("id-ID")}</div>
                <div className="text-[13px] text-gray-500 mt-1 font-medium">{stat.label}</div>
              </div>
            </DashboardCard>
          ))}
        </div>

        {/* Subscriber List - Full Width */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-gray-900">Daftar Subscriber</h2>
            <span className="text-[12px] text-gray-500">
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
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-bold text-gray-700 flex-shrink-0">
                      {subscriber.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[13px] font-medium text-gray-900 truncate block">
                        {subscriber.email}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-0.5">
                        <Calendar className="w-3 h-3" />
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
              {totalSubPages > 1 && (
                <PaginationControls currentPage={subPage} totalPages={totalSubPages} paramKey="subPage" />
              )}
            </DashboardCard>
          )}
        </div>

        {/* Broadcast + Riwayat - 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kirim Broadcast */}
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">Kirim Broadcast</h2>
            <DashboardCard className="p-5">
              <p className="text-[13px] text-gray-500 mb-3">
                Kirim ke <strong className="text-gray-900">{activeCount} subscriber</strong> aktif:
              </p>

              {articles.length === 0 ? (
                <p className="text-[13px] text-gray-500 italic">Belum ada artikel.</p>
              ) : (
                <div className="space-y-2">
                  {articles.map((article: { id: string; title: string; slug: string; category: string; createdAt: Date }) => {
                    const alreadySent = broadcastArticleIds.has(article.id);
                    return (
                      <div
                        key={article.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-white transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <DashboardBadge variant="neutral">{article.category}</DashboardBadge>
                            {alreadySent && (
                              <DashboardBadge variant="success">
                                <CheckCircle2 className="w-3 h-3 mr-0.5" />
                                {broadcastCountMap.get(article.id) || 0}x
                              </DashboardBadge>
                            )}
                          </div>
                          <p className="text-[13px] font-medium text-gray-900 line-clamp-1">
                            {article.title}
                          </p>
                        </div>
                        <BroadcastButton articleId={article.id} articleTitle={article.title} />
                      </div>
                    );
                  })}
                </div>
              )}
            </DashboardCard>
          </div>

          {/* Riwayat Broadcast */}
          <div>
            <h2 className="text-[15px] font-semibold text-gray-900 mb-3">Riwayat Broadcast</h2>
            {broadcasts.length === 0 ? (
              <DashboardCard className="p-8 text-center">
                <p className="text-[13px] text-gray-500">Belum ada broadcast yang dikirim.</p>
              </DashboardCard>
            ) : (
              <DashboardCard className="overflow-hidden">
                <div className="divide-y divide-gray-100 max-h-[320px] overflow-y-auto">
                  {broadcasts.map((broadcast: { id: string; articleId: string; articleTitle: string; totalSent: number; sentAt: Date }) => (
                    <div key={broadcast.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <Send className="w-4 h-4 text-[#990202]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-gray-900 line-clamp-1">
                          {broadcast.articleTitle}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-gray-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {broadcast.totalSent}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(broadcast.sentAt).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
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
        </div>

        {/* Log Pengiriman - Full Width Bottom */}
        <div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-3">Log Pengiriman</h2>
          {emailLogs.length === 0 ? (
            <DashboardCard className="p-8 text-center">
              <p className="text-[13px] text-gray-500">Belum ada log pengiriman email.</p>
            </DashboardCard>
          ) : (
            <DashboardCard className="overflow-hidden">
              <div className="divide-y divide-gray-100">
                {emailLogs.map((log: { id: string; recipient: string; subject: string; status: string; errorMessage: string | null; source: string; sentAt: Date }) => (
                  <div key={log.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                    <span className="text-[13px] font-medium text-gray-900 truncate flex-1">
                      {log.recipient}
                    </span>
                    <DashboardBadge variant="neutral">
                      {log.source === "broadcast" ? "Manual" : "Otomatis"}
                    </DashboardBadge>
                    <DashboardBadge variant={
                      log.status === "sent" ? "success" :
                      log.status === "simulated" ? "warning" : "error"
                    }>
                      {log.status === "sent" ? "Terkirim" : log.status === "simulated" ? "Simulasi" : "Gagal"}
                    </DashboardBadge>
                    <span className="flex items-center gap-1 text-[11px] text-gray-500 whitespace-nowrap">
                      <Clock className="w-3 h-3" />
                      {new Date(log.sentAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
              {totalLogPages > 1 && (
                <PaginationControls currentPage={logPage} totalPages={totalLogPages} paramKey="logPage" />
              )}
            </DashboardCard>
          )}
        </div>
      </div>
    </div>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  paramKey,
}: {
  currentPage: number;
  totalPages: number;
  paramKey: string;
}) {
  const buildHref = (page: number) => {
    const sp = new URLSearchParams();
    sp.set(paramKey, String(page));
    return `?${sp.toString()}`;
  };

  const pages: (number | "...")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
      <span className="text-[12px] text-gray-500">
        Halaman {currentPage} dari {totalPages}
      </span>
      <div className="flex items-center gap-1">
        {currentPage > 1 && (
          <Link
            href={buildHref(currentPage - 1)}
            className="px-3 py-1.5 text-[12px] font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Prev
          </Link>
        )}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e${i}`} className="px-2 text-[12px] text-gray-400">…</span>
          ) : (
            <Link
              key={p}
              href={buildHref(p)}
              className={`px-3 py-1.5 text-[12px] font-medium rounded-lg transition-colors ${
                p === currentPage
                  ? "bg-[#990202] text-white"
                  : "text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {p}
            </Link>
          )
        )}
        {currentPage < totalPages && (
          <Link
            href={buildHref(currentPage + 1)}
            className="px-3 py-1.5 text-[12px] font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
