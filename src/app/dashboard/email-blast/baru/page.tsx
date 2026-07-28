import React from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { createCampaignAction } from "../actions";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

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
            <form action={async (formData) => {
              "use server";
              await createCampaignAction(formData);
            }} className="space-y-6">
              
              {/* Subject */}
              <div>
                <label className="block text-[14px] font-bold text-gray-900 mb-2">
                  Subjek Email
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Contoh: Promo Spesial Pendaftaran Merek Bulan Ini!"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[16px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828] transition-colors"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-[14px] font-bold text-gray-900 mb-2">
                  Isi Email (Mendukung HTML dasar)
                </label>
                <textarea
                  name="bodyHtml"
                  required
                  rows={10}
                  placeholder="Tulis pesan email Anda di sini..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[16px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828] transition-colors font-sans"
                ></textarea>
                <p className="text-[14px] text-gray-500 mt-2">
                  Anda bisa menggunakan tag HTML seperti &lt;b&gt;, &lt;i&gt;, &lt;br&gt;, atau &lt;a href="..."&gt; untuk mengatur format teks.
                </p>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-[14px] font-bold text-gray-900 mb-2">
                  Jadwal Pengiriman (Opsional)
                </label>
                <input
                  type="datetime-local"
                  name="scheduledAt"
                  className="w-full sm:w-[300px] px-4 py-3 border border-gray-200 rounded-xl text-[16px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828] transition-colors"
                />
                <p className="text-[14px] text-gray-500 mt-2">
                  Kosongkan jika ingin segera dikirim (status akan menjadi Draft dan bisa dikirim manual, atau ubah status ke Processing jika ada worker).
                </p>
              </div>

              {/* Recipient Choice */}
              <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <input
                  type="checkbox"
                  id="sendToAll"
                  name="sendToAll"
                  defaultChecked
                  className="w-5 h-5 rounded text-[#d62828] focus:ring-[#d62828] cursor-pointer"
                />
                <label htmlFor="sendToAll" className="text-[16px] font-bold text-gray-900 cursor-pointer select-none">
                  Kirim ke semua Kontak Blast aktif
                </label>
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[16px] font-bold bg-[#d62828] text-white hover:bg-[#b20112] shadow-md transition-all"
                >
                  <Send className="w-5 h-5" />
                  Simpan Campaign
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
