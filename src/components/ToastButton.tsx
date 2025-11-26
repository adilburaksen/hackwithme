import React, { useState, useEffect } from 'react';

interface ToastButtonProps {
  postId: string;
}

const ToastButton: React.FC<ToastButtonProps> = ({ postId }) => {
  const [toastCount, setToastCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const storedCount = localStorage.getItem(`toast-count-${postId}`);
    if (storedCount) {
      setToastCount(parseInt(storedCount, 10));
    }
  }, [postId]);

  const handleToastClick = () => {
    const newCount = toastCount + 1;
    setToastCount(newCount);
    localStorage.setItem(`toast-count-${postId}`, newCount.toString());
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300); // Animation duration
  };

  return (
    <div className="flex justify-center mt-10 sm:mt-14">
      <button
        onClick={handleToastClick}
        className="group relative flex items-center gap-2 text-subtext hover:text-text transition-colors"
        title="Toast this post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transform transition-transform duration-300 ${
            isClicked ? '-translate-y-2' : ''
          }`}
        >
          <path d="M5 15l7-7 7 7" />
        </svg>
        <span className="font-mono text-xs">{toastCount}</span>
      </button>
    </div>
  );
};

export default ToastButton;
