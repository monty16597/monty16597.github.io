# monty16597.github.io

Personal portfolio of **Manjeetsinh Alonja** — DevOps · Infrastructure · GenAI.

A single-page React app themed as a CI/CD pipeline (scroll advances the "run").
Built with [Vite](https://vitejs.dev/) and deployed to GitHub Pages.

Live: https://monty16597.github.io/

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # production build → dist/
npm run preview    # serve the built dist/ locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/main.yaml`, which builds the site and
publishes `dist/` to GitHub Pages. It can also be run manually from the Actions tab.
