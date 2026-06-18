// Script untuk generate ulang QR Code 2FA dari secret yang tersimpan di DB
// Jalankan: node scripts/get-2fa-qr.mjs

import { PrismaClient } from "@prisma/client";
import QRCode from "qrcode";
import { generateURI } from "otplib";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const prisma = new PrismaClient();
const APP_NAME = "EasyLegal";

async function main() {
  // Ambil semua user yang punya 2FA secret
  const users = await prisma.user.findMany({
    where: {
      twoFactorSecret: { not: null },
    },
    select: {
      id: true,
      email: true,
      twoFactorSecret: true,
      twoFactorEnabled: true,
    },
  });

  if (users.length === 0) {
    console.log("❌ Tidak ada user dengan 2FA secret di database.");
    return;
  }

  console.log(`\n✅ Ditemukan ${users.length} user dengan 2FA secret:\n`);

  for (const user of users) {
    console.log(`👤 Email  : ${user.email}`);
    console.log(`🔑 Secret : ${user.twoFactorSecret}`);
    console.log(`📱 2FA Aktif: ${user.twoFactorEnabled ? "Ya" : "Belum diaktifkan"}`);

    // Generate QR Code
    const otpauthUrl = generateURI({
      issuer: APP_NAME,
      label: user.email,
      secret: user.twoFactorSecret,
    });

    // Simpan sebagai PNG
    const outputFolder = path.join(__dirname, "..", "public", "uploads", "2fa");
    await fs.mkdir(outputFolder, { recursive: true });
    const fileName = `qr-${user.email.replace(/[^a-zA-Z0-9]/g, "_")}.png`;
    const outputPath = path.join(outputFolder, fileName);
    await QRCode.toFile(outputPath, otpauthUrl);

    console.log(`\n🖼️  QR Code tersimpan di: public/uploads/2fa/${fileName}`);
    console.log(`\n📋 Manual entry key untuk Google Authenticator:`);
    console.log(`   Nama Akun : EasyLegal (${user.email})`);
    console.log(`   Kunci     : ${user.twoFactorSecret}`);
    console.log("─".repeat(60));
  }

  console.log("\n💡 Buka file PNG di atas dan scan dengan Google Authenticator.");
  console.log("   Atau, input manual key di atas ke Google Authenticator:\n");
  console.log("   Google Authenticator → + → Masukkan kunci secara manual\n");
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
