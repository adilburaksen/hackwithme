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

/** `initialPath` is supplied during prerender; the client reads window.location. */
const App: React.FC<{ initialPath?: string }> = ({ initialPath }) => (
  <RouterProvider initialPath={initialPath}>
    <AppShell>
      <RouteView />
    </AppShell>
  </RouterProvider>
);

export default App;
