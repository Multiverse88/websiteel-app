"use server";

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Email tidak valid." };
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/newsletter/subscribe`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    
    const data = await res.json();
    
    return data;
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return { success: false, error: "Terjadi kesalahan. Silakan coba lagi." };
  }
}

export async function unsubscribeNewsletter(email: string) {
  if (!email) {
    return { success: false, error: "Email tidak valid." };
  }

  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:4000'}/api/v1/newsletter/unsubscribe`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    
    return await res.json();
  } catch {
    return { success: false, error: "Email tidak ditemukan." };
  }
}
