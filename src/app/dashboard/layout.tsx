import React from "react";
import type { Metadata } from "next";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

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
    <div className="dashboard-shell h-screen overflow-hidden bg-gray-50 text-gray-900">
      <DashboardSidebar subscriberCount={subscriberCount} linksCount={linksCount} />
      <main className="ml-[80px] h-screen overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}

