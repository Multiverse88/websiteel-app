import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

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

// GET /api/v1/contacts
router.get("/", requireAuth, async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ data: submissions });
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/v1/contacts/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.contactSubmission.delete({ where: { id } });
    res.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    console.error("Failed to delete contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
