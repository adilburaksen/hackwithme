import React from 'react';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** Styling for the trailing indicator glyph. */
  arrowClassName?: string;
  arrow?: '↗' | 'none';
}

/**
 * Outbound link: always opens in a new tab with a hardened rel, carries a
 * visible ↗ and an accessible "(external)" hint for non-sighted users.
 */
const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className,
  arrowClassName,
  arrow = '↗',
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
    {children}
    {arrow !== 'none' && (
      <>
        {' '}
        <span aria-hidden="true" className={arrowClassName}>
          {arrow}
        </span>
      </>
    )}
    <span className="sr-only"> (external)</span>
  </a>
);

export default ExternalLink;
