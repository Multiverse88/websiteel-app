import React from "react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CampaignStatClient from "./CampaignStatClient";

export const dynamic = "force-dynamic";

export default async function CampaignStatPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const { id } = params;

  const campaign = await prisma.emailCampaign.findUnique({
    where: { id },
    include: {
      recipients: {
        include: {
          contact: true
        }
      }
    }
  });

  if (!campaign) {
    redirect("/dashboard/email-blast/statistik");
  }

  const totalSent = campaign.recipients.filter(r => r.status === "sent").length;
  const totalFailed = campaign.recipients.filter(r => r.status === "failed").length;
  const totalOpened = campaign.recipients.filter(r => r.openedAt !== null).length;
  const totalClicked = campaign.recipients.filter(r => r.clickedAt !== null).length;
  const totalBounced = campaign.recipients.filter(r => r.bouncedAt !== null).length;

  // Contacts Data
  const recipientsData = campaign.recipients.map(r => ({
    email: r.contact.email,
    name: r.contact.name || "Unknown",
    status: r.status, // pending, sent, failed
    openedAt: r.openedAt ? r.openedAt.toISOString() : null,
    clickedAt: r.clickedAt ? r.clickedAt.toISOString() : null,
    device: r.device || "Unknown",
    openCount: r.openCount
  })).sort((a, b) => b.openCount - a.openCount);

  // Hourly Heatmap specifically for this campaign
  const hourly = new Array(24).fill(0);
  campaign.recipients.forEach(r => {
    if (r.openedAt) {
      const hour = r.openedAt.getHours();
      hourly[hour]++;
    }
  });

  // Device Breakdown
  const deviceMap: Record<string, number> = {};
  campaign.recipients.forEach(r => {
    if (r.device) {
      deviceMap[r.device] = (deviceMap[r.device] || 0) + 1;
    }
  });
  
  const totalDeviceCount = Object.values(deviceMap).reduce((a, b) => a + b, 0);
  const devices = totalDeviceCount > 0 
    ? Object.entries(deviceMap).map(([label, count]) => ({
        label,
        pct: Math.round((count / totalDeviceCount) * 100)
      })).sort((a, b) => b.pct - a.pct).slice(0, 4)
    : [
        { label: 'Belum ada data', pct: 0 }
      ];

  return (
    <CampaignStatClient 
      campaign={{
        id: campaign.id,
        name: campaign.internalName || campaign.subject,
        subject: campaign.subject,
        status: campaign.status,
        createdAt: campaign.createdAt.toISOString()
      }}
      stats={{
        totalSent,
        totalFailed,
        totalOpened,
        totalClicked,
        totalBounced
      }}
      recipients={recipientsData}
      hourly={hourly}
      devices={devices}
    />
  );
}
