// Central per-domain config for the multi-tenant public site. One Next.js
// app serves multiple domains (via Traefik Host rules in
// docker-compose.dokploy.yml) — this is where per-domain differences
// (canonical/OG base URL) are declared. WhatsApp CTAs are domain-agnostic
// now (one shared number pool, see getWhatsAppLink() in ./config.ts) so
// there's no per-domain whatsappLink here anymore.
//
// To add a new domain: add its entries here (bare + www, same config), and
// add a matching Host(`...`) rule to the `app` service's Traefik labels in
// docker-compose.dokploy.yml so requests actually reach this app.

export interface DomainConfig {
  baseUrl: string;
}

const BIZ_ID: DomainConfig = {
  baseUrl: "https://easylegal.biz.id",
};

const CO_ID: DomainConfig = {
  baseUrl: "https://easylegal.co.id",
};

const ID: DomainConfig = {
  baseUrl: "https://easylegal.id",
};

export const DOMAINS: Record<string, DomainConfig> = {
  "easylegal.biz.id": BIZ_ID,
  "www.easylegal.biz.id": BIZ_ID,
  "easylegal.co.id": CO_ID,
  "www.easylegal.co.id": CO_ID,
  "easylegal.id": ID,
  "www.easylegal.id": ID,
};

export const DEFAULT_DOMAIN_CONFIG: DomainConfig = BIZ_ID;

/**
 * Map a hostname (from request headers) to the Article `site` field value.
 * Used by public pages to filter articles per domain.
 * Returns the default site ("easylegal.biz.id") when hostname is unknown.
 */
export function getSiteFromHostname(hostname?: string | null): string {
  if (!hostname) return "easylegal.biz.id";
  const host = hostname.split(":")[0]; // strip port
  if (host === "easylegal.co.id" || host === "www.easylegal.co.id") return "easylegal.co.id";
  if (host === "easylegal.id" || host === "www.easylegal.id") return "easylegal.id";
  return "easylegal.biz.id";
}

export function getDomainConfig(hostname?: string | null): DomainConfig {
  if (hostname && DOMAINS[hostname]) return DOMAINS[hostname];
  return DEFAULT_DOMAIN_CONFIG;
}
