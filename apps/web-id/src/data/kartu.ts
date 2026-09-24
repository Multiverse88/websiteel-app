// Data kartu nama digital tim EasyLegal.
//
// Satu entri per orang. Slug dipakai di URL: /kartu/<slug>.
// `phone` = nomor WhatsApp/telpon yang ditampilkan (format lokal 08…),
// `photo` = path publik di /public (foto tim di /teamplalo).
export type KartuPerson = {
  slug: string;
  name: string;
  title?: string;
  nip?: string;
  photo: string;
  phone: string;
  email?: string;
  office?: string;
  mapsUrl?: string;
  instagram?: string;
};

export const KARTU_PEOPLE: KartuPerson[] = [
  {
    slug: "naufal-nandi-pinto",
    name: "Naufal Nandi Pinto, S.H.",
    title: "Personal Legal Assistant",
    photo: "/teamplalo/naufal-nandi-pinto.jpg",
    phone: "087785303765",
    email: "pla@easylegal.id",
    office: "EasyLegal — Kantor Pusat, Bandung",
    mapsUrl: "https://maps.app.goo.gl/r3rdFHrC3EeKazuj7",
    instagram: "https://www.instagram.com/id.easylegal/",
  },
  {
    slug: "mayang-cahyati",
    name: "Mayang Cahyati, S.H.",
    title: "Personal Legal Assistant",
    photo: "/teamplalo/mayang-cahyati.jpg",
    phone: "087785303767",
    email: "pla@easylegal.id",
    office: "EasyLegal — Kantor Pusat, Bandung",
    mapsUrl: "https://maps.app.goo.gl/r3rdFHrC3EeKazuj7",
    instagram: "https://www.instagram.com/id.easylegal/",
  },
  {
    slug: "indiana-oscar",
    name: "Indiana Oscar, S.H.",
    title: "Personal Legal Assistant",
    photo: "/teamplalo/indiana-oscar.jpg",
    phone: "087785303769",
    email: "pla@easylegal.id",
    office: "EasyLegal — Kantor Jakarta",
    mapsUrl: "https://maps.app.goo.gl/yJYBZEWNLeXbve2d6",
    instagram: "https://www.instagram.com/id.easylegal/",
  },
  {
    slug: "ela-yuniar",
    name: "Ela Yuniar, S.H.",
    title: "Personal Legal Assistant",
    photo: "/teamplalo/ela-yuniar.jpg",
    phone: "0817770245",
    email: "pla@easylegal.id",
    office: "EasyLegal — Kantor Pusat, Bandung",
    mapsUrl: "https://maps.app.goo.gl/r3rdFHrC3EeKazuj7",
    instagram: "https://www.instagram.com/id.easylegal/",
  },
  {
    slug: "aditya-nugraha",
    name: "Aditya Nugraha",
    title: "Business Development",
    photo: "/teamplalo/aditya-nugraha.jpg",
    phone: "081703806985",
    email: "aditya.nugraha@easycorp.id",
    office: "EasyLegal — Kantor Pusat, Bandung",
    mapsUrl: "https://maps.app.goo.gl/r3rdFHrC3EeKazuj7",
    instagram: "https://www.instagram.com/id.easylegal/",
  },
  {
    slug: "ai-yulianti",
    name: "Ai Yulianti (Ayu)",
    photo: "/teamplalo/ai-yulianti.jpg",
    phone: "0818881425",
    office: "EasyLegal — Kantor Jakarta",
    mapsUrl: "https://maps.app.goo.gl/yJYBZEWNLeXbve2d6",
    instagram: "https://www.instagram.com/id.easylegal/",
  },
];

export function getKartuPerson(slug: string): KartuPerson | undefined {
  return KARTU_PEOPLE.find((p) => p.slug === slug);
}

/** "087785303765" -> "6287785303765" untuk tautan wa.me */
export function toWaNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

/** "087785303765" -> "+62 877-8530-3765" untuk tampilan */
export function formatPhone(phone: string): string {
  const wa = toWaNumber(phone);
  const rest = wa.slice(2);
  const groups = rest.match(/.{1,4}/g) ?? [rest];
  return `+62 ${groups.join("-")}`;
}
