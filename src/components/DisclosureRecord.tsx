import React from 'react';
import { PublishedCVE } from '../types';
import ExternalLink from './ExternalLink';
import Tag from './Tag';

interface DisclosureRecordProps {
  cve: PublishedCVE;
  /** `page` = Disclosures section (year beside id); `home` = compact selected disclosure. */
  variant: 'page' | 'home';
}

const idClass =
  'font-mono text-signal [overflow-wrap:anywhere] text-[14px] sm:text-[15px]';

const DisclosureRecord: React.FC<DisclosureRecordProps> = ({ cve, variant }) => {
  const title = (
    <div className="my-2 font-display text-[20px] leading-[1.25] sm:my-2.5 sm:text-[22px]">
      {cve.title}{' '}
      <span className="font-serif text-[16px] text-muted sm:text-[17px]">— {cve.vendor}</span>
    </div>
  );

  if (variant === 'home') {
    return (
      <div>
        <ExternalLink href={cve.link} className={idClass} arrowClassName="opacity-70">
          {cve.cve}
        </ExternalLink>
        {title}
        <div className="mb-3 flex flex-wrap gap-2">
          <Tag variant="strong">{cve.severity}</Tag>
          <Tag>{cve.role}</Tag>
          <Tag>{cve.year}</Tag>
        </div>
        <p className="text-[15px] leading-[1.6] text-muted sm:max-w-[30rem]">{cve.description}</p>
      </div>
    );
  }

  return (
    <div className="max-w-reading">
      <div className="mb-1.5 font-mono text-[11.5px] text-muted sm:hidden">{cve.year}</div>
      <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-4">
        <ExternalLink
          href={cve.link}
          className={`${idClass} sm:text-[16px]`}
          arrowClassName="opacity-70"
        >
          {cve.cve}
        </ExternalLink>
        <span className="hidden shrink-0 font-mono text-xs text-muted sm:block">{cve.year}</span>
      </div>
      <div className="my-2 font-display text-[20px] leading-[1.25] sm:my-2.5 sm:text-[23px]">
        {cve.title}{' '}
        <span className="font-serif text-[16px] text-muted sm:text-[17px]">— {cve.vendor}</span>
      </div>
      <div className="mb-2.5 flex flex-wrap gap-2 sm:mb-3">
        <Tag variant="strong">{cve.severity}</Tag>
        <Tag>{cve.role}</Tag>
      </div>
      <p className="text-[15px] leading-[1.6] text-muted">{cve.description}</p>
    </div>
  );
};

export default DisclosureRecord;
