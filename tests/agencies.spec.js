import { test, expect } from "@playwright/test";
import { checkSocialIcons } from "../utils/footerSocialMedia";
import { allure } from "allure-playwright";

test("Mengubah Bahasa Indonesia", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  await page.getByLabel("Change").selectOption("id");
  await page.goto("https://agencies-dev.pelni.co.id/id");
  const heading = await page.locator(".wow > div").first();

  // Expect heading tersebut terlihat
  await expect(heading).toContainText("Partner Kami");
});

test("Mengubah Bahasa Inggris", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  //await page.getByRole('heading', { name: 'Partner Kami' }).click();
  const heading = await page.locator(".wow > div").first();

  // Expect heading tersebut terlihat
  await expect(heading).toContainText("Our Partners");
});

test("Mengubah Bahasa Francis", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  await page.getByLabel("Change").selectOption("fr");
  await page.goto("https://agencies-dev.pelni.co.id/fr");
  const heading = await page.locator(".wow > div").first();
  await expect(heading).toContainText("Nos partenaires");
});

test("Mengubah Bahasa china", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  await page.getByLabel("Change").selectOption("zh");
  await page.goto("https://agencies-dev.pelni.co.id/zh");
  const heading = await page.locator(".wow > div").first();
  await expect(heading).toContainText("我们的合作伙伴");
});

test("Test fungsi chat Whatsapp keagenan", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://agencies-dev.pelni.co.id/en");
  await page.locator(".styles-module_whatsappButton__tVits").click();
  await page.getByPlaceholder("Type a message..").click();
  await page.getByPlaceholder("Type a message..").fill("haalo");
  //const page1Promise = page.waitForEvent("popup");

  const [newTab] = await Promise.all([
    context.waitForEvent("page"), // Menunggu tab baru terbuka
    await page.locator("form button").click(), // Klik link/tab yang membuka tab baru
  ]);

  // Contoh expect: periksa apakah URL sesuai
  await expect(newTab.url()).toContain(
    "https://api.whatsapp.com/send/?phone=6281299960162"
  ); // atau URL yang diharapkan
});

test("Menampilakan corusel", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  await page.getByText("PELNI AgenciesNo Agent Knows").nth(1).click();
  await page.getByRole("button", { name: "Previous" }).click();
  await page.getByText("PELNI AgenciesNo Agent Knows").nth(1).click();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByText("PELNI AgenciesNo Agent Knows").nth(1).click();
});

test("Verifikasi Footer Media Instagram", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  const instagramLink = page.locator('a[aria-label="instagram"]');
  await expect(instagramLink).toBeVisible();
  await Promise.all([page.waitForNavigation(), instagramLink.click()]);
  await expect(page).toHaveURL("https://www.instagram.com/pelniagencies/");
  await page.waitForTimeout(2000);
  await page.screenshot();
});

test("Verifikasi Footer Media LinkInd", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  const LinkidLink = page.locator('a[aria-label="linkedin"]');
  await expect(LinkidLink).toBeVisible();
  await Promise.all([page.waitForNavigation(), LinkidLink.click()]);
  await page.pause;
  await expect(page).toHaveTitle("Sign Up | LinkedIn");
  await page.screenshot();
});

test("Verifikasi Footer Media Facebook", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  const Facebook = page.locator('a[aria-label="facebook"]');
  await expect(Facebook).toBeVisible();
  await Promise.all([page.waitForNavigation(), Facebook.click()]);
  await page.pause;
  await expect(page).toHaveURL(
    "https://www.facebook.com/people/Agencies-PELNI/61568579673062/"
  );
  await page.screenshot();
});

test("Verifikasi Footer Media Email", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  const LinkidLink = page.locator('a[aria-label="mailto"]');
  await expect(LinkidLink).toBeVisible();
  await Promise.all([page.waitForNavigation(), LinkidLink.click()]);
  await page.pause;
  await expect(page).toHaveURL("https://mail.pelni.co.id");
  await page.screenshot();
});

const pagesToTest = [
  "https://agencies-dev.pelni.co.id/en/",
  "https://agencies-dev.pelni.co.id/en/about",
  "https://agencies-dev.pelni.co.id/en/branch",
  "https://agencies-dev.pelni.co.id/en/service/HUSBANDRY%20AGENCY",
  "https://agencies-dev.pelni.co.id/en/service/SUB%20AGENCY",
  "https://agencies-dev.pelni.co.id/en/service/FULL%20PORT%20AGENCY",
  "https://agencies-dev.pelni.co.id/en/service/Introduce%20One%20Enterprise%20Good%20Products%20Pelni%20Surya%20Dockyard",
  "https://agencies-dev.pelni.co.id/en/article",
  "https://agencies-dev.pelni.co.id/en/press-release",
  "https://agencies-dev.pelni.co.id/en/make-enquiry",

  // Tambahkan URL halaman lain yang ingin diuji
];

for (const url of pagesToTest) {
  test(`Memeriksa ikon media sosial di halaman ${url}`, async ({ page }) => {
    await page.goto(url);
    await checkSocialIcons(page);
    const screenshot = await page.screenshot({ fullPage: true });
    allure.attachment(`Screenshot Halaman ${url} `, screenshot, "image/png");
  });
}

test("Memverifikasi Menu Layanan Ketika Hover Menampilkan SubMenu ", async ({
  page,
}) => {
  const submenus = [
    "HUSBANDRY AGENCY",
    "SUB AGENCY",
    "FULL PORT AGENCY",
    "Introduce One Enterprise Good Products Pelni Surya Dockyard",
  ];
  await page.goto("https://agencies-dev.pelni.co.id/en");
  const menuUtama = page.getByText("Service", { exact: true });
  await menuUtama.hover();
  for (const submenu of submenus) {
    const Menus = page.getByRole("link", { name: `${submenu}` });
    const screenshot = await page.screenshot();
    allure.attachment(
      `Screenshot Halaman ${submenu} `,
      screenshot,
      "image/png"
    );
    await expect(Menus).toBeVisible();
  }
});

test("Input Ajukan Penawaran", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  await page.getByRole("link", { name: "Branch" }).click();
  await page.locator(".css-19bb58m").click();
  await page.getByText("SEMARANGKARIMUN JAWA").click();
  await page.getByRole("button", { name: "Detail" }).click();
  const headingCabang = page.getByRole("heading", { name: "KARIMUN JAWA" });
  await expect(headingCabang).toHaveText("KARIMUN JAWA");
});

test("Memverifikasi Marker Maps Cabang Ketika DiHover Muncul Detailnya", async ({
  page,
}) => {
  await page.goto("https://agencies-dev.pelni.co.id/en");
  await page.getByRole("link", { name: "Branch" }).click();
  await page.locator(".css-zvi4ix > div").click();
  await page.locator("div:nth-child(4) > img:nth-child(38)").click();
  await page.locator("div:nth-child(4) > img:nth-child(38)").hover();
  const markerVis = page.locator(".leaflet-popup-content");
  await expect(markerVis).toBeVisible();
});

test("Mengecek Jumlah Count Card/Grids Pada Halaman Artikel", async ({
  page,
}) => {
  await page.goto("https://agencies-dev.pelni.co.id/en/article");

  await page.getByRole("heading", { name: "Article" }).click();
  const cards = page.locator(".SingleCard_card__uT6Hb");

  // Verifikasi jumlah card
  await expect(cards).toHaveCount(9);
  await page.screenshot({ fullPage: true });
});

test("Mengecek Jumlah Count Card/Grids Pada Halaman Siaran Pers ", async ({
  page,
}) => {
  await page.goto("https://agencies-dev.pelni.co.id/id/press-release");

  await page.getByRole("heading", { name: "Siaran Pers" }).click();
  const cards = page.locator(".SingleCard_card__uT6Hb");

  // Verifikasi jumlah card
  await expect(cards).toHaveCount(8);
  await page.screenshot({ fullPage: true });
});

test("Input Form Ajukan Penawaran", async ({ page }) => {
  await page.goto("https://agencies-dev.pelni.co.id/id");

  await page.getByRole("link", { name: "Ajukan Penawaran" }).click();
  await page.getByRole("textbox", { name: "Nama Depan Anda" }).click();
  await page.getByRole("textbox", { name: "Nama Depan Anda" }).fill("Testing");
  await page.getByRole("textbox", { name: "Nama Belakang Anda" }).click();
  await page.getByRole("textbox", { name: "Nama Belakang Anda" }).fill("Pelni");
  await page.getByRole("textbox", { name: "Perusahaan" }).click();
  await page
    .getByRole("textbox", { name: "Perusahaan" })
    .fill("Testing Perusahaan");
  await page.getByRole("textbox", { name: "Email Anda" }).click();
  await page
    .getByRole("textbox", { name: "Email Anda" })
    .fill("testingpelni@gmail.com");
  await page.getByRole("textbox", { name: "Nomor Kontak" }).click();
  await page
    .getByRole("textbox", { name: "Nomor Kontak" })
    .fill("08777671761671");
  await page.getByRole("textbox", { name: "Nomor Kontak" }).press("Tab");
  await page
    .locator("#contact form div")
    .filter({ hasText: "Lokasi untuk LayananLokasi" })
    .nth(1)
    .click();
  await page.locator("#locations_for_service").selectOption("Makassar");
  await page
    .getByLabel("Jenis Layanan")
    .selectOption("c2ca9e2e-1a03-11f0-a3fd-2633e355b619");
  await page.getByRole("textbox", { name: "Masukkan Pesan Anda" }).click();
  await page
    .getByRole("textbox", { name: "Masukkan Pesan Anda" })
    .fill("Testing Pesan Anda");
  await page.getByRole("button", { name: "Kirim" }).click();
  await page.waitForLoadState();
  await page.getByRole("button", { name: "Ok" }).click();
  await page.waitForTimeout(20000);
});

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

test("Validasi Form ajukan Penawaran, input No Telp. dengan huruf  ", async ({
  page,
}) => {
  await page.goto("https://agencies-dev.pelni.co.id/id");

  await page.getByRole("link", { name: "Ajukan Penawaran" }).click();
  await page.getByRole("textbox", { name: "Nama Depan Anda" }).click();
  await page.getByRole("textbox", { name: "Nama Depan Anda" }).fill("Testing");
  await page.getByRole("textbox", { name: "Nama Belakang Anda" }).click();
  await page.getByRole("textbox", { name: "Nama Belakang Anda" }).fill("Pelni");
  await page.getByRole("textbox", { name: "Perusahaan" }).click();
  await page
    .getByRole("textbox", { name: "Perusahaan" })
    .fill("Testing Perusahaan");
  await page.getByRole("textbox", { name: "Email Anda" }).click();
  await page.getByRole("textbox", { name: "Email Anda" }).fill("testingpeln");
  await page.getByRole("textbox", { name: "Nomor Kontak" }).click();
  await page
    .getByRole("textbox", { name: "Nomor Kontak" })
    .fill("no Telp Huruf");
  await page.getByRole("textbox", { name: "Nomor Kontak" }).press("Tab");
  await page
    .locator("#contact form div")
    .filter({ hasText: "Lokasi untuk LayananLokasi" })
    .nth(1)
    .click();
  await page.locator("#locations_for_service").selectOption("Makassar");
  await page
    .getByLabel("Jenis Layanan")
    .selectOption("c2ca9e2e-1a03-11f0-a3fd-2633e355b619");
  await page.getByRole("textbox", { name: "Masukkan Pesan Anda" }).click();
  await page
    .getByRole("textbox", { name: "Masukkan Pesan Anda" })
    .fill("Testing Pesan Anda");
  await page.getByRole("button", { name: "Kirim" }).click();
  await page.waitForLoadState();
  const isValid = await page.$eval('input[type="tel"]', (input) =>
    input.checkValidity()
  );
  expect(isValid).toBe(false); // input tidak valid

  const message = await page.$eval(
    'input[type="tel"]',
    (input) => input.validationMessage
  );
  //   expect(message).toContain(
  //     "Please include an '@' in the email address. 'testingpeln' is missing an '@'."
  //   );
  console.log(message);
  await page.waitForTimeout(2000);
  await page.screenshot();
});

test("Input semua Field dengan benar di Form ajukan penawaran kecuali Email  ", async ({
  page,
}) => {
  await page.goto("https://agencies-dev.pelni.co.id/id");

  await page.getByRole("link", { name: "Ajukan Penawaran" }).click();
  await page.getByRole("textbox", { name: "Nama Depan Anda" }).click();
  await page.getByRole("textbox", { name: "Nama Depan Anda" }).fill("Testing");
  await page.getByRole("textbox", { name: "Nama Belakang Anda" }).click();
  await page.getByRole("textbox", { name: "Nama Belakang Anda" }).fill("Pelni");
  await page.getByRole("textbox", { name: "Perusahaan" }).click();
  await page
    .getByRole("textbox", { name: "Perusahaan" })
    .fill("Testing Perusahaan");
  await page.getByRole("textbox", { name: "Email Anda" }).click();
  await page.getByRole("textbox", { name: "Email Anda" }).fill("testingpeln");
  await page.getByRole("textbox", { name: "Nomor Kontak" }).click();
  await page
    .getByRole("textbox", { name: "Nomor Kontak" })
    .fill("08777671761671");
  await page.getByRole("textbox", { name: "Nomor Kontak" }).press("Tab");
  await page
    .locator("#contact form div")
    .filter({ hasText: "Lokasi untuk LayananLokasi" })
    .nth(1)
    .click();
  await page.locator("#locations_for_service").selectOption("Makassar");
  await page
    .getByLabel("Jenis Layanan")
    .selectOption("c2ca9e2e-1a03-11f0-a3fd-2633e355b619");
  await page.getByRole("textbox", { name: "Masukkan Pesan Anda" }).click();
  await page
    .getByRole("textbox", { name: "Masukkan Pesan Anda" })
    .fill("Testing Pesan Anda");
  await page.getByRole("button", { name: "Kirim" }).click();
  await page.waitForLoadState();
  const isValid = await page.$eval('input[type="email"]', (input) =>
    input.checkValidity()
  );
  expect(isValid).toBe(false); // input tidak valid

  const message = await page.$eval(
    'input[type="email"]',
    (input) => input.validationMessage
  );
  expect(message).toContain(
    "Please include an '@' in the email address. 'testingpeln' is missing an '@'."
  );
  await page.waitForTimeout(2000);
  await page.screenshot();
});

test.afterEach(async ({ page }, testInfo) => {
  if (
    testInfo.status !== testInfo.expectedStatus ||
    process.env.FORCE_SCREENSHOT === "1"
  ) {
    const screenshot = await page.screenshot({ fullPage: true });
    await testInfo.attach("Full Page Screenshot", {
      body: screenshot,
      contentType: "image/png",
    });
  }
});
