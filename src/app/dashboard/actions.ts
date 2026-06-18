"use server";

import { deleteSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { unlink } from "fs/promises";
import path from "path";

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}

export async function deleteArticle(id: string) {
  // Check auth
  const { getSession } = await import("@/lib/auth");
  const currentSession = await getSession();
  if (!currentSession) {
    return { error: "Sesi tidak valid! Anda harus login terlebih dahulu." };
  }

  if (!id) {
    return { error: "ID artikel tidak valid!" };
  }

  try {
    // Get article data before deletion (for cleanup)
    const article = await prisma.article.findUnique({
      where: { id },
      select: { id: true, coverImage: true, slug: true },
    });

    if (!article) {
      return { error: "Artikel tidak ditemukan!" };
    }

    // Delete the article
    await prisma.article.delete({
      where: { id },
    });

    // Try to delete cover image file if it's a local file
    if (article.coverImage && article.coverImage.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", article.coverImage);
      try {
        await unlink(filePath);
      } catch {
        // Ignore error if file doesn't exist
      }
    }

    // Revalidate cache
    revalidatePath("/artikel");
    revalidatePath(`/artikel/${article.slug}`);
    revalidatePath("/dashboard");

    return { success: true };
  } catch (err: unknown) {
    console.error("Gagal menghapus artikel:", err);
    return { error: "Terjadi kesalahan saat menghapus artikel." };
  }
}
