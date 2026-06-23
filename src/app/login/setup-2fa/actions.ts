"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";
import { setupTwoFactor, verifyTwoFactorSetup } from "../actions-2fa";

function parsePendingUser(raw: string): { userId: string; email: string } | null {
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.userId && parsed?.email) return parsed;
    return null;
  } catch {
    return null;
  }
}

export async function initiateSetup(): Promise<{ manualEntryKey?: string; qrCodeDataUrl?: string; message?: string; error?: string }> {
  const result = await setupTwoFactor();
  return result;
}

export async function completeSetup(prevState: { error?: string } | null, formData: FormData) {
  const token = formData.get("token") as string;

  if (!token || token.length !== 6) {
    return { error: "Kode harus 6 digit!" };
  }

  const result = await verifyTwoFactorSetup(token);
  if (result.error) {
    return { error: result.error };
  }

  // Baca cookie untuk buat session setelah sukses
  const cookieStore = await cookies();
  const pendingUser = cookieStore.get("pending_2fa_user")?.value;
  const parsed = pendingUser ? parsePendingUser(pendingUser) : null;
  if (!parsed) {
    return { error: "Sesi berakhir. Silakan login kembali." };
  }

  await createSession({ userId: parsed.userId, email: parsed.email, twoFactorEnabled: true });
  cookieStore.delete("pending_2fa_user");

  redirect("/dashboard");
}
