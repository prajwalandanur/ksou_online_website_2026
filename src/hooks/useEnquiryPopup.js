import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ENQUIRY_STORAGE_KEYS,
  EXIT_INTENT_ARM_DELAY_MS,
  MIN_DELAY_AFTER_LOAD_MS,
  POPUP_TRIGGERS,
  SUPPRESSED_PATH_PREFIXES,
} from '@/constants/enquiry';
import { stripLanguage } from '@/i18n/language';
import {
  isEnquirySuppressed,
  readNumber,
  removeStored,
  subscribeToEnquirySuppression,
  writeStored,
} from '@/services/enquiryStorage';

const SESSION_KEYS = ENQUIRY_STORAGE_KEYS.session;

/**
 * Guards the "only ever one enquiry modal" rule at the source rather than at
 * the modal: two mounted controllers would each run their own triggers and
 * open their own dialog, and no amount of care inside the modal component can
 * detect that. Mounting belongs in `MainLayout`, once.
 */
let activeControllers = 0;

/**
 * How much of the document the visitor has seen, as a fraction.
 *
 * Measured as "proportion of the page that has passed the bottom of the
 * window", the way scroll-depth is normally reported — not as a fraction of
 * the scrollable distance, which would call a two-screen article 50% read
 * after a single flick. Only ever evaluated inside a scroll handler, so a
 * page too short to scroll simply never reports anything and its timer is
 * left to govern.
 */
function scrolledFraction() {
  const height = document.documentElement.scrollHeight;
  if (height <= 0) return 0;
  return (window.scrollY + window.innerHeight) / height;
}

/**
 * Drives the automatic enquiry popup: what opens it, how many times, and when
 * it stops entirely. `src/constants/enquiry.js` holds the schedule and the
 * reasoning behind each trigger.
 *
 * Returns the open flag plus the two transitions the modal can cause —
 * `dismiss` (closed without submitting; arms the next appearance) and `close`
 * (closed after a submission, which arms nothing because the form has already
 * suppressed the popup for a week).
 */
export function useEnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [shownCount, setShownCount] = useState(() => readNumber('session', SESSION_KEYS.shownCount) ?? 0);

  // Set by `EnquiryForm` from either of its two homes, so a lead captured on
  // the contact page silences a popup controller mounted on that same page.
  const isSuppressed = useSyncExternalStore(
    subscribeToEnquirySuppression,
    isEnquirySuppressed,
    () => true,
  );

  const pathname = stripLanguage(useLocation().pathname);
  const isOnSuppressedPath = SUPPRESSED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  useEffect(() => {
    activeControllers += 1;
    if (activeControllers > 1 && import.meta.env.DEV) {
      console.warn(
        '[enquiry] More than one enquiry popup controller is mounted. Render <EnquiryPopup /> once, in MainLayout.',
      );
    }
    return () => {
      activeControllers -= 1;
    };
  }, []);

  /**
   * Opens the modal and records the appearance.
   *
   * Stable for the life of the controller — it touches nothing but the two
   * setters, and updates the count functionally rather than reading it — so
   * the arming effect can depend on it without tearing down and re-arming
   * every trigger on each render.
   */
  const show = useCallback(() => {
    setShownCount((count) => {
      const next = count + 1;
      writeStored('session', SESSION_KEYS.shownCount, next);
      return next;
    });
    setIsOpen(true);
  }, []);

  useEffect(() => {
    // `scripts/prerender.mjs` drives a real browser to capture static HTML for
    // each route. Its page-load budget is 45s and it scrolls nothing, but an
    // exit-intent listener plus a 60s timer is not something to leave armed in
    // a page that gets serialised to disk and served to every visitor.
    if (window.__KSOU_PRERENDER__) return undefined;

    // Nothing to arm: the sequence is over, a lead was already captured, the
    // modal is on screen, or this route does not host the popup at all. The
    // path check re-runs on navigation, so leaving a programme page re-arms
    // whatever was pending.
    if (isSuppressed || isOpen || isOnSuppressedPath) return undefined;

    const trigger = POPUP_TRIGGERS[shownCount];
    if (!trigger) return undefined;

    // Two triggers on one appearance are a race, and several scroll events can
    // land before React re-renders — so the winner disarms the rest here
    // rather than relying on the effect's cleanup to get there first.
    let hasFired = false;
    const fire = () => {
      if (hasFired) return;
      hasFired = true;
      show();
    };

    const cleanups = [];

    if (trigger.delayMs !== undefined) {
      const now = Date.now();
      let dueAt = readNumber('session', SESSION_KEYS.nextPopupAt);

      // No stored due-time means this appearance's clock starts now: either
      // the visitor has just entered the site, or they have just dismissed the
      // previous popup (`dismiss` clears the key, which is what makes the
      // second delay run from dismissal rather than from appearance).
      if (dueAt === null) {
        dueAt = now + trigger.delayMs;
        writeStored('session', SESSION_KEYS.nextPopupAt, dueAt);
      }

      const timerId = setTimeout(fire, Math.max(dueAt - now, MIN_DELAY_AFTER_LOAD_MS));
      cleanups.push(() => clearTimeout(timerId));
    }

    if (trigger.scrollDepth !== undefined) {
      const onScroll = () => {
        if (scrolledFraction() >= trigger.scrollDepth) fire();
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener('scroll', onScroll));
    }

    if (trigger.exitIntent) {
      let onMouseOut = null;

      const armId = setTimeout(() => {
        // `mouseout` with no `relatedTarget` is the pointer leaving the
        // document rather than moving between elements; `clientY <= 0` narrows
        // that to the top edge, where the tabs, the address bar and the close
        // button are. Leaving sideways or downward is not treated as exit.
        onMouseOut = (event) => {
          if (event.clientY <= 0 && !event.relatedTarget) fire();
        };
        document.addEventListener('mouseout', onMouseOut);
      }, EXIT_INTENT_ARM_DELAY_MS);

      cleanups.push(() => {
        clearTimeout(armId);
        if (onMouseOut) document.removeEventListener('mouseout', onMouseOut);
      });
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [isOnSuppressedPath, isOpen, isSuppressed, show, shownCount]);

  /**
   * Closed without submitting. Clearing the pending due-time is what arms the
   * next appearance *from this moment* — see the `dueAt === null` branch above.
   */
  const dismiss = useCallback(() => {
    setIsOpen(false);
    removeStored('session', SESSION_KEYS.nextPopupAt);
  }, []);

  /**
   * Closed after a submission. Nothing to schedule: `EnquiryForm` has already
   * suppressed the popup for a week, in every tab and on every surface.
   */
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, dismiss, close };
}
