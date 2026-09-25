export const paymentVerificationSlugs = [
  "legal-jadi-mudah",
  "mudah-urus-legalitas",
  "legalitas-mudah-indonesia",
  "easylegal-bantu-pengusaha",
] as const;

export type PaymentVerificationSlug =
  (typeof paymentVerificationSlugs)[number];

export type PaymentVerificationEntity = {
  readonly slug: PaymentVerificationSlug;
  readonly legalName: string;
  readonly bankName: "Mandiri";
  readonly accountNumber: string;
  readonly accountHolder: string;
  readonly ahuNumber: string;
  readonly ahuUrl: string;
};

export type PaymentVerificationOffice = {
  readonly name: string;
  readonly building: string;
  readonly address: string;
};

export const paymentVerificationEntities = {
  "legal-jadi-mudah": {
    slug: "legal-jadi-mudah",
    legalName: "CV LEGAL JADI MUDAH",
    bankName: "Mandiri",
    accountNumber: "1560026240467",
    accountHolder: "CV LEGAL JADI MUDAH",
    ahuNumber: "AHU-0087109-AH.01.14 Tahun 2025",
    ahuUrl:
      "https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0087109-AH.01.14+Tahun+2025/id/2640649",
  },
  "mudah-urus-legalitas": {
    slug: "mudah-urus-legalitas",
    legalName: "CV MUDAH URUS LEGALITAS",
    bankName: "Mandiri",
    accountNumber: "1560026231037",
    accountHolder: "CV MUDAH URUS LEGALITAS",
    ahuNumber: "AHU-0087742-AH.01.14 Tahun 2025",
    ahuUrl:
      "https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0087742-AH.01.14+Tahun+2025/id/2642249",
  },
  "legalitas-mudah-indonesia": {
    slug: "legalitas-mudah-indonesia",
    legalName: "CV LEGALITAS MUDAH INDONESIA",
    bankName: "Mandiri",
    accountNumber: "1030030300004",
    accountHolder: "LEGALITAS MUDAH INDONESIA",
    ahuNumber: "AHU-0061760-AH.01.14 Tahun 2024",
    ahuUrl:
      "https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0061760-AH.01.14+Tahun+2024/id/1904084",
  },
  "easylegal-bantu-pengusaha": {
    slug: "easylegal-bantu-pengusaha",
    legalName: "CV. EASYLEGAL BANTU PENGUSAHA",
    bankName: "Mandiri",
    accountNumber: "1300025584486",
    accountHolder: "CV. EASYLEGAL BANTU PENGUSAHA",
    ahuNumber: "AHU-0040513-AH.01.14 Tahun 2024",
    ahuUrl:
      "https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0040513-AH.01.14+Tahun+2024/id/1768633",
  },
} as const satisfies Readonly<
  Record<PaymentVerificationSlug, PaymentVerificationEntity>
>;

export const paymentVerificationSlugSet: ReadonlySet<string> = new Set(
  paymentVerificationSlugs,
);

export const financeWhatsAppNumber = "6281717312821";
export const financeWhatsAppMessage =
  "Hallo Kak, saya ingin menanyakan perihal pembayaran dan invoice. Boleh dibantu info lebih lanjut ya kak?";
export const financeWhatsAppUrl = `https://wa.me/${financeWhatsAppNumber}?text=${encodeURIComponent(financeWhatsAppMessage)}`;

export const paymentVerificationOffices = [
  {
    name: "Bandung Head Office",
    building: "EasyBuilding",
    address: "Jl. Cihampelas No. 201A",
  },
  {
    name: "Jakarta Branch Office",
    building: "Dewata Office Sovereign Plaza",
    address: "Jl. TB Simatupang No. 36",
  },
  {
    name: "Bekasi Branch Office",
    building: "Emerald Commercial Summarecon Bekasi",
    address: "Blok UF No. 10",
  },
] as const satisfies readonly PaymentVerificationOffice[];

export function isPaymentVerificationSlug(
  value: string,
): value is PaymentVerificationSlug {
  return paymentVerificationSlugSet.has(value);
}

export function getPaymentVerificationEntity(
  slug: string,
): PaymentVerificationEntity | undefined {
  if (!isPaymentVerificationSlug(slug)) {
    return undefined;
  }

  return paymentVerificationEntities[slug];
}
