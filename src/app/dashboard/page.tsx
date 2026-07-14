import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FileText, Eye, Mail, Layers, ArrowRight, Phone } from "lucide-react";

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
    { name: "Total Artikel", value: totalArticles, icon: FileText, desc: "Artikel terbit" },
    { name: "Total Views", value: totalViews.toLocaleString("id-ID"), icon: Eye, desc: "Pembaca artikel" },
    { name: "Subscriber Aktif", value: subscriberCount, icon: Mail, desc: "Newsletter subscriber" },
    { name: "Total Prospek (Leads)", value: totalLeads, icon: Layers, desc: "Dari Landing Pages" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Ringkasan Utama</h1>
        <p className="text-gray-500 mt-1">Pantau statistik performa artikel, prospek, dan pemasaran EasyLegal secara langsung.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-start gap-4">
              <div className="p-3 bg-red-50 text-[#990202] rounded-xl">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-gray-500">{stat.name}</span>
                <span className="block text-2xl font-bold text-gray-900 mt-1">{stat.value}</span>
                <span className="block text-xs text-gray-400 mt-1">{stat.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Split Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Leads List */}
        <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Prospek Terbaru (Leads)</h2>
              <Link href="/dashboard/landing-pages" className="text-xs font-bold text-[#990202] hover:underline flex items-center gap-1">
                Kelola Landing Pages <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {latestLeads.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                Belum ada prospek yang masuk.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {latestLeads.map((lead) => {
                  const date = new Date(lead.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit"
                  });
                  return (
                    <div key={lead.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div>
                        <div className="font-bold text-gray-950 text-sm">{lead.name || "Anonim"}</div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                          <span>LP: {lead.landingPage.title}</span>
                          <span>&bull;</span>
                          <span>{date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:bg-[#1ea760] transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Popular Articles */}
        <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Artikel Populer</h2>
              <Link href="/dashboard/artikel" className="text-xs font-bold text-[#990202] hover:underline flex items-center gap-1">
                Kelola Artikel <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {popularArticles.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">
                Belum ada artikel terbit.
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {popularArticles.map((article, idx) => (
                  <div key={article.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <span className="text-lg font-extrabold text-gray-300 w-6 text-center">#{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-950 text-sm truncate">{article.title}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-red-50 text-[#990202] rounded text-[10px] font-bold">{article.category}</span>
                        <span>{article.viewCount.toLocaleString("id-ID")} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
