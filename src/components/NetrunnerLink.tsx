import React from 'react';
import { Link } from '../router';

/** Header entry to Netrunner mode — the interactive version of the site. */
const NetrunnerLink: React.FC = () => (
  <Link
    to="/netrunner/"
    title="Netrunner mode — interactive version"
    className="inline-flex h-11 items-center gap-2 rounded-control border border-signal px-3 font-mono text-[12px] uppercase tracking-[0.12em] text-signal transition-colors hover:bg-signal hover:text-canvas sm:h-9"
  >
    <span aria-hidden="true" className="text-signal">
      ▸
    </span>
    netrunner
  </Link>
);

export default NetrunnerLink;
