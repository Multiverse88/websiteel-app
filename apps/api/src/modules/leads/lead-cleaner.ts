// Helper untuk membersihkan dan menstandarkan teks layanan serta memberi rekomendasi CS default.

const SERVICE_MAP: Record<string, string> = {
  "pendirian-badan-usaha/pt": "Pendirian PT (Perseroan Terbatas)",
  "pendirian-badan-usaha/pt-perorangan": "Pendirian PT Perorangan",
  "pendirian-badan-usaha/cv": "Pendirian CV (Persekutuan Komanditer)",
  "pendirian-badan-usaha/yayasan": "Pendirian Yayasan",
  "pendirian-badan-usaha/koperasi": "Pendirian Koperasi",
  "perizinan-usaha/oss-rba": "Perizinan Berusaha OSS-RBA",
  "perizinan-usaha/nib": "Penerbitan Nomor Induk Berusaha (NIB)",
  "perizinan-usaha/sbu-jasa-konstruksi": "Sertifikat Badan Usaha (SBU Konstruksi)",
  "perizinan-usaha/izin-bpom": "Sertifikasi & Izin Edar BPOM",
  "perizinan-usaha/sertifikasi-halal": "Sertifikasi Halal Resmi",
  "perizinan-usaha/izin-pse-kominfo": "Pendaftaran Izin PSE Kominfo",
  "perizinan-usaha/izin-lingkungan-amdal-sppl": "Persetujuan Lingkungan (AMDAL/UKL-UPL/SPPL)",
  "kantor-virtual/virtual-office-jakarta": "Virtual Office Jakarta",
  "kantor-virtual/virtual-office-bandung": "Virtual Office Bandung",
  "kantor-virtual/virtual-office-surabaya": "Virtual Office Surabaya",
  "kantor-virtual/serviced-office": "Serviced Office",
  "hukum/somasi": "Penyusunan Somasi & Mediasi",
  "hukum/gugatan-wanprestasi": "Pendampingan Gugatan Wanprestasi",
  "hukum/review-kontrak-bisnis": "Pemeriksaan & Review Kontrak Bisnis",
  "hukum/legal-opinion": "Penyusunan Pendapat Hukum (Legal Opinion)",
  "hukum/pendampingan-bap-polisi": "Pendampingan Pemeriksaan Hukum (BAP)",
  "haki/pendaftaran-merek": "Pendaftaran Merek & Hak Cipta (HAKI)",
  "haki/perpanjangan-merek": "Perpanjangan Masa Berlaku Merek",
};

export function prettifyServiceName(rawService: string | null | undefined, rawProduct: string | null | undefined): string {
  if (rawService && rawService.trim().length > 3) {
    const s = rawService.trim();
    // Hilangkan prefix "Halo... saya tertarik dengan "
    const cleaned = s
      .replace(/^halo\s+[^,]+,\s*/i, "")
      .replace(/^halo\s+/i, "")
      .replace(/^saya tertarik (dengan|pada)\s+/i, "")
      .replace(/^tertarik (dengan|pada)\s+/i, "")
      .replace(/\s*\(.*?\)\s*$/, "")
      .trim();
    if (cleaned.length > 2) {
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }
  }

  if (rawProduct) {
    const p = rawProduct.trim().toLowerCase().replace(/^\/+|\/+$/g, "").replace(/^layanan\//, "");
    if (SERVICE_MAP[p]) return SERVICE_MAP[p];
    for (const [key, val] of Object.entries(SERVICE_MAP)) {
      if (p.includes(key) || key.includes(p)) return val;
    }
    // Format fallback slug jadi Title Case
    return p
      .split(/[-_/]+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return "Konsultasi Legal Umum";
}

export function getDefaultFollowUpAdvice(status: string, serviceName: string, lostReason?: string | null): string {
  if (status === "WON") {
    return "Closing selesai. Siapkan onboarding berkas & tawarkan cross-sell layanan pendukung (pajak/HAKI/kontrak).";
  }
  if (status === "LOST") {
    const reasonText = lostReason ? ` (Alasan: ${lostReason})` : "";
    return `Lead batal${reasonText}. Arsipkan ke list re-engagement 30 hari ke depan dengan promo harga/bundling.`;
  }
  if (status === "NEW") {
    return `Lead baru masuk. Segera balas < 5 menit dengan menyapa ramah dan menanyakan detail kebutuhan untuk ${serviceName}.`;
  }
  if (status === "CONTACTED") {
    return "Sudah direspons. Kirimkan rangkuman poin kebutuhan dan jadwalkan telepon singkat / konsultasi pendalaman.";
  }
  if (status === "QUALIFIED") {
    return `Kebutuhan ${serviceName} sudah jelas. Kirimkan proposal ringkas, timeline pengerjaan, dan estimasi biaya.`;
  }
  if (status === "PROPOSAL") {
    return "Proposal sudah dikirim. Lakukan follow-up H+1 menanyakan ada poin yang ingin disesuaikan atau perlu diskon termin.";
  }
  return "Pantau respon chat WhatsApp dan update status secara berkala.";
}
