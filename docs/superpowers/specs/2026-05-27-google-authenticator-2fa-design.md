# Google Authenticator 2FA — Design Spec

## Overview
Fitur 2-Factor Authentication (2FA) menggunakan Google Authenticator untuk login admin. Setiap login harus melewati 2 step: password + kode authenticator.

## Goals
- Keamanan login admin dengan 2FA
- Setup 2FA wajib saat pertama kali login
- User experience yang smooth dengan QR code

## Architecture

### Login Flow
1. Admin masukkan email + password di `/login`
2. Jika password benar, cek `twoFactorEnabled` di database
3. Jika 2FA belum aktif → redirect ke `/login/setup-2fa`
4. Jika 2FA sudah aktif → redirect ke `/login/verify-2fa`
5. Jika kode authenticator valid → buat session JWT → redirect ke `/dashboard`

### Setup Flow (First Login)
1. Generate TOTP secret
2. Generate QR code dan simpan sebagai file PNG di folder lokal `public/uploads/2fa/` (tidak ditampilkan di browser)
3. Tampilkan manual entry key (secret) di browser agar admin bisa input manual di Google Authenticator app
4. Admin masukkan 6-digit kode verifikasi
5. Jika kode valid → simpan secret ke database → 2FA aktif
6. Redirect ke dashboard

### QR Code Handling
- QR code di-generate sebagai file PNG dan disimpan di folder lokal `public/uploads/2fa/`
- File tidak di-deploy ke Vercel (di-gitignore)
- Hanya admin yang punya akses ke file QR code tersebut
- Di halaman setup, tampilkan manual entry key saja (bukan QR code)

### Database Schema Changes
Tambah field di `User` model:
```prisma
model User {
  id                String    @id @default(cuid())
  email             String    @unique
  password          String
  name              String    @default("Admin")
  avatar            String?
  bio               String?
  role              String    @default("Legal Specialist")
  twoFactorSecret   String?   // TOTP secret (encrypted)
  twoFactorEnabled  Boolean   @default(false)
  createdAt         DateTime  @default(now())
  articles          Article[]
}
```

### Pages
- `/login/verify-2fa` — halaman masukkan kode authenticator
- `/login/setup-2fa` — halaman setup 2FA (QR code + verifikasi)

### Dependencies
- `otplib` — generate & verify TOTP
- `qrcode` — generate QR code SVG

### Security Considerations
- TOTP secret di-encrypt sebelum disimpan di database
- Rate limiting pada verification attempts
- Backup codes untuk recovery (optional, bisa ditambahkan nanti)

## Verification
1. Login tanpa 2FA → redirect ke setup
2. Setup 2FA → QR code muncul → scan → verifikasi → aktif
3. Login dengan 2FA → masukkan kode → berhasil
4. Login dengan kode salah → error
5. Login tanpa 2FA (langsung akses dashboard) → redirect ke login
