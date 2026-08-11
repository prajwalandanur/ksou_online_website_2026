import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BLOG_POSTS } from '@/constants/blogPosts';
import { BlogCard } from './BlogCard';

export function BlogCarousel() {
  const containerRef = useRef(null);

  const scrollByCard = (direction) => {
    const container = containerRef.current;
    const card = container?.querySelector('[data-blog-card]');
    if (!container || !card) return;

    const gap = parseFloat(getComputedStyle(container).columnGap || '0');
    container.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: 'smooth',
    });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      <div className="relative">
        <ul
          ref={containerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {BLOG_POSTS.map((post) => (
            <li
              key={post.id}
              data-blog-card
              className="w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <BlogCard post={post} />
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous article"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Next article"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-white text-foreground shadow-sm transition-colors duration-200 ease-out hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
