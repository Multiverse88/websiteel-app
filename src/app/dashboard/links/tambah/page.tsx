// src/app/dashboard/links/tambah/page.tsx
"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Link2, Loader2, Check } from "lucide-react";
import { createLink } from "./actions";

export default function TambahLinkPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [slug, setSlug] = useState("");
  const [destination, setDestination] = useState("");

  const handleSlugChange = (value: string) => {
    // Auto lowercase, replace spaces with dashes, strip special chars
    setSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const finalSlug = slug.trim() || Math.random().toString(36).substring(2, 8);
    let dest = destination.trim();
    if (dest && !dest.startsWith("http://") && !dest.startsWith("https://")) {
      dest = "https://" + dest;
    }
    if (!dest) {
      setError("URL tujuan harus diisi!");
      return;
    }
    startTransition(async () => {
      const result = await createLink(finalSlug, dest);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setSlug("");
        setDestination("");
      }
    });
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
        <section className="flex-grow flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-12 text-center max-w-md mx-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-[18px] font-extrabold text-gray-900 mb-2">
              Link Berhasil Dibuat!
            </h3>
            <p className="text-[14px] text-gray-500 mb-6">
              Link redirect sudah siap digunakan.
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/dashboard/links/tambah"
                className="px-5 py-2.5 bg-[#990202] text-white font-bold text-[14px] rounded-xl hover:bg-[#800000] transition-all"
              >
                Buat Lagi
              </Link>
              <Link
                href="/dashboard/links"
                className="px-5 py-2.5 bg-white text-gray-700 font-bold text-[14px] rounded-xl border border-gray-200 hover:border-gray-300 transition-all"
              >
                Kembali ke Daftar
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard/links"
              className="inline-flex items-center gap-1.5 text-[14px] font-bold text-gray-500 hover:text-[#990202] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Redirect Links
            </Link>
          </div>
          <h1 className="font-heading text-[30px] sm:text-[36px] font-extrabold text-gray-950 leading-tight tracking-tight">
            Buat Redirect Link Baru
          </h1>
        </div>
      </section>

      {/* FORM */}
      <section className="py-10 flex-grow">
        <div className="max-w-[640px] mx-auto px-6 sm:px-8">
          <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-6 sm:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-[#990202] font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Slug */}
              <div className="space-y-2">
                <label className="text-[14px] font-extrabold text-gray-900 flex items-center gap-1.5">
                  Slug Link <span className="text-gray-400 font-medium text-[14px]">(kosongi untuk random)</span>
                </label>
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <span className="text-[14px] text-gray-400 font-mono font-medium whitespace-nowrap">
                    {typeof window !== "undefined" ? window.location.origin : ""}/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="daftar-klien"
                    className="flex-1 bg-transparent border-none outline-none text-[14.5px] font-medium text-gray-950 placeholder-gray-400 p-0"
                  />
                </div>
                <p className="text-[14px] text-gray-400">
                  Hanya huruf kecil, angka, dan tanda strip (-).
                </p>
              </div>

              {/* Destination */}
              <div className="space-y-2">
                <label className="text-[14px] font-extrabold text-gray-900">
                  URL Tujuan <span className="text-[#990202]">*</span>
                </label>
                <input
                  type="url"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  required
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 text-[15px] shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Menyimpan...</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-5 h-5" />
                    <span>Buat Redirect Link</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
