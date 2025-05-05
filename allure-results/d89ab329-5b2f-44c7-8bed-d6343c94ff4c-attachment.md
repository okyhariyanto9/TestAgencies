# Test info

- Name: Input Form Ajukan Penawaran
- Location: /Users/okyhariyanto/Nextcloud3/APP-Oks/CoursePlaywright/AMPerintis/tests/agencies.spec.js:208:5

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Ok' })

    at /Users/okyhariyanto/Nextcloud3/APP-Oks/CoursePlaywright/AMPerintis/tests/agencies.spec.js:244:50
```

# Page snapshot

```yaml
- dialog "Oops!":
  - heading "Oops!" [level=2]
  - text: Captcha verification failed
  - button "Try Again"
```

# Test source

```ts
  144 |   ];
  145 |   await page.goto("https://agencies-dev.pelni.co.id/en");
  146 |   const menuUtama = page.getByText("Service", { exact: true });
  147 |   await menuUtama.hover();
  148 |   for (const submenu of submenus) {
  149 |     const Menus = page.getByRole("link", { name: `${submenu}` });
  150 |     const screenshot = await page.screenshot();
  151 |     allure.attachment(
  152 |       `Screenshot Halaman ${submenu} `,
  153 |       screenshot,
  154 |       "image/png"
  155 |     );
  156 |     await expect(Menus).toBeVisible();
  157 |   }
  158 | });
  159 |
  160 | test("Input Ajukan Penawaran", async ({ page }) => {
  161 |   await page.goto("https://agencies-dev.pelni.co.id/en");
  162 |   await page.getByRole("link", { name: "Branch" }).click();
  163 |   await page.locator(".css-19bb58m").click();
  164 |   await page.getByText("SEMARANGKARIMUN JAWA").click();
  165 |   await page.getByRole("button", { name: "Detail" }).click();
  166 |   const headingCabang = page.getByRole("heading", { name: "KARIMUN JAWA" });
  167 |   await expect(headingCabang).toHaveText("KARIMUN JAWA");
  168 | });
  169 |
  170 | test("Memverifikasi Marker Maps Cabang Ketika DiHover Muncul Detailnya", async ({
  171 |   page,
  172 | }) => {
  173 |   await page.goto("https://agencies-dev.pelni.co.id/en");
  174 |   await page.getByRole("link", { name: "Branch" }).click();
  175 |   await page.locator(".css-zvi4ix > div").click();
  176 |   await page.locator("div:nth-child(4) > img:nth-child(38)").click();
  177 |   await page.locator("div:nth-child(4) > img:nth-child(38)").hover();
  178 |   const markerVis = page.locator(".leaflet-popup-content");
  179 |   await expect(markerVis).toBeVisible();
  180 | });
  181 |
  182 | test("Mengecek Jumlah Count Card/Grids Pada Halaman Artikel", async ({
  183 |   page,
  184 | }) => {
  185 |   await page.goto("https://agencies-dev.pelni.co.id/en/article");
  186 |
  187 |   await page.getByRole("heading", { name: "Article" }).click();
  188 |   const cards = page.locator(".SingleCard_card__uT6Hb");
  189 |
  190 |   // Verifikasi jumlah card
  191 |   await expect(cards).toHaveCount(9);
  192 |   await page.screenshot({ fullPage: true });
  193 | });
  194 |
  195 | test("Mengecek Jumlah Count Card/Grids Pada Halaman Siaran Pers ", async ({
  196 |   page,
  197 | }) => {
  198 |   await page.goto("https://agencies-dev.pelni.co.id/id/press-release");
  199 |
  200 |   await page.getByRole("heading", { name: "Siaran Pers" }).click();
  201 |   const cards = page.locator(".SingleCard_card__uT6Hb");
  202 |
  203 |   // Verifikasi jumlah card
  204 |   await expect(cards).toHaveCount(8);
  205 |   await page.screenshot({ fullPage: true });
  206 | });
  207 |
  208 | test("Input Form Ajukan Penawaran", async ({ page }) => {
  209 |   await page.goto("https://agencies-dev.pelni.co.id/id");
  210 |
  211 |   await page.getByRole("link", { name: "Ajukan Penawaran" }).click();
  212 |   await page.getByRole("textbox", { name: "Nama Depan Anda" }).click();
  213 |   await page.getByRole("textbox", { name: "Nama Depan Anda" }).fill("Testing");
  214 |   await page.getByRole("textbox", { name: "Nama Belakang Anda" }).click();
  215 |   await page.getByRole("textbox", { name: "Nama Belakang Anda" }).fill("Pelni");
  216 |   await page.getByRole("textbox", { name: "Perusahaan" }).click();
  217 |   await page
  218 |     .getByRole("textbox", { name: "Perusahaan" })
  219 |     .fill("Testing Perusahaan");
  220 |   await page.getByRole("textbox", { name: "Email Anda" }).click();
  221 |   await page
  222 |     .getByRole("textbox", { name: "Email Anda" })
  223 |     .fill("testingpelni@gmail.com");
  224 |   await page.getByRole("textbox", { name: "Nomor Kontak" }).click();
  225 |   await page
  226 |     .getByRole("textbox", { name: "Nomor Kontak" })
  227 |     .fill("08777671761671");
  228 |   await page.getByRole("textbox", { name: "Nomor Kontak" }).press("Tab");
  229 |   await page
  230 |     .locator("#contact form div")
  231 |     .filter({ hasText: "Lokasi untuk LayananLokasi" })
  232 |     .nth(1)
  233 |     .click();
  234 |   await page.locator("#locations_for_service").selectOption("Makassar");
  235 |   await page
  236 |     .getByLabel("Jenis Layanan")
  237 |     .selectOption("c2ca9e2e-1a03-11f0-a3fd-2633e355b619");
  238 |   await page.getByRole("textbox", { name: "Masukkan Pesan Anda" }).click();
  239 |   await page
  240 |     .getByRole("textbox", { name: "Masukkan Pesan Anda" })
  241 |     .fill("Testing Pesan Anda");
  242 |   await page.getByRole("button", { name: "Kirim" }).click();
  243 |   await page.waitForLoadState();
> 244 |   await page.getByRole("button", { name: "Ok" }).click();
      |                                                  ^ Error: locator.click: Test timeout of 30000ms exceeded.
  245 |   await page.waitForTimeout(20000);
  246 | });
  247 |
  248 | test("Verifikasi semua elemen menggunakan font-lato", async ({ page }) => {
  249 |   await page.goto("https://agencies-dev.pelni.co.id/id"); // Ganti dengan URL halaman Anda
  250 |
  251 |   // Ambil semua elemen pada halaman
  252 |   const elements = await page.$$("body *");
  253 |
  254 |   for (const element of elements) {
  255 |     const fontFamily = await element.evaluate((el) =>
  256 |       window.getComputedStyle(el).getPropertyValue("font-family")
  257 |     );
  258 |
  259 |     // Periksa apakah font-family mengandung 'font-lato'
  260 |     expect(fontFamily).toContain("font-lato");
  261 |   }
  262 | });
  263 |
  264 | test("Validasi Form ajukan Penawaran, input No Telp. dengan huruf  ", async ({
  265 |   page,
  266 | }) => {
  267 |   await page.goto("https://agencies-dev.pelni.co.id/id");
  268 |
  269 |   await page.getByRole("link", { name: "Ajukan Penawaran" }).click();
  270 |   await page.getByRole("textbox", { name: "Nama Depan Anda" }).click();
  271 |   await page.getByRole("textbox", { name: "Nama Depan Anda" }).fill("Testing");
  272 |   await page.getByRole("textbox", { name: "Nama Belakang Anda" }).click();
  273 |   await page.getByRole("textbox", { name: "Nama Belakang Anda" }).fill("Pelni");
  274 |   await page.getByRole("textbox", { name: "Perusahaan" }).click();
  275 |   await page
  276 |     .getByRole("textbox", { name: "Perusahaan" })
  277 |     .fill("Testing Perusahaan");
  278 |   await page.getByRole("textbox", { name: "Email Anda" }).click();
  279 |   await page.getByRole("textbox", { name: "Email Anda" }).fill("testingpeln");
  280 |   await page.getByRole("textbox", { name: "Nomor Kontak" }).click();
  281 |   await page
  282 |     .getByRole("textbox", { name: "Nomor Kontak" })
  283 |     .fill("no Telp Huruf");
  284 |   await page.getByRole("textbox", { name: "Nomor Kontak" }).press("Tab");
  285 |   await page
  286 |     .locator("#contact form div")
  287 |     .filter({ hasText: "Lokasi untuk LayananLokasi" })
  288 |     .nth(1)
  289 |     .click();
  290 |   await page.locator("#locations_for_service").selectOption("Makassar");
  291 |   await page
  292 |     .getByLabel("Jenis Layanan")
  293 |     .selectOption("c2ca9e2e-1a03-11f0-a3fd-2633e355b619");
  294 |   await page.getByRole("textbox", { name: "Masukkan Pesan Anda" }).click();
  295 |   await page
  296 |     .getByRole("textbox", { name: "Masukkan Pesan Anda" })
  297 |     .fill("Testing Pesan Anda");
  298 |   await page.getByRole("button", { name: "Kirim" }).click();
  299 |   await page.waitForLoadState();
  300 |   const isValid = await page.$eval('input[type="tel"]', (input) =>
  301 |     input.checkValidity()
  302 |   );
  303 |   expect(isValid).toBe(false); // input tidak valid
  304 |
  305 |   const message = await page.$eval(
  306 |     'input[type="tel"]',
  307 |     (input) => input.validationMessage
  308 |   );
  309 |   //   expect(message).toContain(
  310 |   //     "Please include an '@' in the email address. 'testingpeln' is missing an '@'."
  311 |   //   );
  312 |   console.log(message);
  313 |   await page.waitForTimeout(2000);
  314 |   await page.screenshot();
  315 | });
  316 |
  317 | test("Input semua Field dengan benar di Form ajukan penawaran kecuali Email  ", async ({
  318 |   page,
  319 | }) => {
  320 |   await page.goto("https://agencies-dev.pelni.co.id/id");
  321 |
  322 |   await page.getByRole("link", { name: "Ajukan Penawaran" }).click();
  323 |   await page.getByRole("textbox", { name: "Nama Depan Anda" }).click();
  324 |   await page.getByRole("textbox", { name: "Nama Depan Anda" }).fill("Testing");
  325 |   await page.getByRole("textbox", { name: "Nama Belakang Anda" }).click();
  326 |   await page.getByRole("textbox", { name: "Nama Belakang Anda" }).fill("Pelni");
  327 |   await page.getByRole("textbox", { name: "Perusahaan" }).click();
  328 |   await page
  329 |     .getByRole("textbox", { name: "Perusahaan" })
  330 |     .fill("Testing Perusahaan");
  331 |   await page.getByRole("textbox", { name: "Email Anda" }).click();
  332 |   await page.getByRole("textbox", { name: "Email Anda" }).fill("testingpeln");
  333 |   await page.getByRole("textbox", { name: "Nomor Kontak" }).click();
  334 |   await page
  335 |     .getByRole("textbox", { name: "Nomor Kontak" })
  336 |     .fill("08777671761671");
  337 |   await page.getByRole("textbox", { name: "Nomor Kontak" }).press("Tab");
  338 |   await page
  339 |     .locator("#contact form div")
  340 |     .filter({ hasText: "Lokasi untuk LayananLokasi" })
  341 |     .nth(1)
  342 |     .click();
  343 |   await page.locator("#locations_for_service").selectOption("Makassar");
  344 |   await page
```