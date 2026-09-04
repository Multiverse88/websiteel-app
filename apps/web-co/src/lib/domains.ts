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

export const DOMAINS: Record<string, DomainConfig> = {
  "easylegal.biz.id": BIZ_ID,
  "www.easylegal.biz.id": BIZ_ID,
  "easylegal.co.id": CO_ID,
  "www.easylegal.co.id": CO_ID,
};

export const DEFAULT_DOMAIN_CONFIG: DomainConfig = BIZ_ID;

export function getDomainConfig(hostname?: string | null): DomainConfig {
  if (hostname && DOMAINS[hostname]) return DOMAINS[hostname];
  return DEFAULT_DOMAIN_CONFIG;
}

/**
 * Map a hostname (from request headers) to the Article `site` field value.
 * Used by public pages to filter articles per domain.
 */
export function getSiteFromHostname(hostname?: string | null): string {
  if (!hostname) return "easylegal.biz.id";
  const host = hostname.split(":")[0];
  if (host === "easylegal.co.id" || host === "www.easylegal.co.id") return "easylegal.co.id";
  return "easylegal.biz.id";
}
