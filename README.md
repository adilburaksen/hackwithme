# hackwith.me

> A minimalist, research-focused personal website designed for clarity and depth.
> Built for **Adil Burak a.k.a. 0racLe**.

## ⚡ Stack

- **Core:** React 18 + TypeScript
- **Build System:** Vite
- **Styling:** Tailwind CSS (via CDN for lightweight setup) + CSS Variables for Theming
- **Type Safety:** Strict TypeScript configuration
- **Deployment:** Netlify (Ready)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/adilburaksen/hackwithme.git

# 2. Navigate to directory
cd hackwithme

# 3. Install dependencies
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:5173` to view the site.

### Build for Production

Compile TypeScript and build assets for deployment:

```bash
npm run build
```

The output will be in the `dist/` directory.

## 🎨 Features

- **Minimalist UI:** Terminal-inspired aesthetic with heavy focus on typography (JetBrains Mono & Newsreader).
- **Theme System:** Native Light/Dark mode toggler using CSS variables.
- **Content System:** Localized Markdown-like blog rendering with support for external GIF/Image embedding.
- **Responsive:** Fully responsive design for mobile and desktop.

## 🛠 Project Structure

```
hackwithme/
├── src/
│   ├── components/    # UI Components (PostList, About, etc.)
│   ├── services/      # External integrations (Gemini, etc.)
│   ├── App.tsx        # Main Router/Layout logic
│   ├── main.tsx       # Entry point
│   ├── constants.ts   # Content data (Posts, Profile config)
│   └── types.ts       # TypeScript interfaces
├── public/            # Static assets
├── index.html         # Entry HTML
├── netlify.toml       # Deployment configuration
├── package.json       # Dependencies
└── vite.config.ts     # Vite configuration
```

## 🚢 Deployment

This project is configured for **Netlify**.

1. Connect your GitHub repository to Netlify.
2. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

## 📄 License

All content © 2025 Adil Burak.
Codebase is open for educational purposes.
