"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export function ArticleControls({
  totalItems,
  currentPage,
  pageSize,
}: {
  totalItems: number;
  currentPage: number;
  pageSize: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.set("page", "1"); // Reset to page 1 on sort change
    router.push(`?${params.toString()}`);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", e.target.value);
    params.set("page", "1"); // Reset to page 1 on limit change
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const currentSort = searchParams.get("sort") || "newest";
  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-6 bg-white border-b border-gray-100">
      {/* Left: Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
          <Filter className="w-5 h-5 text-gray-500" />
          <span className="text-[15px] font-semibold text-gray-700">Urutkan:</span>
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="bg-transparent border-none text-[15px] font-bold text-gray-900 focus:ring-0 cursor-pointer outline-none pr-8 py-1"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="most_viewed">Paling Banyak Dibaca</option>
            <option value="least_viewed">Paling Sedikit Dibaca</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
          <span className="text-[15px] font-semibold text-gray-700">Tampilkan:</span>
          <select
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            className="bg-transparent border-none text-[15px] font-bold text-gray-900 focus:ring-0 cursor-pointer outline-none pr-8 py-1"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
        </div>
      </div>

      {/* Right: Pagination Info & Buttons */}
      <div className="flex items-center gap-5">
        <div className="text-[15px] font-semibold text-gray-500">
          Halaman <span className="text-gray-900">{currentPage}</span> dari{" "}
          <span className="text-gray-900">{totalPages}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
