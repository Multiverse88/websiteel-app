"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";
import { setupTwoFactor, verifyTwoFactorSetup } from "../actions-2fa";

export async function initiateSetup(): Promise<{ manualEntryKey?: string; message?: string; error?: string }> {
  const cookieStore = await cookies();
  const pendingUser = cookieStore.get("pending_2fa_user")?.value;
  if (!pendingUser) {
    return { error: "Sesi berakhir. Silakan login kembali." };
  }

  const { userId, email } = JSON.parse(pendingUser);
  const result = await setupTwoFactor(userId, email);
  return result;
}

export async function completeSetup(prevState: { error?: string } | null, formData: FormData) {
  const token = formData.get("token") as string;

  if (!token || token.length !== 6) {
    return { error: "Kode harus 6 digit!" };
  }

  const cookieStore = await cookies();
  const pendingUser = cookieStore.get("pending_2fa_user")?.value;
  if (!pendingUser) {
    return { error: "Sesi berakhir. Silakan login kembali." };
  }

  const { userId, email } = JSON.parse(pendingUser);

  const result = await verifyTwoFactorSetup(userId, token);
  if (result.error) {
    return { error: result.error };
  }

  // Create session and clear pending cookie
  await createSession({ userId, email, twoFactorEnabled: true });
  cookieStore.delete("pending_2fa_user");

  redirect("/dashboard");
}
