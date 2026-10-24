# Spec: Futuristic developer portfolio site

Status: ready-for-agent

## Problem Statement

Justine V. Piamonte (the Owner), a 3rd-year BS Computer Science student at Christ the King College in Calbayog City, has no personal website. When teachers, classmates, recruiters or OJT/internship coordinators want to learn about the Owner, there is nowhere to send them that shows who the Owner is, what technologies they work with, where they study and how to reach them. The Owner wants a polished, futuristic site that matches their reference image (`my reference image.png`): a dark cyberpunk look with a neon left sidebar, a glowing profile area with orbit rings, a floating code card and glass panels. The Owner wants to publish it to Vercel and keep it easy to update without editing component code.

## Solution

A single-page, static portfolio site with six Sections (Home, About, Skills, Projects, Education, Contact), built with React, TypeScript and Vite and deployed to Vercel. Its look follows the reference image. Every fact on the site comes from typed data files the Owner can edit, and nothing is invented. Anything the Owner hasn't supplied yet is either left out or shown as a clearly marked Placeholder.

At launch:
- Projects shows a "Projects coming soon" panel with a working link to the Owner's GitHub. Adding the first Project to the data file swaps in the Featured Project card and project grid automatically.
- The Contact form checks what the Visitor typed, then opens the Visitor's own email app with a pre-filled message. The page says so plainly, because there is no backend.

## User Stories

### Visitor: first impression and navigation

1. As a Visitor, I want to see the Owner's name, "I build things for the web." and a short introduction as soon as the page loads, so that I know whose site this is and what they do.
2. As a Visitor, I want a small "WELCOME TO MY WORLD" label above the heading, so that the hero feels welcoming and matches the site's style.
3. As a Visitor, I want a slow, readable rotating tagline (Aspiring Developer, Web Development Enthusiast, Computer Science Student), so that I see the Owner's roles without the text flashing distractingly.
4. As a Visitor, I want a glowing profile emblem surrounded by animated neon orbit rings, so that the hero feels futuristic even before a photo is added.
5. As a Visitor, I want a floating code card that introduces the Owner as a `developer` object, so that the developer theme is clear at a glance.
6. As a Visitor, I want a "View My Projects" button that scrolls me to the Projects Section, so that I can see the Owner's work quickly.
7. As a Visitor, I want a "Contact Me" button that scrolls me to the Contact Section, so that I can get in touch quickly.
8. As a Visitor on desktop, I want a fixed left sidebar with the "J" hexagon logo, "JUSTINE / DEV", links to all six Sections, and email and GitHub icons near the bottom, so that I can jump anywhere at any time.
9. As a Visitor, I want the sidebar link for the Section I'm reading to be highlighted as I scroll, so that I always know where I am.
10. As a Visitor, I want clicking a navigation link to scroll smoothly to that Section, so that moving around feels polished and I don't lose my place.
11. As a Visitor on a phone or tablet, I want a compact top bar with a hamburger menu instead of the sidebar, so that the navigation doesn't take up my screen.
12. As a Visitor on a phone, I want the menu to close after I pick a Section, so that I land on the content without an extra tap.
13. As a Visitor on a phone, I want Section headings not to be hidden under the top bar after I navigate, so that I can read where I landed.
14. As a Visitor, I want a back-to-top button once I've scrolled down, so that I can return to the hero in one tap.
15. As a Visitor, I want a thin scroll-progress indicator, so that I can tell how much of the page is left.
16. As a desktop Visitor with a mouse, I want a subtle glow that follows my cursor, so that the page feels interactive without getting in the way.

### Visitor: content Sections

17. As a Visitor, I want an About Section with a personal introduction, the Owner's Computer Science background, their interest in web development, how they learn by building, and their goals, so that I understand who the Owner is.
18. As a Visitor, I want a few small highlight cards in About (e.g. current program, year level, location, focus), so that I can take in key facts at a glance.
19. As a Visitor, I want a Skills Section showing each Skill as a card with a recognizable logo and its name, so that I can see which technologies the Owner works with.
20. As a Visitor, I want to filter Skills by Skill Category (All, Frontend, Backend, Database, Tools), so that I can focus on the area I care about.
21. As a Visitor, I want Skill cards to glow gently on hover or keyboard focus, so that the grid feels alive.
22. As a Visitor, I want Skills shown without percentages, levels or years, so that I'm not given made-up claims.
23. As a Visitor, I want the Projects Section to say clearly that projects are coming soon and to offer a working "See my code on GitHub" button, so that I still have a real place to see the Owner's code.
24. As a Visitor, once Projects exist, I want the Featured Project shown as a larger card with a preview, title, description, technology tags and View Project / View Source Code buttons, so that the Owner's best work stands out.
25. As a Visitor, once Projects exist, I want the other Projects in a consistent grid of cards below the Featured Project, so that I can browse everything.
26. As a Visitor, I want project link buttons the Owner hasn't configured to appear disabled and say "Link coming soon", so that I never click a button that does nothing.
27. As a Visitor, I want project cards to lift and glow on hover, so that they feel interactive.
28. As a Visitor, I want an Education Section showing Christ the King College (Calbayog City), Bachelor of Science in Computer Science, 3rd Year, 2024 – Present, as a neon timeline entry, so that I know the Owner's academic background.
29. As a Visitor, I want relevant coursework and academic activities listed in the Education entry when the Owner provides them, and no invented ones otherwise, so that everything shown is true.
30. As a Visitor, I want a "Let's Work Together" Contact Section showing the Owner's email, GitHub and location (Calbayog City, Philippines), so that I know how and where to reach them.
31. As a Visitor, I want an email button that opens my email app addressed to the Owner, so that I can write immediately.
32. As a Visitor, I want a contact form with Name, Email, Subject and Message fields, so that I can write a structured message.
33. As a Visitor, I want the form to tell me which field is missing or invalid (e.g. a malformed email address) before anything happens, so that I can fix my input.
34. As a Visitor, I want the form to explain that submitting opens my own email app with the message pre-filled, so that I'm not misled into thinking it was sent from the website.
35. As a Visitor, I want submitting a valid form to open my email app with the Owner's address, my subject and a body containing my name, email and message, so that I only have to press send.
36. As a Visitor, I want a footer with the Owner's name and the year, so that the page ends cleanly.

### Visitor: accessibility, devices and performance

37. As a keyboard user, I want to reach every link, tab, button and form field with Tab and see a clear focus outline, so that I can use the whole site without a mouse.
38. As a screen-reader user, I want icon-only buttons (social icons, hamburger, back-to-top) to have spoken names, so that I know what they do.
39. As a screen-reader user, I want a single h1 and a logical heading order, plus landmarks for navigation, main content and footer, so that I can move through the page efficiently.
40. As a screen-reader user, I want the Skill Category filter to work as proper tabs, so that its state is announced.
41. As a Visitor who prefers reduced motion, I want orbits, floating, typing, parallax and reveal animations turned off or reduced to simple fades, with all content visible, so that the site doesn't make me uncomfortable.
42. As a Visitor, I want all content to be readable even if animations never run, so that nothing important is hidden behind an animation.
43. As a Visitor, I want text to have strong contrast against the dark background, so that I can read comfortably.
44. As a Visitor on a 375px phone, I want hero content stacked vertically, cards in one or two columns, touch-friendly controls and no sideways scrolling, so that the site works on my phone.
45. As a Visitor on a 768px or 1024px tablet, I want layouts and decorative effects scaled to fit without overlapping, so that the site looks deliberate at my size.
46. As a Visitor on a 1440px desktop, I want a spacious hero with the sidebar, profile emblem and floating code card arranged as in the reference image, so that I get the full experience.
47. As a Visitor on a slow phone, I want the page to load quickly and scroll smoothly, without heavy images, videos or particle effects, so that the site doesn't lag.

### Owner: editing and publishing

48. As the Owner, I want all my personal details (full name, display name, initials, title, intro, About text, location, email, GitHub, other social links, profile image) in one central typed config file, so that I can update the site without touching components.
49. As the Owner, I want to add a profile photo later by adding an image and setting one config value, with the glowing "J" emblem shown until then, so that the site never shows a broken image.
50. As the Owner, I want to add a social link (e.g. LinkedIn) later by adding one entry to the config, with its icon appearing in the sidebar and Contact, so that new profiles take seconds to add.
51. As the Owner, I want Skills in a typed data file where each entry has a name, Skill Category and icon, so that I can add or remove Skills easily.
52. As the Owner, I want Projects in a typed data file where each entry has a title, description, technologies, optional preview image, optional live URL and optional source URL, and one entry can be marked as the Featured Project, so that adding TranCash later is a single data change.
53. As the Owner, I want a Project's missing URLs to show "Link coming soon" automatically, so that I can publish a Project before its demo or repo is ready.
54. As the Owner, I want Projects to fall back to the coming-soon panel automatically when the list is empty, so that I never publish an empty-looking section.
55. As the Owner, I want my Education entry in a typed data file with optional coursework and activities lists, so that I can add details as the year goes on.
56. As the Owner, I want TypeScript to flag a mistyped field or an unknown Skill Category when I edit data, so that mistakes are caught before I publish.
57. As the Owner, I want `npm run dev`, `npm run build` and `npm run preview` to work out of the box, so that I can develop, build and check the production site locally.
58. As the Owner, I want the site to deploy to Vercel as a static Vite app from the repository root with no extra configuration, server or secrets, so that publishing is simple and free.
59. As the Owner, I want a README covering required software, install, dev server, build, customization, adding Skills and Projects, pushing to GitHub, deploying to Vercel and updating the live site, so that I can maintain the site myself.
60. As the Owner, I want the project in a local git repository with an initial commit, so that I can push it to GitHub myself.
61. As the Owner, I want automated tests I can run with one npm command, so that I can check I haven't broken navigation or the contact form after editing.

## Implementation Decisions

### Stack
- React + TypeScript + Vite, using npm, with stable, mutually compatible versions.
- Plain CSS with custom properties for the palette, split into global, animations and responsive stylesheets. No Tailwind.
- Motion for React for entrance, reveal and hover animations.
- Lucide React for interface icons.
- No backend, database, router or environment secrets.

### Palette
CSS variables for:

| Role | Value |
| --- | --- |
| Main background | `#050510` |
| Secondary background | `#0A0A1A` |
| Card background | `#0D1022` |
| Neon purple | `#8B5CF6` |
| Neon pink | `#FF2D95` |
| Electric blue | `#00CFFF` |
| Primary text | `#F5F5FF` |
| Secondary text | `#A5A7C5` |

Gradients use purple → pink → blue. The site is dark-only, with no theme toggle.

### Visual direction
The reference image is the source of truth for the hero, sidebar, panel styling, neon intensity and code card. Deliberate departures from it:
- No Download CV, theme toggle or settings buttons.
- No Experience or Certificates Sections.
- No project carousel.
- After the hero, each Section is a full-width band styled like the reference panels, not the reference's compact dashboard rows.

### Data modules, the single source of truth for Owner facts
- **Site config**: full name "Justine V. Piamonte", display name "Justine", initials "JVP", logo letter "J" with "JUSTINE / DEV", title, intro, About paragraphs and highlights, location "Calbayog City, Philippines", email `dump9825@gmail.com`, an optional profile image path (absent at launch), and a list of social links (each with a kind, label and URL).
  - At launch the social links are GitHub (`https://github.com/Jstne-22`) and email only. LinkedIn is omitted entirely, not shown as a Placeholder.
  - Code-card content is derived from the config.
- **Skills**: 14 entries, each with a name, a Skill Category (a closed union: Frontend | Backend | Database | Tools) and an icon reference.
  - Frontend: HTML5, CSS3, JavaScript, TypeScript, React
  - Backend: Node.js, Express.js, Python, Flask
  - Database: SQL
  - Tools: Git, GitHub, Visual Studio Code, npm
  - No proficiency fields exist in the type, so none can be shown.
- **Projects**: an empty list at launch. Each entry has a title, description, technologies, an optional preview image, optional live and source URLs, and an optional featured flag.
  - If several entries are flagged featured, the first flagged one wins. If none is flagged, the first entry is featured.
  - TranCash is deliberately not added until the Owner confirms its stack and links.
- **Education**: one entry: Christ the King College, Calbayog City; Bachelor of Science in Computer Science; 3rd Year; 2024 – Present; empty coursework and activities lists (rendered only when non-empty).
- Shared types live in one types module.

### Brand icons
- Use the `simple-icons` package (imported per icon) where it has the logo.
- Where it lacks one (LinkedIn, and any Microsoft or other trademark-removed logos such as VS Code if missing), use a small hand-made SVG or a fitting Lucide icon.
- Icon-only links carry accessible labels.

### Placeholder rendering
A link whose URL is absent renders as a disabled control labeled "Link coming soon", never as an anchor to `#`. Optional social links that are absent are simply not rendered.

### Components
- Sidebar/Navbar: the desktop sidebar plus the mobile top bar and hamburger, sharing one Section list.
- Hero: logo, typing tagline, CTAs, orbit emblem and code card.
- About, Skills (with category tabs), Projects (coming-soon panel / featured card / grid), Education (timeline), Contact (info, email CTA, form), Footer and BackToTop.
- Small shared pieces: a Section wrapper with heading and reveal, a glass panel, a gradient button, a link-or-placeholder button, and an icon renderer.

### Active Section tracking
A single Intersection Observer over the six Section elements, held in one small hook. The active state lives locally in the navigation, not in global state.

### Smooth scrolling
- Uses native CSS smooth scrolling, disabled under reduced motion.
- A scroll-margin offset clears the mobile top bar.
- Navigation uses in-page anchors only, so no server rewrites are needed.

### Contact form
- Controlled inputs with validation on submit, then per field:
  - Name required
  - Email required and well-formed
  - Subject required
  - Message required, with a minimum length
- Errors are shown inline and announced to assistive technology.
- On a valid submit, it builds a `mailto:` URL to the configured email, with the encoded subject and a body that combines name, email and message, and navigates to it.
- Helper text states that the form opens the Visitor's email app.
- No network requests and no credentials.

### Motion and performance
- Background stars and particles are a CSS-only layer with a small, fixed count, or a lightweight canvas paused when off-screen. There is no per-frame React rendering.
- Orbit rings, floating orbs and the code card float use CSS keyframes.
- Reveals use Motion's in-view triggers that run once.
- Parallax and the cursor spotlight run only on fine-pointer, wide viewports and are off under reduced motion.
- Under `prefers-reduced-motion` all non-essential animation stops, and the typing tagline shows static text.

### Responsive breakpoints
- Desktop sidebar from about 1024px up.
- Top bar plus hamburger below that.
- Hero stacks vertically below about 768px.
- Skill grid scales from 2 columns (phone) to 4–5 (desktop).
- No horizontal overflow at any width.

### Assets and deployment
- An SVG favicon (the hexagon "J") lives in public assets.
- All asset paths are root-relative.
- Vite outputs to `dist`, and Vercel detects the Vite preset with no `vercel.json`.
- The reference image stays in the repo root as a design reference and is not shipped in the build.

### Repository
- The project is scaffolded at the repository root next to the existing CLAUDE.md, CONTEXT.md and docs.
- The agent runs `git init` and makes a local commit only. It doesn't push or deploy (the Owner does that by following the README).

## Testing Decisions

### Seam
One test seam: render the full App with Vitest + React Testing Library (jsdom), and assert only on what a Visitor can see and do. No tests target internal hooks, component props or CSS classes.

### What makes a good test
It describes Visitor-visible behavior in the glossary's language, survives refactors of component structure, and fails only when a Visitor would notice a change.

### Planned behaviors to cover
- All six Section headings render. Each navigation link points to its Section, and the hero CTAs target Projects and Contact.
- The Owner's name and the configured email and GitHub links appear, and no LinkedIn link is rendered.
- With an empty Projects list, the coming-soon panel and a working GitHub link appear, with no project cards.
- With a Projects list supplied, the Featured Project appears first.
- A Project with a missing URL shows a disabled "Link coming soon" control and no anchor.
- Skills: every Skill shows under All, and choosing a Skill Category tab shows only that category's Skills.
- Contact form: submitting empty shows per-field errors, an invalid email shows an email error, and a valid submit produces a `mailto:` URL with the configured address and the encoded subject and body.
- The mobile menu opens from the hamburger and closes after a Section is chosen.

### Test isolation
Where tests need different data (e.g. non-empty Projects), the App accepts the data modules as overridable inputs at the top level. That keeps the single seam rather than adding new ones.

### Environment stubs
jsdom lacks Intersection Observer and `matchMedia`, so the test setup stubs them. Navigation to the `mailto:` URL is observed through a stubbed location assignment.

### Prior art
None; the repository is new. These tests set the pattern.

### Non-automated checks (run and reported, not claimed)
- TypeScript type check and `npm run build` must pass.
- Manual browser inspection at 375, 768, 1024 and 1440px for layout, overflow, navigation, console errors and broken assets, using the available browser tools.
- Reduced-motion rendering is checked the same way.

## Out of Scope

- Any server-side contact delivery (Formspree, an email API, serverless functions).
- Backend, database and authentication.
- TranCash and any other Project entries, which wait on the Owner confirming the stack and links.
- LinkedIn and other social profiles the Owner doesn't have yet.
- Profile photo (the emblem placeholder ships instead).
- Experience and Certificates Sections.
- Download CV, light theme and settings panel.
- Multi-page routing, a blog and CMS integration.
- Pushing to GitHub and deploying to Vercel (documented for the Owner, not performed by the agent).
- Analytics and SEO beyond a sensible title, description and favicon.

## Further Notes

- `CONTEXT.md` defines Owner, Visitor, Section, Placeholder, Project, Featured Project, Skill and Skill Category. Code and copy should use these terms.
- About copy must be natural, editable, and free of invented awards, jobs or achievements. It may say the Owner is a 3rd-year BSCS student who is learning by building.
- Two contact emails came up during design. `dump9825@gmail.com` is the one chosen for public display; the Owner's primary address must not appear on the site.
- When the Owner supplies TranCash details, verify its technology tags against the real code before adding it, and render its preview as a real screenshot or a clearly labeled illustration.
