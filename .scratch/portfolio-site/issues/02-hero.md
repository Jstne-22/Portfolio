# 02: Hero

**What to build:** A Visitor landing on the site sees the hero from the reference image:
- a "WELCOME TO MY WORLD" label
- "Hi, I'm Justine" and "I build things for the web."
- a slow rotating typed tagline: Aspiring Developer / Web Development Enthusiast / Computer Science Student
- a short intro naming the Owner as a Computer Science student and aspiring developer
- "View My Projects" and "Contact Me" buttons
- a glowing "J" emblem inside animated neon orbit rings, or the profile image when one is configured
- a floating code card built from the site config
- a background of subtle stars, slow orbs and a grid

Also includes the hexagon "J" SVG favicon.

**Blocked by:** 01 (Project skeleton with working sidebar navigation)

**Status:** ready-for-agent

- [ ] Single h1 containing the Owner's display name
- [ ] Typing tagline is slow and readable; shows static text under reduced motion
- [ ] "View My Projects" scrolls to Projects; "Contact Me" scrolls to Contact
- [ ] Emblem shown when no profile image is configured; never a broken image
- [ ] Code card content comes from the site config
- [ ] Background effects are CSS-only (or a canvas paused when off-screen) with a small fixed particle count
- [ ] Favicon is the hexagon "J" SVG with a root-relative path
- [ ] Tests: heading shows the display name; both buttons target the right Sections
