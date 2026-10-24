import { FolderGit2, GraduationCap, Home, Mail, Sparkles, User, type LucideIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useActiveSection } from '../hooks/useActiveSection';
import type { NavSection, SectionId, SiteConfig } from '../types';
import Logo from './Logo';
import SocialIcon from './SocialIcon';

const sectionIcons: Record<SectionId, LucideIcon> = {
  home: Home,
  about: User,
  skills: Sparkles,
  projects: FolderGit2,
  education: GraduationCap,
  contact: Mail,
};

interface NavbarProps {
  site: SiteConfig;
  sections: NavSection[];
}

export default function Navbar({ site, sections }: NavbarProps) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);

  return (
    <aside className="sidebar">
      <Logo site={site} />

      <nav aria-label="Primary" className="sidebar__nav">
        <ul>
          {sections.map(({ id, label }) => {
            const Icon = sectionIcons[id];
            const isActive = id === active;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link${isActive ? ' nav-link--active' : ''}`}
                  aria-current={isActive ? 'location' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <ul className="social-row" aria-label="Social links">
          {site.socials.map((social) => (
            <li key={social.kind}>
              <a
                href={social.url}
                className="icon-button"
                aria-label={social.label}
                {...(social.kind === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <SocialIcon kind={social.kind} />
              </a>
            </li>
          ))}
        </ul>
        <p className="sidebar__copyright">
          © {new Date().getFullYear()} {site.fullName}
        </p>
      </div>
    </aside>
  );
}
