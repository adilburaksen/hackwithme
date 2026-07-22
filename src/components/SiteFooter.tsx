import React from 'react';
import { SHELL_X } from '../styles';

const SiteFooter: React.FC = () => (
  <footer className={SHELL_X}>
    <div className="mt-16 flex justify-between border-t border-subtle pb-9 pt-[22px] font-mono text-xs text-muted sm:mt-20 sm:pb-11">
      {/* Year is fixed per the design frames; bump it here (or derive at build
          time) if the copyright line should roll over. */}
      <span>© 2026 hackwith.me</span>
      <a
        href="/.well-known/security.txt"
        className="transition-colors hover:text-signal"
      >
        security.txt
      </a>
    </div>
  </footer>
);

export default SiteFooter;
