// src/app/dashboard/links/actions.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteLink(id: string) {
  // Dynamic import avoids circular dep
  const { getSession } = await import("@/lib/auth");
  const session = await getSession();
  if (!session) return { error: "Sesi tidak valid!" };

  try {
    await prisma.redirect.delete({ where: { id } });
    revalidatePath("/dashboard/links");
    return { success: true };
  } catch (err: unknown) {
    console.error("Gagal menghapus link:", err);
    return { error: "Gagal menghapus link." };
  }
}
