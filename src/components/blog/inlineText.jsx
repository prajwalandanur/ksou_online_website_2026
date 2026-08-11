/**
 * Minimal **bold** markdown parsing for article body text — content is
 * authored in constants/blogs/*.js as near-markdown strings (matching the
 * source articles verbatim), this keeps emphasis inline without pulling in
 * a full markdown parser dependency.
 */
export function renderInlineText(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
