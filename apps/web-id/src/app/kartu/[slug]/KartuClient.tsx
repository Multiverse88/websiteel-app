"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Check, Copy, Download, MessageCircle } from "lucide-react";
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

  // Pengecualian sadar rotator: kartu ini milik satu orang, jadi WA/telpon
  // harus mendarat ke nomor pribadinya langsung — rotator justru mengalihkan
  // ke CS lain. Tracking tetap jalan via GA4 outbound-click bawaan.
  const waText = `Halo ${person.name.split(",")[0]}, saya mau konsultasi terkait kebutuhan legalitas bisnis saya.`;
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(waText)}`;

  // Domain untuk ditampilkan di kartu + QR (dihitung server, hindari
  // hydration mismatch — bukan dari window.location).
  const host = shareUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&data=${encodeURIComponent(shareUrl)}`;

  const stackRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Tilt halus seluruh tumpukan kartu mengikuti kursor; berhenti otomatis
  // di perangkat tanpa hover atau saat animasi dikurangi.
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const rect = stack.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stack.style.setProperty("--ry", `${px * 12}deg`);
        stack.style.setProperty("--rx", `${-py * 9}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      stack.style.setProperty("--ry", "0deg");
      stack.style.setProperty("--rx", "0deg");
    };
    stack.addEventListener("pointermove", onMove);
    stack.addEventListener("pointerleave", onLeave);
    return () => {
      stack.removeEventListener("pointermove", onMove);
      stack.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

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
      <div className="kartu-scene">
        <div className="kartu-stack" ref={stackRef}>
          {/* Kartu putih (di belakang): logo, identitas, kontak */}
          <div className="kartu-card kartu-card-front">
            <div className="kartu-front-top">
              <span className="kartu-logo">
                easylegal<span className="kartu-logo-dot">.</span>
              </span>
              <span className="kartu-front-domain">{host}</span>
            </div>

            <div className="kartu-person">
              <h1 className="kartu-name">{person.name}</h1>
              <p className="kartu-role">{person.title}</p>
            </div>

            <div className="kartu-rows">
              <a className="kartu-row" href={`tel:+${wa}`}>
                <span className="kartu-row-label">T</span>
                <span>{displayPhone}</span>
              </a>
              {person.email && (
                <a className="kartu-row" href={`mailto:${person.email}`}>
                  <span className="kartu-row-label">E</span>
                  <span>{person.email}</span>
                </a>
              )}
              <a
                className="kartu-row"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="kartu-row-label">W</span>
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Kartu hitam (di depan): logo emboss, murni dekoratif */}
          <div className="kartu-card kartu-card-back" aria-hidden="true">
            <span className="kartu-emboss">easylegal.</span>
            <span className="kartu-back-note">
              Pendirian PT. Pendaftaran merek. NIB &amp; OSS.
            </span>
          </div>
        </div>
      </div>

      <div className="kartu-toolbar">
        <a
          className="kartu-act is-primary"
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={15} strokeWidth={2.2} />
          Chat WhatsApp
        </a>
        <button className="kartu-act" type="button" onClick={handleSaveContact}>
          <Download size={15} strokeWidth={2.2} />
          Simpan Kontak
        </button>
        <button className="kartu-act" type="button" onClick={handleCopy}>
          {copied ? <Check size={15} strokeWidth={2.6} /> : <Copy size={15} strokeWidth={2.2} />}
          {copied ? "Tersalin" : "Salin Info"}
        </button>
      </div>

      <div className="kartu-share">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={qrSrc} alt="Kode QR kartu nama" width={64} height={64} loading="lazy" />
        <p>Pindai kode QR untuk membuka kartu ini di perangkat lain.</p>
      </div>

      {copied && <div className="kartu-toast">Info kontak tersalin</div>}
    </div>
  );
}
