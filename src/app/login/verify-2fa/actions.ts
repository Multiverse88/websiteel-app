"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession, parsePendingUser } from "@/lib/auth";
import { verifyTwoFactorLogin } from "../actions-2fa";

export async function verifyLogin2FA(prevState: { error?: string } | null, formData: FormData) {
  const token = formData.get("token") as string;

  if (!token || token.length !== 6) {
    return { error: "Kode harus 6 digit!" };
  }

  const result = await verifyTwoFactorLogin(token);
  if (result.error) {
    return { error: result.error };
  }

  // Get pending user from cookie for session creation
  const cookieStore = await cookies();
  const pendingUser = cookieStore.get("pending_2fa_user")?.value;
  const parsed = pendingUser ? parsePendingUser(pendingUser) : null;
  if (!parsed) {
    return { error: "Sesi verifikasi sudah berakhir. Silakan login kembali." };
  }

  await createSession({ userId: parsed.userId, email: parsed.email, twoFactorEnabled: true });
  cookieStore.delete("pending_2fa_user");

  redirect("/dashboard");
}
