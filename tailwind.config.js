/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        serif: ['Newsreader', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        subtext: 'var(--subtext)',
        bordercolor: 'var(--border)',
        hovercolor: 'var(--hover)',
        accent: 'var(--accent)',
        accenthot: 'var(--accent-hot)',
      },
    },
  },
  plugins: [],
}
