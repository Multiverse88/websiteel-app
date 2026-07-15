"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center justify-center px-4 py-2.5 border font-bold text-[14px] rounded-xl transition-all duration-200 shadow-sm ${
        copied
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-gray-200 text-gray-700 hover:text-[#990202] hover:border-red-200 hover:bg-[#FFF5F5]"
      }`}
      type="button"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1.5" />
          <span>Tersalin!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-1.5" />
          <span>Bagikan Artikel</span>
        </>
      )}
    </button>
  );
}
