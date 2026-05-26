import nodemailer from "nodemailer";

// Dapatkan konfigurasi dari environment variables
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || `"Easy Legal" <no-reply@easylegal.id>`;

// Buat transporter jika kredensial sudah diset di .env
const hasSmtpConfig = !!(SMTP_HOST && SMTP_USER && SMTP_PASS);

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // true untuk port 465, false untuk port lainnya
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    })
  : null;

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Mengirim email menggunakan Nodemailer jika konfigurasi SMTP diset di .env.
 * Jika tidak diset, akan mencetak log email di console sebagai simulasi (Development Mode).
 */
export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: SMTP_FROM,
        to,
        subject,
        html,
        text,
      });
      console.log(`✅ Email terkirim ke ${to}: Message ID = ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error(`❌ Gagal mengirim email ke ${to}:`, error);
      throw error;
    }
  } else {
    // Mode Simulasi (Development Mode)
    console.log(`==================================================`);
    console.log(`⚠️  [SIMULASI EMAIL] SMTP belum diset di berkas .env.`);
    console.log(`📧 Penerima : ${to}`);
    console.log(`👤 Pengirim : ${SMTP_FROM}`);
    console.log(`📝 Subjek   : ${subject}`);
    console.log(`📄 Isi Teks : ${text}`);
    console.log(`==================================================`);
    return { success: true, simulated: true };
  }
}

interface NewsletterHtmlParams {
  articleTitle: string;
  articleExcerpt: string;
  articleCategory: string;
  articleSlug: string;
  introMessage: string;
  unsubscribeLink: string;
  coverImage?: string;
}

/**
 * Menghasilkan HTML untuk isi email newsletter.
 * Dirancang agar tidak masuk spam: minimal CSS, plain-text friendly, ada physical address.
 */
export function generateNewsletterHtml({
  articleTitle,
  articleExcerpt,
  articleCategory,
  articleSlug,
  introMessage,
  unsubscribeLink,
  coverImage,
}: NewsletterHtmlParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}/artikel/${articleSlug}`;
  const currentYear = new Date().getFullYear();

  // Resolve cover image to absolute URL (email clients need absolute URLs)
  let coverSrc = coverImage || "";
  if (coverSrc && !coverSrc.startsWith("http")) {
    coverSrc = `${baseUrl}${coverSrc}`;
  }

  // Logo: use an inline SVG as base64 to avoid external loading issues
  const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36"><rect width="36" height="36" rx="8" fill="#990202"/><text x="18" y="24" text-anchor="middle" font-family="Arial,sans-serif" font-size="18" font-weight="bold" fill="#ffffff">EL</text></svg>`;
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${articleTitle}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f4f4;">
    <tr>
      <td align="center" style="padding:30px 15px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">

          <!-- Header: Logo + Brand Name -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #e5e5e5;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding-right:12px;vertical-align:middle;">
                    <a href="${baseUrl}" style="text-decoration:none;">
                      <img src="${logoDataUri}" alt="Easy Legal" width="36" height="36" style="display:block;border-radius:8px;" />
                    </a>
                  </td>
                  <td style="vertical-align:middle;">
                    <a href="${baseUrl}" style="text-decoration:none;">
                      <span style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-weight:800;font-style:normal;color:#111111;letter-spacing:-0.5px;">EASY LEGAL</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="font-size:15px;color:#333333;line-height:1.6;margin:0 0 24px;">${introMessage.replace(/\n/g, "<br>")}</p>

              <!-- Cover Image -->
              ${coverSrc ? `
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td>
                    <img src="${coverSrc}" alt="${articleTitle}" width="536" style="display:block;width:100%;max-width:536px;height:auto;border-radius:6px;border:1px solid #e5e5e5;" />
                  </td>
                </tr>
              </table>
              ` : ""}

              <!-- Article Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#fafafa;border:1px solid #e5e5e5;border-radius:6px;margin-bottom:24px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="font-size:11px;font-weight:bold;text-transform:uppercase;color:#990202;letter-spacing:0.5px;margin:0 0 8px;">${articleCategory}</p>
                    <h2 style="font-size:18px;font-weight:bold;color:#111111;margin:0 0 10px;line-height:1.4;">${articleTitle}</h2>
                    <p style="font-size:14px;color:#666666;line-height:1.6;margin:0 0 20px;">${articleExcerpt}</p>
                    <a href="${articleUrl}" style="display:inline-block;background-color:#990202;color:#ffffff;font-size:13px;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:5px;">Baca Artikel Selengkapnya &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;text-align:center;border-top:1px solid #e5e5e5;background-color:#fafafa;">
              <p style="font-size:12px;color:#999999;line-height:1.5;margin:0;">
                &copy; ${currentYear} Easy Legal. Hak Cipta Dilindungi.<br>
                Anda menerima email ini karena terdaftar di newsletter Easy Legal.<br>
                <a href="${unsubscribeLink}" style="color:#666666;text-decoration:underline;">Berhenti Berlangganan</a>
              </p>
              <p style="font-size:11px;color:#cccccc;margin:10px 0 0;">Easy Legal &mdash; Jakarta, Indonesia</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

