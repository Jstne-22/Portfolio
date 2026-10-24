import type { SiteConfig } from '../types';
import Section from './Section';

interface AboutProps {
  site: SiteConfig;
}

export default function About({ site }: AboutProps) {
  return (
    <Section id="about" eyebrow="About me" title="About Me">
      <div className="about">
        <div className="about__topics">
          {site.about.map(({ title, text }) => (
            <article key={title} className="glass-card about__topic">
              <h3 className="card-title">{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <dl className="about__highlights">
          {site.highlights.map(({ label, value }) => (
            <div key={label} className="glass-card highlight">
              <dt className="highlight__label">{label}</dt>
              <dd className="highlight__value">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
