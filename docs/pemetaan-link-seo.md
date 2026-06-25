# Daftar Pemetaan Link Layanan EasyLegal

Dokumen ini berisi daftar rute layanan baru yang aktif menggunakan domain utama **`https://easylegal.my.id`** serta pemetaan rewrite dari path SEO/Iklan lamanya.

---

## 1. Halaman Layanan Utama (Aktif & Terintegrasi)

Semua halaman di bawah ini dirender secara instan lewat arsitektur dynamic Server-Side Generation (SSG).

| No | Nama Layanan | URL Utama (Aktif) | Status |
|----|--------------|-------------------|--------|
| 1  | Virtual Office | [https://easylegal.my.id/layanan/virtual-office](https://easylegal.my.id/layanan/virtual-office) | Aktif |
| 2  | NIB & OSS | [https://easylegal.my.id/layanan/nib-oss](https://easylegal.my.id/layanan/nib-oss) | Aktif |
| 3  | Merek & HAKI | [https://easylegal.my.id/layanan/merek-haki](https://easylegal.my.id/layanan/merek-haki) | Aktif |
| 4  | Visa & KITAS | [https://easylegal.my.id/layanan/visa-kitas](https://easylegal.my.id/layanan/visa-kitas) | Aktif |
| 5  | Sertifikasi ISO | [https://easylegal.my.id/layanan/sertifikasi-iso](https://easylegal.my.id/layanan/sertifikasi-iso) | Aktif |
| 6  | Pendirian Yayasan | [https://easylegal.my.id/layanan/pendirian-yayasan](https://easylegal.my.id/layanan/pendirian-yayasan) | Aktif |
| 7  | Pembubaran Perusahaan | [https://easylegal.my.id/layanan/pembubaran-perusahaan](https://easylegal.my.id/layanan/pembubaran-perusahaan) | Aktif |
| 8  | Pendaftaran PSE | [https://easylegal.my.id/layanan/pengurusan-pse](https://easylegal.my.id/layanan/pengurusan-pse) | Active |
| 9  | Perubahan Akta | [https://easylegal.my.id/layanan/perubahan-akta](https://easylegal.my.id/layanan/perubahan-akta) | Aktif |
| 10 | Pengajuan PKP | [https://easylegal.my.id/layanan/pengajuan-pkp](https://easylegal.my.id/layanan/pengajuan-pkp) | Aktif |
| 11 | Press Release | [https://easylegal.my.id/layanan/press-release](https://easylegal.my.id/layanan/press-release) | Aktif |
| 12 | PKKPR & Tata Ruang | [https://easylegal.my.id/layanan/pkkpr](https://easylegal.my.id/layanan/pkkpr) | Aktif |
| 13 | Pelaporan LKPM | [https://easylegal.my.id/layanan/pelaporan-lkpm](https://easylegal.my.id/layanan/pelaporan-lkpm) | Aktif |
| 14 | Perjanjian Perkawinan | [https://easylegal.my.id/layanan/perjanjian-perkawinan](https://easylegal.my.id/layanan/perjanjian-perkawinan) | Aktif |

---

## 2. Pemetaan Rewrite URL (SEO & Iklan)

Ketika berkunjung ke URL lama di bawah ini, Next.js akan menyajikan halaman utama di atas secara internal (URL di browser tetap URL lama demi SEO & Iklan).

### A. Rute PT & Badan Usaha
- `https://easylegal.my.id/jasa-pembuatan-pt-jasa-pendirian-pt` &rarr; `/layanan/pendirian-badan-usaha/pt`
- `https://easylegal.my.id/jasa-pendirian-pt-gads` &rarr; `/layanan/pendirian-badan-usaha/pt`
- `https://easylegal.my.id/jasa-pt-bekasi-gads` &rarr; `/layanan/pendirian-badan-usaha/pt`
- `https://easylegal.my.id/jasa-pt-bandung-gads` &rarr; `/layanan/pendirian-badan-usaha/pt`
- `https://easylegal.my.id/lp-pendirian-pt-display-ads-dads` &rarr; `/layanan/pendirian-badan-usaha/pt`
- `https://easylegal.my.id/jasa-pendirian-pt-bandung-gdas-pmax` &rarr; `/layanan/pendirian-badan-usaha/pt`
- `https://easylegal.my.id/jasa-pendirian-pt-jasa-pembuatan-pt-ytads` &rarr; `/layanan/pendirian-badan-usaha/pt`
- `https://easylegal.my.id/jasa-pembuatan-pt-pma-jasa-pendirian-pt-pma` &rarr; `/layanan/pendirian-badan-usaha/pt-pma`
- `https://easylegal.my.id/jasa-pendirian-pt-pma-gads` &rarr; `/layanan/pendirian-badan-usaha/pt-pma`
- `https://easylegal.my.id/jasa-pembuatan-pt-perorangan-jasa-pendirian-pt-perorangan` &rarr; `/layanan/pendirian-badan-usaha/pt-perorangan`
- `https://easylegal.my.id/jasa-pembuatan-pt-perorangan-gads` &rarr; `/layanan/pendirian-badan-usaha/pt-perorangan`
- `https://easylegal.my.id/jasa-pembuatan-cv-jasa-pendirian-cv` &rarr; `/layanan/pendirian-badan-usaha/cv`
- `https://easylegal.my.id/jasa-pendirian-cv-gads` &rarr; `/layanan/pendirian-badan-usaha/cv`
- `https://easylegal.my.id/jasa-cv-bekasi-gads` &rarr; `/layanan/pendirian-badan-usaha/cv`
- `https://easylegal.my.id/jasa-cv-bandung-gads` &rarr; `/layanan/pendirian-badan-usaha/cv`
- `https://easylegal.my.id/lp-produk-cv-dads` &rarr; `/layanan/pendirian-badan-usaha/cv`
- `https://easylegal.my.id/jasa-pembuatan-yayasan-jasa-pendirian-yayasan` &rarr; `/layanan/pendirian-badan-usaha/yayasan`
- `https://easylegal.my.id/jasa-pembuatan-yayasan-gads` &rarr; `/layanan/pendirian-badan-usaha/yayasan`

### B. Rute Merek & HAKI
- `https://easylegal.my.id/jasa-pendaftaran-merek-dagang-daftar-merek-dagang` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/meta-ads-merek` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/lp-meta-ads-merek` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/lp-iklan-metaads-easylegal` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/jasa-pengurusan-merek-gads` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/lp-produk-merek-gads2` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/jasa-merek-bekasi-gads` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/jasa-merek-bandung-gads` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/lp-produk-merek-dads` &rarr; `/layanan/merek-haki`
- `https://easylegal.my.id/jasa-pembuatan-merek-jasa-pendirian-merek-ytads` &rarr; `/layanan/merek-haki`

### C. Rute Layanan Lainnya
- `https://easylegal.my.id/lp-sertifikasi-iso` &rarr; `/layanan/sertifikasi-iso`
- `https://easylegal.my.id/jasa-sertifikasi-iso-gads` &rarr; `/layanan/sertifikasi-iso`
- `https://easylegal.my.id/jasa-pembuatan-nib-oss-rba-ahu-perizinan-usaha` &rarr; `/layanan/nib-oss`
- `https://easylegal.my.id/jasa-pembuatan-niboss-gads` &rarr; `/layanan/nib-oss`
- `https://easylegal.my.id/pembubaran-perusahaan-pt-cv-yayasan-perkumpulan` &rarr; `/layanan/pembubaran-perusahaan`
- `https://easylegal.my.id/jasa-pembubaran-perusahaan-gads` &rarr; `/layanan/pembubaran-perusahaan`
- `https://easylegal.my.id/jasa-pengurusan-pse-pendaftaran-pse-penyelenggara-sistem-elektronik` &rarr; `/layanan/pengurusan-pse`
- `https://easylegal.my.id/jasa-pse-gads` &rarr; `/layanan/pengurusan-pse`
- `https://easylegal.my.id/biro-jasa-perubahan-akta-perusahaan-murah-cepat` &rarr; `/layanan/perubahan-akta`
- `https://easylegal.my.id/jasa-perubahan-akta-gads` &rarr; `/layanan/perubahan-akta`
- `https://easylegal.my.id/jasa-pengajuan-pkp-perusahaan-online-pengurusan-pkp-perusahaan-online` &rarr; `/layanan/pengajuan-pkp`
- `https://easylegal.my.id/jasa-pkp-gads` &rarr; `/layanan/pengajuan-pkp`
- `https://easylegal.my.id/jasa-press-release-media-online` &rarr; `/layanan/press-release`
- `https://easylegal.my.id/jasa-press-release-gads` &rarr; `/layanan/press-release`
- `https://easylegal.my.id/lp-produk-pkkpr-gads` &rarr; `/layanan/pkkpr`
