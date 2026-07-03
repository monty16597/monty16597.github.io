# Portfolio Site — Vite + React on GitHub Pages

**Date:** 2026-07-02
**Repo:** `monty16597.github.io` (GitHub **user site** → serves at root `https://monty16597.github.io/`)

## Goal

Replace the wiped Create-React-App scaffold with a fresh, minimal build around a
single self-contained `Portfolio` component, and deploy it to GitHub Pages via the
existing Actions workflow.

## Context

- Working tree had every source file deleted (uncommitted). We are scaffolding fresh.
- `Portfolio.jsx` is a single, self-contained React component (default export, 1141
  lines). It injects its own `<style>` block — including the Google Fonts `@import` —
  so it needs **no external CSS framework**.
- Existing CI/CD (`.github/workflows/main.yaml`) already deploys to Pages:
  `npm install` → `npm run build` → upload folder → `actions/deploy-pages`. It has the
  correct `pages: write` / `id-token: write` permissions and `pages` concurrency group.

## Decisions

- **Build tool:** Vite + React (`@vitejs/plugin-react`). Modern, fast, maintained;
  clean React 19 support. Output dir is `dist/`.
- **No Tailwind.** The component uses only 3 Tailwind utility strings; convert those to
  inline styles and drop the dependency entirely.
- **No router / tests / backend.** Single-page component. YAGNI.
- `vite.config.js` uses `base: '/'` (user site is served at domain root — no sub-path).

## Structure

```
index.html                       Vite entry, <div id="root">, loads /src/main.jsx
vite.config.js                   react plugin, base: '/'
package.json                     react, react-dom, vite, @vitejs/plugin-react
.gitignore                       node_modules, dist, .DS_Store, .env.local, logs
src/
  main.jsx                       createRoot(#root).render(<Portfolio/>)
  Portfolio.jsx                  the component (moved from repo root)
.github/workflows/main.yaml      existing workflow, edited (see below)
docs/superpowers/specs/…         this spec
```

## Tailwind → inline conversions (exact)

- `flex items-end justify-between gap-6` → `{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:24 }`
- `flex gap-5` → `{ display:'flex', gap:20 }`
- `flex gap-6` → `{ display:'flex', gap:24 }`

(`gap-5` = 20px, `gap-6` = 24px.) Custom classes like `navlink`, `display`, and the
`data-h` attribute are defined in the component's own `<style>` and stay unchanged.

## CI/CD changes

Minimal edits to `.github/workflows/main.yaml`:

- `upload-pages-artifact` path: `build/` → `dist/` (Vite output).
- Pin `node-version` to `20` (LTS; Vite-supported) instead of `23`.

Everything else (triggers on push to `main` + manual dispatch, permissions,
concurrency, deploy step) stays as-is.

## Verification

`npm install && npm run build` produces `dist/` with `index.html` + hashed assets and
no build errors. Optionally `npm run preview` to eyeball locally. The workflow then
deploys `dist/` on push to `main`.

## Out of scope

- Custom domain / CNAME.
- Analytics, SEO meta beyond a basic title, sitemap.
- Any content edits to the portfolio (roles, projects, links are the user's own).
