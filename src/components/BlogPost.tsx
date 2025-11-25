import React from 'react';
import { Post } from '../types';

interface BlogPostProps {
  post: Post;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="font-mono text-xs text-subtext hover:text-text transition-colors mb-8 sm:mb-12 flex items-center gap-2 group"
      >
        <span>&larr;</span> 
        <span className="group-hover:underline underline-offset-4 decoration-1">index</span>
      </button>

      <header className="mb-10 sm:mb-14">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-text mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 font-mono text-xs text-subtext border-b border-bordercolor pb-4">
          <span>{post.date}</span>
          <span className="opacity-50">|</span>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-none text-text text-lg leading-loose">
        {post.content.split('\n').map((line, idx) => {
          const trimmed = line.trim();
          // Check for Image URLs (Medium format or standard extensions)
          if (trimmed.startsWith('https://') && (trimmed.includes('medium.com') || trimmed.match(/\.(gif|jpg|png|webp|jpeg)$/i))) {
            return (
              <div key={idx} className="my-10">
                 <img 
                    src={trimmed} 
                    alt="Post visual" 
                    className="w-full max-w-2xl mx-auto rounded-sm opacity-90 hover:opacity-100 transition-opacity" 
                 />
              </div>
            );
          }
          
          if (!trimmed) {
             return <div key={idx} className="h-6" />;
          }

          return (
            <p key={idx} className="mb-6 font-serif opacity-90">
              {line}
            </p>
          );
        })}
      </div>
    </article>
  );
};

export default BlogPost;