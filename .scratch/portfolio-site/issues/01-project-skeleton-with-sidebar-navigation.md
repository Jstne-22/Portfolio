# 01: Project skeleton with working sidebar navigation

**What to build:** A Visitor opens the site locally and sees a dark page in the reference palette, with the desktop sidebar and six titled, empty Sections. The sidebar has the hexagon "J" logo, "JUSTINE / DEV", links to all six Sections, and email and GitHub icons near the bottom. Clicking a link scrolls smoothly to its Section, and the sidebar highlights whichever Section is in view.

This ticket sets up:
- the React + TypeScript + Vite app at the repo root
- the palette as CSS variables
- the central typed site config holding the Owner's details (see spec)
- shared types and the Section wrapper
- the Vitest + React Testing Library harness, with IntersectionObserver/matchMedia stubs and an App that accepts data overrides
- a local git repo

**Blocked by:** None (can start immediately)

**Status:** done

- [x] `npm run dev`, `npm run build` and `npm test` all work
- [x] Palette defined as CSS variables; body background `#050510`
- [x] Site config holds full name, display name, initials, title, intro, location, email `dump9825@gmail.com`, GitHub `https://github.com/Jstne-22`, and an optional profile image (absent); no LinkedIn
- [x] Six Sections (Home, About, Skills, Projects, Education, Contact) render with headings and in-page anchors
- [x] Sidebar links scroll smoothly (instantly under reduced motion), and the active Section is highlighted via a single Intersection Observer
- [x] Sidebar icon-only links have accessible names
- [x] Tests: all six Section headings render; each nav link targets its Section; email and GitHub links use the configured values; no LinkedIn link
- [x] `git init` with a `.gitignore` (node_modules, dist) and a first local commit; no push
