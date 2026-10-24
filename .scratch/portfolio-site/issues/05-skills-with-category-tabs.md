# 05: Skills with category tabs

**What to build:** A Visitor sees a grid of 14 Skill cards, each with a recognizable logo and name, and can filter them by Skill Category tabs (All, Frontend, Backend, Database, Tools). Cards glow gently on hover and keyboard focus. No percentages, levels or years are shown.

**Blocked by:** 01 (Project skeleton with working sidebar navigation)

**Status:** ready-for-agent

- [ ] Typed skills data:
  - Frontend: HTML5, CSS3, JavaScript, TypeScript, React
  - Backend: Node.js, Express.js, Python, Flask
  - Database: SQL
  - Tools: Git, GitHub, Visual Studio Code, npm
- [ ] Skill Category is a closed type, and the Skill type has no proficiency field
- [ ] Logos come from per-icon `simple-icons` imports, with a fallback SVG or Lucide icon where a logo is unavailable
- [ ] Tabs follow the ARIA tabs pattern and work by keyboard
- [ ] Grid runs from 2 columns on phones to 4–5 on desktop, with consistent card size
- [ ] Tests: All shows every Skill; each tab shows only its category's Skills
