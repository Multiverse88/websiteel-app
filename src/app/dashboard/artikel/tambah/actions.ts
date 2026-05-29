"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { sendEmail, generateNewsletterHtml } from "@/lib/mail";
import { getSession } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function createArticle(prevState: Record<string, unknown> | null, formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "Sesi tidak valid! Anda harus login terlebih dahulu." };
  }
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

      coverImage = `/uploads/articles/${filename}`;
    } catch {
      // File upload gagal (kemungkinan di Vercel serverless), fallback ke URL
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

    const session = await getSession();
    const authorId = session?.userId || null;

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
        authorId,
      }
    });

    let broadcastError: string | null = null;

    // Automatically send newsletter broadcast synchronously (so admin gets immediate error feedback)
    try {
      // Get system settings for newsletter automation
      const settings = await prisma.systemSetting.findMany({
        where: {
          key: {
            in: [
              "newsletter_auto_broadcast",
              "newsletter_default_subject",
              "newsletter_default_message",
            ],
          },
        },
      });

      const settingsMap = new Map(settings.map((s) => [s.key, s.value]));
      const isAutoActive = settingsMap.get("newsletter_auto_broadcast") === "true";

      if (isAutoActive) {
        const subscribers = await prisma.newsletterSubscriber.findMany({
          where: { isActive: true },
        });

        if (subscribers.length > 0) {
          const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
          const rawSubject = settingsMap.get("newsletter_default_subject") || "Artikel Baru: {{title}}";
          const rawMessage = settingsMap.get("newsletter_default_message") || "Halo! Kami baru saja mempublikasikan artikel legalitas terbaru yang sangat penting untuk perkembangan bisnis Anda. Mari baca pembahasan lengkap artikel kami di bawah ini.";

          // Replace placeholders
          const subject = rawSubject.replace("{{title}}", newArticle.title);
          const introMessage = rawMessage
            .replace("{{title}}", newArticle.title)
            .replace("{{category}}", newArticle.category);

          // Create broadcast record first
          const broadcast = await prisma.newsletterBroadcast.create({
            data: {
              articleId: newArticle.id,
              articleTitle: newArticle.title,
              totalSent: 0,
            },
          });

          let sentCount = 0;

          for (const subscriber of subscribers) {
            const unsubscribeLink = `${appUrl}/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;

            const htmlContent = generateNewsletterHtml({
              articleTitle: newArticle.title,
              articleExcerpt: newArticle.excerpt,
              articleCategory: newArticle.category,
              articleSlug: newArticle.slug,
              introMessage,
              unsubscribeLink,
              coverImage: newArticle.coverImage,
            });

            const textContent = `${introMessage}\n\nArtikel Baru: ${newArticle.title}\nKategori: ${newArticle.category}\nBaca artikel selengkapnya di: ${appUrl}/artikel/${newArticle.slug}\n\nBatal berlangganan: ${unsubscribeLink}`;

            let status = "failed";
            let errorMessage: string | null = null;

            try {
              const result = await sendEmail({
                to: subscriber.email,
                subject,
                html: htmlContent,
                text: textContent,
              });
              status = result?.simulated ? "simulated" : "sent";
              if (status === "sent" || status === "simulated") sentCount++;
            } catch (err: unknown) {
              errorMessage = err instanceof Error ? err.message : "Unknown error";
              if (!broadcastError) {
                broadcastError = errorMessage;
              }
              console.error(`Gagal mengirim email otomatis ke ${subscriber.email}:`, err);
            }

            // Log every email attempt
            await prisma.emailLog.create({
              data: {
                recipient: subscriber.email,
                subject,
                status,
                errorMessage,
                broadcastId: broadcast.id,
                source: "auto-broadcast",
              },
            });
          }

          // Update totalSent to reflect actual successful sends
          await prisma.newsletterBroadcast.update({
            where: { id: broadcast.id },
            data: { totalSent: sentCount },
          });

          console.log(`✅ Auto-broadcast selesai: ${sentCount} berhasil dari ${subscribers.length} subscriber.`);
        }
      }
    } catch (broadcastErr) {
      console.error("Gagal memproses broadcast otomatis:", broadcastErr);
      broadcastError = broadcastErr instanceof Error ? broadcastErr.message : "Unknown broadcast error";
    }

    if (broadcastError) {
      return {
        error: `Artikel berhasil disimpan, namun Gagal mengirim broadcast email otomatis: ${broadcastError}. Silakan cek konfigurasi SMTP Anda.`
      };
    }

  } catch (err: unknown) {
    console.error("Gagal menambahkan artikel:", err);
    return { error: "Terjadi kesalahan internal. Silakan coba lagi." };
  }

  // Revalidate the static content
  revalidatePath("/artikel");

  // Perform redirect outside of try-catch block to avoid catching redirect exceptions
  redirect("/dashboard");
}
