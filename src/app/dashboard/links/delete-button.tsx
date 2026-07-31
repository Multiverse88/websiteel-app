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
      className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[#FEF2F2] rounded-[8px] transition-colors disabled:opacity-50"
      title="Hapus link"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
