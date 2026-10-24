import type { ReactNode } from 'react';
import type { SectionId } from '../types';

interface SectionProps {
  id: SectionId;
  /** Small uppercase neon label above the heading, e.g. "About me". */
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export default function Section({ id, eyebrow, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <p className="section__eyebrow">{eyebrow}</p>
      <h2 id={headingId} className="section__title">
        {title}
      </h2>
      {children}
    </section>
  );
}
