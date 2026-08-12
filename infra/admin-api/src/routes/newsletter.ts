import { Router } from "express";
import { prisma } from "../lib/prisma";
import nodemailer from "nodemailer";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/v1/newsletter/subscriber/:email
router.get("/subscriber/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (subscriber) res.json({ data: subscriber });
    else res.status(404).json({ error: "Not found" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) return res.status(400).json({ success: false, error: "Email tidak valid." });

    const emailTrimmed = email.toLowerCase().trim();
    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email: emailTrimmed } });

    if (existing) {
      if (existing.isActive) return res.status(400).json({ success: false, error: "Email sudah terdaftar." });
      await prisma.newsletterSubscriber.update({ where: { email: emailTrimmed }, data: { isActive: true } });
      return res.json({ success: true, message: "Selamat datang kembali! Email berhasil diaktifkan ulang.", type: "reactivate" });
    }

    await prisma.newsletterSubscriber.create({ data: { email: emailTrimmed } });
    res.json({ success: true, message: "Berhasil terdaftar! Anda akan menerima update artikel terbaru.", type: "new" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Terjadi kesalahan." });
  }
});

// POST /api/v1/newsletter/unsubscribe
router.post("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, error: "Email tidak valid." });
    await prisma.newsletterSubscriber.update({ where: { email: email.toLowerCase().trim() }, data: { isActive: false } });
    res.json({ success: true, message: "Berhasil unsubscribe." });
  } catch (error) {
    res.status(404).json({ success: false, error: "Email tidak ditemukan." });
  }
});

// GET /api/v1/newsletter
router.get("/", requireAuth, async (req, res) => {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } });
    res.json({ data: subscribers });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/v1/newsletter/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.newsletterSubscriber.delete({ where: { id } });
    res.json({ success: true, message: "Subscriber deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/newsletter/broadcast
router.post("/broadcast", requireAuth, async (req, res) => {
  try {
    const { subject, bodyHtml, articleId } = req.body;
    if (!subject || !bodyHtml) {
      return res.status(400).json({ error: "Subject dan body wajib diisi" });
    }

    const smtpSettings = await prisma.systemSetting.findMany({ where: { key: { startsWith: "smtp_" } } });
    const smtp = Object.fromEntries(smtpSettings.map(s => [s.key, s.value]));

    if (!smtp.smtp_host) {
      return res.status(400).json({ error: "SMTP belum dikonfigurasi" });
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({ where: { isActive: true } });
    if (subscribers.length === 0) {
      return res.status(400).json({ error: "Tidak ada subscriber aktif" });
    }

    const transporter = nodemailer.createTransport({
      host: smtp.smtp_host,
      port: Number(smtp.smtp_port) || 587,
      secure: smtp.smtp_secure === "true",
      auth: { user: smtp.smtp_user, pass: smtp.smtp_password },
    });

    const bccEmails = subscribers.map(s => s.email);

    await transporter.sendMail({
      from: smtp.smtp_user,
      to: smtp.smtp_user, // Send to self
      bcc: bccEmails,     // BCC everyone else
      subject,
      html: bodyHtml,
    });

    let articleTitle = "Manual Broadcast";
    if (articleId) {
       const article = await prisma.article.findUnique({ where: { id: articleId } });
       if (article) articleTitle = article.title;
    }

    const broadcast = await prisma.newsletterBroadcast.create({
      data: {
        articleId: articleId || "manual",
        articleTitle: articleTitle,
        totalSent: subscribers.length,
      }
    });

    await prisma.emailLog.create({
      data: {
        recipient: `${subscribers.length} subscribers (BCC)`,
        subject,
        status: "sent",
        source: "broadcast",
        campaignId: null,
      }
    });

    res.json({ success: true, message: "Broadcast berhasil dikirim", data: broadcast });
  } catch (error: any) {
    console.error("Error broadcast:", error);
    await prisma.emailLog.create({
      data: {
        recipient: "All Subscribers",
        subject: req.body.subject,
        status: "error",
        source: "broadcast",
        errorMessage: String(error.message),
      }
    });
    res.status(500).json({ error: error.message || "Gagal mengirim broadcast" });
  }
});

export default router;
