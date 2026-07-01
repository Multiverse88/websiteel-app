import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Home, MailX, CheckCircle2, AlertTriangle } from "lucide-react";
import { prisma } from "@/lib/db";
import { unsubscribeNewsletter } from "../actions";

type Props = {
  searchParams: Promise<{ email?: string; unsubscribed?: string }>;
};

export default async function UnsubscribePage({ searchParams }: Props) {
  const { email, unsubscribed } = await searchParams;
  let status: "confirm" | "success" | "not-found" | "missing" = "missing";

  if (email) {
    try {
      const subscriber = await prisma.newsletterSubscriber.findUnique({
        where: { email: email.toLowerCase().trim() },
      });

      if (subscriber) {
        if (unsubscribed === "true") {
          status = "success";
        } else {
          status = "confirm";
        }
      } else {
        status = "not-found";
      }
    } catch {
      status = "not-found";
    }
  }

  async function handleUnsubscribe(formData: FormData) {
    "use server";
    const emailToUnsubscribe = formData.get("email") as string;
    if (emailToUnsubscribe) {
      await unsubscribeNewsletter(emailToUnsubscribe);
      redirect(`/newsletter/unsubscribe?unsubscribed=true&email=${encodeURIComponent(emailToUnsubscribe)}`);
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
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[14px] rounded-xl shadow-sm hover:shadow-md transition-all w-full justify-center"
              >
                <Home className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
            </>
          ) : status === "confirm" ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-5">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="font-heading text-[24px] font-extrabold text-gray-950 mb-3">
                Konfirmasi Batal
              </h1>
              <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
                Apakah Anda yakin ingin berhenti berlangganan newsletter dari EasyLegal untuk email <strong className="text-gray-900">{email}</strong>?
              </p>
              <form action={handleUnsubscribe} className="space-y-3">
                <input type="hidden" name="email" value={email} />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[14px] rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  Ya, Batalkan Langganan
                </button>
                <Link
                  href="/"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-[14px] rounded-xl border border-gray-200 transition-all"
                >
                  Tidak, Tetap Berlangganan
                </Link>
              </form>
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
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[14px] rounded-xl shadow-sm hover:shadow-md transition-all w-full justify-center"
              >
                <Home className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
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
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#990202] hover:bg-[#800000] text-white font-bold text-[14px] rounded-xl shadow-sm hover:shadow-md transition-all w-full justify-center"
              >
                <Home className="w-4 h-4" />
                Kembali ke Beranda
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
