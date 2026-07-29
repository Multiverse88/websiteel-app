import React from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import EmailBlastForm from "./EmailBlastForm";
import { prisma } from "@/lib/db";

import { getEmailBlastTemplateAction } from "../actions";

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

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFA] text-[#111111] font-sans">
      {/* HEADER */}
      <header className="px-8 pt-16 pb-8 max-w-[1400px] mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/dashboard/email-blast"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#787774] hover:text-[#111111] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>
        <h1 className="text-[32px] font-semibold tracking-tight text-[#111111] leading-tight">
          Buat Campaign Baru
        </h1>
        <p className="text-[15px] text-[#787774] mt-2 leading-relaxed max-w-xl">
          Tulis konten email, gunakan merge tags, dan pilih segmen penerima Anda.
        </p>
      </header>

      {/* CONTENT */}
      <main className="px-8 pb-24 max-w-[1400px] mx-auto w-full flex-grow">
        <EmailBlastForm initialHeader={defaultHeader} initialFooter={defaultFooter} segments={segments} />
      </main>
    </div>
  );
}
