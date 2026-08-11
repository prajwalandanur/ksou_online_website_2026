import { BlogCard } from '@/components/sections/Blog/BlogCard';

export function RelatedArticles({ posts }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-articles-heading" className="flex flex-col gap-6">
      <h2 id="related-articles-heading" className="font-brand text-2xl text-foreground sm:text-3xl">
        Continue Reading
      </h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
