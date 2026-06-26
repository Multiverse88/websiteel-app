"use client";

import React, { useState, useActionState } from "react";
import Image from "next/image";
import { Save, Loader2, Camera, AlertCircle, CheckCircle2, User, ArrowLeft } from "lucide-react";
import { updateProfile } from "./actions";
import Link from "next/link";

interface UserProfileData {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: string | null;
}

export function ProfileForm({ user }: { user: UserProfileData }) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role || "Legal Specialist");
  const [bio, setBio] = useState(user.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatar || "");
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
  const [fileInput, setFileInput] = useState<File | null>(null);

  // useActionState for form submitting state
  const [state, formAction, isPending] = useActionState(updateProfile, null);

  // Handle local image file preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInput(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={formAction} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Avatar Upload & Quick Info */}
      <div className="bg-white shadow-md border border-black/[0.03] rounded-xl p-6 shadow-sm flex flex-col items-center text-center gap-4 h-fit">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full shadow-md border border-black/[0.04] overflow-hidden bg-gray-50 flex items-center justify-center relative">
            {avatarPreview ? (
              <Image
                src={avatarPreview}
                alt={name}
                width={112}
                height={112}
                className="object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-300" />
            )}
          </div>

          {/* Upload overlay hover trigger */}
          <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Camera className="w-5 h-5" />
            <input 
              type="file" 
              name="avatarFile"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden" 
            />
          </label>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 text-base">{name || "Nama Admin"}</h2>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">{role}</p>
          <p className="text-xs text-gray-500 mt-1">{user.email}</p>
        </div>

        <div className="w-full border-t border-gray-100 pt-3 text-[11px] text-gray-400">
          * Klik foto di atas untuk mengunggah gambar profil baru secara langsung.
        </div>
      </div>

      {/* Right Column - Edit Form Details */}
      <div className="lg:col-span-2 bg-white shadow-md border border-black/[0.03] rounded-xl p-6 shadow-sm flex flex-col gap-5">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="font-bold text-gray-900 text-sm">Informasi Profil</h3>
          <p className="text-xs text-gray-500">Sesuaikan data profil penulis Anda untuk dipajang di artikel</p>
        </div>

        {/* Input Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">Nama Lengkap</label>
          <input 
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama lengkap Anda..."
            required
            className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors"
          />
        </div>

        {/* Input Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">Peran / Jabatan (Role)</label>
          <input 
            type="text"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Contoh: Senior Legal Consultant, Writer..."
            required
            className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors"
          />
        </div>

        {/* Input Avatar URL (Optional) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">Foto Profil URL (Alternatif)</label>
          <input 
            type="text"
            name="avatarUrl"
            value={avatarUrl}
            onChange={(e) => {
              setAvatarUrl(e.target.value);
              if (!fileInput) setAvatarPreview(e.target.value);
            }}
            placeholder="https://images.unsplash.com/... atau kosongkan untuk unggah"
            className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors"
          />
        </div>

        {/* Input Bio */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-700">Bio Singkat</label>
          <textarea 
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tulis deskripsi singkat profil Anda yang akan ditampilkan di bawah artikel..."
            rows={4}
            className="w-full px-3.5 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#990202]/10 focus:border-[#990202] transition-colors resize-none"
          />
        </div>

        {/* Feedback Messages */}
        {state?.error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-red-100">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            {state.error}
          </div>
        )}
        {state?.success && (
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold flex items-center gap-2 border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            {state.success}
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-1">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Dashboard
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#990202] text-white hover:bg-[#800000] border border-[#990202] transition-all disabled:opacity-50 shadow-sm"
          >
            {isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
