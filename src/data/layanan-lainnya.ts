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
  "pembubaran-perusahaan": {
    id: "pembubaran-perusahaan",
    nama: "Pembubaran Perusahaan",
    heroBadge: "Jasa Likuidasi · Pembubaran PT / CV",
    heroTitle: "Pembubaran PT & CV secara Resmi & Tuntas.",
    heroDescription: "Urus proses likuidasi, pencabutan status status badan hukum Kemenkumham, pengumuman koran, hingga penutupan NPWP perusahaan secara sah dan berkekuatan hukum.",
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
};
