"use server";

import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function getCurrentUser() {
  const session = await getSession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        bio: true,
        role: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Gagal mendapatkan data user:", error);
    return null;
  }
}

export async function updateProfile(prevState: any, formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "Sesi tidak valid. Silakan login kembali." };
  }

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;
  const avatarFile = formData.get("avatarFile") as File | null;
  const avatarUrl = formData.get("avatarUrl") as string;

  if (!name) {
    return { error: "Nama lengkap wajib diisi!" };
  }

  let avatar = avatarUrl || "";

  // Handle file upload
  if (avatarFile && avatarFile.size > 0) {
    if (!ALLOWED_TYPES.includes(avatarFile.type)) {
      return { error: "Format foto tidak didukung! Gunakan JPG, PNG, atau WebP." };
    }
    if (avatarFile.size > MAX_FILE_SIZE) {
      return { error: "Ukuran foto maksimal 2MB!" };
    }

    try {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const ext = avatarFile.name.split(".").pop() || "jpg";
      const filename = `avatar-${session.userId}-${Date.now()}.${ext}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");

      // Ensure directory exists
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);

      avatar = `/uploads/avatars/${filename}`;
    } catch {
      // File upload gagal (kemungkinan di Vercel serverless), fallback ke URL
      if (!avatar && avatarUrl) {
        avatar = avatarUrl;
      }
    }
  }

  try {
    await prisma.user.update({
      where: { id: session.userId },
      data: {
        name,
        role: role || "Spesialis Hukum",
        bio: bio || "",
        avatar: avatar || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");
    revalidatePath("/artikel");

    return { success: "Profil berhasil diperbarui!" };
  } catch (err: any) {
    console.error("Gagal memperbarui profil:", err);
    return { error: "Terjadi kesalahan internal. Silakan coba lagi." };
  }
}
