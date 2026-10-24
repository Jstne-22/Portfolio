/**
 * Sends the browser to `url`, e.g. a `mailto:` link that opens the Visitor's email app.
 * Kept in its own module so tests can replace it: jsdom can't stub `location.assign`.
 */
export function navigateTo(url: string): void {
  window.location.assign(url);
}
