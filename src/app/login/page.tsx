"use client";

import React, { useState, useTransition } from "react";
import { Lock, Mail, Loader2 } from "lucide-react";
import { loginAction } from "./actions";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await loginAction(null, formData);
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
            <Lock className="w-7 h-7 text-[#990202]" />
          </div>
          <h1 className="font-heading text-[28px] font-extrabold text-gray-950">
            Admin Login
          </h1>
          <p className="text-[16px] text-gray-500 mt-2">
            Masuk ke panel admin EasyLegal
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-[16px] text-[#990202] font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@easylegal.id"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Masukkan password"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 text-[16px] shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
