import React from 'react';
import { ExperienceEntry } from '../types';

interface TimelineProps {
  entries: ExperienceEntry[];
}

/**
 * Trajectory spine. The first (most recent) entry marks the current role with
 * a signal square; earlier roles use a strong-border square. Desktop shows
 * company + period on one baseline; mobile stacks period · role above company.
 */
const Timeline: React.FC<TimelineProps> = ({ entries }) => (
  <ol className="flex max-w-reading flex-col gap-7 border-l border-subtle pl-[18px] sm:gap-9 sm:pl-6">
    {entries.map((job, idx) => (
      <li key={job.company} className="relative">
        <span
          className={`absolute top-1.5 -left-[22px] h-[7px] w-[7px] rounded-[2px] sm:-left-[28px] ${
            idx === 0 ? 'bg-signal' : 'bg-strong'
          }`}
          aria-hidden="true"
        />

        {/* Mobile: period · role above company */}
        <div className="font-mono text-[11px] text-muted sm:hidden">
          {job.period} · {job.role}
        </div>
        <div className="font-display text-[18px] leading-[1.3] sm:hidden">{job.company}</div>

        {/* Desktop: company + period baseline, then role */}
        <div className="hidden items-baseline justify-between gap-4 sm:flex">
          <span className="font-display text-[19px]">{job.company}</span>
          <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{job.period}</span>
        </div>
        <div className="mb-2 mt-1 hidden font-mono text-xs text-muted sm:block">{job.role}</div>

        <p className="mt-1.5 text-[14.5px] leading-[1.6] text-muted sm:mt-0 sm:text-[15px]">
          {job.highlight}
        </p>
      </li>
    ))}
  </ol>
);

export default Timeline;
