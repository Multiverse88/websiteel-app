import { prisma } from "@/lib/db";
import type { ArticleItem } from "./InformasiHukumSection";

export async function LatestInsightsServer(): Promise<ArticleItem[]> {
  try {
    const count = await prisma.article.count();
    if (count > 0) {
      return prisma.article.findMany({
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
  return [];
}