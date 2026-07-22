import React, { useEffect, useRef, useState } from 'react';
import { getStoredConsent, storeConsent, loadAnalytics } from '../analytics';

/**
 * Analytics consent dialog. Bottom-right on desktop, full-width bottom on
 * mobile (safe-area aware). Focus moves to `allow` on open. Analytics never
 * loads until the visitor grants consent (gating preserved from analytics.ts).
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

  const decide = (granted: boolean) => {
    storeConsent(granted ? 'granted' : 'denied');
    if (granted) loadAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  // safe-area bottom lives in a class (not an inline style) so the CSP can drop
  // style-src 'unsafe-inline'.
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Analytics consent"
      className="anim-rise fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 rounded-panel border border-strong bg-surface p-[18px] font-mono text-xs leading-[1.65] text-muted sm:inset-x-auto sm:right-6 sm:max-w-[340px]"
    >
      <div>
        <span className="text-signal">$</span> consent --analytics
      </div>
      <p className="mt-2">
        This site can load privacy-friendly Google Analytics (IP anonymized) to count visits.
        Nothing is loaded until you choose.
      </p>
      <div className="mt-3.5 flex gap-2.5">
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
  );
};

export default ConsentBanner;
