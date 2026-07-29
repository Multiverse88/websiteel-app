"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sendEmail } from "@/lib/mail";

export async function addContactAction(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const tags = formData.get("tags") as string;

  if (!email) {
    return { error: "Email wajib diisi" };
  }

  try {
    await prisma.blastContact.create({
      data: {
        email,
        name: name || null,
        tags: tags || null,
      },
    });
    revalidatePath("/dashboard/email-blast");
    return { success: true };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { error: "Email sudah ada" };
    }
    return { error: error.message || "Terjadi kesalahan" };
  }
}

export async function toggleContactStatusAction(id: string, isActive: boolean) {
  try {
    await prisma.blastContact.update({
      where: { id },
      data: { isActive: !isActive },
    });
    revalidatePath("/dashboard/email-blast");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteContactAction(id: string) {
  try {
    await prisma.blastContact.delete({
      where: { id },
    });
    revalidatePath("/dashboard/email-blast");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function createCampaignAction(formData: FormData) {
  const subject = formData.get("subject") as string;
  const bodyHtml = formData.get("bodyHtml") as string;
  const scheduledAt = formData.get("scheduledAt") as string;
  const sendToAll = formData.get("sendToAll") === "on";
  const segments = formData.getAll("segments") as string[];
  const internalName = formData.get("internalName") as string;
  const previewText = formData.get("previewText") as string;
  const isTemplate = formData.get("isTemplate") === "true";

  if (!subject || !bodyHtml) {
    return { error: "Subject dan Body wajib diisi" };
  }

  try {
    let activeContacts: any[] = [];
    
    if (sendToAll) {
      activeContacts = await prisma.blastContact.findMany({
        where: { isActive: true },
        select: { id: true },
      });
    } else if (segments.length > 0) {
      activeContacts = await prisma.blastContact.findMany({
        where: {
          isActive: true,
          segments: { some: { id: { in: segments } } }
        },
        select: { id: true },
      });
    }

    // Deduplicate
    const uniqueContactIds = Array.from(new Set(activeContacts.map(c => c.id)));
    const recipientsData = uniqueContactIds.map(id => ({ contactId: id }));

    const campaignStatus = isTemplate ? "draft" : (scheduledAt ? "scheduled" : "processing");

    await prisma.emailCampaign.create({
      data: {
        internalName: internalName || null,
        subject,
        previewText: previewText || null,
        bodyHtml,
        status: campaignStatus,
        isTemplate,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        recipients: {
          create: recipientsData,
        },
      }
    });

  } catch (error: any) {
    return { error: error.message || "Terjadi kesalahan saat membuat campaign" };
  }
  
  revalidatePath("/dashboard/email-blast");
  return { success: true };
}

export async function testSendCampaignAction(formData: FormData) {
  const testEmail = formData.get("testEmail") as string;
  const subject = formData.get("subject") as string;
  const bodyHtml = formData.get("bodyHtml") as string;
  const previewText = formData.get("previewText") as string;

  if (!testEmail || !subject || !bodyHtml) {
    return { error: "Email, Subject, dan Body wajib diisi" };
  }

  try {
    const smtpConfig = await getSmtpSettingsAction();
    if (!smtpConfig || !smtpConfig.host) {
      return { error: "SMTP belum dikonfigurasi di pengaturan." };
    }

    const nodemailer = require("nodemailer");
    const customTransporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: parseInt(smtpConfig.port || "587"),
      secure: parseInt(smtpConfig.port) === 465,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
    });

    const smtpFrom = smtpConfig.from || smtpConfig.user;
    
    // Replace merge tags for test
    let finalHtml = bodyHtml.replace(/\{\{nama\}\}/g, "Test User").replace(/\{\{email\}\}/g, testEmail);
    if (previewText) {
      finalHtml = `<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${previewText}</div>` + finalHtml;
    }

    await customTransporter.sendMail({
      from: smtpFrom,
      to: testEmail,
      subject: `[TEST] ${subject}`,
      html: finalHtml,
      text: finalHtml.replace(/<[^>]+>/g, ""),
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Unknown error saat mengirim test" };
  }
}

export async function importContactsAction(contacts: { email: string, name?: string, tags?: string }[]) {
  if (!contacts || contacts.length === 0) return { error: "Data kontak kosong" };

  try {
    let imported = 0;
    // Insert one by one to gracefully handle duplicates
    for (const c of contacts) {
      try {
        await prisma.blastContact.create({
          data: {
            email: c.email,
            name: c.name || null,
            tags: c.tags || null,
          }
        });
        imported++;
      } catch (e: any) {
        // Skip duplicate emails (P2002)
        if (e.code !== "P2002") {
          console.error("Error importing contact:", e);
        }
      }
    }
    revalidatePath("/dashboard/email-blast");
    return { success: true, count: imported };
  } catch (error: any) {
    return { error: error.message };
  }
}

import { isMinioConfigured, uploadToMinio } from "@/lib/s3";
import { getSession } from "@/lib/auth";

export async function uploadInlineImageAction(formData: FormData): Promise<{ url?: string; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { error: "Sesi tidak valid!" };
  }

  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) {
    return { error: "Tidak ada file yang dipilih." };
  }

  if (file.size > 2 * 1024 * 1024) {
    return { error: "Ukuran gambar maksimal 2MB!" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

    let url = "";
    if (isMinioConfigured()) {
      url = await uploadToMinio(buffer, filename, file.type, "uploads/email-blasts");
    } else {
      const fs = await import("fs/promises");
      const path = await import("path");
      
      const uploadDir = path.join(process.cwd(), "public", "uploads", "email-blasts");
      await fs.mkdir(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);
      await fs.writeFile(filepath, buffer);
      
      url = `/uploads/email-blasts/${filename}`;
    }

    return { url };
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return { error: "Gagal mengunggah gambar." };
  }
}

export async function getSmtpSettingsAction() {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: "email_blast_smtp" }
    });
    if (setting) {
      return JSON.parse(setting.value);
    }
  } catch (error) {
    console.error("Failed to load SMTP setting", error);
  }
  return null;
}

export async function saveSmtpSettingsAction(formData: FormData) {
  const host = formData.get("host") as string;
  const port = formData.get("port") as string;
  const user = formData.get("user") as string;
  const pass = formData.get("pass") as string;
  const from = formData.get("from") as string;

  const config = { host, port, user, pass, from };

  try {
    await prisma.systemSetting.upsert({
      where: { key: "email_blast_smtp" },
      update: { value: JSON.stringify(config) },
      create: { key: "email_blast_smtp", value: JSON.stringify(config) },
    });
    revalidatePath("/dashboard/email-blast");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function toggleAllContactsStatusAction(isActive: boolean) {
  try {
    await prisma.blastContact.updateMany({
      data: { isActive }
    });
    revalidatePath("/dashboard/email-blast");
    revalidatePath("/dashboard/email-blast/kontak");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getEmailBlastTemplateAction(type: "header" | "footer") {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: `email_blast_${type}_template` }
    });
    return setting?.value || "";
  } catch (error) {
    return "";
  }
}

export async function saveEmailBlastTemplateAction(type: "header" | "footer", content: string) {
  try {
    await prisma.systemSetting.upsert({
      where: { key: `email_blast_${type}_template` },
      update: { value: content },
      create: { key: `email_blast_${type}_template`, value: content },
    });
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteCampaignAction(id: string) {
  try {
    await prisma.emailCampaign.delete({
      where: { id },
    });
    revalidatePath("/dashboard/email-blast/riwayat");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function cancelCampaignAction(id: string) {
  try {
    await prisma.emailCampaign.update({
      where: { id },
      data: { status: "failed" },
    });
    await prisma.campaignRecipient.updateMany({
      where: { campaignId: id, status: "pending" },
      data: { status: "failed", errorMessage: "Dibatalkan oleh pengguna" },
    });
    revalidatePath(`/dashboard/email-blast/riwayat/${id}`);
    revalidatePath("/dashboard/email-blast/riwayat");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateCampaignAction(id: string, formData: FormData) {
  const subject = formData.get("subject") as string;
  const bodyHtml = formData.get("bodyHtml") as string;
  const internalName = formData.get("internalName") as string;
  const previewText = formData.get("previewText") as string;

  try {
    await prisma.emailCampaign.update({
      where: { id },
      data: {
        subject,
        bodyHtml,
        internalName: internalName || null,
        previewText: previewText || null,
      },
    });
    revalidatePath(`/dashboard/email-blast/riwayat/${id}`);
    revalidatePath("/dashboard/email-blast/riwayat");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
