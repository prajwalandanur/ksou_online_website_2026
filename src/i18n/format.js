/**
 * Fills `{token}` placeholders in a UI string.
 *
 * Programme-page headings interpolate the programme's short name — "Online
 * MBA Curriculum", "Ready to Begin Your MBA Journey?". Those cannot be
 * assembled by concatenating fragments in the component, because Kannada
 * puts the name in a different position than English does: "Online {name}
 * Curriculum" becomes "{name} ಆನ್‌ಲೈನ್ ಪಠ್ಯಕ್ರಮ". Keeping the whole sentence
 * in the locale file with a token in it lets each language place the value
 * where its own grammar wants it.
 *
 * An unknown token is left as-is rather than blanked, so a typo shows up as
 * a visible `{name}` in the page instead of silently deleting a word.
 */
export function fill(template, values) {
  if (typeof template !== 'string') return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(values, key) ? values[key] : match,
  );
}
