import { useState, useMemo } from 'react';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  verticalListSortingStrategy, 
  useSortable,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Image as ImageIcon, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Copy, 
  Plus, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo2, 
  Redo2, 
  Eye, 
  EyeOff, 
  Check, 
  MessageSquare,
  Sparkles,
  HelpCircle,
  Layers,
  MousePointerClick,
  Truck,
  Gift,
  ShoppingBag,
  ExternalLink,
  Upload,
  Loader2
} from 'lucide-react';
import ImagePicker from './ImagePicker';
import { api } from '../lib/api';

// --- Block Types & Data Structures ---
export type BlockType = 
  | 'Hero' 
  | 'Banner' 
  | 'PromoCards'
  | 'MarketplaceTrust'
  | 'BottomPromo'
  | 'Features' 
  | 'Testimonials' 
  | 'Pricing' 
  | 'LeadForm' 
  | 'FAQ' 
  | 'CTA' 
  | 'Text' 
  | 'Button' 
  | 'Image';

export interface BlockData {
  id: string;
  type: BlockType;
  content: Record<string, any>;
  styles?: {
    paddingTop?: string;
    paddingBottom?: string;
    bgTheme?: 'white' | 'brand-soft' | 'dark' | 'brand-crimson';
    align?: 'left' | 'center' | 'right';
    textColor?: string;
    buttonColor?: string;
    colors?: Record<string, string>;
  };
}

// Preset defaults for new blocks
const defaultBlockPresets: Record<BlockType, { content: Record<string, any>; styles?: Record<string, any> }> = {
  Hero: {
    content: {
      headline: 'Solusi Legalitas & Pendirian Badan Usaha Terpercaya',
      subheadline: 'Proses kilat, 100% legal, didampingi konsultan hukum berpengalaman dari awal hingga izin terbit.',
      badge: 'PROMO BULAN INI',
      ctaText: 'Konsultasi Gratis via WhatsApp',
      ctaLink: 'https://wa.me/62818881422',
      secondaryCtaText: 'Lihat Paket Layanan',
      secondaryCtaLink: '#pricing',
      bgImage: '',
    },
    styles: { paddingTop: '80px', paddingBottom: '80px', bgTheme: 'brand-soft', align: 'center' }
  },
  Banner: {
    content: {
      url: 'https://cdn.easylegal.my.id/images/hero/hero-badan-usaha-v2.jpg',
      alt: 'Banner Promosi EasyLegal',
      caption: 'Layanan Kilat Pendirian PT & Legalitas',
      link: '#'
    },
    styles: { paddingTop: '32px', paddingBottom: '32px', bgTheme: 'white' }
  },
  PromoCards: {
    content: {
      card1Tag: 'JANGKAUAN NASIONAL',
      card1Title: 'Melayani Seluruh Indonesia',
      card1Desc: 'Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.',
      card1Icon: 'local_shipping',
      card2Tag: 'LEGAL FESTIVAL SPECIAL',
      card2Title: 'Menangkan iPhone & Hadiah senilai Rp 12.000.000',
      card2Badge: 'Setiap pembuatan PT berkesempatan dapat iPhone',
      card2Image: 'https://cdn.easylegal.my.id/images/iphone-mockup.png'
    },
    styles: { paddingTop: '40px', paddingBottom: '40px', bgTheme: 'white' }
  },
  MarketplaceTrust: {
    content: {
      headline: 'Transaksi Aman Via Marketplace',
      marketplaceName: 'Shopee',
      marketplaceLogo: 'https://cdn.easylegal.my.id/images/shopee.svg',
      image: 'https://cdn.easylegal.my.id/images/transaksi-shopee.png',
      description: 'Masih ragu bertransaksi online? Tenang, layanan pendirian perusahaan, perizinan usaha, dan pendaftaran HAKI kami tersedia di marketplace (Shopee) dengan jaminan transaksi yang aman dan terpercaya.',
      buttonText: 'Kunjungi Toko Shopee',
      buttonLink: 'https://shopee.co.id/easylegal'
    },
    styles: { paddingTop: '48px', paddingBottom: '48px', bgTheme: 'white' }
  },
  BottomPromo: {
    content: {
      card1Tag: 'JANGKAUAN NASIONAL',
      card1Title: 'Melayani Seluruh Indonesia',
      card1Desc: 'Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.',
      card1Icon: 'local_shipping',
      card2Tag: 'LEGAL FESTIVAL SPECIAL',
      card2Title: 'Menangkan iPhone & Hadiah senilai Rp 12.000.000',
      card2Badge: 'Setiap pembuatan PT berkesempatan dapat iPhone',
      card2Image: 'https://cdn.easylegal.my.id/images/iphone-mockup.png',
      marketplaceTitle: 'Transaksi Aman Via Marketplace',
      marketplaceLogo: 'https://cdn.easylegal.my.id/images/shopee.svg',
      marketplaceImage: 'https://cdn.easylegal.my.id/images/transaksi-shopee.png',
      marketplaceDesc: 'Masih ragu bertransaksi online? Tenang, layanan pendirian perusahaan, perizinan usaha, dan pendaftaran HAKI kami tersedia di marketplace (Shopee) dengan jaminan transaksi yang aman dan terpercaya.',
      marketplaceLink: 'https://shopee.co.id/easylegal'
    },
    styles: { paddingTop: '48px', paddingBottom: '64px', bgTheme: 'white' }
  },
  Features: {
    content: {
      title: 'Kenapa Memilih Layanan Kami?',
      subtitle: 'Keunggulan utama yang membuat ribuan pengusaha mempercayakan legalitasnya kepada kami.',
      columns: 3,
      items: [
        { icon: 'verified_user', title: '100% Legal & Resmi', desc: 'Seluruh akta dan izin diterbitkan langsung oleh Kemenkumham & instansi resmi RI.' },
        { icon: 'speed', title: 'Proses Kilat 24 Jam', desc: 'Pemberkasan cepat dan efisien tanpa birokrasi berbelit-belit.' },
        { icon: 'support_agent', title: 'Konsultasi Dedikasi', desc: 'Didampingi konsultan legal spesialis bisnis hingga selesai.' },
      ]
    },
    styles: { paddingTop: '64px', paddingBottom: '64px', bgTheme: 'white' }
  },
  Testimonials: {
    content: {
      title: 'Apa Kata Klien Kami?',
      subtitle: 'Testimoni nyata dari founder dan pengusaha yang telah menggunakan EasyLegal.',
      items: [
        { name: 'Budi Santoso', role: 'CEO PT Maju Makmur Nusantara', quote: 'Proses pendirian PT sangat cepat dan transparan. Tim sangat komunikatif!', rating: 5 },
        { name: 'Rina Wijaya', role: 'Founder Startup Kreatif', quote: 'Sangat terbantu untuk pendaftaran HAKI dan NIB. Recommended banget!', rating: 5 }
      ]
    },
    styles: { paddingTop: '64px', paddingBottom: '64px', bgTheme: 'brand-soft' }
  },
  Pricing: {
    content: {
      title: 'Pilihan Paket Hemat',
      subtitle: 'Transparan tanpa biaya tersembunyi. Pilih paket sesuai kebutuhan bisnis Anda.',
      plans: [
        {
          name: 'Paket PT Perorangan',
          price: 'Rp 1.499.000',
          period: 'sekali bayar',
          badge: 'BEST FOR UMKM',
          isPopular: false,
          features: ['Akta Pendirian Kemenkumham', 'SK Kemenkumham', 'NIB Berbasis Risiko', 'NPWP Perusahaan', 'Draft Rekening Bank'],
          ctaText: 'Pilih Paket Ini',
          ctaLink: 'https://wa.me/62818881422'
        },
        {
          name: 'Paket PT Regular Lengkap',
          price: 'Rp 3.999.000',
          period: 'sekali bayar',
          badge: 'PALING POPULER',
          isPopular: true,
          features: ['Akta Notaris & SK Kemenkumham', 'NIB & Sertifikat Standar', 'NPWP & E-Fin Perusahaan', 'Virtual Office 1 Tahun', 'Free Konsultasi Pajak 1 Bulan'],
          ctaText: 'Pilih Paket Populer',
          ctaLink: 'https://wa.me/62818881422'
        }
      ]
    },
    styles: { paddingTop: '72px', paddingBottom: '72px', bgTheme: 'white' }
  },
  LeadForm: {
    content: {
      title: 'Dapatkan Penawaran Khusus Hari Ini',
      subtitle: 'Isi formulir singkat di bawah ini, tim konsultan kami akan segera menghubungi Anda dalam 15 menit.',
      buttonText: 'Kirim & Dapatkan Penawaran',
      whatsappRedirect: 'https://wa.me/62818881422?text=Halo%20saya%20tertarik%20dengan%20promo%20landing%20page',
      showName: true,
      showEmail: true,
      showPhone: true,
      showBusinessName: true,
      showMessage: true
    },
    styles: { paddingTop: '64px', paddingBottom: '64px', bgTheme: 'brand-soft' }
  },
  FAQ: {
    content: {
      title: 'Pertanyaan yang Sering Diajukan',
      subtitle: 'Jawaban atas pertanyaan seputar syarat, waktu, dan alur pembuatan.',
      items: [
        { question: 'Berapa lama proses pendirian PT selesai?', answer: 'Proses pembuatan akta notaris hingga SK Kemenkumham rata-rata membutuhkan waktu 2-3 hari kerja.' },
        { question: 'Apakah saya perlu datang langsung ke kantor?', answer: 'Tidak perlu, seluruh proses dapat dilakukan secara online 100% dari mana saja.' },
        { question: 'Dokumen apa saja yang perlu disiapkan?', answer: 'Cukup siapkan KTP dan NPWP dari para pendiri atau pengurus perusahaan.' }
      ]
    },
    styles: { paddingTop: '64px', paddingBottom: '64px', bgTheme: 'white' }
  },
  CTA: {
    content: {
      title: 'Siap Mengembangkan Bisnis Anda Secara Legal?',
      description: 'Jangan tunda legalitas usaha Anda. Konsultasikan gratis sekarang bersama tim spesialis kami.',
      badge: 'KONSULTASI GRATIS',
      buttonText: 'Hubungi Kami via WhatsApp',
      buttonLink: 'https://wa.me/62818881422'
    },
    styles: { paddingTop: '64px', paddingBottom: '64px', bgTheme: 'brand-crimson' }
  },
  Text: {
    content: {
      title: 'Informasi Penting',
      text: 'Berdasarkan regulasi terbaru UU Cipta Kerja, pendirian badan usaha kini semakin fleksibel dan mudah diakses oleh seluruh lapisan pelaku usaha di Indonesia.',
    },
    styles: { paddingTop: '40px', paddingBottom: '40px', bgTheme: 'white' }
  },
  Button: {
    content: {
      text: 'Konsultasi Sekarang',
      link: 'https://wa.me/62818881422',
      style: 'primary',
      align: 'center'
    },
    styles: { paddingTop: '24px', paddingBottom: '24px', bgTheme: 'white' }
  },
  Image: {
    content: {
      url: 'https://cdn.easylegal.my.id/images/layanan/pt-1.jpg',
      alt: 'Legalitas Bisnis',
      caption: 'Dokumentasi Legalitas Resmi'
    },
    styles: { paddingTop: '32px', paddingBottom: '32px', bgTheme: 'white' }
  }
};

/**
 * Convert a CDN URL to a local /images/ path for preview inside the builder.
 * Production pages receive the original CDN URL stored in block.content.
 * The builder proxies /images → Express API → disk, so local paths always load.
 */
function toPreviewSrc(src: string | undefined | null): string {
  if (!src) return '';
  return src;
}

// Helper to normalize imported blocks
export function normalizeBlocks(rawSections: any): BlockData[] {
  if (!rawSections) return [];
  let parsed = rawSections;
  if (typeof rawSections === 'string') {
    try {
      parsed = JSON.parse(rawSections);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];

  return parsed.map((item: any, idx: number) => {
    const rawType = (item.type || 'Hero').toString();
    const typeKey = (Object.keys(defaultBlockPresets).find(
      k => k.toLowerCase() === rawType.toLowerCase()
    ) || 'Hero') as BlockType;

    const preset = defaultBlockPresets[typeKey] || defaultBlockPresets.Hero;
    const content = item.content || { ...item };
    delete content.id;
    delete content.type;
    delete content.styles;

    return {
      id: item.id || `block-${Date.now()}-${idx}`,
      type: typeKey,
      content: { ...preset.content, ...content },
      styles: { ...preset.styles, ...(item.styles || {}) }
    };
  });
}

// ─── Material Symbols Icon Picker ────────────────────────────────────────────
const MATERIAL_ICONS = [
  // Bisnis & Legalitas
  'verified', 'gavel', 'policy', 'handshake', 'business_center', 'apartment',
  'corporate_fare', 'account_balance', 'badge', 'work', 'groups', 'supervised_user_circle',
  'manage_accounts', 'admin_panel_settings', 'security', 'shield', 'lock', 'key',
  'assignment', 'description', 'article', 'task', 'checklist', 'fact_check',
  'grading', 'how_to_reg', 'done_all', 'check_circle', 'new_releases',
  // Keuangan & Pajak
  'payments', 'account_balance_wallet', 'credit_card', 'savings', 'trending_up',
  'currency_exchange', 'price_check', 'receipt_long', 'money_off', 'attach_money',
  'bar_chart', 'insights', 'analytics', 'show_chart', 'stacked_line_chart',
  // Komunikasi & Layanan
  'support_agent', 'headset_mic', 'chat', 'forum', 'mail', 'mark_email_read',
  'notifications_active', 'campaign', 'announcement', 'record_voice_over',
  'contact_phone', 'phone_in_talk', 'call', 'message', 'sms', 'inbox',
  // Proses & Alur
  'auto_awesome', 'rocket_launch', 'start', 'play_circle', 'bolt', 'flash_on',
  'speed', 'timer', 'schedule', 'hourglass_empty', 'update', 'history',
  'loop', 'refresh', 'sync', 'autorenew', 'cached', 'change_circle',
  // Lokasi & Jangkauan
  'location_on', 'my_location', 'map', 'explore', 'public', 'language',
  'place', 'travel_explore', 'flight', 'local_shipping', 'inventory',
  // Umum & UI
  'star', 'favorite', 'thumb_up', 'celebration', 'emoji_events', 'workspace_premium',
  'grade', 'military_tech', 'local_police', 'health_and_safety', 'add_moderator',
  'engineering', 'construction', 'build', 'settings', 'tune', 'dashboard',
  'grid_view', 'view_list', 'format_list_bulleted', 'checklist_rtl',
  'inventory_2', 'folder_open', 'cloud_done', 'download_done', 'published_with_changes',
  'more_time', 'event_available', 'calendar_month', 'date_range',
  // Teknologi
  'computer', 'smartphone', 'tablet', 'devices', 'cloud', 'cloud_upload',
  'cloud_sync', 'qr_code', 'qr_code_scanner', 'fingerprint', 'lock_person',
  'person_check', 'verified_user', 'privacy_tip', 'data_object', 'storage',
];

function IconPickerInline({ value, onChange }: { value: string; onChange: (icon: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = search
    ? MATERIAL_ICONS.filter(ic => ic.includes(search.toLowerCase()))
    : MATERIAL_ICONS;

  return (
    <div className="relative">
      {/* Trigger Row */}
      <div className="flex gap-1.5 items-center">
        <div className="flex-1 flex items-center gap-2 p-1.5 border border-gray-200 rounded-lg bg-white">
          {value ? (
            <>
              <span className="material-symbols-outlined text-[#6f0000] text-[20px] leading-none">{value}</span>
              <span className="text-[11px] font-mono text-gray-600 truncate">{value}</span>
            </>
          ) : (
            <span className="text-[11px] text-gray-400 italic">Belum dipilih</span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          className="p-1.5 bg-[#6f0000]/10 hover:bg-[#6f0000]/20 text-[#6f0000] rounded-lg text-[11px] font-bold transition shrink-0"
        >
          {open ? 'Tutup' : 'Pilih Icon'}
        </button>
      </div>

      {/* Dropdown Grid */}
      {open && (
        <div className="absolute z-50 left-0 top-full mt-1.5 w-full min-w-[280px] bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              placeholder="Cari icon... (e.g. verified, shield)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full text-xs px-2.5 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#6f0000]/30"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-6 gap-0.5 p-2 max-h-48 overflow-y-auto">
            {filtered.map(icon => (
              <button
                key={icon}
                type="button"
                onClick={() => { onChange(icon); setOpen(false); setSearch(''); }}
                title={icon}
                className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:bg-red-50 hover:text-[#6f0000] transition group ${
                  value === icon ? 'bg-[#6f0000]/10 text-[#6f0000] ring-1 ring-[#6f0000]/30' : 'text-gray-600'
                }`}
              >
                <span className="material-symbols-outlined text-[22px] leading-none">{icon}</span>
                <span className="text-[8px] mt-0.5 text-gray-400 group-hover:text-[#6f0000] truncate w-full text-center leading-tight">{icon.replace(/_/g, ' ')}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-6 text-center py-6 text-gray-400 text-xs">Tidak ada icon yang cocok</div>
            )}
          </div>
          <div className="px-3 py-2 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">{filtered.length} icon tersedia</span>
            <button
              type="button"
              onClick={() => { onChange(''); setOpen(false); }}
              className="text-[10px] text-red-500 font-semibold hover:underline"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Drop Zone for Drag and Drop insertion ---
const DropZone = ({
  index,
  activeDropIndex,
  onDropItem,
  onDragOverIndex,
  onDragLeaveIndex,
  isDraggingAny
}: {
  index: number;
  activeDropIndex: number | null;
  onDropItem: (data: any, targetIndex: number) => void;
  onDragOverIndex: (index: number) => void;
  onDragLeaveIndex: () => void;
  isDraggingAny: boolean;
}) => {
  const isTarget = activeDropIndex === index;

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        onDragOverIndex(index);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDragLeaveIndex();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
          const raw = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');
          if (raw) {
            const data = JSON.parse(raw);
            onDropItem(data, index);
          }
        } catch (err) {
          console.error(err);
        }
      }}
      className={`transition-all duration-150 relative flex items-center justify-center ${
        isTarget
          ? 'h-14 my-2 bg-[#FEF2F2] border-2 border-dashed border-[#6f0000] rounded-xl text-[#6f0000] shadow-sm z-30'
          : isDraggingAny
          ? 'h-6 my-1 bg-red-50/40 border border-dashed border-red-200 rounded opacity-80 hover:opacity-100 hover:h-12'
          : 'h-1 hover:h-4 group/drop'
      }`}
    >
      {isTarget ? (
        <div className="flex items-center gap-2 text-xs font-bold font-sans text-[#6f0000] animate-pulse">
          <Plus size={16} />
          <span>Lepas Di Sini untuk Menempatkan Komponen</span>
        </div>
      ) : isDraggingAny ? (
        <span className="text-[10px] text-gray-400 font-mono">Tarik ke sini</span>
      ) : null}
    </div>
  );
};

const SortableBlock = ({
  block,
  index,
  isActive,
  onSelect,
  onRemove,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  previewMode,
  viewport,
  onDragBlockStart,
  onDragBlockEnd,
}: {
  block: BlockData;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  previewMode: boolean;
  viewport: 'desktop' | 'tablet' | 'mobile';
  onDragBlockStart?: (e: React.DragEvent, index: number, id: string) => void;
  onDragBlockEnd?: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  /** Responsive class helper: pick class based on canvas viewport */
  const r = (mobile: string, tablet: string, desktop: string) => {
    if (viewport === 'mobile') return mobile;
    if (viewport === 'tablet') return tablet;
    return desktop;
  };

  const bgClasses = {
    'white': 'bg-white text-gray-900',
    'brand-soft': 'bg-[#FEF2F2]/60 text-gray-900',
    'dark': 'bg-[#0F172A] text-white',
    'brand-crimson': 'bg-[#6f0000] text-white'
  }[block.styles?.bgTheme || 'white'];

  const paddingStyle = {
    paddingTop: block.styles?.paddingTop || '48px',
    paddingBottom: block.styles?.paddingBottom || '48px',
    ...(block.styles?.textColor ? { '--override-text': block.styles.textColor } : {}),
    ...(block.styles?.buttonColor ? { '--override-btn': block.styles.buttonColor } : {})
  } as React.CSSProperties;

  const c = (key: string) => block.styles?.colors?.[key] ? { color: block.styles.colors[key] } : {};
  const bg = (key: string) => block.styles?.colors?.[key] ? { backgroundColor: block.styles.colors[key], borderColor: block.styles.colors[key] } : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={previewMode ? undefined : onSelect}
      className={`relative group transition-all ${
        isDragging ? 'opacity-30 border-2 border-dashed border-[#6f0000]' : ''
      } ${
        previewMode 
          ? '' 
          : `border-2 cursor-pointer ${isActive ? 'border-[#6f0000] ring-4 ring-[#6f0000]/10' : 'border-transparent hover:border-gray-300'}`
      }`}
    >
      {/* Floating Action Toolbar & Drag Handle */}
      {!previewMode && (
        <div
          className={`absolute -top-3.5 right-4 bg-[#6f0000] text-white rounded-md px-2.5 py-1 flex items-center gap-2 text-xs font-semibold shadow-lg transition-opacity z-20 ${
            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <span className="text-[10px] font-mono uppercase tracking-wider bg-white/20 px-1.5 py-0.5 rounded mr-1">
            {block.type}
          </span>
          {/* DRAG HANDLE */}
          <div 
            {...attributes} 
            {...listeners} 
            draggable={!previewMode}
            onDragStart={(e) => {
              const payload = JSON.stringify({ source: 'canvas', id: block.id, index });
              e.dataTransfer.setData('application/json', payload);
              e.dataTransfer.setData('text/plain', payload);
              e.dataTransfer.effectAllowed = 'move';
              if (onDragBlockStart) onDragBlockStart(e, index, block.id);
            }}
            onDragEnd={() => {
              if (onDragBlockEnd) onDragBlockEnd();
            }}
            className="cursor-grab active:cursor-grabbing hover:bg-white/20 px-1.5 py-0.5 rounded flex items-center gap-1 touch-none select-none" 
            title="Tahan dan geser untuk pindah urutan"
          >
            <GripVertical size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Drag</span>
          </div>
          <div className="w-px h-3 bg-white/30" />
          <button 
            type="button" 
            disabled={isFirst} 
            onClick={onMoveUp} 
            className="hover:text-red-200 disabled:opacity-30 disabled:pointer-events-none p-0.5"
            title="Pindah ke Atas"
          >
            <ArrowUp size={14} />
          </button>
          <button 
            type="button" 
            disabled={isLast} 
            onClick={onMoveDown} 
            className="hover:text-red-200 disabled:opacity-30 disabled:pointer-events-none p-0.5"
            title="Pindah ke Bawah"
          >
            <ArrowDown size={14} />
          </button>
          <button 
            type="button" 
            onClick={onDuplicate} 
            className="hover:text-red-200 p-0.5"
            title="Duplikat Section"
          >
            <Copy size={14} />
          </button>
          <div className="w-px h-3 bg-white/30" />
          <button 
            type="button" 
            onClick={onRemove} 
            className="hover:text-red-300 p-0.5"
            title="Hapus Section"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}

      {/* Render Component Content */}
      <div className={`${bgClasses} transition-colors`} style={paddingStyle}>
        {/* HERO SECTION */}
        {block.type === 'Hero' && (
          <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
            {block.content.badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-5 bg-[#6f0000]/10 text-[#6f0000] border border-[#6f0000]/20" style={c('badge')}>
                <Sparkles size={13} /> {block.content.badge}
              </span>
            )}
            <h1 className={`font-extrabold tracking-tight leading-tight ${r('text-2xl', 'text-3xl', 'text-5xl')}`} style={c('headline')}>
              {block.content.headline || 'Headline Landing Page'}
            </h1>
            <p className={`mt-4 opacity-80 max-w-2xl ${r('text-sm', 'text-base', 'text-lg')}`} style={c('subheadline')}>
              {block.content.subheadline || 'Subheadline penjelas penawaran Anda secara detail dan menarik.'}
            </p>
            <div className={`mt-8 flex flex-wrap gap-4 justify-center ${r('flex-col items-stretch w-full px-4', 'flex-row', 'flex-row')}`}>
              {block.content.ctaText && (
                <a
                  href={block.content.ctaLink || '#'}
                  onClick={e => previewMode ? undefined : e.preventDefault()}
                  className="px-6 py-3.5 bg-[#6f0000] text-white font-bold rounded-xl shadow-md hover:bg-[#850000] transition inline-flex items-center gap-2"
                  style={{ ...c('ctaText'), ...bg('ctaText') }}
                >
                  <MessageSquare size={18} /> {block.content.ctaText}
                </a>
              )}
              {block.content.secondaryCtaText && (
                <a
                  href={block.content.secondaryCtaLink || '#'}
                  onClick={e => previewMode ? undefined : e.preventDefault()}
                  className="px-6 py-3.5 bg-white text-gray-800 border border-gray-300 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition"
                  style={{ ...c('secondaryCtaText'), ...bg('secondaryCtaText') }}
                >
                  {block.content.secondaryCtaText}
                </a>
              )}
            </div>
          </div>
        )}

        {/* BANNER SECTION */}
        {block.type === 'Banner' && (
          <div className="max-w-5xl mx-auto px-6">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200/50 relative">
              <img
                src={toPreviewSrc(block.content.url) || 'https://placehold.co/1200x400/fee2e2/991b1b?text=Banner+Image'}
                alt={block.content.alt || 'Banner'}
                className="w-full h-auto max-h-[420px] object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/1200x400/fee2e2/991b1b?text=Banner+Image' }}
              />
              {block.content.caption && (
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm font-semibold">
                  {block.content.caption}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PROMO CARDS (JANGKAUAN NASIONAL & LEGAL FESTIVAL) */}
        {block.type === 'PromoCards' && (
          <div className="max-w-5xl mx-auto px-6">
            <div className={`grid gap-6 ${r('grid-cols-1', 'grid-cols-2', 'grid-cols-2')}`}>
              {/* Card 1: Jangkauan Nasional */}
              <div className={`bg-white border border-gray-100 rounded-3xl p-6 flex gap-5 items-start shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all ${r('flex-col text-center items-center', 'flex-row text-left', 'flex-row text-left')}`}>
                <div className={`w-14 h-14 rounded-2xl border border-red-100 flex-shrink-0 flex items-center justify-center bg-white shadow-xs`}>
                  <Truck className="w-7 h-7 text-gray-900" strokeWidth={1.5} />
                </div>
                <div className={`flex flex-col pt-0.5 ${r('text-center items-center', 'text-left', 'text-left')}`}>
                  <span className="text-xs font-black text-gray-400 tracking-[0.18em] uppercase mb-1.5">
                    {block.content.card1Tag || 'JANGKAUAN NASIONAL'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight mb-2">
                    {block.content.card1Title || 'Melayani Seluruh Indonesia'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-[290px]">
                    {block.content.card1Desc || 'Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah. Tidak ada add-on mendadak di tengah proses.'}
                  </p>
                </div>
              </div>

              {/* Card 2: Legal Festival Special */}
              <div className={`bg-white border border-gray-100 rounded-3xl p-6 flex gap-5 items-start shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all ${r('flex-col text-center items-center', 'flex-row text-left', 'flex-row text-left')}`}>
                <div className="w-14 h-14 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-xs border border-black/5 bg-gray-50 flex items-center justify-center">
                  <img 
                    src={toPreviewSrc(block.content.card2Image) || '/images/iphone-mockup.png'} 
                    alt="iPhone Promo" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/fee2e2/991b1b?text=Gift' }}
                  />
                </div>
                <div className={`flex flex-col pt-0.5 ${r('text-center items-center', 'text-left', 'text-left')}`}>
                  <span className="text-xs font-black text-gray-400 tracking-[0.18em] uppercase mb-1.5">
                    {block.content.card2Tag || 'LEGAL FESTIVAL SPECIAL'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight mb-2">
                    {block.content.card2Title || 'Menangkan iPhone & Hadiah senilai Rp 12.000.000'}
                  </h3>
                  {block.content.card2Badge && (
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-[#990202] text-white px-3 py-1 rounded-full mt-1 text-[11px] sm:text-xs font-bold tracking-wide shadow-xs text-left">
                        <Gift className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" strokeWidth={2.5} /> 
                        <span>{block.content.card2Badge}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MARKETPLACE TRUST SECTION */}
        {block.type === 'MarketplaceTrust' && (
          <div className="max-w-4xl mx-auto px-6">
            <div className={`flex items-center justify-center gap-8 ${r('flex-col text-center', 'flex-row text-left', 'flex-row text-left')}`}>
              {/* Image Side */}
              <div className="relative w-64 h-48 flex-shrink-0 flex items-center justify-center">
                <img 
                  src={toPreviewSrc(block.content.image) || '/images/transaksi-shopee.png'} 
                  alt="Transaksi Aman Marketplace" 
                  className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-500" 
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/fff/ee4d2d?text=Shopee+Payment' }}
                />
              </div>

              {/* Content Side */}
              <div className={`max-w-md flex flex-col ${r('items-center text-center', 'items-start text-left', 'items-start text-left')}`}>
                <h3 className={`font-black text-gray-900 leading-[1.2] mb-3 tracking-tight ${r('text-xl', 'text-2xl', 'text-3xl')}`}>
                  {block.content.headline || 'Transaksi Aman Via Marketplace'}
                </h3>
                
                {block.content.marketplaceLogo && (
                  <div className="h-9 mb-4 flex items-center">
                    <img 
                      src={toPreviewSrc(block.content.marketplaceLogo) || '/images/shopee.svg'} 
                      alt={block.content.marketplaceName || 'Shopee'} 
                      className="h-8 object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  </div>
                )}
                
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                  {block.content.description || 'Masih ragu bertransaksi online? Tenang, layanan pendirian perusahaan, perizinan usaha, dan pendaftaran HAKI kami tersedia di marketplace (Shopee) dengan jaminan transaksi yang aman dan terpercaya.'}
                </p>

                {block.content.buttonText && (
                  <a
                    href={block.content.buttonLink || 'https://shopee.co.id/easylegal'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => previewMode ? undefined : e.preventDefault()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#EE4D2D] hover:bg-[#D73211] text-white rounded-xl text-xs font-bold shadow-md transition"
                  >
                    <ShoppingBag size={14} />
                    <span>{block.content.buttonText}</span>
                    <ExternalLink size={12} className="opacity-80" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM PROMO (COMBINED CARDS + MARKETPLACE) */}
        {block.type === 'BottomPromo' && (
          <div className="max-w-5xl mx-auto px-6">
            {/* Top Cards */}
            <div className={`grid gap-6 mb-12 ${r('grid-cols-1', 'grid-cols-2', 'grid-cols-2')}`}>
              <div className={`bg-white border border-gray-100 rounded-3xl p-6 flex gap-5 items-start shadow-[0_4px_20px_rgba(0,0,0,0.015)] ${r('flex-col text-center items-center', 'flex-row text-left', 'flex-row text-left')}`}>
                <div className="w-14 h-14 rounded-2xl border border-red-100 flex-shrink-0 flex items-center justify-center bg-white shadow-xs">
                  <Truck className="w-7 h-7 text-gray-900" strokeWidth={1.5} />
                </div>
                <div className="flex flex-col pt-0.5 text-left">
                  <span className="text-xs font-black text-gray-400 tracking-[0.18em] uppercase mb-1.5">
                    {block.content.card1Tag || 'JANGKAUAN NASIONAL'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight mb-2">
                    {block.content.card1Title || 'Melayani Seluruh Indonesia'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                    {block.content.card1Desc || 'Semua biaya tertera di awal — termasuk jasa kami dan biaya pemerintah.'}
                  </p>
                </div>
              </div>

              <div className={`bg-white border border-gray-100 rounded-3xl p-6 flex gap-5 items-start shadow-[0_4px_20px_rgba(0,0,0,0.015)] ${r('flex-col text-center items-center', 'flex-row text-left', 'flex-row text-left')}`}>
                <div className="w-14 h-14 flex-shrink-0 relative rounded-2xl overflow-hidden shadow-xs border border-black/5 bg-gray-50 flex items-center justify-center">
                  <img 
                    src={toPreviewSrc(block.content.card2Image) || '/images/iphone-mockup.png'} 
                    alt="iPhone Promo" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/fee2e2/991b1b?text=Gift' }}
                  />
                </div>
                <div className="flex flex-col pt-0.5 text-left">
                  <span className="text-xs font-black text-gray-400 tracking-[0.18em] uppercase mb-1.5">
                    {block.content.card2Tag || 'LEGAL FESTIVAL SPECIAL'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight mb-2">
                    {block.content.card2Title || 'Menangkan iPhone & Hadiah senilai Rp 12.000.000'}
                  </h3>
                  {block.content.card2Badge && (
                    <div className="inline-flex items-center gap-1.5 bg-[#990202] text-white px-3 py-1 rounded-full mt-1 text-xs font-bold tracking-wide shadow-xs text-left">
                      <Gift className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" strokeWidth={2.5} /> 
                      <span>{block.content.card2Badge}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Marketplace Section */}
            <div className={`pt-10 border-t border-gray-100 flex items-center justify-center gap-8 ${r('flex-col text-center', 'flex-row text-left', 'flex-row text-left')}`}>
              <div className="relative w-64 h-48 flex-shrink-0 flex items-center justify-center">
                <img 
                  src={toPreviewSrc(block.content.marketplaceImage) || '/images/transaksi-shopee.png'} 
                  alt="Transaksi Aman via Shopee" 
                  className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-500" 
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/fff/ee4d2d?text=Shopee' }}
                />
              </div>

              <div className={`max-w-md flex flex-col ${r('items-center text-center', 'items-start text-left', 'items-start text-left')}`}>
                <h3 className={`font-black text-gray-900 leading-[1.2] mb-3 tracking-tight ${r('text-xl', 'text-2xl', 'text-3xl')}`}>
                  {block.content.marketplaceTitle || 'Transaksi Aman Via Marketplace'}
                </h3>
                
                <div className="h-8 mb-4">
                  <img 
                    src={toPreviewSrc(block.content.marketplaceLogo) || '/images/shopee.svg'} 
                    alt="Shopee Logo" 
                    className="h-7 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
                  {block.content.marketplaceDesc || 'Masih ragu bertransaksi online? Tenang, layanan pendirian perusahaan, perizinan usaha, dan pendaftaran HAKI kami tersedia di marketplace (Shopee) dengan jaminan transaksi yang aman dan terpercaya.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FEATURES SECTION */}
        {block.type === 'Features' && (
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className={`font-bold tracking-tight ${r('text-2xl', 'text-3xl', 'text-3xl')}`} style={c('title')}>{block.content.title}</h2>
              {block.content.subtitle && <p className={`mt-2 opacity-75 ${r('text-sm', 'text-base', 'text-base')}`} style={c('subtitle')}>{block.content.subtitle}</p>}
            </div>
            <div className={`grid gap-6 ${r('grid-cols-1', 'grid-cols-2', `grid-cols-${block.content.columns || 3}`)}`}>
              {(block.content.items || []).map((item: any, i: number) => (
                <div key={i} className="bg-white/80 backdrop-blur p-6 rounded-xl border border-gray-200/80 shadow-sm flex flex-col items-start text-left">
                  <div className="w-12 h-12 rounded-lg bg-[#FEF2F2] text-[#6f0000] flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined">{item.icon || 'check_circle'}</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 mb-2" style={c(`items_${i}_title`)}>{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed" style={c(`items_${i}_desc`)}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TESTIMONIALS SECTION */}
        {block.type === 'Testimonials' && (
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className={`font-bold tracking-tight ${r('text-2xl', 'text-3xl', 'text-3xl')}`}>{block.content.title}</h2>
              {block.content.subtitle && <p className="mt-2 text-sm opacity-75" style={c('subtitle')}>{block.content.subtitle}</p>}
            </div>
            <div className={`grid gap-6 ${r('grid-cols-1', 'grid-cols-2', 'grid-cols-2')}`}>
              {(block.content.items || []).map((t: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(t.rating || 5)].map((_, idx) => (
                      <span key={idx} className="material-symbols-outlined text-[18px]">star</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic mb-6 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-[#FEF2F2] text-[#6f0000] font-bold flex items-center justify-center text-sm">
                      {t.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{t.name}</h4>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRICING SECTION */}
        {block.type === 'Pricing' && (
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className={`font-bold tracking-tight ${r('text-2xl', 'text-3xl', 'text-3xl')}`}>{block.content.title}</h2>
              {block.content.subtitle && <p className="mt-2 text-sm opacity-75" style={c('subtitle')}>{block.content.subtitle}</p>}
            </div>
            <div className={`grid gap-8 max-w-4xl mx-auto ${r('grid-cols-1', 'grid-cols-2', 'grid-cols-2')}`}>
              {(block.content.plans || []).map((p: any, i: number) => (
                <div
                  key={i}
                  className={`relative bg-white rounded-2xl p-8 border ${
                    p.isPopular ? 'border-[#6f0000] shadow-xl ring-2 ring-[#6f0000]/20' : 'border-gray-200 shadow-sm'
                  } flex flex-col justify-between`}
                >
                  {p.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6f0000] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {p.badge}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{p.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-gray-900">{p.price}</span>
                      {p.period && <span className="text-xs text-gray-500">/ {p.period}</span>}
                    </div>
                    <ul className="mt-6 space-y-3">
                      {(p.features || []).map((f: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                          <Check size={16} className="text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <a
                      href={p.ctaLink || '#'}
                      onClick={e => previewMode ? undefined : e.preventDefault()}
                      className={`w-full py-3 rounded-xl font-bold text-sm block text-center transition ${
                        p.isPopular
                          ? 'bg-[#6f0000] text-white hover:bg-[#850000] shadow-md'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {p.ctaText || 'Pilih Paket'}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEAD FORM SECTION */}
        {block.type === 'LeadForm' && (
          <div className="max-w-xl mx-auto px-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900" style={c('title')}>{block.content.title}</h2>
                {block.content.subtitle && <p className="text-xs text-gray-500 mt-1.5" style={c('subtitle')}>{block.content.subtitle}</p>}
              </div>
              <div className="space-y-4">
                {block.content.showName && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Nama Lengkap</label>
                    <input type="text" disabled placeholder="Nama Anda" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                  </div>
                )}
                {block.content.showPhone && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Nomor WhatsApp</label>
                    <input type="text" disabled placeholder="0812xxxxxxx" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                  </div>
                )}
                {block.content.showEmail && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Email</label>
                    <input type="email" disabled placeholder="nama@email.com" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                  </div>
                )}
                {block.content.showBusinessName && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Nama Bisnis / Rencana PT</label>
                    <input type="text" disabled placeholder="PT Solusi Maju Bersama" className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50" />
                  </div>
                )}
                {block.content.showMessage && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Kebutuhan / Catatan</label>
                    <textarea disabled placeholder="Tuliskan kebutuhan Anda..." rows={2} className="w-full p-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 resize-none" />
                  </div>
                )}
                <button
                  type="button"
                  className="w-full py-3.5 bg-[#6f0000] text-white font-bold rounded-xl shadow-md hover:bg-[#850000] transition mt-2 text-sm"
                >
                  {block.content.buttonText || 'Kirim Sekarang'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ SECTION */}
        {block.type === 'FAQ' && (
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight" style={c('title')}>{block.content.title}</h2>
              {block.content.subtitle && <p className="text-sm opacity-75 mt-1" style={c('subtitle')}>{block.content.subtitle}</p>}
            </div>
            <div className="space-y-3">
              {(block.content.items || []).map((faq: any, i: number) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm text-left">
                  <div className="flex items-start gap-3">
                    <HelpCircle size={18} className="text-[#6f0000] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{faq.question}</h4>
                      <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA SECTION */}
        {block.type === 'CTA' && (
          <div className="max-w-4xl mx-auto px-6 text-center">
            {block.content.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 bg-white/20 text-white" style={c('badge')}>
                {block.content.badge}
              </span>
            )}
            <h2 className={`font-extrabold tracking-tight ${r('text-2xl', 'text-3xl', 'text-3xl')}`} style={c('title')}>{block.content.title}</h2>
            {block.content.description && <p className={`mt-3 opacity-90 max-w-xl mx-auto ${r('text-sm', 'text-base', 'text-base')}`} style={c('description')}>{block.content.description}</p>}
            <div className="mt-6">
              <a
                href={block.content.buttonLink || '#'}
                onClick={e => previewMode ? undefined : e.preventDefault()}
                className="px-8 py-3.5 bg-white text-[#6f0000] font-bold rounded-xl shadow-lg hover:bg-gray-100 transition inline-block text-sm"
                style={{ ...c('buttonText'), ...bg('buttonText') }}
              >
                {block.content.buttonText || 'Hubungi Kami'}
              </a>
            </div>
          </div>
        )}

        {/* TEXT / RICHTEXT SECTION */}
        {block.type === 'Text' && (
          <div className="max-w-3xl mx-auto px-6 text-left">
            {block.content.title && <h3 className="text-xl font-bold mb-3" style={c('title')}>{block.content.title}</h3>}
            <div className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap" style={c('text')}>
              {block.content.text}
            </div>
          </div>
        )}

        {/* BUTTON SECTION */}
        {block.type === 'Button' && (
          <div className="max-w-xl mx-auto px-6 text-center">
            <a
              href={block.content.link || '#'}
              onClick={e => previewMode ? undefined : e.preventDefault()}
              className="px-8 py-3 bg-[#6f0000] text-white font-bold rounded-xl shadow hover:bg-[#850000] transition inline-block text-sm"
            >
              {block.content.text || 'Klik Disini'}
            </a>
          </div>
        )}

        {/* IMAGE SECTION */}
        {block.type === 'Image' && (
          <div className="max-w-3xl mx-auto px-6 text-center">
            <img
              src={toPreviewSrc(block.content.url) || 'https://placehold.co/800x400/fee2e2/991b1b?text=Image'}
              alt={block.content.alt || 'Image'}
              className="w-full h-auto rounded-xl shadow-sm border border-gray-100 mx-auto"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/800x400/fee2e2/991b1b?text=Image' }}
            />
            {block.content.caption && <p className="text-xs text-gray-500 mt-2">{block.content.caption}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main PageBuilder Component ---
export default function PageBuilder({
  initialBlocks = [],
  onSave,
  onCancel,
}: {
  initialBlocks?: any;
  onSave: (blocks: BlockData[], status?: string) => void;
  onCancel: () => void;
}) {
  const normalizedInitial = useMemo(() => normalizeBlocks(initialBlocks), [initialBlocks]);
  const [blocks, setBlocks] = useState<BlockData[]>(
    normalizedInitial.length > 0 ? normalizedInitial : [
      { id: 'b1', type: 'Hero', content: defaultBlockPresets.Hero.content, styles: defaultBlockPresets.Hero.styles },
      { id: 'b2', type: 'Features', content: defaultBlockPresets.Features.content, styles: defaultBlockPresets.Features.styles },
      { id: 'b3', type: 'CTA', content: defaultBlockPresets.CTA.content, styles: defaultBlockPresets.CTA.styles }
    ]
  );

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(blocks[0]?.id || null);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewMode, setPreviewMode] = useState(false);
  const [searchElement, setSearchElement] = useState('');
  const [propertiesTab, setPropertiesTab] = useState<'content' | 'design'>('content');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeDropIndex, setActiveDropIndex] = useState<number | null>(null);
  const [isDraggingAny, setIsDraggingAny] = useState(false);

  // DnD Sensors (Pointer Sensor with 3px movement threshold ensures reliable drag activation)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // History stack for Undo / Redo
  const [history, setHistory] = useState<BlockData[][]>([blocks]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateBlocksWithHistory = (newBlocks: BlockData[]) => {
    setBlocks(newBlocks);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    if (newHistory.length > 20) newHistory.shift();
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setBlocks(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setBlocks(history[historyIndex + 1]);
    }
  };

  // Image Picker & Direct MinIO Upload State
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [activeImageKey, setActiveImageKey] = useState<string>('');
  const [uploadingImageKey, setUploadingImageKey] = useState<string | null>(null);

  const handleDirectImageUpload = async (key: string, file: File) => {
    setUploadingImageKey(key);
    try {
      const res = await api.uploadMedia(file);
      if (res && res.data && res.data.url) {
        updateContent(key, res.data.url);
      }
    } catch (err: any) {
      alert('Gagal mengunggah & kompres gambar ke MinIO CDN: ' + (err.message || 'Error'));
    } finally {
      setUploadingImageKey(null);
    }
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;
  const activeBlock = blocks.find(b => b.id === activeId) || null;

  // Add Block at end
  const addBlock = (type: BlockType) => {
    const preset = defaultBlockPresets[type] || defaultBlockPresets.Hero;
    const newBlock: BlockData = {
      id: `block-${Date.now()}`,
      type,
      content: JSON.parse(JSON.stringify(preset.content)),
      styles: JSON.parse(JSON.stringify(preset.styles || {}))
    };
    const newBlocks = [...blocks, newBlock];
    updateBlocksWithHistory(newBlocks);
    setSelectedBlockId(newBlock.id);
  };

  // Insert Block at specific index
  const insertBlockAt = (type: BlockType, index: number) => {
    const preset = defaultBlockPresets[type] || defaultBlockPresets.Hero;
    const newBlock: BlockData = {
      id: `block-${Date.now()}`,
      type,
      content: JSON.parse(JSON.stringify(preset.content)),
      styles: JSON.parse(JSON.stringify(preset.styles || {}))
    };
    const newBlocks = [...blocks];
    const safeIndex = Math.max(0, Math.min(newBlocks.length, index));
    newBlocks.splice(safeIndex, 0, newBlock);
    updateBlocksWithHistory(newBlocks);
    setSelectedBlockId(newBlock.id);
  };

  // Move Block to target index
  const moveBlockToIndex = (fromIndex: number, toIndex: number) => {
    if (fromIndex < 0 || fromIndex >= blocks.length) return;
    if (fromIndex === toIndex || fromIndex + 1 === toIndex) return;
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(fromIndex, 1);
    const targetIdx = fromIndex < toIndex ? toIndex - 1 : toIndex;
    newBlocks.splice(Math.max(0, Math.min(newBlocks.length, targetIdx)), 0, moved);
    updateBlocksWithHistory(newBlocks);
    setSelectedBlockId(moved.id);
  };

  // Drop handler for native HTML5 drops (Sidebar to Canvas, or Canvas Block to target DropZone)
  const handleDropItem = (data: any, targetIndex: number) => {
    if (data.source === 'sidebar' && data.blockType) {
      insertBlockAt(data.blockType, targetIndex);
    } else if (data.source === 'canvas' && typeof data.index === 'number') {
      moveBlockToIndex(data.index, targetIndex);
    }
    setIsDraggingAny(false);
    setActiveDropIndex(null);
  };

  // Remove Block
  const removeBlock = (id: string) => {
    const newBlocks = blocks.filter(b => b.id !== id);
    updateBlocksWithHistory(newBlocks);
    if (selectedBlockId === id) {
      setSelectedBlockId(newBlocks[0]?.id || null);
    }
  };

  // Duplicate Block
  const duplicateBlock = (id: string) => {
    const idx = blocks.findIndex(b => b.id === id);
    if (idx === -1) return;
    const original = blocks[idx];
    const clone: BlockData = {
      id: `block-${Date.now()}`,
      type: original.type,
      content: JSON.parse(JSON.stringify(original.content)),
      styles: JSON.parse(JSON.stringify(original.styles || {}))
    };
    const newBlocks = [...blocks];
    newBlocks.splice(idx + 1, 0, clone);
    updateBlocksWithHistory(newBlocks);
    setSelectedBlockId(clone.id);
  };

  // Move Block Up / Down
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= blocks.length) return;
    const newBlocks = arrayMove(blocks, index, targetIdx);
    updateBlocksWithHistory(newBlocks);
  };

  // Drag Handlers
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setIsDraggingAny(true);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setIsDraggingAny(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setIsDraggingAny(false);
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(i => i.id === active.id);
      const newIndex = blocks.findIndex(i => i.id === over.id);
      const newBlocks = arrayMove(blocks, oldIndex, newIndex);
      updateBlocksWithHistory(newBlocks);
    }
  };

  // Update Content
  const updateContent = (key: string, value: any) => {
    if (!selectedBlock) return;
    const updated: BlockData = {
      ...selectedBlock,
      content: { ...selectedBlock.content, [key]: value }
    };
    const newBlocks = blocks.map(b => b.id === selectedBlock.id ? updated : b);
    updateBlocksWithHistory(newBlocks);
  };

  // Update Styles
  const updateStyles = (key: string, value: any) => {
    if (!selectedBlock) return;
    const updated: BlockData = {
      ...selectedBlock,
      styles: { ...(selectedBlock.styles || {}), [key]: value }
    };
    const newBlocks = blocks.map(b => b.id === selectedBlock.id ? updated : b);
    updateBlocksWithHistory(newBlocks);
  };

  const handleImageSelect = (url: string) => {
    if (activeImageKey) {
      updateContent(activeImageKey, url);
    }
    setIsImagePickerOpen(false);
  };

  const handleSaveAction = (status: 'draft' | 'published') => {
    onSave(blocks, status);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Element library items
  const elementLibrary: { type: BlockType; name: string; icon: string; category: string }[] = [
    { type: 'Hero', name: 'Hero Header', icon: 'title', category: 'Layout' },
    { type: 'Banner', name: 'Promo Banner', icon: 'image', category: 'Layout' },
    { type: 'PromoCards', name: 'Kartu Promo & Jangkauan', icon: 'card_giftcard', category: 'Marketing' },
    { type: 'MarketplaceTrust', name: 'Transaksi Marketplace', icon: 'shopping_bag', category: 'Marketing' },
    { type: 'BottomPromo', name: 'Promo & Marketplace (Full)', icon: 'storefront', category: 'Marketing' },
    { type: 'Features', name: 'Grid Fitur/Layanan', icon: 'grid_view', category: 'Content' },
    { type: 'Testimonials', name: 'Testimoni Klien', icon: 'reviews', category: 'Marketing' },
    { type: 'Pricing', name: 'Tabel Harga/Paket', icon: 'payments', category: 'Marketing' },
    { type: 'LeadForm', name: 'Formulir Leads', icon: 'contact_mail', category: 'Conversion' },
    { type: 'FAQ', name: 'Tanya Jawab FAQ', icon: 'help_outline', category: 'Marketing' },
    { type: 'CTA', name: 'Call To Action', icon: 'smart_button', category: 'Conversion' },
    { type: 'Text', name: 'Blok Paragraf', icon: 'notes', category: 'Content' },
    { type: 'Button', name: 'Tombol Mandiri', icon: 'touch_app', category: 'Conversion' },
    { type: 'Image', name: 'Gambar Mandiri', icon: 'photo_size_select_actual', category: 'Content' }
  ];

  const filteredElements = elementLibrary.filter(el => 
    el.name.toLowerCase().includes(searchElement.toLowerCase()) || 
    el.type.toLowerCase().includes(searchElement.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#F1F5F9] flex flex-col text-gray-900 font-sans select-none">
      <style>{`
        [style*="--override-text"] h1, [style*="--override-text"] h2, [style*="--override-text"] h3, [style*="--override-text"] p, [style*="--override-text"] span, [style*="--override-text"] div, [style*="--override-text"] li {
          color: var(--override-text) !important;
        }
        
        [style*="--override-btn"] a, [style*="--override-btn"] button {
          background-color: var(--override-btn) !important;
          border-color: var(--override-btn) !important;
        }
      `}</style>
      {/* Top Header Bar */}
      <header className="h-14 bg-white border-b border-gray-200 flex justify-between items-center px-4 shrink-0 shadow-sm z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span> Kembali
          </button>
          <div className="h-4 w-px bg-gray-200" />
          
          {/* Viewport switcher */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-md transition ${viewport === 'desktop' ? 'bg-white text-[#6f0000] shadow-xs font-bold' : 'text-gray-500 hover:text-gray-800'}`}
              title="Desktop (1024px)"
            >
              <Monitor size={16} />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-md transition ${viewport === 'tablet' ? 'bg-white text-[#6f0000] shadow-xs font-bold' : 'text-gray-500 hover:text-gray-800'}`}
              title="Tablet (768px)"
            >
              <Tablet size={16} />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-md transition ${viewport === 'mobile' ? 'bg-white text-[#6f0000] shadow-xs font-bold' : 'text-gray-500 hover:text-gray-800'}`}
              title="Mobile (390px)"
            >
              <Smartphone size={16} />
            </button>
          </div>
        </div>

        {/* Undo/Redo & Preview & Save Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition"
            title="Undo"
          >
            <Undo2 size={16} />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg disabled:opacity-30 disabled:pointer-events-none transition"
            title="Redo"
          >
            <Redo2 size={16} />
          </button>
          <div className="h-4 w-px bg-gray-200" />
          
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              previewMode ? 'bg-[#6f0000] text-white shadow-xs' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {previewMode ? <EyeOff size={14} /> : <Eye size={14} />}
            {previewMode ? 'Edit Mode' : 'Preview'}
          </button>

          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check size={14} /> Tersimpan!
            </span>
          )}

          <button
            onClick={() => handleSaveAction('draft')}
            className="px-3.5 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Simpan Draft
          </button>
          <button
            onClick={() => handleSaveAction('published')}
            className="px-4 py-1.5 bg-[#6f0000] hover:bg-[#850000] text-white rounded-lg text-xs font-semibold shadow-sm transition flex items-center gap-1.5"
          >
            <Sparkles size={14} /> Publikasikan
          </button>
        </div>
      </header>

      {/* Main Workspace (Left Sidebar, Canvas, Right Sidebar) */}
      <div className="flex-1 flex min-h-0">
        {/* LEFT SIDEBAR: Element Library */}
        {!previewMode && (
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 min-h-0 overflow-y-auto">
            <div className="p-3.5 border-b border-gray-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Tambah Komponen</h2>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
                <input
                  type="text"
                  placeholder="Cari elemen..."
                  value={searchElement}
                  onChange={e => setSearchElement(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-[#6f0000] focus:ring-1 focus:ring-[#6f0000]/20"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              <p className="text-[11px] text-gray-500 italic">
                💡 Tips: Klik atau <span className="font-semibold text-[#6f0000]">tarik (drag)</span> komponen langsung ke posisi yang diinginkan di canvas.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {filteredElements.map((el) => (
                  <div
                    key={el.type}
                    draggable={true}
                    onDragStart={(e) => {
                      const payload = JSON.stringify({ source: 'sidebar', blockType: el.type });
                      e.dataTransfer.setData('application/json', payload);
                      e.dataTransfer.setData('text/plain', payload);
                      e.dataTransfer.effectAllowed = 'copy';
                      setIsDraggingAny(true);
                    }}
                    onDragEnd={() => {
                      setIsDraggingAny(false);
                      setActiveDropIndex(null);
                    }}
                    onClick={() => addBlock(el.type)}
                    className="p-3 bg-gray-50 hover:bg-[#FEF2F2] border border-gray-200 hover:border-[#6f0000]/40 rounded-xl flex flex-col items-center text-center gap-1.5 transition group cursor-grab active:cursor-grabbing select-none shadow-2xs"
                    title="Klik untuk menambah di akhir, atau Drag ke posisi yang diinginkan di canvas"
                  >
                    <span className="material-symbols-outlined text-gray-600 group-hover:text-[#6f0000] text-xl transition-colors">
                      {el.icon}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-700 group-hover:text-[#6f0000] transition-colors leading-tight">
                      {el.name}
                    </span>
                    <span className="text-[9px] font-medium text-gray-400 group-hover:text-[#6f0000]/70 flex items-center gap-0.5">
                      <GripVertical size={10} /> Tarik / Klik
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* CENTER: Canvas */}
        <main
          className="flex-1 bg-slate-100 overflow-y-auto p-6 pb-24 flex flex-col items-center"
          onClick={() => !previewMode && setSelectedBlockId(null)}
        >
          <div
            style={{
              width: viewport === 'mobile' ? '390px' : viewport === 'tablet' ? '768px' : '100%',
              maxWidth: viewport === 'desktop' ? '1080px' : undefined
            }}
            className="bg-white shadow-lg rounded-xl border border-gray-200 transition-all duration-300 flex flex-col w-full min-h-screen"
            onClick={e => e.stopPropagation()}
          >
            {blocks.length === 0 ? (
              <div 
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'copy';
                  setActiveDropIndex(0);
                }}
                onDragLeave={() => setActiveDropIndex(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  try {
                    const raw = e.dataTransfer.getData('application/json') || e.dataTransfer.getData('text/plain');
                    if (raw) {
                      const data = JSON.parse(raw);
                      handleDropItem(data, 0);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className={`flex-1 flex flex-col items-center justify-center p-12 text-center transition-all ${
                  activeDropIndex === 0 ? 'bg-[#FEF2F2] border-4 border-dashed border-[#6f0000]' : 'text-gray-400'
                }`}
              >
                <Layers size={48} className={`mb-3 ${activeDropIndex === 0 ? 'text-[#6f0000]' : 'opacity-30'}`} />
                <h3 className="font-bold text-gray-700 text-sm">
                  {activeDropIndex === 0 ? 'Lepas Komponen Di Sini!' : 'Halaman Masih Kosong'}
                </h3>
                <p className="text-xs text-gray-500 max-w-xs mt-1">
                  Tarik komponen dari sidebar kiri & lepas di sini untuk mulai merakit landing page.
                </p>
              </div>
            ) : (
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter} 
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
              >
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="flex flex-col">
                    {/* Top DropZone before the first item */}
                    {!previewMode && (
                      <DropZone
                        index={0}
                        activeDropIndex={activeDropIndex}
                        onDropItem={handleDropItem}
                        onDragOverIndex={(idx) => setActiveDropIndex(idx)}
                        onDragLeaveIndex={() => setActiveDropIndex(null)}
                        isDraggingAny={isDraggingAny}
                      />
                    )}

                    {blocks.map((block, idx) => (
                      <div key={block.id} className="flex flex-col">
                        <SortableBlock
                          block={block}
                          index={idx}
                          isActive={selectedBlockId === block.id}
                          onSelect={() => setSelectedBlockId(block.id)}
                          onRemove={() => removeBlock(block.id)}
                          onDuplicate={() => duplicateBlock(block.id)}
                          onMoveUp={() => moveBlock(idx, 'up')}
                          onMoveDown={() => moveBlock(idx, 'down')}
                          isFirst={idx === 0}
                          isLast={idx === blocks.length - 1}
                          previewMode={previewMode}
                          viewport={viewport}
                          onDragBlockStart={(_e, _bIndex) => {
                            setIsDraggingAny(true);
                            setActiveDropIndex(null);
                          }}
                          onDragBlockEnd={() => {
                            setIsDraggingAny(false);
                            setActiveDropIndex(null);
                          }}
                        />

                        {/* DropZone after each item */}
                        {!previewMode && (
                          <DropZone
                            index={idx + 1}
                            activeDropIndex={activeDropIndex}
                            onDropItem={handleDropItem}
                            onDragOverIndex={(i) => setActiveDropIndex(i)}
                            onDragLeaveIndex={() => setActiveDropIndex(null)}
                            isDraggingAny={isDraggingAny}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </SortableContext>
                <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
                  {activeBlock ? (
                    <div className="bg-white border-2 border-[#6f0000] shadow-2xl rounded-xl p-4 opacity-95 max-w-[650px] flex items-center justify-between pointer-events-none cursor-grabbing">
                      <div className="flex items-center gap-3">
                        <span className="p-2 bg-[#FEF2F2] text-[#6f0000] rounded-lg">
                          <GripVertical size={20} />
                        </span>
                        <div>
                          <span className="text-[10px] font-mono uppercase bg-[#6f0000] text-white px-2 py-0.5 rounded font-bold">
                            {activeBlock.type}
                          </span>
                          <p className="text-xs font-bold text-gray-800 mt-1 line-clamp-1">
                            {activeBlock.content.headline || activeBlock.content.title || activeBlock.content.text || activeBlock.type}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#6f0000] bg-[#FEF2F2] px-2.5 py-1 rounded-full border border-[#6f0000]/20">
                        Memindahkan posisi...
                      </span>
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR: Properties Panel */}
        {!previewMode && (
          <aside className="w-80 bg-white border-l border-gray-200 flex flex-col shrink-0 min-h-0 overflow-y-auto">
            <div className="p-3.5 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#6f0000] text-sm">tune</span>
                <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                  {selectedBlock ? `${selectedBlock.type} Properties` : 'Inspector'}
                </h2>
              </div>
            </div>

            {/* Tab: Content vs Design */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => setPropertiesTab('content')}
                className={`flex-1 py-2 text-xs font-bold border-b-2 transition ${
                  propertiesTab === 'content'
                    ? 'border-[#6f0000] text-[#6f0000] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Konten
              </button>
              <button
                onClick={() => setPropertiesTab('design')}
                className={`flex-1 py-2 text-xs font-bold border-b-2 transition ${
                  propertiesTab === 'design'
                    ? 'border-[#6f0000] text-[#6f0000] bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                Tampilan / Spacing
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {!selectedBlock ? (
                <div className="py-12 text-center text-gray-400">
                  <MousePointerClick size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-xs">Klik salah satu section di canvas untuk mengedit teks, gambar, dan tampilannya.</p>
                </div>
              ) : propertiesTab === 'design' ? (
                /* DESIGN PROPERTIES */
                <div className="space-y-5 text-xs">
                  <div>
                    <label className="block font-bold uppercase text-gray-600 mb-2">Tema Background</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'white', label: 'Putih', bg: 'bg-white border-gray-300' },
                        { id: 'brand-soft', label: 'Brand Soft', bg: 'bg-[#FEF2F2] border-red-200' },
                        { id: 'dark', label: 'Dark Navy', bg: 'bg-[#0F172A] border-slate-700 text-white' },
                        { id: 'brand-crimson', label: 'Crimson', bg: 'bg-[#6f0000] border-red-900 text-white' },
                      ].map(theme => (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => updateStyles('bgTheme', theme.id)}
                          className={`p-2.5 rounded-lg border text-left font-semibold flex items-center justify-between ${theme.bg} ${
                            (selectedBlock.styles?.bgTheme || 'white') === theme.id ? 'ring-2 ring-[#6f0000]' : ''
                          }`}
                        >
                          <span>{theme.label}</span>
                          {(selectedBlock.styles?.bgTheme || 'white') === theme.id && <Check size={14} />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div>
                    <label className="block font-bold uppercase text-gray-600 mb-2">Warna Teks Override</label>
                    <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="relative w-8 h-8 rounded-md overflow-hidden border border-gray-300 shadow-sm shrink-0">
                        <input
                          type="color"
                          value={selectedBlock.styles?.textColor || '#000000'}
                          onChange={(e) => updateStyles('textColor', e.target.value)}
                          className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-xs font-mono uppercase text-gray-700">{selectedBlock.styles?.textColor || 'Default'}</span>
                        {selectedBlock.styles?.textColor && (
                          <button 
                            type="button"
                            onClick={() => updateStyles('textColor', undefined)}
                            className="text-[10px] text-red-500 hover:underline font-semibold"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div>
                    <label className="block font-bold uppercase text-gray-600 mb-2">Warna Tombol Override</label>
                    <div className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="relative w-8 h-8 rounded-md overflow-hidden border border-gray-300 shadow-sm shrink-0">
                        <input
                          type="color"
                          value={selectedBlock.styles?.buttonColor || '#6f0000'}
                          onChange={(e) => updateStyles('buttonColor', e.target.value)}
                          className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-xs font-mono uppercase text-gray-700">{selectedBlock.styles?.buttonColor || 'Default'}</span>
                        {selectedBlock.styles?.buttonColor && (
                          <button 
                            type="button"
                            onClick={() => updateStyles('buttonColor', undefined)}
                            className="text-[10px] text-red-500 hover:underline font-semibold"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div>
                    <label className="block font-bold uppercase text-gray-600 mb-2">Padding / Jarak Vertikal</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-gray-400 block mb-1">Padding Atas</span>
                        <input
                          type="text"
                          value={selectedBlock.styles?.paddingTop || '48px'}
                          onChange={e => updateStyles('paddingTop', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block mb-1">Padding Bawah</span>
                        <input
                          type="text"
                          value={selectedBlock.styles?.paddingBottom || '48px'}
                          onChange={e => updateStyles('paddingBottom', e.target.value)}
                          className="w-full p-2 border border-gray-200 rounded-lg text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* CONTENT PROPERTIES */
                <div className="space-y-4 text-xs">
                  {Object.keys(selectedBlock.content).map((key) => {
                    const val = selectedBlock.content[key];

                    // Array of items (e.g. Features, Testimonials, FAQ, Pricing)
                    if (Array.isArray(val)) {
                      return (
                        <div key={key} className="pt-2 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <label className="font-bold uppercase text-gray-700">{key} ({val.length} item)</label>
                            <button
                              type="button"
                              onClick={() => {
                                const sample = val[0] ? JSON.parse(JSON.stringify(val[0])) : { title: 'Item Baru', desc: 'Deskripsi' };
                                updateContent(key, [...val, sample]);
                              }}
                              className="text-[11px] text-[#6f0000] font-bold hover:underline flex items-center gap-0.5"
                            >
                              <Plus size={12} /> Tambah Item
                            </button>
                          </div>
                          <div className="space-y-3">
                            {val.map((item: any, i: number) => (
                              <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded-xl relative space-y-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-bold text-gray-700 text-[10px] uppercase">#{i + 1}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const newItems = val.filter((_: any, idx: number) => idx !== i);
                                      updateContent(key, newItems);
                                    }}
                                    className="text-gray-400 hover:text-red-600"
                                    title="Hapus"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                                {Object.keys(item).map((fieldKey) => (
                                  <div key={fieldKey}>
                                    <span className="text-[10px] text-gray-400 uppercase block mb-0.5">{fieldKey}</span>
                                    {typeof item[fieldKey] === 'boolean' ? (
                                      <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                          type="checkbox"
                                          checked={item[fieldKey]}
                                          onChange={e => {
                                            const newItems = [...val];
                                            newItems[i] = { ...newItems[i], [fieldKey]: e.target.checked };
                                            updateContent(key, newItems);
                                          }}
                                          className="rounded text-[#6f0000]"
                                        />
                                        <span>Aktif</span>
                                      </label>
                                    ) : fieldKey === 'icon' ? (
                                      <IconPickerInline
                                        value={item[fieldKey] || ''}
                                        onChange={(iconName: string) => {
                                          const newItems = [...val];
                                          newItems[i] = { ...newItems[i], [fieldKey]: iconName };
                                          updateContent(key, newItems);
                                        }}
                                      />
                                    ) : (
                                      <div className="flex items-center gap-1.5 w-full">
                                        <input
                                          type="text"
                                          value={item[fieldKey] || ''}
                                          onChange={e => {
                                            const newItems = [...val];
                                            newItems[i] = { ...newItems[i], [fieldKey]: e.target.value };
                                            updateContent(key, newItems);
                                          }}
                                          className="flex-1 min-w-0 p-1.5 bg-white border border-gray-200 rounded text-xs"
                                        />
                                        <div className="relative w-6 h-6 shrink-0 rounded overflow-hidden border border-gray-200 bg-white" title="Ganti warna teks ini">
                                          <input
                                            type="color"
                                            value={selectedBlock.styles?.colors?.[`${key}_${i}_${fieldKey}`] || '#000000'}
                                            onChange={e => {
                                              const newColors = { ...(selectedBlock.styles?.colors || {}), [`${key}_${i}_${fieldKey}`]: e.target.value };
                                              updateStyles('colors', newColors);
                                            }}
                                            className="absolute -top-2 -left-2 w-10 h-10 cursor-pointer"
                                          />
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    // Boolean toggles
                    if (typeof val === 'boolean') {
                      return (
                        <label key={key} className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer">
                          <span className="font-bold uppercase text-gray-700 text-[11px]">{key}</span>
                          <input
                            type="checkbox"
                            checked={val}
                            onChange={e => updateContent(key, e.target.checked)}
                            className="rounded text-[#6f0000] focus:ring-[#6f0000] h-4 w-4"
                          />
                        </label>
                      );
                    }

                    const friendlyLabel = {
                      headline: 'Headline / Judul Utama',
                      subheadline: 'Subheadline / Deskripsi',
                      title: 'Judul Section',
                      subtitle: 'Sub-judul',
                      badge: 'Badge / Label Promo',
                      ctaText: 'Teks Tombol Utama',
                      ctaLink: 'Link Tombol Utama',
                      secondaryCtaText: 'Teks Tombol Sekunder',
                      secondaryCtaLink: 'Link Tombol Sekunder',
                      card1Tag: 'Tag Kartu 1 (Kiri)',
                      card1Title: 'Judul Kartu 1',
                      card1Desc: 'Deskripsi Kartu 1',
                      card1Icon: 'Icon Kartu 1',
                      card2Tag: 'Tag Kartu 2 (Kanan)',
                      card2Title: 'Judul Kartu 2',
                      card2Badge: 'Badge Promo Kartu 2',
                      card2Image: 'Gambar Kartu 2',
                      marketplaceTitle: 'Judul Marketplace',
                      marketplaceDesc: 'Deskripsi Marketplace',
                      marketplaceLogo: 'Logo Marketplace',
                      marketplaceImage: 'Gambar Transaksi / 3D',
                      marketplaceLink: 'Link Toko Marketplace',
                      buttonText: 'Teks Tombol',
                      buttonLink: 'Link Tombol',
                      description: 'Deskripsi Lengkap',
                      url: 'URL Gambar / Media',
                      alt: 'Alt Text Gambar',
                      caption: 'Caption / Keterangan',
                      text: 'Isi Paragraf / Konten'
                    }[key] || key;

                    // Image / Logo / URL inputs
                    if (key === 'url' || key === 'bgImage' || key.toLowerCase().includes('image') || key.toLowerCase().includes('logo')) {
                      return (
                        <div key={key}>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block font-bold uppercase text-gray-600 text-[11px]">{friendlyLabel}</label>
                            <span className="text-[10px] font-semibold text-[#990202]">MinIO CDN</span>
                          </div>
                          <div className="flex gap-1.5 items-center">
                            <input
                              type="text"
                              value={val || ''}
                              onChange={e => updateContent(key, e.target.value)}
                              placeholder="https://cdn.easylegal.my.id/images/..."
                              className="w-full p-2 border border-gray-200 rounded-lg text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setActiveImageKey(key);
                                setIsImagePickerOpen(true);
                              }}
                              className="p-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-700 shrink-0"
                              title="Pilih Gambar dari CDN Library"
                            >
                              <ImageIcon size={16} />
                            </button>
                            <label
                              className={`p-2 bg-red-50 hover:bg-red-100 border border-red-200 text-[#990202] rounded-lg cursor-pointer shrink-0 transition flex items-center justify-center ${uploadingImageKey === key ? 'opacity-70 pointer-events-none' : ''}`}
                              title="Upload & Kompres Otomatis ke MinIO CDN"
                            >
                              {uploadingImageKey === key ? (
                                <Loader2 size={16} className="animate-spin text-[#990202]" />
                              ) : (
                                <Upload size={16} />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                  const f = e.target.files?.[0];
                                  if (f) handleDirectImageUpload(key, f);
                                }}
                              />
                            </label>
                          </div>
                          {val && (
                            <div className="mt-1.5 flex items-center gap-2 p-1.5 bg-gray-50 rounded-lg border border-gray-100">
                              <img src={val} alt="Preview" className="w-8 h-8 rounded object-cover border border-gray-200 shrink-0" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                              <span className="text-[10px] text-gray-500 font-mono truncate">{val}</span>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Long text / textarea
                    if (key === 'subheadline' || key === 'description' || key === 'text' || key === 'subtitle' || key.toLowerCase().includes('desc')) {
                      return (
                        <div key={key}>
                          <label className="block font-bold uppercase text-gray-600 mb-1">{friendlyLabel}</label>
                          <div className="flex gap-2 items-start">
                            <textarea
                              rows={3}
                              value={val || ''}
                              onChange={e => updateContent(key, e.target.value)}
                              className="flex-1 min-w-0 p-2 border border-gray-200 rounded-lg text-xs resize-none"
                            />
                            <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 bg-white mt-0.5" title="Ganti warna teks ini">
                              <input
                                type="color"
                                value={selectedBlock.styles?.colors?.[key] || '#000000'}
                                onChange={e => {
                                  const newColors = { ...(selectedBlock.styles?.colors || {}), [key]: e.target.value };
                                  updateStyles('colors', newColors);
                                }}
                                className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Standard text input
                    return (
                      <div key={key}>
                        <label className="block font-bold uppercase text-gray-600 mb-1">{friendlyLabel}</label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={val || ''}
                            onChange={e => updateContent(key, e.target.value)}
                            className="flex-1 min-w-0 p-2 border border-gray-200 rounded-lg text-xs"
                          />
                          <div className="relative w-8 h-8 shrink-0 rounded-md overflow-hidden border border-gray-200 bg-white" title="Ganti warna teks ini">
                            <input
                              type="color"
                              value={selectedBlock.styles?.colors?.[key] || '#000000'}
                              onChange={e => {
                                const newColors = { ...(selectedBlock.styles?.colors || {}), [key]: e.target.value };
                                updateStyles('colors', newColors);
                              }}
                              className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Media Asset Picker Modal */}
      <ImagePicker
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </div>
  );
}
