import About from './components/About';
import Backdrop from './components/Backdrop';
import Education from './components/Education';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Section from './components/Section';
import Skills from './components/Skills';
import { educationEntries } from './data/education';
import { navSections, siteConfig } from './data/portfolio';
import { skills } from './data/skills';
import { skillCategories, type EducationEntry, type NavSection, type SiteConfig } from './types';

interface AppProps {
  /** Overridable for tests; defaults to the real data modules. */
  site?: SiteConfig;
  sections?: NavSection[];
  education?: EducationEntry[];
}

export default function App({ site = siteConfig, sections = navSections, education = educationEntries }: AppProps) {
  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Backdrop />
      <Navbar site={site} sections={sections} />
      <main id="main" className="main">
        <Hero site={site} />
        <About site={site} />
        <Skills skills={skills} categories={skillCategories} />
        <Section id="projects" eyebrow="Projects" title="Projects" />
        <Education entries={education} />
        <Section id="contact" eyebrow="Contact me" title="Let’s Work Together" />
      </main>
    </div>
  );
}
