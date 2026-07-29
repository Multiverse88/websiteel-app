import React from "react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CampaignDetailClient from "./CampaignDetailClient";

export const dynamic = "force-dynamic";

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const campaign = await prisma.emailCampaign.findUnique({
    where: { id },
    include: {
      recipients: {
        include: {
          contact: true,
        },
        orderBy: {
          sentAt: "desc",
        },
      },
    },
  });

  if (!campaign) {
    redirect("/dashboard/email-blast/riwayat");
  }

  const totalRecipients = campaign.recipients.length;
  const totalOpened = campaign.recipients.filter((r) => r.openedAt !== null).length;
  const totalSent = campaign.recipients.filter((r) => r.status === "sent").length;
  const totalClicked = campaign.recipients.filter((r) => r.clickedAt !== null).length;

  return (
    <CampaignDetailClient 
      campaign={campaign} 
      totalRecipients={totalRecipients}
      totalSent={totalSent}
      totalOpened={totalOpened}
      totalClicked={totalClicked}
    />
  );
}
