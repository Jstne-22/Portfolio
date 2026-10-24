import { FolderGit2, GraduationCap, Home, Mail, Menu, Sparkles, User, X, type LucideIcon } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState, type FocusEvent } from 'react';
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

/**
 * Desktop sidebar plus the phone/tablet top bar and hamburger menu.
 * CSS shows one or the other; both share the Section list and the active Section.
 */
export default function Navbar({ site, sections }: NavbarProps) {
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);

  return (
    <>
      <aside className="sidebar">
        <Logo site={site} />

        <nav aria-label="Primary" className="sidebar__nav">
          <SectionLinks sections={sections} active={active} />
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

      <TopBar site={site} sections={sections} active={active} />
    </>
  );
}

interface TopBarProps extends NavbarProps {
  active: SectionId;
}

/** Matches the CSS breakpoint where the sidebar takes over from the top bar. */
const DESKTOP_QUERY = '(min-width: 1024px)';

function TopBar({ site, sections, active }: TopBarProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // While open, close on Escape, on a tap outside the bar, or when the sidebar takes over.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    desktop.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      desktop.removeEventListener('change', onBreakpoint);
    };
  }, [open]);

  // Tabbing out of the menu closes it, so it never sits open over content that has focus.
  const onBlur = (event: FocusEvent) => {
    const next = event.relatedTarget as Node | null;
    if (next && !headerRef.current?.contains(next)) setOpen(false);
  };

  return (
    <header ref={headerRef} className="topbar" onBlur={onBlur}>
      <div className="topbar__bar">
        <Logo site={site} compact />
        <button
          ref={hamburgerRef}
          type="button"
          className="icon-button topbar__toggle"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      <nav id={menuId} aria-label="Section menu" className="topbar__menu" hidden={!open}>
        <SectionLinks sections={sections} active={active} onNavigate={() => setOpen(false)} />
      </nav>
    </header>
  );
}

interface SectionLinksProps {
  sections: NavSection[];
  active: SectionId;
  onNavigate?: () => void;
}

function SectionLinks({ sections, active, onNavigate }: SectionLinksProps) {
  return (
    <ul className="nav-list">
      {sections.map(({ id, label }) => {
        const Icon = sectionIcons[id];
        const isActive = id === active;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`nav-link${isActive ? ' nav-link--active' : ''}`}
              aria-current={isActive ? 'location' : undefined}
              onClick={onNavigate}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{label}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
