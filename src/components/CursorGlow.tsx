import { useEffect } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/** Wide viewports with a mouse (or trackpad); never touch screens. */
const FINE_POINTER_DESKTOP = '(pointer: fine) and (hover: hover) and (min-width: 1024px)';

/** CSS variables written on <html>: the pointer from -1 to 1 for the hero parallax. */
const POINTER_VARS = ['--pointer-x', '--pointer-y'] as const;

/**
 * Writes the pointer position as CSS variables for the hero's gentle parallax; renders nothing.
 * Only on wide viewports with a mouse, and never under reduced motion.
 */
export default function CursorGlow() {
  const finePointer = useMediaQuery(FINE_POINTER_DESKTOP);
  const reduced = usePrefersReducedMotion();
  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      const values = [
        ((x / window.innerWidth) * 2 - 1).toFixed(3),
        ((y / window.innerHeight) * 2 - 1).toFixed(3),
      ];
      POINTER_VARS.forEach((name, i) => root.style.setProperty(name, values[i]));
    };
    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      for (const name of POINTER_VARS) root.style.removeProperty(name);
    };
  }, [enabled]);

  return null;
}
