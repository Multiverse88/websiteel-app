const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { id: 'system' } });
  if (existing) {
    console.log("System user already exists.");
  } else {
    await prisma.user.create({
      data: {
        id: 'system',
        name: 'System Admin',
        email: 'system@easylegal.my.id',
      }
    });
    console.log("Created 'system' user successfully!");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
