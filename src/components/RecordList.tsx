import React from 'react';
import { Post } from '../types';
import RecordCard from './RecordCard';

interface RecordListProps {
  posts: Post[];
  variant: 'full' | 'compact';
  /** Draw a hairline above the first row (archive page); Home relies on the header rule. */
  topBorder?: boolean;
}

const RecordList: React.FC<RecordListProps> = ({ posts, variant, topBorder }) => (
  <div className={topBorder ? 'border-t border-subtle' : undefined}>
    {posts.map((post) => (
      <RecordCard key={post.id} post={post} variant={variant} />
    ))}
  </div>
);

export default RecordList;
