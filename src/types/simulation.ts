export type ScreenId = 'intro' | 'act1' | 'act2' | 'act3' | 'verdict' | 'team';

export type TheoryLens = 'TOE' | 'TAM' | 'Commitment-Trust' | 'TCE';

export type EvidenceBadge = 'Said directly' | 'Inferred' | 'Open';

export type QuadrantId =
  | 'keep-humans'
  | 'scale-gates'
  | 'pilot-care'
  | 'scale-now';

export type StageId = 'pre-sale' | 'contracting' | 'onboarding' | 'retention';

export type WorryId = 'a' | 'b' | 'c';

export interface EvidenceEntry {
  id: string;
  quote: string;
  speaker: 'CTO of an AI-native firm' | 'C1' | 'V1' | 'Research Synthesis';
  timestamp: string;
  code: string;
  badge: EvidenceBadge;
  context: string;
  momentTag: string;
}

export interface CodebookEntry {
  code: string;
  definition: string;
  caseNum: 1 | 2;
  framework: string;
}

export interface LensNoteSet {
  TOE: string;
  TAM: string;
  'Commitment-Trust': string;
  TCE: string;
}

export interface SimulationDecision {
  id: string;
  label: string;
  delta: number;
  evidenceIds: string[];
  lensNotes: LensNoteSet;
}
