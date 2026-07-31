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
        className="px-5 py-2.5 bg-[#F8FAFC] text-[var(--color-text-main)] font-semibold rounded-[8px] hover:bg-[#FEF2F2] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5 text-[14px] border border-[var(--color-border)] min-h-[44px]"
      >
        <Settings className="w-4 h-4 text-current" />
        Setting SMTP
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--color-surface)] rounded-[8px] shadow-large border border-[var(--color-border)] w-full max-w-[500px] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
              <h3 className="font-semibold text-xl text-[var(--color-text-main)]">Setting SMTP Blast</h3>
              <button onClick={() => setIsOpen(false)} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[#F8FAFC] p-1.5 rounded-[8px] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="block text-[14px] font-semibold text-[var(--color-text-main)] mb-1.5">Email Pengirim (Sender Email)</label>
                <input type="text" name="from" defaultValue={initialConfig?.from || ""} placeholder='"Promo" <promo@easylegal.id>' className="w-full px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-primary)] transition-all shadow-subtle" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[var(--color-text-main)] mb-1.5">SMTP Host</label>
                <input type="text" name="host" defaultValue={initialConfig?.host || ""} required placeholder="smtp.gmail.com" className="w-full px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-primary)] transition-all shadow-subtle" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[var(--color-text-main)] mb-1.5">SMTP Port</label>
                <input type="number" name="port" defaultValue={initialConfig?.port || "465"} required placeholder="465" className="w-full px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-primary)] transition-all shadow-subtle" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[var(--color-text-main)] mb-1.5">SMTP Username</label>
                <input type="text" name="user" defaultValue={initialConfig?.user || ""} required placeholder="email@gmail.com" className="w-full px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-primary)] transition-all shadow-subtle" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold text-[var(--color-text-main)] mb-1.5">SMTP Password</label>
                <input type="password" name="pass" defaultValue={initialConfig?.pass || ""} required placeholder="App Password" className="w-full px-4 py-2.5 bg-white border border-[var(--color-border)] rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-primary)] transition-all shadow-subtle" />
              </div>
              <div className="pt-5 border-t border-[var(--color-border)] flex justify-end gap-3 mt-2">
                <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2.5 rounded-[8px] text-[14px] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[#F8FAFC] transition-all min-h-[44px]">Batal</button>
                <button type="submit" disabled={isPending} className="px-6 py-2.5 bg-[var(--color-primary)] text-white font-semibold rounded-[8px] flex items-center gap-2 hover:bg-[#B91C1C] transition-all disabled:opacity-50 min-h-[44px]">
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
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`p-2 rounded-[8px] transition-colors ${
          isActive
            ? "bg-[#FFFBEB] text-[var(--color-warning)] hover:bg-[#FEF3C7] border border-[#FDE68A]"
            : "bg-[#ECFDF5] text-[var(--color-success)] hover:bg-[#D1FAE5] border border-[#A7F3D0]"
        } disabled:opacity-50`}
        title={isActive ? "Nonaktifkan" : "Aktifkan"}
      >
        <PowerOff className="w-4 h-4 text-current" />
      </button>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 rounded-[8px] bg-[#FEF2F2] text-[var(--color-error)] hover:bg-[#FEE2E2] border border-[#FECACA] transition-colors disabled:opacity-50"
        title="Hapus"
      >
        <Trash2 className="w-4 h-4 text-current" />
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
        className="px-5 py-2.5 bg-[#ECFDF5] text-[var(--color-success)] font-semibold rounded-[8px] hover:bg-[#D1FAE5] transition-colors flex items-center gap-1.5 text-[14px] border border-[#A7F3D0] disabled:opacity-50 min-h-[44px]"
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <FileSpreadsheet className="w-4 h-4 text-current" />
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
      className={`px-5 py-2.5 font-semibold rounded-[8px] transition-colors flex items-center gap-1.5 text-[14px] border disabled:opacity-50 min-h-[44px] ${
        isActiveBtn 
          ? "bg-[#ECFDF5] text-[var(--color-success)] hover:bg-[#D1FAE5] border-[#A7F3D0]"
          : "bg-[#FFFBEB] text-[var(--color-warning)] hover:bg-[#FEF3C7] border-[#FDE68A]"
      }`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : isActiveBtn ? (
        <ToggleRight className="w-5 h-5 text-current" />
      ) : (
        <ToggleLeft className="w-5 h-5 text-current" />
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
    <div className="bg-[var(--color-surface)] rounded-[8px] shadow-subtle border border-[var(--color-border)] p-6">
      <h3 className="text-[15px] font-semibold text-[var(--color-text-main)] mb-4">Aktivasi Target Otomatis</h3>
      <form onSubmit={handleActivateLimited} className="flex gap-3">
        <input
          type="number"
          name="limit"
          min="1"
          required
          placeholder="Jml Kontak (Cth: 100)"
          className="w-[220px] px-4 py-2.5 border border-[var(--color-border)] bg-white rounded-[8px] text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-[var(--color-primary)] shadow-subtle"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 bg-[#ECFDF5] text-[var(--color-success)] font-semibold rounded-[8px] hover:bg-[#D1FAE5] border border-[#A7F3D0] transition-colors flex items-center gap-1.5 text-[14px] disabled:opacity-50 min-h-[44px]"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin text-current" /> : <ToggleRight className="w-5 h-5 text-current" />}
          Aktifkan Otomatis
        </button>
      </form>
    </div>
  );
}
