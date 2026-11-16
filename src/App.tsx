/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useMemo, useState } from 'react';
import { TopBar } from './components/TopBar';
import { EvidenceDrawer } from './components/EvidenceDrawer';
import { IntroView } from './components/IntroView';
import { Act1View } from './components/Act1View';
import { Act2View } from './components/Act2View';
import { Act3View } from './components/Act3View';
import { VerdictView } from './components/VerdictView';
import { TeamView } from './components/TeamView';
import {
  ACT1_DEFAULT_LENS,
  ACT2_DEFAULT_LENS,
  ACT3_DEFAULT_LENS,
} from './data/reportData';
import { LensNoteSet, ScreenId, TheoryLens } from './types/simulation';

const INITIAL_LENS_NOTES: LensNoteSet = {
  TOE: 'Technology, Organisation, and Environment factors determine whether an emerging tool earns firm-level adoption.',
  TAM: 'Perceived usefulness vs. ease of use shapes whether staff actually adopt—or silently bypass—new tools.',
  'Commitment-Trust':
    'Open communication, shared values, and absence of opportunism build durable B2B relationships.',
  TCE: 'Transaction Cost Economics explains how uncertainty drives contractual safeguards, monitoring costs, and lock-in fears.',
};

export default function App() {
  const [screen, setScreen] = useState<ScreenId>('intro');
  const [previousScreen, setPreviousScreen] = useState<ScreenId>('intro');
  const [lens, setLens] = useState<TheoryLens>('TOE');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // All state kept strictly in memory (no localStorage or sessionStorage)
  const [decisionDeltas, setDecisionDeltas] = useState<Record<string, number>>(
    {}
  );
  const [lastDelta, setLastDelta] = useState<number | null>(null);
  const [activeEvidenceIds, setActiveEvidenceIds] = useState<string[]>([
    'hallucination',
    'c1-evidence',
  ]);
  const [unlockedEvidenceIds, setUnlockedEvidenceIds] = useState<string[]>([]);
  const [lensNotes, setLensNotes] = useState<LensNoteSet>(INITIAL_LENS_NOTES);

  const trustScore = useMemo(() => {
    const totalDelta = Object.values(decisionDeltas).reduce(
      (sum, val) => sum + val,
      0
    );
    return Math.max(0, Math.min(100, 50 + totalDelta));
  }, [decisionDeltas]);

  const handleNavigate = (target: ScreenId) => {
    if (target === 'team' && screen !== 'team') {
      setPreviousScreen(screen);
    }
    setScreen(target);
    if (target === 'act1') {
      setLensNotes(ACT1_DEFAULT_LENS);
    } else if (target === 'act2') {
      setLensNotes(ACT2_DEFAULT_LENS);
    } else if (target === 'act3') {
      setLensNotes(ACT3_DEFAULT_LENS);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRecordDecision = ({
    decisionId,
    delta,
    evidenceIds,
    lensNotes: nextLensNotes,
  }: {
    decisionId: string;
    delta: number;
    evidenceIds: string[];
    lensNotes: LensNoteSet;
  }) => {
    setDecisionDeltas((prev) => ({ ...prev, [decisionId]: delta }));
    setLastDelta(delta);
    setActiveEvidenceIds(evidenceIds);
    setUnlockedEvidenceIds((prev) => {
      const merged = [...prev];
      evidenceIds.forEach((id) => {
        if (!merged.includes(id)) merged.push(id);
      });
      return merged;
    });
    setLensNotes(nextLensNotes);
  };

  const handleRestart = () => {
    setDecisionDeltas({});
    setLastDelta(null);
    setActiveEvidenceIds(['hallucination', 'c1-evidence']);
    setUnlockedEvidenceIds([]);
    setLensNotes(INITIAL_LENS_NOTES);
    setScreen('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#111C30]">
      <TopBar
        screen={screen}
        onNavigate={handleNavigate}
        trustScore={trustScore}
        lastDelta={lastDelta}
        lens={lens}
        onChangeLens={setLens}
        lensNote={lensNotes[lens]}
        evidenceCount={unlockedEvidenceIds.length}
        onOpenEvidence={() => setDrawerOpen(true)}
      />

      <main className="flex-1">
        {screen === 'intro' && (
          <IntroView
            onStart={() => handleNavigate('act1')}
            onOpenTeam={() => handleNavigate('team')}
          />
        )}
        {screen === 'act1' && (
          <Act1View
            onRecordDecision={handleRecordDecision}
            onCompleteAct={() => handleNavigate('act2')}
          />
        )}
        {screen === 'act2' && (
          <Act2View
            onRecordDecision={handleRecordDecision}
            onCompleteAct={() => handleNavigate('act3')}
          />
        )}
        {screen === 'act3' && (
          <Act3View
            onRecordDecision={handleRecordDecision}
            onCompleteAct={() => handleNavigate('verdict')}
          />
        )}
        {screen === 'verdict' && (
          <VerdictView
            trustScore={trustScore}
            onRestart={handleRestart}
            onOpenTeam={() => handleNavigate('team')}
          />
        )}
        {screen === 'team' && (
          <TeamView
            onBack={() =>
              handleNavigate(
                previousScreen === 'team' ? 'intro' : previousScreen
              )
            }
          />
        )}
      </main>

      <footer className="border-t border-[#DED8CA] bg-white mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#52607A]">
          <span>
            The Trust Desk · Group 1, Section B, DMS IIT Delhi (November 2026)
          </span>
          <div className="flex items-center gap-4">
            <a
              href="/trust-desk.html"
              className="hover:text-[#102342] hover:underline"
            >
              Basic HTML &amp; CSS Version
            </a>
            <button
              type="button"
              onClick={() => handleNavigate('team')}
              className="hover:text-[#102342] hover:underline cursor-pointer"
            >
              Team &amp; Protocol
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="hover:text-[#102342] hover:underline cursor-pointer"
            >
              Evidence &amp; Codebook
            </button>
          </div>
        </div>
      </footer>

      <EvidenceDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeEvidenceIds={activeEvidenceIds}
        unlockedEvidenceIds={unlockedEvidenceIds}
      />
    </div>
  );
}
