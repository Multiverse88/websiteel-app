"use server";

import { prisma } from "@/lib/db";

export async function incrementView(slug: string) {
  try {
    await prisma.article.update({
      where: { slug },
      data: { viewCount: { increment: 1 } },
    });
  } catch {
    // Silently fail - don't break the page
  }
}
