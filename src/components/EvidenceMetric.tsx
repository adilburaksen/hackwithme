import React from 'react';
import { EvidenceMetric as EvidenceMetricType } from '../types';

/** One row of the Home Evidence ledger: label / value / detail. */
const EvidenceMetric: React.FC<{ metric: EvidenceMetricType }> = ({ metric }) => (
  <div className="px-4 py-[15px] sm:px-5 sm:py-[18px]">
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:text-[10.5px]">
      {metric.label}
    </div>
    <div className="mt-1 font-display text-[19px] sm:text-[21px]">
      {metric.value}
      {metric.valueDetail && <span className="text-sm text-muted"> {metric.valueDetail}</span>}
    </div>
    <div className="mt-1 font-mono text-[11.5px] text-muted sm:text-xs">{metric.detail}</div>
  </div>
);

export default EvidenceMetric;
