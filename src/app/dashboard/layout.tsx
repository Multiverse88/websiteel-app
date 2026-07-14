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
  // Fetch counts for badges concurrently
  const [subscriberCount, linksCount] = await Promise.all([
    prisma.newsletterSubscriber.count({ where: { isActive: true } }),
    prisma.redirect.count(),
  ]);

  return (
    <div className="dashboard-shell flex h-screen overflow-hidden bg-[#FAFAFA]">
      <DashboardSidebar subscriberCount={subscriberCount} linksCount={linksCount} />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

