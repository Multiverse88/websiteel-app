import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect check — only GET/HEAD
  if (request.method === "GET" || request.method === "HEAD") {
    const slug = pathname.slice(1).replace(/\/$/, ""); // "/daftar-klien/" → "daftar-klien"

    if (slug) {
      try {
        // Dynamic import — PrismaClient is Node-only, can't be top-level import in Edge runtime
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
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)",
  ],
};
