import { test, expect } from "@playwright/test";
import { checkSocialIcons } from "../utils/footerSocialMedia";
import { allure } from "allure-playwright";

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
    const screenshot = await page.screenshot();
    allure.attachment(`Screenshot Halaman ${url} `, screenshot, "image/png");
  });
}

// test("test", async ({ page }) => {
//   await page.goto("https://agencies-dev.pelni.co.id/en");
//  await page.goto('https://agencies-dev.pelni.co.id/id');
//  await page.getByRole('link', { name: 'linkedin' }).click();
//  await page.getByRole('link', { name: 'facebook' }).click();
//  await page.locator('#login_popup_cta_form img').click();

//  await page.goto('https://agencies-dev.pelni.co.id/id');
//  await page.getByRole('link', { name: 'instagram' }).click();

//  https://www.instagram.com/accounts/login/?next=%2Fpelniagencies%2F&source=omni_redirect
// });

// mailto
