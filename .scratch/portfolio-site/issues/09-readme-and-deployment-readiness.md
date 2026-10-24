# 09: README and deployment readiness

**What to build:** The Owner can maintain and publish the site alone. A README covers:
- required software, install, the dev server and building
- customizing the site through the data files
- adding Skills and Projects (including TranCash later)
- pushing to GitHub, deploying to Vercel, and updating the live site

The project is checked to deploy as a static Vite app from the repo root.

**Blocked by:** 08 (Finishing touches, motion and screen-size check)

**Status:** done

- [x] The README covers all nine topics from the spec
- [x] The type check, `npm test`, `npm run build` and `npm run preview` all run and pass (results reported, not assumed)
- [x] Build output goes to `dist`; asset paths are root-relative; no `vercel.json` is needed; no secrets
- [x] The reference image is not in the build output
- [x] Final local commit; nothing pushed or deployed
