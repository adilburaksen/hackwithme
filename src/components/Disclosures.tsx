import React, { useMemo } from 'react';
import { PUBLISHED_CVES, ACKNOWLEDGMENTS, ACKNOWLEDGMENTS_INTRO } from '../constants';
import PageIntro from './PageIntro';
import LabeledSection from './LabeledSection';
import DisclosureRecord from './DisclosureRecord';

const subLabel =
  'mb-3 border-b border-subtle pb-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted sm:text-[11px]';
const gridClass = 'grid grid-cols-2 gap-x-6 gap-y-2.5 font-mono text-[13px] sm:grid-cols-3';

interface PlatformGroup {
  platform: string;
  companies: string[];
}

const Disclosures: React.FC = () => {
  const groups = useMemo<PlatformGroup[]>(() => {
    const map = new Map<string, string[]>();
    for (const entry of ACKNOWLEDGMENTS) {
      const list = map.get(entry.platform) ?? [];
      list.push(entry.company);
      map.set(entry.platform, list);
    }
    return Array.from(map, ([platform, companies]) => ({ platform, companies }));
  }, []);

  const bigGroups = groups.filter((g) => g.companies.length > 2);
  const smallGroups = groups.filter((g) => g.companies.length <= 2);

  const cveCount = String(PUBLISHED_CVES.length).padStart(2, '0');
  const meta = `${cveCount} published CVE${PUBLISHED_CVES.length === 1 ? '' : 's'} · ${ACKNOWLEDGMENTS.length} public acknowledgments`;

  return (
    <div className="anim-fade">
      <PageIntro command="cat /disclosures/index" title="Disclosures" meta={meta} />

      <div className="space-y-9 sm:space-y-16">
        <LabeledSection title="CVEs">
          <div className="space-y-8">
            {PUBLISHED_CVES.map((cve) => (
              <DisclosureRecord key={cve.id} cve={cve} variant="page" />
            ))}
          </div>
        </LabeledSection>

        <LabeledSection title="Acknowledgments">
          <div className="max-w-[46rem]">
            <p className="mb-6 max-w-reading text-[14.5px] leading-[1.62] text-muted sm:text-[15px] sm:leading-[1.65]">
              {ACKNOWLEDGMENTS_INTRO}
            </p>

            {bigGroups.map((group) => (
              <div key={group.platform} className="mb-8">
                <div className={subLabel}>
                  {group.platform} · {String(group.companies.length).padStart(2, '0')}
                </div>
                <div className={gridClass}>
                  {group.companies.map((company) => (
                    <span key={company} className="[overflow-wrap:anywhere]">
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {smallGroups.length > 0 && (
              <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
                {smallGroups.map((group) => (
                  <div key={group.platform}>
                    <div className={subLabel}>
                      {group.platform} · {String(group.companies.length).padStart(2, '0')}
                    </div>
                    <div className="font-mono text-[13px]">
                      {group.companies.map((company) => (
                        <div key={company} className="[overflow-wrap:anywhere]">
                          {company}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </LabeledSection>
      </div>
    </div>
  );
};

export default Disclosures;
