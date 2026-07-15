"use client";

import React, { useState } from "react";
import { createLandingPage } from "../actions";

export default function NewLandingPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Auto-generate slug: lowercase, replace non-alphanumeric with hyphen, remove consecutive hyphens
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    setSlug(generatedSlug);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Buat Landing Page Baru</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form action={createLandingPage} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">Judul Internal</label>
            <input 
              type="text" 
              name="title" 
              required
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              placeholder="Contoh: Promo Kemerdekaan 2026"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">URL Slug</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                /lp/
              </span>
              <input 
                type="text" 
                name="slug" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                pattern="[a-z0-9-]+"
                title="Hanya huruf kecil, angka, dan strip (-)"
                className="flex-1 px-4 py-2.5 rounded-r-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                placeholder="promo-kemerdekaan"
              />
            </div>
          </div>
          <div className="pt-4 flex justify-end">
            <button 
              type="submit"
              className="bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-800 transition-colors"
            >
              Buat & Lanjut ke Editor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
