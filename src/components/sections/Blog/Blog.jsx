import { BlogCarousel } from './BlogCarousel';
import { Button } from '@/components/ui/Button';

export function Blog() {
  return (
    <section aria-labelledby="blog-heading" className="flex flex-col gap-10 py-16 sm:gap-12 sm:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div className="flex flex-col gap-3">
          <h2 id="blog-heading" className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl">
            Insights for Your <span className="text-primary">Next Step</span>
          </h2>
          <p className="max-w-xl text-base font-light text-muted-foreground sm:text-lg">
            Guides, insights, and practical information to help you make better decisions about your
            education.
          </p>
        </div>

        <Button to="/blogs" variant="secondary" withArrow className="shrink-0">
          View All
        </Button>
      </div>

      <BlogCarousel />
    </section>
  );
}
