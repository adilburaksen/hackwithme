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
        // Semantic tokens (see src/index.css). Consume these, not the vars.
        canvas: 'var(--canvas)',
        surface: 'var(--surface-1)',
        primary: 'var(--text-primary)',
        muted: 'var(--text-muted)',
        subtle: 'var(--border-subtle)',
        strong: 'var(--border-strong)',
        signal: 'var(--signal)',
        signalhover: 'var(--signal-hover)',
      },
      borderRadius: {
        chip: '3px',
        control: '4px',
        panel: '6px',
      },
      maxWidth: {
        shell: '70rem',
        reading: '42rem',
      },
    },
  },
  plugins: [],
}
