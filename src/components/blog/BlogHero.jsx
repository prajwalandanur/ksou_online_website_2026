import { Calendar, Clock, User } from 'lucide-react';
import { BlogBreadcrumbs } from './BlogBreadcrumbs';
import { ImagePlaceholder } from './ImagePlaceholder';
import { BLOG_IMAGES } from '@/constants/blogImages';

export function BlogHero({ slug, category, title, excerpt, publishedDate, readingTime, author }) {
  // Articles without artwork keep the reserved placeholder slot.
  const image = BLOG_IMAGES[slug];

  return (
    <header className="flex flex-col gap-8 pb-10 pt-8 sm:pb-14 sm:pt-12 lg:pb-16">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 lg:px-8">
        <BlogBreadcrumbs category={category} title={title} />

        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {category}
          </span>
          <h1 className="font-brand text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="max-w-2xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg">
            {excerpt}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground sm:text-sm">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {author}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-amber-400" />
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {publishedDate}
          </span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-amber-400" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {readingTime}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 lg:px-8">
        {image ? (
          <img
            src={image.src}
            alt={image.alt}
            // The first meaningful paint on an article page — eager, and
            // flagged high priority so it isn't queued behind other assets.
            fetchPriority="high"
            className="aspect-[21/9] w-full rounded-[24px] object-cover"
          />
        ) : (
          <ImagePlaceholder label="Featured image" aspectClass="aspect-[21/9]" />
        )}
      </div>
    </header>
  );
}
