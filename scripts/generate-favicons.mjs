/**
 * Generates the browser-tab icons from the official KSOU crest.
 *
 * The favicon used to be `public/favicon.svg` — a purple (#863bff) bolt
 * glyph that shipped with the project scaffold and was never replaced. It was
 * also being served as the university's `logo` in the EducationalOrganization
 * JSON-LD, which told Google that KSOU's logo was that bolt.
 *
 * Source is `src/assets/ksou-crest.jpeg`, the same 614x614 crest the navbar
 * and footer use. It is already square and already on white, so every output
 * here is a straight resize — no cropping, padding or recolouring, and
 * therefore no distortion of the emblem.
 *
 * Outputs are committed, so the build never depends on this script. Re-run it
 * only if the crest itself changes:
 *   node scripts/generate-favicons.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE = path.join(ROOT, 'src/assets/ksou-crest.jpeg');
const PUBLIC = path.join(ROOT, 'public');

/**
 * 16/32/48 are the classic tab and bookmark sizes; 180 is Apple's touch
 * icon; 512 is a real logo asset for structured data, which Google wants at
 * 112px or larger and which should not be a 32px favicon.
 */
const PNG_SIZES = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['favicon-48x48.png', 48],
  ['apple-touch-icon.png', 180],
  ['ksou-logo.png', 512],
];

/**
 * Packs PNGs into a multi-resolution .ico.
 *
 * Written by hand rather than pulling in a dependency: the container is a
 * 6-byte header plus one 16-byte directory entry per image, and PNG-inside-ICO
 * is understood by every browser we care about. This exists only so that a
 * bare request for /favicon.ico — which some crawlers and older clients make
 * without reading <link> tags — gets the crest instead of a 404.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    // 0 encodes 256 in this field; our sizes are all smaller, but keep the
    // rule explicit so a future 256px entry does not silently write 0x100.
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette size — 0 for true colour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

const render = (size) =>
  sharp(SOURCE).resize(size, size, { fit: 'contain' }).png({ compressionLevel: 9 }).toBuffer();

for (const [name, size] of PNG_SIZES) {
  const buffer = await render(size);
  fs.writeFileSync(path.join(PUBLIC, name), buffer);
  console.log(`  ${name.padEnd(24)} ${size}x${size}  ${(buffer.length / 1024).toFixed(1)}KB`);
}

const icoSizes = [16, 32, 48];
const ico = buildIco(
  await Promise.all(icoSizes.map(async (size) => ({ size, data: await render(size) }))),
);
fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), ico);
console.log(`  ${'favicon.ico'.padEnd(24)} ${icoSizes.join('/')}  ${(ico.length / 1024).toFixed(1)}KB`);
