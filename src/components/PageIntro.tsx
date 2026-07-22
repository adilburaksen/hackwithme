import React from 'react';

interface PageIntroProps {
  /** Terminal command after the signal `$` (e.g. "cd /about"). */
  command: string;
  title: string;
  meta?: React.ReactNode;
  /** Replace the default meta styling when the meta needs a different role. */
  metaClassName?: string;
}

/**
 * Route header: prompt line + single h1 + meta. One per page; replaces the
 * TerminalPanel everywhere outside Home (frame 2g).
 */
const PageIntro: React.FC<PageIntroProps> = ({ command, title, meta, metaClassName }) => (
  <div className="mb-12 sm:mb-14">
    <div className="mb-3.5 font-mono text-xs text-muted">
      <span className="text-signal">$</span> {command}
    </div>
    <h1 className="mb-2.5 max-w-reading font-display font-[550] text-[28px] leading-[1.12] tracking-[-0.01em] sm:text-[38px]">
      {title}
    </h1>
    {meta && <div className={metaClassName ?? 'font-mono text-xs text-muted'}>{meta}</div>}
  </div>
);

export default PageIntro;
