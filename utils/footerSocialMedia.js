const { expect } = require("@playwright/test");

async function checkSocialIcons(page) {
  const socialLabels = ["mailto", "linkedin", "facebook", "instagram"];

  for (const label of socialLabels) {
    const locator = page.locator(`a[aria-label="${label}"]`);
    await expect(locator).toBeVisible();
  }
}

module.exports = { checkSocialIcons };
