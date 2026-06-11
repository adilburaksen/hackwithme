import React, { useEffect, useState } from 'react';
import { getStoredConsent, storeConsent, loadAnalytics } from '../analytics';

const ConsentBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const choice = getStoredConsent();
    if (choice === 'granted') {
      loadAnalytics();
    } else if (choice === null) {
      setVisible(true);
    }
    // 'denied' -> stay hidden, load nothing
  }, []);

  const decide = (granted: boolean) => {
    storeConsent(granted ? 'granted' : 'denied');
    if (granted) loadAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 rounded-md border border-bordercolor bg-surface/95 backdrop-blur p-4 font-mono text-xs text-subtext shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <p className="leading-relaxed">
        <span className="text-accent">$</span> consent --analytics
        <br />
        This site can load privacy-friendly Google Analytics (IP anonymized) to
        count visits. Nothing is loaded until you choose.
      </p>
      <div className="mt-3 flex gap-3">
        <button
          onClick={() => decide(true)}
          className="border border-accent text-accent px-3 py-1 rounded-sm hover:bg-accent hover:text-background transition-colors"
        >
          allow
        </button>
        <button
          onClick={() => decide(false)}
          className="border border-bordercolor text-subtext px-3 py-1 rounded-sm hover:text-text hover:border-subtext transition-colors"
        >
          deny
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;
