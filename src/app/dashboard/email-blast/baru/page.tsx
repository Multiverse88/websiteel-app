import React from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { createCampaignAction } from "../actions";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import EmailBlastForm from "./EmailBlastForm";

export const dynamic = "force-dynamic";

export default async function NewEmailBlastPage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/email-blast"
              className="inline-flex items-center gap-1.5 text-[16px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Email Blast
            </Link>
          </div>
          <div>
            <h1 className="font-heading text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
              Buat Campaign Baru
            </h1>
            <p className="text-[16px] text-gray-500 mt-1">
              Tulis email dan jadwalkan pengiriman ke daftar kontak Anda.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-10 flex-grow">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-8">
            <EmailBlastForm />
          </div>
        </div>
      </section>
    </div>
  );
}
