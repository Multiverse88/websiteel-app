"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function sendBroadcast(articleId: string, customSubject?: string, customMessage?: string) {
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

    // Simulate sending emails to all subscribers
    // In production, integrate with email service (Resend, SendGrid, Mailgun, etc.)
    const emailResults = [];
    for (const subscriber of subscribers) {
      // Simulated email send
      console.log(`========================================`);
      console.log(`📧 Sending newsletter to: ${subscriber.email}`);
      console.log(`   Subject: ${subject}`);
      console.log(`   Intro Message: ${introMessage}`);
      console.log(`   Article: ${article.title} (${article.category})`);
      console.log(`   Link: /artikel/${article.slug}`);
      console.log(`   Unsubscribe Link: /newsletter/unsubscribe?email=${subscriber.email}`);
      console.log(`========================================`);
      emailResults.push({
        email: subscriber.email,
        status: "sent",
      });
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
