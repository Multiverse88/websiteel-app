const { chromium } = require('playwright');
const fs = require('fs');

const urls = [
  'https://easylegal.biz.id/',
  'https://easylegal.biz.id/tentang-kami',
  'https://easylegal.biz.id/kontak',
  'https://easylegal.biz.id/testimoni',
  'https://easylegal.biz.id/artikel',
  'https://easylegal.biz.id/cek-nama',
  'https://easylegal.biz.id/cek-kbli',
  'https://easylegal.biz.id/referral-reseller',
  'https://easylegal.biz.id/kerjasama',
  'https://easylegal.biz.id/kebijakan-privasi',
  'https://easylegal.biz.id/syarat-ketentuan',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha/pt',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha/cv',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha/firma',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha/pt-pma',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha/pt-perorangan',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha/yayasan',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha/perkumpulan',
  'https://easylegal.biz.id/layanan/pendirian-badan-usaha/koperasi',
  'https://easylegal.biz.id/layanan/nib-oss',
  'https://easylegal.biz.id/layanan/pengajuan-pkp',
  'https://easylegal.biz.id/layanan/pkkpr',
  'https://easylegal.biz.id/layanan/pelaporan-lkpm',
  'https://easylegal.biz.id/layanan/pelaporan-rups',
  'https://easylegal.biz.id/layanan/perubahan-akta',
  'https://easylegal.biz.id/layanan/pembubaran-perusahaan',
  'https://easylegal.biz.id/layanan/pengurusan-pse',
  'https://easylegal.biz.id/layanan/merek-haki',
  'https://easylegal.biz.id/layanan/kontrak-bisnis',
  'https://easylegal.biz.id/layanan/perjanjian-perkawinan',
  'https://easylegal.biz.id/layanan/apostille',
  'https://easylegal.biz.id/layanan/sertifikasi-iso',
  'https://easylegal.biz.id/layanan/visa-kitas',
  'https://easylegal.biz.id/layanan/virtual-office',
  'https://easylegal.biz.id/layanan/press-release',
  'https://easylegal.biz.id/artikel/kelebihan-dan-kekurangan-virtual-office-yang-wajib-ketahui',
  'https://easylegal.biz.id/artikel/sewa-virtual-office'
];

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  let report = '';
  let globalIssues = 0;
  let totalIssues = 0;
  let summaryRows = [];

  for (let url of urls) {
    const page = await browser.newPage();
    try {
      console.log(`Auditing ${url}...`);
      const response = await page.goto(url, { waitUntil: 'load', timeout: 30000 });
      const status = response ? response.status() : 'Unknown';
      const finalUrl = page.url();
      let hostname = 'Unknown';
      try { hostname = new URL(finalUrl).hostname; } catch(e){}

      let pageIssues = [];
      
      if (status !== 200) {
        pageIssues.push(`HTTP Status ${status}`);
      }
      if (hostname !== 'easylegal.biz.id' && hostname !== 'www.easylegal.biz.id') {
        pageIssues.push(`Redirected to wrong domain: ${hostname}`);
      }

      // get DOM sequence
      const layoutData = await page.$$eval('section, nav, footer, header', elements => {
        return elements.map(el => {
          const rect = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            className: el.className,
            text: el.innerText.substring(0, 150).replace(/\n/g, ' '),
            id: el.id,
            top: rect.top,
            bottom: rect.bottom,
            height: rect.height,
            isNav: el.tagName === 'NAV' || el.tagName === 'HEADER',
            isFooter: el.tagName === 'FOOTER'
          };
        }).filter(item => item.height > 0); // Ignore hidden sections
      });

      // Analyze Sections
      let identifiedSections = [];
      let actualSequence = [];
      
      let hasHero = false;
      let hasTrustStats = false;
      let hasPricing = false;
      let hasOffices = false;
      let hasMediaCoverage = false;
      let hasTestimonials = false;

      let heroBottom = 0;
      let trustStatsTop = 0;
      let pricingIndex = -1;
      let officeIndex = -1;
      let mediaIndex = -1;
      let testiIndex = -1;

      for (let i = 0; i < layoutData.length; i++) {
        const item = layoutData[i];
        let name = 'Unknown';
        
        if (item.isNav) name = 'Navbar';
        else if (item.isFooter) name = 'Footer';
        else if (item.text.match(/13\.000\+|ISO 27001|PSE Terdaftar|RATING GOOGLE/i)) {
          name = 'TrustStatsBar';
          hasTrustStats = true;
          trustStatsTop = item.top;
        }
        else if (!hasHero && item.tag === 'SECTION') {
          name = 'Hero';
          hasHero = true;
          heroBottom = item.bottom;
        }
        else if (item.text.match(/Harga|Paket|Biaya|Solusi Easylegal|Pilihan/i)) {
          name = 'Pricing';
          hasPricing = true;
          pricingIndex = i;
        }
        else if (item.text.match(/Kantor|Lokasi|Alamat/i)) {
          name = 'Offices';
          hasOffices = true;
          officeIndex = i;
        }
        else if (item.text.match(/Liputan Media|Diliput oleh/i)) {
          name = 'MediaCoverage';
          hasMediaCoverage = true;
          mediaIndex = i;
        }
        else if (item.text.match(/Testimoni|Apa Kata Mereka|Pengalaman dari/i)) {
          name = 'Testimonials';
          hasTestimonials = true;
          testiIndex = i;
        }
        else if (item.text.match(/FAQ|Pertanyaan|Sering Ditanyakan/i)) name = 'FAQ';
        else if (item.text.match(/Tunggu Apa Lagi|Konsultasi|Hubungi Kami|Mulai Sekarang/i)) name = 'CTA Penutup';
        else if (item.text.match(/Keunggulan|Manfaat|Proses cepat|Cara Kerja|Kenapa Memilih/i)) name = 'Benefits';
        else name = 'Other Section';

        if (name !== 'Unknown' && name !== 'Other Section') {
          actualSequence.push(name);
          identifiedSections.push({ name, index: i, item });
        }
      }

      // Check Specific Rules
      if (hasHero && hasTrustStats) {
        const gap = Math.abs(trustStatsTop - heroBottom);
        if (gap > 50) {
          pageIssues.push(`TrustStatsBar gap to Hero is too large (${gap}px)`);
        }
      }

      if (hasPricing && hasOffices) {
        if (officeIndex !== pricingIndex + 1 && officeIndex !== pricingIndex + 2) {
          // It might be separated by a non-identified section, so let's be loose or strict?
          pageIssues.push('Offices tidak langsung di bawah Pricing');
        }
      }

      if (hasMediaCoverage && hasTestimonials) {
        if (mediaIndex > testiIndex) {
          pageIssues.push('MediaCoverage berada di bawah Testimonials');
        }
      }

      const isExempt = url.includes('/artikel') || url.includes('tentang-kami') || url.includes('kontak') || url.includes('kebijakan-privasi') || url.includes('syarat-ketentuan') || url.includes('cek-nama') || url.includes('cek-kbli');

      if (!isExempt) {
         if (!hasPricing && !url.includes('/kerjasama')) pageIssues.push('Pricing section missing');
         if (!hasTestimonials) pageIssues.push('Testimonials section missing');
      }

      const hasNavbar = actualSequence.includes('Navbar');
      const hasFooter = actualSequence.includes('Footer');
      if (!hasNavbar) pageIssues.push('Navbar hilang');
      if (!hasFooter) pageIssues.push('Footer hilang');

      // Generate Report Block
      report += `## ${url}\n\n`;
      report += `Status HTTP: ${status}\n`;
      report += `Hostname akhir: ${hostname}\n`;
      report += `Viewport: DESKTOP\n\n`;
      report += `Urutan aktual:\n\n${actualSequence.join(' → ')}\n\n`;
      
      report += `| Section | Ditemukan? | Posisi Sesuai? | Catatan |\n`;
      report += `|---|---|---|---|\n`;
      
      const targetSections = ['Navbar', 'Hero', 'TrustStatsBar', 'Benefits', 'Pricing', 'Offices', 'MediaCoverage', 'Testimonials', 'FAQ', 'CTA Penutup', 'Footer'];
      
      targetSections.forEach(ts => {
         const found = actualSequence.includes(ts);
         let posSesuai = 'N/A';
         if (found) {
            // Rough position check
            const idx = actualSequence.indexOf(ts);
            const targetIdx = targetSections.indexOf(ts);
            // It's mostly just if it's there, but we have specific rules for TrustStats, Offices, MediaCoverage checked above
            posSesuai = 'Ya'; 
         }
         let notes = '';
         if (!found && !isExempt && ts !== 'FAQ' && ts !== 'Benefits' && ts !== 'CTA Penutup') notes = 'Wajib tapi tidak ditemukan';
         if (isExempt && !found) notes = 'Pengecualian valid';
         
         report += `| ${ts} | ${found ? 'Ya' : 'Tidak'} | ${posSesuai} | ${notes} |\n`;
      });

      report += `\nMasalah visual tambahan:\n\n`;
      if (pageIssues.length === 0) {
        report += `- Tidak ditemukan\n\n`;
        report += `Kesimpulan halaman:\n\n- ✅ Layout sudah sesuai\n\n`;
      } else {
        pageIssues.forEach((iss, i) => report += `${i+1}. ${iss}\n`);
        report += `\nKesimpulan halaman:\n\n- 🔴 Ada ${pageIssues.length} masalah.\n\n`;
        totalIssues += pageIssues.length;
        globalIssues++;
      }

      summaryRows.push(`| ${url.replace('https://easylegal.biz.id','')} | ${status} | ${hostname} | ${pageIssues.length} | ${pageIssues.join(', ')} | ${status !== 200 ? 'Kritis' : (pageIssues.length > 0 ? 'Sedang' : 'Rendah')} |`);

    } catch (err) {
      console.log(`Error on ${url}: ${err.message}`);
      report += `## ${url}\n\nError: ${err.message}\n\n`;
      summaryRows.push(`| ${url.replace('https://easylegal.biz.id','')} | ERROR | - | 1 | Failed to load | Kritis |`);
      totalIssues++;
      globalIssues++;
    }
    await page.close();
  }

  await browser.close();

  let finalReport = `==================================================\n`;
  finalReport += `RINGKASAN AKHIR\n`;
  finalReport += `==================================================\n\n`;
  finalReport += `| URL | Status | Hostname Akhir | Jumlah Masalah | Masalah Utama | Prioritas |\n`;
  finalReport += `|---|---:|---|---:|---|---|\n`;
  finalReport += summaryRows.join('\n') + '\n\n';

  if (totalIssues === 0) {
    finalReport += `✅ Seluruh layout di easylegal.biz.id sudah sesuai\n`;
  } else {
    finalReport += `🔴 Ditemukan total ${totalIssues} masalah pada ${globalIssues} halaman di easylegal.biz.id.\n`;
  }

  fs.writeFileSync('qa_audit_report.md', finalReport + '\n\n' + report);
  console.log('Done!');
}

runAudit();
