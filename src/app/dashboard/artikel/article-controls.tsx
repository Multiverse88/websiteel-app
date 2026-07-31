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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-5 bg-white border-b border-[var(--color-border)]">
      {/* Left: Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[var(--color-border)] rounded-[8px] px-4 py-2 shadow-subtle">
          <Filter className="w-4 h-4 text-[var(--color-text-muted)]" />
          <span className="text-[14px] font-semibold text-[var(--color-text-muted)]">Urutkan:</span>
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="bg-transparent border-none text-[14px] font-semibold text-[var(--color-text-main)] focus:ring-0 cursor-pointer outline-none pr-6 py-1"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="most_viewed">Paling Banyak Dibaca</option>
            <option value="least_viewed">Paling Sedikit Dibaca</option>
          </select>
        </div>

        <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[var(--color-border)] rounded-[8px] px-4 py-2 shadow-subtle">
          <span className="text-[14px] font-semibold text-[var(--color-text-muted)]">Tampilkan:</span>
          <select
            value={pageSize.toString()}
            onChange={handlePageSizeChange}
            className="bg-transparent border-none text-[14px] font-semibold text-[var(--color-text-main)] focus:ring-0 cursor-pointer outline-none pr-6 py-1"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
          </select>
        </div>
      </div>

      {/* Right: Pagination Info & Buttons */}
      <div className="flex items-center gap-4">
        <div className="text-[14px] font-medium text-[var(--color-text-muted)]">
          Halaman <span className="font-semibold text-[var(--color-text-main)]">{currentPage}</span> dari{" "}
          <span className="font-semibold text-[var(--color-text-main)]">{totalPages}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:bg-[#F8FAFC] hover:text-[var(--color-text-main)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-subtle"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] hover:bg-[#F8FAFC] hover:text-[var(--color-text-main)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-subtle"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
