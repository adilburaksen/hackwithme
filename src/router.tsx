import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { View } from './types';

/** Canonical, trailing-slash route paths. `/` is the exception. */
export const ROUTES = ['/', '/about/', '/writing/', '/projects/', '/disclosures/'] as const;
export type RoutePath = (typeof ROUTES)[number];

/** Sentinel path the prerenderer uses to emit 404.html. */
export const NOT_FOUND_PATH = '/__404__';

/** Strip query/hash and enforce a single trailing slash (root stays `/`). */
export function normalizePath(input: string): string {
  let p = (input || '/').split('?')[0].split('#')[0];
  if (!p.startsWith('/')) p = '/' + p;
  if (p.length > 1) p = p.replace(/\/+$/, '') + '/';
  return p;
}

export function resolveView(path: string): View {
  switch (normalizePath(path)) {
    case '/':
      return View.HOME;
    case '/about/':
      return View.ABOUT;
    case '/writing/':
      return View.WRITING;
    case '/projects/':
      return View.PROJECTS;
    case '/disclosures/':
      return View.DISCLOSURES;
    default:
      return View.NOT_FOUND;
  }
}

interface RouterContextValue {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

interface RouterProviderProps {
  /** Provided during SSR/prerender; the client reads window.location instead. */
  initialPath?: string;
  children: React.ReactNode;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ initialPath, children }) => {
  const [path, setPath] = useState<string>(() =>
    normalizePath(
      initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
    )
  );

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to: string) => {
    const next = normalizePath(to);
    if (next !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, '', next);
    }
    setPath(next);
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
  );
};

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string;
}

/** Internal navigation link: a real <a href> that intercepts plain left-clicks. */
export const Link: React.FC<LinkProps> = ({ to, children, onClick, ...rest }) => {
  const { navigate } = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
