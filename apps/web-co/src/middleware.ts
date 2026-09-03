import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Link-preview crawlers that render Open Graph tags when a URL is shared
// (WhatsApp, Facebook Messenger, Twitter/X, Slack, Telegram, Discord, etc.).
// Real visitors never match this and always get the instant redirect below.
const PREVIEW_BOT_UA = /facebookexternalhit|WhatsApp|Twitterbot|Slackbot|TelegramBot|Discordbot|LinkedInBot|SkypeUriPreview|Pinterest|redditbot|Applebot|vkShare|W3C_Validator|Line\/|Embedly/i;

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function previewHtml({
  title,
  description,
  destination,
  url,
}: {
  title: string;
  description: string;
  destination: string;
  url: string;
}) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const dest = escapeHtml(destination);
  return `<!DOCTYPE html>
<html lang="id"><head>
<meta charset="utf-8">
<title>${t}</title>
<meta property="og:type" content="website">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:url" content="${escapeHtml(url)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta http-equiv="refresh" content="0; url=${dest}">
</head><body>
<p>Mengalihkan ke <a href="${dest}">${dest}</a>&hellip;</p>
</body></html>`;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Canonical domain: 301-redirect www → apex (e.g. www.easylegal.co.id →
  // easylegal.co.id). Google treats www and apex as separate hosts —
  // without this redirect both serve identical content with 200, splitting
  // crawl budget and indexation across duplicate URLs.
  const hostHeader = request.headers.get("host") || "";
  const hostname = hostHeader.split(":")[0];
  if (hostname.startsWith("www.")) {
    // Build the URL explicitly instead of cloning nextUrl — behind Traefik
    // the internal port would leak into the redirect target otherwise.
    const url = new URL(`https://${hostname.slice(4)}${pathname}`);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 301);
  }

  // Redirect check — only GET/HEAD, and skip well-known SEO files so they
  // don't trigger an API lookup (the www→apex 301 above already ran).
  const isSeoFile = pathname === "/robots.txt" || pathname === "/sitemap.xml";
  if (!isSeoFile && (request.method === "GET" || request.method === "HEAD")) {
    const slug = pathname.slice(1).replace(/\/$/, ""); // "/daftar-klien/" → "daftar-klien"

    if (slug) {
      try {
        const host = request.headers.get("host") || "easylegal.my.id";
        const domain = host.split(":")[0]; // remove port if any
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/redirects/${slug}?domain=${domain}`;
        const res = await fetch(apiUrl);

        if (res.ok) {
          const json = await res.json();
          const data = json.data;
          if (data && data.destination) {
            const description = typeof data.description === "string" ? data.description.trim() : "";
            const ua = request.headers.get("user-agent") || "";

            // Bot fetching a link preview + admin filled in a custom
            // description → serve OG tags instead of an instant redirect,
            // so the share card shows our text, not the destination page's.
            if (description && PREVIEW_BOT_UA.test(ua)) {
              // request.url reflects the internal container address
              // (e.g. http://0.0.0.0:3000/...) behind the Traefik proxy,
              // not the public domain — rebuild it from the actual
              // incoming Host header + forwarded protocol instead.
              const proto = request.headers.get("x-forwarded-proto") || "https";
              const publicUrl = `${proto}://${host}${pathname}`;
              const html = previewHtml({
                title: "EasyLegal",
                description,
                destination: data.destination,
                url: publicUrl,
              });
              return new NextResponse(html, {
                headers: { "content-type": "text/html; charset=utf-8" },
              });
            }

            return NextResponse.redirect(data.destination);
          }
        }
      } catch {
        // API error or network issue — fall through, site keeps working
      }
    }
  }

  // Serve trailing-slash URLs (e.g. ad-campaign links like
  // /jasa-pembuatan-pendirian-pt-indonesia/) directly instead of letting
  // Next.js's default trailingSlash:false behavior 308-redirect them —
  // that redirect also emits a `Refresh` header alongside `Location`,
  // which some browsers render as a visible "Redirecting you to..."
  // interstitial instead of hopping instantly. An internal rewrite is
  // invisible to the browser: same URL bar, no flash, one request.
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // robots.txt and sitemap.xml are NOT excluded: the www→apex 301 above
    // must also apply to them, so bots requesting www/robots.txt get
    // redirected to the canonical host instead of seeing a second copy.
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};
