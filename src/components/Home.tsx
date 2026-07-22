import React from 'react';
import { Link } from '../router';
import {
  AUTHOR_FULL_NAME,
  AUTHOR_ALIAS,
  AUTHOR_PROFILE,
  EVIDENCE_METRICS,
  RESEARCH_POSTS,
  PROJECTS,
  PUBLISHED_CVES,
} from '../constants';
import TerminalPanel from './TerminalPanel';
import EvidenceMetric from './EvidenceMetric';
import SectionHeader from './SectionHeader';
import DisclosureRecord from './DisclosureRecord';
import RecordList from './RecordList';
import ExternalLink from './ExternalLink';

const AvailabilityLinks: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex gap-5 text-muted ${className ?? ''}`}>
    <ExternalLink href={AUTHOR_PROFILE.socials.linkedin} className="transition-colors hover:text-signal">
      linkedin
    </ExternalLink>
    <ExternalLink href={AUTHOR_PROFILE.socials.github} className="transition-colors hover:text-signal">
      github
    </ExternalLink>
    <ExternalLink href={AUTHOR_PROFILE.socials.x} className="transition-colors hover:text-signal">
      x
    </ExternalLink>
  </div>
);

const Home: React.FC = () => {
  const project = PROJECTS[0];
  const cve = PUBLISHED_CVES[0];
  const { availability } = AUTHOR_PROFILE;

  return (
    <div className="anim-fade">
      {/* Hero: identity + evidence ledger */}
      <section className="mb-10 grid grid-cols-1 gap-10 sm:mb-[88px] lg:grid-cols-[7fr_5fr] lg:items-start lg:gap-14">
        <TerminalPanel>
          <div className="font-mono text-xs text-muted">
            <span className="text-signal">$</span> whoami
          </div>
          <h1 className="mb-1.5 mt-3 font-display font-[550] text-[31px] leading-[1.08] tracking-[-0.01em] sm:text-[44px]">
            {AUTHOR_FULL_NAME}
          </h1>
          <div className="font-mono text-[12.5px] text-signal sm:text-[13px]">a.k.a. {AUTHOR_ALIAS}</div>
          <div className="mt-3 font-mono text-[10.5px] uppercase leading-[1.6] tracking-[0.12em] text-muted sm:tracking-[0.14em] sm:text-[11px]">
            {AUTHOR_PROFILE.role}
          </div>
          <div className="mt-5 font-mono text-xs text-muted sm:mt-6">
            <span className="text-signal">$</span> cat ./signal.txt
          </div>
          <p className="mt-2.5 max-w-[34rem] text-[16px] leading-[1.62] opacity-90 sm:text-[17px] sm:leading-[1.65]">
            {AUTHOR_PROFILE.bio}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 font-mono text-[13px] sm:flex-row sm:gap-3">
            <Link
              to="/disclosures/"
              className="rounded-control border border-signal px-[18px] py-[13px] text-center text-signal transition-colors hover:bg-signal hover:text-canvas sm:py-2.5"
            >
              view disclosures →
            </Link>
            <ExternalLink
              href={AUTHOR_PROFILE.socials.linkedin}
              className="rounded-control border border-subtle px-[18px] py-[13px] text-center text-muted transition-colors hover:border-strong hover:text-primary sm:py-2.5"
            >
              linkedin
            </ExternalLink>
          </div>
          <div className="mt-6 font-mono text-xs text-muted">
            <span className="text-signal">$</span> <span className="blink text-signal">▍</span>
          </div>
        </TerminalPanel>

        <aside className="self-start rounded-panel border border-subtle">
          <div className="flex justify-between border-b border-subtle px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted sm:px-5 sm:text-[11px]">
            <span>
              <span className="text-signal">#</span> Evidence
            </span>
            <span>ledger · 04</span>
          </div>
          {EVIDENCE_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={idx < EVIDENCE_METRICS.length - 1 ? 'border-b border-subtle' : undefined}
            >
              <EvidenceMetric metric={metric} />
            </div>
          ))}
        </aside>
      </section>

      {/* Selected disclosure + featured project */}
      <section className="mb-10 grid grid-cols-1 gap-10 sm:mb-20 min-[860px]:grid-cols-2 min-[860px]:gap-14">
        <div>
          <SectionHeader title="Selected Disclosure" className="mb-[22px]" />
          <DisclosureRecord cve={cve} variant="home" />
        </div>
        <div>
          <SectionHeader title="Featured Project" className="mb-[22px]" />
          <div className="mb-2 font-mono text-xs text-muted">
            {project.year} <span className="text-signal">/</span> {project.status.toLowerCase()}
          </div>
          <ExternalLink
            href={project.link}
            className="font-mono text-[16px] text-primary [overflow-wrap:anywhere]"
            arrowClassName="text-signal opacity-70"
          >
            {project.name}
          </ExternalLink>
          <p className="mt-3 text-[15px] leading-[1.6] text-muted sm:max-w-[30rem]">
            {project.description}
          </p>
        </div>
      </section>

      {/* Recent writing */}
      <section className="mb-10 sm:mb-[72px]">
        <SectionHeader
          title="Recent Writing"
          className="mb-2"
          action={
            <Link to="/writing/" className="text-muted transition-colors hover:text-signal">
              view all →
            </Link>
          }
        />
        <RecordList posts={RESEARCH_POSTS} variant="compact" />
      </section>

      {/* Availability */}
      <section className="rounded-panel border border-subtle px-[18px] py-4 font-mono text-xs sm:px-6">
        {/* Mobile: stacked */}
        <div className="sm:hidden">
          <div className="text-muted">
            <span className="text-signal">$</span> status --availability
          </div>
          <div className="mt-2 leading-[1.6] text-primary">
            {availability.statement}
            <br />
            {availability.location}
          </div>
          <AvailabilityLinks className="mt-3.5" />
        </div>
        {/* Desktop: inline */}
        <div className="hidden items-center justify-between sm:flex">
          <div className="text-muted">
            <span className="text-signal">$</span> status --availability&nbsp;&nbsp;
            <span className="text-primary">
              {availability.statement} — {availability.location}
            </span>
          </div>
          <AvailabilityLinks />
        </div>
      </section>
    </div>
  );
};

export default Home;
