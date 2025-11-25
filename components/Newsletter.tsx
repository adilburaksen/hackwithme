import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <div className="border border-bordercolor bg-surface p-6 sm:p-8 mt-12 mb-4">
      <h3 className="font-serif text-xl text-text mb-2">Join the inner circle</h3>
      <p className="font-mono text-xs text-subtext mb-6 leading-relaxed max-w-md">
        I share deeper insights on Application Security, Red Teaming, and offensive engineering. No spam, just signal.
      </p>
      
      <form 
        action="https://app.beehiiv.com/subscribe" 
        method="POST"
        target="_blank"
        className="flex flex-col sm:flex-row gap-3"
      >
        <input 
          type="email" 
          name="email"
          placeholder="your@email.com"
          required
          className="flex-1 bg-background border border-bordercolor px-4 py-2 text-sm text-text placeholder-subtext focus:outline-none focus:border-subtext font-mono transition-colors"
        />
        <button 
          type="submit"
          className="px-6 py-2 bg-text text-background font-mono text-xs uppercase tracking-widest hover:bg-hovercolor hover:text-background transition-colors font-medium"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;