import {
  CodebookEntry,
  EvidenceEntry,
  LensNoteSet,
  QuadrantId,
  StageId,
  WorryId,
} from '../types/simulation';

export const THEORY_LENSES: {
  id: 'TOE' | 'TAM' | 'Commitment-Trust' | 'TCE';
  label: string;
  shortDesc: string;
}[] = [
  {
    id: 'TOE',
    label: 'TOE',
    shortDesc: 'Technology (reliability) · Organisation (cost) · Environment (regulation & hype)',
  },
  {
    id: 'TAM',
    label: 'TAM',
    shortDesc: 'Perceived usefulness dominated; ease of use never surfaced for skilled tech users',
  },
  {
    id: 'Commitment-Trust',
    label: 'Commitment-Trust',
    shortDesc: 'Communication, shared values, and no opportunism build lasting B2B ties',
  },
  {
    id: 'TCE',
    label: 'TCE',
    shortDesc: 'Uncertainty, contractual safeguards, monitoring costs, and asset specificity (lock-in)',
  },
];

export const CODEBOOK: CodebookEntry[] = [
  { code: 'ROI-GATE', definition: 'Adoption depends on proven return', caseNum: 1, framework: 'TOE (organisation)' },
  { code: 'RELIABILITY', definition: 'Concern about wrong or made-up AI output', caseNum: 1, framework: 'TOE (technology)' },
  { code: 'REG-LIABILITY', definition: 'Fear of legal or regulatory blame', caseNum: 1, framework: 'TOE (environment)' },
  { code: 'PRODUCTIVITY', definition: 'Speed or output gains from AI', caseNum: 1, framework: 'TAM (perceived usefulness)' },
  { code: 'OFFLOADING', definition: 'Staff letting AI do their thinking', caseNum: 1, framework: 'TAM / organisation' },
  { code: 'HYPE', definition: 'Adoption driven by trend, not need', caseNum: 1, framework: 'TOE (environment)' },
  { code: 'CONTROL-LOSS', definition: 'Fear of losing control of shared data', caseNum: 2, framework: 'TCE (uncertainty)' },
  { code: 'CONTRACT', definition: 'SLAs, audits, residency, liability', caseNum: 2, framework: 'TCE (safeguards)' },
  { code: 'VERIFY', definition: "Client's own monitoring of the vendor", caseNum: 2, framework: 'TCE (monitoring cost)' },
  { code: 'SIGNAL', definition: 'Certifications, references, POCs, brand', caseNum: 2, framework: 'Commitment-Trust / TCE' },
  { code: 'EDUCATE', definition: 'Teaching the client about real risk', caseNum: 2, framework: 'Commitment-Trust (communication)' },
  { code: 'CANDOUR', definition: 'Open handling of breaches', caseNum: 2, framework: 'Commitment-Trust (no opportunism)' },
  { code: 'LOCK-IN', definition: 'Cost and effort to switch vendors', caseNum: 2, framework: 'TCE (asset specificity)' },
  { code: 'USABILITY', definition: 'Security rules that block work', caseNum: 2, framework: 'Internal resistance' },
];

export const EVIDENCE_ITEMS: Record<string, EvidenceEntry> = {
  'hallucination': {
    id: 'hallucination',
    quote: '"We can\'t bank on the hallucination of LLMs."',
    speaker: 'CTO of an AI-native firm',
    timestamp: '6:33',
    code: 'RELIABILITY',
    badge: 'Said directly',
    context: 'Explains why LLMs are used for analysis rather than core reasoning.',
    momentTag: 'Act 1A · Scale-or-Stop Board',
  },
  'offloading': {
    id: 'offloading',
    quote: '"You can\'t offload the thinking."',
    speaker: 'CTO of an AI-native firm',
    timestamp: '28:54',
    code: 'OFFLOADING',
    badge: 'Said directly',
    context: 'Warns about the trade-off between speed now and weaker human thinking later.',
    momentTag: 'Act 1A & 1B · Thinking & Productivity',
  },
  'productivity-31-32': {
    id: 'productivity-31-32',
    quote: '"Thirty-one, thirty-two percent improvement in the productivity."',
    speaker: 'CTO of an AI-native firm',
    timestamp: '28:54',
    code: 'PRODUCTIVITY',
    badge: 'Said directly',
    context: 'Self-reported gain in software development (measurement method not verified).',
    momentTag: 'Act 1A & 1B · Coding Gains',
  },
  'cost-based': {
    id: 'cost-based',
    quote: '"Adopting LLM is more of a cost-based decision."',
    speaker: 'CTO of an AI-native firm',
    timestamp: '19:12',
    code: 'ROI-GATE',
    badge: 'Said directly',
    context: 'Two US ROI-linked contracts lost money; fine-tuning costs $6–10 million (self-reported).',
    momentTag: 'Act 1B · ROI Reality Check',
  },
  'bank-liable': {
    id: 'bank-liable',
    quote: '"The bank is liable."',
    speaker: 'CTO of an AI-native firm',
    timestamp: '19:12',
    code: 'REG-LIABILITY',
    badge: 'Said directly',
    context: 'Banks are "very scared" because liability sits with the bank, not the model vendor (stronger than RBI FREE-AI framing).',
    momentTag: 'Act 1C · Regulation',
  },
  'hype-instagram': {
    id: 'hype-instagram',
    quote: '"A typical Instagram type adoption."',
    speaker: 'CTO of an AI-native firm',
    timestamp: '32:05',
    code: 'HYPE',
    badge: 'Said directly',
    context: 'Describes trend-driven Indian LLM curiosity disconnected from verified ROI.',
    momentTag: 'Act 1 · Triggers',
  },
  'c1-evidence': {
    id: 'c1-evidence',
    quote: '"Ultimately, credibility comes from evidence."',
    speaker: 'C1',
    timestamp: '21:26',
    code: 'SIGNAL',
    badge: 'Said directly',
    context: 'C1 relies on ISO 27001, SOC 2 Type II, audit reports, a 5–6 year track record, and POCs to justify choices to auditors.',
    momentTag: 'Act 2A · Trust Pack',
  },
  'v1-references': {
    id: 'v1-references',
    quote: '"References... that creates a lot of credibility."',
    speaker: 'V1',
    timestamp: '13:54',
    code: 'SIGNAL',
    badge: 'Said directly',
    context: 'V1 leans on client references, logos, and firm size/brand, especially in the Middle East.',
    momentTag: 'Act 2A · Trust Pack',
  },
  'v1-checkmark': {
    id: 'v1-checkmark',
    quote: '"Checking mark and actual working... are two different things."',
    speaker: 'V1',
    timestamp: '16:41',
    code: 'SIGNAL',
    badge: 'Said directly',
    context: 'Warns that compliance tick-boxes alone do not prove operational protection.',
    momentTag: 'Act 2A · Trust Signals Gap',
  },
  'c1-education': {
    id: 'c1-education',
    quote: '"I would consider education more valuable than reassurance."',
    speaker: 'C1',
    timestamp: '24:24',
    code: 'EDUCATE',
    badge: 'Said directly',
    context: 'C1 separates real threat intelligence from promotional reassurance.',
    momentTag: 'Act 2B · The Refinery Reveal',
  },
  'c1-contracts': {
    id: 'c1-contracts',
    quote: '"I actually don\'t believe in contractual agreements alone."',
    speaker: 'C1',
    timestamp: '8:00',
    code: 'CONTRACT',
    badge: 'Said directly',
    context: 'Contracts must be backed by technical controls and the client\'s own ongoing checks.',
    momentTag: 'Act 2C · Three-Legged Stool',
  },
  'v1-neither': {
    id: 'v1-neither',
    quote: '"Neither is sufficient... we\'ll have to do both."',
    speaker: 'V1',
    timestamp: '4:57',
    code: 'CONTRACT',
    badge: 'Said directly',
    context: 'Both contractual safeguards and relational value are required together.',
    momentTag: 'Act 2C · Three-Legged Stool',
  },
  'c1-verify': {
    id: 'c1-verify',
    quote: '"The risks also keep increasing. So is our task."',
    speaker: 'C1',
    timestamp: '14:05',
    code: 'VERIFY',
    badge: 'Said directly',
    context: 'C1 runs dashboards, DLP, DRM, and dark-web monitoring; visibility creates ongoing work.',
    momentTag: 'Act 2C · Verification & Paradox',
  },
  'c1-response': {
    id: 'c1-response',
    quote: '"The vendor\'s response is more important than the incident itself."',
    speaker: 'C1',
    timestamp: '16:57',
    code: 'CANDOUR',
    badge: 'Said directly',
    context: 'Root-cause analysis and first-hand disclosure determine whether C1 stays or blacklists.',
    momentTag: 'Act 2D · Breach Simulator',
  },
  'v1-conservative': {
    id: 'v1-conservative',
    quote: '"It is really, really important to be conservative with the clients."',
    speaker: 'V1',
    timestamp: '27:50',
    code: 'CANDOUR',
    badge: 'Said directly',
    context: 'Show clients both the risk removed and the risk that remains.',
    momentTag: 'Act 2D & 3 · Conservative Candour',
  },
  'c1-switching': {
    id: 'c1-switching',
    quote: '"Switching comes at a cost. It\'s never free."',
    speaker: 'C1',
    timestamp: '32:59',
    code: 'LOCK-IN',
    badge: 'Said directly',
    context: 'Switching entails data migration, integration, retraining, and rebuilding SIEM/SOC rules and dashboards.',
    momentTag: 'Act 2E · Lock-In',
  },
  'v1-usability': {
    id: 'v1-usability',
    quote: '"Users will start downgrading the sensitivity labels."',
    speaker: 'V1',
    timestamp: '31:32',
    code: 'USABILITY',
    badge: 'Said directly',
    context: 'Overly rigid blocking rules push employees to bypass controls so work does not stop.',
    momentTag: 'Act 3 · Enabler Role',
  },
};

export const ACT1_DEFAULT_LENS: LensNoteSet = {
  TOE: 'Technology (hallucination/reliability), Organisation (token & rebuild cost), and Environment (RBI liability & hype) govern firm-level adoption.',
  TAM: 'Perceived usefulness drove every adoption choice for the CTO; perceived ease of use never surfaced for skilled engineers.',
  'Commitment-Trust': 'Vendor hype ("Instagram type adoption") erodes buyer trust when ROI-linked commitments fail to materialize.',
  TCE: 'Writing off $6–10M fine-tuning or rewriting core systems creates high asset specificity and exit friction.',
};

export const ACT2_DEFAULT_LENS: LensNoteSet = {
  TOE: 'Organisational readiness inside Company B (label-downgrading inertia) determines whether vendor technology actually works.',
  TAM: 'Security tools that block workflows fail usability in practice even when perceived usefulness to the CISO is high.',
  'Commitment-Trust': 'Open incident communication, client education, and shared risk transparency prevent opportunistic breakdown.',
  TCE: 'Data-sharing uncertainty demands contractual safeguards (SLAs, residency), costly client monitoring, and attention to lock-in.',
};

export const ACT3_DEFAULT_LENS: LensNoteSet = {
  TOE: 'Sector environments (RBI for banks, IP for manufacturing, compliance for government) dictate how Company A frames value.',
  TAM: 'Role-based onboarding ("enforce, enable, govern") preserves perceived usefulness without hurting day-to-day usability.',
  'Commitment-Trust': 'Educator, Transparent communicator, and Honest adviser build long-term relational commitment before and after signing.',
  TCE: 'Evidence provider and Co-governor lower pre-sale uncertainty, codify safeguards, and reduce lock-in fear with exit clauses.',
};

export interface QuadrantMeta {
  id: QuadrantId;
  title: string;
  subtitle: string;
  xLabel: string;
  yLabel: string;
}

export const QUADRANTS: QuadrantMeta[] = [
  {
    id: 'keep-humans',
    title: 'KEEP HUMANS IN CHARGE',
    subtitle: 'Hard to verify · High cost if wrong',
    xLabel: 'Hard to verify',
    yLabel: 'High cost',
  },
  {
    id: 'scale-gates',
    title: 'SCALE BEHIND REVIEW GATES',
    subtitle: 'Easy to verify · High cost if wrong',
    xLabel: 'Easy to verify',
    yLabel: 'High cost',
  },
  {
    id: 'pilot-care',
    title: 'PILOT WITH CARE',
    subtitle: 'Hard to verify · Low cost if wrong',
    xLabel: 'Hard to verify',
    yLabel: 'Low cost',
  },
  {
    id: 'scale-now',
    title: 'SCALE NOW',
    subtitle: 'Easy to verify · Low cost if wrong',
    xLabel: 'Easy to verify',
    yLabel: 'Low cost',
  },
];

export interface UseCaseChip {
  id: string;
  label: string;
  isBonus?: boolean;
  recommendedQuadrants: QuadrantId[];
  bestQuadrant: QuadrantId;
  badge: 'Said directly' | 'Inferred';
  ctoStance: string;
  detail: string;
}

export const USE_CASE_CHIPS: UseCaseChip[] = [
  {
    id: 'software-dev',
    label: 'Software development',
    recommendedQuadrants: ['scale-now'],
    bestQuadrant: 'scale-now',
    badge: 'Said directly',
    ctoStance: 'Scale now',
    detail: '31–32% self-reported productivity gain; output is testable via builds and code reviews.',
  },
  {
    id: 'marketing',
    label: 'Marketing outreach',
    recommendedQuadrants: ['scale-now'],
    bestQuadrant: 'scale-now',
    badge: 'Said directly',
    ctoStance: 'Scale now',
    detail: '"Doing exceptionally well" — little downside when a single post misses the mark.',
  },
  {
    id: 'sales',
    label: 'Sales',
    recommendedQuadrants: ['scale-gates', 'pilot-care'],
    bestQuadrant: 'scale-gates',
    badge: 'Said directly',
    ctoStance: '"I will have to think twice"',
    detail: 'Errors reach customers directly, requiring review gates or cautious piloting.',
  },
  {
    id: 'core-decisions',
    label: 'Core business decisions',
    recommendedQuadrants: ['keep-humans'],
    bestQuadrant: 'keep-humans',
    badge: 'Said directly',
    ctoStance: 'Keep humans in charge',
    detail: 'Hallucinations "could kill my revenue"; LLMs support ~10% analysis, not core reasoning.',
  },
  {
    id: 'chatbot',
    label: 'Customer-facing chatbot',
    isBonus: true,
    recommendedQuadrants: ['pilot-care', 'keep-humans', 'scale-gates'],
    bestQuadrant: 'pilot-care',
    badge: 'Inferred',
    ctoStance: 'Bonus item (not discussed by CTO)',
    detail: 'Inferred: Unchecked external replies risk brand and regulatory liability; do not jump straight to scale.',
  },
];

export interface TrustPackItem {
  id: string;
  label: string;
  category: 'evidence' | 'social';
  c1Reaction: string;
  c1Weight: 'High' | 'Some' | 'Low';
  v1Belief: string;
  v1Weight: 'High' | 'Medium';
}

export const TRUST_PACK_ITEMS: TrustPackItem[] = [
  {
    id: 'iso27001',
    label: 'ISO/IEC 27001',
    category: 'evidence',
    c1Reaction: 'Essential baseline; helps C1 justify the vendor to internal auditors.',
    c1Weight: 'High',
    v1Belief: 'Shared with CISOs during security review.',
    v1Weight: 'Medium',
  },
  {
    id: 'soc2',
    label: 'SOC 2 Type II',
    category: 'evidence',
    c1Reaction: 'High weight — demonstrates operating controls over time, not just policy.',
    c1Weight: 'High',
    v1Belief: 'Mentioned in CISO compliance packs.',
    v1Weight: 'Medium',
  },
  {
    id: 'audit-pentest',
    label: 'Audit & pen-test summaries',
    category: 'evidence',
    c1Reaction: 'High weight — C1 verifies actual vulnerabilities and remediation posture.',
    c1Weight: 'High',
    v1Belief: 'Shared selectively alongside open defect briefings.',
    v1Weight: 'Medium',
  },
  {
    id: 'poc',
    label: 'Proof of Concept (POC)',
    category: 'evidence',
    c1Reaction: 'High weight — proves the tool works in C1\'s real environment ("credibility comes from evidence").',
    c1Weight: 'High',
    v1Belief: 'High value — demos and POCs drive pre-signing confidence.',
    v1Weight: 'High',
  },
  {
    id: 'references',
    label: 'References & client logos',
    category: 'social',
    c1Reaction: 'Secondary ("Some") — helpful context, but cannot replace audit proof.',
    c1Weight: 'Some',
    v1Belief: 'V1 leans heavily here: "references... that creates a lot of credibility."',
    v1Weight: 'High',
  },
  {
    id: 'firm-size',
    label: 'Firm size & brand',
    category: 'social',
    c1Reaction: 'Not stressed — big brands still suffer breaches; size is not verification.',
    c1Weight: 'Low',
    v1Belief: 'Stressed strongly by V1, especially in Middle East enterprise deals.',
    v1Weight: 'High',
  },
  {
    id: 'roadmap-candour',
    label: 'Roadmap candour note ("what we will and will not build, with reasons")',
    category: 'evidence',
    c1Reaction: 'Builds genuine confidence and guards against overpromising.',
    c1Weight: 'High',
    v1Belief: 'Conservative honesty prevents post-sale disappointment.',
    v1Weight: 'Medium',
  },
];

export interface BreachRootCauseRow {
  cause: string;
  c1Reaction: string;
  outcomeTone: 'severe' | 'warn' | 'good';
}

export const BREACH_ROOT_CAUSE_TABLE: BreachRootCauseRow[] = [
  {
    cause: 'Vendor hid or delayed the news',
    c1Reaction: 'Blacklist the vendor',
    outcomeTone: 'severe',
  },
  {
    cause: 'Vendor came forward but was careless',
    c1Reaction: 'End contract, no blacklist',
    outcomeTone: 'warn',
  },
  {
    cause: 'New, hard-to-stop attack (e.g., WannaCry)',
    c1Reaction: 'Stay; "we definitely give them a cover"',
    outcomeTone: 'good',
  },
  {
    cause: 'First breach, handled well',
    c1Reaction: '"a second chance"',
    outcomeTone: 'good',
  },
];

export interface PlaybookRole {
  id: string;
  label: string;
  idealStages: StageId[];
  primaryStage: StageId;
  covers: WorryId[];
  referenceMove: string;
}

export const PLAYBOOK_ROLES: PlaybookRole[] = [
  {
    id: 'educator',
    label: 'Educator',
    idealStages: ['pre-sale'],
    primaryStage: 'pre-sale',
    covers: ['b', 'c'],
    referenceMove: 'Run a risk check on the client\'s own data (show sensitive data at risk + fixes).',
  },
  {
    id: 'evidence-provider',
    label: 'Evidence provider',
    idealStages: ['pre-sale'],
    primaryStage: 'pre-sale',
    covers: ['a', 'c'],
    referenceMove: 'Deliver the ready trust pack (ISO 27001 / SOC 2 Type II, audit & pen-test summaries) and POC as standard.',
  },
  {
    id: 'transparent-communicator',
    label: 'Transparent communicator',
    idealStages: ['retention', 'pre-sale'],
    primaryStage: 'retention',
    covers: ['c'],
    referenceMove: 'Pre-sale roadmap candour plus an agreed breach playbook with a joint incident drill.',
  },
  {
    id: 'co-governor',
    label: 'Co-governor',
    idealStages: ['contracting'],
    primaryStage: 'contracting',
    covers: ['a', 'b'],
    referenceMove: 'Codify SLAs, breach-notice timelines, audit rights, data-residency terms, and exit-assistance clauses.',
  },
  {
    id: 'enabler',
    label: 'Enabler',
    idealStages: ['onboarding'],
    primaryStage: 'onboarding',
    covers: ['b'],
    referenceMove: 'Deliver role-based training and "enforce, enable, govern" so users do not downgrade labels.',
  },
];

export const PLAYBOOK_STAGES: { id: StageId; label: string; subtitle: string }[] = [
  { id: 'pre-sale', label: 'Pre-sale', subtitle: 'Before signing' },
  { id: 'contracting', label: 'Contracting', subtitle: 'Safeguards & exit' },
  { id: 'onboarding', label: 'Onboarding', subtitle: 'Adoption & workflow' },
  { id: 'retention', label: 'Retention', subtitle: 'Drills & resilience' },
];

export const COMPANY_B_WORRIES: { id: WorryId; title: string; code: string }[] = [
  { id: 'a', title: '(a) Safety vs. data managed by a third party', code: 'CONTROL-LOSS' },
  { id: 'b', title: '(b) Security adoption inertia', code: 'USABILITY / LOCK-IN' },
  { id: 'c', title: '(c) Privacy and trust', code: 'SIGNAL / CANDOUR' },
];

export const DYADIC_GAP_MATRIX: {
  row: string;
  status: 'Aligned' | 'Partly aligned' | 'Possible gap' | 'Gap' | 'Open';
  c1View: string;
  v1View: string;
  implication: string;
}[] = [
  {
    row: 'Biggest risk',
    status: 'Aligned',
    c1View: 'Loss of direct control once data is shared outside.',
    v1View: 'Most breaches happen at partner premises after data leaves the walls.',
    implication: 'Both sides prioritize controls that travel with the data.',
  },
  {
    row: 'Contracts vs trust',
    status: 'Aligned',
    c1View: 'Contracts + technical controls + own checks.',
    v1View: 'Contracts + relationship + delivering value.',
    implication: 'Contracts are the floor, never the ceiling.',
  },
  {
    row: 'Compliance in contract',
    status: 'Possible gap',
    c1View: 'Explicitly insists on SLAs, breach notice, audit rights, liability, and data residency.',
    v1View: 'Relies on standard SLAs, licence terms, and data-ownership clauses.',
    implication: 'Company A should proactively offer residency and audit rights rather than waiting for procurement pushback.',
  },
  {
    row: 'Visibility',
    status: 'Partly aligned',
    c1View: 'Wants full insight; runs own dashboards, DLP, DRM, and dark-web monitoring.',
    v1View: 'Shares certs, audits, and open defects, but keeps deep architecture verbal to limit attacker risk.',
    implication: 'Provide client-facing compliance telemetry while keeping sensitive blueprints in live briefings.',
  },
  {
    row: "Prospects' main fear",
    status: 'Gap',
    c1View: 'Loss of control and unauthorised access/leaks by vendor staff.',
    v1View: 'Assumes prospects mainly fear overpromising ("check mark" vs. actual working).',
    implication: 'Address staff-access safeguards and third-party data control directly in pre-sale.',
  },
  {
    row: 'Trust signals',
    status: 'Gap',
    c1View: 'Buys on certifications (ISO 27001, SOC 2 Type II), audit reports, and 5–6 year track record.',
    v1View: 'Sells heavily with client references, logos, and firm size/brand.',
    implication: 'Lead with a verifiable Trust Pack; treat logos as supporting context.',
  },
  {
    row: 'Education',
    status: 'Aligned',
    c1View: 'Prefers threat-landscape education over promotional reassurance.',
    v1View: 'Shows clients what is "still at risk" using their own data.',
    implication: 'Free pre-sale risk check on client data is the highest-leverage GTM wedge.',
  },
  {
    row: 'Incidents',
    status: 'Aligned',
    c1View: 'Candour decides the outcome; hiding leads to blacklisting.',
    v1View: 'Important to be conservative and transparent about remaining risk.',
    implication: 'Agree a formal breach playbook and run a joint drill up front.',
  },
  {
    row: 'Pre-sale training',
    status: 'Open',
    c1View: 'Not discussed directly.',
    v1View: 'None offered; training starts only after signing.',
    implication: 'Preview role-based enablement during POC to reduce inertia fears early.',
  },
];

export interface TeamMember {
  name: string;
  rollNo: string;
  initials: string;
  photo: string;
  contribution: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Prachi Ahuja',
    rollNo: '2026SMF6610',
    initials: 'PA',
    photo: '/assets/team/prachi.jpg',
    contribution: 'Case 1 & Case 2 Research Synthesis',
  },
  {
    name: 'Shubhada Sanjay Borade',
    rollNo: '2026SMF6620',
    initials: 'SB',
    photo: '/assets/team/shubhada.jpg',
    contribution: 'Thematic Coding & Theoretical Mapping',
  },
  {
    name: 'Shiva Srinivasa Rahul Bharadwaj Turlapati',
    rollNo: '2026SMF6719',
    initials: 'RT',
    photo: '/assets/team/rahul.jpg',
    contribution: 'Qualitative Analysis & Playbook Design',
  },
  {
    name: 'Ayush Aggarwal',
    rollNo: '2026SMF6700',
    initials: 'AA',
    photo: '/assets/team/ayush.jpg',
    contribution: 'Case Fieldwork & Dyadic Comparison',
  },
  {
    name: 'Deepanshu Rawal',
    rollNo: '2026SMT6669',
    initials: 'DR',
    photo: '/assets/team/deepanshu.jpg',
    contribution: 'Empirical Literature & Risk Review',
  },
  {
    name: 'Kriti Aggarwal',
    rollNo: '2026SMT6739',
    initials: 'KA',
    photo: '/assets/team/kriti.jpg',
    contribution: 'Interview Protocol & Transcript Coding',
  },
  {
    name: 'Mayank Manoj Bhoyar',
    rollNo: '2026SMT6662',
    initials: 'MB',
    photo: '/assets/team/mayank.jpg',
    contribution: 'Case Analysis & Recommendations',
  },
];

export const TEAM_PHOTO_PATH = '/assets/aistudio/WhatsApp_Image_2026-11-16_at_15.28.41_950db034.jpeg';
