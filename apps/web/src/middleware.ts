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
          const data = json.data;
          if (data && data.destination) {
            const description = typeof data.description === "string" ? data.description.trim() : "";
            const ua = request.headers.get("user-agent") || "";

            // Bot fetching a link preview + admin filled in a custom
            // description → serve OG tags instead of an instant redirect,
            // so the share card shows our text, not the destination page's.
            if (description && PREVIEW_BOT_UA.test(ua)) {
              const html = previewHtml({
                title: "EasyLegal",
                description,
                destination: data.destination,
                url: request.url,
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)",
  ],
};
