"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export interface NewsletterSettings {
  autoBroadcast: boolean;
  defaultSubject: string;
  defaultMessage: string;
}

/**
 * Mendapatkan seluruh pengaturan otomatisasi newsletter dari database.
 */
export async function getNewsletterSettings(): Promise<NewsletterSettings> {
  const session = await getSession();
  if (!session) {
    return {
      autoBroadcast: true,
      defaultSubject: "Artikel Baru: {{title}}",
      defaultMessage:
        "Halo! Kami baru saja mempublikasikan artikel legalitas terbaru yang sangat penting untuk perkembangan bisnis Anda. Mari baca pembahasan lengkap artikel kami di bawah ini.",
    };
  }
  try {
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

    return {
      autoBroadcast: settingsMap.get("newsletter_auto_broadcast") === "true",
      defaultSubject: settingsMap.get("newsletter_default_subject") || "Artikel Baru: {{title}}",
      defaultMessage:
        settingsMap.get("newsletter_default_message") ||
        "Halo! Kami baru saja mempublikasikan artikel legalitas terbaru yang sangat penting untuk perkembangan bisnis Anda. Mari baca pembahasan lengkap artikel kami di bawah ini.",
    };
  } catch (error) {
    console.error("Gagal mendapatkan pengaturan newsletter:", error);
    return {
      autoBroadcast: true,
      defaultSubject: "Artikel Baru: {{title}}",
      defaultMessage:
        "Halo! Kami baru saja mempublikasikan artikel legalitas terbaru yang sangat penting untuk perkembangan bisnis Anda. Mari baca pembahasan lengkap artikel kami di bawah ini.",
    };
  }
}

/**
 * Menyimpan pengaturan otomatisasi newsletter ke database.
 */
export async function updateNewsletterSettings(data: NewsletterSettings) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Akses ditolak! Silakan login." };
  }
  try {
    const updates = [
      { key: "newsletter_auto_broadcast", value: data.autoBroadcast ? "true" : "false" },
      { key: "newsletter_default_subject", value: data.defaultSubject },
      { key: "newsletter_default_message", value: data.defaultMessage },
    ];

    for (const item of updates) {
      await prisma.systemSetting.upsert({
        where: { key: item.key },
        update: { value: item.value },
        create: { key: item.key, value: item.value },
      });
    }

    revalidatePath("/dashboard/newsletter");
    revalidatePath("/dashboard/newsletter/settings");

    return { success: true, message: "Pengaturan otomatisasi berhasil disimpan!" };
  } catch (error) {
    console.error("Gagal memperbarui pengaturan newsletter:", error);
    return { success: false, error: "Gagal menyimpan pengaturan. Silakan coba lagi." };
  }
}
