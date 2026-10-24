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
  /** About Section cards, in reading order. */
  about: AboutTopic[];
  /** Small fact cards beside the About text. */
  highlights: AboutHighlight[];
  location: string;
  email: string;
  /** Root-relative path under `public/`, e.g. "/images/profile.jpg". Leave undefined to show the emblem. */
  profileImage?: string;
  socials: SocialLink[];
}

/** One glass card in the About Section. */
export interface AboutTopic {
  title: string;
  text: string;
}

/** A short fact shown as a highlight card in About, e.g. { label: "Year level", value: "3rd Year" }. */
export interface AboutHighlight {
  label: string;
  value: string;
}

/** One entry on the Education timeline. Edit values in `src/data/education.ts`. */
export interface EducationEntry {
  school: string;
  location: string;
  degree: string;
  /** Short form for the About highlights, e.g. "BS Computer Science". */
  degreeShort: string;
  yearLevel: string;
  /** e.g. "2024 – Present". */
  period: string;
  /** Rendered only when non-empty. */
  coursework: string[];
  /** Rendered only when non-empty. */
  activities: string[];
}
