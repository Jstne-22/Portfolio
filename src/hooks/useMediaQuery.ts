import { useEffect, useState } from 'react';

/** Phone widths; matches the `max-width: 640px` breakpoint in responsive.css. */
export const PHONE_QUERY = '(max-width: 640px)';

/** Whether a CSS media query currently matches; follows changes live. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
