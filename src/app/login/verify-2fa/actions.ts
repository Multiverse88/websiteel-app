"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";
import { verifyTwoFactorLogin } from "../actions-2fa";

function parsePendingUser(raw: string): { userId: string; email: string } | null {
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.userId && parsed?.email) return parsed;
    return null;
  } catch {
    return null;
  }
}

export async function verifyLogin2FA(prevState: { error?: string } | null, formData: FormData) {
  const token = formData.get("token") as string;

  if (!token || token.length !== 6) {
    return { error: "Kode harus 6 digit!" };
  }

  // Get pending user from cookie
  const cookieStore = await cookies();
  const pendingUser = cookieStore.get("pending_2fa_user")?.value;
  if (!pendingUser) {
    return { error: "Sesi verifikasi sudah berakhir. Silakan login kembali." };
  }

  const parsed = parsePendingUser(pendingUser);
  if (!parsed) {
    return { error: "Sesi tidak valid. Silakan login kembali." };
  }

  const result = await verifyTwoFactorLogin(parsed.userId, token);
  if (result.error) {
    return { error: result.error };
  }

  // Create session and clear pending cookie
  await createSession({ userId: parsed.userId, email: parsed.email, twoFactorEnabled: true });
  cookieStore.delete("pending_2fa_user");

  redirect("/dashboard");
}
