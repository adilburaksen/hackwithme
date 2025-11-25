import React from 'react';
import { View } from '../types';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { label: 'Index', value: View.HOME },
    { label: 'About', value: View.ABOUT },
    { label: 'Writing', value: View.WRITING },
    { label: 'Projects', value: View.PROJECTS },
  ];

  return (
    <nav className="mb-12 sm:mb-20">
      <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-mono tracking-tight">
        {navItems.map((item) => (
          <li key={item.value}>
            <button
              onClick={() => setView(item.value)}
              className={`text-left transition-all duration-200 ${
                currentView === item.value 
                  ? 'text-text border-b border-text' 
                  : 'text-subtext hover:text-text hover:border-b hover:border-subtext'
              }`}
            >
              {item.label.toLowerCase()}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;