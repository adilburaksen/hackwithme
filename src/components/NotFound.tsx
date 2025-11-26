import React from 'react';

interface NotFoundProps {
  onNavigateHome: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ onNavigateHome }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in duration-500">
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .cursor {
            animation: blink 1s step-end infinite;
            font-weight: 500; /* Make it a bit bolder */
          }
        `}
      </style>
      <h1 className="font-mono text-7xl sm:text-9xl text-text">404</h1>
      <p className="font-mono text-lg sm:text-xl text-subtext mt-4">
        <span className="text-text">&gt;_</span> page not found<span className="cursor">_</span>
      </p>
      <button
        onClick={onNavigateHome}
        className="font-mono text-xs text-subtext hover:text-text transition-colors mt-12 group flex items-center gap-2"
      >
        <span>&larr;</span> 
        <span className="group-hover:underline underline-offset-4 decoration-1">return to index</span>
      </button>
    </div>
  );
};

export default NotFound;
