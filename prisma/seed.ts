import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const seedArticles = [
  {
    slug: "panduan-lengkap-cara-mendirikan-pt-2026",
    title: "Panduan Lengkap Cara Mendirikan PT di Indonesia",
    excerpt: "Ingin mendirikan PT untuk bisnis Anda? Pelajari syarat, prosedur terbaru, biaya, serta tips menghindari kesalahan fatal agar usaha Anda segera beroperasi secara legal.",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=800&h=500&q=80",
    category: "Pendirian PT",
    readTime: "5 menit baca",
    content: `### Mengapa Mendirikan PT Adalah Langkah Terbaik untuk Bisnis Anda?

Mendirikan Perseroan Terbatas (PT) merupakan lompatan besar bagi setiap pelaku usaha di Indonesia. Dibandingkan dengan bentuk usaha lainnya seperti CV atau Perorangan, PT menawarkan **pemisahan harta pribadi** dan tanggung jawab hukum yang jelas. Hal ini berarti, jika bisnis mengalami masalah keuangan, aset pribadi Anda tetap aman terlindungi secara hukum.

Selain perlindungan hukum, memiliki PT meningkatkan kredibilitas bisnis Anda secara signifikan di mata klien, perbankan, dan calon investor. Anda akan lebih mudah mengikuti tender proyek besar, mengajukan pinjaman modal kerja, serta menjalin kemitraan strategis dengan perusahaan multinasional.

---

### Prosedur Terbaru Pendirian PT

Sejak berlakunya Undang-Undang Cipta Kerja dan sistem **OSS RBA (Online Single Submission Risk-Based Approach)**, proses pendirian PT kini jauh lebih mudah dan cepat. Berikut adalah langkah-langkah utamanya:

1. **Pemesanan Nama PT**: Nama PT harus terdiri dari minimal 3 kata dalam bahasa Indonesia (kecuali untuk PT Penanaman Modal Asing) dan tidak boleh menyerupai nama instansi pemerintah atau nama PT lain yang sudah terdaftar.
2. **Pembuatan Akta Pendirian di Notaris**: Notaris akan menyusun draf anggaran dasar PT Anda yang berisi tentang modal disetor, kepemilikan saham, dan susunan direksi serta komisaris.
3. **Pengesahan SK Kemenkumham**: Notaris akan mengajukan pengesahan badan hukum ke Kementerian Hukum dan Hak Asasi Manusia (Kemenkumham). Begitu disetujui, PT Anda resmi menjadi badan hukum yang sah.
4. **Pengurusan NPWP Perusahaan**: NPWP Perusahaan kini biasanya diterbitkan otomatis bersamaan dengan pengesahan badan hukum atau dapat diurus online melalui situs pajak.go.id.
5. **Penerbitan Nomor Induk Berusaha (NIB) via OSS**: NIB berfungsi sebagai identitas utama pelaku usaha, Tanda Daftar Perusahaan (TDP), Angka Pengenal Importir (API), sekaligus hak akses kepabeanan.

---

### Tips Memilih Kategori KBLI yang Tepat

Salah satu kesalahan paling fatal bagi pengusaha baru adalah salah memilih kode **KBLI (Klasifikasi Baku Lapangan Usaha Indonesia)** pada saat pengisian data di OSS.
- Pastikan kode KBLI yang Anda pilih sesuai dengan aktivitas bisnis riil yang akan dijalankan.
- Perhatikan apakah bidang usaha tersebut berkategori risiko rendah, menengah, atau tinggi, karena kategori risiko menentukan jenis izin operasional lanjutan yang harus dipenuhi.
- Sebaiknya konsultasikan dengan konsultan hukum berpengalaman sebelum melakukan input data untuk menghindari pengurusan revisi akta yang memakan waktu dan biaya tambahan.

---

### Hubungi EasyLegal untuk Pengurusan Tanpa Ribet

Mengurus legalitas memang memerlukan ketelitian ekstra. Jika Anda ingin fokus pada pengembangan produk dan pemasaran tanpa harus pusing memikirkan dokumen hukum, tim **EasyLegal** siap membantu Anda.

Kami menawarkan paket pendirian PT lengkap, transparan, dan bergaransi sesuai SLA (7-14 hari kerja). Klik tombol di bawah ini untuk berkonsultasi secara gratis dengan tim legal spesialis kami hari ini!`
  },
  {
    slug: "pentingnya-daftar-merek-haki-umkm",
    title: "Mengapa Pendaftaran Merek HAKI Sangat Penting bagi UMKM?",
    excerpt: "Jangan biarkan nama brand yang Anda besarkan dengan susah payah ditiru orang lain. Ketahui pentingnya pendaftaran HAKI beserta panduan langkah demi langkahnya.",
    coverImage: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?fit=crop&w=800&h=500&q=80",
    category: "Merek & HAKI",
    readTime: "4 menit baca",
    content: `### Aset Terpenting Bisnis Anda Adalah Merek Anda

Banyak pengusaha UMKM yang fokus pada penjualan, inovasi produk, dan promosi digital, namun lupa mengamankan aset non-fisik terbesarnya: **Merek Dagang**. Bayangkan jika setelah bertahun-tahun Anda membangun reputasi bisnis, memiliki ribuan followers di media sosial, tiba-tiba ada pihak lain yang mendaftarkan merek tersebut ke DJKI (Direktorat Jenderal Kekayaan Intelektual) dan melayangkan somasi agar Anda mengganti nama brand Anda.

Kasus perebutan merek seperti ini sangat sering terjadi di Indonesia. Berdasarkan hukum merek Indonesia yang menganut sistem **"First to File"**, siapa saja yang mendaftarkan merek tersebut pertama kali secara sah ke negara, dialah yang berhak memegang hak eksklusif atas merek tersebut. Tidak peduli seberapa lama Anda sudah menggunakan merek tersebut di pasaran.

---

### Manfaat Utama Mendaftarkan Merek HAKI

Mendaftarkan merek bukan sekadar bentuk kepatuhan hukum, melainkan langkah perlindungan investasi bisnis jangka panjang:

* **Hak Eksklusif & Perlindungan Hukum**: Anda memiliki hak tunggal untuk menggunakan merek tersebut di wilayah Republik Indonesia untuk jangka waktu 10 tahun (dan dapat diperpanjang).
* **Mencegah Plagiarisme**: Anda berhak melarang orang lain menggunakan nama merek yang sama atau mirip (ada persamaan pada pokoknya) untuk kelas barang atau jasa sejenis.
* **Aset Finansial Bernilai Tinggi**: Merek yang terdaftar dapat dinilai secara ekonomi, dapat dilisensikan (waralaba/franchise), dialihkan, bahkan dapat dijadikan jaminan fidusia.
* **Meningkatkan Nilai Jual Brand**: Konsumen merasa lebih aman dan percaya membeli produk dari brand yang sudah resmi terdaftar dengan logo ® atau ™.

---

### Tahapan Pendaftaran Merek di DJKI

Proses pendaftaran merek kini dilakukan 100% secara online melalui portal resmi DJKI Kemenkumham:

1. **Penelusuran Merek (Analisis Awal)**: Melakukan pengecekan database merek yang terdaftar di DJKI untuk memastikan tidak ada nama atau logo yang memiliki kemiripan dengan merek Anda.
2. **Penentuan Kelas Barang/Jasa**: Menentukan kategori kelas berdasarkan sistem klasifikasi Nice. Pemilihan kelas ini menentukan cakupan perlindungan hukum merek Anda.
3. **Pengisian Permohonan & Pembayaran**: Mengisi formulir elektronik, mengunggah label merek (logo), tanda tangan pemohon, serta membayar PNBP.
4. **Pemeriksaan Formalitas & Publikasi**: DJKI melakukan pengecekan kelengkapan berkas, dilanjutkan masa publikasi selama 2 bulan.
5. **Pemeriksaan Substantif**: Pemeriksa merek DJKI akan menilai kelayakan merek Anda berdasarkan UU No. 20 Tahun 2016 tentang Merek dan Indikasi Geografis.
6. **Penerbitan Sertifikat Merek**: Jika lolos pemeriksaan substantif, sertifikat merek resmi akan diterbitkan.

---

### Amankan Merek Anda Sekarang Bersama EasyLegal

Jangan tunda perlindungan brand Anda hingga kompetitor mendahuluinya. Proses pendaftaran merek membutuhkan ketelitian tinggi saat melakukan penelusuran kemiripan dan pemilihan kelas barang/jasa.

Tim konsultan HAKI terdaftar di **EasyLegal** siap melakukan penelusuran mendalam, menyusun dokumen permohonan, hingga mengawal proses pendaftaran merek Anda di DJKI sampai terbit sertifikat resmi. Hubungi kami sekarang untuk konsultasi awal gratis!`
  },
  {
    slug: "cara-mendapatkan-sertifikasi-iso-9001",
    title: "Cara Mendapatkan Sertifikasi ISO 9001 untuk Bisnis Anda",
    excerpt: "Sertifikasi ISO 9001 bukan sekadar stempel. Ia adalah bukti bahwa manajemen mutu bisnis Anda memenuhi standar internasional. Simak panduan lengkap pengurusannya.",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=800&h=500&q=80",
    category: "Sertifikasi ISO",
    readTime: "6 menit baca",
    content: `### Apa Itu Sertifikasi ISO 9001?

**ISO 9001** adalah standar internasional untuk **Sistem Manajemen Mutu (SMM)**. Standar ini membantu organisasi dan perusahaan di seluruh dunia untuk memastikan bahwa mereka secara konsisten menyediakan produk dan layanan yang memenuhi kebutuhan pelanggan serta mematuhi persyaratan hukum dan peraturan yang berlaku.

Menerapkan ISO 9001 berarti perusahaan Anda berkomitmen pada siklus **PDCA (Plan-Do-Check-Act)** untuk perbaikan berkelanjutan (continuous improvement).

---

### Mengapa Bisnis Anda Membutuhkan ISO 9001?

Sertifikasi ISO 9001 memberikan banyak keuntungan kompetitif, terutama bagi bisnis B2B dan industri jasa konstruksi, manufaktur, serta teknologi:

* **Syarat Wajib Tender**: Sebagian besar tender pemerintah, BUMN, maupun proyek swasta skala besar mewajibkan peserta tender memiliki sertifikasi ISO 9001 yang aktif.
* **Meningkatkan Efisiensi Operasional**: Penerapan SOP yang ketat mengurangi tingkat kesalahan kerja, meminimalkan pemborosan sumber daya, dan memangkas biaya operasional.
* **Kepercayaan Klien Internasional**: Memiliki sertifikasi ISO mempermudah produk atau layanan Anda untuk diterima di pasar ekspor global.
* **Peningkatan Kepuasan Pelanggan**: Dengan proses kerja yang konsisten, kualitas produk atau layanan Anda akan selalu terjaga pada tingkat terbaik.

---

### 5 Langkah Mendapatkan Sertifikasi ISO 9001

1. **Gap Analysis**: Meninjau sistem manajemen yang saat ini berjalan dan membandingkannya dengan persyaratan standar ISO 9001:2015.
2. **Perancangan SOP & Dokumentasi**: Membuat atau merevisi dokumen wajib seperti manual mutu, kebijakan mutu, sasaran mutu, serta berbagai SOP.
3. **Implementasi & Pelatihan**: Menerapkan SOP yang baru dirancang ke dalam aktivitas kerja sehari-hari.
4. **Audit Internal & Rapat Tinjauan Manajemen**: Melakukan evaluasi internal secara independen.
5. **Audit Eksternal oleh Badan Sertifikasi**: Auditor independen dari Badan Sertifikasi resmi akan melakukan audit.

---

### Konsultasi Pengurusan ISO 9001 yang Cepat dan Terpercaya

**EasyLegal** hadir sebagai mitra andalan Anda untuk menyederhanakan proses sertifikasi ISO 9001. Mulai dari penyusunan dokumen, bimbingan implementasi, pendampingan audit, hingga penerbitan sertifikat ISO resmi — semua kami urus sampai tuntas.`
  },
  {
    slug: "update-kbli-2025-panduan-memilih-kode-usaha",
    title: "Update KBLI 2025: Panduan Memilih Kode Klasifikasi Usaha yang Tepat",
    excerpt: "KBLI 2025 hadir dengan perubahan signifikan. Pelajari cara memilih kode KBLI yang benar agar perizinan bisnis Anda tidak tertolak dan operasional berjalan lancar.",
    coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?fit=crop&w=800&h=500&q=80",
    category: "KBLI",
    readTime: "5 menit baca",
    content: `### Apa Itu KBLI dan Mengapa Penting?

**KBLI (Klasifikasi Baku Lapangan Usaha Indonesia)** adalah sistem pengkodean resmi yang digunakan oleh pemerintah Indonesia untuk mengklasifikasikan jenis kegiatan usaha. Setiap bidang usaha memiliki kode KBLI yang spesifik, dan pemilihan kode yang tepat menjadi syarat mutlak dalam pengurusan Nomor Induk Berusaha (NIB) melalui sistem OSS RBA.

Kesalahan dalam memilih kode KBLI dapat menyebabkan penolakan permohonan NIB, kesalahan penentuan tingkat risiko usaha, hingga potensi sanksi administratif di kemudian hari.

---

### Perubahan KBLI 2025 yang Perlu Anda Ketahui

Pemerintah secara berkala melakukan pembaruan terhadap klasifikasi KBLI untuk menyesuaikan dengan perkembangan ekonomi dan teknologi:

* **Penambahan Kode Baru**: KBLI 2025 memperkenalkan kode-kode baru untuk sektor ekonomi digital, fintech, dan industri kreatif yang sebelumnya belum terakomodasi.
* **Penggabungan Beberapa Kode**: Beberapa kode lama yang tumpang tindih digabungkan menjadi satu kode yang lebih komprehensif.
* **Penyesuaian Tingkat Risiko**: Beberapa bidang usaha mengalami perubahan kategori risiko (rendah, menengah, tinggi) yang berdampak pada jenis izin yang diperlukan.

---

### Cara Memilih Kode KBLI yang Tepat

1. **Identifikasi Aktivitas Usaha Utama**: Tentukan kegiatan bisnis inti yang menjadi sumber pendapatan utama perusahaan Anda.
2. **Cek KBLI 2025 Terbaru**: Gunakan referensi resmi dari Badan Pusat Statistik (BPS) atau portal OSS untuk melihat daftar lengkap kode KBLI.
3. **Perhatikan Klasifikasi Risiko**: Pastikan Anda memahami tingkat risiko dari kode KBLI yang dipilih karena akan menentukan jenis izin operasional yang dibutuhkan.
4. **Konsultasi dengan Ahli**: Jika ragu, konsultasikan dengan konsultan hukum atau perizinan yang berpengalaman.

---

### Konsultasi Pemilihan KBLI Bersama EasyLegal

Tim **EasyLegal** siap membantu Anda dalam menentukan kode KBLI yang tepat untuk bisnis Anda. Kami juga mengurus seluruh proses perizinan dari NIB hingga izin operasional lainnya. Hubungi kami sekarang!`
  },
  {
    slug: "panduan-lengkap-nib-oss-umkm-2026",
    title: "Panduan Lengkap NIB & OSS RBA untuk UMKM Indonesia 2026",
    excerpt: "NIB adalah izin usaha wajib bagi setiap pelaku usaha di Indonesia. Simak panduan lengkap cara membuat NIB melalui OSS RBA, syarat, biaya, dan tips agar cepat approved.",
    coverImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?fit=crop&w=800&h=500&q=80",
    category: "Perizinan",
    readTime: "6 menit baca",
    content: `### Apa Itu NIB dan OSS RBA?

**Nomor Induk Berusaha (NIB)** adalah identitas resmi pelaku usaha yang diterbitkan oleh pemerintah melalui sistem **OSS RBA (Online Single Submission Risk-Based Approach)**. NIB berlaku sebagai:
- Tanda Daftar Perusahaan (TDP)
- Angka Pengenal Importir (API)
- Akses kepabeanan
- Nomor Induk Kepabeanan (NIK)

Sejak diberlakukannya UU Cipta Kerja, setiap pelaku usaha di Indonesia — baik PT, CV, maupun perorangan — wajib memiliki NIB sebelum memulai kegiatan operasional.

---

### Syarat Membuat NIB

Dokumen yang diperlukan untuk pengurusan NIB:
1. **KTP** Penanggung Jawab/Pemilik
2. **NPWP** (Pribadi atau Perusahaan)
3. **Akta Pendirian** & SK Kemenkumham (khusus PT)
4. **Kode KBLI** yang sesuai dengan bidang usaha

---

### Langkah Membuat NIB via OSS

1. **Registrasi Akun OSS**: Buat akun di portal oss.go.id menggunakan email dan data diri.
2. **Isi Data Pelaku Usaha**: Lengkapi profil perusahaan, alamat, dan data penanggung jawab.
3. **Pilih KBLI**: Pilih kode klasifikasi usaha yang sesuai.
4. **Konfirmasi Komitmen**: Untuk usaha dengan risiko menengah-tinggi, Anda perlu mengisi komitmen pemenuhan izin.
5. **NIB Terbit**: NIB langsung diterbitkan secara otomatis oleh sistem.

---

### Tips Agar NIB Cepat Approved

- Pastikan data sesuai dengan dokumen resmi
- Pilih kode KBLI dengan tepat
- Gunakan koneksi internet stabil saat mengisi data
- Jika terkendala, gunakan jasa konsultan perizinan

**EasyLegal** siap membantu pengurusan NIB dan perizinan usaha Anda secara lengkap dan cepat. Hubungi tim kami untuk konsultasi gratis!`
  },
  {
    slug: "pt-perorangan-vs-pt-biasa-mana-yang-tepat",
    title: "PT Perorangan vs PT Biasa: Mana yang Tepat untuk Bisnis Anda?",
    excerpt: "Bingung memilih antara PT Perorangan dan PT Biasa? Simak perbandingan lengkap dari segi modal, tanggung jawab hukum, prosedur, hingga kapan masing-masing cocok digunakan.",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?fit=crop&w=800&h=500&q=80",
    category: "Legalitas PT",
    readTime: "5 menit baca",
    content: `### PT Perorangan vs PT Biasa: Apa Bedanya?

Sejak berlakunya UU Cipta Kerja, pengusaha di Indonesia memiliki dua opsi utama dalam mendirikan badan hukum berbentuk PT: **PT Perorangan** dan **PT Biasa (Persekutuan Modal)**. Masing-masing memiliki karakteristik, kelebihan, dan kekurangan yang perlu Anda pahami sebelum memilih.

---

### PT Perorangan

**Cocok untuk**: UMKM, freelancer, dan usaha kecil yang didirikan oleh satu orang.

Kelebihan:
- **Mudah didirikan**: Cukup 1 orang, tanpa akta notaris
- **Modal minimal**: Tidak ada ketentuan modal minimum
- **Biaya lebih murah**: Proses lebih sederhana tanpa perlu SK Kemenkumham
- **Online & cepat**: Proses melalui OSS saja

Kekurangan:
- **Tidak ada pemisahan aset**: Tanggung jawab tidak terbatas seperti PT Biasa
- **Tidak bisa menerbitkan saham**: Struktur modal lebih sederhana
- **Terbatas untuk UMKM**: Omzet maksimal sesuai kriteria UMKM

---

### PT Biasa (Persekutuan Modal)

**Cocok untuk**: Usaha menengah-besar, bisnis dengan investor, dan perusahaan yang membutuhkan kredibilitas tinggi.

Kelebihan:
- **Pemisahan aset jelas**: Tanggung jawab pemegang saham terbatas
- **Kredibilitas lebih tinggi**: Dipercaya bank, investor, dan mitra besar
- **Fleksibel**: Bisa menerbitkan saham dan menarik investor
- **Skalabilitas**: Tidak terbatas omzet

Kekurangan:
- **Proses lebih panjang**: Harus melalui notaris dan SK Kemenkumham
- **Biaya lebih besar**: Melibatkan biaya notaris dan pengesahan
- **Minimal 2 orang**: Harus memiliki minimal 2 pemegang saham

---

### Kapan Memilih Masing-Masing?

| Aspek | PT Perorangan | PT Biasa |
|-------|--------------|----------|
| Jumlah Pendiri | 1 orang | Minimal 2 orang |
| Modal | Tanpa minimal | Sesuai kesepakatan |
| Akta Notaris | Tidak perlu | Wajib |
| SK Kemenkumham | Tidak perlu | Wajib |
| Tanggung Jawab | Tidak terbatas | Terbatas |
| Cocok untuk | UMKM | Semua skala |

---

### Konsultasi dengan EasyLegal

Tim **EasyLegal** siap membantu Anda menentukan struktur badan usaha yang paling sesuai dengan kebutuhan bisnis Anda. Kami mengurus pendirian PT Perorangan maupun PT Biasa secara lengkap dan transparan. Hubungi kami untuk konsultasi gratis!`
  },
  {
    slug: "panduan-pajak-umkm-sederhana",
    title: "Panduan Praktis Pajak UMKM: Cara Hitung dan Lapor",
    excerpt: "Bingung cara menghitung dan melaporkan pajak bisnis UMKM Anda? Simak panduan praktis mengenai tarif PPh Final 0.5% dan batas waktu pembayarannya.",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?fit=crop&w=800&h=500&q=80",
    category: "Pajak",
    readTime: "5 menit baca",
    content: `### Pentingnya Kepatuhan Pajak bagi UMKM
    
Kepatuhan pajak bukan hanya kewajiban konstitusional, tetapi juga instrumen penting untuk memprofesionalkan bisnis UMKM Anda. Dengan administrasi pajak yang rapi, bisnis Anda akan lebih mudah mengakses pembiayaan perbankan, mendapatkan legalitas formal (seperti PKP), serta menghindari denda administratif yang merugikan.

Pemerintah Indonesia menawarkan kemudahan melalui PPh Final PP 23/2018 (sebesar 0,5% dari omzet bruto) khusus bagi pelaku usaha dengan omzet di bawah Rp4,8 Miliar per tahun.

---

### Cara Menghitung PPh Final 0,5%
Perhitungan PPh Final UMKM tergolong sangat mudah karena tidak memerlukan pembukuan rumit, melainkan cukup pencatatan omzet (peredaran bruto) bulanan:
- **Contoh**: Jika omzet kedai kopi Anda di bulan Januari 2026 adalah Rp50.000.000, maka PPh Final yang harus dibayar adalah:
  0,5% x Rp50.000.000 = Rp250.000.
- **Catatan Penting (UU Harmonisasi Peraturan Perpajakan)**: Bagi wajib pajak orang pribadi (perorangan), omzet sampai dengan Rp500.000.000 dalam satu tahun pajak dibebaskan dari pengenaan PPh Final. Jadi Anda baru membayar pajak setelah total omzet tahunan melewati batas Rp500 juta.

---

### Batas Waktu Pembayaran dan Pelaporan
- **Pembayaran Bulanan**: PPh Final harus disetor paling lambat tanggal 15 bulan berikutnya setelah masa pajak berakhir.
- **Pelaporan Tahunan**: Meskipun telah membayar setiap bulan, pelaku usaha wajib melaporkan SPT Tahunan PPh paling lambat tanggal 31 Maret tahun berikutnya untuk Wajib Pajak Orang Pribadi, dan 30 April untuk Wajib Pajak Badan.`
  },
  {
    slug: "pkp-atau-non-pkp-pilihan-pajak",
    title: "PKP atau Non-PKP? Panduan Memilih Status Pajak Usaha",
    excerpt: "Ketahui perbedaan antara Pengusaha Kena Pajak (PKP) dan Non-PKP, serta keuntungan masing-masing status bagi kredibilitas dan transaksi bisnis Anda.",
    coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fit=crop&w=800&h=500&q=80",
    category: "Pajak",
    readTime: "6 menit baca",
    content: `### Apa Perbedaan PKP dan Non-PKP?
    
Secara garis besar, **Pengusaha Kena Pajak (PKP)** adalah pengusaha yang melakukan penyerahan Barang Kena Pajak (BKP) atau Jasa Kena Pajak (JKP) yang dikenai pajak berdasarkan UU Pajak Pertambahan Nilai (PPN). Sedangkan **Non-PKP** adalah pelaku usaha kecil yang belum dikukuhkan sebagai PKP.

Undang-Undang menetapkan bahwa perusahaan dengan omzet di atas **Rp4,8 Miliar per tahun wajib** dikukuhkan sebagai PKP. Jika omzet masih di bawah batas tersebut, perusahaan dibolehkan memilih (opsional) untuk menjadi PKP atau tetap Non-PKP.

---

### Kapan Sebaiknya Memilih Status PKP?
Menjadi PKP menawarkan keuntungan tersendiri, antara lain:
1. **Dapat Bertransaksi dengan Instansi Pemerintah & BUMN**: Sebagian besar proyek pemerintah atau tender perusahaan besar mensyaratkan status PKP untuk menerbitkan Faktur Pajak.
2. **Kredibilitas Bisnis Meningkat**: Perusahaan Anda dinilai bonafide secara hukum dan kepatuhan perpajakan.
3. **Mekanisme Pajak Masukan-Keluaran**: Anda bisa melakukan pengkreditan pajak atas pembelian bahan baku (Pajak Masukan) sehingga mengurangi beban pajak riil.`
  },
  {
    slug: "strategi-branding-merek-baru",
    title: "5 Fondasi Utama Membangun Identitas Brand yang Dipercaya",
    excerpt: "Brand kuat bukan cuma soal logo bagus. Pelajari cara menentukan visi, riset kompetitor, serta konsistensi warna untuk membuat merek Anda melekat di hati konsumen.",
    coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?fit=crop&w=800&h=500&q=80",
    category: "Branding",
    readTime: "5 menit baca",
    content: `### Branding: Kunci Sukses Bisnis Jangka Panjang
    
Banyak pengusaha pemula mengira bahwa branding adalah sekadar logo dan nama bisnis. Faktasnya, branding adalah persepsi atau ikatan emosional antara produk Anda dengan hati para pelanggan. Branding yang baik menceritakan cerita, menyampaikan nilai-nilai perusahaan, dan memberikan janji kualitas yang konsisten.

---

### 5 Fondasi Penting Membangun Brand
1. **Definisikan Visi dan Target Pasar**: Siapa konsumen ideal Anda? Apa masalah mereka yang ingin Anda selesaikan?
2. **Tentukan Unique Selling Proposition (USP)**: Apa keunggulan produk Anda yang tidak dimiliki oleh kompetitor lain?
3. **Rancang Identitas Visual yang Konsisten**: Pilih palet warna, jenis huruf (typography), dan logo yang mencerminkan karakter brand Anda.
4. **Gunakan Tone of Voice yang Sesuai**: Gaya bahasa dalam komunikasi (media sosial, layanan pelanggan) harus konsisten, apakah formal, santai, humoris, atau edukatif.
5. **Jaga Konsistensi Janji Brand**: Merek yang kuat dibangun di atas fondasi kepercayaan. Pastikan kualitas produk dan pelayanan selalu stabil.`
  },
  {
    slug: "cara-cek-merek-diterima-djki",
    title: "Cara Cek Merek Dagang Agar Tidak Ditolak oleh DJKI",
    excerpt: "Sebelum mendaftarkan merek Anda, lakukan penelusuran mandiri dengan panduan ini untuk menekan risiko penolakan akibat kemiripan dengan merek lain.",
    coverImage: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?fit=crop&w=800&h=500&q=80",
    category: "Merek & HAKI",
    readTime: "4 menit baca",
    content: `### Mengapa Merek Sering Ditolak DJKI?
    
Lebih dari 30% permohonan pendaftaran merek ditolak oleh DJKI (Direktorat Jenderal Kekayaan Intelektual). Alasan paling umum penolakan tersebut adalah **adanya persamaan pada pokoknya** atau secara keseluruhan dengan merek terdaftar milik pihak lain untuk kelas barang atau jasa yang sejenis.

Penolakan merek ini mengakibatkan kerugian biaya PNBP yang sudah dibayarkan (tidak dapat ditarik kembali) serta hilangnya waktu tunggu pemeriksaan yang memakan waktu berbulan-bulan.

---

### Cara Melakukan Penelusuran Merek Mandiri
Sebelum mengajukan pendaftaran, pastikan Anda menempuh langkah-langkah berikut:
1. **Buka Database DJKI**: Akses portal resmi penelusuran merek di pdki-indonesia.dgky.go.id.
2. **Ketik Nama Merek**: Masukkan nama merek Anda. Lakukan variasi pencarian (e.g., penulisan digabung, dipisah, ejaan fonetik mirip).
3. **Analisis Kemiripan**: Periksa apakah ada merek terdaftar dengan ejaan, pengucapan suara (fonetik), atau visual logo yang mirip di kelas barang/jasa yang sama.`
  }
];

async function main() {
  // Check if database already has articles
  const existingCount = await prisma.article.count();
  const forceSeed = process.env.FORCE_SEED === "true" || process.argv.includes("--force");

  if (existingCount > 0) {
    if (!forceSeed) {
      console.log(`\n[SEED] Database already has ${existingCount} articles. Skipping seed to prevent data loss.`);
      console.log(`[SEED] To force re-seed (which will clear all articles), run: FORCE_SEED=true node prisma/seed.js\n`);
      return;
    }
    console.log(`Clearing ${existingCount} existing articles before re-seed (FORCE_SEED is active)...`);
    await prisma.article.deleteMany({});
  }

  // Load articles from JSON file (190 artikel dari database lama)
  const seedArticlesPath = path.join(__dirname, "articles-seed.json");
  if (!fs.existsSync(seedArticlesPath)) {
    throw new Error(`Seed data file not found at: ${seedArticlesPath}`);
  }

  console.log(`Reading seed articles from ${seedArticlesPath}...`);
  const seedArticlesRaw = fs.readFileSync(seedArticlesPath, "utf-8");
  const rawArticles = JSON.parse(seedArticlesRaw);

  console.log(`Preparing ${rawArticles.length} articles from JSON...`);
  const parsedJsonArticles = rawArticles.map((art: any) => ({
    id: art.id,
    slug: art.slug,
    title: art.title,
    excerpt: art.excerpt,
    content: art.content,
    coverImage: art.coverImage,
    category: art.category,
    readTime: art.readTime,
    createdAt: new Date(art.createdAt),
    updatedAt: new Date(art.createdAt)
  }));

  // Gabungkan 10 artikel inline + 190 artikel dari JSON
  // Filter duplikat slug agar tidak bentrok
  const jsonSlugs = new Set(parsedJsonArticles.map((a: any) => a.slug));
  const uniqueInlineArticles = seedArticles.filter(a => !jsonSlugs.has(a.slug));

  console.log(`Combining ${uniqueInlineArticles.length} inline articles + ${parsedJsonArticles.length} database articles...`);
  const allArticles = [...parsedJsonArticles, ...uniqueInlineArticles];

  console.log(`Seeding total ${allArticles.length} articles into database...`);
  await prisma.article.createMany({
    data: allArticles,
  });
  console.log(`✅ Seeded ${allArticles.length} articles successfully.`);
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
