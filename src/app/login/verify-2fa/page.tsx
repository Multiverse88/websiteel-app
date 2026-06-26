"use client";

import React, { useState, useTransition } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { verifyLogin2FA } from "./actions";
import Link from "next/link";

export default function Verify2FAPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await verifyLogin2FA(null, formData);
      if (result && result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-100 mb-4">
            <ShieldCheck className="w-7 h-7 text-[#990202]" />
          </div>
          <h1 className="font-inter text-[28px] font-extrabold text-gray-950">
            Verifikasi 2FA
          </h1>
          <p className="text-[14px] text-gray-500 mt-2">
            Masukkan kode 6 digit dari Google Authenticator
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-[#990202] font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 6-digit code */}
            <div className="space-y-2">
              <label htmlFor="token" className="text-[13.5px] font-extrabold text-gray-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Kode Authenticator
              </label>
              <input
                id="token"
                name="token"
                type="text"
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]*"
                autoComplete="one-time-code"
                required
                placeholder="000000"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[18px] tracking-[0.3em] text-center font-semibold placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all text-gray-950"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 text-[15px] shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Verifikasi</span>
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-[13.5px] text-gray-500 hover:text-[#990202] transition-colors font-medium"
            >
              Kembali ke login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
