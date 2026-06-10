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
      { text: "Pendirian PT," },
      { text: "prosesnya" },
      { text: "cepat & beres.", red: true },
    ],
    desc: "Dari konsultasi sampai akta di tangan Anda. Tim legal berpengalaman telah membantu lebih dari 11.000 pengusaha. Mulai dari Rp2,5jt.",
    cta: "Konsultasi Gratis",
    ctaLink: "/kontak",
    cta2: "Lihat Paket PT",
    cta2Link: "/",
    trustBadges: ["7-14 hari kerja", "Tracking real-time", "Garansi tuntas"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
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
    cta2Link: "/",
    trustBadges: ["Database DJKI resmi", "Tracking real-time", "Garansi Selesai"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
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
    ctaLink: "/",
    cta2: "Konsultasi Gratis",
    cta2Link: "/kontak",
    trustBadges: ["UAF Accredited", "Proses cepat", "Harga transparan"],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
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
    cta2Link: "/",
    trustBadges: ["Database KBLI 2025", "OSS RBA Resmi", "Garansi Selesai"],
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop",
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
    href: "/cek-nama",
    icon: Search,
  },
  {
    tag: "RESPONS 5 MENIT",
    title: "Konsultasi via WhatsApp",
    desc: "Tanya tim legal kami langsung — gratis, tanpa komitmen.",
    cta: "Mulai chat",
    href: "https://wa.me/6281123456789",
    external: true,
    icon: MessageCircle,
  },
];

export const partnerLogos = ["KEMENKUMHAM", "OSS BKPM", "DJKI", "KEMENPERIN", "PSE Kominfo"];

export const layananIndividual = [
  { name: "Pendirian PT", desc: "Badan usaha & legal", icon: Building2, circleBg: "#B91C1C", cardTint: "#FEF2F2", href: "/layanan/pendirian-badan-usaha" },
  { name: "Daftar Merek", desc: "HAKI & brand", icon: ShieldCheck, circleBg: "#D97706", cardTint: "#FFFBEB", href: "/layanan/merek-haki" },
  { name: "NIB & OSS", desc: "Perizinan usaha", icon: FileCheck, circleBg: "#2563EB", cardTint: "#EFF6FF", href: "/layanan/nib-oss" },
  { name: "Sertifikasi ISO", desc: "Standard internasional", icon: Award, circleBg: "#16A34A", cardTint: "#F0FDF4", href: "/layanan/sertifikasi-iso" },
  { name: "Pengajuan PKP", desc: "Perpajakan & e-Faktur", icon: FileText, circleBg: "#EA580C", cardTint: "#FFF7ED", href: "/layanan/pengajuan-pkp" },
  { name: "Visa & KITAS", desc: "Imigrasi WNA", icon: Globe, circleBg: "#1E3A5F", cardTint: "#F0F4FF", href: "/layanan/visa-kitas" },
  { name: "Perjanjian Perkawinan", desc: "Pisah harta & legal", icon: Scale, circleBg: "#7C3AED", cardTint: "#F5F3FF", href: "/layanan/perjanjian-perkawinan" },
  { name: "Press Release", desc: "PR & media 100+", icon: MessageCircle, circleBg: "#DC2626", cardTint: "#FEF2F2", href: "/layanan/press-release" },
  { name: "Pelaporan LKPM", desc: "Lapor BKPM rutin", icon: TrendingUp, circleBg: "#0D9488", cardTint: "#F0FDFA", href: "/layanan/pelaporan-lkpm" },
];

export const whyChoose = [
  {
    icon: Clock,
    title: "Proses Cepat",
    desc: "Pendirian PT selesai dalam 7-14 hari kerja dengan tracking real-time dari dashboard.",
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

export const trustedBy = ["PT Maju Jaya", "CV Sukses Abadi", "UD Berkah", "PT Nusantara", "CV Mitra", "PT Globalindo"];

export const row1Reviews = [
  {
    name: "Ahmad Fauzi",
    role: "CEO, PT Maju Sejahtera",
    text: "Proses cepat, pelayanan ramah, dan harga transparan. Pendirian PT saya selesai dalam 10 hari!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    url: "#",
  },
  {
    name: "Siti Rahma",
    role: "Founder, Rumah Kreatif",
    text: "Sangat terbantu dengan layanan EasyLegal. Merek dagang saya terdaftar dengan aman.",
    initials: "SR",
    bg: "bg-purple-500",
    url: "#",
  },
  {
    name: "Budi Santoso",
    role: "Direktur, CV Jaya Abadi",
    text: "Tim support yang responsif. NIB dan OSS saya selesai tanpa ribet sama sekali.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    url: "#",
  },
];

export const row2Reviews = [
  {
    name: "Linda Wijaya",
    role: "Owner, Kedai Kopi Kita",
    text: "Pendaftaran merek ternyata mudah kalau pakai EasyLegal. CS-nya sabar banget jelasin alurnya.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    url: "#",
  },
  {
    name: "Hendra Kurniawan",
    role: "Founder, Tech Start",
    text: "Sertifikasi ISO perusahaan kami jadi lebih kredibel. Prosesnya profesional dan rapi.",
    initials: "HK",
    bg: "bg-blue-500",
    url: "#",
  },
  {
    name: "Maya Sari",
    role: "CEO, PT Global Logistics",
    text: "Layanan korporatnya sangat membantu untuk pengurusan legalitas cabang di berbagai daerah.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    url: "#",
  },
];
