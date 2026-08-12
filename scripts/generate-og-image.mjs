/**
 * Generates public/og-image.png — the 1200×630 card every social platform
 * crops link previews to. Run with `node scripts/generate-og-image.mjs`
 * after changing the crest or the branding; the PNG is committed so the
 * build has no dependency on this script.
 *
 * Built from assets we already own: the real KSOU crest on the brand blue.
 * The wordmark is drawn as SVG text in DM Serif Display / DM Sans, loaded
 * from the self-hosted @fontsource packages in node_modules — the same
 * files the site itself serves, so the card matches the site rather than
 * falling back to whatever the renderer's default serif happens to be.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const CREST = path.join(ROOT, 'src/assets/ksou-crest.jpeg');
const OUT = path.join(ROOT, 'public/og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;
const BRAND_BLUE = '#4169E1';
const CREST_SIZE = 190;

const FONTS = {
  serif: 'node_modules/@fontsource/dm-serif-display/files/dm-serif-display-latin-400-normal.woff2',
  sans: 'node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2',
};

function embedFont(relPath, family) {
  const file = path.join(ROOT, relPath);
  if (!fs.existsSync(file)) {
    console.warn(`  ! font not found, falling back to a generic family: ${relPath}`);
    return '';
  }
  const data = fs.readFileSync(file).toString('base64');
  return `@font-face{font-family:'${family}';src:url(data:font/woff2;base64,${data}) format('woff2');}`;
}

// The crest is a JPEG with a white background; rounding it into a white
// circle hides the square edge against the blue rather than leaving a hard
// rectangle floating on the card.
const crest = await sharp(CREST)
  .resize(CREST_SIZE, CREST_SIZE, { fit: 'contain', background: '#ffffff' })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${CREST_SIZE}" height="${CREST_SIZE}"><circle cx="${CREST_SIZE / 2}" cy="${CREST_SIZE / 2}" r="${CREST_SIZE / 2}" fill="#fff"/></svg>`,
      ),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();

const svg = `<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      ${embedFont(FONTS.serif, 'DM Serif Display')}
      ${embedFont(FONTS.sans, 'DM Sans')}
    </style>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4E77EE"/>
      <stop offset="55%" stop-color="${BRAND_BLUE}"/>
      <stop offset="100%" stop-color="#2F4FB8"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>

  <!-- Soft depth, echoing the site's oversized decorative arcs -->
  <circle cx="1080" cy="70" r="300" fill="#ffffff" opacity="0.055"/>
  <circle cx="130" cy="580" r="240" fill="#ffffff" opacity="0.045"/>

  <text x="${WIDTH / 2}" y="428" text-anchor="middle"
        font-family="DM Serif Display, Georgia, serif" font-size="76" fill="#ffffff">KSOU Online</text>

  <text x="${WIDTH / 2}" y="486" text-anchor="middle"
        font-family="DM Sans, Segoe UI, sans-serif" font-size="29" fill="#ffffff" opacity="0.9"
        letter-spacing="0.4">Karnataka State Open University</text>

  <rect x="${WIDTH / 2 - 40}" y="522" width="80" height="3" rx="1.5" fill="#C9A227"/>

  <text x="${WIDTH / 2}" y="576" text-anchor="middle"
        font-family="DM Sans, Segoe UI, sans-serif" font-size="25" fill="#ffffff" opacity="0.82"
        letter-spacing="0.6">UGC Approved &#183; NAAC A+ &#183; Online UG &amp; PG Degrees</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([{ input: crest, top: 118, left: Math.round((WIDTH - CREST_SIZE) / 2) }])
  .png()
  .toFile(OUT);

const { size } = fs.statSync(OUT);
const meta = await sharp(OUT).metadata();
console.log(`og-image.png written: ${meta.width}x${meta.height}, ${(size / 1024).toFixed(0)}KB`);
