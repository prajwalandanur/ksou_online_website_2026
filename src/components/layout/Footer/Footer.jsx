import { Logo } from '@/components/common/Logo';
import { FOOTER_LINK_COLUMNS, FOOTER_SOCIAL_LINKS, FOOTER_COPYRIGHT } from '@/constants/footer';
import { FooterColumn } from './FooterColumn';
import { KsouInstitutionalCard } from './KsouInstitutionalCard';

export function Footer() {
  return (
    // z-20 sits above the CTA's decorative arc but below the counsellor
    // (z-30), so the arc's overhang hides behind this card while she stays
    // fully visible in front of it. `pt-4` is the 16px the counsellor's
    // offsets cancel out to land her bottom exactly on this card's top edge
    // — changing it moves that alignment.
    <footer className="relative z-20 pb-10 pt-4 sm:pb-12">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="rounded-[32px] bg-white px-6 py-10 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_24px_48px_-24px_rgba(17,17,17,0.14)] sm:px-10 sm:py-14">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-12">
            <div className="flex flex-col items-start gap-5">
              <Logo />

              <div className="flex items-center gap-1">
                {FOOTER_SOCIAL_LINKS.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`${label} — coming soon`}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-ice hover:text-primary"
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </button>
                ))}
              </div>

              <span aria-hidden="true" className="block h-px w-full max-w-[15rem] bg-border" />

              <KsouInstitutionalCard />
            </div>

            {FOOTER_LINK_COLUMNS.map((column) => (
              <FooterColumn key={column.title} {...column} />
            ))}
          </div>

          <div className="mt-10 border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">{FOOTER_COPYRIGHT}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
