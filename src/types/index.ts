export type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'education' | 'contact';

export interface NavSection {
  id: SectionId;
  label: string;
}

export type SocialKind = 'github' | 'email' | 'linkedin';

export interface SocialLink {
  kind: SocialKind;
  /** Accessible name, e.g. "GitHub profile". */
  label: string;
  url: string;
}

/** The Owner's details plus the site's branding. Edit values in `src/data/portfolio.ts`. */
export interface SiteConfig {
  fullName: string;
  displayName: string;
  initials: string;
  /** Single letter inside the hexagon logo. */
  logoLetter: string;
  /** Small text under the logo name, e.g. "DEV". */
  logoSuffix: string;
  title: string;
  /** Rotating hero tagline, typed one phrase at a time. */
  roles: string[];
  /** What the Owner focuses on, e.g. "Web Development". Shown in the hero code card. */
  focus: string;
  intro: string;
  location: string;
  email: string;
  /** Root-relative path under `public/`, e.g. "/images/profile.jpg". Leave undefined to show the emblem. */
  profileImage?: string;
  socials: SocialLink[];
}
