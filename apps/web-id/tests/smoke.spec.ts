import { test, expect } from '@playwright/test';

/**
 * Smoke Test Suite — web-id (easylegal.id)
 * Verifies all main pages load without errors and HTTP status < 400.
 */

function isHmrWebSocket(msg: string): boolean {
  return msg.includes('WebSocket') && (msg.includes('webpack-hmr') || msg.includes('_next/hmr'));
}

function isNodeDeprecation(msg: string): boolean {
  return msg.includes('DEP0205') || msg.includes('DeprecationWarning');
}

function isExternalResourceError(msg: string): boolean {
  // 400/403 from CDN/MinIO images, external APIs — not app bugs
  return msg.includes('Failed to load resource') && (msg.includes('403') || msg.includes('400'));
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
  { path: '/syarat-ketentuan', name: 'Syarat & Ketentuan' },
  { path: '/kebijakan-privasi', name: 'Kebijakan Privasi' },
];

test.describe('Smoke Test - Main Pages (web-id)', () => {
  for (const page of mainPages) {
    test(`${page.name} loads without errors`, async ({ page: browserPage }) => {
      const realErrors: string[] = [];

      browserPage.on('console', msg => {
        if (msg.type() === 'error' && !isHmrWebSocket(msg.text()) && !isNodeDeprecation(msg.text()) && !isExternalResourceError(msg.text())) {
          realErrors.push(msg.text());
        }
      });

      const response = await browserPage.goto(page.path, { waitUntil: 'networkidle', timeout: 30000 });
      expect(response?.status()).toBeLessThan(400);
      await browserPage.waitForLoadState('domcontentloaded');
      expect(realErrors, `Console errors on ${page.name}:\n${realErrors.join('\n')}`).toHaveLength(0);

      const bodyText = await browserPage.textContent('body');
      expect(bodyText?.trim().length).toBeGreaterThan(50);
    });
  }
});

test.describe('Smoke Test - Service Pages (web-id)', () => {
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
    '/layanan/kontrak-bisnis',
    '/layanan/apostille',
    '/layanan/pelaporan-rups',
    '/layanan/pembubaran-perusahaan',
  ];

  for (const path of servicePages) {
    test(`${path} loads without errors`, async ({ page: browserPage }) => {
      const realErrors: string[] = [];

      browserPage.on('console', msg => {
        if (msg.type() === 'error' && !isHmrWebSocket(msg.text()) && !isNodeDeprecation(msg.text()) && !isExternalResourceError(msg.text())) {
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

test.describe('Smoke Test - Canonical Domain (web-id)', () => {
  test('homepage canonical points to easylegal.id', async ({ page: browserPage }) => {
    await browserPage.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    const canonical = await browserPage.$eval('link[rel="canonical"]', el => el.getAttribute('href'));
    expect(canonical).toContain('easylegal.id');
    expect(canonical).not.toContain('easylegal.biz.id');
    expect(canonical).not.toContain('easylegal.co.id');
  });

  test('artikel page canonical points to easylegal.id', async ({ page: browserPage }) => {
    await browserPage.goto('/artikel', { waitUntil: 'networkidle', timeout: 30000 });
    const canonical = await browserPage.$eval('link[rel="canonical"]', el => el.getAttribute('href'));
    expect(canonical).toContain('easylegal.id');
    expect(canonical).not.toContain('easylegal.biz.id');
  });
});
