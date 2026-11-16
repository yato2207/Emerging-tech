import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  GripVertical,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import {
  ACT3_DEFAULT_LENS,
  COMPANY_B_WORRIES,
  DYADIC_GAP_MATRIX,
  PLAYBOOK_ROLES,
  PLAYBOOK_STAGES,
} from '../data/reportData';
import { LensNoteSet, StageId, WorryId } from '../types/simulation';
import { InsightBadge } from './InsightBadge';

interface Act3ViewProps {
  onRecordDecision: (params: {
    decisionId: string;
    delta: number;
    evidenceIds: string[];
    lensNotes: LensNoteSet;
  }) => void;
  onCompleteAct: () => void;
}

export const Act3View: React.FC<Act3ViewProps> = ({
  onRecordDecision,
  onCompleteAct,
}) => {
  const [rolePlacements, setRolePlacements] = useState<Record<string, StageId>>(
    {}
  );
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [draggedRoleId, setDraggedRoleId] = useState<string | null>(null);
  const [submittedPlaybook, setSubmittedPlaybook] = useState(false);

  const [sector, setSector] = useState<'government' | 'banks' | 'manufacturing'>(
    'banks'
  );
  const [revealedRows, setRevealedRows] = useState<string[]>([
    'Trust signals',
    "Prospects' main fear",
  ]);

  const unplacedRoles = PLAYBOOK_ROLES.filter((r) => !rolePlacements[r.id]);
  const allPlaced = unplacedRoles.length === 0;

  const placeRole = (roleId: string, stageId: StageId) => {
    if (submittedPlaybook) return;
    setRolePlacements((prev) => ({ ...prev, [roleId]: stageId }));
    setSelectedRoleId(null);
  };

  const removeRole = (roleId: string) => {
    if (submittedPlaybook) return;
    setRolePlacements((prev) => {
      const next = { ...prev };
      delete next[roleId];
      return next;
    });
    setSelectedRoleId(roleId);
  };

  // Worry coverage calculation based on placed roles
  const coveredWorries = new Set<WorryId>();
  PLAYBOOK_ROLES.forEach((r) => {
    if (rolePlacements[r.id]) {
      r.covers.forEach((w) => coveredWorries.add(w));
    }
  });

  const idealMatches = PLAYBOOK_ROLES.filter((r) => {
    const placed = rolePlacements[r.id];
    return placed && r.idealStages.includes(placed);
  }).length;

  const handleSubmitPlaybook = () => {
    setSubmittedPlaybook(true);
    const delta = idealMatches >= 4 ? 10 : idealMatches >= 2 ? 5 : 0;
    onRecordDecision({
      decisionId: 'act3-playbook',
      delta,
      evidenceIds: ['c1-evidence', 'v1-usability', 'v1-conservative'],
      lensNotes: ACT3_DEFAULT_LENS,
    });
  };

  const handleResetPlaybook = () => {
    setRolePlacements({});
    setSelectedRoleId(null);
    setSubmittedPlaybook(false);
  };

  const toggleMatrixRow = (rowName: string) => {
    setRevealedRows((prev) =>
      prev.includes(rowName)
        ? prev.filter((x) => x !== rowName)
        : [...prev, rowName]
    );
  };

  const sectorMessages: Record<
    'government' | 'banks' | 'manufacturing',
    { title: string; focus: string; detail: string }
  > = {
    government: {
      title: 'Government',
      focus: 'Compliance',
      detail:
        'Lead with formal compliance standards, auditability, and deployment sovereignty.',
    },
    banks: {
      title: 'Banks / BFSI',
      focus: 'Customer data & RBI rules',
      detail:
        'Lead with customer PII protection, data residency in India, and RBI FREE-AI / GDPR safeguards.',
    },
    manufacturing: {
      title: 'Manufacturing',
      focus: 'Intellectual Property (IP)',
      detail:
        'Lead with protection of designs, trade secrets, and partner-perimeter leakage controls.',
    },
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <div>
        <p className="text-xs font-medium text-[#4E5D78]">
          Act 3 · Strategic Synthesis (Company A → Company B)
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#102342] tracking-tight">
          Company A&apos;s Playbook
        </h1>
      </div>

      {/* Company B's 3 Worries Coverage Tracker */}
      <div className="bg-white border border-[#DCE2EC] rounded-xl p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-[#102342]">
            Company B&apos;s Three Worries — Live Coverage Tracker
          </h2>
          <InsightBadge badge="Inferred" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {COMPANY_B_WORRIES.map((w) => {
            const covered = coveredWorries.has(w.id);
            return (
              <div
                key={w.id}
                className={`rounded-lg border p-3.5 transition-colors ${
                  covered
                    ? 'border-emerald-300 bg-emerald-50/70'
                    : 'border-[#DCE2EC] bg-[#F8F6F0]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono-data text-[11px] font-semibold text-[#4E5D78]">
                    {w.code}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      covered ? 'text-emerald-800' : 'text-[#4E5D78]'
                    }`}
                  >
                    {covered ? '● Covered' : '○ Unaddressed'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#111D33]">{w.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Playbook Builder: 5 Roles across 4 Stages */}
      <div className="grand-card rounded-xl p-5 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1 max-w-2xl">
            <h2 className="font-display text-lg font-bold text-[#102342]">
              Place the Five Roles Across Four Lifecycle Stages
            </h2>
            <p className="text-sm text-[#4E5D78]">
              Drag each role card into a stage—or tap a role, then tap a stage column—to build Company A&apos;s trust architecture.
            </p>
          </div>
          {submittedPlaybook && (
            <div className="font-mono-data text-sm font-bold text-[#102342] shrink-0">
              {idealMatches}/5 playbook aligned
            </div>
          )}
        </div>

        {/* Role Tray */}
        <div className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-lg p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#4E5D78]">
            <span>
              {unplacedRoles.length > 0
                ? selectedRoleId
                  ? `Selected "${PLAYBOOK_ROLES.find((r) => r.id === selectedRoleId)?.label}" — tap any stage column below.`
                  : 'Marketing & trust roles (drag or tap to place):'
                : 'All 5 roles placed. Reveal the reference playbook moves.'}
            </span>
            {Object.keys(rolePlacements).length > 0 && (
              <button
                type="button"
                onClick={handleResetPlaybook}
                className="inline-flex items-center gap-1 text-xs font-medium text-[#102342] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                Reset
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 min-h-[38px]">
            {unplacedRoles.map((role) => {
              const isSelected = selectedRoleId === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  draggable={!submittedPlaybook}
                  onDragStart={() => setDraggedRoleId(role.id)}
                  onDragEnd={() => setDraggedRoleId(null)}
                  onClick={() =>
                    setSelectedRoleId(isSelected ? null : role.id)
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium border transition-all cursor-grab active:cursor-grabbing min-h-[40px] ${
                    isSelected
                      ? 'bg-[#102342] text-white border-[#102342] ring-2 ring-[#D9A21B]'
                      : 'bg-white text-[#111D33] border-[#DCE2EC] hover:border-[#102342]'
                  }`}
                >
                  <GripVertical className="w-3.5 h-3.5 opacity-50" aria-hidden="true" />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Stage Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PLAYBOOK_STAGES.map((stage) => {
            const placedHere = PLAYBOOK_ROLES.filter(
              (r) => rolePlacements[r.id] === stage.id
            );
            const recommendedHere = submittedPlaybook
              ? PLAYBOOK_ROLES.filter((r) => r.primaryStage === stage.id)
              : [];

            return (
              <div
                key={stage.id}
                onDragOver={(e) => {
                  if (!submittedPlaybook) e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (draggedRoleId) {
                    placeRole(draggedRoleId, stage.id);
                    setDraggedRoleId(null);
                  }
                }}
                onClick={() => {
                  if (selectedRoleId && !submittedPlaybook) {
                    placeRole(selectedRoleId, stage.id);
                  }
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && selectedRoleId && !submittedPlaybook) {
                    e.preventDefault();
                    placeRole(selectedRoleId, stage.id);
                  }
                }}
                aria-label={`Stage: ${stage.label} (${stage.subtitle})`}
                className={`rounded-xl border p-3.5 min-h-[170px] flex flex-col justify-between transition-colors ${
                  selectedRoleId && !submittedPlaybook
                    ? 'border-dashed border-[#D9A21B] bg-[#FBF4E2]/35 cursor-pointer hover:bg-[#FBF4E2]/65'
                    : 'border-[#DCE2EC] bg-[#F8F6F0]/55'
                }`}
              >
                <div>
                  <h3 className="font-display text-xs font-bold text-[#102342] uppercase tracking-wider">
                    {stage.label}
                  </h3>
                  <p className="text-[11px] text-[#4E5D78]">{stage.subtitle}</p>
                </div>

                <div className="space-y-1.5 my-3">
                  {placedHere.map((role) => {
                    const isIdeal =
                      submittedPlaybook && role.idealStages.includes(stage.id);
                    return (
                      <button
                        key={role.id}
                        type="button"
                        disabled={submittedPlaybook}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRole(role.id);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded text-xs font-medium border flex items-center justify-between gap-1 ${
                          submittedPlaybook
                            ? isIdeal
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : 'bg-amber-50 border-amber-300 text-amber-900'
                            : 'bg-white border-[#102342]/30 text-[#111D33] hover:border-rose-400 cursor-pointer'
                        }`}
                      >
                        <span>{role.label}</span>
                        {!submittedPlaybook && (
                          <span className="text-[#4E5D78] text-[10px]">×</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {submittedPlaybook && recommendedHere.length > 0 && (
                  <div className="pt-2 border-t border-[#DCE2EC] space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4E5D78]">
                      Reference moves:
                    </span>
                    {recommendedHere.map((r) => (
                      <div key={r.id} className="text-[11px] text-[#111D33]">
                        <strong className="text-[#102342]">{r.label}:</strong>{' '}
                        <span className="text-[#4E5D78]">{r.referenceMove}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Sector Tailoring Bar */}
        <div className="bg-[#F8F6F0] border border-[#DCE2EC] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#102342]">
              Sector Tailoring ({sectorMessages[sector].title}: {sectorMessages[sector].focus})
            </div>
            <p className="text-xs text-[#4E5D78]">
              {sectorMessages[sector].detail}
            </p>
          </div>
          <div className="inline-flex items-center p-1 bg-white border border-[#DCE2EC] rounded-lg shrink-0 self-start sm:self-auto">
            {(['government', 'banks', 'manufacturing'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSector(s)}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  sector === s
                    ? 'bg-[#102342] text-white'
                    : 'text-[#4E5D78] hover:text-[#111D33]'
                }`}
              >
                {s === 'government'
                  ? 'Government'
                  : s === 'banks'
                  ? 'Banks'
                  : 'Manufacturing'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {!submittedPlaybook ? (
            <button
              type="button"
              disabled={!allPlaced}
              onClick={handleSubmitPlaybook}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors min-h-[44px] ${
                allPlaced
                  ? 'bg-[#102342] text-white hover:bg-[#122643] cursor-pointer'
                  : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              Lock Playbook &amp; Reveal Reference Moves
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>
                Top three pre-signing priorities: free risk check, ready trust pack, and agreed breach playbook.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Dyadic Gap Matrix (Table 2.7 / 2.10) */}
      <div className="grand-card rounded-xl p-5 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-lg font-bold text-[#102342]">
              Dyadic Alignment &amp; Gap Matrix (Table 2.7)
            </h2>
            <p className="text-xs text-[#4E5D78]">
              Select any row to compare C1 (client) and V1 (vendor) views side by side.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              setRevealedRows(
                revealedRows.length === DYADIC_GAP_MATRIX.length
                  ? []
                  : DYADIC_GAP_MATRIX.map((r) => r.row)
              )
            }
            className="text-xs font-semibold text-[#102342] hover:underline self-start sm:self-auto cursor-pointer"
          >
            {revealedRows.length === DYADIC_GAP_MATRIX.length
              ? 'Collapse all rows'
              : 'Reveal all 9 rows'}
          </button>
        </div>

        <div className="divide-y divide-[#DCE2EC] border border-[#DCE2EC] rounded-xl overflow-hidden">
          {DYADIC_GAP_MATRIX.map((item) => {
            const isOpen = revealedRows.includes(item.row);
            const statusStyle =
              item.status === 'Aligned'
                ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                : item.status === 'Gap'
                ? 'text-rose-800 bg-rose-50 border-rose-200'
                : item.status === 'Possible gap' || item.status === 'Partly aligned'
                ? 'text-amber-800 bg-amber-50 border-amber-200'
                : 'text-slate-700 bg-slate-100 border-slate-300';

            return (
              <div key={item.row} className="bg-white">
                <button
                  type="button"
                  onClick={() => toggleMatrixRow(item.row)}
                  aria-expanded={isOpen}
                  className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-[#F8F6F0] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm font-semibold text-[#111D33]">
                      {item.row}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border whitespace-nowrap ${statusStyle}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#4E5D78] shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#4E5D78] shrink-0" aria-hidden="true" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 bg-[#F8F6F0]/75 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs border-t border-[#DCE2EC]/60">
                    <div className="bg-white border border-[#DCE2EC] rounded-lg p-3 space-y-1">
                      <div className="font-semibold text-[#102342]">Client (C1)</div>
                      <p className="text-[#334155]">{item.c1View}</p>
                    </div>
                    <div className="bg-white border border-[#DCE2EC] rounded-lg p-3 space-y-1">
                      <div className="font-semibold text-[#1B365D]">Vendor (V1)</div>
                      <p className="text-[#334155]">{item.v1View}</p>
                    </div>
                    <div className="bg-[#FBF4E2]/55 border border-[#D9A21B]/40 rounded-lg p-3 space-y-1">
                      <div className="font-semibold text-[#7D5700]">Playbook Takeaway</div>
                      <p className="text-[#111D33]">{item.implication}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            onRecordDecision({
              decisionId: 'act3-complete',
              delta: 0,
              evidenceIds: ['c1-evidence', 'c1-education', 'c1-response'],
              lensNotes: ACT3_DEFAULT_LENS,
            });
            onCompleteAct();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#1B365D] text-white text-sm font-semibold hover:bg-[#122643] transition-colors cursor-pointer min-h-[44px]"
        >
          <span>View Final Verdict</span>
          <ArrowRight className="w-4 h-4 text-[#D9A21B]" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};
