# hackwith.me

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://hackwith.me)
[![License](https://img.shields.io/badge/license-All%20Rights%20Reserved-red)](LICENSE)

> A minimalist, terminal-inspired personal website for **Adil Burak a.k.a. 0racLe**  
> Senior Application Security & Red Team Engineer

![Preview](https://hackwith.me/og-image.png)

## 🔗 Live Demo

**[https://hackwith.me](https://hackwith.me)**

## ✨ Features

- **Terminal Aesthetic** — Dark/light theme with monospace typography
- **Blog System** — Posts with reading time, scroll progress, toast/upvote, and share buttons
- **Keyboard Navigation** — `j`/`k` for next/prev post, `Esc` to go back
- **Syntax Highlighting** — Code blocks with Atom One Dark theme (highlight.js)
- **SEO Optimized** — Open Graph meta tags, sitemap, robots.txt
- **Responsive Design** — Mobile-first approach
- **Google Analytics** — Integrated tracking
- **Clean URLs** — Hash-based routing with custom 404 page

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS (CDN) |
| Fonts | JetBrains Mono, Newsreader |
| Syntax Highlighting | highlight.js |
| Hosting | GitHub Pages |

## 📁 Project Structure

```
hackwith.me/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Navigation.tsx
│   │   ├── NotFound.tsx
│   │   ├── PostList.tsx
│   │   ├── ProjectList.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ToastButton.tsx
│   ├── App.tsx
│   ├── constants.ts        # Posts, projects, author profile
│   ├── types.ts
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

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

## 📝 Adding New Posts

Edit `src/constants.ts` and add to the `RESEARCH_POSTS` array:

```typescript
{
  id: 'your-post-slug',
  title: 'Your Post Title',
  date: '2025-01-01',
  tags: ['Tag1', 'Tag2'],
  summary: 'Brief description of your post.',
  content: `Your post content here...`
}
```

## 🌐 Deployment

Configured for GitHub Pages with custom domain. On push to `main`:

1. Build: `npm run build`
2. Deploy `dist/` folder to GitHub Pages
3. Custom domain: `hackwith.me`

## 📄 License

© 2025 Adil Burak. All rights reserved.

---

<p align="center">
  <a href="https://github.com/adilburaksen">GitHub</a> •
  <a href="https://linkedin.com/in/adilburaksen">LinkedIn</a> •
  <a href="https://x.com/adilburaksen">X (Twitter)</a>
</p>
