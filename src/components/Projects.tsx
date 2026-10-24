import { ChevronDown, ExternalLink, Lock, Rocket } from 'lucide-react';
import { useState } from 'react';
import type { Project, ProjectAbout, ProjectPreview } from '../types';
import LinkButton from './LinkButton';
import ScreenshotGallery from './ScreenshotGallery';
import Section from './Section';
import SocialIcon from './SocialIcon';

interface ProjectsProps {
  projects: Project[];
  /** Target of the coming-soon panel's GitHub button. */
  githubUrl?: string;
}

export default function Projects({ projects, githubUrl }: ProjectsProps) {
  const [featured, ...others] = withFeaturedFirst(projects);

  return (
    <Section id="projects" eyebrow="Projects" title="Projects">
      {featured ? (
        <>
          <FeaturedCard project={featured} />
          {others.length > 0 && (
            <div className="project-grid">
              {others.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="glass-card coming-soon">
          <Rocket className="coming-soon__icon" size={40} aria-hidden="true" />
          <h3 className="coming-soon__title">Projects coming soon</h3>
          <p className="coming-soon__text">
            Until Projects are added here, you can see my code on GitHub.
          </p>
          <LinkButton
            href={githubUrl}
            label="See my code on GitHub"
            icon={<SocialIcon kind="github" />}
            variant="primary"
          />
        </div>
      )}
    </Section>
  );
}

/** The Featured Project (first flagged, else first entry) followed by the rest in their original order. */
function withFeaturedFirst(projects: Project[]): Project[] {
  if (projects.length === 0) return [];
  const index = Math.max(
    projects.findIndex((project) => project.featured),
    0,
  );
  return [projects[index], ...projects.filter((_, i) => i !== index)];
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="glass-card project-card project-card--featured">
      {project.screenshots?.length ? (
        <ScreenshotGallery title={project.title} screenshots={project.screenshots} />
      ) : (
        <Preview preview={project.preview} />
      )}
      <div className="project-card__body">
        <p className="project-card__eyebrow">Featured Project</p>
        <ProjectDetails project={project} />
      </div>
      {project.about && <AboutPanel about={project.about} />}
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass-card project-card">
      <ProjectDetails project={project} />
      {project.about && <AboutPanel about={project.about} />}
    </article>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
      <h3 className="project-card__title">{project.title}</h3>
      {project.tagline && <p className="project-card__tagline">{project.tagline}</p>}
      <p className="project-card__description">{project.description}</p>
      <ul className="tag-list" aria-label="Technologies">
        {project.technologies.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>
      <div className="project-card__links">
        <LinkButton
          href={project.liveUrl}
          label="View Project"
          icon={<ExternalLink size={16} aria-hidden="true" />}
          variant="primary"
        />
        {project.sourceIsPrivate ? (
          <span className="btn btn--placeholder" title="The source code is in a private GitHub repository">
            <Lock size={16} aria-hidden="true" />
            Private repository
          </span>
        ) : (
          <LinkButton href={project.sourceUrl} label="View Source Code" icon={<SocialIcon kind="github" size={16} />} />
        )}
      </div>
    </>
  );
}

/** The Project's long write-up, collapsed until the Visitor asks for it. */
function AboutPanel({ about }: { about: ProjectAbout }) {
  return (
    <details className="project-about">
      <summary className="project-about__toggle">
        Full project details
        <ChevronDown className="project-about__chevron" size={18} aria-hidden="true" />
      </summary>
      <div className="project-about__body">
        <p className="project-about__overview">{about.overview}</p>
        <div className="project-about__groups">
          {about.featureGroups.map((group) => (
            <section key={group.heading} className="project-about__group">
              <h4 className="project-about__heading">{group.heading}</h4>
              <ul className="project-about__list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </details>
  );
}

/** The Project's screenshot, or an illustration placeholder if it has none or it fails to load. */
function Preview({ preview }: { preview?: ProjectPreview }) {
  // Remember which image failed, so a different preview path tries again.
  const [failedSrc, setFailedSrc] = useState<string>();
  if (preview && preview.src !== failedSrc) {
    return (
      <div className="project-preview">
        <img src={preview.src} alt={preview.alt} loading="lazy" onError={() => setFailedSrc(preview.src)} />
      </div>
    );
  }
  return (
    <div className="project-preview project-preview--placeholder">
      <span className="project-preview__code" aria-hidden="true">
        &lt;/&gt;
      </span>
      <span className="project-preview__label">Preview coming soon</span>
    </div>
  );
}
