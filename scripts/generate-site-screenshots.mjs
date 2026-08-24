/**
 * Captures the "new KSOU Online website" screenshot used by the About
 * page's digital-evolution section (src/components/sections/About/
 * AboutDigitalExperience.jsx).
 *
 * Why a script rather than a stock mockup: that section's whole claim is
 * "here is the new digital front door" — an invented interface, or a generic
 * laptop-on-a-desk photograph, would be showing the visitor something that
 * isn't the product. This is a real capture of this codebase's own
 * homepage, so the section can only ever show what actually shipped.
 *
 * Outputs are committed (like the favicons and the OG card) so `npm run
 * build` never depends on this running. **Re-run it after any visible change
 * to the homepage**, or the About page advertises a stale interface:
 *
 *     npm run dev                 # in one terminal
 *     npm run shots:site          # in another
 *
 * It is a viewport capture, not a `fullPage` one: it renders small inside a
 * browser frame, and a full-page capture of a long homepage would reduce to
 * an unreadable sliver. Device-scale-factor 2 keeps it crisp on the retina
 * displays the site is mostly viewed on.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'src/assets/about');
const BASE_URL = process.env.QA_BASE_URL ?? 'http://localhost:5173';
const QUALITY = 82;

/**
 * `reducedMotion: 'reduce'`, and not just to settle the
 * entrance transitions. The announcement ticker is a real `scrollLeft`
 * marquee, so a capture lands wherever it happens to be — the first pass
 * caught it mid-word ("…ation View PDF"), which reads as a rendering bug in
 * a screenshot meant to show the site at its best. Under reduced motion the
 * ticker drops to its static single-notice fallback (see AnnouncementTicker)
 * and every Framer transition resolves to its final state, so the capture is
 * deterministic rather than a race.
 */
const REDUCED_MOTION = { reducedMotion: 'reduce' };

const SHOTS = [
  {
    name: 'website-desktop',
    // 1440x900 is the shape the frame in the component is drawn to (16:10).
    context: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, ...REDUCED_MOTION },
    // The desktop frame renders ~720 CSS px wide; 1440 covers 2x DPR.
    outputWidth: 1440,
  },
  // A `website-mobile` capture (iPhone 13 profile, 780px wide) used to live
  // here for a phone frame overlapping the desktop one. Both were removed on
  // 2026-08-21 by request; restoring the frame means restoring this entry too.
];

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  for (const shot of SHOTS) {
    const context = await browser.newContext(shot.context);
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // The homepage opens with entrance animations and a lead-capture popup on
    // a timer. `networkidle` lands well inside that timer, but the entrance
    // transitions are still settling — a short beat avoids capturing the
    // hero mid-fade.
    await page.waitForTimeout(1200);

    const png = await page.screenshot({ type: 'png' });
    await context.close();

    const output = path.join(OUT_DIR, `${shot.name}.webp`);
    const result = await sharp(png)
      .resize(shot.outputWidth, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(output);

    console.log(`${shot.name}.webp — ${(result.size / 1024).toFixed(0)} KB`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
