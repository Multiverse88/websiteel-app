import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown Device";

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

  return new NextResponse(transparentGif, {
    status: 200,
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
