"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function getArticle(id: string) {
  const session = await getSession();
  if (!session) {
    return null;
  }

  const article = await prisma.article.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      readTime: true,
      coverImage: true,
      excerpt: true,
      content: true,
    },
  });

  return article;
}

export async function updateArticle(prevState: Record<string, unknown> | null, formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "Sesi tidak valid! Anda harus login terlebih dahulu." };
  }

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const readTime = formData.get("readTime") as string;
  const coverImageFile = formData.get("coverImageFile") as File | null;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const existingCoverImage = formData.get("existingCoverImage") as string;

  // Validation
  if (!id || !title || !category || !readTime || !excerpt || !content) {
    return { error: "Semua field wajib diisi!" };
  }

  // Check if article exists
  const existingArticle = await prisma.article.findUnique({
    where: { id },
    select: { id: true, coverImage: true, slug: true },
  });

  if (!existingArticle) {
    return { error: "Artikel tidak ditemukan!" };
  }

  let coverImage = existingCoverImage || existingArticle.coverImage;

  // Handle file upload
  if (coverImageFile && coverImageFile.size > 0) {
    if (!ALLOWED_TYPES.includes(coverImageFile.type)) {
      return { error: "Format gambar tidak didukung! Gunakan JPG, PNG, WebP, atau GIF." };
    }
    if (coverImageFile.size > MAX_FILE_SIZE) {
      return { error: "Ukuran gambar maksimal 5MB!" };
    }

    try {
      const bytes = await coverImageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const ext = coverImageFile.name.split(".").pop() || "jpg";
      const filename = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "articles");

      // Ensure directory exists
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);

      // Delete old cover image if it's a local file
      if (existingArticle.coverImage && existingArticle.coverImage.startsWith("/uploads/")) {
        const oldPath = path.join(process.cwd(), "public", existingArticle.coverImage);
        try {
          await unlink(oldPath);
        } catch {
          // Ignore error if old file doesn't exist
        }
      }

      coverImage = `/uploads/articles/${filename}`;
    } catch {
      // File upload failed, fallback to URL
      if (coverImageUrl) {
        coverImage = coverImageUrl;
      }
    }
  }

  if (!coverImage && coverImageUrl) {
    coverImage = coverImageUrl;
  }

  if (!coverImage) {
    coverImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=800&h=500&q=80";
  }

  try {
    // Generate clean slug from title
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

    if (!slug) {
      slug = "artikel-" + Math.random().toString(36).substring(2, 7);
    }

    // Ensure slug uniqueness (exclude current article)
    let uniqueSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await prisma.article.findFirst({
        where: {
          slug: uniqueSlug,
          id: { not: id },
        },
        select: { id: true },
      });
      if (!existing) break;
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    // Update article
    await prisma.article.update({
      where: { id },
      data: {
        title,
        slug: uniqueSlug,
        category,
        readTime,
        coverImage,
        excerpt,
        content,
      },
    });
  } catch (err: unknown) {
    console.error("Gagal mengupdate artikel:", err);
    return { error: "Terjadi kesalahan internal. Silakan coba lagi." };
  }

  // Revalidate the static content
  revalidatePath("/artikel");
  revalidatePath(`/artikel/${existingArticle.slug}`);

  redirect("/dashboard");
}
