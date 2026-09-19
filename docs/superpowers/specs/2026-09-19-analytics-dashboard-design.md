# Spesifikasi Desain: Halaman Analytics & Leads Intelligence Multi-Domain

**Tanggal**: 2026-09-19  
**Status**: Disetujui (Approved)  
**Target Sistem**: `Multiverse88/websiteel-app` (`apps/api`, `infra/admin-dashboard`)  
**Domain Tercakup**: `easylegal.id`, `easylegal.biz.id`, `easylegal.co.id`  

---

## 1. Latar Belakang & Tujuan
Platform EasyLegal beroperasi secara multi-domain (`easylegal.id`, `easylegal.biz.id`, dan `easylegal.co.id`), dengan data interaksi calon klien (leads masuk via WhatsApp CTA) tersimpan di tabel database `"easylegal"."WhatsAppClick"`. 

Saat ini, data tersebut tersebar di tab "Nomor & Fairness" dan daftar CRM pagination di menu WhatsApp Rotator, namun belum ada **halaman Analytics terpusat** yang memberikan visualisasi komprehensif mengenai:
1. Perbandingan volume dan tren trafik harian antar ketiga domain.
2. Saluran masuk pengunjung (Organic Search Google, Google Ads, Meta Ads, Direct).
3. Halaman layanan dan artikel yang menghasilkan konversi lead tertinggi (Top Converting Pages).
4. Funnel bisnis dari interaksi awal hingga closing transaksi (Won) dan total omset penjualan (`orderValue`).

Tujuan proyek ini adalah membangun halaman **Analytics (`#/analytics`)** yang cepat, informatif, dan terhubung langsung dengan sistem CRM Leads yang sudah berjalan.

---

## 2. Arsitektur Backend & Sumber Data (`apps/api`)

### 2.1 Endpoint Baru: `GET /api/v1/analytics/overview`
Didaftarkan di router Express baru `apps/api/src/routes/analytics.ts` dan dilindungi oleh middleware otentikasi admin (`requireAuth`).

* **Parameter Kueri (Query Parameters)**:
  * `domain`: `'all'` | `'easylegal.id'` | `'easylegal.biz.id'` | `'easylegal.co.id'` (default: `'all'`).
  * `from`: Tanggal awal format `YYYY-MM-DD` (WIB calendar day boundary).
  * `to`: Tanggal akhir format `YYYY-MM-DD` (WIB calendar day boundary).
  * `excludeBot`: `'1'` (default, kecualikan bot/crawler) atau `'0'` (sertakan semua).

* **Struktur Respon Data JSON**:
  ```typescript
  interface AnalyticsOverviewResponse {
    data: {
      funnel: {
        totalClicks: number;       // Total interaksi kotor
        organicLeads: number;      // Lead manusia murni (isSuspectedBot = false)
        botFiltered: number;       // Total bot yang disaring
        contacted: number;         // Lead dengan status != 'NEW'
        won: number;               // Lead dengan status = 'WON'
        totalRevenue: number;      // SUM(orderValue) dari lead yang WON
        closingRate: number;       // (won / organicLeads) * 100
      };
      timeline: Array<{
        date: string;              // YYYY-MM-DD
        total: number;
        id: number;                // easylegal.id
        biz: number;               // easylegal.biz.id
        co: number;                // easylegal.co.id
      }>;
      channels: Array<{
        channel: string;           // ORGANIC_SEARCH, GOOGLE_ADS, META_ADS, DIRECT, REFERRAL
        label: string;
        count: number;
        percentage: number;
      }>;
      topPages: Array<{
        path: string;              // misal: /layanan/nib-oss
        domain: string;
        totalLeads: number;
        wonCount: number;
        revenue: number;
      }>;
      topArticles: Array<{
        slug: string;
        title: string;
        site: string;
        viewCount: number;
        leadsGenerated: number;
      }>;
    };
  }
  ```

### 2.2 Optimasi Kueri Database PostgreSQL
* Menggunakan agregasi `SUM`, `COUNT(...) FILTER (...)`, dan `date_trunc('day', "createdAt" + interval '7 hours')` untuk memetakan tanggal WIB secara akurat.
* Memanfaatkan indeks yang sudah ada di tabel `"WhatsAppClick"` (`createdAt`, `domain`, `status`, `isSuspectedBot`).
* Respon dioptimalkan selesai dalam < 150 milidetik di server produksi.

---

## 3. Tampilan Antarmuka Pengguna (`infra/admin-dashboard`)

### 3.1 Penempatan Rute & Navigasi
* **Rute**: `#/analytics`
* **Sidebar**: Menambahkan item navigasi baru:
  ```typescript
  { label: 'Analytics', icon: '📈', hash: '#/analytics' }
  ```
  Ditempatkan tepat di bawah menu Dashboard utama.

### 3.2 Komponen Halaman `Analytics.tsx`

1. **Header Controller Bar**:
   * **Domain Dropdown**: *Semua Domain*, *easylegal.id*, *easylegal.biz.id*, *easylegal.co.id*.
   * **Preset Periode**: *Hari Ini*, *Kemarin*, *7 Hari Terakhir*, *30 Hari Terakhir*, *Bulan Ini*, *Bulan Lalu*, *Custom Tanggal*.
   * **Checkbox Bot Filter**: *"Sembunyikan Trafik Bot"* (aktif secara default).

2. **KPI Summary Cards (4 Kartu Utama)**:
   * **Total Lead Organik**: Angka lead bersih beserta persentase perbandingan dengan total klik.
   * **Follow-up CS (Contacted)**: Jumlah lead yang sudah direspons tim sales (`status != 'NEW'`).
   * **Deals Closing (Won)**: Jumlah lead yang berhasil menjadi klien berbayar beserta *Closing Rate %*.
   * **Total Omset (Revenue)**: Total nominal rupiah (`Rp ...`) hasil transaksi yang tercatat di CRM.

3. **Visualisasi Grafik (Recharts)**:
   * **Tren Harian Multi-Domain (Stacked Area Chart / Line Chart)**:
     Menampilkan kurva volume lead harian dengan warna pembeda untuk `easylegal.id`, `biz.id`, dan `co.id`.
   * **Komposisi Saluran Masuk (Donut / Pie Chart)**:
     Menampilkan persentase kontribusi saluran: Google SEO, Google Ads, Meta Ads (IG/FB), dan Direct.

4. **Tabel Performa Halaman (Top Converting Pages)**:
   * Kolom: URL Halaman, Domain Utama, Jumlah Lead, Jumlah Closing (Won), Total Omset, dan Aksi.
   * **Tombol Pintas `[CRM ↗]`**:
     Setiap baris halaman memiliki tombol untuk langsung membuka tab CRM WhatsApp Rotator (`#/wa-rotator?tab=leads&product=...`), memudahkan tim untuk melihat daftar nama & nomor WA spesifik dari halaman tersebut.

5. **Tabel Konten Populer (Top Articles)**:
   * Menampilkan daftar 10 artikel teratas: Judul, Domain, Total Pembaca (*viewCount*), dan estimasi lead konsultasi yang dihasilkan.

---

## 4. Penanganan Error & Edge Cases

1. **Empty State**:
   * Jika rentang tanggal belum memiliki data interaksi (misal jam 00:01 WIB), grafik dan kartu metrik menampilkan visual placeholder informatif tanpa memicu error `NaN%` atau pembagian dengan nol.
2. **Format Mata Uang**:
   * `orderValue` diformat menggunakan fungsi utilitas standar Rupiah (`Rp ...`). Nilai `null` dianggap `0` tanpa menggugurkan kalkulasi total.
3. **Session & Keamanan**:
   * Request API menggunakan bearer token JWT admin yang tersimpan di sesi dashboard. Jika sesi habis, pengguna diarahkan ke login secara aman.

---

## 5. Rencana Pengujian (Testing Strategy)

1. **Unit & Integration Test Backend (`apps/api`)**:
   * Menulis file pengujian `apps/api/src/modules/analytics/analytics.test.ts` untuk memvalidasi:
     - Logika kalkulasi `closingRate` dan `totalRevenue`.
     - Filter `excludeBot = 1` mengecualikan baris `isSuspectedBot = true`.
     - Perhitungan tanggal WIB tidak bergeser dari kalender Jakarta.
2. **Frontend Typecheck & Build Test**:
   * Menjalankan `tsc -b && vite build` di `infra/admin-dashboard` untuk memverifikasi kompatibilitas library Recharts, Tailwind styling, dan interface TypeScript.
3. **Verifikasi Server Produksi**:
   * Uji coba live pada `admin.easylegal.my.id/dashboard/#/analytics`.
   * Verifikasi respon query pada domain spesifik dan periode tanggal yang berbeda.
   * Verifikasi navigasi tombol `[CRM ↗]` berpindah ke tab Leads dengan filter aktif.
