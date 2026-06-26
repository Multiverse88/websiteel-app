"use client";

import React, { useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { subscribeNewsletter } from "@/app/newsletter/actions";

export default function NewsletterWidget() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const result = await subscribeNewsletter(email);

      if (result.success) {
        setStatus("success");
        setMessage(result.message || "Berhasil terdaftar!");
        setEmail("");
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(result.error || "Terjadi kesalahan.");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 4000);
      }
    } catch {
      setStatus("error");
      setMessage("Gagal menghubungi server. Coba lagi.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 4000);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-black/[0.04] p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Mail Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#FFF5F5] border border-red-100/50 flex items-center justify-center mb-5">
        <Mail className="w-5 h-5 text-[#990202]" />
      </div>

      {/* Heading */}
      <h3 className="text-[17px] font-extrabold text-gray-950 leading-snug mb-2">
        Update legalitas tiap minggu
      </h3>
      <p className="text-[13px] text-gray-500 leading-relaxed mb-6">
        Subscribe newsletter EasyLegal — dapat insight regulasi bisnis terbaru langsung ke inbox.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@kamu.com"
          required
          disabled={status === "loading" || status === "success"}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-[#FAFAFA] text-[14px] text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#990202]/20 focus:border-[#990202] transition-all disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`w-full py-3 rounded-xl text-[14px] font-extrabold transition-all duration-200 flex items-center justify-center gap-2 ${
            status === "success"
              ? "bg-emerald-600 text-white cursor-default"
              : status === "loading"
              ? "bg-[#990202]/80 text-white cursor-wait"
              : "bg-[#990202] hover:bg-[#800000] text-white hover:shadow-md hover:-translate-y-0.5"
          }`}
        >
          {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === "success" && <CheckCircle2 className="w-4 h-4" />}
          {status === "loading"
            ? "Mendaftarkan..."
            : status === "success"
            ? "Berhasil Terdaftar!"
            : "Subscribe Gratis"}
        </button>
      </form>

      {/* Status Message */}
      {message && (
        <div
          className={`flex items-start gap-2 mt-3 p-3 rounded-lg text-[12.5px] font-medium leading-relaxed ${
            status === "success"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              : "bg-red-50 text-red-700 border border-red-200/60"
          }`}
        >
          {status === "success" ? (
            <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-[11.5px] text-gray-500 mt-3.5 text-center leading-relaxed">
        Tidak ada spam. Unsubscribe kapan saja.
      </p>
    </div>
  );
}
