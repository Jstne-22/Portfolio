import type { EducationEntry } from '../types';
import Section from './Section';

interface EducationProps {
  entries: EducationEntry[];
}

export default function Education({ entries }: EducationProps) {
  return (
    <Section id="education" eyebrow="Education" title="Education">
      <ol className="timeline">
        {entries.map((entry) => (
          <li key={`${entry.school}-${entry.degree}`} className="timeline__item">
            <span className="timeline__dot" aria-hidden="true" />
            <div className="glass-card timeline__card">
              <p className="timeline__period">{entry.period}</p>
              <h3 className="card-title">{entry.school}</h3>
              <p className="timeline__location">{entry.location}</p>
              <p className="timeline__degree">
                {entry.degree}{' '}
                <span className="timeline__year">
                  <span aria-hidden="true">· </span>
                  {entry.yearLevel}
                </span>
              </p>
              <DetailList title="Coursework" items={entry.coursework} />
              <DetailList title="Activities" items={entry.activities} />
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

interface DetailListProps {
  title: string;
  items: string[];
}

/** A titled list that renders nothing at all while it has no items. */
function DetailList({ title, items }: DetailListProps) {
  if (items.length === 0) return null;
  return (
    <>
      <h4 className="timeline__subheading">{title}</h4>
      <ul className="timeline__list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
