import { useMediaQuery } from './useMediaQuery';

/** True while the Visitor's system asks for reduced motion; follows changes live. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
