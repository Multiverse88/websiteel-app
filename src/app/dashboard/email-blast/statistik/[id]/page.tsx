import React from "react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import CampaignStatistikClient from "./CampaignStatistikClient";

export const dynamic = "force-dynamic";

export default async function CampaignStatistikPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;

  const campaign = await prisma.emailCampaign.findUnique({
    where: { id },
    include: {
      recipients: { include: { contact: true } },
      links: true,
    },
  });

  if (!campaign) notFound();

  const recipients = campaign.recipients;
  const totalSent = recipients.filter((r) => r.status === "sent").length;
  const totalOpened = recipients.filter((r) => r.openedAt !== null).length;
  const totalClicked = recipients.filter((r) => r.clickedAt !== null).length;
  const totalBounced = recipients.filter((r) => r.bouncedAt !== null).length;
  const totalFailed = recipients.filter((r) => r.status === "failed").length;

  // Sent this week (for this campaign)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const sentThisWeek = recipients.filter(
    (r) => r.status === "sent" && r.sentAt && r.sentAt >= oneWeekAgo
  ).length;

  // Daily activity for this campaign (past 7 days)
  const activityData: { day: string; sent: number; open: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const end = new Date(d);
    end.setHours(23, 59, 59, 999);
    const dayName = d.toLocaleDateString("id-ID", { weekday: "short" });
    const sent = recipients.filter(
      (r) => r.status === "sent" && r.sentAt && r.sentAt >= d && r.sentAt <= end
    ).length;
    const open = recipients.filter(
      (r) => r.openedAt && r.openedAt >= d && r.openedAt <= end
    ).length;
    activityData.push({ day: dayName, sent, open });
  }

  // Top contacts (scoped to this campaign)
  const topRecipientsRaw = recipients
    .filter((r) => (r.openCount || 0) > 0)
    .sort((a, b) => (b.openCount || 0) - (a.openCount || 0))
    .slice(0, 4);
  const topContacts = topRecipientsRaw.map((r) => ({
    name: r.contact?.name || r.contact?.email || "Unknown",
    meta: r.contact?.email || "Unknown",
    stat: `${r.openCount || 0}x`,
  }));

  // Cold contacts — contacts in this campaign that never opened, with total campaigns missed
  const coldContactIds = recipients
    .filter((r) => r.status === "sent" && (r.openCount || 0) === 0)
    .map((r) => r.contactId);

  const coldRecipientsRaw = await prisma.campaignRecipient.groupBy({
    by: ["contactId"],
    _count: { _all: true },
    orderBy: { _count: { contactId: "desc" } },
    take: 4,
    where: { contactId: { in: coldContactIds }, openCount: 0, status: "sent" },
  });

  const coldContactData = await prisma.blastContact.findMany({
    where: { id: { in: coldRecipientsRaw.map((r) => r.contactId) } },
  });

  const coldContacts = coldRecipientsRaw.map((r) => {
    const contact = coldContactData.find((c) => c.id === r.contactId);
    return {
      name: contact?.name || contact?.email || "Unknown",
      meta: `${contact?.email} — ${r._count._all} campaign terlewat`,
    };
  });

  // Links
  const links = campaign.links
    .sort((a, b) => b.clicks - a.clicks)
    .map((l) => ({
      label: l.url.replace(/^https?:\/\//, "").split("/")[0],
      url: l.url,
      count: l.clicks,
    }));

  // Device breakdown
  const deviceMap: Record<string, number> = {};
  recipients.forEach((r) => {
    if (r.device) deviceMap[r.device] = (deviceMap[r.device] || 0) + 1;
  });
  const totalDeviceCount = Object.values(deviceMap).reduce((a, b) => a + b, 0);
  const devices =
    totalDeviceCount > 0
      ? Object.entries(deviceMap)
          .map(([label, count]) => ({
            label,
            pct: Math.round((count / totalDeviceCount) * 100),
          }))
          .sort((a, b) => b.pct - a.pct)
          .slice(0, 4)
      : [];

  // Daily trend for line chart (open rate & click rate per day, past 7 days)
  const dailyTrend = activityData.map((d) => {
    const daySent = d.sent;
    const dayOpen = d.open;
    // Find clicked for this same day window
    const dayIdx = activityData.indexOf(d);
    const i = 6 - dayIdx;
    const dayDate = new Date();
    dayDate.setDate(dayDate.getDate() - i);
    dayDate.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayDate);
    dayEnd.setHours(23, 59, 59, 999);
    const dayClicked = recipients.filter(
      (r) => r.clickedAt && r.clickedAt >= dayDate && r.clickedAt <= dayEnd
    ).length;
    return {
      day: d.day,
      openRate: daySent > 0 ? Math.round((dayOpen / daySent) * 100) : 0,
      clickRate: dayOpen > 0 ? Math.round((dayClicked / dayOpen) * 100) : 0,
    };
  });

  // Hourly heatmap
  const hourly = new Array(24).fill(0);
  recipients.forEach((r) => {
    if (r.openedAt) hourly[r.openedAt.getHours()]++;
  });

  return (
    <CampaignStatistikClient
      campaignName={campaign.internalName || campaign.subject}
      campaignStatus={campaign.status}
      sentThisWeek={sentThisWeek}
      totalSent={totalSent}
      totalOpened={totalOpened}
      totalClicked={totalClicked}
      totalBounced={totalBounced}
      totalFailed={totalFailed}
      activityData={activityData}
      dailyTrend={dailyTrend}
      topContacts={topContacts}
      coldContacts={coldContacts}
      links={links}
      devices={devices}
      hourly={hourly}
    />
  );
}
