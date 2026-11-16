import React, { useEffect, useState } from 'react';
import { X, Quote, FileText } from 'lucide-react';
import { CODEBOOK, EVIDENCE_ITEMS } from '../data/reportData';
import { InsightBadge } from './InsightBadge';

interface EvidenceDrawerProps {
  open: boolean;
  onClose: () => void;
  activeEvidenceIds: string[];
  unlockedEvidenceIds: string[];
}

export const EvidenceDrawer: React.FC<EvidenceDrawerProps> = ({
  open,
  onClose,
  activeEvidenceIds,
  unlockedEvidenceIds,
}) => {
  const [tab, setTab] = useState<'moment' | 'codebook'>('moment');

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const activeItems = activeEvidenceIds
    .map((id) => EVIDENCE_ITEMS[id])
    .filter(Boolean);

  const unlockedItems = unlockedEvidenceIds
    .filter((id) => !activeEvidenceIds.includes(id))
    .map((id) => EVIDENCE_ITEMS[id])
    .filter(Boolean);

  const allExcerpts = Object.values(EVIDENCE_ITEMS);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Evidence Drawer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0E1F3A]/55 backdrop-blur-[1px] transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <aside className="relative z-10 w-full max-w-md bg-[#F8F6F0] h-full shadow-2xl border-l border-[#D9A21B]/40 flex flex-col">
        <div className="px-5 py-4 grand-navy-surface text-white border-b border-[#D9A21B]/35 flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2 className="font-display text-lg font-bold tracking-tight">
              Evidence Drawer
            </h2>
            <p className="text-xs text-white/75 mt-0.5">
              Verbatim interview transcripts &amp; Appendix C codebook
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Evidence Drawer"
            className="p-2 rounded text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Tabs */}
        <div className="px-5 pt-3 pb-2.5 border-b border-[#DED8CA] bg-white flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setTab('moment')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              tab === 'moment'
                ? 'bg-[#102342] text-white'
                : 'text-[#52607A] hover:text-[#102342] bg-[#F8F6F0] border border-[#DED8CA]'
            }`}
          >
            Active &amp; Unlocked ({activeItems.length + unlockedItems.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('codebook')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              tab === 'codebook'
                ? 'bg-[#102342] text-white'
                : 'text-[#52607A] hover:text-[#102342] bg-[#F8F6F0] border border-[#DED8CA]'
            }`}
          >
            Full Codebook ({CODEBOOK.length})
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {tab === 'moment' ? (
            <>
              <div>
                <h3 className="text-xs font-semibold text-[#52607A] tracking-wide mb-2.5">
                  Current Decision Evidence
                </h3>
                {activeItems.length === 0 ? (
                  <p className="text-sm text-[#52607A] bg-white border border-[#DED8CA] rounded-lg p-4">
                    Make a decision in the simulation to inspect the exact interview quote, timestamp, and codebook entry behind it.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {activeItems.map((item) => (
                      <div
                        key={item.id}
                        className="border border-[#D9A21B]/60 bg-white rounded-lg p-4 space-y-2 shadow-xs"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-mono-data text-xs font-semibold text-[#102342]">
                            {item.code}
                          </span>
                          <InsightBadge badge={item.badge} />
                        </div>
                        <blockquote className="text-sm font-medium text-[#111C30] leading-relaxed flex gap-2">
                          <Quote
                            className="w-4 h-4 text-[#D9A21B] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item.quote}</span>
                        </blockquote>
                        <div className="text-xs text-[#52607A] flex flex-wrap items-center gap-x-2 gap-y-1 pt-1 border-t border-[#DED8CA]">
                          <span className="font-medium text-[#102342]">
                            {item.speaker}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-data">{item.timestamp}</span>
                          <span aria-hidden="true">·</span>
                          <span>{item.momentTag}</span>
                        </div>
                        <p className="text-xs text-[#334155] leading-relaxed">
                          {item.context}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {unlockedItems.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-[#52607A] tracking-wide mb-2.5">
                    Earlier Unlocked Evidence ({unlockedItems.length})
                  </h3>
                  <div className="space-y-2.5">
                    {unlockedItems.map((item) => (
                      <div
                        key={item.id}
                        className="border border-[#DED8CA] bg-white rounded-lg p-3.5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono-data text-[11px] font-semibold text-[#102342]">
                            {item.code}
                          </span>
                          <InsightBadge badge={item.badge} />
                        </div>
                        <p className="text-sm text-[#111C30]">{item.quote}</p>
                        <div className="text-[11px] text-[#52607A] flex flex-wrap items-center gap-x-2">
                          <span>{item.speaker}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-data">{item.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-[#DED8CA]">
                <h3 className="text-xs font-semibold text-[#52607A] tracking-wide mb-2.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#B8830D]" aria-hidden="true" />
                  All Report Excerpts ({allExcerpts.length})
                </h3>
                <div className="space-y-2">
                  {allExcerpts.map((item) => (
                    <div
                      key={item.id}
                      className="text-xs border border-[#DED8CA] rounded p-2.5 bg-white"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono-data font-semibold text-[#102342]">
                          {item.code}
                        </span>
                        <span className="font-mono-data text-[#52607A]">
                          {item.speaker} · {item.timestamp}
                        </span>
                      </div>
                      <p className="text-[#111C30]">{item.quote}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2.5">
              <p className="text-xs text-[#52607A] mb-3">
                Table C.1: Braun &amp; Clarke thematic codebook mapped to Case 1 (TOE / TAM) and Case 2 (Commitment-Trust / TCE).
              </p>
              {CODEBOOK.map((row) => (
                <div
                  key={row.code}
                  className="border border-[#DED8CA] rounded-lg p-3 bg-white space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-data text-xs font-semibold text-[#102342]">
                      {row.code}
                    </span>
                    <span className="text-[11px] text-[#52607A]">
                      Case {row.caseNum} · {row.framework}
                    </span>
                  </div>
                  <p className="text-xs text-[#334155]">{row.definition}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
