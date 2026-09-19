# Spesifikasi Desain: Detail Analytics & Grafik Lengkap Multi-Domain

**Tanggal**: 2026-09-19  
**Status**: Disetujui (Approved)  
**Target Sistem**: `Multiverse88/websiteel-app` (`apps/api`, `infra/admin-dashboard`)  
**Domain Tercakup**: `easylegal.id`, `easylegal.biz.id`, `easylegal.co.id`  

---

## 1. Latar Belakang & Tujuan
Halaman Analytics ringkasan (`#/analytics`) telah berhasil menampilkan gambaran umum trafik dan performa 20 halaman teratas. Namun, manajemen dan tim operasional membutuhkan **analisis mendalam (*Deep Dive Analytics*)** untuk:
1. Mengetahui **pola jam sibuk** (kapan calon klien paling sering mengklik WhatsApp) agar jadwal operasional CS dapat dioptimalkan.
2. Membaca **pola hari dalam seminggu** (perbandingan volume hari kerja vs akhir pekan).
3. Mengamati tren performa dengan filter granulasi waktu yang fleksibel: **Harian, Mingguan, dan Bulanan**.
4. Membandingkan volume minat antar **kategori layanan hukum** (PT, CV, Merek, NIB, ISO, PKP, dll.).
5. Memantau **distribusi aliran lead ke masing-masing nomor WhatsApp CS**.
6. Menjelajahi **seluruh URL halaman** tanpa batas 20 halaman, dilengkapi fitur pencarian (*search*) dan *pagination*.

---

## 2. Arsitektur Backend (`apps/api`)

### 2.1 Endpoint Baru: `GET /api/v1/analytics/detail`
Endpoint ini didaftarkan di router `apps/api/src/routes/analytics.ts` dan diproteksi middleware `requireAuth`.

* **Parameter Kueri (Query Parameters)**:
  * `domain`: `'all'` | `'easylegal.id'` | `'easylegal.biz.id'` | `'easylegal.co.id'` (default: `'all'`).
  * `from`: Tanggal awal format `YYYY-MM-DD` (WIB calendar boundary).
  * `to`: Tanggal akhir format `YYYY-MM-DD` (WIB calendar boundary).
  * `groupBy`: `'day'` | `'week'` | `'month'` (default: `'day'`).
  * `excludeBot`: `'1'` (default) | `'0'`.

* **Struktur Respon JSON**:
  ```typescript
  interface AnalyticsDetailResponse {
    data: {
      hourly: Array<{
        hour: number;          // 0 - 23 (WIB)
        label: string;         // "00:00", "01:00", ... "23:00"
        leads: number;
      }>;
      dayOfWeek: Array<{
        dayIndex: number;      // 1 (Senin) - 7 (Minggu)
        dayName: string;       // "Senin", "Selasa", ... "Minggu"
        leads: number;
      }>;
      trend: Array<{
        bucket: string;        // YYYY-MM-DD (harian), YYYY-WW (mingguan), YYYY-MM (bulanan)
        total: number;
        id: number;
        biz: number;
        co: number;
        bot: number;
      }>;
      services: Array<{
        serviceName: string;   // "Pendirian PT", "Merek & HAKI", "NIB & OSS", dll.
        leads: number;
        percentage: number;
      }>;
      csNumbers: Array<{
        numberId: string;
        label: string;
        number: string;
        leads: number;
        percentage: number;
      }>;
      allPages: Array<{
        path: string;
        domain: string;
        totalLeads: number;
        sharePercent: number;
        topSource: string;
        todayLeads: number;
      }>;
    };
  }
  ```

### 2.2 Kueri Efisien PostgreSQL
* **Jam Sibuk**: Menggunakan `EXTRACT(HOUR FROM "createdAt" + interval '7 hours') AS hour`.
* **Hari dalam Seminggu**: Menggunakan `EXTRACT(ISODOW FROM "createdAt" + interval '7 hours') AS day_index`.
* **Granulasi Waktu (Harian / Mingguan / Bulanan)**: Menggunakan `date_trunc(groupBy, "createdAt" + interval '7 hours')`.
* **Kategori Layanan**: Mengelompokkan pola `product` menggunakan ekspresi `CASE WHEN` SQL (misal `LIKE '%pt%'`, `LIKE '%merek%'`, `LIKE '%nib%'`, dll.).

---

## 3. Tampilan Antarmuka Pengguna (`infra/admin-dashboard`)

### 3.1 Navigasi & Penempatan
* **Navigasi Tab Terpadu**: Di bagian atas halaman `#/analytics`, disediakan toggle tab:
  * **Tab 1: Ringkasan (Overview)**: Tampilan KPI summary cards, tren harian, donat channel, dan Top 20 halaman. Terdapat tombol cepat *"Buka Laporan Detail ↗"*.
  * **Tab 2: Laporan Detail & Grafik Lengkap**: Halaman eksplorasi mendalam (dapat diakses langsung melalui URL hash `#/analytics/detail`).

### 3.2 Kontrol Filter Tab Detail
* **Pilihan Domain**: Dropdown Semua Domain, `easylegal.id`, `biz.id`, `co.id`.
* **Pilihan Periode**: Hari Ini, Kemarin, 7 Hari, 30 Hari, Bulan Ini, Bulan Lalu, Custom.
* **Toggle Granulasi Waktu**: Tombol pill `[ Per Hari | Per Minggu | Per Bulan ]`.
* **Filter Bot**: Checkbox *Sembunyikan Trafik Bot*.

### 3.3 Visualisasi Grafik Lengkap (Recharts)
1. **Pola Waktu Kunjungan (2 Kolom)**:
   * **Grafik Jam Sibuk (Bar Chart 24 Jam)**: Visual bar vertikal interaktif yang memperlihatkan jam kerja terpadat (08:00 - 18:00 WIB).
   * **Grafik Hari dalam Seminggu (Bar Chart 7 Hari)**: Pola perbandingan volume lead hari Senin hingga Minggu.
2. **Grafik Tren Utama & Analisis Kebersihan Trafik (Full Width)**:
   * **Tren Terkelompok**: Menampilkan kurva tren multi-domain yang diagregasikan sesuai pilihan granulasi waktu (harian, mingguan, atau bulanan).
   * **Perbandingan Organik vs Bot (Line Chart)**: Kurva kebersihan trafik memantau lonjakan crawling/bot kompetitor.
3. **Kategori Layanan & Aliran CS (2 Kolom)**:
   * **Popularitas Layanan Hukum (Horizontal Bar Chart)**: Urutan layanan yang paling diminati calon klien.
   * **Distribusi Beban CS (Donut Chart & List)**: Porsi aliran lead ke masing-masing nomor admin CS.
4. **Tabel Eksplorasi Seluruh Halaman (Full Paginated Table)**:
   * Menampilkan semua URL halaman dengan fitur pencarian teks real-time (*search*), sorting kolom, pagination (25 / 50 / 100 baris), dan tombol pintas `[CRM ↗]`.

---

## 4. Penanganan Error & Edge Cases
* **Granulasi Tanpa Data**: Jika rentang waktu pendek (misal "Hari Ini") dipilih dengan granulasi "Bulanan", backend secara anggun mengembalikan 1 data point tanpa error.
* **Kategori Tidak Dikenal**: URL yang tidak cocok dengan 12 layanan standar EasyLegal dikelompokkan ke kategori *Lainnya / Edukasi Umum*.
* **Format Jam & Hari**: Seluruh timestamp telah dikonversi ke waktu Indonesia Barat (WIB / UTC+7).

---

## 5. Rencana Pengujian (Testing Strategy)
1. **Unit Test Backend**: Menguji fungsi ekstraksi jam sibuk, hari dalam seminggu, dan kalkulasi persentase layanan.
2. **Frontend Typecheck & Build**: Memastikan kompatibilitas tipe data Recharts pada bar chart 24 jam dan tabel pagination.
3. **Verifikasi Server Produksi**: Menguji kelancaran perpindahan tab dan keakuratan respon filter Harian/Mingguan/Bulanan secara live.
