"use client";

import React, { useEffect } from "react";
import "./spt-landing.css";

export default function SptLandingClient() {
  useEffect(() => {
    // Tracking klik WhatsApp -> dataLayer (GTM). Semua CTA memakai atribut data-cta.
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as Element)?.closest?.("[data-cta]");
      if (!a) return;
      const w = window as any;
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: "wa_click",
        cta_id: a.getAttribute("data-cta"),
        product: "/layanan-spt-pajak-gads",
        cs: "easytax",
      });
    };

    document.addEventListener("click", handleClick, { passive: true });
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="landing-spt-scope">
{/* ============ ICON SPRITE ============ */}
<svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
  <defs>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="i-chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
    <symbol id="i-receipt" viewBox="0 0 24 24"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/></symbol>
    <symbol id="i-badge" viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></symbol>
    <symbol id="i-wa" viewBox="0 0 24 24"><path d="M3 21l1.6-4.9A8.5 8.5 0 1 1 8 19.6L3 21Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.3-1.8-1-.9.6c-.9-.4-1.7-1.2-2.1-2.1l.6-.9-1-1.8L9 9.5Z"/></symbol>
    <symbol id="i-doc" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></symbol>
    <symbol id="i-building" viewBox="0 0 24 24"><path d="M4 21V5l8-2v18M12 8h8v13M4 21h16M8 9h.01M8 13h.01M8 17h.01M16 12h.01M16 16h.01"/></symbol>
    <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 11 12 3l9 8M5 10v10h14V10"/></symbol>
    <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></symbol>
  </defs>
</svg>

{/* ============ HEADER (shell EasyLegal) ============ */}
<header className="header">
  <div className="container">
    <div className="lockup">
      <a href="https://easylegal.id/home-gads" className="logo" aria-label="EasyLegal">
        <span className="logo-mark">EL</span>
        <span>easylegal<small>It's Easy to be Legal</small></span>
      </a>
      <span className="sep"></span>
      <a className="with" href="#top" aria-label="Kolaborasi dengan EasyTax"><span>kolaborasi dengan</span><b><span className="mini-et"><i className="e">E</i><i className="j">J</i></span>easytax</b></a>
    </div>
    <nav className="nav" aria-label="Utama">
      <a href="https://easylegal.id/home-gads">Home</a>
      <a href="https://easylegal.id/layanan/pendirian-badan-usaha">Layanan</a>
      <a href="https://easylegal.id/artikel">Artikel</a>
      <a href="https://easylegal.id/testimoni">Testimoni</a>
      <a href="https://easylegal.id/tentang-kami">Tentang Kami</a>
      <a href="https://easylegal.id/kontak">Kontak</a>
    </nav>
    <a className="btn btn-primary hdr-cta" data-cta="header-consult" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Lapor%20SPT%20Tahunan.">Konsultasi Gratis</a>
  </div>
</header>

<main id="top">

{/* ============ HERO ============ */}
<div className="container crumb">
  <a href="https://easylegal.id/">Beranda</a><span>›</span>Layanan<span>›</span><b>Lapor SPT Tahunan</b>
</div>

<section className="hero">
  <div className="container hero-grid">
    <div>
      <span className="eyebrow">Pajak Perusahaan · SPT Tahunan</span>
      <h1>Jasa Laporan SPT Pajak Tahunan <em>Badan Usaha &amp; Pribadi</em></h1>
      <p className="lead"><b>EasyTax</b> siap membantu Anda dalam penyusunan, perhitungan, dan pelaporan SPT, memastikan seluruh kewajiban pajak Anda terpenuhi dengan tepat waktu dan sesuai ketentuan. Dari konsultasi hingga pengisian SPT, kami hadir untuk memudahkan proses pajak Anda. <b>Mulai Rp 499.000.</b></p>
      <div className="hero-cta">
        <a className="btn btn-primary" data-cta="hero-consult" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20konsultasi%20mengenai%20layanan%20Lapor%20SPT%20Tahunan.">Konsultasi Gratis <svg className="icon"><use href="#i-arrow"/></svg></a>
        <a className="btn btn-outline" href="#biaya-spt">Lihat Biaya Lapor SPT</a>
      </div>
      <div className="hero-stats">
        <div><strong>Rp499rb</strong><span>Biaya mulai dari</span></div>
        <div><strong>1x</strong><span>Revisi SPT gratis<br />dalam setahun</span></div>
        <div><strong>Online</strong><span>Tanpa antre,<br />seluruh Indonesia</span></div>
      </div>
    </div>

    <div className="hero-visual">
      <div className="hero-img hero-img-et" role="img" aria-label="Ilustrasi laporan SPT Tahunan">
        <div className="doc">
          <h4>SPT TAHUNAN</h4>
          <p>PPh Badan / Orang Pribadi</p>
          <div className="line"></div><div className="line"></div><div className="line s"></div>
          <span className="stamp">SPT TERKIRIM</span>
        </div>
      </div>
      <div className="float b">
        <div className="ic"><svg className="icon"><use href="#i-badge"/></svg></div>
        <div><strong>Submit SPT</strong><span className="sub">PPh Badan/Pribadi</span></div>
      </div>
      <div className="float a">
        <div className="ic"><svg className="icon"><use href="#i-receipt"/></svg></div>
        <div><strong>Kode Billing</strong><span className="sub">Untuk status kurang bayar</span></div>
      </div>
    </div>
  </div>
</section>

{/* ============ TENTANG SPT ============ */}
<section className="block">
  <div className="container">
    <div className="sec-head">
      <span className="kicker">Laporan SPT Tahunan</span>
      <h2>Urus kewajiban pajak tanpa keluar rumah atau repot mengantre.</h2>
      <p>Dengan layanan EasyTax bersama EasyLegal bagian dari EasyCorp, Anda dapat mengurus seluruh kewajiban pajak tanpa perlu keluar rumah atau repot mengantre. Prosesnya mudah, aman, dan efisien, sehingga Anda dapat menghemat waktu dan fokus pada hal-hal penting lainnya.</p>
    </div>
    <p className="about-lead"><b>Laporan SPT Tahunan</b> adalah dokumen yang menunjukkan kepatuhan pajak dalam satu tahun.</p>
    <div className="grid-4 g3">
      <div className="card"><div className="ico"><svg className="icon"><use href="#i-building"/></svg></div><h3>SPT Badan Usaha</h3><p>Mencerminkan aktivitas keuangan dan kewajiban pajak badan usaha, memastikan transparansi bagi pihak terkait.</p></div>
      <div className="card"><div className="ico"><svg className="icon"><use href="#i-doc"/></svg></div><h3>SPT Orang Pribadi</h3><p>Berfokus pada pelaporan penghasilan individu.</p></div>
      <div className="card"><div className="ico"><svg className="icon"><use href="#i-badge"/></svg></div><h3>Patuh &amp; Akuntabel</h3><p>Keduanya bertujuan memenuhi kewajiban perpajakan sesuai aturan, menjamin akuntabilitas dan kepatuhan kepada negara.</p></div>
    </div>
  </div>
</section>

{/* ============ BANNER ============ */}
<section className="block banner-sec">
  <div className="container">
    <img className="banner-img" src="/layanan-spt-pajak-gads/banner-indonesia.webp" alt="EasyTax — Melayani Seluruh Indonesia" width={1024} height={315} loading="lazy" />
    <div className="cta-center"><a className="btn btn-primary btn-upper" data-cta="banner-consult" href="https://mauorder.online/easytaxwebsite">Konsultasi Gratis</a></div>
  </div>
</section>

{/* ============ BIAYA ============ */}
<section className="block alt" id="biaya-spt">
  <div className="container">
    <div className="sec-head">
      <span className="kicker">Biaya jasa lapor SPT tahunan</span>
      <h2>Biaya Laporan Jasa Lapor SPT Tahunan <em>Badan Usaha &amp; Pribadi</em></h2>
      <p>Pilih sesuai omzet per tahun Anda. Omzet di atas Rp 4,8 M dapat dinegosiasikan.</p>
    </div>

    <div className="price-box">
      <table className="price">
        <thead><tr><th>Omzet per Tahun</th><th>Badan</th><th>Pribadi</th></tr></thead>
        <tbody>
          <tr><td>0 / tidak beroperasi</td><td>Rp499.000</td><td>Rp449.000</td></tr>
          <tr><td>Rp 0 - 600 Jt</td><td>Rp1.499.000</td><td>Rp1.349.000</td></tr>
          <tr><td>Rp 600 Jt - 1,2 M</td><td>Rp1.999.000</td><td>Rp1.799.000</td></tr>
          <tr><td>Rp 1,2 M - 2,4 M</td><td>Rp2.499.000</td><td>Rp2.249.000</td></tr>
          <tr><td>Rp 2,4 M - 3,6 M</td><td>Rp2.999.000</td><td>Rp2.699.000</td></tr>
          <tr><td>Rp 3,6 M - 4,8 M</td><td>Rp3.499.000</td><td>Rp3.149.000</td></tr>
          <tr><td>&gt; 4,8 M</td><td>Negotiable</td><td>Negotiable</td></tr>
        </tbody>
      </table>
      <div className="price-feat">
        <h4>Fitur Layanan:</h4>
        <ul>
          <li><span className="chk"><svg className="icon"><use href="#i-check"/></svg></span>Penyusunan Laporan Laba Rugi dan Neraca <sup>(1)</sup></li>
          <li><span className="chk"><svg className="icon"><use href="#i-check"/></svg></span>Penyusunan Draft SPT Tahunan PPh Badan/Pribadi</li>
          <li><span className="chk"><svg className="icon"><use href="#i-check"/></svg></span>Pembuatan Kode Billing PPh Tahunan (untuk status kurang bayar)</li>
          <li><span className="chk"><svg className="icon"><use href="#i-check"/></svg></span>Untuk status kurang bayar</li>
          <li><span className="chk"><svg className="icon"><use href="#i-check"/></svg></span>Submit SPT Tahunan PPh Badan/Pribadi</li>
          <li><span className="chk"><svg className="icon"><use href="#i-check"/></svg></span>[GRATIS] Revisi SPT Tahunan PPh, 1 kali dalam setahun</li>
        </ul>
      </div>
    </div>
    <div className="cta-center"><a className="btn btn-primary" data-cta="price-consult" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20tertarik%20dengan%20jasa%20Lapor%20SPT%20Tahunan.%20Mohon%20info%20biaya%20sesuai%20omzet%20dan%20prosesnya."><svg className="icon"><use href="#i-wa"/></svg> Konsultasi Gratis via WhatsApp</a></div>
    <p className="price-note">Konsultasi dan pemesanan layanan pajak dilayani langsung oleh Customer Care EasyTax.</p>
  </div>
</section>

{/* ============ LAYANAN LAIN ============ */}
<section className="block">
  <div className="container">
    <div className="sec-head">
      <span className="kicker">Layanan perpajakan EasyTax</span>
      <h2>Layanan Kami Lainnya</h2>
      <p>Selain lapor SPT Tahunan, tim EasyTax juga membantu kebutuhan perpajakan dan pelaporan keuangan lainnya.</p>
    </div>
    <div className="svc-grid">
      <a className="svc" data-cta="svc-pengurusan-npwp-badan-usaha" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Pengurusan%20NPWP%20Badan%20Usaha."><div className="t">Pengurusan NPWP Badan Usaha<small><i></i>Kartu NPWP Elektronik</small></div><div className="p">Rp 499.000</div></a>
      <a className="svc" data-cta="svc-pengurusan-npwp-orang-pribadi" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Pengurusan%20NPWP%20Orang%20Pribadi."><div className="t">Pengurusan NPWP Orang Pribadi<small><i></i>Kartu NPWP Elektronik</small></div><div className="p">Rp 349.000</div></a>
      <a className="svc" data-cta="svc-pendaftaran-pengukuhan-pkp" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Pendaftaran%20%26%20Pengukuhan%20PKP."><div className="t">Pendaftaran &amp; Pengukuhan PKP<small><i></i>SK PKP dari Kantor Pelayanan pajak</small><small><i></i>Sertifikat Elektronik</small></div><div className="p">Rp 1.499.000 - Rp 2.249.000</div></a>
      <a className="svc" data-cta="svc-jasa-pengurusan-efin-badan" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Jasa%20Pengurusan%20EFIN%20Badan."><div className="t">Jasa Pengurusan EFIN Badan</div><div className="p">Rp 250.000</div></a>
      <a className="svc" data-cta="svc-laporan-keuangan-dari-kantor-akuntan-publik" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Laporan%20Keuangan%20dari%20Kantor%20Akuntan%20Publik."><div className="t">Laporan Keuangan dari Kantor Akuntan Publik</div><div className="p">Call For Price</div></a>
      <a className="svc" data-cta="svc-laporan-keuangan-kompilasi" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Laporan%20Keuangan%20Kompilasi."><div className="t">Laporan Keuangan Kompilasi</div><div className="p">Call For Price</div></a>
      <a className="svc" data-cta="svc-tax-opinion-untuk-investor-asing" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Tax%20Opinion%20untuk%20Investor%20Asing."><div className="t">Tax Opinion untuk Investor Asing</div><div className="p">Call For Price</div></a>
      <a className="svc" data-cta="svc-transfer-pricing-documentation" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Transfer%20Pricing%20Documentation."><div className="t">Transfer Pricing Documentation</div><div className="p">Call For Price</div></a>
      <a className="svc" data-cta="svc-keberatan-ke-kanwil-djp" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Keberatan%20ke%20Kanwil%20DJP."><div className="t">Keberatan ke Kanwil DJP</div><div className="p">Call For Price</div></a>
    </div>
    <div className="svc-grid two">
      <a className="svc" data-cta="svc-banding-gugatan-ke-pengadilan-pajak" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20Banding%20%26%20Gugatan%20ke%20Pengadilan%20Pajak."><div className="t">Banding &amp; Gugatan ke Pengadilan Pajak</div><div className="p">Call For Price</div></a>
      <a className="svc" data-cta="svc-pk-ke-mahkamah-agung" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20tanya%20layanan%20PK%20ke%20Mahkamah%20Agung."><div className="t">PK ke Mahkamah Agung</div><div className="p">Call For Price</div></a>
    </div>
  </div>
</section>

{/* ============ KLIEN & MEDIA ============ */}
<section className="block alt partners">
  <div className="container">
    <h2 className="h-up">LIHAT LIPUTAN MEDIA TENTANG EASYTAX</h2>
    <div className="media-logos">
      <div className="we"><span>Warta Ekonomi</span><span>.co.id</span></div>
      <div className="jpnn">jpnn<small>.com</small></div>
      <div className="sindo">SINDONEWS.com</div>
    </div>
    <h2 className="h-up h-clients">KLIEN KAMI</h2>
    <div className="marquee" aria-label="Klien">
      <div className="track" style={{ animationDuration: "38s" }}>
        <div className="wordmark" style={{ color: "#1d7ad8" }}>ARAVA TOUR</div>
        <div className="wordmark" style={{ color: "#8a1c46", fontStyle: "italic", fontFamily: "Georgia,serif" }}>Bee Skin</div>
        <div className="wordmark" style={{ color: "#111" }}><span className="dot-c">C</span>&nbsp;CALUME</div>
        <div className="wordmark" style={{ color: "#7a3b12" }}>DAGINGSUPER</div>
        <div className="wordmark" style={{ color: "#c99a1c" }}>DEWA RACKINDO</div>
        <div className="wordmark" style={{ color: "#d8232a" }}>GMK<span style={{ color: "#17205f" }}>DOOR</span></div>
        <div className="wordmark" style={{ color: "#1d7ad8" }}>ARAVA TOUR</div>
        <div className="wordmark" style={{ color: "#8a1c46", fontStyle: "italic", fontFamily: "Georgia,serif" }}>Bee Skin</div>
        <div className="wordmark" style={{ color: "#111" }}><span className="dot-c">C</span>&nbsp;CALUME</div>
        <div className="wordmark" style={{ color: "#7a3b12" }}>DAGINGSUPER</div>
        <div className="wordmark" style={{ color: "#c99a1c" }}>DEWA RACKINDO</div>
        <div className="wordmark" style={{ color: "#d8232a" }}>GMK<span style={{ color: "#17205f" }}>DOOR</span></div>
      </div>
    </div>
  </div>
</section>

{/* ============ TESTIMONI ============ */}
<section className="block">
  <div className="container">
    <div className="sec-head">
      <span className="kicker">Testimoni klien</span>
      <h2>Kata mereka yang sudah memakai layanan kami.</h2>
      <p>Ulasan asli klien di Google.</p>
    </div>
    <div className="rv-grid">
      <div className="rv">
        <div className="top"><div className="av" style={{ background: "#7b52c9" }}>W</div><div className="nm">Widi tosan aji<small>10 ulasan</small></div><span className="gl">G</span></div>
        <div className="stars">★★★★★ <em>2 bulan lalu</em></div>
        <p>Pelayanan cepat &amp; ramah serta harga murah<br />Recomended👍👍👍👍👍</p>
      </div>
      <div className="rv">
        <div className="top"><div className="av" style={{ background: "#f29a2e" }}>F</div><div className="nm">Fadel Dzahabi<small>1 ulasan</small></div><span className="gl">G</span></div>
        <div className="stars">★★★★★ <em>2 bulan lalu</em></div>
        <p>Mantaaaap banget hasilnya, sesuai ekspektasi, walaupun sistem di AHU bener-bener makan tenaga, tapi semua masih jalan sesuai rencana. Terim…</p>
      </div>
      <div className="rv">
        <div className="top"><div className="av" style={{ background: "#8a8f9e" }}>M</div><div className="nm">MIS KARYA PEMBANGUNAN PURUK CAHU<small>1 ulasan</small></div><span className="gl">G</span></div>
        <div className="stars">★★★★★ <em>2 bulan lalu</em></div>
        <p>Pelayanan sangat baik, ramah dan prosesnya cepat, sangat memuaskan.<br />Terima kasih easy legal</p>
      </div>
      <div className="rv">
        <div className="top"><div className="av" style={{ background: "#e63f7a" }}>N</div><div className="nm">Nurisaroh Nurisaroh<small>1 ulasan</small></div><span className="gl">G</span></div>
        <div className="stars">★★★★★ <em>sebulan lalu</em></div>
        <p>Bagi rekan-rekan pelaku usaha yang kebingungan untuk mengurus legalitas usahanya langsung saja klik easy legal&nbsp; Saya sudah membuktikan di easy legal l…</p>
      </div>
      <div className="rv">
        <div className="top"><div className="av" style={{ background: "#3d7a3a" }}>N</div><div className="nm">Nof Fri<small>1 ulasan</small></div><span className="gl">G</span></div>
        <div className="stars">★★★★★ <span className="new">4 jam lalu</span></div>
        <p>PT Usaha Solusi Bangsa merupakan lembaga yg sangat membantu masyarakat dalam kepengurusan legalitas sebuah lembaga baru dengan biaya yang san…</p>
      </div>
      <div className="rv">
        <div className="top"><div className="av" style={{ background: "#2a2a33" }}>N</div><div className="nm">Nidia Ayu<small>1 ulasan</small></div><span className="gl">G</span></div>
        <div className="stars">★★★★★ <em>3 bulan lalu</em></div>
        <p>Proses cepat, tetap dilayani meskipun hari libur. Mantap easylegal 👌🏼<br />Terimakasih sudah…</p>
      </div>
    </div>
  </div>
</section>

{/* ============ KANTOR ============ */}
<section className="block alt">
  <div className="container">
    <div className="sec-head">
      <span className="kicker">Kantor EasyTax</span>
      <h2>Proses online, melayani seluruh Indonesia</h2>
      <p>Seluruh layanan dapat diurus dari rumah. Bila ingin bertemu langsung, tim EasyTax berkantor di Bandung.</p>
    </div>
    <div className="office-grid one">
      <a className="office" href="https://maps.app.goo.gl/pGWtnZAvSV6aLsEm7" title="Buka di Google Maps">
        <div className="pin"><svg className="icon"><use href="#i-pin"/></svg></div>
        <h3>Kantor EasyTax Bandung</h3><div className="tag">EasyBuilding</div>
        <p>Jl. Cihampelas No. 201A, Cipaganti, Coblong, Kota Bandung, Jawa Barat 40131</p>
        <div className="meta">Informasi lebih lanjut via WhatsApp: 0817 5706 273</div>
      </a>
    </div>
  </div>
</section>

{/* ============ ARTIKEL ============ */}
<section className="block">
  <div className="container">
    <div className="promo-head">
      <div className="txt">
        <span className="kicker">Informasi seputar perpajakan</span>
        <h2>Artikel pajak dari EasyTax</h2>
        <p>Panduan singkat seputar SPT, NPWP, PPh, dan PPN.</p>
      </div>
      <a className="btn btn-outline" href="https://easytax.id/">Lihat Semua Artikel <svg className="icon"><use href="#i-arrow"/></svg></a>
    </div>
    <div className="art-grid">
      <a className="art" href="https://easytax.id/"><div className="thumb a1"><span>Pengertian SPT Bulanan</span></div><div className="in"><h4>Pengertian SPT Bulanan: Panduan Lengkap Bagi Anda</h4><div className="meta">ET Admin | August 20, 2026</div></div></a>
      <a className="art" href="https://easytax.id/"><div className="thumb a2"><span>Apa yang Dimaksud Laporan SPT Tahunan</span></div><div className="in"><h4>Apa yang Dimaksud Laporan SPT Tahunan? Yang Wajib Pajak Harus tahu!</h4><div className="meta">easytax | November 2024</div></div></a>
      <a className="art" href="https://easytax.id/"><div className="thumb a3"><span>PPh Final UMKM 0,5% Terbaru</span></div><div className="in"><h4>PPh Final UMKM 0,5% Terbaru: Dampak PP Nomor 20 Tahun 2026</h4><div className="meta">ET Admin | July 20, 2026</div></div></a>
      <a className="art" href="https://easytax.id/"><div className="thumb a1"><span>PT Perorangan Masih Bisa Pakai PPh Final 0,5%</span></div><div className="in"><h4>PT Perorangan Masih Bisa Pakai PPh Final 0,5%? Ini Jawabannya</h4><div className="meta">ET Admin | July 24, 2026</div></div></a>
      <a className="art" href="https://easytax.id/"><div className="thumb a2"><span>Tarif PPh 21 Terbaru</span></div><div className="in"><h4>Tarif PPh 21 Terbaru: Berapa Potongan Gaji Anda?</h4><div className="meta">ET Admin | August 3, 2026</div></div></a>
      <a className="art" href="https://easytax.id/"><div className="thumb a3"><span>Baru Wajib Pajak</span></div><div className="in"><h4>Baru Wajib Pajak? Pahami Kewajiban Pajak Dengan Tepat</h4><div className="meta">easytax | November 6, 2024</div></div></a>
    </div>
  </div>
</section>

{/* ============ FAQ ============ */}
<section className="block alt">
  <div className="container">
    <div className="sec-head">
      <span className="kicker">FAQ</span>
      <h2>Pertanyaan yang Sering Diajukan Tentang Pelapor SPT Tahunan</h2>
      <p>Belum yakin? Mungkin jawabannya ada di sini.</p>
    </div>
    <div className="faq">
      <details><summary>Apa hubungan EasyTax dengan EasyLegal, dan kenapa halaman ini ada di easylegal.biz.id?<svg className="icon"><use href="#i-chev"/></svg></summary><div className="ans">EasyTax dan EasyLegal adalah dua layanan dari grup EasyCorp. EasyTax menangani perpajakan dan akuntansi, sedangkan EasyLegal menangani legalitas usaha. Halaman ini ditampilkan di situs EasyLegal, tetapi konsultasi dan pengerjaan layanan pajak dilayani langsung oleh tim EasyTax.</div></details>
      <details><summary>Apa perbedaan lapor SPT Tahunan mandiri dengan konsultan pajak?<svg className="icon"><use href="#i-chev"/></svg></summary><div className="ans">Lapor mandiri berarti Anda menyusun dan mengirim SPT sendiri. Dengan konsultan pajak seperti EasyTax, penyusunan laporan laba rugi dan neraca, draft SPT, kode billing, hingga submit SPT dikerjakan tim kami, sehingga Anda tidak perlu mempelajari prosesnya dari awal.</div></details>
      <details><summary>Apa keunggulan jika menggunakan layanan jasa lapor spt tahunan?<svg className="icon"><use href="#i-chev"/></svg></summary><div className="ans">Prosesnya dibantu tim yang memahami perpajakan, tanpa perlu keluar rumah atau repot mengantre. Tersedia juga revisi SPT Tahunan PPh gratis 1 kali dalam setahun.</div></details>
      <details><summary>Kenapa harus menggunakan layanan jasa pelaporan spt tahunan Easytax?<svg className="icon"><use href="#i-chev"/></svg></summary><div className="ans">Kami melayani seluruh Indonesia. Biaya ditampilkan jelas berdasarkan omzet per tahun, dan layanan mencakup penyusunan laporan, draft SPT, kode billing (untuk status kurang bayar), sampai submit SPT.</div></details>
      <details><summary>Apa yang harus disiapkan sebelum lapor SPT Tahunan<svg className="icon"><use href="#i-chev"/></svg></summary><div className="ans">Umumnya diperlukan NPWP, data omzet dan transaksi keuangan selama satu tahun pajak, serta dokumen pendukung lainnya. Tim kami akan mengirim daftar lengkap sesuai kondisi Anda saat konsultasi.</div></details>
      <details><summary>Bagaimana proses pengerjaan lapor SPT tahunan di EasyTax?<svg className="icon"><use href="#i-chev"/></svg></summary><div className="ans">Konsultasi gratis via WhatsApp, penyusunan laporan laba rugi dan neraca, draft SPT Tahunan, pembuatan kode billing (bila kurang bayar), lalu submit SPT Tahunan. Revisi 1 kali dalam setahun gratis.</div></details>
    </div>
  </div>
</section>

{/* ============ CTA AKHIR ============ */}
<section className="final">
  <div className="container">
    <h2>Siap lapor SPT Tahunan?</h2>
    <p>Konsultasi gratis dengan tim EasyTax — cek kebutuhan pelaporan dan biaya sesuai omzet Anda.</p>
    <div className="cta">
      <a className="btn btn-light" data-cta="bottom-order" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20tertarik%20dengan%20jasa%20Lapor%20SPT%20Tahunan.%20Mohon%20info%20lengkap%20biaya%20dan%20prosesnya."><svg className="icon"><use href="#i-wa"/></svg> Konsultasi via WhatsApp</a>
      <a className="btn btn-ghost-light" href="#biaya-spt">Lihat Biaya <svg className="icon"><use href="#i-arrow"/></svg></a>
    </div>
    <small>Dilayani langsung oleh tim EasyTax</small>
  </div>
</section>

</main>

{/* ============ FOOTER ============ */}
<footer>
  <div className="container">
    <div className="f-top">
      <div className="f-brand">
        <div className="f-logos">
          <a href="https://easylegal.id/" className="logo"><span className="logo-mark">EL</span><span>easylegal<small>It's Easy to be Legal</small></span></a>
          <span className="f-sep" aria-hidden="true"></span>
          <span className="et-logo on-dark"><span className="mark"><span className="e">E</span><span className="j">J</span></span><span className="word">easytax</span></span>
        </div>
        <p>EasyLegal, mitra legalitas bisnis terpercaya untuk UMKM dan pengusaha Indonesia. Layanan perpajakan pada halaman ini disediakan oleh EasyTax, bagian dari EasyCorp. EasyTax adalah jasa pelayanan dalam bidang Perpajakan dan Akuntansi yang hadir untuk membantu perusahaan Anda, sehingga perusahaan dapat fokus pada pengembangan bisnisnya sementara masalah perpajakan diserahkan kepada EasyTax.</p>
      </div>
      <div className="contact-grid">
        <div>
          <h4>Customer Care EasyTax</h4>
          <a data-cta="footer-cs-1" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20berkonsultasi.">0817 5706 273</a>
          <a data-cta="footer-cs-2" href="https://wa.me/62818881433?text=Halo%20EasyTax%2C%20saya%20ingin%20berkonsultasi.">0818 881 433</a>
          <a data-cta="footer-cs-3" href="https://wa.me/62817321173?text=Halo%20EasyTax%2C%20saya%20ingin%20berkonsultasi.">0817 321 173</a>
        </div>
        <div>
          <h4>Office</h4>
          <span>EasyBuilding<br />Jl. Cihampelas No. 201A, Cipaganti, Coblong, Kota Bandung, Jawa Barat 40131</span>
        </div>
      </div>
    </div>

    <div className="f-links">
      <div><h4>Layanan Utama</h4><ul>
        <li><a href="#biaya-spt">Lapor SPT Tahunan Badan</a></li>
        <li><a href="#biaya-spt">Lapor SPT Tahunan Pribadi</a></li>
        <li><a href="https://easylegal.id/layanan/pengajuan-pkp">Pengurusan PKP</a></li>
        <li><a href="https://easytax.id/">Tulisan Pajak</a></li></ul></div>
      <div><h4>Butuh Legalitas Usaha?</h4><ul>
        <li><a href="https://easylegal.id/layanan/pendirian-badan-usaha/pt">Pendirian PT</a></li>
        <li><a href="https://easylegal.id/layanan/nib-oss">NIB &amp; OSS</a></li>
        <li><a href="https://easylegal.id/layanan/merek-haki">Daftar Merek</a></li></ul></div>
    </div>

    <div className="copy">© 2026 EasyTax · Bagian dari EasyCorp · Berkolaborasi dengan EasyLegal</div>
  </div>
</footer>

<a className="fab" data-cta="floating-whatsapp" aria-label="Chat WhatsApp EasyTax" href="https://wa.me/628175706273?text=Halo%20EasyTax%2C%20saya%20ingin%20konsultasi%20gratis%20mengenai%20layanan%20pajak."><svg className="icon"><use href="#i-wa"/></svg></a>


    </div>
  );
}
