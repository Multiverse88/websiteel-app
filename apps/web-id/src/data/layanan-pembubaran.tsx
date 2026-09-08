import React from "react";
import { getWhatsAppLink } from "@/lib/config";
import type { BadanUsahaContent } from "./layanan-badan-usaha";

export const dataPembubaran: BadanUsahaContent = {
  id: "pembubaran-perusahaan",
  nama: "Pembubaran PT & CV",
  namaFormal: "Likuidasi Perusahaan",

  heroBreadcrumbText: "Pembubaran Perusahaan",
  heroBadge: "Pembubaran Perusahaan",
  heroTitle: [
    { text: "Bubarkan bisnis Anda yang tidak terurus " },
    { break: true },
    { text: "melalui " },
    { text: "Jasa Pembubaran Perusahaan", highlight: true },
  ],
  heroDescription:
    "Bila bisnis tidak berjalan lancar dan Anda berpikir untuk selesai, penting untuk melakukan pembubaran perusahaan agar terhindar dari hal yang tidak diinginkan seperti pajak yang tetap berjalan.",
  heroImage: "/cerita-kami-team.webp",
  heroImageAlt: "Proses pembubaran perusahaan resmi",
  heroStats: [
    { icon: "ShieldCheck", value: "Likuidasi Sah", label: "Pencabutan status AHU resmi" },
    { icon: "Clock", value: "Proses Teratur", label: "Sesuai undang-undang perseroan" },
    { icon: "Upload", value: "Bebas Masalah", label: "Tutup NPWP & pajak tertib" }
  ],
  floatingBadges: [
    { 
      icon: "Scale", iconBg: "bg-red-50", iconColor: "text-red-700",
      title: "Dasar Hukum", subtitle: "UU No. 40 Tahun 2007", position: "top-10 -right-8" 
    },
    { 
      icon: "ShieldCheck", iconBg: "bg-red-50", iconColor: "text-red-700",
      title: "Kemenkumham", subtitle: "Pencabutan Status Resmi", position: "-bottom-10 -left-6" 
    }
  ],

  pengertianTag: "PENGERTIAN PEMBUBARAN",
  pengertianTitle: "Apa itu Pembubaran Perusahaan (Likuidasi)?",
  pengertianIntro:
    "Pembubaran perusahaan (likuidasi) adalah proses pengakhiran eksistensi suatu perusahaan secara hukum, yang meliputi penyelesaian seluruh aset, kewajiban, dan utang-piutang perusahaan kepada pihak ketiga, hingga status badan hukumnya resmi dicabut oleh negara.",
  pengertianImage: "/images/layanan/pt-2.jpg",
  pengertianImageAlt: "Penutupan perusahaan",
  hukumIcon: "Scale",
  hukumIconBg: "bg-red-50",
  hukumIconColor: "text-red-700",
  hukumTitle: "Landasan Hukum Pembubaran PT",
  hukumLaw: "Pasal 142 UU No. 40 Tahun 2007",
  pengertianDetail: (
    <>
      <p className="text-gray-600 mb-4 text-justify">
        Banyak pengusaha mengira bahwa perusahaan yang tidak lagi beroperasi otomatis akan mati dengan sendirinya. Faktanya, <strong>selama status badan hukum belum dicabut</strong> dan <strong>NPWP belum ditutup</strong>, perusahaan masih dianggap aktif oleh negara dan <strong>tetap diwajibkan lapor pajak bulanan/tahunan</strong>. Jika diabaikan, hal ini akan menimbulkan denda administratif yang terus membengkak dan bisa membebani direksi/pengurus secara pribadi.
      </p>
    </>
  ),
  karakteristik: [
    { bold: "Penyelesaian Aset:", text: "Seluruh harta kekayaan dicairkan untuk membayar utang." },
    { bold: "Kewajiban Pajak:", text: "Menutup kewajiban perpajakan agar tidak ada tagihan di masa depan." },
    { bold: "Status Badan Hukum:", text: "Dihapus secara resmi dari daftar Kemenkumham." }
  ],

  manfaatTag: "ALASAN PEMBUBARAN",
  manfaatTitle: "Mengapa Perlu Pembubaran Resmi?",
  manfaatItems: [
    {
      title: "Bebas Tuntutan Hukum",
      desc: "Pembubaran yang sah secara hukum (melalui RUPS & likuidator) membebaskan organ direksi dari tanggung jawab pribadi di kemudian hari.",
      Icon: "ShieldCheck"
    },
    {
      title: "Penutupan NPWP Pajak",
      desc: "Menghindari denda pajak dan kewajiban pelaporan SPT tahunan badan yang terus berjalan jika perusahaan tidak ditutup resmi.",
      Icon: "Check"
    },
    {
      title: "Kepastian Kreditur",
      desc: "Proses pengumuman koran memastikan hak dan kewajiban dengan pihak ketiga/kreditur diselesaikan secara tertib.",
      Icon: "Star"
    },
    {
      title: "Pencabutan Legalitas",
      desc: "Perusahaan resmi dihapus dari sistem AHU Kemenkumham, menjamin entitas benar-benar berhenti beroperasi secara legal.",
      Icon: "Target"
    }
  ],

  pricingTag: "PAKET LIKUIDASI",
  pricingTitle: <>Pilih paket pembubaran perusahaan<br />sesuai kebutuhan.</>,
  pricingSubtitle: "Pilihan paket pengurusan likuidasi PT, PT PMA, CV, dan PT Perorangan all-in.",
  pricingPackages: [
    {
      title: "PT PERORANGAN",
      price: "Rp 999.000",
      strikePrice: "Rp 2.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Pembubaran PT Perorangan",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai pembubaran PT Perorangan.", "pembubaran-pt-perorangan"),
      groups: [
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Surat Pernyataan Pembubaran Perseroan", checked: true },
            { text: "Sertifikat Pembubaran Perseroan", checked: true },
            { text: "Pencabutan Izin Usaha & Nonaktif NPWP", checked: true }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "1 Kupon Undian iPhone", checked: true },
            { text: "Gratis Ongkir Pulau Jawa", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "1 Buah Logam Mulia Emas 24K", checked: true },
            { text: "Voucher EasyLegal Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true },
            { text: "Cek Merek senilai Rp 299.000", checked: true }
          ]
        }
      ]
    },
    {
      title: "PEMBUBARAN CV",
      price: "Rp 5.999.000",
      strikePrice: "Rp 12.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Pembubaran CV",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai pembubaran CV.", "ingin-konsultasi-mengenai-pembubaran-cv"),
      groups: [
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Draft Sirkuler RUPS Pembubaran", checked: true },
            { text: "Akta Pembubaran Notaris", checked: true },
            { text: "SK Menteri Pembubaran Kemenkumham", checked: true },
            { text: "Pencabutan Izin Usaha & Nonaktif NPWP", checked: true }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "1 Kupon Undian iPhone", checked: true },
            { text: "Gratis Ongkir Pulau Jawa", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "1 Buah Logam Mulia Emas 24K", checked: true },
            { text: "Voucher EasyLegal Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true },
            { text: "Cek Merek senilai Rp 299.000", checked: true }
          ]
        }
      ]
    },
    {
      title: "PEMBUBARAN PT",
      price: "Rp 9.999.000",
      strikePrice: "Rp 20.000.000",
      isPopular: true,
      badgeText: "TERLARIS",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Pembubaran PT",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai pembubaran PT.", "ingin-konsultasi-mengenai-pembubaran-pt"),
      groups: [
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Draft Sirkuler RUPS Pembubaran", checked: true },
            { text: "Akta Pembubaran Notaris", checked: true },
            { text: "SK Menteri Pembubaran Kemenkumham", checked: true },
            { text: "Pencabutan Izin Usaha & Nonaktif NPWP", checked: true },
            { text: "Pengumuman di Surat Kabar", checked: true }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "1 Kupon Undian iPhone", checked: true },
            { text: "Gratis Ongkir Pulau Jawa", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "1 Buah Logam Mulia Emas 24K", checked: true },
            { text: "Voucher EasyLegal Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true },
            { text: "Cek Merek senilai Rp 299.000", checked: true }
          ]
        }
      ]
    },
    {
      title: "PEMBUBARAN PT PMA",
      price: "Rp 10.999.000",
      strikePrice: "Rp 22.000.000",
      subLabel: "TANPA TAMBAHAN BIAYA APAPUN",
      buttonText: "Pilih Pembubaran PT PMA",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai pembubaran PT PMA.", "pembubaran-pt-pma"),
      groups: [
        {
          title: "YANG DIPEROLEH",
          items: [
            { text: "Draft Sirkuler RUPS Pembubaran", checked: true },
            { text: "Akta Pembubaran Notaris", checked: true },
            { text: "SK Menteri Pembubaran Kemenkumham", checked: true },
            { text: "Pencabutan Izin Usaha & Nonaktif NPWP", checked: true },
            { text: "Pengumuman di Surat Kabar", checked: true }
          ]
        },
        {
          title: "BONUS",
          isBoxed: true,
          items: [
            { text: "Layanan Personal Legal Assistance", checked: true },
            { text: "1 Kupon Undian iPhone", checked: true },
            { text: "Gratis Ongkir Pulau Jawa", checked: true }
          ]
        },
        {
          title: "EXTRA BONUS",
          isBoxed: true,
          items: [
            { text: "1 Buah Logam Mulia Emas 24K", checked: true },
            { text: "Voucher EasyLegal Rp 250.000", checked: true },
            { text: "Dokumen SOP Karyawan & Perusahaan", checked: true },
            { text: "Dokumen Kontrak Bisnis", checked: true },
            { text: "Cek Merek senilai Rp 299.000", checked: true }
          ]
        }
      ]
    }
  ],
  pricingFootnotes: [
    { text: "Biaya belum termasuk penyelesaian utang pajak dan tagihan pihak ketiga." }
  ],

  stepsTag: "ALUR KERJA",
  stepsTitle: "Kami akan mengawal seluruh proses pembubaran perusahaan Anda hingga beres.",
  stepsSubtitle: "Kami mengurus seluruh tahapan pembubaran (likuidasi) secara tertib, mulai dari RUPS, pengumuman koran, hingga pencabutan status di Kemenkumham dan penutupan NPWP.",
  steps: [
    {
      no: "01",
      title: "RUPS Pembubaran",
      duration: "",
      desc: "Mengadakan Rapat Umum Pemegang Saham (RUPS) untuk menyetujui pembubaran dan menunjuk likuidator.",
      points: []
    },
    {
      no: "02",
      title: "Pengumuman Koran Awal",
      duration: "",
      desc: "Likuidator mengumumkan pembubaran dalam Surat Kabar dan Berita Negara Republik Indonesia untuk memberi tahu kreditur.",
      points: []
    },
    {
      no: "03",
      title: "Penyelesaian Aset & Kewajiban",
      duration: "",
      desc: "Masa tunggu klaim dari kreditur, penyelesaian utang-piutang, serta pemberesan harta kekayaan (aset) perusahaan.",
      points: []
    },
    {
      no: "04",
      title: "RUPS Pertanggungjawaban",
      duration: "",
      desc: "RUPS untuk mengesahkan laporan pertanggungjawaban akhir Likuidator atas proses pemberesan.",
      points: []
    },
    {
      no: "05",
      title: "Pencabutan & Pengumuman Akhir",
      duration: "",
      desc: "Pelaporan ke Kemenkumham untuk mencabut status Badan Hukum dan pengumuman akhir di Surat Kabar.",
      points: []
    }
  ],

  testimonialTitle: (
    <>
      Pengalaman mereka yang menggunakan<br className="hidden sm:inline" />{" "}
      <strong className="font-extrabold text-[#D62828]">JASA PEMBUBARAN PERUSAHAAN</strong> kami.
    </>
  ),

  faqTitle: "Pertanyaan Seputar Pembubaran",
  faqs: [
    {
      q: "Mengapa perusahaan yang sudah tidak aktif harus dibubarkan secara resmi?",
      a: "Pembubaran resmi memastikan status perusahaan ditutup sesuai ketentuan, sehingga mengurangi risiko munculnya kewajiban administrasi di kemudian hari.",
    },
    {
      q: "Siapa yang bertugas melakukan proses pembubaran perusahaan?",
      a: "Proses pembubaran dilakukan oleh pengurus atau pihak yang berwenang sesuai bentuk badan usaha, dengan didampingi notaris apabila diperlukan.",
    },
    {
      q: "Tahapan dan dokumen apa saja yang diproses dalam pembubaran perusahaan?",
      a: "Umumnya meliputi keputusan pembubaran, penyusunan akta pembubaran, pengurusan administrasi ke instansi terkait, serta dokumen pendukung sesuai bentuk badan usaha.",
    },
    {
      q: "Berapa lama proses pembubaran perusahaan (PT/CV) hingga tuntas?",
      a: "Proses pembubaran PT atau CV umumnya memerlukan sekitar 30–90 hari kerja, tergantung jenis badan usaha dan tahapan administrasi yang harus diselesaikan.",
    },
  ],

  ctaTitle: "Butuh Konsultasi Pembubaran Usaha?",
  ctaHighlight: "Konsultasi Pembubaran",
  ctaDescription: "Diskusikan situasi perusahaan Anda bersama tim konsultan hukum kami untuk solusi likuidasi terbaik tanpa membebani di masa depan.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pembubaran perusahaan."
};
