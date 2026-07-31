"use client";

import React, { useState, useMemo } from "react";
import { X, Search, CheckCircle2, Circle, Mail, MousePointerClick, Clock, Zap } from "lucide-react";
import type { ContactWithEngagement } from "./types";

type FilterGroup = "delivery" | "openStatus" | "frequency" | "recency" | "timing";

const DELIVERY_FILTERS = [
  { value: "all", label: "Semua" },
  { value: "sent", label: "Terkirim" },
  { value: "bounced", label: "Bounced" },
  { value: "never", label: "Belum Pernah" },
];

const OPEN_STATUS_FILTERS = [
  { value: "all", label: "Semua" },
  { value: "opened", label: "Pernah Buka" },
  { value: "never_opened", label: "Belum Pernah Buka" },
  { value: "open_no_click", label: "Buka tanpa Klik" },
  { value: "clicked", label: "Pernah Klik" },
];

const FREQUENCY_FILTERS = [
  { value: "all", label: "Semua" },
  { value: "active_3plus", label: "Aktif (3+)" },
  { value: "medium_1_2", label: "Sedang (1-2)" },
  { value: "inactive", label: "Tidak Aktif" },
];

const RECENCY_FILTERS = [
  { value: "all", label: "Semua" },
  { value: "30d", label: "30 hari" },
  { value: "60d", label: "60 hari" },
  { value: "90d", label: "90 hari" },
  { value: "older", label: "> 90 hari" },
];

const TIMING_FILTERS = [
  { value: "all", label: "Semua" },
  { value: "morning", label: "Pagi (06-12)" },
  { value: "afternoon", label: "Siang (12-17)" },
  { value: "evening", label: "Malam (17-24)" },
];

const FILTER_GROUPS: { group: FilterGroup; label: string; options: { value: string; label: string }[]; icon: React.ReactNode }[] = [
  { group: "delivery", label: "Status Kirim", options: DELIVERY_FILTERS, icon: <Mail className="w-3.5 h-3.5" /> },
  { group: "openStatus", label: "Status Buka", options: OPEN_STATUS_FILTERS, icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  { group: "frequency", label: "Frekuensi", options: FREQUENCY_FILTERS, icon: <MousePointerClick className="w-3.5 h-3.5" /> },
  { group: "recency", label: "Resensi", options: RECENCY_FILTERS, icon: <Clock className="w-3.5 h-3.5" /> },
  { group: "timing", label: "Waktu Favorit", options: TIMING_FILTERS, icon: <Zap className="w-3.5 h-3.5" /> },
];

function matchesFilter(contact: ContactWithEngagement, group: FilterGroup, value: string): boolean {
  if (value === "all") return true;
  const now = Date.now();

  switch (group) {
    case "delivery":
      if (value === "sent") return contact.totalSent > 0;
      if (value === "bounced") return contact.totalBounced > 0;
      if (value === "never") return contact.totalSent === 0;
      return true;
    case "openStatus":
      if (value === "opened") return contact.totalOpened > 0;
      if (value === "never_opened") return contact.totalOpened === 0 && contact.totalSent > 0;
      if (value === "open_no_click") return contact.totalOpened > 0 && contact.totalClicked === 0;
      if (value === "clicked") return contact.totalClicked > 0;
      return true;
    case "frequency":
      if (value === "active_3plus") return contact.avgOpenCount >= 3;
      if (value === "medium_1_2") return contact.avgOpenCount >= 1 && contact.avgOpenCount < 3;
      if (value === "inactive") return contact.avgOpenCount === 0;
      return true;
    case "recency": {
      if (!contact.lastOpenedAt) return value === "older";
      const daysSince = (now - new Date(contact.lastOpenedAt).getTime()) / (1000 * 60 * 60 * 24);
      if (value === "30d") return daysSince <= 30;
      if (value === "60d") return daysSince <= 60;
      if (value === "90d") return daysSince <= 90;
      if (value === "older") return daysSince > 90;
      return true;
    }
    case "timing":
      if (contact.avgOpenHour === null) return false;
      if (value === "morning") return contact.avgOpenHour >= 6 && contact.avgOpenHour < 12;
      if (value === "afternoon") return contact.avgOpenHour >= 12 && contact.avgOpenHour < 17;
      if (value === "evening") return contact.avgOpenHour >= 17 && contact.avgOpenHour < 24;
      return true;
    default:
      return true;
  }
}

function formatRelativeTime(date: Date | string | null): string {
  if (!date) return "—";
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Baru saja";
  if (minutes < 60) return `${minutes}m lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}j lalu`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}h lalu`;
  const months = Math.floor(days / 30);
  return `${months}bln lalu`;
}

const DAY_NAMES = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function SmartContactList({
  contacts,
  selectedIds,
  onSelectionChange,
}: {
  contacts: ContactWithEngagement[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
}) {
  const [filters, setFilters] = useState<Record<FilterGroup, string>>({
    delivery: "all",
    openStatus: "all",
    frequency: "all",
    recency: "all",
    timing: "all",
  });
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      if (search) {
        const q = search.toLowerCase();
        if (!c.email.toLowerCase().includes(q) && !(c.name && c.name.toLowerCase().includes(q))) {
          return false;
        }
      }
      return (Object.entries(filters) as [FilterGroup, string][]).every(([group, value]) =>
        matchesFilter(c, group, value)
      );
    });
  }, [contacts, filters, search]);

  const visibleIds = useMemo(() => new Set(filtered.map((c) => c.id)), [filtered]);
  const allVisibleSelected = filtered.length > 0 && filtered.every((c) => selectedIds.has(c.id));

  const toggleFilter = (group: FilterGroup, value: string) => {
    setFilters((prev) => ({ ...prev, [group]: prev[group] === value ? "all" : value }));
  };

  const toggleAllVisible = () => {
    const next = new Set(selectedIds);
    if (allVisibleSelected) {
      for (const id of visibleIds) next.delete(id);
    } else {
      for (const id of visibleIds) next.add(id);
    }
    onSelectionChange(next);
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange(next);
  };

  const activeFilterCount = Object.values(filters).filter((v) => v !== "all").length;

  return (
    <div className="space-y-4">
      {/* Filter Chips */}
      <div className="space-y-3">
        {FILTER_GROUPS.map(({ group, label, options, icon }) => (
          <div key={group} className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#787774] min-w-[100px]">
              {icon}
              {label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {options.map((opt) => {
                const isActive = filters[group] === opt.value && opt.value !== "all";
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleFilter(group, opt.value)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-medium border transition-all ${
                      isActive
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-white text-[#787774] border-[#EAEAEA] hover:border-[#787774]"
                    }`}
                  >
                    {opt.label}
                    {isActive && <X className="w-3 h-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Search + Select All */}
      <div className="flex items-center gap-3 pt-2 border-t border-[#EAEAEA]">
        <button
          type="button"
          onClick={toggleAllVisible}
          className="flex items-center gap-2 text-[13px] font-medium text-[#111111] hover:text-[#990202] transition-colors"
        >
          {allVisibleSelected ? (
            <CheckCircle2 className="w-4 h-4 text-[#990202]" />
          ) : (
            <Circle className="w-4 h-4 text-[#787774]" />
          )}
          Pilih Semua: {filtered.length.toLocaleString("id-ID")}
        </button>
        <div className="flex-1" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#787774]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari email atau nama..."
            className="pl-9 pr-4 py-2 border border-[#EAEAEA] rounded-[6px] text-[13px] focus:outline-none focus:border-[#111111] transition-colors w-[220px]"
          />
        </div>
      </div>

      {/* Contact List */}
      <div className="max-h-[350px] overflow-y-auto border border-[#EAEAEA] rounded-[6px] divide-y divide-[#EAEAEA]">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-[13px] text-[#787774]">
            {activeFilterCount > 0 ? "Tidak ada kontak yang cocok dengan filter." : "Tidak ada kontak aktif."}
          </div>
        ) : (
          filtered.map((c) => {
            const isSelected = selectedIds.has(c.id);
            return (
              <label
                key={c.id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  isSelected ? "bg-gray-50" : "hover:bg-gray-100"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleOne(c.id)}
                  className="w-4 h-4 rounded border-[#EAEAEA] text-[#111111] focus:ring-[#111111] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-[#111111] truncate">{c.email}</span>
                    {c.name && <span className="text-[12px] text-[#787774] truncate">({c.name})</span>}
                  </div>
                  {c.tags && (
                    <span className="text-[11px] text-[#787774]">{c.tags}</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-[12px] text-[#787774] shrink-0">
                  <span className="font-mono" title="Jumlah buka">{c.totalOpened}x</span>
                  <span title="Terakhir buka">{formatRelativeTime(c.lastOpenedAt)}</span>
                  {c.favoriteDayOfWeek !== null && (
                    <span title="Hari favorit" className="text-[#990202] font-medium">{DAY_NAMES[c.favoriteDayOfWeek]}</span>
                  )}
                </div>
              </label>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[12px] text-[#787774]">
        <span>Menampilkan {filtered.length.toLocaleString("id-ID")} dari {contacts.length.toLocaleString("id-ID")} kontak</span>
        <span className="font-medium text-[#111111]">Dipilih: {selectedIds.size.toLocaleString("id-ID")}</span>
      </div>
    </div>
  );
}
