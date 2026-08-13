"use server";

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

    return { success: true };
  } catch (err) {
    console.error("Gagal mengirim email kerjasama:", err);
    return { error: "Terjadi kesalahan. Silakan coba lagi nanti." };
  }
}
