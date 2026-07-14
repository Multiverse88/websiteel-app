"use server";

import { prisma } from "@/lib/db";

interface SubmitLeadInput {
  landingPageId: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  utmParams?: Record<string, string>;
}

export async function submitLandingPageLead(input: SubmitLeadInput) {
  const { landingPageId, name, phone, email, company, utmParams } = input;

  if (!landingPageId || !name || !phone) {
    return { success: false, error: "Nama dan Nomor WhatsApp wajib diisi." };
  }

  try {
    // 1. Save lead to database
    const lead = await prisma.landingPageLead.create({
      data: {
        landingPageId,
        name,
        phone,
        email: email || null,
        data: {
          company: company || null,
          utm: utmParams || {},
        },
      },
    });

    // 2. Fetch landing page redirect settings
    const lp = await prisma.landingPage.findUnique({
      where: { id: landingPageId },
      select: { redirectSettings: true }
    });

    let redirectSettings = null;
    if (lp?.redirectSettings) {
      redirectSettings = typeof lp.redirectSettings === "string" 
        ? JSON.parse(lp.redirectSettings) 
        : lp.redirectSettings;
    }

    return { 
      success: true, 
      leadId: lead.id,
      redirectSettings 
    };
  } catch (error: unknown) {
    console.error("Failed to submit landing page lead:", error);
    return { success: false, error: "Terjadi kesalahan pada server. Silakan coba lagi." };
  }
}
