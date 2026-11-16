import React from 'react';
import { EvidenceBadge } from '../types/simulation';

interface InsightBadgeProps {
  badge: EvidenceBadge;
}

export const InsightBadge: React.FC<InsightBadgeProps> = ({ badge }) => {
  const styles: Record<EvidenceBadge, string> = {
    'Said directly':
      'border-[#102342]/25 bg-[#102342]/6 text-[#102342]',
    Inferred:
      'border-[#D9A21B]/60 bg-[#FBF4E2] text-[#7D5700]',
    Open:
      'border-[#DED8CA] bg-[#F8F6F0] text-[#52607A]',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium tracking-tight border whitespace-nowrap shrink-0 ${styles[badge]}`}
    >
      {badge}
    </span>
  );
};
