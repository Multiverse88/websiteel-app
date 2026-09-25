import { expect, test } from "@playwright/test";

declare global {
  interface Window {
    __clipboardMode: "success" | "reject";
    __copiedPayloads: string[];
  }
}

const ROUTES = [
  {
    path: "/legal-jadi-mudah",
    legalName: "CV LEGAL JADI MUDAH",
    accountNumber: "1560026240467",
    ahuNumber: "AHU-0087109-AH.01.14 Tahun 2025",
    ahuUrl:
      "https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0087109-AH.01.14+Tahun+2025/id/2640649",
    qrImagePath: "/images/payment-verification/qr-legal-jadi-mudah.png",
  },
  {
    path: "/mudah-urus-legalitas",
    legalName: "CV MUDAH URUS LEGALITAS",
    accountNumber: "1560026231037",
    ahuNumber: "AHU-0087742-AH.01.14 Tahun 2025",
    ahuUrl:
      "https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0087742-AH.01.14+Tahun+2025/id/2642249",
    qrImagePath: "/images/payment-verification/qr-mudah-urus-legalitas.png",
  },
  {
    path: "/legalitas-mudah-indonesia",
    legalName: "CV LEGALITAS MUDAH INDONESIA",
    accountNumber: "1030030300004",
    ahuNumber: "AHU-0061760-AH.01.14 Tahun 2024",
    ahuUrl:
      "https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0061760-AH.01.14+Tahun+2024/id/1904084",
    qrImagePath: "/images/payment-verification/qr-legalitas-mudah-indonesia.png",
  },
  {
    path: "/easylegal-bantu-pengusaha",
    legalName: "CV. EASYLEGAL BANTU PENGUSAHA",
    accountNumber: "1300025584486",
    ahuNumber: "AHU-0040513-AH.01.14 Tahun 2024",
    ahuUrl:
      "https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0040513-AH.01.14+Tahun+2024/id/1768633",
    qrImagePath: "/images/payment-verification/qr-easylegal-bantu-pengusaha.png",
  },
];

// Next's dev server refuses to serve client JS chunks/HMR to the
// `127.0.0.1` origin used by playwright.config.ts's default `baseURL`
// (see "allowedDevOrigins" in Next's dev warnings), which silently leaves
// every client island unhydrated. Navigating through `localhost` instead
// keeps these tests scoped to this file without touching shared config.
const DEV_ORIGIN = "http://localhost:3000";

const FINANCE_WA_URL =
  "https://wa.me/6281717312821?text=" +
  encodeURIComponent(
    "Hallo Kak, saya ingin menanyakan perihal pembayaran dan invoice. Boleh dibantu info lebih lanjut ya kak?",
  );

test.describe("Payment verification pages — per-route data fidelity", () => {
  for (const route of ROUTES) {
    test(`${route.path} shows correct entity data and no console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (msg) => {
        const text = msg.text();
        // 400/403 from the dev MinIO image proxy and dev-only HMR websocket
        // noise are environment artifacts, not app bugs — see tests/smoke.spec.ts.
        const isDevNoise =
          (text.includes("Failed to load resource") && (text.includes("403") || text.includes("400"))) ||
          (text.includes("WebSocket") && (text.includes("webpack-hmr") || text.includes("_next/hmr")));
        if (msg.type() === "error" && !isDevNoise) {
          errors.push(text);
        }
      });

      const response = await page.goto(`${DEV_ORIGIN}${route.path}`, {
        waitUntil: "networkidle",
      });
      expect(response?.status()).toBeLessThan(400);

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Verifikasi Rekening Resmi EasyLegal",
      );
      await expect(page.getByText(route.legalName).first()).toBeVisible();
      await expect(page.getByText(route.accountNumber, { exact: true })).toBeVisible();
      await expect(page.getByText(route.ahuNumber, { exact: true })).toBeVisible();

      const ahuLink = page.getByRole("link", { name: "Cek di Sistem AHU Kemenkumham" });
      await expect(ahuLink).toHaveAttribute("href", route.ahuUrl);
      await expect(ahuLink).toHaveAttribute("target", "_blank");
      await expect(ahuLink).toHaveAttribute("rel", /noopener/);

      const qrFileName = route.qrImagePath.split("/").pop()!;
      const qrImage = page.locator("img[alt*='Kode QR resmi AHU']");
      await expect(qrImage).toHaveAttribute("src", new RegExp(encodeURIComponent(qrFileName)));

      const waLinks = page.getByRole("link", { name: "Hubungi Finance via WhatsApp" });
      await expect(waLinks).toHaveAttribute("href", FINANCE_WA_URL);
      await expect(waLinks).toHaveAttribute("target", "_blank");

      // Three offices are present, matching the shared reference data.
      await expect(page.getByText("Bandung Head Office")).toBeVisible();
      await expect(page.getByText("Jakarta Branch Office")).toBeVisible();
      await expect(page.getByText("Bekasi Branch Office")).toBeVisible();

      // No normal site chrome on this route.
      await expect(page.locator("nav")).toHaveCount(0);
      await expect(page.locator("footer").filter({ hasText: "EasyLegal" }).first()).toBeVisible();

      expect(errors, `Console/page errors on ${route.path}:\n${errors.join("\n")}`).toHaveLength(0);
    });
  }
});

test.describe("CopyAccountButton — accessible clipboard behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.__clipboardMode = "success";
      window.__copiedPayloads = [];
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (payload: string) => {
            if (window.__clipboardMode === "reject") {
              throw new DOMException("Permission denied", "NotAllowedError");
            }
            window.__copiedPayloads.push(payload);
          },
        },
      });
    });
  });

  test("copies the exact digit string by click and Enter, then shows accessible failure fallback", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto(`${DEV_ORIGIN}/legal-jadi-mudah`, { waitUntil: "networkidle" });
    const button = page.getByRole("button", { name: /Salin nomor rekening/ });
    const status = page.getByRole("status");

    await button.click();
    await expect(status).toHaveText("Nomor rekening tersalin");

    await expect
      .poll(() => page.evaluate(() => window.__copiedPayloads))
      .toEqual(["1560026240467"]);
    await expect(button).toBeFocused();

    await button.press("Enter");
    await expect
      .poll(() => page.evaluate(() => window.__copiedPayloads))
      .toEqual(["1560026240467", "1560026240467"]);

    await page.evaluate(() => {
      window.__clipboardMode = "reject";
    });
    await button.click();
    await expect(status).toHaveText("Gagal menyalin. Pilih nomor rekening secara manual.");
    // The raw account number stays selectable in the page outside the button.
    await expect(page.getByText("1560026240467", { exact: true })).toBeVisible();
    await expect(button).toBeFocused();

    expect(pageErrors).toEqual([]);
  });
});
