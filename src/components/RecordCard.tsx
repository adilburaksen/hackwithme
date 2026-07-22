import React from 'react';
import { Post } from '../types';
import ExternalLink from './ExternalLink';
import Tag from './Tag';

interface RecordCardProps {
  post: Post;
  /** `full` = archive row with summary + chips; `compact` = Home recent list. */
  variant: 'full' | 'compact';
}

const titleHover =
  'transition-[box-shadow] group-hover:[box-shadow:inset_0_-1px_0_var(--signal)]';
const arrowClass = 'text-signal opacity-50 transition-opacity group-hover:opacity-100';

/** Writing record. Metadata stacks above the title on mobile. */
const RecordCard: React.FC<RecordCardProps> = ({ post, variant }) => {
  if (variant === 'compact') {
    const tagLine = post.tags.join(' · ');
    return (
      <article className="group border-b border-subtle py-4">
        {/* Desktop: date · title · tags */}
        <div className="hidden items-baseline gap-6 sm:grid sm:grid-cols-[110px_1fr_auto]">
          <span className="font-mono text-xs text-muted transition-colors group-hover:text-signal">
            {post.date}
          </span>
          <ExternalLink
            href={post.externalLink}
            className={`font-display text-[19px] text-primary ${titleHover}`}
            arrowClassName={`text-[11px] ${arrowClass}`}
          >
            {post.title}
          </ExternalLink>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted">
            {tagLine}
          </span>
        </div>
        {/* Mobile: date + tags above title */}
        <div className="sm:hidden">
          <div className="mb-1.5 font-mono text-[11.5px] text-muted transition-colors group-hover:text-signal">
            {post.date}{' '}
            <span className="text-[10px] uppercase tracking-[0.1em]">{tagLine}</span>
          </div>
          <ExternalLink
            href={post.externalLink}
            className={`font-display text-[18px] leading-[1.3] text-primary ${titleHover}`}
            arrowClassName={`text-[11px] ${arrowClass}`}
          >
            {post.title}
          </ExternalLink>
        </div>
      </article>
    );
  }

  return (
    <article className="group grid gap-2 border-b border-subtle py-7 sm:grid-cols-[130px_1fr] sm:gap-8">
      <span className="font-mono text-xs text-muted transition-colors group-hover:text-signal sm:pt-1">
        {post.date}
      </span>
      <div className="max-w-reading">
        <ExternalLink
          href={post.externalLink}
          className={`font-display text-[22px] leading-[1.3] text-primary ${titleHover}`}
          arrowClassName={`text-xs ${arrowClass}`}
        >
          {post.title}
        </ExternalLink>
        <p className="mb-3 mt-2.5 text-[15px] leading-[1.6] text-muted">{post.summary}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </article>
  );
};

export default RecordCard;
