import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import ToastButton from './ToastButton';

interface BlogPostProps {
  post: Post;
  onBack: () => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  const readingTimeText = readingTime > 0 ? `${readingTime} min read` : 'Less than a min read';
  
  const postUrl = `${window.location.origin}/#post/${post.id}`;
  const encodedPostUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const scrollTop = element.scrollTop || document.body.scrollTop;
      const scrollHeight = element.scrollHeight || document.body.scrollHeight;
      const progress = (scrollTop / (scrollHeight - element.clientHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div 
        className="fixed top-0 left-0 w-full h-[2px] bg-text transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
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
          <span>{readingTimeText}</span>
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

      <div className="mt-16 pt-8 border-t border-bordercolor flex items-center justify-center gap-6">
        <span className="font-mono text-xs text-subtext">Share article</span>
        <div className="flex items-center gap-4">
            <a href={`https://twitter.com/intent/tweet?url=${encodedPostUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="text-subtext hover:text-text transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedPostUrl}`} target="_blank" rel="noopener noreferrer" className="text-subtext hover:text-text transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
            </a>
            <div className="relative">
                <button onClick={handleCopyLink} className="text-subtext hover:text-text transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
                </button>
                {showCopied && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-background border border-bordercolor text-text text-xs rounded-md shadow-lg animate-in fade-in duration-300">
                    Copied!
                    </div>
                )}
            </div>
        </div>
      </div>

      <ToastButton postId={post.id} />
    </article>
  );
};

export default BlogPost;