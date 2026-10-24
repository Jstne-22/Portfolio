import { useId } from 'react';
import type { SiteConfig } from '../types';

interface LogoProps {
  site: SiteConfig;
  /** Show the name and suffix under the hexagon. */
  withWordmark?: boolean;
  /** Small, single-row version for the phone/tablet top bar. */
  compact?: boolean;
}

export default function Logo({ site, withWordmark = true, compact = false }: LogoProps) {
  // The logo appears in both the sidebar and the top bar, so its gradient id must be unique.
  const gradientId = useId();
  return (
    <a href="#home" className={`logo${compact ? ' logo--compact' : ''}`} aria-label={`${site.fullName} — back to top`}>
      <span className="logo__hex" aria-hidden="true">
        <svg viewBox="0 0 64 72" className="logo__hex-svg">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--neon-pink)" />
              <stop offset="55%" stopColor="var(--neon-purple)" />
              <stop offset="100%" stopColor="var(--electric-blue)" />
            </linearGradient>
          </defs>
          <polygon
            points="32,3 61,19.5 61,52.5 32,69 3,52.5 3,19.5"
            fill="rgba(255, 45, 149, 0.08)"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.5"
          />
        </svg>
        <span className="logo__letter">{site.logoLetter}</span>
      </span>
      {withWordmark && (
        <span className="logo__wordmark" aria-hidden="true">
          <span className="logo__name">{site.displayName}</span>
          <span className="logo__suffix">{site.logoSuffix}</span>
        </span>
      )}
    </a>
  );
}
