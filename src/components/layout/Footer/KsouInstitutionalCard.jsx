import { ArrowUpRight } from 'lucide-react';
import crest from '@/assets/ksou-crest.jpeg';
import { KSOU_MAIN_WEBSITE_URL } from '@/constants/footer';

/**
 * Establishes KSOU Online as the parent university's online platform rather
 * than a separate brand. Deliberately understated — a single bordered row,
 * not a second logo lockup — so it supports the KSOU Online identity above
 * it instead of competing with it.
 *
 * The crest is `alt=""`/aria-hidden because the adjacent text already names
 * the university; a duplicate label would just be read out twice.
 */
export function KsouInstitutionalCard() {
  return (
    <a
      href={KSOU_MAIN_WEBSITE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-fit items-center gap-3 rounded-2xl border border-border px-3.5 py-3 transition-colors duration-200 hover:border-primary/30 hover:bg-ice/60"
    >
      <img
        src={crest}
        alt=""
        aria-hidden="true"
        className="h-9 w-9 shrink-0 object-contain"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-[13px] font-semibold leading-tight text-navy">
          Karnataka State Open University
        </span>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground transition-colors duration-200 group-hover:text-primary">
          Visit Official Website
          <ArrowUpRight
            className="h-3 w-3 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </span>
    </a>
  );
}
