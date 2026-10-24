import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from './App';
import { educationEntries } from './data/education';
import { siteConfig } from './data/portfolio';

/** Advances fake timers in small ticks so effects that schedule follow-up timers get to run. */
function passTime(ms: number) {
  for (let elapsed = 0; elapsed < ms; elapsed += 50) {
    act(() => vi.advanceTimersByTime(50));
  }
}

function reducedMotionQuery(query: string): MediaQueryList {
  return {
    matches: query.includes('prefers-reduced-motion: reduce'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  };
}

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

describe('Hero', () => {
  it('shows the Owner’s display name in the page’s only h1', () => {
    render(<App />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/hi, i['’]m justine/i);
  });

  it('sends Visitors to Projects and Contact from its buttons', () => {
    render(<App />);
    const hero = document.getElementById('home')!;
    expect(within(hero).getByRole('link', { name: /view my projects/i })).toHaveAttribute('href', '#projects');
    expect(within(hero).getByRole('link', { name: /contact me/i })).toHaveAttribute('href', '#contact');
  });

  it('describes the Owner in the code card using the site config', () => {
    render(<App site={{ ...siteConfig, displayName: 'Robin', focus: 'Game Development', location: 'Tacloban City' }} />);
    const card = screen.getByRole('figure', { name: /code snippet/i });
    expect(card).toHaveTextContent('name: "Robin"');
    expect(card).toHaveTextContent('focus: "Game Development"');
    expect(card).toHaveTextContent('location: "Tacloban City"');
  });

  it('shows the glowing emblem, and no image, when no profile image is configured', () => {
    render(<App />);
    const hero = document.getElementById('home')!;
    expect(within(hero).queryByRole('img', { name: /portrait/i })).not.toBeInTheDocument();
    expect(hero.querySelector('img')).toBeNull();
  });

  it('shows the profile image when one is configured, and falls back to the emblem if it fails to load', () => {
    render(<App site={{ ...siteConfig, profileImage: '/images/profile.jpg' }} />);
    const photo = screen.getByRole('img', { name: /portrait of justine v\. piamonte/i });
    expect(photo).toHaveAttribute('src', '/images/profile.jpg');

    fireEvent.error(photo);
    expect(screen.queryByRole('img', { name: /portrait/i })).not.toBeInTheDocument();
  });

  it('types the tagline slowly', () => {
    vi.useFakeTimers();
    try {
      render(<App />);
      const hero = document.getElementById('home')!;
      const before = hero.textContent!;
      const fullPhraseCount = (text: string) => text.split('Aspiring Developer').length;
      passTime(1000);
      expect(hero.textContent).not.toBe(before);
      // Slow enough to read: one second in, the first phrase is still being typed.
      expect(fullPhraseCount(hero.textContent!)).toBe(fullPhraseCount(before));
      passTime(2000);
      expect(fullPhraseCount(hero.textContent!)).toBe(fullPhraseCount(before) + 1);
    } finally {
      vi.useRealTimers();
    }
  });

  it('shows every tagline phrase as still text under reduced motion', () => {
    vi.useFakeTimers();
    const matchMedia = vi.spyOn(window, 'matchMedia').mockImplementation(reducedMotionQuery);
    try {
      render(<App />);
      const hero = document.getElementById('home')!;
      expect(hero).toHaveTextContent('Aspiring Developer · Web Development Enthusiast · Computer Science Student');

      const before = hero.textContent;
      passTime(5000);
      expect(hero.textContent).toBe(before);
    } finally {
      matchMedia.mockRestore();
      vi.useRealTimers();
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

describe('Phone and tablet menu', () => {
  it('opens from the hamburger and closes after a Section is chosen', async () => {
    const user = userEvent.setup();
    render(<App />);
    const hamburger = screen.getByRole('button', { name: /menu/i });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: /menu/i })).not.toBeInTheDocument();

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('navigation', { name: /menu/i });
    expect(within(menu).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');

    await user.click(within(menu).getByRole('link', { name: 'About' }));
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('navigation', { name: /menu/i })).not.toBeInTheDocument();
  });

  it('closes on Escape and returns focus to the hamburger', async () => {
    const user = userEvent.setup();
    render(<App />);
    const hamburger = screen.getByRole('button', { name: /menu/i });

    await user.click(hamburger);
    await user.tab();
    expect(within(screen.getByRole('navigation', { name: /menu/i })).getByRole('link', { name: 'Home' })).toHaveFocus();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('navigation', { name: /menu/i })).not.toBeInTheDocument();
    expect(hamburger).toHaveFocus();
  });

  it('closes when focus or a tap moves outside it', async () => {
    const user = userEvent.setup();
    render(<App />);
    const hamburger = screen.getByRole('button', { name: /menu/i });

    await user.click(hamburger);
    const menu = screen.getByRole('navigation', { name: /menu/i });
    within(menu).getByRole('link', { name: 'Contact' }).focus();
    await user.tab();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    await user.click(hamburger);
    await user.click(screen.getByRole('heading', { level: 1 }));
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('lists the same Sections as the sidebar, with the same current Section', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /menu/i }));
    const menu = screen.getByRole('navigation', { name: /menu/i });

    const labels = within(menu)
      .getAllByRole('link')
      .map((link) => link.textContent);
    expect(labels).toEqual(['Home', 'About', 'Skills', 'Projects', 'Education', 'Contact']);
    expect(within(menu).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'location');
  });
});

describe('About', () => {
  it('introduces the Owner and shows the highlight facts from the site config', () => {
    render(<App />);
    const about = document.getElementById('about')!;
    expect(about).toHaveTextContent(/3rd-year Bachelor of Science in Computer Science student/i);
    expect(about).toHaveTextContent(/learn best by building/i);

    const highlights: [RegExp, RegExp][] = [
      [/program/i, /BS Computer Science/],
      [/year level/i, /3rd Year/],
      [/location/i, /Calbayog City, Philippines/],
      [/focus/i, /Web Development/],
    ];
    for (const [label, value] of highlights) {
      const term = within(about).getByText(label, { selector: 'dt' });
      expect(term.nextElementSibling).toHaveTextContent(value);
    }
  });
});

describe('Education', () => {
  it('shows the school, program, year level and period', () => {
    render(<App />);
    const education = document.getElementById('education')!;
    expect(within(education).getByRole('heading', { name: /christ the king college/i })).toBeInTheDocument();
    expect(education).toHaveTextContent('Calbayog City');
    expect(education).toHaveTextContent('Bachelor of Science in Computer Science');
    expect(education).toHaveTextContent('3rd Year');
    expect(education).toHaveTextContent('2024 – Present');
  });

  it('shows no coursework or activities headings while those lists are empty', () => {
    render(<App />);
    const education = document.getElementById('education')!;
    expect(within(education).queryByRole('heading', { name: /coursework/i })).not.toBeInTheDocument();
    expect(within(education).queryByRole('heading', { name: /activities/i })).not.toBeInTheDocument();
  });

  it('lists coursework and activities once the Owner fills them in', () => {
    const [entry] = educationEntries;
    render(
      <App
        education={[{ ...entry, coursework: ['Data Structures and Algorithms'], activities: ['Campus coding club'] }]}
      />,
    );
    const education = document.getElementById('education')!;
    const coursework = within(education).getByRole('heading', { name: /coursework/i });
    expect(coursework.nextElementSibling).toHaveTextContent('Data Structures and Algorithms');
    const activities = within(education).getByRole('heading', { name: /activities/i });
    expect(activities.nextElementSibling).toHaveTextContent('Campus coding club');
  });
});
