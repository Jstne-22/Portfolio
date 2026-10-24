import { animate, inView } from 'motion';
import { useEffect, useRef, type RefObject } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Fades and lifts an element in the first time it scrolls into view, using Motion's in-view trigger.
 *
 * Content stays visible unless an animation is certain to run: only elements that start below the
 * viewport are hidden first, nothing is hidden under reduced motion or without IntersectionObserver,
 * and once revealed an element is never hidden again. Printing always shows everything (see global.css).
 */
export function useRevealOnScroll(ref: RefObject<HTMLElement | null>): void {
  const reduced = usePrefersReducedMotion();
  const revealed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed.current || reduced || typeof IntersectionObserver === 'undefined') return;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      revealed.current = true;
      return;
    }

    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    let animation: ReturnType<typeof animate> | undefined;
    // Any visible pixel counts, so even a Section taller than the viewport is revealed.
    const stop = inView(
      el,
      () => {
        revealed.current = true;
        animation = animate(el, { opacity: 1, transform: 'translateY(0px)' }, { duration: 0.6, ease: 'easeOut' });
        stop();
      },
      { amount: 'some' },
    );

    return () => {
      stop();
      animation?.stop();
      el.style.opacity = '';
      el.style.transform = '';
    };
  }, [ref, reduced]);
}
