import React from 'react';

interface StatusProps {
  children: React.ReactNode;
}

/** Chip with a signal dot — the label text still carries the state. */
const Status: React.FC<StatusProps> = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-chip border border-subtle px-2 py-[3px] font-mono text-[10px] tracking-[0.1em] uppercase text-primary">
    <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
    {children}
  </span>
);

export default Status;
