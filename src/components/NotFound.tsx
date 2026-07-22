import React from 'react';
import { Link } from '../router';

/** 404 view. Served as a real HTTP 404 via Netlify (public/_redirects → /404.html). */
const NotFound: React.FC = () => (
  <div className="anim-fade flex min-h-[62vh] flex-col items-center justify-center text-center">
    <div className="font-mono text-[72px] leading-none sm:text-[104px]">
      4<span className="text-signal">0</span>4
    </div>
    <div className="mt-5 font-mono text-lg text-muted">
      <span className="text-signal">&gt;_</span> page not found
      <span className="blink text-signal">▍</span>
    </div>
    <Link
      to="/"
      className="mt-11 rounded-control border border-subtle px-[18px] py-[11px] font-mono text-[13px] text-muted transition-colors hover:border-strong hover:text-primary"
    >
      ← return to index
    </Link>
  </div>
);

export default NotFound;
