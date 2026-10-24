import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Sections', () => {
  it('shows all six Sections, each with a heading', () => {
    render(<App />);

    const expectedHeadings = [
      /hi, i['’]m justine/i,
      /about me/i,
      /skills/i,
      /projects/i,
      /education/i,
      /let['’]s work together/i,
    ];
    for (const name of expectedHeadings) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
  });
});

describe('Navigation', () => {
  it('links to every Section from the sidebar', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /primary/i });

    const targets: Record<string, string> = {
      Home: 'home',
      About: 'about',
      Skills: 'skills',
      Projects: 'projects',
      Education: 'education',
      Contact: 'contact',
    };
    for (const [label, id] of Object.entries(targets)) {
      const link = within(nav).getByRole('link', { name: label });
      expect(link).toHaveAttribute('href', `#${id}`);
      expect(document.getElementById(id)?.tagName).toBe('SECTION');
    }
  });

  it('marks Home as the current Section on first load', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'location');
    expect(within(nav).getByRole('link', { name: 'About' })).not.toHaveAttribute('aria-current');
  });

  it('links to the Owner’s configured email and GitHub, and to no LinkedIn', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute(
      'href',
      'https://github.com/Jstne-22',
    );
    expect(screen.getByRole('link', { name: /send an email/i })).toHaveAttribute(
      'href',
      'mailto:dump9825@gmail.com',
    );
    expect(screen.queryByRole('link', { name: /linkedin/i })).not.toBeInTheDocument();
  });
});
