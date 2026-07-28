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
      // Setup custom transporter if provided
      let customTransporter = null;
      if (customSmtpHost && customSmtpUser && customSmtpPass) {
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
      }

      // Send immediately
      for (const contact of activeContacts) {
        let status = "failed";
        let errorMessage: string | null = null;
        try {
          if (customTransporter) {
            await customTransporter.sendMail({
              from: customSmtpFrom || customSmtpUser,
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
  redirect("/dashboard/email-blast");
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
