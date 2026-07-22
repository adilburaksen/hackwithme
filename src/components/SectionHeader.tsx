import React from 'react';

interface SectionHeaderProps {
  title: string;
  /** Optional trailing action (e.g. a "view all →" link). */
  action?: React.ReactNode;
  className?: string;
}

/** `# Title` rule with an optional trailing action, per frame 1e. */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action, className }) => (
  <div
    className={`flex items-baseline justify-between border-b border-subtle pb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted ${
      className ?? ''
    }`}
  >
    <span>
      <span className="text-signal">#</span> {title}
    </span>
    {action && <span className="normal-case tracking-normal">{action}</span>}
  </div>
);

export default SectionHeader;
