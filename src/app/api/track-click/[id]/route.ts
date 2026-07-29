import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { headers } from "next/headers";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
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
  return NextResponse.redirect(targetUrl);
}
