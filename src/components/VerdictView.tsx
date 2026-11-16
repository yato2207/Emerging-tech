import React from 'react';
import { RotateCcw, Users, Quote, AlertCircle } from 'lucide-react';

interface VerdictViewProps {
  trustScore: number;
  onRestart: () => void;
  onOpenTeam: () => void;
}

export const VerdictView: React.FC<VerdictViewProps> = ({
  trustScore,
  onRestart,
  onOpenTeam,
}) => {
  const verdict =
    trustScore >= 75
      ? {
          title: 'Warranted Trust Built — Verification Made Cheap',
          summary:
            'You gated LLM scaling on testability and measured ROI, prioritized verifiable audit/POC evidence over logos, educated on remaining risk, and codified breach candour and exit clauses.',
        }
      : trustScore >= 50
      ? {
          title: 'Conditional Trust — Safeguards Present, Gaps Remain',
          summary:
            'You balanced parts of the desk well, yet left either post-sale verification costs, hidden token/offloading risks, or dyadic signal gaps partially exposed.',
        }
      : {
          title: 'Fragile Assurance — Unverified Claims & Hidden Risk',
          summary:
            'Promises, hype, or delayed disclosure eroded confidence. As both cases show, buyers commit only when they receive evidence they can check themselves.',
        };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
      {/* Grandiose Score & Qualitative Verdict Monument */}
      <div className="grand-navy-surface text-white rounded-2xl border border-[#D9A21B]/50 p-6 sm:p-10 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9A21B]/25 pb-6">
          <div className="space-y-1.5">
            <p className="text-xs font-medium tracking-wide text-[#E7BA46]">
              Final Simulation Verdict
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-balance">
              {verdict.title}
            </h1>
          </div>
          <div className="bg-[#0B1930]/65 border border-[#D9A21B]/45 rounded-xl px-6 py-3.5 text-left sm:text-right shrink-0">
            <div className="text-[11px] text-[#E7BA46]">Warranted Trust</div>
            <div className="font-mono-data text-3xl font-bold text-white">
              {trustScore}
              <span className="text-base font-normal text-white/60">/100</span>
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
          {verdict.summary}
        </p>

        {/* Closing Quote from the Report */}
        <blockquote className="bg-white/8 border border-[#D9A21B]/35 rounded-xl p-5 flex gap-3.5 items-start">
          <Quote
            className="w-5 h-5 text-[#E7BA46] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="font-display italic text-base sm:text-lg text-[#FBF4E2] leading-relaxed">
            &ldquo;For a manager working with emerging technology, the scarce resource is not capability. It is warranted trust, and it is built by whoever makes verification cheap.&rdquo;
          </p>
        </blockquote>
      </div>

      {/* Three Core Takeaways */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="grand-card rounded-xl p-6 space-y-2.5">
          <div className="font-mono-data text-xs font-bold text-[#B8830D]">
            Takeaway 01
          </div>
          <h2 className="font-display text-lg font-bold text-[#102342]">
            Trust follows verifiable evidence, not assurance
          </h2>
          <p className="text-xs text-[#52607A] leading-relaxed">
            Certifications, audit summaries, 60–90 day pilots, and POCs beat vendor logos and plain reassurance.
          </p>
        </div>

        <div className="grand-card rounded-xl p-6 space-y-2.5">
          <div className="font-mono-data text-xs font-bold text-[#B8830D]">
            Takeaway 02
          </div>
          <h2 className="font-display text-lg font-bold text-[#102342]">
            The sharpest risk sits after the sale
          </h2>
          <p className="text-xs text-[#52607A] leading-relaxed">
            Runaway token bills and offloaded thinking in LLM rollouts; unprotected sensitive files leaving the perimeter after deployment.
          </p>
        </div>

        <div className="grand-card rounded-xl p-6 space-y-2.5">
          <div className="font-mono-data text-xs font-bold text-[#B8830D]">
            Takeaway 03
          </div>
          <h2 className="font-display text-lg font-bold text-[#102342]">
            The manager&apos;s job is to make verification cheap
          </h2>
          <p className="text-xs text-[#52607A] leading-relaxed">
            Pair contracts with client-visible dashboards, risk checks on real data, and pre-agreed breach playbooks.
          </p>
        </div>
      </div>

      {/* Limitations Stamp */}
      <div className="bg-[#FBF4E2]/70 border-2 border-dashed border-[#C89214] rounded-xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#7D5700]" aria-hidden="true" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7D5700]">
            Study Limitations Stamp
          </h3>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs text-[#334155] list-disc list-inside">
          <li>One respondent per case (qualitative exploratory design).</li>
          <li>Case 2 is a conceptual dyad drawn from two different firms.</li>
          <li>
            Figures such as 31–32%, $6–10 million, and the refinery statistics (99% / 8% / 40%) are self-reported and unverified.
          </li>
          <li>
            Question 7 (Indian LLMs) was not asked in the interview, so related insights are marked <strong>Inferred</strong>.
          </li>
        </ul>
      </div>

      {/* Credit Line & Actions */}
      <div className="grand-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-medium text-[#52607A]">
          Group 1, Section B, Emerging Technologies for Digital Transformation, DMS IIT Delhi, November 2026.
        </p>
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenTeam}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#DED8CA] bg-white text-[#102342] text-xs font-semibold hover:bg-[#F8F6F0] transition-colors cursor-pointer min-h-[42px]"
          >
            <Users className="w-3.5 h-3.5 text-[#B8830D]" aria-hidden="true" />
            <span>View Team Page</span>
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#102342] text-white text-xs font-semibold hover:bg-[#1B365D] transition-colors cursor-pointer min-h-[42px]"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#D9A21B]" aria-hidden="true" />
            <span>Restart Simulation</span>
          </button>
        </div>
      </div>
    </section>
  );
};
