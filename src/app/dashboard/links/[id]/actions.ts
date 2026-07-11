"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateLink(id: string, slug: string, destination: string) {
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid!" };

  if (!destination) return { error: "URL tujuan harus diisi!" };

  try {
    // Validate URL — must be parseable http/https
    const parsed = new URL(destination);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { error: "URL harus menggunakan protokol http atau https." };
    }
  } catch {
    return { error: "Format URL tidak valid." };
  }

  try {
    // Check slug uniqueness (exclude current)
    const existing = await prisma.redirect.findFirst({
      where: { slug, NOT: { id } },
      select: { id: true },
    });
    if (existing) return { error: `Slug "${slug}" sudah digunakan.` };

    await prisma.redirect.update({
      where: { id },
      data: { slug, destination },
    });

    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (err: unknown) {
    console.error("Gagal mengupdate link:", err);
    return { error: "Gagal mengupdate link." };
  }
}
