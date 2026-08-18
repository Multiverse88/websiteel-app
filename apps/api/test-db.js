const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany();
  console.log("USERS:", users.map(u => u.id + " " + u.email));
}
main().finally(() => prisma.$disconnect());
