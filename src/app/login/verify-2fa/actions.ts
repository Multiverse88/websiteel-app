"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";
import { verifyTwoFactorLogin } from "../actions-2fa";

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

  const { userId, email } = JSON.parse(pendingUser);

  const result = await verifyTwoFactorLogin(userId, token);
  if (result.error) {
    return { error: result.error };
  }

  // Create session and clear pending cookie
  await createSession({ userId, email, twoFactorEnabled: true });
  cookieStore.delete("pending_2fa_user");

  redirect("/dashboard");
}
