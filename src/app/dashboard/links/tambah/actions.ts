// src/app/dashboard/links/tambah/actions.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createLink(slug: string, destination: string) {
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid!" };

  if (!destination) return { error: "URL tujuan harus diisi!" };

  try {
    // Check slug uniqueness manually for better error message
    const existing = await prisma.redirect.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (existing) return { error: `Slug "${slug}" sudah digunakan.` };

    await prisma.redirect.create({
      data: { slug, destination },
    });

    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (err: unknown) {
    console.error("Gagal membuat link:", err);
    return { error: "Gagal membuat redirect link." };
  }
}
