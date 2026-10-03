import React from 'react';
import { SITE_TITLE } from '../constants';

/**
 * Terminal-styled panel — one per page maximum, Home only. A single signal
 * square in the title bar, never traffic-light dots.
 */
const TerminalPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="cut relative border border-subtle bg-surface before:absolute before:left-0 before:top-0 before:h-[2px] before:w-24 before:bg-signal before:content-['']">
    <div className="flex items-center gap-2 border-b border-subtle px-4 py-2.5 font-mono text-[10.5px] text-muted sm:px-[22px] sm:text-[11px]">
      <span className="inline-block h-[7px] w-[7px] rounded-[2px] bg-signal sm:h-2 sm:w-2" aria-hidden="true" />
      {SITE_TITLE} — session
      <span className="ml-auto uppercase tracking-[0.14em] text-ice">link: stable</span>
    </div>
    <div className="px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7">{children}</div>
  </div>
);

export default TerminalPanel;
