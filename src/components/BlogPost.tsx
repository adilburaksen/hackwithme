import React, { useState, useEffect, useRef } from 'react';
import { Post } from '../types';
import ToastButton from './ToastButton';
import hljs from 'highlight.js';
import '../atom-one-dark.css';

interface BlogPostProps {
  post: Post;
  allPosts: Post[];
  onBack: () => void;
  onPostClick: (post: Post) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, allPosts, onBack, onPostClick }) => {
  const [showCopied, setShowCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  const readingTimeText = readingTime > 0 ? `${readingTime} min read` : 'Less than a min read';
  
  const postUrl = `${window.location.origin}/#post/${post.id}`;
  const encodedPostUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const currentIndex = allPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block as HTMLElement);
      });
    }
  }, [post.content]);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const scrollTop = element.scrollTop || document.body.scrollTop;
      const scrollHeight = element.scrollHeight || document.body.scrollHeight;
      const progress = (scrollTop / (scrollHeight - element.clientHeight)) * 100;
      setScrollProgress(progress);
    };
    
    window.scrollTo(0, 0);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'j' && nextPost) {
        onPostClick(nextPost);
      } else if (e.key === 'k' && prevPost) {
        onPostClick(prevPost);
      } else if (e.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onBack, onPostClick, nextPost, prevPost]);

  const renderContent = () => {
    const lines = post.content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeLang = '';
    let codeContent = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${i}`} className="rounded-md overflow-x-auto text-sm my-8 font-mono bg-[#282c34] p-4">
              <code className={codeLang ? `language-${codeLang}`: ''}>
                {codeContent.trim()}
              </code>
            </pre>
          );
          inCodeBlock = false;
          codeContent = '';
          codeLang = '';
        } else {
          inCodeBlock = true;
          codeLang = line.substring(3).trim();
        }
      } else if (inCodeBlock) {
        codeContent += line + '\n';
      } else {
        const trimmed = line.trim();
        if (trimmed.startsWith('https://') && (trimmed.includes('medium.com') || trimmed.match(/\.(gif|jpg|png|webp|jpeg)$/i))) {
          elements.push(
            <div key={i} className="my-10">
               <img 
                  src={trimmed} 
                  alt="Post visual" 
                  className="w-full max-w-2xl mx-auto rounded-sm opacity-90 hover:opacity-100 transition-opacity" 
               />
            </div>
          );
        } else if (trimmed) {
          elements.push(
            <p key={i} className="mb-6 font-serif opacity-90">
              {line}
            </p>
          );
        } else {
          elements.push(<div key={i} className="h-6" />);
        }
      }
    }
    return elements;
  };

  return (
    <article ref={contentRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
       <div 
        className="fixed top-0 left-0 h-[2px] bg-text z-10"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease-out' }}
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
        {renderContent()}
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

      <nav className="mt-16 pt-10 border-t border-bordercolor grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
        {prevPost ? (
          <div 
            onClick={() => onPostClick(prevPost)} 
            className="cursor-pointer group text-left border border-transparent hover:border-bordercolor p-4 -m-4 rounded transition-colors"
          >
            <p className="font-mono text-xs text-subtext mb-3 tracking-widest uppercase">&larr; Previous Post</p>
            <p className="font-serif text-text text-lg group-hover:underline underline-offset-4 decoration-1 transition-all">
              {prevPost.title}
            </p>
          </div>
        ) : <div />}

        {nextPost ? (
          <div 
            onClick={() => onPostClick(nextPost)} 
            className="cursor-pointer group sm:text-right border border-transparent hover:border-bordercolor p-4 -m-4 rounded transition-colors"
          >
             <p className="font-mono text-xs text-subtext mb-3 tracking-widest uppercase">Next Post &rarr;</p>
             <p className="font-serif text-text text-lg group-hover:underline underline-offset-4 decoration-1 transition-all">
               {nextPost.title}
             </p>
          </div>
        ) : <div />}
      </nav>

      <ToastButton postId={post.id} />
    </article>
  );
};

export default BlogPost;