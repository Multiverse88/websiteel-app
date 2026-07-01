// Centralized configuration for EasyLegal
// Update this file to change global settings

export const config = {
  // WhatsApp number (without + prefix)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281123456789",
  
  // Default WhatsApp message
  defaultWhatsAppMessage: "Halo EasyLegal, saya ingin konsultasi gratis mengenai legalitas bisnis saya.",
  
  // Website URL
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || "https://easylegal.my.id",
  
  // Company info
  company: {
    name: "EasyLegal",
    email: "info@easylegal.id",
    phone: "(022) 1234-5678",
    whatsapp: "0811-2345-6789",
  },
} as const;

// Helper function to generate WhatsApp link via mauorder rotator
export function getWhatsAppLink(message?: string): string {
  const encodedMessage = encodeURIComponent(message || config.defaultWhatsAppMessage);
  return `https://mauorder.online/easylegal-5?text=${encodedMessage}`;
}

// Helper to load and encode JWT secret safely in Node/Edge environments
export function getJwtSecret(): Uint8Array {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is required. Generate one with: openssl rand -base64 32");
  }
  return new TextEncoder().encode(JWT_SECRET);
}
