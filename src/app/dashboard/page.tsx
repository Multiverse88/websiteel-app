import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FileText, Eye, Users, BarChart2, FilePlus, Megaphone, Layers, ChevronRight, MessageCircle, Activity } from "lucide-react";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";
import DashboardCard from "@/components/dashboard/ui/DashboardCard";
import DashboardBadge from "@/components/dashboard/ui/DashboardBadge";
import { DashboardTable, DashboardTableHeader, DashboardTableHeaderCell, DashboardTableBody, DashboardTableRow, DashboardTableCell } from "@/components/dashboard/ui/DashboardTable";

export const dynamic = "force-dynamic";

export default async function DashboardOverviewPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!session.twoFactorEnabled) {
    redirect("/login/setup-2fa");
  }

  // Query stats
  const totalArticles = await prisma.article.count();
  const viewSum = await prisma.article.aggregate({ _sum: { viewCount: true } });
  const totalViews = viewSum._sum.viewCount || 0;
  const subscriberCount = await prisma.newsletterSubscriber.count({ where: { isActive: true } });
  const totalLeads = await prisma.landingPageLead.count();

  // Query latest leads
  const latestLeads = await prisma.landingPageLead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { landingPage: true }
  });

  // Query popular articles
  const popularArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { viewCount: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      viewCount: true,
      category: true,
    }
  });

  const stats = [
    { label: "Total Artikel", value: totalArticles, icon: FileText, color: "text-[#990202]", bg: "bg-red-50" },
    { label: "Total Views", value: totalViews, icon: Eye, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Subscriber Aktif", value: subscriberCount, icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { label: "Total Prospek", value: totalLeads, icon: BarChart2, color: "text-[#990202]", bg: "bg-red-50" },
  ];

  return (
    <div>
      <DashboardHeader
        title="Ringkasan Utama"
        description="Selamat datang kembali, Admin. Berikut adalah ringkasan performa platform hari ini."
      />
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <DashboardCard key={stat.label} hover className="p-6">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[13px] font-semibold text-gray-500">{stat.label}</p>
                <div className={`${stat.bg} p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString("id-ID")}</h3>
            </DashboardCard>
          ))}
        </div>

        {/* Quick Actions */}
        <DashboardCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link href="/dashboard/artikel/tambah" className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-[#990202] transition-colors group">
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-[#990202]">
                <FilePlus className="w-5 h-5" />
                <span className="text-[14px] font-medium">Buat Artikel Baru</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link href="/dashboard/newsletter" className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-[#990202] transition-colors group">
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-[#990202]">
                <Megaphone className="w-5 h-5" />
                <span className="text-[14px] font-medium">Kirim Newsletter</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link href="/dashboard/landing-pages" className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-[#990202] transition-colors group">
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-[#990202]">
                <Layers className="w-5 h-5" />
                <span className="text-[14px] font-medium">Kelola Landing Page</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </DashboardCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Activity */}
          <DashboardCard className="p-6 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-400" />
              Aktivitas Sistem
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-[13px] font-medium text-gray-900">Kesehatan Sistem</p>
                  <p className="text-[12px] text-green-600">Beroperasi Normal</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                    <div className="w-px h-full bg-gray-200 mt-1"></div>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-gray-900">Pembaruan Database Selesai</p>
                    <p className="text-[11px] text-gray-500">10:30 AM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                    <div className="w-px h-full bg-gray-200 mt-1"></div>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-gray-900">Database Backup Auto</p>
                    <p className="text-[11px] text-gray-500">09:15 AM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-gray-900">Sinkronisasi CDN</p>
                    <p className="text-[11px] text-gray-500">02:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>

          {/* Tables */}
          <div className="lg:col-span-2 space-y-6">
            {/* Latest Leads */}
            <DashboardCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Prospek Terbaru</h3>
              {latestLeads.length === 0 ? (
                <p className="text-[14px] text-gray-500 text-center py-8">Belum ada prospek yang masuk.</p>
              ) : (
                <DashboardTable>
                  <DashboardTableHeader>
                    <DashboardTableHeaderCell>Nama</DashboardTableHeaderCell>
                    <DashboardTableHeaderCell>Landing Page</DashboardTableHeaderCell>
                    <DashboardTableHeaderCell>Waktu</DashboardTableHeaderCell>
                    <DashboardTableHeaderCell className="text-right">Aksi</DashboardTableHeaderCell>
                  </DashboardTableHeader>
                  <DashboardTableBody>
                    {latestLeads.map((lead) => {
                      const date = new Date(lead.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                      });
                      return (
                        <DashboardTableRow key={lead.id}>
                          <DashboardTableCell className="font-medium">{lead.name || "Anonim"}</DashboardTableCell>
                          <DashboardTableCell className="text-gray-500">{lead.landingPage.title}</DashboardTableCell>
                          <DashboardTableCell className="text-gray-500">{date}</DashboardTableCell>
                          <DashboardTableCell className="text-right">
                            {lead.phone ? (
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#990202] border border-[#990202] rounded-lg text-[12px] font-semibold hover:bg-red-50 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" /> WA
                              </a>
                            ) : (
                              <span className="text-[12px] text-gray-400">No WA</span>
                            )}
                          </DashboardTableCell>
                        </DashboardTableRow>
                      );
                    })}
                  </DashboardTableBody>
                </DashboardTable>
              )}
            </DashboardCard>

            {/* Popular Articles */}
            <DashboardCard className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Artikel Populer</h3>
              {popularArticles.length === 0 ? (
                <p className="text-[14px] text-gray-500 text-center py-8">Belum ada artikel terbit.</p>
              ) : (
                <DashboardTable>
                  <DashboardTableHeader>
                    <DashboardTableHeaderCell className="w-12 text-center">#</DashboardTableHeaderCell>
                    <DashboardTableHeaderCell>Judul</DashboardTableHeaderCell>
                    <DashboardTableHeaderCell>Kategori</DashboardTableHeaderCell>
                    <DashboardTableHeaderCell className="text-right">Views</DashboardTableHeaderCell>
                  </DashboardTableHeader>
                  <DashboardTableBody>
                    {popularArticles.map((article, idx) => (
                      <DashboardTableRow key={article.id}>
                        <DashboardTableCell className="text-center font-bold text-[#990202]">{idx + 1}</DashboardTableCell>
                        <DashboardTableCell className="font-medium truncate max-w-[200px]">{article.title}</DashboardTableCell>
                        <DashboardTableCell>
                          <DashboardBadge variant="info">{article.category}</DashboardBadge>
                        </DashboardTableCell>
                        <DashboardTableCell className="text-right font-medium">{article.viewCount.toLocaleString("id-ID")}</DashboardTableCell>
                      </DashboardTableRow>
                    ))}
                  </DashboardTableBody>
                </DashboardTable>
              )}
            </DashboardCard>
          </div>
        </div>
      </div>
    </div>
  );
}
