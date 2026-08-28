# Rencana WhatsApp Lead Tracking & Attribution EasyLegal

Tanggal: 27 Agustus 2026

Status: Diimplementasikan pada branch `develop`; belum diterapkan ke production

Target branch implementasi: ditentukan sebelum pengerjaan

## 1. Tujuan

Setiap CTA yang akhirnya menuju WhatsApp—tombol produk, konsultasi, sticky CTA, navbar, hero, pricing, CTA penutup, dan CTA lain—harus melewati satu jalur tracking yang sama. Sistem akan:

1. membuat Lead ID internal dan Lead Code publik;
2. merekam sumber kedatangan Visitor;
3. merekam Entry Point, lokasi CTA, dan layanan yang diminati;
4. membawa Lead Code ke pesan WhatsApp;
5. mendistribusikan chat ke nomor WhatsApp aktif melalui rotator;
6. memungkinkan admin memperbarui progres sampai batal atau closing;
7. menampilkan jumlah, kualitas, funnel, dan konversi Lead di dashboard.

## 2. Prinsip model data

### 2.1 Klik WhatsApp membuat Lead, bukan otomatis prospek berkualitas

Lead dibuat ketika redirect WhatsApp benar-benar dipanggil. Ini membuktikan niat membuka WhatsApp, tetapi belum membuktikan pesan terkirim. Karena WhatsApp tidak memberikan callback bahwa pengguna benar-benar mengirim pesan, Lead baru dimulai pada stage `NEW`.

### 2.2 Lead Stage dan Lead Temperature harus dipisahkan

Cold/warm/hot adalah ringkasan laporan, sedangkan stage menjelaskan proses kerja CS. Menyimpan keduanya sebagai satu status akan menimbulkan data ambigu—contohnya Lead baru dan Lead batal sama-sama cold, padahal hasil operasionalnya berbeda.

| Lead Stage | Makna | Temperature turunan |
|---|---|---|
| `NEW` | CTA WhatsApp diklik, belum diverifikasi ada percakapan | `COLD` |
| `CONTACTED` | Pesan/percakapan masuk dan CS sudah merespons | `WARM` |
| `QUALIFIED` | Kebutuhan, kecocokan layanan, dan potensi transaksi sudah jelas | `WARM` |
| `PROPOSAL` | Penawaran/invoice sudah diberikan atau sedang negosiasi | `WARM` |
| `WON` | Order/closing berhasil | `HOT` |
| `LOST` | Tidak lanjut, tidak valid, atau batal | `COLD` |

Temperature dihitung dari stage agar tidak terjadi kombinasi tidak masuk akal seperti `WON + COLD`. Jika bisnis nantinya memerlukan scoring lebih rinci, tambahkan lead score terpisah—jangan mengubah arti stage.

## 3. Attribution dan referral

### 3.1 Channel standar

| Channel | Deteksi utama |
|---|---|
| `GOOGLE_ADS` | Ada `gclid`, atau `utm_source=google` + media berbayar |
| `META_ADS` | Ada `fbclid`, atau UTM Facebook/Instagram/Meta berbayar |
| `ORGANIC_SEARCH` | Referrer mesin pencari tanpa penanda iklan |
| `REFERRAL` | Datang dari domain eksternal atau mempunyai referral code |
| `DIRECT` | Tidak ada referrer/parameter sumber |
| `OTHER` | Sumber diketahui tetapi tidak cocok klasifikasi di atas |
| `UNKNOWN` | Attribution tidak tersedia atau gagal dibaca |

Kode source yang dibawa ke pesan WhatsApp:

| Channel database | Lead Source Code |
|---|---|
| `GOOGLE_ADS` | `gads` |
| `META_ADS` | `metaads` |
| `ORGANIC_SEARCH` dari Google | `googleseo` |
| `REFERRAL` | `referral` |
| `DIRECT` | `direct` |
| `OTHER` | `other` |
| `UNKNOWN` | `unknown` |

Nilai source code harus dibentuk oleh server dari channel yang sudah divalidasi, bukan menyalin query browser secara mentah.

### 3.2 Parameter URL yang didukung

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`
- `gclid`
- `fbclid`
- `ref` untuk Referral Code EasyLegal

`ref` tidak boleh digunakan sebagai pengganti channel. Contoh: URL partner mempunyai `ref=PARTNER-BUDI`; channel-nya `REFERRAL`, sementara referral code-nya `PARTNER-BUDI`.

### 3.3 Attribution policy

Versi awal menggunakan first-touch dengan attribution window 90 hari:

- sumber pertama disimpan pada first-party cookie;
- kunjungan berikutnya tidak menimpa first-touch;
- data CTA saat klik tetap disimpan sebagai click context;
- data mentah UTM/click ID dipertahankan untuk audit;
- cookie tidak menyimpan data sensitif atau identitas pribadi.

Untuk analisis lebih matang, database juga menyimpan Entry Point dan CTA Location secara terpisah. Contoh:

```text
Entry Point       : /pendirian-pt?utm_source=google&utm_medium=cpc
Channel           : GOOGLE_ADS
Campaign          : pt-jakarta-q3
CTA Location      : /pendirian-pt#pricing-paket-premium
Interested Service: Pendirian PT — Paket Premium
Lead Code         : EL-A7K9Q2
```

## 4. Identitas Lead

Satu Lead memiliki dua identitas:

- `id`: ID database internal, tidak ditampilkan ke calon pelanggan;
- `leadCode`: kode publik unik, contoh `EL-A7K9Q2`, dibawa ke pesan WhatsApp.

Lead Code bukan Referral Code. Lead Code mencari satu percakapan tertentu; Referral Code mengidentifikasi pihak/campaign yang membawa Visitor.

Format pesan WhatsApp:

```text
Halo EasyLegal, saya ingin konsultasi Pendirian PT.

[Ref: EL-A7K9Q2 | Source: gads]
```

Lead Code dan Lead Source Code wajib dibawa ke pesan `wa.me` agar CS langsung melihat asal Lead. UTM lengkap, click ID, Entry Point, dan metadata internal lain tetap hanya disimpan di database agar pesan tidak panjang.

## 5. Alur end-to-end

```text
Visitor membuka link
  → sistem menangkap first-touch attribution + entry point
  → Visitor menjelajah halaman
  → Visitor mengklik CTA WhatsApp
  → delegated click handler mengenali CTA dan menambahkan context
  → API memilih nomor WA aktif melalui rotator
  → API membuat Lead + Lead Code secara atomik
  → API mencatat assignment nomor dan event CLICKED_WHATSAPP
  → API redirect ke wa.me dengan Lead Code + Lead Source Code di pesan
  → CS menerima pesan dan mencari Lead Code di dashboard
  → CS mengubah stage sesuai progres
  → dashboard menghitung temperature, funnel, dan conversion rate
```

Jika pembuatan Lead gagal, CTA boleh fail-open ke nomor default agar calon pelanggan tetap bisa menghubungi EasyLegal. Kegagalan tracking harus dicatat sebagai error terstruktur agar selisih data dapat diaudit.

## 6. Cakupan semua CTA WhatsApp

Tracking tidak boleh bergantung pada developer mengingat setiap tombol satu per satu. Implementasi harus memakai dua lapis perlindungan:

1. semua generator link memakai helper canonical `getWhatsAppLink()`;
2. delegated click handler di root menangkap seluruh tautan yang menuju endpoint rotator.

Audit wajib mencakup `apps/web` dan `apps/web-co` serta mencari pola berikut:

- `wa.me`
- `api.whatsapp.com`
- nomor WhatsApp hardcoded;
- URL rotator lama;
- `getWhatsAppLink()`;
- CTA yang memakai `window.open` atau handler tanpa elemen `<a>`.

Tautan WhatsApp yang tidak melalui endpoint rotator dianggap defect karena tidak dapat membuat Lead.

## 7. Rancangan data

### 7.1 Lead

| Field | Tipe konseptual | Keterangan |
|---|---|---|
| `id` | ID | Identitas internal |
| `leadCode` | string unik | Kode publik untuk WhatsApp |
| `stage` | enum | NEW/CONTACTED/QUALIFIED/PROPOSAL/WON/LOST |
| `lostReason` | enum/string nullable | Wajib ketika LOST |
| `notes` | text nullable | Catatan CS |
| `assignedNumberId` | relation | Nomor WA hasil rotator |
| `interestedService` | string nullable | Produk/layanan dari CTA |
| `entryUrl` | text | URL kunjungan pertama |
| `entryPath` | string | Path kunjungan pertama |
| `ctaPath` | string | Halaman saat klik |
| `ctaId` | string nullable | Identitas elemen/section CTA |
| `ctaLabel` | string nullable | Teks CTA yang diklik |
| `referrerUrl` | text nullable | Referrer awal |
| `channel` | enum | Channel attribution standar |
| `referralCode` | string nullable | Kode partner/campaign |
| `utmSource`…`utmTerm` | string nullable | UTM mentah |
| `gclid` / `fbclid` | string nullable | Click ID platform iklan |
| `createdAt` | datetime | Waktu klik WA |
| `updatedAt` | datetime | Waktu perubahan terakhir |
| `wonAt` / `lostAt` | datetime nullable | Waktu outcome |

### 7.2 LeadStageHistory

Setiap perubahan stage harus append-only agar dashboard dapat menghitung waktu respons, durasi funnel, dan siapa yang mengubah status.

| Field | Keterangan |
|---|---|
| `leadId` | Lead yang berubah |
| `fromStage` / `toStage` | Transisi |
| `changedByUserId` | Admin/CS yang mengubah |
| `reason` | Alasan opsional; wajib untuk LOST |
| `createdAt` | Waktu perubahan |

### 7.3 LeadEvent

Event awal yang direkomendasikan:

- `WHATSAPP_CTA_CLICKED`
- `WHATSAPP_REDIRECTED`
- `CONVERSATION_CONFIRMED`
- `STAGE_CHANGED`
- `NOTE_ADDED`

Klik berulang dalam sesi yang sama perlu aturan deduplikasi. Rekomendasi: Lead yang sama dipakai kembali selama 30 menit apabila fingerprint anonim, CTA context, dan layanan sama; klik setelah itu membuat Lead baru. Aturan ini mencegah double-click merusak jumlah Lead tanpa menyimpan identitas invasif.

## 8. Aturan transisi

Transisi normal:

```text
NEW → CONTACTED → QUALIFIED → PROPOSAL → WON
  └───────────────→ LOST
CONTACTED/QUALIFIED/PROPOSAL → LOST
LOST → CONTACTED (re-open, wajib tercatat di history)
```

Ketentuan:

- `WON` wajib mempunyai `wonAt` dan idealnya nilai order;
- `LOST` wajib mempunyai lost reason;
- perubahan status tidak menghapus riwayat;
- status tidak boleh dipercaya langsung dari client tanpa validasi API;
- temperature selalu diturunkan dari stage.

Lost reason awal:

- tidak merespons;
- hanya bertanya;
- harga tidak cocok;
- kebutuhan tidak cocok;
- memilih kompetitor;
- duplikat/spam;
- lainnya.

Catatan: “hanya bertanya” sebaiknya tetap `WARM` selama percakapan aktif dan baru menjadi `LOST/COLD` ketika dipastikan tidak lanjut.

## 9. API yang diperlukan

### Public

- `GET /api/v1/wa/redirect`: validasi context, pilih nomor, buat Lead, catat event, lalu redirect.

### Admin terautentikasi

- `GET /api/v1/wa/leads`: pagination, pencarian, filter, sorting, summary;
- `GET /api/v1/wa/leads/:id`: detail + history;
- `PATCH /api/v1/wa/leads/:id/stage`: transisi tervalidasi;
- `PATCH /api/v1/wa/leads/:id`: notes, layanan, dan data operasional yang diizinkan;
- endpoint export CSV untuk laporan periodik.

Semua endpoint admin memakai JWT admin, validasi role, schema validation, rate limit, dan audit log. Filter harus dilakukan di database, bukan mengambil maksimal 500 row lalu menghitung seluruh metrik dari subset.

## 10. Dashboard

### Ringkasan

- total Lead;
- Lead baru;
- cold/warm/hot;
- closing/WON;
- conversion rate `WON ÷ total Lead`;
- response time median;
- Lead dan conversion per channel;
- Lead dan conversion per layanan;
- Lead dan conversion per campaign/referral;
- performa nomor/CS.

### Daftar Lead

Kolom minimum:

- Lead Code;
- tanggal;
- interested service;
- channel/campaign/referral;
- entry point;
- CTA location;
- nomor/CS tujuan;
- stage dan temperature;
- umur Lead;
- aksi detail/update.

Filter minimum:

- rentang tanggal;
- stage;
- temperature;
- channel;
- campaign/referral code;
- layanan;
- nomor tujuan;
- pencarian Lead Code.

### Detail Lead

- attribution lengkap;
- pesan/link WhatsApp yang dibuat;
- timeline stage/event;
- catatan CS;
- outcome dan lost reason;
- nilai order jika WON.

## 11. Analitik yang harus bisa dijawab

1. Berapa Lead dari Google Ads, Meta Ads, SEO, referral, dan direct?
2. Channel mana menghasilkan closing terbanyak dan conversion rate terbaik?
3. Campaign/referral code mana yang membawa Lead berkualitas?
4. Produk apa yang paling banyak diklik dan paling banyak closing?
5. Entry page dan CTA mana yang menghasilkan Lead/WON?
6. Berapa banyak Lead berhenti pada setiap stage?
7. Berapa lama Lead berubah dari NEW ke CONTACTED dan sampai WON/LOST?
8. Nomor atau CS mana menerima dan menutup Lead terbanyak?

Jumlah klik, jumlah Lead, dan jumlah closing harus ditampilkan sebagai metrik berbeda.

## 12. Privasi, keamanan, dan integritas

- whitelist nilai channel dan batasi panjang seluruh query parameter;
- jangan percaya label produk/source dari browser tanpa sanitasi;
- simpan hanya data attribution yang diperlukan;
- jangan masukkan UTM, click ID, atau metadata internal ke teks WhatsApp;
- jangan menyimpan fingerprint invasif;
- admin mutation wajib menghasilkan audit trail;
- Lead Code harus dibuat dengan generator acak kriptografis dan unique constraint;
- cegah open redirect: tujuan WhatsApp ditentukan server, bukan query parameter bebas;
- rate-limit endpoint publik tanpa menghambat pengguna normal;
- data lama `WhatsAppClick` harus dimigrasikan tanpa kehilangan click count.

## 13. Strategi migrasi dari sistem saat ini

Branch `develop` sudah memiliki prototipe `leadCode`, `source`, `product`, status, API list/update, dan dashboard sederhana. Prototipe ini dapat dijadikan referensi, tetapi tidak boleh langsung di-merge sebelum penyesuaian berikut:

1. pisahkan entitas Lead dari click log;
2. pisahkan stage dari temperature;
3. bedakan Lead Code dan Referral Code;
4. simpan Entry Point dan CTA Location secara terpisah;
5. pertahankan UTM/click ID mentah;
6. gunakan generator kode kriptografis;
7. tambahkan history dan validasi transisi;
8. tambahkan pagination serta agregasi database;
9. audit seluruh CTA pada dua aplikasi web;
10. siapkan migration/backfill untuk click lama.

## 14. Tahapan implementasi

### Fase 1 — Inventarisasi dan kontrak

- audit semua CTA WhatsApp di `apps/web` dan `apps/web-co`;
- tetapkan katalog layanan dan `ctaId` stabil;
- finalisasi stage, lost reason, attribution window, dan aturan deduplikasi;
- tentukan pemilik Lead/assignment jika CS multi-user akan dipakai.

### Fase 2 — Database dan API

- buat model Lead, LeadEvent, LeadStageHistory, enum, index, dan migration;
- buat generator Lead Code;
- implementasikan redirect atomik dan fail-open;
- implementasikan endpoint dashboard dan validation;
- backfill click lama sebagai data legacy/unknown.

### Fase 3 — Tracking website

- implementasikan first-touch attribution;
- perkaya semua CTA dengan service/CTA context;
- ganti seluruh direct WhatsApp link agar melalui rotator;
- tambahkan observability untuk tracking gagal.

### Fase 4 — Dashboard operasional

- daftar/filter/detail Lead;
- update stage + lost reason + notes;
- timeline perubahan;
- cards funnel dan breakdown attribution;
- export CSV.

### Fase 5 — QA dan rollout

- test tiap channel dengan URL fixture;
- test seluruh jenis CTA desktop/mobile;
- test deduplikasi, collision, fail-open, dan browser tanpa cookie;
- test permission dan invalid transition;
- deploy migration → API → web → dashboard;
- pantau error dan selisih click-versus-lead.

## 15. Acceptance criteria

- 100% CTA WhatsApp terinventarisasi dan melewati endpoint rotator;
- setiap redirect sukses mempunyai Lead ID dan Lead Code unik;
- Lead Code dan Lead Source Code tampil pada pesan WhatsApp;
- source, entry point, CTA location, dan layanan tersimpan;
- Google Ads, Meta Ads, organic search, referral, direct, other, dan unknown dapat dibedakan;
- stage hanya dapat berubah melalui transisi tervalidasi dan tercatat di history;
- cold/warm/hot konsisten dengan stage;
- dashboard dapat filter, mencari Lead Code, melihat funnel, dan breakdown sumber/produk;
- conversion rate dihitung dari `WON / total Lead` dengan rentang tanggal yang sama;
- kegagalan tracking tidak mematikan CTA WhatsApp;
- migrasi mempertahankan histori klik serta counter rotator;
- build, migration test, API test, dan E2E CTA lulus.

## 16. Keputusan yang perlu dikonfirmasi sebelum implementasi

1. Apakah first-touch 90 hari sudah sesuai, atau perlu last-touch/multi-touch?
2. Apakah satu double-click dalam 30 menit harus menjadi satu Lead?
3. Apakah `HOT` hanya setelah pembayaran/closing, atau sejak proposal/negosiasi?
4. Apakah nilai order dan paket yang dibeli perlu disimpan pada fase pertama?
5. Apakah Referral Code dikelola melalui tabel partner/campaign di dashboard?
6. Apakah setiap Lead perlu owner CS/admin selain nomor WhatsApp tujuan?
7. Apakah data lama hanya ditandai `UNKNOWN`, atau perlu enrichment manual?

## 17. Urutan deployment yang direkomendasikan

```text
Database migration
  → admin-api
  → apps/web dan apps/web-co
  → admin-dashboard
  → smoke test end-to-end
```

Jangan deploy website pengirim metadata sebelum API menerima schema baru. Jangan deploy dashboard sebelum endpoint list/detail/update tersedia.
