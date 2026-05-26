"use server";

import { redirect } from "next/navigation";
import { login, createSession } from "@/lib/auth";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password wajib diisi!" };
  }

  const user = await login(email, password);
  if (!user) {
    return { error: "Email atau password salah!" };
  }

  await createSession({ userId: user.userId, email: user.email });
  redirect("/dashboard");
}
