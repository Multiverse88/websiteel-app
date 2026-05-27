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

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const html = `<!DOCTYPE html>
<html lang="id">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f4f4;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" style="padding:30px 15px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="padding:24px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
              <a href="${baseUrl}" style="color:#990202;font-size:22px;font-weight:bold;text-decoration:none;">EASY LEGAL</a>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="font-size:18px;font-weight:bold;color:#111111;margin:0 0 12px;">Test Koneksi SMTP</h2>
              <p style="font-size:14px;color:#333333;line-height:1.6;margin:0 0 16px;">Email ini dikirim otomatis untuk memverifikasi bahwa pengaturan SMTP EasyLegal sudah benar.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;margin-bottom:16px;">
                <tr><td style="padding:12px 16px;"><p style="font-size:13px;color:#166534;font-weight:bold;margin:0;">Koneksi SMTP berhasil!</p></td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;text-align:center;border-top:1px solid #e5e5e5;background-color:#fafafa;">
              <p style="font-size:12px;color:#999999;margin:0;">&copy; ${new Date().getFullYear()} Easy Legal. Hak Cipta Dilindungi.</p>
              <p style="font-size:11px;color:#cccccc;margin:10px 0 0;">Easy Legal &mdash; Jakarta, Indonesia</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    await sendEmail({
      to: testEmail,
      subject: "[EasyLegal] Test Koneksi SMTP - Berhasil",
      html,
      text: "Test Koneksi SMTP - Berhasil. Email ini dikirim untuk memverifikasi pengaturan SMTP EasyLegal.",
    });

    return { success: true, message: `Email test berhasil dikirim ke ${testEmail}! Cek inbox (atau spam folder) untuk memverifikasi.` };
  } catch (error: unknown) {
    console.error("SMTP test error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: `Gagal mengirim email test: ${message}` };
  }
}
