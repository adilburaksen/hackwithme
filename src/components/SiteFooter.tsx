import React from 'react';
import { SHELL_X } from '../styles';

const SiteFooter: React.FC = () => (
  <footer className={SHELL_X}>
    <div className="mt-16 flex justify-between border-t border-subtle pb-9 pt-[22px] font-mono text-xs text-muted sm:mt-20 sm:pb-11">
      {/* Year rolls over automatically; evaluated once at render (SSR prerender
          and client agree within the same calendar year). */}
      <span>© {new Date().getFullYear()} hackwith.me</span>
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
