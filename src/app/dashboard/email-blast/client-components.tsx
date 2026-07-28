"use client";

import React, { useTransition, useRef } from "react";
import { Check, X, Trash2, PowerOff, Upload, FileSpreadsheet, Loader2 } from "lucide-react";
import { toggleContactStatusAction, deleteContactAction, importContactsAction } from "./actions";
import Papa from "papaparse";

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

export function ImportCsvButton() {
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedContacts = results.data.map((row: any) => ({
          email: row.email || row.Email || row.EMAIL || row[0],
          name: row.name || row.Name || row.NAMA || row[1] || "",
        })).filter(c => c.email && typeof c.email === 'string' && c.email.includes("@"));

        if (parsedContacts.length === 0) {
          alert("Tidak ditemukan data email valid pada file CSV. Pastikan ada kolom bernama 'email'.");
          return;
        }

        startTransition(async () => {
          const res = await importContactsAction(parsedContacts);
          if (res?.success) {
            alert(`Berhasil mengimpor ${res.count} kontak baru!`);
          } else {
            alert(`Gagal: ${res?.error}`);
          }
          if (fileInputRef.current) fileInputRef.current.value = "";
        });
      },
      error: (error) => {
        alert("Gagal membaca file CSV: " + error.message);
      }
    });
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        type="button"
        disabled={isPending}
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1.5 text-[14px] border border-emerald-200 disabled:opacity-50"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileSpreadsheet className="w-4 h-4" />
        )}
        Import CSV
      </button>
    </div>
  );
}
