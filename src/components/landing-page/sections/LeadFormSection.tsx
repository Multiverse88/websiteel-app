"use client";

import React, { useState } from 'react';
import { LeadFormSectionData } from '@/types/landing-page';

export default function LeadFormSection({ data, landingPageId }: { data: LeadFormSectionData; landingPageId?: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!landingPageId) {
      // In builder mode, we don't submit to DB
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 8000);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const nama = formData.get("nama") as string;
    const phone = formData.get("no_hp") as string;
    const email = formData.get("email") as string;
    const perusahaan = formData.get("perusahaan") as string;

    // Get current search params for UTM tracking
    const searchParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      if (key.startsWith("utm_")) {
        utmParams[key] = value;
      }
    }

    const { submitLandingPageLead } = await import("@/app/lp/actions");
    const result = await submitLandingPageLead({
      landingPageId,
      name: nama,
      phone,
      email,
      company: perusahaan,
      utmParams,
    });

    setLoading(false);

    if (result.success) {
      setSuccess(true);
      
      // Handle redirect if configured
      if (result.redirectSettings?.enabled && result.redirectSettings?.redirectUrl) {
        let destUrl = result.redirectSettings.redirectUrl;
        
        // Pass UTM parameters to redirect URL if enabled
        if (result.redirectSettings.passUtmParams && Object.keys(utmParams).length > 0) {
          try {
            const urlObj = new URL(destUrl);
            Object.entries(utmParams).forEach(([k, v]) => {
              urlObj.searchParams.set(k, v);
            });
            destUrl = urlObj.toString();
          } catch (err) {
            // Fallback if not a valid URL
            const connector = destUrl.includes("?") ? "&" : "?";
            destUrl = `${destUrl}${connector}${searchParams.toString()}`;
          }
        }
        
        const delay = (result.redirectSettings.delaySeconds || 0) * 1000;
        setTimeout(() => {
          window.location.href = destUrl;
        }, delay);
      }
    } else {
      setErrorMsg(result.error || "Gagal mengirim formulir.");
    }
  };

  return (
    <section className="bg-[#FFF5F5] py-16 sm:py-24 border-y border-red-100/50">
      <div className="max-w-2xl mx-auto px-4 sm:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-red-50 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{data.title}</h2>
          {data.subtitle && <p className="text-gray-600 mb-8">{data.subtitle}</p>}
          
          {success ? (
            <div className="p-4 bg-green-50 text-green-700 rounded-xl font-medium border border-green-200">
              Terima kasih! Data Anda telah berhasil dikirim.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {errorMsg && (
                <div className="p-3.5 bg-red-50 text-red-700 rounded-xl font-medium border border-red-100 text-sm">
                  {errorMsg}
                </div>
              )}
              {data.fields.includes('nama') && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap</label>
                  <input type="text" name="nama" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#990202]/20 focus:border-[#990202]" placeholder="Nama Anda" />
                </div>
              )}
              {data.fields.includes('email') && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Alamat Email</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#990202]/20 focus:border-[#990202]" placeholder="email@contoh.com" />
                </div>
              )}
              {data.fields.includes('no_hp') && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nomor WhatsApp</label>
                  <input type="tel" name="no_hp" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#990202]/20 focus:border-[#990202]" placeholder="0812xxxx" />
                </div>
              )}
              {data.fields.includes('perusahaan') && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Nama Perusahaan / Usaha</label>
                  <input type="text" name="perusahaan" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#990202]/20 focus:border-[#990202]" placeholder="PT / CV / Toko Anda" />
                </div>
              )}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#990202] text-white font-bold rounded-xl hover:bg-[#800000] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Mengirim...' : (data.buttonText || 'Kirim Sekarang')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
