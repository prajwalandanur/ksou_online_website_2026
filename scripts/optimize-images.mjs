/**
 * Converts the course photography in src/assets/courses/ from PNG to WebP.
 *
 * These are the site's heaviest assets by a wide margin (1.8–2.1MB each) and
 * they are above the fold twice over: as homepage course cards and as the
 * hero image on every programme detail page. They were the single biggest
 * LCP cost on the site.
 *
 * Width is 1200px, not the 800px a first pass might suggest. The programme
 * hero renders ~547 CSS px and the mobile card ~390 CSS px, but phones are
 * commonly 3x DPR — ~1170 device pixels — so 800px would visibly soften on
 * exactly the devices most visitors use. At quality 82 the difference
 * between 800 and 1200 is a few tens of KB against a ~95% saving either way.
 *
 * The source PNGs are deliberately left in place. Re-running this script is
 * idempotent, and keeping the originals means a future re-encode does not
 * have to go through git history.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const COURSES_DIR = path.resolve(import.meta.dirname, '../src/assets/courses');
const TARGET_WIDTH = 1200;
const QUALITY = 82;

const files = fs.readdirSync(COURSES_DIR).filter((f) => f.endsWith('.png'));

if (!files.length) {
  console.log('No PNGs found in src/assets/courses — nothing to do.');
  process.exit(0);
}

let before = 0;
let after = 0;

for (const file of files) {
  const input = path.join(COURSES_DIR, file);
  const output = path.join(COURSES_DIR, file.replace(/\.png$/, '.webp'));

  const result = await sharp(input)
    // `withoutEnlargement` so a source narrower than 1200px is never
    // upscaled into a blurrier, larger file.
    .resize(TARGET_WIDTH, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);

  const originalSize = fs.statSync(input).size;
  before += originalSize;
  after += result.size;

  console.log(
    `${file.padEnd(10)} ${(originalSize / 1024 / 1024).toFixed(1)}MB -> ` +
      `${(result.size / 1024).toFixed(0)}KB  (${result.width}x${result.height})`,
  );
}

const saved = ((1 - after / before) * 100).toFixed(1);
console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB (${saved}% smaller)`,
);
console.log('The .png sources are kept on purpose — see the note at the top of this file.');
