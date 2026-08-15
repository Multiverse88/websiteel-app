import { getWhatsAppLink } from "@/lib/config";
import {
  Building2,
  Search,
  MessageCircle,
  ShieldCheck,
  FileCheck,
  Award,
  FileText, Files,
  Globe,
  Scale,
  TrendingUp,
  Clock,
  Users,
  Lock,
  Headphones,
  MapPin,
} from "lucide-react";

export const heroSlides = [
  {
    tag: "Layanan Unggulan",
    titleLines: [
      { text: "BUILD BUSINESS" },
      { text: "NOT JUST A" },
      { text: "COMPANY.", red: true },
    ],
    desc: "Kami membantu Anda mendirikan bisnis yang memiliki reputasi sebagai entitas profesional.",
    cta: "Konsultasi Gratis",
    ctaLink: "/kontak",
    cta2: "Lihat Paket Badan Usaha",
    cta2Link: "/layanan/pendirian-badan-usaha",
    trustBadges: ["2-12 jam pengerjaan", "Tracking real-time", "Garansi tuntas"],
    image: "/images/hero/hero-badan-usaha-v2.jpg",
  },
  {
    tag: "Perlindungan Merek",
    titleLines: [
      { text: "KEEP YOUR" },
      { text: "BUSINESS" },
      { text: "PROTECTED.", red: true },
    ],
    desc: "Kami menyediakan layanan pendaftaran merek untuk menjaga dan melindungi identitas bisnis Anda.",
    cta: "Cek Ketersediaan Merek",
    ctaLink: "/cek-nama",
    cta2: "Pelajari Lebih Lanjut",
    cta2Link: "/layanan/merek-haki",
    trustBadges: ["Database DJKI resmi", "Tracking real-time", "Garansi Selesai"],
    image: "/images/hero/hero-merek-v2.jpg",
  },
  {
    tag: "Layanan Terlengkap",
    titleLines: [
      { text: "START YOUR" },
      { text: "BUSINESS" },
      { text: "PROPERLY.", red: true },
    ],
    desc: "Wujudkan mimpi Anda menjadi Pengusaha bersama EASYLEGAL. Layanan pengurusan legalitas Terlengkap, Tercepat dan Terpercaya di Indonesia.",
    cta: "Konsultasi Gratis",
    ctaLink: "/kontak",
    cta2: "Lihat Semua Layanan",
    cta2Link: "/layanan",
    trustBadges: ["Terlengkap", "Tercepat", "Terpercaya"],
    image: "/images/hero/hero-iso-v2.jpg",
  },
];

export const quickTools = [
  {
    tag: "",
    title: "Cek Nama PT & Merek",
    desc: "Hindari nama yang sudah dipakai sebelum mendaftar.",
    cta: "Cek sekarang",
    href: "/cek-nama",
    icon: Building2,
  },
  {
    title: "Cek Kode KBLI",
    desc: "Temukan kode KBLI yang tepat untuk perizinan usaha Anda.",
    cta: "Buka pencarian",
    href: "/cek-kbli",
    icon: Search,
  },
  {
    title: "Konsultasi via WhatsApp",
    desc: "Tanya tim legal kami langsung — gratis, tanpa komitmen.",
    cta: "Mulai chat",
    href: getWhatsAppLink(),
    external: true,
    icon: MessageCircle,
  },
];

export const partnerLogos = ["KEMENKUMHAM", "OSS BKPM", "DJKI", "KEMENPERIN", "PSE Kominfo"];

export const layananIndividual = [
  // PERIZINAN & PENDIRIAN
  { name: "Pendirian & Pembubaran Badan Usaha", desc: "PT, PT PMA, PT Perorangan, CV, Yayasan, Perkumpulan, Firma, Koperasi", icon: Building2, circleBg: "#B91C1C", cardTint: "#FEF2F2", href: "/layanan/pendirian-badan-usaha", category: "PERIZINAN & PENDIRIAN" },
  { name: "Perizinan Usaha", desc: "NIB, OSS, PKP, PSE, PKKPR, LKPM", icon: FileCheck, circleBg: "#2563EB", cardTint: "#EFF6FF", href: "/layanan/nib-oss", category: "PERIZINAN & PENDIRIAN" },
  { name: "Pengurusan Dokumen Perusahaan", desc: "Perubahan Anggaran Dasar, Data Perusahaan, Cabang, Akta Jual Beli/Akuisisi", icon: Files, circleBg: "#059669", cardTint: "#ECFDF5", href: "/layanan/perubahan-akta", category: "PERIZINAN & PENDIRIAN" },
  { name: "Penyusunan & Review Perjanjian", desc: "Kontrak Bisnis, Kerja Sama", icon: Scale, circleBg: "#EA580C", cardTint: "#FFF7ED", href: "/layanan/kontrak-bisnis", category: "PERIZINAN & PENDIRIAN" },

  // PERIZINAN KHUSUS
  { name: "Pendaftaran HKI", desc: "Merek, Paten, Desain Industri, Hak Cipta", icon: ShieldCheck, circleBg: "#D97706", cardTint: "#FFFBEB", href: "/layanan/merek-haki", category: "PERIZINAN KHUSUS" },
  { name: "Apostille", desc: "Legalisasi dokumen lintas negara", icon: Globe, circleBg: "#0891B2", cardTint: "#ECFEFF", href: "/layanan/apostille", category: "PERIZINAN KHUSUS" },
  { name: "Layanan Imigrasi", desc: "Visa, KITAS", icon: Globe, circleBg: "#1E3A5F", cardTint: "#F0F4FF", href: "/layanan/visa-kitas", category: "PERIZINAN KHUSUS" },
  { name: "Perjanjian Pisah Harta", desc: "Perjanjian Perkawinan", icon: Scale, circleBg: "#7C3AED", cardTint: "#F5F3FF", href: "/layanan/perjanjian-perkawinan", category: "PERIZINAN KHUSUS" },
  { name: "Pelaporan RUPS", desc: "RUPS Tahunan & Luar Biasa", icon: Users, circleBg: "#DC2626", cardTint: "#FEF2F2", href: "/layanan/pelaporan-rups", category: "PERIZINAN KHUSUS" },

  // BRAND & UNIT EKOSISTEM
  { name: "Virtual Office", desc: "Alamat Bisnis Prestisius, Layanan Resepsionis, Ruang Meeting", icon: Building2, circleBg: "#B91C1C", cardTint: "#FEF2F2", href: "/layanan/virtual-office", category: "BRAND & UNIT EKOSISTEM", brandPrefix: "Easy", brandSuffix: "Office" },
  { name: "Layanan Perpajakan", desc: "Laporan SPT Tahunan Badan, Konsultasi Pajak, Kode Billing Pajak", icon: FileText, Files, circleBg: "#B91C1C", cardTint: "#FEF2F2", href: "#", category: "BRAND & UNIT EKOSISTEM", brandPrefix: "Easy", brandSuffix: "Tax" },
  { name: "Sertifikasi ISO", desc: "ISO 9001, 14001, 45001, 27001, dan standar lainnya", icon: Award, circleBg: "#B91C1C", cardTint: "#FEF2F2", href: "/layanan/sertifikasi-iso", category: "BRAND & UNIT EKOSISTEM", brandPrefix: "Easy", brandSuffix: "ISO" },
  { name: "PR & Media", desc: "Publikasi Media Nasional, Siaran Pers", icon: MessageCircle, circleBg: "#B91C1C", cardTint: "#FEF2F2", href: "/layanan/pr-media", category: "BRAND & UNIT EKOSISTEM", brandPrefix: "Easy", brandSuffix: "Press" },
  { name: "Branding & Company Profile", desc: "Desain Logo, Company Profile, Website, Marketing Kit", icon: FileText, Files, circleBg: "#B91C1C", cardTint: "#FEF2F2", href: "#", category: "BRAND & UNIT EKOSISTEM", brandPrefix: "Easy", brandSuffix: "Branding" }
];


export const row1Reviews = [
  {
    name: "Ahmad Fauzi",
    role: "CEO, PT Maju Sejahtera",
    text: "Proses cepat, pelayanan ramah, dan harga transparan. Pendirian PT saya selesai dalam 10 hari!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    url: "/testimoni",
  },
  {
    name: "Siti Rahma",
    role: "Founder, Rumah Kreatif",
    text: "Sangat terbantu dengan layanan EasyLegal. Merek dagang saya terdaftar dengan aman.",
    initials: "SR",
    bg: "bg-purple-500",
    url: "/testimoni",
  },
  {
    name: "Budi Santoso",
    role: "Direktur, CV Jaya Abadi",
    text: "Tim support yang responsif. NIB dan OSS saya selesai tanpa ribet sama sekali.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    url: "/testimoni",
  },
];

export const row2Reviews = [
  {
    name: "Linda Wijaya",
    role: "Owner, Kedai Kopi Kita",
    text: "Pendaftaran merek ternyata mudah kalau pakai EasyLegal. CS-nya sabar banget jelasin alurnya.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    url: "/testimoni",
  },
  {
    name: "Hendra Kurniawan",
    role: "Founder, Tech Start",
    text: "Sertifikasi ISO perusahaan kami jadi lebih kredibel. Prosesnya profesional dan rapi.",
    initials: "HK",
    bg: "bg-blue-500",
    url: "/testimoni",
  },
  {
    name: "Maya Sari",
    role: "CEO, PT Global Logistics",
    text: "Layanan korporatnya sangat membantu untuk pengurusan legalitas cabang di berbagai daerah.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    url: "/testimoni",
  },
];

