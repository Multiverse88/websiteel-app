// Deteksi bot/crawler yang menembak endpoint publik rotator WhatsApp
// (/api/v1/wa/redirect, /api/v1/wa/s/:slug) secara langsung — dipasang
// setelah insiden 14-15 Sep 2026: lonjakan 500+ klik/jam, ~99% tanpa
// anonymousSessionId, tersebar rata ke puluhan halaman berbeda, naik
// smooth 6->21 klik/menit dalam satu jam — pola crawl otomatis, bukan
// klik manusia (lihat KONDISI-ARTIKEL-EASYLEGAL-ID.md / handoff terkait).
//
// Filosofi: link CTA WA muncul sebagai <a href> statis di HTML (dibaca
// render-time, lihat komentar getWhatsAppLink() di apps/web/src/lib/config.ts),
// jadi endpoint ini otomatis "diikuti" search engine crawler, SEO audit
// tool (Ahrefs/Semrush/Screaming Frog), dan link-preview fetcher WA/FB
// ketika link di-share. Semua itu BUKAN lead asli — jangan hitung
// clickCount atau buat row WhatsAppClick untuk mereka, tapi tetap 302
// redirect apa adanya supaya tidak ada yang "rusak" kalau false-positive.
const BOT_UA_PATTERNS: RegExp[] = [
  /bot/i,
  /crawl/i,
  /spider/i,
  /slurp/i,
  /facebookexternalhit/i,
  /whatsapp/i, // WhatsApp's own link-preview fetcher, not a real click
  /telegrambot/i,
  /discordbot/i,
  /pinterest/i,
  /linkedinbot/i,
  /skypeuripreview/i,
  /embedly/i,
  /quora link preview/i,
  /outbrain/i,
  /vkshare/i,
  /w3c_validator/i,
  /monitor/i,
  /pingdom/i,
  /uptimerobot/i,
  /site24x7/i,
  /ahrefs/i,
  /semrush/i,
  /mj12bot/i,
  /dotbot/i,
  /petalbot/i,
  /screaming\s*frog/i,
  /python-requests/i,
  /python-urllib/i,
  /go-http-client/i,
  /okhttp/i,
  /scrapy/i,
  /headlesschrome/i,
  /phantomjs/i,
  /selenium/i,
  /puppeteer/i,
  /playwright/i,
  /curl\//i,
  /wget/i,
  /^$/, // empty user-agent — no real browser sends this
];

export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  const ua = (userAgent || "").trim();
  return BOT_UA_PATTERNS.some((re) => re.test(ua));
}
