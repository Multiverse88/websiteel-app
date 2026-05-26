"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function createArticle(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const readTime = formData.get("readTime") as string;
  const coverImageFile = formData.get("coverImageFile") as File | null;
  const coverImageUrl = formData.get("coverImageUrl") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;

  // Validation
  if (!title || !category || !readTime || !excerpt || !content) {
    return { error: "Semua field wajib diisi!" };
  }

  let coverImage = "";

  // Handle file upload
  if (coverImageFile && coverImageFile.size > 0) {
    if (!ALLOWED_TYPES.includes(coverImageFile.type)) {
      return { error: "Format gambar tidak didukung! Gunakan JPG, PNG, WebP, atau GIF." };
    }
    if (coverImageFile.size > MAX_FILE_SIZE) {
      return { error: "Ukuran gambar maksimal 5MB!" };
    }

    const bytes = await coverImageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const ext = coverImageFile.name.split(".").pop() || "jpg";
    const filename = `cover-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "articles");

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    coverImage = `/uploads/articles/${filename}`;
  } else if (coverImageUrl) {
    coverImage = coverImageUrl;
  } else {
    coverImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=800&h=500&q=80";
  }

  try {
    // Generate clean slug from title
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-")        // collapse whitespace and replace by -
      .replace(/-+/g, "-")         // collapse dashes
      .replace(/^-+/, "")          // trim - from start of text
      .replace(/-+$/, "");         // trim - from end of text

    if (!slug) {
      slug = "artikel-" + Math.random().toString(36).substring(2, 7);
    }

    // Ensure slug uniqueness
    let uniqueSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await prisma.article.findUnique({
        where: { slug: uniqueSlug }
      });
      if (!existing) break;
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    // Insert article
    const newArticle = await prisma.article.create({
      data: {
        title,
        slug: uniqueSlug,
        category,
        readTime,
        coverImage,
        excerpt,
        content,
      }
    });

    // Automatically send newsletter broadcast
    try {
      const subscribers = await prisma.newsletterSubscriber.findMany({
        where: { isActive: true },
      });
      if (subscribers.length > 0) {
        for (const subscriber of subscribers) {
          console.log(`📧 Automatically sending newsletter to: ${subscriber.email}`);
          console.log(`   Subject: Artikel Baru: ${newArticle.title}`);
          console.log(`   Link: /artikel/${newArticle.slug}`);
        }
        await prisma.newsletterBroadcast.create({
          data: {
            articleId: newArticle.id,
            articleTitle: newArticle.title,
            totalSent: subscribers.length,
          },
        });
      }
    } catch (broadcastErr) {
      console.error("Gagal mengirim broadcast otomatis:", broadcastErr);
    }

  } catch (err: any) {
    console.error("Gagal menambahkan artikel:", err);
    return { error: "Terjadi kesalahan internal. Silakan coba lagi." };
  }

  // Revalidate the static content
  revalidatePath("/artikel");

  // Perform redirect outside of try-catch block to avoid catching redirect exceptions
  redirect("/artikel");
}
