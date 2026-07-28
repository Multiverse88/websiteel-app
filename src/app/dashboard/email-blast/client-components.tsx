"use client";

import React, { useTransition } from "react";
import { Check, X, Trash2, PowerOff } from "lucide-react";
import { toggleContactStatusAction, deleteContactAction } from "./actions";

export function ContactActions({ id, isActive }: { id: string; isActive: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleContactStatusAction(id, isActive);
    });
  };

  const handleDelete = () => {
    if (confirm("Yakin ingin menghapus kontak ini?")) {
      startTransition(async () => {
        await deleteContactAction(id);
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`p-2 rounded-lg transition-colors ${
          isActive
            ? "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200"
            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200"
        } disabled:opacity-50`}
        title={isActive ? "Nonaktifkan" : "Aktifkan"}
      >
        <PowerOff className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors disabled:opacity-50"
        title="Hapus"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
