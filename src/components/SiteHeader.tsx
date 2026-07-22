import React from 'react';
import SiteBrand from './SiteBrand';
import CommandNavigation from './CommandNavigation';
import ThemeToggle from './ThemeToggle';
import { SHELL_X } from '../styles';

/**
 * Header: brand + navigation + theme toggle. On desktop the nav sits inline
 * beside the toggle; on mobile the toggle stays in the top row and the nav
 * drops to an edge-to-edge scrollable command bar with a right-edge fade.
 */
const SiteHeader: React.FC = () => (
  <header className="sm:mb-16">
    <div className={`${SHELL_X} flex items-center justify-between pt-4 sm:pt-11`}>
      <SiteBrand />
      <div className="hidden items-center gap-9 sm:flex">
        <CommandNavigation variant="inline" />
        <ThemeToggle />
      </div>
      <div className="sm:hidden">
        <ThemeToggle />
      </div>
    </div>

    <div className="relative mt-3.5 border-y border-subtle sm:hidden">
      <CommandNavigation variant="bar" />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-9 bg-gradient-to-l from-canvas to-transparent"
        aria-hidden="true"
      />
    </div>
  </header>
);

export default SiteHeader;
