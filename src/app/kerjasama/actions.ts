"use server";

import { sendEmail } from "@/lib/mail";
import { escapeHtml } from "@/lib/utils";
import { trackMetric } from "@/lib/metrics";

export async function submitPartnershipForm(data: any) {
  const {
    name,
    role,
    email,
    whatsapp,
    companyName,
    businessActivity,
    website,
    officeAddress,
    partnershipType,
    proposal,
    source
  } = data;

  try {
    const adminEmail = "care@easylegal.id";
    const subject = `[EasyLegal] Pengajuan Kerjasama B2B: ${companyName}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #990202;">Pengajuan Kerjasama B2B Baru</h2>
        <hr style="border: 1px solid #eee;">
        
        <h3 style="color: #333; margin-top: 20px;">1. Tentang Anda</h3>
        <p><strong>Nama Lengkap:</strong> ${escapeHtml(name || "")}</p>
        <p><strong>Jabatan:</strong> ${escapeHtml(role || "")}</p>
        <p><strong>Email Bisnis:</strong> ${escapeHtml(email || "")}</p>
        <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp || "")}</p>
        
        <h3 style="color: #333; margin-top: 20px;">2. Tentang Usaha</h3>
        <p><strong>Nama Pendirian / Perusahaan:</strong> ${escapeHtml(companyName || "")}</p>
        <p><strong>Nama Kegiatan Usaha:</strong> ${escapeHtml(businessActivity || "")}</p>
        ${website ? `<p><strong>Alamat Website:</strong> ${escapeHtml(website)}</p>` : ""}
        ${officeAddress ? `<p><strong>Alamat Kantor:</strong> ${escapeHtml(officeAddress)}</p>` : ""}
        
        <h3 style="color: #333; margin-top: 20px;">3. Detail Kerjasama</h3>
        <p><strong>Jenis Kerjasama:</strong> ${escapeHtml(partnershipType || "")}</p>
        <p><strong>Sumber Informasi:</strong> ${escapeHtml(source || "")}</p>
        <p><strong>Pesan Tambahan:</strong></p>
        <p style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(proposal || "")}</p>
        
        <hr style="border: 1px solid #eee; margin-top: 30px;">
        <p style="color: #666; font-size: 12px;">Email ini dikirim otomatis dari formulir kerjasama easylegal.id</p>
      </div>
    `;

    await sendEmail({
      to: adminEmail,
      subject,
      html: htmlContent,
      text: `Pengajuan Kerjasama B2B Baru\n\nNama: ${name}\nPerusahaan: ${companyName}\nJenis Kerjasama: ${partnershipType}\nWhatsApp: ${whatsapp}\nEmail: ${email}`,
    });

    trackMetric("partnership_submit", 1, { status: "success", partnershipType });
    return { success: true };
  } catch (err) {
    console.error("Gagal mengirim email kerjasama:", err);
    trackMetric("partnership_submit", 1, { status: "error" });
    return { error: "Terjadi kesalahan. Silakan coba lagi nanti." };
  }
}
