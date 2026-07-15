"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { ShieldCheck, Loader2 } from "lucide-react";
import { initiateSetup, completeSetup } from "./actions";
import Link from "next/link";

export default function Setup2FAPage() {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [setupError, setSetupError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchSetup = async () => {
      const result = await initiateSetup();
      if ("error" in result && result.error) {
        setError(result.error);
      } else {
        if ("qrCodeDataUrl" in result && result.qrCodeDataUrl) {
          setQrCodeDataUrl(result.qrCodeDataUrl);
        }
      }
      setLoadingKey(false);
    };
    fetchSetup();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSetupError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await completeSetup(null, formData);
      if (result && result.error) {
        setSetupError(result.error);
      }
    });
  };

  if (loadingKey) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#990202] animate-spin" />
          <p className="text-[14px] text-gray-500 font-medium">Menyiapkan 2FA...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 text-center">
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-[#990202] font-semibold">
              {error}
            </div>
            <Link
              href="/login"
              className="text-[14px] text-[#990202] hover:text-[#800000] transition-colors font-semibold"
            >
              Kembali ke login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-100 mb-4">
            <ShieldCheck className="w-7 h-7 text-[#990202]" />
          </div>
          <h1 className="font-heading text-[28px] font-extrabold text-gray-950">
            Setup 2FA
          </h1>
          <p className="text-[14px] text-gray-500 mt-2">
            Atur keamanan dua faktor untuk akun Anda
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8">
          {/* Instructions */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-[14px] text-amber-800 font-semibold mb-2">
              Langkah-langkah:
            </p>
            <ol className="text-[14px] text-amber-700 space-y-1.5 list-decimal list-inside">
              <li>Buka aplikasi Google Authenticator</li>
              <li>Pilih &quot;Tambah akun&quot; atau &quot;+&quot;</li>
              <li>Pilih &quot;Pindai kode QR&quot; (Scan QR Code)</li>
              <li>Arahkan kamera ke QR Code di bawah</li>
            </ol>
          </div>

          {/* QR Code */}
          {qrCodeDataUrl && (
            <div className="mb-6 flex flex-col items-center justify-center">
              <div className="bg-white p-3 shadow-md border border-black/[0.04] rounded-2xl shadow-sm">
                <Image
                  src={qrCodeDataUrl}
                  alt="2FA QR Code"
                  width={192}
                  height={192}
                />
              </div>
              <p className="text-[14px] text-gray-400 mt-2 text-center">
                Scan QR Code ini menggunakan Google Authenticator
              </p>
            </div>
          )}

          {setupError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-[14px] text-[#990202] font-semibold">
              {setupError}
            </div>
          )}

          {/* Verification Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="token" className="text-[14px] font-extrabold text-gray-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Kode Verifikasi
              </label>
              <p className="text-[14px] text-gray-500">
                Masukkan kode 6 digit dari Google Authenticator untuk mengaktifkan 2FA
              </p>
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
                <span>Aktifkan 2FA</span>
              )}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-[14px] text-gray-500 hover:text-[#990202] transition-colors font-medium"
            >
              Kembali ke login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
