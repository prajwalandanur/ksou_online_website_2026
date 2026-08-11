import { useParams } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { BLOG_ARTICLES } from '@/constants/blogs';
import { BLOG_POSTS } from '@/constants/blogPosts';
import { PageComingSoon } from './PageComingSoon';
import { BlogHero } from '@/components/blog/BlogHero';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { KeyTakeaways } from '@/components/blog/KeyTakeaways';
import { FaqAccordion } from '@/components/blog/FaqAccordion';
import { ArticleCta } from '@/components/blog/ArticleCta';
import { RelatedArticles } from '@/components/blog/RelatedArticles';

function extractHeadingSections(blocks) {
  return blocks
    .filter((block) => block.type === 'heading2')
    .map((block) => ({ id: block.id, text: block.text }));
}

export function BlogArticlePage() {
  const { slug } = useParams();
  const article = BLOG_ARTICLES[slug];

  const seo = article?.seo ?? {
    title: 'KSOU Online Blog',
    description: 'Guides and insights to help you make better decisions about your education.',
  };
  useDocumentMeta(seo.title, seo.description);

  if (!article) {
    return <PageComingSoon title="Article" />;
  }

  const tocSections = [
    ...extractHeadingSections(article.body),
    { id: 'faq', text: 'Frequently Asked Questions' },
    ...extractHeadingSections(article.conclusion),
  ];
  const relatedPosts = BLOG_POSTS.filter((post) => article.relatedIds.includes(post.id));

  return (
    <main>
      <BlogHero
        slug={slug}
        category={article.category}
        title={article.title}
        excerpt={article.excerpt}
        publishedDate={article.publishedDate}
        readingTime={article.readingTime}
        author={article.author}
      />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-16 lg:grid-cols-[1fr_280px] lg:gap-14 lg:px-8 lg:pb-24">
        <div className="flex min-w-0 flex-col gap-10 lg:order-1">
          <div className="lg:hidden">
            <TableOfContents sections={tocSections} variant="inline" />
          </div>

          <ArticleBody blocks={article.body} />

          <KeyTakeaways points={article.keyTakeaways} />

          <section aria-labelledby="faq-heading" id="faq" className="scroll-mt-32 flex flex-col gap-6">
            <h2 id="faq-heading" className="font-brand text-2xl text-foreground sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <FaqAccordion faqs={article.faqs} />
          </section>

          <ArticleBody blocks={article.conclusion} />

          <ArticleCta heading={article.cta.heading} description={article.cta.description} />

          <RelatedArticles posts={relatedPosts} />
        </div>

        <aside className="hidden lg:order-2 lg:block">
          <TableOfContents sections={tocSections} variant="sidebar" />
        </aside>
      </div>
    </main>
  );
}
