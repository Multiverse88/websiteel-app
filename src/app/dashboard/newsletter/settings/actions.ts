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

/**
 * Test koneksi SMTP dan kirim email test ke alamat admin.
 */
export async function testSmtpConnection(testEmail: string) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Akses ditolak! Silakan login." };
  }

  if (!testEmail) {
    return { success: false, error: "Email penerima wajib diisi!" };
  }

  // Check if SMTP is configured
  const hasSmtp = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
  if (!hasSmtp) {
    return { success: false, error: "SMTP belum dikonfigurasi di server. Silakan set SMTP_HOST, SMTP_USER, dan SMTP_PASS." };
  }

  try {
    const { sendEmail } = await import("@/lib/mail");

    const html = `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px;">
        <h2 style="font-size: 20px; font-weight: 800; color: #111827; margin: 0 0 12px;">Test Koneksi SMTP</h2>
        <p style="font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0 0 16px;">
          Email ini dikirim otomatis untuk memverifikasi bahwa pengaturan SMTP EasyLegal sudah benar.
        </p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;">
          <p style="font-size: 13px; color: #166534; font-weight: 600; margin: 0;">Koneksi SMTP berhasil!</p>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;">
        <p style="font-size: 12px; color: #9ca3af; margin: 0;">EasyLegal Newsletter System</p>
      </div>
    `;

    await sendEmail({
      to: testEmail,
      subject: "[EasyLegal] Test Koneksi SMTP - Berhasil",
      html,
      text: "Test Koneksi SMTP - Berhasil. Email ini dikirim untuk memverifikasi pengaturan SMTP EasyLegal.",
    });

    return { success: true, message: `Email test berhasil dikirim ke ${testEmail}! Cek inbox (atau spam folder) untuk memverifikasi.` };
  } catch (error: any) {
    console.error("SMTP test error:", error);
    return { success: false, error: `Gagal mengirim email test: ${error?.message || "Unknown error"}` };
  }
}
