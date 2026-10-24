import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// Deliberately slow so each phrase can be read comfortably.
const TYPE_MS = 110;
const DELETE_MS = 55;
const HOLD_MS = 2200;
const GAP_MS = 500;

interface TypingTaglineProps {
  phrases: string[];
}

/**
 * Types each phrase, holds it, deletes it, then moves on.
 * Screen readers get the full list once; under reduced motion everyone does.
 */
export default function TypingTagline({ phrases }: TypingTaglineProps) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = phrases[index % phrases.length] ?? '';

  useEffect(() => {
    if (reduced || phrases.length === 0) return;

    let delay: number;
    let step: () => void;
    if (!deleting && length < phrase.length) {
      delay = TYPE_MS;
      step = () => setLength(length + 1);
    } else if (!deleting) {
      delay = HOLD_MS;
      step = () => setDeleting(true);
    } else if (length > 0) {
      delay = DELETE_MS;
      step = () => setLength(length - 1);
    } else {
      delay = GAP_MS;
      step = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % phrases.length);
      };
    }

    const timer = window.setTimeout(step, delay);
    return () => window.clearTimeout(timer);
  }, [reduced, phrases.length, phrase, length, deleting]);

  const allPhrases = phrases.join(' · ');

  if (reduced) {
    return <p className="hero__tagline">{allPhrases}</p>;
  }

  return (
    <p className="hero__tagline">
      <span className="sr-only">{allPhrases}</span>
      <span aria-hidden="true">
        {phrase.slice(0, length)}
        <span className="hero__caret" />
      </span>
    </p>
  );
}
