"use server";

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/mail";

export async function submitContactForm(prevState: Record<string, unknown> | null, formData: FormData) {
  const name = formData.get("name") as string;
  const businessName = formData.get("businessName") as string;
  const email = formData.get("email") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const topic = formData.get("topic") as string;
  const message = formData.get("message") as string;

  // Validation
  if (!name?.trim()) {
    return { error: "Nama wajib diisi." };
  }
  if (!email?.trim()) {
    return { error: "Email wajib diisi." };
  }
  if (!whatsapp?.trim()) {
    return { error: "No. WhatsApp wajib diisi." };
  }
  if (!topic) {
    return { error: "Topik konsultasi wajib dipilih." };
  }
  if (!message?.trim()) {
    return { error: "Pesan wajib diisi." };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Format email tidak valid." };
  }

  try {
    // Save to database
    await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        businessName: businessName?.trim() || null,
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        topic,
        message: message.trim(),
      },
    });

    // Send notification email to admin
    const adminEmail = process.env.SMTP_FROM || "info@easylegal.id";
    const subject = `[EasyLegal] Pesan Baru: ${topic}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #990202;">Pesan Baru dari Formulir Kontak</h2>
        <hr style="border: 1px solid #eee;">
        <p><strong>Nama:</strong> ${name}</p>
        ${businessName ? `<p><strong>Perusahaan:</strong> ${businessName}</p>` : ""}
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Topik:</strong> ${topic}</p>
        <hr style="border: 1px solid #eee;">
        <p><strong>Pesan:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
        <hr style="border: 1px solid #eee;">
        <p style="color: #666; font-size: 12px;">Email ini dikirim otomatis dari formulir kontak easylegal.id</p>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject,
      html: htmlContent,
      text: `Pesan Baru dari ${name}\nEmail: ${email}\nWhatsApp: ${whatsapp}\nTopik: ${topic}\nPesan: ${message}`,
    });

    return { success: true };
  } catch (err) {
    console.error("Gagal mengirim pesan kontak:", err);
    return { error: "Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp." };
  }
}
