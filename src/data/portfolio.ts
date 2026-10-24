import type { NavSection, SiteConfig, SocialKind } from '../types';
import { educationEntries } from './education';

/**
 * Central personal configuration. Edit these values to update the site.
 * Only add facts that are true; leave optional fields undefined until you have them.
 */
const email = 'dump9825@gmail.com';
const location = 'Calbayog City, Philippines';
const focus = 'Web Development';
/** Program and year level in the About highlights follow the newest Education entry. */
const currentStudy = educationEntries[0];

export const siteConfig: SiteConfig = {
  fullName: 'Justine V. Piamonte',
  displayName: 'Justine',
  initials: 'JVP',
  logoLetter: 'J',
  logoSuffix: 'DEV',
  title: 'Computer Science Student & Aspiring Developer',
  roles: ['Aspiring Developer', 'Web Development Enthusiast', 'Computer Science Student'],
  focus,
  intro:
    'I’m a Computer Science student and aspiring developer who enjoys turning ideas into clean, responsive web experiences — learning something new with every project I build.',
  about: [
    {
      title: 'Hello there',
      text: 'I’m Justine V. Piamonte, a 3rd-year Bachelor of Science in Computer Science student at Christ the King College in Calbayog City, Philippines.',
    },
    {
      title: 'Computer Science background',
      text: 'My Computer Science studies give me a base in programming and problem solving, and in how software works beneath the surface.',
    },
    {
      title: 'Why web development',
      text: 'I’m most interested in web development: building interfaces people can actually use, from the layout and styling to the code that makes them work.',
    },
    {
      title: 'Learning by building',
      text: 'I learn best by building. Each project is a chance to try a new tool, run into a real problem and work out how to solve it.',
    },
    {
      title: 'Where I’m headed',
      text: 'My goal is to keep growing as a developer, one project at a time, and to build things that are genuinely useful to people.',
    },
  ],
  highlights: [
    { label: 'Program', value: currentStudy.degreeShort },
    { label: 'Year level', value: currentStudy.yearLevel },
    { label: 'Location', value: location },
    { label: 'Focus', value: focus },
  ],
  location,
  email,
  profileImage: undefined,
  socials: [
    { kind: 'github', label: 'GitHub profile', url: 'https://github.com/Jstne-22' },
    { kind: 'email', label: 'Send an email', url: `mailto:${email}` },
    // Add LinkedIn here once you have a profile:
    // { kind: 'linkedin', label: 'LinkedIn profile', url: 'https://www.linkedin.com/in/your-handle' },
  ],
};

export const navSections: NavSection[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/** The configured URL for a social profile, or undefined if the Owner hasn't added one. */
export function socialUrl(site: SiteConfig, kind: SocialKind): string | undefined {
  return site.socials.find((social) => social.kind === kind)?.url;
}
