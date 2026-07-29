"use client";
import React, { useTransition, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, X, Trash2, PowerOff, Upload, FileSpreadsheet, Loader2, Settings, ToggleLeft, ToggleRight } from "lucide-react";
import { toggleContactStatusAction, deleteContactAction, importContactsAction, saveSmtpSettingsAction, toggleAllContactsStatusAction } from "./actions";
import Papa from "papaparse";

// ... skipped unmodified code up to ImportCsvButton ...

export function SmtpSettingsModal({ initialConfig }: { initialConfig: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await saveSmtpSettingsAction(formData);
      if (res?.success) {
        alert("Pengaturan SMTP berhasil disimpan!");
        setIsOpen(false);
      } else {
        alert(`Gagal: ${res?.error}`);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-gray-50 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-[14px] border border-gray-200"
      >
        <Settings className="w-4 h-4" />
        Setting SMTP
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-extrabold text-[16px] text-gray-900">Setting SMTP Blast</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Email Pengirim (Sender Email)</label>
                <input type="text" name="from" defaultValue={initialConfig?.from || ""} placeholder='"Promo" <promo@easylegal.id>' className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">SMTP Host</label>
                <input type="text" name="host" defaultValue={initialConfig?.host || ""} required placeholder="smtp.gmail.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">SMTP Port</label>
                <input type="number" name="port" defaultValue={initialConfig?.port || "465"} required placeholder="465" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">SMTP Username</label>
                <input type="text" name="user" defaultValue={initialConfig?.user || ""} required placeholder="email@gmail.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">SMTP Password</label>
                <input type="password" name="pass" defaultValue={initialConfig?.pass || ""} required placeholder="App Password" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px]" />
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg text-gray-500 font-bold hover:bg-gray-50">Batal</button>
                <button type="submit" disabled={isPending} className="px-4 py-2 bg-[#d62828] text-white font-bold rounded-lg flex items-center gap-2">
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Simpan Pengaturan
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

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

export function ToggleAllContactsButton({ action }: { action: 'activate' | 'deactivate' }) {
  const [isPending, startTransition] = useTransition();

  const handleToggleAll = () => {
    const message = action === 'activate' 
      ? "Yakin ingin MENGAKTIFKAN semua kontak?" 
      : "Yakin ingin MENONAKTIFKAN semua kontak?";
      
    if (confirm(message)) {
      startTransition(async () => {
        await toggleAllContactsStatusAction(action === 'activate');
      });
    }
  };

  const isActiveBtn = action === 'activate';

  return (
    <button
      onClick={handleToggleAll}
      disabled={isPending}
      className={`px-4 py-2 font-bold rounded-lg transition-colors flex items-center gap-1.5 text-[14px] border disabled:opacity-50 ${
        isActiveBtn 
          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200"
          : "bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200"
      }`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isActiveBtn ? (
        <ToggleRight className="w-4 h-4" />
      ) : (
        <ToggleLeft className="w-4 h-4" />
      )}
      {isActiveBtn ? "Aktifkan Semua" : "Nonaktifkan Semua"}
    </button>
  );
}

export function ActivateLimitedContactsForm() {
  const [isPending, startTransition] = useTransition();

  const handleActivateLimited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const limit = parseInt(formData.get("limit") as string, 10);
    
    if (isNaN(limit) || limit <= 0) {
      alert("Masukkan jumlah yang valid (minimal 1)");
      return;
    }

    if (confirm(`Yakin ingin mengaktifkan tepat ${limit} kontak dan menonaktifkan sisanya?`)) {
      startTransition(async () => {
        const { activateLimitedContactsAction } = await import("./actions");
        const res = await activateLimitedContactsAction(limit);
        if (res?.success) {
          alert(`Berhasil mengaktifkan ${res.count} kontak!`);
        } else {
          alert(`Gagal: ${res?.error}`);
        }
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/[0.04] p-5">
      <h3 className="text-[14px] font-bold text-gray-700 mb-3">Aktivasi Target Otomatis</h3>
      <form onSubmit={handleActivateLimited} className="flex gap-3">
        <input
          type="number"
          name="limit"
          min="1"
          required
          placeholder="Jml Kontak (Cth: 100)"
          className="w-[200px] px-4 py-2 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:border-[#d62828] focus:ring-1 focus:ring-[#d62828]"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center gap-1.5 text-[14px] disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ToggleRight className="w-4 h-4" />}
          Aktifkan Otomatis
        </button>
      </form>
    </div>
  );
}
