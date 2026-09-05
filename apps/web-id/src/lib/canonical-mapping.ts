/**
 * Canonical URL Mapping untuk artikel Cannibalization
 * 
 * Artikel-artikel ini bersaing dengan halaman layanan untuk keyword yang sama.
 * Canonical diarahkan ke service page agar Google memberikan SEO credit ke halaman yang tepat.
 * 
 * Source: Easy Legal - ID All Page(2).xlsx → Artikel New → Status = "Cannibalization"
 */

export const canonicalMapping: Record<string, string> = {
  // PT Perorangan
  "cara-bikin-pt-perorangan-dengan-mudah-sesuai-uu-cipta-kerja": "/layanan/pendirian-badan-usaha/pt-perorangan",
  "pembuatan-pt-panduan-lengkap-jasa-pendirian-pt": "/layanan/pendirian-badan-usaha/pt-perorangan",
  "pembuatan-pt-perseorangan-lebih-mudah-dengan-easylegal": "/layanan/pendirian-badan-usaha/pt-perorangan",
  "cara-membuat-pt-perorangan": "/layanan/pendirian-badan-usaha/pt-perorangan",
  "cara-daftar-pt-perorangan-online": "/layanan/pendirian-badan-usaha/pt-perorangan",
  "pembuatan-pt": "/layanan/pendirian-badan-usaha/pt-perorangan",
  "buat-pt-perseorangan-proses-mudah-dengan-layanan-easylegal-id": "/layanan/pendirian-badan-usaha/pt-perorangan",
  "bikin-pt-jadi-mudah-begini-cara-pilih-jasa-bikin-pt-yang-tepat": "/layanan/pendirian-badan-usaha/pt-perorangan",

  // PT PMA
  "buka-usaha-di-indonesia-gunakan-jasa-bikin-pt-pma": "/layanan/pendirian-badan-usaha/pt-pma",

  // PT (umum)
  "bagaiman-cara-mendirikan-perseroan-terbatas-cek-di-sini": "/layanan/pendirian-badan-usaha/pt",
  "perseroan-terbatas": "/layanan/pendirian-badan-usaha/pt",

  // CV
  "jasa-bikin-cv-solusi-praktis-untuk-bisnis-anda": "/layanan/pendirian-badan-usaha/cv",
  "jasa-buat-cv-solusi-cepat-untuk-bisnis-anda": "/layanan/pendirian-badan-usaha/cv",
  "jasa-pendirian-cv-profesional-solusi-mudah-mendirikan-cv": "/layanan/pendirian-badan-usaha/cv",

  // Firma
  "jasa-bikin-firma-cara-mudah-dirikan-usaha-profesional": "/layanan/pendirian-badan-usaha/firma",
  "jasa-buat-firma-solusi-praktis-dan-cepat-untuk-bisnis-kamu": "/layanan/pendirian-badan-usaha/firma",

  // Yayasan
  "ketahui-kekurangan-yayasan-sebelum-dirikan-yayasan": "/layanan/pendirian-badan-usaha/yayasan",
  "ketahui-kelebihan-dan-kekurangan-yayasan": "/layanan/pendirian-badan-usaha/yayasan",

  // Perkumpulan
  "mudahnya-mendirikan-perkumpulan-dengan-jasa-buat-perkumpulan": "/layanan/pendirian-badan-usaha/perkumpulan",

  // Merek / HAKI
  "daftar-haki-pengertian-jenis-jenis-dan-pentingnya": "/layanan/merek-haki",
  "pendaftaran-haki-lebih-mudah-dengan-layanan-easylegal": "/layanan/merek-haki",
  "cara-mendaftar-merek-dagang": "/layanan/merek-haki",
  "cara-daftar-merek-dagang-bagi-pelaku-umkm": "/layanan/merek-haki",

  // Sertifikasi ISO
  "sertifikasi-iso-pengertian-jenis-dan-manfaatnya": "/layanan/sertifikasi-iso",
  "jenis-jenis-iso-yang-perlu-dipahami-pebisnis": "/layanan/sertifikasi-iso",

  // NIB / OSS
  "apa-itu-oss-rba": "/layanan/nib-oss",
  "nib-perusahaan": "/layanan/nib-oss",
  "perbedaan-siup-dan-nib-pahami-supaya-tidak-keliru": "/layanan/nib-oss",
};

/**
 * Get canonical URL for an article slug
 * Returns the service page URL if the article is cannibalization, otherwise null
 */
export function getCanonicalUrl(slug: string): string | null {
  return canonicalMapping[slug] || null;
}
