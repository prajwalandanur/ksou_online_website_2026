import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { fieldClasses, FIELD_ERROR_CLASSES, FIELD_LABEL_CLASSES } from './fieldClasses';

/** Lower-cased and stripped of the separators people type inconsistently. */
const normalizeForSearch = (text) => text.toLowerCase().replace(/[\s._\-/,()']/g, '');

/**
 * A searchable combobox, used for both the country field (245 regions) and
 * the programme field (6 programmes in two groups).
 *
 * **Why not a native `<select>`:** with 245 options the native control is a
 * scroll-only list on desktop and a full-screen wheel on iOS, with no way to
 * type "UAE". The brief asks for a premium searchable component, and this is
 * the smallest thing that is genuinely one.
 *
 * **The text input is the combobox**, rather than a button that opens a panel
 * containing a separate search box. One focusable element means one tab stop,
 * no focus hand-off when the panel opens, and typing filters immediately —
 * which is the interaction the placeholder ("Search country...") promises.
 * The trade-off is that the input's displayed value has two modes: the
 * selection while closed, the query while open. That is the standard
 * editable-combobox pattern and is handled in one place, `displayValue`.
 *
 * Follows the WAI-ARIA combobox pattern: `aria-expanded`/`aria-controls` on
 * the input, `aria-activedescendant` pointing at the highlighted option (so
 * focus never leaves the input), and arrow/Enter/Escape/Home/End keys.
 *
 * Options are given either flat (`options`) or grouped (`groups`). Grouping
 * exists because the programme field reuses the site's own UG/PG split rather
 * than inventing a second categorisation.
 */
export function SearchableSelect({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  options,
  groups,
  error,
  errorId,
  required = false,
  noResultsLabel,
}) {
  const generatedId = useId();
  const listboxId = `${id ?? generatedId}-listbox`;
  const optionDomId = (index) => `${listboxId}-option-${index}`;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // One internal shape, whether the caller passed groups or a flat list. An
  // unlabelled group renders without a heading, so the flat case costs
  // nothing at render time.
  const sourceGroups = useMemo(
    () => groups ?? [{ label: '', options: options ?? [] }],
    [groups, options],
  );

  const allOptions = useMemo(
    () => sourceGroups.flatMap((group) => group.options),
    [sourceGroups],
  );

  const selected = useMemo(
    () => allOptions.find((option) => option.value === value) ?? null,
    [allOptions, value],
  );

  /**
   * Matching is a case-insensitive substring test over the label plus any
   * `keywords` — that is what lets "uni" reach United States / United Kingdom
   * / United Arab Emirates and "UAE" reach a country whose stored name
   * contains no such string. Prefix matches sort first so typing "can" puts
   * Canada above Vatican City.
   *
   * Both sides are stripped of separators first, so the punctuation a visitor
   * happens to type is never the reason they find nothing: "m.com" reaches
   * the programme keyed `mcom`, "M.Sc" reaches `msc-mathematics`, and "united
   * arab" still reaches "United Arab Emirates". The stripped set is
   * separators only, never `[^a-z0-9]` — that would erase a Kannada label
   * entirely, and these lists render in Kannada on the `/kn` routes.
   */
  const filteredGroups = useMemo(() => {
    const needle = normalizeForSearch(query);
    if (!needle) return sourceGroups.filter((group) => group.options.length > 0);

    return sourceGroups
      .map((group) => {
        const scored = [];
        group.options.forEach((option) => {
          const haystacks = [option.label, ...(option.keywords ?? [])];
          let best = -1;
          haystacks.forEach((entry) => {
            const text = normalizeForSearch(entry);
            if (text.startsWith(needle)) best = Math.max(best, 2);
            else if (text.includes(needle)) best = Math.max(best, 1);
          });
          if (best > 0) scored.push({ option, score: best });
        });
        scored.sort((a, b) => b.score - a.score);
        return { ...group, options: scored.map((entry) => entry.option) };
      })
      .filter((group) => group.options.length > 0);
  }, [query, sourceGroups]);

  // Flat, in render order — `activeIndex` and the option DOM ids both index
  // into this, so highlight and keyboard movement can never disagree.
  const visibleOptions = useMemo(
    () => filteredGroups.flatMap((group) => group.options),
    [filteredGroups],
  );

  // Where each group starts in `visibleOptions`. Derived rather than counted
  // with a running cursor: a variable reassigned during render is what the
  // compiler's immutability rule forbids, and it would silently double-count
  // under a re-render anyway. Quadratic, over at most two groups.
  const groupOffsets = useMemo(
    () =>
      filteredGroups.map((_, index) =>
        filteredGroups
          .slice(0, index)
          .reduce((total, group) => total + group.options.length, 0),
      ),
    [filteredGroups],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  const open = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    setQuery('');
    // Start on the current selection, so arrowing from a chosen country moves
    // from where the visitor is rather than from the top of 245 entries.
    const selectedIndex = allOptions.findIndex((option) => option.value === value);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [allOptions, isOpen, value]);

  const select = useCallback(
    (option) => {
      onChange(option.value);
      close();
      inputRef.current?.focus();
    },
    [close, onChange],
  );

  // Outside clicks close the list. `mousedown` rather than `click`, so the
  // list is gone before the outside element handles its own click.
  useEffect(() => {
    if (!isOpen) return undefined;

    const onPointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) close();
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('touchstart', onPointerDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('touchstart', onPointerDown);
    };
  }, [close, isOpen]);

  // Keep the highlighted option in view without scrolling the modal itself —
  // `block: 'nearest'` is what confines the scroll to the list.
  useEffect(() => {
    if (!isOpen) return;
    listRef.current
      ?.querySelector('[data-active="true"]')
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, isOpen]);

  const moveActive = (delta) => {
    if (visibleOptions.length === 0) return;
    setActiveIndex((current) => {
      const next = current + delta;
      if (next < 0) return visibleOptions.length - 1;
      if (next >= visibleOptions.length) return 0;
      return next;
    });
  };

  const onKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) open();
        else moveActive(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) open();
        else moveActive(-1);
        break;
      case 'Home':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          event.preventDefault();
          setActiveIndex(Math.max(visibleOptions.length - 1, 0));
        }
        break;
      case 'Enter':
        // Only intercept Enter while the list is open — closed, it belongs to
        // the form, and swallowing it would break submit-on-Enter.
        if (isOpen && visibleOptions[activeIndex]) {
          event.preventDefault();
          select(visibleOptions[activeIndex]);
        }
        break;
      case 'Escape':
        // Closes the list, not the modal. Without stopping propagation here,
        // one Escape would dismiss the whole enquiry popup while the visitor
        // was only trying to back out of a dropdown.
        if (isOpen) {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
        break;
      case 'Tab':
        if (isOpen) close();
        break;
      default:
        break;
    }
  };

  const displayValue = isOpen ? query : selected?.label ?? '';
  const hasError = Boolean(error);

  return (
    <div>
      <label htmlFor={id} className={FIELD_LABEL_CLASSES}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-primary">
            *
          </span>
        )}
      </label>

      <div ref={containerRef} className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-required={required || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          aria-activedescendant={
            isOpen && visibleOptions[activeIndex] ? optionDomId(activeIndex) : undefined
          }
          // While open the field shows what is being typed; while closed it
          // shows the selection. The placeholder falls back to the selected
          // label so an open, empty field still says what is currently chosen.
          value={displayValue}
          placeholder={selected ? selected.label : placeholder}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={open}
          onClick={open}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          className={`${fieldClasses(hasError)} cursor-pointer pr-10`}
        />

        <ChevronDown
          className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-transform duration-200 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />

        {isOpen && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={label}
            // z-30 is not decoration. This list is in normal page flow on the
            // contact page and hangs past the bottom of its card, straight
            // into the closing section — whose footer card is z-20 and was
            // painting over the options (`elementFromPoint` at the list's
            // bottom edge returned the footer logo, not the listbox). It
            // stays deliberately below the floating actions (z-40) and the
            // sticky navbar (z-50), which should remain on top of a dropdown.
            className="absolute left-0 right-0 top-[calc(100%+0.4rem)] z-30 max-h-56 overflow-y-auto overscroll-contain rounded-2xl border border-border bg-background py-1.5 shadow-card-scrolled"
          >
            {visibleOptions.length === 0 && (
              <li className="px-4 py-2.5 text-[14px] text-muted-foreground">{noResultsLabel}</li>
            )}

            {filteredGroups.map((group, groupIndex) => (
              <li key={group.label || 'ungrouped'}>
                {group.label && (
                  <p className="px-4 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                    {group.label}
                  </p>
                )}
                {/* Options are rendered inside a presentational list so the
                    group heading can sit above them; the listbox above is the
                    element that carries the role. */}
                <ul role="none">
                  {group.options.map((option, optionIndex) => {
                    const index = groupOffsets[groupIndex] + optionIndex;
                    const isActive = index === activeIndex;
                    const isSelected = option.value === value;

                    return (
                      <li
                        key={option.value}
                        id={optionDomId(index)}
                        role="option"
                        aria-selected={isSelected}
                        data-active={isActive || undefined}
                        // Keeps focus in the input, so the blur-then-click
                        // race that would close the list first never happens.
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => select(option)}
                        className={`flex cursor-pointer items-center justify-between gap-2 px-4 py-2 text-[14.5px] transition-colors duration-150 ease-out ${
                          isActive ? 'bg-muted text-foreground' : 'text-foreground'
                        }`}
                      >
                        <span>{option.label}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasError && (
        <span id={errorId} className={FIELD_ERROR_CLASSES}>
          {error}
        </span>
      )}
    </div>
  );
}
