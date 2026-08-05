import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:postgres@100.81.215.57:5432/postgres?schema=easylegal" } } });

async function seed() {
  const settings = [
    { key: "smtp_host", value: "smtp.hostinger.com" },
    { key: "smtp_port", value: "465" },
    { key: "smtp_user", value: "newsletter@easylegal.id" },
    { key: "smtp_password", value: "Jauhimaksiat@1" },
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
