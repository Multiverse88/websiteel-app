"use client";

import React, { useState } from "react";
import { SectionData, ImageAsset } from "@/types/landing-page";
import { uploadLandingPageImage } from "../actions";
import { Plus, Trash2, Upload, Loader2 } from "lucide-react";

interface SectionEditorProps {
  section: SectionData;
  onChange: (updatedSection: SectionData) => void;
}

export default function SectionEditor({ section, onChange }: SectionEditorProps) {
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleTextChange = (field: string, value: string) => {
    onChange({
      ...section,
      [field]: value,
    } as any);
  };

  const handleImageChange = (field: string, key: keyof ImageAsset, value: string) => {
    const currentImg = (section as any)[field] || { url: "", alt: "" };
    onChange({
      ...section,
      [field]: {
        ...currentImg,
        [key]: value,
      },
    } as any);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, isItemIndex?: number, itemField?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadKey = isItemIndex !== undefined ? `${field}-${isItemIndex}` : field;
    setUploadingField(uploadKey);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await uploadLandingPageImage(formData);

      if (isItemIndex !== undefined && itemField) {
        // Handle item list image upload (e.g., features, testimonials)
        const items = [...((section as any).items || [])];
        items[isItemIndex] = {
          ...items[isItemIndex],
          [itemField]: {
            url: res.url,
            alt: file.name.split(".")[0] || "image",
          },
        };
        onChange({
          ...section,
          items,
        } as any);
      } else {
        // Handle root image upload
        onChange({
          ...section,
          [field]: {
            url: res.url,
            alt: file.name.split(".")[0] || "image",
          },
        } as any);
      }
    } catch (err) {
      alert("Gagal mengunggah gambar. Pastikan format & koneksi benar.");
      console.error(err);
    } finally {
      setUploadingField(null);
    }
  };

  // Helper to update items in list (features, testimonials)
  const handleItemChange = (index: number, key: string, value: any) => {
    const items = [...((section as any).items || [])];
    items[index] = {
      ...items[index],
      [key]: value,
    };
    onChange({
      ...section,
      items,
    } as any);
  };

  const handleItemImageChange = (index: number, itemField: string, key: keyof ImageAsset, value: string) => {
    const items = [...((section as any).items || [])];
    const currentImg = items[index][itemField] || { url: "", alt: "" };
    items[index] = {
      ...items[index],
      [itemField]: {
        ...currentImg,
        [key]: value,
      },
    };
    onChange({
      ...section,
      items,
    } as any);
  };

  const addItem = (defaultObj: any) => {
    const items = [...((section as any).items || []), defaultObj];
    onChange({
      ...section,
      items,
    } as any);
  };

  const removeItem = (index: number) => {
    const items = [...((section as any).items || [])].filter((_, i) => i !== index);
    onChange({
      ...section,
      items,
    } as any);
  };

  const renderImageUpload = (
    label: string, 
    imageUrl: string, 
    imageAlt: string, 
    onUrlChange: (val: string) => void, 
    onAltChange: (val: string) => void,
    fieldKey: string,
    isItemIndex?: number,
    itemField?: string
  ) => {
    const uploadKey = isItemIndex !== undefined ? `${fieldKey}-${isItemIndex}` : fieldKey;
    const isUploading = uploadingField === uploadKey;

    return (
      <div className="space-y-2 border-t border-gray-100 pt-3 mt-3">
        <label className="block text-[14px] font-bold text-gray-700">{label}</label>
        {imageUrl && (
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border bg-gray-50 mb-2">
            <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="URL Gambar"
            value={imageUrl}
            onChange={(e) => onUrlChange(e.target.value)}
            className="flex-grow text-[14px] px-2.5 py-1.5 border rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
          />
          <label className="flex items-center justify-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border rounded cursor-pointer transition-colors text-[14px] font-medium text-gray-700">
            {isUploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Upload className="w-3.5 h-3.5" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, fieldKey, isItemIndex, itemField)}
              disabled={isUploading}
            />
          </label>
        </div>
        <input
          type="text"
          placeholder="Alt Text (SEO)"
          value={imageAlt}
          onChange={(e) => onAltChange(e.target.value)}
          className="w-full text-[14px] px-2.5 py-1.5 border rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
        />
      </div>
    );
  };

  switch (section.type) {
    case "hero":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Headline</label>
            <input
              type="text"
              value={section.headline || ""}
              onChange={(e) => handleTextChange("headline", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Subheadline</label>
            <textarea
              value={section.subheadline || ""}
              onChange={(e) => handleTextChange("subheadline", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded h-16"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">CTA Text</label>
            <input
              type="text"
              value={section.ctaText || ""}
              onChange={(e) => handleTextChange("ctaText", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">CTA Link</label>
            <input
              type="text"
              value={section.ctaLink || ""}
              onChange={(e) => handleTextChange("ctaLink", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>
          {renderImageUpload(
            "Hero Image",
            section.image?.url || "",
            section.image?.alt || "",
            (val) => handleImageChange("image", "url", val),
            (val) => handleImageChange("image", "alt", val),
            "image"
          )}
        </div>
      );

    case "banner":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Link Banner (Opsional)</label>
            <input
              type="text"
              value={section.link || ""}
              onChange={(e) => handleTextChange("link", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>
          {renderImageUpload(
            "Banner Image",
            section.image?.url || "",
            section.image?.alt || "",
            (val) => handleImageChange("image", "url", val),
            (val) => handleImageChange("image", "alt", val),
            "image"
          )}
        </div>
      );

    case "features":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Judul Section</label>
            <input
              type="text"
              value={section.title || ""}
              onChange={(e) => handleTextChange("title", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>

          <div className="space-y-3 pt-3 border-t">
            <div className="flex justify-between items-center">
              <label className="block text-[14px] font-bold text-gray-700">Daftar Fitur</label>
              <button
                type="button"
                onClick={() => addItem({ title: "Fitur Baru", desc: "Deskripsi fitur baru..." })}
                className="inline-flex items-center gap-1 text-[14px] font-bold text-red-600 hover:text-red-700"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah
              </button>
            </div>

            {(section.items || []).map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-50 border rounded-lg space-y-2 relative group/item">
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-600 opacity-0 group-hover/item:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div>
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => handleItemChange(idx, "title", e.target.value)}
                    placeholder="Judul Fitur"
                    className="w-full text-[14px] px-2.5 py-1.5 border rounded"
                  />
                </div>
                <div>
                  <textarea
                    value={item.desc || ""}
                    onChange={(e) => handleItemChange(idx, "desc", e.target.value)}
                    placeholder="Deskripsi Fitur"
                    className="w-full text-[14px] px-2.5 py-1.5 border rounded h-16"
                  />
                </div>
                {renderImageUpload(
                  "Icon/Gambar Fitur (Opsional)",
                  item.image?.url || "",
                  item.image?.alt || "",
                  (val) => handleItemImageChange(idx, "image", "url", val),
                  (val) => handleItemImageChange(idx, "image", "alt", val),
                  "items",
                  idx,
                  "image"
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "testimonials":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Judul Section</label>
            <input
              type="text"
              value={section.title || ""}
              onChange={(e) => handleTextChange("title", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>

          <div className="space-y-3 pt-3 border-t">
            <div className="flex justify-between items-center">
              <label className="block text-[14px] font-bold text-gray-700">Daftar Testimoni</label>
              <button
                type="button"
                onClick={() => addItem({ name: "Nama Klien", quote: "Puas sekali dengan pelayanannya..." })}
                className="inline-flex items-center gap-1 text-[14px] font-bold text-red-600 hover:text-red-700"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah
              </button>
            </div>

            {(section.items || []).map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-50 border rounded-lg space-y-2 relative group/item">
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-600 opacity-0 group-hover/item:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div>
                  <input
                    type="text"
                    value={item.name || ""}
                    onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                    placeholder="Nama Klien"
                    className="w-full text-[14px] px-2.5 py-1.5 border rounded"
                  />
                </div>
                <div>
                  <textarea
                    value={item.quote || ""}
                    onChange={(e) => handleItemChange(idx, "quote", e.target.value)}
                    placeholder="Kutipan Testimoni"
                    className="w-full text-[14px] px-2.5 py-1.5 border rounded h-16"
                  />
                </div>
                {renderImageUpload(
                  "Foto Klien (Opsional)",
                  item.photo?.url || "",
                  item.photo?.alt || "",
                  (val) => handleItemImageChange(idx, "photo", "url", val),
                  (val) => handleItemImageChange(idx, "photo", "alt", val),
                  "items",
                  idx,
                  "photo"
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "leadForm":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Judul Form</label>
            <input
              type="text"
              value={section.title || ""}
              onChange={(e) => handleTextChange("title", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Sub-judul Form</label>
            <input
              type="text"
              value={section.subtitle || ""}
              onChange={(e) => handleTextChange("subtitle", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Teks Tombol Kirim</label>
            <input
              type="text"
              value={section.buttonText || ""}
              onChange={(e) => handleTextChange("buttonText", e.target.value)}
              className="w-full text-[14px] px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1.5">Fields yang Wajib Diisi</label>
            <div className="space-y-2 border p-3 rounded bg-gray-50">
              {([
                { key: "nama", label: "Nama Lengkap (Selalu Wajib)" },
                { key: "no_hp", label: "No. HP (WhatsApp) (Selalu Wajib)" },
                { key: "email", label: "Email (Opsional)" },
                { key: "perusahaan", label: "Nama Perusahaan (Opsional)" },
              ] as const).map(({ key, label }) => {
                const isRequiredField = key === "nama" || key === "no_hp";
                const isChecked = isRequiredField || (section.fields || []).includes(key as any);

                return (
                  <label key={key} className="flex items-center gap-2 text-[14px] font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isRequiredField}
                      onChange={(e) => {
                        const currentFields = [...(section.fields || [])];
                        let updatedFields: typeof section.fields;
                        if (e.target.checked) {
                          updatedFields = [...currentFields, key as any];
                        } else {
                          updatedFields = currentFields.filter((f) => f !== key) as any;
                        }
                        onChange({
                          ...section,
                          fields: updatedFields,
                        });
                      }}
                      className="rounded text-red-700 focus:ring-red-500 h-3.5 w-3.5"
                    />
                    <span>{label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      );

    case "richText":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-[14px] font-bold text-gray-700 mb-1">Editor Kode HTML / Markdown</label>
            <textarea
              value={section.html || ""}
              onChange={(e) => handleTextChange("html", e.target.value)}
              placeholder="Masukkan tag HTML atau teks biasa di sini..."
              className="w-full font-mono text-[14px] p-3 border rounded h-64 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}
