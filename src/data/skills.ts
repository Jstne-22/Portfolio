import { Code2, Database } from 'lucide-react';
import {
  siCss,
  siExpress,
  siFlask,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siNodedotjs,
  siNpm,
  siPython,
  siReact,
  siTypescript,
} from 'simple-icons';
import type { Skill } from '../types';

// Express and GitHub logos are near-black, so they are drawn in the light text colour.
const lightText = 'var(--text-primary)';

/** Skills shown in the Skills Section, in display order. Add or remove entries freely. */
export const skills: Skill[] = [
  { name: 'HTML5', category: 'Frontend', icon: { kind: 'brand', icon: siHtml5 } },
  // simple-icons ships the current CSS logo rather than the CSS3 shield.
  { name: 'CSS3', category: 'Frontend', icon: { kind: 'brand', icon: siCss } },
  { name: 'JavaScript', category: 'Frontend', icon: { kind: 'brand', icon: siJavascript } },
  { name: 'TypeScript', category: 'Frontend', icon: { kind: 'brand', icon: siTypescript } },
  { name: 'React', category: 'Frontend', icon: { kind: 'brand', icon: siReact } },

  { name: 'Node.js', category: 'Backend', icon: { kind: 'brand', icon: siNodedotjs } },
  { name: 'Express.js', category: 'Backend', icon: { kind: 'brand', icon: siExpress, color: lightText } },
  { name: 'Python', category: 'Backend', icon: { kind: 'brand', icon: siPython } },
  { name: 'Flask', category: 'Backend', icon: { kind: 'brand', icon: siFlask } },

  // SQL has no single brand logo.
  { name: 'SQL', category: 'Database', icon: { kind: 'generic', icon: Database, color: 'var(--electric-blue)' } },

  { name: 'Git', category: 'Tools', icon: { kind: 'brand', icon: siGit } },
  { name: 'GitHub', category: 'Tools', icon: { kind: 'brand', icon: siGithub, color: lightText } },
  // simple-icons no longer includes the Visual Studio Code logo.
  { name: 'Visual Studio Code', category: 'Tools', icon: { kind: 'generic', icon: Code2, color: '#007ACC' } },
  { name: 'npm', category: 'Tools', icon: { kind: 'brand', icon: siNpm } },
];
