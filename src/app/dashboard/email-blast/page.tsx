import React from "react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSmtpSettingsAction } from "./actions";
import PremiumDashboardClient from "./PremiumDashboardClient";

export const dynamic = "force-dynamic";

export default async function EmailBlastDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const initialSmtpConfig = await getSmtpSettingsAction();

  // Fetch contacts count
  const activeCount = await prisma.blastContact.count({ where: { isActive: true } });
  const inactiveCount = await prisma.blastContact.count({ where: { isActive: false } });

  // Fetch campaigns count
  const campaignsCount = await prisma.emailCampaign.count();

  return (
    <PremiumDashboardClient
      activeCount={activeCount}
      inactiveCount={inactiveCount}
      campaignsCount={campaignsCount}
      initialSmtpConfig={initialSmtpConfig}
    />
  );
}
