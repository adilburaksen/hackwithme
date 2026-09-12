# hackwith.me

[![Live](https://img.shields.io/badge/live-hackwith.me-brightgreen)](https://hackwith.me)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)](LICENSE)

> A minimalist, terminal-inspired personal site for **Adil Burak a.k.a. 0racLe**
> Application Security & Red Team Engineer

![Preview](https://hackwith.me/og-image.png)

## Live

**[https://hackwith.me](https://hackwith.me)**

## Features

- **Terminal aesthetic** — "Signal Archive" design system: warm-ink palette with an orange signal accent; dark/light theme toggle, persisted with no flash on load (`public/theme-init.js`)
- **Prerendered, then hydrated** — every route is statically rendered to its own HTML at build time (`scripts/prerender.mjs`) for crawlers, social previews, and no-JS fetchers, then hydrated into a client-side app
- **Views** — Index, About, Writing, Projects, and Disclosures, with a lightweight custom router (`src/router.tsx`)
- **Writing** — posts are authored on Medium; the archive links out to each piece. Entries live in `src/data/writing.json` and can be auto-synced from the Medium feed (see [Adding a Post](#adding-a-post))
- **Disclosures** — published CVEs and bug-bounty acknowledgments (Bugcrowd, YesWeHack, Immunefi, Google VRP)
- **Accessibility** — skip link, `aria-current` navigation, non-color-only active states, visible focus rings, and `prefers-reduced-motion` support
- **Custom 404** — terminal-style not-found view with a real 404 status
- **SEO/social** — per-route Open Graph + Twitter card meta (`src/seo.ts`), sitemap, robots.txt
- **Security headers** — CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy via Netlify `_headers`
- **`security.txt`** — RFC 9116 contact info at `/.well-known/security.txt`
- **Consent-gated analytics** — Google Analytics (gtag) that only loads after consent via the consent banner

## Tech Stack

| Category   | Technology                             |
|------------|----------------------------------------|
| Framework  | React 18 + TypeScript                  |
| Build Tool | Vite                                   |
| Styling    | Tailwind CSS 3 (PostCSS + Autoprefixer)|
| Fonts      | Fraunces, Newsreader, JetBrains Mono (Google Fonts) |
| Hosting    | Netlify                                |
| CI         | GitHub Actions (Medium → Writing sync) |

## Project Structure

```
hackwith.me/
├── .github/workflows/
│   └── sync-writing.yml    # Daily: pull new Medium posts, open a PR
├── public/
│   ├── .well-known/security.txt
│   ├── _headers            # Netlify security + caching headers
│   ├── _redirects          # SPA routing + real 404
│   ├── theme-init.js       # Applies saved theme before paint (no flash)
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── prerender.mjs       # Post-build static render of every route
│   └── sync-writing.mjs    # Fetch Medium RSS → src/data/writing.json
├── src/
│   ├── components/         # UI (Home, About, Writing, Projects, Disclosures,
│   │                       #  SiteHeader/Footer, ThemeToggle, ConsentBanner, …)
│   ├── data/
│   │   └── writing.json    # Writing archive (source of truth)
│   ├── analytics.ts        # Consent-gated gtag
│   ├── App.tsx
│   ├── constants.ts        # Projects, CVEs, acknowledgments, author profile
│   ├── entry-server.tsx    # SSR entry used by the prerenderer
│   ├── index.css           # Design tokens (dark/light) + base styles
│   ├── main.tsx            # Client entry / hydration
│   ├── router.tsx          # Minimal route context + <Link>
│   ├── seo.ts              # Per-route <head> metadata
│   ├── styles.ts           # Shared layout helpers
│   └── types.ts
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/adilburaksen/hackwithme.git
cd hackwithme

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (tsc → client build → SSR build → prerender)
npm run build

# Preview production build
npm run preview
```

## Adding a Post

Posts are authored on Medium; the site links out to each one. Entries live in
`src/data/writing.json` (newest first):

```json
{
  "id": "your-post-slug",
  "title": "Your Post Title",
  "date": "2026-01-01",
  "summary": "Brief description of your post.",
  "tags": ["Tag1", "Tag2"],
  "externalLink": "https://medium.com/@adilburaksen/your-post"
}
```

**Automatic sync.** `scripts/sync-writing.mjs` (`npm run sync:writing`) fetches
the Medium RSS feed and appends any missing posts, deriving id/title/date/tags/
summary. Existing entries are never modified, so hand-tuned summaries and tags
are preserved. A daily GitHub Actions job (`.github/workflows/sync-writing.yml`)
runs the script and opens a PR when new posts appear — it never auto-merges, so
the derived tags/summary always get a human pass.

> To let the workflow open PRs, enable **Settings → Actions → General →
> "Allow GitHub Actions to create and approve pull requests."**

## Deployment

Hosted on **Netlify** with the custom domain `hackwith.me`. On push to `main`,
Netlify runs `npm run build` and deploys `dist/`. SPA routing and a real 404
status are configured in `public/_redirects`; security and caching headers in
`public/_headers`.

## License

© 2026 Adil Burak. All Rights Reserved.

---

<p align="center">
  <a href="https://github.com/adilburaksen">GitHub</a> •
  <a href="https://linkedin.com/in/adilburaksen">LinkedIn</a> •
  <a href="https://x.com/adilburaksen">X (Twitter)</a>
</p>
