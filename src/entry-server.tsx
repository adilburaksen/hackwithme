import { renderToString } from 'react-dom/server';
import App from './App';
import { getMeta, RouteMeta } from './seo';
import { NOT_FOUND_PATH } from './router';

/** Routes to prerender → their output paths under dist/. */
export const PRERENDER_ROUTES: { path: string; out: string }[] = [
  { path: '/', out: 'index.html' },
  { path: '/about/', out: 'about/index.html' },
  { path: '/writing/', out: 'writing/index.html' },
  { path: '/projects/', out: 'projects/index.html' },
  { path: '/disclosures/', out: 'disclosures/index.html' },
];

/** The catch-all 404 document Netlify serves for unmatched paths. */
export const NOT_FOUND_OUT = { path: NOT_FOUND_PATH, out: '404.html' };

export interface RenderResult {
  html: string;
  meta: RouteMeta;
}

/**
 * Render a route to hydration-ready HTML plus its per-route metadata. Called at
 * build time by scripts/prerender.mjs; the client hydrates the same App.
 */
export function render(path: string): RenderResult {
  const html = renderToString(<App initialPath={path} />);
  return { html, meta: getMeta(path) };
}
