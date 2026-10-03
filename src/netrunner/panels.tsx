import React from 'react';
import {
  AUTHOR_ALIAS,
  AUTHOR_FULL_NAME,
  AUTHOR_PROFILE,
  ACKNOWLEDGMENTS,
  EVIDENCE_METRICS,
  PROJECTS,
  PUBLISHED_CVES,
  RESEARCH_POSTS,
} from '../constants';
import { Link } from '../router';

const Ext: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({
  href,
  children,
  className,
}) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className ?? 'nr-link'}>
    {children}
    <span aria-hidden="true"> ↗</span>
    <span className="sr-only"> (external)</span>
  </a>
);

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="nr-block">
    <h3 className="nr-block-title">{title}</h3>
    {children}
  </section>
);

/* 01 — terminals */
export const BreachLogs: React.FC = () => {
  const platforms = Array.from(new Set(ACKNOWLEDGMENTS.map((a) => a.platform)));
  return (
    <>
      <Block title="published cve">
        {PUBLISHED_CVES.map((c) => (
          <article key={c.id} className="nr-log">
            <div className="nr-log-head">
              <span className="nr-tag nr-tag--red">{c.severity}</span>
              <span className="nr-cyan">{c.cve}</span>
              <span className="nr-dim">{c.year} · {c.role}</span>
            </div>
            <p className="nr-log-title">{c.title}</p>
            <p className="nr-p">{c.description}</p>
            <Ext href={c.link}>advisory</Ext>
          </article>
        ))}
        {PROJECTS.map((p) => (
          <article key={p.id} className="nr-log">
            <div className="nr-log-head">
              <span className="nr-tag">exploit</span>
              <span className="nr-cyan">{p.name}</span>
              <span className="nr-dim">{p.year}</span>
            </div>
            <p className="nr-p">{p.description}</p>
            <Ext href={p.link}>source</Ext>
          </article>
        ))}
      </Block>
      <Block title={`acknowledgments // ${ACKNOWLEDGMENTS.length}`}>
        {platforms.map((pl) => (
          <div key={pl} className="nr-ack">
            <div className="nr-ack-platform">[{pl}]</div>
            <ul className="nr-ack-list">
              {ACKNOWLEDGMENTS.filter((a) => a.platform === pl).map((a) => (
                <li key={a.company}>{a.company}</li>
              ))}
            </ul>
          </div>
        ))}
      </Block>
      <Link to="/disclosures/" className="nr-link">
        full disclosure record → normal mode
      </Link>
    </>
  );
};

/* 02 — shards */
export const DataShards: React.FC = () => (
  <>
    <Block title="projects">
      {PROJECTS.map((p) => (
        <Ext key={p.id} href={p.link} className="nr-shard">
          <span className="nr-shard-id">{p.year}</span>
          <span className="nr-shard-title">{p.name}</span>
          <span className="nr-shard-meta">{p.status}</span>
        </Ext>
      ))}
    </Block>
    <Block title="write-ups">
      {RESEARCH_POSTS.map((post) => (
        <Ext key={post.id} href={post.externalLink} className="nr-shard">
          <span className="nr-shard-id">{post.date}</span>
          <span className="nr-shard-title">{post.title}</span>
          <span className="nr-shard-meta">{post.tags.join(' · ')}</span>
        </Ext>
      ))}
    </Block>
  </>
);

/* 03 — holo display */
export const Dossier: React.FC = () => (
  <>
    <div className="nr-id">
      <div className="nr-id-name">{AUTHOR_FULL_NAME}</div>
      <div className="nr-id-alias">a.k.a. {AUTHOR_ALIAS}</div>
      <div className="nr-id-role">{AUTHOR_PROFILE.role}</div>
      <div className="nr-dim">
        {AUTHOR_PROFILE.availability.location} · {AUTHOR_PROFILE.availability.statement}
      </div>
    </div>
    <p className="nr-p">{AUTHOR_PROFILE.bio}</p>
    <Block title="evidence">
      <dl className="nr-metrics">
        {EVIDENCE_METRICS.map((m) => (
          <div key={m.label} className="nr-metric">
            <dt className="nr-dim">{m.label}</dt>
            <dd>
              <span className="nr-acid">{m.value}</span>
              {m.valueDetail ? <span className="nr-dim"> {m.valueDetail}</span> : null}
              <div className="nr-dim">{m.detail}</div>
            </dd>
          </div>
        ))}
      </dl>
    </Block>
    <Block title="off-grid">
      <p className="nr-p">{AUTHOR_PROFILE.interests}</p>
    </Block>
  </>
);

/* 04 — vault (shown after the ICE is cracked) */
export const CvDecrypted: React.FC = () => (
  <>
    <p className="nr-p">{AUTHOR_PROFILE.bio}</p>
    <Block title="experience">
      <ol className="nr-timeline">
        {AUTHOR_PROFILE.experience.map((e) => (
          <li key={e.company + e.period} className="nr-tl-item">
            <div className="nr-tl-period">{e.period}</div>
            <div className="nr-tl-role">{e.role}</div>
            <div className="nr-cyan">{e.company}</div>
            <p className="nr-p nr-p--sm">{e.highlight}</p>
          </li>
        ))}
      </ol>
    </Block>
    <Block title="certifications">
      <ul className="nr-list">
        {AUTHOR_PROFILE.certifications.map((c) => (
          <li key={c.name}>
            <span className="nr-acid">{c.name}</span> <span className="nr-dim">{c.detail}</span>
          </li>
        ))}
      </ul>
    </Block>
    <Block title="stack">
      <ul className="nr-list">
        {AUTHOR_PROFILE.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </Block>
    <p className="nr-p nr-dim">
      PDF on request —{' '}
      <Ext href={AUTHOR_PROFILE.socials.linkedin}>message on LinkedIn</Ext>
    </p>
  </>
);

/* 05 — door */
export const Contact: React.FC = () => (
  <>
    <p className="nr-p">
      {AUTHOR_PROFILE.availability.statement}. Based in {AUTHOR_PROFILE.availability.location}.
      The fastest channel is LinkedIn.
    </p>
    <div className="nr-doors">
      <Ext href={AUTHOR_PROFILE.socials.linkedin} className="nr-door-btn nr-door-btn--primary">
        linkedin
      </Ext>
      <Ext href={AUTHOR_PROFILE.socials.github} className="nr-door-btn">
        github
      </Ext>
      <Ext href={AUTHOR_PROFILE.socials.x} className="nr-door-btn">
        x
      </Ext>
    </div>
    <Link to="/" className="nr-link">
      ↩ leave the deck (normal mode)
    </Link>
  </>
);
