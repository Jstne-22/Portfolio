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
      <Navbar site={site} sections={sections} />
      <main id="main" className="main">
        <section id="home" className="hero" aria-labelledby="home-heading">
          <h1 id="home-heading">Hi, I’m {site.displayName}</h1>
        </section>
        <Section id="about" eyebrow="About me" title="About Me" />
        <Section id="skills" eyebrow="Skills" title="Skills & Tools" />
        <Section id="projects" eyebrow="Projects" title="Projects" />
        <Section id="education" eyebrow="Education" title="Education" />
        <Section id="contact" eyebrow="Contact me" title="Let’s Work Together" />
      </main>
    </div>
  );
}
