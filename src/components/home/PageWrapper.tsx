import { prisma } from "@/lib/db";
import HomePage from "./HomePage";
import type { ArticleItem } from "./InformasiHukumSection";

export default async function PageWrapper() {
  let articles: ArticleItem[] = [];

  try {
    const count = await prisma.article.count();
    if (count > 0) {
      articles = await prisma.article.findMany({
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
    }
  } catch {
    // silently fail — section will show no articles
  }

  return <HomePage articles={articles} />;
}
