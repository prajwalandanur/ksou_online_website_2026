/**
 * WhatsApp glyph.
 *
 * Hand-drawn rather than imported: lucide-react carries no brand icons (the
 * set dropped them over trademark concerns — `grep -i whatsapp` in
 * lucide-react.d.ts returns nothing), and the footer already vendors YouTube
 * and LinkedIn the same way.
 *
 * Unlike the lucide icons around it this is a **filled** path, not a stroked
 * one, so it takes `fill="currentColor"` and no `strokeWidth`. Sizing still
 * comes from the className so it lines up with its lucide siblings.
 */
export function WhatsappIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.23-8.24Z" />
      <path d="M9.11 7.33c-.19-.42-.38-.43-.56-.44h-.47c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.89 2.38 1.01 2.54c.12.17 1.71 2.74 4.22 3.73 2.09.82 2.51.66 2.97.62.46-.04 1.47-.6 1.68-1.19.21-.58.21-1.08.14-1.19-.06-.1-.23-.17-.47-.29-.25-.12-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.98-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.54-1.34-.75-1.83Z" />
    </svg>
  );
}
