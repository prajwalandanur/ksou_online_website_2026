/**
 * Renders a JSON-LD block. Several may appear on one page — search engines
 * read every `application/ld+json` script in the document, so each schema
 * type gets its own tag rather than being merged into one graph.
 *
 * `dangerouslySetInnerHTML` is required: React escapes text children, which
 * would corrupt the JSON. The input is our own data from constants/, never
 * user input, and JSON.stringify escapes the `<` in any embedded string, so
 * a `</script>` sequence cannot break out of the tag.
 */
export function JsonLd({ data }) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
