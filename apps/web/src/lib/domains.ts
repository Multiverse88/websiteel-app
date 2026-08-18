// Central per-domain config for the multi-tenant public site. One Next.js
// app serves multiple domains (via Traefik Host rules in
// docker-compose.dokploy.yml) — this is where per-domain differences
// (canonical/OG base URL, floating WhatsApp link) are declared.
//
// To add a new domain: add its entries here (bare + www, same config), and
// add a matching Host(`...`) rule to the `app` service's Traefik labels in
// docker-compose.dokploy.yml so requests actually reach this app.

export interface DomainConfig {
  baseUrl: string;
  whatsappLink: string;
}

const BIZ_ID: DomainConfig = {
  baseUrl: "https://easylegal.biz.id",
  whatsappLink: "https://mauorder.online/easylegalbiz-2",
};

const CO_ID: DomainConfig = {
  baseUrl: "https://easylegal.co.id",
  whatsappLink: "https://mauorder.online/easylegal3",
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
