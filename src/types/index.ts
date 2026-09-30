// ============================================================
// CORE TYPES — HINDSIGHT PROPOSAL INTELLIGENCE
// ============================================================

export type RFPStatus = 'new' | 'analyzing' | 'analyzed' | 'in-progress' | 'proposal-ready' | 'submitted' | 'won' | 'lost' | 'no-decision';

export type OutcomeType = 'won' | 'lost' | 'no-decision' | 'WON' | 'LOST' | 'NO_DECISION' | 'NO DECISION';

export type ProposalSection =
  | 'executive-summary'
  | 'understanding'
  | 'solution'
  | 'implementation'
  | 'security'
  | 'timeline'
  | 'pricing'
  | 'roi'
  | 'risk-management'
  | 'conclusion';

export interface RFP {
  id: string;
  title: string;
  client: string;
  industry: string;
  status: RFPStatus;
  receivedDate: string;
  deadline: string;
  budget: string;
  requirements: string[];
  technicalRequirements: string[];
  evaluationCriteria: EvaluationCriterion[];
  timeline: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  assignee?: string;
  tags: string[];
}

export interface EvaluationCriterion {
  name: string;
  weight: number;
  description: string;
}

export interface HistoricalProposal {
  id: string;
  title?: string;
  rfpTitle: string;
  client: string;
  industry: string;
  value?: string;
  budget: string;
  dealValue?: number;
  submittedDate: string;
  outcomeDate: string;
  outcome: OutcomeType;
  requirements?: string[];
  primaryRequirements?: string[];
  strategy?: string;
  proposalApproach?: string;
  rootCause?: string;
  clientFeedback?: string;
  lessonLearned?: string;
  lessonsLearned: string[];
  memoryTags?: string[];
  tags: string[];
  documentReferences?: string[];
  keyFactors?: string[];
  failureReasons?: string[];
  successReasons?: string[];
  competitorInfo?: string;
  proposalStrength?: number;
  source?: 'historical' | 'retrospective';
  relevanceScore?: number;
}

export interface CanonicalDocument {
  id: string;
  name: string;
  type: 'RFP Specification' | 'Proposal Dossier' | 'Compliance Artifact' | 'Technical Architecture';
  sourceId: string;
  sourceTitle: string;
  client: string;
  uploadedDate: string;
  status: 'Ready' | 'Verified' | 'Awarded' | 'Archived';
  indexedInHindsight: boolean;
  fileSizeBytes?: number;
  fileSizeFormatted: string;
}

// Structured experience representation as stored in Hindsight memory (Section 5)
export interface MemoryExperience {
  memoryId: string;
  sourceProposalId?: string;
  sourceProposalTitle?: string;
  sourceProposal?: string;
  client?: string;
  industry: string;
  dealValue?: string;
  outcome: OutcomeType;
  context: string;
  requirements?: string[];
  failedApproaches?: string[];
  successfulApproaches?: string[];
  clientSignals?: string | string[];
  clientFeedback?: string;
  rootCause?: string;
  lesson: string;
  tags: string[];
  applicability?: string;
  retainedAt?: string;
  timestamp?: string;
  relevanceReasons?: string[];
  matchConfidence?: string;
}

// Semantic recall query sent to Hindsight (Section 7)
export interface HindsightRecallQuery {
  rfpId?: string;
  rfpTitle?: string;
  client?: string;
  industry: string;
  requirements: string[];
  context?: string;
  queryText?: string;
  text?: string;
  limit?: number;
}

// Recommendation derived from Hindsight recall (Section 9)
export interface GroundedRecommendation {
  id: string;
  recNumber: string;
  title: string;
  confidenceLabel?: string;
  basedOn: string[]; // e.g. ['#PROP-093', '#PROP-044']
  groundedInProposals?: string[]; // e.g. ['PROP-093', 'PROP-044']
  currentSignal?: string;
  observedPattern?: string;
  description?: string;
  specificRecommendation: string;
  targetSection: ProposalSection;
  snippetToInject: string;
}

// Result returned from Hindsight recall (Section 7 & 8)
export interface HindsightRecallResult {
  experiences: MemoryExperience[];
  recalledExperiences: MemoryExperience[];
  relevanceReasons: Record<string, string[]>;
  observedPattern: string;
  recommendations: GroundedRecommendation[];
  queryMetadata: {
    timestamp: string;
    matchedCount: number;
    totalCorpusSize: number;
    backendType: 'hindsight-engine' | 'hindsight-api-live' | 'live_hindsight_api' | 'local_hindsight_engine';
  };
}

// Event log for developer / inspection panel (Section 19)
export interface HindsightLogEvent {
  id: string;
  timestamp: string;
  operation: 'RETAIN' | 'RECALL' | 'USE' | 'LEARN';
  title: string;
  details: string;
  sourceId?: string;
  payload?: any;
}

export interface MemoryInsight {
  id: string;
  type: 'pattern' | 'risk' | 'opportunity' | 'learning';
  title: string;
  description: string;
  confidence: number; // 0-100
  sourceProposals: string[];
  discoveredDate: string;
  category: string;
}

export interface IntelligenceRecommendation {
  id: string;
  type: 'emphasize' | 'avoid' | 'consider' | 'risk';
  title: string;
  description: string;
  evidence: string[];
  confidence: number;
  relatedProposals: HistoricalProposal[];
}

export interface ProposalDraft {
  id: string;
  rfpId: string;
  sections: ProposalSectionContent[];
  version: number;
  createdDate: string;
  lastModified: string;
  status: 'draft' | 'review' | 'final';
}

export interface ProposalSectionContent {
  id: ProposalSection;
  title: string;
  content: string;
  aiGenerated: boolean;
  edited: boolean;
  evidenceUsed: string[];
  version: number;
}

export interface OutcomeRecord {
  rfpId: string;
  outcome: OutcomeType;
  reason: string;
  clientFeedback: string;
  competitorInfo: string;
  pricingFeedback: string;
  timelineFeedback: string;
  technicalFeedback: string;
  submittedDate: string;
}

export interface AnalysisStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'active' | 'complete';
  duration?: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface DashboardMetrics {
  activeRfps: number;
  proposalsSubmitted: number;
  winRate: number;
  avgRelevanceScore: number;
  memoriesStored: number;
  patternsIdentified: number;
}
