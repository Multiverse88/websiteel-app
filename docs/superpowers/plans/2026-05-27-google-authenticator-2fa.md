# Google Authenticator 2FA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement 2FA login using Google Authenticator for admin users.

**Architecture:** 2-step login: password verification → TOTP code verification. Setup flow generates QR code as local file, displays manual key in browser. Uses `otplib` for TOTP and `qrcode` for QR generation.

**Tech Stack:** otplib, qrcode, Prisma, Next.js 16 Server Actions

---

### Task 1: Install Dependencies

- [ ] **Step 1: Install otplib and qrcode**

```bash
cd "D:\Folder Kerjaan\websiteEL\websiteel-app"
npm install otplib qrcode @types/qrcode
```

---

### Task 2: Update Prisma Schema

- [ ] **Step 1: Add 2FA fields to User model**

File: `prisma/schema.prisma`

Tambahkan `twoFactorSecret` dan `twoFactorEnabled` ke model `User`:

```prisma
model User {
  id               String    @id @default(cuid())
  email            String    @unique
  password         String
  name             String    @default("Admin")
  avatar           String?
  bio              String?
  role             String    @default("Legal Specialist")
  twoFactorSecret  String?
  twoFactorEnabled Boolean   @default(false)
  createdAt        DateTime  @default(now())
  articles         Article[]
}
```

- [ ] **Step 2: Run migration**

```bash
npx prisma migrate dev --name add-2fa-fields
```

- [ ] **Step 3: Regenerate Prisma client**

```bash
rm -f node_modules/.prisma/client/query_engine-windows.dll.node && npx prisma generate
```

---

### Task 3: Create 2FA Utility Functions

- [ ] **Step 1: Create src/lib/2fa.ts**

```typescript
import { authenticator } from "otplib";
import * as QRCode from "qrcode";
import fs from "fs/promises";
import path from "path";

const APP_NAME = "EasyLegal";

export interface TwoFactorSetup {
  secret: string;
  otpauthUrl: string;
  qrCodeDataUri: string;
  manualEntryKey: string;
}

export async function generateTwoFactorSecret(email: string): Promise<TwoFactorSetup> {
  const secret = authenticator.generateSecret();
  const otpauthUrl = authenticator.keyuri(email, APP_NAME, secret);

  // Generate QR code as data URI (for potential future use)
  const qrCodeDataUri = await QRCode.toDataURL(otpauthUrl);

  // Save QR code as PNG file locally (only admin has access)
  const qrFolder = path.join(process.cwd(), "public", "uploads", "2fa");
  await fs.mkdir(qrFolder, { recursive: true });
  const qrPath = path.join(qrFolder, `qr-${email.replace(/[^a-zA-Z0-9]/g, "_")}.png`);
  await QRCode.toFile(qrPath, otpauthUrl);

  return {
    secret,
    otpauthUrl,
    qrCodeDataUri,
    manualEntryKey: secret,
  };
}

export function verifyTwoFactorCode(secret: string, token: string): boolean {
  return authenticator.verify({ token, secret });
}
```

---

### Task 4: Create 2FA Server Actions

- [ ] **Step 1: Create src/app/login/actions-2fa.ts**

```typescript
"use server";

import { prisma } from "@/lib/db";
import { generateTwoFactorSecret, verifyTwoFactorCode } from "@/lib/2fa";

export async function setupTwoFactor(userId: string, email: string) {
  const setup = await generateTwoFactorSecret(email);

  // Save secret to database (temporarily, until verified)
  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorSecret: setup.secret },
  });

  return {
    manualEntryKey: setup.manualEntryKey,
    message: "Simpan kode ini di Google Authenticator app Anda",
  };
}

export async function verifyTwoFactorSetup(userId: string, token: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.twoFactorSecret) {
    return { error: "Setup 2FA belum dimulai!" };
  }

  const isValid = verifyTwoFactorCode(user.twoFactorSecret, token);
  if (!isValid) {
    return { error: "Kode verifikasi salah! Silakan coba lagi." };
  }

  // Activate 2FA
  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorEnabled: true },
  });

  return { success: true };
}

export async function verifyTwoFactorLogin(userId: string, token: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.twoFactorSecret) {
    return { error: "2FA belum dikonfigurasi!" };
  }

  const isValid = verifyTwoFactorCode(user.twoFactorSecret, token);
  if (!isValid) {
    return { error: "Kode authenticator salah! Silakan coba lagi." };
  }

  return { success: true };
}
```

---

### Task 5: Update Login Flow

- [ ] **Step 1: Update src/lib/auth.ts — add 2FA check to login**

Tambahkan fungsi `loginWithPassword` yang hanya verifikasi password:

```typescript
export async function loginWithPassword(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    twoFactorEnabled: user.twoFactorEnabled,
  };
}
```

- [ ] **Step 2: Update src/app/login/actions.ts — modify login flow**

```typescript
"use server";

import { redirect } from "next/navigation";
import { loginWithPassword, createSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function loginAction(prevState: Record<string, unknown> | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi!" };
  }

  const user = await loginWithPassword(email, password);
  if (!user) {
    return { error: "Email atau password salah!" };
  }

  // Store user info temporarily for 2FA verification
  const cookieStore = await cookies();
  cookieStore.set("pending_2fa_user", JSON.stringify({ userId: user.userId, email: user.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 300, // 5 minutes
    path: "/",
  });

  // Check if 2FA is enabled
  if (user.twoFactorEnabled) {
    redirect("/login/verify-2fa");
  } else {
    redirect("/login/setup-2fa");
  }
}
```

- [ ] **Step 3: Create src/app/login/verify-2fa/page.tsx**

Halaman ini menampilkan form untuk memasukkan kode authenticator.

- [ ] **Step 4: Create src/app/login/verify-2fa/actions.ts**

Server action untuk memverifikasi kode 2FA saat login.

- [ ] **Step 5: Create src/app/login/setup-2fa/page.tsx**

Halaman setup 2FA — tampilkan manual entry key dan form verifikasi.

- [ ] **Step 6: Create src/app/login/setup-2fa/actions.ts**

Server action untuk setup 2FA — generate secret, verifikasi kode pertama.

---

### Task 6: Update Dashboard to Check 2FA Status

- [ ] **Step 1: Update src/app/dashboard/page.tsx**

Cek apakah user sudah setup 2FA. Jika belum, redirect ke setup.

```typescript
// Di bagian atas dashboard page, setelah cek session:
if (!session.twoFactorEnabled) {
  redirect("/login/setup-2fa");
}
```

---

### Task 7: Add .gitignore Entry

- [ ] **Step 1: Update .gitignore**

Tambahkan baris berikut agar QR code files tidak di-deploy ke Vercel:

```
# 2FA QR codes (local only)
public/uploads/2fa/
```

---

### Task 8: Build Verification

- [ ] **Step 1: Run migration**

```bash
npx prisma migrate dev --name add-2fa-fields
```

- [ ] **Step 2: Build**

```bash
npx next build
```

Expected: Build succeeds with 0 errors.

---

### Task 9: Test Flow

- [ ] **Step 1: Login tanpa 2FA → redirect ke setup**

- [ ] **Step 2: Setup 2FA → manual entry key muncul → scan di authenticator app → verifikasi → aktif**

- [ ] **Step 3: Login dengan 2FA → masukkan kode → berhasil**

- [ ] **Step 4: Login dengan kode salah → error**

- [ ] **Step 5: Cek file QR code tersimpan di public/uploads/2fa/**
