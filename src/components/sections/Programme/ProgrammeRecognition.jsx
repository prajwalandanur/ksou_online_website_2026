import { motion } from 'framer-motion';
import { useContent } from '@/i18n/content';

const EASE = [0.22, 1, 0.36, 1];

// Divider borders for a 1-col (mobile) / 2-col (tablet) / 4-col (desktop) grid —
// indexed by item position since the recognition list always has exactly 4 entries.
const DIVIDER_CLASSES = [
  '',
  'border-t sm:border-t-0 sm:border-l lg:border-l lg:border-t-0',
  'border-t sm:border-t sm:border-l-0 lg:border-l lg:border-t-0',
  'border-t sm:border-t sm:border-l lg:border-l lg:border-t-0',
];

/**
 * Institutional recognition — same across every KSOU Online programme, so
 * this section is intentionally content-static rather than taking a
 * `programme` prop. Per the source spec: "Keep the same recognition/trust
 * section... Do not create programme-specific recognition claims unless
 * officially supported."
 */
export function ProgrammeRecognition() {
  const { ui, programmeShared } = useContent();

  return (
    <section aria-labelledby="programme-recognition-heading" className="py-10 sm:py-14 lg:py-20">
      <div className="mx-auto mb-8 flex w-full max-w-3xl flex-col gap-3 px-6 text-center sm:mb-10 lg:px-8">
        <h2
          id="programme-recognition-heading"
          className="font-brand text-3xl text-foreground sm:text-4xl lg:text-5xl"
        >
          {ui.programme.recognition.heading}
        </h2>
        <p className="text-base font-light text-muted-foreground sm:text-lg">
          {ui.programme.recognition.subheading}
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid auto-rows-fr grid-cols-1 gap-0 overflow-hidden rounded-[32px] border border-border/80 bg-white shadow-[0_1px_2px_rgba(17,17,17,0.04),0_24px_48px_-24px_rgba(17,17,17,0.14)] sm:grid-cols-2 lg:grid-cols-4">
          {programmeShared.recognition.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
              className={`flex flex-col items-start gap-4 border-border/70 px-6 py-8 sm:px-7 sm:py-10 ${DIVIDER_CLASSES[i]}`}
            >
              {item.logo ? (
                <img src={item.logo} alt={item.alt} className="h-12 w-12 object-contain" />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <item.Icon className="h-6 w-6" aria-hidden="true" />
                </div>
              )}
              <span aria-hidden="true" className="block h-[2px] w-6 rounded-full bg-gold" />
              <h3 className="font-brand text-2xl leading-tight text-foreground sm:text-[1.75rem]">
                {item.label}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
