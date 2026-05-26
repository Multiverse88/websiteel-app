"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { sendEmail, generateNewsletterHtml } from "@/lib/mail";
import { getSession } from "@/lib/auth";

export async function sendBroadcast(articleId: string, customSubject?: string, customMessage?: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Akses ditolak! Silakan login." };
  }
  try {
    // Get article info
    const article = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }

    // Get all active subscribers
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      return { success: false, error: "Belum ada subscriber aktif." };
    }

    // Check if broadcast already sent for this article
    const existingBroadcast = await prisma.newsletterBroadcast.findFirst({
      where: { articleId: article.id },
    });

    if (existingBroadcast) {
      return { success: false, error: `Broadcast untuk artikel ini sudah pernah dikirim pada ${new Date(existingBroadcast.sentAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}.` };
    }

    const subject = customSubject || `Artikel Baru: ${article.title}`;
    const introMessage = customMessage || `Halo! Ada pembaruan legalitas baru menarik untuk kamu. Silakan baca selengkapnya di bawah ini.`;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Send emails to all active subscribers
    const emailResults = [];
    for (const subscriber of subscribers) {
      const unsubscribeLink = `${appUrl}/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
      
      const htmlContent = generateNewsletterHtml({
        articleTitle: article.title,
        articleExcerpt: article.excerpt,
        articleCategory: article.category,
        articleSlug: article.slug,
        introMessage,
        unsubscribeLink,
      });

      const textContent = `${introMessage}\n\nArtikel Baru: ${article.title}\nKategori: ${article.category}\nBaca artikel selengkapnya di: ${appUrl}/artikel/${article.slug}\n\nBatal berlangganan: ${unsubscribeLink}`;

      try {
        await sendEmail({
          to: subscriber.email,
          subject,
          html: htmlContent,
          text: textContent,
        });
        emailResults.push({ email: subscriber.email, status: "sent" });
      } catch (err) {
        console.error(`Gagal mengirim ke ${subscriber.email}:`, err);
        emailResults.push({ email: subscriber.email, status: "failed" });
      }
    }

    // Record the broadcast
    await prisma.newsletterBroadcast.create({
      data: {
        articleId: article.id,
        articleTitle: article.title,
        totalSent: subscribers.length,
      },
    });

    revalidatePath("/dashboard/newsletter");

    return {
      success: true,
      message: `Broadcast berhasil dikirim ke ${subscribers.length} subscriber!`,
      totalSent: subscribers.length,
    };
  } catch (error) {
    console.error("Broadcast error:", error);
    return { success: false, error: "Gagal mengirim broadcast. Silakan coba lagi." };
  }
}

export async function deleteSubscriber(id: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Akses ditolak! Silakan login." };
  }
  try {
    await prisma.newsletterSubscriber.delete({
      where: { id },
    });
    revalidatePath("/dashboard/newsletter");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal menghapus subscriber." };
  }
}

export async function toggleSubscriber(id: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Akses ditolak! Silakan login." };
  }
  try {
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { id },
    });
    if (!subscriber) return { success: false, error: "Subscriber tidak ditemukan." };

    await prisma.newsletterSubscriber.update({
      where: { id },
      data: { isActive: !subscriber.isActive },
    });
    revalidatePath("/dashboard/newsletter");
    return { success: true };
  } catch {
    return { success: false, error: "Gagal mengubah status subscriber." };
  }
}
