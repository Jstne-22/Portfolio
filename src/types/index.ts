import type { LucideIcon } from 'lucide-react';
import type { SimpleIcon } from 'simple-icons';

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

/** Skill Categories, in the order their filter tabs appear. */
export const skillCategories = ['Frontend', 'Backend', 'Database', 'Tools'] as const;

export type SkillCategory = (typeof skillCategories)[number];

/**
 * How a Skill's logo is drawn: a brand logo from `simple-icons`, or a Lucide icon
 * where no brand logo is available. `color` overrides the brand colour (e.g. for
 * near-black logos that would vanish on the dark background); palette CSS variables work here.
 */
export type SkillIcon =
  | { kind: 'brand'; icon: SimpleIcon; color?: string }
  | { kind: 'generic'; icon: LucideIcon; color: string };

/** A technology the Owner has used or is learning. Deliberately has no proficiency field. */
export interface Skill {
  name: string;
  category: SkillCategory;
  icon: SkillIcon;
}

/** A real screenshot of a Project, or a clearly labelled illustration of it. */
export interface ProjectPreview {
  /** Root-relative path under `public/`, e.g. "/images/projects/trancash.png". */
  src: string;
  alt: string;
}

/** One screen in a Project's screenshot gallery. */
export interface ProjectScreenshot extends ProjectPreview {
  /** Short name of the screen, shown under the viewer, e.g. "Send money". */
  caption: string;
  /** Smaller image for the thumbnail strip; falls back to `src`. */
  thumb?: string;
}

/** A piece of software the Owner built. Edit entries in `src/data/projects.ts`. */
export interface Project {
  title: string;
  description: string;
  /** Only technologies the Project actually uses. */
  technologies: string[];
  preview?: ProjectPreview;
  /** Screens shown as a browsable gallery on the Featured card, in place of `preview`. */
  screenshots?: ProjectScreenshot[];
  /** Live demo. Leave undefined to show "Link coming soon". */
  liveUrl?: string;
  /** Source code. Leave undefined to show "Link coming soon". */
  sourceUrl?: string;
  /** The repository is private: shows an inert "Private repository" control instead of a source link. */
  sourceIsPrivate?: boolean;
  /** Marks the Featured Project; if several are flagged the first wins, if none the first entry is featured. */
  featured?: boolean;
}
