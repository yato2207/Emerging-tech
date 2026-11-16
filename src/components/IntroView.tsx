import React from 'react';
import { ArrowRight, Users } from 'lucide-react';
import { InsightBadge } from './InsightBadge';

interface IntroViewProps {
  onStart: () => void;
  onOpenTeam: () => void;
}

export const IntroView: React.FC<IntroViewProps> = ({ onStart, onOpenTeam }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Grandiose Imperial Hero Card */}
      <div className="grand-navy-surface text-white rounded-2xl border border-[#D9A21B]/50 shadow-xl p-7 sm:p-11 space-y-7">
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-[#E7BA46]">
            DMS, IIT Delhi · Group 1, Section B · November 2026
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12] text-balance">
            The Trust Desk
          </h1>
          <div className="h-px w-24 bg-[#D9A21B]/70" aria-hidden="true" />
          <p className="font-display italic text-lg sm:text-xl text-[#FBF4E2] leading-relaxed">
            &ldquo;Warranted trust is the scarce resource, and it is built by whoever makes verification cheap.&rdquo;
          </p>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed">
            Step into the executive decision seat across three acts adapted from the qualitative research study{' '}
            <span className="text-white font-semibold">
              &ldquo;Enterprise LLM Adoption and B2B Trust in Cybersecurity.&rdquo;
            </span>{' '}
            Every decision moves the Warranted Trust meter and unlocks the verbatim transcript evidence and theoretical lens behind it.
          </p>
        </div>

        {/* Primary CTA + Secondary Team Link */}
        <div className="flex flex-wrap items-center gap-3.5 pt-1">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#D9A21B] text-[#102342] text-sm font-bold hover:bg-[#E7BA46] transition-colors cursor-pointer min-h-[46px] shadow-md"
          >
            <span>Start Simulation</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onOpenTeam}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/25 bg-white/8 text-white text-sm font-medium hover:bg-white/15 transition-colors cursor-pointer min-h-[46px]"
          >
            <Users className="w-4 h-4 text-[#E7BA46]" aria-hidden="true" />
            <span>Team &amp; Study Protocol</span>
          </button>
          <span className="text-xs text-white/70 sm:ml-2">
            Based on 3 practitioner interviews · 5–7 min run · Offline-ready
          </span>
        </div>
      </div>

      {/* Three Practitioner Interviews Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="grand-card rounded-xl p-6 space-y-2.5">
          <div className="text-xs font-mono-data font-semibold text-[#B8830D]">
            Act 1 · Case 1 (41m 35s)
          </div>
          <h2 className="font-display text-lg font-bold text-[#102342]">
            The CTO of an AI-Native Firm
          </h2>
          <p className="text-xs text-[#52607A] leading-relaxed">
            Where LLMs scale vs. stop, why ROI gates adoption, hidden token bills, and RBI liability fears.
          </p>
        </div>

        <div className="grand-card rounded-xl p-6 space-y-2.5">
          <div className="text-xs font-mono-data font-semibold text-[#B8830D]">
            Act 2 · Case 2 Dyad (39m–40m)
          </div>
          <h2 className="font-display text-lg font-bold text-[#102342]">
            Vendor V1 &amp; Client C1
          </h2>
          <p className="text-xs text-[#52607A] leading-relaxed">
            A conceptual dyad from two firms: trust packs, the refinery funnel, the three-legged stool, and a 2 a.m. breach.
          </p>
        </div>

        <div className="grand-card rounded-xl p-6 space-y-2.5">
          <div className="text-xs font-mono-data font-semibold text-[#B8830D]">
            Act 3 · Synthesis
          </div>
          <h2 className="font-display text-lg font-bold text-[#102342]">
            Company A&apos;s Playbook
          </h2>
          <p className="text-xs text-[#52607A] leading-relaxed">
            Map five trust-building roles across four lifecycle stages to resolve Company B&apos;s three worries and close dyadic gaps.
          </p>
        </div>
      </div>

      {/* Methodology & Insight Badges Key */}
      <div className="grand-card rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#102342]">
            Qualitative Evidence Discipline
          </h3>
          <p className="text-xs text-[#52607A]">
            Every insight mirrors the report&apos;s coding protocol. Open the Evidence Drawer anytime for exact quotes and timestamps.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-[#52607A]">
            <InsightBadge badge="Said directly" />
            <span>Verbatim</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#52607A]">
            <InsightBadge badge="Inferred" />
            <span>Author reading</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#52607A]">
            <InsightBadge badge="Open" />
            <span>Not asked</span>
          </div>
        </div>
      </div>
    </section>
  );
};
