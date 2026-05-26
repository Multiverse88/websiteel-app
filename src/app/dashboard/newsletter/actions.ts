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

    // Create broadcast record first so we can link email logs to it
    const broadcast = await prisma.newsletterBroadcast.create({
      data: {
        articleId: article.id,
        articleTitle: article.title,
        totalSent: subscribers.length,
      },
    });

    const subject = customSubject || `Artikel Baru: ${article.title}`;
    const introMessage = customMessage || `Halo! Ada pembaruan legalitas baru menarik untuk kamu. Silakan baca selengkapnya di bawah ini.`;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Send emails to all active subscribers and log each one
    let sentCount = 0;
    for (const subscriber of subscribers) {
      const unsubscribeLink = `${appUrl}/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;

      const htmlContent = generateNewsletterHtml({
        articleTitle: article.title,
        articleExcerpt: article.excerpt,
        articleCategory: article.category,
        articleSlug: article.slug,
        introMessage,
        unsubscribeLink,
        coverImage: article.coverImage,
      });

      const textContent = `${introMessage}\n\nArtikel Baru: ${article.title}\nKategori: ${article.category}\nBaca artikel selengkapnya di: ${appUrl}/artikel/${article.slug}\n\nBatal berlangganan: ${unsubscribeLink}`;

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
        if (status === "sent") sentCount++;
      } catch (err: any) {
        errorMessage = err?.message || "Unknown error";
        console.error(`Gagal mengirim ke ${subscriber.email}:`, err);
      }

      // Log every email attempt
      await prisma.emailLog.create({
        data: {
          recipient: subscriber.email,
          subject,
          status,
          errorMessage,
          broadcastId: broadcast.id,
          source: "broadcast",
        },
      });
    }

    revalidatePath("/dashboard/newsletter");

    // Update totalSent to reflect actual successful sends
    await prisma.newsletterBroadcast.update({
      where: { id: broadcast.id },
      data: { totalSent: sentCount },
    });

    return {
      success: true,
      message: `Broadcast berhasil dikirim ke ${sentCount} dari ${subscribers.length} subscriber!`,
      totalSent: sentCount,
      totalFailed: subscribers.length - sentCount,
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
