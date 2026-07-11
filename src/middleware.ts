import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecret } from "@/lib/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Dashboard auth check (existing)
  if (pathname.startsWith("/dashboard")) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    try {
      await jwtVerify(token, getJwtSecret());
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 2. Redirect check — only GET/HEAD
  if (request.method === "GET" || request.method === "HEAD") {
    const slug = pathname.slice(1).replace(/\/$/, ""); // "/daftar-klien/" → "daftar-klien"

    if (slug) {
      try {
        // Dynamic import — PrismaClient is Node-only, can't be top-level import in Edge runtime
        // ponytail: if Edge runtime rejection persists, replace with fetch to internal route
        const { prisma } = await import("@/lib/db");
        const redirect = await prisma.redirect.findUnique({
          where: { slug },
          select: { destination: true },
        });

        if (redirect) {
          // Fire-and-forget click count — don't block response
          prisma.redirect
            .update({ where: { slug }, data: { clicks: { increment: 1 } } })
            .catch(() => {});

          return NextResponse.redirect(redirect.destination);
        }
      } catch {
        // DB or Edge runtime reject — fall through, site keeps working
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
