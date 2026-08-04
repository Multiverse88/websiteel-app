import { Router } from "express";
import { prisma } from "../lib/prisma";
import nodemailer from "nodemailer";
import { Prisma } from "@prisma/client";
import { Client as MinioClient } from "minio";

const router = Router();

// Configure MinIO Client
const s3Client = process.env.MINIO_ENDPOINT
  ? new MinioClient({
      endPoint: process.env.MINIO_ENDPOINT || "localhost",
      port: parseInt(process.env.MINIO_PORT || "9000"),
      useSSL: process.env.MINIO_USE_SSL === "true",
      accessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
      secretKey: process.env.MINIO_SECRET_KEY || "minioadmin",
    })
  : null;

async function deleteFromMinio(fileUrl: string) {
  if (!s3Client) return;
  try {
    const urlObj = new URL(fileUrl);
    // Path looks like /images/uploads/..., bucket is 'images'
    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return;
    const bucketName = parts[0];
    const objectName = parts.slice(1).join('/');
    await s3Client.removeObject(bucketName, objectName);
  } catch (error) {
    console.error("Failed to delete from MinIO:", error);
  }
}

// POST /api/v1/cron/process-queue
router.post("/process-queue", async (req, res) => {
  try {
    // Check if SMTP is configured
    const setting = await prisma.systemSetting.findUnique({
      where: { key: "email_blast_smtp" }
    });

    if (!setting) {
      return res.status(400).json({ error: "SMTP belum dikonfigurasi" });
    }

    const smtpConfig = JSON.parse(setting.value);
    if (!smtpConfig.host) {
      return res.status(400).json({ error: "SMTP host kosong" });
    }

    const transporter = nodemailer.createTransport({
      pool: true,
      maxConnections: 5,
      maxMessages: 200,
      host: smtpConfig.host,
      port: parseInt(smtpConfig.port || "587"),
      secure: parseInt(smtpConfig.port) === 465,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });

    const smtpFrom = smtpConfig.from || smtpConfig.user;

    // Fetch up to 100 pending recipients to process faster
    const pendingRecipients = await prisma.campaignRecipient.findMany({
      where: {
        status: "pending",
        campaign: {
          status: { in: ["processing", "scheduled"] },
          OR: [
            { scheduledAt: null },
            { scheduledAt: { lte: new Date() } }
          ]
        }
      },
      include: {
        campaign: true,
        contact: true,
      },
      take: 100,
    });

    if (pendingRecipients.length === 0) {
      return res.json({ message: "No pending emails to process" });
    }

    let sentCount = 0;
    let failCount = 0;

    // Update campaigns status safely
    const campaignsToProcess = Array.from(new Set(pendingRecipients.map(r => r.campaignId)));
    for (const cid of campaignsToProcess) {
      await prisma.emailCampaign.updateMany({
        where: { id: cid, status: "scheduled" },
        data: { status: "processing" }
      });
    }

    // Process them concurrently
    await Promise.all(pendingRecipients.map(async (recipient) => {
      const campaign = recipient.campaign;
      const contact = recipient.contact;

      let finalHtml = campaign.bodyHtml
        .replace(/\{\{nama\}\}/g, contact.name || "Pelanggan")
        .replace(/\{\{email\}\}/g, contact.email);

      if (campaign.previewText) {
        const previewBlock = `<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${campaign.previewText}</div>`;
        finalHtml = previewBlock + finalHtml;
      }

      const pixelUrl = `https://easylegal.my.id/api/track-open/${recipient.id}`;
      finalHtml += `<img src="${pixelUrl}" width="1" height="1" alt="" style="display:none;" />`;

      finalHtml = finalHtml.replace(/href="([^"]+)"/g, (match, url) => {
        if (url.startsWith("mailto:") || url.startsWith("tel:") || url.startsWith("#")) {
          return match;
        }
        const encoded = encodeURIComponent(url);
        return `href="https://easylegal.my.id/api/track-click/${recipient.id}?url=${encoded}"`;
      });

      try {
        const mailOptions: any = {
          from: smtpFrom,
          to: contact.email,
          subject: campaign.subject,
          html: finalHtml,
          text: finalHtml.replace(/<[^>]+>/g, ""),
        };

        if (campaign.attachments && Array.isArray(campaign.attachments) && campaign.attachments.length > 0) {
          mailOptions.attachments = campaign.attachments.map((a: any) => ({
            filename: a.filename,
            path: a.url.startsWith("http") ? a.url : `http://localhost:3000${a.url}`
          }));
        }

        await transporter.sendMail(mailOptions);
        
        await prisma.campaignRecipient.update({
          where: { id: recipient.id },
          data: { status: "sent", sentAt: new Date() }
        });
        sentCount++;
      } catch (err: any) {
        await prisma.campaignRecipient.update({
          where: { id: recipient.id },
          data: { status: "failed", errorMessage: err.message || "Gagal mengirim" }
        });
        failCount++;
      }
    }));

    // Check if campaign is completed
    const campaignsToComplete = Array.from(new Set(pendingRecipients.map(r => r.campaignId)));
    for (const cid of campaignsToComplete) {
      const pendingLeft = await prisma.campaignRecipient.count({
        where: { campaignId: cid, status: "pending" }
      });
      if (pendingLeft === 0) {
        await prisma.emailCampaign.update({
          where: { id: cid },
          data: { status: "completed" }
        });
      }
    }

    // Cleanup attachments for campaigns older than 5 days
    let cleanedCampaigns = 0;
    try {
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
      
      const oldCampaigns = await prisma.emailCampaign.findMany({
        where: {
          status: "completed",
          createdAt: { lt: fiveDaysAgo },
          attachments: { not: Prisma.DbNull }
        },
        take: 10 // process in small batches
      });

      if (oldCampaigns.length > 0) {
        const fs = await import("fs/promises");
        const path = await import("path");

        for (const camp of oldCampaigns) {
          if (camp.attachments && Array.isArray(camp.attachments)) {
            for (const att of camp.attachments as any[]) {
              if (att.url) {
                if (att.url.startsWith("http")) {
                  await deleteFromMinio(att.url);
                } else if (att.url.startsWith("/uploads/")) {
                  try {
                    await fs.unlink(path.join(process.cwd(), "..", "..", "public", att.url));
                  } catch (e) {}
                }
              }
            }
          }
          await prisma.emailCampaign.update({
            where: { id: camp.id },
            data: { attachments: Prisma.JsonNull }
          });
          cleanedCampaigns++;
        }
      }
    } catch (cleanupErr) {
      console.error("Error cleaning up attachments:", cleanupErr);
    }

    res.json({
      message: `Processed ${pendingRecipients.length} emails`,
      sentCount,
      failCount,
      cleanedCampaigns
    });

  } catch (error: any) {
    console.error("Cron Queue Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
