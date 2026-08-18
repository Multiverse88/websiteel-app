import React from "react";
import { getWhatsAppLink } from "@/lib/config";
import type { BadanUsahaContent } from "./layanan-badan-usaha";

export const dataPembubaran: BadanUsahaContent = {
  id: "pembubaran-perusahaan",
  nama: "Pembubaran PT & CV",
  namaFormal: "Likuidasi Perusahaan",

  heroBreadcrumbText: "Pembubaran Perusahaan",
  heroBadge: "Jasa Likuidasi",
  heroTitle: (
    <>
      Pembubaran PT & CV secara <span className="text-[#990202]">Resmi</span> & <span className="text-[#990202]">Tuntas</span>.
    </>
  ),
  heroDescription:
    "Urus proses likuidasi, pencabutan status badan hukum Kemenkumham, pengumuman koran, hingga penutupan NPWP perusahaan secara sah dan berkekuatan hukum.",
  heroImage: "/cerita-kami-team.webp",
  heroImageAlt: "Proses pembubaran perusahaan resmi",
  heroStats: [
    { icon: "ShieldCheck", value: "Likuidasi Sah", label: "Pencabutan status AHU resmi" },
    { icon: "Clock", value: "Proses Teratur", label: "Sesuai undang-undang perseroan" },
    { icon: "Upload", value: "Bebas Masalah", label: "Tutup NPWP & pajak tertib" }
  ],
  heroFloatingCard: [
    { title: "Dasar Hukum", subtitle: "UU No. 40 Tahun 2007", position: "top-10 -right-8" },
    { title: "Kemenkumham", subtitle: "Pencabutan Status Resmi", position: "-bottom-10 -left-6" }
  ],

  pengertianTag: "PENGERTIAN PEMBUBARAN",
  pengertianTitle: "Apa itu Pembubaran Perusahaan (Likuidasi)?",
  pengertianIntro:
    "Pembubaran perusahaan (likuidasi) adalah proses pengakhiran eksistensi suatu perusahaan secara hukum, yang meliputi penyelesaian seluruh aset, kewajiban, dan utang-piutang perusahaan kepada pihak ketiga, hingga status badan hukumnya resmi dicabut oleh negara.",
  pengertianImage: "/images/layanan/pt-3.jpg",
  pengertianImageAlt: "Penutupan perusahaan",
  hukumIcon: "Scale",
  hukumIconBg: "bg-red-50",
  hukumIconColor: "text-red-700",
  hukumTitle: "Landasan Hukum Pembubaran PT",
  hukumLaw: "UU No. 40 Tahun 2007 (UUPT) Bab X Bagian Kesatu, Pasal 142 tentang Pembubaran, Likuidasi, dan Berakhirnya Status Badan Hukum Perseroan.",
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
    }
  ],

  pricingTag: "PAKET LIKUIDASI",
  pricingTitle: <>Pilih paket pembubaran perusahaan<br />sesuai kebutuhan.</>,
  pricingSubtitle: "Pilihan paket pengurusan likuidasi PT & CV all-in.",
  pricingPackages: [
    {
      title: "PEMBUBARAN CV",
      price: "Rp 7.500.000",
      subLabel: "LIKUIDASI & PUBLIKASI RESMI",
      buttonText: "Pilih Pembubaran CV",
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai pembubaran CV."),
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
      buttonLink: getWhatsAppLink("Halo EasyLegal, saya ingin konsultasi mengenai pembubaran PT."),
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
  pricingFootnotes: [
    { text: "Biaya belum termasuk penyelesaian utang pajak dan tagihan pihak ketiga." }
  ],

  stepsTag: "ALUR KERJA",
  stepsTitle: <>Proses mudah dan transparan<br/>dari awal hingga akhir</>,
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

  faqTitle: "Pertanyaan Seputar Pembubaran",
  faqs: [
    {
      q: "Berapa lama proses pembubaran PT?",
      a: "Proses likuidasi dan pembubaran PT memerlukan waktu sekitar 4 hingga 6 bulan karena adanya kewajiban masa tunggu klaim kreditur (minimal 60 hari) setelah pengumuman koran."
    },
    {
      q: "Apakah utang piutang langsung hilang saat dibubarkan?",
      a: "Tidak. Seluruh utang piutang dan kewajiban perusahaan harus dibereskan terlebih dahulu oleh Likuidator menggunakan aset perseroan sebelum status badan hukum resmi dihapus."
    }
  ],

  ctaTitle: "Butuh Konsultasi Pembubaran Usaha?",
  ctaHighlight: "Konsultasi Pembubaran",
  ctaDescription: "Diskusikan situasi perusahaan Anda bersama tim konsultan hukum kami untuk solusi likuidasi terbaik tanpa membebani di masa depan.",
  ctaWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi mengenai pembubaran perusahaan."
};
