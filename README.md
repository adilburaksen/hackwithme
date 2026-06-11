# hackwith.me

[![Live](https://img.shields.io/badge/live-hackwith.me-brightgreen)](https://hackwith.me)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)](LICENSE)

> A minimalist, terminal-inspired personal site for **Adil Burak a.k.a. 0racLe**
> Application Security & Red Team Engineer

![Preview](https://hackwith.me/og-image.png)

## Live

**[https://hackwith.me](https://hackwith.me)**

## Features

- **Terminal aesthetic** — warm-ink palette with an orange signal accent; dark/light theme toggle (persisted, no flash on load)
- **Single-page app** — Index, About, Writing, Projects, and Disclosures views
- **Writing** — posts are authored on Medium; the archive links out to each piece
- **Disclosures** — published CVEs and bug-bounty acknowledgments (Bugcrowd, YesWeHack, Immunefi, Google VRP)
- **Custom 404** — terminal-style not-found view
- **SEO/social** — Open Graph + Twitter card meta, sitemap, robots.txt
- **Security headers** — CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy via Netlify `_headers`
- **`security.txt`** — RFC 9116 contact info at `/.well-known/security.txt`
- **Analytics** — Google Analytics (gtag)

## Tech Stack

| Category    | Technology                     |
|-------------|--------------------------------|
| Framework   | React 18 + TypeScript          |
| Build Tool  | Vite                           |
| Styling     | Tailwind CSS (CDN)             |
| Fonts       | Fraunces, JetBrains Mono, Newsreader |
| Hosting     | Netlify                        |

## Project Structure

```
hackwith.me/
├── public/
│   ├── .well-known/security.txt
│   ├── _headers            # Netlify security + caching headers
│   ├── _redirects          # SPA routing + real 404
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Disclosures.tsx
│   │   ├── Navigation.tsx
│   │   ├── NotFound.tsx
│   │   ├── PostList.tsx
│   │   ├── ProjectList.tsx
│   │   └── ThemeToggle.tsx
│   ├── App.tsx
│   ├── constants.ts        # Posts, projects, CVEs, acknowledgments, author profile
│   ├── types.ts
│   └── main.tsx
├── index.html
├── package.json
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

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding a Post

Posts live on Medium. Add an entry to the `RESEARCH_POSTS` array in `src/constants.ts`:

```typescript
{
  id: 'your-post-slug',
  title: 'Your Post Title',
  date: '2026-01-01',
  tags: ['Tag1', 'Tag2'],
  summary: 'Brief description of your post.',
  externalLink: 'https://medium.com/@adilburaksen/your-post'
}
```

## Deployment

Hosted on **Netlify** with the custom domain `hackwith.me`. On push to `main`,
Netlify builds (`npm run build`) and deploys `dist/`. SPA routing and a real 404
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
