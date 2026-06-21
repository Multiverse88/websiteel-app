"use server";

import { prisma } from "@/lib/db";
import { generateTwoFactorSecret, verifyTwoFactorCode } from "@/lib/2fa";
import { checkTwoFactorRateLimit, recordTwoFactorFailedAttempt, resetTwoFactorAttempts } from "@/lib/rate-limit";
import { cookies } from "next/headers";
import { trackMetric } from "@/lib/metrics";

export async function setupTwoFactor(userId: string, email: string) {
  const setup = await generateTwoFactorSecret(email);

  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorSecret: setup.secret },
  });

  return {
    manualEntryKey: setup.manualEntryKey,
    qrCodeDataUrl: setup.qrCodeDataUrl,
    message: "Simpan kode ini di Google Authenticator app Anda",
  };
}

export async function verifyTwoFactorSetup(userId: string, token: string) {
  const rateLimit = checkTwoFactorRateLimit(`2fa-setup:${userId}`);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.retryAfter || 0) / 60);
    return { error: `Terlalu banyak percobaan. Coba lagi dalam ${minutes} menit.` };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.twoFactorSecret) {
    return { error: "Setup 2FA belum dimulai!" };
  }

  const isValid = verifyTwoFactorCode(user.twoFactorSecret, token);
  if (!isValid) {
    recordTwoFactorFailedAttempt(`2fa-setup:${userId}`);
    trackMetric("2fa_verify", 1, { status: "failed", action: "setup" });
    return { error: "Kode verifikasi salah! Silakan coba lagi." };
  }

  resetTwoFactorAttempts(`2fa-setup:${userId}`);

  await prisma.user.update({
    where: { id: userId },
    data: { twoFactorEnabled: true },
  });

  trackMetric("2fa_verify", 1, { status: "success", action: "setup" });
  return { success: true };
}

export async function verifyTwoFactorLogin(userId: string, token: string) {
  const rateLimit = checkTwoFactorRateLimit(`2fa-login:${userId}`);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.retryAfter || 0) / 60);
    return { error: `Terlalu banyak percobaan. Coba lagi dalam ${minutes} menit.` };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.twoFactorSecret) {
    return { error: "2FA belum dikonfigurasi!" };
  }

  const isValid = verifyTwoFactorCode(user.twoFactorSecret, token);
  if (!isValid) {
    recordTwoFactorFailedAttempt(`2fa-login:${userId}`);
    trackMetric("2fa_verify", 1, { status: "failed", action: "login" });
    return { error: "Kode authenticator salah! Silakan coba lagi." };
  }

  resetTwoFactorAttempts(`2fa-login:${userId}`);
  trackMetric("2fa_verify", 1, { status: "success", action: "login" });
  return { success: true };
}
