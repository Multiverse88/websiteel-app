import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import EditCampaignForm from "./EditCampaignForm";
import DashboardHeader from "@/components/dashboard/ui/DashboardHeader";

export const dynamic = "force-dynamic";

export default async function EditCampaignPage({
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
  });

  if (!campaign) {
    redirect("/dashboard/email-blast/riwayat");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-[#111111] font-sans">
      <DashboardHeader
        title="Edit Campaign"
        description="Ubah detail dan konten email untuk campaign ini."
        backHref={`/dashboard/email-blast/riwayat/${id}`}
      />

      <main className="px-8 pb-24 max-w-4xl mx-auto w-full flex-grow">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <EditCampaignForm campaign={campaign} />
        </div>
      </main>
    </div>
  );
}
