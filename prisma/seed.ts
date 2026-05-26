import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@easylegal.id";
  const adminPassword = "admin123"; // Ganti di production!

  // Hash password dengan bcrypt (salt rounds = 12)
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Hapus user lama jika ada, lalu buat ulang dengan password ter-hash
  await prisma.user.deleteMany({
    where: { email: adminEmail },
  });

  await prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin EasyLegal",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=150&h=150&q=80",
      bio: "Spesialis Hukum Bisnis dan Pendirian Perusahaan di Easy Legal. Berdedikasi mempermudah aspek legalitas pelaku UMKM di Indonesia.",
      role: "Senior Legal Consultant",
    },
  });

  // Seed default system settings for newsletter automation
  const defaultSettings = [
    { key: "newsletter_auto_broadcast", value: "true" },
    { key: "newsletter_default_subject", value: "Artikel Baru: {{title}}" },
    { key: "newsletter_default_message", value: "Halo! Kami baru saja mempublikasikan artikel legalitas terbaru yang sangat penting untuk perkembangan bisnis Anda. Mari baca pembahasan lengkap artikel kami di bawah ini." },
  ];

  for (const setting of defaultSettings) {
    await prisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
  }

  console.log("✅ Admin user berhasil dibuat dengan password ter-hash!");
  console.log(`  Email    : ${adminEmail}`);
  console.log(`  Password : ${adminPassword}`);
  console.log(`  Hash     : ${hashedPassword}`);
  console.log("✅ Default system settings berhasil diset!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
