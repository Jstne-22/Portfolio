import type { ReactNode } from 'react';

interface LinkButtonProps {
  /** Absent URLs render as a disabled "Link coming soon" control, never a link to `#`. */
  href?: string;
  label: string;
  icon?: ReactNode;
  variant?: 'primary' | 'ghost';
}

/** An external link styled as a button, or a disabled Placeholder when no URL is set. */
export default function LinkButton({ href, label, icon, variant = 'ghost' }: LinkButtonProps) {
  if (!href) {
    return (
      <button type="button" className="btn btn--placeholder" disabled>
        <span className="sr-only">{label}: </span>
        Link coming soon
        {/* The link's own icon shows sighted Visitors which link is missing. */}
        {icon}
      </button>
    );
  }
  return (
    <a href={href} className={`btn btn--${variant}`} target="_blank" rel="noopener noreferrer">
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
      {icon}
    </a>
  );
}
