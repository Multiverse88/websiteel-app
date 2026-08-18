// Usage: DATABASE_URL=... SMTP_PASS=... npx tsx seed-smtp.ts
// (was hardcoding a real DB connection string + SMTP password in git — see
// the 2026-08-11/12 security cleanup)
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); // uses DATABASE_URL from env, same as the rest of the app

async function seed() {
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpPass) {
    console.error("Set SMTP_PASS env var before running this script.");
    process.exit(1);
  }
  const settings = [
    { key: "smtp_host", value: process.env.SMTP_HOST || "smtp.hostinger.com" },
    { key: "smtp_port", value: process.env.SMTP_PORT || "465" },
    { key: "smtp_user", value: process.env.SMTP_USER || "newsletter@easylegal.id" },
    { key: "smtp_password", value: smtpPass },
    { key: "smtp_secure", value: "true" }
  ];

  for (const s of settings) {
    await prisma.systemSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { key: s.key, value: s.value },
    });
  }
  console.log("SMTP settings seeded!");
  await prisma.$disconnect();
}
seed().catch(console.error);
