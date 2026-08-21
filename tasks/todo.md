# Login chooser + same-origin portal paths

## Goal

Header Login stays on `/login`. That page becomes an Admin / Customer chooser.
Chooser buttons use same-origin `/admin/login` and `/customer/login`. Those
paths (plus `/portal` and `/api/auth`) are rewritten to SEW-LAB-BACK-PORTAL
so the address bar stays on sew-lab.com. No fake login forms.

## Plan

- [ ] Replace `/login` placeholder copy with a two-button chooser (Admin, Customer) and keep Back to home.
- [ ] Style the new buttons with the existing dark login page / header language (CSS modules only).
- [ ] Add `next.config.ts` afterFiles rewrites to `https://sew-lab-back-portal.vercel.app` for `/admin`, `/customer`, `/portal`, and `/api/auth`. Do not rewrite `/login`.
- [ ] Leave Header Login pointing at `/login`. Use plain `<a href>` for portal paths so Next.js client routing does not try to load missing local pages.
- [ ] Build to confirm TypeScript and pages still compile.

## Review

Landing Login still goes to `/login`. That page is now a chooser (Admin login /
Customer login) plus Back to home. Buttons use same-origin `/admin/login` and
`/customer/login` as plain `<a>` tags so the browser does a full navigation
through the rewrite instead of Next.js client routing a missing local page.

`next.config.ts` proxies after filesystem pages:

- `/admin/:path*` → `https://sew-lab-back-portal.vercel.app/admin/:path*`
- `/customer/:path*` → `https://sew-lab-back-portal.vercel.app/customer/:path*`
- `/portal/:path*` → `https://sew-lab-back-portal.vercel.app/portal/:path*`
- `/api/auth/:path*` → `https://sew-lab-back-portal.vercel.app/api/auth/:path*`

`/login` is not rewritten. No fake login forms, no new pages, no new dependencies.
Header styles and the existing login CSS module were reused; two button classes
were added (`.actions`, `.choice`).

Verified with `next build` + `next start`:

- `GET /login` → 200 marketing chooser (Admin login / Customer login / Back to home)
- Homepage Login still `href="/login"`
- `GET /admin/login` → 200 rewrite, URL stays same-origin, portal admin form
- `GET /customer/login` → rewrite stays same-origin; portal currently 404s that
  path (expected until the sibling portal PR lands `/customer/login`)
