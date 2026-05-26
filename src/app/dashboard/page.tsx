import React from "react";
import Link from "next/link";
import { FileText, ArrowRight, LogOut, ExternalLink, Calendar, Clock, Eye, Mail, User } from "lucide-react";
import { prisma } from "@/lib/db";
import { logoutAction } from "./actions";
import ArticleImage from "./article-image";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      coverImage: true,
      readTime: true,
      viewCount: true,
      createdAt: true,
    },
  });

  const totalArticles = articles.length;
  const totalViews = articles.reduce((sum, a) => sum + a.viewCount, 0);
  const subscriberCount = await prisma.newsletterSubscriber.count({ where: { isActive: true } });

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 flex items-center justify-between">
          <div>
            <h1 className="font-inter text-[34px] sm:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Dashboard
            </h1>
            <p className="text-[14px] text-gray-500 mt-1">
              {totalArticles} artikel terbit &middot; {totalViews.toLocaleString("id-ID")} total views
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:text-[#990202] border border-gray-200 hover:border-red-200 rounded-xl transition-all bg-white hover:bg-red-50"
            >
              <User className="w-4 h-4 text-gray-500" />
              <span>Edit Profil</span>
            </Link>
            <Link
              href="/dashboard/newsletter"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:text-[#990202] border border-gray-200 hover:border-red-200 rounded-xl transition-all bg-white hover:bg-red-50"
            >
              <Mail className="w-4 h-4" />
              <span>Newsletter</span>
              {subscriberCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 bg-[#990202] text-white text-[10px] font-bold rounded-md">
                  {subscriberCount}
                </span>
              )}
            </Link>
            <Link
              href="/dashboard/artikel/tambah"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[13px] rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Tulis Baru</span>
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-gray-500 hover:text-[#990202] border border-gray-200 hover:border-red-200 rounded-xl transition-all bg-white hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ARTICLES LIST */}
      <section className="py-10 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[18px] font-extrabold text-gray-900">
              Semua Artikel
            </h2>
          </div>

          {articles.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#990202]" />
              </div>
              <h3 className="text-[18px] font-extrabold text-gray-900 mb-2">
                Belum ada artikel
              </h3>
              <p className="text-[14px] text-gray-500 mb-6">
                Mulai tulis artikel pertama untuk klien EasyLegal.
              </p>
              <Link
                href="/dashboard/artikel/tambah"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[14px] rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Tulis Artikel Pertama</span>
              </Link>
            </div>
          ) : (
            /* Articles Table */
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-[12px] font-extrabold text-gray-400 uppercase tracking-wider">
                <div className="col-span-1">Gambar</div>
                <div className="col-span-4">Judul</div>
                <div className="col-span-2">Kategori</div>
                <div className="col-span-1 text-center">Views</div>
                <div className="col-span-2">Tanggal</div>
                <div className="col-span-1">Waktu</div>
                <div className="col-span-1 text-right">Aksi</div>
              </div>

              {/* Table Rows */}
              {articles.map((article) => {
                const date = new Date(article.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

                return (
                  <div
                    key={article.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors items-center"
                  >
                    {/* Cover Image */}
                    <div className="col-span-1">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <ArticleImage
                          src={article.coverImage}
                          alt={article.title}
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="col-span-4">
                      <p className="text-[14px] font-bold text-gray-900 line-clamp-1">
                        {article.title}
                      </p>
                      <p className="text-[12px] text-gray-400 font-mono mt-0.5">
                        /artikel/{article.slug}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="col-span-2">
                      <span className="inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-50 text-[#990202] border border-red-100/50">
                        {article.category}
                      </span>
                    </div>

                    {/* Views */}
                    <div className="col-span-1">
                      <div className="flex items-center justify-center gap-1.5 text-[13px] font-bold text-gray-700">
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                        <span>{article.viewCount.toLocaleString("id-ID")}</span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{date}</span>
                      </div>
                    </div>

                    {/* Read Time */}
                    <div className="col-span-1">
                      <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="col-span-1 flex justify-end">
                      <Link
                        href={`/artikel/${article.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-[#990202] hover:bg-red-50 rounded-lg transition-colors"
                        title="Lihat artikel"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
