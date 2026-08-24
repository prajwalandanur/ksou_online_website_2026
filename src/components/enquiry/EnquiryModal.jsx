import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GraduationCap, X } from 'lucide-react';
import { ENQUIRY_SOURCES, SUCCESS_AUTO_CLOSE_MS } from '@/constants/enquiry';
import { useContent } from '@/i18n/content';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { Button } from '@/components/ui/Button';
import { EnquiryForm } from './EnquiryForm';
import { EnquirySuccess } from './EnquirySuccess';

const TITLE_ID = 'enquiry-modal-title';
const DESCRIPTION_ID = 'enquiry-modal-description';

/** Tab-cycle candidates inside the dialog. The panel itself is `tabIndex=-1`. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The dialog's contents, mounted only while the modal is open.
 *
 * Split from `EnquiryModal` on purpose: every piece of per-appearance state —
 * whether the lead was submitted, which fields were touched, the focus that
 * has to be restored — is created on mount and thrown away on unmount, so
 * reopening is genuinely a fresh form with no reset logic to keep in sync.
 */
function EnquiryDialog({ onDismiss, onClose }) {
  const { ui } = useContent();
  const copy = ui.enquiry;
  const panelRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Move focus into the dialog, and put it back where it came from on close.
  // The panel rather than the first input: focusing a text field would raise
  // the on-screen keyboard the instant the popup appears on a phone, which
  // turns a polite invitation into an ambush.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    panelRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, []);

  // Success is a terminal state: the form has already suppressed the popup for
  // a week, so this just clears the dialog once the confirmation is read.
  useEffect(() => {
    if (!isSubmitted) return undefined;
    const timerId = setTimeout(onClose, SUCCESS_AUTO_CLOSE_MS);
    return () => clearTimeout(timerId);
  }, [isSubmitted, onClose]);

  const requestClose = () => (isSubmitted ? onClose() : onDismiss());

  /**
   * Escape closes, Tab cycles. Handled on the panel rather than on `window`
   * so that a combobox can stop an Escape from reaching here — closing its
   * own list instead of the whole modal — simply by not letting the event
   * bubble.
   */
  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      requestClose();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(panelRef.current?.querySelectorAll(FOCUSABLE) ?? []).filter(
      (element) => element.offsetParent !== null,
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={TITLE_ID}
      aria-describedby={DESCRIPTION_ID}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      // ~300ms on the project's usual ease-out curve: present enough to feel
      // deliberate, short enough not to delay someone who wants to dismiss it.
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md rounded-[28px] border border-border bg-background p-5 shadow-card-scrolled focus:outline-none sm:p-7"
    >
      <button
        type="button"
        onClick={requestClose}
        aria-label={copy.close}
        className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 ease-out hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <X className="h-5 w-5" aria-hidden="true" />
      </button>

      {isSubmitted ? (
        <EnquirySuccess
          // The dialog is labelled by its heading, so the ids have to land on
          // the confirmation once it replaces the form.
          titleId={TITLE_ID}
          descriptionId={DESCRIPTION_ID}
          action={
            <Button onClick={onClose} className="mt-6">
              {copy.success.close}
            </Button>
          }
        />
      ) : (
        <>
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 sm:h-11 sm:w-11">
            <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
          </span>

          <h2
            id={TITLE_ID}
            className="mt-3 pr-10 font-brand text-[23px] leading-[1.15] tracking-tight text-navy sm:mt-3.5 sm:text-[27px]"
          >
            {copy.title}
          </h2>
          <p id={DESCRIPTION_ID} className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
            {copy.description}
          </p>

          <EnquiryForm
            // The same form the `/contact` page renders. `source` is what
            // keeps the two apart in the counsellor's inbox — this one is the
            // timed interruption.
            source={ENQUIRY_SOURCES.popup}
            onSuccess={() => setIsSubmitted(true)}
          />
        </>
      )}
    </motion.div>
  );
}

/**
 * The enquiry popup's dialog shell: backdrop, centring, scroll lock.
 *
 * **The overlay scrolls, not the panel.** A `max-h` + `overflow-y-auto` box
 * would clip the country and programme dropdowns, which open below their
 * fields and would be cut off exactly when the list matters. Letting the
 * whole overlay scroll instead keeps the panel unclipped at any height and
 * handles a phone in landscape, or an on-screen keyboard eating half the
 * viewport, for free.
 */
export function EnquiryModal({ isOpen, onDismiss, onClose }) {
  const panelWrapperRef = useRef(null);

  // Bound to `isOpen` rather than to the dialog's mount, so the page becomes
  // scrollable again the moment the modal starts leaving instead of after the
  // exit animation finishes.
  useLockBodyScroll(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          // Dim, not blackout: the brief asks that the page stay recognisable
          // behind the popup, so this is navy at 45% rather than the usual
          // near-opaque scrim.
          className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-navy/45 px-4 py-5 sm:px-6 sm:py-10"
          // A click on the backdrop dismisses, exactly like the close button.
          // `mousedown` on the wrapper, checking the panel does not contain
          // the target, so a drag that starts inside the panel and ends on the
          // backdrop is not read as a dismissal.
          onMouseDown={(event) => {
            if (!panelWrapperRef.current?.contains(event.target)) onDismiss();
          }}
        >
          <div className="flex min-h-full items-center justify-center">
            <div ref={panelWrapperRef} className="w-full max-w-md">
              <EnquiryDialog onDismiss={onDismiss} onClose={onClose} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
