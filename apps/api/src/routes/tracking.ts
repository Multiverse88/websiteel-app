import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// GET /api/v1/tracking/open/:id
router.get("/open/:id", async (req, res) => {
  const { id } = req.params;
  const userAgent = req.headers["user-agent"] || "Unknown Device";

  try {
    const recipient = await prisma.campaignRecipient.findUnique({
      where: { id },
    });

    if (recipient) {
      await prisma.campaignRecipient.update({
        where: { id },
        data: {
          openedAt: recipient.openedAt || new Date(),
          openCount: { increment: 1 },
          device: recipient.device || userAgent, // Only store the first detected device
        },
      });
    }
  } catch (error) {
    // Silently fail to not break the pixel rendering
    console.error("Tracking pixel error:", error);
  }

  // Generate 1x1 transparent GIF
  const transparentGif = Buffer.from(
    "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    "base64"
  );

  res.set("Content-Type", "image/gif");
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.status(200).send(transparentGif);
});

// GET /api/v1/tracking/click/:id
router.get("/click/:id", async (req, res) => {
  const { id } = req.params;
  const targetUrl = req.query.url as string;

  if (!targetUrl) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const recipient = await prisma.campaignRecipient.findUnique({
      where: { id },
    });

    if (recipient) {
      // Register click timestamp and increment openCount if they haven't opened it (clicking implies opening)
      await prisma.campaignRecipient.update({
        where: { id },
        data: {
          clickedAt: new Date(),
          openedAt: recipient.openedAt || new Date(),
          openCount: { increment: 1 }
        },
      });

      // Register link click stat for the campaign
      const existingLink = await prisma.campaignLink.findFirst({
        where: { campaignId: recipient.campaignId, url: targetUrl }
      });

      if (existingLink) {
        await prisma.campaignLink.update({
          where: { id: existingLink.id },
          data: { clicks: { increment: 1 } }
        });
      } else {
        await prisma.campaignLink.create({
          data: {
            campaignId: recipient.campaignId,
            url: targetUrl,
            clicks: 1
          }
        });
      }
    }
  } catch (error) {
    console.error("Error tracking click:", error);
  }

  // Redirect the user to the actual destination
  res.redirect(targetUrl);
});

export default router;
