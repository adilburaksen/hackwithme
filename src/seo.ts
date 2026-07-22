import { normalizePath, NOT_FOUND_PATH } from './router';

export const SITE_ORIGIN = 'https://hackwith.me';

export interface RouteMeta {
  title: string;
  description: string;
  /** Absolute canonical URL. */
  canonical: string;
  /** Whether crawlers should index the route (404 opts out). */
  index: boolean;
}

const NAME_SUFFIX = 'Adil Burak (0racLe)';

const DEFS: Record<string, { title: string; description: string; index?: boolean }> = {
  '/': {
    title: `${NAME_SUFFIX} — Application Security & Red Team Engineer`,
    description:
      'Adil Burak (0racLe) — OSCP+ Application Security & Red Team Engineer. Penetration testing, API security, secure SDLC, DevSecOps. Published CVE, Bugcrowd Top 100, and public disclosures.',
  },
  '/about/': {
    title: `About — ${NAME_SUFFIX}`,
    description:
      'Senior Application Security & Red Team Engineer with 8+ years across banking, telecom, aviation, insurance, and e-commerce. Trajectory, certifications, and toolset.',
  },
  '/writing/': {
    title: `Writing — ${NAME_SUFFIX}`,
    description:
      'Long-form writing on API security, the evolution of software, and reflection — published on Medium by Adil Burak (0racLe).',
  },
  '/projects/': {
    title: `Projects — ${NAME_SUFFIX}`,
    description:
      'Security tooling and experiments by Adil Burak (0racLe), including a public exploit tool for CVE-2025-25257 (FortiWeb).',
  },
  '/disclosures/': {
    title: `Disclosures — ${NAME_SUFFIX}`,
    description:
      'Published CVE and 29 public bug-bounty acknowledgments across Bugcrowd, YesWeHack, Immunefi, and Google VRP by Adil Burak (0racLe).',
  },
};

const NOT_FOUND_META = {
  title: `404 — Page not found · hackwith.me`,
  description: 'The requested page could not be found on hackwith.me.',
  index: false,
};

export function getMeta(path: string): RouteMeta {
  if (path === NOT_FOUND_PATH) {
    return { ...NOT_FOUND_META, canonical: `${SITE_ORIGIN}/`, index: false };
  }
  const key = normalizePath(path);
  const def = DEFS[key];
  if (!def) {
    return { ...NOT_FOUND_META, canonical: `${SITE_ORIGIN}/`, index: false };
  }
  return {
    title: def.title,
    description: def.description,
    canonical: `${SITE_ORIGIN}${key}`,
    index: def.index ?? true,
  };
}
