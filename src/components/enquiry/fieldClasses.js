/**
 * One visual definition of a form control, shared by the enquiry form's text
 * inputs and its two comboboxes so a country field and a name field are
 * unmistakably the same component.
 *
 * Lives in its own module rather than being exported from a component file:
 * React Fast Refresh requires a component file to export only components —
 * the same reason `buttonClasses.js` sits beside `Button.jsx`.
 *
 * The vocabulary is the site's existing one: a `rounded-2xl` control on a
 * hairline `border-border`, primary blue on focus, and the project-standard
 * `focus-visible` outline rather than a bespoke ring. Height is deliberately
 * restrained (`py-2.5`, ~44px total) — tall enough to tap comfortably on a
 * phone, short enough that six stacked fields still fit one screen.
 *
 * `@md:py-3` is a *container* query, resolved against the form (`EnquiryForm`
 * carries `@container`), not the viewport. It gives the fields a little more
 * presence in the contact page's wide card while leaving the popup's narrow
 * panel on the compact height at every screen size — a `sm:` variant would
 * have grown the popup's fields too.
 */
const FIELD_BASE =
  'w-full rounded-2xl border bg-background px-4 py-2.5 text-[15px] text-foreground transition-colors duration-200 ease-out placeholder:text-muted-foreground focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary @md:py-3';

/**
 * `aria-invalid` alone is invisible; a red hairline is what a sighted visitor
 * sees. Tailwind's built-in red is used directly — the palette has no error
 * token because nothing else on the site has an error state, and inventing
 * one for a single form would spread a colour the design system never asked
 * for. Promote it to `--color-danger` if a second form ever needs it.
 */
export function fieldClasses(hasError) {
  return `${FIELD_BASE} ${hasError ? 'border-red-400' : 'border-border'}`;
}

/** Label above a control. */
export const FIELD_LABEL_CLASSES =
  'mb-1.5 block text-[13px] font-semibold tracking-tight text-foreground';

/** Inline validation message below a control. */
export const FIELD_ERROR_CLASSES = 'mt-1 block text-[12.5px] font-medium text-red-600';
