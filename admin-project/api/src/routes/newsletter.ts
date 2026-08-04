import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/v1/newsletter/subscriber/:email
router.get("/subscriber/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (subscriber) {
      res.json({ data: subscriber });
    } else {
      res.status(404).json({ error: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ success: false, error: "Email tidak valid." });
    }

    const emailTrimmed = email.toLowerCase().trim();
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: emailTrimmed },
    });

    if (existing) {
      if (existing.isActive) {
        return res.status(400).json({ success: false, error: "Email sudah terdaftar." });
      }
      
      await prisma.newsletterSubscriber.update({
        where: { email: emailTrimmed },
        data: { isActive: true },
      });
      return res.json({ success: true, message: "Selamat datang kembali! Email berhasil diaktifkan ulang.", type: "reactivate" });
    }

    await prisma.newsletterSubscriber.create({
      data: { email: emailTrimmed },
    });

    res.json({ success: true, message: "Berhasil terdaftar! Anda akan menerima update artikel terbaru.", type: "new" });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    res.status(500).json({ success: false, error: "Terjadi kesalahan. Silakan coba lagi." });
  }
});

// POST /api/v1/newsletter/unsubscribe
router.post("/unsubscribe", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: "Email tidak valid." });
    }

    await prisma.newsletterSubscriber.update({
      where: { email: email.toLowerCase().trim() },
      data: { isActive: false },
    });

    res.json({ success: true, message: "Berhasil unsubscribe." });
  } catch (error) {
    res.status(404).json({ success: false, error: "Email tidak ditemukan." });
  }
});

export default router;
