import { renderInlineText } from './inlineText';
import { ArticleTable } from './ArticleTable';
import { HighlightCallout } from './HighlightCallout';
import { StepTimeline } from './StepTimeline';
import { ComparisonCards } from './ComparisonCards';
import { StatCardRow } from './StatCardRow';
import { ImagePlaceholder } from './ImagePlaceholder';
import { InlineProgrammeLink } from './InlineProgrammeLink';

/**
 * Renders an article as a flat array of typed content blocks — mirrors the
 * project's existing data-driven convention (constants/programmes/*.js +
 * generic Programme* components) so adding blogs 2-5 later is a content
 * change, not a component change. H2/H3 blocks carry a stable `id` used for
 * anchor scrolling and Table of Contents highlighting.
 *
 * The headings' `scroll-mt-*` has to clear the sticky header, which is one
 * card of a fixed height per breakpoint: ~224px below md (the utility bar's
 * numbers wrap onto two rows at phone widths) and ~187px from md up. If the
 * header's height ever changes, these values and the one on the FAQ section
 * in BlogArticlePage.jsx must follow, or TOC jumps land the heading
 * underneath it. Note mobile needs the *larger* offset, hence the unusual
 * base-bigger-than-md pairing.
 */
export function ArticleBody({ blocks }) {
  return (
    <div className="flex min-w-0 flex-col gap-5 sm:gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading2':
            return (
              <h2
                key={i}
                id={block.id}
                className="scroll-mt-60 md:scroll-mt-52 pt-4 font-brand text-2xl text-foreground sm:text-3xl"
              >
                {block.text}
              </h2>
            );
          case 'heading3':
            return (
              <h3
                key={i}
                id={block.id}
                className="scroll-mt-60 md:scroll-mt-52 pt-2 text-lg font-semibold text-foreground sm:text-xl"
              >
                {block.text}
              </h3>
            );
          case 'paragraph':
            return (
              <p
                key={i}
                className="text-base leading-relaxed text-foreground/90 sm:text-[1.0625rem]"
              >
                {renderInlineText(block.text)}
              </p>
            );
          case 'list':
            return block.ordered ? (
              <ol
                key={i}
                className="flex flex-col gap-2 pl-5 text-base leading-relaxed text-foreground/90 marker:font-semibold marker:text-primary sm:text-[1.0625rem]"
                style={{ listStyleType: 'decimal' }}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInlineText(item)}</li>
                ))}
              </ol>
            ) : (
              <ul
                key={i}
                className="flex flex-col gap-2 pl-5 text-base leading-relaxed text-foreground/90 marker:text-primary sm:text-[1.0625rem]"
                style={{ listStyleType: 'disc' }}
              >
                {block.items.map((item, j) => (
                  <li key={j}>{renderInlineText(item)}</li>
                ))}
              </ul>
            );
          case 'table':
            return (
              <ArticleTable key={i} headers={block.headers} rows={block.rows} caption={block.caption} />
            );
          case 'callout':
            return <HighlightCallout key={i} variant={block.variant} text={block.text} />;
          case 'steps':
            return <StepTimeline key={i} steps={block.steps} />;
          case 'comparison':
            return <ComparisonCards key={i} left={block.left} right={block.right} />;
          case 'stats':
            return <StatCardRow key={i} stats={block.stats} />;
          case 'image':
            return <ImagePlaceholder key={i} label={block.label} aspectClass={block.aspectClass} />;
          case 'link':
            return <InlineProgrammeLink key={i} to={block.to} label={block.label} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
