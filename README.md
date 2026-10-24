# Justine V. Piamonte — Developer Portfolio

A single-page, futuristic portfolio site built with **React**, **TypeScript** and **Vite**. It has six Sections — Home, About, Skills, Projects, Education and Contact — and every fact on it comes from a few data files you can edit without touching any component code.

It is a static site: no server, database or secret keys. The contact form opens the Visitor's own email app with a pre-filled message instead of sending anything from the website.

---

## 1. Required software

| Software | Why | Get it |
| --- | --- | --- |
| **Node.js 22 (22.12 or later) or 24** — the LTS versions (includes npm) | Runs the dev server, tests and build | <https://nodejs.org> (choose the LTS version) |
| **Git** | Saves versions of your work and pushes them to GitHub | <https://git-scm.com> |
| A **GitHub** account | Hosts your code | <https://github.com> |
| A **Vercel** account (free) | Publishes the site | <https://vercel.com> — sign up with GitHub |
| A code editor (optional) | Editing files | e.g. Visual Studio Code |

Check what you have:

```bash
node --version   # should print v22.12 or later, or v24
npm --version
git --version
```

## 2. Install

Open a terminal in this folder and run:

```bash
npm install
```

This downloads everything listed in `package.json` into `node_modules/`. You only need to run it again if `package.json` changes.

## 3. Run the development server

```bash
npm run dev
```

Open the address it prints (usually <http://localhost:5173>). The page reloads by itself whenever you save a file. Press `Ctrl + C` in the terminal to stop it.

## 4. Check and build

| Command | What it does |
| --- | --- |
| `npm test` | Runs the automated tests (navigation, Skills tabs, Projects, contact form, …) |
| `npm run typecheck` | Checks the TypeScript types — catches typos in the data files |
| `npm run build` | Type-checks, then builds the production site into the `dist/` folder |
| `npm run preview` | Serves the built `dist/` folder locally (usually <http://localhost:4173>) so you can check it before publishing |

Run `npm test` and `npm run build` before every publish. If either fails, fix that first.

## 5. Customize the site

All content lives in `src/data/`. Edit these files, save, and the dev server updates instantly. TypeScript flags any field you mistype.

| File | What it controls |
| --- | --- |
| `src/data/portfolio.ts` | Your name, title, the hero tagline (`roles`), `focus`, intro, About cards and highlights, location, email, profile photo, and social links |
| `src/data/education.ts` | The Education timeline, including optional coursework and activities |
| `src/data/skills.ts` | The Skill cards and their logos |
| `src/data/projects.ts` | Your Projects (empty for now, which shows the "Projects coming soon" panel) |

**Only put true facts in these files.** Leave optional things out until you have them — the site is designed to look complete without them, and anything missing shows as a clearly marked Placeholder (such as "Link coming soon") rather than a fake value.

Common changes:

- **Profile photo:** put the image in `public/images/` (e.g. `public/images/profile.jpg`) and set `profileImage: '/images/profile.jpg'` in `src/data/portfolio.ts`. Until then the glowing "J" emblem is shown; if the image ever fails to load, the emblem comes back automatically.
- **LinkedIn (or another profile):** in `src/data/portfolio.ts`, uncomment the LinkedIn line in `socials` and put in your real URL. Its icon then appears in the sidebar and in Contact.
- **Coursework and activities:** add text to the `coursework` and `activities` lists in `src/data/education.ts`. Empty lists show nothing.
- **Moving to a new year level:** update `yearLevel` in `src/data/education.ts` (the About highlight follows it) and the "3rd-year" wording in the first About card in `src/data/portfolio.ts`.
- **Colours:** the palette is a set of CSS variables at the top of `src/styles/global.css` (`--neon-pink`, `--electric-blue`, …).

## 6. Add or remove Skills

Edit the list in `src/data/skills.ts`. Each entry has a name, a Skill Category (`'Frontend'`, `'Backend'`, `'Database'` or `'Tools'`) and an icon:

```ts
import { siDocker } from 'simple-icons';
// …
{ name: 'Docker', category: 'Tools', icon: { kind: 'brand', icon: siDocker } },
```

- Brand logos come from [Simple Icons](https://simpleicons.org): search for the logo, then import it as `si` + its name (e.g. `siDocker`, `siNextdotjs`). Add `color: 'var(--text-primary)'` if the logo is too dark to see on the dark background.
- If Simple Icons doesn't have the logo, use a [Lucide](https://lucide.dev/icons) icon instead, as the file already does for SQL and Visual Studio Code:
  `{ kind: 'generic', icon: Database, color: 'var(--electric-blue)' }`.
- Skills deliberately have no percentage, level or years field.

## 7. Add Projects (for example, TranCash)

Edit the list in `src/data/projects.ts`. As soon as it has at least one entry, the "coming soon" panel is replaced by your Project cards.

```ts
export const ownerProjects: Project[] = [
  {
    title: 'TranCash',
    description: 'One or two sentences on what it does and who it is for.',
    technologies: ['Python', 'Flask', 'SQL'], // only what the project really uses
    preview: { src: '/images/projects/trancash.png', alt: 'Screenshot of the TranCash dashboard' },
    liveUrl: 'https://…',   // leave out until there is a live demo
    sourceUrl: 'https://github.com/Jstne-22/…', // leave out if the repo isn't public yet
    featured: true,
  },
];
```

- **Check the technology tags against the real code** before publishing.
- **Preview:** put a real screenshot in `public/images/projects/`. Without one, a "Preview coming soon" illustration is shown — never a broken image.
- **Missing links:** leave `liveUrl` or `sourceUrl` out and the button shows as a disabled "Link coming soon".
- **Featured Project:** the first entry with `featured: true` is shown large at the top. If none is flagged, the first entry is featured.

## 8. Push to GitHub

This folder is already a Git repository with commits; it just isn't connected to GitHub yet.

1. On GitHub, click **New repository**. Give it a name (e.g. `portfolio`), keep it **empty** (don't add a README, `.gitignore` or licence), and click **Create repository**.
2. In this folder, run (replace the URL with your new repository's URL):

   ```bash
   git remote add origin https://github.com/Jstne-22/portfolio.git
   git branch -M main
   git push -u origin main
   ```

   The first push may ask you to sign in to GitHub in the browser.

## 9. Deploy to Vercel

1. Go to <https://vercel.com>, sign in with GitHub, and click **Add New… → Project**.
2. **Import** your portfolio repository (you may need to give Vercel access to it).
3. Vercel detects the **Vite** framework preset. The defaults are correct — you don't need to change anything:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
   - Root directory: the repository root
   - No environment variables are needed, and there is no `vercel.json`.
4. Click **Deploy**. After about a minute you get a live address like `https://portfolio-xxxx.vercel.app`.

You can rename the address or add your own domain later under the project's **Settings → Domains** in Vercel.

## 10. Update the live site

Once Vercel is connected, every push to `main` publishes automatically:

```bash
# 1. Make your changes, then check them
npm test
npm run build

# 2. Save a version and push it
git add .
git commit -m "Add TranCash project"
git push
```

Vercel rebuilds and updates the live site in about a minute. If a build fails there, open the deployment in the Vercel dashboard to see the error; the previous version stays live until a build succeeds.

---

## Project structure

```text
public/            Files served as-is (favicon; add images/ here)
src/
  data/            ← your content: portfolio, education, skills, projects
  components/      The Sections and other building blocks
  hooks/           Small reusable behaviours (active Section, reduced motion, reveals)
  lib/             Contact-form logic and the email-app link helper
  styles/          global.css (palette and styles), animations.css, responsive.css
  types/           The shapes of the data files
  App.test.tsx     The automated tests
index.html         Page title, description and fonts
```

`my reference image.png` is the original design reference. It is kept in the repository for comparison but is not part of the published site.

## Accessibility and motion

The site works by keyboard, labels its icon buttons for screen readers, and respects the system **reduce motion** setting: orbit, floating, typing, parallax and scroll-reveal animations are turned off, and the tagline shows as plain text.
