import { useEffect } from 'react';

/**
 * Sends a retired page route to a static file. Used for `/prospectus` and
 * `/academic-planner`, which used to be placeholder pages and are now the
 * PDFs themselves — this keeps any existing bookmark or indexed link
 * working instead of dead-ending.
 *
 * Deliberately `window.location.replace`, not React Router's `<Navigate>`:
 * the target lives in public/ and is not a route, so router navigation
 * would just fail to match. `replace` also keeps the retired URL out of
 * the back-button history.
 */
export function FileRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return null;
}
