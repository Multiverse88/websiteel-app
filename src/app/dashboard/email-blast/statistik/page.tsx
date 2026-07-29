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

  // Stats
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const [
    sentThisWeek,
    totalSent,
    totalOpened,
    totalClicked
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
    })
  ]);

  // Daily Stats for Chart (Past 7 Days)
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
          where: {
            status: "sent",
            sentAt: { gte: d, lte: end },
          }
        }),
        prisma.campaignRecipient.count({
          where: {
            openedAt: { gte: d, lte: end },
          }
        }),
        prisma.campaignRecipient.count({
          where: {
            clickedAt: { gte: d, lte: end },
          }
        })
      ]).then(([sent, opened, clicked]) => ({
        name: dayName,
        Terkirim: sent,
        Dibuka: opened,
        Diklik: clicked
      }))
    );
  }

  const chartData = await Promise.all(chartDataPromises);

  return (
    <StatistikClient
      sentThisWeek={sentThisWeek}
      totalSent={totalSent}
      totalOpened={totalOpened}
      totalClicked={totalClicked}
      chartData={chartData}
    />
  );
}
