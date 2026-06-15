# EasyLegal Dogfooding QA Report
**Date:** 2026-06-15
**Target:** Dev Server (http://localhost:3000)
**Scope:** Full Site (Homepage, Artikel, Cek Nama PT, Kontak, Layanan, Testimoni)

## 1. Executive Summary
Proses QA "dogfooding" dilakukan pada full site `websiteel-app` di environment dev. Secara umum, navigasi dan layout berjalan baik. Form integrasi lead generation untuk WhatsApp berfungsi sesuai ekspektasi. Namun, ditemukan beberapa isu terkait Next.js routing, React key warnings, dan form validation UI.

## 2. Issues Discovered

### Issue 1: Artikel Detail 404 (Blog Slug Mismatch)
* **Severity:** High
* **Status:** Open (Resolved in QA via DB seed, but requires PR/fix for static path generation)
* **Location:** `/artikel/[slug]`
* **Description:** Saat membuka detail artikel dari halaman `/artikel`, Next.js merespons dengan halaman 404. Ini terjadi karena saat Next.js menggunakan `revalidate = 60` pada halaman ISR dengan parameter dinamis `[slug]`, data slug belum tersedia pada saat build, atau DB lokal tidak sinkron.
* **Reproduction:**
  1. Buka `/artikel`.
  2. Klik salah satu card artikel.
  3. Halaman menampilkan 404.
* **Suggested Fix:** Pastikan fungsi `generateStaticParams` mengekspor seluruh list slug dari database agar ISR bisa membuild cache halaman tersebut, atau gunakan `export const dynamicParams = true;` bersamaan dengan dynamic routing.

### Issue 2: Next.js Console Warning - React Key Prop Error di Testimoni
* **Severity:** Low (Dev Environment Only)
* **Status:** Open
* **Location:** `/testimoni` (dan komponen `src/components/home/Testimonials.tsx`)
* **Description:** Terdapat error overlay pada Next.js dev server yang menunjukkan: *"Each child in a list should have a unique 'key' prop"*.
* **Reproduction:** Buka halaman testimoni atau homepage bagian testimoni dengan React DevTools aktif.
* **Suggested Fix:** Pada baris kode `{[...row1Reviews, ...row1Reviews].map((item, idx) => (<a key={idx} ...>))`, ubah `key={idx}` menjadi unique identifier seperti `key={`${item.name}-${idx}`}`.

### Issue 3: Image Aspect Ratio Warning
* **Severity:** Low
* **Status:** Open
* **Location:** Global Navigation / Header (`/Logo EL.png`)
* **Description:** Console menampilkan warning: *"Image with src '/Logo EL.png' has either width or height modified, but not the other."* Hal ini bisa menyebabkan distorsi gambar di resolusi layar tertentu.
* **Suggested Fix:** Tambahkan class Tailwind `w-auto` atau `h-auto` pada image logo untuk memastikan rasio aspek dipertahankan.

### Issue 4: Form Kontak Validation UI (UX Improvement)
* **Severity:** Minor
* **Status:** Open
* **Location:** `/kontak`
* **Description:** Saat user melakukan submit form tanpa mengisi `required` fields (seperti "Topik Konsultasi"), browser menggunakan native HTML5 validation yang terkadang tidak cukup jelas atau hilang tertutup oleh elemen layout (Z-index issue) di beberapa mobile browser. Tidak ada Custom Error State Message.
* **Suggested Fix:** Tambahkan custom validation state dan error text (warna merah di bawah field yang bersangkutan) sebelum mencoba submit ke WhatsApp / Google Form.

## 3. Verified Working Features
* **Lead Generation Cek Nama PT:** Form di header berfungsi baik. Redirect ke URL `https://api.whatsapp.com/send` atau `wa.me` melakukan generate pre-filled text dengan informasi yang sesuai input form.
* **Navigation & Links:** Seluruh anchor navigation (Virtual Office, Cek KBLI, Layanan, Testimoni, Tentang Kami) melakukan routing dengan benar tanpa error JS.
* **Database Prisma:** Seed database berjalan baik, model "Article" berhasil merender ke halaman list artikel.

---
*Report generated automatically via Hermes QA Agent.*