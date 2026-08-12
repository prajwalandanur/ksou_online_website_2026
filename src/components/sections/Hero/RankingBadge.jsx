/**
 * The ranking ribbon that sits over the hero photo.
 *
 * The metallic look is a multi-stop linear gradient rather than a flat fill:
 * light → mid → deep → light again across the diagonal is what reads as
 * brushed metal, where a single colour reads as plain yellow. The inset ring
 * supplies the bevel and the drop shadow lifts it off the photo.
 *
 * Type is navy, never white — navy clears 5:1 against even the darkest band
 * of the gradient (#b8901f), while white would fall under 2:1 on the light
 * bands. The whole badge is real content, not decoration, so it stays in the
 * accessibility tree.
 *
 * Placement: inside the photo's top-left on mobile, jutting slightly past
 * the left edge from `sm` up. Top-left is the safe corner — the student is
 * framed on the right of this photo, so the badge only ever covers sky and
 * roofline.
 *
 * **The claim is sourced.** It reads off the Ministry of Education's own
 * NIRF table for the Open University category, where KSOU (IR-V-U-0228,
 * Mysore) is rank 2:
 * https://www.nirfindia.org/Rankings/2025/OPENUNIVERSITYRanking.html
 * The year is part of the visible text on purpose — a bare "#2" would keep
 * reading as current after the next edition publishes. NIRF 2026 had not
 * been released as of August 2026 (that year's URL 404s); **when it is,
 * re-check this rank and bump the year, or drop the badge.** The wording it
 * replaced ("#Top 8th in State Universities") had no source anywhere in the
 * repo, and a wrong ranking on a government university's site is not a
 * cosmetic error — do not reintroduce an uncited claim here.
 */
export function RankingBadge() {
  return (
    <div className="absolute left-3 top-3 z-10 sm:-left-3 sm:top-6">
      <p className="rounded-[14px] border border-[#a67f14]/45 bg-[linear-gradient(135deg,#f9edb8_0%,#e6c866_20%,#c9a227_46%,#f4e2a0_60%,#b8901f_84%,#e0c778_100%)] px-3 py-1.5 text-[11.5px] font-bold tracking-tight text-navy shadow-[0_1px_1px_rgba(255,255,255,0.5)_inset,0_8px_18px_-6px_rgba(17,17,17,0.45)] sm:px-4 sm:py-2 sm:text-[13px]">
        NIRF 2025 · #2 Open University
      </p>
    </div>
  );
}
