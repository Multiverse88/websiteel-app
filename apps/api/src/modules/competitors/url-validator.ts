import { URL } from "node:url";

const PRIVATE_IP_PATTERNS = [
  /^127\./,
  /^10\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^169\.254\./,
  /^0\./,
  /^::1$/,
  /^fc00:/i,
  /^fe80:/i,
];

export interface ValidatedUrlResult {
  isValid: boolean;
  error?: string;
  baseUrl?: string;
  hostname?: string;
}

export function validateCompetitorUrl(rawUrl: string): ValidatedUrlResult {
  if (!rawUrl || typeof rawUrl !== "string") {
    return { isValid: false, error: "URL wajib diisi" };
  }

  let trimmed = rawUrl.trim();
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//i.test(trimmed)) {
    trimmed = "https://" + trimmed;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { isValid: false, error: "Format URL tidak valid" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { isValid: false, error: "Hanya protokol HTTP dan HTTPS yang diizinkan" };
  }

  if (parsed.username || parsed.password) {
    return { isValid: false, error: "URL tidak boleh mengandung username atau password" };
  }

  const hostname = parsed.hostname.toLowerCase();
  if (!hostname) {
    return { isValid: false, error: "Hostname tidak ditemukan dalam URL" };
  }

  if (hostname === "localhost" || !hostname.includes(".")) {
    return { isValid: false, error: `Hostname '${hostname}' tidak diizinkan` };
  }

  for (const pattern of PRIVATE_IP_PATTERNS) {
    if (pattern.test(hostname)) {
      return { isValid: false, error: `Alamat IP '${hostname}' termasuk private/reserved address space` };
    }
  }

  // Normalize baseUrl as origin without trailing slash
  const baseUrl = `${parsed.protocol}//${parsed.host}`;

  return {
    isValid: true,
    baseUrl,
    hostname,
  };
}
