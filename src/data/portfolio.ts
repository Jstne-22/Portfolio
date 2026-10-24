import type { NavSection, SiteConfig } from '../types';

/**
 * Central personal configuration. Edit these values to update the site.
 * Only add facts that are true; leave optional fields undefined until you have them.
 */
const email = 'dump9825@gmail.com';

export const siteConfig: SiteConfig = {
  fullName: 'Justine V. Piamonte',
  displayName: 'Justine',
  initials: 'JVP',
  logoLetter: 'J',
  logoSuffix: 'DEV',
  title: 'Computer Science Student & Aspiring Developer',
  roles: ['Aspiring Developer', 'Web Development Enthusiast', 'Computer Science Student'],
  focus: 'Web Development',
  intro:
    'I’m a Computer Science student and aspiring developer who enjoys turning ideas into clean, responsive web experiences — learning something new with every project I build.',
  location: 'Calbayog City, Philippines',
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
