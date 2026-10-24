import type { SiteConfig } from '../types';

interface CodeCardProps {
  site: SiteConfig;
}

/** A floating editor card describing the Owner as a `developer` object, built from the site config. */
export default function CodeCard({ site }: CodeCardProps) {
  const fields: [string, string][] = [
    ['name', site.displayName],
    ['role', site.roles[0] ?? site.title],
    ['focus', site.focus],
    ['location', site.location],
  ];

  return (
    <figure className="code-card" aria-label="Code snippet describing the developer">
      <div className="code-card__bar" aria-hidden="true">
        <span className="code-card__brackets">&lt;/&gt;</span>
        <span className="code-card__dots">
          <span />
          <span />
          <span />
        </span>
      </div>
      <pre className="code-card__code">
        <code>
          <span className="tok-keyword">const</span> <span className="tok-var">developer</span> = {'{'}
          {fields.map(([key, value]) => (
            <span key={key}>
              {'\n  '}
              <span className="tok-key">{key}</span>: <span className="tok-string">"{value}"</span>,
            </span>
          ))}
          {'\n};\n\n'}
          <span className="tok-comment">// Always learning by building</span>
        </code>
      </pre>
    </figure>
  );
}
