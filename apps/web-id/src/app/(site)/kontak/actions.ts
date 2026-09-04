"use server";

export async function submitContactForm(prevState: Record<string, unknown> | null, formData: FormData) {
  const name = formData.get("name") as string;
  const businessName = formData.get("businessName") as string;
  const email = formData.get("email") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const topic = formData.get("topic") as string;
  const message = formData.get("message") as string;

  // Validation
  if (!name?.trim()) {
    return { error: "Nama wajib diisi." };
  }
  if (!email?.trim()) {
    return { error: "Email wajib diisi." };
  }
  if (!whatsapp?.trim()) {
    return { error: "No. WhatsApp wajib diisi." };
  }
  if (!topic) {
    return { error: "Topik konsultasi wajib dipilih." };
  }
  if (!message?.trim()) {
    return { error: "Pesan wajib diisi." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Format email tidak valid." };
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/contacts`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        businessName: businessName?.trim() || null,
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        topic,
        message: message.trim(),
      }),
    });
    
    if (!res.ok) {
      throw new Error("Failed to save contact submission to API");
    }

    return { success: true };
  } catch (err) {
    console.error("Gagal mengirim pesan kontak:", err);
    return { error: "Terjadi kesalahan. Silakan coba lagi atau hubungi kami via WhatsApp." };
  }
}
