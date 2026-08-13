import { BlogCarousel } from './BlogCarousel';
import { Button } from '@/components/ui/Button';
import { useContent } from '@/i18n/content';

export function Blog() {
  const { ui } = useContent();

  return (
    <section aria-labelledby="blog-heading" className="flex flex-col gap-8 py-10 sm:gap-10 sm:py-14 lg:py-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <h2 id="blog-heading" className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl">
            {ui.blog.headingLead}
            {ui.blog.headingLead && ' '}
            <span className="text-primary">{ui.blog.headingAccent}</span>
            {ui.blog.headingTrail}
          </h2>
          <p className="max-w-xl text-base font-light text-muted-foreground sm:text-lg">
            {ui.blog.subtitle}
          </p>
        </div>

        <Button to="/blogs" variant="secondary" withArrow className="shrink-0">
          {ui.blog.viewAll}
        </Button>
      </div>

      <BlogCarousel />
    </section>
  );
}
