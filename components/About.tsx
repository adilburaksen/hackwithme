import React from 'react';
import { AUTHOR_PROFILE } from '../constants';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-12 sm:space-y-16">
      
      {/* Header Section */}
      <section>
        <h1 className="font-serif text-3xl sm:text-4xl text-text mb-2 tracking-tight">
          {AUTHOR_PROFILE.role}
        </h1>
        <div className="font-mono text-xs text-subtext uppercase tracking-widest flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
          <span>{AUTHOR_PROFILE.location}</span>
          <span className="hidden sm:inline opacity-30">|</span>
          <div className="flex gap-4 sm:gap-4">
            <a 
              href={AUTHOR_PROFILE.socials.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-text transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a 
              href={AUTHOR_PROFILE.socials.x} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-text transition-colors"
              aria-label="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href={AUTHOR_PROFILE.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-text transition-colors"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Signal / Bio */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
        <div className="sm:col-span-1">
          <h2 className="font-mono text-xs text-subtext uppercase tracking-widest sticky top-4">Signal</h2>
        </div>
        <div className="sm:col-span-3">
          <p className="font-serif text-lg text-text opacity-90 leading-relaxed max-w-xl">
            {AUTHOR_PROFILE.bio}
          </p>
        </div>
      </section>

      {/* Trajectory / Experience */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
        <div className="sm:col-span-1">
          <h2 className="font-mono text-xs text-subtext uppercase tracking-widest sticky top-4">Trajectory</h2>
        </div>
        <div className="sm:col-span-3 space-y-8">
          {AUTHOR_PROFILE.experience.map((job, idx) => (
            <div key={idx} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                <h3 className="font-serif font-medium text-text group-hover:text-hovercolor transition-colors">
                  {job.company}
                </h3>
                <span className="font-mono text-xs text-subtext tabular-nums">{job.period}</span>
              </div>
              <div className="text-sm text-subtext opacity-80 mb-2 font-mono">{job.role}</div>
              <p className="font-serif text-sm text-subtext leading-relaxed">
                {job.highlight}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Arsenal / Skills & Certs */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-8">
        <div className="sm:col-span-1">
          <h2 className="font-mono text-xs text-subtext uppercase tracking-widest sticky top-4">Arsenal</h2>
        </div>
        <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
             <h3 className="font-mono text-xs text-subtext opacity-70 mb-3 border-b border-bordercolor pb-1">Certifications</h3>
             <ul className="space-y-2">
                {AUTHOR_PROFILE.arsenal.map((item, idx) => (
                    <li key={idx} className="font-mono text-xs text-subtext">{item}</li>
                ))}
             </ul>
          </div>
          <div>
             <h3 className="font-mono text-xs text-subtext opacity-70 mb-3 border-b border-bordercolor pb-1">Stack</h3>
             <ul className="space-y-2">
                {AUTHOR_PROFILE.stack.map((item, idx) => (
                    <li key={idx} className="font-mono text-xs text-subtext">{item}</li>
                ))}
             </ul>
          </div>
        </div>
      </section>

       {/* Offline / Hobbies */}
       <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
        <div className="sm:col-span-1">
          <h2 className="font-mono text-xs text-subtext uppercase tracking-widest sticky top-4">Offline</h2>
        </div>
        <div className="sm:col-span-3">
          <p className="font-serif text-base text-subtext leading-relaxed">
            {AUTHOR_PROFILE.interests}
          </p>
        </div>
      </section>

    </div>
  );
};

export default About;