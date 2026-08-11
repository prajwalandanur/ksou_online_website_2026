import { Link } from 'react-router-dom';
import { Calendar, Clock, Newspaper } from 'lucide-react';
import { BLOG_IMAGES } from '@/constants/blogImages';

export function BlogCard({ post }) {
  const { id, title, publishedDate, readingTime, category } = post;
  // Articles without artwork keep the original icon placeholder.
  const image = BLOG_IMAGES[id];

  return (
    <Link
      to={`/blogs/${id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-border/80 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_10px_28px_-14px_rgba(17,17,17,0.14)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_2px_4px_rgba(17,17,17,0.06),0_20px_40px_-16px_rgba(17,17,17,0.2)]"
    >
      <div className="relative flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-[28px] bg-gradient-to-br from-primary/[0.07] via-muted to-muted">
        {image ? (
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <Newspaper className="h-10 w-10 text-primary/30" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {category && (
            <>
              <span className="text-primary">{category}</span>
              <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-amber-400" />
            </>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {publishedDate}
          </span>
          <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-amber-400" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            {readingTime}
          </span>
        </div>

        <h3 className="line-clamp-3 min-h-[84px] font-brand text-xl leading-snug text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
      </div>
    </Link>
  );
}
