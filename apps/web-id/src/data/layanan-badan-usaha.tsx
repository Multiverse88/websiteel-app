import React from "react";
import type { PricingPackage, FootnoteItem } from "@/components/Pricing";
import { getWhatsAppLink } from "@/lib/config";

type TitleSegment =
  | { text: string; highlight?: boolean }
  | { break: true };

export interface BadanUsahaContent {
  id: string;
  nama: string;
  namaFormal: string;

  // Hero
  heroBreadcrumbText: string;
  heroBadge: string;
  heroTitle: TitleSegment[];
  titleClassName?: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  heroStats: { icon: string; value: string; label: string }[];
  floatingBadges: {
    icon: string;
    iconBg: string;
    iconColor: string;
    title: string;
    subtitle: string;
    position: string;
  }[];

  // Pengertian
  pengertianTag: string;
  pengertianTitle: string;
  pengertianIntro: string;
  pengertianImage: string;
  pengertianImageAlt: string;
  hukumIcon: string;
  hukumIconBg: string;
  hukumIconColor: string;
  hukumTitle: string;
  hukumLaw: string;
  pengertianDetail: React.ReactNode;
  karakteristik: { bold: string; text: string }[];

  // Manfaat
  manfaatTag: string;
  manfaatTitle: string;
  manfaatItems: { title: string; desc: string; Icon: string }[];

  // Pricing
  pricingTag: string;
  pricingTitle: React.ReactNode;
  pricingSubtitle: string;
  pricingPackages: PricingPackage[];
  pricingFootnotes: FootnoteItem[];

  // Steps
  stepsTag: string;
  stepsTitle: React.ReactNode;
  stepsSubtitle: string;
  steps: {
    no: string;
    title: string;
    duration: string;
    desc: string;
    points: string[];
  }[];

  // Testimonial
  testimonialTitle?: React.ReactNode;

  // FAQ
  faqTitle: string;
  faqs: { q: string; a: string }[];

  // CTA
  ctaTitle: string;
  ctaHighlight: string;
  ctaDescription: string;
  ctaWhatsAppMessage: string;
}

export const dataPT: BadanUsahaContent = {
  id: "pt",
  nama: "PT",
  namaFormal: "Perseroan Terbatas",

  heroBreadcrumbText: "Pendirian PT",
  heroBadge: "Pendirian PT",
  heroTitle: [
    { text: "Buat PT supaya bisnis lebih " },
    { break: true },
    { text: "profesional " },
    { text: "secara mudah", highlight: true },
    { break: true },
    { text: "lewat jasa pendirian PT" },
  ],
  heroDescription:
    "Pendirian PT secara mudah, aman, terpercaya. Didampingi oleh Personal Legal Assistance yang siap membantu dari awal proses hingga selesai.",
  heroImage:
    "/images/layanan/pt-1.jpg",
  heroImageAlt: "Penandatanganan akta pendirian badan usaha",
  heroStats: [
    { icon: "Clock", value: "6–12 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp2,99jt", label: "Harga transparan" },
    { icon: "Upload", value: "100% Online", label: "Upload paperless" },
  ],
  floatingBadges: [
    {
      icon: "Building",
      iconBg: "bg-red-50",
      iconColor: "text-[#990202]",
      title: "Akta PT diterbitkan",
      subtitle: "Selesai · 2 hari kerja",
      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "ShieldCheck",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "SK Kemenkumham",
      subtitle: "Terdaftar resmi",
      position: "bottom-[76px] -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN PT",
  pengertianTitle: "Apa itu Perseroan Terbatas (PT)?",
  pengertianIntro:
    "Sebelum mulai, kenali dulu badan hukum yang paling populer untuk bisnis serius di Indonesia.",
  pengertianImage:
    "/images/layanan/pt-2.jpg",
  pengertianImageAlt: "Rapat tim membahas Perseroan Terbatas",
  hukumIcon: "FileText",
  hukumIconBg: "bg-red-50",
  hukumIconColor: "text-[#990202]",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 40 Tahun 2007 tentang Perseroan Terbatas",
  pengertianDetail: (
    <>
      <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
        <strong className="font-extrabold text-gray-900">Perseroan Terbatas (PT)</strong> adalah badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham — sesuai dengan Undang-Undang No. 40 Tahun 2007.
      </p>
      <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
        Berbeda dengan CV atau Firma, PT adalah <strong className="font-extrabold text-gray-900">entitas hukum mandiri</strong> yang terpisah dari pendirinya. Artinya, harta perusahaan terpisah dari harta pribadi pendiri — memberikan perlindungan hukum yang kuat sekaligus kredibilitas yang lebih tinggi di mata partner & klien.
      </p>
    </>
  ),
  karakteristik: [
    { bold: "Badan hukum mandiri", text: " — entitas terpisah dari pendiri, harta perusahaan ≠ harta pribadi." },
    { bold: "Modal terbagi dalam saham", text: " — kepemilikan jelas & proporsional sesuai kontribusi." },
    { bold: "Liability terbatas", text: " — tanggung jawab pendiri hanya sebatas nilai saham yang dimiliki." },
    { bold: "Kontinyu", text: " — tidak terputus walau pendiri berganti, bisa go public di masa depan." },
  ],

  manfaatTag: "MANFAAT MEMILIH PT",
  manfaatTitle: "Kenapa PT jadi pilihan pengusaha serius?",
  manfaatItems: [
    { title: "Perlindungan Aset", desc: "Harta pribadi terpisah dari aset perusahaan — risiko bisnis tidak menyentuh kekayaan pribadi.", Icon: "Shield" },
    { title: "Akses Pendanaan", desc: "Lebih mudah dapatkan pinjaman bank, modal ventura, atau investor — struktur saham jelas.", Icon: "DollarSign" },
    { title: "Kredibilitas Tinggi", desc: "Dipercaya partner bisnis & klien besar — bisa ikut tender pemerintah & proyek BUMN.", Icon: "Star" },
    { title: "Multi-Shareholder", desc: "Cocok untuk skala besar & co-founder — saham bisa dimiliki banyak pihak.", Icon: "Users" },
  ],

  pricingTag: "BIAYA JASA PEMBUATAN PT",
  pricingTitle: "Pilih paket sesuai kebutuhan bisnis Anda.",
  pricingSubtitle:
    "Harga all-in sudah termasuk notaris, AHU Kemenkumham, NPWP, dan NIB OSS. (Catatan: Modal dasar s.d Rp 1 Milyar. Modal dasar > 1M–5M +Rp 1jt, > 5M +Rp 8jt).",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 2.999.000",
      strikePrice: "Rp 6.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pembuatan PT. Mohon info lengkap biaya dan prosesnya.", "paket-basic-pembuatan-pt"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Dokumen Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: false },
          { text: "K3L/SPUMKTTR & SPPL", checked: false },
          { text: "Sertifikat Standar", checked: false, footnoteIndex: 3 },
          { text: "Angka Pengenal Impor", checked: false, footnoteIndex: 4 },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "1 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: false, footnoteIndex: "*" },
          { text: "Gratis Ongkir Pulau Jawa", checked: false },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan", checked: false },
          { text: "Dokumen SOP Perusahaan", checked: false },
          { text: "Dokumen Kontrak Bisnis", checked: false },
          { text: "Stempel Perusahaan 1 Warna", checked: false },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 3.999.000",
      strikePrice: "Rp 8.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pembuatan PT. Mohon info lengkap biaya dan prosesnya.", "paket-complete-pembuatan-pt"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Dokumen Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "K3L/SPUMKTTR & SPPL", checked: true },
          { text: "Sertifikat Standar", checked: true, footnoteIndex: 3 },
          { text: "Angka Pengenal Impor", checked: true, footnoteIndex: 4 },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "1 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
          { text: "Gratis Ongkir Pulau Jawa", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan", checked: true },
          { text: "Dokumen SOP Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan 1 Warna", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 5.499.000",
      strikePrice: "Rp 11.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Express Pembuatan PT. Mohon info lengkap biaya dan prosesnya.", "paket-express-pembuatan-pt"),
      customHeaderOverlay: (
        <div className="absolute -right-3 -top-8 w-20 h-20 sm:w-[100px] sm:h-[100px] transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <img src="/Fast Track.png" alt="Fast Track" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Dokumen Pendirian <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>4 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "K3L/SPUMKTTR & SPPL", checked: true },
          { text: "Sertifikat Standar", checked: true, footnoteIndex: 3 },
          { text: "Angka Pengenal Impor", checked: true, footnoteIndex: 4 },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
          { text: "Gratis Ongkir <strong>Seluruh Indonesia</strong>", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan", checked: true },
          { text: "Dokumen SOP Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET OFFICE",
      price: "Rp 6.649.000",
      strikePrice: "Rp 13.300.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Office",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Office Pembuatan PT. Mohon info lengkap biaya dan prosesnya.", "paket-office-pembuatan-pt"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Dokumen Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "K3L/SPUMKTTR & SPPL", checked: true },
          { text: "Sertifikat Standar", checked: true, footnoteIndex: 3 },
          { text: "Angka Pengenal Impor", checked: true, footnoteIndex: 4 },
        ]},
        { title: "VIRTUAL OFFICE", isBoxed: true, items: [
          { text: "Virtual Office 1 Tahun", boldText: "1 Tahun", checked: true },
          { text: "Meeting Room 6 Jam/Bulan (3 Kota: Jkt, Bekasi, Bdg)", checked: true },
          { text: "Fasilitas Kantor Siap PKP", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
          { text: "Gratis Ongkir <strong>Seluruh Indonesia</strong>", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan", checked: true },
          { text: "Dokumen SOP Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET PRESTIGE",
      price: "Rp 4.999.000",
      strikePrice: "Rp 10.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pembuatan PT. Mohon info lengkap biaya dan prosesnya.", "paket-prestige-pembuatan-pt"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Dokumen Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "K3L/SPUMKTTR & SPPL", checked: true },
          { text: "Sertifikat Standar", checked: true, footnoteIndex: 3 },
          { text: "Angka Pengenal Impor", checked: true, footnoteIndex: 4 },
        ]},
        { title: "BRANDING IDENTITY", isBoxed: true, items: [
          { text: "Company Profile Digital 8 Halaman", checked: true },
          { text: "Desain Logo (3x Revisi)", checked: true },
          { text: "Desain Kartu Nama & Kop Surat", checked: true },
          { text: "Desain Amplop & Map Bisnis", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
          { text: "Gratis Ongkir <strong>Seluruh Indonesia</strong>", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan", checked: true },
          { text: "Dokumen SOP Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah penandatanganan Minuta Akta &amp; tidak terdapat kendala pada sistem AHU." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax, Amdalnet &amp; OSS." },
    { text: "Risiko menengah rendah." },
    { text: "Opsional." },
    { text: "Persetujuan &amp; pengesahan PKP sepenuhnya berada di bawah kewenangan KPP setempat." },
    { label: "*", text: "Syarat &amp; ketentuan berlaku." },
  ],

  stepsTag: "PROSES PEMBUATAN PT",
  stepsTitle: <>Seluruh langkah pembuatan PT akan kami pandu,<br />dari pendaftaran hingga pengesahan.</>,
  stepsSubtitle:
    "Dari konsultasi awal sampai dokumen lengkap di tangan Anda — estimasi 6–12 hari kerja.",
  steps: [
    { no: "01", title: "Konsultasi & Perencanaan", duration: "", desc: "Mengidentifikasi kebutuhan dasar bersama tim kami supaya sesuai visi bisnis Anda.", points: [] },
    { no: "02", title: "Siapkan Dokumen Pendirian", duration: "", desc: "Menyiapkan kebutuhan dokumen sebagai persyaratan dalam pendirian PT.", points: [] },
    { no: "03", title: "Penyusunan Akta Pendirian", duration: "", desc: "Notaris menyusun & menandatangani akta pendirian — bisa via e-Notary tanpa harus datang.", points: [] },
    { no: "04", title: "Pengesahan SK Kemenkumham", duration: "", desc: "Akta pendirian disahkan menjadi badan hukum resmi oleh Kemenkumham.", points: [] },
    { no: "05", title: "NPWP Badan & SKT Pajak", duration: "", desc: "Registrasi PT sebagai wajib pajak badan ke Direktorat Jenderal Pajak (DJP).", points: [] },
    { no: "06", title: "NIB & Akun OSS RBA", duration: "", desc: "Aktivasi izin berusaha berbasis risiko (RBA) di sistem OSS — PT siap beroperasi penuh!", points: [] },
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PENDIRIAN PT</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan seputar pendirian PT.",
  faqs: [
    { q: "Apa saja syarat utama mendirikan PT?", a: "Syarat utama meliputi data pendiri dan pengurus, nama PT, alamat domisili, KBLI sesuai bidang usaha, serta dokumen pendukung lainnya sesuai ketentuan yang berlaku." },
    { q: "Berapa lama proses pembuatan PT hingga selesai disahkan?", a: "Proses pendirian PT umumnya dapat selesai sekitar 6–12 hari kerja, tergantung kelengkapan dokumen dan proses administrasi." },
    { q: "Apa pendirian PT bisa menggunakan alamat rumah atau virtual office?", a: "Bisa. PT dapat menggunakan alamat rumah atau Virtual Office, selama sesuai dengan ketentuan domisili usaha yang berlaku di wilayah terkait." },
    { q: "Mana yang lebih cocok: PT, CV, atau PT Perorangan?", a: "Tergantung skala bisnis. PT Perorangan cocok untuk solopreneur/UMKM mikro (1 pendiri, modal kecil). CV cocok untuk usaha kecil-menengah dengan 2 sekutu, tanpa modal minimum. PT cocok kalau bisnis Anda serius, butuh kredibilitas tinggi, atau ingin ikut tender — modal min. Rp25jt disetor, liability terpisah dari pribadi." },
    { q: "Apakah harga sudah termasuk biaya notaris & pemerintah?", a: "Ya, semua paket harga EasyLegal bersifat all-in. Sudah mencakup jasa notaris partner, biaya resmi PNBP/AHU Kemenkumham, pendaftaran NPWP perusahaan, dan seluruh proses pendaftaran izin di sistem OSS RBA hingga dokumen terbit." },
    { q: "Apakah saya harus datang ke notaris secara fisik?", a: "Tidak wajib. Penandatanganan akta pendirian dapat dilakukan secara tatap muka dengan notaris partner kami atau dilakukan secara elektronik (e-Notary) dengan verifikasi aman, sehingga Anda dapat menyelesaikan proses ini dari mana saja secara online." },
    { q: "Bagaimana kalau nama PT yang saya inginkan sudah dipakai?", a: "Sebelum melakukan pemesanan nama resmi di sistem AHU Kemenkumham, tim EasyLegal akan melakukan pengecekan ketersediaan nama secara gratis. Jika nama yang Anda inginkan sudah dipakai atau terlalu mirip dengan PT lain, kami akan menyarankan alternatif nama terbaik." },
  ],

  ctaTitle: "Siap dirikan",
  ctaHighlight: "PT Anda?",
  ctaDescription: "Konsultasi gratis untuk menentukan struktur PT yang tepat — tanpa komitmen.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian PT.",
};

const dataCV: BadanUsahaContent = {
  id: "cv",
  nama: "CV",
  namaFormal: "Commanditaire Vennootschap",

  heroBreadcrumbText: "Pendirian CV",
  heroBadge: "Pendirian CV",
  heroTitle: [
    { text: "Jasa Pendirian CV ", highlight: true },
    { break: true },
    { text: "bagi Anda yang mencari kemudahan " },
    { break: true },
    { text: "mendirikan badan usaha" },
  ],
  heroDescription:
    "Ingin usaha terlihat lebih profesional? Mulai pendirian CV yang terpercaya dengan jaminan kemudahan pada prosesnya.",
  heroImage:
    "/images/layanan/cv-1.jpg",
  heroImageAlt: "Tim kecil mendirikan CV",
  heroStats: [
    { icon: "Clock", value: "6–12 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp1,99jt", label: "Harga transparan" },
    { icon: "Upload", value: "100% Online", label: "Upload paperless" },
  ],
  floatingBadges: [
    {
      icon: "Handshake",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      title: "Akta CV diterbitkan",
      subtitle: "Selesai · 5 hari kerja",
      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "ShieldCheck",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Legalitas Resmi",
      subtitle: "Terdaftar di Pengadilan",
      position: "bottom-[76px] -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN CV",
  pengertianTitle: "Apa itu Commanditaire Vennootschap (CV)?",
  pengertianIntro:
    "Pahami dulu bentuk usaha tradisional yang masih relevan untuk UKM Indonesia.",
  pengertianImage:
    "/images/layanan/cv-2.jpg",
  pengertianImageAlt: "Diskusi pendirian CV",
  hukumIcon: "FileText",
  hukumIconBg: "bg-blue-50",
  hukumIconColor: "text-blue-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "Kitab Undang-Undang Hukum Dagang (KUHD) & UU No. 3 Tahun 1982",
  pengertianDetail: (
    <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Perseroan Komanditer (CV)</strong> adalah persekutuan yang didirikan oleh satu orang atau lebih yang mempercayakan uang atau barang mereka kepada satu orang atau lebih yang menjalankan perusahaan dan bertindak sebagai pemimpin. CV memiliki dua sekutu, yaitu Sekutu Aktif (yang menjalankan bisnis dan bertanggung jawab penuh secara pribadi) dan Sekutu Pasif/Komanditer (yang hanya menyetorkan modal).
    </p>
  ),
  karakteristik: [
    { bold: "Minimal didirikan oleh 2 orang", text: " (Sekutu Aktif dan Sekutu Pasif)." },
    { bold: "Sekutu Aktif bertanggung jawab", text: " secara penuh sampai ke harta pribadi." },
    { bold: "Sekutu Pasif bertanggung jawab", text: " hanya sebatas modal yang disetorkan." },
    { bold: "Tidak memiliki batas", text: " minimal modal pendirian." },
  ],

  manfaatTag: "MANFAAT MEMILIH CV",
  manfaatTitle: "Kenapa CV cocok untuk bisnis Anda?",
  manfaatItems: [
    { title: "Modal Fleksibel", desc: "Tidak ada ketentuan modal minimum — bisa disesuaikan dengan kemampuan dan kesepakatan.", Icon: "DollarSign" },
    { title: "Proses Cepat & Mudah", desc: "Pendirian CV lebih sederhana dibanding PT — cukup akta notaris & daftar ke Pengadilan Negeri.", Icon: "Clock" },
    { title: "Kemitraan Jelas", desc: "Peran antara pengelola (aktif) dan investor (pasif) diatur jelas — cocok untuk bisnis patungan.", Icon: "Users" },
    { title: "Biaya Terjangkau", desc: "Biaya pendirian CV jauh lebih rendah dibanding PT — solusi ekonomis untuk memulai usaha.", Icon: "Coins" },
  ],

  pricingTag: "BIAYA JASA PEMBUATAN CV",
  pricingTitle: <>Pilih paket pendirian CV<br />sesuai kebutuhan.</>,
  pricingSubtitle:
    "Harga sudah termasuk semua biaya — notaris, pendaftaran Pengadilan Negeri, NPWP, dan jasa kami. Tanpa biaya tersembunyi.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 1.999.000",
      strikePrice: "Rp 4.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pembuatan CV. Mohon info lengkap biaya dan prosesnya.", "paket-basic-pembuatan-cv"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & SKT <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama CV", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: false },
          { text: "Sertifikat Standar", checked: false },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "1 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: false, footnoteIndex: "*" },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 2.999.000",
      strikePrice: "Rp 6.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pembuatan CV. Mohon info lengkap biaya dan prosesnya.", "paket-complete-pembuatan-cv"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama CV", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "K3L/SPUMKTTR & SPPL", checked: true },
          { text: "Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "1 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
          { text: "Gratis Ongkir Pulau Jawa", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan 1 Warna", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 4.499.000",
      strikePrice: "Rp 9.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Express Pembuatan CV. Mohon info lengkap biaya dan prosesnya.", "paket-express-pembuatan-cv"),
      customHeaderOverlay: (
        <div className="absolute -right-3 -top-8 w-20 h-20 sm:w-[100px] sm:h-[100px] transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <img src="/Fast Track.png" alt="Fast Track" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>4 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama CV", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "K3L/SPUMKTTR & SPPL", checked: true },
          { text: "Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
          { text: "Gratis Ongkir <strong>Seluruh Indonesia</strong>", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET OFFICE",
      price: "Rp 5.649.000",
      strikePrice: "Rp 11.300.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Office",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Office Pembuatan CV. Mohon info lengkap biaya dan prosesnya.", "paket-office-pembuatan-cv"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama CV", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "K3L/SPUMKTTR & SPPL", checked: true },
          { text: "Sertifikat Standar", checked: true },
        ]},
        { title: "VIRTUAL OFFICE", isBoxed: true, items: [
          { text: "Virtual Office 1 Tahun", boldText: "1 Tahun", checked: true },
          { text: "Meeting Room 6 Jam/Bulan (3 Kota: Jkt, Bekasi, Bdg)", checked: true },
          { text: "Fasilitas Kantor Siap PKP", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
          { text: "Gratis Ongkir <strong>Seluruh Indonesia</strong>", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET PRESTIGE",
      price: "Rp 3.999.000",
      strikePrice: "Rp 8.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pembuatan CV. Mohon info lengkap biaya dan prosesnya.", "paket-prestige-pembuatan-cv"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama CV", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "K3L/SPUMKTTR & SPPL", checked: true },
          { text: "Sertifikat Standar", checked: true },
        ]},
        { title: "BRANDING IDENTITY", isBoxed: true, items: [
          { text: "Company Profile Digital 8 Halaman", checked: true },
          { text: "Desain Logo (3x Revisi)", checked: true },
          { text: "Desain Kartu Nama & Kop Surat", checked: true },
          { text: "Desain Amplop & Map Bisnis", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
          { text: "Gratis Ongkir <strong>Seluruh Indonesia</strong>", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah penandatanganan akta oleh para pihak." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
    { text: "Syarat &amp; ketentuan berlaku." },
  ],

  stepsTag: "PROSES PEMBUATAN CV",
  stepsTitle: "Pembuatan CV yang tidak membingungkan dan dibantu oleh tim kami yang profesional.",
  stepsSubtitle:
    "Dari konsultasi sampai dokumen resmi di tangan — estimasi 6–12 hari kerja.",
  steps: [
    { no: "01", title: "Konsultasi & Persiapan", duration: "", desc: "Konsultasi gratis untuk menentukan struktur CV, jenis usaha, dan dokumen yang diperlukan.", points: [] },
    { no: "02", title: "Pembuatan Akta Notaris", duration: "", desc: "Notaris menyusun akta pendirian CV yang memuat anggaran dasar dan kesepakatan para pihak.", points: [] },
    { no: "03", title: "NPWP & SKT Pajak", duration: "", desc: "Registrasi CV sebagai wajib pajak badan ke DJP.", points: [] },
    { no: "04", title: "NIB & Perizinan OSS", duration: "", desc: "Penerbitan NIB dan akses OSS RBA untuk perizinan berusaha.", points: [] },
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PENDIRIAN CV</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan seputar pendirian CV.",
  faqs: [
    { q: "Apa itu CV dan siapa saja yang dibutuhkan untuk mendirikannya?", a: "CV (Commanditaire Vennootschap) adalah bentuk badan usaha yang didirikan oleh minimal dua orang, yaitu sekutu aktif dan sekutu pasif." },
    { q: "Apa perbedaan utama antara CV dan PT?", a: "Perbedaan utamanya terletak pada status badan hukum, struktur kepemilikan, dan tanggung jawab para pendirinya. PT merupakan badan hukum, sedangkan CV bukan badan hukum." },
    { q: "Berapa lama proses pembuatan CV hingga selesai?", a: "Proses pendirian CV umumnya dapat selesai sekitar 3–7 hari kerja, tergantung kelengkapan dokumen dan proses administrasi." },
    { q: "Bisakah mendirikan CV menggunakan Virtual Office atau alamat rumah?", a: "Bisa. CV dapat menggunakan Virtual Office atau alamat rumah, selama sesuai dengan ketentuan domisili usaha yang berlaku di wilayah terkait." },
    { q: "Apa perbedaan Sekutu Aktif dan Sekutu Pasif di CV?", a: "Sekutu Aktif adalah pihak yang menjalankan & mengelola perusahaan serta bertanggung jawab penuh (tak terbatas). Sekutu Pasif/Komanditer hanya menyetor modal dan bertanggung jawab sebatas modal yang disetorkan — tidak terlibat dalam pengelolaan sehari-hari." },
    { q: "Berapa modal minimum untuk mendirikan CV?", a: "Tidak ada ketentuan modal minimum untuk CV. Modal ditentukan berdasarkan kesepakatan para pendiri dan disesuaikan dengan kebutuhan usaha. Ini yang membuat CV sangat fleksibel untuk UKM." },
  ],

  ctaTitle: "Siap dirikan",
  ctaHighlight: "CV Anda?",
  ctaDescription: "Konsultasi gratis untuk menentukan struktur CV yang tepat — tanpa komitmen.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian CV.",
};

const dataPMA: BadanUsahaContent = {
  id: "pt-pma",
  nama: "PT PMA",
  namaFormal: "Penanaman Modal Asing",

  heroBreadcrumbText: "Pendirian PT PMA",
  heroBadge: "Pendirian PT PMA",
  titleClassName: "lg:text-[42px] xl:text-[46px]",
  heroTitle: [
    { text: "Tarik investor luar negeri untuk bisnis Anda lewat " },
    { break: true },
    { text: "JASA PENDIRIAN PT PMA", highlight: true },
  ],
  heroDescription:
    "Buat bisnis lebih berkembang dan naik ke kancah internasional dengan pendirian PT PMA yang sesuai regulasi tanpa banyak drama.",
  heroImage:
    "/images/layanan/pt-pma-1.jpg",
  heroImageAlt: "Rapat bisnis investasi asing",
  heroStats: [
    { icon: "Clock", value: "3–6 minggu", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai IDR 8,99jt", label: "Harga transparan" },
    { icon: "Globe", value: "Investasi Asing", label: "BKPM approved" },
  ],
  floatingBadges: [
    {
      icon: "Globe",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      title: "Izin BKPM",
      subtitle: "Investasi terdaftar",
      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "Building",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "SK Kemenkumham",
      subtitle: "Badan hukum resmi",
      position: "bottom-[76px] -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN PT PMA",
  pengertianTitle: "Apa itu PT Penanaman Modal Asing (PT PMA)?",
  pengertianIntro:
    "Pahami kerangka hukum investasi asing di Indonesia sebelum memulai.",
  pengertianImage:
    "/images/layanan/pt-pma-2.png",
  pengertianImageAlt: "Kantor representasi asing",
  hukumIcon: "FileText",
  hukumIconBg: "bg-indigo-50",
  hukumIconColor: "text-indigo-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 25 Tahun 2007 tentang Penanaman Modal & Peraturan BKPM",
  pengertianDetail: (
    <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">PT Penanaman Modal Asing (PT PMA)</strong> adalah Perseroan Terbatas yang didirikan berdasarkan hukum di Indonesia, di mana pemegang sahamnya dapat berupa Warga Negara Asing (WNA), perusahaan asing, atau pemerintah asing. PT PMA tunduk pada ketentuan UU No. 25 Tahun 2007 tentang Penanaman Modal dan diawasi langsung oleh BKPM.
    </p>
  ),
  karakteristik: [
    { bold: "Modal dasar minimal Rp10 Miliar", text: " dengan modal ditempatkan/disetor minimal Rp2,5 Miliar." },
    { bold: "Pemegang saham dapat berupa WNA,", text: " badan hukum asing, atau badan hukum Indonesia." },
    { bold: "Wajib menyampaikan LKPM", text: " (Laporan Kegiatan Penanaman Modal) berkala ke BKPM." },
    { bold: "Batasan kepemilikan asing", text: " sesuai aturan investasi pada beberapa bidang usaha." },
  ],

  manfaatTag: "MANFAAT MEMILIH PT PMA",
  manfaatTitle: "Kenapa PT PMA jadi pilihan investor global?",
  manfaatItems: [
    { title: "Kepastian Hukum", desc: "Beroperasi dengan badan hukum resmi yang diakui Pemerintah Indonesia — aman dan terpercaya.", Icon: "Shield" },
    { title: "Kepemilikan Asing", desc: "Memungkinkan WNA & badan asing menjadi pemegang saham resmi di perusahaan Indonesia.", Icon: "Globe" },
    { title: "Skala Besar", desc: "Cocok untuk investasi berskala besar, proyek infrastruktur, dan ekspansi pasar Indonesia.", Icon: "TrendingUp" },
    { title: "Insentif Pajak", desc: "Berpotensi mendapatkan fasilitas fiskal & insentif pajak dari pemerintah untuk bidang usaha tertentu.", Icon: "Star" },
  ],

  pricingTag: "BIAYA JASA PEMBUATAN PT PMA",
  pricingTitle: "Pilih paket pendirian PT PMA sesuai kebutuhan.",
  pricingSubtitle:
    "Harga sudah termasuk konsultasi BKPM, pembuatan akta, pengurusan izin prinsip, NPWP, dan NIB.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "IDR 8.999.000",
      strikePrice: "IDR 18.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pendirian PT PMA. Mohon info lengkap biaya dan prosesnya.", "paket-basic-pendirian-pt-pma"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Notaris & SK Kemenkumham <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP Badan & SKT <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT PMA", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: false },
          { text: "Sertifikat Standar & SPPL", checked: false },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>IDR 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "IDR 12.999.000",
      strikePrice: "IDR 26.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pendirian PT PMA. Mohon info lengkap biaya dan prosesnya.", "paket-complete-pendirian-pt-pma"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NIB & Perizinan Berusaha <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT PMA", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "Sertifikat Standar & SPPL", checked: true },
          { text: "Angka Pengenal Impor (API)", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>IDR 250.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan 1 Warna", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET OFFICE",
      price: "IDR 16.999.000",
      strikePrice: "IDR 34.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Office",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Office Pendirian PT PMA. Mohon info lengkap biaya dan prosesnya.", "paket-office-pendirian-pt-pma"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NIB & Perizinan Berusaha <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT PMA", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "Sertifikat Standar & SPPL", checked: true },
          { text: "Angka Pengenal Impor (API)", checked: true },
        ]},
        { title: "VIRTUAL OFFICE", isBoxed: true, items: [
          { text: "Virtual Office 1 Tahun", boldText: "1 Tahun", checked: true },
          { text: "Meeting Room 6 Jam/Bulan (3 Kota: Jkt, Bekasi, Bdg)", checked: true },
          { text: "Fasilitas Kantor Siap PKP", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>IDR 500.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan 1-3 Warna", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET PRESTIGE",
      price: "IDR 14.999.000",
      strikePrice: "IDR 30.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pendirian PT PMA. Mohon info lengkap biaya dan prosesnya.", "paket-prestige-pendirian-pt-pma"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NIB & Perizinan Berusaha <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan & Pemesanan Nama PT PMA", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian", checked: true },
          { text: "SK Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "Sertifikat Standar & SPPL", checked: true },
          { text: "Angka Pengenal Impor (API)", checked: true },
        ]},
        { title: "BRANDING IDENTITY", isBoxed: true, items: [
          { text: "Company Profile Digital 8 Halaman", checked: true },
          { text: "Desain Logo (3x Revisi)", checked: true },
          { text: "Desain Kartu Nama & Kop Surat", checked: true },
          { text: "Desain Amplop & Map Bisnis", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>IDR 500.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan 1-3 Warna", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Tergantung kompleksitas bidang usaha & kelengkapan dokumen investor." },
    { text: "Setelah Izin Prinsip BKPM diterbitkan." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
    { text: "Opsional, tergantung kebutuhan tenaga kerja asing." },
  ],

  stepsTag: "PROSES PEMBUATAN PT PMA",
  stepsTitle: "Kami akan bimbing seluruh proses pembuatan PT PMA sejak awal.",
  stepsSubtitle:
    "Dari konsultasi BKPM sampai dokumen lengkap — estimasi 7–14 hari kerja, semua kami urus.",
  steps: [
    { no: "01", title: "Konsultasi & Perencanaan", duration: "", desc: "Mengidentifikasi kebutuhan dasar bersama tim kami supaya sesuai visi bisnis Anda.", points: [] },
    { no: "02", title: "Siapkan Dokumen Pendirian", duration: "", desc: "Tim kami membantu menyiapkan dokumen yang dibutuhkan untuk pendirian PT PMA.", points: [] },
    { no: "03", title: "Penyusunan Akta Pendirian", duration: "", desc: "Notaris menyusun akta pendirian PT PMA sesuai struktur investasi yang disepakati.", points: [] },
    { no: "04", title: "Pengesahan SK Kemenkumham", duration: "", desc: "Pengesahan badan hukum PT PMA oleh Kementerian Hukum & HAM.", points: [] },
    { no: "05", title: "NPWP Badan & NIB", duration: "", desc: "Pendaftaran NPWP badan dan penerbitan NIB melalui OSS RBA.", points: [] },
    { no: "06", title: "IMTA & KITAS", duration: "", desc: "Pengurusan izin kerja bagi tenaga kerja asing (TKA) jika diperlukan.", points: [] },
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PENDIRIAN PT PMA</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan seputar pendirian PT PMA.",
  faqs: [
    { q: "Apa syarat utama mendirikan PT PMA di Indonesia?", a: "Umumnya diperlukan minimal dua pemegang saham, nama perusahaan, alamat usaha, bidang usaha (KBLI), serta dokumen identitas para pendiri sesuai ketentuan yang berlaku." },
    { q: "Apakah warga negara asing (WNA) bisa memiliki 100% saham di PT PMA?", a: "Bisa, selama bidang usaha yang dipilih memperbolehkan kepemilikan asing sesuai ketentuan investasi yang berlaku di Indonesia." },
    { q: "Berapa lama proses pendirian PT PMA hingga legalitas terbit?", a: "Proses pendirian PT PMA umumnya dapat selesai sekitar 7–14 hari kerja, tergantung kelengkapan dokumen dan proses administrasi." },
    { q: "Apakah direktur asing di PT PMA otomatis mendapatkan KITAS Kerja?", a: "Tidak otomatis. Direktur asing tetap perlu mengajukan KITAS Kerja melalui prosedur keimigrasian dan ketenagakerjaan yang berlaku setelah persyaratannya terpenuhi." },
    { q: "Berapa modal minimal PT PMA?", a: "Modal dasar minimal PT PMA adalah Rp10 Miliar dengan modal ditempatkan dan disetor minimal Rp2,5 Miliar. Ketentuan ini diatur dalam Peraturan BKPM." },
  ],

  ctaTitle: "Siap dirikan",
  ctaHighlight: "PT PMA Anda?",
  ctaDescription: "Konsultasi gratis untuk investasi asing di Indonesia — tanpa komitmen.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian PT PMA.",
};

const dataPTPerorangan: BadanUsahaContent = {
  id: "pt-perorangan",
  nama: "PT Perorangan",
  namaFormal: "Perseroan Perorangan",

  heroBreadcrumbText: "Pendirian PT Perorangan",
  heroBadge: "Pendirian PT Perorangan",
  heroTitle: [
    { text: "UMKM lebih profesional dan naik kelas lewat " },
    { break: true },
    { text: "Jasa Pendirian PT Perorangan", highlight: true },
  ],
  heroDescription:
    "Anda pemilik UMKM yang butuh legalitas usaha untuk menggaet mitra baru? Pendirian PT perorangan solusinya, tanpa banyak persyaratan.",
  heroImage:
    "/images/layanan/pt-perorangan-1.jpg",
  heroImageAlt: "Pengusaha individu mengembangkan bisnis",
  heroStats: [
    { icon: "Clock", value: "3–7 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp799rb", label: "Harga terjangkau" },
    { icon: "UserCheck", value: "1 Pendiri", label: "Tanpa rekanan" },
  ],
  floatingBadges: [
    {
      icon: "Sparkles",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      title: "Legalitas UMKM",
      subtitle: "Cepat & terjangkau",
      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "Building",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Badan Hukum Resmi",
      subtitle: "SK Kemenkumham",
      position: "bottom-[76px] -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN PT PERORANGAN",
  pengertianTitle: "Apa itu Perseroan Perorangan?",
  pengertianIntro:
    "Solusi badan hukum modern untuk pelaku UMKM yang ingin legal tanpa kompleksitas PT biasa.",
  pengertianImage:
    "/images/layanan/pt-perorangan-2.jpg",
  pengertianImageAlt: "Wirausaha individu",
  hukumIcon: "FileText",
  hukumIconBg: "bg-emerald-50",
  hukumIconColor: "text-emerald-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 6 Tahun 2023 (Cipta Kerja) & PP No. 8 Tahun 2021",
  pengertianDetail: (
    <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Perseroan Perorangan (PT Perorangan)</strong> adalah bentuk badan hukum yang didirikan oleh hanya satu orang Warga Negara Indonesia (WNI) untuk memenuhi kriteria Usaha Mikro dan Kecil (UMK) sesuai dengan UU Cipta Kerja. Pendiri bertindak sekaligus sebagai pemegang saham tunggal dan direktur perusahaan.
    </p>
  ),
  karakteristik: [
    { bold: "Satu orang pendiri", text: " yang merangkap sebagai direktur." },
    { bold: "Khusus bagi usaha mikro", text: " dan kecil (UMK)." },
    { bold: "Tidak memerlukan akta notaris", text: " untuk pendiriannya." },
    { bold: "Tanggung jawab pemilik", text: " terbatas pada modal yang disetorkan." },
  ],

  manfaatTag: "MANFAAT MEMILIH PT PERORANGAN",
  manfaatTitle: "Kenapa PT Perorangan cocok untuk UMKM?",
  manfaatItems: [
    { title: "Legalitas Badan Hukum", desc: "Status badan hukum resmi dengan SK Kemenkumham — tanpa harus partnership.", Icon: "Shield" },
    { title: "Modal Ringan", desc: "Tidak ada ketentuan modal minimum — sesuaikan dengan kemampuan usaha Anda.", Icon: "DollarSign" },
    { title: "Proses Super Cepat", desc: "Pendirian online via sistem SABH — tanpa akta notaris, cukup pernyataan elektronik.", Icon: "Clock" },
    { title: "Tanpa Rekanan", desc: "Cocok untuk solopreneur — Anda pemilik tunggal, semua keputusan ada di tangan Anda.", Icon: "UserCheck" },
  ],

  pricingTag: "BIAYA JASA PEMBUATAN PT PERORANGAN",
  pricingTitle: "Pilih paket pendirian PT Perorangan.",
  pricingSubtitle:
    "Harga sudah termasuk pembuatan pernyataan pendirian, SK Kemenkumham, NPWP, dan NIB. (Opsional: Akta Penegasan Notaris + Rp 1.499.000).",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 799.000",
      strikePrice: "Rp 1.600.000",
      subLabel: "AKTA PENEGASAN + Rp 1.499.000 (OPSIONAL)",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pendirian PT Perorangan. Mohon info lengkap biaya dan prosesnya.", "paket-basic-pendirian-pt-perorangan"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Pernyataan Elektronik <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP Badan <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Ketersediaan Nama", checked: true },
          { text: "<strong>10 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Surat Pernyataan Pendirian Elektronik (SABH)", checked: true },
          { text: "Sertifikat Pendaftaran Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: false },
          { text: "SPPL & Sertifikat Standar", checked: false },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "1 Kupon", checked: true },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 999.000",
      strikePrice: "Rp 2.000.000",
      subLabel: "AKTA PENEGASAN + Rp 1.499.000 (OPSIONAL)",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pendirian PT Perorangan. Mohon info lengkap biaya dan prosesnya.", "paket-complete-pendirian-pt-perorangan"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Dokumen Lengkap <strong>1–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Ketersediaan Nama", checked: true },
          { text: "<strong>10 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Surat Pernyataan Pendirian Elektronik (SABH)", checked: true },
          { text: "Sertifikat Pendaftaran Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "1 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 1.299.000",
      strikePrice: "Rp 2.600.000",
      subLabel: "AKTA PENEGASAN + Rp 1.499.000 (OPSIONAL)",
      buttonText: "Pilih Paket Express",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Express Pendirian PT Perorangan. Mohon info lengkap biaya dan prosesnya.", "paket-express-pendirian-pt-perorangan"),
      customHeaderOverlay: (
        <div className="absolute -right-3 -top-8 w-20 h-20 sm:w-[100px] sm:h-[100px] transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <img src="/Fast Track.png" alt="Fast Track" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Proses Kilat <strong>12 Jam Kerja</strong>", checked: true, footnoteIndex: 1 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Ketersediaan Nama", checked: true },
          { text: "<strong>10 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Surat Pernyataan Pendirian Elektronik (SABH)", checked: true },
          { text: "Sertifikat Pendaftaran Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
          { text: "Dokumen Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET OFFICE",
      price: "Rp 3.649.000",
      strikePrice: "Rp 7.300.000",
      subLabel: "AKTA PENEGASAN + Rp 1.499.000 (OPSIONAL)",
      buttonText: "Pilih Paket Office",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Office Pendirian PT Perorangan. Mohon info lengkap biaya dan prosesnya.", "paket-office-pendirian-pt-perorangan"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Dokumen Lengkap <strong>1–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Ketersediaan Nama", checked: true },
          { text: "<strong>10 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Surat Pernyataan Pendirian Elektronik (SABH)", checked: true },
          { text: "Sertifikat Pendaftaran Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "VIRTUAL OFFICE", isBoxed: true, items: [
          { text: "Virtual Office 1 Tahun", boldText: "1 Tahun", checked: true },
          { text: "Meeting Room 6 Jam/Bulan (3 Kota: Jkt, Bekasi, Bdg)", checked: true },
          { text: "Fasilitas Kantor Siap PKP", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET PRESTIGE",
      price: "Rp 1.999.000",
      strikePrice: "Rp 4.000.000",
      subLabel: "AKTA PENEGASAN + Rp 1.499.000 (OPSIONAL)",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pendirian PT Perorangan. Mohon info lengkap biaya dan prosesnya.", "paket-prestige-pendirian-pt-perorangan"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Dokumen Lengkap <strong>1–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Ketersediaan Nama", checked: true },
          { text: "<strong>10 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Surat Pernyataan Pendirian Elektronik (SABH)", checked: true },
          { text: "Sertifikat Pendaftaran Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BRANDING IDENTITY", isBoxed: true, items: [
          { text: "Company Profile Digital 8 Halaman", checked: true },
          { text: "Desain Logo (3x Revisi)", checked: true },
          { text: "Desain Kartu Nama & Kop Surat", checked: true },
          { text: "Desain Amplop & Map Bisnis", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Undian iPhone", boldText: "2 Kupon", checked: true },
          { text: "Pembukaan Rekening Bank", checked: true, footnoteIndex: "*" },
        ]},
        { title: "EXTRA BONUS", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah data pendiri lengkap & disetujui sistem SABH." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN PT PERORANGAN",
  stepsTitle: "Kebingungan? Kami siap bantu proses pendirian PT Perorangan demi Anda.",
  stepsSubtitle:
    "Daftar online, tanpa notaris, tanpa ribet — estimasi 1–3 hari kerja.",
  steps: [
    { no: "01", title: "Mencantumkan Identitas Diri", duration: "", desc: "Mengirimkan foto KTP dan NPWP.", points: [] },
    { no: "02", title: "Pengecekan Kelengkapan Dokumen", duration: "", desc: "Tim kami memeriksa kelengkapan dokumen pendirian Anda.", points: [] },
    { no: "03", title: "Proses Pendirian di Kemenkumham", duration: "", desc: "Pendirian PT Perorangan diproses melalui sistem Kementerian Hukum & HAM.", points: [] },
    { no: "04", title: "Konfirmasi dan Persetujuan", duration: "", desc: "Konfirmasi pendaftaran Sertifikat Pendirian dari Kementerian Hukum & HAM.", points: [] },
    { no: "05", title: "Penerbitan Dokumen", duration: "", desc: "Penerbitan Sertifikat Pendirian dan Surat Pernyataan Pendirian PT dari Kemenkumham.", points: [] },
    { no: "06", title: "NPWP & NIB", duration: "", desc: "Pendaftaran NPWP badan dan penerbitan NIB melalui OSS RBA.", points: [] },
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PENDIRIAN PT PERORANGAN</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan seputar PT Perorangan.",
  faqs: [
    { q: "Apa itu PT Perorangan dan siapa yang bisa mendirikannya?", a: "PT Perorangan adalah badan hukum yang dapat didirikan oleh satu orang untuk memenuhi kriteria usaha mikro atau kecil sesuai ketentuan yang berlaku." },
    { q: "Apa bedanya PT Perorangan dengan PT Biasa (PT Persekutuan Modal)?", a: "Perbedaan utamanya terletak pada jumlah pendiri, persyaratan administrasi, dan mekanisme pengelolaannya. PT Perorangan didirikan oleh satu orang, sedangkan PT Biasa minimal didirikan oleh dua pihak." },
    { q: "Berapa lama proses pembuatan PT Perorangan?", a: "Proses pendirian PT Perorangan umumnya dapat selesai sekitar 1–3 hari kerja, selama data dan dokumen yang dibutuhkan sudah lengkap." },
    { q: "Apakah PT Perorangan bisa dipakai untuk buka rekening bank atas nama perusahaan?", a: "Bisa. Setelah legalitas PT Perorangan terbit dan persyaratan bank terpenuhi, perusahaan dapat membuka rekening atas nama badan usaha." },
    { q: "Apa beda PT Perorangan dengan PT biasa?", a: "PT Perorangan didirikan oleh 1 orang (tanpa notaris, via online), tidak punya modal minimum, dan khusus untuk UMKM. PT biasa memerlukan minimal 2 pendiri, akta notaris, dan modal minimum Rp50 juta." },
    { q: "Apakah PT Perorangan bisa punya karyawan?", a: "Ya, PT Perorangan tetap bisa mempekerjakan karyawan. Status badan hukumnya memungkinkan untuk mendaftarkan BPJS Ketenagakerjaan & Kesehatan bagi karyawan." },
  ],

  ctaTitle: "Siap dirikan",
  ctaHighlight: "PT Perorangan Anda?",
  ctaDescription: "Konsultasi gratis untuk mulai usaha dengan badan hukum PT — tanpa komitmen.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian PT Perorangan.",
};

const dataFirma: BadanUsahaContent = {
  id: "firma",
  nama: "Firma",
  namaFormal: "Firma (Fa)",

  heroBreadcrumbText: "Pendirian Firma",
  heroBadge: "Pendirian Firma",
  heroTitle: [
    { text: "Bangun legalitas hukum yang kuat dan mudah melalui " },
    { break: true },
    { text: "Jasa Pendirian Firma kami", highlight: true },
  ],
  heroDescription:
    "Anda ingin membangun bisnis bersama tanpa ribet namun terjamin legalitasnya? Pendirian firma adalah pilihan yang tepat agar mendapatkan beragam manfaat lainnya.",
  heroImage:
    "/images/layanan/firma-1.jpg",
  heroImageAlt: "Rekan bisnis mendirikan Firma",
  heroStats: [
    { icon: "Clock", value: "6–12 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp1,99jt", label: "Harga transparan" },
    { icon: "Users", value: "2+ Pendiri", label: "Kerja sama" },
  ],
  floatingBadges: [
    {
      icon: "Handshake",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      title: "Akta Firma",
      subtitle: "Terbit dalam 2 hari",

      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "ShieldCheck",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Terdaftar Resmi",
      subtitle: "Legalitas terjamin",
      position: "bottom-[76px] -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN FIRMA",
  pengertianTitle: "Apa itu Firma (Fa)?",
  pengertianIntro:
    "Pahami badan usaha berbasis kepercayaan & kerja sama antar rekan.",
  pengertianImage:
    "/images/layanan/firma-2.jpg",
  pengertianImageAlt: "Kerja sama tim Firma",
  hukumIcon: "FileText",
  hukumIconBg: "bg-orange-50",
  hukumIconColor: "text-orange-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "Kitab Undang-Undang Hukum Dagang (KUHD) Pasal 16–35",
  pengertianDetail: (
    <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Firma (Fa)</strong> adalah suatu bentuk persekutuan bisnis yang didirikan oleh dua orang atau lebih dengan kesepakatan untuk menjalankan usaha bersama di bawah satu nama yang sama. Setiap anggota Firma (pesero) memiliki tanggung jawab yang tidak terbatas dan bersifat tanggung renteng atas seluruh kewajiban dan utang perusahaan.
    </p>
  ),
  karakteristik: [
    { bold: "Didirikan oleh minimal 2 orang", text: " di bawah satu nama bersama." },
    { bold: "Tanggung jawab anggota", text: " bersifat tidak terbatas dan tanggung renteng." },
    { bold: "Setiap sekutu memiliki hak penuh", text: " untuk bertindak atas nama Firma." },
    { bold: "Pembagian keuntungan diatur", text: " berdasarkan kesepakatan dalam akta pendirian." },
  ],

  manfaatTag: "MANFAAT MEMILIH FIRMA",
  manfaatTitle: "Kenapa Firma cocok untuk bisnis profesional?",
  manfaatItems: [
    { title: "Kemitraan Solid", desc: "Semua sekutu bekerja sama dengan nama bersama — menciptakan ikatan bisnis yang kuat.", Icon: "Handshake" },
    { title: "Modal Bersama", desc: "Modal dikumpulkan dari semua sekutu — lebih besar kapasitasnya dibanding usaha individu.", Icon: "DollarSign" },
    { title: "Kepercayaan Tinggi", desc: "Struktur Firma menunjukkan komitmen penuh para pendiri — meningkatkan kepercayaan klien.", Icon: "Star" },
    { title: "Fleksibel", desc: "Tidak ada ketentuan modal minimum, struktur lebih sederhana dibanding PT.", Icon: "Scale" },
  ],

  pricingTag: "BIAYA JASA PEMBUATAN FIRMA",
  pricingTitle: "Pilih paket pendirian Firma sesuai kebutuhan.",
  pricingSubtitle:
    "Harga sudah termasuk akta notaris, pendaftaran Pengadilan Negeri, NPWP, dan NIB.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 1.999.000",
      strikePrice: "Rp 4.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pendirian Firma. Mohon info lengkap biaya dan prosesnya.", "paket-basic-pendirian-firma"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Pendaftaran PN & NPWP <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Nama Firma", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Firma", checked: true },
          { text: "Pendaftaran ke Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: false },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 2.999.000",
      strikePrice: "Rp 6.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pendirian Firma. Mohon info lengkap biaya dan prosesnya.", "paket-complete-pendirian-firma"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Nama Firma", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Firma", checked: true },
          { text: "Pendaftaran ke Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan 1 Warna", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 4.499.000",
      strikePrice: "Rp 9.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Express Pendirian Firma. Mohon info lengkap biaya dan prosesnya.", "paket-express-pendirian-firma"),
      customHeaderOverlay: (
        <div className="absolute -right-3 -top-8 w-20 h-20 sm:w-[100px] sm:h-[100px] transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <img src="/Fast Track.png" alt="Fast Track" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>4 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Nama Firma", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Firma", checked: true },
          { text: "Pendaftaran ke Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET OFFICE",
      price: "Rp 5.649.000",
      strikePrice: "Rp 11.300.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Office",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Office Pendirian Firma. Mohon info lengkap biaya dan prosesnya.", "paket-office-pendirian-firma"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Nama Firma", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Firma", checked: true },
          { text: "Pendaftaran ke Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "VIRTUAL OFFICE", isBoxed: true, items: [
          { text: "Virtual Office 1 Tahun", boldText: "1 Tahun", checked: true },
          { text: "Meeting Room 6 Jam/Bulan (3 Kota: Jkt, Bekasi, Bdg)", checked: true },
          { text: "Fasilitas Siap PKP", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET PRESTIGE",
      price: "Rp 3.999.000",
      strikePrice: "Rp 8.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pendirian Firma. Mohon info lengkap biaya dan prosesnya.", "paket-prestige-pendirian-firma"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–10 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Nama Firma", checked: true },
          { text: "<strong>20 KBLI</strong> Bidang Usaha", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Firma", checked: true },
          { text: "Pendaftaran ke Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BRANDING IDENTITY", isBoxed: true, items: [
          { text: "Company Profile Digital 8 Halaman", checked: true },
          { text: "Desain Logo (3x Revisi)", checked: true },
          { text: "Desain Kartu Nama & Kop Surat", checked: true },
          { text: "Desain Amplop & Map Bisnis", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
          { text: "Dokumen SOP & Kontrak Bisnis", checked: true },
          { text: "Stempel Perusahaan <strong>1-3 Warna</strong>", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah penandatanganan akta oleh seluruh sekutu." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN FIRMA",
  stepsTitle: "Tata cara pembuatan firma yang akan kami bantu selesaikan",
  stepsSubtitle:
    "Dari konsultasi sampai dokumen resmi — estimasi 3–7 hari kerja.",
  steps: [
    { no: "01", title: "Konsultasi & Perjanjian Sekutu", duration: "", desc: "Diskusi dengan tim legal untuk menyusun perjanjian antar sekutu dan menentukan struktur Firma.", points: [] },
    { no: "02", title: "Pembuatan Akta Notaris", duration: "", desc: "Notaris menyusun akta pendirian Firma yang memuat anggaran dasar & kesepakatan para sekutu.", points: [] },
    { no: "03", title: "NPWP & SKT Pajak", duration: "", desc: "Registrasi Firma sebagai wajib pajak badan ke DJP.", points: [] },
    { no: "04", title: "NIB & Perizinan OSS", duration: "", desc: "Penerbitan NIB dan akses OSS RBA untuk perizinan berusaha.", points: [] },
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PENDIRIAN FIRMA</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan seputar pendirian Firma.",
  faqs: [
    { q: "Apa itu Firma dan siapa yang bisa mendirikannya?", a: "Firma adalah bentuk badan usaha yang didirikan oleh minimal dua orang untuk menjalankan usaha bersama, di mana seluruh sekutu bertanggung jawab atas pengelolaan dan kewajiban firma." },
    { q: "Apa bedanya Firma dengan CV dan PT?", a: "Perbedaan utamanya terletak pada tanggung jawab para sekutu dan status badan usahanya. Dalam Firma seluruh sekutu bertanggung jawab penuh, sedangkan CV memiliki sekutu aktif dan pasif, sementara PT merupakan badan hukum dengan tanggung jawab terbatas." },
    { q: "Berapa modal minimal untuk mendirikan Firma?", a: "Tidak ada ketentuan modal minimal yang wajib dipenuhi untuk mendirikan Firma sesuai peraturan yang berlaku." },
    { q: "Berapa lama proses pendaftaran Firma hingga legalitas terbit?", a: "Proses pendirian Firma umumnya dapat selesai sekitar 3–7 hari kerja, tergantung kelengkapan dokumen dan proses administrasi." },
    { q: "Apakah Warga Negara Asing (WNA) bisa menjadi anggota Firma?", a: "Pada umumnya, Firma didirikan oleh Warga Negara Indonesia (WNI), sehingga WNA tidak dapat menjadi sekutu dalam pendirian Firma sesuai ketentuan yang berlaku." },
    { q: "Apakah Firma bisa punya lebih dari 2 pendiri?", a: "Ya, Firma bisa didirikan oleh 2 orang atau lebih. Semakin banyak sekutu, semakin besar modal dan kapasitas usaha." },
  ],

  ctaTitle: "Siap dirikan",
  ctaHighlight: "Firma Anda?",
  ctaDescription: "Konsultasi gratis untuk menentukan struktur Firma yang tepat — tanpa komitmen.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian Firma.",
};

const dataYayasan: BadanUsahaContent = {
  id: "yayasan",
  nama: "Yayasan",
  namaFormal: "Yayasan",

  heroBreadcrumbText: "Pendirian Yayasan",
  heroBadge: "Pendirian Yayasan",
  heroTitle: [
    { text: "Semakin terpercaya di lingkup isu sosial dengan " },
    { break: true },
    { text: "Jasa Pendirian Yayasan", highlight: true },
  ],
  heroDescription:
    "Angkat kepedulian sosial supaya lebih dipercaya masyarakat bersama kami yang siap membantu sesama lebih banyak.",
  heroImage:
    "/images/layanan/yayasan-1.jpg",
  heroImageAlt: "Kegiatan sosial yayasan",
  heroStats: [
    { icon: "Clock", value: "14–30 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp2,99jt", label: "Harga transparan" },
    { icon: "Heart", value: "Nirlaba", label: "Non-profit" },
  ],
  floatingBadges: [
    {
      icon: "Heart",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-600",
      title: "SK Kemenkumham",
      subtitle: "Badan hukum resmi",
      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "ShieldCheck",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Akta Notaris",
      subtitle: "Terbit & disahkan",
      position: "bottom-[76px] -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN YAYASAN",
  pengertianTitle: "Apa itu Yayasan?",
  pengertianIntro:
    "Pahami badan hukum nirlaba untuk tujuan sosial, kemanusiaan, dan keagamaan.",
  pengertianImage:
    "/images/layanan/yayasan-2.jpg",
  pengertianImageAlt: "Kegiatan yayasan sosial",
  hukumIcon: "FileText",
  hukumIconBg: "bg-pink-50",
  hukumIconColor: "text-pink-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 16 Tahun 2001 jo. UU No. 28 Tahun 2004 tentang Yayasan",
  pengertianDetail: (
    <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Yayasan</strong> adalah badan hukum yang terdiri atas kekayaan yang dipisahkan dan diperuntukkan untuk mencapai tujuan tertentu di bidang sosial, keagamaan, dan kemanusiaan, yang tidak mempunyai anggota. Yayasan diatur oleh UU No. 16 Tahun 2001 tentang Yayasan sebagaimana telah diubah dengan UU No. 28 Tahun 2004.
    </p>
  ),
  karakteristik: [
    { bold: "Merupakan badan hukum nirlaba", text: " (tidak mencari keuntungan pribadi)." },
    { bold: "Memiliki struktur kepengurusan", text: " yang terdiri dari Pembina, Pengurus, dan Pengawas." },
    { bold: "Kekayaan yayasan dipisahkan", text: " dari kekayaan pribadi pendiri/pengurus." },
    { bold: "Tidak memiliki anggota", text: " seperti perseroan atau koperasi." },
  ],

  manfaatTag: "MANFAAT MEMILIH YAYASAN",
  manfaatTitle: "Kenapa Yayasan jadi pilihan organisasi nirlaba?",
  manfaatItems: [
    { title: "Badan Hukum Resmi", desc: "Status badan hukum penuh yang diakui negara — kredibilitas tinggi untuk donatur & mitra.", Icon: "Shield" },
    { title: "Fokus Sosial", desc: "Struktur dirancang khusus untuk tujuan sosial, keagamaan, & kemanusiaan — bukan profit.", Icon: "Heart" },
    { title: "Transparansi", desc: "Dengan organ Pembina, Pengurus, & Pengawas — tata kelola jelas & akuntabel.", Icon: "Target" },
    { title: "Akses Pendanaan", desc: "Lebih mudah mendapatkan hibah, donasi, dan kerja sama dengan pemerintah/LSM.", Icon: "DollarSign" },
  ],

  pricingTag: "BIAYA JASA PEMBUATAN YAYASAN",
  pricingTitle: "Pilih paket pendirian Yayasan sesuai kebutuhan.",
  pricingSubtitle:
    "Harga sudah termasuk akta notaris, SK Kemenkumham, NPWP, dan NIB Yayasan.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 3.449.000",
      strikePrice: "Rp 7.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pendirian Yayasan. Mohon info lengkap biaya dan prosesnya.", "paket-basic-pendirian-yayasan"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>2–5 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & SKT Pajak <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Yayasan", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Yayasan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: false },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 5.499.000",
      strikePrice: "Rp 11.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pendirian Yayasan. Mohon info lengkap biaya dan prosesnya.", "paket-complete-pendirian-yayasan"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>2–5 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & Perizinan <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Yayasan", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Yayasan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Draft Anggaran Dasar & ART", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET PRESTIGE",
      price: "Rp 6.499.000",
      strikePrice: "Rp 13.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pendirian Yayasan. Mohon info lengkap biaya dan prosesnya.", "paket-prestige-pendirian-yayasan"),
      customHeaderOverlay: (
        <div className="absolute -right-3 -top-8 w-20 h-20 sm:w-[100px] sm:h-[100px] transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <img src="/Fast Track.png" alt="Fast Track" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>1–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & Perizinan <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Yayasan", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Yayasan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BRANDING & DOKUMEN", isBoxed: true, items: [
          { text: "Company Profile Yayasan Digital", checked: true },
          { text: "Desain Logo & Identitas Organisasi", checked: true },
          { text: "Draft Lengkap AD/ART & Program Kerja", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah penandatanganan akta & kelengkapan dokumen pendiri." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN YAYASAN",
  stepsTitle: "Langkah-langkah pembuatan yayasan yang akan kami dampingi sampai selesai.",
  stepsSubtitle:
    "Dari konsultasi sampai dokumen resmi di tangan — estimasi 7–14 hari kerja (syarat berlaku).",
  steps: [
    { no: "01", title: "Konsultasi & Persiapan", duration: "", desc: "Konsultasi gratis untuk menentukan tujuan yayasan, struktur organ, dan program kerja.", points: [] },
    { no: "02", title: "Pemesanan Nama ke AHU", duration: "", desc: "Waktu persetujuan nama bergantung pada AHU.", points: [] },
    { no: "03", title: "SK Kemenkumham", duration: "", desc: "Verifikasi dokumen dan penerbitan SK Pengesahan.", points: [] },
    { no: "04", title: "NPWP Yayasan", duration: "", desc: "Pendaftaran NPWP atas nama yayasan ke DJP.", points: [] },
    { no: "05", title: "NIB & Perizinan OSS", duration: "", desc: "Penerbitan NIB dan akses OSS RBA untuk kegiatan operasional.", points: [] },
    { no: "06", title: "Penyerahan Dokumen", duration: "", desc: "Penyerahan semua dokumen resmi yayasan ke alamat Anda.", points: [] },
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PENDIRIAN YAYASAN</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan seputar pendirian Yayasan.",
  faqs: [
    { q: "Apa itu Yayasan dan apa syarat utama mendirikannya?", a: "Yayasan adalah badan hukum nirlaba yang didirikan untuk tujuan sosial, keagamaan, atau kemanusiaan. Syarat utamanya meliputi minimal satu orang pendiri, nama yayasan, alamat domisili, kekayaan awal yang dipisahkan, serta susunan organ yayasan sesuai ketentuan." },
    { q: "Berapa modal awal atau kekayaan terpisah yang harus disiapkan untuk Yayasan?", a: "Yayasan wajib memiliki kekayaan awal yang dipisahkan dari harta pribadi pendiri, dengan syarat pendirian sesuai ketentuan yang berlaku." },
    { q: "Berapa lama proses pendirian Yayasan hingga SK Kemenkumham terbit?", a: "Proses pendirian Yayasan umumnya dapat selesai sekitar 7–14 hari kerja, tergantung kelengkapan dokumen dan proses administrasi." },
    { q: "Apakah Yayasan boleh menjalankan kegiatan usaha?", a: "Boleh. Yayasan dapat memiliki atau mendirikan badan usaha komersial yang sejalan dengan tujuannya, selama pengelolaannya dilakukan sesuai regulasi yang berlaku." },
    { q: "Apa perbedaan Yayasan dengan PT?", a: "Yayasan adalah badan hukum nirlaba untuk tujuan sosial/keagamaan/kemanusiaan — tidak mencari untung. PT adalah badan hukum komersial untuk mencari keuntungan bagi pemegang saham." },
    { q: "Siapa saja organ Yayasan?", a: "Yayasan memiliki 3 organ wajib: Pembina (menetapkan kebijakan), Pengurus (menjalankan yayasan), dan Pengawas (mengawasi pengurus)." },
  ],

  ctaTitle: "Siap dirikan",
  ctaHighlight: "Yayasan Anda?",
  ctaDescription: "Konsultasi gratis untuk mendirikan yayasan nirlaba — tanpa komitmen.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian Yayasan.",
};

const dataPerkumpulan: BadanUsahaContent = {
  id: "perkumpulan",
  nama: "Perkumpulan",
  namaFormal: "Perkumpulan",

  heroBreadcrumbText: "Pendirian Perkumpulan",
  heroBadge: "Pendirian Perkumpulan",
  heroTitle: [
    { text: "Jasa Pendirian Perkumpulan ", highlight: true },
    { break: true },
    { text: "untuk Anda yang ingin " },
    { break: true },
    { text: "membangun komunitas nirlaba" },
  ],
  heroDescription:
    "Ingin komunitas Anda terdaftar secara resmi dan berbadan hukum? Segera lakukan pendirian perkumpulan agar lebih profesional.",
  heroImage:
    "/images/layanan/perkumpulan-1.jpg",
  heroImageAlt: "Komunitas perkumpulan",
  heroStats: [
    { icon: "Clock", value: "14–30 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp3,99jt", label: "Harga transparan" },
    { icon: "Users", value: "Berbasis Anggota", label: "Komunitas" },
  ],
  floatingBadges: [
    {
      icon: "BookOpen",
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      title: "Akta Perkumpulan",
      subtitle: "Terbit dalam 3 hari",
      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "ShieldCheck",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Terdaftar Resmi",
      subtitle: "Legalitas diakui",
      position: "bottom-[76px] -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN PERKUMPULAN",
  pengertianTitle: "Apa itu Perkumpulan?",
  pengertianIntro:
    "Pahami badan hukum berbasis keanggotaan untuk komunitas & organisasi sosial.",
  pengertianImage:
    "/images/layanan/perkumpulan-2.jpg",
  pengertianImageAlt: "Anggota perkumpulan",
  hukumIcon: "FileText",
  hukumIconBg: "bg-teal-50",
  hukumIconColor: "text-teal-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 16 Tahun 2001 jo. UU No. 28 Tahun 2004 (sama dengan Yayasan) & Keputusan Menteri Hukum",
  pengertianDetail: (
    <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Perkumpulan</strong> adalah badan hukum yang merupakan kumpulan orang yang didirikan untuk mewujudkan kesamaan maksud dan tujuan tertentu di bidang sosial, keagamaan, kemanusiaan, atau keilmuan, dan tidak membagikan keuntungan kepada anggotanya. Diatur berdasarkan Staatsblad 1870 No. 64 dan peraturan Kemenkumham.
    </p>
  ),
  karakteristik: [
    { bold: "Didirikan oleh sekumpulan orang", text: " dengan kesamaan visi dan misi non-profit." },
    { bold: "Dapat berbentuk badan hukum", text: " atau perkumpulan biasa (tidak berbadan hukum)." },
    { bold: "Keanggotaan bersifat sukarela", text: " dan diatur dalam anggaran dasar." },
    { bold: "Pendapatan organisasi sepenuhnya", text: " digunakan untuk mencapai tujuan perkumpulan." },
  ],

  manfaatTag: "MANFAAT MEMILIH PERKUMPULAN",
  manfaatTitle: "Kenapa Perkumpulan cocok untuk komunitas?",
  manfaatItems: [
    { title: "Legalitas Komunitas", desc: "Status badan hukum memberikan pengakuan resmi untuk organisasi komunitas Anda.", Icon: "BookOpen" },
    { title: "Demokratis", desc: "Rapat Anggota sebagai organ tertinggi — setiap anggota punya hak suara.", Icon: "Users" },
    { title: "Fokus Komunitas", desc: "Struktur ideal untuk organisasi profesi, hobi, olahraga, & sosial.", Icon: "Heart" },
    { title: "Kredibilitas", desc: "Badan hukum meningkatkan kepercayaan mitra, donatur, dan pemerintah.", Icon: "Shield" },
  ],

  pricingTag: "BIAYA JASA PEMBUATAN PERKUMPULAN",
  pricingTitle: "Pilih paket pendirian Perkumpulan.",
  pricingSubtitle:
    "Harga sudah termasuk akta notaris, pengesahan Kemenkumham, NPWP, dan NIB.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 3.499.000",
      strikePrice: "Rp 7.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pendirian Perkumpulan. Mohon info lengkap biaya dan prosesnya.", "paket-basic-pendirian-perkumpulan"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & Pengesahan <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & SKT Pajak <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Perkumpulan", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Perkumpulan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS", checked: false },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 5.499.000",
      strikePrice: "Rp 11.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pendirian Perkumpulan. Mohon info lengkap biaya dan prosesnya.", "paket-complete-pendirian-perkumpulan"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & Pengesahan <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & Perizinan <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Perkumpulan", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Perkumpulan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Draft AD/ART Lengkap", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET PRESTIGE",
      price: "Rp 6.499.000",
      strikePrice: "Rp 13.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pendirian Perkumpulan. Mohon info lengkap biaya dan prosesnya.", "paket-prestige-pendirian-perkumpulan"),
      customHeaderOverlay: (
        <div className="absolute -right-3 -top-8 w-20 h-20 sm:w-[100px] sm:h-[100px] transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <img src="/Fast Track.png" alt="Fast Track" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & Pengesahan <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & Perizinan <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Perkumpulan", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Perkumpulan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BRANDING & DOKUMEN", isBoxed: true, items: [
          { text: "Profil Digital Komunitas / Organisasi", checked: true },
          { text: "Desain Logo & Identitas Organisasi", checked: true },
          { text: "Draft Lengkap AD/ART & Program Kerja", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah penandatanganan akta oleh para pendiri." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN PERKUMPULAN",
  stepsTitle: "Berikut beberapa langkah yang akan kami bantu dalam pembuatan perkumpulan.",
  stepsSubtitle:
    "Dari konsultasi sampai badan hukum resmi — estimasi 14–30 hari kerja (syarat berlaku).",
  steps: [
    { no: "01", title: "Konsultasi Persiapan", duration: "", desc: "Melengkapi data persyaratan formulir perkumpulan dan mengirimkan ART perkumpulan.", points: [] },
    { no: "02", title: "Pemesanan Nama ke AHU", duration: "", desc: "Lama waktu verifikasi bergantung pada pihak AHU.", points: [] },
    { no: "03", title: "Menunggu SK Kemenkumham", duration: "", desc: "Verifikasi dokumen dan penerbitan SK Pengesahan.", points: [] },
    { no: "04", title: "NPWP Perkumpulan", duration: "", desc: "Pendaftaran NPWP atas nama perkumpulan ke DJP.", points: [] },
    { no: "05", title: "NIB & OSS", duration: "", desc: "Penerbitan NIB dan akses OSS RBA untuk kegiatan operasional.", points: [] },
    { no: "06", title: "Penyerahan Dokumen", duration: "", desc: "Penyerahan semua dokumen resmi perkumpulan ke alamat Anda.", points: [] },
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PENDIRIAN PERKUMPULAN</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan seputar pendirian Perkumpulan.",
  faqs: [
    {
      q: "Apa itu Perkumpulan dan apa perbedaannya dengan Yayasan?",
      a: "Perkumpulan adalah badan hukum berbasis keanggotaan yang dibentuk atas dasar kesamaan minat, profesi, atau tujuan bersama, sedangkan Yayasan berbasis pada harta kekayaan yang dipisahkan untuk tujuan sosial tertentu.",
    },
    {
      q: "Berapa jumlah minimal pendiri untuk membentuk perkumpulan berbadan hukum?",
      a: "Pembentukan perkumpulan berbadan hukum umumnya membutuhkan minimal 3 (tiga) orang atau lebih sesuai AD/ART yang disepakati.",
    },
    {
      q: "Dokumen apa saja yang diperlukan untuk pendaftaran perkumpulan ke Kemenkumham?",
      a: "Berita acara rapat pendirian, susunan kepengurusan, AD/ART perkumpulan, identitas pendiri, dan surat keterangan domisili.",
    },
  ],

  ctaTitle: "Siap dirikan",
  ctaHighlight: "Perkumpulan Anda?",
  ctaDescription: "Konsultasi gratis untuk mendirikan perkumpulan resmi — tanpa komitmen.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian Perkumpulan.",
};

const dataKoperasi: BadanUsahaContent = {
  id: "koperasi",
  nama: "Koperasi",
  namaFormal: "Koperasi",

  heroBreadcrumbText: "Pendirian Koperasi",
  heroBadge: "Pendirian Koperasi",
  heroTitle: [
    { text: "Berdayakan rekan bisnis Anda " },
    { break: true },
    { text: "melalui " },
    { text: "Jasa Pendirian Koperasi", highlight: true },
  ],
  heroDescription:
    "Maju dan berdayakan pekerja Anda melalui pendirian koperasi yang dapat meningkatkan kesejahteraan mereka semua.",
  heroImage:
    "/images/layanan/koperasi-1.jpg",
  heroImageAlt: "Rapat anggota koperasi",
  heroStats: [
    { icon: "Clock", value: "14–30 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp3,99jt", label: "Harga transparan" },
    { icon: "Users", value: "20+ Anggota", label: "Minimal pendiri" },
  ],
  floatingBadges: [
    {
      icon: "Handshake",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      title: "Akta Koperasi",
      subtitle: "Terbit & disahkan",
      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "ShieldCheck",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "SK Kemenkumham",
      subtitle: "Badan hukum resmi",
      position: "bottom-[76px] -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN KOPERASI",
  pengertianTitle: "Apa itu Koperasi?",
  pengertianIntro:
    "Pahami badan hukum ekonomi kerakyatan yang mengutamakan kesejahteraan anggota.",
  pengertianImage:
    "/images/layanan/koperasi-2.png",
  pengertianImageAlt: "Anggota koperasi",
  hukumIcon: "FileText",
  hukumIconBg: "bg-green-50",
  hukumIconColor: "text-green-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 25 Tahun 1992 tentang Perkoperasian & PP No. 7 Tahun 2021",
  pengertianDetail: (
    <p className="text-[16px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Koperasi</strong> adalah badan usaha yang beranggotakan orang-seorang atau badan hukum koperasi dengan melandaskan kegiatannya berdasarkan prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasarkan atas asas kekeluargaan. Koperasi bertujuan memajukan kesejahteraan anggota pada khususnya dan masyarakat pada umumnya.
    </p>
  ),
  karakteristik: [
    { bold: "Didirikan berdasarkan asas kekeluargaan", text: " dan gotong royong." },
    { bold: "Keanggotaan bersifat sukarela", text: " dan terbuka." },
    { bold: "Kekuasaan tertinggi berada", text: " pada Rapat Anggota Tahunan (RAT)." },
    { bold: "Sisa Hasil Usaha (SHU)", text: " dibagikan secara adil sebanding dengan jasa usaha masing-masing anggota." },
  ],

  manfaatTag: "MANFAAT MEMILIH KOPERASI",
  manfaatTitle: "Kenapa Koperasi jadi pilihan ekonomi kerakyatan?",
  manfaatItems: [
    { title: "Kesejahteraan Anggota", desc: "Keuntungan koperasi dikembalikan ke anggota dalam bentuk SHU & layanan.", Icon: "Heart" },
    { title: "Demokrasi Ekonomi", desc: "Satu anggota satu suara — setiap anggota punya hak setara dalam pengambilan keputusan.", Icon: "Users" },
    { title: "Akses Modal", desc: "Koperasi bisa menghimpun simpanan anggota dan mengakses pembiayaan dari bank & pemerintah.", Icon: "DollarSign" },
    { title: "Dukungan Pemerintah", desc: "Koperasi mendapat perhatian khusus dari pemerintah dalam bentuk program & bantuan.", Icon: "Shield" },
  ],

  pricingTag: "BIAYA JASA PEMBUATAN KOPERASI",
  pricingTitle: "Pilih paket pendirian Koperasi sesuai kebutuhan.",
  pricingSubtitle:
    "Harga sudah termasuk akta notaris, pengesahan Kemenkumham, NPWP, dan NIB Koperasi.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 3.999.000",
      strikePrice: "Rp 8.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Basic Pendirian Koperasi. Mohon info lengkap biaya dan prosesnya.", "paket-basic-pendirian-koperasi"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & SKT Pajak <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Koperasi", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Koperasi & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS", checked: false },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 4.999.000",
      strikePrice: "Rp 10.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Complete Pendirian Koperasi. Mohon info lengkap biaya dan prosesnya.", "paket-complete-pendirian-koperasi"),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & Perizinan <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Koperasi", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Koperasi & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Logam Mulia Emas 24K", boldText: "1 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Draft AD/ART & Rencana Kerja", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET PRESTIGE",
      price: "Rp 5.999.000",
      strikePrice: "Rp 12.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Prestige",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya tertarik dengan Paket Prestige Pendirian Koperasi. Mohon info lengkap biaya dan prosesnya.", "paket-prestige-pendirian-koperasi"),
      customHeaderOverlay: (
        <div className="absolute -right-3 -top-8 w-20 h-20 sm:w-[100px] sm:h-[100px] transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <img src="/Fast Track.png" alt="Fast Track" className="w-full h-full object-contain drop-shadow-lg" />
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & Perizinan <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Koperasi", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Koperasi & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BRANDING & DOKUMEN", isBoxed: true, items: [
          { text: "Company Profile Digital Koperasi", checked: true },
          { text: "Desain Logo & Identitas Usaha", checked: true },
          { text: "Draft Lengkap AD/ART & Rencana Strategis", checked: true },
        ]},
        { title: "BONUS & EXTRA", isBoxed: true, items: [
          { text: "Logam Mulia Emas 24K", boldText: "2 Buah", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 500.000</strong>", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah Rapat Anggota & penandatanganan akta." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN KOPERASI",
  stepsTitle: "Berikut langkah untuk pembuatan koperasi secara rinci.",
  stepsSubtitle:
    "Estimasi 14–30 hari kerja bila tidak ada kendala kekurangan persyaratan.",
  steps: [
    { no: "01", title: "Pesan Nama ke AHU", duration: "", desc: "Lama waktu verifikasi bergantung pada pihak AHU.", points: [] },
    { no: "02", title: "Draft Akta", duration: "", desc: "Lengkapi persyaratan supaya tidak ada revisi karena akan berpengaruh terhadap waktu persetujuan.", points: [] },
    { no: "03", title: "Finalisasi Akta dan SKNIK", duration: "", desc: "Finalisasi akta pendirian dan penerbitan SKNIK.", points: [] },
    { no: "04", title: "NPWP & NIB", duration: "", desc: "Pendaftaran NPWP koperasi dan perizinan dasar.", points: [] },
    { no: "05", title: "Penyerahan Dokumen", duration: "", desc: "Dokumen diserahkan kepada pengurus koperasi.", points: [] },
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PENDIRIAN KOPERASI</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan seputar pendirian Koperasi.",
  faqs: [
    {
      q: "Apa saja syarat utama untuk mendirikan Koperasi?",
      a: "Syarat utamanya meliputi jumlah pendiri sesuai jenis koperasi, akta pendirian yang memuat Anggaran Dasar, berita acara rapat pembentukan, dan bukti setoran modal awal sesuai regulasi Kementerian Koperasi dan UKM.",
    },
    {
      q: "Berapa jumlah minimal anggota pendiri Koperasi Primer saat ini?",
      a: "Berdasarkan ketentuan UU Cipta Kerja terbaru, pembentukan Koperasi Primer cukup didirikan oleh minimal 9 (sembilan) orang WNI.",
    },
    {
      q: "Apa saja jenis-jenis koperasi yang bisa didirikan?",
      a: "Koperasi Konsumen, Koperasi Produsen, Koperasi Jasa, Koperasi Simpan Pinjam, dan Koperasi Pemasaran.",
    },
    {
      q: "Berapa lama waktu yang dibutuhkan hingga SK Kemenkumham Koperasi terbit?",
      a: "Estimasi waktu pengurusan koperasi berkisar antara 14–30 hari kerja setelah rapat penyuluhan dan penandatanganan akta notaris NPAK.",
    },
  ],

  ctaTitle: "Siap dirikan",
  ctaHighlight: "Koperasi Anda?",
  ctaDescription: "Konsultasi gratis untuk mendirikan koperasi — tanpa komitmen.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian Koperasi.",
};

export const contentMap: Record<string, BadanUsahaContent> = {
  "pt": dataPT,
  "cv": dataCV,
  "pt-pma": dataPMA,
  "pt-perorangan": dataPTPerorangan,
  "firma": dataFirma,
  "yayasan": dataYayasan,
  "perkumpulan": dataPerkumpulan,
  "koperasi": dataKoperasi,
};
