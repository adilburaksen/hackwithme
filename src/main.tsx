import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

// The markup was prerendered per route; hydrate rather than replace it.
hydrateRoot(
  rootElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
