import type { Metadata } from "next";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan | EasyLegal",
  description:
    "Syarat dan ketentuan penggunaan layanan EasyLegal — hak, kewajiban, dan ketentuan yang berlaku.",
  alternates: { canonical: `${config.baseUrl}/syarat-ketentuan` },
  openGraph: {
    title: "Syarat & Ketentuan | EasyLegal",
    description: "Syarat dan ketentuan layanan EasyLegal.",
    url: `${config.baseUrl}/syarat-ketentuan`,
    siteName: "EasyLegal",
  },
};

const sections = [
  {
    title: "1. Penerimaan Syarat",
    content: `Dengan mengakses atau menggunakan website easylegal.my.id dan layanan yang tersedia, Anda menyetujui untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak menyetujui salah satu ketentuan ini, mohon untuk tidak menggunakan layanan kami.`,
  },
  {
    title: "2. Deskripsi Layanan",
    content: `EasyLegal menyediakan platform digital untuk layanan legalitas bisnis di Indonesia, termasuk namun tidak terbatas pada:\n\n• Pendirian badan usaha (PT, CV, PT PMA, Yayasan, Koperasi, Persekutuan Perdata)\n• Pendaftaran merek dan HAKI\n• Pengurusan NIB & OSS\n• Pengajuan PKP\n• Pelaporan LKPM\n• Sertifikasi ISO\n• Visa & KITAS\n• Press Release & PR Media\n• Virtual Office\n• Apostille & legalisasi dokumen\n\nLayanan kami meliputi konsultasi, pengurusan dokumen, dan pendampingan proses hukum oleh mitra konsultan bersertifikat.`,
  },
  {
    title: "3. Harga dan Pembayaran",
    content: `• Harga yang tercantum di website sudah termasuk biaya jasa kecuali disebutkan lain secara eksplisit.\n• Biaya pemerintah (negotiate fee, PNBP, dll) ditanggung klien dan akan diinformasikan di awal konsultasi.\n• Pembayaran dapat dilakukan melalui transfer bank, kartu kredit, atau payment gateway yang tersedia.\n• Pembayaran harus dilunasi sebelum proses layanan dimulai, kecuali ada perjanjian khusus secara tertulis.\n• Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya untuk layanan baru.`,
  },
  {
    title: "4. Proses dan Timeline",
    content: `• Timeline yang disebutkan adalah estimasi hari kerja sejak seluruh dokumen dan pembayaran diterima.\n• Keterlambatan dari pihak pemerintah atau force majeure dapat memperpanjang timeline di luar kendali kami.\n• Kami akan memberikan update status secara berkala melalui WhatsApp atau email.\n• Klien wajib merespons permintaan dokumen atau informasi tambahan dalam waktu 7 hari kerja agar proses tidak terhambat.`,
  },
  {
    title: "5. Pembatalan dan Refund",
    content: `• Pembatalan sebelum dokumen diajukan ke instansi pemerintah: pengembalian dana penuh minus biaya konsultasi Rp 500.000.\n• Pembatalan setelah dokumen diajukan: tidak dapat dikembalikan karena biaya pemerintah sudah dikeluarkan.\n• Refund akan diproses dalam 7-14 hari kerja setelah pembatalan disetujui.\n• EasyLegal berhak membatalkan layanan dan mengembalikan dana secara penuh jika terjadi kesalahan teknis atau force majeure.`,
  },
  {
    title: "6. Kewajiban Klien",
    content: `• Klien wajib memberikan informasi dan dokumen yang akurat, lengkap, dan valid.\n• EasyLegal tidak bertanggung jawab atas keterlambatan atau kegagalan layanan akibat dokumen atau informasi yang tidak lengkap/tidak benar.\n• Klien bertanggung jawab untuk menjaga kerahasiaan akun dan kredensial yang diberikan.\n• Klien tidak diperkenankan menyalahgunakan layanan kami untuk tujuan yang melanggar hukum.`,
  },
  {
    title: "7. Hak Kekayaan Intelektual",
    content: `• Semua konten di website easylegal.my.id (teks, logo, grafik, desain) adalah milik EasyLegal dan dilindungi undang-undang.\n• Klien tidak diperkenankan menyalin, mendistribusikan, atau menggunakan konten kami tanpa izin tertulis.\n• Dokumen legal yang dihasilkan atas nama klien menjadi milik klien setelah layanan selesai.`,
  },
  {
    title: "8. Batasan Tanggung Jawab",
    content: `• EasyLegal bertindak sebagai perantara dan konsultan, bukan pengacara yang mewakili klien di pengadilan.\n• Keputusan akhir dari instansi pemerintah (persetujuan/p penolakan) berada di luar kendali kami.\n• EasyLegal tidak bertanggung jawab atas kerugian tidak langsung, kehilangan profit, atau kerugian akibat penggunaan layanan.\n• Tanggung jawab kami terbatas pada nilai layanan yang dibayarkan oleh klien.`,
  },
  {
    title: "9. Force Majeure",
    content: `• EasyLegal tidak bertanggung jawab atas kegagalan layanan akibat kejadian di luar kendali, termasuk namun tidak terbatas pada: bencana alam, wabah, kebijakan pemerintah, gangguan internet, atau kebakaran.\n• Dalam hal force majeure, timeline layanan akan ditangguhkan hingga keadaan kembali normal.`,
  },
  {
    title: "10. Penyelesaian Sengketa",
    content: `• Segala sengketa yang timbul akan diselesaikan secara musyawarah dan kekeluargaan terlebih dahulu.\n• Jika musyawarah tidak menghasilkan kesepakatan, sengketa akan diselesaikan di pengadilan negeri Bandung dengan hukum Republik Indonesia.`,
  },
  {
    title: "11. Perubahan Ketentuan",
    content: `• EasyLegal berhak mengubah Syarat & Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya.\n• Penggunaan layanan setelah perubahan dianggap sebagai penerimaan atas ketentuan terbaru.\n• Versi terbaru Syarat & Ketentuan selalu tersedia di halaman ini.`,
  },
  {
    title: "12. Hubungi Kami",
    content: `Jika Anda memiliki pertanyaan terkait Syarat & Ketentuan ini, silakan hubungi kami:\n\n**PT EasyLegal**\nEmail: ${config.company.email}\nWhatsApp: ${config.company.whatsapp}\nBandung | Jakarta Selatan | Bekasi`,
  },
];

export default function SyaratKetentuanPage() {
  return (
    <main className="min-h-screen bg-white pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-[42px] font-extrabold text-gray-950 tracking-tight leading-tight mb-4">
          Syarat & Ketentuan
        </h1>
        <p className="text-[13px] sm:text-sm text-gray-400 mb-10">
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
