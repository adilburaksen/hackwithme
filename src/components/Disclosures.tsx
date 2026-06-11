import React, { useMemo } from 'react';
import { PUBLISHED_CVES, ACKNOWLEDGMENTS } from '../constants';

const Disclosures: React.FC = () => {
  const acknowledgmentsByPlatform = useMemo(
    () =>
      Array.from(
        ACKNOWLEDGMENTS.reduce((map, entry) => {
          const list = map.get(entry.platform) ?? [];
          list.push(entry.company);
          map.set(entry.platform, list);
          return map;
        }, new Map<string, string[]>())
      ),
    []
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-12 sm:space-y-16">

      {/* Published CVEs */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
        <div className="sm:col-span-1">
          <h2 className="font-mono text-xs text-subtext uppercase tracking-widest sticky top-4"><span className="text-accent">#</span> CVEs</h2>
        </div>
        <div className="sm:col-span-3 space-y-8">
          {PUBLISHED_CVES.map((entry) => (
            <div key={entry.id} className="group">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1 gap-1">
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-text hover:text-accent hover:underline decoration-1 underline-offset-4 decoration-accent w-fit transition-colors"
                >
                  {entry.cve} <span className="text-accent opacity-70">↗</span>
                </a>
                <span className="font-mono text-xs text-subtext tabular-nums">{entry.year}</span>
              </div>
              <div className="font-display text-base text-text mb-1">
                {entry.title} <span className="text-subtext font-serif">— {entry.vendor}</span>
              </div>
              <div className="font-mono text-xs text-subtext mb-2 flex flex-wrap gap-x-3 gap-y-1">
                <span>{entry.severity}</span>
                <span className="opacity-50">|</span>
                <span>{entry.role}</span>
              </div>
              <p className="font-serif text-sm text-subtext leading-relaxed max-w-xl">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
        <div className="sm:col-span-1">
          <h2 className="font-mono text-xs text-subtext uppercase tracking-widest sticky top-4"><span className="text-accent">#</span> Acknowledgments</h2>
        </div>
        <div className="sm:col-span-3 space-y-8">
          <p className="font-serif text-sm text-subtext leading-relaxed max-w-xl">
            Companies that have publicly acknowledged my responsible disclosures across bug bounty platforms. Bugcrowd Top 100 (2018) with 400+ reports submitted, 150+ validated across Bugcrowd, YesWeHack, Immunefi, Intigriti, and Synack Red Team.
          </p>
          {acknowledgmentsByPlatform.map(([platform, companies]) => (
            <div key={platform}>
              <h3 className="font-mono text-xs text-subtext opacity-70 mb-3 border-b border-bordercolor pb-1">{platform}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
                {companies.map((company) => (
                  <div key={company} className="font-mono text-sm text-text">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Disclosures;
