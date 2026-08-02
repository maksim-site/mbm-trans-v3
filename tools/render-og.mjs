import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const source = new URL("./og-cover.html", import.meta.url);
const output = fileURLToPath(new URL("../assets/og-cover.jpg", import.meta.url));
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(source.href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: output, type: "jpeg", quality: 92 });
} finally {
  await browser.close();
}
