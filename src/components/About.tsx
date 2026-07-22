import React from 'react';
import { AUTHOR_PROFILE } from '../constants';
import PageIntro from './PageIntro';
import LabeledSection from './LabeledSection';
import Timeline from './Timeline';

const subLabel =
  'mb-3 border-b border-subtle pb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted';
const listClass = 'flex list-none flex-col gap-[9px] font-mono text-[12.5px] text-muted';

const About: React.FC = () => (
  <div className="anim-fade">
    <PageIntro
      command="cd /about"
      title={AUTHOR_PROFILE.role}
      meta={AUTHOR_PROFILE.location}
      metaClassName="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted sm:text-[11px]"
    />

    <div className="space-y-9 sm:space-y-16">
      <LabeledSection title="Signal">
        <p className="max-w-reading text-[16px] leading-[1.62] opacity-90 sm:text-[18px] sm:leading-[1.65]">
          {AUTHOR_PROFILE.bio}
        </p>
      </LabeledSection>

      <LabeledSection title="Trajectory">
        <Timeline entries={AUTHOR_PROFILE.experience} />
      </LabeledSection>

      <LabeledSection title="Arsenal">
        <div className="grid max-w-reading grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-12">
          <div>
            <div className={subLabel}>Certifications</div>
            <ul className={listClass}>
              {AUTHOR_PROFILE.certifications.map((cert) => (
                <li key={cert.name}>
                  <span className="text-primary">{cert.name}</span>
                  {cert.detail ? ` ${cert.detail}` : ''}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={subLabel}>Stack</div>
            <ul className={listClass}>
              {AUTHOR_PROFILE.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </LabeledSection>

      <LabeledSection title="Offline">
        <p className="max-w-reading text-[15px] leading-[1.65] text-muted sm:text-[16px]">
          {AUTHOR_PROFILE.interests}
        </p>
      </LabeledSection>
    </div>
  </div>
);

export default About;
