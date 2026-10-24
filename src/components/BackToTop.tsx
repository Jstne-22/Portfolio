import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

/** How far down (px) the Visitor scrolls before the button appears. */
const SHOW_AFTER_SCROLL_PX = 600;

/**
 * A floating link back to the Home Section, shown once the Visitor has scrolled down.
 * It stays in the DOM while hidden so activating it never strands keyboard focus.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_SCROLL_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Move focus to the Home heading, so keyboard users continue from the top rather than from <body>.
  const onClick = () => document.getElementById('home-heading')?.focus({ preventScroll: true });

  return (
    <a
      href="#home"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      aria-label="Back to top"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      onClick={onClick}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </a>
  );
}
