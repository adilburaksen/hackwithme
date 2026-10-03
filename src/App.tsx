import React from 'react';
import { RouterProvider, useRouter, resolveView } from './router';
import { View } from './types';
import AppShell from './components/AppShell';
import Home from './components/Home';
import About from './components/About';
import Writing from './components/Writing';
import Projects from './components/Projects';
import Disclosures from './components/Disclosures';
import NotFound from './components/NotFound';
import Netrunner from './netrunner/Netrunner';

const RouteView: React.FC = () => {
  const { path } = useRouter();
  switch (resolveView(path)) {
    case View.HOME:
      return <Home />;
    case View.ABOUT:
      return <About />;
    case View.WRITING:
      return <Writing />;
    case View.PROJECTS:
      return <Projects />;
    case View.DISCLOSURES:
      return <Disclosures />;
    default:
      return <NotFound />;
  }
};

/** Netrunner mode owns the whole viewport; every other route uses the shell. */
const Frame: React.FC = () => {
  const { path } = useRouter();
  if (resolveView(path) === View.NETRUNNER) return <Netrunner />;
  return (
    <AppShell>
      <RouteView />
    </AppShell>
  );
};

/** `initialPath` is supplied during prerender; the client reads window.location. */
const App: React.FC<{ initialPath?: string }> = ({ initialPath }) => (
  <RouterProvider initialPath={initialPath}>
    <Frame />
  </RouterProvider>
);

export default App;
