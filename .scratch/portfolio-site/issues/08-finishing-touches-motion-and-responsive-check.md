# 08: Finishing touches, motion and screen-size check

**What to build:** A Visitor gets the final polish:
- a back-to-top button after scrolling
- a thin scroll-progress bar
- a subtle cursor-following glow on desktop with a mouse
- scroll-in reveal animations that run once

Then the site is checked and fixed so it respects reduced motion and looks right at 375, 768, 1024 and 1440px, with no overflow, overlap, console errors or broken assets.

**Blocked by:** 02, 03, 04, 05, 06, 07

**Status:** done

- [x] The back-to-top button appears after scrolling, has an accessible name, and returns to Home
- [x] The scroll-progress bar tracks progress down the page
- [x] Cursor glow and parallax appear only on wide viewports with a mouse, and are off under reduced motion
- [x] Reveal animations run once; all content is visible even if animations never run
- [x] Under reduced motion, orbits, floating, typing, parallax and reveals stop or become simple fades
- [x] Browser check at 375/768/1024/1440px: no horizontal scroll, no overlap, no console errors, no broken assets; fix what's found
- [x] Visible focus states throughout; text contrast is adequate
