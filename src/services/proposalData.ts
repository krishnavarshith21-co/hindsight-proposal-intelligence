// ============================================================
// PROPOSAL DATA SERVICE & PROVENANCE LAYER
// Re-exports canonical datasets and provides deterministic aggregations.
// ============================================================

import type { HistoricalProposal, RFP } from '../types';
import {
  COMPANY_IDENTITY,
  syntheticCompany,
  canonicalHistoricalProposals,
  canonicalActiveRfps,
  canonicalProposalDraft,
  canonicalDocuments,
  canonicalUsers,
  defaultUser,
  canonicalSourcedInsights,
  proposalToMemoryExperience,
  initialHindsightCorpus,
  calculateHistoricalMetrics,
  calculatePipelineMetrics,
  parseRfpBudget,
} from '../data';

export {
  COMPANY_IDENTITY,
  syntheticCompany,
  canonicalHistoricalProposals,
  canonicalActiveRfps,
  canonicalProposalDraft,
  canonicalDocuments,
  canonicalUsers,
  defaultUser,
  canonicalSourcedInsights,
  proposalToMemoryExperience,
  initialHindsightCorpus,
  calculateHistoricalMetrics,
  calculatePipelineMetrics,
  parseRfpBudget,
};

// Backwards-compatible alias for insights
export const canonicalMemoryInsights = canonicalSourcedInsights.map(item => ({
  id: item.id,
  type: 'pattern' as const,
  title: item.insight,
  description: item.derivedObservation,
  category: item.category,
  sourceProposals: item.sourceProposals,
  evidenceSummary: item.evidenceSummary,
  supportedCount: item.sourceProposals.length,
}));

// Backwards-compatible notifications with factual references
export const canonicalNotifications = [
  {
    id: 'notif-001',
    type: 'info' as const,
    title: 'RFP Received',
    message: 'Enterprise Analytics & Data Infrastructure tender from Pioneer Retail Holdings received',
    timestamp: '2026-09-25T14:30:00',
    read: false,
  },
  {
    id: 'notif-002',
    type: 'success' as const,
    title: 'Hindsight Precedents Recalled',
    message: 'Precedents #PROP-044, #PROP-021, and #PROP-014 retrieved for Northstar Global Financial',
    timestamp: '2026-09-25T10:15:00',
    read: true,
  },
  {
    id: 'notif-003',
    type: 'warning' as const,
    title: 'Submission Target Scheduled',
    message: 'Enterprise Cloud Migration Platform deadline target: 2026-10-15',
    timestamp: '2026-09-28T09:00:00',
    read: false,
  },
];

// ============================================================
// CALCULATED REAL DATASET METRICS
// All metrics are deterministically derived from canonical records.
// ============================================================

export function calculateDatasetMetrics(historical: HistoricalProposal[] = canonicalHistoricalProposals, active: RFP[] = canonicalActiveRfps) {
  const historicalMetrics = calculateHistoricalMetrics(historical);
  const pipelineMetrics = calculatePipelineMetrics(active);

  return {
    totalSubmitted: historicalMetrics.total,
    totalHistoricalProposals: historicalMetrics.total,
    wonCount: historicalMetrics.wonCount,
    wonProposalsCount: historicalMetrics.wonCount,
    lostCount: historicalMetrics.lostCount,
    winRate: historicalMetrics.winRate, // Real calculated win rate: 70%
    totalWonValue: historicalMetrics.totalWonValue, // $19,700,000
    totalWonValueFormatted: historicalMetrics.totalWonValueFormatted, // "$19.7M"
    totalLostValueFormatted: historicalMetrics.totalLostValueFormatted, // "$7.4M"
    activePipelineVolume: pipelineMetrics.pipelineValue, // $9,600,000
    activePipelineVolumeFormatted: pipelineMetrics.pipelineValueFormatted, // "$9.6M"
    activePipelineValueFormatted: pipelineMetrics.pipelineValueFormatted, // "$9.6M"
    pipelineRangeFormatted: pipelineMetrics.pipelineRangeFormatted, // "$8.6M – $10.6M"
    pipelineCalculationMethod: pipelineMetrics.calculationMethod, // "Midpoint of active RFP budget ranges"
    activeRfpsCount: active.length,
    memoriesStored: historicalMetrics.total,
    initialMemories: 10,
    newRetainedExperiences: Math.max(0, historicalMetrics.total - 10),
    observedPatternsCount: canonicalSourcedInsights.length,
  };
}
