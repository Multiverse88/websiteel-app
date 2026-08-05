import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:postgres@100.81.215.57:5432/postgres?schema=easylegal" } } });
prisma.systemSetting.findMany({ where: { key: { startsWith: 'smtp_' } } })
  .then(res => console.log("SMTP Settings in DB:", res))
  .catch(err => console.error(err.message))
  .finally(() => prisma.$disconnect());
