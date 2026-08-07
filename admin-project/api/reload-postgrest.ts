import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.$executeRawUnsafe("NOTIFY pgrst, 'reload schema'");
  console.log("PostgREST schema cache reload signal sent.");
}
main().finally(() => prisma.$disconnect());
