import { Router } from "express";
import { prisma } from "../lib/prisma";
import nodemailer from "nodemailer";

const router = Router();

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await prisma.blastContact.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        segments: { select: { id: true, name: true } },
      },
    });
    res.json({ data: contacts });
  } catch (error) {
    console.error("Error fetching blast contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const { email, name, tags, isActive } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Email tidak valid" });
    }

    const contact = await prisma.blastContact.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        tags: tags || null,
        isActive: isActive !== undefined ? isActive : true,
      },
    });

    res.status(201).json({ data: contact });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email sudah terdaftar" });
    }
    console.error("Error creating blast contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/contacts/import", async (req, res) => {
  try {
    const { contacts } = req.body;
    if (!Array.isArray(contacts)) {
      return res.status(400).json({ error: "contacts harus berupa array" });
    }

    const results = [];
    for (const c of contacts) {
      try {
        const contact = await prisma.blastContact.create({
          data: {
            email: c.email.toLowerCase(),
            name: c.name || null,
            tags: c.tags || null,
            isActive: c.isActive ?? true,
          },
        });
        results.push({ success: true, data: contact });
      } catch (e: any) {
        if (e.code === "P2002") {
          results.push({ success: false, email: c.email, error: "Email sudah ada" });
        } else {
          results.push({ success: false, email: c.email, error: "Gagal menambahkan" });
        }
      }
    }

    res.json({ data: results });
  } catch (error) {
    console.error("Error importing contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tags, isActive } = req.body;

    const contact = await prisma.blastContact.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        tags: tags !== undefined ? tags : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    res.json({ data: contact });
  } catch (error) {
    console.error("Error updating blast contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blastContact.delete({ where: { id } });
    res.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    console.error("Error deleting blast contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/contacts/toggle-status", async (req, res) => {
  try {
    const { isActive } = req.body;
    await prisma.blastContact.updateMany({
      data: { isActive },
    });
    res.json({ success: true, message: `All contacts ${isActive ? "activated" : "deactivated"}` });
  } catch (error) {
    console.error("Error toggling contact status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await prisma.emailCampaign.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { recipients: true } },
      },
    });
    res.json({ data: campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/campaigns", async (req, res) => {
  try {
    const { internalName, subject, previewText, bodyHtml, scheduledAt, isTemplate } = req.body;

    if (!subject || !bodyHtml) {
      return res.status(400).json({ error: "Subject dan body wajib diisi" });
    }

    const campaign = await prisma.emailCampaign.create({
      data: {
        internalName: internalName || null,
        subject,
        previewText: previewText || null,
        bodyHtml,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        isTemplate: isTemplate || false,
      },
    });

    res.status(201).json({ data: campaign });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/campaigns/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { internalName, subject, previewText, bodyHtml, scheduledAt, status } = req.body;

    const campaign = await prisma.emailCampaign.update({
      where: { id },
      data: {
        internalName: internalName !== undefined ? internalName : undefined,
        subject: subject !== undefined ? subject : undefined,
        previewText: previewText !== undefined ? previewText : undefined,
        bodyHtml: bodyHtml !== undefined ? bodyHtml : undefined,
        scheduledAt: scheduledAt !== undefined ? new Date(scheduledAt) : undefined,
        status: status !== undefined ? status : undefined,
      },
    });

    res.json({ data: campaign });
  } catch (error) {
    console.error("Error updating campaign:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/campaigns/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.emailCampaign.delete({ where: { id } });
    res.json({ success: true, message: "Campaign deleted" });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/campaigns/:id/recipients", async (req, res) => {
  try {
    const { id } = req.params;
    const recipients = await prisma.campaignRecipient.findMany({
      where: { campaignId: id },
      include: { contact: true },
    });
    res.json({ data: recipients });
  } catch (error) {
    console.error("Error fetching campaign recipients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/smtp-settings", async (req, res) => {
  try {
    const settings = await prisma.systemSetting.findMany({
      where: { key: { startsWith: "smtp_" } },
    });
    const smtp = Object.fromEntries(settings.map((s) => [s.key, s.value]));
    res.json({ data: smtp });
  } catch (error) {
    console.error("Error fetching SMTP settings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/smtp-settings", async (req, res) => {
  try {
    const { host, port, user, password, secure } = req.body;

    if (!host || !user || !password) {
      return res.status(400).json({ error: "Host, user, dan password wajib diisi" });
    }

    const settings = [
      { key: "smtp_host", value: host },
      { key: "smtp_port", value: String(port || 587) },
      { key: "smtp_user", value: user },
      { key: "smtp_password", value: password },
      { key: "smtp_secure", value: String(secure || false) },
    ];

    for (const s of settings) {
      await prisma.systemSetting.upsert({
        where: { key: s.key },
        update: { value: s.value },
        create: { key: s.key, value: s.value },
      });
    }

    res.json({ success: true, message: "SMTP settings saved" });
  } catch (error) {
    console.error("Error saving SMTP settings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/campaigns/test-send", async (req, res) => {
  try {
    const { subject, bodyHtml, to } = req.body;

    if (!subject || !bodyHtml || !to) {
      return res.status(400).json({ error: "Subject, body, dan email penerima wajib diisi" });
    }

    const smtpSettings = await prisma.systemSetting.findMany({
      where: { key: { startsWith: "smtp_" } },
    });
    const smtp = Object.fromEntries(smtpSettings.map((s) => [s.key, s.value]));

    if (!smtp.smtp_host) {
      return res.status(400).json({ error: "SMTP belum dikonfigurasi" });
    }

    const transporter = nodemailer.createTransport({
      host: smtp.smtp_host,
      port: Number(smtp.smtp_port) || 587,
      secure: smtp.smtp_secure === "true",
      auth: {
        user: smtp.smtp_user,
        pass: smtp.smtp_password,
      },
    });

    await transporter.sendMail({
      from: smtp.smtp_user,
      to,
      subject,
      html: bodyHtml,
    });

    res.json({ success: true, message: "Email berhasil dikirim" });
  } catch (error) {
    console.error("Error sending test email:", error);
    res.status(500).json({ error: "Gagal mengirim email" });
  }
});

router.post("/templates", async (req, res) => {
  try {
    const { type, content } = req.body;

    if (!type || !content) {
      return res.status(400).json({ error: "Type dan content wajib diisi" });
    }

    await prisma.systemSetting.upsert({
      where: { key: `email_template_${type}` },
      update: { value: content },
      create: { key: `email_template_${type}`, value: content },
    });

    res.json({ success: true, message: "Template saved" });
  } catch (error) {
    console.error("Error saving template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/templates/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const template = await prisma.systemSetting.findUnique({
      where: { key: `email_template_${type}` },
    });
    res.json({ data: template?.value || null });
  } catch (error) {
    console.error("Error fetching template:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
