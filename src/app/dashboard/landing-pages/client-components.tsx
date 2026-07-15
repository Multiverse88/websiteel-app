"use client";

import React from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({ action }: { action: (payload: FormData) => void }) {
  return (
    <form action={action} className="inline-block">
      <button 
        type="submit" 
        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Hapus"
        onClick={(e) => {
          if (!confirm("Yakin hapus landing page ini?")) {
            e.preventDefault();
          }
        }}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}
