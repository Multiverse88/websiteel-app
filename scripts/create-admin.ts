import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { email: "admin@easylegal.id" } });
  if (existing) {
    console.log("Admin user already exists");
    return;
  }
  const hash = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      email: "admin@easylegal.id",
      password: hash,
      name: "Admin",
      role: "Legal Specialist",
      twoFactorEnabled: false,
    },
  });
  console.log("Admin user created: admin@easylegal.id / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
