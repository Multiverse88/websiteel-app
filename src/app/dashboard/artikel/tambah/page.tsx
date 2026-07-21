"use client";

import React, { useState, useRef, useTransition, useEffect } from "react";
import Link from "next/link";
import ImageComponent from "next/image";
import { ArrowLeft, Home, Sparkles, Image as ImageIcon, Upload, Link2, X, Check, FileText, HelpCircle, Loader2, ExternalLink, Cloud } from "lucide-react";
import { createArticle, uploadInlineImage } from "./actions";
import { compressImageFile } from "@/lib/compress-image";

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

function wrapExistingImages(container: HTMLElement) {
  container.querySelectorAll("img").forEach(img => {
    if (img.closest(".img-wrapper")) return;
    const wrapper = document.createElement("div");
    wrapper.className = "img-wrapper";
    wrapper.style.position = "relative";
    wrapper.style.margin = "16px 0";
    const overlay = document.createElement("div");
    overlay.className = "img-overlay";
    overlay.innerHTML = `<button type="button" data-img-action="edit" class="img-btn img-btn-edit">Ganti</button><button type="button" data-img-action="delete" class="img-btn img-btn-delete">Hapus</button>`;
    img.parentNode?.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    wrapper.appendChild(overlay);
  });
}

export default function TambahArtikelPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);

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

  // Link insertion state
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const savedSelectionRef = useRef<{ range: Range; rect: DOMRect | null } | null>(null);

  // Image insertion state
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const imageFileInputRef = useRef<HTMLInputElement>(null);
  const editingImageRef = useRef<HTMLImageElement | null>(null);
  const [isEditingImage, setIsEditingImage] = useState(false);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = markdownToHtml(content || "");
      wrapExistingImages(editorRef.current);
    }
  }, []);

  const handleEditorInput = () => {
    const html = editorRef.current?.innerHTML || "";
    const md = htmlToMarkdown(html);
    setContent(md);
  };

  const handleFormat = (command: string, value: string = "") => {
    if (typeof document !== "undefined") {
      document.execCommand(command, false, value);
      handleEditorInput();
    }
  };

  const handleOpenLinkModal = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      savedSelectionRef.current = { range: range.cloneRange(), rect };

      // Check if selection is inside editor
      const editor = editorRef.current;
      if (editor && editor.contains(range.commonAncestorContainer)) {
        setLinkUrl("");
        setShowLinkModal(true);
      }
    }
  };

  const handleApplyLink = () => {
    if (!linkUrl.trim()) return;

    const url = linkUrl.trim();
    const saved = savedSelectionRef.current;
    if (!saved) return;

    // Restore selection
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(saved.range);
    }

    // Wrap selection with <a> tag
    const range = saved.range;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    range.surroundContents(a);

    setShowLinkModal(false);
    setLinkUrl("");
    savedSelectionRef.current = null;
    handleEditorInput();
  };

  const handleRemoveLink = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const editor = editorRef.current;
      if (editor && editor.contains(range.commonAncestorContainer)) {
        let node: HTMLElement | null = range.commonAncestorContainer as HTMLElement;
        while (node && node !== editor) {
          if (node.nodeName === "A") {
            const parent = node.parentNode;
            while (node.firstChild) {
              parent?.insertBefore(node.firstChild, node);
            }
            parent?.removeChild(node);
            handleEditorInput();
            return;
          }
          node = node.parentElement;
        }
      }
    }
  };

  const handleOpenImageModal = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const editor = editorRef.current;
      if (editor && editor.contains(range.commonAncestorContainer)) {
        savedSelectionRef.current = { range: range.cloneRange(), rect: range.getBoundingClientRect() };
      }
    }
    editingImageRef.current = null;
    setIsEditingImage(false);
    setImageUrl("");
    setImageAlt("");
    setShowImageModal(true);
  };

  const handleOpenEditImage = (img: HTMLImageElement) => {
    editingImageRef.current = img;
    setIsEditingImage(true);
    setImageUrl(img.src);
    setImageAlt(img.alt === "Gambar artikel" ? "" : img.alt);
    setShowImageModal(true);
  };

  const handleDeleteImage = (img: HTMLImageElement) => {
    const wrapper = img.closest(".img-wrapper");
    if (wrapper) {
      wrapper.replaceWith(document.createTextNode(""));
    } else {
      img.remove();
    }
    handleEditorInput();
  };

  const handleInsertImage = () => {
    if (!imageUrl.trim()) return;
    const editor = editorRef.current;
    if (!editor) return;

    const editing = editingImageRef.current;
    if (editing) {
      editing.src = imageUrl.trim();
      editing.alt = imageAlt.trim() || "Gambar artikel";
    } else {
      editor.focus();
      const saved = savedSelectionRef.current;
      if (saved) {
        const sel = window.getSelection();
        if (sel) {
          sel.removeAllRanges();
          sel.addRange(saved.range);
        }
      }
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (editor.contains(range.commonAncestorContainer)) {
          const wrapper = document.createElement("div");
          wrapper.className = "img-wrapper";
          wrapper.style.position = "relative";
          wrapper.style.margin = "16px 0";

          const img = document.createElement("img");
          img.src = imageUrl.trim();
          img.alt = imageAlt.trim() || "Gambar artikel";
          img.style.maxWidth = "100%";
          img.style.borderRadius = "12px";
          img.style.display = "block";

          const overlay = document.createElement("div");
          overlay.className = "img-overlay";
          overlay.innerHTML = `<button type="button" data-img-action="edit" class="img-btn img-btn-edit">Ganti</button><button type="button" data-img-action="delete" class="img-btn img-btn-delete">Hapus</button>`;

          wrapper.appendChild(img);
          wrapper.appendChild(overlay);
          range.deleteContents();
          range.insertNode(wrapper);

          const p = document.createElement("p");
          p.innerHTML = "<br>";
          wrapper.after(p);
          const newRange = document.createRange();
          newRange.setStart(p, 0);
          sel.removeAllRanges();
          sel.addRange(newRange);
        }
      }
    }
    handleEditorInput();
    savedSelectionRef.current = null;
    setShowImageModal(false);
    setImageUrl("");
    setImageAlt("");
    editingImageRef.current = null;
    setIsEditingImage(false);
  };

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const action = target.getAttribute("data-img-action");
    if (!action) return;
    const wrapper = target.closest(".img-wrapper");
    if (!wrapper) return;
    const img = wrapper.querySelector("img");
    if (!img) return;
    if (action === "edit") {
      handleOpenEditImage(img as HTMLImageElement);
    } else if (action === "delete") {
      handleDeleteImage(img as HTMLImageElement);
    }
  };

  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Format file tidak didukung! Gunakan gambar.");
      return;
    }
    setError(null);
    setIsCompressing(true);
    try {
      const compressed = await compressImageFile(file);
      setIsCompressing(false);
      setIsUploadingImage(true);
      const uploadForm = new FormData();
      uploadForm.set("image", compressed);
      const result = await uploadInlineImage(uploadForm);
      if (result.error) {
        setError(result.error);
      } else if (result.url) {
        setImageUrl(result.url);
      }
    } catch {
      setError("Gagal mengompres gambar.");
    } finally {
      setIsCompressing(false);
      setIsUploadingImage(false);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Format file tidak didukung! Gunakan gambar.");
      return;
    }
    setError(null);
    setIsCompressing(true);
    try {
      const compressed = await compressImageFile(file);
      setCoverFile(compressed);
      setCoverPreview(URL.createObjectURL(compressed));
    } catch {
      setError("Gagal mengompres gambar.");
    } finally {
      setIsCompressing(false);
    }
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

    // Validate content manually since the textarea is hidden
    if (!content.trim()) {
      setError("Isi lengkap artikel tidak boleh kosong!");
      return;
    }

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
          <nav className="flex items-center space-x-2 text-[16px] font-medium text-gray-500 mb-6">
            <Link href="/" className="flex items-center hover:text-[#990202] transition-colors gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Beranda</span>
            </Link>
            <span className="text-gray-300 font-normal">&gt;</span>
            <Link href="/dashboard/artikel" className="hover:text-[#990202] transition-colors">
              Dashboard
            </Link>
            <span className="text-gray-300 font-normal">&gt;</span>
            <span className="text-[16px] font-bold text-gray-900">Tambah Artikel</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-50 py-1.5 px-3.5 rounded-full border border-red-100/50 shadow-sm mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#990202]" />
                <span className="text-[16px] font-bold text-[#990202] tracking-wide">CMS Panel</span>
              </div>
              <h1 className="font-heading text-[34px] sm:text-[40px] font-extrabold text-gray-950 leading-tight tracking-tight">
                Tulis Artikel Baru
              </h1>
            </div>

            <Link
              href="/dashboard/artikel"
              className="inline-flex items-center justify-center px-5 py-3 shadow-md border border-black/[0.04] text-gray-700 hover:text-[#990202] hover:border-red-200 hover:bg-[#FFF5F5] font-bold text-[16px] rounded-xl transition-all duration-200 bg-white shadow-sm flex-shrink-0"
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
            <div className="lg:col-span-7 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] rounded-[28px] shadow-md border border-black/[0.04] p-6 sm:p-8">

              {error && (
                <div className="mb-6 p-4.5 bg-red-50 border border-red-200 rounded-2xl text-[16px] text-[#990202] font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#990202] flex-shrink-0 animate-ping" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                  <label htmlFor="title" className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
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
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                  />
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-[16px] font-extrabold text-gray-900">
                      Kategori <span className="text-[#990202]">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-semibold text-gray-800"
                    >
                      <optgroup label="Pendirian Usaha">
                        <option value="Legalitas PT">Legalitas PT</option>
                        <option value="CV">CV</option>
                        <option value="PT Perorangan">PT Perorangan</option>
                        <option value="PT PMA">PT PMA</option>
                        <option value="Firma">Firma</option>
                        <option value="Perkumpulan">Perkumpulan</option>
                        <option value="Yayasan">Yayasan</option>
                        <option value="Koperasi">Koperasi</option>
                        <option value="UMKM">UMKM</option>
                      </optgroup>
                      <optgroup label="Lainnya">
                        <option value="Merek & HAKI">Merek & HAKI</option>
                        <option value="Sertifikasi ISO">Sertifikasi ISO</option>
                        <option value="Pajak Bisnis">Pajak Bisnis</option>
                        <option value="Virtual Office">Virtual Office</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="readTime" className="text-[16px] font-extrabold text-gray-900">
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
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                    />
                  </div>
                </div>

                {/* Cover Image - Tab Mode */}
                <div className="space-y-3">
                  <label className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                    Gambar Sampul (Cover Image)
                  </label>

                  {/* Tab Switcher */}
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={switchToUpload}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[16px] font-bold transition-all ${
                        coverMode === "upload"
                          ? "bg-white text-[#990202] shadow-sm shadow-md border border-black/[0.04]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload File</span>
                    </button>
                    <button
                      type="button"
                      onClick={switchToUrl}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-[16px] font-bold transition-all ${
                        coverMode === "url"
                          ? "bg-white text-[#990202] shadow-sm shadow-md border border-black/[0.04]"
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
                        <div className="relative shadow-md border border-black/[0.04] rounded-xl overflow-hidden">
                          <ImageComponent
                            src={coverPreview}
                            alt="Preview"
                            fill
                            sizes="(max-width: 640px) 100vw, 50vw"
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <div className="flex items-center justify-between">
                              <div className="text-white text-[16px] font-bold truncate max-w-[70%]">
                                {coverFile.name}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="px-3 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-[16px] font-bold rounded-lg transition-colors"
                                >
                                  Ganti
                                </button>
                                <button
                                  type="button"
                                  onClick={removeFile}
                                  className="px-3 py-1.5 bg-red-500/80 hover:bg-red-500 backdrop-blur-sm text-white text-[16px] font-bold rounded-lg transition-colors flex items-center gap-1"
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
                              <p className="text-[16px] font-bold text-gray-700">
                                {isDragging ? "Lepaskan gambar di sini" : "Klik atau seret gambar ke sini"}
                              </p>
                              <p className="text-[16px] text-gray-400 mt-1">
                                JPG, PNG, WebP, atau GIF (maks. 5MB)
                              </p>
                            </div>
                          </div>
                        </button>
                      )}

                      {/* Presets */}
                      <div className="pt-1">
                        <div className="text-[16px] font-extrabold text-gray-400 mb-2 flex items-center gap-1">
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
                              className={`px-3 py-1.5 text-[16px] font-bold rounded-lg border transition-all flex items-center gap-1 ${
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
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                      />

                      {/* Presets */}
                      <div className="pt-1">
                        <div className="text-[16px] font-extrabold text-gray-400 mb-2 flex items-center gap-1">
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
                              className={`px-3 py-1.5 text-[16px] font-bold rounded-lg border transition-all flex items-center gap-1 ${
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
                  <label htmlFor="excerpt" className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
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
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950 resize-none"
                  />
                  <div className="text-right text-[16px] font-bold text-gray-400">
                    {excerpt.length} / 200 karakter
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[16px] font-extrabold text-gray-900 flex items-center gap-1.5">
                      Isi Lengkap Artikel <span className="text-[#990202]">*</span>
                    </label>
                  </div>

                  {/* Format Helper Toolbar */}
                  <div className="flex flex-wrap items-center gap-2 p-1.5 bg-gray-50 shadow-md border border-black/[0.04] rounded-xl">
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("formatBlock", "<h3>")}
                      className="px-2.5 py-1.5 bg-white shadow-md border border-black/[0.04] hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Ubah menjadi Sub-judul (H3)"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1 rounded border border-red-100/50">H3</span>
                      <span>Sub-judul</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("bold")}
                      className="px-2.5 py-1.5 bg-white shadow-md border border-black/[0.04] hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Jadikan Teks Tebal"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1.5 rounded border border-red-100/50">B</span>
                      <span>Tebal</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleOpenLinkModal}
                      className="px-2.5 py-1.5 bg-white shadow-md border border-black/[0.04] hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan Link"
                    >
                      <ExternalLink className="w-3 h-3 text-[#990202]" />
                      <span>Link</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleRemoveLink}
                      className="px-2.5 py-1.5 bg-white shadow-md border border-black/[0.04] hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Hapus Link dari Teks"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1 rounded border border-red-100/50">~</span>
                      <span>Hapus Link</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={handleOpenImageModal}
                      className="px-2.5 py-1.5 bg-white shadow-md border border-black/[0.04] hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan Gambar"
                    >
                      <ImageIcon className="w-3 h-3 text-[#990202]" />
                      <span>Gambar</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("insertUnorderedList")}
                      className="px-2.5 py-1.5 bg-white shadow-md border border-black/[0.04] hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan List Poin"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1.5 rounded border border-red-100/50">•</span>
                      <span>List Poin</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("insertOrderedList")}
                      className="px-2.5 py-1.5 bg-white shadow-md border border-black/[0.04] hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan List Angka"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1 rounded border border-red-100/50">1.</span>
                      <span>List Angka</span>
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleFormat("insertHorizontalRule")}
                      className="px-2.5 py-1.5 bg-white shadow-md border border-black/[0.04] hover:border-[#990202] hover:text-[#990202] text-gray-600 text-[16px] font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                      title="Sisipkan Garis Pembatas"
                    >
                      <span className="font-mono text-[16px] text-[#990202] bg-red-50 px-1.5 rounded border border-red-100/50">―</span>
                      <span>Pembatas</span>
                    </button>
                  </div>

                  {/* WYSIWYG Content Editor */}
                  <div className="relative shadow-md border border-black/[0.04] rounded-xl overflow-hidden shadow-inner">
                    <div
                      ref={editorRef}
                      contentEditable={true}
                      onInput={handleEditorInput}
                      onClick={handleEditorClick}
                      data-placeholder="Tuliskan isi lengkap artikel Anda di sini. Klik tombol di atas untuk memformat secara langsung..."
                      className="w-full bg-white px-4 py-3.5 text-[16px] focus:outline-none transition-all font-medium text-gray-950 min-h-[350px] max-h-[600px] overflow-y-auto prose-editor"
                    />
                  </div>

                  {/* Link Insertion Modal */}
                  {showLinkModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onMouseDown={(e) => { if (e.target === e.currentTarget) { setShowLinkModal(false); setLinkUrl(""); } }}>
                      <div className="bg-white rounded-2xl shadow-2xl shadow-md border border-black/[0.04] p-5 w-full max-w-md mx-4">
                        <div className="flex items-center gap-2 mb-4">
                          <ExternalLink className="w-4 h-4 text-[#990202]" />
                          <h3 className="text-[16px] font-extrabold text-gray-900">Sisipkan Link</h3>
                        </div>
                        <input
                          type="url"
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleApplyLink(); } }}
                          placeholder="https://example.com"
                          autoFocus
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            type="button"
                            onClick={() => { setShowLinkModal(false); setLinkUrl(""); }}
                            className="px-4 py-2 text-[16px] font-bold text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={handleApplyLink}
                            disabled={!linkUrl.trim()}
                            className="px-4 py-2 bg-[#990202] text-white text-[16px] font-bold rounded-lg hover:bg-[#7a0101] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            Pasang Link
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Insertion Modal */}
                  {showImageModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onMouseDown={(e) => { if (e.target === e.currentTarget) { setShowImageModal(false); setImageUrl(""); setImageAlt(""); } }}>
                      <div className="bg-white rounded-2xl shadow-2xl shadow-md border border-black/[0.04] p-5 w-full max-w-md mx-4">
                        <div className="flex items-center gap-2 mb-4">
                          <ImageIcon className="w-4 h-4 text-[#990202]" />
                          <h3 className="text-[16px] font-extrabold text-gray-900">{isEditingImage ? "Ganti Gambar" : "Sisipkan Gambar"}</h3>
                        </div>

                        {/* Upload option */}
                        <div className="mb-4">
                          <label className="text-[16px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Upload File</label>
                          <input
                            ref={imageFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => imageFileInputRef.current?.click()}
                            disabled={isCompressing || isUploadingImage}
                            className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-[16px] font-bold text-gray-500 hover:border-[#990202] hover:text-[#990202] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUploadingImage ? (
                              <>
                                <Cloud className="w-4 h-4 animate-pulse" />
                                <span>Mengunggah ke CDN...</span>
                              </>
                            ) : isCompressing ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Mengompres gambar...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                <span>Pilih Gambar dari Komputer</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* URL option */}
                        <div className="mb-4">
                          <label className="text-[16px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Atau Input URL</label>
                          <input
                            type="url"
                            value={imageUrl.startsWith("blob:") ? "" : imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleInsertImage(); } }}
                            placeholder="https://example.com/gambar.jpg"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                          />
                        </div>

                        {/* Alt text */}
                        <div className="mb-4">
                          <label className="text-[16px] font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">Alt Text (Opsional)</label>
                          <input
                            type="text"
                            value={imageAlt}
                            onChange={(e) => setImageAlt(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleInsertImage(); } }}
                            placeholder="Deskripsi singkat gambar"
                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-[16px] placeholder-gray-400 focus:outline-none focus:border-[#990202] focus:ring-4 focus:ring-red-100 transition-all font-medium text-gray-950"
                          />
                        </div>

                        {/* Preview */}
                        {imageUrl && (
                          <div className="mb-4 rounded-xl overflow-hidden shadow-sm border border-black/[0.02] bg-gray-50">
                            <img
                              src={imageUrl}
                              alt={imageAlt || "Preview"}
                              className="w-full max-h-[200px] object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                          </div>
                        )}

                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            type="button"
                            onClick={() => { setShowImageModal(false); setImageUrl(""); setImageAlt(""); }}
                            className="px-4 py-2 text-[16px] font-bold text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            onClick={handleInsertImage}
                            disabled={!imageUrl.trim()}
                            className="px-4 py-2 bg-[#990202] text-white text-[16px] font-bold rounded-lg hover:bg-[#7a0101] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                          >
                            {isEditingImage ? "Ganti Gambar" : "Pasang Gambar"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Style for WYSIWYG editor placeholders and layout elements */}
                  <style>{`
                    .prose-editor:empty::before {
                      content: attr(data-placeholder);
                      color: #9ca3af;
                      font-style: italic;
                      cursor: text;
                    }
                    .prose-editor h3 {
                      font-family: var(--font-heading), sans-serif;
                      font-size: 17px !important;
                      font-weight: 800 !important;
                      color: #030712 !important;
                      border-left: 4px solid #990202 !important;
                      padding-left: 10px !important;
                      margin-top: 20px !important;
                      margin-bottom: 10px !important;
                    }
                    .prose-editor strong {
                      font-weight: 800 !important;
                      color: #111827 !important;
                    }
                    .prose-editor p, .prose-editor div {
                      font-size: 14.5px !important;
                      color: #4b5563 !important;
                      line-height: 1.7 !important;
                      margin-top: 8px !important;
                      margin-bottom: 8px !important;
                    }
                    .prose-editor ul {
                      list-style-type: none !important;
                      padding-left: 0 !important;
                      margin-top: 10px !important;
                      margin-bottom: 10px !important;
                    }
                    .prose-editor ul li {
                      position: relative !important;
                      padding-left: 20px !important;
                      font-size: 14px !important;
                      color: #4b5563 !important;
                      margin-top: 4px !important;
                    }
                    .prose-editor ul li::before {
                      content: "" !important;
                      position: absolute !important;
                      left: 0 !important;
                      top: 8px !important;
                      width: 6px !important;
                      height: 6px !important;
                      border-radius: 9999px !important;
                      background-color: rgba(153, 2, 2, 0.7) !important;
                    }
                    .prose-editor ol {
                      counter-reset: item !important;
                      list-style-type: none !important;
                      padding-left: 0 !important;
                      margin-top: 10px !important;
                      margin-bottom: 10px !important;
                    }
                    .prose-editor ol li {
                      display: flex !important;
                      align-items: flex-start !important;
                      font-size: 14px !important;
                      color: #4b5563 !important;
                      margin-top: 6px !important;
                    }
                    .prose-editor ol li::before {
                      content: counter(item) !important;
                      counter-increment: item !important;
                      display: inline-flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                      width: 18px !important;
                      height: 18px !important;
                      border-radius: 6px !important;
                      background-color: #fef2f2 !important;
                      border: 1px solid rgba(254, 242, 242, 0.4) !important;
                      color: #990202 !important;
                      font-size: 10px !important;
                      font-weight: 900 !important;
                      margin-right: 10px !important;
                      flex-shrink: 0 !important;
                      margin-top: 2px !important;
                    }
                    .prose-editor hr {
                      border: 0 !important;
                      border-top: 1px solid #e5e7eb !important;
                      margin-top: 20px !important;
                      margin-bottom: 20px !important;
                    }
                    .prose-editor a {
                      color: #990202 !important;
                      text-decoration: underline !important;
                      text-underline-offset: 2px !important;
                      font-weight: 600 !important;
                      transition: color 0.15s !important;
                    }
                    .prose-editor a:hover {
                      color: #B91C1C !important;
                    }
                  `}</style>

                  <textarea
                    id="content"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="hidden"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#990202] hover:bg-[#800000] text-white font-extrabold py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 text-[16px] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
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

              <div className="bg-white/40 shadow-md border border-black/[0.04] rounded-2xl py-3 px-4 flex items-center justify-between">
                <div className="text-[16px] font-extrabold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Pratinjau Langsung (Live Preview)</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="bg-white rounded-3xl shadow-md border border-black/[0.04] overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.03)] flex flex-col group transition-all duration-300">
                <div className="relative aspect-[1.6] w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                  <ImageComponent
                    src={getPreviewImage()}
                    alt="Cover preview"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex px-3 py-1.5 rounded-lg text-[16px] font-black uppercase tracking-wider bg-white text-[#990202] shadow-sm border border-red-50">
                      {category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-[16px] font-bold text-gray-400">
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#990202]/30" />
                        <span>Hari ini</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#990202]/30" />
                        <span>{readTime || "5 menit baca"}</span>
                      </div>
                    </div>
                    <h3 className="font-heading text-[16px] sm:text-[16px] font-extrabold text-gray-950 leading-snug line-clamp-2">
                      {title || "Judul artikel Anda akan tampil di sini..."}
                    </h3>
                    <p className="text-[16px] text-gray-500 leading-relaxed font-normal line-clamp-3">
                      {excerpt || "Tulis kutipan singkat pada form di sebelah kiri untuk melihat gambaran pratinjau cuplikan artikel di sini..."}
                    </p>
                  </div>
                  <div className="flex items-center text-[16px] font-extrabold text-[#990202] mt-6 pt-4 border-t border-gray-100">
                    <span>Baca Selengkapnya</span>
                    <span className="ml-1.5">→</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50/50 rounded-2xl border border-amber-100 p-5 leading-relaxed text-[16px] text-amber-800 font-medium">
                <div className="font-extrabold text-[16px] mb-1.5 text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Tips Menulis Artikel Populer</span>
                </div>
                Gunakan judul yang memancing rasa ingin tahu, lengkapi dengan kutipan pendek yang persuasif, dan tulislah sub-bab menggunakan format heading <code className="bg-amber-100/60 px-1.5 py-0.5 rounded font-black text-amber-950">###</code> agar artikel tersusun secara rapi dan mudah dibaca oleh klien.
              </div>

              {/* Format Cheat Sheet Card */}
              <div className="bg-white rounded-3xl shadow-md border border-black/[0.04] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <FileText className="w-5 h-5 text-[#990202]" />
                  <span className="text-[16px] font-extrabold text-gray-900">
                    Contoh Hasil Tampilan Format
                  </span>
                </div>

                <div className="space-y-4 text-[16px] leading-relaxed text-gray-600">
                  {/* Heading H3 */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Sub-judul (H3)
                    </div>
                    <div className="border-l-4 border-[#990202] pl-3 py-0.5 font-extrabold text-gray-950 text-[16px]">
                      Contoh Judul Sub-bab
                    </div>
                  </div>

                  {/* Bold text */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Teks Tebal
                    </div>
                    <div className="bg-gray-50/50 p-2.5 rounded-lg shadow-sm border border-black/[0.02] font-medium">
                      Menjamin <strong className="font-extrabold text-gray-900">pemisahan harta pribadi</strong> secara hukum.
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Daftar Poin (Bullet List)
                    </div>
                    <ul className="bg-gray-50/50 p-2.5 rounded-lg shadow-sm border border-black/[0.02] list-none pl-0 space-y-1.5 font-medium">
                      <li className="relative pl-4 flex items-center">
                        <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#990202]/70" />
                        <span>Dokumen Akta Pendirian</span>
                      </li>
                      <li className="relative pl-4 flex items-center">
                        <span className="absolute left-0 w-1.5 h-1.5 rounded-full bg-[#990202]/70" />
                        <span>Pengesahan Kemenkumham</span>
                      </li>
                    </ul>
                  </div>

                  {/* Numbered List */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Daftar Angka (Numbered List)
                    </div>
                    <ol className="bg-gray-50/50 p-2.5 rounded-lg shadow-sm border border-black/[0.02] list-none pl-0 space-y-1.5 font-medium">
                      <li className="flex items-center">
                        <span className="w-4.5 h-4.5 bg-red-50 text-[#990202] text-[16px] font-black rounded flex items-center justify-center mr-2 border border-red-100/40">1</span>
                        <span>Registrasi akun OSS</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-4.5 h-4.5 bg-red-50 text-[#990202] text-[16px] font-black rounded flex items-center justify-center mr-2 border border-red-100/40">2</span>
                        <span>Penerbitan NIB</span>
                      </li>
                    </ol>
                  </div>

                  {/* Horizontal Rule */}
                  <div className="space-y-1">
                    <div className="text-[16px] font-extrabold text-gray-400 uppercase tracking-wide">
                      Garis Pembatas
                    </div>
                    <div className="bg-gray-50/50 py-2.5 px-2 rounded-lg shadow-sm border border-black/[0.02] flex items-center justify-center">
                      <hr className="w-full border-gray-200" />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

// Simple custom markdown renderer to ensure clean semantic HTML with premium styling
function renderMarkdownContent(text: string) {
  const blocks = text.split("\n\n");
  let headingCounter = 0;

  return blocks.map((block, idx) => {
    const trimmed = block.trim();

    // Horizontal Rule
    if (trimmed === "---") {
      return <hr key={idx} className="my-6 border-gray-200/60" />;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      headingCounter++;
      const headingText = trimmed.replace("### ", "");
      const headingId = headingText
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
      return (
        <h3
          key={idx}
          id={headingId}
          className="font-heading text-[16px] sm:text-[16px] font-extrabold text-gray-950 mt-6 mb-3 leading-tight flex items-center scroll-mt-24 border-l-4 border-[#990202] pl-2.5"
        >
          {headingText}
        </h3>
      );
    }

    // Bullet Lists
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map((li) => li.replace(/^[\*\-]\s+/, ""));
      return (
        <ul key={idx} className="space-y-2 my-4 pl-1 list-none">
          {items.map((item, itemIdx) => {
            const parsedItem = parseBoldText(item);
            return (
              <li key={itemIdx} className="text-[16px] leading-relaxed text-gray-600 relative pl-5 flex items-start">
                <span className="absolute left-0 top-[7px] w-1.5 h-1.5 rounded-full bg-[#990202]/70" />
                <span className="flex-1">{parsedItem}</span>
              </li>
            );
          })}
        </ul>
      );
    }

    // Numbered Lists
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split("\n").map((li) => li.replace(/^\d+\.\s+/, ""));
      return (
        <ol key={idx} className="space-y-2 my-4 pl-1 list-none">
          {items.map((item, itemIdx) => {
            const parsedItem = parseBoldText(item);
            return (
              <li key={itemIdx} className="text-[16px] leading-relaxed text-gray-600 flex items-start">
                <span className="flex items-center justify-center w-5 h-5 rounded-lg bg-red-50 text-[#990202] text-[16px] font-black mr-2.5 flex-shrink-0 mt-0.5 border border-red-100/40">
                  {itemIdx + 1}
                </span>
                <span className="flex-1">{parsedItem}</span>
              </li>
            );
          })}
        </ol>
      );
    }

    // Default Paragraph with Bold text parser
    return (
      <p key={idx} className="text-[16px] leading-[1.7] text-gray-600 font-normal my-3">
        {parseBoldText(trimmed)}
      </p>
    );
  });
}

// Utility to parse **bold** text to standard JSX strong tags
function parseBoldText(text: string) {
  const parts = text.split(/\*\*([^*]+)\*\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong key={index} className="font-extrabold text-gray-900">
          {part}
        </strong>
      );
    }
    return part;
  });
}

// Bi-directional Parsers: Convert Markdown to HTML for editor, and HTML back to Markdown for database

function markdownToHtml(markdown: string): string {
  if (!markdown) return "";
  
  const normalized = markdown.replace(/\r\n/g, "\n");
  const blocks = normalized.split(/\n\n+/);
  
  const htmlBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return "";
    
    // Horizontal rule
    if (trimmed === "---") {
      return "<hr>";
    }
    
    // Image (standalone block)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return `<img src="${imgMatch[2]}" alt="${imgMatch[1]}" style="max-width:100%;border-radius:12px;margin:16px 0;display:block" />`;
    }
    
    // Headings
    if (trimmed.startsWith("### ")) {
      const text = trimmed.substring(4);
      return `<h3>${parseMarkdownInlineHtml(text)}</h3>`;
    }
    
    // Unordered list
    if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      const items = trimmed.split("\n").map(li => {
        const itemText = li.replace(/^[\*\-]\s+/, "");
        return `<li>${parseMarkdownInlineHtml(itemText)}</li>`;
      });
      return `<ul>${items.join("")}</ul>`;
    }
    
    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split("\n").map(li => {
        const itemText = li.replace(/^\d+\.\s+/, "");
        return `<li>${parseMarkdownInlineHtml(itemText)}</li>`;
      });
      return `<ol>${items.join("")}</ol>`;
    }
    
    // Default Paragraph
    return `<p>${parseMarkdownInlineHtml(trimmed)}</p>`;
  });
  
  return htmlBlocks.filter(b => b !== "").join("");
}

function parseMarkdownInlineHtml(text: string): string {
  // Images: ![alt](url) -> <img>
  let result = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:12px;margin:8px 0;display:inline-block;vertical-align:middle" />');
  // Links: [text](url) -> <a href="url">text</a>
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  // Bold: **text** -> <strong>text</strong>
  result = result.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  return result;
}

function htmlToMarkdown(html: string): string {
  if (typeof window === "undefined") return "";
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const body = doc.body;
  
  const markdownBlocks: string[] = [];
  
  // Helper to extract text from a node converting specific formatting tags
  function getInlineMarkdown(element: HTMLElement): string {
    let md = "";
    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        md += node.textContent || "";
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const nodeName = el.nodeName.toUpperCase();
        if (nodeName === "STRONG" || nodeName === "B") {
          md += `**${el.textContent || ""}**`;
        } else if (nodeName === "A") {
          const href = el.getAttribute("href") || "#";
          const linkText = el.textContent || "";
          md += `[${linkText}](${href})`;
        } else if (nodeName === "IMG") {
          const src = el.getAttribute("src") || "";
          const alt = el.getAttribute("alt") || "";
          md += `![${alt}](${src})`;
        } else if (nodeName === "BR") {
          md += "\n";
        } else {
          md += getInlineMarkdown(el);
        }
      }
    });
    return md;
  }
  
  // Traverse top-level nodes of the body
  Array.from(body.childNodes).forEach(node => {
    const nodeName = node.nodeName.toUpperCase();
    
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.textContent?.trim();
      if (txt) {
        markdownBlocks.push(txt);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      
      if (nodeName === "H3") {
        markdownBlocks.push(`### ${getInlineMarkdown(el)}`);
      } else if (nodeName === "IMG") {
        const src = el.getAttribute("src") || "";
        const alt = el.getAttribute("alt") || "";
        markdownBlocks.push(`![${alt}](${src})`);
      } else if (nodeName === "UL") {
        const items: string[] = [];
        Array.from(el.querySelectorAll("li")).forEach(li => {
          items.push(`* ${getInlineMarkdown(li)}`);
        });
        if (items.length > 0) {
          markdownBlocks.push(items.join("\n"));
        }
      } else if (nodeName === "OL") {
        const items: string[] = [];
        Array.from(el.querySelectorAll("li")).forEach((li, idx) => {
          items.push(`${idx + 1}. ${getInlineMarkdown(li)}`);
        });
        if (items.length > 0) {
          markdownBlocks.push(items.join("\n"));
        }
      } else if (nodeName === "HR") {
        markdownBlocks.push("---");
      } else if (nodeName === "P" || nodeName === "DIV") {
        const content = getInlineMarkdown(el).trim();
        if (content) {
          markdownBlocks.push(content);
        }
      } else if (nodeName === "BR") {
        // Line break
      } else {
        const content = getInlineMarkdown(el).trim();
        if (content) {
          markdownBlocks.push(content);
        }
      }
    }
  });
  
  return markdownBlocks.join("\n\n");
}

