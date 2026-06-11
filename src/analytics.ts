// Google Analytics is loaded ONLY after explicit consent — no GA script,
// cookies, or network pings happen before the visitor opts in (GDPR/ePrivacy).
const GA_ID = 'G-RP3MN54HK6';

export type ConsentChoice = 'granted' | 'denied';

export function getStoredConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem('analytics-consent');
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem('analytics-consent', choice);
  } catch {
    /* ignore */
  }
}

export function loadAnalytics(): void {
  const w = window as unknown as { __gaLoaded?: boolean; dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  if (w.__gaLoaded) return;
  w.__gaLoaded = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  w.dataLayer = w.dataLayer || [];
  function gtag(...args: unknown[]) {
    w.dataLayer!.push(args);
  }
  w.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { anonymize_ip: true });
}
