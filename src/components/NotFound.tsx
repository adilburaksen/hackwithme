import React from 'react';

interface NotFoundProps {
  onNavigateHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigateHome }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-500">
      <h1 className="font-mono text-7xl sm:text-9xl text-text">4<span className="text-accent">0</span>4</h1>
      <p className="font-mono text-lg sm:text-xl text-subtext mt-4">
        <span className="text-accent">&gt;_</span> page not found<span className="cursor-blink text-accent font-medium">_</span>
      </p>
      <button
        onClick={onNavigateHome}
        className="font-mono text-xs text-subtext hover:text-accent transition-colors mt-12 group flex items-center gap-2"
      >
        <span>&larr;</span> 
        <span className="group-hover:underline underline-offset-4 decoration-1">return to index</span>
      </button>
    </div>
  );
};

export default NotFound;
