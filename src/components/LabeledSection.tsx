import React from 'react';

interface LabeledSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * `# Label` + content. Desktop puts the label in a 220px left column; mobile
 * turns it into a hairline-underlined header above the content (frames 2a/2f).
 */
const LabeledSection: React.FC<LabeledSectionProps> = ({ title, children }) => (
  <section className="grid grid-cols-1 gap-4 sm:grid-cols-[220px_1fr] sm:gap-12">
    <div className="mb-4 border-b border-subtle pb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:mb-0 sm:border-0 sm:pb-0 sm:text-xs">
      <span className="text-signal">#</span> {title}
    </div>
    <div>{children}</div>
  </section>
);

export default LabeledSection;
