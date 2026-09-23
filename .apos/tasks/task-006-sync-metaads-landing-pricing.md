# APOS-006 — Sinkronisasi paket ke landing Meta Ads

- **Owner**: fullstackiteasylegal
- **Status**: Completed
- **Priority**: High
- **Type**: Routine (landing page pricing update)
- **Scope**: Hanya halaman `/layanan-easylegal-metaads/`
- **References**: `apps/web-id/src/app/layanan-easylegal-metaads/LandingClient.tsx`

## Scope
Menerapkan seluruh perubahan pricing sebelumnya ke landing page Meta Ads target, tanpa mengubah halaman layanan umum (`/layanan/merek-haki`, `/layanan/visa-kitas`, atau halaman badan usaha).

Perubahan:
- Opsi form `KITAS`
- Tab utama `KITAS` setelah `PT PMA`, sebelum `Semua Layanan`
- Paket `Spesial` PT Perorangan sebelum Basic: `Paket Spesial GRATIS VO`, duplikat Complete, VO item 1–5 dicentang
- Paket `Spesial` Daftar Merek sebelum Basic: `Paket Spesial GRATIS NIB`, duplikat Basic, tambah `NIB & Akun OSS RBA`
- Panel KITAS dengan toggle `Kitas TKA` / `Kitas Investor`
- KITAS TKA: Baru Rp42.149.000 dan Perpanjangan Rp38.999.000
- KITAS Investor: 1 Tahun Rp13.999.000 dan 2 Tahun Rp17.999.000
- CTA paket KITAS memakai `data-service="KITAS"`

## Acceptance criteria
- [x] Hanya `LandingClient.tsx` diubah
- [x] Tab `KITAS` berada setelah PT PMA
- [x] Dua paket Spesial tampil di urutan pertama masing-masing panel
- [x] Panel KITAS memuat 4 paket sesuai pricelist
- [x] Build Next.js berhasil

## Validation
- `npm run build` di `apps/web-id`: sukses, exit code 0.
- `npm run lint`: gagal karena error pre-existing di `LandingClient.tsx` (quoted text lama), `ThankYouClient.tsx`, dan `Navbar.tsx`; bukan error TypeScript dari perubahan pricing.
