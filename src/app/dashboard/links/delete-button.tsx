// src/app/dashboard/links/delete-button.tsx
"use client";

import React, { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteLink } from "./actions";

export default function DeleteLinkButton({ id, slug }: { id: string; slug: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Hapus link "/${slug}"?`)) return;
    startTransition(() => { void deleteLink(id); });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus link"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
