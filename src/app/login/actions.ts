"use server";

import { redirect } from "next/navigation";
import { loginWithPassword } from "@/lib/auth";
import { cookies } from "next/headers";

export async function loginAction(prevState: Record<string, unknown> | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi!" };
  }

  const user = await loginWithPassword(email, password);
  if (!user) {
    return { error: "Email atau password salah!" };
  }

  // Store user info temporarily for 2FA verification
  const cookieStore = await cookies();
  cookieStore.set("pending_2fa_user", JSON.stringify({ userId: user.userId, email: user.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 300, // 5 minutes
    path: "/",
  });

  // Check if 2FA is enabled
  if (user.twoFactorEnabled) {
    redirect("/login/verify-2fa");
  } else {
    redirect("/login/setup-2fa");
  }
}
