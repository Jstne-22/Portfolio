import { useEffect, useState } from 'react';
import type { SectionId } from '../types';

/**
 * Tracks which Section is in the middle band of the viewport,
 * using a single IntersectionObserver for all Sections.
 * At the very bottom of the page the last Section wins, since a short
 * final Section may never reach the middle band.
 */
export function useActiveSection(ids: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isAtPageBottom()) return;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      // A thin band around the vertical centre: whichever Section crosses it is "current".
      { rootMargin: '-45% 0px -50% 0px' },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    const onScroll = () => {
      if (isAtPageBottom()) setActive(ids[ids.length - 1]);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  return active;
}

function isAtPageBottom(): boolean {
  const doc = document.documentElement;
  return doc.scrollHeight > doc.clientHeight && window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
}
