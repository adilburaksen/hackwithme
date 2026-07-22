import React from 'react';
import { Link } from '../router';
import { SITE_TITLE } from '../constants';

/** `>_ hackwith.me` wordmark, links home. */
const SiteBrand: React.FC = () => (
  <Link to="/" className="font-mono text-[13px] text-primary transition-colors hover:text-primary">
    <span className="text-signal">&gt;_</span> {SITE_TITLE}
  </Link>
);

export default SiteBrand;
