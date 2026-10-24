import Backdrop from './components/Backdrop';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Section from './components/Section';
import { navSections, siteConfig } from './data/portfolio';
import type { NavSection, SiteConfig } from './types';

interface AppProps {
  /** Overridable for tests; defaults to the real data modules. */
  site?: SiteConfig;
  sections?: NavSection[];
}

export default function App({ site = siteConfig, sections = navSections }: AppProps) {
  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Backdrop />
      <Navbar site={site} sections={sections} />
      <main id="main" className="main">
        <Hero site={site} />
        <Section id="about" eyebrow="About me" title="About Me" />
        <Section id="skills" eyebrow="Skills" title="Skills & Tools" />
        <Section id="projects" eyebrow="Projects" title="Projects" />
        <Section id="education" eyebrow="Education" title="Education" />
        <Section id="contact" eyebrow="Contact me" title="Let’s Work Together" />
      </main>
    </div>
  );
}
