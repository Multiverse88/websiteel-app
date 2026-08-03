import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// POST /api/v1/contacts
router.post("/", async (req, res) => {
  try {
    const { name, businessName, email, whatsapp, topic, message } = req.body;

    if (!name || !email || !whatsapp || !topic || !message) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        businessName: businessName || null,
        email,
        whatsapp,
        topic,
        message,
      },
    });

    res.json({ success: true, data: submission });
  } catch (error) {
    console.error("Failed to submit contact form:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
