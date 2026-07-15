"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth"; // Assume a getSession helper exists from previous code, or write a custom one.

const prisma = new PrismaClient();

export async function createLandingPage(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;

  if (!title || !slug) throw new Error("Title and slug are required");

  const newPage = await prisma.landingPage.create({
    data: {
      title,
      slug,
      sections: JSON.stringify([]),
      createdBy: String(session.userId), // Cast to string
    },
  });

  revalidatePath("/dashboard/landing-pages");
  redirect(`/dashboard/landing-pages/${newPage.id}`);
}

export async function updateLandingPageSections(id: string, sectionsJson: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.landingPage.update({
    where: { id },
    data: { sections: sectionsJson },
  });

  revalidatePath(`/dashboard/landing-pages/${id}`);
}

export async function updateLandingPageSettings(id: string, formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const status = formData.get("status") as string;
  const description = formData.get("description") as string;
  const pixelId = formData.get("pixelId") as string;

  const redirectEnabled = formData.get("redirectEnabled") === "true";
  const redirectUrl = formData.get("redirectUrl") as string;
  const redirectDelay = parseInt(formData.get("redirectDelay") as string || "0", 10);
  const redirectPassUtm = formData.get("redirectPassUtm") === "true";

  await prisma.landingPage.update({
    where: { id },
    data: { 
      title, 
      slug, 
      status, 
      description, 
      pixelId,
      redirectSettings: {
        enabled: redirectEnabled,
        redirectUrl,
        delaySeconds: redirectDelay,
        passUtmParams: redirectPassUtm,
      }
    },
  });

  revalidatePath(`/dashboard/landing-pages/${id}`);
  revalidatePath("/dashboard/landing-pages");
}

export async function deleteLandingPage(id: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.landingPage.delete({ where: { id } });
  revalidatePath("/dashboard/landing-pages");
}

export async function uploadLandingPageImage(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file uploaded");

  const { uploadToMinio } = await import("@/lib/s3");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const url = await uploadToMinio(buffer, filename, file.type, "uploads/landing-pages");

  return { url };
}
