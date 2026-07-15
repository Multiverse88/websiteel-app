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
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Hapus artikel"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isPending && setShowConfirm(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-[16px] font-extrabold text-gray-900">
                Hapus Artikel
              </h3>
              <button
                onClick={() => !isPending && setShowConfirm(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              {error ? (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-[14px] text-red-700 font-medium">
                  {error}
                </div>
              ) : (
                <>
                  <p className="text-[14px] text-gray-600 leading-relaxed">
                    Apakah Anda yakin ingin menghapus artikel berikut?
                  </p>
                  <p className="mt-2 text-[14px] font-bold text-gray-900 line-clamp-2">
                    &ldquo;{articleTitle}&rdquo;
                  </p>
                  <p className="mt-2 text-[14px] text-gray-400">
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => !isPending && setShowConfirm(false)}
                disabled={isPending}
                className="px-4 py-2.5 text-[14px] font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-[14px] font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
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
