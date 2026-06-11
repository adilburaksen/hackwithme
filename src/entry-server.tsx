import { renderToStaticMarkup } from 'react-dom/server';
import App from './App';

// Rendered at build time and injected into dist/index.html so crawlers,
// social previews, and no-JS fetchers see real content. The client uses
// createRoot().render(), which replaces this markup on mount.
export function render(): string {
  return renderToStaticMarkup(<App />);
}
