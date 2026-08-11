import { Quote, UserRound } from 'lucide-react';

function TestimonialCard({ testimonial }) {
  return (
    <div className="relative flex h-full flex-col gap-6 rounded-[28px] border border-border/80 bg-white p-7 pt-14 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_28px_56px_-28px_rgba(17,17,17,0.18)] sm:p-9 sm:pt-16">
      <div className="absolute -top-8 left-7 flex h-20 w-20 items-center justify-center rounded-[20px] border-4 border-white bg-primary/10 text-primary shadow-[0_10px_24px_-8px_rgba(17,17,17,0.25)] sm:left-9">
        <UserRound className="h-9 w-9" aria-hidden="true" />
      </div>

      {testimonial.isPlaceholder && (
        <span className="absolute right-7 top-6 rounded-full bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground sm:right-9">
          Placeholder
        </span>
      )}

      <Quote className="h-7 w-7 text-primary/30" aria-hidden="true" />

      <p className="font-brand text-xl leading-relaxed text-foreground sm:text-2xl">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-auto flex flex-col border-t border-border/70 pt-5">
        <span className="text-sm font-semibold text-foreground">{testimonial.name}</span>
        <span className="text-xs text-muted-foreground">{testimonial.programme}</span>
      </div>
    </div>
  );
}

export function ProgrammeTestimonials({ programme }) {
  const { testimonials } = programme;

  return (
    <section
      aria-labelledby="programme-testimonials-heading"
      className="bg-muted/40 py-10 sm:py-14 lg:py-20"
    >
      <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-12 lg:px-8">
        <h2
          id="programme-testimonials-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          Real Stories. Real Impact.
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">
          Discover how learners are building their academic journey with KSOU Online.
        </p>
      </div>

      {/* Desktop/tablet: two large cards side by side */}
      <div className="mx-auto hidden w-full max-w-5xl gap-8 px-6 sm:grid sm:grid-cols-2 lg:px-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/*
        Mobile: one large card at a time. `overflow-x-auto` here forces the
        browser to also compute overflow-y as `auto` (per the CSS Overflow
        spec, a non-visible overflow-x pairs with an implicit auto
        overflow-y), which would clip the avatar tile's `-top-8` offset
        above this container's own top edge — hence the extra pt-10 to give
        it room instead of relying on `overflow-y: visible`, which the
        browser wouldn't honor anyway.
      */}
      <div className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 pt-10 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="w-[88%] shrink-0 snap-center">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </section>
  );
}
