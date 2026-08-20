import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect check — only GET/HEAD
  if (request.method === "GET" || request.method === "HEAD") {
    const slug = pathname.slice(1).replace(/\/$/, ""); // "/daftar-klien/" → "daftar-klien"

    if (slug) {
      try {
        const host = request.headers.get("host") || "easylegal.my.id";
        const domain = host.split(":")[0]; // remove port if any
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/redirects/${slug}?domain=${domain}`;
        const res = await fetch(apiUrl);
        
        if (res.ok) {
          const json = await res.json();
          if (json.data && json.data.destination) {
            return NextResponse.redirect(json.data.destination);
          }
        }
      } catch {
        // API error or network issue — fall through, site keeps working
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
