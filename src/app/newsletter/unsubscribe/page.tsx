import React from "react";
import Link from "next/link";
import { Home, MailX, CheckCircle2 } from "lucide-react";
import { prisma } from "@/lib/db";

type Props = {
  searchParams: Promise<{ email?: string }>;
};

export default async function UnsubscribePage({ searchParams }: Props) {
  const { email } = await searchParams;
  let status: "success" | "not-found" | "missing" = "missing";

  if (email) {
    try {
      const subscriber = await prisma.newsletterSubscriber.findUnique({
        where: { email: email.toLowerCase().trim() },
      });

      if (subscriber && subscriber.isActive) {
        await prisma.newsletterSubscriber.update({
          where: { email: email.toLowerCase().trim() },
          data: { isActive: false },
        });
        status = "success";
      } else if (subscriber) {
        status = "success"; // Already unsubscribed
      } else {
        status = "not-found";
      }
    } catch {
      status = "not-found";
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <div className="flex-grow flex items-center justify-center py-20 px-6">
        <div className="max-w-[440px] w-full bg-white rounded-2xl shadow-md border border-black/[0.04] p-8 sm:p-10 text-center shadow-sm">
          {status === "success" ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="font-heading text-[24px] font-extrabold text-gray-950 mb-3">
                Berhasil Unsubscribe
              </h1>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                Email <strong className="text-gray-900">{email}</strong> tidak akan menerima newsletter lagi.
                Anda dapat subscribe ulang kapan saja.
              </p>
            </>
          ) : status === "not-found" ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
                <MailX className="w-8 h-8 text-[#990202]" />
              </div>
              <h1 className="font-heading text-[24px] font-extrabold text-gray-950 mb-3">
                Email Tidak Ditemukan
              </h1>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                Email yang Anda masukkan tidak terdaftar di newsletter kami.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
                <MailX className="w-8 h-8 text-[#990202]" />
              </div>
              <h1 className="font-heading text-[24px] font-extrabold text-gray-950 mb-3">
                Link Tidak Valid
              </h1>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                Link unsubscribe ini tidak valid. Pastikan Anda menggunakan link dari email newsletter.
              </p>
            </>
          )}

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[14px] rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
