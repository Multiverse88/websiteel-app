import type { Metadata } from "next";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terdaftar PSE | EasyLegal",
  description:
    "Tanda Daftar Penyelenggara Sistem Elektronik (PSE) Lingkup Privat EasyLegal di KOMDIGI — Nomor TDPSE 009819.02/DJAI.PSE/08/2023.",
  alternates: { canonical: `${config.baseUrl}/terdaftar-pse` },
  openGraph: {
    title: "Terdaftar PSE | EasyLegal",
    description:
      "Tanda Daftar PSE Lingkup Privat EasyLegal — terdaftar resmi di KOMDIGI.",
    url: `${config.baseUrl}/terdaftar-pse`,
    siteName: "EasyLegal",
  },
};

const SISTEM_ELEKTRONIK = "EASYLEGAL.CO.ID";
const DOMAIN = "easylegal.co.id";

const rows: Array<{ label: string; value: string }> = [
  { label: "Sistem Elektronik", value: SISTEM_ELEKTRONIK },
  { label: "Penyelenggara Sistem Elektronik", value: "USAHA SOLUSI BANGSA" },
  { label: "Nomor TDPSE", value: "009819.02/DJAI.PSE/08/2023" },
  { label: "Domain", value: DOMAIN },
  { label: "Sektor", value: "Perdagangan" },
  { label: "Tanggal Terdaftar", value: "Monday, 04 September 2023" },
];

function HeaderLogos() {
  return (
    <div className="grid grid-cols-3 items-center gap-2 mb-6">
      {/* KOMSIGI */}
      <svg viewBox="0 0 120 64" className="w-full h-auto" role="img" aria-label="KOMDIGI">
        <g>
          <rect x="44" y="2" width="12" height="12" rx="2.5" fill="#0099DA" />
          <rect x="58" y="2" width="12" height="12" rx="2.5" fill="#005B94" />
          <rect x="51" y="16" width="12" height="12" rx="2.5" fill="#00A3E0" />
          <rect x="65" y="16" width="12" height="12" rx="2.5" fill="#003A70" />
          <rect x="58" y="30" width="12" height="12" rx="2.5" fill="#0072CE" />
        </g>
        <text
          x="60"
          y="56"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="13"
          fontWeight="900"
          fill="#1E293B"
          letterSpacing="1"
        >
          KOMDIGI
        </text>
      </svg>

      {/* PSE Lingkup Privat */}
      <svg viewBox="0 0 150 64" className="w-full h-auto" role="img" aria-label="PSE Lingkup Privat">
        <defs>
          <linearGradient id="pse-co-p" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F37121" />
            <stop offset="0.55" stopColor="#9A348E" />
            <stop offset="1" stopColor="#005B94" />
          </linearGradient>
          <linearGradient id="pse-co-s" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#005B94" />
            <stop offset="0.5" stopColor="#0099DA" />
            <stop offset="1" stopColor="#F27280" />
          </linearGradient>
          <linearGradient id="pse-co-e" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#9A348E" />
            <stop offset="0.5" stopColor="#005B94" />
            <stop offset="1" stopColor="#0099DA" />
          </linearGradient>
        </defs>
        <text
          x="4"
          y="42"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="38"
          fontWeight="900"
          fontStyle="italic"
          fill="url(#pse-co-p)"
        >
          P
        </text>
        <text
          x="30"
          y="42"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="38"
          fontWeight="900"
          fontStyle="italic"
          fill="url(#pse-co-s)"
        >
          S
        </text>
        <text
          x="56"
          y="42"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="38"
          fontWeight="900"
          fontStyle="italic"
          fill="url(#pse-co-e)"
        >
          E
        </text>
        <text
          x="86"
          y="28"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#64748B"
          letterSpacing="0.5"
        >
          LINGKUP
        </text>
        <text
          x="86"
          y="40"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#64748B"
          letterSpacing="0.5"
        >
          PRIVAT
        </text>
      </svg>

      {/* Zona Integritas — No Korupsi */}
      <svg viewBox="0 0 120 64" className="w-full h-auto" role="img" aria-label="Zona Integritas No Korupsi">
        <text
          x="4"
          y="16"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="11"
          fontWeight="900"
          fill="#E11D48"
        >
          ZONA
        </text>
        <text
          x="4"
          y="29"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="11"
          fontWeight="900"
          fill="#E11D48"
        >
          INTEGRITAS
        </text>
        <g transform="translate(78, 8)">
          <path
            d="M14 0 L24 4 L28 14 L24 24 L14 28 L4 24 L0 14 L4 4 Z"
            fill="#DC2626"
          />
          <text
            x="14"
            y="18"
            textAnchor="middle"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="7.5"
            fontWeight="900"
            fill="#FFFFFF"
          >
            STOP
          </text>
        </g>
        <text
          x="4"
          y="44"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="11"
          fontWeight="900"
          fill="#1E293B"
        >
          NO
        </text>
        <text
          x="4"
          y="57"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="11"
          fontWeight="900"
          fill="#1E293B"
        >
          KORUPSI
        </text>
      </svg>
    </div>
  );
}

export default function TerdaftarPsePage() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-[440px] mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.06)] p-6 sm:p-8">
          <HeaderLogos />

          <h1 className="font-heading text-[20px] sm:text-[22px] font-bold text-gray-950">
            PSE Lingkup Privat
          </h1>
          <p className="text-[13px] sm:text-[14px] text-gray-500 mt-1">
            Tanda Daftar PSE Lingkup Privat
          </p>

          <hr className="border-gray-100 my-6" />

          <dl className="space-y-4">
            {rows.slice(0, 5).map((row) => (
              <div key={row.label}>
                <dt className="text-[13px] text-gray-500">{row.label}</dt>
                <dd className="text-[15px] font-semibold text-gray-900 mt-0.5">
                  {row.value}
                </dd>
              </div>
            ))}

            <div>
              <dt className="text-[13px] text-gray-500">Status</dt>
              <dd className="mt-1">
                <span className="inline-block bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-md px-3 py-1 text-[14px] font-medium">
                  Terdaftar
                </span>
              </dd>
            </div>

            <div>
              <dt className="text-[13px] text-gray-500">{rows[5].label}</dt>
              <dd className="text-[15px] font-semibold text-gray-900 mt-0.5">
                {rows[5].value}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
