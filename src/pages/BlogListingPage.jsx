import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { BLOG_POSTS } from '@/constants/blogPosts';
import { BlogCard } from '@/components/sections/Blog/BlogCard';

export function BlogListingPage() {
  useDocumentMeta({
    title: 'Blog — KSOU Online',
    description:
      'Guides, insights, and practical information to help you make better decisions about your education, careers and online degree programmes.',
    ogType: 'website',
    canonicalPath: '/blogs',
  });

  return (
    <main className="flex flex-col gap-10 py-16 sm:gap-12 sm:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 lg:px-8">
        <h1 className="font-brand text-4xl text-foreground sm:text-5xl lg:text-6xl">
          Insights for Your <span className="text-primary">Next Step</span>
        </h1>
        <p className="max-w-xl text-base font-light text-muted-foreground sm:text-lg">
          Guides, insights, and practical information to help you make better decisions about your
          education.
        </p>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
}
