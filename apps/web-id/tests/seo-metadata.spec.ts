import { expect, test } from "@playwright/test";

const SEO_TEST_CASES = [
  {
    path: "/",
    expectedTitle: "Layanan Hukum & Legalitas Bisnis Terpercaya - EasyLegal",
    expectedDescription:
      "Jasa Pendirian PT, Pendaftaran Merek, NIB & OSS, dan Sertifikasi ISO dengan proses cepat, transparan, dan terpercaya.",
  },
  {
    path: "/layanan/pendirian-badan-usaha",
    expectedTitle: "Jasa Pendirian PT - EasyLegal",
    expectedDescription:
      "Butuh jasa Pendirian PT? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp2 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pendirian-badan-usaha/pt-pma",
    expectedTitle: "Jasa Pendirian PT PMA - EasyLegal",
    expectedDescription:
      "Butuh jasa Pendirian PT PMA? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp8 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pendirian-badan-usaha/pt-perorangan",
    expectedTitle: "Jasa Pendirian PT Perorangan Murah & Cepat - EasyLegal",
    expectedDescription:
      "Butuh jasa Pendirian PT Perorangan? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, legal, dan praktis. Biaya terjangkau mulai dari Rp700 ribuan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pendirian-badan-usaha/cv",
    expectedTitle: "Jasa Pendirian CV - EasyLegal",
    expectedDescription:
      "Butuh Jasa Pendirian CV? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pendirian-badan-usaha/yayasan",
    expectedTitle: "Jasa Pendirian Yayasan - EasyLegal",
    expectedDescription:
      "Butuh jasa Pendirian Yayasan? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pendirian-badan-usaha/perkumpulan",
    expectedTitle: "Jasa Pendirian Perkumpulan / Komunitas - EasyLegal",
    expectedDescription:
      "Butuh jasa Pendirian Perkumpulan atau Komunitas? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pendirian-badan-usaha/firma",
    expectedTitle: "Jasa Pendirian Firma - EasyLegal",
    expectedDescription:
      "Butuh jasa Pendirian Firma? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pendirian-badan-usaha/koperasi",
    expectedTitle: "Jasa Pendirian Koperasi - EasyLegal",
    expectedDescription:
      "Butuh jasa Pendirian Koperasi? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pembubaran-perusahaan",
    expectedTitle: "Jasa Pembubaran Perusahaan - EasyLegal",
    expectedDescription:
      "Butuh jasa Pembubaran Perusahaan? EasyLegal siap bantu proses likuidasi dengan cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/nib-oss",
    expectedTitle: "Jasa Pengurusan NIB & OSS - EasyLegal",
    expectedDescription:
      "Butuh jasa Pengurusan NIB & OSS? EasyLegal siap bantu proses perizinan usaha Anda dengan cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai Rp400 ribuan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pengajuan-pkp",
    expectedTitle: "Jasa Pengurusan PKP - EasyLegal",
    expectedDescription:
      "Butuh jasa Pengurusan PKP? EasyLegal siap bantu prosesnya dengan cepat dan bergaransi. Biaya terjangkau mulai Rp1 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pengurusan-pse",
    expectedTitle: "Jasa Pengurusan Izin PSE - EasyLegal",
    expectedDescription:
      "Butuh jasa pengurusan izin PSE? EasyLegal siap bantu pendaftaran sistem elektronik Anda dengan cepat, resmi, dan anti blokir mulai Rp1 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pkkpr",
    expectedTitle: "Jasa Pengurusan PKKPR - EasyLegal",
    expectedDescription:
      "Butuh jasa pengurusan PKKPR? EasyLegal siap bantu perizinan kesesuaian ruang bisnis Anda dengan cepat, resmi, dan aman mulai Rp2 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pelaporan-lkpm",
    expectedTitle: "Jasa Pelaporan LKPM - EasyLegal",
    expectedDescription:
      "Butuh jasa pelaporan LKPM? EasyLegal siap bantu kelola laporan kegiatan penanaman modal Anda tepat waktu dan bebas sanksi mulai Rp1 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/perubahan-akta",
    expectedTitle: "Jasa Perubahan Akta Perusahaan PT dan CV - EasyLegal",
    expectedDescription:
      "Butuh jasa perubahan akta perusahaan? EasyLegal siap bantu prosesnya sampai tuntas, resmi, dan tanpa ribet. Biaya Terjangkau mulai Rp4 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/kontrak-bisnis",
    expectedTitle: "Jasa Pembuatan & Review Kontrak Bisnis - EasyLegal",
    expectedDescription:
      "Butuh jasa buat atau review kontrak bisnis? EasyLegal siap bantu drafting NDA, MoU, PKS, & SPK oleh praktisi hukum berpengalaman. Biaya terjangkau mulai dari Rp2 jutaan. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/merek-haki",
    expectedTitle: "Jasa Pendaftaran Merek, Paten, dan Hak Cipta - EasyLegal",
    expectedDescription:
      "Butuh jasa pendaftaran Merek, Paten, Desain Industri, dan Hak Cipta? EasyLegal siap bantu lindungi aset HKI & Desain Industri Anda. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/apostille",
    expectedTitle: "Jasa Legalitas Dokumen Apostille - EasyLegal",
    expectedDescription:
      "Butuh jasa legalitas dokumen Apostille? Dapatkan layanan Apostille murah, cepat, dan 100% online yang aman & terpercaya di EasyLegal mulai 1 jutaan. Hubungi kami untuk konsultasi!",
  },
  {
    path: "/layanan/visa-kitas",
    expectedTitle: "Jasa Pengurusan Visa & KITAS - EasyLegal",
    expectedDescription:
      "Butuh jasa pengurusan Visa & KITAS? EasyLegal siap bantu prosesnya dengan cepat, lengkap, dan 100% sesuai regulasi pemerintah. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/perjanjian-perkawinan",
    expectedTitle: "Jasa Pengurusan Perjanjian Pra Nikah & Pisah Harta - EasyLegal",
    expectedDescription:
      "Butuh jasa pengurusan perjanjian pra nikah dan pisah harta? EasyLegal siap bantu buat kesepakatan resmi, aman, dan tanpa ribet. Konsultasi gratis sekarang!",
  },
  {
    path: "/layanan/pelaporan-rups",
    expectedTitle: "Jasa Pengurusan Laporan RUPS Tahunan & Luar Biasa - EasyLegal",
    expectedDescription:
      "Butuh jasa pengurusan laporan RUPS Tahunan & Luar Biasa? EasyLegal siap bantu kelola kewajiban hukum perusahaan Anda dengan cepat, resmi, dan rapi. Konsultasi gratis sekarang!",
  },
];

for (const testCase of SEO_TEST_CASES) {
  test(`${testCase.path} renders expected title and meta description`, async ({
    page,
  }) => {
    await page.goto(testCase.path, { waitUntil: "domcontentloaded" });

    await expect(page).toHaveTitle(testCase.expectedTitle);

    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      testCase.expectedDescription,
    );
  });
}
