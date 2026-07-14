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
        <h1 className="text-3xl font-bold text-white">Ringkasan Utama</h1>
        <p className="text-[#98989D] mt-1">Pantau statistik performa artikel, prospek, dan pemasaran EasyLegal secara langsung.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-[#1E1E1E] p-6 rounded-2xl shadow-sm border border-[#2C2C2E] flex items-start gap-4">
              <div className="p-3 bg-[#00E5FF]/10 text-[#00E5FF] rounded-xl">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-[#98989D]">{stat.name}</span>
                <span className="block text-2xl font-bold text-white mt-1 font-mono">{stat.value}</span>
                <span className="block text-xs text-[#98989D] mt-1">{stat.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Split Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Leads List */}
        <div className="lg:col-span-7 bg-[#1E1E1E] rounded-2xl shadow-sm border border-[#2C2C2E] overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-5 border-b border-[#2C2C2E] flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Prospek Terbaru (Leads)</h2>
              <Link href="/dashboard/landing-pages" className="text-xs font-bold text-[#00E5FF] hover:underline flex items-center gap-1">
                Kelola Landing Pages <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {latestLeads.length === 0 ? (
              <div className="p-8 text-center text-[#98989D] text-sm">
                Belum ada prospek yang masuk.
              </div>
            ) : (
              <div className="divide-y divide-[#2C2C2E]">
                {latestLeads.map((lead) => {
                  const date = new Date(lead.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit"
                  });
                  return (
                    <div key={lead.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#252525] transition-colors">
                      <div>
                        <div className="font-bold text-white text-sm">{lead.name || "Anonim"}</div>
                        <div className="text-xs text-[#98989D] mt-1 flex items-center gap-1.5">
                          <span>LP: {lead.landingPage.title}</span>
                          <span>&bull;</span>
                          <span className="font-mono">{date}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#32D74B] text-black rounded-xl text-xs font-bold hover:bg-[#28b83c] transition-colors"
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
        <div className="lg:col-span-5 bg-[#1E1E1E] rounded-2xl shadow-sm border border-[#2C2C2E] overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-5 border-b border-[#2C2C2E] flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Artikel Populer</h2>
              <Link href="/dashboard/artikel" className="text-xs font-bold text-[#00E5FF] hover:underline flex items-center gap-1">
                Kelola Artikel <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {popularArticles.length === 0 ? (
              <div className="p-8 text-center text-[#98989D] text-sm">
                Belum ada artikel terbit.
              </div>
            ) : (
              <div className="divide-y divide-[#2C2C2E]">
                {popularArticles.map((article, idx) => (
                  <div key={article.id} className="px-6 py-4 flex items-center gap-4 hover:bg-[#252525] transition-colors">
                    <span className="text-lg font-extrabold text-[#98989D] w-6 text-center font-mono">#{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm truncate">{article.title}</div>
                      <div className="text-xs text-[#98989D] mt-1 flex items-center gap-2">
                        <span className="px-1.5 py-0.5 bg-[#00E5FF]/10 text-[#00E5FF] rounded text-[10px] font-bold">{article.category}</span>
                        <span className="font-mono">{article.viewCount.toLocaleString("id-ID")} views</span>
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
