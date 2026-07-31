import React from "react";
import Link from "next/link";
import { FileText, ExternalLink, Calendar, Clock, Eye, Pencil, Activity } from "lucide-react";
import { prisma } from "@/lib/db";
import ArticleImage from "../article-image";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DeleteArticleButton from "../delete-article-button";
import { ArticleControls } from "./article-controls";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";
import DashboardCard from "@/components/dashboard/ui/DashboardCard";
import DashboardButton from "@/components/dashboard/ui/DashboardButton";
import DashboardBadge from "@/components/dashboard/ui/DashboardBadge";
import DashboardEmpty from "@/components/dashboard/ui/DashboardEmpty";
import { DashboardTable, DashboardTableHeader, DashboardTableHeaderCell, DashboardTableBody, DashboardTableRow, DashboardTableCell } from "@/components/dashboard/ui/DashboardTable";

export const dynamic = "force-dynamic";

export default async function DashboardArticlesPage(
  props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const searchParams = await props.searchParams;
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!session.twoFactorEnabled) {
    redirect("/login/setup-2fa");
  }

  const limit = typeof searchParams.limit === "string" ? parseInt(searchParams.limit) : 10;
  const page = typeof searchParams.page === "string" ? Math.max(1, parseInt(searchParams.page)) : 1;
  const sort = typeof searchParams.sort === "string" ? searchParams.sort : "newest";
  
  const take = [10, 20, 40].includes(limit) ? limit : 10;
  const skip = (page - 1) * take;

  let orderBy: any = { createdAt: "desc" };
  if (sort === "oldest") orderBy = { createdAt: "asc" };
  else if (sort === "most_viewed") orderBy = { viewCount: "desc" };
  else if (sort === "least_viewed") orderBy = { viewCount: "asc" };

  const totalArticles = await prisma.article.count();

  const articles = await prisma.article.findMany({
    orderBy,
    take,
    skip,
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      coverImage: true,
      readTime: true,
      viewCount: true,
      createdAt: true,
      excerpt: true,
      content: true,
    },
  });

  const calculateSimpleSEOScore = (article: any) => {
    let score = 0;
    let totalChecks = 5;

    const contentText = article.content.toLowerCase();
    
    if (contentText.split(/\s+/).filter((w: string) => w.length > 0).length >= 300) score++;
    if (article.title.length >= 30 && article.title.length <= 60) score++;
    if (article.excerpt.length >= 120 && article.excerpt.length <= 160) score++;
    if (article.content.includes("### ") || article.content.includes("<h3")) score++;
    if (
      article.content.includes("![") || 
      article.content.includes("<img ") || 
      article.content.includes("](") || 
      article.content.includes("<a ") ||
      article.coverImage
    ) score++;

    const percentage = Math.round((score / totalChecks) * 100);
    
    let variant: "success" | "warning" | "error" = "error";
    if (percentage >= 80) variant = "success";
    else if (percentage >= 50) variant = "warning";

    return { percentage, variant };
  };

  return (
    <div>
      <DashboardHeader
        title="Kelola Artikel"
        description={`Total ${totalArticles} artikel terbit · Kelola tulisan, edit isi, atau hapus artikel.`}
        action={
          <Link href="/dashboard/artikel/tambah">
            <DashboardButton icon={FileText}>Tulis Baru</DashboardButton>
          </Link>
        }
      />
      <div className="p-8 max-w-6xl mx-auto">
        {totalArticles === 0 ? (
          <DashboardCard className="p-12">
            <DashboardEmpty
              icon={FileText}
              title="Belum ada artikel"
              description="Mulai tulis artikel pertama untuk klien EasyLegal."
              action={
                <Link href="/dashboard/artikel/tambah">
                  <DashboardButton icon={FileText}>Tulis Artikel Pertama</DashboardButton>
                </Link>
              }
            />
          </DashboardCard>
        ) : (
          <DashboardCard className="overflow-hidden">
            <ArticleControls totalItems={totalArticles} currentPage={page} pageSize={take} />
            <div className="overflow-x-auto">
              <DashboardTable>
                <DashboardTableHeader>
                  <DashboardTableHeaderCell className="w-16">Gambar</DashboardTableHeaderCell>
                  <DashboardTableHeaderCell>Judul & Slug</DashboardTableHeaderCell>
                  <DashboardTableHeaderCell className="text-center">SEO</DashboardTableHeaderCell>
                  <DashboardTableHeaderCell>Kategori</DashboardTableHeaderCell>
                  <DashboardTableHeaderCell className="text-center">Views</DashboardTableHeaderCell>
                  <DashboardTableHeaderCell>Tanggal</DashboardTableHeaderCell>
                  <DashboardTableHeaderCell>Waktu Baca</DashboardTableHeaderCell>
                  <DashboardTableHeaderCell className="text-right">Aksi</DashboardTableHeaderCell>
                </DashboardTableHeader>
                <DashboardTableBody>
                  {articles.map((article) => {
                    const date = new Date(article.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                    const seoInfo = calculateSimpleSEOScore(article);
                    return (
                      <DashboardTableRow key={article.id}>
                        <DashboardTableCell>
                          <div className="relative w-12 h-10 rounded overflow-hidden bg-gray-50 border border-gray-100">
                            <ArticleImage src={article.coverImage} alt={article.title} />
                          </div>
                        </DashboardTableCell>
                        <DashboardTableCell>
                          <div className="font-semibold text-[14px] text-gray-900 line-clamp-1">{article.title}</div>
                          <div className="text-[12px] text-gray-500 mt-0.5 font-mono">/artikel/{article.slug}</div>
                        </DashboardTableCell>
                        <DashboardTableCell className="text-center">
                          <DashboardBadge variant={seoInfo.variant}>
                            <Activity className="w-3 h-3 mr-1" />
                            {seoInfo.percentage}%
                          </DashboardBadge>
                        </DashboardTableCell>
                        <DashboardTableCell>
                          <DashboardBadge variant="neutral">{article.category}</DashboardBadge>
                        </DashboardTableCell>
                        <DashboardTableCell className="text-center">
                          <span className="inline-flex items-center gap-1 text-[13px] font-medium text-gray-700">
                            <Eye className="w-3.5 h-3.5 text-gray-400" />
                            {article.viewCount.toLocaleString("id-ID")}
                          </span>
                        </DashboardTableCell>
                        <DashboardTableCell className="text-[13px] text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{date}</span>
                          </div>
                        </DashboardTableCell>
                        <DashboardTableCell className="text-[13px] text-gray-500">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{article.readTime}</span>
                          </div>
                        </DashboardTableCell>
                        <DashboardTableCell className="text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/dashboard/artikel/${article.id}/edit`}
                              className="p-2 text-gray-400 hover:text-[#990202] hover:bg-red-50 rounded-lg transition-colors"
                              title="Edit artikel"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/artikel/${article.slug}`}
                              target="_blank"
                              className="p-2 text-gray-400 hover:text-[#990202] hover:bg-red-50 rounded-lg transition-colors"
                              title="Lihat artikel"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <DeleteArticleButton articleId={article.id} articleTitle={article.title} />
                          </div>
                        </DashboardTableCell>
                      </DashboardTableRow>
                    );
                  })}
                </DashboardTableBody>
              </DashboardTable>
            </div>
          </DashboardCard>
        )}
      </div>
    </div>
  );
}
