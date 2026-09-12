import React, { useEffect, useRef, useState } from 'react';
import { getStoredConsent, storeConsent, loadAnalytics } from '../analytics';
import { SHELL_X } from '../styles';

/**
 * Analytics consent dialog. A full-width bar pinned to the bottom on every
 * breakpoint, so it never floats over a content column; while it is open the
 * page reserves matching bottom space (`consent-open` on <body>) so nothing is
 * hidden behind it. Focus moves to `allow` on open. Analytics never loads until
 * the visitor grants consent (gating preserved from analytics.ts).
 */
const ConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const allowRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const choice = getStoredConsent();
    if (choice === 'granted') {
      loadAnalytics();
    } else if (choice === null) {
      setVisible(true);
    }
    // 'denied' → stay hidden, load nothing
  }, []);

  useEffect(() => {
    if (visible) allowRef.current?.focus();
  }, [visible]);

  // Reserve bottom space on the page so the fixed bar hides no content.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('consent-open', visible);
    return () => document.body.classList.remove('consent-open');
  }, [visible]);

  const decide = (granted: boolean) => {
    storeConsent(granted ? 'granted' : 'denied');
    if (granted) loadAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  // Safe-area bottom padding lives in a class (arbitrary value, not an inline
  // style attribute) so the CSP can keep dropping style-src 'unsafe-inline'.
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Analytics consent"
      className="anim-rise fixed inset-x-0 bottom-0 z-50 border-t border-strong bg-surface"
    >
      <div
        className={`${SHELL_X} flex flex-col gap-3 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] font-mono text-xs leading-[1.65] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-6`}
      >
        <div className="min-w-0">
          <div>
            <span className="text-signal">$</span> consent --analytics
          </div>
          <p className="mt-1.5 sm:max-w-[52rem]">
            This site can load privacy-friendly Google Analytics (IP anonymized) to count visits.
            Nothing is loaded until you choose.
          </p>
        </div>
        <div className="flex shrink-0 gap-2.5">
          <button
            ref={allowRef}
            type="button"
            onClick={() => decide(true)}
            className="h-11 rounded-control border border-signal px-[18px] text-signal transition-colors hover:bg-signal hover:text-canvas"
          >
            allow
          </button>
          <button
            type="button"
            onClick={() => decide(false)}
            className="h-11 rounded-control border border-subtle px-[18px] text-muted transition-colors hover:border-strong hover:text-primary"
          >
            deny
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
