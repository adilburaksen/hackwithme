// Post-build: statically render every route to its own HTML document with the
// correct route context and per-route <head> metadata, so crawlers, social
// previews, and no-JS fetchers get real content and the client can hydrate.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve, dirname } from 'node:path';

const serverEntry = resolve('dist-ssr/entry-server.js');
const templatePath = resolve('dist/index.html');

const { render, PRERENDER_ROUTES, NOT_FOUND_OUT } = await import(pathToFileURL(serverEntry).href);

const template = readFileSync(templatePath, 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}

const escapeAttr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function applyMeta(html, meta) {
  const t = escapeAttr(meta.title);
  const d = escapeAttr(meta.description);
  const c = escapeAttr(meta.canonical);
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${t}</title>`)
    .replace(/<meta name="description" content="[\s\S]*?"\s*\/?>/, `<meta name="description" content="${d}" />`)
    .replace(/<link rel="canonical" href="[\s\S]*?"\s*\/?>/, `<link rel="canonical" href="${c}" />`)
    .replace(/<meta property="og:url" content="[\s\S]*?"\s*\/?>/, `<meta property="og:url" content="${c}" />`)
    .replace(/<meta property="og:title" content="[\s\S]*?"\s*\/?>/, `<meta property="og:title" content="${t}" />`)
    .replace(/<meta property="og:description" content="[\s\S]*?"\s*\/?>/, `<meta property="og:description" content="${d}" />`)
    .replace(/<meta name="twitter:title" content="[\s\S]*?"\s*\/?>/, `<meta name="twitter:title" content="${t}" />`)
    .replace(/<meta name="twitter:description" content="[\s\S]*?"\s*\/?>/, `<meta name="twitter:description" content="${d}" />`);

  if (!meta.index) {
    out = out.replace(/<title>/, '<meta name="robots" content="noindex, follow" />\n    <title>');
  }
  return out;
}

const targets = [...PRERENDER_ROUTES, NOT_FOUND_OUT];
for (const { path, out } of targets) {
  const { html, meta } = render(path);
  let doc = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  doc = applyMeta(doc, meta);
  const dest = resolve('dist', out);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, doc);
  console.log(`prerender: ${path} → dist/${out} (${html.length} bytes, "${meta.title}")`);
}
