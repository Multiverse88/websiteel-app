"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="id">
      <body className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto text-center px-6">
          {/* Logo */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#990202] flex items-center justify-center mb-6 shadow-lg">
            <span className="text-white text-2xl font-black tracking-tight">EL</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Terjadi Kesalahan
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Maaf, terjadi kesalahan yang tidak terduga. Tim teknis kami sudah mendapat notifikasi dan akan segera memperbaikinya.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-[#990202] text-white font-semibold rounded-xl hover:bg-[#7a0101] transition-colors shadow-md"
            >
              Coba Lagi
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
