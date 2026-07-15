# Planning: Fitur Landing Page Builder Internal

## Latar Belakang & Tujuan

Tim marketing internal butuh fitur untuk merakit landing page sendiri secara visual (drag & drop), lalu publish untuk dipasang di iklan (Meta Ads, Google Ads, TikTok Ads), tanpa harus minta bantuan developer setiap kali ada campaign baru.

## Prinsip Desain

1. **WYSIWYG sejati** — komponen yang tampil di builder sama persis dengan yang tampil di halaman publik. Tidak ada versi "preview" terpisah yang bisa beda hasil.
2. **Section-based, bukan free-canvas** — user merakit dari blok yang sudah didesain (Hero, Banner, Fitur, Testimoni, Form), bukan menggambar bebas seperti Figma. Lebih cepat dibangun, hasil tetap konsisten brand.
3. **Data-driven** — tiap landing page tersimpan sebagai data JSON, bukan kode/HTML custom per halaman. Ini yang memungkinkan drag-drop, edit, dan render ulang secara dinamis.
4. **Cepat & siap iklan** — karena tujuannya untuk campaign iklan, performa loading dan meta tag per halaman adalah kebutuhan inti sejak awal, bukan tambahan belakangan.

## Brainstorming Fitur

### Wajib ada (MVP)
- Daftar semua landing page (draft/published), bisa duplikat halaman lama sebagai starting point
- Builder: tambah, hapus, dan urutkan ulang section lewat drag & drop
- Edit konten tiap section lewat panel samping (bukan halaman terpisah)
- Upload foto & banner per section, dengan preview langsung di canvas
- Preview responsif (toggle tampilan mobile/desktop)
- Publish dengan slug custom, halaman tayang di `/lp/[slug]`
- Form capture leads, tersimpan ke database
- Setting SEO/OG image per halaman (penting untuk preview link saat dishare di iklan/WA)
- Input Pixel ID (Meta Pixel, Google Ads, GTM) per halaman

### Nice-to-have (fase 2)
- Template starter siap pakai, tinggal ganti teks/gambar
- A/B testing dua versi headline/CTA
- Analytics ringkas (kunjungan, conversion rate) di dashboard
- Custom domain per campaign
- Riwayat versi / undo ke versi sebelumnya

### Bisa menyusul (fase 3)
- Multi-user roles/permission (siapa boleh publish)
- Approval flow sebelum publish
- Library gambar/aset terpusat

## Fitur Upload Foto & Banner

**Dipakai di:** hero section, banner promo full-width, gambar produk/fitur, foto testimoni, favicon & OG image.

**Alur:**
1. User klik section yang punya slot gambar → panel edit terbuka
2. Tombol "Upload gambar" atau drag-drop file ke area preview
3. File diupload ke storage eksternal — yang disimpan di database hanya URL-nya (bukan base64, supaya data section tetap ringan)
4. Preview gambar langsung tampil di canvas setelah upload selesai

**Struktur data:**
```typescript
type ImageAsset = { url: string; alt: string; width?: number; height?: number };

{
  type: "hero",
  image: { url: "https://cdn.../hero-agustus.jpg", alt: "Promo Agustus" }
}
```

**Hal teknis penting:**
- Auto-resize/compress saat upload
- Convert otomatis ke format modern (WebP/AVIF)
- Validasi ukuran file maksimal sebelum upload
- Preview crop/aspect ratio tetap (misal hero 16:9, banner 3:1) supaya hasil tidak gepeng

## Struktur Data Section

```typescript
type Section =
  | { type: "hero"; headline: string; subheadline?: string; image: ImageAsset; ctaText: string; ctaLink: string }
  | { type: "banner"; image: ImageAsset; link?: string }
  | { type: "features"; items: { image?: ImageAsset; title: string; desc: string }[] }
  | { type: "testimonials"; items: { photo?: ImageAsset; name: string; quote: string }[] }
  | { type: "leadForm"; title: string; fields: ("nama" | "email" | "no_hp")[] }
  | { type: "richText"; html: string };
```

## Multi Role & Permission

### Role yang tersedia

| Role | Bisa apa | Tidak bisa apa |
|---|---|---|
| **Super admin** | Kelola user & role, buat/edit/hapus/publish landing page, atur integrasi (pixel, GTM), atur redirect URL, lihat semua leads | — |
| **Copywriter** | Buat & edit landing page (teks, gambar, section), simpan draft, ajukan untuk publish | Tidak bisa publish langsung (opsional: butuh approval super admin), tidak bisa kelola user, tidak bisa atur pixel/redirect URL |
| **CRM** | Kelola redirect URL per landing page, lihat & export data leads | Tidak bisa edit isi/desain landing page, tidak bisa kelola user |

### Fitur redirect URL (khusus role CRM)

Setting ini terpisah dari konten section — mengatur ke mana user diarahkan setelah submit form leads (misal ke WhatsApp, halaman thank-you, atau link CRM eksternal seperti HubSpot).

```typescript
type RedirectSettings = {
  enabled: boolean;
  redirectUrl: string;       // contoh: https://wa.me/62812xxxx atau link CRM eksternal
  delaySeconds?: number;     // opsional, delay sebelum redirect
  passUtmParams: boolean;    // teruskan UTM ke redirect URL untuk tracking asal traffic
};
```

Alur: user isi form → data leads tersimpan ke database → browser diarahkan ke `redirectUrl`. Role CRM mengatur ini tanpa perlu akses ke builder konten.

### Implementasi teknis

```prisma
enum Role {
  SUPER_ADMIN
  COPYWRITER
  CRM
}

model User {
  id    String @id @default(cuid())
  email String @unique
  role  Role
  name  String
}

model LandingPage {
  // field sebelumnya...
  redirectSettings Json?   // { enabled, redirectUrl, delaySeconds, passUtmParams }
  createdBy        String
  status           String  // draft | pending_review | published
}
```

Proteksi akses dicek dari session (NextAuth) di tiap route/API — misal endpoint update redirect URL hanya menerima request dari role `CRM` atau `SUPER_ADMIN`, endpoint publish hanya dari `SUPER_ADMIN`.

## Struktur Halaman

```
/admin/landing-pages          → daftar landing page
/admin/landing-pages/[id]     → builder (drag & drop)
/lp/[slug]                    → halaman publik untuk iklan
/api/leads                    → endpoint submit form
```

## Pilihan Teknologi

| Kebutuhan | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js (App Router) | sudah dipakai di website saat ini |
| Drag & drop | `@dnd-kit/core` + `@dnd-kit/sortable` | ringan, aksesibel, komunitas aktif |
| Database | PostgreSQL + Prisma ORM | type-safe, cocok simpan JSON section + relasi leads |
| Simpan section | Kolom `Json` di Prisma | fleksibel, tidak perlu migrasi tiap tambah tipe section baru |
| Rendering publik | SSG/ISR per slug | loading cepat, penting untuk Quality Score iklan |
| Auth internal | NextAuth.js + role-based access control (RBAC) | proteksi rute `/admin/*` sesuai role (super admin, copywriter, CRM) |
| State builder | React state (`useState`/`useReducer`) atau Zustand bila makin kompleks | cukup untuk skala internal |
| Form leads | API Route Next.js → simpan ke DB → opsional notifikasi WhatsApp/Slack | sederhana dan cukup |
| Styling section | Tailwind CSS | cepat untuk styling section yang konsisten |
| Upload gambar | Cloudinary atau Uploadthing | otomatis compress, resize, convert ke WebP/AVIF |
| Analytics dasar | Event submit form + GA4/Meta Pixel client-side | cukup untuk tracking iklan tanpa bangun sistem sendiri |

## Urutan Pembangunan yang Disarankan

1. Schema database + tipe section (fondasi data)
2. Komponen renderer section (dipakai builder & halaman publik, supaya konsisten dari awal)
3. Halaman publik `/lp/[slug]` versi statis (baca data manual dulu)
4. Builder: list + tambah section (urutan tetap dulu, belum drag-drop)
5. Tambahkan drag & drop reorder
6. Panel edit tiap section, termasuk upload gambar
7. Form leads + tracking pixel
8. Auth admin + alur publish
