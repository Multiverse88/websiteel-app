import { expect, test } from "@playwright/test";

const SPT_PATH = "/layanan/spt-pajak-gads";
const SPT_URL = `https://easylegal.biz.id${SPT_PATH}`;

test("SPT page is served on easylegal.biz.id", async ({ request }) => {
  const response = await request.get(SPT_PATH, {
    headers: { Host: "easylegal.biz.id", "X-Forwarded-Host": "easylegal.biz.id" },
    maxRedirects: 0,
  });

  expect(response.status()).toBe(200);
  expect(await response.text()).toContain("Jasa Laporan SPT Pajak Tahunan");
});

for (const host of ["www.easylegal.biz.id", "easylegal.co.id", "easylegal.my.id"]) {
  test(`SPT page on ${host} redirects directly to biz.id`, async ({ request }) => {
    const response = await request.get(SPT_PATH, {
      headers: { Host: host, "X-Forwarded-Host": host },
      maxRedirects: 0,
    });

    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(SPT_URL);
  });
}

test("only the biz.id sitemap includes the SPT page", async ({ request }) => {
  const bizSitemap = await request.get("/sitemap.xml", { headers: { Host: "easylegal.biz.id", "X-Forwarded-Host": "easylegal.biz.id" } });
  const coSitemap = await request.get("/sitemap.xml", { headers: { Host: "easylegal.co.id", "X-Forwarded-Host": "easylegal.co.id" } });

  expect(await bizSitemap.text()).toContain(SPT_URL);
  expect(await coSitemap.text()).not.toContain(SPT_PATH);
});
