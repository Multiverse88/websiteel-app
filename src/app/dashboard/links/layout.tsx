import React from "react";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LinksLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!session.twoFactorEnabled) redirect("/login/setup-2fa");
  return <>{children}</>;
}
