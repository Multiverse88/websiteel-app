# Planning Setup `easylegal.id` — Halaman Iklan & Tracking

**Terakhir diperbarui:** 2026-09-05
**Domain:** `easylegal.id`
**Status:** Dalam pengerjaan

---

## Daftar Isi

1. [Persiapan Halaman](#1-persiapan-halaman)
2. [Persiapan Pixel/Tag](#2-persiapan-pixeltag)
3. [Konversi WhatsApp — Kode Label](#3-konversi-whatsapp--kode-label)
4. [Status Redirect & URL Mapping](#4-status-redirect--url-mapping)
5. [Daftar Halaman yang Perlu Dicek](#5-daftar-halaman-yang-perlu-dicek)

---

## 1. Persiapan Halaman

### A. Google Ads — Tab `Google Ads EL.id`

Semua halaman Google Ads EL.id sudah di-map via **rewrite rules** di `apps/web-id/next.config.ts` (lines 137-241). Rewrite artinya URL tetap di Ads, tapi konten diload dari halaman layanan yang sesuai.

| No | URL Ads (source) | Halaman Tujuan (destination) | Status |
|----|-----------------|------------------------------|--------|
| 1 | `/gads-rekomendasi-nama-pt` | `/layanan/pendirian-badan-usaha` | ⚠️ Belum ada rewrite |
| 2 | `/gads-pendirian-pt-pma` | `/layanan/pendirian-badan-usaha/pt-pma` | ⚠️ Belum ada rewrite |
| 3 | `/gads-pendirian-pt-perorangan` | `/layanan/pendirian-badan-usaha/pt-perorangan` | ⚠️ Belum ada rewrite |
| 4 | `/gads-pendirian-cv` | `/layanan/pendirian-badan-usaha/cv` | ⚠️ Belum ada rewrite |
| 5 | `/gads-pendirian-yayasan` | `/layanan/pendirian-badan-usaha/yayasan` | ⚠️ Belum ada rewrite |
| 6 | `/gads-pendirian-perkumpulan` | `/layanan/pendirian-badan-usaha/perkumpulan` | ⚠️ Belum ada rewrite |
| 7 | `/gads-pendirian-firma` | `/layanan/pendirian-badan-usaha/firma` | ⚠️ Belum ada rewrite |
| 8 | `/gads-pendirian-koperasi` | `/layanan/pendirian-badan-usaha/koperasi` | ⚠️ Belum ada rewrite |
| 9 | `/gads-merek-haki` | `/layanan/merek-haki` | ⚠️ Belum ada rewrite |
| 10 | `/gads-iso` | `/layanan/sertifikasi-iso` | ⚠️ Belum ada rewrite |
| 11 | `/gads-nib-oss` | `/layanan/nib-oss` | ⚠️ Belum ada rewrite |
| 12 | `/gads-pembubaran-perusahaan` | `/layanan/pembubaran-perusahaan` | ⚠️ Belum ada rewrite |
| 13 | `/gads-pse` | `/layanan/pengurusan-pse` | ⚠️ Belum ada rewrite |
| 14 | `/gads-perubahan-akta` | `/layanan/perubahan-akta` | ⚠️ Belum ada rewrite |
| 15 | `/gads-pkp` | `/layanan/pengajuan-pkp` | ⚠️ Belum ada rewrite |
| 16 | `/gads-press-release` | `/layanan/press-release` | ⚠️ Belum ada rewrite |
| 17 | `/gads-pkkpr` | `/layanan/pkkpr` | ⚠️ Belum ada rewrite |
| 18 | `/gads-virtual-office` | `/layanan/virtual-office` | ⚠️ Belum ada rewrite |
| 19 | `/gads-pelaporan-rups` | `/layanan/pelaporan-rups` | ⚠️ Belum ada rewrite |
| 20 | `/gads-pelaporan-lkpm` | `/layanan/pelaporan-lkpm` | ⚠️ Belum ada rewrite |
| 21 | `/gads-apostille` | `/layanan/apostille` | ⚠️ Belum ada rewrite |
| 22 | `/gads-visa-kitas` | `/layanan/visa-kitas` | ⚠️ Belum ada rewrite |
| 23 | `/gads-perjanjian-perkawinan` | `/layanan/perjanjian-perkawinan` | ⚠️ Belum ada rewrite |
| 24 | `/gads-kontrak-bisnis` | `/layanan/kontrak-bisnis` | ⚠️ Belum ada rewrite |
| 25 | `/dads-pendirian-pt` | `/layanan/pendirian-badan-usaha/pt` | ⚠️ Belum ada rewrite |
| 26 | `/dads-pendirian-cv` | `/layanan/pendirian-badan-usaha/cv` | ⚠️ Belum ada rewrite |
| 27 | `/dads-merek` | `/layanan/merek-haki` | ⚠️ Belum ada rewrite |
| 28 | `/dads-iso` | `/layanan/sertifikasi-iso` | ⚠️ Belum ada rewrite |
| 29 | `/dads-layanan` | `/layanan/virtual-office` | ⚠️ Belum ada rewrite |
| 30 | `/ytads-pendirian-pt` | `/layanan/pendirian-badan-usaha/pt` | ⚠️ Belum ada rewrite |
| 31 | `/ytads-merek` | `/layanan/merek-haki` | ⚠️ Belum ada rewrite |
| 32 | `/pmax-pendirian-pt` | `/layanan/pendirian-badan-usaha/pt` | ⚠️ Belum ada rewrite |

**Action:** Tambahkan rewrite rules di `apps/web-id/next.config.ts` untuk semua URL di atas.

**Sudah ada (dari web/biz.id, perlu dipastikan ada di web-id):**
- ✅ `/home-gads` → `/`
- ✅ `/jasa-pendirian-pt-gads` → `/layanan/pendirian-badan-usaha/pt`
- ✅ `/jasa-pendirian-cv-gads` → `/layanan/pendirian-badan-usaha/cv`
- ✅ `/jasa-pengurusan-merek-gads` → `/layanan/merek-haki`
- ✅ `/jasa-sertifikasi-iso-gads` → `/layanan/sertifikasi-iso`
- ✅ `/jasa-pembuatan-niboss-gads` → `/layanan/nib-oss`
- ✅ `/jasa-pembubaran-perusahaan-gads` → `/layanan/pembubaran-perusahaan`
- ✅ `/jasa-pse-gads` → `/layanan/pengurusan-pse`
- ✅ `/jasa-perubahan-akta-gads` → `/layanan/perubahan-akta`
- ✅ `/jasa-pkp-gads` → `/layanan/pengajuan-pkp`
- ✅ `/jasa-press-release-gads` → `/layanan/press-release`
- ✅ `/lp-produk-pkkpr-gads` → `/layanan/pkkpr`
- ✅ `/lp-sertifikasi-iso` → `/layanan/sertifikasi-iso`
- ✅ `/lp-produk-cv-dads` → `/layanan/pendirian-badan-usaha/cv`
- ✅ `/lp-pendirian-pt-display-ads-dads` → `/layanan/pendirian-badan-usaha/pt`
- ✅ `/lp-produk-merek-dads` → `/layanan/merek-haki`
- ✅ `/lp-produk-layanan-dads` → `/layanan/virtual-office`

### B. Meta Ads — Tab `Meta Ads EL.id`

| No | URL Ads (source) | Halaman Tujuan (destination) | Status |
|----|-----------------|------------------------------|--------|
| 1 | `/meta-ads-merek` | `/layanan/merek-haki` | ✅ Sudah ada rewrite |
| 2 | `/lp-meta-ads-merek` | `/layanan/merek-haki` | ✅ Sudah ada rewrite |
| 3 | `/lp-iklan-metaads-easylegal` | `/layanan/merek-haki` | ✅ Sudah ada rewrite |
| 4 | `/meta-ads-legalitas` | `/layanan/virtual-office` | ✅ Sudah ada rewrite |
| 5 | `/lp-iklan-legalitas-metaads` | `/layanan/virtual-office` | ✅ Sudah ada rewrite |
| 6 | `/meta-ads-pendirian-pt` | `/layanan/pendirian-badan-usaha/pt` | ⚠️ Belum ada rewrite |
| 7 | `/meta-ads-pendirian-cv` | `/layanan/pendirian-badan-usaha/cv` | ⚠️ Belum ada rewrite |
| 8 | `/meta-ads-iso` | `/layanan/sertifikasi-iso` | ⚠️ Belum ada rewrite |
| 9 | `/meta-ads-nib` | `/layanan/nib-oss` | ⚠️ Belum ada rewrite |
| 10 | `/meta-ads-pse` | `/layanan/pengurusan-pse` | ⚠️ Belum ada rewrite |
| 11 | `/meta-ads-pkp` | `/layanan/pengajuan-pkp` | ⚠️ Belum ada rewrite |
| 12 | `/meta-ads-perubahan-akta` | `/layanan/perubahan-akta` | ⚠️ Belum ada rewrite |
| 13 | `/meta-ads-press-release` | `/layanan/press-release` | ⚠️ Belum ada rewrite |
| 14 | `/meta-ads-pembubaran` | `/layanan/pembubaran-perusahaan` | ⚠️ Belum ada rewrite |
| 15 | `/meta-ads-virtual-office` | `/layanan/virtual-office` | ⚠️ Belum ada rewrite |
| 16 | `/terima-kasih-konsultasi-legalitas-bisnis-metaads` | `/testimoni` | ✅ Sudah ada rewrite |

### C. Floating WhatsApp — Per Halaman

**Current state:**
- `FloatingWhatsApp` component sudah ada di `apps/web-id/src/components/FloatingWhatsApp.tsx`
- Menggunakan `getWhatsAppLink()` yang redirect ke `api.easylegal.my.id/api/v1/wa/redirect`
- Nomor default: `0811-2345-6789` (di config.ts, tapi rotator memilih nomor terbaik)

**Yang perlu di-setup:**
1. **Nomor WhatsApp** — pastikan nomor-nomor aktif sudah terdaftar di admin dashboard (`/db` → WhatsApp Numbers)
2. **Autotext per halaman** — set WhatsApp page config via admin dashboard (`/db` → WhatsApp Pages) untuk setiap halaman iklan dengan pesan yang relevan
3. **CTA ID** — setiap tombol WhatsApp di halaman iklan perlu `ctaId` yang unik agar autotext bisa di-target per tombol

**Konfigurasi via Admin Dashboard:**
- URL: `https://admin.easylegal.my.id/db`
- Menu: WhatsApp → Pages
- Set `path` = URL halaman (misal: `/layanan/pendirian-badan-usaha/pt`)
- Set `domain` = `easylegal.id`
- Set `message` = autotext yang diinginkan
- Set `numberIds` = nomor-nomor yang boleh dipakai untuk halaman ini

### D. Anchor Teks

**Yang perlu dicek:**
- Semua tombol CTA di halaman iklan sudah punya `href` yang benar
- Anchor text sudah sesuai dengan produk/layanan yang ditawarkan
- Tidak ada broken link

---

## 2. Persiapan Pixel/Tag

### A. Google Tag Manager (GTM)

**Status:** ✅ GTM sudah terinstall di `apps/web-id`
- Container ID: `GTM-TVHZW45Q` ✅
- Dipasang di `apps/web-id/src/components/GoogleTagManager.tsx`
- Sudah di-include di `apps/web-id/src/app/layout.tsx` (head + noscript)

**Yang perlu dikonfigurasi di GTM:**

| Tag | Trigger | Status |
|-----|---------|--------|
| Google Ads Remarketing | Page View — All Pages | ⚠️ Perlu setup di GTM |
| TikTok Pixel | Page View — All Pages | ⚠️ Perlu setup di GTM |
| Facebook Page View Pixel | Page View — All Pages | ⚠️ Perlu setup di GTM |
| Conversion Linker | Page View — All Pages | ⚠️ Perlu setup di GTM |
| Google Tag | Page View — All Pages | ⚠️ Perlu setup di GTM |
| WhatsApp Click — Google Ads | Click — `.whatsapp-cta`, `a[href*="wa.me"]`, `a[href*="whatsapp"]` | ⚠️ Perlu setup di GTM |
| WhatsApp Click — Meta | Click — `.whatsapp-cta`, `a[href*="wa.me"]`, `a[href*="whatsapp"]` | ⚠️ Perlu setup di GTM |

### B. Setup Tag di GTM

#### ⚠️ Catatan: Setiap Domain Punya GTM Sendiri

| Domain | App | GTM ID |
|--------|-----|--------|
| `easylegal.biz.id` | `web` | `GTM-NF5B4ZRG` |
| `easylegal.co.id` | `web-co` | `GTM-THBW6RTF` |
| `easylegal.id` | `web-id` | `GTM-TVHZW45Q` ✅ |

> **Penting:** Setup GTM tags harus dilakukan di container `GTM-TVHZW45Q` (easylegal.id), bukan di container lain.

#### 1. Google Ads Remarketing Tag
```
Tag Type: Google Ads Remarketing
Conversion ID: 11292095607
Trigger: Page View — All Pages
```

#### 2. TikTok Pixel
```
Tag Type: Custom HTML
Pixel ID: [PERLU DIPEROLEH DARI TIKTOK ADS MANAGER]
Trigger: Page View — All Pages
```

#### 3. Facebook Page View Pixel
```
Tag Type: Custom HTML
Pixel ID: [PERLU DIPEROLEH DARI FACEBOOK EVENTS MANAGER]
Trigger: Page View — All Pages
```

#### 4. Conversion Linker
```
Tag Type: Google Ads Conversion Linker
Trigger: Page View — All Pages
```

#### 5. Google Tag
```
Tag Type: Google Tag
Tag ID: [PERLU DIPEROLEH DARI GOOGLE ADS]
Trigger: Page View — All Pages
```

---

## 3. Konversi WhatsApp — Kode Label

### EL.ID

| Field | Value |
|-------|-------|
| **Nama Konversi** | `Kontak Whatsapp \| EL.ID 7984` |
| **Label Konversi** | `WnN8CL7mgPMYEPfovogq` |
| **ID Konversi** | `11292095607` |

### EL.CO.ID

| Field | Value |
|-------|-------|
| **Nama Konversi** | `Kontak Whatsapp \| EL.CO.ID 7895` |
| **Label Konversi** | `kFZwCMKnk4YZEM7d-Ywq` |
| **ID Konversi** | `11301449422` |

### Setup di GTM

#### Tag: WhatsApp Click — Google Ads (EL.ID)
```
Tag Type: Google Ads Conversion Tracking
Conversion ID: 11292095607
Conversion Label: WnN8CL7mgPMYEPfovogq
Trigger: Click — All Elements
  Filter: Click URL contains "wa.me" OR Click URL contains "whatsapp"
  OR CSS Selector: .whatsapp-cta, a[href*="wa.me"], a[href*="whatsapp"]
```

#### Tag: WhatsApp Click — Meta (EL.ID)
```
Tag Type: Custom HTML (Facebook Pixel)
Script:
  fbq('track', 'Contact', {
    content_name: 'WhatsApp Click',
    content_category: 'Lead Generation'
  });
Trigger: Click — Same as above
```

#### Tag: WhatsApp Click — Google Ads (EL.CO.ID)
```
Tag Type: Google Ads Conversion Tracking
Conversion ID: 11301449422
Conversion Label: kFZwCMKnk4YZEM7d-Ywq
Trigger: Click — Same as above
```

---

## 4. Status Redirect & URL Mapping

### Rewrite Rules yang Sudah Ada (apps/web-id/next.config.ts)

Total: **59 rewrite rules** sudah terkonfigurasi untuk halaman iklan Google Ads & Meta Ads.

### Yang Perlu Ditambahkan

Berdasarkan data Excel `Google Ads EL.id`, ada beberapa URL yang belum punya rewrite:

1. `/gads-rekomendasi-nama-pt` → `/layanan/pendirian-badan-usaha`
2. `/gads-pendirian-pt-pma` → `/layanan/pendirian-badan-usaha/pt-pma`
3. `/gads-pendirian-pt-perorangan` → `/layanan/pendirian-badan-usaha/pt-perorangan`
4. `/gads-pendirian-cv` → `/layanan/pendirian-badan-usaha/cv`
5. `/gads-pendirian-yayasan` → `/layanan/pendirian-badan-usaha/yayasan`
6. `/gads-pendirian-perkumpulan` → `/layanan/pendirian-badan-usaha/perkumpulan`
7. `/gads-pendirian-firma` → `/layanan/pendirian-badan-usaha/firma`
8. `/gads-pendirian-koperasi` → `/layanan/pendirian-badan-usaha/koperasi`
9. `/gads-merek-haki` → `/layanan/merek-haki`
10. `/gads-iso` → `/layanan/sertifikasi-iso`
11. `/gads-nib-oss` → `/layanan/nib-oss`
12. `/gads-pembubaran-perusahaan` → `/layanan/pembubaran-perusahaan`
13. `/gads-pse` → `/layanan/pengurusan-pse`
14. `/gads-perubahan-akta` → `/layanan/perubahan-akta`
15. `/gads-pkp` → `/layanan/pengajuan-pkp`
16. `/gads-press-release` → `/layanan/press-release`
17. `/gads-pkkpr` → `/layanan/pkkpr`
18. `/gads-virtual-office` → `/layanan/virtual-office`
19. `/gads-pelaporan-rups` → `/layanan/pelaporan-rups`
20. `/gads-pelaporan-lkpm` → `/layanan/pelaporan-lkpm`
21. `/gads-apostille` → `/layanan/apostille`
22. `/gads-visa-kitas` → `/layanan/visa-kitas`
23. `/gads-perjanjian-perkawinan` → `/layanan/perjanjian-perkawinan`
24. `/gads-kontrak-bisnis` → `/layanan/kontrak-bisnis`

---

## 5. Daftar Halaman yang Perlu Dicek

### Landing Pages yang Sudah Ready (web-id)

| Halaman | URL | Status |
|---------|-----|--------|
| Beranda | `/` | ✅ |
| Tentang Kami | `/tentang-kami` | ✅ |
| Kontak | `/kontak` | ✅ |
| Testimoni | `/testimoni` | ✅ |
| Kerjasama | `/kerjasama` | ✅ |
| Syarat & Ketentuan | `/syarat-ketentuan` | ✅ |
| Kebijakan Privasi | `/kebijakan-privasi` | ✅ |
| Cek Nama | `/cek-nama` | ✅ |
| Cek KBLI | `/cek-kbli` | ✅ |
| Newsletter Unsubscribe | `/newsletter/unsubscribe` | ✅ |
| Referral & Reseller | `/referral-reseller` | ✅ |

### Service Pages yang Sudah Ready (web-id)

| Layanan | URL | Status |
|---------|-----|--------|
| Pendirian Badan Usaha | `/layanan/pendirian-badan-usaha` | ✅ |
| PT | `/layanan/pendirian-badan-usaha/pt` | ✅ |
| PT PMA | `/layanan/pendirian-badan-usaha/pt-pma` | ✅ |
| PT Perorangan | `/layanan/pendirian-badan-usaha/pt-perorangan` | ✅ |
| CV | `/layanan/pendirian-badan-usaha/cv` | ✅ |
| Yayasan | `/layanan/pendirian-badan-usaha/yayasan` | ✅ |
| Perkumpulan | `/layanan/pendirian-badan-usaha/perkumpulan` | ✅ |
| Firma | `/layanan/pendirian-badan-usaha/firma` | ✅ |
| Koperasi | `/layanan/pendirian-badan-usaha/koperasi` | ✅ |
| Merek & HAKI | `/layanan/merek-haki` | ✅ |
| NIB & OSS | `/layanan/nib-oss` | ✅ |
| Sertifikasi ISO | `/layanan/sertifikasi-iso` | ✅ |
| Pembubaran Perusahaan | `/layanan/pembubaran-perusahaan` | ✅ |
| Pengurusan PSE | `/layanan/pengurusan-pse` | ✅ |
| Perubahan Akta | `/layanan/perubahan-akta` | ✅ |
| Pengajuan PKP | `/layanan/pengajuan-pkp` | ✅ |
| Press Release | `/layanan/press-release` | ✅ |
| PKKPR | `/layanan/pkkpr` | ✅ |
| Virtual Office | `/layanan/virtual-office` | ✅ |
| Pelaporan RUPS | `/layanan/pelaporan-rups` | ✅ |
| Pelaporan LKPM | `/layanan/pelaporan-lkpm` | ✅ |
| Apostille | `/layanan/apostille` | ✅ |
| Visa & Kitas | `/layanan/visa-kitas` | ✅ |
| Perjanjian Perkawinan | `/layanan/perjanjian-perkawinan` | ✅ |
| Kontrak Bisnis | `/layanan/kontrak-bisnis` | ✅ |

### Halaman yang Belum Ready / Perlu Dicek

| Halaman | URL | Status |
|---------|-----|--------|
| Sertifikasi ISO — IAS Society | `/layanan/sertifikasi-iso/ias-society` | ⚠️ Perlu dicek |
| Sertifikasi ISO — EGAC | `/layanan/sertifikasi-iso/egac` | ⚠️ Perlu dicek |
| Sertifikasi ISO — IAS Service | `/layanan/sertifikasi-iso/ias-service` | ⚠️ Perlu dicek |
| Sertifikasi ISO — KAN | `/layanan/sertifikasi-iso/kan` | ⚠️ Perlu dicek |
| Sertifikasi ISO — UAF | `/layanan/sertifikasi-iso/uaf` | ⚠️ Perlu dicek |

---

## Checklist Pengerjaan

- [ ] **Tambahkan rewrite rules** untuk semua URL Google Ads EL.id yang belum ada
- [ ] **Tambahkan rewrite rules** untuk semua URL Meta Ads EL.id yang belum ada
- [ ] **Setup WhatsApp Numbers** di admin dashboard (nomor aktif)
- [ ] **Setup WhatsApp Page Config** untuk setiap halaman iklan dengan autotext yang tepat
- [ ] **Setup GTM Tags:**
  - [ ] Google Ads Remarketing (Page View)
  - [ ] TikTok Pixel (Page View)
  - [ ] Facebook Page View Pixel (Page View)
  - [ ] Conversion Linker (Page View)
  - [ ] Google Tag (Page View)
  - [ ] WhatsApp Click — Google Ads EL.ID (Click)
  - [ ] WhatsApp Click — Meta EL.ID (Click)
  - [ ] WhatsApp Click — Google Ads EL.CO.ID (Click)
- [ ] **Verifikasi floating WhatsApp** muncul di semua halaman
- [ ] **Verifikasi anchor teks** sudah benar di semua halaman
- [ ] **Test semua URL Ads** mengarah ke halaman yang benar
- [ ] **Update Google Sheet** dengan status pengerjaan

---

## 6. Data dari WordPress Lama (SQL Dump)

### Sumber: `u947750278_easy.sql`
WordPress database dump dari easylegal.id lama (sebelum migrasi ke Next.js).

### Temuan Utama

| Data | Jumlah | Keterangan |
|------|--------|------------|
| **Artikel (post)** | 124 artikel | Post type `post`, status `publish` |
| **Glossary** | 917 glossary | Post type `glossary`, status `publish` |
| **Halaman (page)** | 1.255 pages | Termasuk LP produk, LP SEO lokal, Elementor templates |
| **WhatsApp Accounts** | 1 akun | "DEWI (Konsultan Legal)" — nomor: 0818-881-422 |
| **Elementor Templates** | Banyak | LP Utama, LP Produk, LP VO, LP SEO Lokal |

### Kontak WhatsApp Lama
- **Phone/WhatsApp:** `0818-881-422` / `0817-770-048`
- **Email:** `care@easylegal.id`
- **Alamat:** Ruko Metro Trade Center, Jl. Soekarno Hatta No.590 Blok A-26, Sekejati, Kec. Buahbatu, Kota Bandung

### URL Layanan Lama (dari wp_posts)
| URL Lama | Layanan |
|----------|---------|
| `/jasa-pembuatan-pt-jasa-pendirian-pt` | Pendirian PT |
| `/jasa-pembuatan-pt-perorangan-jasa-pendirian-pt-perorangan` | PT Perorangan |
| `/jasa-pembuatan-pt-pma-jasa-pendirian-pt-pma` | PT PMA |
| `/jasa-pembuatan-cv-jasa-pendirian-cv` | Pendirian CV |
| `/jasa-pembuatan-yayasan-jasa-pendirian-yayasan` | Yayasan |
| `/jasa-pembuatan-perkumpula-jasa-pendirian-perkumpulan` | Perkumpulan |
| `/jasa-pendaftaran-merek-dagang-daftar-merek-dagang` | Merek/HAKI |
| `/jasa-pembuatan-nib-oss-rba-ahu-perizinan-usaha` | NIB & OSS |
| `/jasa-pengurusan-pse-pendaftaran-pse-penyelenggara-sistem-elektronik` | PSE |
| `/jasa-pengajuan-pkp-perusahaan-online-pengurusan-pkp-perusahaan-online` | PKP |
| `/jasa-perubahan-akta-perusahaan-murah-cepat` | Perubahan Akta |
| `/pembubaran-perusahaan-pt-cv-yayasan-perkumpulan` | Pembubaran |
| `/biro-jasa-perubahan-akta-perusahaan-murah-cepat` | Perubahan Akta (alt) |

### Cross-Reference: SQL vs Excel

#### Artikel (124 dari SQL)
Dari Excel `ID - Article` ada 191 artikel (159 Good, 31 Cannibalization, 2 Unknown).
SQL dump hanya berisi 124 artikel — **67 artikel tidak ada di SQL dump** (mungkin dibuat setelah dump atau dihapus).

#### Glossary (917 dari SQL)
Dari Excel `ID - Glossary` ada 1.030 glossary (869 Good, 161 Cannibalization).
SQL dump berisi 917 — **113 glossary tidak ada di SQL dump**.

#### Local SEO (1.151 dari Excel)
Tidak ditemukan di SQL dump sebagai post_type terpisah. Kemungkinan dibangun sebagai LP Elementor (`e-landing-page`) atau halaman baru.

### Yang Bisa Dimanfaatkan dari SQL Dump
1. **Konten artikel lama** — bisa dijadikan referensi untuk rewrite/migrate ke format Markdown
2. **Struktur glossary** — 917 glossary bisa dijadikan seed data untuk database baru
3. **URL lama** — sudah di-map ke redirect rules di `next.config.ts`
4. **Kontak WhatsApp** — nomor lama bisa ditambahkan ke rotator WhatsApp di admin dashboard
5. **Elementor LP templates** — struktur halaman bisa dijadikan referensi untuk landing page builder baru

---

## Referensi

- **Google Sheet Tracking:** https://docs.google.com/spreadsheets/d/1mRJ0ci4AQ1n2j-CEAUCeG8xykb9bxWoXmWsg_NQbHi0/edit?gid=2127224250#gid=2127224250
- **Admin Dashboard:** https://admin.easylegal.my.id/db
- **GTM Container:** `GTM-TVHZW45Q` (easylegal.id)
- **Config:** `apps/web-id/src/lib/config.ts`
- **Rewrite Rules:** `apps/web-id/next.config.ts` (lines 137-241)
- **WhatsApp Tracking:** `apps/api/src/routes/whatsapp.ts`
- **Floating WhatsApp:** `apps/web-id/src/components/FloatingWhatsApp.tsx`
- **SQL Dump:** `u947750278_easy.sql` (166K lines, WordPress DB export)
