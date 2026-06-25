import type { PricingPackage } from "@/components/Pricing";

export interface LayananContent {
  id: string;
  nama: string;
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  heroStats: { icon: string; value: string; label: string }[];
  
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefits: {
    icon: string;
    title: string;
    desc: string;
  }[];

  pricingTitle: string;
  pricingSubtitle: string;
  pricingPackages: PricingPackage[];

  faqs: { q: string; a: string }[];

  ctaTitle: string;
  ctaDescription: string;
  ctaWhatsAppMessage: string;
}

export const layananLainnyaData: Record<string, LayananContent> = {
  "virtual-office": {
    id: "virtual-office",
    nama: "Virtual Office",
    heroBadge: "Virtual Office EasyLegal",
    heroTitle: "Alamat bisnis prestisius, tanpa sewa kantor fisik.",
    heroDescription: "Dapatkan alamat komersial di Bandung, Jakarta, & Bekasi untuk legalitas PT, NPWP, hingga PKP — lengkap dengan resepsionis, meeting room, & layanan surat-menyurat. Mulai dari Rp1jt/tahun.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Tim EasyOffice Virtual Office",
    heroStats: [
      { icon: "MapPin", value: "3 Kota", label: "Bandung · Jakarta · Bekasi" },
      { icon: "Clock", value: "70 jam/tahun", label: "Meeting room gratis" },
      { icon: "ShieldCheck", value: "PKP-friendly", label: "Legalitas lengkap" }
    ],
    benefitsTitle: "Fasilitas & Manfaat Virtual Office",
    benefitsSubtitle: "Mengapa memilih alamat bisnis digital di EasyLegal?",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Legalitas Resmi & Kuat",
        desc: "Alamat berada di zonasi perkantoran sah. Aman untuk PKP, NIB, dan pembuatan Akta AHU."
      },
      {
        icon: "Award",
        title: "Kredibilitas Profesional",
        desc: "Meningkatkan citra profesional bisnis Anda dengan alamat kantor di gedung bergengsi."
      },
      {
        icon: "TrendingUp",
        title: "Layanan Resepsionis",
        desc: "Penerimaan surat menyurat dan paket terjadwal dengan notifikasi instan langsung via WhatsApp."
      }
    ],
    pricingTitle: "Pilihan Paket Virtual Office",
    pricingSubtitle: "Dapatkan alamat bisnis komersial prestisius di kota-kota besar",
    pricingPackages: [
      {
        title: "VIRTUAL OFFICE SILVER",
        price: "Rp 2.900.000",
        strikePrice: "Rp 4.500.000",
        subLabel: "PER TAHUN · LOKASI STRATEGIS",
        buttonText: "Pilih Paket Silver",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Virtual Office Silver.",
        groups: [
          {
            title: "FASILITAS ALAMAT",
            items: [
              { text: "Alamat Bisnis Prestisius", checked: true },
              { text: "Penggunaan Alamat untuk NIB & NPWP", checked: true },
              { text: "Domisili Perusahaan Sah", checked: true }
            ]
          },
          {
            title: "LAYANAN SURAT & TELEPON",
            items: [
              { text: "Layanan Penerimaan Surat & Paket", checked: true },
              { text: "Notifikasi Surat Masuk via WhatsApp", checked: true },
              { text: "Nomor Telepon Bersama", checked: true }
            ]
          },
          {
            title: "BONUS",
            isBoxed: true,
            items: [
              { text: "Free Meeting Room 2 Jam/Bulan", checked: true },
              { text: "Free High Speed Wi-Fi", checked: true },
              { text: "Free Coffee & Tea", checked: true }
            ]
          }
        ]
      },
      {
        title: "VIRTUAL OFFICE GOLD",
        price: "Rp 3.900.000",
        strikePrice: "Rp 6.000.000",
        subLabel: "PALING LENGKAP · BEST VALUE",
        isPopular: true,
        badgeText: "REKOMENDASI",
        buttonText: "Pilih Paket Gold",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Virtual Office Gold.",
        groups: [
          {
            title: "FASILITAS ALAMAT",
            items: [
              { text: "Alamat Bisnis Prestisius", checked: true },
              { text: "Penggunaan Alamat untuk NIB & NPWP", checked: true },
              { text: "Domisili Perusahaan Sah", checked: true }
            ]
          },
          {
            title: "LAYANAN KHUSUS",
            items: [
              { text: "Nomor Telepon Khusus Perusahaan", checked: true },
              { text: "Call Forwarding ke No. Pribadi", checked: true },
              { text: "Layanan Resepsionis Profesional", checked: true }
            ]
          },
          {
            title: "BONUS EXTRA",
            isBoxed: true,
            items: [
              { text: "Free Meeting Room 5 Jam/Bulan", checked: true },
              { text: "Signage Nama Perusahaan", checked: true },
              { text: "Gratis Pengurusan PKP", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Apakah Virtual Office bisa dipakai untuk pendirian PT?",
        a: "<strong>Bisa.</strong> Semua lokasi EasyOffice sudah dilengkapi <strong>IMB, PBB, & legalitas gedung lengkap</strong> sehingga bisa dipakai sebagai domisili resmi untuk pendirian PT, CV, NPWP, NIB OSS, hingga PKP. Kami juga sertakan surat domisili 1 tahun & surat perjanjian sewa untuk lampiran pendaftaran."
      },
      {
        q: "Apakah Virtual Office bisa untuk PKP (Pengusaha Kena Pajak)?",
        a: "<strong>Bisa.</strong> Alamat kami berada di zonasi perkantoran yang sah dan memiliki legalitas lengkap (IMB, PBB, Izin Operasional), memenuhi syarat verifikasi lapangan dari Kantor Pelayanan Pajak (KPP) untuk pengajuan PKP Anda."
      },
      {
        q: "Berapa lama proses aktivasi Virtual Office?",
        a: "Proses aktivasi sangat cepat. Setelah pembayaran dikonfirmasi dan dokumen persyaratan lengkap diterima, draf surat perjanjian sewa akan selesai dalam <strong>1-2 jam</strong>, dan dokumen fisik/asli dapat diambil atau dikirimkan ke alamat Anda pada hari yang sama."
      }
    ],
    ctaTitle: "Punya Pertanyaan tentang Virtual Office?",
    ctaDescription: "Konsultasikan kebutuhan alamat bisnis Anda dengan tim legal kami sekarang. Gratis tanpa biaya.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai Virtual Office."
  },
  "nib-oss": {
    id: "nib-oss",
    nama: "Perizinan Usaha (NIB & OSS)",
    heroBadge: "Perizinan Usaha · OSS RBA",
    heroTitle: "NIB & izin usaha resmi, cepat & lengkap.",
    heroDescription: "Pengurusan NIB, OSS RBA, perubahan KBLI, sampai sertifikat standar — semua kami pandu sesuai tingkat risiko usaha Anda. Mulai dari Rp 499.000.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Tim EasyLegal Mengurus Legalitas OSS",
    heroStats: [
      { icon: "ShieldCheck", value: "Legal Resmi", label: "Terintegrasi sistem OSS RBA" },
      { icon: "Clock", value: "1-3 Hari", label: "Proses penerbitan cepat" },
      { icon: "Award", value: "UMK & Non-UMK", label: "Tingkat risiko rendah hingga tinggi" }
    ],
    benefitsTitle: "Manfaat Memiliki NIB & Izin OSS",
    benefitsSubtitle: "Mengapa penting mendaftarkan legalitas usaha Anda sekarang?",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Legalitas Resmi & Kuat",
        desc: "NIB berfungsi sebagai identitas resmi pelaku usaha dan berlaku sebagai Tanda Daftar Perusahaan (TDP)."
      },
      {
        icon: "Award",
        title: "Akses Program Kemitraan",
        desc: "Memudahkan bisnis Anda mendapatkan modal usaha, KUR, serta program kemitraan pemerintah/BUMN."
      },
      {
        icon: "TrendingUp",
        title: "Kemudahan Izin Lanjutan",
        desc: "OSS RBA memudahkan pemrosesan Sertifikat Standar, Izin Operasional, hingga izin komersial pendukung."
      }
    ],
    pricingTitle: "Pilihan Paket NIB & OSS",
    pricingSubtitle: "Skema paket pendaftaran legalitas usaha sesuai kebutuhan Anda",
    pricingPackages: [
      {
        title: "NIB PERSEORANGAN",
        subLabel: "PELAKU USAHA MIKRO & KECIL (UMK)",
        price: "Rp 499.000",
        strikePrice: "Rp 900.000",
        buttonText: "Pilih NIB Perseorangan",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Paket NIB Perseorangan (UMK).",
        groups: [
          {
            title: "DOKUMEN UTAMA",
            items: [
              { text: "Pendaftaran Hak Akses Akun OSS RBA", checked: true },
              { text: "Pemilihan Kode KBLI 2020 yang Tepat", checked: true },
              { text: "Penerbitan Dokumen NIB Resmi", checked: true }
            ]
          },
          {
            title: "PERNYATAAN MANDIRI",
            items: [
              { text: "Pernyataan Mandiri Lingkungan (SPPL)", checked: true },
              { text: "Pernyataan Mandiri Keselamatan K3L", checked: true },
              { text: "Satu Kode KBLI Pilihan", checked: true }
            ]
          },
          {
            title: "BONUS",
            isBoxed: true,
            items: [
              { text: "Konsultasi KBLI & Struktur Usaha", checked: true },
              { text: "Gratis Personal Legal Assistance (1 Bulan)", checked: true }
            ]
          }
        ]
      },
      {
        title: "NIB BADAN USAHA",
        subLabel: "PT, CV, YAYASAN, ATAU KOPERASI",
        price: "Rp 999.000",
        strikePrice: "Rp 1.800.000",
        isPopular: true,
        buttonText: "Pilih NIB Badan Usaha",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Paket NIB Badan Usaha (PT/CV).",
        groups: [
          {
            title: "DOKUMEN & INTEGRASI",
            items: [
              { text: "Pendaftaran Hak Akses Akun OSS RBA Badan Usaha", checked: true },
              { text: "Sinkronisasi Data AHU (Kemenkumham) ke OSS", checked: true },
              { text: "Pemilihan Multi KBLI Sesuai Akta Pendirian", checked: true },
              { text: "Penerbitan Dokumen NIB Resmi Perusahaan", checked: true }
            ]
          },
          {
            title: "PERNYATAAN MANDIRI",
            items: [
              { text: "Pernyataan Mandiri Kepatuhan Lingkungan", checked: true },
              { text: "Pernyataan Mandiri Keselamatan Kerja K3L", checked: true },
              { text: "Up to 5 Kode KBLI Terintegrasi", checked: true }
            ]
          },
          {
            title: "BONUS",
            isBoxed: true,
            items: [
              { text: "Evaluasi Kesesuaian Tata Ruang (KKPR)", checked: true },
              { text: "Gratis Personal Legal Assistance (3 Bulan)", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Apa beda NIB Perorangan, NIB PT Perorangan, & NIB Badan?",
        a: "NIB Perorangan — untuk usaha perseorangan tanpa badan hukum (warung, freelancer, dst). NIB PT Perorangan — khusus untuk UMKM Mikro yang sudah didirikan sebagai PT Perorangan. NIB Badan — untuk badan usaha resmi: PT, PT PMA, CV, Firma, Yayasan, Perkumpulan, atau Koperasi."
      },
      {
        q: "Berapa lama proses penerbitan NIB?",
        a: "Proses standard berkisar antara 1 hingga 3 hari kerja setelah seluruh kelengkapan data administrasi kami terima dengan lengkap dan tidak ada gangguan pada sistem OSS BKPM."
      },
      {
        q: "Apa itu KBLI?",
        a: "KBLI (Klasifikasi Baku Lapangan Usaha Indonesia) adalah kode kategori resmi dari BPS untuk mengelompokkan jenis aktivitas ekonomi usaha. Tim EasyLegal akan menganalisis model bisnis Anda secara mendalam untuk menentukan kode KBLI yang paling akurat."
      }
    ],
    ctaTitle: "Butuh NIB atau Izin OSS RBA?",
    ctaDescription: "Konsultasikan jenis usaha dan kebutuhan perizinan Anda bersama tim profesional kami sekarang.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya tertarik ingin berkonsultasi mengenai pembuatan NIB dan izin OSS RBA."
  },
  "merek-haki": {
    id: "merek-haki",
    nama: "Merek & HAKI",
    heroBadge: "Hak Kekayaan Intelektual · DJKI",
    heroTitle: "Daftar Merek Brand Anda Resmi & Aman.",
    heroDescription: "Lindungi nama brand, logo, & ciptaan bisnis Anda secara resmi di Direktorat Jenderal Kekayaan Intelektual (DJKI). Mulai dari Rp 2.799.000.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Tim EasyLegal Mengurus Pendaftaran Merek DJKI",
    heroStats: [
      { icon: "ShieldCheck", value: "Proteksi Eksklusif", label: "Aman dari penjiplakan brand" },
      { icon: "Clock", value: "1 Hari Proses", label: "Penyusunan berkas kilat" },
      { icon: "Award", value: "DJKI Terdaftar", label: "E-Sertifikat resmi negara" }
    ],
    benefitsTitle: "Manfaat Mendaftarkan Merek & HAKI",
    benefitsSubtitle: "Mengapa penting mengamankan nama brand bisnis Anda secepatnya?",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Perlindungan Hukum Kuat",
        desc: "Hak eksklusif terbukti — Anda bisa menuntut secara hukum siapa saja yang menjiplak brand Anda."
      },
      {
        icon: "Star",
        title: "Aset Bisnis Berharga",
        desc: "Merek terdaftar bisa dijual, dilisensikan, atau diwariskan — aset intangible bernilai tinggi."
      },
      {
        icon: "TrendingUp",
        title: "Kredibilitas Brand",
        desc: "Simbol ® meningkatkan kepercayaan konsumen — bukti keseriusan bisnis di pasar."
      }
    ],
    pricingTitle: "Pilihan Paket Pendaftaran Merek",
    pricingSubtitle: "Skema paket pendaftaran merek all-in tanpa tambahan biaya",
    pricingPackages: [
      {
        title: "PAKET BASIC",
        price: "Rp 2.799.000",
        strikePrice: "Rp 3.500.000",
        subLabel: "TERMASUK PNBP UTAMA",
        buttonText: "Pilih Basic",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Paket Basic Pendaftaran Merek.",
        groups: [
          {
            title: "DOKUMEN & MONITORING",
            items: [
              { text: "Konsultasi HAKI Merek", checked: true },
              { text: "Rekomendasi pemilihan Kelas Merek", checked: true },
              { text: "Monitoring perubahan Status Merek", checked: true }
            ]
          },
          {
            title: "SERTIFIKAT",
            items: [
              { text: "E-Sertifikat Merek Resmi", checked: true },
              { text: "5× Pemeriksaan Merek Manual", checked: true }
            ]
          },
          {
            title: "BONUS",
            isBoxed: true,
            items: [
              { text: "Layanan Personal Legal Assistance", checked: true },
              { text: "Voucher EasyLegal Rp 250.000", checked: true }
            ]
          }
        ]
      },
      {
        title: "PREMIUM",
        price: "Rp 3.599.000",
        strikePrice: "Rp 4.500.000",
        isPopular: true,
        badgeText: "REKOMENDASI",
        buttonText: "Pilih Premium",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Paket Premium Pendaftaran Merek.",
        groups: [
          {
            title: "DOKUMEN & AI",
            items: [
              { text: "Konsultasi HAKI Merek", checked: true },
              { text: "Rekomendasi pemilihan Kelas Merek", checked: true },
              { text: "Pemeriksaan Merek dengan AI", checked: true }
            ]
          },
          {
            title: "EXTRA PROTEKSI",
            items: [
              { text: "Tanggapan/Keberatan Penolakan Resmi", checked: true },
              { text: "E-Sertifikat Merek", checked: true }
            ]
          },
          {
            title: "BONUS",
            isBoxed: true,
            items: [
              { text: "Layanan Personal Legal Assistance", checked: true },
              { text: "Voucher EasyLegal Rp 250.000 & SOP Bisnis", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Berapa lama merek terlindungi setelah didaftarkan?",
        a: "Merek dilindungi selama 10 tahun sejak tanggal penerimaan pendaftaran resmi, dan dapat diperpanjang kembali untuk jangka waktu yang sama."
      },
      {
        q: "Apa yang perlu disiapkan untuk mendaftar?",
        a: "KTP pemilik, logo merek (gambar JPG/PNG), rincian barang/jasa yang dijual, dan Surat Kuasa bermaterai yang kami siapkan."
      }
    ],
    ctaTitle: "Ingin Lindungi Brand & Merek Anda?",
    ctaDescription: "Konsultasikan nama brand Anda dengan tim HAKI kami secara gratis sebelum pendaftaran resmi.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya tertarik ingin berkonsultasi mengenai pendaftaran merek brand saya."
  },
  "visa-kitas": {
    id: "visa-kitas",
    nama: "Visa & KITAS",
    heroBadge: "Layanan Imigrasi · Visa & KITAS",
    heroTitle: "Layanan Visa & KITAS Resmi untuk WNA.",
    heroDescription: "Pengurusan Visa Bisnis (Single/Multiple Entry), KITAS Investor, KITAS Kerja TKA, hingga perpanjangan izin tinggal WNA di Indonesia secara aman dan tepercaya.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Layanan Imigrasi EasyLegal Visa & KITAS",
    heroStats: [
      { icon: "Globe", value: "Global Reach", label: "Layanan legalitas internasional" },
      { icon: "Clock", value: "7-14 Hari", label: "Proses pengurusan cepat" },
      { icon: "ShieldCheck", value: "Resmi Imigrasi", label: "Terintegrasi sistem e-Visa" }
    ],
    benefitsTitle: "Manfaat Memiliki Izin Visa & KITAS Resmi",
    benefitsSubtitle: "Mengapa harus mengurus dokumen imigrasi bersama EasyLegal?",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Perlindungan & Legalitas",
        desc: "Bebas dari sanksi keimigrasian/deportasi dan dapat beraktivitas bisnis secara sah di Indonesia."
      },
      {
        icon: "Globe",
        title: "Akses Perbankan & Kependudukan",
        desc: "Pemegang KITAS dapat membuka rekening bank lokal, mendapatkan SIM, serta sewa properti."
      },
      {
        icon: "TrendingUp",
        title: "Ketenangan Berbisnis/Investasi",
        desc: "Fokus penuh mengembangkan jaringan bisnis dan investasi Anda tanpa khawatir masalah administratif."
      }
    ],
    pricingTitle: "Paket Pengurusan Visa & KITAS",
    pricingSubtitle: "Pilihan jenis visa & izin tinggal imigrasi yang sesuai dengan aktivitas Anda",
    pricingPackages: [
      {
        title: "SINGLE ENTRY (VISA BISNIS)",
        price: "Rp 5.149.000",
        strikePrice: "Rp 10.300.000",
        subLabel: "MAKSIMAL 60 HARI KUNJUNGAN",
        buttonText: "Pilih Single Entry",
        buttonLink: "Halo EasyLegal, saya ingin memesan Paket Visa Bisnis Sekali Masuk (Single Entry).",
        groups: [
          {
            title: "LAMA PROSES",
            items: [
              { text: "7-10 Hari Kerja", checked: true }
            ]
          },
          {
            title: "FASILITAS & DOKUMEN",
            items: [
              { text: "E-Visa Resmi (Kunjungan Bisnis)", checked: true },
              { text: "Sponsor Company Letter", checked: true },
              { text: "Bantuan Laporan Kedatangan Imigrasi", checked: true }
            ]
          }
        ]
      },
      {
        title: "KITAS INVESTOR 1 TAHUN (C313)",
        price: "Rp 12.500.000",
        strikePrice: "Rp 20.000.000",
        isPopular: true,
        badgeText: "REKOMENDASI",
        buttonText: "Pilih KITAS 1 Tahun",
        buttonLink: "Halo EasyLegal, saya ingin memesan Paket KITAS Investor 1 Tahun.",
        groups: [
          {
            title: "LAMA PROSES",
            items: [
              { text: "14-21 Hari Kerja", checked: true }
            ]
          },
          {
            title: "DOKUMEN LENGKAP",
            items: [
              { text: "Rekomendasi Kementerian terkait (BKPM)", checked: true },
              { text: "Penerbitan E-KITAS Investor", checked: true },
              { text: "Izin Masuk Kembali (MERP)", checked: true },
              { text: "Izin Kerja Terkait", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Apa perbedaan Visa Kunjungan Bisnis dengan KITAS?",
        a: "Visa Bisnis ditujukan untuk kunjungan singkat seperti negosiasi, rapat, atau survei tanpa menerima gaji lokal. KITAS adalah izin tinggal terbatas yang memungkinkan WNA bekerja (KITAS Kerja) atau berinvestasi (KITAS Investor) secara resmi dalam jangka panjang."
      },
      {
        q: "Berapa lama proses pembuatan KITAS Investor?",
        a: "Rata-rata proses pendaftaran hingga e-KITAS terbit memerlukan waktu sekitar 14 hingga 21 hari kerja setelah seluruh dokumen dari sponsor dan WNA dinyatakan lengkap oleh imigrasi."
      }
    ],
    ctaTitle: "Butuh Layanan Visa atau KITAS WNA?",
    ctaDescription: "Konsultasikan jenis visa, perizinan tinggal, dan kebutuhan sponsor Anda secara gratis dengan pakar keimigrasian kami.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin berkonsultasi mengenai pengurusan Visa/KITAS."
  },
  "sertifikasi-iso": {
    id: "sertifikasi-iso",
    nama: "Sertifikasi ISO",
    heroBadge: "Sertifikasi Standar Internasional · ISO",
    heroTitle: "Sertifikasi ISO Resmi, Cepat, & Diakui.",
    heroDescription: "Dapatkan sertifikasi ISO 9001 (Mutu), ISO 14001 (Lingkungan), ISO 45001 (K3), hingga ISO 27001 (Keamanan Data) untuk meningkatkan kredibilitas & memenangkan tender bisnis.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Layanan Sertifikasi ISO EasyLegal",
    heroStats: [
      { icon: "Award", value: "Standar Dunia", label: "ISO Resmi & Terakreditasi" },
      { icon: "Clock", value: "Proses Lancar", label: "Pendampingan audit lengkap" },
      { icon: "ShieldCheck", value: "Kredibilitas Tinggi", label: "Siap untuk tender BUMN/Pemerintah" }
    ],
    benefitsTitle: "Manfaat Sertifikasi ISO bagi Perusahaan",
    benefitsSubtitle: "Mengapa standar ISO menjadi investasi penting bagi bisnis Anda?",
    benefits: [
      {
        icon: "Globe",
        title: "Kredibilitas Global",
        desc: "Membuktikan bisnis Anda memenuhi standar internasional yang diakui oleh mitra dan klien di seluruh dunia."
      },
      {
        icon: "TrendingUp",
        title: "Akses Tender & Pasar Baru",
        desc: "Sertifikasi ISO sering kali menjadi syarat wajib (prasyarat) dalam tender pemerintahan, BUMN, maupun proyek skala besar."
      },
      {
        icon: "ShieldCheck",
        title: "Efisiensi & Manajemen Mutu",
        desc: "Membantu memperbaiki SOP internal, meminimalisir risiko operasional, serta meningkatkan kepuasan pelanggan secara sistematis."
      }
    ],
    pricingTitle: "Daftar Sertifikasi ISO",
    pricingSubtitle: "Pilihan jenis sertifikasi ISO resmi yang paling sering dibutuhkan industri Indonesia",
    pricingPackages: [
      {
        title: "ISO 9001:2015",
        price: "Rp 9.900.000",
        subLabel: "SISTEM MANAJEMEN MUTU (QMS)",
        buttonText: "Pilih ISO 9001",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 9001:2015.",
        groups: [
          {
            title: "SEKTOR COCOK",
            items: [
              { text: "Manufaktur, Jasa, Retail, & Distribusi", checked: true },
              { text: "Fokus pada kepuasan pelanggan", checked: true }
            ]
          },
          {
            title: "YANG DIPEROLEH",
            items: [
              { text: "Audit Sertifikasi Resmi", checked: true },
              { text: "Pendampingan & Penyusunan Dokumen", checked: true },
              { text: "Sertifikat ISO Terakreditasi KAN/Internasional", checked: true }
            ]
          }
        ]
      },
      {
        title: "ISO 45001:2018",
        price: "Rp 11.900.000",
        isPopular: true,
        badgeText: "REKOMENDASI K3",
        subLabel: "SISTEM MANAJEMEN K3",
        buttonText: "Pilih ISO 45001",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Sertifikasi ISO 45001:2018.",
        groups: [
          {
            title: "SEKTOR UTAMA",
            items: [
              { text: "Konstruksi, Pertambangan, & Pabrik", checked: true },
              { text: "Pengelolaan K3 & minimalisir kecelakaan", checked: true }
            ]
          },
          {
            title: "LAYANAN ALL-IN",
            items: [
              { text: "Sertifikat ISO Resmi Terdaftar", checked: true },
              { text: "Penyusunan SOP & Manual K3 Terintegrasi", checked: true },
              { text: "Jaminan Kelulusan Audit", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Berapa lama masa berlaku sertifikat ISO?",
        a: "Sertifikat ISO berlaku selama 3 tahun. Namun, setiap tahun perusahaan wajib melakukan audit pengawasan (surveillance audit) untuk memastikan kepatuhan sistem tetap terjaga."
      },
      {
        q: "Apakah EasyLegal menjamin kelulusan audit ISO?",
        a: "Ya. Tim konsultan kami akan mendampingi penyusunan SOP, perbaikan sistem manajemen, hingga simulasi audit sehingga perusahaan Anda dipastikan siap 100% dan lulus audit sertifikasi secara resmi."
      }
    ],
    ctaTitle: "Butuh Sertifikasi ISO untuk Tender?",
    ctaDescription: "Konsultasikan standar ISO yang paling tepat dan peroleh penawaran resmi dari tim ahli kami sekarang.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya tertarik dengan Sertifikasi ISO."
  },
  "pendirian-yayasan": {
    id: "pendirian-yayasan",
    nama: "Pendirian Yayasan",
    heroBadge: "Pendirian Yayasan · AHU Kemenkumham",
    heroTitle: "Bangun dampak sosial dengan yayasan yang sah.",
    heroDescription: "Dirikan yayasan resmi untuk misi sosial, kemanusiaan, atau keagamaan Anda — kami pandu dari pengecekan nama, akta notaris, sampai SK Kemenkumham, selesai dalam 2 hari kerja.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Penyusunan legalitas pendirian yayasan",
    heroStats: [
      { icon: "ShieldCheck", value: "Badan Hukum Sah", label: "SK Resmi Kemenkumham RI" },
      { icon: "Clock", value: "2 Hari Kerja", label: "Penerbitan akta notaris kilat" },
      { icon: "Users", value: "Non-Profit", label: "Struktur Pembina, Pengurus & Pengawas" }
    ],
    benefitsTitle: "Manfaat Memiliki Yayasan Resmi",
    benefitsSubtitle: "Mengapa penting meresmikan yayasan sosial/kemanusiaan Anda?",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Badan Hukum Resmi",
        desc: "Status hukum formal terakreditasi memudahkan yayasan untuk menjalin kerja sama resmi dengan institusi dalam & luar negeri."
      },
      {
        icon: "Award",
        title: "Penerimaan Donasi & Hibah",
        desc: "Memiliki landasan legalitas wajib untuk membuka rekening bank atas nama yayasan, menerima donasi publik, & mengajukan dana hibah."
      },
      {
        icon: "TrendingUp",
        title: "Kepercayaan Publik",
        desc: "Laporan transparansi legalitas dan akta otentik meningkatkan kredibilitas di mata para donatur & masyarakat."
      }
    ],
    pricingTitle: "Paket Pendirian Yayasan",
    pricingSubtitle: "Dapatkan paket pembuatan yayasan all-in tanpa biaya siluman",
    pricingPackages: [
      {
        title: "PAKET BASIC",
        price: "Rp 2.999.000",
        strikePrice: "Rp 6.000.000",
        subLabel: "DOKUMEN UTAMA PENDIRIAN",
        buttonText: "Pilih Paket Basic",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Paket Basic Pendirian Yayasan.",
        groups: [
          {
            title: "DOKUMEN PENDIRIAN",
            items: [
              { text: "Pengecekan & Pemesanan Nama Yayasan", checked: true },
              { text: "Akta Notaris Pendirian Yayasan", checked: true },
              { text: "SK Kemenkumham (Pengesahan)", checked: true }
            ]
          },
          {
            title: "PAJAK & OPERASIONAL",
            items: [
              { text: "NPWP Yayasan", checked: true },
              { text: "NIB & Akun OSS RBA", checked: false },
              { text: "Stempel Yayasan", checked: false }
            ]
          }
        ]
      },
      {
        title: "PAKET COMPLETE",
        price: "Rp 4.999.000",
        strikePrice: "Rp 10.000.000",
        isPopular: true,
        badgeText: "TERLARIS",
        subLabel: "YAYASAN SIAP BEROPERASI",
        buttonText: "Pilih Paket Complete",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Paket Complete Pendirian Yayasan.",
        groups: [
          {
            title: "DOKUMEN PENDIRIAN",
            items: [
              { text: "Pengecekan & Pemesanan Nama Yayasan", checked: true },
              { text: "Akta Notaris Pendirian Yayasan", checked: true },
              { text: "SK Kemenkumham (Pengesahan)", checked: true }
            ]
          },
          {
            title: "DOKUMEN OPERASIONAL LENGKAP",
            items: [
              { text: "NPWP Yayasan Resmi", checked: true },
              { text: "NIB & Aktivasi Akun OSS RBA", checked: true },
              { text: "Izin Operasional Sektor Terkait", checked: true },
              { text: "Stempel Yayasan (1 Warna)", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Apa itu Yayasan?",
        a: "Yayasan adalah badan hukum yang terdiri atas kekayaan yang dipisahkan, didirikan untuk mencapai tujuan tertentu di bidang sosial, keagamaan, & kemanusiaan."
      },
      {
        q: "Siapa saja yang wajib ada dalam struktur yayasan?",
        a: "Struktur yayasan wajib memiliki tiga organ utama: Pembina (organ tertinggi), Pengurus (Ketua, Sekretaris, Bendahara), dan Pengawas."
      }
    ],
    ctaTitle: "Ingin Mendirikan Yayasan Sosial?",
    ctaDescription: "Konsultasikan struktur organ & tujuan yayasan Anda bersama tim legal ahli kami sekarang.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pendirian yayasan."
  },
  "pembubaran-perusahaan": {
    id: "pembubaran-perusahaan",
    nama: "Pembubaran Perusahaan",
    heroBadge: "Jasa Likuidasi · Pembubaran PT / CV",
    heroTitle: "Pembubaran PT & CV secara Resmi & Tuntas.",
    heroDescription: "Urus proses likuidasi, pencabutan status badan hukum Kemenkumham, pengumuman koran, hingga penutupan NPWP perusahaan secara sah dan berkekuatan hukum.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Proses pembubaran perusahaan resmi",
    heroStats: [
      { icon: "ShieldCheck", value: "Likuidasi Sah", label: "Pencabutan status AHU resmi" },
      { icon: "Clock", value: "Proses Teratur", label: "Sesuai undang-undang perseroan" },
      { icon: "Award", value: "Bebas Masalah", label: "Tutup NPWP & pajak tertib" }
    ],
    benefitsTitle: "Mengapa Perlu Pembubaran Resmi?",
    benefitsSubtitle: "Hindari denda administratif dan tuntutan hukum di kemudian hari",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Bebas Tuntutan Hukum",
        desc: "Pembubaran yang sah secara hukum (melalui RUPS & likuidator) membebaskan organ direksi dari tanggung jawab pribadi."
      },
      {
        icon: "Award",
        title: "Penutupan NPWP Pajak",
        desc: "Menghindari denda pajak dan kewajiban pelaporan SPT tahunan badan yang terus berjalan jika perusahaan tidak ditutup resmi."
      },
      {
        icon: "TrendingUp",
        title: "Kepastian Kreditur",
        desc: "Proses pengumuman koran memastikan hak dan kewajiban dengan pihak ketiga/kreditur diselesaikan secara tertib."
      }
    ],
    pricingTitle: "Paket Pembubaran Perusahaan",
    pricingSubtitle: "Pilihan paket pengurusan likuidasi PT & CV all-in",
    pricingPackages: [
      {
        title: "PEMBUBARAN CV",
        price: "Rp 7.500.000",
        subLabel: "LIKUIDASI & PUBLIKASI RESMI",
        buttonText: "Pilih Pembubaran CV",
        buttonLink: "Halo EasyLegal, saya ingin konsultasi mengenai pembubaran CV.",
        groups: [
          {
            title: "DOKUMEN & KORAN",
            items: [
              { text: "Akta Pembubaran & Kesepakatan Sekutu", checked: true },
              { text: "Pengumuman Koran Resmi (1x Publikasi)", checked: true },
              { text: "Pemberitahuan Pencabutan ke Kemenkumham", checked: true }
            ]
          }
        ]
      },
      {
        title: "PEMBUBARAN PT",
        price: "Rp 15.000.000",
        isPopular: true,
        badgeText: "TERLARIS",
        subLabel: "LIKUIDATOR & RUAS HUKUM LENGKAP",
        buttonText: "Pilih Pembubaran PT",
        buttonLink: "Halo EasyLegal, saya ingin konsultasi mengenai pembubaran PT.",
        groups: [
          {
            title: "PROSES HUKUM LENGKAP",
            items: [
              { text: "Akta RUPS Pembubaran & Penunjukan Likuidator", checked: true },
              { text: "Pengumuman Koran Pertama & Kedua", checked: true },
              { text: "SK Kemenkumham Pencabutan Status Badan Hukum", checked: true },
              { text: "Pendampingan Penutupan NPWP Pajak", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Berapa lama proses pembubaran PT?",
        a: "Proses likuidasi dan pembubaran PT memerlukan waktu sekitar 4 hingga 6 bulan karena adanya kewajiban masa tunggu klaim kreditur setelah pengumuman koran."
      },
      {
        q: "Apakah utang piutang langsung hilang saat dibubarkan?",
        a: "Tidak. Seluruh utang piutang dan kewajiban perusahaan harus dibereskan terlebih dahulu oleh Likuidator menggunakan aset perseroan sebelum status badan hukum resmi dihapus."
      }
    ],
    ctaTitle: "Butuh Konsultasi Pembubaran Usaha?",
    ctaDescription: "Diskusikan situasi perusahaan Anda bersama tim konsultan hukum kami untuk solusi likuidasi terbaik.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pembubaran perusahaan."
  },
  "pengurusan-pse": {
    id: "pengurusan-pse",
    nama: "Pendaftaran PSE",
    heroBadge: "Kominfo · Pendaftaran PSE",
    heroTitle: "Jasa Pengurusan PSE Kominfo Resmi.",
    heroDescription: "Daftarkan aplikasi, web, atau platform digital Anda sebagai Penyelenggara Sistem Elektronik (PSE) Domestik/Asing di Kementerian Kominfo RI secara aman.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Pendaftaran PSE Kominfo Indonesia",
    heroStats: [
      { icon: "ShieldCheck", value: "Sertifikat Resmi", label: "Tanda Daftar PSE Kominfo" },
      { icon: "Clock", value: "1-3 Hari", label: "Proses cepat & praktis" },
      { icon: "Award", value: "Patuh Regulasi", label: "Aman dari blokir Kominfo" }
    ],
    benefitsTitle: "Mengapa Wajib Daftar PSE?",
    benefitsSubtitle: "Kewajiban legal bagi setiap pemilik situs web transaksi & platform digital",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Bebas Sanksi Pemblokiran",
        desc: "Sesuai Peraturan Menkominfo, sistem elektronik yang tidak terdaftar terancam sanksi administratif hingga pemutusan akses (blokir)."
      },
      {
        icon: "Award",
        title: "Kredibilitas Platform",
        desc: "Menampilkan Tanda Daftar PSE di situs meningkatkan kepercayaan pengguna/nasabah bahwa layanan Anda legal."
      },
      {
        icon: "TrendingUp",
        title: "Syarat Kerja Sama Payment Gateway",
        desc: "Menjadi prasyarat wajib saat mendaftar integrasi pembayaran payment gateway, bank, maupun merchant besar."
      }
    ],
    pricingTitle: "Paket Jasa Pendaftaran PSE",
    pricingSubtitle: "Biaya all-in pendaftaran PSE Kominfo Domestik",
    pricingPackages: [
      {
        title: "PSE DOMESTIK",
        price: "Rp 1.499.000",
        strikePrice: "Rp 2.500.000",
        subLabel: "ALL-IN DOKUMEN & SERTIFIKAT",
        buttonText: "Daftar PSE Domestik",
        buttonLink: "Halo EasyLegal, saya ingin mendaftar PSE Domestik.",
        groups: [
          {
            title: "FITUR UTAMA",
            items: [
              { text: "Pendaftaran Akun Sistem Layanan Kominfo", checked: true },
              { text: "Penyusunan Formulir Keterangan Sistem", checked: true },
              { text: "Penerbitan Tanda Daftar PSE Resmi", checked: true },
              { text: "Jaminan Asistensi Teknis", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Siapa saja yang wajib mendaftar PSE Kominfo?",
        a: "Setiap portal, situs web, atau aplikasi yang menyediakan transaksi barang/jasa, memproses data pribadi, menyajikan layanan berbayar, atau memfasilitasi komunikasi online."
      },
      {
        q: "Apakah tanda daftar PSE berlaku selamanya?",
        a: "Ya, Tanda Daftar PSE berlaku selama sistem elektronik tersebut dioperasikan dan tidak ada perubahan data mayor atau pelanggaran regulasi."
      }
    ],
    ctaTitle: "Platform Anda Belum Terdaftar PSE?",
    ctaDescription: "Urus sertifikat PSE Anda hari ini demi keamanan operasional sistem bisnis Anda.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin berkonsultasi mengenai pendaftaran PSE Kominfo."
  },
  "perubahan-akta": {
    id: "perubahan-akta",
    nama: "Perubahan Akta",
    heroBadge: "Biro Jasa Akta · Perubahan Data PT",
    heroTitle: "Urus Perubahan Akta PT & CV Kilat.",
    heroDescription: "Ubah susunan pemegang saham, direksi/komisaris, nama perusahaan, alamat domisili, tujuan KBLI, hingga peningkatan modal dasar secara resmi dengan Notaris & Kemenkumham.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Penyusunan dokumen perubahan akta",
    heroStats: [
      { icon: "ShieldCheck", value: "Notaris Resmi", label: "Aman & berkekuatan hukum" },
      { icon: "Clock", value: "3-5 Hari", label: "Proses cepat AHU" },
      { icon: "Award", value: "SK Kemenkumham", label: "Persetujuan resmi negara" }
    ],
    benefitsTitle: "Kapan Harus Melakukan Perubahan Akta?",
    benefitsSubtitle: "Menyesuaikan legalitas dengan dinamika perkembangan bisnis Anda",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Perubahan Pengurus (RUPS)",
        desc: "Wajib dilaporkan ke Kemenkumham jika terjadi pergantian direktur, komisaris, atau keluar masuk pemegang saham."
      },
      {
        icon: "Award",
        title: "Peningkatan Modal Kerja",
        desc: "Mencatat peningkatan modal disetor untuk keperluan pendanaan proyek besar atau restrukturisasi."
      },
      {
        icon: "TrendingUp",
        title: "Penyelarasan KBLI Baru",
        desc: "Menambah kategori bidang usaha baru pada akta agar bisa menerbitkan izin operasional baru di OSS."
      }
    ],
    pricingTitle: "Paket Perubahan Akta Perusahaan",
    pricingSubtitle: "Biaya jasa Notaris & Kemenkumham all-in",
    pricingPackages: [
      {
        title: "PERUBAHAN DATA PT",
        price: "Rp 3.999.000",
        strikePrice: "Rp 6.000.000",
        subLabel: "PERUBAHAN PENGURUS / SAHAM",
        buttonText: "Pilih Perubahan Data",
        buttonLink: "Halo EasyLegal, saya ingin melakukan Perubahan Data PT.",
        groups: [
          {
            title: "YANG DIPEROLEH",
            items: [
              { text: "Drafting Risalah RUPS / Keputusan Pemegang Saham", checked: true },
              { text: "Akta Notaris Perubahan Resmi", checked: true },
              { text: "Penerimaan Laporan SK Kemenkumham (AHU)", checked: true }
            ]
          }
        ]
      },
      {
        title: "PERUBAHAN ANGGARAN DASAR PT",
        price: "Rp 5.499.000",
        strikePrice: "Rp 8.000.000",
        isPopular: true,
        badgeText: "TERLARIS",
        subLabel: "PERUBAHAN MODAL / NAMA / DOMISILI",
        buttonText: "Pilih Perubahan AD",
        buttonLink: "Halo EasyLegal, saya ingin melakukan Perubahan Anggaran Dasar PT.",
        groups: [
          {
            title: "DOKUMEN INTEGRAL",
            items: [
              { text: "Akta Notaris Perubahan Anggaran Dasar", checked: true },
              { text: "SK Persetujuan Kemenkumham (Bukan sekadar lapor)", checked: true },
              { text: "Sinkronisasi perubahan data ke sistem OSS RBA", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Berapa lama proses pembuatan akta perubahan selesai?",
        a: "Proses penyusunan draft hingga akta notaris ditandatangani dan mendapat persetujuan Kemenkumham rata-rata membutuhkan waktu 3 hingga 5 hari kerja."
      },
      {
        q: "Apakah seluruh pemegang saham harus hadir saat tanda tangan?",
        a: "Tanda tangan dapat diwakilkan menggunakan Surat Kuasa resmi dari pemegang saham yang tidak dapat hadir, atau melalui sirkuler RUPS."
      }
    ],
    ctaTitle: "Bisnis Anda Mengalami Perubahan Struktur?",
    ctaDescription: "Konsultasikan rencana perubahan pengurus atau modal perusahaan Anda bersama konsultan hukum kami.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin berkonsultasi mengenai perubahan akta perusahaan."
  },
  "pengajuan-pkp": {
    id: "pengajuan-pkp",
    nama: "Pengajuan PKP",
    heroBadge: "Pajak Badan · Pengukuhan PKP",
    heroTitle: "Jasa Pengukuhan PKP Perusahaan Resmi.",
    heroDescription: "Urus pengukuhan Pengusaha Kena Pajak (PKP) untuk PT/CV Anda secara sah agar dapat menerbitkan Faktur Pajak dan mengikuti tender besar.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Pengurusan PKP perusahaan online",
    heroStats: [
      { icon: "ShieldCheck", value: "Faktur Pajak", label: "Dapat menerbitkan e-Faktur resmi" },
      { icon: "Clock", value: "Proses Lancar", label: "Pendampingan survei KPP lengkap" },
      { icon: "Award", value: "Tender Ready", label: "Syarat utama kemitraan BUMN/Swasta" }
    ],
    benefitsTitle: "Manfaat Menjadi Pengusaha Kena Pajak (PKP)",
    benefitsSubtitle: "Mengapa PT/CV Anda perlu dikukuhkan menjadi PKP?",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Bisa Menerbitkan Faktur Pajak",
        desc: "Dapat memungut PPN 11% dari transaksi dan mengkreditkan Pajak Masukan atas pembelian bahan baku bisnis."
      },
      {
        icon: "Award",
        title: "Syarat Menang Tender",
        desc: "Instansi pemerintah, BUMN, dan korporasi swasta besar mewajibkan vendor mereka berstatus PKP untuk kerja sama."
      },
      {
        icon: "TrendingUp",
        title: "Kredibilitas Pajak Tertib",
        desc: "Menandakan bahwa bisnis Anda tertib secara administrasi fiskal dan dinilai bonafide di mata lembaga perbankan."
      }
    ],
    pricingTitle: "Paket Pengurusan PKP",
    pricingSubtitle: "Biaya asistensi berkas dan verifikasi lapangan PKP",
    pricingPackages: [
      {
        title: "ASISTENSI PKP LENGKAP",
        price: "Rp 2.499.000",
        strikePrice: "Rp 4.000.000",
        subLabel: "ASISTENSI & DAMPINGI SURVEI",
        buttonText: "Daftar PKP Sekarang",
        buttonLink: "Halo EasyLegal, saya ingin mendaftar Pengukuhan PKP.",
        groups: [
          {
            title: "LAYANAN UTAMA",
            items: [
              { text: "Penyusunan berkas & formulir pengajuan PKP", checked: true },
              { text: "Pendaftaran Sertifikat Elektronik Pajak", checked: true },
              { text: "Pendampingan persiapan survei/verifikasi lapangan KPP", checked: true },
              { text: "Aktivasi Akun e-Faktur Pajak", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Apa saja syarat utama pengajuan PKP?",
        a: "Memiliki alamat/kantor fisik yang sah (bisa Virtual Office PKP-friendly), laporan keuangan tertib, dan sudah mendaftarkan NPWP serta SPT Tahunan pengurus."
      },
      {
        q: "Apakah petugas pajak akan mendatangi kantor saat pengajuan?",
        a: "Ya. Petugas dari Kantor Pelayanan Pajak (KPP) setempat akan melakukan verifikasi lapangan (survei fisik) ke lokasi kantor Anda untuk mencocokkan kebenaran kegiatan usaha."
      }
    ],
    ctaTitle: "Siap Naik Kelas Menjadi PKP?",
    ctaDescription: "Asistensi pendaftaran PKP tanpa repot dan dampingi penuh sampai sertifikat elektronik e-Faktur Anda aktif.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin berkonsultasi mengenai pengukuhan PKP."
  },
  "press-release": {
    id: "press-release",
    nama: "Press Release",
    heroBadge: "Publikasi Media · Press Release",
    heroTitle: "Jasa Publikasi Press Release Media Nasional.",
    heroDescription: "Terbitkan berita bisnis, peluncuran brand, atau klarifikasi resmi Anda di portal berita nasional ternama seperti Detik, Kompas, CNBC, CNN, Tribun, dll.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Publikasi berita media nasional",
    heroStats: [
      { icon: "Globe", value: "Media Nasional", label: "Detik, Kompas, CNBC, CNN, dll" },
      { icon: "Clock", value: "1-3 Hari Kerja", label: "Proses terbit kilat" },
      { icon: "ShieldCheck", value: "100% Tayang", label: "Garansi tayang permanen" }
    ],
    benefitsTitle: "Manfaat Press Release bagi Brand Anda",
    benefitsSubtitle: "Mengapa publikasi di media nasional menjadi strategi PR yang kuat?",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Meningkatkan Kepercayaan (Kredibilitas)",
        desc: "Brand yang diliput media besar otomatis memiliki wibawa hukum & sosial di mata calon konsumen/investor."
      },
      {
        icon: "Award",
        title: "Meningkatkan SEO (Backlink)",
        desc: "Mendapatkan tautan/backlink berkualitas tinggi dari situs media ber-Domain Authority tinggi untuk website Anda."
      },
      {
        icon: "TrendingUp",
        title: "Klarifikasi & Pengumuman Sah",
        desc: "Saluran resmi terbaik untuk peluncuran IPO, pendirian baru, pergantian manajemen, atau rilis hak jawab."
      }
    ],
    pricingTitle: "Pilihan Paket Press Release",
    pricingSubtitle: "Biaya all-in penulisan naskah berita profesional & penayangan",
    pricingPackages: [
      {
        title: "PAKET BASIC (1 MEDIA)",
        price: "Rp 1.199.000",
        strikePrice: "Rp 2.400.000",
        subLabel: "TERBIT DI PORTAL PILIHAN",
        buttonText: "Pilih Paket Basic",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Paket Press Release Single Media.",
        groups: [
          {
            title: "PENAYANGAN",
            items: [
              { text: "Bebas pilih 1 media (Kumparan / IDN Times / Tribun)", checked: true },
              { text: "Berita terbit permanen (no delete)", checked: true },
              { text: "Garansi 100% tayang resmi", checked: true }
            ]
          }
        ]
      },
      {
        title: "PREMIUM DETIK / KOMPAS",
        price: "Rp 6.499.000",
        strikePrice: "Rp 9.500.000",
        isPopular: true,
        badgeText: "PREMIUM",
        subLabel: "KREDIBILITAS MAKSIMAL",
        buttonText: "Pilih Premium",
        buttonLink: "Halo EasyLegal, saya tertarik dengan Paket Press Release Detik / Kompas.",
        groups: [
          {
            title: "PORTAL UTAMA",
            items: [
              { text: "Terbit di Detik.com atau Kompas.com", checked: true },
              { text: "Jaminan tayang & link permanen", checked: true },
              { text: "Penyusunan naskah oleh jurnalis profesional", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Apakah naskah press release dituliskan oleh EasyLegal?",
        a: "Ya. Anda dapat menyetor draf kasar atau ide utama, dan tim jurnalis kami akan menulis naskah berita sesuai kaidah jurnalistik 5W+1H agar layak tayang."
      },
      {
        q: "Berapa lama proses terbit setelah disetujui?",
        a: "Setelah naskah disetujui oleh Anda, artikel berita rata-rata terbit di media nasional pilihan dalam waktu 1 hingga 3 hari kerja."
      }
    ],
    ctaTitle: "Butuh Liputan Media untuk Brand Anda?",
    ctaDescription: "Diskusikan topik berita Anda secara gratis dengan tim humas media kami sekarang.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin berkonsultasi mengenai jasa press release media."
  },
  "pkkpr": {
    id: "pkkpr",
    nama: "PKKPR & Kesesuaian Ruang",
    heroBadge: "Tata Ruang · Kesesuaian KKPR",
    heroTitle: "Jasa Pengurusan PKKPR Tata Ruang.",
    heroDescription: "Urus Persetujuan Kesesuaian Kegiatan Pemanfaatan Ruang (PKKPR) — sebelumnya izin domisili/tata ruang — di portal OSS RBA secara resmi.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Pengurusan tata ruang PKKPR online",
    heroStats: [
      { icon: "ShieldCheck", value: "Kesesuaian Tata Ruang", label: "Konfirmasi tata ruang resmi" },
      { icon: "Clock", value: "Proses Transparan", label: "Asistensi dokumen peta tata ruang" },
      { icon: "Award", value: "Syarat IMB/PBG", label: "Prasyarat izin bangunan & operasional" }
    ],
    benefitsTitle: "Mengapa PKKPR Sangat Penting?",
    benefitsSubtitle: "Menjamin lokasi usaha Anda sesuai dengan rencana tata ruang wilayah resmi",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Legalitas Lokasi Sah",
        desc: "Menghindari risiko sanksi penyegelan atau penghentian aktivitas bisnis akibat ketidaksesuaian tata ruang tata kota."
      },
      {
        icon: "Award",
        title: "Syarat Mendirikan Bangunan (PBG)",
        desc: "PKKPR merupakan dokumen wajib pertama yang harus diterbitkan sebelum Anda dapat mengajukan PBG (IMB) gedung usaha."
      },
      {
        icon: "TrendingUp",
        title: "Keamanan Investasi Jangka Panjang",
        desc: "Memastikan proyek investasi Anda aman dari sengketa pemanfaatan wilayah atau penggusuran zonasi pemerintah."
      }
    ],
    pricingTitle: "Paket Pengurusan PKKPR",
    pricingSubtitle: "Asistensi analisis koordinat & submit KKPR OSS",
    pricingPackages: [
      {
        title: "PENGURUSAN PKKPR NON-UMK",
        price: "Rp 3.499.000",
        strikePrice: "Rp 5.500.000",
        subLabel: "ANALOGI PETA & KORDINAT SHP",
        buttonText: "Daftar PKKPR",
        buttonLink: "Halo EasyLegal, saya ingin mengurus PKKPR.",
        groups: [
          {
            title: "LAYANAN INTEGRAL",
            items: [
              { text: "Pengecekan kesesuaian koordinat dengan RDTR", checked: true },
              { text: "Pembuatan file poligon koordinat (Format SHP)", checked: true },
              { text: "Pengajuan resmi melalui portal OSS RBA", checked: true },
              { text: "Monitoring s.d. SPS & PKKPR disetujui Kemen-ATR", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Apa beda KKPR untuk UMK dan Non-UMK?",
        a: "KKPR UMK terbit otomatis berupa pernyataan mandiri pada sistem OSS. KKPR Non-UMK memerlukan proses verifikasi dan analisis teknis tata ruang oleh Dinas Pekerjaan Umum/Bappeda dan ATR/BPN."
      },
      {
        q: "Apa saja dokumen yang harus disiapkan?",
        a: "Sertifikat tanah lokasi, koordinat lokasi (polygon SHP), rencana pembangunan gedung/kegiatan, dan bukti bayar PBB tahun berjalan."
      }
    ],
    ctaTitle: "Mengalami Kendala Tata Ruang di OSS?",
    ctaDescription: "Diskusikan peta koordinat dan rencana lokasi bisnis Anda dengan tim surveyor tata ruang kami.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin berkonsultasi mengenai pengurusan PKKPR."
  },
  "pelaporan-lkpm": {
    id: "pelaporan-lkpm",
    nama: "Pelaporan LKPM",
    heroBadge: "BKPM · Pelaporan LKPM",
    heroTitle: "Jasa Pelaporan LKPM Online Berkala.",
    heroDescription: "Urus pelaporan Laporan Kegiatan Penanaman Modal (LKPM) untuk PT lokal maupun PMA Anda ke BKPM secara berkala, aman, & bebas sanksi pencabutan izin.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Layanan LKPM Online",
    heroStats: [
      { icon: "ShieldCheck", value: "Bebas Sanksi", label: "Aman dari pembekuan izin OSS" },
      { icon: "Clock", value: "Tiap Kuartal / Semester", label: "Laporan rutin tertib" },
      { icon: "Award", value: "BKPM Valid", label: "Status kepatuhan investasi hijau" }
    ],
    benefitsTitle: "Pentingnya Pelaporan LKPM secara Rutin",
    benefitsSubtitle: "Menjaga keaktifan izin usaha PT & PMA Anda di Indonesia",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Menghindari Pembekuan NIB",
        desc: "Perusahaan yang mangkir lapor LKPM sebanyak 3 kali berturut-turut akan dikenakan sanksi pembekuan hingga pencabutan NIB secara otomatis."
      },
      {
        icon: "Award",
        title: "Syarat Pengajuan Izin Lanjutan",
        desc: "Kepatuhan lapor LKPM menjadi tolok ukur dan syarat mutlak bagi BKPM untuk menyetujui izin operasional lanjutan."
      },
      {
        icon: "TrendingUp",
        title: "Akurasi Realisasi Investasi",
        desc: "Membantu perusahaan mencatatkan realisasi modal, penyerapan tenaga kerja lokal/asing, & sumbangsih pembangunan daerah."
      }
    ],
    pricingTitle: "Paket Jasa Pelaporan LKPM",
    pricingSubtitle: "Biaya pelaporan LKPM per periode laporan",
    pricingPackages: [
      {
        title: "LAPORAN LKPM PT LOKAL",
        price: "Rp 1.199.000",
        subLabel: "PER SEMESTER (TAHAPAN USAHA)",
        buttonText: "Pilih Jasa Lapor",
        buttonLink: "Halo EasyLegal, saya ingin melaporkan LKPM PT Lokal.",
        groups: [
          {
            title: "YANG KAMI KERJAKAN",
            items: [
              { text: "Analisis data realisasi modal & pengeluaran", checked: true },
              { text: "Penyusunan & input laporan ke portal LKPM BKPM", checked: true },
              { text: "Submit & penyelesaian jika ada perbaikan/penolakan", checked: true }
            ]
          }
        ]
      },
      {
        title: "LAPORAN LKPM PT PMA",
        price: "Rp 1.999.000",
        isPopular: true,
        badgeText: "TERLARIS",
        subLabel: "PER KUARTAL (3 BULAN SEKALI)",
        buttonText: "Pilih Jasa Lapor PMA",
        buttonLink: "Halo EasyLegal, saya ingin melaporkan LKPM PT PMA.",
        groups: [
          {
            title: "PROSES PREMIUM",
            items: [
              { text: "Rekapitulasi nilai investasi asing (dolar/rupiah)", checked: true },
              { text: "Sinkronisasi laporan dengan RPTKA & ketenagakerjaan", checked: true },
              { text: "Asistensi konsultasi LKPM all-in s.d. disetujui", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Kapan periode wajib pelaporan LKPM?",
        a: "Untuk usaha skala Mikro & Kecil wajib melapor tiap 6 bulan (Semester). Untuk usaha Menengah & Besar (termasuk PMA) wajib melapor setiap 3 bulan (Kuartal)."
      },
      {
        q: "Apa saja data yang harus dilaporkan dalam LKPM?",
        a: "Pembelian tanah/gedung, mesin/peralatan, pengeluaran modal kerja operasional, penyerapan tenaga kerja, dan hambatan realisasi investasi."
      }
    ],
    ctaTitle: "Sudah Waktunya Lapor LKPM Usaha Anda?",
    ctaDescription: "Jangan tunggu hingga mendapat surat peringatan pembekuan dari BKPM. Serahkan pelaporannya kepada kami.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin dibantu pelaporan LKPM."
  },
  "perjanjian-perkawinan": {
    id: "perjanjian-perkawinan",
    nama: "Perjanjian Perkawinan",
    heroBadge: "Hukum Keluarga · Prenup & Postnup",
    heroTitle: "Jasa Perjanjian Pisah Harta Resmi Notaris.",
    heroDescription: "Buat perjanjian perkawinan pisah harta (Prenuptial/Postnuptial Agreement) secara sah di hadapan Notaris dan terdaftar resmi di Dukcapil.",
    heroImage: "/cerita-kami-team.webp",
    heroImageAlt: "Penyusunan akta notaris pisah harta",
    heroStats: [
      { icon: "ShieldCheck", value: "Notaris & Dukcapil", label: "Tercatat secara hukum negara" },
      { icon: "Clock", value: "3-5 Hari", label: "Proses akta cepat" },
      { icon: "Award", value: "Proteksi Aset", label: "Menghindari risiko utang pasangan" }
    ],
    benefitsTitle: "Manfaat Perjanjian Pisah Harta",
    benefitsSubtitle: "Mengapa Anda & pasangan perlu membuat perjanjian perkawinan?",
    benefits: [
      {
        icon: "ShieldCheck",
        title: "Perlindungan Aset Pribadi",
        desc: "Harta yang diperoleh masing-masing sebelum & selama pernikahan tetap menjadi hak milik pribadi, bukan harta bersama."
      },
      {
        icon: "Award",
        title: "Bebas dari Risiko Utang Pasangan",
        desc: "Jika salah satu pihak mengalami kebangkrutan bisnis atau utang macet, aset pihak lainnya dijamin aman dari penyitaan."
      },
      {
        icon: "TrendingUp",
        title: "Bisa Memiliki Hak Milik WNI",
        desc: "Khusus untuk pernikahan campur (WNI & WNA), agar WNI tetap dapat memiliki tanah Hak Milik di Indonesia tanpa kendala."
      }
    ],
    pricingTitle: "Paket Perjanjian Perkawinan",
    pricingSubtitle: "Biaya jasa Notaris & pendaftaran Dukcapil all-in",
    pricingPackages: [
      {
        title: "PRENUPTIAL AGREEMENT",
        price: "Rp 3.499.000",
        strikePrice: "Rp 5.500.000",
        subLabel: "SEBELUM PERNIKAHAN LANGSUNG",
        buttonText: "Pilih Prenup",
        buttonLink: "Halo EasyLegal, saya ingin membuat Prenuptial Agreement.",
        groups: [
          {
            title: "LAYANAN ALL-IN",
            items: [
              { text: "Konsultasi hukum keluarga & draf isi perjanjian", checked: true },
              { text: "Penandatanganan Akta Notaris Resmi", checked: true },
              { text: "Pendaftaran akta ke KUA atau Dukcapil setempat", checked: true }
            ]
          }
        ]
      },
      {
        title: "POSTNUPTIAL AGREEMENT",
        price: "Rp 4.999.000",
        strikePrice: "Rp 7.500.000",
        isPopular: true,
        badgeText: "TERLARIS",
        subLabel: "SETELAH PERNIKAHAN BERJALAN",
        buttonText: "Pilih Postnup",
        buttonLink: "Halo EasyLegal, saya ingin membuat Postnuptial Agreement.",
        groups: [
          {
            title: "PROSES HUKUM LENGKAP",
            items: [
              { text: "Analisis aset & drafting pasal postnup", checked: true },
              { text: "Akta Notaris Perjanjian Perkawinan", checked: true },
              { text: "Pemberitahuan & pencatatan resmi ke Dukcapil", checked: true }
            ]
          }
        ]
      }
    ],
    faqs: [
      {
        q: "Apakah Perjanjian Perkawinan bisa dibuat setelah menikah?",
        a: "Bisa. Berdasarkan Putusan MK No. 69/PUU-XIII/2015, perjanjian perkawinan (Postnuptial) dapat dibuat dan disahkan setelah pernikahan berlangsung."
      },
      {
        q: "Apakah perjanjian pisah harta membatasi nafkah?",
        a: "Tidak. Perjanjian hanya mengatur pemisahan aset, utang, dan kepemilikan. Kewajiban nafkah suami terhadap istri dan anak tetap berjalan sesuai hukum."
      }
    ],
    ctaTitle: "Butuh Perlindungan Aset Keluarga?",
    ctaDescription: "Konsultasikan draf prenuptial atau postnuptial Anda bersama tim hukum keluarga kami.",
    ctaWhatsAppMessage: "Halo EasyLegal, saya ingin berkonsultasi mengenai perjanjian pisah harta."
  },
};

