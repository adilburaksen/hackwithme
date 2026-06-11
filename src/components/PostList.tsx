import React from 'react';
import { Post } from '../types';

interface PostListProps {
  posts: Post[];
  limit?: number;
}

const PostList: React.FC<PostListProps> = ({ posts, limit }) => {
  const displayPosts = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="w-full">
      <ul className="flex flex-col gap-8 sm:gap-6">
        {displayPosts.map((post) => (
          <li key={post.id} className="group cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
              {/* Date: Prominent on mobile, aligned left on desktop */}
              <span className="font-mono text-xs text-subtext shrink-0 w-24 tabular-nums mb-1 sm:mb-0 group-hover:text-accent transition-colors">
                {post.date}
              </span>

              <div className="flex flex-col">
                <a
                  href={post.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 w-fit"
                >
                  <h3 className="text-base sm:text-lg font-display font-medium text-text group-hover:text-hovercolor transition-colors border-b border-transparent group-hover:border-accent">
                    {post.title}
                  </h3>
                  <span className="text-[10px] text-accent opacity-50 group-hover:opacity-100 transition-opacity -mt-1 transform group-hover:translate-x-0.5 duration-200">↗</span>
                </a>

                {!limit && (
                   <p className="mt-2 text-sm text-subtext font-serif leading-relaxed max-w-xl opacity-80">
                     {post.summary}
                   </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
