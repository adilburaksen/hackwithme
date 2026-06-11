// Post-build: render the app's HOME view to static HTML and inject it into
// dist/index.html's #root so the page is not an empty shell for crawlers.
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const serverEntry = resolve('dist-ssr/entry-server.js');
const indexPath = resolve('dist/index.html');

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

const html = readFileSync(indexPath, 'utf8');
if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}
const out = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
writeFileSync(indexPath, out);

console.log(`prerender: injected ${appHtml.length} bytes into #root`);
