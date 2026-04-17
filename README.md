# Scott Milliorn — Personal Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/ca85c3ca-1f14-47c8-a7c7-1b4abbed0eff/deploy-status)](https://app.netlify.com/sites/milliorn-portfolio/deploys)
[![CodeQL](https://github.com/milliorn/portfolio/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/milliorn/portfolio/actions/workflows/github-code-scanning/codeql)

A personal portfolio website for Scott Milliorn, a Software Engineer based in California. The site showcases work history, guiding philosophies, blog posts, and interests beyond technology. Built as a server-rendered Progressive Web App and deployed continuously to Netlify.

**Live site:** [milliorn-portfolio.netlify.app](https://milliorn-portfolio.netlify.app)

---

## Features

- **Profile** — Introduction, title, and location summary on the home page
- **Work History** — Career timeline covering software development and prior roles
- **Blog** — Opinion articles on topics including fitness, web development, and Rust
- **Philosophies** — Personal principles and guiding values
- **Tech interests** — Pursuits and hobbies beyond software
- **Dark/light theme toggle** — Persisted theme preference
- **PWA support** — Installable as a Progressive Web App via `@vite-pwa/astro`
- **Sitemap** — Auto-generated XML sitemap for SEO via `@astrojs/sitemap`
- **On-demand caching** — Netlify edge caching for server-rendered pages

---

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | [Astro](https://astro.build/) v5    |
| Language   | TypeScript                          |
| Adapter    | `@astrojs/netlify` (SSR)            |
| Hosting    | [Netlify](https://www.netlify.com/) |
| PWA        | `@vite-pwa/astro`                   |
| Sitemap    | `@astrojs/sitemap`                  |
| Linting    | ESLint + `eslint-plugin-astro`      |
| Formatting | Prettier + `prettier-plugin-astro`  |

---

## Project Structure

```text
src/
├── components/
│   ├── Card/          # Gradient card and card grid components
│   ├── Footer/        # Site footer
│   ├── Links/         # Social/nav link data and components
│   ├── Navigation/    # Top navigation bar
│   └── ThemeToggler/  # Dark/light mode toggle
├── layouts/
│   ├── Blog.astro     # Layout for blog/markdown pages
│   └── Main.astro     # Root page layout
├── pages/
│   ├── blogs/         # Markdown blog posts
│   ├── about.astro
│   ├── index.astro    # Home page
│   ├── philosophies.md
│   ├── tech.md
│   └── work.md
├── styles/            # Page-scoped CSS files
└── config.ts          # Site-wide URLs and owner metadata
```

---

## Prerequisites

- **Node.js** `>=18.14.1`
- **npm** (bundled with Node.js)

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/milliorn/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start the development server
npm run astro:dev
```

The dev server starts at `http://localhost:4321` by default.

---

## Available Scripts

| Script                   | Description                             |
| ------------------------ | --------------------------------------- |
| `npm run astro:dev`      | Start local development server          |
| `npm run astro:build`    | Build for production                    |
| `npm run astro:preview`  | Preview the production build locally    |
| `npm run astro:check`    | Run Astro type checking                 |
| `npm run lint:check`     | Run all linters and type checks         |
| `npm run lint:fix`       | Auto-fix formatting and lint errors     |
| `npm run prettier:write` | Format all files with Prettier          |
| `npm run tsc:check`      | Check TypeScript without emitting files |

---

## Deployment

The site deploys automatically to Netlify on every push to `main`. The Netlify badge at the top of this file reflects the current deploy status.

Production URL: **[milliorn-portfolio.netlify.app](https://milliorn-portfolio.netlify.app)**

---

## License

Distributed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html).
