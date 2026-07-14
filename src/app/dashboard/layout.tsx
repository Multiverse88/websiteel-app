import React from "react";
import type { Metadata } from "next";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: {
    default: "Dashboard Admin | EasyLegal",
    template: "%s | Dashboard EasyLegal",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch counts for badges
  const subscriberCount = await prisma.newsletterSubscriber.count({ where: { isActive: true } });
  const linksCount = await prisma.redirect.count();

  return (
    <div className="dashboard-shell flex min-h-screen bg-[#FAFAFA]">
      <DashboardSidebar subscriberCount={subscriberCount} linksCount={linksCount} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

