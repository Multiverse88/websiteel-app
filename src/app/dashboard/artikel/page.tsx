import React from "react";
import Link from "next/link";
import { FileText, ExternalLink, Calendar, Clock, Eye, Pencil } from "lucide-react";
import { prisma } from "@/lib/db";
import ArticleImage from "../article-image";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeleteArticleButton from "../delete-article-button";

export const dynamic = "force-dynamic";

export default async function DashboardArticlesPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!session.twoFactorEnabled) {
    redirect("/login/setup-2fa");
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

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Artikel</h1>
          <p className="text-gray-500 mt-1">
            Total {articles.length} artikel terbit &middot; Kelola tulisan, edit isi, atau hapus artikel.
          </p>
        </div>
        <Link
          href="/dashboard/artikel/tambah"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[13px] rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <FileText className="w-4 h-4" />
          <span>Tulis Baru</span>
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Gambar</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Judul & Slug</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Kategori</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600 text-center">Views</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Tanggal</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600">Waktu Baca</th>
                <th className="py-4 px-6 font-semibold text-sm text-gray-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((article) => {
                const date = new Date(article.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                return (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <ArticleImage src={article.coverImage} alt={article.title} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900 line-clamp-1">{article.title}</div>
                      <div className="text-xs text-gray-500 mt-1 font-mono">/artikel/{article.slug}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-50 text-[#990202] border border-red-100/50">
                        {article.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center text-sm font-semibold text-gray-700">
                      <div className="flex items-center justify-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                        <span>{article.viewCount.toLocaleString("id-ID")}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{article.readTime}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1">
                      <Link
                        href={`/dashboard/artikel/${article.id}/edit`}
                        className="inline-flex p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit artikel"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/artikel/${article.slug}`}
                        target="_blank"
                        className="inline-flex p-2 text-gray-400 hover:text-[#990202] hover:bg-red-50 rounded-lg transition-colors"
                        title="Lihat artikel"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <DeleteArticleButton articleId={article.id} articleTitle={article.title} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
