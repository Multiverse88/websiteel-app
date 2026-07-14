"use server";

import { prisma } from "@/lib/db";
import { generateSecret, generateURI, verifySync } from "otplib";
import * as QRCode from "qrcode";
import fs from "fs/promises";
import path from "path";
import { checkTwoFactorRateLimit, recordTwoFactorFailedAttempt, resetTwoFactorAttempts } from "@/lib/rate-limit";
import { cookies } from "next/headers";
import { trackMetric } from "@/lib/metrics";
import { parsePendingUser } from "@/lib/auth";

const APP_NAME = "EasyLegal";

interface TwoFactorSetup {
  secret: string;
  otpauthUrl: string;
  manualEntryKey: string;
  qrCodeDataUrl: string;
}

async function generateTwoFactorSecret(email: string): Promise<TwoFactorSetup> {
  const secret = generateSecret();
  const otpauthUrl = generateURI({ issuer: APP_NAME, label: email, secret });
  let qrCodeDataUrl = "";

  try {
    qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);
  } catch {
    // Failed to generate base64 QR code
  }

  try {
    const qrFolder = path.join(process.cwd(), "public", "uploads", "2fa");
    await fs.mkdir(qrFolder, { recursive: true });
    const qrPath = path.join(qrFolder, `qr-${email.replace(/[^a-zA-Z0-9]/g, "_")}.png`);
    await QRCode.toFile(qrPath, otpauthUrl);
  } catch {
    // QR file write failed — expected on Vercel serverless
  }

  return { secret, otpauthUrl, manualEntryKey: secret, qrCodeDataUrl };
}

function verifyTwoFactorCode(secret: string, token: string): boolean {
  return verifySync({ token, secret }).valid;
}

async function getPendingUser() {
  const cookieStore = await cookies();
  const pendingUser = cookieStore.get("pending_2fa_user")?.value;
  if (!pendingUser) return null;
  return parsePendingUser(pendingUser);
}

export async function setupTwoFactor() {
  const parsed = await getPendingUser();
  if (!parsed) {
    return { error: "Sesi berakhir. Silakan login kembali." };
  }

  const setup = await generateTwoFactorSecret(parsed.email);

  await prisma.user.update({
    where: { id: parsed.userId },
    data: { twoFactorSecret: setup.secret },
  });

  return {
    manualEntryKey: setup.manualEntryKey,
    qrCodeDataUrl: setup.qrCodeDataUrl,
    message: "Simpan kode ini di Google Authenticator app Anda",
  };
}

export async function verifyTwoFactorSetup(token: string) {
  const parsed = await getPendingUser();
  if (!parsed) {
    return { error: "Sesi berakhir. Silakan login kembali." };
  }

  const rateLimit = checkTwoFactorRateLimit(`2fa-setup:${parsed.userId}`);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.retryAfter || 0) / 60);
    return { error: `Terlalu banyak percobaan. Coba lagi dalam ${minutes} menit.` };
  }

  const user = await prisma.user.findUnique({ where: { id: parsed.userId } });
  if (!user || !user.twoFactorSecret) {
    return { error: "Setup 2FA belum dimulai!" };
  }

  const isValid = verifyTwoFactorCode(user.twoFactorSecret, token);
  if (!isValid) {
    recordTwoFactorFailedAttempt(`2fa-setup:${parsed.userId}`);
    trackMetric("2fa_verify", 1, { status: "failed", action: "setup" });
    return { error: "Kode verifikasi salah! Silakan coba lagi." };
  }

  resetTwoFactorAttempts(`2fa-setup:${parsed.userId}`);

  await prisma.user.update({
    where: { id: parsed.userId },
    data: { twoFactorEnabled: true },
  });

  trackMetric("2fa_verify", 1, { status: "success", action: "setup" });
  return { success: true };
}

export async function verifyTwoFactorLogin(token: string) {
  const parsed = await getPendingUser();
  if (!parsed) {
    return { error: "Sesi verifikasi sudah berakhir. Silakan login kembali." };
  }

  const rateLimit = checkTwoFactorRateLimit(`2fa-login:${parsed.userId}`);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.retryAfter || 0) / 60);
    return { error: `Terlalu banyak percobaan. Coba lagi dalam ${minutes} menit.` };
  }

  const user = await prisma.user.findUnique({ where: { id: parsed.userId } });
  if (!user || !user.twoFactorSecret) {
    return { error: "2FA belum dikonfigurasi!" };
  }

  const isValid = verifyTwoFactorCode(user.twoFactorSecret, token);
  if (!isValid) {
    recordTwoFactorFailedAttempt(`2fa-login:${parsed.userId}`);
    trackMetric("2fa_verify", 1, { status: "failed", action: "login" });
    return { error: "Kode authenticator salah! Silakan coba lagi." };
  }

  resetTwoFactorAttempts(`2fa-login:${parsed.userId}`);
  trackMetric("2fa_verify", 1, { status: "success", action: "login" });
  return { success: true };
}
