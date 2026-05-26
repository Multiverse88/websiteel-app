"use server";

import { prisma } from "@/lib/db";

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Email tidak valid." };
  }

  try {
    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      if (existing.isActive) {
        return { success: false, error: "Email sudah terdaftar." };
      }
      // Re-activate if previously unsubscribed
      await prisma.newsletterSubscriber.update({
        where: { email: email.toLowerCase().trim() },
        data: { isActive: true },
      });
      return { success: true, message: "Selamat datang kembali! Email berhasil diaktifkan ulang." };
    }

    // Create new subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase().trim(),
      },
    });

    return { success: true, message: "Berhasil terdaftar! Anda akan menerima update artikel terbaru." };
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return { success: false, error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}

export async function unsubscribeNewsletter(email: string) {
  if (!email) {
    return { success: false, error: "Email tidak valid." };
  }

  try {
    await prisma.newsletterSubscriber.update({
      where: { email: email.toLowerCase().trim() },
      data: { isActive: false },
    });
    return { success: true, message: "Berhasil unsubscribe." };
  } catch {
    return { success: false, error: "Email tidak ditemukan." };
  }
}
