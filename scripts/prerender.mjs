/**
 * Post-build pre-rendering.
 *
 * The site is a client-rendered SPA, so a crawler fetching /programmes/mba
 * receives `<div id="root"></div>` and nothing else. Google executes JS and
 * mostly copes; the AI crawlers this project explicitly courts in robots.txt
 * and llms.txt (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) largely do
 * not. This walks every real route in headless Chromium after the build and
 * writes the rendered HTML back into dist/ as static files.
 *
 * Built on the Playwright already in devDependencies rather than
 * vite-plugin-prerender (webpack/Vue lineage, unmaintained, no Vite 8
 * support) or react-snap (unmaintained since ~2020, old Puppeteer, known
 * React 18+ hydration problems). Roughly 60 lines we control beats a
 * dependency we'd have to fight.
 *
 * Output shape: `/programmes/mba` -> `dist/programmes/mba/index.html`, which
 * is what static hosts (including Vercel) serve for that path. The original
 * dist/index.html is overwritten with the rendered homepage, so the SPA
 * fallback also ships real content.
 *
 * The React app still boots and hydrates over this markup on a real visit —
 * these files are a pre-painted first frame, not a replacement for the app.
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = 4178;

/**
 * The subpath the site is deployed under, read from the real Vite config so
 * it cannot drift from the build the app actually ships.
 *
 * This is load-bearing, not tidiness. React Router runs with a `basename`,
 * so it only matches URLs that begin with the base. Navigating this headless
 * browser to `/about` when the app expects `/ksou_test/about` matches no
 * route at all — every page would render the "Page not found" catch-all and
 * be written to disk as a real, deployable file. It would also pass the
 * length check below, because that page has text. Silent, and served to
 * every crawler.
 *
 * `BASE` keeps the trailing slash ('/ksou_test/'); `BASE_PREFIX` drops it
 * for joining onto route paths that already start with one.
 */
const BASE = (await import(`file://${path.join(ROOT, 'vite.config.js')}`)).default.base || '/';
const BASE_PREFIX = BASE.replace(/\/+$/, '');

const ROUTES = [
  '/',
  '/about',
  '/announcements',
  '/contact',
  '/programmes',
  '/blogs',
  '/blogs/career-options-after-bcom-degree',
  '/blogs/how-to-choose-right-online-degree-after-graduation',
  '/blogs/online-degree-while-working-full-time',
  '/blogs/online-learning-guide-admission-to-graduation',
  '/blogs/online-degree-vs-traditional-degree',
  '/blogs/how-to-create-abc-id-and-deb-id',
  '/programmes/mba',
  '/programmes/ba',
  '/programmes/bcom',
  '/programmes/mcom',
  '/programmes/ma',
  '/programmes/msc-mathematics',

  // Kannada tree. Only the routes that actually have Kannada content — see
  // KANNADA_ROUTE_PATTERNS in src/i18n/language.js. These must be listed
  // explicitly: language comes from the URL, so each one renders its own
  // static HTML with Kannada text in the markup. Without them the /kn pages
  // would exist only after JavaScript runs, which is the whole thing this
  // pre-render step is here to avoid.
  '/kn',
  '/kn/about',
  '/kn/programmes',
  '/kn/programmes/mba',
  '/kn/programmes/ba',
  '/kn/programmes/bcom',
  '/kn/programmes/mcom',
  '/kn/programmes/ma',
  '/kn/programmes/msc-mathematics',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

// Minimal static server with SPA fallback — the app must resolve its own
// routes client-side for us to capture them.
const server = http.createServer((req, res) => {
  const requested = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);

  // The built HTML asks for /ksou_test/assets/…, but dist/ has no ksou_test
  // folder — it *is* that folder. Strip the base to map a deployed URL onto
  // the file that will serve it, so the pre-render sees the same bytes IIS
  // will later hand to a visitor.
  const urlPath =
    BASE_PREFIX && requested.startsWith(BASE_PREFIX)
      ? requested.slice(BASE_PREFIX.length) || '/'
      : requested;

  let filePath = path.join(DIST, urlPath);

  if (!filePath.startsWith(DIST)) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html');
  }

  res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] ?? 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

await new Promise((resolve) => server.listen(PORT, resolve));

/**
 * Fail-soft on a missing browser, fail-hard on a bad render.
 *
 * This runs inside `npm run build`, which is also what the host runs on
 * deploy — and a CI image may have the `playwright` package without the
 * Chromium binary (it is a ~130MB post-install download). Hard-failing there
 * would break every deploy over an optimisation, so a launch failure warns
 * loudly and ships the un-prerendered SPA, exactly as the site behaved
 * before this script existed. To get pre-rendering in CI, run
 * `npx playwright install chromium` before the build.
 *
 * An *empty render* is a different matter — that is a bug in the app, not
 * the environment, and it exits non-zero below.
 */
let browser;
try {
  browser = await chromium.launch();
} catch (error) {
  server.close();
  console.warn('\n  ! Skipping pre-rendering: could not launch Chromium.');
  console.warn(`  ! ${error.message.split('\n')[0]}`);
  console.warn('  ! The build still succeeds, but crawlers will receive an empty');
  console.warn('  ! <div id="root"> for every route. Run `npx playwright install');
  console.warn('  ! chromium` in this environment to enable pre-rendering.\n');
  process.exit(0);
}
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

/**
 * Tells the app it is being pre-rendered, so timed interruptions stay out of
 * the static HTML. Only the enquiry popup reads it today: `networkidle`
 * normally settles in a second or two, far inside that popup's 25s timer, but
 * the goto above allows up to 45s — and a single slow route would otherwise
 * bake an open modal into a file every visitor and every crawler receives.
 * Set as an init script so it exists before any app code runs.
 */
await page.addInitScript(() => {
  window.__KSOU_PRERENDER__ = true;
});

/*
 * Keep the build out of Google Analytics.
 *
 * index.html loads gtag.js, which sends a page_view on load. Without this,
 * every `npm run build` would report 27 pageviews from the build machine —
 * quietly inflating traffic and, worse, corrupting landing-page and
 * conversion-rate figures for exactly the routes the site cares about.
 *
 * Aborting the request also removes a third-party round trip from
 * `networkidle`, so the pre-render is faster as well. The inline gtag stub in
 * index.html still defines the function, so nothing on the page throws when
 * the library never arrives.
 */
await page.route('**://www.googletagmanager.com/**', (route) => route.abort());

const failures = [];
let written = 0;

for (const route of ROUTES) {
  try {
    await page.goto(`http://localhost:${PORT}${BASE_PREFIX}${route}`, {
      waitUntil: 'networkidle',
      timeout: 45000,
    });
    // The app renders a <main> on every real route; waiting for it is a far
    // better readiness signal than a fixed sleep.
    await page.waitForSelector('main', { timeout: 15000 });

    const html = await page.content();

    // Guard against silently writing an empty shell — that is the exact
    // failure this script exists to prevent, and it must not pass quietly.
    const bodyText = await page.evaluate(() => document.querySelector('main')?.innerText?.trim() ?? '');
    if (bodyText.length < 200) {
      failures.push(`${route}: rendered <main> had only ${bodyText.length} chars of text`);
      continue;
    }

    const outDir = route === '/' ? DIST : path.join(DIST, route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

    written += 1;
    console.log(`  ${route.padEnd(58)} ${(html.length / 1024).toFixed(0)}KB`);
  } catch (error) {
    failures.push(`${route}: ${error.message.split('\n')[0]}`);
  }
}

await browser.close();
server.close();

console.log(`\nPre-rendered ${written}/${ROUTES.length} routes.`);

if (failures.length) {
  console.error(`\nFAILED:\n${failures.map((f) => `  ${f}`).join('\n')}`);
  process.exit(1);
}
