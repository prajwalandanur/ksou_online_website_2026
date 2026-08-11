import { Logo } from '@/components/common/Logo';
import { FOOTER_LINK_COLUMNS, FOOTER_SOCIAL_LINKS, FOOTER_COPYRIGHT } from '@/constants/footer';
import { FooterColumn } from './FooterColumn';

export function Footer() {
  return (
    <footer className="relative pb-10 pt-6 sm:pb-12">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="rounded-[32px] bg-white px-6 py-10 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_24px_48px_-24px_rgba(17,17,17,0.14)] sm:px-10 sm:py-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,280px)_1fr]">
            <div className="flex flex-col gap-5">
              <Logo />
              <div className="flex items-center gap-3">
                {FOOTER_SOCIAL_LINKS.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={`${label} — coming soon`}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            {/* Three columns today; an SEO programme/specialization panel can
                join this grid as an extra row later without a footer redesign. */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {FOOTER_LINK_COLUMNS.map((column) => (
                <FooterColumn key={column.title} {...column} />
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">{FOOTER_COPYRIGHT}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
