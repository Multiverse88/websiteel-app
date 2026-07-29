import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import EditCampaignForm from "./EditCampaignForm";

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
    <div className="flex flex-col min-h-screen bg-[#FBFBFA] text-[#111111] font-sans">
      <header className="px-8 pt-16 pb-8 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <Link
            href={`/dashboard/email-blast/riwayat/${id}`}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#787774] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Batal
          </Link>
        </div>
        <h1 className="text-[32px] font-semibold tracking-tight text-[#111111] leading-tight">
          Edit Campaign
        </h1>
        <p className="text-[15px] text-[#787774] mt-2 leading-relaxed max-w-xl">
          Ubah detail dan konten email untuk campaign ini.
        </p>
      </header>

      <main className="px-8 pb-24 max-w-4xl mx-auto w-full flex-grow">
        <div className="bg-white rounded-[12px] shadow-sm border border-[#EAEAEA] p-8">
          <EditCampaignForm campaign={campaign} />
        </div>
      </main>
    </div>
  );
}
