import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from './App';
import { educationEntries } from './data/education';
import { navigateTo } from './lib/navigate';
import { siteConfig } from './data/portfolio';
import type { Project } from './types';

// Opening the Visitor's email app is a real browser navigation, which jsdom can't perform or observe.
vi.mock('./lib/navigate', () => ({ navigateTo: vi.fn() }));

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
      /^projects$/i,
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

describe('Skills', () => {
  const expectedByCategory: Record<string, string[]> = {
    Frontend: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React'],
    Backend: ['Node.js', 'Express.js', 'Python', 'Flask'],
    Database: ['SQL', 'Supabase'],
    Tools: ['Git', 'GitHub', 'Visual Studio Code', 'npm', 'Vercel'],
  };
  const shownSkills = () =>
    within(screen.getByRole('tabpanel'))
      .getAllByRole('listitem')
      .map((card) => card.textContent);

  it('shows every Skill under All', () => {
    render(<App />);
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true');
    expect(shownSkills()).toEqual(Object.values(expectedByCategory).flat());
  });

  it('shows only the chosen Skill Category’s Skills', async () => {
    const user = userEvent.setup();
    render(<App />);
    for (const [category, skills] of Object.entries(expectedByCategory)) {
      await user.click(screen.getByRole('tab', { name: category }));
      expect(screen.getByRole('tab', { name: category })).toHaveAttribute('aria-selected', 'true');
      expect(shownSkills()).toEqual(skills);
    }
  });

  it('moves between Skill Category tabs with the arrow keys', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('tab', { name: 'All' }));

    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Frontend' })).toHaveFocus();
    expect(shownSkills()).toEqual(expectedByCategory.Frontend);

    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Tools' })).toHaveFocus();
    expect(shownSkills()).toEqual(expectedByCategory.Tools);

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Tools' })).toHaveFocus();
    expect(shownSkills()).toEqual(expectedByCategory.Tools);
  });

  it('shows no percentages, levels or years on Skill cards', () => {
    render(<App />);
    const skills = document.getElementById('skills')!;
    expect(skills.textContent).not.toMatch(/%|\blevel\b|\byears?\b|beginner|intermediate|advanced|expert/i);
  });
});

describe('Projects', () => {
  // Test Projects live only here, so these tests don't depend on the shipped list.
  const testProjects: Project[] = [
    {
      title: 'Weather Board',
      description: 'A small dashboard for local forecasts.',
      technologies: ['React', 'TypeScript'],
      liveUrl: 'https://example.com/weather',
      sourceUrl: 'https://github.com/example/weather',
    },
    {
      title: 'Campus Planner',
      description: 'Keeps track of classes and deadlines.',
      technologies: ['Python', 'Flask', 'SQL'],
      sourceUrl: 'https://github.com/example/planner',
      featured: true,
    },
    {
      title: 'Notes CLI',
      description: 'Plain-text notes from the terminal.',
      technologies: ['Node.js'],
    },
  ];
  const projectsSection = () => document.getElementById('projects')!;
  const projectTitles = () =>
    within(projectsSection())
      .getAllByRole('article')
      .map((card) => within(card).getByRole('heading').textContent);

  it('shows the coming-soon panel and a GitHub link, and no Project cards, while the list is empty', () => {
    const githubUrl = 'https://github.com/someone-else';
    const socials = siteConfig.socials.map((social) => (social.kind === 'github' ? { ...social, url: githubUrl } : social));
    render(<App site={{ ...siteConfig, socials }} projects={[]} />);
    const section = projectsSection();
    expect(within(section).getByRole('heading', { name: /projects coming soon/i })).toBeInTheDocument();
    expect(within(section).getByRole('link', { name: /see my code on github/i })).toHaveAttribute('href', githubUrl);
    expect(within(section).queryAllByRole('article')).toHaveLength(0);
  });

  it('puts the flagged Featured Project first, followed by the others', () => {
    render(<App projects={testProjects} />);
    expect(within(projectsSection()).queryByRole('heading', { name: /coming soon/i })).not.toBeInTheDocument();
    expect(projectTitles()).toEqual(['Campus Planner', 'Weather Board', 'Notes CLI']);
    expect(within(projectsSection()).getAllByRole('article')[0]).toHaveTextContent(/featured project/i);
  });

  it('features the first Project when none is flagged', () => {
    render(<App projects={testProjects.map(({ featured: _, ...project }) => project)} />);
    expect(projectTitles()).toEqual(['Weather Board', 'Campus Planner', 'Notes CLI']);
  });

  it('shows a disabled “Link coming soon” control, not a link, for a missing URL', () => {
    render(<App projects={testProjects} />);
    const featured = within(projectsSection()).getAllByRole('article')[0];

    expect(within(featured).getByRole('link', { name: /view source code/i })).toHaveAttribute(
      'href',
      'https://github.com/example/planner',
    );
    expect(within(featured).queryByRole('link', { name: /view project/i })).not.toBeInTheDocument();
    const placeholder = within(featured).getByRole('button', { name: /view project.*link coming soon/i });
    expect(placeholder).toBeDisabled();
    expect(projectsSection().querySelector('a[href="#"]')).toBeNull();
  });

  it('shows a preview placeholder, never a broken image, when a Project has no preview', () => {
    render(<App projects={testProjects} />);
    const featured = within(projectsSection()).getAllByRole('article')[0];
    expect(featured.querySelector('img')).toBeNull();
    expect(featured).toHaveTextContent(/preview coming soon/i);
  });

  it('pages through a Featured Project’s screenshots with the buttons, thumbnails and arrow keys', async () => {
    const user = userEvent.setup();
    const screenshots = ['Home', 'Send money', 'Profile'].map((caption) => ({
      src: `/shots/${caption}.webp`,
      alt: `${caption} screen`,
      caption,
    }));
    render(<App projects={[{ ...testProjects[0], screenshots }]} />);
    const gallery = within(projectsSection()).getByRole('region', { name: /weather board screenshots/i });
    const shown = () => within(gallery).getAllByRole('img').find((img) => img.getAttribute('alt'));

    expect(shown()).toHaveAttribute('alt', 'Home screen');
    expect(gallery).toHaveTextContent('1 / 3');

    await user.click(within(gallery).getByRole('button', { name: /previous screenshot/i }));
    expect(shown()).toHaveAttribute('alt', 'Profile screen');

    await user.click(within(gallery).getByRole('button', { name: 'Send money' }));
    expect(shown()).toHaveAttribute('alt', 'Send money screen');
    expect(within(gallery).getByRole('button', { name: 'Send money' })).toHaveAttribute('aria-current', 'true');

    fireEvent.keyDown(gallery, { key: 'ArrowRight' });
    expect(shown()).toHaveAttribute('alt', 'Profile screen');
    expect(gallery).toHaveTextContent('3 / 3');
  });

  it('marks a private repository as private instead of linking to it', () => {
    render(<App projects={[{ ...testProjects[2], sourceIsPrivate: true }]} />);
    const card = within(projectsSection()).getByRole('article');
    expect(card).toHaveTextContent(/private repository/i);
    expect(within(card).queryByRole('link', { name: /source code/i })).not.toBeInTheDocument();
    expect(within(card).queryByRole('button', { name: /source code/i })).not.toBeInTheDocument();
  });
});

describe('Contact', () => {
  const contactSection = () => document.getElementById('contact')!;
  const field = (name: RegExp) => within(contactSection()).getByRole('textbox', { name });
  const submit = () => within(contactSection()).getByRole('button', { name: /open in my email app/i });

  beforeEach(() => vi.mocked(navigateTo).mockClear());

  it('shows the Owner’s email, GitHub and location, and an email button', () => {
    render(<App />);
    const section = contactSection();
    expect(section).toHaveTextContent('dump9825@gmail.com');
    expect(section).toHaveTextContent('Calbayog City, Philippines');
    expect(within(section).getByRole('link', { name: /github\.com\/Jstne-22/i })).toHaveAttribute(
      'href',
      'https://github.com/Jstne-22',
    );
    expect(within(section).getByRole('link', { name: /email me/i })).toHaveAttribute('href', 'mailto:dump9825@gmail.com');
  });

  it('lists a social profile the Owner adds to the config, such as LinkedIn', () => {
    const linkedin = { kind: 'linkedin' as const, label: 'LinkedIn profile', url: 'https://www.linkedin.com/in/someone' };
    render(<App site={{ ...siteConfig, socials: [...siteConfig.socials, linkedin] }} />);
    expect(within(contactSection()).getByRole('link', { name: /linkedin\.com\/in\/someone/i })).toHaveAttribute(
      'href',
      linkedin.url,
    );
  });

  it('explains that the form opens the Visitor’s own email app', () => {
    render(<App />);
    expect(contactSection()).toHaveTextContent(/opens your own email app/i);
  });

  it('shows an error for every field when submitted empty, and opens nothing', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(submit());

    for (const name of [/^name/i, /^email/i, /^subject/i, /^message/i]) {
      expect(field(name)).toHaveAttribute('aria-invalid', 'true');
      expect(field(name)).toHaveAccessibleDescription(/required/i);
    }
    expect(within(contactSection()).getAllByRole('alert').length).toBeGreaterThan(0);
    expect(navigateTo).not.toHaveBeenCalled();
  });

  it('shows an email error for a malformed address', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(field(/^name/i), 'Ana Cruz');
    await user.type(field(/^email/i), 'ana@example');
    await user.type(field(/^subject/i), 'Project idea');
    await user.type(field(/^message/i), 'Hello Justine, I would like to talk about a project.');
    await user.click(submit());

    expect(field(/^email/i)).toHaveAttribute('aria-invalid', 'true');
    expect(field(/^email/i)).toHaveAccessibleDescription(/valid email/i);
    expect(field(/^name/i)).not.toHaveAttribute('aria-invalid', 'true');
    expect(navigateTo).not.toHaveBeenCalled();
  });

  it('asks for a longer message when it is too short', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(field(/^message/i), 'Hi');
    await user.click(submit());
    expect(field(/^message/i)).toHaveAccessibleDescription(/at least/i);
  });

  it('opens a mailto: URL to the Owner with the encoded subject and a body of name, email and message', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(field(/^name/i), 'Ana Cruz');
    await user.type(field(/^email/i), 'ana@example.com');
    await user.type(field(/^subject/i), 'Project idea');
    await user.type(field(/^message/i), 'Hello Justine, I would like to talk about a project.');
    await user.click(submit());

    expect(navigateTo).toHaveBeenCalledWith(
      'mailto:dump9825@gmail.com' +
        '?subject=Project%20idea' +
        '&body=Name%3A%20Ana%20Cruz%0D%0AEmail%3A%20ana%40example.com%0D%0A%0D%0A' +
        'Hello%20Justine%2C%20I%20would%20like%20to%20talk%20about%20a%20project.',
    );
  });
});

describe('Footer', () => {
  it('shows the Owner’s name and the current year', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2031-03-15T12:00:00Z'));
    try {
      render(<App />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveTextContent('Justine V. Piamonte');
      expect(footer).toHaveTextContent('2031');
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('Back to top', () => {
  const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY');
  afterEach(() => {
    if (originalScrollY) Object.defineProperty(window, 'scrollY', originalScrollY);
    else delete (window as { scrollY?: number }).scrollY;
  });

  const scrollTo = (y: number) => {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });
  };

  it('appears after scrolling down and returns to Home', async () => {
    render(<App />);
    expect(screen.queryByRole('link', { name: 'Back to top' })).not.toBeInTheDocument();

    scrollTo(900);
    const backToTop = await screen.findByRole('link', { name: 'Back to top' });
    expect(backToTop).toHaveAttribute('href', '#home');
    fireEvent.click(backToTop);
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();

    scrollTo(0);
    await waitFor(() => expect(screen.queryByRole('link', { name: 'Back to top' })).not.toBeInTheDocument());
  });
});
