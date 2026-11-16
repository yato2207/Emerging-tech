import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Lock,
} from 'lucide-react';
import {
  ACT2_DEFAULT_LENS,
  BREACH_ROOT_CAUSE_TABLE,
  TRUST_PACK_ITEMS,
} from '../data/reportData';
import { LensNoteSet } from '../types/simulation';
import { InsightBadge } from './InsightBadge';

interface Act2ViewProps {
  onRecordDecision: (params: {
    decisionId: string;
    delta: number;
    evidenceIds: string[];
    lensNotes: LensNoteSet;
  }) => void;
  onCompleteAct: () => void;
}

type SubStep = '2a' | '2b' | '2c' | '2d' | '2e';

export const Act2View: React.FC<Act2ViewProps> = ({
  onRecordDecision,
  onCompleteAct,
}) => {
  const [subStep, setSubStep] = useState<SubStep>('2a');

  // 2A State
  const [selectedPack, setSelectedPack] = useState<string[]>([
    'references',
    'firm-size',
  ]);
  const [submitted2A, setSubmitted2A] = useState(false);

  // 2B State
  const [pitchChoice, setPitchChoice] = useState<'reassure' | 'educate' | null>(
    null
  );

  // 2C State
  const [stoolLegs, setStoolLegs] = useState<{
    contracts: boolean;
    relationship: boolean;
    verification: boolean;
  }>({
    contracts: false,
    relationship: false,
    verification: false,
  });
  const [visibilityLevel, setVisibilityLevel] = useState(55);

  // 2D State
  const [breachChoice, setBreachChoice] = useState<
    'disclose' | 'delay' | 'hide' | null
  >(null);

  // 2E State
  const [acknowledgedLockIn, setAcknowledgedLockIn] = useState(false);

  const togglePackItem = (id: string) => {
    setSelectedPack((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedEvidenceCount = TRUST_PACK_ITEMS.filter(
    (item) => item.category === 'evidence' && selectedPack.includes(item.id)
  ).length;
  const selectedSocialCount = TRUST_PACK_ITEMS.filter(
    (item) => item.category === 'social' && selectedPack.includes(item.id)
  ).length;

  const signalGapStatus =
    selectedEvidenceCount >= 4
      ? 'Narrow gap — audit & POC evidence aligns with C1'
      : selectedEvidenceCount >= 2
      ? 'Moderate gap — C1 needs stronger audit/POC proof'
      : 'Wide gap — heavy on logos/size, short on C1 evidence';

  const handleConfirm2A = () => {
    setSubmitted2A(true);
    const delta =
      selectedEvidenceCount >= 4 ? 9 : selectedEvidenceCount >= 2 ? 3 : -5;
    onRecordDecision({
      decisionId: 'act2-2a-trustpack',
      delta,
      evidenceIds: ['c1-evidence', 'v1-references', 'v1-checkmark'],
      lensNotes: {
        TOE: 'TOE: C1 operates under audit and compliance governance; social proof alone fails enterprise screening.',
        TAM: 'TAM: A POC proves usefulness in C1\'s real environment rather than on a vendor slide.',
        'Commitment-Trust': 'Roadmap candour and shared audit reports communicate honestly without overpromising.',
        TCE: 'Certifications, pen-tests, and a 5–6 year track record lower pre-contractual uncertainty for C1.',
      },
    });
  };

  const handlePitchChoice = (choice: 'reassure' | 'educate') => {
    setPitchChoice(choice);
    onRecordDecision({
      decisionId: 'act2-2b-refinery',
      delta: choice === 'educate' ? 9 : -4,
      evidenceIds: ['c1-education', 'v1-conservative'],
      lensNotes: {
        TOE: 'TOE: The refinery gap (99% classified, 8% protected, 40% leaving) came from client policy choices, not missing software.',
        TAM: 'TAM: Educating Company B on remaining exposure raises perceived usefulness of proper configuration.',
        'Commitment-Trust': 'Education is useful communication ("I would consider education more valuable than reassurance"); plain reassurance erodes trust.',
        TCE: 'Showing where data leaks reduces hidden vulnerability before Company B commits.',
      },
    });
  };

  const allLegsFilled =
    stoolLegs.contracts && stoolLegs.relationship && stoolLegs.verification;

  const toggleLeg = (leg: 'contracts' | 'relationship' | 'verification') => {
    const next = { ...stoolLegs, [leg]: !stoolLegs[leg] };
    setStoolLegs(next);
    if (next.contracts && next.relationship && next.verification) {
      onRecordDecision({
        decisionId: 'act2-2c-stool',
        delta: 8,
        evidenceIds: ['c1-contracts', 'v1-neither', 'c1-verify'],
        lensNotes: {
          TOE: 'TOE: Controls (DLP, DRM, SIEM) turn policy intentions into observable operational readiness.',
          TAM: 'TAM: Dashboards remain useful only when they avoid creating blind friction for security teams.',
          'Commitment-Trust': 'V1 and C1 agree: contracts set the floor, while mutual trust and candour carry the relationship.',
          TCE: 'Because C1 cannot fully observe vendor effort, C1 pays monitoring costs (DLP/DRM/dark-web checks) as a third leg alongside contracts.',
        },
      });
    }
  };

  const clientTrustFromVis = Math.min(95, Math.round(25 + visibilityLevel * 0.7));
  const vendorRiskFromVis =
    visibilityLevel <= 60
      ? Math.round(12 + visibilityLevel * 0.35)
      : Math.min(96, Math.round(33 + (visibilityLevel - 60) * 1.6));

  const handleBreachChoice = (choice: 'disclose' | 'delay' | 'hide') => {
    setBreachChoice(choice);
    const delta = choice === 'disclose' ? 10 : choice === 'delay' ? -12 : -20;
    onRecordDecision({
      decisionId: 'act2-2d-breach',
      delta,
      evidenceIds: ['c1-response', 'v1-conservative'],
      lensNotes: {
        TOE: 'TOE: Incident escalation workflows and agreed breach-notice SLAs determine response speed under pressure.',
        TAM: 'TAM: Transparent RCA reporting proves the operational value of the vendor\'s monitoring capability.',
        'Commitment-Trust': 'Hiding or delaying is opportunism—C1 blacklists immediately. Candid disclosure preserves commitment and can earn a second chance.',
        TCE: 'Fixing breach-notice rules in the contract removes the startup temptation to bury bad news.',
      },
    });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header & Sub-step tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#4E5D78]">
            Act 2 · Case 2 Dyad: Vendor V1 &amp; Client C1
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#102342] tracking-tight">
            The Vendor&apos;s Table
          </h1>
        </div>

        <div
          role="tablist"
          aria-label="Act 2 exercises"
          className="inline-flex items-center p-1 bg-white border border-[#DCE2EC] rounded-lg overflow-x-auto max-w-full"
        >
          {[
            { id: '2a' as SubStep, label: '2A · Trust Pack' },
            { id: '2b' as SubStep, label: '2B · Refinery' },
            { id: '2c' as SubStep, label: '2C · 3-Leg Stool' },
            { id: '2d' as SubStep, label: '2D · 2am Breach' },
            { id: '2e' as SubStep, label: '2E · Lock-in' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={subStep === tab.id}
              onClick={() => setSubStep(tab.id)}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

      {/* 2A: BUILD THE TRUST PACK */}
      {subStep === '2a' && (
        <div className="grand-card rounded-xl p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-[#102342]">
                  2A. Build the Pre-Sale Trust Pack
                </h2>
                <InsightBadge badge="Said directly" />
              </div>
              <p className="text-sm text-[#4E5D78]">
                Select what to put in front of C1 before signing. Watch how C1 (client gatekeeper) and V1 (vendor) read the same items differently.
              </p>
            </div>
            <div className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-lg px-3 py-2 text-xs shrink-0">
              <div className="text-[#4E5D78]">Trust signals gap</div>
              <div className="font-semibold text-[#102342] mt-0.5">
                {signalGapStatus}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left: Selectable Evidence Items */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-semibold text-[#4E5D78] mb-1">
                Pre-sale items ({selectedPack.length}/7 selected)
              </div>
              {TRUST_PACK_ITEMS.map((item) => {
                const checked = selectedPack.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => togglePackItem(item.id)}
                    aria-pressed={checked}
                    className={`w-full text-left p-3 rounded-lg border transition-colors flex items-start gap-3 cursor-pointer ${
                      checked
                        ? 'border-[#102342] bg-[#102342]/5'
                        : 'border-[#DCE2EC] bg-white hover:border-[#102342]/50'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center text-[11px] font-bold shrink-0 ${
                        checked
                          ? 'bg-[#102342] border-[#102342] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {checked ? '✓' : ''}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#111D33]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#4E5D78] mt-0.5">
                        {item.category === 'evidence'
                          ? 'Verifiable evidence / candour'
                          : 'Social / brand signal'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Split Screen C1 vs V1 */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* C1 Column */}
              <div className="border border-[#DCE2EC] bg-[#F8F6F0] rounded-xl p-4 space-y-3">
                <div className="border-b border-[#DCE2EC] pb-2">
                  <div className="text-xs font-bold text-[#102342]">
                    C1 (Client Gatekeeper)
                  </div>
                  <p className="text-[11px] text-[#4E5D78]">
                    Must justify the pick to auditors &amp; CISO. Values certs, audits, 5–6 year track record, and POC.
                  </p>
                </div>

                {selectedPack.length === 0 ? (
                  <p className="text-xs text-[#4E5D78]">Select items on the left.</p>
                ) : (
                  <div className="space-y-2.5">
                    {TRUST_PACK_ITEMS.filter((i) => selectedPack.includes(i.id)).map(
                      (item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-[#DCE2EC] rounded-lg p-2.5 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-[#111D33]">
                              {item.label}
                            </span>
                            <span
                              className={`font-mono-data text-[10px] font-semibold ${
                                item.c1Weight === 'High'
                                  ? 'text-emerald-700'
                                  : 'text-[#4E5D78]'
                              }`}
                            >
                              {item.c1Weight}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4E5D78]">
                            {item.c1Reaction}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}

                <div className="pt-2 border-t border-[#DCE2EC] text-[11px] text-[#102342] font-medium">
                  &ldquo;Ultimately, credibility comes from evidence.&rdquo; (C1, 21:26)
                </div>
              </div>

              {/* V1 Column */}
              <div className="border border-[#DCE2EC] bg-[#F8F6F0] rounded-xl p-4 space-y-3">
                <div className="border-b border-[#DCE2EC] pb-2">
                  <div className="text-xs font-bold text-[#102342]">
                    V1 (Vendor Belief)
                  </div>
                  <p className="text-[11px] text-[#4E5D78]">
                    Leans on references, client logos, demos/POCs, and brand size (especially in Middle East).
                  </p>
                </div>

                {selectedPack.length === 0 ? (
                  <p className="text-xs text-[#4E5D78]">Select items on the left.</p>
                ) : (
                  <div className="space-y-2.5">
                    {TRUST_PACK_ITEMS.filter((i) => selectedPack.includes(i.id)).map(
                      (item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-[#DCE2EC] rounded-lg p-2.5 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-[#111D33]">
                              {item.label}
                            </span>
                            <span className="font-mono-data text-[10px] font-semibold text-[#102342]">
                              {item.v1Weight}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4E5D78]">
                            {item.v1Belief}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}

                <div className="pt-2 border-t border-[#DCE2EC] text-[11px] text-[#102342] font-medium">
                  &ldquo;References... that creates a lot of credibility.&rdquo; (V1, 13:54)
                </div>
              </div>
            </div>
          </div>

          {submitted2A && (
            <div className="bg-[#FBF4E2]/65 border border-[#D9A21B]/50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-[#102342]">
                  V1&apos;s own caution on compliance badges:
                </p>
                <p className="text-sm font-medium text-[#111D33]">
                  &ldquo;Checking mark and actual working... are two different things.&rdquo; (V1, 16:41)
                </p>
              </div>
              <InsightBadge badge="Said directly" />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#DCE2EC]">
            <div className="text-xs text-[#4E5D78]">
              Evidence items: <strong className="font-mono-data text-[#102342]">{selectedEvidenceCount}/5</strong> · Social signals:{' '}
              <strong className="font-mono-data text-[#102342]">{selectedSocialCount}/2</strong>
            </div>
            {!submitted2A ? (
              <button
                type="button"
                onClick={handleConfirm2A}
                className="px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
              >
                Present Trust Pack to C1
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSubStep('2b')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
              >
                <span>Next: 2B · The Refinery Reveal</span>
                <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2B: THE REFINERY REVEAL */}
      {subStep === '2b' && (
        <div className="grand-card rounded-xl p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-[#102342]">
                  2B. The Refinery Reveal: Education vs. Reassurance
                </h2>
                <InsightBadge badge="Said directly" />
              </div>
              <p className="text-sm text-[#4E5D78]">
                A security audit at an oil refinery uncovered a stark gap between classification and actual protection (V1&apos;s recollection — self-reported, unverified).
              </p>
            </div>
          </div>

          {/* Visual Funnel */}
          <div className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#4E5D78]">
              <span className="font-semibold text-[#102342]">
                Oil Refinery Data Exposure Funnel
              </span>
              <span>V1&apos;s recollection (unverified)</span>
            </div>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#111D33]">
                    1. Data classified across the enterprise
                  </span>
                  <span className="font-mono-data font-bold text-[#102342]">
                    ~99%
                  </span>
                </div>
                <div className="h-6 bg-white border border-[#DCE2EC] rounded-md overflow-hidden">
                  <div
                    className="h-full bg-[#102342] transition-all duration-500"
                    style={{ width: '99%' }}
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#111D33]">
                    2. Share of sensitive data actually protected
                  </span>
                  <span className="font-mono-data font-bold text-amber-700">
                    Only 8%
                  </span>
                </div>
                <div className="h-6 bg-white border border-[#DCE2EC] rounded-md overflow-hidden">
                  <div
                    className="h-full bg-[#D9A21B] transition-all duration-500"
                    style={{ width: '8%' }}
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#111D33]">
                    3. Share of that unprotected portion leaving the perimeter
                  </span>
                  <span className="font-mono-data font-bold text-rose-700">
                    ~40% leaving
                  </span>
                </div>
                <div className="h-6 bg-white border border-[#DCE2EC] rounded-md overflow-hidden">
                  <div
                    className="h-full bg-rose-600 transition-all duration-500"
                    style={{ width: '40%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pitch Choice */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-[#102342]">
              How do you pitch C1 in the boardroom?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handlePitchChoice('reassure')}
                className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                  pitchChoice === 'reassure'
                    ? 'border-rose-400 bg-rose-50'
                    : 'border-[#DCE2EC] bg-white hover:border-[#102342]'
                }`}
              >
                <div className="text-sm font-bold text-[#111D33]">
                  &ldquo;We are secure&rdquo;
                </div>
                <div className="text-xs text-[#4E5D78] mt-1">
                  Reassurance pitch — emphasize compliance badges and promise zero risk.
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePitchChoice('educate')}
                className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                  pitchChoice === 'educate'
                    ? 'border-emerald-400 bg-emerald-50'
                    : 'border-[#DCE2EC] bg-white hover:border-[#102342]'
                }`}
              >
                <div className="text-sm font-bold text-[#111D33]">
                  &ldquo;Here is what is still at risk&rdquo;
                </div>
                <div className="text-xs text-[#4E5D78] mt-1">
                  Education pitch — show where unprotected files are still leaving and how to fix each gap.
                </div>
              </button>
            </div>

            {pitchChoice && (
              <div className="bg-[#FBF4E2]/60 border border-[#D9A21B]/50 rounded-lg p-4 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#102342]">
                    C1&apos;s verdict on your pitch
                  </span>
                  <InsightBadge badge="Said directly" />
                </div>
                <p className="text-sm font-medium text-[#111D33]">
                  &ldquo;I would consider education more valuable than reassurance.&rdquo; (C1, 24:24)
                </p>
                <p className="text-xs text-[#4E5D78]">
                  {pitchChoice === 'educate'
                    ? 'Education raises Warranted Trust: C1 separates real threat intelligence from promotional content.'
                    : 'Plain reassurance loses trust: C1 notes that simply telling a customer a solution is secure does not build trust.'}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#DCE2EC]">
            <button
              type="button"
              onClick={() => setSubStep('2a')}
              className="text-xs font-medium text-[#4E5D78] hover:text-[#102342] cursor-pointer"
            >
              ← Back to 2A
            </button>
            <button
              type="button"
              onClick={() => setSubStep('2c')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Next: 2C · Contracts vs. Relationship vs. Verification</span>
              <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* 2C: THREE-LEGGED STOOL + VISIBILITY PARADOX */}
      {subStep === '2c' && (
        <div className="grand-card rounded-xl p-5 sm:p-7 space-y-6">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg font-bold text-[#102342]">
                2C. The Three-Legged Stool &amp; Visibility Paradox
              </h2>
              <InsightBadge badge="Said directly" />
            </div>
            <p className="text-sm text-[#4E5D78]">
              Traditional theory pairs contracts with relationships. C1 adds a third leg: his own checks. Lock all three legs to stabilize trust.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Three-Legged Stool Graphic */}
            <div className="lg:col-span-5 bg-[#F8F6F0] border border-[#DCE2EC] rounded-xl p-5 flex flex-col items-center justify-center space-y-3">
              <svg
                viewBox="0 0 260 190"
                className="w-full max-w-[260px] h-auto"
                role="img"
                aria-label={`Three-legged trust stool: ${
                  allLegsFilled
                    ? 'All three legs active — stable'
                    : 'Incomplete legs — unstable'
                }`}
              >
                {/* Seat */}
                <g
                  className="transition-transform duration-300 origin-center"
                  style={{
                    transform: allLegsFilled
                      ? 'rotate(0deg)'
                      : stoolLegs.contracts && !stoolLegs.verification
                      ? 'rotate(5deg)'
                      : !stoolLegs.contracts && stoolLegs.verification
                      ? 'rotate(-5deg)'
                      : 'rotate(3deg)',
                  }}
                >
                  <rect
                    x="45"
                    y="35"
                    width="170"
                    height="22"
                    rx="6"
                    fill="#102342"
                  />
                  <text
                    x="130"
                    y="50"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="600"
                  >
                    WARRANTED TRUST
                  </text>

                  {/* Leg 1: Contracts */}
                  <line
                    x1="75"
                    y1="57"
                    x2="52"
                    y2="160"
                    stroke={stoolLegs.contracts ? '#102342' : '#CBD5E1'}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={stoolLegs.contracts ? 'none' : '6 6'}
                  />
                  {/* Leg 2: Relationship */}
                  <line
                    x1="130"
                    y1="57"
                    x2="130"
                    y2="165"
                    stroke={stoolLegs.relationship ? '#D9A21B' : '#CBD5E1'}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={stoolLegs.relationship ? 'none' : '6 6'}
                  />
                  {/* Leg 3: Verification */}
                  <line
                    x1="185"
                    y1="57"
                    x2="208"
                    y2="160"
                    stroke={stoolLegs.verification ? '#059669' : '#CBD5E1'}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={stoolLegs.verification ? 'none' : '6 6'}
                  />
                </g>
                {/* Floor line */}
                <line
                  x1="20"
                  y1="170"
                  x2="240"
                  y2="170"
                  stroke="#94A3B8"
                  strokeWidth="2"
                />
              </svg>
              <div className="text-xs font-semibold text-center text-[#102342]">
                {allLegsFilled
                  ? 'Stable — Contracts + Relationship + Client Verification'
                  : 'Fill all 3 legs on the right to balance the stool'}
              </div>
            </div>

            {/* 3 Leg Checklists */}
            <div className="lg:col-span-7 space-y-3">
              <button
                type="button"
                onClick={() => toggleLeg('contracts')}
                aria-pressed={stoolLegs.contracts}
                className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                  stoolLegs.contracts
                    ? 'border-[#102342] bg-[#102342]/5'
                    : 'border-[#DCE2EC] bg-white hover:border-[#102342]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#102342]">
                    Leg 1: Contracts (SLAs, audits, residency, liability)
                  </span>
                  <span className="font-mono-data text-xs font-semibold text-[#102342]">
                    {stoolLegs.contracts ? 'LOCKED' : 'ADD'}
                  </span>
                </div>
                <p className="text-xs text-[#4E5D78] mt-1">
                  &ldquo;I actually don&apos;t believe in contractual agreements alone.&rdquo; (C1, 8:00)
                </p>
              </button>

              <button
                type="button"
                onClick={() => toggleLeg('relationship')}
                aria-pressed={stoolLegs.relationship}
                className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                  stoolLegs.relationship
                    ? 'border-[#D9A21B] bg-[#FBF4E2]/55'
                    : 'border-[#DCE2EC] bg-white hover:border-[#D9A21B]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#102342]">
                    Leg 2: Relationship (Candour &amp; ongoing value)
                  </span>
                  <span className="font-mono-data text-xs font-semibold text-[#7D5700]">
                    {stoolLegs.relationship ? 'LOCKED' : 'ADD'}
                  </span>
                </div>
                <p className="text-xs text-[#4E5D78] mt-1">
                  &ldquo;Neither is sufficient... we&apos;ll have to do both.&rdquo; (V1, 4:57)
                </p>
              </button>

              <button
                type="button"
                onClick={() => toggleLeg('verification')}
                aria-pressed={stoolLegs.verification}
                className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                  stoolLegs.verification
                    ? 'border-emerald-600 bg-emerald-50'
                    : 'border-[#DCE2EC] bg-white hover:border-emerald-600/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-[#102342]">
                    Leg 3: Client&apos;s Own Verification (DLP, DRM, SIEM, dark-web checks)
                  </span>
                  <span className="font-mono-data text-xs font-semibold text-emerald-700">
                    {stoolLegs.verification ? 'LOCKED' : 'ADD'}
                  </span>
                </div>
                <p className="text-xs text-[#4E5D78] mt-1">
                  &ldquo;The risks also keep increasing. So is our task.&rdquo; (C1, 14:05)
                </p>
              </button>
            </div>
          </div>

          {/* Visibility Paradox Slider */}
          <div className="border border-[#DCE2EC] bg-[#F8F6F0] rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#102342]">
                  The Visibility Paradox Slider
                </h3>
                <p className="text-xs text-[#4E5D78]">
                  V1 shares certifications, audits, and open defects, but keeps deep architecture verbal because written detail &ldquo;would become a risk for us as well.&rdquo;
                </p>
              </div>
              <span className="font-mono-data text-xs font-semibold text-[#102342] shrink-0">
                Disclosure depth: {visibilityLevel}%
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={visibilityLevel}
              onChange={(e) => setVisibilityLevel(Number(e.target.value))}
              aria-label="Vendor technical visibility level"
              className="w-full trust-slider"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#DCE2EC] rounded-lg p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#4E5D78]">Client Trust / Clarity</span>
                  <span className="font-mono-data font-bold text-[#102342]">
                    {clientTrustFromVis}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#102342] transition-all duration-200"
                    style={{ width: `${clientTrustFromVis}%` }}
                  />
                </div>
              </div>

              <div className="bg-white border border-[#DCE2EC] rounded-lg p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-[#4E5D78]">Vendor Attack-Surface Risk</span>
                  <span
                    className={`font-mono-data font-bold ${
                      vendorRiskFromVis > 60 ? 'text-rose-700' : 'text-[#7D5700]'
                    }`}
                  >
                    {vendorRiskFromVis}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-200 ${
                      vendorRiskFromVis > 60 ? 'bg-rose-600' : 'bg-[#D9A21B]'
                    }`}
                    style={{ width: `${vendorRiskFromVis}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#DCE2EC]">
            <button
              type="button"
              onClick={() => setSubStep('2b')}
              className="text-xs font-medium text-[#4E5D78] hover:text-[#102342] cursor-pointer"
            >
              ← Back to 2B
            </button>
            <button
              type="button"
              onClick={() => setSubStep('2d')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Next: 2D · 2:00 a.m. Breach Simulator</span>
              <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* 2D: BREACH SIMULATOR */}
      {subStep === '2d' && (
        <div className="grand-card rounded-xl p-5 sm:p-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-[#102342]">
                  2D. Breach Simulator — 2:00 a.m. Incident
                </h2>
                <InsightBadge badge="Said directly" />
              </div>
              <p className="text-sm text-[#4E5D78]">
                An unauthorised access alert fires on a shared client data connector at 2:00 a.m. What is your first move?
              </p>
            </div>
            <ShieldAlert className="w-7 h-7 text-rose-600 shrink-0" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleBreachChoice('disclose')}
              className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                breachChoice === 'disclose'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-[#DCE2EC] bg-white hover:border-[#102342]'
              }`}
            >
              <div className="text-sm font-bold text-[#111D33]">
                Disclose immediately
              </div>
              <p className="text-xs text-[#4E5D78] mt-1">
                Alert C1 before anyone else, share confirmed scope, and commit to a root-cause timeline.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleBreachChoice('delay')}
              className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                breachChoice === 'delay'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-[#DCE2EC] bg-white hover:border-[#102342]'
              }`}
            >
              <div className="text-sm font-bold text-[#111D33]">
                Delay notification
              </div>
              <p className="text-xs text-[#4E5D78] mt-1">
                Wait several days to patch quietly before telling the client.
              </p>
            </button>

            <button
              type="button"
              onClick={() => handleBreachChoice('hide')}
              className={`p-4 rounded-xl border text-left transition-colors cursor-pointer ${
                breachChoice === 'hide'
                  ? 'border-rose-500 bg-rose-50'
                  : 'border-[#DCE2EC] bg-white hover:border-[#102342]'
              }`}
            >
              <div className="text-sm font-bold text-[#111D33]">
                Hide the incident
              </div>
              <p className="text-xs text-[#4E5D78] mt-1">
                Contain silently and hope C1 does not hear about it externally.
              </p>
            </button>
          </div>

          {breachChoice && (
            <div className="bg-[#FBF4E2]/65 border border-[#D9A21B]/50 rounded-lg p-4 space-y-1.5">
              <div className="text-xs font-semibold text-[#102342]">
                &ldquo;The vendor&apos;s response is more important than the incident itself.&rdquo; (C1, 16:57)
              </div>
              <p className="text-xs text-[#334155]">
                {breachChoice === 'disclose'
                  ? 'C1 wants to hear from the vendor first, instead of getting the news from a newspaper. Immediate candour keeps the relationship intact.'
                  : 'If C1 discovers you hid or delayed the news, the relationship ends immediately with a permanent blacklist.'}
              </p>
            </div>
          )}

          {/* Table 2.6 / 2.9: C1's Reaction by Root Cause */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#102342]">
                C1&apos;s Response by Root Cause (Report Table 2.9)
              </h3>
              <span className="text-[11px] text-[#4E5D78]">
                Large orgs admit more readily; startups are most tempted to bury breaches
              </span>
            </div>

            <div className="border border-[#DCE2EC] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#102342] text-white">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Root Cause Found</th>
                    <th className="py-2.5 px-4 font-semibold">C1&apos;s Reaction</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE2EC]">
                  {BREACH_ROOT_CAUSE_TABLE.map((row) => (
                    <tr key={row.cause} className="bg-white">
                      <td className="py-2.5 px-4 font-medium text-[#111D33]">
                        {row.cause}
                      </td>
                      <td className="py-2.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 font-semibold ${
                            row.outcomeTone === 'severe'
                              ? 'text-rose-700'
                              : row.outcomeTone === 'warn'
                              ? 'text-amber-800'
                              : 'text-emerald-800'
                          }`}
                        >
                          {row.outcomeTone === 'severe' ? (
                            <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : row.outcomeTone === 'good' ? (
                            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : null}
                          {row.c1Reaction}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#DCE2EC]">
            <button
              type="button"
              onClick={() => setSubStep('2c')}
              className="text-xs font-medium text-[#4E5D78] hover:text-[#102342] cursor-pointer"
            >
              ← Back to 2C
            </button>
            <button
              type="button"
              onClick={() => setSubStep('2e')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Next: 2E · Lock-In Note</span>
              <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* 2E: LOCK-IN NOTE */}
      {subStep === '2e' && (
        <div className="grand-card rounded-xl p-5 sm:p-7 space-y-6">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-bold text-[#102342]">
                  2E. Lock-In Note: Why Switching Slows Sales Before Signing
                </h2>
                <InsightBadge badge="Said directly" />
              </div>
              <p className="text-sm text-[#4E5D78]">
                &ldquo;Switching comes at a cost. It&apos;s never free.&rdquo; (C1, 32:59)
              </p>
            </div>
            <Lock className="w-6 h-6 text-[#102342] shrink-0" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                title: 'Data migration',
                desc: 'Moving historical logs, labels, and repositories safely.',
              },
              {
                title: 'Integration',
                desc: 'Re-wiring APIs, connectors, and identity workflows.',
              },
              {
                title: 'Retraining',
                desc: 'Re-onboarding admins and end users onto new controls.',
              },
              {
                title: 'SIEM / SOC rebuild',
                desc: 'Rebuilding SIEM/SOC detection rules and dashboards from scratch.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-lg p-4 space-y-1"
              >
                <h3 className="text-xs font-bold text-[#102342]">{item.title}</h3>
                <p className="text-xs text-[#4E5D78] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#FBF4E2]/55 border border-[#D9A21B]/50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-[#111D33] leading-relaxed">
              <strong>TCE Insight:</strong> High switching costs (asset specificity) keep clients in place—unless repeated breaches occur, when C1 leaves &ldquo;even if it comes at a heavier cost.&rdquo; Offering exit-assistance clauses up front actually speeds up signing.
            </p>
            {!acknowledgedLockIn && (
              <button
                type="button"
                onClick={() => {
                  setAcknowledgedLockIn(true);
                  onRecordDecision({
                    decisionId: 'act2-2e-lockin',
                    delta: 4,
                    evidenceIds: ['c1-switching'],
                    lensNotes: {
                      TOE: 'TOE: Rebuilding SIEM/SOC dashboards creates heavy organisational switching inertia.',
                      TAM: 'TAM: Retraining staff lowers perceived usefulness during any vendor transition.',
                      'Commitment-Trust': 'Exit-assistance clauses signal confidence and prevent coercive lock-in.',
                      TCE: 'Asset specificity raises ex-ante caution: buyers scrutinize deeply before committing.',
                    },
                  });
                }}
                className="px-3.5 py-2 rounded-lg bg-[#102342] text-white text-xs font-semibold hover:bg-[#122643] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Include Exit Clauses (+4 Trust)
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#DCE2EC]">
            <button
              type="button"
              onClick={() => setSubStep('2d')}
              className="text-xs font-medium text-[#4E5D78] hover:text-[#102342] cursor-pointer"
            >
              ← Back to 2D
            </button>
            <button
              type="button"
              onClick={() => {
                onRecordDecision({
                  decisionId: 'act2-complete',
                  delta: 0,
                  evidenceIds: ['c1-switching', 'c1-response'],
                  lensNotes: ACT2_DEFAULT_LENS,
                });
                onCompleteAct();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#102342] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Proceed to Act 3: Company A&apos;s Playbook</span>
              <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
