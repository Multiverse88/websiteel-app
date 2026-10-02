import { expect, test } from "@playwright/test";

const retiredPaths = [
  "/jasa-pembuatan-pt-jakarta",
  "/apa-itu-impor",
];

for (const path of retiredPaths) {
  test(`${path} is permanently gone`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });

    expect(response.status()).toBe(410);
    expect(response.headers()["x-robots-tag"]).toBe("noindex, nofollow, gone");
    expect(await response.text()).toContain("Halaman Dihapus Permanen");
  });
}

test("retired URLs are absent from the sitemap", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  const sitemap = await response.text();

  expect(response.ok()).toBe(true);
  for (const path of retiredPaths) {
    expect(sitemap).not.toContain(path);
  }
});

test("unrelated permanent service redirects remain active", async ({ request }) => {
  const response = await request.get("/layanan/jasa-pendirian-pt", { maxRedirects: 0 });

  expect(response.status()).toBe(308);
  expect(response.headers().location).toContain("/layanan/pendirian-badan-usaha/pt");
});
