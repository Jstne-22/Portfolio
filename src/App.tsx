import About from './components/About';
import Backdrop from './components/Backdrop';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import CursorGlow from './components/CursorGlow';
import Education from './components/Education';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import ScrollProgress from './components/ScrollProgress';
import Skills from './components/Skills';
import { educationEntries } from './data/education';
import { navSections, siteConfig, socialUrl } from './data/portfolio';
import { ownerProjects } from './data/projects';
import { skills } from './data/skills';
import { skillCategories, type EducationEntry, type NavSection, type Project, type SiteConfig } from './types';

interface AppProps {
  /** Overridable for tests; defaults to the real data modules. */
  site?: SiteConfig;
  sections?: NavSection[];
  education?: EducationEntry[];
  projects?: Project[];
}

export default function App({
  site = siteConfig,
  sections = navSections,
  education = educationEntries,
  projects = ownerProjects,
}: AppProps) {
  return (
    <div className="app">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Backdrop />
      <CursorGlow />
      <ScrollProgress />
      <Navbar site={site} sections={sections} />
      <main id="main" className="main">
        <Hero site={site} />
        <About site={site} />
        <Skills skills={skills} categories={skillCategories} />
        <Projects projects={projects} githubUrl={socialUrl(site, 'github')} />
        <Education entries={education} />
        <Contact site={site} />
      </main>
      <Footer site={site} />
      <BackToTop />
    </div>
  );
}
