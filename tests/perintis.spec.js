import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://devel.pelni.co.id");
  await page.locator("#username").fill("okyhariyanto");
  await page.locator("#password").fill("Kinkin@2022");
  await page.getByRole("button", { name: "Login" }).click();
  await page.goto("https://devel.pelni.co.id/welcome");
  await page.getByRole("link", { name: " Home" }).click();
  await page
    .getByRole("link", { name: "Aplikasi Perintis 4789" })
    .locator("span")
    .first()
    .click();
});

test("TAMBAH DISKON PERINTIS PENUMPANG", async ({ page }) => {
  await page
    .getByRole("link", { name: "   Diskon Perintis", exact: true })
    .click();
  await page.getByRole("link", { name: "Tambah Master Diskon" }).click();
  await page.getByTitle(" -Pilih Kapal- ").click();
  await page.locator('input[type="search"]').nth(1).fill("92");
  await page.getByRole("treeitem", { name: "KM. Sabuk Nusantara" }).click();
  await page.locator("#select2-voyage-container").click();
  await page.locator('input[type="search"]').nth(1).fill("2024");
  await page.getByRole("treeitem", { name: "/2024" }).click();
  await page.locator("#select2-kode_embarkasi-container").click();
  await page.getByRole("treeitem", { name: "SAPEKEN/1" }).click();
  await page.locator("#select2-kode_debarkasi-container").click();
  await page.getByRole("treeitem", { name: "KALIANGET/" }).click();
  await page.getByPlaceholder("Nama Diskon").click();
  await page.getByPlaceholder("Nama Diskon").fill("hallotest");
  await page.getByPlaceholder("Deskripsi").click();
  await page.getByPlaceholder("Deskripsi").fill("diskon untuk kapal perintis");
  await page.getByPlaceholder("Dokumen Referensi").click();
  await page.getByPlaceholder("Apabila dikosongi, akan").fill("DDDDD");
  await page.locator("#skema_diskon").selectOption("total");
  await page.getByPlaceholder("Besaran Diskon dalam persen").click();
  await page.getByPlaceholder("Besaran Diskon dalam persen").fill("50");
  await page.getByPlaceholder("Kuota Diskon").click();
  await page.getByPlaceholder("Kuota Diskon").fill("2");
  await page.locator("#lokasi_diskon").selectOption("C");
  await page.locator("#select2-kode_lokasi_diskon-container").click();
  await page.locator('input[type="search"]').nth(1).fill("JAKARTA");
  await page.getByRole("treeitem", { name: "Jakarta" }).click();
  await page.getByRole("heading", { name: "DEMO VERSION" }).click();
  await page.locator("#pageform").getByRole("list").click();
  await page.getByRole("treeitem", { name: "Dewasa" }).click();
  await page.getByRole("button", { name: "Simpan" }).click();
});
