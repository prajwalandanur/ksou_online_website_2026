import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/constants/faq';
import { FaqItem } from './FaqItem';
import { Button } from '@/components/ui/Button';

const INITIAL_VISIBLE_COUNT = 5;

export function Faq() {
  const [openId, setOpenId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const toggleFaq = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  // Every FAQ is rendered; the ones past the cut-off are hidden rather than
  // sliced away, so their questions stay in the HTML source for crawlers
  // while the visible accordion still starts at five items. `hidden` is
  // display:none, so the parent's `gap-4` skips them and the resting layout
  // is byte-for-byte what it was when this sliced the array.
  const isBeyondFold = (index) => !showAll && index >= INITIAL_VISIBLE_COUNT;

  return (
    <section aria-labelledby="faq-heading" className="flex flex-col gap-8 py-10 sm:gap-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <h2 id="faq-heading" className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 lg:px-8">
        {FAQS.map((faq, index) => (
          <FaqItem
            key={faq.id}
            faq={faq}
            isOpen={openId === faq.id}
            onToggle={() => toggleFaq(faq.id)}
            isHidden={isBeyondFold(index)}
          />
        ))}

        <Button
          variant="secondary"
          onClick={() => setShowAll((current) => !current)}
          className="mt-2 self-start"
        >
          {showAll ? 'Show Less' : 'Show More'}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ease-out ${showAll ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </Button>
      </div>
    </section>
  );
}
