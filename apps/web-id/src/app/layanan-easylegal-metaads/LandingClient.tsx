"use client";

import { useEffect, useState, type FormEvent } from "react";
import "./landing.css";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type FormState = {
  nama: string;
  whatsapp: string;
  layanan: string;
};

const CAMPAIGN_LEAD_ENDPOINT = "https://api.easylegal.my.id/api/v1/campaign-leads/layanan-easylegal-metaads";
const THANK_YOU_URL = "https://easylegal.id/thankyoupage-layanan-easylegal-metaads/";

export default function LandingClient() {
  const [formData, setFormData] = useState<FormState>({ nama: "", whatsapp: "", layanan: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Meta Pixel (browser) + Conversions API (server) share one event_id for dedup.
      const fbEventId = `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead", {}, { eventID: fbEventId });
      }

      // Satu panggilan ke admin-api, yang meneruskan ke Google Sheets, Fonnte,
      // dan Meta Conversions API di server (menghindari token pihak ketiga
      // bocor ke browser, dan menghindari CSP connect-src memblokir
      // script.google.com / api.fonnte.com langsung dari client).
      try {
        await fetch(CAMPAIGN_LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nama: formData.nama,
            whatsapp: formData.whatsapp,
            layanan: formData.layanan,
            fbEventId,
          }),
        });
      } catch (err) {
        console.error("[campaign-lead] gagal mengirim:", err);
      }

      // Redirect ke thank-you page, bawa data form biar halaman itu bisa
      // membuat pesan WA personal.
      window.location.href = `${THANK_YOU_URL}?nama=${encodeURIComponent(formData.nama)}&whatsapp=${encodeURIComponent(formData.whatsapp)}&paket=${encodeURIComponent(formData.layanan)}`;
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Anchor links (href="#form") scroll smoothly — scoped to this page only
    // (not applied to <html> globally) so it never leaks into other routes
    // after a client-side navigation away from this page.
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";

    const cleanups: Array<() => void> = [];
    const on = <K extends keyof HTMLElementEventMap>(
      el: Element,
      type: K,
      handler: (ev: HTMLElementEventMap[K]) => void,
    ) => {
      el.addEventListener(type, handler as EventListener);
      cleanups.push(() => el.removeEventListener(type, handler as EventListener));
    };

    const tabButtons = document.querySelectorAll<HTMLElement>(".ptab");
    const panels = document.querySelectorAll<HTMLElement>(".ppanel");
    const chips = document.querySelectorAll<HTMLElement>("#chipRow span");
    const layananSelect = document.getElementById("layanan") as HTMLSelectElement | null;

    function activateTab(key: string) {
      tabButtons.forEach((b) => {
        const on = b.dataset.tab === key;
        b.classList.toggle("active", on);
      });
      panels.forEach((p) => p.classList.toggle("active", p.id === "panel-" + key));
      chips.forEach((c) => c.classList.toggle("active-chip", c.dataset.tab === key));
    }

    tabButtons.forEach((btn) => {
      on(btn, "click", () => activateTab(btn.dataset.tab || ""));
    });
    chips.forEach((chip) => {
      on(chip, "click", () => {
        activateTab(chip.dataset.tab || "");
        document.getElementById("paket-layanan")?.scrollIntoView({ behavior: "smooth" });
      });
    });

    // Deep link per iklan, contoh: ?tab=merek, ?tab=perorangan, ?tab=ptcv, ?tab=nib, ?tab=pma, ?tab=lainnya
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && document.getElementById("panel-" + tabParam)) {
      activateTab(tabParam);
    } else {
      activateTab("nib");
    }

    document.querySelectorAll<HTMLElement>("[data-service]").forEach((btn) => {
      on(btn, "click", () => {
        if (layananSelect) {
          layananSelect.value = btn.dataset.service || "";
          updateField("layanan", btn.dataset.service || "");
        }
      });
    });

    // Sub-tab (di-scope per grup, supaya switch di 1 layanan gak ganggu layanan lain)
    document.querySelectorAll<HTMLElement>(".subtab-group").forEach((group) => {
      const tabs = group.querySelectorAll<HTMLElement>(".sub-tab-btn");
      const groupPanels = group.querySelectorAll<HTMLElement>(".sub-panel");
      tabs.forEach((btn) => {
        on(btn, "click", () => {
          tabs.forEach((b) => b.classList.remove("active"));
          groupPanels.forEach((p) => p.classList.remove("active"));
          btn.classList.add("active");
          const target = group.querySelector("#sub-" + btn.dataset.sub);
          if (target) target.classList.add("active");
        });
      });
    });

    // Khusus voucher NIB (tetap perlu global karena elemennya di luar subtab-group NIB)
    const nibVoucherEl = document.getElementById("nibVoucherAmount");
    const nibVoucherByVariant: Record<string, string> = {
      "nib-perorangan": "Rp50.000",
      "nib-ptperorangan": "Rp50.000",
      "nib-badan": "Rp250.000",
      "cabut-nib": "Rp250.000",
    };
    document.querySelectorAll<HTMLElement>("#panel-nib .sub-tab-btn").forEach((btn) => {
      on(btn, "click", () => {
        const sub = btn.dataset.sub || "";
        if (nibVoucherEl && nibVoucherByVariant[sub]) {
          nibVoucherEl.textContent = nibVoucherByVariant[sub];
        }
      });
    });

    // Entity toggle (PT vs CV) khusus panel Pendirian PT/CV
    document.querySelectorAll<HTMLElement>(".entity-btn").forEach((btn) => {
      on(btn, "click", () => {
        const parent = btn.closest(".entity-toggle")?.parentElement;
        if (!parent) return;
        parent.querySelectorAll<HTMLElement>(".entity-btn").forEach((b) => b.classList.remove("active"));
        parent.querySelectorAll<HTMLElement>(".entity-panel").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        parent.querySelector("#entity-" + btn.dataset.entity)?.classList.add("active");
      });
    });

    // Detail toggle (Lihat Detail Lengkap) — accordion per package card
    document.querySelectorAll<HTMLElement>(".detail-toggle").forEach((btn) => {
      on(btn, "click", () => {
        const card = btn.closest(".pkg-card");
        if (!card) return;
        const isOpen = card.classList.contains("open");
        card.classList.toggle("open", !isOpen);
        btn.innerHTML = isOpen
          ? 'Lihat Detail Lengkap <span class="dt-icon">\u25be</span>'
          : 'Sembunyikan Detail <span class="dt-icon">\u25be</span>';
      });
    });

    document.querySelectorAll<HTMLElement>(".faq-item").forEach((item) => {
      const q = item.querySelector(".faq-q");
      const a = item.querySelector<HTMLElement>(".faq-a");
      if (!q || !a) return;
      on(q, "click", () => {
        const open = item.classList.contains("open");
        document.querySelectorAll<HTMLElement>(".faq-item.open").forEach((o) => {
          o.classList.remove("open");
          const oa = o.querySelector<HTMLElement>(".faq-a");
          if (oa) oa.style.maxHeight = "";
        });
        if (!open) {
          item.classList.add("open");
          a.style.maxHeight = a.scrollHeight + "px";
        }
      });
    });

    // Countdown mundur sederhana dari 01:59:00
    let t = 1 * 3600 + 59 * 60;
    const cd = document.querySelector(".countdown");
    const tick = () => {
      if (t <= 0) return;
      t--;
      const h = String(Math.floor(t / 3600)).padStart(2, "0");
      const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
      const sec = String(t % 60).padStart(2, "0");
      if (cd) {
        cd.innerHTML = `<div>${h}<span class="unit">Jam</span></div>:<div>${m}<span class="unit">Menit</span></div>:<div>${sec}<span class="unit">Detik</span></div>`;
      }
    };
    const intervalId = window.setInterval(tick, 1000);

    return () => {
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      cleanups.forEach((fn) => fn());
      window.clearInterval(intervalId);
    };
  }, []);

  return (

      <div className="landing-metaads-scope">


    <section className="hero">
      <div className="wrap">
        <span className="warn">Layanan legalitas lengkap dalam satu tempat</span>
        <h1>Semua Kebutuhan Legalitas Usaha, <em>Beres Bersama EasyLegal.</em></h1>
        <p className="lead">PT Perorangan, Pendirian PT/CV, Pendaftaran Merek, Jasa NIB, sampai PT PMA. Setiap proses didampingi Personal Legal Assistant (PLA) bergelar Sarjana Hukum dengan dukungan Tim Legal Officer, dari konsultasi awal hingga pengurusan legalitas tuntas.</p>
        <div className="trust-grid">
          <div className="trust-card">
            <div className="tc-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/></svg></div>
            <div className="tc-text"><b>Durasi Mulai 12</b><span>Jam Kerja</span></div>
          </div>
          <div className="trust-card">
            <div className="tc-icon"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
            <div className="tc-text"><b>4,9 / 13.000+</b><span>Klien dalam & luar negeri</span></div>
          </div>
          <div className="trust-card">
            <div className="tc-icon"><svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg></div>
            <div className="tc-text"><b>ISO 9001</b><span>& PSE Certified</span></div>
          </div>
          <div className="trust-card">
            <div className="tc-icon"><svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></div>
            <div className="tc-text"><b>Garansi Aman 100%</b><span>Bisa transaksi di Shopee</span></div>
          </div>
        </div>
      </div>
    </section>

    <section id="form">
      <div className="wrap">
        <div className="form-section">
          <div>
            <span className="section-tag" style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}>Konsultasi Gratis</span>
            <h2>Isi 3 Data Ini, Beres</h2>
            <p>Personal Legal Assistant kami hubungi kamu hari ini.</p>
        
          </div>
          <form className="lead-form" id="leadForm" onSubmit={submitForm}>
            <div className="field">
              <input type="text" id="nama" name="nama" value={formData.nama} onChange={(e) => updateField("nama", e.target.value)} placeholder="Nama Lengkap" required />
            </div>
            <div className="field">
              <input type="tel" id="wa" name="whatsapp" value={formData.whatsapp} onChange={(e) => updateField("whatsapp", e.target.value)} placeholder="Nomor WhatsApp" required />
            </div>
            <div className="field">
              <select id="layanan" name="layanan" value={formData.layanan} onChange={(e) => updateField("layanan", e.target.value)} required>
                <option value="">Layanan yang Diminati</option>
                <option value="PT Perorangan">PT Perorangan</option>
                <option value="Pendirian PT/CV">Pendirian PT/CV</option>
                <option value="Daftar Merek">Daftar Merek</option>
                <option value="Jasa NIB">Jasa NIB</option>
            <option value="PT PMA">PT PMA</option>
            <option value="KITAS">KITAS</option>
            <option value="Layanan Lainnya">Layanan Lainnya</option>
                <option value="Belum yakin, mau konsultasi dulu">Belum yakin, mau konsultasi dulu</option>
              </select>
            </div>
            <button type="submit" className="btn btn-red" disabled={isSubmitting}>
              {isSubmitting ? 'Mengirim...' : 'Hubungi Saya Sekarang'}
            </button>
            <p className="form-note" style={{ color: '#000' }}>Bergabung dengan 13.000+ pelaku usaha Indonesia yang sudah legal.</p>
          </form>
        </div>
      </div>
    </section>

    <section id="testimonials" style={{ background: '#ffffff', padding: '80px 0' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '40px', lineHeight: '1.2', letterSpacing: '-0.03em' }}>
          DIPERCAYA 13.000+ PELAKU USAHA<br />
          <span style={{ color: 'var(--red)' }}>DALAM & LUAR NEGERI</span>
        </h2>
        <div className="trust-gallery">
          <img src="/layanan-easylegal-metaads/image(3).png" alt="Klien 1" className="tg-left" />
          <img src="/layanan-easylegal-metaads/image(4).png" alt="Klien 2" className="tg-center" />
          <img src="/layanan-easylegal-metaads/image(5).png" alt="Klien 3" className="tg-right" />
        </div>
    
        <div className="testi-grid" style={{ textAlign: 'left' }}>
          <div className="testi" style={{ background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="stars">★★★★★</div>
            <p>"<b style={{ color: 'var(--red)' }}>Tepat waktu dan profesional.</b> Akta, SK Kemenkumham, NIB beres."</p>
            <footer style={{ color: '#888' }}>— Daan Darmawan</footer>
          </div>
          <div className="testi" style={{ background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="stars">★★★★★</div>
            <p>"<b style={{ color: 'var(--red)' }}>Respon cepat,</b> langsung masuk group Akta. Komunikasi mudah."</p>
            <footer style={{ color: '#888' }}>— Nelis</footer>
          </div>
          <div className="testi" style={{ background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <div className="stars">★★★★★</div>
            <p>"<b style={{ color: 'var(--red)' }}>Sangat membantu menemukan</b> KBLI yang tepat sesuai kebutuhan bisnis."</p>
            <footer style={{ color: '#888' }}>— Temmy Mulyawan</footer>
          </div>
        </div>
    
        <div style={{ marginTop: '32px' }}>
          <a href="#form" className="btn btn-red">Konsultasi Sekarang →</a>
        </div>
      </div>
    </section>

    <section id="why-section">
      <div className="wrap">
        <div className="section-head">
          <span className="section-tag">Kenapa EasyLegal</span>
          <h2>Fondasi Legalitas Bisnis</h2>
          <p style={{ fontSize: '14px', color: 'var(--muted)' }}>Bukan sekadar urus dokumen. EasyLegal jadi mitra legalitas bisnis yang mendampingi lewat Personal Legal Assistant bergelar Sarjana Hukum dari awal hingga tuntas, dengan biaya transparan dan respons cepat kapan saja dibutuhkan.</p>
        </div>
        <div className="pillars">MUDAH  |  CEPAT  |  TERPERCAYA</div>
        <div className="why-grid">
          <div className="why-card">
            <h4>Proses Cepat & Terlacak</h4>
            <p>Mulai dari 12 jam kerja untuk layanan tercepat, dengan progres yang dipantau secara real-time. Estimasi waktu bervariasi sesuai jenis layanan.</p>
          </div>
          <div className="why-card">
            <h4>Personal Legal Assistant (PLA)</h4>
            <p>Didampingi PLA dan Legal Officer bergelar Sarjana Hukum yang responsif dan berpengalaman, dari konsultasi awal hingga proses legalitas selesai.</p>
          </div>
          <div className="why-card">
            <h4>Legalitas & Sertifikasi Resmi</h4>
            <p>Terdaftar PSE Kominfo, tersertifikasi ISO 9001 untuk manajemen mutu dan ISO 27001 untuk keamanan data serta informasi klien.</p>
          </div>
          <div className="why-card">
            <h4>Biaya All-In, Tanpa Biaya Tersembunyi</h4>
            <p>Semua biaya tertera jelas di awal sebelum proses dimulai, tanpa ada biaya tambahan yang muncul di kemudian hari.</p>
          </div>
          <div className="why-card">
            <h4>Kualitas & Garansi Terjamin</h4>
            <p>Bekerja sama dengan notaris berpengalaman untuk memastikan dokumen sah secara hukum. Garansi uang kembali jika dokumen legalitas tidak selesai. Syarat dan ketentuan berlaku.</p>
          </div>
          <div className="why-card">
            <h4>Proses Fleksibel, Offline atau Online</h4>
            <p>Proses legalitas dapat dilakukan tatap muka langsung di kantor EasyLegal, atau sepenuhnya online dari mana saja sesuai kebutuhan.</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', marginBottom: '16px' }}>
          <a href="#form" className="btn btn-red">Konsultasi Gratis Sekarang →</a>
        </div>

        <div className="legal-deals-banner">
          <img src="/layanan-easylegal-metaads/ac3943d529ddfa540fe6eac463f44da0322933b2.png" alt="Legal Deals 50% Off" className="ld-img" />
        </div>

        <div className="countdown-bar">
          <div className="label">Promo biaya berlaku terbatas</div>
          <div className="countdown">
            <div>01<span className="unit">Jam</span></div>:
            <div>59<span className="unit">Menit</span></div>:
            <div>00<span className="unit">Detik</span></div>
          </div>
          <div className="warn-small">Biaya dapat berubah sewaktu-waktu setelah waktu menunjukkan 00:00:00. S&K berlaku.</div>
        </div>
      </div>
    </section>

    <section id="paket-layanan">
      <div className="wrap">
        <div className="section-head">
          <span className="section-tag">Biaya Layanan</span>
          <h2>Pilih Layanan Sesuai Kebutuhan</h2>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>Semua layanan sudah termasuk pendampingan Personal Legal Assistant 1-on-1. <b>Tanpa biaya tambahan</b> di tengah proses. <b style={{ color: 'var(--red)' }}>Diskon Up To 50% - Kuota Terbatas</b></p>
        </div>

        <div className="price-tabs" role="tablist">
          <button className="ptab active" data-tab="nib">Jasa NIB</button>
          <button className="ptab" data-tab="perorangan">PT Perorangan</button>
          <button className="ptab" data-tab="merek">Daftar Merek</button>
          <button className="ptab" data-tab="ptcv">Pendirian PT/CV</button>
          <button className="ptab" data-tab="pma">PT PMA</button>
          <button className="ptab" data-tab="kitas">KITAS</button>
          <button className="ptab" data-tab="lainnya">Semua Layanan</button>
        </div>

        {/* PANEL LAINNYA DIPINDAH KE PALING BAWAH */}

    {/* PT PERORANGAN */}
        <div className="ppanel" id="panel-perorangan">
          <div className="left" style={{ gridColumn: '1/-1' }}>
            <div className="subtab-group">
              <div className="sub-tabs" role="tablist" aria-label="Pilihan paket PT Perorangan">
                <button className="sub-tab-btn active" data-sub="pero-spesial">Spesial</button>
                <button className="sub-tab-btn " data-sub="pero-basic">Basic</button>
    <button className="sub-tab-btn " data-sub="pero-complete">Complete</button>
    <button className="sub-tab-btn " data-sub="pero-express">Express (Fast Track)</button>
    <button className="sub-tab-btn " data-sub="pero-office">Office (Best Value)</button>
    <button className="sub-tab-btn " data-sub="pero-prestige">Prestige (Recommended)</button>
              </div>
              <div className="sub-panel active" id="sub-pero-spesial"><div className="pkg-card" id="card-pero-spesial">
        <div className="pkg-head">
          <span className="pkg-name">Paket Spesial GRATIS VO</span>
        </div>
        <p className="price-old">Rp2.000.000</p>
        <p className="price-new">Rp999.000</p>
        <p className="price-note">Akta Penegasan + Rp1.499.000 (opsional)</p>
        <ul className="hi-list">
          <li>Estimasi proses: Semua dokumen selesai dalam 1-3 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan &amp; Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 10 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Surat Pernyataan Pendirian PT</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Pendirian Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak &amp; NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> Akun AHU</li>
    <li className="inc"><span className="dot">✓</span> NIB &amp; Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR &amp; SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Surat Pernyataan Mandiri</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial &amp; Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa &amp; Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling &amp; Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor &amp; Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi &amp; Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp250.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT Perorangan">Konsultasi Paket Ini →</a>
      </div></div>
              <div className="sub-panel " id="sub-pero-basic"><div className="pkg-card" id="card-pero-basic">
        <div className="pkg-head">
          <span className="pkg-name">Paket Basic</span>
        </div>
        <p className="price-old">Rp1.600.000</p>
        <p className="price-new">Rp799.000</p>
        <p className="price-note">Akta Penegasan + Rp1.499.000 (opsional)</p>
        <ul className="hi-list">
          <li>Estimasi proses: Semua dokumen selesai dalam 1 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 10 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Surat Pernyataan Pendirian PT</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Pendirian Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> Akun AHU</li>
    <li className="exc"><span className="dot">–</span> NIB & Akun OSS RBA</li>
    <li className="exc"><span className="dot">–</span> K3L/SPUMKTTR & SPPL</li>
    <li className="exc"><span className="dot">–</span> Sertifikat Standar</li>
    <li className="exc"><span className="dot">–</span> Surat Pernyataan Mandiri</li>
    <li className="exc"><span className="dot">–</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="exc"><span className="dot">–</span> Pembukaan Rekening Bank (*)</li>
    <li className="exc"><span className="dot">–</span> Gratis Desain Logo Perusahaan</li>
    <li className="exc"><span className="dot">–</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp50.000</li>
    <li className="exc"><span className="dot">–</span> Dokumen SOP Karyawan</li>
    <li className="exc"><span className="dot">–</span> Dokumen SOP Perusahaan</li>
    <li className="exc"><span className="dot">–</span> Dokumen Kontrak Bisnis</li>
    <li className="exc"><span className="dot">–</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT Perorangan">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pero-complete"><div className="pkg-card" id="card-pero-complete">
        <div className="pkg-head">
          <span className="pkg-name">Paket Complete</span>
        </div>
        <p className="price-old">Rp2.000.000</p>
        <p className="price-new">Rp999.000</p>
        <p className="price-note">Akta Penegasan + Rp1.499.000 (opsional)</p>
        <ul className="hi-list">
          <li>Estimasi proses: Semua dokumen selesai dalam 1-3 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 10 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Surat Pernyataan Pendirian PT</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Pendirian Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> Akun AHU</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Surat Pernyataan Mandiri</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp250.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT Perorangan">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pero-express"><div className="pkg-card" id="card-pero-express">
        <div className="pkg-head">
          <span className="pkg-name">Paket Express (Fast Track)</span>
        </div>
        <p className="price-old">Rp2.600.000</p>
        <p className="price-new">Rp1.299.000</p>
        <p className="price-note">Akta Penegasan + Rp1.499.000 (opsional)</p>
        <ul className="hi-list">
          <li>Estimasi proses: Semua dokumen selesai dalam 12 jam kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 10 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Surat Pernyataan Pendirian PT</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Pendirian Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> Akun AHU</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Surat Pernyataan Mandiri</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT Perorangan">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pero-office"><div className="pkg-card" id="card-pero-office">
        <div className="pkg-head">
          <span className="pkg-name">Paket Office (Best Value)</span>
        </div>
        <p className="price-old">Rp7.300.000</p>
        <p className="price-new">Rp3.649.000</p>
        <p className="price-note">Akta Penegasan + Rp1.499.000 (opsional)</p>
        <ul className="hi-list">
          <li>Estimasi proses: Semua dokumen selesai dalam 1-3 hari kerja</li>
    <li>Virtual Office 1 Tahun termasuk</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 10 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Surat Pernyataan Pendirian PT</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Pendirian Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> Akun AHU</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Surat Pernyataan Mandiri</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="inc"><span className="dot">✓</span> High Speed Internet</li>
    <li className="inc"><span className="dot">✓</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="inc"><span className="dot">✓</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="inc"><span className="dot">✓</span> Akses Meeting Room di 3 Kota</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT Perorangan">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pero-prestige"><div className="pkg-card" id="card-pero-prestige">
        <div className="pkg-head">
          <span className="pkg-name">Paket Prestige (Recommended)</span>
        </div>
        <p className="price-old">Rp4.000.000</p>
        <p className="price-new">Rp1.999.000</p>
        <p className="price-note">Akta Penegasan + Rp1.499.000 (opsional)</p>
        <ul className="hi-list">
          <li>Estimasi proses: Semua dokumen selesai dalam 1-3 hari kerja</li>
    <li>Virtual Office 1 Tahun termasuk</li>
    <li>Branding Identitas termasuk</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 10 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Surat Pernyataan Pendirian PT</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Pendirian Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> Akun AHU</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Surat Pernyataan Mandiri</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="inc"><span className="dot">✓</span> High Speed Internet</li>
    <li className="inc"><span className="dot">✓</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="inc"><span className="dot">✓</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="inc"><span className="dot">✓</span> Akses Meeting Room di 3 Kota</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Company Profile 8 Halaman</li>
    <li className="inc"><span className="dot">✓</span> Desain Kartu Nama</li>
    <li className="inc"><span className="dot">✓</span> Desain Kop Surat</li>
    <li className="inc"><span className="dot">✓</span> Desain Map</li>
    <li className="inc"><span className="dot">✓</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT Perorangan">Konsultasi Paket Ini →</a>
      </div></div>
            </div>
            <div className="foot-notes">(1) Jika tidak terdapat kendala pada sistem AHU & OSS.<br />(2) Berlaku untuk usaha dengan risiko menengah rendah.<br />(3) Bersifat opsional.<br /></div>
          </div>
        </div>

    {/* PENDIRIAN PT/CV — gabungan dengan toggle badan usaha */}
        <div className="ppanel" id="panel-ptcv">
          <div className="left" style={{ gridColumn: '1/-1' }}>
            <div className="entity-toggle">
              <button className="entity-btn active" data-entity="cv">CV</button>
              <button className="entity-btn" data-entity="pt">PT (Modal Dasar Maks Rp1 Miliar)</button>
            </div>

            <div className="entity-panel active" id="entity-cv">
              <div className="subtab-group">
                <div className="sub-tabs" role="tablist" aria-label="Pilihan paket CV">
                  <button className="sub-tab-btn active" data-sub="cv-basic">Basic</button>
    <button className="sub-tab-btn " data-sub="cv-complete">Complete</button>
    <button className="sub-tab-btn " data-sub="cv-express">Express (Fast Track)</button>
    <button className="sub-tab-btn " data-sub="cv-office">Office (Recommended)</button>
    <button className="sub-tab-btn " data-sub="cv-prestige">Prestige (Best Value)</button>
                </div>
                <div className="sub-panel active" id="sub-cv-basic"><div className="pkg-card" id="card-cv-basic">
        <div className="pkg-head">
          <span className="pkg-name">Paket Basic</span>
        </div>
        <p className="price-old">Rp4.000.000</p>
        <p className="price-new">Rp1.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 2-3 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama CV</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="exc"><span className="dot">–</span> NIB & Akun OSS RBA</li>
    <li className="exc"><span className="dot">–</span> K3L/SPUMKTTR & SPPL</li>
    <li className="exc"><span className="dot">–</span> Sertifikat Standar</li>
    <li className="exc"><span className="dot">–</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="exc"><span className="dot">–</span> Pembukaan Rekening Bank (*)</li>
    <li className="exc"><span className="dot">–</span> Gratis Desain Logo Perusahaan</li>
    <li className="exc"><span className="dot">–</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp50.000</li>
    <li className="exc"><span className="dot">–</span> Dokumen SOP Karyawan</li>
    <li className="exc"><span className="dot">–</span> Dokumen SOP Perusahaan</li>
    <li className="exc"><span className="dot">–</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-cv-complete"><div className="pkg-card" id="card-cv-complete">
        <div className="pkg-head">
          <span className="pkg-name">Paket Complete</span>
        </div>
        <p className="price-old">Rp6.000.000</p>
        <p className="price-new">Rp2.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama CV</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp250.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-cv-express"><div className="pkg-card" id="card-cv-express">
        <div className="pkg-head">
          <span className="pkg-name">Paket Express (Fast Track)</span>
        </div>
        <p className="price-old">Rp9.000.000</p>
        <p className="price-new">Rp4.499.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 1 hari kerja, dokumen lainnya 4 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama CV</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-cv-office"><div className="pkg-card" id="card-cv-office">
        <div className="pkg-head">
          <span className="pkg-name">Paket Office (Recommended)</span>
        </div>
        <p className="price-old">Rp11.300.000</p>
        <p className="price-new">Rp5.649.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Virtual Office 1 Tahun termasuk</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama CV</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="inc"><span className="dot">✓</span> High Speed Internet</li>
    <li className="inc"><span className="dot">✓</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="inc"><span className="dot">✓</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="inc"><span className="dot">✓</span> Akses Meeting Room di 3 Kota</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-cv-prestige"><div className="pkg-card" id="card-cv-prestige">
        <div className="pkg-head">
          <span className="pkg-name">Paket Prestige (Best Value)</span>
        </div>
        <p className="price-old">Rp8.000.000</p>
        <p className="price-new">Rp3.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Virtual Office 1 Tahun termasuk</li>
    <li>Branding Identitas termasuk</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama CV</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="inc"><span className="dot">✓</span> High Speed Internet</li>
    <li className="inc"><span className="dot">✓</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="inc"><span className="dot">✓</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="inc"><span className="dot">✓</span> Akses Meeting Room di 3 Kota</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Company Profile 8 Halaman</li>
    <li className="inc"><span className="dot">✓</span> Desain Kartu Nama</li>
    <li className="inc"><span className="dot">✓</span> Desain Kop Surat</li>
    <li className="inc"><span className="dot">✓</span> Desain Map</li>
    <li className="inc"><span className="dot">✓</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
              </div>
              <div className="foot-notes">(1) Setelah penandatanganan Minuta Akta & tidak terdapat kendala pada sistem AHU.<br />(2) Jika tidak terdapat kendala pada sistem Coretax, Amdalnet & OSS.<br />(3) Berlaku untuk usaha dengan risiko menengah rendah.<br />(4) Bersifat opsional.<br />(5) Persetujuan & pengesahan PKP sepenuhnya berada di bawah kewenangan KPP setempat.<br /></div>
            </div>

            <div className="entity-panel" id="entity-pt">
              <div className="subtab-group">
                <div className="sub-tabs" role="tablist" aria-label="Pilihan paket PT">
                  <button className="sub-tab-btn active" data-sub="pt-basic">Basic</button>
    <button className="sub-tab-btn " data-sub="pt-complete">Complete</button>
    <button className="sub-tab-btn " data-sub="pt-express">Express (Fast Track)</button>
    <button className="sub-tab-btn " data-sub="pt-office">Office (Recommended)</button>
    <button className="sub-tab-btn " data-sub="pt-prestige">Prestige (Best Value)</button>
                </div>
                <div className="sub-panel active" id="sub-pt-basic"><div className="pkg-card" id="card-pt-basic">
        <div className="pkg-head">
          <span className="pkg-name">Paket Basic</span>
        </div>
        <p className="price-old">Rp6.000.000</p>
        <p className="price-new">Rp2.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 2-3 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="exc"><span className="dot">–</span> NIB & Akun OSS RBA</li>
    <li className="exc"><span className="dot">–</span> K3L/SPUMKTTR & SPPL</li>
    <li className="exc"><span className="dot">–</span> Sertifikat Standar</li>
    <li className="exc"><span className="dot">–</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="exc"><span className="dot">–</span> Pembukaan Rekening Bank (*)</li>
    <li className="exc"><span className="dot">–</span> Gratis Desain Logo Perusahaan</li>
    <li className="exc"><span className="dot">–</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp50.000</li>
    <li className="exc"><span className="dot">–</span> Dokumen SOP Karyawan</li>
    <li className="exc"><span className="dot">–</span> Dokumen SOP Perusahaan</li>
    <li className="exc"><span className="dot">–</span> Dokumen Kontrak Bisnis</li>
    <li className="exc"><span className="dot">–</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pt-complete"><div className="pkg-card" id="card-pt-complete">
        <div className="pkg-head">
          <span className="pkg-name">Paket Complete</span>
        </div>
        <p className="price-old">Rp8.000.000</p>
        <p className="price-new">Rp3.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp250.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pt-express"><div className="pkg-card" id="card-pt-express">
        <div className="pkg-head">
          <span className="pkg-name">Paket Express (Fast Track)</span>
        </div>
        <p className="price-old">Rp11.000.000</p>
        <p className="price-new">Rp5.499.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 1 hari kerja, dokumen lainnya 4 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pt-office"><div className="pkg-card" id="card-pt-office">
        <div className="pkg-head">
          <span className="pkg-name">Paket Office (Recommended)</span>
        </div>
        <p className="price-old">Rp13.300.000</p>
        <p className="price-new">Rp6.649.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Virtual Office 1 Tahun termasuk</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="inc"><span className="dot">✓</span> High Speed Internet</li>
    <li className="inc"><span className="dot">✓</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="inc"><span className="dot">✓</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="inc"><span className="dot">✓</span> Akses Meeting Room di 3 Kota</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pt-prestige"><div className="pkg-card" id="card-pt-prestige">
        <div className="pkg-head">
          <span className="pkg-name">Paket Prestige (Best Value)</span>
        </div>
        <p className="price-old">Rp10.000.000</p>
        <p className="price-new">Rp4.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Virtual Office 1 Tahun termasuk</li>
    <li>Branding Identitas termasuk</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="inc"><span className="dot">✓</span> High Speed Internet</li>
    <li className="inc"><span className="dot">✓</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="inc"><span className="dot">✓</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="inc"><span className="dot">✓</span> Akses Meeting Room di 3 Kota</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Company Profile 8 Halaman</li>
    <li className="inc"><span className="dot">✓</span> Desain Kartu Nama</li>
    <li className="inc"><span className="dot">✓</span> Desain Kop Surat</li>
    <li className="inc"><span className="dot">✓</span> Desain Map</li>
    <li className="inc"><span className="dot">✓</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Pendirian PT/CV">Konsultasi Paket Ini →</a>
      </div></div>
              </div>
              <div className="foot-notes">(1) Setelah penandatanganan Minuta Akta & tidak terdapat kendala pada sistem AHU.<br />(2) Jika tidak terdapat kendala pada sistem Coretax, Amdalnet & OSS.<br />(3) Berlaku untuk usaha dengan risiko menengah rendah.<br />(4) Bersifat opsional.<br />(5) Persetujuan & pengesahan PKP sepenuhnya berada di bawah kewenangan KPP setempat.<br /><br />(*) Biaya tambahan berlaku untuk modal dasar lebih dari Rp1 miliar. Modal dasar di atas Rp1 miliar sampai dengan Rp5 miliar dikenakan tambahan biaya Rp1 juta. Modal dasar di atas Rp5 miliar dikenakan tambahan biaya Rp8 juta.</div>
            </div>
          </div>
        </div>

    {/* DAFTAR MEREK */}
        <div className="ppanel" id="panel-merek">
          <div className="left" style={{ gridColumn: '1/-1' }}>
            <div className="subtab-group">
              <div className="sub-tabs" role="tablist" aria-label="Pilihan paket Pendaftaran Merek">
                <button className="sub-tab-btn active" data-sub="merek-spesial">Spesial</button>
                <button className="sub-tab-btn " data-sub="merek-basic">Basic</button>
    <button className="sub-tab-btn " data-sub="merek-basicai">Basic + AI</button>
    <button className="sub-tab-btn " data-sub="merek-premium">Premium</button>
    <button className="sub-tab-btn " data-sub="merek-ultimate">Ultimate</button>
              </div>
              <div className="sub-panel active" id="sub-merek-spesial"><div className="pkg-card" id="card-merek-spesial">
        <div className="pkg-head">
          <span className="pkg-name">Paket Spesial GRATIS NIB</span>
        </div>
        <p className="price-old">Rp1.875.000</p>
        <p className="price-new">Rp1.499.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun*</p>
        <ul className="hi-list">
          <li>Estimasi proses: 1 hari kerja setelah draf pendaftaran merek disetujui</li><li>Berlaku untuk pendaftaran 1 kelas merek</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Yang Diperoleh</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Konsultasi HAKI Merek</li>
    <li className="inc"><span className="dot">✓</span> Rekomendasi pemilihan Kelas Merek</li>
    <li className="inc"><span className="dot">✓</span> Monitoring perubahan Status Merek</li>
    <li className="inc"><span className="dot">✓</span> E-Sertifikat Merek</li>
    <li className="inc"><span className="dot">✓</span> 5x Pemeriksaan Merek Manual</li>
    <li className="inc"><span className="dot">✓</span> NIB &amp; Akun OSS RBA</li>
    <li className="exc"><span className="dot">–</span> 1x Pemeriksaan Merek dengan AI</li>
    <li className="exc"><span className="dot">–</span> Pengajuan Tanggapan atau Keberatan bila terjadi Usulan Penolakan Merek</li>
    <li className="exc"><span className="dot">–</span> Garansi Uang Kembali Jasa Pendaftaran Merek Apabila Merek Ditolak</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp50.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Daftar Merek">Konsultasi Paket Ini →</a>
      </div></div>
              <div className="sub-panel " id="sub-merek-basic"><div className="pkg-card" id="card-merek-basic">
        <div className="pkg-head">
          <span className="pkg-name">Paket Basic</span>
        </div>
        <p className="price-old">Rp1.875.000</p>
        <p className="price-new">Rp1.499.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun*</p>
        <ul className="hi-list">
          <li>Estimasi proses: 1 hari kerja setelah draf pendaftaran merek disetujui</li><li>Berlaku untuk pendaftaran 1 kelas merek</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Yang Diperoleh</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Konsultasi HAKI Merek</li>
    <li className="inc"><span className="dot">✓</span> Rekomendasi pemilihan Kelas Merek</li>
    <li className="inc"><span className="dot">✓</span> Monitoring perubahan Status Merek</li>
    <li className="inc"><span className="dot">✓</span> E-Sertifikat Merek</li>
    <li className="inc"><span className="dot">✓</span> 5x Pemeriksaan Merek Manual</li>
    <li className="exc"><span className="dot">–</span> 1x Pemeriksaan Merek dengan AI</li>
    <li className="exc"><span className="dot">–</span> Pengajuan Tanggapan atau Keberatan bila terjadi Usulan Penolakan Merek</li>
    <li className="exc"><span className="dot">–</span> Garansi Uang Kembali Jasa Pendaftaran Merek Apabila Merek Ditolak</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp50.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Daftar Merek">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-merek-basicai"><div className="pkg-card" id="card-merek-basicai">
        <div className="pkg-head">
          <span className="pkg-name">Paket Basic + AI</span>
        </div>
        <p className="price-old">Rp2.375.000</p>
        <p className="price-new">Rp1.899.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun*</p>
        <ul className="hi-list">
          <li>Estimasi proses: 1 hari kerja setelah draf pendaftaran merek disetujui</li><li>Berlaku untuk pendaftaran 1 kelas merek</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Yang Diperoleh</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Konsultasi HAKI Merek</li>
    <li className="inc"><span className="dot">✓</span> Rekomendasi pemilihan Kelas Merek</li>
    <li className="inc"><span className="dot">✓</span> Monitoring perubahan Status Merek</li>
    <li className="inc"><span className="dot">✓</span> E-Sertifikat Merek</li>
    <li className="inc"><span className="dot">✓</span> 5x Pemeriksaan Merek Manual</li>
    <li className="inc"><span className="dot">✓</span> 1x Pemeriksaan Merek dengan AI</li>
    <li className="exc"><span className="dot">–</span> Pengajuan Tanggapan atau Keberatan bila terjadi Usulan Penolakan Merek</li>
    <li className="exc"><span className="dot">–</span> Garansi Uang Kembali Jasa Pendaftaran Merek Apabila Merek Ditolak</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp50.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Daftar Merek">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-merek-premium"><div className="pkg-card" id="card-merek-premium">
        <div className="pkg-head">
          <span className="pkg-name">Paket Premium</span>
        </div>
        <p className="price-old">Rp3.000.000</p>
        <p className="price-new">Rp2.399.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun*</p>
        <ul className="hi-list">
          <li>Estimasi proses: 1 hari kerja setelah draf pendaftaran merek disetujui</li><li>Berlaku untuk pendaftaran 1 kelas merek</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Yang Diperoleh</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Konsultasi HAKI Merek</li>
    <li className="inc"><span className="dot">✓</span> Rekomendasi pemilihan Kelas Merek</li>
    <li className="inc"><span className="dot">✓</span> Monitoring perubahan Status Merek</li>
    <li className="inc"><span className="dot">✓</span> E-Sertifikat Merek</li>
    <li className="inc"><span className="dot">✓</span> 5x Pemeriksaan Merek Manual</li>
    <li className="inc"><span className="dot">✓</span> 1x Pemeriksaan Merek dengan AI</li>
    <li className="inc"><span className="dot">✓</span> Pengajuan Tanggapan atau Keberatan bila terjadi Usulan Penolakan Merek</li>
    <li className="exc"><span className="dot">–</span> Garansi Uang Kembali Jasa Pendaftaran Merek Apabila Merek Ditolak</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp50.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Daftar Merek">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-merek-ultimate"><div className="pkg-card" id="card-merek-ultimate">
        <div className="pkg-head">
          <span className="pkg-name">Paket Ultimate</span>
        </div>
        <p className="price-old">Rp4.000.000</p>
        <p className="price-new">Rp3.199.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun*</p>
        <ul className="hi-list">
          <li>Estimasi proses: 1 hari kerja setelah draf pendaftaran merek disetujui</li><li>Berlaku untuk pendaftaran 1 kelas merek</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Yang Diperoleh</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Konsultasi HAKI Merek</li>
    <li className="inc"><span className="dot">✓</span> Rekomendasi pemilihan Kelas Merek</li>
    <li className="inc"><span className="dot">✓</span> Monitoring perubahan Status Merek</li>
    <li className="inc"><span className="dot">✓</span> E-Sertifikat Merek</li>
    <li className="inc"><span className="dot">✓</span> 5x Pemeriksaan Merek Manual</li>
    <li className="inc"><span className="dot">✓</span> 1x Pemeriksaan Merek dengan AI</li>
    <li className="inc"><span className="dot">✓</span> Pengajuan Tanggapan atau Keberatan bila terjadi Usulan Penolakan Merek</li>
    <li className="inc"><span className="dot">✓</span> Garansi Uang Kembali Jasa Pendaftaran Merek Apabila Merek Ditolak</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp50.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="Daftar Merek">Konsultasi Paket Ini →</a>
      </div></div>
            </div>
            <div className="foot-notes">(1) Setelah draf pendaftaran merek disetujui.<br />(2) Sertifikat merek diterbitkan setelah merek dinyatakan berhasil pada masa pengumuman, berlangsung sekitar 6 hingga 18 bulan.<br />(3) Apabila permohonan pendaftaran merek ditolak secara resmi oleh DJKI, EasyLegal memberikan garansi uang kembali jasa sebesar Rp2.300.000.<br /><br />(*) Biaya berlaku untuk pendaftaran 1 kelas merek dan memenuhi persyaratan usaha mikro kecil yang ditetapkan DJKI.</div>
          </div>
        </div>

        {/* JASA NIB — 4 varian */}
        <div className="ppanel" id="panel-nib">
          <div className="left">
            <div className="subtab-group">
            <div className="sub-tabs" role="tablist" aria-label="Pilihan jenis NIB">
              <button className="sub-tab-btn active" data-sub="nib-perorangan">NIB Perorangan</button>
              <button className="sub-tab-btn" data-sub="nib-ptperorangan">NIB PT Perorangan</button>
              <button className="sub-tab-btn" data-sub="nib-badan">NIB Badan</button>
              <button className="sub-tab-btn" data-sub="cabut-nib">Cabut NIB</button>
            </div>

            {/* NIB Perorangan */}
            <div className="sub-panel active" id="sub-nib-perorangan">
              <span className="price-badge">Tanpa Tambahan Biaya Apapun</span>
              <p className="price-old">Rp1.000.000</p>
              <p className="price-new">Rp499.000</p>
              <div className="duration-chip">⏱ Estimasi 1–3 hari kerja <sup>(1)</sup></div>
              <ul className="feat-list">
                <li>5 KBLI bidang usaha</li>
                <li>NPWP & SKT Pajak</li>
                <li>Akun Gmail & OSS</li>
                <li>NIB</li>
                <li>Akun OSS RBA</li>
                <li>K3L/SPUMKTTR & SPPL</li>
                <li>Sertifikat Standar <sup>(2)</sup></li>
                <li>Angka Pengenalan Impor <sup>(3)</sup></li>
              </ul>
              <a href="#form" className="btn btn-red" data-service="Jasa NIB">Konsultasi Gratis →</a>
            </div>

            {/* NIB PT Perorangan */}
            <div className="sub-panel" id="sub-nib-ptperorangan">
              <span className="price-badge">Tanpa Tambahan Biaya Apapun</span>
              <p className="price-old">Rp1.000.000</p>
              <p className="price-new">Rp499.000</p>
              <div className="duration-chip">⏱ Estimasi 1–3 hari kerja <sup>(1)</sup></div>
              <ul className="feat-list">
                <li>5 KBLI bidang usaha</li>
                <li>NPWP & SKT Pajak</li>
                <li>Akun Gmail & OSS</li>
                <li>NIB</li>
                <li>Akun OSS RBA</li>
                <li>K3L/SPUMKTTR & SPPL</li>
                <li>Sertifikat Standar <sup>(2)</sup></li>
                <li>Angka Pengenalan Impor <sup>(3)</sup></li>
              </ul>
              <a href="#form" className="btn btn-red" data-service="Jasa NIB">Konsultasi Gratis →</a>
            </div>

            {/* NIB Badan */}
            <div className="sub-panel" id="sub-nib-badan">
              <span className="price-badge">PT, PT PMA, CV, Firma, Yayasan, Perkumpulan & Koperasi</span>
              <p className="price-old">Rp3.000.000</p>
              <p className="price-new">Rp1.499.000</p>
              <div className="duration-chip">⏱ Estimasi 1–3 hari kerja <sup>(1)</sup></div>
              <ul className="feat-list">
                <li>5 KBLI bidang usaha</li>
                <li>NPWP & SKT Pajak</li>
                <li>Akun Gmail & OSS</li>
                <li>NIB</li>
                <li>Akun OSS RBA</li>
                <li>K3L/SPUMKTTR & SPPL</li>
                <li>Sertifikat Standar <sup>(2)</sup></li>
                <li>Angka Pengenalan Impor <sup>(3)</sup></li>
              </ul>
              <a href="#form" className="btn btn-red" data-service="Jasa NIB">Konsultasi Gratis →</a>
            </div>

            {/* Cabut NIB */}
            <div className="sub-panel" id="sub-cabut-nib">
              <span className="price-badge">Tanpa Tambahan Biaya Apapun</span>
              <p className="price-old">Rp2.000.000</p>
              <p className="price-new">Rp999.000</p>
              <div className="duration-chip">⏱ Estimasi 1–3 hari kerja <sup>(1)</sup></div>
              <ul className="feat-list">
                <li>Pencabutan NIB dari OSS</li>
              </ul>
              <a href="#form" className="btn btn-red" data-service="Jasa NIB">Konsultasi Gratis →</a>
            </div>
            </div>

            <div className="foot-notes">
              (1) Estimasi selama tidak ada kendala pada sistem AHU dan OSS.<br />
              (2) Berlaku untuk usaha dengan risiko menengah rendah.<br />
              (3) Bersifat opsional.
            </div>
          </div>
          <div className="right">
            <h4>Bonus</h4>
            <div className="bonus-item"><span className="ic">👤</span> Layanan Personal Legal Assistant</div>
            <div className="bonus-item"><span className="ic">📱</span> 1 Kupon Undian iPhone</div>
            <h4 style={{ marginTop: '16px' }}>Extra Bonus</h4>
            <div className="bonus-item"><span className="ic">💰</span> Voucher EasyLegal <span id="nibVoucherAmount">Rp50.000</span></div>
            <div className="bonus-item"><span className="ic">📄</span> Dokumen SOP Karyawan</div>
            <div className="bonus-item"><span className="ic">📄</span> Dokumen SOP Perusahaan</div>
            <div className="bonus-item"><span className="ic">📄</span> Dokumen Kontrak Bisnis</div>
            <div className="bonus-item"><span className="ic">🔍</span> Cek Merek senilai Rp299.000</div>
            <div className="mini-testi">
              <div className="stars">★★★★★</div>
              <p>"Terima kasih banyak EasyLegal, sangat mempermudah dan membantu dalam pengurusan NIB dan NPWP."</p>
              <footer>Dina Amalia, Klien EasyLegal</footer>
            </div>
          </div>
        </div>


    {/* PT PMA */}
        <div className="ppanel" id="panel-pma">
          <div className="left" style={{ gridColumn: '1/-1' }}>
            <div className="subtab-group">
              <div className="sub-tabs" role="tablist" aria-label="Pilihan paket PT PMA">
                <button className="sub-tab-btn active" data-sub="pma-basic">Basic</button>
    <button className="sub-tab-btn " data-sub="pma-complete">Complete</button>
    <button className="sub-tab-btn " data-sub="pma-office">Office (Best Value)</button>
    <button className="sub-tab-btn " data-sub="pma-prestige">Prestige (Recommended)</button>
              </div>
              <div className="sub-panel active" id="sub-pma-basic"><div className="pkg-card" id="card-pma-basic">
        <div className="pkg-head">
          <span className="pkg-name">Paket Basic</span>
        </div>
        <p className="price-old">Rp18.000.000</p>
        <p className="price-new">Rp8.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 2-3 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="exc"><span className="dot">–</span> NIB & Akun OSS RBA</li>
    <li className="exc"><span className="dot">–</span> K3L/SPUMKTTR & SPPL</li>
    <li className="exc"><span className="dot">–</span> Sertifikat Standar</li>
    <li className="exc"><span className="dot">–</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="exc"><span className="dot">–</span> Pembukaan Rekening Bank (*)</li>
    <li className="exc"><span className="dot">–</span> Gratis Desain Logo Perusahaan</li>
    <li className="exc"><span className="dot">–</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="exc"><span className="dot">–</span> Voucher EasyLegal Rp50.000</li>
    <li className="exc"><span className="dot">–</span> Dokumen SOP Karyawan</li>
    <li className="exc"><span className="dot">–</span> Dokumen SOP Perusahaan</li>
    <li className="exc"><span className="dot">–</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT PMA">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pma-complete"><div className="pkg-card" id="card-pma-complete">
        <div className="pkg-head">
          <span className="pkg-name">Paket Complete</span>
        </div>
        <p className="price-old">Rp26.000.000</p>
        <p className="price-new">Rp12.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Fokus dokumen legalitas inti</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Layanan Virtual Office 1 Tahun</li>
    <li className="exc"><span className="dot">–</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="exc"><span className="dot">–</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="exc"><span className="dot">–</span> Resepsionis Profesional</li>
    <li className="exc"><span className="dot">–</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="exc"><span className="dot">–</span> High Speed Internet</li>
    <li className="exc"><span className="dot">–</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="exc"><span className="dot">–</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="exc"><span className="dot">–</span> Akses Meeting Room di 3 Kota</li>
    <li className="exc"><span className="dot">–</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Pulau Jawa</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 1 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp250.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT PMA">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pma-office"><div className="pkg-card" id="card-pma-office">
        <div className="pkg-head">
          <span className="pkg-name">Paket Office (Best Value)</span>
        </div>
        <p className="price-old">Rp34.000.000</p>
        <p className="price-new">Rp16.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Virtual Office 1 Tahun termasuk</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="inc"><span className="dot">✓</span> High Speed Internet</li>
    <li className="inc"><span className="dot">✓</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="inc"><span className="dot">✓</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="inc"><span className="dot">✓</span> Akses Meeting Room di 3 Kota</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="exc"><span className="dot">–</span> Company Profile 8 Halaman</li>
    <li className="exc"><span className="dot">–</span> Desain Kartu Nama</li>
    <li className="exc"><span className="dot">–</span> Desain Kop Surat</li>
    <li className="exc"><span className="dot">–</span> Desain Map</li>
    <li className="exc"><span className="dot">–</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT PMA">Konsultasi Paket Ini →</a>
      </div></div>
    <div className="sub-panel " id="sub-pma-prestige"><div className="pkg-card" id="card-pma-prestige">
        <div className="pkg-head">
          <span className="pkg-name">Paket Prestige (Recommended)</span>
        </div>
        <p className="price-old">Rp30.000.000</p>
        <p className="price-new">Rp14.999.000</p>
        <p className="price-note">Tanpa tambahan biaya apapun</p>
        <ul className="hi-list">
          <li>Estimasi proses: Dokumen pendirian 2 hari kerja, dokumen lainnya 5-10 hari kerja</li>
    <li>Virtual Office 1 Tahun termasuk</li>
    <li>Branding Identitas termasuk</li>
        </ul>
        <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
        <div className="pkg-detail-full">
          <div className="detail-group">
          <h5>Fasilitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Pengecekan & Pemesanan Nama PT</li>
    <li className="inc"><span className="dot">✓</span> 20 KBLI Bidang Usaha</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Pendirian</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Akta Notaris</li>
    <li className="inc"><span className="dot">✓</span> SK Kemenkumham</li>
          </ul>
        </div><div className="detail-group">
          <h5>Dokumen Lainnya</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> SKT Pajak & NPWP Badan</li>
    <li className="inc"><span className="dot">✓</span> NIB & Akun OSS RBA</li>
    <li className="inc"><span className="dot">✓</span> K3L/SPUMKTTR & SPPL</li>
    <li className="inc"><span className="dot">✓</span> Sertifikat Standar</li>
    <li className="inc"><span className="dot">✓</span> Angka Pengenal Impor</li>
          </ul>
        </div><div className="detail-group">
          <h5>Virtual Office (VO)</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Virtual Office 1 Tahun</li>
    <li className="inc"><span className="dot">✓</span> Alamat Bisnis Komersial & Bergengsi</li>
    <li className="inc"><span className="dot">✓</span> Surat Perjanjian Sewa & Domisili</li>
    <li className="inc"><span className="dot">✓</span> Resepsionis Profesional</li>
    <li className="inc"><span className="dot">✓</span> Mail Handling & Notifikasi Real-Time</li>
    <li className="inc"><span className="dot">✓</span> High Speed Internet</li>
    <li className="inc"><span className="dot">✓</span> Smart TV/Proyektor & Whiteboard</li>
    <li className="inc"><span className="dot">✓</span> Gratis Air Mineral, Kopi & Teh</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Ruang Meeting 6 Jam/Bulan</li>
    <li className="inc"><span className="dot">✓</span> Akses Meeting Room di 3 Kota</li>
    <li className="inc"><span className="dot">✓</span> Penggunaan Virtual Office untuk PKP</li>
          </ul>
        </div><div className="detail-group">
          <h5>Branding Identitas</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Company Profile 8 Halaman</li>
    <li className="inc"><span className="dot">✓</span> Desain Kartu Nama</li>
    <li className="inc"><span className="dot">✓</span> Desain Kop Surat</li>
    <li className="inc"><span className="dot">✓</span> Desain Map</li>
    <li className="inc"><span className="dot">✓</span> 3 Kali Revisi Desain Logo</li>
          </ul>
        </div><div className="detail-group">
          <h5>Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li>
    <li className="inc"><span className="dot">✓</span> 2 Kupon Undian iPhone</li>
    <li className="inc"><span className="dot">✓</span> Pembukaan Rekening Bank (*)</li>
    <li className="inc"><span className="dot">✓</span> Gratis Desain Logo Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Gratis Ongkir Seluruh Indonesia</li>
          </ul>
        </div><div className="detail-group">
          <h5>Extra Bonus</h5>
          <ul className="detail-list">
            <li className="inc"><span className="dot">✓</span> 2 Buah Logam Mulia Emas 24K</li>
    <li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li>
    <li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li>
    <li className="inc"><span className="dot">✓</span> Stempel Perusahaan 1-3 Warna</li>
          </ul>
        </div>
        </div>
        <a href="#form" className="btn btn-red btn-sm" data-service="PT PMA">Konsultasi Paket Ini →</a>
      </div></div>
            </div>
             <div className="foot-notes">(1) Setelah penandatanganan Minuta Akta & tidak terdapat kendala pada sistem AHU.<br />(2) Jika tidak terdapat kendala pada sistem Coretax, Amdalnet & OSS.<br />(3) Apabila seluruh pengurus Direktur & Komisaris merupakan Warga Negara Asing, Direktur atau Kuasa Internal Perusahaan wajib hadir ke KPP setempat.<br />(4) Berlaku untuk usaha dengan risiko menengah rendah.<br />(5) Bersifat opsional.<br />(6) Persetujuan & pengesahan PKP sepenuhnya berada di bawah kewenangan KPP setempat.<br /></div>
           </div>
         </div>

         {/* KITAS */}
         <div className="ppanel" id="panel-kitas">
           <div className="left" style={{ gridColumn: '1/-1' }}>
             <div className="entity-toggle">
               <button className="entity-btn active" data-entity="tka">Kitas TKA</button>
               <button className="entity-btn" data-entity="investor">Kitas Investor</button>
             </div>

             <div className="entity-panel active" id="entity-tka">
               <div className="subtab-group">
                 <div className="sub-tabs" role="tablist" aria-label="Pilihan paket KITAS TKA">
                   <button className="sub-tab-btn active" data-sub="tka-baru">Baru (New)</button>
                   <button className="sub-tab-btn" data-sub="tka-extend">Perpanjangan (Extend)</button>
                 </div>
                 <div className="sub-panel active" id="sub-tka-baru"><div className="pkg-card" id="card-tka-baru">
                   <div className="pkg-head"><span className="pkg-name">Paket Baru (New)</span></div>
                   <p className="price-old">Rp84.300.000</p>
                   <p className="price-new">Rp42.149.000</p>
                   <p className="price-note">Tanpa tambahan biaya apapun</p>
                   <ul className="hi-list"><li>Estimasi proses: 3-6 hari kerja</li><li>Pengurusan Visa &amp; KITAS TKA</li></ul>
                   <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
                   <div className="pkg-detail-full">
                     <div className="detail-group"><h5>Yang Diperoleh</h5><ul className="detail-list">
                       <li className="inc"><span className="dot">✓</span> Persetujuan Pemeriksaan BAP Hasil Penilaian Kelayakan</li>
                       <li className="inc"><span className="dot">✓</span> Persetujuan RPTKA</li>
                       <li className="inc"><span className="dot">✓</span> Persetujuan Notifikasi TKA / IMTA</li>
                       <li className="inc"><span className="dot">✓</span> Visa Elektronik TKA (e-Visa)</li>
                       <li className="inc"><span className="dot">✓</span> KITAS &amp; MERP TKA 1 Tahun</li>
                       <li className="inc"><span className="dot">✓</span> Surat Keterangan Tempat Tinggal</li>
                       <li className="inc"><span className="dot">✓</span> Surat TKKOA</li>
                       <li className="inc"><span className="dot">✓</span> DPKK Kemenaker USD 1.200/orang</li>
                       <li className="inc"><span className="dot">✓</span> PNBP KITAS &amp; MERP TKA 1 Tahun</li>
                     </ul></div>
                     <div className="detail-group"><h5>Bonus</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li><li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li></ul></div>
                     <div className="detail-group"><h5>Extra Bonus</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp500.000</li><li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li><li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li><li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li></ul></div>
                   </div>
                   <a href="#form" className="btn btn-red btn-sm" data-service="KITAS">Konsultasi Paket Ini →</a>
                 </div></div>
                 <div className="sub-panel" id="sub-tka-extend"><div className="pkg-card" id="card-tka-extend">
                   <div className="pkg-head"><span className="pkg-name">Paket Perpanjangan (Extend)</span></div>
                   <p className="price-old">Rp78.000.000</p>
                   <p className="price-new">Rp38.999.000</p>
                   <p className="price-note">Tanpa tambahan biaya apapun</p>
                   <ul className="hi-list"><li>Estimasi proses: 3-6 hari kerja</li><li>Perpanjangan Visa &amp; KITAS TKA</li></ul>
                   <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
                   <div className="pkg-detail-full">
                     <div className="detail-group"><h5>Yang Diperoleh</h5><ul className="detail-list">
                       <li className="inc"><span className="dot">✓</span> Persetujuan Pemeriksaan BAP Hasil Penilaian Kelayakan</li><li className="inc"><span className="dot">✓</span> Persetujuan RPTKA</li><li className="inc"><span className="dot">✓</span> Persetujuan Notifikasi TKA / IMTA</li><li className="inc"><span className="dot">✓</span> Visa Elektronik TKA (e-Visa)</li><li className="inc"><span className="dot">✓</span> Perpanjangan KITAS &amp; MERP TKA 1 Tahun</li><li className="inc"><span className="dot">✓</span> Surat Keterangan Tempat Tinggal</li><li className="inc"><span className="dot">✓</span> DPKK Kemenaker USD 1.200/orang</li><li className="inc"><span className="dot">✓</span> PNBP KITAS &amp; MERP TKA 1 Tahun</li>
                     </ul></div>
                     <div className="detail-group"><h5>Bonus</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li><li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li></ul></div>
                     <div className="detail-group"><h5>Extra Bonus</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp250.000</li><li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li><li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li><li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li></ul></div>
                   </div>
                   <a href="#form" className="btn btn-red btn-sm" data-service="KITAS">Konsultasi Paket Ini →</a>
                 </div></div>
               </div>
             </div>

             <div className="entity-panel" id="entity-investor">
               <div className="subtab-group">
                 <div className="sub-tabs" role="tablist" aria-label="Pilihan paket KITAS Investor">
                   <button className="sub-tab-btn active" data-sub="inv-1th">1 Tahun</button>
                   <button className="sub-tab-btn" data-sub="inv-2th">2 Tahun</button>
                 </div>
                 <div className="sub-panel active" id="sub-inv-1th"><div className="pkg-card" id="card-inv-1th">
                   <div className="pkg-head"><span className="pkg-name">Paket Investor 1 Tahun</span></div>
                   <p className="price-old">Rp28.000.000</p><p className="price-new">Rp13.999.000</p><p className="price-note">Tanpa tambahan biaya apapun</p>
                   <ul className="hi-list"><li>Estimasi proses: 7-10 hari kerja</li><li>Pengurusan Visa &amp; KITAS Investor 1 Tahun</li></ul>
                   <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
                   <div className="pkg-detail-full"><div className="detail-group"><h5>Yang Diperoleh</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> KITAS &amp; MERP Investor 1 Tahun</li><li className="inc"><span className="dot">✓</span> Visa Elektronik Investor (e-Visa)</li><li className="inc"><span className="dot">✓</span> PNBP KITAS &amp; MERP Investor Rp7.000.000</li></ul></div><div className="detail-group"><h5>Bonus</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li><li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li></ul></div><div className="detail-group"><h5>Extra Bonus</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp250.000</li><li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li><li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li><li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li></ul></div></div>
                   <a href="#form" className="btn btn-red btn-sm" data-service="KITAS">Konsultasi Paket Ini →</a>
                 </div></div>
                 <div className="sub-panel" id="sub-inv-2th"><div className="pkg-card" id="card-inv-2th">
                   <div className="pkg-head"><span className="pkg-name">Paket Investor 2 Tahun</span></div>
                   <p className="price-old">Rp34.000.000</p><p className="price-new">Rp17.999.000</p><p className="price-note">Tanpa tambahan biaya apapun</p>
                   <ul className="hi-list"><li>Estimasi proses: 7-10 hari kerja</li><li>Pengurusan Visa &amp; KITAS Investor 2 Tahun</li></ul>
                   <button className="detail-toggle" type="button">Lihat Detail Lengkap <span className="dt-icon">▾</span></button>
                   <div className="pkg-detail-full"><div className="detail-group"><h5>Yang Diperoleh</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> KITAS &amp; MERP Investor 2 Tahun</li><li className="inc"><span className="dot">✓</span> Visa Elektronik Investor (e-Visa)</li><li className="inc"><span className="dot">✓</span> PNBP KITAS &amp; MERP Investor Rp9.500.000</li></ul></div><div className="detail-group"><h5>Bonus</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> Layanan Personal Legal Assistant</li><li className="inc"><span className="dot">✓</span> 1 Kupon Undian iPhone</li></ul></div><div className="detail-group"><h5>Extra Bonus</h5><ul className="detail-list"><li className="inc"><span className="dot">✓</span> Voucher EasyLegal Rp250.000</li><li className="inc"><span className="dot">✓</span> Dokumen SOP Karyawan</li><li className="inc"><span className="dot">✓</span> Dokumen SOP Perusahaan</li><li className="inc"><span className="dot">✓</span> Dokumen Kontrak Bisnis</li></ul></div></div>
                   <a href="#form" className="btn btn-red btn-sm" data-service="KITAS">Konsultasi Paket Ini →</a>
                 </div></div>
               </div>
             </div>

             <div className="foot-notes">(1) Harga sudah termasuk biaya negara (PNBP) sebagaimana tercantum pada detail paket.<br />(2) Estimasi proses dapat berubah sesuai kelengkapan dokumen dan kebijakan instansi terkait.</div>
           </div>
         </div>

         {/* SEMUA LAYANAN — urutan paling akhir */}
         <div className="ppanel" id="panel-lainnya">
          <div className="left">
            <span className="price-badge">Belum Yakin Butuh Layanan yang Mana?</span>
            <p className="price-new">Chat For Price</p>
            <div className="duration-chip">⏱ Estimasi waktu bervariasi sesuai jenis layanan (S&K berlaku)</div>
            <ul className="feat-list">
              <li><b>Pendirian Badan Usaha</b> — PT Perseroan, PT Perorangan, PT PMA, CV, Firma, Yayasan, Koperasi, Perkumpulan</li>
              <li><b>Perizinan & Kepatuhan</b> — NIB, KBLI, PSE, Halal, ISO, PKP, LKPM, AHU & OSS, PKKPR, Surat Tanggapan Usulan Penolakan</li>
              <li><b>Merek & Kekayaan Intelektual</b> — Pendaftaran Merek, Pembuatan Logo</li>
              <li><b>Perpajakan</b> — NPWP, SPT, Konsultasi Pajak</li>
              <li><b>Administrasi Lanjutan</b> — Perubahan Data, Akta, Notaris, Penutupan Perusahaan, Akuisisi, Pisah Harta</li>
              <li><b>Layanan Pendukung Bisnis</b> — Virtual Office, Press Release, KITAS</li>
            </ul>
            <a href="#form" className="btn btn-red" data-service="Belum yakin, mau konsultasi dulu">Konsultasi Gratis →</a>
          </div>
          <div className="right">
            <h4>Belum Yakin Butuh Layanan Apa?</h4>
            <div className="bonus-item"><span className="ic">💬</span> Konsultasikan dulu, gratis dan tanpa kewajiban</div>
            <div className="bonus-item"><span className="ic">👤</span> PLA bantu arahkan layanan yang paling sesuai</div>
            <div className="bonus-item"><span className="ic">🏛️</span> Dikerjakan Sarjana Hukum berpengalaman</div>
            <div className="mini-testi">
              <div className="stars">★★★★★</div>
              <p>"Sangat merekomendasikan bagi pelaku usaha agar kepengurusan izin usahanya dibantu EasyLegal."</p>
              <footer>Nias Selatan Channel, Klien EasyLegal</footer>
            </div>
          </div>
        </div>

        <div style={{ background: '#121a2f', borderRadius: '12px', padding: '32px 24px', textAlign: 'center', color: '#fff', maxWidth: '600px', margin: '40px auto 0' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', display: 'inline-block', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
            <span style={{ color: '#fcd53f', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.05em' }}>⚠️ SLOT HARI INI HAMPIR PENUH</span>
          </div>
          <div style={{ background: '#2a3449', height: '6px', borderRadius: '3px', marginBottom: '12px', overflow: 'hidden' }}>
            <div className="progress-bar-fill" style={{ width: '82%', height: '100%', borderRadius: '3px' }}></div>
          </div>
          <div style={{ fontSize: '12px', color: '#a0aabf', marginBottom: '24px' }}>
            82% slot sudah terisi — <span style={{ color: '#fff', fontWeight: 'bold' }}>tersisa 2 slot hari ini</span>
          </div>
          <a href="#form" style={{ display: 'inline-block', background: '#fcd53f', color: '#121a2f', fontWeight: 'bold', fontSize: '14px', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none' }}>Konsultasi Gratis Sekarang →</a>
        </div>
      </div>
    </section>

    <section id="faq-section">
      <div className="wrap">
        <div className="section-head">
          <span className="section-tag">Pertanyaan Umum</span>
          <h2>Pertanyaan yang Sering Ditanyakan</h2>
        </div>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div className="faq-item">
            <button className="faq-q">NIB saya valid, kenapa izin usaha malah ditolak? <span className="icon">+</span></button>
            <div className="faq-a"><p>Karena OSS sudah beralih ke KBLI 2025 dan kode KBLI lama tidak otomatis ter-convert. Kalau kode KBLI di NIB kamu belum disesuaikan ke standar baru, sistem OSS akan menolak proses perizinan turunan (izin lokasi, izin edar, dll) meski status NIB tetap "Valid". EasyLegal bantu cek dan sinkronkan kode KBLI kamu ke standar 2025 supaya proses izin lanjutan gak ketahan.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-q">Berapa lama proses tiap layanan? <span className="icon">+</span></button>
            <div className="faq-a"><p>Bervariasi tergantung layanan. PT Perorangan estimasi 12 jam kerja, Pendirian PT/CV dan Jasa NIB estimasi 1 sampai 6 hari kerja, PT PMA estimasi 7 sampai 14 hari kerja, dan pendaftaran Merek mengikuti jadwal verifikasi DJKI. Syarat dan ketentuan berlaku, estimasi waktu dapat bervariasi tergantung kondisi sistem Kementerian Hukum dan OSS.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-q">Apa saja yang perlu disiapkan? <span className="icon">+</span></button>
            <div className="faq-a"><p>Cukup data dasar seperti KTP, NPWP, alamat usaha, dan detail kegiatan usaha. Personal Legal Assistant akan memandu tahap demi tahap melalui WhatsApp.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-q">Apakah biaya yang tertera sudah final? <span className="icon">+</span></button>
            <div className="faq-a"><p>Biaya yang tertera sudah all-in sesuai kondisi standar. Jika ada kebutuhan tambahan di luar standar, akan dikonfirmasi secara transparan sebelum proses dimulai, tanpa biaya tersembunyi.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-q">Apakah pendaftaran merek dijamin langsung terdaftar? <span className="icon">+</span></button>
            <div className="faq-a"><p>EasyLegal membantu proses pengajuan permohonan merek ke DJKI, mulai dari pengecekan ketersediaan hingga penyusunan berkas. Keputusan pendaftaran merek sepenuhnya berada pada kewenangan DJKI sesuai proses hukum yang berlaku.</p></div>
          </div>
          <div className="faq-item">
            <button className="faq-q">Belum yakin butuh layanan yang mana, bagaimana? <span className="icon">+</span></button>
            <div className="faq-a"><p>Tidak masalah. Isi formulir konsultasi dan pilih Semua Layanan, Personal Legal Assistant akan membantu mengarahkan layanan yang paling sesuai dengan kebutuhan bisnis, konsultasi awal tidak dikenakan biaya.</p></div>
          </div>
        </div>
      </div>
    </section>


    <section id="final-cta-section">
      <div className="wrap">
        <div className="final-cta-card">
          <h2 style={{ fontSize: '28px', lineHeight: '1.3', marginBottom: '24px' }}>Legalitas Usaha Belum Beres?<br /><span style={{ color: 'var(--red)' }}>Urus Sekarang Sebelum Operasional Terhambat</span></h2>
          <p style={{ fontSize: '15px', marginBottom: '12px' }}>Waktu selalu <b>lebih berharga dari uang</b>. Yang terlewat tidak bisa diulang.</p>
          <p style={{ fontSize: '15px', marginBottom: '12px' }}>Ngapain buang waktu mengurus sendiri, risiko salah dokumen, bolak-balik notaris, dan harus mengulang dari awal?</p>
          <p style={{ fontSize: '15px', marginBottom: '12px' }}>EasyLegal yang mengurus semuanya, <b>kamu tetap fokus menjalankan bisnis</b>.</p>
          <p style={{ fontSize: '15px', marginBottom: '12px' }}>Setiap hari legalitas belum diurus, keraguan mitra, bank, dan investor akan selalu menghantui sampai ini beres.</p>
          <div style={{ marginTop: '32px' }}>
            <a href="#form" className="btn btn-red">Konsultasi Sekarang →</a>
          </div>
        </div>
      </div>
    </section>

    <footer className="site-footer">
      <div className="wrap">
        EasyLegal, bagian dari ekosistem EasyCorp. Terdaftar PSE Kominfo, tersertifikasi ISO 9001 dan ISO 27001. Proses legalitas mengikuti kondisi sistem Kementerian Hukum dan OSS.
      </div>
    </footer>




      </div>

  );
}
