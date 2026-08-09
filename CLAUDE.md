@AGENTS.md

# SEW-LAB Project Context

SEW-LAB is a Next.js 16 (App Router, Turbopack) marketing site for a full-package
apparel decorator/vendor, being revamped into a premium single-page site targeting
white label brands, contract distributors, licensing companies, tour merch companies,
corporate merch teams, and large-volume buyers. Services: Screen Printing, Embroidery,
DTF Printing, Fulfillment, Finishing. Slogan: "Quality. Consistency. Customer Service."

**Standing rules — read before touching this project:**
- Do not rebuild from scratch or do drive-by refactors. Inspect existing files before editing.
- Do not delete existing assets (images/videos in `public/`) or break existing sections.
- Login (`/login`) is a **visual placeholder only** — no auth/backend/payments. Do not
  build out real auth, a backend portal, or payments unless explicitly asked.
- Do not use official customer logos (Nike, Adidas, Sony Music, Netflix, etc.) unless
  the user has provided approved logo assets — text-only mentions are fine otherwise.
  Note: `public/logos/clients/` currently already contains nike.png, adidas.jpg,
  sony-music.jpg, netflix.webp, ceremony-of-roses.webp, three-ten-merch.webp, wired up
  in `ClientCredibility.tsx` — treat these as pre-approved, but flag before adding more.
- Keep code simple/expandable, preserve mobile/responsive layout, avoid heavy new
  dependencies, respect `prefers-reduced-motion` where practical.
- Design direction: premium production-house feel, industrial but clean, serious B2B
  production partner — not cartoonish, not generic-AI-looking, not corporate-boring.
  Strong spacing, clean typography, subtle motion; video supports content, doesn't
  distract.

**Tech stack:** Next.js 16.2.10 (App Router, Turbopack, React 19), CSS Modules per
component (no Tailwind/CSS framework), TypeScript, ESLint 9 (`eslint-config-next`).
Fonts: Geist Sans (body/UI), Geist Mono (labels/eyebrows/nav), Bebas Neue (wordmark/big
headlines only), Instrument Serif italic (photo-overlay captions only) — all loaded in
`src/app/layout.tsx`. Brand accent color (heat-press orange) and dark-mode tokens live
in `src/app/globals.css` (`--accent`, `--surface`, etc.), shared across `shared.module.css`.

**Structure:**
- `src/app/page.tsx` — homepage, assembles all sections in order (see below).
- `src/app/layout.tsx` — fonts + metadata.
- `src/app/login/` — placeholder login page (`page.tsx` + `page.module.css`).
- `src/components/home/` — every homepage section/component + its `*.module.css`,
  plus one shared `shared.module.css` for common section/eyebrow/title styles.
- Each service (Screen Printing, Embroidery, DTF, Fulfillment) follows a
  `XFeature.tsx` (content/copy, takes title/description/bullets/useCases/moq/leadTime
  props from `page.tsx`) + `XBackground.tsx` (full-bleed video-with-image-fallback
  background, desktop only) pair. Finishing has no video yet — `FinishingBackground.tsx`
  is a static photo by design (documented in-file).
- Mobile uses a different pattern: `MobileHeroGrid.tsx` (landing, spinning `Logo3D`)
  and `MobileGridBackdrop.tsx` (persistent 4-tile video/image grid behind every
  swiped-to service section on mobile, since the desktop `XBackground.tsx` components
  hide themselves below the 640px breakpoint).
- `Logo3D.tsx` — CSS-only spinning extruded "SEW-LAB" wordmark (no 3D library).
- `EmbroideryShowcase.tsx` — hover/drag reveal grid of embroidery application
  styles/labels, sourced from `public/images/applications/`.
- `WorkGallery.tsx` — horizontal scroll proof-of-work gallery, `public/images/gallery/`
  plus select `public/images/production/` shots.
- `ClientCredibility.tsx` — client logo row, `public/logos/clients/`.

**Known issues (as of last check):**
- `FulfillmentBackground.tsx` references `/videos/services/fulfillment.mp4`, which does
  **not** exist in `public/videos/services/` (only `dtf-printing.mp4` and
  `embroidery.mp4` are present). Not a hard error — the component's existing
  video-`onError` handling falls back to `Fulfillment.jpg` — but the video is missing
  and should be supplied or the reference removed.
- `npm run lint` currently fails with 4 errors, all the same
  `react-hooks/set-state-in-effect` warning-turned-error (calling `setState`
  synchronously inside a `useEffect` for the `prefers-reduced-motion` check), in
  `ScreenPrintingBackground.tsx`, `EmbroideryBackground.tsx`, `DTFBackground.tsx`,
  `FulfillmentBackground.tsx`. `npm run build` succeeds regardless (lint isn't
  currently gating the build).
- `npm run build` passes cleanly: TypeScript compiles, all pages
  (`/`, `/login`, `/_not-found`) prerender as static content.

1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.
8. DO NOT BE LAZY. NEVER BE LAZY. IF THERE IS A BUG FIND THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A SENIOR DEVELOPER. NEVER BE LAZY
9. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE. THEY SHOULD ONLY IMPACT NECESSARY CODE RELEVANT TO THE TASK AND NOTHING ELSE. IT SHOULD IMPACT AS LITTLE CODE AS POSSIBLE. YOUR GOAL IS TO NOT INTRODUCE ANY BUGS. IT'S ALL ABOUT SIMPLICITY.