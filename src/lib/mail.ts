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
}

/**
 * Menghasilkan HTML premium untuk isi email newsletter.
 */
export function generateNewsletterHtml({
  articleTitle,
  articleExcerpt,
  articleCategory,
  articleSlug,
  introMessage,
  unsubscribeLink,
}: NewsletterHtmlParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const articleUrl = `${baseUrl}/artikel/${articleSlug}`;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${articleTitle}</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f7fafc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .email-wrapper {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            border: 1px border #e2e8f0;
          }
          .email-header {
            background-color: #ffffff;
            padding: 24px 32px;
            border-bottom: 2px solid #f1f5f9;
            text-align: center;
          }
          .brand-logo {
            color: #990202;
            font-size: 24px;
            font-weight: 800;
            text-decoration: none;
            letter-spacing: -0.5px;
          }
          .email-body {
            padding: 32px;
          }
          .intro-text {
            font-size: 15px;
            color: #475569;
            line-height: 1.6;
            margin-bottom: 24px;
          }
          .article-card {
            background-color: #fafafa;
            border: 1px solid #f1f5f9;
            border-radius: 8px;
            padding: 24px;
            margin-bottom: 28px;
          }
          .category-tag {
            display: inline-block;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            color: #990202;
            letter-spacing: 0.8px;
            margin-bottom: 8px;
          }
          .article-title {
            font-size: 18px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 10px 0;
            line-height: 1.4;
          }
          .article-excerpt {
            font-size: 13.5px;
            color: #64748b;
            line-height: 1.5;
            margin: 0 0 20px 0;
          }
          .cta-button {
            display: inline-block;
            background-color: #990202;
            color: #ffffff !important;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 6px;
            text-align: center;
            transition: background-color 0.2s ease;
          }
          .email-footer {
            background-color: #f8fafc;
            padding: 24px 32px;
            text-align: center;
            border-top: 1px solid #f1f5f9;
          }
          .footer-text {
            font-size: 11px;
            color: #94a3b8;
            line-height: 1.5;
          }
          .unsubscribe-link {
            color: #64748b;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <!-- Header -->
          <div class="email-header">
            <a href="${baseUrl}" class="brand-logo">EASY LEGAL</a>
          </div>
          
          <!-- Body -->
          <div class="email-body">
            <p class="intro-text">${introMessage.replace(/\n/g, "<br>")}</p>
            
            <div class="article-card">
              <span class="category-tag">${articleCategory}</span>
              <h2 class="article-title">${articleTitle}</h2>
              <p class="article-excerpt">${articleExcerpt}</p>
              <a href="${articleUrl}" class="cta-button" target="_blank">Baca Artikel Selengkapnya</a>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="email-footer">
            <p class="footer-text">
              © ${new Date().getFullYear()} Easy Legal. Semua hak dilindungi.<br>
              Anda menerima email ini karena terdaftar dalam update mingguan legalitas kami.<br>
              <a href="${unsubscribeLink}" class="unsubscribe-link" target="_blank">Batal Berlangganan (Unsubscribe)</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

