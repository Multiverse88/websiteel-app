import { prisma } from "@/lib/db";
import InformasiHukumSection, { ArticleItem } from "./InformasiHukumSection";

const CATEGORIES = [
  "Sertifikasi ISO",
  "Pendirian PT",
  "KBLI",
  "Perizinan",
  "Merek & HAKI",
];

export default async function InformasiHukumServer() {
  let articles: ArticleItem[] = [];

  try {
    const count = await prisma.article.count();
    if (count === 0) return null;

    articles = await prisma.article.findMany({
      where: {
        category: { in: CATEGORIES },
      },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImage: true,
        category: true,
        readTime: true,
        createdAt: true,
      },
    });
  } catch {
    return null;
  }

  if (articles.length === 0) return null;

  return <InformasiHukumSection articles={articles} />;
}
