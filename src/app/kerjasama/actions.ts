"use server";

import { trackMetric } from "@/lib/metrics";

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

export async function submitPartnershipForm(data: any) {
  const {
    name,
    role,
    email,
    whatsapp,
    companyName,
    businessActivity,
    website,
    officeAddress,
    partnershipType,
    proposal,
    source
  } = data;

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/partnerships`;
    // We send to API, API will handle sending email
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(e => console.error(e));

    trackMetric("partnership_submit", 1, { status: "success", partnershipType });
    return { success: true };
  } catch (err) {
    console.error("Gagal mengirim email kerjasama:", err);
    trackMetric("partnership_submit", 1, { status: "error" });
    return { error: "Terjadi kesalahan. Silakan coba lagi nanti." };
  }
}
