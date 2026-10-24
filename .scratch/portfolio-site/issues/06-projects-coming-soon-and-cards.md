# 06: Projects (coming-soon state plus ready-to-fill cards)

**What to build:** Projects ships with an empty list, so at launch a Visitor sees a glowing "Projects coming soon" panel with a working "See my code on GitHub" button.

Once the Owner adds Projects:
- The Featured Project shows as a larger card above a grid of the other Project cards, with neon hover effects.
- The featured card has a preview (or an illustration placeholder), title, description, technology tags, and View Project / View Source Code buttons.
- Any missing URL renders as a disabled "Link coming soon" control.

Sample Projects exist only in the tests, never in the shipped data.

**Blocked by:** 01 (Project skeleton with working sidebar navigation)

**Status:** ready-for-agent

- [ ] Typed projects data module, empty at launch. Each entry has a title, description, technologies, an optional preview, optional live/source URLs, and an optional featured flag
- [ ] Featured selection: the first flagged entry, otherwise the first entry
- [ ] The coming-soon panel's GitHub button uses the configured GitHub URL
- [ ] Missing URLs render a disabled "Link coming soon" control, never an anchor to `#`
- [ ] A missing preview renders an attractive placeholder, never a broken image
- [ ] Tests: an empty list shows the panel and GitHub link and no cards; a supplied list puts the Featured Project first; a missing URL shows the disabled control with no link
