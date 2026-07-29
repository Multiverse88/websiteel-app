import React from "react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import StatistikClient from "./StatistikClient";

export const dynamic = "force-dynamic";

export default async function StatistikPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // 1. Basic Stats
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [
    sentThisWeek,
    totalSent,
    totalOpened,
    totalClicked,
    totalBounced,
    totalFailed
  ] = await Promise.all([
    prisma.campaignRecipient.count({
      where: {
        status: "sent",
        sentAt: { gte: oneWeekAgo },
      }
    }),
    prisma.campaignRecipient.count({
      where: { status: "sent" }
    }),
    prisma.campaignRecipient.count({
      where: { openedAt: { not: null } }
    }),
    prisma.campaignRecipient.count({
      where: { clickedAt: { not: null } }
    }),
    prisma.campaignRecipient.count({
      where: { bouncedAt: { not: null } }
    }),
    prisma.campaignRecipient.count({
      where: { status: "failed" }
    })
  ]);

  // 2. Daily Stats for Chart (Past 7 Days)
  const chartDataPromises = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    const end = new Date(d);
    end.setHours(23, 59, 59, 999);
    const dayName = d.toLocaleDateString("id-ID", { weekday: 'short' });
    
    chartDataPromises.push(
      Promise.all([
        prisma.campaignRecipient.count({
          where: { status: "sent", sentAt: { gte: d, lte: end } }
        }),
        prisma.campaignRecipient.count({
          where: { openedAt: { gte: d, lte: end } }
        })
      ]).then(([sent, opened]) => ({
        day: dayName,
        sent: sent,
        open: opened
      }))
    );
  }
  const activityData = await Promise.all(chartDataPromises);

  // 3. Campaigns Trend & Ranking (Latest 6 non-template campaigns)
  const recentCampaigns = await prisma.emailCampaign.findMany({
    where: { isTemplate: false },
    orderBy: { createdAt: "desc" },
    take: 6,
    include: {
      _count: {
        select: {
          recipients: { where: { status: "sent" } }
        }
      },
      recipients: {
        select: { openedAt: true, clickedAt: true, status: true }
      }
    }
  });

  const campaignsTrend = recentCampaigns.map(c => {
    const sentCount = c._count.recipients;
    const openedCount = c.recipients.filter(r => r.openedAt !== null).length;
    const clickedCount = c.recipients.filter(r => r.clickedAt !== null).length;
    return {
      name: c.internalName || c.subject.substring(0, 15),
      brand: 'EasyLegal', // Static for now, or could be parsed from subject
      status: c.status,
      sent: sentCount,
      open: sentCount > 0 ? Math.round((openedCount / sentCount) * 100) : 0,
      click: openedCount > 0 ? Math.round((clickedCount / openedCount) * 100) : 0
    };
  }).reverse(); // Reverse for trend line (oldest to newest of the 6)

  // Reverse back for table (newest first)
  const campaignRows = [...campaignsTrend].reverse();

  // 4. Top Contacts
  const topRecipientsRaw = await prisma.campaignRecipient.groupBy({
    by: ['contactId'],
    _sum: { openCount: true },
    orderBy: { _sum: { openCount: 'desc' } },
    take: 4,
    where: { openCount: { gt: 0 } }
  });
  
  const topContactIds = topRecipientsRaw.map(r => r.contactId);
  const topContactsData = await prisma.blastContact.findMany({
    where: { id: { in: topContactIds } }
  });
  const topContacts = topRecipientsRaw.map(r => {
    const contact = topContactsData.find(c => c.id === r.contactId);
    return {
      name: contact?.name || contact?.email || "Unknown",
      meta: contact?.email || "Unknown",
      stat: `${r._sum.openCount}x`
    };
  });

  // 5. Cold Contacts (Received many but opened 0)
  const coldRecipientsRaw = await prisma.campaignRecipient.groupBy({
    by: ['contactId'],
    _count: { _all: true },
    orderBy: { _count: { contactId: 'desc' } },
    take: 4,
    where: { openCount: 0, status: "sent" }
  });
  const coldContactIds = coldRecipientsRaw.map(r => r.contactId);
  const coldContactsData = await prisma.blastContact.findMany({
    where: { id: { in: coldContactIds } }
  });
  const coldContacts = coldRecipientsRaw.map(r => {
    const contact = coldContactsData.find(c => c.id === r.contactId);
    return {
      name: contact?.name || contact?.email || "Unknown",
      meta: `${contact?.email} — ${r._count._all} campaign terlewat`
    };
  });

  // 6. Top Links
  const topLinksData = await prisma.campaignLink.findMany({
    orderBy: { clicks: 'desc' },
    take: 4
  });
  const links = topLinksData.map(l => ({
    label: l.url.replace(/^https?:\/\//, '').split('/')[0],
    url: l.url,
    count: l.clicks
  }));
  // Fallback if no links
  if (links.length === 0) {
    links.push({ label: '-', url: 'Belum ada data', count: 0 });
  }

  // 7. Device Breakdown
  const deviceGroups = await prisma.campaignRecipient.groupBy({
    by: ['device'],
    _count: { _all: true },
    where: { device: { not: null } }
  });
  
  const totalDeviceCount = deviceGroups.reduce((acc, curr) => acc + curr._count._all, 0);
  let devices = [];
  if (totalDeviceCount > 0) {
    devices = deviceGroups.map(d => ({
      label: d.device || 'Lainnya',
      pct: Math.round((d._count._all / totalDeviceCount) * 100)
    })).sort((a, b) => b.pct - a.pct).slice(0, 4);
  } else {
    devices = [
      { label: 'Gmail', pct: 0 },
      { label: 'Lainnya', pct: 0 }
    ];
  }

  // 8. Hourly Heatmap
  // For SQLite/Postgres without complex EXTRACT, we can fetch all openedAt dates and compute in JS.
  const allOpened = await prisma.campaignRecipient.findMany({
    where: { openedAt: { not: null } },
    select: { openedAt: true }
  });
  const hourly = new Array(24).fill(0);
  allOpened.forEach(r => {
    if (r.openedAt) {
      const hour = r.openedAt.getHours(); // Use server timezone, assuming GMT+7 equivalent or consistent
      hourly[hour]++;
    }
  });

  return (
    <StatistikClient
      sentThisWeek={sentThisWeek}
      totalSent={totalSent}
      totalOpened={totalOpened}
      totalClicked={totalClicked}
      totalBounced={totalBounced}
      totalFailed={totalFailed}
      activityData={activityData}
      campaignsTrend={campaignsTrend}
      campaignRows={campaignRows}
      topContacts={topContacts}
      coldContacts={coldContacts}
      links={links}
      devices={devices}
      hourly={hourly}
    />
  );
}
