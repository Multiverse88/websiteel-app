// Centralized configuration for EasyLegal
// Update this file to change global settings

export const config = {
  // Default WhatsApp message
  defaultWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi gratis mengenai legalitas bisnis saya.",
  
  // Website URL
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "https://easylegal.biz.id",
  
  // Company info
  company: {
    email: "info@easylegal.id",
    whatsapp: "0811-2345-6789",
  },
} as const;

// In-house WhatsApp CTA rotator (replaces the external mauorder.online
// service — see apps/api/src/routes/whatsapp.ts). This is a real link, not
// a fetch: clicking it does a full navigation to our API, which picks
// whichever active number has the fewest clicks so far, logs the click,
// and 302s to wa.me — same instant UX as before, but the traffic per
// number is now visible in the admin dashboard.
export function getWhatsAppLink(message?: string): string {
  const encodedMessage = encodeURIComponent(message || config.defaultWhatsAppMessage);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.easylegal.my.id";
  return `${apiUrl}/api/v1/wa/redirect?text=${encodedMessage}`;
}
