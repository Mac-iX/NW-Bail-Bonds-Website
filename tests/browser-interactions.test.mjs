import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { chromium } from "playwright";

const baseUrl = process.env.TEST_BASE_URL;
if (!baseUrl) throw new Error("TEST_BASE_URL is required. Run npm run test:browser.");
let browser;
before(async () => {
  browser = await chromium.launch({
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
});
after(async () => { await browser?.close(); });

async function pageFor(pathname, options = {}) {
  const context = await browser.newContext(options);
  await context.addInitScript(() => sessionStorage.setItem("northwest-urgent-contact-dismissed", "true"));
  const page = await context.newPage();
  await page.goto(baseUrl + pathname);
  return { page, context };
}

test("all counties support Enter and Space with one selected county and registry-driven guide links", async () => {
  const { page, context } = await pageFor("/service-areas");
  try {
    const counties = page.locator(".county-shape");
    assert.equal(await counties.count(), 56);
    for (let index = 0; index < 56; index++) {
      const county = counties.nth(index);
      const label = await county.getAttribute("aria-label");
      await county.focus();
      await county.press(index % 2 ? "Space" : "Enter");
      await page.waitForFunction((expected) => document.querySelector(".county-shape.active")?.getAttribute("aria-label") === expected, label);
      assert.equal(await page.locator('.county-shape[aria-pressed="true"]').count(), 1);
      assert.match(await page.locator(".detention-heading h3").innerText(), new RegExp(label.slice(7)));
    }
    for (const [county, slug] of [["Yellowstone", "yellowstone-county-detention-facility"], ["Gallatin", "gallatin-county-detention-center"], ["Cascade", "cascade-county-detention-center"]]) {
      await page.getByRole("button", { name: `Select ${county} County`, exact: true }).press("Enter");
      const card = page.locator(".facility-card").first();
      assert.equal(await card.locator(".facility-name-link").getAttribute("href"), "/jails/" + slug);
      assert.ok(await card.locator('.facility-links a[target="_blank"]').count() > 0);
    }
  } finally { await context.close(); }
});

test("custody dialog traps focus, isolates the page, and restores its opener on every closing path", async () => {
  const { page, context } = await pageFor("/service-areas");
  try {
    const opener = page.getByRole("button", { name: "Contact Joel now" });
    for (const close of ["escape", "button", "backdrop"]) {
      await opener.click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor();
      await page.waitForFunction(() => document.activeElement?.getAttribute("name") === "personName");
      assert.equal(await page.locator("main").evaluate((element) => element.inert), true);
      const controls = dialog.locator("button, input");
      await controls.last().focus();
      await page.keyboard.press("Tab");
      assert.equal(await controls.first().evaluate((element) => element === document.activeElement), true);
      await page.keyboard.press("Shift+Tab");
      assert.equal(await controls.last().evaluate((element) => element === document.activeElement), true);
      await page.locator("main a").first().evaluate((element) => element.focus());
      assert.equal(await dialog.evaluate((element) => element.contains(document.activeElement)), true);
      if (close === "escape") await page.keyboard.press("Escape");
      else if (close === "button") await page.getByRole("button", { name: "Close custody inquiry form" }).click();
      else await page.locator(".custody-intake-backdrop").click({ position: { x: 5, y: 5 } });
      await dialog.waitFor({ state: "detached" });
      assert.equal(await opener.evaluate((element) => element === document.activeElement), true);
      assert.equal(await page.locator("main").evaluate((element) => element.inert), false);
    }
  } finally { await context.close(); }
});

test("facility radios support arrow keys and one keyboard entry point", async () => {
  const { page, context } = await pageFor("/service-areas");
  try {
    await page.getByRole("button", { name: "Select Madison County", exact: true }).press("Enter");
    await page.waitForFunction(() => document.querySelector(".county-shape.active")?.getAttribute("aria-label") === "Select Madison County");
    const radios = page.getByRole("radio");
    assert.ok(await radios.count() > 1);
    await radios.first().focus();
    await page.keyboard.press("ArrowDown");
    assert.equal(await radios.nth(1).getAttribute("aria-checked"), "true");
    assert.equal(await page.locator('[role="radio"][tabindex="0"]').count(), 1);
    await page.keyboard.press("Home");
    assert.equal(await radios.first().getAttribute("aria-checked"), "true");
  } finally { await context.close(); }
});

test("reels respect reduced motion and can be played and paused with the keyboard", async () => {
  const { page, context } = await pageFor("/", { reducedMotion: "reduce" });
  try {
    const video = page.locator(".hero-reel video");
    assert.equal(await video.evaluate((element) => element.paused), true);
    assert.equal(await page.locator(".hero").evaluate((element) => getComputedStyle(element, "::after").animationName), "none");
    const play = page.getByRole("button", { name: "Play the bail bond reel" });
    await play.focus();
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => !document.querySelector(".hero-reel video").paused);
    await page.getByRole("button", { name: "Pause the bail bond reel" }).press("Enter");
    assert.equal(await video.evaluate((element) => element.paused), true);
  } finally { await context.close(); }
});

test("hero backgrounds and image placements remain intact at desktop and mobile widths", async () => {
  for (const width of [1440, 390]) {
    const { page, context } = await pageFor("/", { viewport: { width, height: 900 } });
    try {
      const background = await page.locator(".hero").evaluate((element) => getComputedStyle(element).backgroundImage);
      assert.match(background, /montana-city-hero\.jpeg/);
      assert.doesNotMatch(background, /northwest-hero-art/);
      assert.equal(await page.locator(".hero video").count(), 1);
      assert.ok(await page.locator(".hero video").isVisible());
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), width);
      await page.goto(baseUrl + "/digital-bail-bonds");
      assert.equal(await page.locator(".page-hero video").count(), 1);
      assert.equal(await page.locator('.phone-asset-wide img[src$="answer-call.jpg"]').count(), 1);
      assert.equal(await page.locator('.phone-asset-single img[src$="esignature.jpg"]').count(), 1);
    } finally { await context.close(); }
  }
});
