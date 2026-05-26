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
    },
  });

  console.log("✅ Admin user berhasil dibuat dengan password ter-hash!");
  console.log(`  Email    : ${adminEmail}`);
  console.log(`  Password : ${adminPassword}`);
  console.log(`  Hash     : ${hashedPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
