"use server";

interface SubmitLeadInput {
  landingPageId: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  utmParams?: Record<string, string>;
}

export async function submitLandingPageLead(input: SubmitLeadInput) {
  const { landingPageId, name, phone } = input;

  if (!landingPageId || !name || !phone) {
    return { success: false, error: "Nama dan Nomor WhatsApp wajib diisi." };
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/landing-pages/leads`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.error || "Terjadi kesalahan pada server. Silakan coba lagi." };
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("Failed to submit landing page lead:", error);
    return { success: false, error: "Terjadi kesalahan pada server. Silakan coba lagi." };
  }
}
