import React from 'react';

interface TagProps {
  children: React.ReactNode;
  /** `strong` reads as emphasis (e.g. severity) — heavier border, primary text. */
  variant?: 'default' | 'strong';
}

/** Bordered mono chip. Text always carries the meaning — never colour alone. */
const Tag: React.FC<TagProps> = ({ children, variant = 'default' }) => (
  <span
    className={`inline-flex items-center rounded-chip border px-2 py-[3px] font-mono text-[10px] tracking-[0.1em] uppercase ${
      variant === 'strong' ? 'border-strong text-primary' : 'border-subtle text-muted'
    }`}
  >
    {children}
  </span>
);

export default Tag;
