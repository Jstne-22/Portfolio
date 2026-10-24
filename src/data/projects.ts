import type { Project } from '../types';

/**
 * The Owner's Projects, in display order. While this list is empty the Projects
 * Section shows a "Projects coming soon" panel instead.
 *
 * Only add real Projects, with technologies they actually use. Example entry:
 *
 * {
 *   title: 'My Project',
 *   description: 'What it does, in a sentence or two.',
 *   technologies: ['React', 'TypeScript'],
 *   preview: { src: '/images/projects/my-project.png', alt: 'Screenshot of My Project' },
 *   liveUrl: 'https://my-project.example.com',
 *   sourceUrl: 'https://github.com/Jstne-22/my-project',
 *   featured: true,
 * },
 */
export const ownerProjects: Project[] = [];
