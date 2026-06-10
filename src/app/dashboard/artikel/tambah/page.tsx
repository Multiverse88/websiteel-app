"use client";

import React, { useState, useRef, useTransition } from "react";
import Link from "next/link";
import ImageComponent from "next/image";
import { ArrowLeft, Home, Sparkles, Image as ImageIcon, Upload, Link2, X, Check, FileText, HelpCircle, Loader2 } from "lucide-react";
import { createArticle } from "./actions";

// Image Presets for premium aesthetics
const IMAGE_PRESETS = [
  {
    name: "Gedung Korporat",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=800&h=500&q=80"
  },
  {
    name: "Dokumen & Kerja",
    url: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?fit=crop&w=800&h=500&q=80"
  },
  {
    name: "Diskusi Bisnis",
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=800&h=500&q=80"
  },
  {
    name: "Konsultasi Hukum",
    url: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?fit=crop&w=800&h=500&q=80"
  }
];

type CoverMode = "upload" | "url";

export default function TambahArtikelPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cover image state
  const [coverMode, setCoverMode] = useState<CoverMode>("upload");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>(IMAGE_PRESETS[0].url);
  const [coverUrl, setCoverUrl] = useState(IMAGE_PRESETS[0].url);
  const [isDragging, setIsDragging] = useState(false);

  // Form states for Live Preview
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Legalitas PT");
  const [readTime, setReadTime] = useState("5 menit baca");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Format file tidak didukung! Gunakan gambar.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5MB!");
      return;
    }
    setError(null);
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = () => {
    setCoverFile(null);
    setCoverPreview(IMAGE_PRESETS[0].url);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const switchToUrl = () => {
    setCoverMode("url");
    setCoverUrl(coverPreview);
  };

  const switchToUpload = () => {
    setCoverMode("upload");
    setCoverFile(null);
    setCoverPreview(coverUrl);
  };

  const getPreviewImage = () => {
    if (coverMode === "upload" && coverFile) return coverPreview;
    return coverUrl || IMAGE_PRESETS[0].url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    // Add cover image file if in upload mode
    if (coverMode === "upload" && coverFile) {
      formData.set("coverImageFile", coverFile);
      formData.delete("coverImageUrl");
    } else {
      formData.set("coverImageUrl", coverUrl);
      formData.delete("coverImageFile");
    }

    startTransition(async () => {
      const result = await createArticle(null, formData);
      if (result && result.error) {
        setError(result.error);
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">

      {/* HEADER */}
      <section className="bg-white pt-8 lg:pt-12 pb-10 border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[60px] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
          <nav className="flex items-center space-x-2 text-[13px] font-medium text-gray-500 mb-6">
            <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span className="text-gray-300 font-normal">&gt;</span>
            <Link href="/dashboard" className="hover:text-[#990202] transition-colors">
              Dashboard
            </Link>
            <span className="text-gray-300 font-normal">&gt;</span>
            <span className="text-[13px] font-bold text-gray-900">Tambah Artikel</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-50 py-1.5 px-3.5 rounded-full border border-red-100/50 shadow-sm mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#990202]" />
                <span className="text-[12px] font-bold text-[#990202] tracking-wide">CMS Panel</span>
              </div>
              <h1 className="font-inter text-[34px] sm:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
                Tulis Artikel Baru
              </h1>
            </div>

            <Link
              href="/artikel"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-200 text-gray-700 hover:text-[#990202] hover:border-red-200 hover:bg-[#FFF5F5] font-bold text-[14px] rounded-xl transition-all duration-200 bg-white shadow-sm flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Batal & Kembali</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-14 flex-grow">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* FORM */}
            <div className="lg:col-span-7 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[28px] border border-gray-200/80 p-6 sm:p-8">

              {error && (
                <div className="mb-6 p-4.5 bg-red-50 border border-red-200 rounded-2xl text-[14px] text-[#990202] font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#990202] flex-shrink-0 animate-ping" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-[13.5px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Judul Artikel <span className="text-[#990202]">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Panduan Lengkap Cara Mengurus NIB di OSS RBA 2026"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                  />
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-[13.5px] font-extrabold text-gray-900">
                      Kategori <span className="text-[#990202]">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-semibold text-gray-800"
                    >
                      <option value="Legalitas PT">Legalitas PT</option>
                      <option value="Merek & HAKI">Merek & HAKI</option>
                      <option value="Sertifikasi ISO">Sertifikasi ISO</option>
                      <option value="Pajak Bisnis">Pajak Bisnis</option>
                      <option value="Virtual Office">Virtual Office</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="readTime" className="text-[13.5px] font-extrabold text-gray-900">
                      Estimasi Waktu Baca <span className="text-[#990202]">*</span>
                    </label>
                    <input
                      id="readTime"
                      name="readTime"
                      type="text"
                      required
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      placeholder="Contoh: 5 menit baca"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                    />
                  </div>
                </div>

                {/* Cover Image - Tab Mode */}
                <div className="space-y-3">
                  <label className="text-[13.5px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Gambar Sampul (Cover Image)
                  </label>

                  {/* Tab Switcher */}
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={switchToUpload}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                        coverMode === "upload"
                          ? "bg-white text-[#990202] shadow-sm border border-gray-200/50"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      onClick={switchToUrl}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-bold transition-all ${
                        coverMode === "url"
                          ? "bg-white text-[#990202] shadow-sm border border-gray-200/50"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Link2 className="w-4 h-4" />
                      <span>Input URL</span>
                    </button>
                  </div>

                  {/* Upload Mode */}
                  {coverMode === "upload" && (
                    <div className="space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />

                      {coverFile ? (
                        /* File selected preview */
                        <div className="relative border border-gray-200 rounded-xl overflow-hidden">
                          <ImageComponent
                            src={coverPreview}
                            alt="Preview"
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="flex items-center justify-between">
                              <div className="text-white text-[12px] font-bold truncate max-w-[70%]">
                                {coverFile.name}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[11px] font-bold rounded-lg transition-colors"
                                >
                                  Ganti
                                </button>
                                <button
                                  type="button"
                                  onClick={removeFile}
                                  className="px-3 py-1.5 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1"
                                >
                                  <X className="w-3 h-3" />
                                  Hapus
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Drop zone */
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          onDrop={handleDrop}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                            isDragging
                              ? "border-[#990202] bg-red-50"
                              : "border-gray-200 hover:border-gray-300 bg-gray-50/50"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                              isDragging ? "bg-red-100" : "bg-gray-100"
                            }`}>
                              <Upload className={`w-6 h-6 ${isDragging ? "text-[#990202]" : "text-gray-400"}`} />
                            </div>
                            <div>
                              <p className="text-[14px] font-bold text-gray-700">
                                {isDragging ? "Lepaskan gambar di sini" : "Klik atau seret gambar ke sini"}
                              </p>
                              <p className="text-[12px] text-gray-400 mt-1">
                                JPG, PNG, WebP, atau GIF (maks. 5MB)
                              </p>
                            </div>
                          </div>
                        </button>
                      )}

                      {/* Presets */}
                      <div className="pt-1">
                        <div className="text-[12px] font-extrabold text-gray-400 mb-2 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Atau gunakan gambar preset:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {IMAGE_PRESETS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setCoverFile(null);
                                setCoverPreview(preset.url);
                                setCoverUrl(preset.url);
                                if (fileInputRef.current) fileInputRef.current.value = "";
                              }}
                              className={`px-3 py-1.5 text-[11.5px] font-bold rounded-lg border transition-all flex items-center gap-1 ${
                                coverPreview === preset.url && !coverFile
                                  ? "bg-red-50 text-[#990202] border-[#990202]/30 shadow-sm"
                                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                              }`}
                            >
                              {coverPreview === preset.url && !coverFile && <Check className="w-3 h-3 text-[#990202]" />}
                              <span>{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* URL Mode */}
                  {coverMode === "url" && (
                    <div className="space-y-3">
                      <input
                        type="url"
                        name="coverImageUrl"
                        value={coverUrl}
                        onChange={(e) => {
                          setCoverUrl(e.target.value);
                          setCoverPreview(e.target.value);
                        }}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                      />

                      {/* Presets */}
                      <div className="pt-1">
                        <div className="text-[12px] font-extrabold text-gray-400 mb-2 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>Atau gunakan gambar preset:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {IMAGE_PRESETS.map((preset) => (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setCoverUrl(preset.url);
                                setCoverPreview(preset.url);
                              }}
                              className={`px-3 py-1.5 text-[11.5px] font-bold rounded-lg border transition-all flex items-center gap-1 ${
                                coverUrl === preset.url
                                  ? "bg-red-50 text-[#990202] border-[#990202]/30 shadow-sm"
                                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700"
                              }`}
                            >
                              {coverUrl === preset.url && <Check className="w-3 h-3 text-[#990202]" />}
                              <span>{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <label htmlFor="excerpt" className="text-[13.5px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Kutipan Singkat (Excerpt) <span className="text-[#990202]">*</span>
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    required
                    rows={2}
                    maxLength={200}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Tuliskan rangkuman artikel singkat (maksimal 200 karakter)..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14.5px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950 resize-none"
                  />
                  <div className="text-right text-[11px] font-bold text-gray-400">
                    {excerpt.length} / 200 karakter
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="content" className="text-[13.5px] font-extrabold text-gray-900 flex items-center gap-1.5">
                      Isi Lengkap Artikel <span className="text-[#990202]">*</span>
                    </label>
                    <div className="group relative flex items-center gap-1 cursor-pointer">
                      <HelpCircle className="w-3.8 h-3.8 text-gray-400 hover:text-gray-600 transition-colors" />
                      <span className="text-[11.5px] text-gray-400 hover:text-gray-600 transition-colors font-bold">Format Penulisan</span>
                      <div className="absolute right-0 bottom-full mb-2 w-[280px] bg-gray-900 text-white rounded-xl p-3.5 shadow-lg border border-white/10 invisible group-hover:visible transition-all duration-200 z-50 text-[11.5px] leading-relaxed font-normal">
                        <div className="font-extrabold mb-1.5 border-b border-white/10 pb-1 text-[#FF8E8E]">Panduan Format Markdown:</div>
                        <ul className="space-y-1 list-none pl-0">
                          <li><strong className="text-white">### Judul</strong> : Judul Sub-bab baru</li>
                          <li><strong className="text-white">**Teks**</strong> : Teks tebal/bold</li>
                          <li><strong className="text-white">* Poin</strong> : Daftar peluru</li>
                          <li><strong className="text-white">1. Poin</strong> : Daftar bernomor</li>
                          <li><strong className="text-white">---</strong> : Garis pembatas horizontal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <textarea
                    id="content"
                    name="content"
                    required
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan konten artikel lengkap menggunakan format panduan di atas..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14.5px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950 resize-y"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 text-[15px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Menyimpan Artikel...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        <span>Terbitkan Artikel Baru</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* LIVE PREVIEW */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">

              <div className="bg-white/40 border border-gray-200/50 rounded-2xl py-3 px-4 flex items-center justify-between">
                <div className="text-[12.5px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Pratinjau Langsung (Live Preview)</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.03)] flex flex-col group transition-all duration-300">
                <div className="relative aspect-[1.6] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                  <ImageComponent
                    src={getPreviewImage()}
                    alt="Cover preview"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex px-3 py-1.5 rounded-lg text-[10.5px] font-black uppercase tracking-wider bg-white text-[#990202] shadow-sm border border-red-50">
                      {category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-[12px] font-bold text-gray-400">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#990202]/30" />
                        <span>Hari ini</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#990202]/30" />
                        <span>{readTime || "5 menit baca"}</span>
                      </div>
                    </div>
                    <h3 className="font-inter text-[18px] sm:text-[20px] font-extrabold text-gray-950 leading-snug line-clamp-2">
                      {title || "Judul artikel Anda akan tampil di sini..."}
                    </h3>
                    <p className="text-[13.5px] text-gray-500 leading-relaxed font-normal line-clamp-3">
                      {excerpt || "Tulis kutipan singkat pada form di sebelah kiri untuk melihat gambaran pratinjau cuplikan artikel di sini..."}
                    </p>
                  </div>
                  <div className="flex items-center text-[13px] font-extrabold text-[#990202] mt-6 pt-4 border-t border-gray-100">
                    <span>Baca Selengkapnya</span>
                    <span className="ml-1.5">→</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-5 leading-relaxed text-[13px] text-amber-800 font-medium">
                <div className="font-extrabold text-[13.5px] mb-1.5 text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Tips Menulis Artikel Populer</span>
                </div>
                Gunakan judul yang memancing rasa ingin tahu, lengkapi dengan kutipan pendek yang persuasif, dan tulislah sub-bab menggunakan format heading <code className="bg-amber-100/60 px-1.5 py-0.5 rounded font-black text-amber-950">###</code> agar artikel tersusun secara rapi dan mudah dibaca oleh klien.
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
