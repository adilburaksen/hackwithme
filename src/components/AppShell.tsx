import React from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ConsentBanner from './ConsentBanner';
import { SHELL_X } from '../styles';

/** Page frame: skip link → header → main → footer, plus the consent banner. */
const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen flex-col">
    <a
      href="#main"
      className="sr-only font-mono text-[13px] focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-control focus:border focus:border-strong focus:bg-surface focus:px-3 focus:py-2 focus:text-primary"
    >
      skip to content
    </a>
    <SiteHeader />
    <main id="main" className={`${SHELL_X} flex-1 pt-7 sm:pt-0`}>
      {children}
    </main>
    <SiteFooter />
    <ConsentBanner />
  </div>
);

export default AppShell;
