/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Chakra Petch"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
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
        ice: 'var(--ice)',
      },
      borderRadius: {
        chip: '0px',
        control: '0px',
        panel: '0px',
      },
      maxWidth: {
        shell: '70rem',
        reading: '42rem',
      },
    },
  },
  plugins: [],
}
