import { test, expect } from '@playwright/test';

/**
 * Smoke Test Suite - Deteksi Impact Error
 * Jalankan setelah setiap fitur baru untuk pastikan tidak ada error di halaman lain.
 *
 * Perintah: npm test
 */

// Filter WebSocket HMR errors - ini artifact dev server, bukan bug
function isHmrWebSocket(msg: string): boolean {
  return msg.includes('WebSocket') && msg.includes('webpack-hmr');
}

// Filter deprecation warnings dari Node.js
function isNodeDeprecation(msg: string): boolean {
  return msg.includes('DEP0205') || msg.includes('DeprecationWarning');
}

const mainPages = [
  { path: '/', name: 'Homepage' },
  { path: '/kontak', name: 'Kontak' },
  { path: '/tentang-kami', name: 'Tentang Kami' },
  { path: '/artikel', name: 'Artikel (Blog)' },
  { path: '/cek-nama', name: 'Cek Nama PT' },
  { path: '/cek-kbli', name: 'Cek KBLI' },
  { path: '/testimoni', name: 'Testimoni' },
  { path: '/referral-reseller', name: 'Referral & Reseller' },
  { path: '/kerjasama', name: 'Kerjasama' },
];

test.describe('Smoke Test - Main Pages', () => {
  for (const page of mainPages) {
    test(`${page.name} loads without errors`, async ({ page: browserPage }) => {
      const realErrors: string[] = [];

      // Capture real console errors (filter HMR noise)
      browserPage.on('console', msg => {
        if (msg.type() === 'error' && !isHmrWebSocket(msg.text()) && !isNodeDeprecation(msg.text())) {
          realErrors.push(msg.text());
        }
      });

      // Navigate to page
      const response = await browserPage.goto(page.path, { waitUntil: 'networkidle', timeout: 30000 });

      // Assert page loads successfully (no 404/500)
      expect(response?.status()).toBeLessThan(400);

      // Wait a bit for any late errors
      await browserPage.waitForLoadState('domcontentloaded');

      // Assert no real console errors
      expect(realErrors, `Console errors found on ${page.name}:\n${realErrors.join('\n')}`).toHaveLength(0);

      // Assert page has visible content
      const bodyText = await browserPage.textContent('body');
      expect(bodyText?.trim().length).toBeGreaterThan(50);
    });
  }
});

test.describe('Smoke Test - Service Pages', () => {
  const servicePages = [
    '/layanan/pendirian-badan-usaha',
    '/layanan/merek-haki',
    '/layanan/nib-oss',
    '/layanan/sertifikasi-iso',
    '/layanan/pengajuan-pkp',
    '/layanan/visa-kitas',
    '/layanan/virtual-office',
    '/layanan/press-release',
    '/layanan/pelaporan-lkpm',
    '/layanan/perjanjian-perkawinan',
    '/layanan/pr-media',
  ];

  for (const path of servicePages) {
    test(`${path} loads without errors`, async ({ page: browserPage }) => {
      const realErrors: string[] = [];

      browserPage.on('console', msg => {
        if (msg.type() === 'error' && !isHmrWebSocket(msg.text()) && !isNodeDeprecation(msg.text())) {
          realErrors.push(msg.text());
        }
      });

      const response = await browserPage.goto(path, { waitUntil: 'networkidle', timeout: 30000 });
      expect(response?.status()).toBeLessThan(400);
      await browserPage.waitForLoadState('domcontentloaded');
      expect(realErrors).toHaveLength(0);
    });
  }
});
