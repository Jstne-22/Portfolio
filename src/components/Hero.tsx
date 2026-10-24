import { ArrowRight, Send } from 'lucide-react';
import type { SiteConfig } from '../types';
import CodeCard from './CodeCard';
import OrbitEmblem from './OrbitEmblem';
import TypingTagline from './TypingTagline';

interface HeroProps {
  site: SiteConfig;
}

export default function Hero({ site }: HeroProps) {
  return (
    <section id="home" className="hero" aria-labelledby="home-heading">
      <div className="hero__text">
        <p className="hero__eyebrow">Welcome to my world</p>
        {/* Focusable from script so "Back to top" can return keyboard focus here. */}
        <h1 id="home-heading" className="hero__title" tabIndex={-1}>
          Hi, I’m <span className="text-accent">{site.displayName}</span>
        </h1>
        <p className="hero__headline">
          I build things for the <span className="text-blue">web.</span>
        </p>
        <TypingTagline phrases={site.roles} />
        <p className="hero__intro">{site.intro}</p>
        <div className="hero__actions">
          <a href="#projects" className="btn btn--primary">
            View My Projects
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn--ghost">
            Contact Me
            <Send size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero__visual">
        <OrbitEmblem site={site} />
        <CodeCard site={site} />
      </div>
    </section>
  );
}
