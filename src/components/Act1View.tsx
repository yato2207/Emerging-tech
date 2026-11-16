import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  GripVertical,
} from 'lucide-react';
import {
  ACT1_DEFAULT_LENS,
  QUADRANTS,
  USE_CASE_CHIPS,
} from '../data/reportData';
import { LensNoteSet, QuadrantId } from '../types/simulation';
import { InsightBadge } from './InsightBadge';

interface Act1ViewProps {
  onRecordDecision: (params: {
    decisionId: string;
    delta: number;
    evidenceIds: string[];
    lensNotes: LensNoteSet;
  }) => void;
  onCompleteAct: () => void;
}

type SubStep = '1a' | '1b' | '1c';

export const Act1View: React.FC<Act1ViewProps> = ({
  onRecordDecision,
  onCompleteAct,
}) => {
  const [subStep, setSubStep] = useState<SubStep>('1a');

  // 1A State: placements map chipId -> QuadrantId
  const [placements, setPlacements] = useState<Record<string, QuadrantId>>({});
  const [selectedChipId, setSelectedChipId] = useState<string | null>(null);
  const [draggedChipId, setDraggedChipId] = useState<string | null>(null);
  const [submitted1A, setSubmitted1A] = useState(false);

  // 1B State: ROI Sliders & Pilot
  const [devs, setDevs] = useState(25);
  const [tokenCost, setTokenCost] = useState(80);
  const [assumedGain, setAssumedGain] = useState(32);
  const [offloadThinking, setOffloadThinking] = useState(false);
  const [pilotRun, setPilotRun] = useState(false);

  // 1C State: Regulation Decision
  const [regChoice, setRegChoice] = useState<'dismiss' | 'safeguard' | null>(null);

  const unplacedChips = USE_CASE_CHIPS.filter((c) => !placements[c.id]);
  const allPlaced = unplacedChips.length === 0;

  const placeChip = (chipId: string, quadrantId: QuadrantId) => {
    if (submitted1A) return;
    setPlacements((prev) => ({ ...prev, [chipId]: quadrantId }));
    setSelectedChipId(null);
  };

  const removeChip = (chipId: string) => {
    if (submitted1A) return;
    setPlacements((prev) => {
      const next = { ...prev };
      delete next[chipId];
      return next;
    });
    setSelectedChipId(chipId);
  };

  const coreChips = USE_CASE_CHIPS.filter((c) => !c.isBonus);
  const coreMatches = coreChips.filter((c) => {
    const placed = placements[c.id];
    return placed && c.recommendedQuadrants.includes(placed);
  }).length;

  const handleSubmit1A = () => {
    setSubmitted1A(true);
    const delta = coreMatches >= 3 ? 10 : coreMatches === 2 ? 5 : -3;
    onRecordDecision({
      decisionId: 'act1-1a-matrix',
      delta,
      evidenceIds: ['hallucination', 'offloading', 'productivity-31-32'],
      lensNotes: {
        TOE: 'TOE (Technology): Reliability gates scaling. Coding outputs are testable; core business decisions risk costly hallucination.',
        TAM: 'TAM: Perceived usefulness is high for coding (31–32% self-reported gain) and outreach, while risk caps usefulness in sales and strategy.',
        'Commitment-Trust': 'Internal trust in LLM output holds only when humans verify results rather than offloading judgment.',
        TCE: 'Monitoring cost is cheap for testable code and high for ambiguous revenue decisions, dictating where human governance stays.',
      },
    });
  };

  const handleReset1A = () => {
    setPlacements({});
    setSelectedChipId(null);
    setSubmitted1A(false);
  };

  // 1B Calculations (Illustrative model based on user inputs & report constraints)
  const monthlyTokenBill = devs * tokenCost * (offloadThinking ? 1.85 : 1);
  const annualTokenBill = Math.round(monthlyTokenBill * 12);
  // Assume avg developer loaded cost ~$4,000/mo in simulation unit to show net ROI delta
  const baselineMonthlyPayroll = devs * 4000;
  const effectiveGainPct = offloadThinking
    ? assumedGain - 24 // rework & oversight penalty
    : assumedGain;
  const grossMonthlyValue = Math.round(
    baselineMonthlyPayroll * (Math.max(0, effectiveGainPct) / 100)
  );
  const netMonthlyImpact = grossMonthlyValue - monthlyTokenBill;

  const handleToggleOffload = () => {
    const next = !offloadThinking;
    setOffloadThinking(next);
    onRecordDecision({
      decisionId: 'act1-1b-offload',
      delta: next ? -6 : 4,
      evidenceIds: ['offloading', 'cost-based'],
      lensNotes: {
        TOE: 'TOE (Organisation): Offloading thinking inflates token bills and rework, erasing expected efficiency gains.',
        TAM: 'TAM: Short-term perceived usefulness drops once staff spend more time debugging unverified AI output.',
        'Commitment-Trust': 'Relying blindly on AI outputs weakens team capability and internal confidence in delivery.',
        TCE: 'Hidden verification and rework act as post-adoption monitoring costs that eat into net return.',
      },
    });
  };

  const handleRunPilot = () => {
    setPilotRun(true);
    onRecordDecision({
      decisionId: 'act1-1b-pilot',
      delta: 8,
      evidenceIds: ['cost-based', 'productivity-31-32', 'offloading'],
      lensNotes: {
        TOE: 'TOE (Organisation): A 60–90 day pilot replaces felt gains with measured cost and defect metrics before full rollout.',
        TAM: 'TAM: Tests whether perceived usefulness holds on real tasks—crucial when Becker et al. (2025) show perceived speed-ups can mask actual slowdowns.',
        'Commitment-Trust': 'Transparent ROI measurement avoids the fate of the two US ROI-linked contracts that lost money.',
        TCE: 'Piloting caps commitment before sunk costs ($6–10M fine-tuning or system rewrites) lock the firm in.',
      },
    });
  };

  const handleRegChoice = (choice: 'dismiss' | 'safeguard') => {
    setRegChoice(choice);
    onRecordDecision({
      decisionId: 'act1-1c-reg',
      delta: choice === 'safeguard' ? 6 : -5,
      evidenceIds: ['bank-liable', 'hype-instagram'],
      lensNotes: {
        TOE: 'TOE (Environment): The CTO sees banks as "very scared" under RBI liability, whereas RBI FREE-AI enables AI when paired with safeguards.',
        TAM: 'TAM: Perceived usefulness alone cannot drive adoption in banking without regulatory risk coverage.',
        'Commitment-Trust': 'Acknowledging a bank\'s liability exposure builds credibility faster than dismissing compliance concerns.',
        TCE: 'Data residency, audit logs, and human sign-off act as institutional safeguards against regulatory liability.',
      },
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Act Header + Sub-step Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#4E5D78]">
            Act 1 · Case 1: The CTO of an AI-Native Firm
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#102342] tracking-tight">
            The CTO&apos;s Desk
          </h1>
        </div>

        <div
          role="tablist"
          aria-label="Act 1 exercises"
          className="inline-flex items-center p-1 bg-white border border-[#DCE2EC] rounded-lg self-start sm:self-auto"
        >
          {[
            { id: '1a' as SubStep, label: '1A · Scale-or-Stop' },
            { id: '1b' as SubStep, label: '1B · ROI Check' },
            { id: '1c' as SubStep, label: '1C · Regulation' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={subStep === tab.id}
              onClick={() => setSubStep(tab.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                subStep === tab.id
                  ? 'bg-[#102342] text-white'
                  : 'text-[#4E5D78] hover:text-[#111D33]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1A: SCALE-OR-STOP BOARD */}
      {subStep === '1a' && (
        <div className="grand-card rounded-xl p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-[#102342]">
                  1A. Scale-or-Stop Board (Figure 1.1)
                </h2>
                <InsightBadge badge="Said directly" />
              </div>
              <p className="text-sm text-[#4E5D78]">
                Drag each use case onto the 2×2 grid—or tap a chip, then tap a quadrant—to decide where LLMs should scale vs. stop.
              </p>
            </div>
            {submitted1A && (
              <div className="text-left sm:text-right shrink-0">
                <span className="font-mono-data text-sm font-bold text-[#102342]">
                  {coreMatches}/4 core aligned
                </span>
                <p className="text-[11px] text-[#4E5D78]">Matches CTO&apos;s stance</p>
              </div>
            )}
          </div>

          {/* Unplaced Chip Tray */}
          <div className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-lg p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-[#4E5D78]">
              <span>
                {unplacedChips.length > 0
                  ? selectedChipId
                    ? `Selected: "${USE_CASE_CHIPS.find((c) => c.id === selectedChipId)?.label}" — tap any quadrant below to place.`
                    : 'Use-case chips (drag or tap to place):'
                  : 'All 5 use cases placed. Submit to compare against the CTO.'}
              </span>
              {Object.keys(placements).length > 0 && (
                <button
                  type="button"
                  onClick={handleReset1A}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#102342] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" aria-hidden="true" />
                  Reset
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 min-h-[38px]">
              {unplacedChips.map((chip) => {
                const isSelected = selectedChipId === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    draggable={!submitted1A}
                    onDragStart={() => setDraggedChipId(chip.id)}
                    onDragEnd={() => setDraggedChipId(null)}
                    onClick={() =>
                      setSelectedChipId(isSelected ? null : chip.id)
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium border transition-all cursor-grab active:cursor-grabbing min-h-[40px] ${
                      isSelected
                        ? 'bg-[#102342] text-white border-[#102342] ring-2 ring-[#D9A21B]'
                        : 'bg-white text-[#111D33] border-[#DCE2EC] hover:border-[#102342]'
                    }`}
                  >
                    <GripVertical className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />
                    <span>{chip.label}</span>
                    {chip.isBonus && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-[#FBF4E2] text-[#7D5700]'
                        }`}
                      >
                        Bonus
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2x2 Matrix Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-medium text-[#4E5D78] px-1">
              <span>↑ High cost of wrong output</span>
              <span className="hidden sm:inline">← Hard to verify · Easy to verify →</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUADRANTS.map((q) => {
                const chipsInQ = USE_CASE_CHIPS.filter(
                  (c) => placements[c.id] === q.id
                );
                const ctoRecommendedInQ = submitted1A
                  ? USE_CASE_CHIPS.filter((c) => c.bestQuadrant === q.id)
                  : [];

                return (
                  <div
                    key={q.id}
                    onDragOver={(e) => {
                      if (!submitted1A) e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedChipId) {
                        placeChip(draggedChipId, q.id);
                        setDraggedChipId(null);
                      }
                    }}
                    onClick={() => {
                      if (selectedChipId && !submitted1A) {
                        placeChip(selectedChipId, q.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && selectedChipId && !submitted1A) {
                        e.preventDefault();
                        placeChip(selectedChipId, q.id);
                      }
                    }}
                    aria-label={`Quadrant: ${q.title} (${q.subtitle})`}
                    className={`rounded-lg border p-4 min-h-[156px] flex flex-col justify-between transition-colors ${
                      selectedChipId && !submitted1A
                        ? 'border-dashed border-[#D9A21B] bg-[#FBF4E2]/35 cursor-pointer hover:bg-[#FBF4E2]/65'
                        : 'border-[#DCE2EC] bg-[#F8F6F0]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-xs font-bold tracking-wide text-[#102342]">
                          {q.title}
                        </h3>
                        <span className="text-[11px] text-[#4E5D78] shrink-0">
                          {q.xLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#4E5D78] mt-0.5">
                        {q.subtitle}
                      </p>
                    </div>

                    {/* Placed Chips */}
                    <div className="flex flex-wrap gap-1.5 my-3">
                      {chipsInQ.map((chip) => {
                        const isMatch =
                          submitted1A && chip.recommendedQuadrants.includes(q.id);
                        return (
                          <button
                            key={chip.id}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeChip(chip.id);
                            }}
                            disabled={submitted1A}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium border transition-colors ${
                              submitted1A
                                ? isMatch
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                                  : 'bg-amber-50 border-amber-300 text-amber-900'
                                : 'bg-white border-[#102342]/30 text-[#111D33] hover:border-rose-400 cursor-pointer'
                            }`}
                          >
                            <span>{chip.label}</span>
                            {!submitted1A && (
                              <span className="text-[#4E5D78] text-[10px]">×</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Revealed CTO Stance inside Quadrant */}
                    {submitted1A && ctoRecommendedInQ.length > 0 && (
                      <div className="pt-2 border-t border-[#DCE2EC] space-y-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4E5D78]">
                          Report placement:
                        </span>
                        {ctoRecommendedInQ.map((item) => (
                          <div key={item.id} className="text-xs text-[#111D33]">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-semibold text-[#102342]">
                                {item.label}
                              </span>
                              <InsightBadge badge={item.badge} />
                            </div>
                            <p className="text-[11px] text-[#4E5D78] mt-0.5">
                              {item.ctoStance} — {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] font-medium text-[#4E5D78] px-1">
              <span>↓ Low cost of wrong output</span>
              <span className="sm:hidden">Ease of verifying output</span>
            </div>
          </div>

          {/* Quotes Reveal & Action Bar */}
          {submitted1A && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              <div className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-lg p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-[11px] font-semibold text-[#102342]">
                    RELIABILITY · 6:33
                  </span>
                  <InsightBadge badge="Said directly" />
                </div>
                <p className="text-sm font-medium text-[#111D33]">
                  &ldquo;We can&apos;t bank on the hallucination of LLMs.&rdquo;
                </p>
                <p className="text-xs text-[#4E5D78]">CTO of an AI-native firm</p>
              </div>
              <div className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-lg p-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-data text-[11px] font-semibold text-[#102342]">
                    OFFLOADING · 28:54
                  </span>
                  <InsightBadge badge="Said directly" />
                </div>
                <p className="text-sm font-medium text-[#111D33]">
                  &ldquo;You can&apos;t offload the thinking.&rdquo;
                </p>
                <p className="text-xs text-[#4E5D78]">CTO of an AI-native firm</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#DCE2EC]">
            {!submitted1A ? (
              <button
                type="button"
                disabled={!allPlaced}
                onClick={handleSubmit1A}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors min-h-[44px] ${
                  allPlaced
                    ? 'bg-[#102342] text-white hover:bg-[#122643] cursor-pointer'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                Reveal CTO&apos;s Placement
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSubStep('1b')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Next: 1B · ROI Reality Check</span>
                <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
              </button>
            )}
            <span className="text-xs text-[#4E5D78]">
              {!allPlaced
                ? `${unplacedChips.length} chip${unplacedChips.length > 1 ? 's' : ''} remaining`
                : submitted1A
                ? 'Evidence unlocked in drawer'
                : 'Ready to compare'}
            </span>
          </div>
        </div>
      )}

      {/* 1B: ROI REALITY CHECK */}
      {subStep === '1b' && (
        <div className="grand-card rounded-xl p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-[#102342]">
                  1B. ROI Reality Check
                </h2>
                <InsightBadge badge="Said directly" />
              </div>
              <p className="text-sm text-[#4E5D78]">
                Adjust team assumptions and compare felt productivity against empirical evidence before scaling.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Zone: Sliders & Token-Bill Trap */}
            <div className="lg:col-span-6 space-y-5 bg-[#F8F6F0] border border-[#DCE2EC] rounded-xl p-5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <label htmlFor="slider-devs" className="text-[#111D33]">
                    Number of developers
                  </label>
                  <span className="font-mono-data font-semibold text-[#102342]">
                    {devs} devs
                  </span>
                </div>
                <input
                  id="slider-devs"
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={devs}
                  onChange={(e) => setDevs(Number(e.target.value))}
                  className="w-full trust-slider"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <label htmlFor="slider-tokens" className="text-[#111D33]">
                    Monthly token cost per developer
                  </label>
                  <span className="font-mono-data font-semibold text-[#102342]">
                    ${tokenCost}/mo
                  </span>
                </div>
                <input
                  id="slider-tokens"
                  type="range"
                  min={10}
                  max={300}
                  step={10}
                  value={tokenCost}
                  onChange={(e) => setTokenCost(Number(e.target.value))}
                  className="w-full trust-slider"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <label htmlFor="slider-gain" className="text-[#111D33]">
                    Assumed productivity gain
                  </label>
                  <span className="font-mono-data font-semibold text-[#102342]">
                    {assumedGain}%
                  </span>
                </div>
                <input
                  id="slider-gain"
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={assumedGain}
                  onChange={(e) => setAssumedGain(Number(e.target.value))}
                  className="w-full trust-slider"
                />
              </div>

              {/* Token-Bill Trap Toggle */}
              <div className="pt-2 border-t border-[#DCE2EC]">
                <button
                  type="button"
                  onClick={handleToggleOffload}
                  aria-pressed={offloadThinking}
                  className={`w-full flex items-center justify-between gap-3 p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                    offloadThinking
                      ? 'bg-rose-50 border-rose-300 text-rose-950'
                      : 'bg-white border-[#DCE2EC] text-[#111D33] hover:border-[#102342]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-semibold">
                      Token-bill trap: &ldquo;Developers offload the thinking&rdquo;
                    </div>
                    <div className="text-[11px] text-[#4E5D78] mt-0.5">
                      {offloadThinking
                        ? 'Active: +85% retry token spend + review rework shrinks net ROI'
                        : 'Toggle on to simulate unverified copy-paste coding'}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-[11px] font-mono-data font-semibold shrink-0 ${
                      offloadThinking
                        ? 'bg-rose-700 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {offloadThinking ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>

              {/* Live Budget Output */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white border border-[#DCE2EC] rounded-lg p-3">
                  <div className="text-[11px] text-[#4E5D78]">Annual token spend</div>
                  <div className="font-mono-data text-base font-bold text-[#102342]">
                    ${annualTokenBill.toLocaleString()}
                  </div>
                </div>
                <div className="bg-white border border-[#DCE2EC] rounded-lg p-3">
                  <div className="text-[11px] text-[#4E5D78]">Modeled net monthly impact</div>
                  <div
                    className={`font-mono-data text-base font-bold ${
                      netMonthlyImpact >= 0 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {netMonthlyImpact >= 0 ? '+' : '-'}$
                    {Math.abs(Math.round(netMonthlyImpact)).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Zone: Empirical Bars + Pilot + Cost Facts */}
            <div className="lg:col-span-6 space-y-5">
              {/* Two Side-by-Side Comparison Bars */}
              <div className="border border-[#DCE2EC] rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-[#102342]">
                  Self-Reported Gain vs. Controlled Trial
                </h3>

                <div className="grid grid-cols-2 gap-4 items-end pt-2">
                  {/* Bar 1: Respondent */}
                  <div className="space-y-2">
                    <div className="h-36 bg-[#F8F6F0] border border-[#DCE2EC] rounded-lg p-2 flex flex-col justify-end">
                      <div
                        className="w-full bg-[#102342] rounded transition-all duration-300 flex items-center justify-center text-white font-mono-data text-xs font-bold"
                        style={{ height: '64%' }}
                      >
                        +31–32%
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#111D33]">
                      Respondent&apos;s self-reported gain: 31–32%
                    </div>
                    <p className="text-[11px] text-[#4E5D78]">
                      Method unknown; unverified by controlled metrics.
                    </p>
                  </div>

                  {/* Bar 2: Becker et al., 2025 */}
                  <div className="space-y-2">
                    <div className="h-36 bg-[#F8F6F0] border border-[#DCE2EC] rounded-lg p-2 flex flex-col justify-end">
                      <div
                        className="w-full bg-rose-600 rounded transition-all duration-300 flex items-center justify-center text-white font-mono-data text-xs font-bold"
                        style={{ height: '38%' }}
                      >
                        19% slower
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#111D33]">
                      RCT (Becker et al., 2025): 19% slower
                    </div>
                    <p className="text-[11px] text-[#4E5D78]">
                      Experienced open-source devs forecast a 24% speed-up and afterwards believed they were 20% faster.
                    </p>
                  </div>
                </div>

                <p className="text-xs font-medium text-[#102342] bg-[#FBF4E2] border border-[#D9A21B]/40 rounded-lg p-3">
                  Felt gains can be wrong—measure on real work before scaling.
                </p>
              </div>

              {/* 60-90 Day Pilot Action */}
              <div className="border border-[#DCE2EC] rounded-xl p-4 space-y-3">
                {!pilotRun ? (
                  <button
                    type="button"
                    onClick={handleRunPilot}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#D9A21B] text-[#111D33] text-sm font-semibold hover:bg-[#E5B332] transition-colors cursor-pointer min-h-[44px]"
                  >
                    <Play className="w-4 h-4" aria-hidden="true" />
                    <span>Run a 60–90 Day Pilot</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                        60–90 Day Pilot Measured Result
                      </span>
                      <InsightBadge badge="Inferred" />
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      Tracking actual tasks completed, bug rates, review hours, and token spend per team prevents paying for perceived speed that masks net slowdowns.
                    </p>
                  </div>
                )}
              </div>

              {/* Cost Facts & Verbatim Quote */}
              <div className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-xl p-4 space-y-2 text-xs text-[#334155]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#102342]">
                    &ldquo;Adopting LLM is more of a cost-based decision.&rdquo;
                  </span>
                  <span className="font-mono-data text-[#4E5D78]">19:12</span>
                </div>
                <ul className="space-y-1 list-disc list-inside text-[#4E5D78]">
                  <li>
                    Fine-tuning a model costs <strong className="text-[#111D33]">$6–10 million</strong> (self-reported, unverified), so most firms use public models.
                  </li>
                  <li>
                    Two US engagements with ROI-linked fees <strong className="text-[#111D33]">lost money</strong> because ROI was not delivered.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#DCE2EC]">
            <button
              type="button"
              onClick={() => setSubStep('1a')}
              className="text-xs font-medium text-[#4E5D78] hover:text-[#102342] cursor-pointer"
            >
              ← Back to 1A
            </button>
            <button
              type="button"
              onClick={() => setSubStep('1c')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Next: 1C · Regulation Mini-Card</span>
              <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* 1C: REGULATION MINI-CARD */}
      {subStep === '1c' && (
        <div className="grand-card rounded-xl p-5 sm:p-7 space-y-6">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-[#102342]">
                1C. Regulation Mini-Card: Bank Liability vs. RBI FREE-AI
              </h2>
              <InsightBadge badge="Said directly" />
            </div>
            <p className="text-sm text-[#4E5D78]">
              When an LLM makes an error in banking, who holds the bag—and how does the regulator actually frame it?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-[#DCE2EC] bg-[#F8F6F0] rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#102342]">
                  CTO&apos;s Reading of RBI Direction
                </span>
                <InsightBadge badge="Said directly" />
              </div>
              <p className="text-sm font-medium text-[#111D33]">
                &ldquo;The bank is liable.&rdquo; (19:12)
              </p>
              <p className="text-xs text-[#4E5D78] leading-relaxed">
                Banks are &ldquo;very scared&rdquo; because the bank—not the model vendor—is held liable if an LLM hallucinates or leaks PII.
              </p>
            </div>

            <div className="border border-[#D9A21B]/50 bg-[#FBF4E2]/45 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#102342]">
                  Counterpoint: RBI FREE-AI Report (2025)
                </span>
                <InsightBadge badge="Inferred" />
              </div>
              <p className="text-sm font-medium text-[#111D33]">
                Enable AI with graded safeguards
              </p>
              <p className="text-xs text-[#4E5D78] leading-relaxed">
                The RBI FREE-AI framework proposes graded liability and is explicitly framed around <strong>enabling AI while safeguarding against risk</strong>—making caution a design challenge, not a ban.
              </p>
            </div>
          </div>

          {/* Manager Decision */}
          <div className="border border-[#DCE2EC] rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#102342]">
              Your briefing to a bank&apos;s risk committee:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRegChoice('dismiss')}
                className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                  regChoice === 'dismiss'
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-[#DCE2EC] hover:border-[#102342] bg-white'
                }`}
              >
                <div className="text-xs font-semibold text-[#111D33]">
                  &ldquo;Stop worrying—RBI wants AI adoption.&rdquo;
                </div>
                <p className="text-[11px] text-[#4E5D78] mt-1">
                  Pushes past PII and liability questions without safeguards.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleRegChoice('safeguard')}
                className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                  regChoice === 'safeguard'
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-[#DCE2EC] hover:border-[#102342] bg-white'
                }`}
              >
                <div className="text-xs font-semibold text-[#111D33]">
                  &ldquo;Keep data in India without PII + enforce human review.&rdquo;
                </div>
                <p className="text-[11px] text-[#4E5D78] mt-1">
                  Directly addresses liability, PII rules, and RBI FREE-AI safeguards.
                </p>
              </button>
            </div>

            {regChoice && (
              <div className="text-xs pt-1 flex items-center gap-2 text-[#111D33]">
                {regChoice === 'safeguard' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                    <span>
                      Warranted Trust rises: Indian data residency, PII redaction, and review gates turn regulatory fear into verifiable governance.
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
                    <span>
                      Warranted Trust drops: banks face real liability when models err, so assurance without technical safeguards stalls adoption.
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#DCE2EC]">
            <button
              type="button"
              onClick={() => setSubStep('1b')}
              className="text-xs font-medium text-[#4E5D78] hover:text-[#102342] cursor-pointer"
            >
              ← Back to 1B
            </button>
            <button
              type="button"
              onClick={() => {
                onRecordDecision({
                  decisionId: 'act1-complete',
                  delta: 0,
                  evidenceIds: ['cost-based', 'bank-liable'],
                  lensNotes: ACT1_DEFAULT_LENS,
                });
                onCompleteAct();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Proceed to Act 2: The Vendor&apos;s Table</span>
              <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
