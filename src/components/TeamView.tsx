import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { TEAM_MEMBERS, TeamMember } from '../data/reportData';

interface TeamViewProps {
  onBack: () => void;
}

const MemberPortrait: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#102342] text-[#E7BA46] font-display font-bold text-lg flex items-center justify-center shrink-0 ring-2 ring-[#D9A21B]/75 ring-offset-2 ring-offset-white"
      >
        {member.initials}
      </div>
    );
  }

  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 ring-2 ring-[#D9A21B]/80 ring-offset-2 ring-offset-white bg-[#102342] shadow-sm">
      <img
        src={member.photo}
        alt={`Portrait of ${member.name}`}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover scale-110"
      />
    </div>
  );
};

export const TeamView: React.FC<TeamViewProps> = ({ onBack }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#DED8CA] bg-white text-xs font-semibold text-[#102342] hover:bg-[#FBF4E2]/50 transition-colors cursor-pointer min-h-[40px]"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#B8830D]" aria-hidden="true" />
          <span>Back to Simulation</span>
        </button>
        <span className="text-xs font-medium text-[#52607A]">
          Emerging Technologies for Digital Transformation · DMS, IIT Delhi
        </span>
      </div>

      {/* Grandiose Imperial Navy Banner */}
      <div className="grand-navy-surface text-white rounded-2xl border border-[#D9A21B]/45 shadow-lg overflow-hidden">
        <div className="p-6 sm:p-9 border-b border-[#D9A21B]/25 space-y-3">
          <p className="text-xs font-medium tracking-wide text-[#E7BA46]">
            Department of Management Studies · IIT Delhi · MBA Section B · Group 1 · November 2026
          </p>
          <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white text-balance">
            Research Team &amp; Study Protocol
          </h1>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-3xl">
            This interactive simulation translates our qualitative end-term study{' '}
            <span className="font-semibold text-white">
              &ldquo;Enterprise LLM Adoption and B2B Trust in Cybersecurity&rdquo;
            </span>{' '}
            into an executive decision desk.
          </p>
        </div>

        <div className="px-6 sm:px-9 py-4 bg-[#0B1930]/55 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-white/80">
          <div>
            <span className="text-[#E7BA46] font-semibold block mb-0.5">Fieldwork</span>
            3 online semi-structured interviews (Nov 11–13, 2026)
          </div>
          <div>
            <span className="text-[#E7BA46] font-semibold block mb-0.5">Analytical Method</span>
            Braun &amp; Clarke (2006) 6-step coding; matched-role dyad in Case 2
          </div>
          <div>
            <span className="text-[#E7BA46] font-semibold block mb-0.5">Anonymity Protocol</span>
            Case 1 CTO of an AI-native firm; Case 2 strictly C1 and V1
          </div>
        </div>
      </div>

      {/* Individual Member Portraits Grid */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#DED8CA] pb-3">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#102342]">
            Group 1 Authors
          </h2>
          <span className="text-xs font-medium text-[#52607A]">
            7 Researchers · DMS, IIT Delhi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM_MEMBERS.map((member) => (
            <article
              key={member.rollNo}
              className="grand-card rounded-xl p-5 flex items-center gap-4 hover:border-[#D9A21B]/70 transition-colors"
            >
              <MemberPortrait member={member} />
              <div className="min-w-0 space-y-1">
                <h3 className="text-sm font-bold text-[#102342] leading-snug">
                  {member.name}
                </h3>
                <p className="font-mono-data text-xs font-medium text-[#B8830D]">
                  {member.rollNo}
                </p>
                <p className="text-xs text-[#52607A] leading-snug">
                  {member.contribution}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
