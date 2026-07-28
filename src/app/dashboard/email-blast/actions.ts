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

  const customSmtpFrom = formData.get("customSmtpFrom") as string;
  const customSmtpHost = formData.get("customSmtpHost") as string;
  const customSmtpPort = formData.get("customSmtpPort") as string;
  const customSmtpUser = formData.get("customSmtpUser") as string;
  const customSmtpPass = formData.get("customSmtpPass") as string;

  if (!subject || !bodyHtml) {
    return { error: "Subject dan Body wajib diisi" };
  }

  try {
    // Determine recipients
    let activeContacts: any[] = [];
    let recipientsData: any[] = [];
    if (sendToAll) {
      activeContacts = await prisma.blastContact.findMany({
        where: { isActive: true },
        select: { id: true, email: true },
      });
      recipientsData = activeContacts.map((c: any) => ({
        contactId: c.id,
      }));
    }

    const campaignStatus = scheduledAt ? "scheduled" : "completed";

    const campaign = await prisma.emailCampaign.create({
      data: {
        subject,
        bodyHtml,
        status: campaignStatus,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        recipients: {
          create: recipientsData,
        },
      },
    });

    if (!scheduledAt) {
      // Setup custom transporter from System Settings if provided
      let customTransporter = null;
      let smtpFrom = null;
      const smtpConfig = await getSmtpSettingsAction();
      
      if (smtpConfig && smtpConfig.host && smtpConfig.user && smtpConfig.pass) {
        const nodemailer = require("nodemailer");
        customTransporter = nodemailer.createTransport({
          host: smtpConfig.host,
          port: parseInt(smtpConfig.port || "587"),
          secure: parseInt(smtpConfig.port) === 465,
          auth: {
            user: smtpConfig.user,
            pass: smtpConfig.pass,
          },
        });
        smtpFrom = smtpConfig.from || smtpConfig.user;
      } else if (customSmtpHost && customSmtpUser && customSmtpPass) {
        // Fallback to custom form data if provided
        const nodemailer = require("nodemailer");
        customTransporter = nodemailer.createTransport({
          host: customSmtpHost,
          port: parseInt(customSmtpPort || "587"),
          secure: parseInt(customSmtpPort) === 465,
          auth: {
            user: customSmtpUser,
            pass: customSmtpPass,
          },
        });
        smtpFrom = customSmtpFrom || customSmtpUser;
      }

      // Send immediately
      for (const contact of activeContacts) {
        let status = "failed";
        let errorMessage: string | null = null;
        try {
          if (customTransporter) {
            await customTransporter.sendMail({
              from: smtpFrom,
              to: contact.email,
              subject,
              html: bodyHtml,
              text: bodyHtml.replace(/<[^>]+>/g, ""),
            });
            status = "sent";
          } else {
            const result = await sendEmail({
              to: contact.email,
              subject,
              html: bodyHtml,
              text: bodyHtml.replace(/<[^>]+>/g, ""), 
            });
            status = result?.simulated ? "sent" : "sent"; 
          }
        } catch (err: any) {
          errorMessage = err.message || "Unknown error";
        }
        
        await prisma.campaignRecipient.update({
          where: {
            campaignId_contactId: {
              campaignId: campaign.id,
              contactId: contact.id,
            }
          },
          data: {
            status,
            errorMessage,
            sentAt: new Date(),
          }
        });
      }
    }

  } catch (error: any) {
    return { error: error.message || "Terjadi kesalahan saat membuat campaign" };
  }
  
  revalidatePath("/dashboard/email-blast");
  return { success: true };
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
