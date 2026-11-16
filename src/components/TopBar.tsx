import React from 'react';
import { BookOpen, Users } from 'lucide-react';
import { ScreenId, TheoryLens } from '../types/simulation';
import { THEORY_LENSES } from '../data/reportData';

interface TopBarProps {
  screen: ScreenId;
  onNavigate: (s: ScreenId) => void;
  trustScore: number;
  lastDelta: number | null;
  lens: TheoryLens;
  onChangeLens: (l: TheoryLens) => void;
  lensNote: string;
  evidenceCount: number;
  onOpenEvidence: () => void;
}

const STAGES: { id: ScreenId; label: string; shortLabel: string }[] = [
  { id: 'intro', label: 'Intro', shortLabel: 'Intro' },
  { id: 'act1', label: 'Act 1 · CTO Desk', shortLabel: 'Act 1' },
  { id: 'act2', label: 'Act 2 · Vendor Table', shortLabel: 'Act 2' },
  { id: 'act3', label: 'Act 3 · Playbook', shortLabel: 'Act 3' },
  { id: 'verdict', label: 'Final Verdict', shortLabel: 'Verdict' },
];

export const TopBar: React.FC<TopBarProps> = ({
  screen,
  onNavigate,
  trustScore,
  lastDelta,
  lens,
  onChangeLens,
  lensNote,
  evidenceCount,
  onOpenEvidence,
}) => {
  const trustLabel =
    trustScore >= 75 ? 'Warranted' : trustScore >= 50 ? 'Calibrated' : 'Guarded';

  const meterColor =
    trustScore >= 75
      ? 'bg-[#D9A21B]'
      : trustScore >= 50
      ? 'bg-[#7FA3F2]'
      : 'bg-[#E05D5D]';

  return (
    <>
      {/* Sticky Single-Row Imperial Navy Top Bar */}
      <header className="sticky top-0 z-30 grand-navy-surface text-white border-b border-[#D9A21B]/40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3 sm:gap-8">
          {/* Zone 1: Brand wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('intro')}
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-[#E7BA46] transition-colors cursor-pointer"
          >
            The Trust Desk
          </button>

          {/* Zone 2: Warranted Trust Meter */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 min-w-0"
            aria-label={`Warranted Trust score: ${trustScore} out of 100 (${trustLabel})`}
          >
            <span className="hidden md:inline text-xs text-white/80 whitespace-nowrap shrink-0">
              Warranted Trust
            </span>
            <div className="w-20 sm:w-32 h-2 bg-white/15 rounded-full overflow-hidden shrink-0 border border-white/10">
              <div
                className={`h-full transition-all duration-300 ease-out ${meterColor}`}
                style={{ width: `${trustScore}%` }}
              />
            </div>
            <span className="font-mono-data text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0">
              {trustScore}
              <span className="text-white/55 font-normal">/100</span>
            </span>
            {lastDelta !== null && lastDelta !== 0 && (
              <span
                className={`hidden sm:inline font-mono-data text-[11px] font-semibold whitespace-nowrap shrink-0 ${
                  lastDelta > 0 ? 'text-[#E7BA46]' : 'text-rose-300'
                }`}
              >
                {lastDelta > 0 ? `+${lastDelta}` : lastDelta}
              </span>
            )}
            <span className="hidden lg:inline text-[11px] text-[#E7BA46]/90 whitespace-nowrap shrink-0">
              · {trustLabel}
            </span>
          </div>

          {/* Zone 3: Evidence Drawer + Team */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('team')}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                screen === 'team'
                  ? 'bg-white/20 text-white border border-[#D9A21B]/50'
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Open Team page"
            >
              <Users className="w-3.5 h-3.5 text-[#E7BA46]" aria-hidden="true" />
              <span className="hidden sm:inline">Team</span>
            </button>
            <button
              type="button"
              onClick={onOpenEvidence}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#D9A21B] text-[#102342] text-xs font-bold hover:bg-[#E7BA46] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Evidence</span>
              <span className="font-mono-data text-[11px] opacity-85">
                ({evidenceCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Non-sticky Ivory Workspace Strip */}
      <div className="bg-white border-b border-[#DED8CA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          {/* Stage Navigation */}
          <nav
            aria-label="Simulation acts"
            className="flex items-center gap-1 overflow-x-auto pb-0.5 lg:pb-0"
          >
            {STAGES.map((st, idx) => {
              const active = screen === st.id;
              return (
                <React.Fragment key={st.id}>
                  <button
                    type="button"
                    onClick={() => onNavigate(st.id)}
                    className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#102342] text-white'
                        : 'text-[#52607A] hover:text-[#102342] hover:bg-[#F8F6F0]'
                    }`}
                  >
                    <span className="sm:hidden">{st.shortLabel}</span>
                    <span className="hidden sm:inline">{st.label}</span>
                  </button>
                  {idx < STAGES.length - 1 && (
                    <span className="text-[#C7BFA9] text-xs select-none" aria-hidden="true">
                      /
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Theory Lens Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#52607A] whitespace-nowrap shrink-0">
              Theory lens:
            </span>
            <div
              role="group"
              aria-label="Theory lens selector"
              className="inline-flex items-center p-0.5 bg-[#F8F6F0] border border-[#DED8CA] rounded-md overflow-x-auto max-w-full"
            >
              {THEORY_LENSES.map((item) => {
                const isSelected = lens === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangeLens(item.id)}
                    aria-pressed={isSelected}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-[#102342] shadow-xs font-semibold border border-[#DED8CA]/70'
                        : 'text-[#52607A] hover:text-[#102342]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live 1-line Theory Lens Interpretation */}
        <div className="bg-[#FBF4E2]/70 border-t border-[#D9A21B]/25">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-baseline gap-2 text-xs text-[#111C30]">
            <span className="font-semibold text-[#102342] whitespace-nowrap shrink-0">
              {lens} lens:
            </span>
            <p className="text-[#334155] leading-snug">{lensNote}</p>
          </div>
        </div>
      </div>
    </>
  );
};
