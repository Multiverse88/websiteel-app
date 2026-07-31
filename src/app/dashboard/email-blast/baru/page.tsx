import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import EmailBlastForm from "./EmailBlastForm";
import { prisma } from "@/lib/db";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";

import { getEmailBlastTemplateAction, getContactsWithEngagement } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewEmailBlastPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const defaultHeader = await getEmailBlastTemplateAction("header");
  const defaultFooter = await getEmailBlastTemplateAction("footer");

  const segments = await prisma.contactSegment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { contacts: true } } }
  });

  const contactsWithEngagement = await getContactsWithEngagement();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-[#111111] font-sans">
      {/* HEADER */}
      <DashboardHeader
        title="Buat Campaign Baru"
        description="Tulis konten email, gunakan merge tags, dan pilih segmen penerima Anda."
        backHref="/dashboard/email-blast"
      />

      {/* CONTENT */}
      <main className="px-8 pb-24 max-w-[1400px] mx-auto w-full flex-grow">
        <EmailBlastForm initialHeader={defaultHeader} initialFooter={defaultFooter} segments={segments} contactsWithEngagement={contactsWithEngagement} />
      </main>
    </div>
  );
}
