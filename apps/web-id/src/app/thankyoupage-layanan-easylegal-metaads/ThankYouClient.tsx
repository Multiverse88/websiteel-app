"use client";

import { useEffect, useRef, useState } from "react";
import "./thankyou.css";

const WA_NUMBER = "62817770048";
const DEFAULT_MESSAGE = "Halo kak Viani, saya mau konsultasi jasa Penyesuaian KBLI.";

function buildWhatsappUrl(message: string) {
  return `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(message)}`;
}

export default function ThankYouClient() {
  const [whatsappUrl, setWhatsappUrl] = useState(() => buildWhatsappUrl(DEFAULT_MESSAGE));
  const [count, setCount] = useState(3);
  const whatsappUrlRef = useRef(whatsappUrl);
  whatsappUrlRef.current = whatsappUrl;

  useEffect(() => {
    // Baca langsung dari URL browser (bukan useSearchParams()) biar tidak
    // kena race condition hydration — sama seperti implementasi Nuxt asli.
    const params = new URLSearchParams(window.location.search);
    const nama = params.get("nama") || "kak";
    const paket = params.get("paket") || "Penyesuaian KBLI";
    const waMessage = `Halo kak Viani, saya ${nama}, saya lihat iklan meta, mau konsultasi jasa ${paket}.`;
    setWhatsappUrl(buildWhatsappUrl(waMessage));

    const timer = window.setInterval(() => {
      setCount((prev) => {
        if (prev > 0) return prev - 1;
        window.clearInterval(timer);
        window.location.href = whatsappUrlRef.current;
        return prev;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="ty-metaads-scope">
      <div className="ty-page">
        <div className="card">
          <div className="check-wrap">
            <svg width="32" height="32" viewBox="0 0 52 52" fill="none">
              <polyline className="checkmark" points="12,26 22,36 40,18" fill="none"></polyline>
            </svg>
          </div>
          <h1>Terimakasih</h1>
          <p className="sub">Menghubungkan ke Whatsapp...</p>

          <div className="timer-wrap">
            <div className="timer-label">Mengalihkan ke WhatsApp dalam</div>
            <div className="timer-bar">
              <div className="timer-fill"></div>
            </div>
            <div className="timer-count">{count}</div>
            <div className="timer-note">detik...</div>
          </div>

          <a className="btn-wa" href={whatsappUrl}>
            💬 Chat WhatsApp Sekarang
          </a>
          <p className="note">Tidak mau tunggu? Klik tombol di atas.</p>

          <div className="divider"></div>

          <div className="trust-grid">
            <span className="ti">✅ Garansi Aman 100%</span>
            <span className="ti">✅ Bisa Transaksi di Shopee</span>
            <span className="ti">✅ Dipercaya 11.000+ Klien</span>
          </div>
        </div>
      </div>
    </div>
  );
}
