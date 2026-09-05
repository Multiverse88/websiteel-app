/**
 * Canonical URL Mapping untuk glossary Cannibalization
 * 
 * Glossary-glossary ini bersaing satu sama lain untuk keyword yang sama.
 * Canonical diarahkan ke glossary "utama" agar Google memberikan SEO credit ke halaman yang tepat.
 * 
 * Source: Easy Legal - ID All Page(2).xlsx → Glossary New → Status = "Cannibalization"
 */

export const glossaryCanonicalMapping: Record<string, string> = {
  // === NPWP (34 variations) ===
  "npwp-online": "/glossary/npwp",
  "daftar-npwp-online": "/glossary/npwp",
  "cara-membuat-npwp": "/glossary/npwp",
  "syarat-membuat-npwp": "/glossary/npwp",
  "fungsi-npwp": "/glossary/npwp",
  "siapa-yang-wajib-memiliki-npwp": "/glossary/npwp",
  "npwp-pribadi": "/glossary/npwp",
  "cara-membuat-npwp-pribadi": "/glossary/npwp",
  "kegunaan-npwp": "/glossary/npwp",
  "cara-membuat-npwp-online": "/glossary/npwp",
  "daftar-npwp": "/glossary/npwp",
  "cara-bikin-npwp-online": "/glossary/npwp",
  "cara-daftar-npwp-online": "/glossary/npwp",
  "bikin-npwp-online": "/glossary/npwp",
  "cara-buat-npwp": "/glossary/npwp",
  "membuat-npwp-online": "/glossary/npwp",
  "cara-bikin-npwp": "/glossary/npwp",
  "npwp-pusat": "/glossary/npwp",
  "buat-npwp-online": "/glossary/npwp",
  "apa-itu-npwp": "/glossary/npwp",
  "buat-npwp": "/glossary/npwp",
  "pendaftaran-npwp-online": "/glossary/npwp",
  "cara-mengaktifkan-npwp-status-ne": "/glossary/npwp",
  "npwp-artinya": "/glossary/npwp",
  "npwp-untuk-apa": "/glossary/npwp",
  "syarat-mengurus-npwp": "/glossary/npwp",
  "pembuatan-npwp-online": "/glossary/npwp",
  "syarat-buat-npwp": "/glossary/npwp",
  "apa-yang-dimaksud-dengan-npwp": "/glossary/npwp",
  "npwp-itu-apa": "/glossary/npwp",
  "cara-mendaftar-npwp-online": "/glossary/npwp",
  "bikin-npwp": "/glossary/npwp",
  "siapa-yang-wajib-memiliki-npwp-2": "/glossary/npwp",
  "syarat-npwp": "/glossary/npwp",
  "cara-mengurus-npwp-online": "/glossary/npwp",
  "cara-daftar-online-npwp": "/glossary/npwp",
  "npwp-non-efektif": "/glossary/npwp",
  "cara-mendapatkan-npwp": "/glossary/npwp",
  "arti-npwp": "/glossary/npwp",
  "daftar-npwp-online-2024": "/glossary/npwp",

  // === HAKI (8 variations) ===
  "hak-kekayaan-intelektual": "/glossary/haki",
  "jenis-haki": "/glossary/haki",
  "haki-2": "/glossary/haki",
  "kepanjangan-haki": "/glossary/haki",
  "hak-kekayaan-intelektual-2": "/glossary/haki",
  "jenis-jenis-haki": "/glossary/haki",

  // === CV (10 variations) ===
  "apa-itu-cv": "/glossary/cv",
  "kepanjangan-cv": "/glossary/cv",
  "cv-perusahaan": "/glossary/cv",
  "cv-adalah": "/glossary/cv",
  "cv-adalah-singkatan-dari": "/glossary/cv",
  "cv-kepanjangan-dari": "/glossary/cv",
  "cv-artinya": "/glossary/cv",
  "cv-itu-apa": "/glossary/cv",
  "apa-arti-cv": "/glossary/cv",

  // === PT (9 variations) ===
  "pt-perorangan": "/glossary/pt",
  "kepanjangan-pt": "/glossary/pt",
  "pt-adalah": "/glossary/pt",
  "pt-perorangan-adalah": "/glossary/pt",
  "pengertian-hak-cipta": "/glossary/pt",
  "kripto-2": "/glossary/pt",
  "cryptocurrency-adalah-2": "/glossary/pt",
  "pengertian-hak-cipta-2": "/glossary/pt",

  // === Pajak / PPH (12 variations) ===
  "pph-22-berapa-persen": "/glossary/pajak",
  "cara-menghitung-pph-21": "/glossary/pajak",
  "tarif-pph-23": "/glossary/pajak",
  "tarif-progresif-pph-21": "/glossary/pajak",
  "pph-final-2": "/glossary/pajak",
  "ereg-pajak-go-id": "/glossary/pajak",
  "ereg-pajak-go-id-login": "/glossary/pajak",
  "ereg-pajak-go-id-2": "/glossary/pajak",
  "ereg-pajak-go-id-cek": "/glossary/pajak",
  "ereg-pajak-go-id-daftar": "/glossary/pajak",
  "objek-pajak-adalah": "/glossary/pajak",
  "objek-pajak-adalah-2": "/glossary/pajak",

  // === UMKM / UMK (10 variations) ===
  "umkm-adalah": "/glossary/umkm",
  "umkm-singkatan-dari": "/glossary/umkm",
  "umk-adalah": "/glossary/umkm",
  "umk-2": "/glossary/umkm",
  "umk-adalah-singkatan-dari": "/glossary/umkm",
  "umk-kepanjangan-dari": "/glossary/umkm",
  "umk-artinya": "/glossary/umkm",
  "umk-singkatan-dari": "/glossary/umkm",

  // === NIB / OSS (4 variations) ===
  "oss-2": "/glossary/oss",
  "cek-nib-oss-2": "/glossary/nib",
  "cek-nib-oss": "/glossary/nib",

  // === KBLI (3 variations) ===
  "kbli-2020": "/glossary/kbli",
  "kbli-2": "/glossary/kbli",
  "kepanjangan-kbli": "/glossary/kbli",

  // === Visa / KITAS / KITAP (4 variations) ===
  "kitas-dan-kitap": "/glossary/visa",
  "visa-adalah": "/glossary/visa",
  "kitas-adalah-2": "/glossary/visa",
  "kitap-adalah": "/glossary/visa",

  // === Manufacturing / Manufaktur (5 variations) ===
  "manufaktur-adalah": "/glossary/manufacturing",
  "manufacturing-adalah": "/glossary/manufacturing",
  "industri-manufaktur-2": "/glossary/manufacturing",
  "manufacturing-2": "/glossary/manufacturing",
  "manufacturing-artinya": "/glossary/manufacturing",

  // === Usaha / Wirausaha (8 variations) ===
  "manfaat-wirausaha": "/glossary/usaha",
  "usaha-2": "/glossary/usaha",
  "mendirikan-usaha-sendiri-disebut": "/glossary/usaha",
  "manfaat-wirausaha-2": "/glossary/usaha",
  "usaha-adalah": "/glossary/usaha",
  "usaha-mikro-2": "/glossary/usaha",
  "usaha-merupakan": "/glossary/usaha",
  "ciri-ciri-badan-usaha": "/glossary/usaha",
  "ciri-ciri-badan-usaha-2": "/glossary/usaha",
  "risiko-usaha-2": "/glossary/usaha",

  // === BPOM (3 variations) ===
  "cara-cek-bpom-skincare": "/glossary/bpom",
  "cara-cek-nomor-bpom": "/glossary/bpom",
  "bpom-artinya": "/glossary/bpom",

  // === Firma (3 variations) ===
  "firma-2": "/glossary/firma",
  "firma-hukum-adalah": "/glossary/firma",

  // === Privasi (2 variations) ===
  "privasi-adalah": "/glossary/privasi",
  "privasi-artinya": "/glossary/privasi",

  // === Akuisisi (3 variations) ===
  "akuisisi-2": "/glossary/akuisisi",
  "akuisisi-artinya": "/glossary/akuisisi",
  "akuisisi-adalah": "/glossary/akuisisi",

  // === Investasi (2 variations) ===
  "investasi-2": "/glossary/investasi",

  // === Dividen (2 variations) ===
  "dividen-2": "/glossary/dividen",
  "dividend-adalah": "/glossary/dividen",

  // === Legalitas / Legalisir (2 variations) ===
  "legalitas-2": "/glossary/legalitas",
  "legalisir-2": "/glossary/legalitas",

  // === Merek (3 variations) ===
  "merek-dagang-2": "/glossary/merek",
  "merek-adalah": "/glossary/merek",
  "hak-merek-adalah": "/glossary/merek",

  // === Single variations (point to themselves as canonical) ===
  "pkwtt": "/glossary/pkwtt",
  "pkwt-2": "/glossary/pkwt",
  "kelebihan-2": "/glossary/kelebihan",
  "sertifikat-elektronik-2": "/glossary/sertifikat-elektronik",
  "non-pkp-2": "/glossary/non-pkp",
  "perdata-2": "/glossary/perdata",
  "persekutuan-2": "/glossary/persekutuan",
  "k3l-adalah": "/glossary/ketenagakerjaan",
  "pengertian-ketenagakerjaan-2": "/glossary/ketenagakerjaan",
  "pns-adalah": "/glossary/pns",
  "tdp-2": "/glossary/tdp",
  "sppkp-2": "/glossary/sppkp",
  "lkpm-adalah": "/glossary/lkpm",
  "ketentuan-2": "/glossary/ketentuan",
  "kriteria-2": "/glossary/kriteria",
  "agreement-adalah": "/glossary/agreement",
  "hak-paten-2": "/glossary/hak-paten",
  "kite-2": "/glossary/kite",
  "efin-2": "/glossary/efin",
  "pma-2": "/glossary/pma",
  "modal-2": "/glossary/modal",
  "core-2": "/glossary/core",
  "startup-2": "/glossary/startup",
  "freelancer-indonesia": "/glossary/freelancer",
  "halal-adalah": "/glossary/halal",
  "syarat-nikah-2": "/glossary/syarat-nikah",
  "formalitas-adalah": "/glossary/formalitas",
  "importir-adalah": "/glossary/importir",
  "perseroan-adalah": "/glossary/perseroan",
  "perseroan-terbatas-adalah": "/glossary/perseroan",
};

/**
 * Get canonical URL for a glossary slug
 * Returns the canonical glossary URL if it's cannibalization, otherwise null
 */
export function getGlossaryCanonicalUrl(slug: string): string | null {
  return glossaryCanonicalMapping[slug] || null;
}
