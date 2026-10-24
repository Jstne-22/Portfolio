import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { Skill, SkillCategory } from '../types';
import Section from './Section';
import SkillLogo from './SkillLogo';

type Filter = 'All' | SkillCategory;

interface SkillsProps {
  skills: Skill[];
  categories: readonly SkillCategory[];
}

export default function Skills({ skills, categories }: SkillsProps) {
  const filters: Filter[] = ['All', ...categories];
  const [selected, setSelected] = useState<Filter>('All');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const tabId = (filter: Filter) => `${baseId}-tab-${filter}`;
  const panelId = `${baseId}-panel`;

  const shown = selected === 'All' ? skills : skills.filter((skill) => skill.category === selected);

  // ARIA tabs pattern: arrows move between tabs (wrapping), Home/End jump; selection follows focus.
  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = filters.length - 1;
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(filters[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="skills" eyebrow="Skills" title="Skills & Tools">
      <div role="tablist" aria-label="Skill categories" className="skill-tabs">
        {filters.map((filter, index) => {
          const isSelected = filter === selected;
          return (
            <button
              key={filter}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={tabId(filter)}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              className={`skill-tab${isSelected ? ' skill-tab--active' : ''}`}
              onClick={() => setSelected(filter)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={panelId} aria-labelledby={tabId(selected)} className="skill-panel">
        <ul className="skill-grid">
          {shown.map((skill) => (
            <li key={skill.name} className="glass-card skill-card" tabIndex={0}>
              <SkillLogo icon={skill.icon} />
              <span className="skill-card__name">{skill.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
