import { useEnquiryPopup } from '@/hooks/useEnquiryPopup';
import { EnquiryModal } from './EnquiryModal';

/**
 * The automatic enquiry popup, wired to its session state machine.
 *
 * **Render this exactly once, in `MainLayout`** — that is what makes the
 * countdown belong to the visit rather than to a page. `MainLayout` wraps the
 * `<Outlet />`, so it survives every client-side route change: moving from
 * the homepage to the MBA page does not remount this component, does not
 * restart the 25-second timer, and cannot produce a second modal. Mounting it
 * per page would do all three (`useEnquiryPopup` warns in development if a
 * second controller ever appears).
 *
 * Deliberately not rendered inside `FloatingActions` even though both are
 * global: those two controls are always-present page furniture, while this is
 * a timed interruption with its own session rules.
 */
export function EnquiryPopup() {
  const { isOpen, dismiss, close } = useEnquiryPopup();

  return (
    <EnquiryModal
      isOpen={isOpen}
      // Closed without submitting — arms the next appearance, if the sequence
      // has one left.
      onDismiss={dismiss}
      // Closes after a successful submission, arming nothing. There is no
      // "submitted" callback to pass: `EnquiryForm` suppresses the popup for a
      // week itself, from whichever surface the lead came in on.
      onClose={close}
    />
  );
}
