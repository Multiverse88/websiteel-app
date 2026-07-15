"use client";

import React, { useState, useTransition } from "react";
import { SectionData } from "@/types/landing-page";
import SectionRenderer from "@/components/landing-page/SectionRenderer";
import SectionEditor from "./SectionEditor";
import { updateLandingPageSections, updateLandingPageSettings } from "../actions";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical, Plus } from "lucide-react";

interface BuilderClientProps {
  pageId: string;
  initialSections: SectionData[];
  pageSettings: {
    title: string;
    slug: string;
    status: string;
    description: string;
    pixelId: string;
    redirectSettings?: any;
  };
}

function SortableSection({ section, onSelect, onDelete }: { section: SectionData, onSelect: () => void, onDelete: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative group mb-4 border-2 border-transparent hover:border-red-500 rounded-xl overflow-hidden bg-white shadow-sm">
      <div className="absolute top-2 left-2 z-20 bg-white shadow rounded p-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity" {...attributes} {...listeners}>
        <GripVertical className="w-5 h-5 text-gray-500" />
      </div>
      <div className="absolute top-2 right-2 z-20 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onSelect} className="bg-white shadow rounded px-3 py-1 text-sm font-bold text-gray-700 hover:text-red-600">Edit</button>
        <button onClick={onDelete} className="bg-white shadow rounded p-1 text-gray-500 hover:text-red-600">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      <div className="pointer-events-none select-none">
        <SectionRenderer section={section} />
      </div>
    </div>
  );
}

export default function BuilderClient({ pageId, initialSections, pageSettings }: BuilderClientProps) {
  const [sections, setSections] = useState<SectionData[]>(initialSections);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const initialRedirect = typeof pageSettings.redirectSettings === "string"
    ? JSON.parse(pageSettings.redirectSettings)
    : (pageSettings.redirectSettings || {});

  const [redirectEnabled, setRedirectEnabled] = useState(initialRedirect?.enabled || false);
  const [redirectUrl, setRedirectUrl] = useState(initialRedirect?.redirectUrl || "");
  const [redirectDelay, setRedirectDelay] = useState(initialRedirect?.delaySeconds || 0);
  const [redirectPassUtm, setRedirectPassUtm] = useState(initialRedirect?.passUtmParams || false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        saveSections(newItems);
        return newItems;
      });
    }
  };

  const saveSections = (newSections: SectionData[]) => {
    startTransition(async () => {
      await updateLandingPageSections(pageId, JSON.stringify(newSections));
    });
  };

  const addSection = (type: SectionData["type"]) => {
    // eslint-disable-next-line
    const newId = Math.random().toString(36).substring(7);
    let newSection: any = { type, id: newId };
    
    // Add dummy data for visual preview
    if (type === 'hero') newSection = { ...newSection, headline: 'Headline Baru', ctaText: 'Klik Disini', ctaLink: '#' };
    if (type === 'banner') newSection = { ...newSection, image: { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=300&fit=crop', alt: 'Banner' } };
    if (type === 'features') newSection = { ...newSection, title: 'Fitur Unggulan', items: [] };
    if (type === 'testimonials') newSection = { ...newSection, title: 'Testimoni', items: [] };
    if (type === 'leadForm') newSection = { ...newSection, title: 'Hubungi Kami', fields: ['nama', 'no_hp'] };
    if (type === 'richText') newSection = { ...newSection, html: '<p>Teks baru</p>' };

    const updated = [...sections, newSection];
    setSections(updated);
    saveSections(updated);
  };

  const deleteSection = (id: string) => {
    const updated = sections.filter(s => s.id !== id);
    setSections(updated);
    if (activeId === id) setActiveId(null);
    saveSections(updated);
  };

  const activeSection = sections.find(s => s.id === activeId);

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Left Sidebar: Components */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col">
        <h2 className="font-bold text-gray-900 mb-4">Tambah Section</h2>
        <div className="space-y-2 flex-1 overflow-y-auto">
          {(['hero', 'banner', 'features', 'testimonials', 'leadForm', 'richText'] as const).map(type => (
            <button
              key={type}
              onClick={() => addSection(type)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 rounded-lg transition-colors text-left text-sm font-medium text-gray-700"
            >
              <span className="capitalize">{type}</span>
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <a href={`/lp/${pageSettings.slug}`} target="_blank" rel="noreferrer" className="block w-full text-center py-2 bg-gray-900 text-white rounded-lg text-sm font-bold">
            Preview Publik
          </a>
        </div>
      </div>

      {/* Center Canvas */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-8 relative">
        <div className="max-w-[1280px] mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white min-h-[800px]">
          {isPending && <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded shadow text-[14px] font-bold text-gray-500">Menyimpan...</div>}
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
              {sections.length === 0 && (
                <div className="flex items-center justify-center h-[400px] text-gray-400 font-medium">
                  Canvas kosong. Tambahkan section dari panel kiri.
                </div>
              )}
              {sections.map(section => (
                <SortableSection 
                  key={section.id} 
                  section={section} 
                  onSelect={() => setActiveId(section.id)}
                  onDelete={() => deleteSection(section.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* Right Sidebar: Editor */}
      <div className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col overflow-y-auto shadow-xl z-30">
        <h2 className="font-bold text-gray-900 mb-6 border-b pb-4">
          {activeSection ? `Edit ${activeSection.type}` : 'Page Settings'}
        </h2>
        
        {activeSection ? (
          <div className="space-y-4">
            <SectionEditor
              section={activeSection}
              onChange={(updatedSection) => {
                const updated = sections.map(s => s.id === activeSection.id ? updatedSection : s);
                setSections(updated);
                saveSections(updated);
              }}
            />
            <button onClick={() => setActiveId(null)} className="text-sm text-red-600 font-bold mt-4">
              ← Kembali ke Settings
            </button>
          </div>
        ) : (
          <form action={async (formData) => {
            startTransition(async () => {
              await updateLandingPageSettings(pageId, formData);
            });
          }} className="space-y-4">
            <div>
              <label className="block text-[14px] font-bold text-gray-700 mb-1">Judul Halaman</label>
              <input type="text" name="title" defaultValue={pageSettings.title} className="w-full text-sm px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-[14px] font-bold text-gray-700 mb-1">URL Slug</label>
              <input type="text" name="slug" defaultValue={pageSettings.slug} className="w-full text-sm px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-[14px] font-bold text-gray-700 mb-1">Status</label>
              <select name="status" defaultValue={pageSettings.status} className="w-full text-sm px-3 py-2 border rounded bg-white">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="block text-[14px] font-bold text-gray-700 mb-1">Meta Description</label>
              <textarea name="description" defaultValue={pageSettings.description} className="w-full text-sm px-3 py-2 border rounded h-20" />
            </div>
            <div>
              <label className="block text-[14px] font-bold text-gray-700 mb-1">Pixel ID (Meta/GTM)</label>
              <input type="text" name="pixelId" defaultValue={pageSettings.pixelId} className="w-full text-sm px-3 py-2 border rounded" />
            </div>
            
            <div className="border-t pt-4 space-y-3">
              <h3 className="text-[14px] font-bold text-gray-900">Pengaturan Redirect Lead</h3>
              <label className="flex items-center gap-2 text-[14px] font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={redirectEnabled}
                  onChange={(e) => setRedirectEnabled(e.target.checked)}
                  className="rounded text-red-700 focus:ring-red-500 h-3.5 w-3.5"
                />
                <input type="hidden" name="redirectEnabled" value={redirectEnabled ? "true" : "false"} />
                <span>Aktifkan Redirect setelah Submit</span>
              </label>

              {redirectEnabled && (
                <div className="space-y-3 pl-5 border-l-2 border-gray-100">
                  <div>
                    <label className="block text-[14px] font-bold text-gray-600 mb-1">Redirect URL (WhatsApp / Thank You Page)</label>
                    <input
                      type="text"
                      name="redirectUrl"
                      value={redirectUrl}
                      onChange={(e) => setRedirectUrl(e.target.value)}
                      placeholder="https://wa.me/..."
                      className="w-full text-[14px] px-3 py-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-bold text-gray-600 mb-1">Delay Redirect (Detik)</label>
                    <input
                      type="number"
                      name="redirectDelay"
                      value={redirectDelay}
                      onChange={(e) => setRedirectDelay(parseInt(e.target.value || "0", 10))}
                      min={0}
                      className="w-full text-[14px] px-3 py-2 border rounded"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-[14px] font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={redirectPassUtm}
                      onChange={(e) => setRedirectPassUtm(e.target.checked)}
                      className="rounded text-red-700 focus:ring-red-500 h-3.5 w-3.5"
                    />
                    <input type="hidden" name="redirectPassUtm" value={redirectPassUtm ? "true" : "false"} />
                    <span>Teruskan UTM Parameter ke URL Redirect</span>
                  </label>
                </div>
              )}
            </div>

            <button type="submit" disabled={isPending} className="w-full bg-red-700 text-white font-bold py-2 rounded shadow hover:bg-red-800 disabled:opacity-50">
              {isPending ? 'Menyimpan...' : 'Simpan Settings'}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
