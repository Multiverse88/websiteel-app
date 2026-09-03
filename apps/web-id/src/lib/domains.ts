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

const ID_ID: DomainConfig = {
  baseUrl: "https://easylegal.id",
};

export const DOMAINS: Record<string, DomainConfig> = {
  "easylegal.id": ID_ID,
  "www.easylegal.id": ID_ID,
};

export const DEFAULT_DOMAIN_CONFIG: DomainConfig = ID_ID;

export function getDomainConfig(hostname?: string | null): DomainConfig {
  if (hostname && DOMAINS[hostname]) return DOMAINS[hostname];
  return DEFAULT_DOMAIN_CONFIG;
}
