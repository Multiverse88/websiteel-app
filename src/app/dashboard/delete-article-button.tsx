"use client";

import React, { useState, useTransition } from "react";
import { Trash2, Loader2, X } from "lucide-react";
import { deleteArticle } from "./actions";

type DeleteArticleButtonProps = {
  articleId: string;
  articleTitle: string;
};

export default function DeleteArticleButton({ articleId, articleTitle }: DeleteArticleButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteArticle(articleId);
      if (result && result.error) {
        setError(result.error);
        setShowConfirm(false);
      }
      // If success, the page will revalidate and refresh
    });
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex p-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[#FEF2F2] rounded-[8px] transition-colors"
        title="Hapus artikel"
      >
        <Trash2 className="w-4 h-4 text-current" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isPending && setShowConfirm(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-[var(--color-surface)] rounded-[8px] shadow-large border border-[var(--color-border)] max-w-md w-full mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
              <h3 className="text-xl font-semibold text-[var(--color-text-main)]">
                Hapus Artikel
              </h3>
              <button
                onClick={() => !isPending && setShowConfirm(false)}
                className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[#F8FAFC] rounded-[8px] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              {error ? (
                <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-[8px] text-[14px] text-[var(--color-error)] font-semibold">
                  {error}
                </div>
              ) : (
                <>
                  <p className="text-[15px] text-[var(--color-text-muted)] leading-relaxed">
                    Apakah Anda yakin ingin menghapus artikel berikut?
                  </p>
                  <p className="mt-2 text-[15px] font-semibold text-[var(--color-text-main)] line-clamp-2">
                    &ldquo;{articleTitle}&rdquo;
                  </p>
                  <p className="mt-4 text-[13px] text-[var(--color-text-disabled)] italic">
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-5 bg-[#F8FAFC] border-t border-[var(--color-border)]">
              <button
                onClick={() => !isPending && setShowConfirm(false)}
                disabled={isPending}
                className="px-5 py-2.5 text-[14px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[#F1F5F9] rounded-[8px] transition-colors disabled:opacity-50 min-h-[44px]"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-6 py-2.5 bg-[var(--color-error)] hover:bg-[#B91C1C] text-white text-[14px] font-semibold rounded-[8px] transition-colors disabled:opacity-50 flex items-center gap-2 min-h-[44px]"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-current" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 text-current" />
                    <span>Ya, Hapus</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
