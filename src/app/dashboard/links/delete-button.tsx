"use client";

import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteLinkButton({ id, slug }: { id: string; slug: string }) {
  return (
    <button
      onClick={() => alert("Delete not implemented yet")}
      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      title="Hapus link"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
