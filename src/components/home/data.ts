import { getWhatsAppLink } from "@/lib/config";
import {
  Building2,
  Search,
  MessageCircle,
  ShieldCheck,
  FileCheck,
  Award,
  FileText,
  Globe,
  Scale,
  TrendingUp,
  Clock,
  Users,
  Lock,
  Headphones,
} from "lucide-react";

export const heroSlides = [
  {
    tag: "Layanan Unggulan",
    titleLines: [
      { text: "Pendirian Badan Usaha," },
      { text: "Prosesnya" },
      { text: "Cepat & Beres.", red: true },
    ],
    desc: "Dari konsultasi sampai akta di tangan Anda. Tim legal berpengalaman telah membantu lebih dari 11.000 pengusaha. Mulai dari Rp2,5jt.",
    cta: "Konsultasi Gratis",
    ctaLink: "/kontak",
    cta2: "Lihat Paket Badan Usaha",
    cta2Link: "/layanan/pendirian-badan-usaha",
    trustBadges: ["2-12 jam pengerjaan", "Tracking real-time", "Garansi tuntas"],
    image: "/images/hero/hero-badan-usaha.jpg",
  },
  {
    tag: "Perlindungan Merek",
    titleLines: [
      { text: "Daftar Merek" },
      { text: "Dagang &" },
      { text: "HAKI Online.", red: true },
    ],
    desc: "Lindungi brand dan nama usaha Anda dari plagiarisme. Proses resmi, aman, dan dapat dilacak real-time dari dashboard.",
    cta: "Cek Ketersediaan Merek",
    ctaLink: "/cek-nama",
    cta2: "Pelajari Lebih Lanjut",
    cta2Link: "/layanan/merek-haki",
    trustBadges: ["Database DJKI resmi", "Tracking real-time", "Garansi Selesai"],
    image: "/images/hero/hero-merek.jpg",
  },
  {
    tag: "Standar Internasional",
    titleLines: [
      { text: "Sertifikasi ISO" },
      { text: "Mudah, Cepat" },
      { text: "& Accredited.", red: true },
    ],
    desc: "Tingkatkan kredibilitas perusahaan Anda di kancah internasional dengan sertifikasi ISO 9001, 14001, 27001, dan 45001.",
    cta: "Pelajari Sertifikasi ISO",
    ctaLink: "/layanan/sertifikasi-iso",
    cta2: "Konsultasi Gratis",
    cta2Link: "/kontak",
    trustBadges: ["UAF Accredited", "Proses cepat", "Harga transparan"],
    image: "/images/hero/hero-iso.jpg",
  },
  {
    tag: "Perizinan Usaha",
    titleLines: [
      { text: "Urus NIB &" },
      { text: "OSS RBA" },
      { text: "Tanpa Ribet.", red: true },
    ],
    desc: "Dapatkan Nomor Induk Berusaha (NIB) dan perizinan teknis sesuai KBLI terbaru secara resmi, aman, dan patuh regulasi.",
    cta: "Konsultasi Perizinan",
    ctaLink: "/kontak",
    cta2: "Cek Kode KBLI",
    cta2Link: "/cek-kbli",
    trustBadges: ["Database KBLI 2025", "OSS RBA Resmi", "Garansi Selesai"],
    image: "/images/hero/hero-nib.jpg",
  },
];

export const quickTools = [
  {
    tag: "TOOL GRATIS",
    title: "Cek Nama PT & Merek",
    desc: "Hindari nama yang sudah dipakai sebelum mendaftar.",
    cta: "Cek sekarang",
    href: "/cek-nama",
    icon: Building2,
  },
  {
    tag: "DATABASE 2025",
    title: "Cek Kode KBLI",
    desc: "Temukan kode KBLI yang tepat untuk perizinan usaha Anda.",
    cta: "Buka pencarian",
    href: "/cek-kbli",
    icon: Search,
  },
  {
    tag: "RESPONS 5 MENIT",
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
  { name: "Pendirian Badan Usaha", desc: "Badan Usaha & Legal", icon: Building2, circleBg: "#B91C1C", cardTint: "#FEF2F2", href: "/layanan/pendirian-badan-usaha" },
  { name: "Daftar Merek", desc: "HAKI & Brand", icon: ShieldCheck, circleBg: "#D97706", cardTint: "#FFFBEB", href: "/layanan/merek-haki" },
  { name: "NIB & OSS", desc: "Perizinan Usaha", icon: FileCheck, circleBg: "#2563EB", cardTint: "#EFF6FF", href: "/layanan/nib-oss" },
  { name: "Sertifikasi ISO", desc: "Standar Internasional", icon: Award, circleBg: "#16A34A", cardTint: "#F0FDF4", href: "/layanan/sertifikasi-iso" },
  { name: "Pengajuan PKP", desc: "Perpajakan & E-Faktur", icon: FileText, circleBg: "#EA580C", cardTint: "#FFF7ED", href: "/layanan/pengajuan-pkp" },
  { name: "Visa & KITAS", desc: "Imigrasi WNA", icon: Globe, circleBg: "#1E3A5F", cardTint: "#F0F4FF", href: "/layanan/visa-kitas" },
  { name: "Perjanjian Perkawinan", desc: "Pisah Harta & Legal", icon: Scale, circleBg: "#7C3AED", cardTint: "#F5F3FF", href: "/layanan/perjanjian-perkawinan" },
  { name: "Press Release", desc: "PR & Media 100+", icon: MessageCircle, circleBg: "#DC2626", cardTint: "#FEF2F2", href: "/layanan/press-release" },
  { name: "Pelaporan LKPM", desc: "Lapor BKPM Rutin", icon: TrendingUp, circleBg: "#0D9488", cardTint: "#F0FDFA", href: "/layanan/pelaporan-lkpm" },
];

export const whyChoose = [
  {
    icon: Clock,
    title: "Proses Cepat",
    desc: "Pendirian Badan Usaha selesai, paling cepat 2 jam pengerjaan dengan tracking real-time dari dashboard.",
  },
  {
    icon: Users,
    title: "Tim Berpengalaman",
    desc: "Lebih dari 11.000 pengusaha mempercayai kami untuk urusan legalitas bisnis mereka.",
  },
  {
    icon: Lock,
    title: "Harga Transparan",
    desc: "Tidak ada biaya tersembunyi. Semua biaya dijelaskan di awal sebelum proses dimulai.",
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    desc: "Tim support kami siap membantu kapan saja via WhatsApp, email, atau telepon.",
  },
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

export const insights = [
  {
    title: "Panduan Lengkap Pendirian PT di Indonesia 2026",
    category: "Legalitas PT",
    readTime: "8 menit baca",
    slug: "panduan-lengkap-pendirian-pt-di-indonesia-2026",
    excerpt: "Semua yang perlu Anda ketahui tentang syarat, prosedur, dan biaya pendirian PT terbaru.",
  },
  {
    title: "Cara Daftar Merek Dagang Online via HKI",
    category: "Merek & HAKI",
    readTime: "6 menit baca",
    slug: "cara-daftar-merek-dagang-online-via-hki",
    excerpt: "Langkah demi langkah pendaftaran merek dagang secara online yang benar dan cepat.",
  },
  {
    title: "Perbedaan NIB, OSS, dan KBLI yang Harus Diketahui",
    category: "Perizinan Usaha",
    readTime: "5 menit baca",
    slug: "perbedaan-nib-oss-dan-kbli",
    excerpt: "Penjelasan lengkap tentang dokumen perizinan usaha yang sering tertukar.",
  },
];

export const caraKerjaSteps = [
  {
    step: "01",
    title: "Konsultasi Gratis",
    desc: "Hubungi tim kami via WhatsApp atau form kontak. Ceritakan kebutuhan bisnis Anda.",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "Pilih Paket Layanan",
    desc: "Pilih paket yang sesuai dengan kebutuhan dan budget Anda. Harga transparan.",
    icon: FileCheck,
  },
  {
    step: "03",
    title: "Upload Dokumen",
    desc: "Unggah berkas yang diperlukan melalui dashboard. Proses 100% online & paperless.",
    icon: FileText,
  },
  {
    step: "04",
    title: "Proses & Tracking",
    desc: "Tim kami memproses dokumen Anda. Pantau status real-time dari dashboard.",
    icon: TrendingUp,
  },
];
