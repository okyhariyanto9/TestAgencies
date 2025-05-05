import { test, expect } from "@playwright/test";

test("Verifikasi semua elemen menggunakan font-lato", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/id"); // Ganti dengan URL halaman Anda

  // Ambil semua elemen pada halaman
  const elements = await page.$$("body *");

  for (const element of elements) {
    const fontFamily = await element.evaluate((el) =>
      window.getComputedStyle(el).getPropertyValue("font-family")
    );

    // Periksa apakah font-family mengandung 'font-lato'
    expect(fontFamily).toContain("font-lato");
  }
});
