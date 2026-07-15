import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Bell, FileText, Eye, Users, BarChart2, Zap, FilePlus, Megaphone, Layers, ChevronRight, MessageCircle } from "lucide-react";

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

  return (
    <div className="space-y-8">
      {/* TopAppBar */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Ringkasan Utama</h2>
          <p className="text-gray-500 mt-1">Selamat datang kembali, Admin. Berikut adalah ringkasan performa platform hari ini.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#d62828] transition-colors border border-gray-200">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-TtWwSM3ypFYB-pyGBxbpK8GUu_WqOga_4fF9moYnOI3DV8b2IpB4co0cRh3pSDuMXzATiJZEFve3wdZxQuCOHaaD7id8te3Hnew8_birP8sBg3x2k_XqPA7AggLOzA9zsbMrAqHO95UcHA8v7Dea8Z4CpanyJZmsq8xWzejYzH6_ljwT9Sz7RU7_6JM3lAbR6rDzEnOmOMF3DwRjYQAqHTpC2NLOa3b3XBdFf-gnj7k-HV0ECAwt" alt="Admin" />
          </div>
        </div>
      </header>

      {/* Top Section: KPIs & Quick Actions */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left: 2x2 KPI Grid (Span 2 cols) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-semibold text-gray-500">Total Artikel</p>
              <div className="bg-red-50 p-2 rounded-lg text-[#d62828]"><FileText className="w-5 h-5" /></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{totalArticles}</h3>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-semibold text-gray-500">Total Views</p>
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Eye className="w-5 h-5" /></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString("id-ID")}</h3>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-semibold text-gray-500">Subscriber Aktif</p>
              <div className="bg-green-50 p-2 rounded-lg text-[#25D366]"><Users className="w-5 h-5" /></div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{subscriberCount}</h3>
          </div>
          {/* Card 4 (Highlighted/Urgent) */}
          <div className="bg-red-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-red-200">
            <div className="flex justify-between items-start mb-4">
              <p className="text-sm font-bold text-[#d62828]">Total Prospek</p>
              <div className="bg-white p-2 rounded-lg text-[#d62828] shadow-sm"><BarChart2 className="w-5 h-5" /></div>
            </div>
            <h3 className="text-3xl font-bold text-[#d62828]">{totalLeads}</h3>
          </div>
        </div>

        {/* Right: Quick Actions (Span 1 col) */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col h-full border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Aksi Cepat</h3>
            <Zap className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <Link href="/dashboard/artikel/tambah" className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group">
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-[#d62828] transition-colors">
                <FilePlus className="w-5 h-5" />
                <span className="text-sm font-bold">Buat Artikel Baru</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link href="/dashboard/newsletter" className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group">
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-[#d62828] transition-colors">
                <Megaphone className="w-5 h-5" />
                <span className="text-sm font-bold">Kirim Newsletter</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
            <Link href="/dashboard/landing-pages" className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group">
              <div className="flex items-center gap-3 text-gray-700 group-hover:text-[#d62828] transition-colors">
                <Layers className="w-5 h-5" />
                <span className="text-sm font-bold">Kelola Landing Page</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Section: Multi-Column Dashboard Feel */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Platform Health / System Activity (Span 1) */}
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col lg:col-span-1 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Aktivitas Sistem</h3>
          <div className="flex-1 flex flex-col gap-6">
            {/* Mock Chart Area */}
            <div className="w-full h-48 bg-white rounded-lg border border-gray-200 flex items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex items-end">
                <svg className="w-full h-full text-[#d62828]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0 100 L 0 80 Q 25 60 50 70 T 100 30 L 100 100 Z" fill="currentColor"></path>
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <p className="text-xl font-bold text-[#d62828]">Kesehatan Sistem</p>
                <p className="text-sm text-gray-500 mt-1">Beroperasi Normal</p>
              </div>
            </div>
            {/* Activity Timeline */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#25D366] mt-2"></div>
                  <div className="w-px h-full bg-gray-200 mt-1"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Pembaruan Database Selesai</p>
                  <p className="text-[14px] text-gray-500 mt-0.5">10:30 AM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-[#d62828] mt-2"></div>
                  <div className="w-px h-full bg-gray-200 mt-1"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Database Backup Auto</p>
                  <p className="text-[14px] text-gray-500 mt-0.5">09:15 AM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Sinkronisasi CDN</p>
                  <p className="text-[14px] text-gray-500 mt-0.5">02:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stacked Tables (Span 2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Table 1: Prospek Terbaru */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Prospek Terbaru</h3>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-[14px] font-semibold text-gray-500 uppercase">
                    <th className="py-3 px-2">Nama</th>
                    <th className="py-3 px-2">Landing Page</th>
                    <th className="py-3 px-2">Waktu</th>
                    <th className="py-3 px-2 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {latestLeads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">Belum ada prospek yang masuk.</td>
                    </tr>
                  ) : (
                    latestLeads.map((lead) => {
                      const date = new Date(lead.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                      });
                      return (
                        <tr key={lead.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-2 font-medium text-gray-900">{lead.name || "Anonim"}</td>
                          <td className="py-4 px-2 text-gray-700">{lead.landingPage.title}</td>
                          <td className="py-4 px-2 text-gray-500">{date}</td>
                          <td className="py-4 px-2 text-right">
                            {lead.phone ? (
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-[14px] font-bold hover:bg-[#1ea760] transition-colors shadow-sm"
                              >
                                <MessageCircle className="w-4 h-4" /> WA
                              </a>
                            ) : (
                              <span className="text-[14px] text-gray-400">No WA</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table 2: Artikel Populer */}
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Artikel Populer</h3>
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-[14px] font-semibold text-gray-500 uppercase">
                    <th className="py-3 px-2 w-12 text-center">Rank</th>
                    <th className="py-3 px-2">Judul</th>
                    <th className="py-3 px-2">Kategori</th>
                    <th className="py-3 px-2 text-right">Views</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {popularArticles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">Belum ada artikel terbit.</td>
                    </tr>
                  ) : (
                    popularArticles.map((article, idx) => (
                      <tr key={article.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-2 text-center font-bold text-[#d62828]">{idx + 1}</td>
                        <td className="py-4 px-2 font-medium text-gray-900 truncate max-w-[200px]">{article.title}</td>
                        <td className="py-4 px-2">
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-[14px] font-bold tracking-wider uppercase">
                            {article.category}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right font-medium">{article.viewCount.toLocaleString("id-ID")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
