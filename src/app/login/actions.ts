"use server";

import { redirect } from "next/navigation";
import { loginWithPassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { checkRateLimit, recordFailedAttempt, resetAttempts, getRemainingAttempts } from "@/lib/rate-limit";

export async function loginAction(prevState: Record<string, unknown> | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi!" };
  }

  // Rate limiting check
  const rateLimit = checkRateLimit(email);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.retryAfter || 0) / 60);
    return { error: `Terlalu banyak percobaan gagal. Coba lagi dalam ${minutes} menit.` };
  }

  const user = await loginWithPassword(email, password);
  if (!user) {
    const result = recordFailedAttempt(email);
    const remaining = getRemainingAttempts(email);
    
    if (result.locked) {
      const minutes = Math.ceil((result.retryAfter || 0) / 60);
      return { error: `Akun terkunci karena terlalu banyak percobaan gagal. Coba lagi dalam ${minutes} menit.` };
    }
    
    return { error: `Email atau password salah! Sisa percobaan: ${remaining}` };
  }

  // Login successful, reset rate limit
  resetAttempts(email);

  // Store user info temporarily for 2FA verification
  const cookieStore = await cookies();
  cookieStore.set("pending_2fa_user", JSON.stringify({ userId: user.userId, email: user.email }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && process.env.DISABLE_SECURE_COOKIES !== "true",
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
