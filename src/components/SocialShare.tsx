"use client";

import React, { useState, useEffect } from "react";
import { Link2, Check } from "lucide-react";

export default function SocialShare({ title }: { title: string }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const currentUrl = mounted && typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="bg-[#FAFAFA] border border-gray-100 rounded-[20px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-[16px] text-gray-500">
        Artikel ini bermanfaat? <strong className="text-gray-900 font-extrabold">Share ke teman bisnismu</strong>
      </div>
      <div className="flex items-center gap-2">
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#990202] hover:bg-[#990202] hover:text-white hover:border-[#990202] transition-colors shadow-sm"
          aria-label="Share on WhatsApp"
        >
          <span className="w-[18px] h-[18px] bg-current" style={{ WebkitMask: 'url(https://api.iconify.design/mdi:whatsapp.svg) center/cover', mask: 'url(https://api.iconify.design/mdi:whatsapp.svg) center/cover' }} />
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#990202] hover:bg-[#990202] hover:text-white hover:border-[#990202] transition-colors shadow-sm"
          aria-label="Share on Facebook"
        >
          <span className="w-[18px] h-[18px] bg-current" style={{ WebkitMask: 'url(https://api.iconify.design/mdi:facebook.svg) center/cover', mask: 'url(https://api.iconify.design/mdi:facebook.svg) center/cover' }} />
        </a>

        {/* X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#990202] hover:bg-[#990202] hover:text-white hover:border-[#990202] transition-colors shadow-sm"
          aria-label="Share on X"
        >
          <span className="w-[16px] h-[16px] bg-current" style={{ WebkitMask: 'url(https://api.iconify.design/ri:twitter-x-fill.svg) center/cover', mask: 'url(https://api.iconify.design/ri:twitter-x-fill.svg) center/cover' }} />
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[#990202] hover:bg-[#990202] hover:text-white hover:border-[#990202] transition-colors shadow-sm"
          aria-label="Share on LinkedIn"
        >
          <span className="w-[19px] h-[19px] bg-current" style={{ WebkitMask: 'url(https://api.iconify.design/mdi:linkedin.svg) center/cover', mask: 'url(https://api.iconify.design/mdi:linkedin.svg) center/cover' }} />
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors shadow-sm ${
            copied
              ? "bg-emerald-50 border-emerald-200 text-emerald-600"
              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
          aria-label="Copy Link"
        >
          {copied ? <Check className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
