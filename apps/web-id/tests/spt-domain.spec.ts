import { expect, test } from "@playwright/test";

const SPT_URL = "https://easylegal.biz.id/layanan/spt-pajak-gads";

for (const path of ["/layanan/spt-pajak-gads", "/layanan-spt-pajak-gads"]) {
  test(`${path} redirects directly to biz.id`, async ({ request }) => {
    const response = await request.get(path, { maxRedirects: 0 });

    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(SPT_URL);
  });
}

test("easylegal.id sitemap excludes the moved SPT page", async ({ request }) => {
  const response = await request.get("/sitemap.xml");

  expect(await response.text()).not.toContain("/layanan/spt-pajak-gads");
});
