import React from 'react';
import { Link, useRouter, normalizePath } from '../router';

interface NavItem {
  label: string;
  to: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'index', to: '/' },
  { label: 'about', to: '/about/' },
  { label: 'writing', to: '/writing/' },
  { label: 'projects', to: '/projects/' },
  { label: 'disclosures', to: '/disclosures/' },
];

interface CommandNavigationProps {
  /** `inline` for the desktop header, `bar` for the mobile scroll strip. */
  variant: 'inline' | 'bar';
}

/**
 * Primary navigation. Current route is never colour-only: it gains a `/`
 * prefix, primary text, and a signal underline. Focus rings come from the
 * global :focus-visible rule.
 */
const CommandNavigation: React.FC<CommandNavigationProps> = ({ variant }) => {
  const { path } = useRouter();
  const current = normalizePath(path);

  if (variant === 'bar') {
    return (
      <nav
        aria-label="Primary"
        className="flex overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const isCurrent = current === normalizePath(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={isCurrent ? 'page' : undefined}
              className={`shrink-0 px-4 py-[13px] font-mono text-[13px] snap-start transition-colors ${
                isCurrent
                  ? 'text-primary [box-shadow:inset_0_-2px_0_var(--signal)]'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {isCurrent && <span className="text-signal">/</span>}
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Primary" className="flex items-baseline gap-[26px]">
      {NAV_ITEMS.map((item) => {
        const isCurrent = current === normalizePath(item.to);
        return (
          <Link
            key={item.to}
            to={item.to}
            aria-current={isCurrent ? 'page' : undefined}
            className={`pb-[3px] font-mono text-[13px] transition-colors ${
              isCurrent
                ? 'text-primary [box-shadow:inset_0_-1px_0_var(--signal)]'
                : 'text-muted hover:text-primary hover:[box-shadow:inset_0_-1px_0_var(--text-muted)]'
            }`}
          >
            {isCurrent && <span className="text-signal">/</span>}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default CommandNavigation;
