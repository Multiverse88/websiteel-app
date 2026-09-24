"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Copy,
  Download,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
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
    ...(person.title ? [`TITLE:${person.title}`] : []),
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

  // Kartu ini sengaja menuju nomor pribadi pemilik kartu, bukan WA rotator.
  const waText = `Halo ${person.name.split(",")[0]}, saya mau konsultasi terkait kebutuhan legalitas bisnis saya.`;
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(waText)}`;
  const telHref = `tel:+${wa}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&data=${encodeURIComponent(shareUrl)}`;
  const [copied, setCopied] = useState(false);

  const handleSaveContact = useCallback(() => {
    const blob = new Blob([buildVCard(person)], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${person.slug}.vcf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }, [person]);

  const handleCopy = useCallback(async () => {
    const text = [person.name, [person.title, "EasyLegal"].filter(Boolean).join(" — "), displayPhone]
      .filter(Boolean)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      if (error instanceof DOMException) return;
      throw error;
    }
  }, [person.name, person.title, displayPhone]);

  return (
    <main className="kartu-scope">
      <div className="kartu-stage">
        <article className="kartu-card" aria-labelledby="kartu-person-name">
          <div className="kartu-photo">
            <Image
              src={person.photo}
              alt={`Foto ${person.name}`}
              fill
              priority
              sizes="(max-width: 440px) calc(100vw - 32px), 408px"
            />
          </div>

          <section className="kartu-identity">
            <h1 className="kartu-name" id="kartu-person-name">
              {person.name}
            </h1>
            <p className="kartu-role">{person.title}</p>
            <div className="kartu-identity-logo">
              <Image src="/images/logo.svg" alt="EasyLegal" width={4452} height={3755} />
            </div>
          </section>

          <section className="kartu-contact" aria-label="Kontak dan informasi">
            <div className="kartu-actions">
              <button className="kartu-action is-save" type="button" onClick={handleSaveContact}>
                <span>Simpan kontak</span>
                <Download size={19} strokeWidth={2.25} aria-hidden="true" />
              </button>
              <a
                className="kartu-action is-whatsapp"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>WhatsApp</span>
                <MessageCircle size={19} strokeWidth={2.25} aria-hidden="true" />
              </a>
            </div>

            <div className="kartu-details">
              <a className="kartu-detail" href={telHref}>
                <span className="kartu-detail-icon">
                  <Phone size={18} strokeWidth={2.1} aria-hidden="true" />
                </span>
                <span className="kartu-detail-copy">
                  <span className="kartu-detail-label">Telepon</span>
                  <span className="kartu-detail-value">{displayPhone}</span>
                </span>
                <ChevronRight size={18} strokeWidth={1.9} aria-hidden="true" />
              </a>

              {person.email && (
                <a className="kartu-detail" href={`mailto:${person.email}`}>
                  <span className="kartu-detail-icon">
                    <Mail size={18} strokeWidth={2.1} aria-hidden="true" />
                  </span>
                  <span className="kartu-detail-copy">
                    <span className="kartu-detail-label">Email</span>
                    <span className="kartu-detail-value">{person.email}</span>
                  </span>
                  <ChevronRight size={18} strokeWidth={1.9} aria-hidden="true" />
                </a>
              )}

              {person.office &&
                (person.mapsUrl ? (
                  <a
                    className="kartu-detail"
                    href={person.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="kartu-detail-icon">
                      <MapPin size={18} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                    <span className="kartu-detail-copy">
                      <span className="kartu-detail-label">Alamat kantor</span>
                      <span className="kartu-detail-value">{person.office}</span>
                    </span>
                    <ChevronRight size={18} strokeWidth={1.9} aria-hidden="true" />
                  </a>
                ) : (
                  <div className="kartu-detail">
                    <span className="kartu-detail-icon">
                      <MapPin size={18} strokeWidth={2.1} aria-hidden="true" />
                    </span>
                    <span className="kartu-detail-copy">
                      <span className="kartu-detail-label">Alamat kantor</span>
                      <span className="kartu-detail-value">{person.office}</span>
                    </span>
                  </div>
                ))}

              {person.instagram && (
                <a
                  className="kartu-detail"
                  href={person.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="kartu-detail-icon">
                    <svg
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.1}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </span>
                  <span className="kartu-detail-copy">
                    <span className="kartu-detail-label">Instagram kantor</span>
                    <span className="kartu-detail-value">@id.easylegal</span>
                  </span>
                  <ChevronRight size={18} strokeWidth={1.9} aria-hidden="true" />
                </a>
              )}

              <button className="kartu-detail" type="button" onClick={handleCopy}>
                <span className="kartu-detail-icon">
                  {copied ? (
                    <Check size={18} strokeWidth={2.3} aria-hidden="true" />
                  ) : (
                    <Copy size={18} strokeWidth={2.1} aria-hidden="true" />
                  )}
                </span>
                <span className="kartu-detail-copy">
                  <span className="kartu-detail-label">Bagikan detail</span>
                  <span className="kartu-detail-value">{copied ? "Info tersalin" : "Salin info kontak"}</span>
                </span>
                <ChevronRight size={18} strokeWidth={1.9} aria-hidden="true" />
              </button>
            </div>

            <div className="kartu-share">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrSrc} alt="Kode QR kartu nama" width={76} height={76} loading="lazy" />
              <p>
                <strong>Bagikan kartu ini</strong>
                Pindai QR untuk membuka kartu nama digital.
              </p>
            </div>
          </section>
        </article>
      </div>

      <div className="kartu-below">
        <Link className="kartu-home" href="/">
          <ArrowLeft size={15} strokeWidth={2.2} aria-hidden="true" />
          Kembali ke easylegal.id
        </Link>
      </div>

      <div className="kartu-status" role="status" aria-live="polite">
        {copied && <div className="kartu-toast">Info kontak tersalin</div>}
      </div>
    </main>
  );
}
