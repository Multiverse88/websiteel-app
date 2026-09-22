"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Phone,
  Download,
  Copy,
  Mail,
  Building2,
} from "lucide-react";
import { formatPhone, toWaNumber, type KartuPerson } from "@/data/kartu";
import "./kartu.css";

// Template vCard 3.0 — dibaca oleh kontak iOS, Android, dan Outlook.
function buildVCard(person: KartuPerson): string {
  const wa = toWaNumber(person.phone);
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${person.name};;;;`,
    `FN:${person.name}`,
    `ORG:${person.office || "EasyLegal"}`,
    `TITLE:${person.title}`,
    `TEL;TYPE=CELL,VOICE:+${wa}`,
  ];
  if (person.email) lines.push(`EMAIL;TYPE=WORK:${person.email}`);
  if (person.office) lines.push(`ADR;TYPE=WORK:;;${person.office};;;;Indonesia`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export default function KartuClient({
  person,
  shareUrl,
}: {
  person: KartuPerson;
  shareUrl: string;
}) {
  const wa = useMemo(() => toWaNumber(person.phone), [person.phone]);
  const displayPhone = useMemo(() => formatPhone(person.phone), [person.phone]);

  // Pengecualian sadar dari konvensi getWhatsAppLink(): kartu ini milik satu
  // orang, jadi WA/telpon harus mendarat ke nomor pribadinya langsung —
  // rotator justru mengalihkan ke CS lain. Tracking tetap jalan via GA4
  // outbound-click bawaan; kalau nanti perlu atribusi rotator, bungkus
  // panggilan ini dengan getWhatsAppLink.
  const waText = `Halo ${person.name.split(",")[0]}, saya mau konsultasi terkait kebutuhan legalitas bisnis saya.`;
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(waText)}`;
  const telHref = `tel:+${wa}`;

  const [copied, setCopied] = useState(false);

  // QR berisi tautan halaman ini, dibangun dari prop `shareUrl` yang dihitung
  // di server. Sengaja BUKAN dari window.location di dalam useState/useEffect:
  // nilai awal yang berbeda antara server dan klien memicu hydration mismatch,
  // dan setState di dalam effect dilarang oleh aturan lint proyek ini.
  // Digambar lewat layanan gambar publik supaya tidak perlu dependensi baru.
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&data=${encodeURIComponent(shareUrl)}`;

  const handleSaveContact = useCallback(() => {
    const blob = new Blob([buildVCard(person)], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${person.slug}.vcf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, [person]);

  const handleCopy = useCallback(async () => {
    const text = `${person.name}\n${person.title} — EasyLegal\n${displayPhone}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard bisa diblokir; biarkan tanpa feedback.
    }
  }, [person.name, person.title, displayPhone]);

  return (
    <div className="kartu-scope">
      <div className="kartu-stage">
        <div className="kartu-card">
          {/* Banner lebar dengan foto profil menumpuk di tepi bawahnya. */}
          <div className="kartu-banner">
            <Image
              src="/hero-tentang-kami.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 420px) 100vw, 420px"
            />
          </div>

          {/* Foto profil bulat menumpuk di tepi bawah banner */}
          <div className="kartu-head">
            <div className="kartu-photo">
              <Image
                src={person.photo}
                alt={`Foto ${person.name}`}
                width={208}
                height={208}
                priority
                sizes="104px"
              />
            </div>
            <Image
              className="kartu-brand"
              src="/images/logo.svg"
              alt="EasyLegal"
              width={72}
              height={61}
            />
          </div>

          <h1 className="kartu-name">{person.name}</h1>
          <p className="kartu-role">{person.title}</p>

          {/* Kontak vertikal: ikon lingkaran + teks, satu baris per kanal */}
          <div className="kartu-rows">
            <a className="kartu-row" href={waHref} target="_blank" rel="noopener noreferrer">
              <span className="kartu-row-ic is-wa">
                <MessageCircle size={16} strokeWidth={2.4} />
              </span>
              <span className="kartu-row-txt">
                <span className="kartu-row-label">WhatsApp</span>
                <span className="kartu-row-value">{displayPhone}</span>
              </span>
            </a>
            <a className="kartu-row" href={telHref}>
              <span className="kartu-row-ic">
                <Phone size={15} strokeWidth={2.4} />
              </span>
              <span className="kartu-row-txt">
                <span className="kartu-row-label">Telepon</span>
                <span className="kartu-row-value">{person.phone}</span>
              </span>
            </a>
            {person.email && (
              <a className="kartu-row" href={`mailto:${person.email}`}>
                <span className="kartu-row-ic">
                  <Mail size={15} strokeWidth={2.4} />
                </span>
                <span className="kartu-row-txt">
                  <span className="kartu-row-label">Email</span>
                  <span className="kartu-row-value">{person.email}</span>
                </span>
              </a>
            )}
            {person.office && (
              <div className="kartu-row">
                <span className="kartu-row-ic">
                  <Building2 size={15} strokeWidth={2.4} />
                </span>
                <span className="kartu-row-txt">
                  <span className="kartu-row-label">Kantor</span>
                  <span className="kartu-row-value">{person.office}</span>
                </span>
              </div>
            )}
          </div>

          {/* Simpan Kontak paling menonjol — aksi utama di kartu nama */}
          <div className="kartu-actions">
            <button className="kartu-btn is-primary" type="button" onClick={handleSaveContact}>
              <Download size={17} strokeWidth={2.4} />
              Simpan Kontak
            </button>
            <a className="kartu-btn is-ghost" href={waHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} strokeWidth={2.4} />
              Chat WhatsApp
            </a>
            <button className="kartu-btn is-ghost" type="button" onClick={handleCopy}>
              {copied ? <Check size={16} strokeWidth={2.6} /> : <Copy size={15} strokeWidth={2.4} />}
              {copied ? "Tersalin" : "Salin Info"}
            </button>
          </div>

          {/* Footer bagikan: QR kecil di kiri, teks di kanan */}
          <div className="kartu-share">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrSrc} alt="Kode QR kartu nama" width={72} height={72} loading="lazy" />
            <span>
              Pindai QR untuk membagikan
              <br />
              kartu nama ini
            </span>
          </div>
        </div>
      </div>

      <div className="kartu-below">
        <Link className="kartu-home" href="/">
          <ArrowLeft size={14} strokeWidth={2.4} />
          Kembali ke easylegal.id
        </Link>
      </div>

      <div className="kartu-status" role="status" aria-live="polite">
        {copied && <div className="kartu-toast">Info kontak tersalin</div>}
      </div>
    </div>
  );
}
