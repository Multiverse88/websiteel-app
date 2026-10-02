# Dokumentasi Penerapan SEO Metadata (Title, Description & Sitemap) — easylegal.id

Dokumen ini mencatat seluruh implementasi pemetaan SEO metadata (Title Tag, Meta Description, OpenGraph, dan integrasi Sitemap) berdasarkan workbook SEO untuk aplikasi `apps/web-id` (`https://easylegal.id`).

- **Tanggal Implementasi**: 2 Oktober 2026
- **Target Aplikasi**: `apps/web-id` (`easylegal.id`)
- **Commit Git**: `19cb88a` (`feat(seo): update meta titles and descriptions from workbook for easylegal.id`)
- **Status Verifikasi**: 100% Lolos (22/22 Playwright tests passed, Build passed)

---

## 1. Ringkasan Eksekutif

| Metrik | Nilai | Keterangan |
| :--- | :--- | :--- |
| **Total Baris Workbook** | 23 baris | Data masukan dari spreadsheet SEO |
| **Unique Target URL** | 22 URL | Seluruh URL berhasil dipetakan ke route Next.js |
| **Duplikasi Workbook** | 1 URL | Baris 10 & 17 (`/layanan/pembubaran-perusahaan`) |
| **File Diperbarui** | 13 file | Layout dan page metadata yang sudah ada |
| **File Layout Baru** | 3 file | `layout.tsx` untuk route client-only (`pse`, `pkkpr`, `perubahan-akta`) |
| **File Pengujian Baru** | 1 file | `apps/web-id/tests/seo-metadata.spec.ts` (Playwright E2E) |
| **Status Sitemap** | 22/22 Terdaftar | Semua URL masuk ke dalam generator `sitemap.xml` |

---

## 2. Tabel Pemetaan Lengkap (23 Baris Workbook)

| No | Target URL | File Codebase | Meta Title yang Diterapkan | Meta Description yang Diterapkan | Sitemap Status |
| :-: | :--- | :--- | :--- | :--- | :-: |
| 1 | `/` | `src/app/layout.tsx` | Layanan Hukum & Legalitas Bisnis Terpercaya - EasyLegal | Jasa Pendirian PT, Pendaftaran Merek, NIB & OSS, dan Sertifikasi ISO dengan proses cepat, transparan, dan terpercaya. | Included (`staticPages`, Priority 1.0) |
| 2 | `/layanan/pendirian-badan-usaha` | `src/app/(site)/layanan/pendirian-badan-usaha/page.tsx` | Jasa Pendirian PT - EasyLegal | Butuh jasa Pendirian PT? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp2 jutaan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 3 | `/layanan/pendirian-badan-usaha/pt-pma` | `src/app/(site)/layanan/pendirian-badan-usaha/[jenis]/page.tsx` | Jasa Pendirian PT PMA - EasyLegal | Butuh jasa Pendirian PT PMA? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp8 jutaan. Konsultasi gratis sekarang! | Included (`businessEntitySlugs`) |
| 4 | `/layanan/pendirian-badan-usaha/pt-perorangan` | `src/app/(site)/layanan/pendirian-badan-usaha/[jenis]/page.tsx` | Jasa Pendirian PT Perorangan Murah & Cepat - EasyLegal | Butuh jasa Pendirian PT Perorangan? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, legal, dan praktis. Biaya terjangkau mulai dari Rp700 ribuan. Konsultasi gratis sekarang! | Included (`businessEntitySlugs`) |
| 5 | `/layanan/pendirian-badan-usaha/cv` | `src/app/(site)/layanan/pendirian-badan-usaha/[jenis]/page.tsx` | Jasa Pendirian CV - EasyLegal | Butuh Jasa Pendirian CV? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang! | Included (`businessEntitySlugs`) |
| 6 | `/layanan/pendirian-badan-usaha/yayasan` | `src/app/(site)/layanan/pendirian-badan-usaha/[jenis]/page.tsx` | Jasa Pendirian Yayasan - EasyLegal | Butuh jasa Pendirian Yayasan? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang! | Included (`businessEntitySlugs`) |
| 7 | `/layanan/pendirian-badan-usaha/perkumpulan` | `src/app/(site)/layanan/pendirian-badan-usaha/[jenis]/page.tsx` | Jasa Pendirian Perkumpulan / Komunitas - EasyLegal | Butuh jasa Pendirian Perkumpulan atau Komunitas? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang! | Included (`businessEntitySlugs`) |
| 8 | `/layanan/pendirian-badan-usaha/firma` | `src/app/(site)/layanan/pendirian-badan-usaha/[jenis]/page.tsx` | Jasa Pendirian Firma - EasyLegal | Butuh jasa Pendirian Firma? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang! | Included (`businessEntitySlugs`) |
| 9 | `/layanan/pendirian-badan-usaha/koperasi` | `src/app/(site)/layanan/pendirian-badan-usaha/[jenis]/page.tsx` | Jasa Pendirian Koperasi - EasyLegal | Butuh jasa Pendirian Koperasi? EasyLegal siap bantu prosesnya dengan transparan, aman, cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp3 jutaan. Konsultasi gratis sekarang! | Included (`businessEntitySlugs`) |
| 10 | `/layanan/pembubaran-perusahaan` | `src/app/(site)/layanan/pembubaran-perusahaan/page.tsx` | Jasa Pembubaran Perusahaan - EasyLegal | Butuh jasa Pembubaran Perusahaan? EasyLegal siap bantu proses likuidasi dengan cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai dari Rp1 jutaan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 11 | `/layanan/nib-oss` | `src/app/(site)/layanan/nib-oss/layout.tsx` | Jasa Pengurusan NIB & OSS - EasyLegal | Butuh jasa Pengurusan NIB & OSS? EasyLegal siap bantu proses perizinan usaha Anda dengan cepat, resmi, dan tanpa ribet. Biaya terjangkau mulai Rp400 ribuan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 12 | `/layanan/pengajuan-pkp` | `src/app/(site)/layanan/pengajuan-pkp/layout.tsx` | Jasa Pengurusan PKP - EasyLegal | Butuh jasa Pengurusan PKP? EasyLegal siap bantu prosesnya dengan cepat dan bergaransi. Biaya terjangkau mulai Rp1 jutaan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 13 | `/layanan/pengurusan-pse` | `src/app/(site)/layanan/pengurusan-pse/layout.tsx` *(baru)* | Jasa Pengurusan Izin PSE - EasyLegal | Butuh jasa pengurusan izin PSE? EasyLegal siap bantu pendaftaran sistem elektronik Anda dengan cepat, resmi, dan anti blokir mulai Rp1 jutaan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 14 | `/layanan/pkkpr` | `src/app/(site)/layanan/pkkpr/layout.tsx` *(baru)* | Jasa Pengurusan PKKPR - EasyLegal | Butuh jasa pengurusan PKKPR? EasyLegal siap bantu perizinan kesesuaian ruang bisnis Anda dengan cepat, resmi, dan aman mulai Rp2 jutaan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 15 | `/layanan/pelaporan-lkpm` | `src/app/(site)/layanan/pelaporan-lkpm/layout.tsx` | Jasa Pelaporan LKPM - EasyLegal | Butuh jasa pelaporan LKPM? EasyLegal siap bantu kelola laporan kegiatan penanaman modal Anda tepat waktu dan bebas sanksi mulai Rp1 jutaan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 16 | `/layanan/perubahan-akta` | `src/app/(site)/layanan/perubahan-akta/layout.tsx` *(baru)* | Jasa Perubahan Akta Perusahaan PT dan CV - EasyLegal | Butuh jasa perubahan akta perusahaan? EasyLegal siap bantu prosesnya sampai tuntas, resmi, dan tanpa ribet. Biaya Terjangkau mulai Rp4 jutaan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 17 | `/layanan/pembubaran-perusahaan` | `src/app/(site)/layanan/pembubaran-perusahaan/page.tsx` | *(Duplikat baris 10)* | *(Duplikat baris 10)* | Included (sama dengan baris 10) |
| 18 | `/layanan/kontrak-bisnis` | `src/app/(site)/layanan/kontrak-bisnis/layout.tsx` | Jasa Pembuatan & Review Kontrak Bisnis - EasyLegal | Butuh jasa buat atau review kontrak bisnis? EasyLegal siap bantu drafting NDA, MoU, PKS, & SPK oleh praktisi hukum berpengalaman. Biaya terjangkau mulai dari Rp2 jutaan. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 19 | `/layanan/merek-haki` | `src/app/(site)/layanan/merek-haki/layout.tsx` | Jasa Pendaftaran Merek, Paten, dan Hak Cipta - EasyLegal | Butuh jasa pendaftaran Merek, Paten, Desain Industri, dan Hak Cipta? EasyLegal siap bantu lindungi aset HKI & Desain Industri Anda. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 20 | `/layanan/apostille` | `src/app/(site)/layanan/apostille/layout.tsx` | Jasa Legalitas Dokumen Apostille - EasyLegal | Butuh jasa legalitas dokumen Apostille? Dapatkan layanan Apostille murah, cepat, dan 100% online yang aman & terpercaya di EasyLegal mulai 1 jutaan. Hubungi kami untuk konsultasi! | Included (`standaloneServiceSlugs`) |
| 21 | `/layanan/visa-kitas` | `src/app/(site)/layanan/visa-kitas/layout.tsx` | Jasa Pengurusan Visa & KITAS - EasyLegal | Butuh jasa pengurusan Visa & KITAS? EasyLegal siap bantu prosesnya dengan cepat, lengkap, dan 100% sesuai regulasi pemerintah. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 22 | `/layanan/perjanjian-perkawinan` | `src/app/(site)/layanan/perjanjian-perkawinan/layout.tsx` | Jasa Pengurusan Perjanjian Pra Nikah & Pisah Harta - EasyLegal | Butuh jasa pengurusan perjanjian pra nikah dan pisah harta? EasyLegal siap bantu buat kesepakatan resmi, aman, dan tanpa ribet. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |
| 23 | `/layanan/pelaporan-rups` | `src/app/(site)/layanan/pelaporan-rups/layout.tsx` | Jasa Pengurusan Laporan RUPS Tahunan & Luar Biasa - EasyLegal | Butuh jasa pengurusan laporan RUPS Tahunan & Luar Biasa? EasyLegal siap bantu kelola kewajiban hukum perusahaan Anda dengan cepat, resmi, dan rapi. Konsultasi gratis sekarang! | Included (`standaloneServiceSlugs`) |

---

## 3. Detail Implementasi Teknis

### A. Pola `title: { absolute: "..." }`
`RootLayout` di `apps/web-id/src/app/layout.tsx` memiliki konfigurasi template default:
```ts
title: {
  default: "Layanan Hukum & Legalitas Bisnis Terpercaya - EasyLegal",
  template: "%s | EasyLegal",
}
```
Jika halaman turunan memberikan string biasa yang sudah memuat akhiran `- EasyLegal`, Next.js akan menggabungkannya dengan template sehingga menghasilkan duplikasi:
`... - EasyLegal | EasyLegal`.

Untuk mencegah hal tersebut dan menjamin judul yang tampil di SERP Google 100% persis dengan workbook, semua layout/page menggunakan konfigurasi:
```ts
title: {
  absolute: "Jasa Pendirian PT - EasyLegal",
}
```
Hal ini mengabaikan template induk dan langsung merender tag `<title>` yang presisi.

### B. Penanganan Halaman Client Component
Tiga route berikut sebelumnya berstatus `"use client"` tanpa file `layout.tsx`, sehingga tidak mengekspos metadata SSR sama sekali:
1. `/layanan/pengurusan-pse`
2. `/layanan/pkkpr`
3. `/layanan/perubahan-akta`

**Solusi**: Dibuat file `layout.tsx` bertipe Server Component di masing-masing direktori yang mengekspor `generateMetadata()` dan menyisipkan skema `BreadcrumbList` JSON-LD standar, sehingga metadata terindeks secara optimal oleh mesin pencari.

### C. Pemetaan Dinamis pada `pendirian-badan-usaha/[jenis]`
Halaman jenis badan usaha bersifat dinamis (`[jenis]`). Metadata ditangani menggunakan lookup dictionary `JENIS_SEO_METADATA`:
```ts
const JENIS_SEO_METADATA: Record<string, { title: string; description: string }> = {
  pt: { ... },
  "pt-pma": { ... },
  "pt-perorangan": { ... },
  cv: { ... },
  yayasan: { ... },
  perkumpulan: { ... },
  firma: { ... },
  koperasi: { ... },
};
```
Jika parameter cocok, metadata kustom diterapkan dengan `absolute: seo.title`. Jika tidak, fallback dinamis tetap bekerja normal.

### D. Perbaikan Typo dari Data Sumber
1. **Baris 11 (NIB & OSS)**:
   - Sumber: `Jasa Pengurusa NIB & OSS - EasyLegal` (kurang huruf 'n')
   - Diperbaiki menjadi: `Jasa Pengurusan NIB & OSS - EasyLegal`
2. **Baris 23 (Pelaporan RUPS)**:
   - Sumber: `utuh jasa pengurusan laporan RUPS...` (kurang huruf 'B')
   - Diperbaiki menjadi: `Butuh jasa pengurusan laporan RUPS...`

---

## 4. Halaman Layanan di Luar Scope Workbook
Beberapa layanan yang ada di website tetapi tidak tercantum dalam spreadsheet tetap menggunakan metadata bawaan aplikasi:
- `/layanan/sertifikasi-iso`
- `/layanan/virtual-office`
- `/layanan/press-release`
- `/layanan/spt-pajak-gads` *(Catatan: Layanan SPT telah dipindahkan eksklusif ke `easylegal.biz.id` dengan respon 308 Permanent Redirect)*

---

## 5. Pengujian dan Verifikasi Otomatis

Pengujian automated E2E dibuat pada `apps/web-id/tests/seo-metadata.spec.ts` menggunakan Playwright untuk memvalidasi:
1. Status respons HTTP 200 untuk seluruh 22 URL.
2. Kecocokan konten tag `<title>`.
3. Kecocokan atribut `content` pada `<meta name="description">`.

Hasil pengujian lokal:
```bash
Running 22 tests using 1 worker
  22 passed (51.2s)
```
Semua 22 pengujian berhasil lolos tanpa kegagalan.
