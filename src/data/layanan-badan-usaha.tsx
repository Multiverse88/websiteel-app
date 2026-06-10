import React from "react";
import type { PricingPackage, FootnoteItem } from "@/components/Pricing";

export type TitleSegment =
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
  pricingTitle: string;
  pricingSubtitle: string;
  pricingPackages: PricingPackage[];
  pricingFootnotes: FootnoteItem[];

  // Steps
  stepsTag: string;
  stepsTitle: string;
  stepsSubtitle: string;
  steps: {
    no: string;
    title: string;
    duration: string;
    desc: string;
    points: string[];
  }[];

  // FAQ
  faqTitle: string;
  faqs: { q: string; a: string }[];
}

export const dataPT: BadanUsahaContent = {
  id: "pt",
  nama: "PT",
  namaFormal: "Perseroan Terbatas",

  heroBreadcrumbText: "Pendirian PT",
  heroBadge: "Pendirian PT",
  heroTitle: [
    { text: "Mulai bisnis Anda " },
    { break: true },
    { text: "dengan " },
    { text: "legalitas yang", highlight: true },
    { break: true },
    { text: "benar." },
  ],
  heroDescription:
    "PT, PT PMA, PT Perorangan, CV, Firma, Yayasan, sampai Koperasi — kami pandu Anda pilih struktur yang tepat & urus prosesnya sampai akta di tangan.",
  heroImage:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=800&h=800&q=80",
  heroImageAlt: "Penandatanganan akta pendirian badan usaha",
  heroStats: [
    { icon: "Clock", value: "7–14 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp2,99jt", label: "Harga transparan" },
    { icon: "Upload", value: "100% Online", label: "Upload paperless" },
  ],
  floatingBadges: [
    {
      icon: "Building",
      iconBg: "bg-red-50",
      iconColor: "text-[#990202]",
      title: "Akta PT diterbitkan",
      subtitle: "Selesai · 10 hari kerja",
      position: "-top-6 -left-2 sm:-left-6",
    },
    {
      icon: "ShieldCheck",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "SK Kemenkumham",
      subtitle: "Terdaftar resmi",
      position: "-bottom-6 -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN PT",
  pengertianTitle: "Apa itu Perseroan Terbatas (PT)?",
  pengertianIntro:
    "Sebelum mulai, kenali dulu badan hukum yang paling populer untuk bisnis serius di Indonesia.",
  pengertianImage:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?fit=crop&w=800&h=800&q=80",
  pengertianImageAlt: "Rapat tim membahas Perseroan Terbatas",
  hukumIcon: "FileText",
  hukumIconBg: "bg-red-50",
  hukumIconColor: "text-[#990202]",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 40 Tahun 2007 tentang Perseroan Terbatas",
  pengertianDetail: (
    <>
      <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
        <strong className="font-extrabold text-gray-900">Perseroan Terbatas (PT)</strong> adalah badan hukum yang merupakan persekutuan modal, didirikan berdasarkan perjanjian, melakukan kegiatan usaha dengan modal dasar yang seluruhnya terbagi dalam saham — sesuai dengan Undang-Undang No. 40 Tahun 2007.
      </p>
      <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
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
    "Harga sudah include semua biaya — notaris, AHU Kemenkumham, NPWP, dan jasa kami. Tidak ada tambahan biaya apapun di tengah proses.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 2.999.000",
      strikePrice: "Rp 6.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pembuatan%20PT.",
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
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pembuatan%20PT.",
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
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pembuatan%20PT.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
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
  stepsTitle: "7 langkah pembuatan PT, semua kami pandu.",
  stepsSubtitle:
    "Dari konsultasi awal sampai dokumen lengkap di tangan Anda — total estimasi 7–14 hari kerja, semua transparan di dashboard.",
  steps: [
    { no: "01", title: "Konsultasi & Perencanaan", duration: "1 HARI KERJA", desc: "Konsultasi gratis dengan tim legal kami untuk menentukan struktur bisnis yang sesuai dengan visi & rencana Anda.", points: ["Identifikasi visi, modal awal & rencana bisnis", "Pemilihan struktur saham & pemegang", "Penentuan KBLI (Klasifikasi Lapangan Usaha)"] },
    { no: "02", title: "Cek & Pemesanan Nama PT", duration: "1 HARI KERJA", desc: "Kami verifikasi nama PT yang Anda inginkan di database AHU Kemenkumham, lalu pesan secara resmi.", points: ["Pengecekan ketersediaan nama di AHU", "Pemesanan nama resmi (berlaku 60 hari)", "Konfirmasi nama final & alternatif jika ditolak"] },
    { no: "03", title: "Persiapan Dokumen Pendiri", duration: "1-2 HARI KERJA", desc: "Pengumpulan dokumen pendukung dari semua pendiri & pengurus. Bisa di-upload via portal aman kami.", points: ["KTP & NPWP semua pendiri, komisaris, direksi", "Pas foto, alamat domisili, rincian modal", "Review & validasi oleh tim legal kami"] },
    { no: "04", title: "Penyusunan Akta Pendirian", duration: "2 HARI KERJA", desc: "Notaris menyusun & menandatangani akta pendirian — bisa via e-Notary (tanpa harus datang).", points: ["Drafting akta oleh notaris partner", "Penandatanganan akta (tatap muka atau e-Notary)", "Penyerahan Minuta Akta resmi"] },
    { no: "05", title: "Pengesahan SK Kemenkumham", duration: "1-2 HARI KERJA", desc: "Akta pendirian disahkan menjadi badan hukum resmi oleh Kementerian Hukum & HAM.", points: ["Pengajuan ke AHU Online", "Verifikasi otomatis sistem AHU", "Penerbitan SK Pengesahan Badan Hukum"] },
    { no: "06", title: "NPWP Badan & SKT Pajak", duration: "1-2 HARI KERJA", desc: "Registrasi PT sebagai wajib pajak badan ke Direktorat Jenderal Pajak (DJP).", points: ["Pendaftaran NPWP perusahaan via Coretax", "Penerbitan Surat Keterangan Terdaftar (SKT)", "Aktivasi akun pajak online perusahaan"] },
    { no: "07", title: "NIB & Akun OSS RBA", duration: "1-2 HARI KERJA", desc: "Aktivasi izin berusaha berbasis risiko (RBA) di sistem OSS — PT siap beroperasi penuh!", points: ["Pendaftaran akun OSS RBA", "Penerbitan Nomor Induk Berusaha (NIB)", "Penyerahan semua dokumen ke alamat Anda"] },
  ],

  faqTitle: "Pertanyaan seputar pendirian PT.",
  faqs: [
    { q: "Mana yang lebih cocok: PT, CV, atau PT Perorangan?", a: "Tergantung skala bisnis. PT Perorangan cocok untuk solopreneur/UMKM mikro (1 pendiri, modal kecil). CV cocok untuk usaha kecil-menengah dengan 2 sekutu, tanpa modal minimum. PT cocok kalau bisnis Anda serius, butuh kredibilitas tinggi, atau ingin ikut tender — modal min. Rp25jt disetor, liability terpisah dari pribadi." },
    { q: "Berapa lama proses pendirian PT?", a: "Proses lengkap pendirian PT all-in berkisar antara 7 hingga 14 hari kerja. Hal ini bergantung pada kecepatan penandatanganan akta oleh notaris partner dan tidak adanya kendala teknis pada sistem AHU Kemenkumham." },
    { q: "Apakah harga sudah termasuk biaya notaris & pemerintah?", a: "Ya, semua paket harga EasyLegal bersifat all-in. Sudah mencakup jasa notaris partner, biaya resmi PNBP/AHU Kemenkumham, pendaftaran NPWP perusahaan, dan seluruh proses pendaftaran izin di sistem OSS RBA hingga dokumen terbit." },
    { q: "Bisa pakai alamat rumah sebagai domisili PT?", a: "Berdasarkan regulasi zonasi daerah (terutama di kota besar seperti Jakarta), alamat rumah tinggal umumnya tidak diperkenankan untuk domisili PT biasa. Namun, Anda dapat menggunakan layanan Virtual Office kami sebagai solusi alamat kantor legal yang sah dan hemat biaya." },
    { q: "Apakah saya harus datang ke notaris secara fisik?", a: "Tidak wajib. Penandatanganan akta pendirian dapat dilakukan secara tatap muka dengan notaris partner kami atau dilakukan secara elektronik (e-Notary) dengan verifikasi aman, sehingga Anda dapat menyelesaikan proses ini dari mana saja secara online." },
    { q: "Bagaimana kalau nama PT yang saya inginkan sudah dipakai?", a: "Sebelum melakukan pemesanan nama resmi di sistem AHU Kemenkumham, tim EasyLegal akan melakukan pengecekan ketersediaan nama secara gratis. Jika nama yang Anda inginkan sudah dipakai atau terlalu mirip dengan PT lain, kami akan menyarankan alternatif nama terbaik." },
    { q: "Kalau pendiri saya WNA, bisa pakai PT biasa?", a: "Jika salah satu pendiri atau pemegang saham adalah Warga Negara Asing (WNA) atau perusahaan asing, maka jenis badan usahanya wajib berbentuk PT PMA (Penanaman Modal Asing) yang tunduk pada aturan modal dasar minimal Rp10 Miliar." },
  ],
};

export const dataCV: BadanUsahaContent = {
  id: "cv",
  nama: "CV",
  namaFormal: "Commanditaire Vennootschap",

  heroBreadcrumbText: "Pendirian CV",
  heroBadge: "Pendirian CV",
  heroTitle: [
    { text: "Wujudkan usaha Anda " },
    { break: true },
    { text: "dengan " },
    { text: "badan usaha CV", highlight: true },
    { break: true },
    { text: "yang fleksibel." },
  ],
  heroDescription:
    "CV adalah pilihan tepat untuk usaha kecil-menengah yang ingin struktur jelas tanpa kompleksitas PT. Proses cepat, biaya terjangkau, dan cocok untuk bisnis keluarga.",
  heroImage:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?fit=crop&w=800&h=800&q=80",
  heroImageAlt: "Tim kecil mendirikan CV",
  heroStats: [
    { icon: "Clock", value: "3–7 hari", label: "SLA kerja" },
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
      position: "-bottom-6 -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN CV",
  pengertianTitle: "Apa itu Commanditaire Vennootschap (CV)?",
  pengertianIntro:
    "Pahami dulu bentuk usaha tradisional yang masih relevan untuk UKM Indonesia.",
  pengertianImage:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?fit=crop&w=800&h=800&q=80",
  pengertianImageAlt: "Diskusi pendirian CV",
  hukumIcon: "FileText",
  hukumIconBg: "bg-blue-50",
  hukumIconColor: "text-blue-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "Kitab Undang-Undang Hukum Dagang (KUHD) & UU No. 3 Tahun 1982",
  pengertianDetail: (
    <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Commanditaire Vennootschap (CV)</strong> adalah bentuk badan usaha yang didirikan oleh dua orang atau lebih dengan dua jenis sekutu: <strong className="font-extrabold text-gray-900">Sekutu Aktif</strong> yang menjalankan perusahaan dan bertanggung jawab penuh, serta <strong className="font-extrabold text-gray-900">Sekutu Pasif/Komanditer</strong> yang hanya menyetor modal dan bertanggung jawab sebatas modal yang disetorkan. CV tidak berstatus badan hukum seperti PT, namun tetap memiliki legalitas yang diakui untuk berbagai keperluan bisnis.
    </p>
  ),
  karakteristik: [
    { bold: "Dua jenis sekutu", text: " — Sekutu Aktif (pengelola) dan Sekutu Pasif (investor) dengan tanggung jawab berbeda." },
    { bold: "Tanpa modal minimum", text: " — fleksibel dalam penentuan modal, sesuai kesepakatan para pendiri." },
    { bold: "Proses pendirian sederhana", text: " — cukup akta notaris dan pendaftaran ke Pengadilan Negeri setempat." },
    { bold: "Cocok untuk UKM", text: " — struktur sederhana, cocok untuk bisnis keluarga atau skala kecil-menengah." },
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
  pricingTitle: "Pilih paket pendirian CV sesuai kebutuhan.",
  pricingSubtitle:
    "Harga sudah include semua biaya — notaris, pendaftaran Pengadilan Negeri, NPWP, dan jasa kami. Tanpa biaya tersembunyi.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 1.999.000",
      strikePrice: "Rp 4.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pembuatan%20CV.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>1–2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & SKT <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Nama CV", checked: true },
          { text: "Penyusunan Anggaran Dasar", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "Surat Keterangan Terdaftar Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: false },
          { text: "Sertifikat Standar", checked: false },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
          { text: "Gratis Ongkir Pulau Jawa", checked: false },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 3.499.000",
      strikePrice: "Rp 6.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pembuatan%20CV.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>1–2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Nama CV", checked: true },
          { text: "Penyusunan Anggaran Dasar", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "Surat Keterangan Terdaftar Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 100.000</strong>", checked: true },
          { text: "Gratis Ongkir Pulau Jawa", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 4.999.000",
      strikePrice: "Rp 9.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pembuatan%20CV.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Dokumen Lainnya <strong>3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Nama CV", checked: true },
          { text: "Penyusunan Anggaran Dasar", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris", checked: true },
          { text: "Surat Keterangan Terdaftar Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "SKT Pajak & NPWP Badan", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 200.000</strong>", checked: true },
          { text: "Gratis Ongkir Seluruh Indonesia", checked: true },
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
  stepsTitle: "5 langkah mudah pendirian CV.",
  stepsSubtitle:
    "Dari konsultasi sampai dokumen resmi di tangan — estimasi 3–7 hari kerja.",
  steps: [
    { no: "01", title: "Konsultasi & Persiapan", duration: "1 HARI KERJA", desc: "Konsultasi gratis untuk menentukan struktur CV, jenis usaha, dan dokumen yang diperlukan.", points: ["Diskusi tujuan bisnis & struktur CV", "Penentuan Sekutu Aktif & Pasif", "Persiapan dokumen para pihak"] },
    { no: "02", title: "Pembuatan Akta Notaris", duration: "1-2 HARI KERJA", desc: "Notaris menyusun akta pendirian CV yang memuat anggaran dasar dan kesepakatan para pihak.", points: ["Drafting akta pendirian CV", "Penandatanganan akta oleh para pihak", "Pengesahan akta oleh notaris"] },
    { no: "03", title: "Pendaftaran ke Pengadilan Negeri", duration: "1-2 HARI KERJA", desc: "Akta didaftarkan ke Pengadilan Negeri setempat untuk mendapatkan Surat Keterangan Terdaftar.", points: ["Pengajuan dokumen ke Pengadilan Negeri", "Verifikasi & pengesahan", "Penerbitan Surat Keterangan Terdaftar"] },
    { no: "04", title: "NPWP & SKT Pajak", duration: "1-2 HARI KERJA", desc: "Registrasi CV sebagai wajib pajak badan ke DJP.", points: ["Pendaftaran NPWP badan", "Penerbitan SKT Pajak", "Aktivasi akun pajak"] },
    { no: "05", title: "NIB & Perizinan OSS", duration: "1-2 HARI KERJA", desc: "Penerbitan NIB dan akses OSS RBA untuk perizinan berusaha.", points: ["Pendaftaran akun OSS RBA", "Penerbitan NIB & SPPL", "Penyerahan dokumen lengkap"] },
  ],

  faqTitle: "Pertanyaan seputar pendirian CV.",
  faqs: [
    { q: "Apa perbedaan Sekutu Aktif dan Sekutu Pasif di CV?", a: "Sekutu Aktif adalah pihak yang menjalankan & mengelola perusahaan serta bertanggung jawab penuh (tak terbatas). Sekutu Pasif/Komanditer hanya menyetor modal dan bertanggung jawab sebatas modal yang disetorkan — tidak terlibat dalam pengelolaan sehari-hari." },
    { q: "Apakah CV berstatus badan hukum?", a: "Tidak. CV bukan badan hukum seperti PT. CV adalah badan usaha yang didaftarkan ke Pengadilan Negeri. Meskipun bukan badan hukum, CV tetap memiliki legalitas resmi untuk berbagai keperluan bisnis, termasuk pembukaan rekening bank atas nama CV." },
    { q: "Berapa modal minimum untuk mendirikan CV?", a: "Tidak ada ketentuan modal minimum untuk CV. Modal ditentukan berdasarkan kesepakatan para pendiri dan disesuaikan dengan kebutuhan usaha. Ini yang membuat CV sangat fleksibel untuk UKM." },
    { q: "Berapa jumlah pendiri minimal CV?", a: "CV minimal didirikan oleh 2 orang — satu sebagai Sekutu Aktif dan satu sebagai Sekutu Pasif. Jika hanya ada 1 orang, disarankan memilih PT Perorangan." },
    { q: "Apakah CV bisa diubah menjadi PT?", a: "Ya, CV dapat diubah menjadi PT melalui proses perubahan badan hukum. Kami dapat membantu Anda melakukan perubahan bentuk badan usaha sesuai perkembangan bisnis." },
  ],
};

export const dataPMA: BadanUsahaContent = {
  id: "pt-pma",
  nama: "PT PMA",
  namaFormal: "Penanaman Modal Asing",

  heroBreadcrumbText: "Pendirian PT PMA",
  heroBadge: "Pendirian PT PMA",
  heroTitle: [
    { text: "Ekspansi bisnis Anda " },
    { break: true },
    { text: "ke Indonesia " },
    { text: "dengan PT PMA", highlight: true },
    { break: true },
    { text: "yang sesuai regulasi." },
  ],
  heroDescription:
    "PT PMA adalah badan hukum untuk perusahaan dengan pemodal asing. Kami pandu seluruh proses — dari perizinan BKPM sampai akta pendirian — sesuai aturan investasi Indonesia.",
  heroImage:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?fit=crop&w=800&h=800&q=80",
  heroImageAlt: "Rapat bisnis investasi asing",
  heroStats: [
    { icon: "Clock", value: "3–6 minggu", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp7,99jt", label: "Harga transparan" },
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
      position: "-bottom-6 -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN PT PMA",
  pengertianTitle: "Apa itu PT Penanaman Modal Asing (PT PMA)?",
  pengertianIntro:
    "Pahami kerangka hukum investasi asing di Indonesia sebelum memulai.",
  pengertianImage:
    "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?fit=crop&w=800&h=800&q=80",
  pengertianImageAlt: "Kantor representasi asing",
  hukumIcon: "FileText",
  hukumIconBg: "bg-indigo-50",
  hukumIconColor: "text-indigo-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 25 Tahun 2007 tentang Penanaman Modal & Peraturan BKPM",
  pengertianDetail: (
    <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">PT PMA (Penanaman Modal Asing)</strong> adalah Perseroan Terbatas yang didirikan berdasarkan hukum Indonesia dengan kepemilikan saham oleh Warga Negara Asing (WNA) dan/atau badan hukum asing. PT PMA diatur secara khusus oleh <strong className="font-extrabold text-gray-900">UU No. 25 Tahun 2007 tentang Penanaman Modal</strong> dan diawasi oleh BKPM (Badan Koordinasi Penanaman Modal). Modal dasar minimal Rp10 Miliar dengan setoran modal minimal Rp2,5 Miliar.
    </p>
  ),
  karakteristik: [
    { bold: "Modal minimal Rp10 Miliar", text: " — modal dasar dengan setoran minimum Rp2,5 Miliar sesuai aturan BKPM." },
    { bold: "Kepemilikan asing", text: " — saham dapat dimiliki WNA atau badan hukum asing, dengan batasan sesuai DNI." },
    { bold: "Izin BKPM wajib", text: " — seluruh proses investasi harus mendapatkan persetujuan dari BKPM." },
    { bold: "Bidang usaha terbatas", text: " — tidak semua bidang usaha terbuka untuk PMA, terdaftar di DNI (Daftar Negatif Investasi)." },
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
    "Harga sudah include konsultasi BKPM, pembuatan akta, pengurusan izin prinsip, NPWP, dan NIB.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 7.999.000",
      strikePrice: "Rp 15.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pendirian%20PT%20PMA.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Izin Prinsip BKPM <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Akta & SK Kemenkumham <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
          { text: "NPWP, NIB & Perizinan <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 3 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Konsultasi Kesesuaian Bidang Usaha (DNI)", checked: true },
          { text: "Penyusunan Rencana Investasi", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris & SK Kemenkumham", checked: true },
          { text: "Izin Prinsip BKPM", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "Sertifikat Standar & SPPL", checked: false },
          { text: "IMTA & KITAS (Izin Kerja Asing)", checked: false, footnoteIndex: 4 },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 12.999.000",
      strikePrice: "Rp 24.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pendirian%20PT%20PMA.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Izin Prinsip BKPM <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Akta & SK Kemenkumham <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
          { text: "NPWP, NIB & Perizinan <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 3 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Konsultasi Kesesuaian Bidang Usaha (DNI)", checked: true },
          { text: "Penyusunan Rencana Investasi", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris & SK Kemenkumham", checked: true },
          { text: "Izin Prinsip BKPM", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "Sertifikat Standar & SPPL", checked: true },
          { text: "IMTA & KITAS (Izin Kerja Asing)", checked: true, footnoteIndex: 4 },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Konsultasi Perpajakan Bulanan", checked: true },
          { text: "Dokumen SOP Perusahaan", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 16.999.000",
      strikePrice: "Rp 30.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pendirian%20PT%20PMA.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Izin Prinsip BKPM <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Akta & SK Kemenkumham <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
          { text: "NPWP, NIB & Perizinan <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 3 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Konsultasi Kesesuaian Bidang Usaha (DNI)", checked: true },
          { text: "Penyusunan Rencana Investasi", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris & SK Kemenkumham", checked: true },
          { text: "Izin Prinsip BKPM", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "Sertifikat Standar & SPPL", checked: true },
          { text: "IMTA & KITAS (Izin Kerja Asing)", checked: true, footnoteIndex: 4 },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Konsultasi Perpajakan Bulanan", checked: true },
          { text: "Dokumen SOP Perusahaan", checked: true },
          { text: "Konsultasi Notaris Prioritas", checked: true },
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
  stepsTitle: "6 langkah pendirian PT PMA.",
  stepsSubtitle:
    "Dari konsultasi BKPM sampai dokumen lengkap — estimasi 4–8 minggu, semua kami urus.",
  steps: [
    { no: "01", title: "Konsultasi & Kesesuaian DNI", duration: "1-2 HARI KERJA", desc: "Tim kami review bidang usaha Anda terhadap Daftar Negatif Investasi (DNI) & sampaikan rekomendasi.", points: ["Review bidang usaha terhadap DNI", "Penentuan struktur modal & saham", "Persiapan dokumen investor asing"] },
    { no: "02", title: "Izin Prinsip BKPM", duration: "5-7 HARI KERJA", desc: "Pengajuan Izin Prinsip Penanaman Modal ke BKPM melalui sistem OSS-RBA.", points: ["Pendaftaran akun investor OSS", "Pengajuan Izin Prinsip BKPM", "Penerbitan Izin Prinsip"] },
    { no: "03", title: "Pembuatan Akta Notaris", duration: "2-3 HARI KERJA", desc: "Notaris menyusun akta pendirian PT PMA sesuai Izin Prinsip BKPM.", points: ["Drafting akta pendirian PT PMA", "Penandatanganan akta oleh para pihak", "Pengesahan akta oleh notaris"] },
    { no: "04", title: "SK Kemenkumham", duration: "1-2 HARI KERJA", desc: "Pengesahan badan hukum PT PMA oleh Kementerian Hukum & HAM.", points: ["Pengajuan SK Kemenkumham via AHU", "Verifikasi dokumen", "Penerbitan SK Pengesahan"] },
    { no: "05", title: "NPWP & NIB", duration: "3-5 HARI KERJA", desc: "Pendaftaran NPWP badan dan penerbitan NIB melalui OSS RBA.", points: ["Pendaftaran NPWP & SKT Pajak", "Penerbitan NIB & SPPL", "Aktivasi akun OSS RBA"] },
    { no: "06", title: "IMTA & KITAS (Opsional)", duration: "7-14 HARI KERJA", desc: "Pengurusan izin kerja bagi tenaga kerja asing (TKA) jika diperlukan.", points: ["Pengajuan RPTKA ke Kemenaker", "Proses IMTA & KITAS", "Penyerahan semua dokumen"] },
  ],

  faqTitle: "Pertanyaan seputar pendirian PT PMA.",
  faqs: [
    { q: "Berapa modal minimal PT PMA?", a: "Modal dasar minimal PT PMA adalah Rp10 Miliar dengan modal ditempatkan dan disetor minimal Rp2,5 Miliar. Ketentuan ini diatur dalam Peraturan BKPM." },
    { q: "Apakah semua bidang usaha bisa didirikan PT PMA?", a: "Tidak. Beberapa bidang usaha tertutup untuk PMA (sebagaimana diatur dalam DNI). Beberapa lainnya terbuka dengan persyaratan tertentu. Tim kami akan melakukan pengecekan kesesuaian bidang usaha Anda sebelum proses." },
    { q: "Berapa lama proses pendirian PT PMA?", a: "Proses lengkap pendirian PT PMA berkisar antara 4–8 minggu, tergantung kompleksitas bidang usaha dan kelengkapan dokumen investor asing." },
    { q: "Apakah WNA bisa menjadi Direksi atau Komisaris?", a: "Ya, WNA dapat menjabat sebagai Direksi atau Komisaris PT PMA. Namun, untuk Direksi wajib memiliki IMTA dan KITAS yang masih berlaku." },
    { q: "Apa perbedaan PT PMA dengan PT biasa?", a: "PT PMA diperuntukkan bagi perusahaan dengan kepemilikan asing, memiliki modal minimal lebih besar (Rp10 Miliar), harus mendapatkan Izin Prinsip BKPM, dan tunduk pada peraturan investasi asing yang lebih ketat." },
  ],
};

export const dataPTPerorangan: BadanUsahaContent = {
  id: "pt-perorangan",
  nama: "PT Perorangan",
  namaFormal: "Perseroan Perorangan",

  heroBreadcrumbText: "Pendirian PT Perorangan",
  heroBadge: "Pendirian PT Perorangan",
  heroTitle: [
    { text: "Bisnis sendiri tanpa ribet? " },
    { break: true },
    { text: "Pilih " },
    { text: "PT Perorangan", highlight: true },
    { break: true },
    { text: "solusi legal UMKM." },
  ],
  heroDescription:
    "PT Perorangan adalah badan hukum untuk 1 pendiri — proses mudah, modal kecil, dan legalitas penuh. Cocok untuk solopreneur & UMKM yang ingin naik kelas.",
  heroImage:
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=800&h=800&q=80",
  heroImageAlt: "Pengusaha individu mengembangkan bisnis",
  heroStats: [
    { icon: "Clock", value: "3–7 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp1,49jt", label: "Harga transparan" },
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
      position: "-bottom-6 -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN PT PERORANGAN",
  pengertianTitle: "Apa itu Perseroan Perorangan?",
  pengertianIntro:
    "Solusi badan hukum modern untuk pelaku UMKM yang ingin legal tanpa kompleksitas PT biasa.",
  pengertianImage:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fit=crop&w=800&h=800&q=80",
  pengertianImageAlt: "Wirausaha individu",
  hukumIcon: "FileText",
  hukumIconBg: "bg-emerald-50",
  hukumIconColor: "text-emerald-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 6 Tahun 2023 (Cipta Kerja) & PP No. 8 Tahun 2021",
  pengertianDetail: (
    <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Perseroan Perorangan</strong> adalah PT yang didirikan oleh satu orang Warga Negara Indonesia (WNI) sebagai pemegang saham tunggal sekaligus direktur. Diperkenalkan melalui <strong className="font-extrabold text-gray-900">UU Cipta Kerja</strong>, PT Perorangan dirancang khusus untuk UMKM dan usaha mikro dengan persyaratan yang jauh lebih sederhana dibanding PT biasa — tanpa keharusan akta notaris dan tanpa modal minimum.
    </p>
  ),
  karakteristik: [
    { bold: "Satu pendiri", text: " — cukup satu orang WNI, merangkap sebagai pemegang saham & direktur." },
    { bold: "Tanpa akta notaris", text: " — pendirian cukup melalui pernyataan pendirian secara elektronik via SABH." },
    { bold: "Tanpa modal minimum", text: " — sesuai kemampuan usaha mikro & kecil." },
    { bold: "Untuk UMKM", text: " — khusus untuk usaha mikro & kecil sesuai kriteria UU Cipta Kerja." },
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
    "Harga sudah include pembuatan pernyataan pendirian, SK Kemenkumham, NPWP, dan NIB.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 1.499.000",
      strikePrice: "Rp 3.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pendirian%20PT%20Perorangan.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Pendirian Online <strong>1–2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & NIB <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Ketersediaan Nama", checked: true },
          { text: "Penyusunan Data Pendiri", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Surat Pernyataan Pendirian Elektronik (SABH)", checked: true },
          { text: "SK Pengesahan Badan Hukum Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 2.499.000",
      strikePrice: "Rp 5.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pendirian%20PT%20Perorangan.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Pendirian Online <strong>1–2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & NIB <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Ketersediaan Nama", checked: true },
          { text: "Penyusunan Data Pendiri", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Surat Pernyataan Pendirian Elektronik (SABH)", checked: true },
          { text: "SK Pengesahan Badan Hukum Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 3.999.000",
      strikePrice: "Rp 7.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pendirian%20PT%20Perorangan.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Pendirian Online <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & NIB <strong>1–2 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "FASILITAS", items: [
          { text: "Pengecekan Ketersediaan Nama", checked: true },
          { text: "Penyusunan Data Pendiri", checked: true },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Surat Pernyataan Pendirian Elektronik (SABH)", checked: true },
          { text: "SK Pengesahan Badan Hukum Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
          { text: "SPPL & Sertifikat Standar", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 100.000</strong>", checked: true },
          { text: "Prioritas Proses", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah data pendiri lengkap & disetujui sistem SABH." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN PT PERORANGAN",
  stepsTitle: "4 langkah mudah PT Perorangan.",
  stepsSubtitle:
    "Daftar online, tanpa notaris, tanpa ribet — estimasi 3–7 hari kerja.",
  steps: [
    { no: "01", title: "Persiapan Data Diri", duration: "1 HARI KERJA", desc: "Siapkan data kependudukan Anda untuk pendaftaran — KTP, NPWP, dan bidang usaha.", points: ["Siapkan KTP & NPWP pribadi", "Tentukan bidang usaha (KBLI)", "Siapkan alamat domisili usaha"] },
    { no: "02", title: "Pendaftaran via SABH", duration: "1-2 HARI KERJA", desc: "Pembuatan akun & pengisian pernyataan pendirian elektronik melalui sistem SABH Kemenkumham.", points: ["Pendaftaran akun SABH", "Pengisian pernyataan pendirian", "Pengecekan & validasi nama PT"] },
    { no: "03", title: "SK Kemenkumham", duration: "1 HARI KERJA", desc: "Pengesahan PT Perorangan sebagai badan hukum resmi.", points: ["Verifikasi otomatis sistem", "Penerbitan SK Pengesahan", "Unduh sertifikat elektronik"] },
    { no: "04", title: "NPWP & NIB", duration: "2-3 HARI KERJA", desc: "Pendaftaran NPWP badan dan penerbitan NIB untuk perizinan berusaha.", points: ["Pendaftaran NPWP via Coretax", "Penerbitan NIB & SPPL", "Semua dokumen siap digunakan"] },
  ],

  faqTitle: "Pertanyaan seputar PT Perorangan.",
  faqs: [
    { q: "Apa beda PT Perorangan dengan PT biasa?", a: "PT Perorangan didirikan oleh 1 orang (tanpa notaris, via online), tidak punya modal minimum, dan khusus untuk UMKM. PT biasa memerlukan minimal 2 pendiri, akta notaris, dan modal minimum Rp50 juta." },
    { q: "Apakah PT Perorangan bisa punya karyawan?", a: "Ya, PT Perorangan tetap bisa mempekerjakan karyawan. Status badan hukumnya memungkinkan untuk mendaftarkan BPJS Ketenagakerjaan & Kesehatan bagi karyawan." },
    { q: "Berapa modal untuk PT Perorangan?", a: "Tidak ada ketentuan modal minimum untuk PT Perorangan. Modal disesuaikan dengan kemampuan dan kebutuhan usaha Anda." },
    { q: "Apakah PT Perorangan bisa diubah jadi PT biasa?", a: "Ya, jika usaha Anda berkembang, PT Perorangan dapat ditingkatkan menjadi PT biasa dengan akta notaris dan tambahan pemegang saham." },
    { q: "Siapa yang bisa mendirikan PT Perorangan?", a: "Warga Negara Indonesia (WNI) yang memenuhi kriteria usaha mikro atau kecil sesuai UU Cipta Kerja." },
  ],
};

export const dataFirma: BadanUsahaContent = {
  id: "firma",
  nama: "Firma",
  namaFormal: "Firma (Fa)",

  heroBreadcrumbText: "Pendirian Firma",
  heroBadge: "Pendirian Firma",
  heroTitle: [
    { text: "Bisnis bersama rekan? " },
    { break: true },
    { text: "Pilih " },
    { text: "Firma sebagai", highlight: true },
    { break: true },
    { text: "badan usaha resmi." },
  ],
  heroDescription:
    "Firma adalah badan usaha yang didirikan oleh 2 orang atau lebih dengan tanggung jawab penuh bersama. Cocok untuk bisnis profesional & jasa yang mengutamakan kepercayaan.",
  heroImage:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?fit=crop&w=800&h=800&q=80",
  heroImageAlt: "Rekan bisnis mendirikan Firma",
  heroStats: [
    { icon: "Clock", value: "3–7 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp2,49jt", label: "Harga transparan" },
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
      position: "-bottom-6 -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN FIRMA",
  pengertianTitle: "Apa itu Firma (Fa)?",
  pengertianIntro:
    "Pahami badan usaha berbasis kepercayaan & kerja sama antar rekan.",
  pengertianImage:
    "https://images.unsplash.com/photo-1552581234-26160f608093?fit=crop&w=800&h=800&q=80",
  pengertianImageAlt: "Kerja sama tim Firma",
  hukumIcon: "FileText",
  hukumIconBg: "bg-orange-50",
  hukumIconColor: "text-orange-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "Kitab Undang-Undang Hukum Dagang (KUHD) Pasal 16–35",
  pengertianDetail: (
    <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Firma (Fa)</strong> adalah badan usaha yang didirikan oleh dua orang atau lebih dengan menggunakan nama bersama dalam satu ikatan perjanjian usaha. Setiap sekutu (partner) dalam Firma memiliki <strong className="font-extrabold text-gray-900">tanggung jawab penuh dan tidak terbatas (solidar)</strong> — artinya kewajiban perusahaan menjadi tanggung jawab pribadi seluruh sekutu secara bersama-sama. Firma diatur dalam KUHD dan memerlukan akta notaris serta pendaftaran ke Pengadilan Negeri.
    </p>
  ),
  karakteristik: [
    { bold: "Tanggung jawab solidar", text: " — semua sekutu bertanggung jawab penuh secara pribadi atas kewajiban Firma." },
    { bold: "Nama bersama", text: " — usaha dijalankan dengan satu nama yang menjadi identitas bersama." },
    { bold: "Akta notaris wajib", text: " — pendirian memerlukan akta notaris dan didaftarkan ke Pengadilan Negeri." },
    { bold: "Cocok untuk profesi", text: " — banyak digunakan oleh kantor hukum, akuntan, konsultan, dan jasa profesional." },
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
    "Harga sudah include akta notaris, pendaftaran Pengadilan Negeri, NPWP, dan NIB.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 2.499.000",
      strikePrice: "Rp 5.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pendirian%20Firma.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>1–2 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Pendaftaran PN & NPWP <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Firma", checked: true },
          { text: "Pendaftaran ke Pengadilan Negeri", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Badan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 3.999.000",
      strikePrice: "Rp 7.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pendirian%20Firma.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Pendaftaran PN & Perizinan <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
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
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 100.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 5.499.000",
      strikePrice: "Rp 10.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pendirian%20Firma.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
        </div>
      ),
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta Pendirian <strong>1 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "Pendaftaran PN & Perizinan <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
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
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 200.000</strong>", checked: true },
          { text: "Gratis Ongkir Seluruh Indonesia", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah penandatanganan akta oleh seluruh sekutu." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN FIRMA",
  stepsTitle: "5 langkah pendirian Firma.",
  stepsSubtitle:
    "Dari konsultasi sampai dokumen resmi — estimasi 3–7 hari kerja.",
  steps: [
    { no: "01", title: "Konsultasi & Perjanjian Sekutu", duration: "1 HARI KERJA", desc: "Diskusi dengan tim legal untuk menyusun perjanjian antar sekutu dan menentukan struktur Firma.", points: ["Diskusi peran & kontribusi setiap sekutu", "Penyusunan kesepakatan usaha", "Penentuan nama Firma"] },
    { no: "02", title: "Pembuatan Akta Notaris", duration: "1-2 HARI KERJA", desc: "Notaris menyusun akta pendirian Firma yang memuat anggaran dasar & kesepakatan para sekutu.", points: ["Drafting akta pendirian Firma", "Penandatanganan akta oleh para sekutu", "Pengesahan akta notaris"] },
    { no: "03", title: "Pendaftaran ke Pengadilan Negeri", duration: "1-2 HARI KERJA", desc: "Akta Firma didaftarkan ke Pengadilan Negeri setempat.", points: ["Pengajuan dokumen", "Verifikasi & pencatatan", "Penerbitan bukti pendaftaran"] },
    { no: "04", title: "NPWP Badan", duration: "1-2 HARI KERJA", desc: "Registrasi NPWP atas nama Firma ke DJP.", points: ["Pendaftaran NPWP badan", "Penerbitan SKT Pajak", "Aktivasi akun pajak"] },
    { no: "05", title: "NIB & Perizinan OSS", duration: "1-2 HARI KERJA", desc: "Penerbitan NIB dan izin usaha melalui OSS RBA.", points: ["Pendaftaran akun OSS RBA", "Penerbitan NIB & SPPL", "Penyerahan dokumen lengkap"] },
  ],

  faqTitle: "Pertanyaan seputar pendirian Firma.",
  faqs: [
    { q: "Apa perbedaan Firma dan CV?", a: "Di Firma, semua sekutu bertanggung jawab penuh (solidar). Di CV, ada Sekutu Aktif (tanggung jawab penuh) dan Sekutu Pasif (tanggung jawab terbatas sebatas modal). Firma lebih cocok untuk bisnis profesional berbasis kepercayaan." },
    { q: "Apakah Firma bisa punya lebih dari 2 pendiri?", a: "Ya, Firma bisa didirikan oleh 2 orang atau lebih. Semakin banyak sekutu, semakin besar modal dan kapasitas usaha." },
    { q: "Berapa modal untuk mendirikan Firma?", a: "Tidak ada ketentuan modal minimum untuk Firma. Modal ditentukan berdasarkan kesepakatan para sekutu dan kebutuhan usaha." },
    { q: "Apakah Firma berstatus badan hukum?", a: "Tidak. Firma bukan badan hukum, melainkan badan usaha yang terdaftar di Pengadilan Negeri. Namun tetap memiliki kekuatan hukum untuk menjalankan kegiatan usaha." },
  ],
};

export const dataYayasan: BadanUsahaContent = {
  id: "yayasan",
  nama: "Yayasan",
  namaFormal: "Yayasan",

  heroBreadcrumbText: "Pendirian Yayasan",
  heroBadge: "Pendirian Yayasan",
  heroTitle: [
    { text: "Wujudkan misi sosial " },
    { break: true },
    { text: "dengan " },
    { text: "yayasan yang", highlight: true },
    { break: true },
    { text: "legal & terpercaya." },
  ],
  heroDescription:
    "Yayasan adalah badan hukum nirlaba untuk bidang sosial, keagamaan, dan kemanusiaan. Kami pandu pendiriannya dari akta notaris sampai SK Kemenkumham.",
  heroImage:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?fit=crop&w=800&h=800&q=80",
  heroImageAlt: "Kegiatan sosial yayasan",
  heroStats: [
    { icon: "Clock", value: "7–14 hari", label: "SLA kerja" },
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
      position: "-bottom-6 -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN YAYASAN",
  pengertianTitle: "Apa itu Yayasan?",
  pengertianIntro:
    "Pahami badan hukum nirlaba untuk tujuan sosial, kemanusiaan, dan keagamaan.",
  pengertianImage:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fit=crop&w=800&h=800&q=80",
  pengertianImageAlt: "Kegiatan yayasan sosial",
  hukumIcon: "FileText",
  hukumIconBg: "bg-pink-50",
  hukumIconColor: "text-pink-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 16 Tahun 2001 jo. UU No. 28 Tahun 2004 tentang Yayasan",
  pengertianDetail: (
    <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Yayasan</strong> adalah badan hukum yang terdiri atas kekayaan yang dipisahkan dan diperuntukkan untuk mencapai tujuan tertentu di bidang sosial, keagamaan, dan kemanusiaan — bukan untuk mencari keuntungan (nirlaba). Yayasan memiliki <strong className="font-extrabold text-gray-900">Pembina, Pengurus, dan Pengawas</strong> sebagai organ-organ yayasan. Diatur dalam UU No. 16 Tahun 2001 jo. UU No. 28 Tahun 2004, yayasan wajib memiliki akta notaris dan mendapatkan pengesahan dari Kemenkumham.
    </p>
  ),
  karakteristik: [
    { bold: "Nirlaba", text: " — tujuan utama bukan mencari keuntungan, melainkan sosial/kemanusiaan." },
    { bold: "Tiga organ", text: " — Pembina, Pengurus, dan Pengawas dengan tugas & wewenang masing-masing." },
    { bold: "Kekayaan dipisahkan", text: " — harta yayasan terpisah dari kekayaan pribadi pendiri/pengurus." },
    { bold: "Badan hukum", text: " — disahkan oleh Kemenkumham, setara dengan PT dalam status badan hukum." },
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
    "Harga sudah include akta notaris, SK Kemenkumham, NPWP, dan NIB Yayasan.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 2.999.000",
      strikePrice: "Rp 6.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pendirian%20Yayasan.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>2–5 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & NIB <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Yayasan", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Yayasan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS RBA", checked: true },
        ]},
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 50.000</strong>", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 4.999.000",
      strikePrice: "Rp 9.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pendirian%20Yayasan.",
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
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 100.000</strong>", checked: true },
          { text: "Draft Anggaran Dasar & ART", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 6.999.000",
      strikePrice: "Rp 12.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pendirian%20Yayasan.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
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
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Voucher EasyLegal <strong>Rp 250.000</strong>", checked: true },
          { text: "Draft Anggaran Dasar & ART", checked: true },
          { text: "Konsultasi Perpajakan Nirlaba", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah penandatanganan akta & kelengkapan dokumen pendiri." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN YAYASAN",
  stepsTitle: "6 langkah pendirian Yayasan.",
  stepsSubtitle:
    "Dari konsultasi sampai SK Kemenkumham — estimasi 7–14 hari kerja.",
  steps: [
    { no: "01", title: "Konsultasi & Persiapan", duration: "1 HARI KERJA", desc: "Konsultasi gratis untuk menentukan tujuan yayasan, struktur organ, dan program kerja.", points: ["Penentuan visi & misi yayasan", "Identifikasi program sosial", "Persiapan data Pembina, Pengurus, Pengawas"] },
    { no: "02", title: "Pembuatan Akta Notaris", duration: "2-3 HARI KERJA", desc: "Notaris menyusun akta pendirian yayasan yang memuat Anggaran Dasar & susunan organ.", points: ["Drafting akta pendirian yayasan", "Penandatanganan akta oleh Pembina & Pengurus", "Pengesahan akta notaris"] },
    { no: "03", title: "SK Pengesahan Kemenkumham", duration: "3-5 HARI KERJA", desc: "Pengajuan pengesahan yayasan sebagai badan hukum ke Kemenkumham.", points: ["Pengajuan via AHU Online", "Verifikasi dokumen", "Penerbitan SK Pengesahan"] },
    { no: "04", title: "NPWP Yayasan", duration: "1-2 HARI KERJA", desc: "Pendaftaran NPWP atas nama yayasan ke DJP.", points: ["Pendaftaran NPWP yayasan", "Penerbitan SKT Pajak", "Aktivasi akun pajak"] },
    { no: "05", title: "NIB & Perizinan OSS", duration: "1-2 HARI KERJA", desc: "Penerbitan NIB dan akses OSS RBA untuk kegiatan operasional.", points: ["Pendaftaran akun OSS", "Penerbitan NIB"] },
    { no: "06", title: "Penyerahan Dokumen", duration: "1 HARI KERJA", desc: "Penyerahan semua dokumen resmi yayasan ke alamat Anda.", points: ["Paket dokumen lengkap", "Saran operasional yayasan"] },
  ],

  faqTitle: "Pertanyaan seputar pendirian Yayasan.",
  faqs: [
    { q: "Apa perbedaan Yayasan dengan PT?", a: "Yayasan adalah badan hukum nirlaba untuk tujuan sosial/keagamaan/kemanusiaan — tidak mencari untung. PT adalah badan hukum komersial untuk mencari keuntungan bagi pemegang saham." },
    { q: "Siapa saja organ Yayasan?", a: "Yayasan memiliki 3 organ wajib: Pembina (menetapkan kebijakan), Pengurus (menjalankan yayasan), dan Pengawas (mengawasi pengurus)." },
    { q: "Apakah Yayasan bisa melakukan kegiatan komersial?", a: "Yayasan dapat melakukan kegiatan komersial sepanjang hasilnya digunakan untuk mencapai tujuan sosial yayasan, bukan dibagi kepada Pembina/Pengurus." },
    { q: "Berapa minimal pendiri Yayasan?", a: "Yayasan minimal didirikan oleh 1 orang sebagai Pembina, ditambah 1 Pengurus dan 1 Pengawas. Total minimal 3 orang untuk struktur lengkap." },
  ],
};

export const dataPerkumpulan: BadanUsahaContent = {
  id: "perkumpulan",
  nama: "Perkumpulan",
  namaFormal: "Perkumpulan",

  heroBreadcrumbText: "Pendirian Perkumpulan",
  heroBadge: "Pendirian Perkumpulan",
  heroTitle: [
    { text: "Wadah komunitas " },
    { break: true },
    { text: "dengan " },
    { text: "badan hukum", highlight: true },
    { break: true },
    { text: "perkumpulan resmi." },
  ],
  heroDescription:
    "Perkumpulan adalah badan hukum nirlaba berbasis keanggotaan untuk organisasi komunitas, profesi, dan advokasi. Proses pendirian mudah dan cepat.",
  heroImage:
    "https://images.unsplash.com/photo-1544027993-37dbfe43562a?fit=crop&w=800&h=800&q=80",
  heroImageAlt: "Komunitas perkumpulan",
  heroStats: [
    { icon: "Clock", value: "7–14 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp2,49jt", label: "Harga transparan" },
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
      position: "-bottom-6 -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN PERKUMPULAN",
  pengertianTitle: "Apa itu Perkumpulan?",
  pengertianIntro:
    "Pahami badan hukum berbasis keanggotaan untuk komunitas & organisasi sosial.",
  pengertianImage:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?fit=crop&w=800&h=800&q=80",
  pengertianImageAlt: "Anggota perkumpulan",
  hukumIcon: "FileText",
  hukumIconBg: "bg-teal-50",
  hukumIconColor: "text-teal-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 16 Tahun 2001 jo. UU No. 28 Tahun 2004 (sama dengan Yayasan) & Keputusan Menteri Hukum",
  pengertianDetail: (
    <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Perkumpulan</strong> adalah badan hukum nirlaba yang didirikan oleh sekelompok orang berdasarkan kesamaan profesi, hobi, atau tujuan sosial — dengan struktur organisasi berbasis keanggotaan. Berbeda dengan yayasan yang berbasis kekayaan, perkumpulan berbasis <strong className="font-extrabold text-gray-900">keanggotaan (membership)</strong>. Perkumpulan memiliki Rapat Anggota sebagai organ tertinggi, serta Pengurus dan Pengawas yang dipilih oleh anggota.
    </p>
  ),
  karakteristik: [
    { bold: "Berbasis anggota", text: " — organ tertinggi adalah Rapat Anggota, bukan Pembina." },
    { bold: "Nirlaba", text: " — tujuan sosial, profesi, atau hobi — bukan mencari keuntungan." },
    { bold: "Anggaran Dasar & ART", text: " — memiliki AD/ART yang disahkan dalam Rapat Anggota." },
    { bold: "Badan hukum opsional", text: " — bisa berbadan hukum (disahkan Kemenkumham) atau tidak." },
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
    "Harga sudah include akta notaris, pengesahan Kemenkumham, NPWP, dan NIB.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 2.499.000",
      strikePrice: "Rp 5.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pendirian%20Perkumpulan.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & Pengesahan <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & NIB <strong>2–3 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Perkumpulan", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Perkumpulan & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 3.999.000",
      strikePrice: "Rp 7.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pendirian%20Perkumpulan.",
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
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Draft AD/ART Lengkap", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 5.999.000",
      strikePrice: "Rp 10.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pendirian%20Perkumpulan.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
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
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Draft AD/ART Lengkap", checked: true },
          { text: "Konsultasi Organisasi 1 Bulan", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah penandatanganan akta oleh para pendiri." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN PERKUMPULAN",
  stepsTitle: "5 langkah pendirian Perkumpulan.",
  stepsSubtitle:
    "Dari konsultasi sampai badan hukum resmi — estimasi 7–14 hari kerja.",
  steps: [
    { no: "01", title: "Persiapan & Rapat Anggota", duration: "2 HARI KERJA", desc: "Persiapan visi, misi, dan penyelenggaraan Rapat Anggota untuk memilih pengurus.", points: ["Pembentukan panitia pendiri", "Penyusunan AD/ART awal", "Rapat anggota & pemilihan pengurus"] },
    { no: "02", title: "Pembuatan Akta Notaris", duration: "2-3 HARI KERJA", desc: "Notaris menyusun akta pendirian perkumpulan berdasarkan AD/ART.", points: ["Drafting akta pendirian", "Penandatanganan akta", "Pengesahan notaris"] },
    { no: "03", title: "Pengesahan Kemenkumham", duration: "3-5 HARI KERJA", desc: "Pengajuan pengesahan badan hukum ke Kemenkumham.", points: ["Pengajuan via AHU", "Verifikasi dokumen", "SK Pengesahan badan hukum"] },
    { no: "04", title: "NPWP & Perizinan", duration: "2-3 HARI KERJA", desc: "Pendaftaran NPWP dan perizinan dasar.", points: ["NPWP atas nama perkumpulan", "SKT Pajak", "NIB & OSS"] },
    { no: "05", title: "Penyerahan Dokumen", duration: "1 HARI KERJA", desc: "Penyerahan semua dokumen lengkap ke alamat Anda.", points: ["Paket dokumen resmi", "AD/ART final", "Panduan administrasi perkumpulan"] },
  ],

  faqTitle: "Pertanyaan seputar pendirian Perkumpulan.",
  faqs: [
    { q: "Apa perbedaan Perkumpulan dengan Yayasan?", a: "Perkumpulan berbasis keanggotaan dengan Rapat Anggota sebagai organ tertinggi. Yayasan berbasis kekayaan dengan Pembina sebagai organ tertinggi. Perkumpulan lebih demokratis, yayasan lebih hierarkis." },
    { q: "Siapa yang bisa mendirikan Perkumpulan?", a: "Perkumpulan dapat didirikan oleh minimal 3 orang WNI yang memiliki kesamaan profesi, hobi, atau tujuan sosial." },
    { q: "Apakah Perkumpulan bisa melakukan kegiatan komersial?", a: "Perkumpulan boleh melakukan kegiatan yang menghasilkan uang, namun hasilnya harus digunakan untuk tujuan organisasi, bukan dibagi ke anggota." },
    { q: "Apakah Perkumpulan wajib berbadan hukum?", a: "Tidak wajib. Perkumpulan dapat beroperasi tanpa badan hukum, namun status badan hukum memberikan kredibilitas dan kemudahan administrasi." },
  ],
};

export const dataKoperasi: BadanUsahaContent = {
  id: "koperasi",
  nama: "Koperasi",
  namaFormal: "Koperasi",

  heroBreadcrumbText: "Pendirian Koperasi",
  heroBadge: "Pendirian Koperasi",
  heroTitle: [
    { text: "Bangun ekonomi bersama " },
    { break: true },
    { text: "dengan " },
    { text: "koperasi yang", highlight: true },
    { break: true },
    { text: "sehat & legal." },
  ],
  heroDescription:
    "Koperasi adalah badan hukum yang mengutamakan kesejahteraan anggota berdasarkan prinsip gotong royong. Kami bantu pendiriannya dari akta sampai pengesahan.",
  heroImage:
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?fit=crop&w=800&h=800&q=80",
  heroImageAlt: "Rapat anggota koperasi",
  heroStats: [
    { icon: "Clock", value: "14–30 hari", label: "SLA kerja" },
    { icon: "DollarSign", value: "Mulai Rp3,49jt", label: "Harga transparan" },
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
      position: "-bottom-6 -right-2 sm:-right-4",
    },
  ],

  pengertianTag: "PENGERTIAN KOPERASI",
  pengertianTitle: "Apa itu Koperasi?",
  pengertianIntro:
    "Pahami badan hukum ekonomi kerakyatan yang mengutamakan kesejahteraan anggota.",
  pengertianImage:
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?fit=crop&w=800&h=800&q=80",
  pengertianImageAlt: "Anggota koperasi",
  hukumIcon: "FileText",
  hukumIconBg: "bg-green-50",
  hukumIconColor: "text-green-600",
  hukumTitle: "Dasar Hukum",
  hukumLaw: "UU No. 25 Tahun 1992 tentang Perkoperasian & PP No. 7 Tahun 2021",
  pengertianDetail: (
    <p className="text-[15px] text-gray-600 leading-relaxed font-normal">
      <strong className="font-extrabold text-gray-900">Koperasi</strong> adalah badan hukum yang beranggotakan orang-seorang atau badan hukum dengan melandaskan kegiatannya berdasarkan prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasarkan asas kekeluargaan. Koperasi bertujuan <strong className="font-extrabold text-gray-900">mensejahterakan anggota</strong> pada khususnya dan masyarakat pada umumnya. Koperasi memiliki Rapat Anggota sebagai kekuasaan tertinggi, serta Pengurus dan Pengawas yang dipilih oleh anggota.
    </p>
  ),
  karakteristik: [
    { bold: "Keanggotaan sukarela", text: " — anggota bergabung secara sukarela, tanpa paksaan." },
    { bold: "Satu anggota satu suara", text: " — setiap anggota punya hak suara yang sama, tidak tergantung jumlah simpanan." },
    { bold: "Pembagian SHU", text: " — Sisa Hasil Usaha dibagi berdasarkan jasa usaha & partisipasi anggota." },
    { bold: "Pendidikan anggota", text: " — koperasi wajib memberikan pendidikan perkoperasian kepada anggotanya." },
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
    "Harga sudah include akta notaris, pengesahan Kemenkumham, NPWP, dan NIB Koperasi.",
  pricingPackages: [
    {
      title: "PAKET BASIC",
      price: "Rp 3.499.000",
      strikePrice: "Rp 7.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Basic",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Basic%20Pendirian%20Koperasi.",
      groups: [
        { title: "LAMA PROSES", items: [
          { text: "Akta & SK Kemenkumham <strong>5–7 Hari Kerja</strong>", checked: true, footnoteIndex: 1 },
          { text: "NPWP & NIB <strong>3–5 Hari Kerja</strong>", checked: true, footnoteIndex: 2 },
        ]},
        { title: "DOKUMEN PENDIRIAN", items: [
          { text: "Akta Notaris Pendirian Koperasi", checked: true },
          { text: "SK Pengesahan Kemenkumham", checked: true },
        ]},
        { title: "DOKUMEN LAINNYA", items: [
          { text: "NPWP Koperasi & SKT Pajak", checked: true },
          { text: "NIB & Akun OSS", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET COMPLETE",
      price: "Rp 5.499.000",
      strikePrice: "Rp 10.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      isPopular: true,
      buttonText: "Pilih Paket Complete",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Complete%20Pendirian%20Koperasi.",
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
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Draft AD/ART & Rencana Kerja", checked: true },
        ]},
      ],
    },
    {
      title: "PAKET EXPRESS",
      price: "Rp 7.999.000",
      strikePrice: "Rp 14.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Paket Express",
      buttonLink: "https://wa.me/6281123456789?text=Halo%20EasyLegal,%20saya%20tertarik%20dengan%20Paket%20Express%20Pendirian%20Koperasi.",
      customHeaderOverlay: (
        <div className="absolute right-6 -bottom-6 bg-gradient-to-br from-[#E6B342] via-[#D4A017] to-[#996515] w-12 h-12 rounded-full flex flex-col items-center justify-center border-2 border-white shadow-md rotate-12 transition-transform hover:scale-105 duration-300 pointer-events-none z-20">
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase">FAST</span>
          <span className="text-[7.5px] font-black leading-none text-white tracking-widest uppercase mt-0.5">TRACK</span>
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
        { title: "BONUS", isBoxed: true, items: [
          { text: "Layanan Personal Legal Assistant", checked: true },
          { text: "Draft AD/ART & Rencana Kerja", checked: true },
          { text: "Konsultasi Perpajakan Koperasi 1 Bulan", checked: true },
        ]},
      ],
    },
  ],
  pricingFootnotes: [
    { text: "Setelah Rapat Anggota & penandatanganan akta." },
    { text: "Jika tidak terdapat kendala pada sistem Coretax & OSS." },
  ],

  stepsTag: "PROSES PEMBUATAN KOPERASI",
  stepsTitle: "6 langkah pendirian Koperasi.",
  stepsSubtitle:
    "Dari Rapat Anggota sampai SK Kemenkumham — estimasi 2–4 minggu.",
  steps: [
    { no: "01", title: "Pembentukan Panitia Pendiri", duration: "2 HARI KERJA", desc: "Pembentukan panitia dan sosialisasi rencana pendirian koperasi kepada calon anggota.", points: ["Pembentukan panitia pendiri", "Sosialisasi ke calon anggota", "Pengumpulan data calon anggota (min. 20 orang)"] },
    { no: "02", title: "Rapat Anggota Pendiri", duration: "1 HARI KERJA", desc: "Penyelenggaraan Rapat Anggota untuk membahas AD/ART, rencana kerja, dan pemilihan pengurus.", points: ["Pembahasan & pengesahan AD/ART", "Rencana awal kegiatan koperasi", "Pemilihan Pengurus & Pengawas"] },
    { no: "03", title: "Pembuatan Akta Notaris", duration: "2-3 HARI KERJA", desc: "Notaris menyusun akta pendirian koperasi berdasarkan hasil Rapat Anggota.", points: ["Drafting akta pendirian koperasi", "Penandatanganan akta", "Pengesahan notaris"] },
    { no: "04", title: "SK Pengesahan Kemenkumham", duration: "5-7 HARI KERJA", desc: "Pengajuan pengesahan koperasi sebagai badan hukum ke Kemenkumham.", points: ["Pengajuan via AHU", "Verifikasi dokumen", "Penerbitan SK Pengesahan"] },
    { no: "05", title: "NPWP & Perizinan", duration: "3-5 HARI KERJA", desc: "Pendaftaran NPWP koperasi dan perizinan dasar.", points: ["NPWP koperasi & SKT Pajak", "NIB & OSS", "Izin usaha koperasi (jika diperlukan)"] },
    { no: "06", title: "Penyerahan Dokumen", duration: "1 HARI KERJA", desc: "Penyerahan dokumen lengkap koperasi ke pengurus.", points: ["Paket dokumen resmi", "AD/ART final", "Panduan administrasi koperasi"] },
  ],

  faqTitle: "Pertanyaan seputar pendirian Koperasi.",
  faqs: [
    { q: "Berapa minimal jumlah anggota untuk mendirikan Koperasi?", a: "Minimal 20 orang WNI untuk koperasi primer, atau minimal 3 badan hukum untuk koperasi sekunder." },
    { q: "Apa perbedaan Koperasi dengan PT?", a: "Koperasi berorientasi pada kesejahteraan anggota (nirlaba), satu anggota satu suara, dan SHU dibagi berdasarkan jasa usaha. PT berorientasi profit, voting berdasarkan jumlah saham." },
    { q: "Apakah koperasi bisa mendapatkan pinjaman dari bank?", a: "Ya, koperasi yang sudah berbadan hukum dan memiliki laporan keuangan yang baik dapat mengajukan pinjaman ke bank atau lembaga keuangan lainnya." },
    { q: "Apa jenis-jenis Koperasi yang ada?", a: "Ada berbagai jenis koperasi: Koperasi Simpan Pinjam (KSP), Koperasi Konsumen, Koperasi Produsen, Koperasi Jasa, Koperasi Pemasaran, dan Koperasi Serba Usaha (KSU)." },
  ],
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
