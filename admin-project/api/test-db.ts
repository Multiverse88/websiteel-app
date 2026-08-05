import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({ datasources: { db: { url: "postgresql://postgres:postgres@100.81.215.57:5432/postgres?schema=easylegal" } } });
prisma.systemSetting.findMany({ take: 1 }).then(res => console.log("Success on 100.81.215.57:5432:", res.length)).catch(err => console.error("100.81.215.57:5432 failed:", err.message));
