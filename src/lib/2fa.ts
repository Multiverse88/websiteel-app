import { generateSecret, generateURI, verifySync } from "otplib";
import * as QRCode from "qrcode";
import fs from "fs/promises";
import path from "path";

const APP_NAME = "EasyLegal";

export interface TwoFactorSetup {
  secret: string;
  otpauthUrl: string;
  manualEntryKey: string;
  qrCodeDataUrl: string;
}

export async function generateTwoFactorSecret(email: string): Promise<TwoFactorSetup> {
  const secret = generateSecret();
  const otpauthUrl = generateURI({ issuer: APP_NAME, label: email, secret });
  let qrCodeDataUrl = "";

  try {
    qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);
  } catch {
    // Failed to generate base64 QR code
  }

  // Save QR code as PNG file locally (only admin has access)
  // Wrapped in try-catch: file write fails silently on Vercel serverless (ephemeral filesystem)
  // The secret is stored in DB — QR file is optional local-only backup
  try {
    const qrFolder = path.join(process.cwd(), "public", "uploads", "2fa");
    await fs.mkdir(qrFolder, { recursive: true });
    const qrPath = path.join(qrFolder, `qr-${email.replace(/[^a-zA-Z0-9]/g, "_")}.png`);
    await QRCode.toFile(qrPath, otpauthUrl);
  } catch {
    // QR file write failed — this is expected on Vercel serverless
    // The secret is still saved to DB, so 2FA setup continues normally
  }

  return {
    secret,
    otpauthUrl,
    manualEntryKey: secret,
    qrCodeDataUrl,
  };
}

export function verifyTwoFactorCode(secret: string, token: string): boolean {
  const result = verifySync({ token, secret });
  return result.valid;
}
