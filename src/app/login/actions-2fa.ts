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
    qrCodeDataUrl: setup.qrCodeDataUrl,
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
