// Data kartu nama digital tim EasyLegal.
//
// Satu entri per orang. Slug dipakai di URL: /kartu/<slug>.
// `phone` = nomor WhatsApp/telpon yang ditampilkan (format lokal 08…),
// `photo` = path publik di /public (foto tim di /teamplalo).
export type KartuPerson = {
  slug: string;
  name: string;
  title: string;
  nip?: string;
  photo: string;
  phone: string;
  email?: string;
  office?: string;
};

export const KARTU_PEOPLE: KartuPerson[] = [
  {
    slug: "naufal-nandi-pinto",
    name: "Naufal Nandi Pinto, S.H.",
    title: "Personal Legal Assistant",
    photo: "/teamplalo/naufal-nandi-pinto.jpg",
    phone: "087785303765",
    office: "EasyLegal",
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
