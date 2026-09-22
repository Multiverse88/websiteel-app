"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, Phone, Download, Copy, Mail, Building2 } from "lucide-react";
import {
  formatPhone,
  toWaNumber,
  type KartuPerson,
} from "@/data/kartu";
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

  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // QR berisi tautan halaman ini, dibangun dari prop `shareUrl` yang dihitung
  // di server. Sengaja BUKAN dari window.location di dalam useState/useEffect:
  // nilai awal yang berbeda antara server dan klien memicu hydration mismatch,
  // dan setState di dalam effect dilarang oleh aturan lint proyek ini.
  // Digambar lewat layanan gambar publik supaya tidak perlu dependensi baru.
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&data=${encodeURIComponent(shareUrl)}`;

  // Tilt 3D mengikuti kursor; berhenti otomatis kalau perangkat tidak
  // mendukung hover atau pengguna minta animasi dikurangi.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    let frame = 0;

    const onMove = (e: PointerEvent) => {
      card.classList.add("is-live");
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        card.style.setProperty("--ry", `${px * 18}deg`);
        card.style.setProperty("--rx", `${-py * 14}deg`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      card.classList.remove("is-live");
      card.style.setProperty("--ry", "-13deg");
      card.style.setProperty("--rx", "8deg");
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
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
      <div className="kartu-stage">
        <div className="kartu-card" ref={cardRef}>
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
            <div className="kartu-id">
              <h1 className="kartu-name">{person.name}</h1>
              <p className="kartu-role">{person.title}</p>
              <span className="kartu-brand">
                <i aria-hidden="true" />
                EasyLegal · Legalitas Bisnis
              </span>
            </div>
          </div>

          <div className="kartu-rule" />

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

          <div className="kartu-actions">
            <a className="kartu-btn is-primary" href={waHref} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={17} strokeWidth={2.6} />
              Chat WhatsApp
            </a>
            <button className="kartu-btn is-ghost" type="button" onClick={handleSaveContact}>
              <Download size={16} strokeWidth={2.4} />
              Simpan Kontak
            </button>
            <button className="kartu-btn is-ghost" type="button" onClick={handleCopy}>
              {copied ? <Check size={16} strokeWidth={2.6} /> : <Copy size={15} strokeWidth={2.4} />}
              {copied ? "Tersalin" : "Salin Info"}
            </button>
          </div>

          <div className="kartu-qr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrSrc} alt="Kode QR kartu nama" width={74} height={74} loading="lazy" />
            <span className="kartu-qr-txt">
              <b>Bagikan kartu ini</b>
              Pindai kode QR untuk membuka halaman kartu nama digital.
            </span>
          </div>
        </div>
      </div>

      <div className="kartu-below">
        <p>
          Kartu nama digital {person.name} — {person.title} EasyLegal.
        </p>
        <Link className="kartu-home" href="/">
          <ArrowLeft size={14} strokeWidth={2.4} />
          Kembali ke easylegal.id
        </Link>
      </div>

      {copied && <div className="kartu-toast">Info kontak tersalin</div>}
    </div>
  );
}
