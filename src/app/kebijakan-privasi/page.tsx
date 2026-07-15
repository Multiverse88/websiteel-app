import type { Metadata } from "next";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | EasyLegal",
  description:
    "Kebijakan privasi EasyLegal — bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
  alternates: { canonical: `${config.baseUrl}/kebijakan-privasi` },
  openGraph: {
    title: "Kebijakan Privasi | EasyLegal",
    description: "Pelajari bagaimana EasyLegal melindungi data pribadi Anda.",
    url: `${config.baseUrl}/kebijakan-privasi`,
    siteName: "EasyLegal",
  },
};

const sections = [
  {
    title: "1. Informasi yang Kami Kumpulkan",
    content: `Ketika Anda menggunakan layanan EasyLegal, kami dapat mengumpulkan informasi berikut:\n\n• **Informasi identitas:** nama lengkap, alamat email, nomor telepon, dan data identitas lain yang Anda berikan saat mengisi formulir atau melakukan pemesanan.\n• **Informasi bisnis:** nama perusahaan, NIB, NIK direksi, dan dokumen pendukung terkait layanan legal yang Anda pesan.\n• **Data teknis:** alamat IP, jenis perangkat, browser, dan informasi navigasi saat Anda mengakses website kami.\n• **Data transaksi:** riwayat pemesanan, detail pembayaran, dan komunikasi dengan tim kami.`,
  },
  {
    title: "2. Penggunaan Informasi",
    content: `Kami menggunakan informasi yang dikumpulkan untuk:\n\n• Memproses pesanan dan layanan legal yang Anda minta.\n• Menghubungi Anda terkait status pesanan atau informasi tambahan.\n• Mengirimkan pembaruan layanan, bukti pendaftaran, atau dokumen resmi terkait layanan Anda.\n• Meningkatkan kualitas layanan dan pengalaman pengguna di website kami.\n• Memenuhi kewajiban hukum dan regulasi yang berlaku.`,
  },
  {
    title: "3. Penyimpanan dan Keamanan Data",
    content: `• Data Anda disimpan di server yang aman dengan enkripsi standar industri.\n• Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data dari akses tidak sah, kehilangan, atau penyalahgunaan.\n• Dokumen legal yang Anda unggah hanya digunakan untuk keperluan pemrosesan layanan dan tidak dibagikan tanpa persetujuan Anda.\n• Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga.`,
  },
  {
    title: "4. Cookie dan Teknologi Pelacakan",
    content: `Website kami menggunakan cookie untuk:\n\n• Mengingat preferensi dan sesi login Anda.\n• Menganalisis lalu lintas website guna meningkatkan layanan.\n• Menampilkan konten yang relevan dengan kebutuhan Anda.\n\nAnda dapat mengatur cookie melalui browser Anda. Namun, menonaktifkan cookie tertentu mungkin mempengaruhi pengalaman Anda di website.`,
  },
  {
    title: "5. Berbagi Data dengan Pihak Ketiga",
    content: `Kami hanya membagikan data pribadi Anda dalam situasi berikut:\n\n• **Institusi pemerintah:** untuk keperluan pendaftaran legal (misalnya AHU, OSS, Kemenkumham) sesuai layanan yang Anda pesan.\n• **Mitra hukum:** konsultan atau notaris yang terlibat dalam pemrosesan dokumen Anda.\n• **Penyedia layanan teknis:** hosting, email, atau payment gateway yang mendukung operasional kami, dengan perjanjian kerahasiaan ketat.\n\nKami tidak membagikan data Anda untuk tujuan pemasaran pihak ketiga.`,
  },
  {
    title: "6. Hak Anda",
    content: `Anda memiliki hak untuk:\n\n• **Mengakses** data pribadi yang kami miliki tentang Anda.\n• **Memperbaiki** data yang tidak akurat atau tidak lengkap.\n• **Menghapus** data pribadi Anda dari sistem kami (kecuali data yang wajib disimpan berdasarkan hukum).\n• **Menolak** penggunaan data Anda untuk tujuan tertentu.\n• **Menerima salinan** data pribadi Anda dalam format yang dapat dibaca mesin.\n\nUntuk menggunakan hak-hak tersebut, silakan hubungi kami melalui email di ${config.company.email}.`,
  },
  {
    title: "7. Retensi Data",
    content: `• Data transaksi dan dokumen legal disimpan selama 10 tahun sejak layanan selesai, sesuai ketentuan hukum yang berlaku di Indonesia.\n• Data akun disimpan selama akun Anda aktif dan 2 tahun setelah penutupan.\n• Data analitik website disimpan secara anonim dan tidak dapat diidentifikasi.`,
  },
  {
    title: "8. Perubahan Kebijakan",
    content: `Kebijakan ini dapat diperbarui dari waktu ke waktu. Perubahan akan diumumkan di halaman ini dengan tanggal pembaruan terakhir. Kami menyarankan Anda untuk memeriksa halaman ini secara berkala.`,
  },
  {
    title: "9. Hubungi Kami",
    content: `Jika Anda memiliki pertanyaan terkait kebijakan privasi ini, silakan hubungi kami:\n\n**PT EasyLegal**\nEmail: ${config.company.email}\nWhatsApp: ${config.company.whatsapp}\nBandung | Jakarta Selatan | Bekasi`,
  },
];

export default function KebijakanPrivasiPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-extrabold text-gray-950 tracking-tight leading-tight mb-4">
          Kebijakan Privasi
        </h1>
        <p className="text-[14px] sm:text-sm text-gray-400 mb-10">
          Terakhir diperbarui: 29 Juni 2025
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-gray-950 mb-3">
                {section.title}
              </h2>
              <div className="text-[14px] sm:text-[15px] text-gray-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
