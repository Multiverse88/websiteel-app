"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Link2, Loader2 } from "lucide-react";
import { updateLink } from "./actions";

export default function EditLinkForm({ id, slug: initialSlug, destination: initialDest }: { id: string; slug: string; destination: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState(initialSlug);
  const [destination, setDestination] = useState(initialDest);

  const handleSlugChange = (value: string) => {
    setSlug(
      value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    let dest = destination.trim();
    if (dest && !dest.startsWith("http://") && !dest.startsWith("https://")) {
      dest = "https://" + dest;
    }

    startTransition(async () => {
      const result = await updateLink(id, slug, dest);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard/links");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-[16px] text-[#990202] font-semibold">
          {error}
        </div>
      )}

      {/* Slug */}
      <div className="space-y-2">
        <label className="text-[16px] font-extrabold text-gray-900">
          Slug Link
        </label>
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
          <span className="text-[16px] text-gray-400 font-mono font-medium whitespace-nowrap">/</span>
          <input
            type="text"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            required
            className="flex-1 bg-transparent border-none outline-none text-[16px] font-medium text-gray-950 p-0"
          />
        </div>
      </div>

      {/* Destination */}
      <div className="space-y-2">
        <label className="text-[16px] font-extrabold text-gray-900">
          URL Tujuan <span className="text-[#990202]">*</span>
        </label>
        <input
          type="url"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 text-[16px] shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        {isPending ? (
          <><Loader2 className="w-5 h-5 animate-spin" /><span>Menyimpan...</span></>
        ) : (
          <><Link2 className="w-5 h-5" /><span>Simpan Perubahan</span></>
        )}
      </button>
    </form>
  );
}
