// Reliable mobile-viewport QA screenshots via Playwright's device emulation
// (CDP viewport override), bypassing the claude-in-chrome extension's
// resize_window tool — that tool resizes the real OS browser window via
// chrome.windows.update(), which silently no-ops when the window is
// maximized (Chrome ignores width/height while state stays "maximized").
// Playwright's emulation never touches the OS window at all, so it can't
// hit that bug.
import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.QA_BASE_URL ?? 'http://localhost:5173';
const OUT_DIR = path.join(__dirname, '..', 'qa-screenshots', 'mobile');

const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'programme-mba', path: '/programmes/mba' },
  { name: 'programme-ba', path: '/programmes/ba' },
  { name: 'programme-bcom', path: '/programmes/bcom' },
  { name: 'programme-mcom', path: '/programmes/mcom' },
  { name: 'programme-msc-mathematics', path: '/programmes/msc-mathematics' },
  { name: 'programme-ma', path: '/programmes/ma' },
  { name: 'blog-listing', path: '/blogs' },
  { name: 'blog-career-options-after-bcom-degree', path: '/blogs/career-options-after-bcom-degree' },
  {
    name: 'blog-how-to-choose-right-online-degree-after-graduation',
    path: '/blogs/how-to-choose-right-online-degree-after-graduation',
  },
  { name: 'blog-online-degree-while-working-full-time', path: '/blogs/online-degree-while-working-full-time' },
  {
    name: 'blog-online-learning-guide-admission-to-graduation',
    path: '/blogs/online-learning-guide-admission-to-graduation',
  },
  { name: 'blog-online-degree-vs-traditional-degree', path: '/blogs/online-degree-vs-traditional-degree' },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ ...devices['iPhone 13'] });
  const page = await context.newPage();

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route.path}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const filePath = path.join(OUT_DIR, `${route.name}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
    console.log(`Saved ${filePath}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
