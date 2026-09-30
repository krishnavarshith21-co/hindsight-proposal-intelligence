// ============================================================
// CANONICAL STRATEGIC INSIGHTS & DERIVED OBSERVATIONS
// Every insight is strictly grounded in canonical historical proposals.
// No fake confidence scores. No fabricated metrics.
// ============================================================

export interface SourcedInsight {
  id: string;
  category: string;
  insight: string;
  sourceProposals: string[]; // e.g. ['#PROP-044', '#PROP-052', '#PROP-093']
  derivedObservation: string;
  evidenceSummary: string;
}

export const canonicalSourcedInsights: SourcedInsight[] = [
  {
    id: 'insight-001',
    category: 'Timeline & Risk Governance',
    insight: 'Phased delivery and rollback checkpoints appear repeatedly in winning infrastructure bids.',
    sourceProposals: ['#PROP-044', '#PROP-052', '#PROP-093'],
    derivedObservation:
      'All three proposals were marked WON in regulated financial/insurance sectors and explicitly structured phased delivery with rollback gates.',
    evidenceSummary:
      'Supported by #PROP-044 ($4.1M), #PROP-052 ($3.4M), and #PROP-093 ($3.7M). Conversely, #PROP-014 ($2.8M) and #PROP-081 ($3.0M) lost due to compressed unbuffered timelines.',
  },
  {
    id: 'insight-002',
    category: 'Positioning & Compliance',
    insight: 'Early compliance and audit attestations preempt evaluator risk objections in healthcare.',
    sourceProposals: ['#PROP-021', '#PROP-104'],
    derivedObservation:
      'Both healthcare bids were marked WON. Evaluators explicitly praised front-loading HIPAA Type II and compliance evidence in initial sections.',
    evidenceSummary:
      'Supported by #PROP-021 (Harbor Health, $1.9M) and #PROP-104 (Cascade Healthcare, $2.2M). Evaluator feedback confirmed regulatory credentials built trust upfront.',
  },
  {
    id: 'insight-003',
    category: 'Commercial ROI Strategy',
    insight: 'Retail infrastructure tenders require operational freeze windows and direct business ROI.',
    sourceProposals: ['#PROP-061', '#PROP-112'],
    derivedObservation:
      'Retail proposal #PROP-061 was marked LOST because technical architecture lacked store-level ROI, whereas #PROP-112 was marked WON after incorporating operational peak trading freeze windows.',
    evidenceSummary:
      'Supported by #PROP-112 ($1.8M WON) vs #PROP-061 ($1.6M LOST). Directly demonstrates procurement sensitivity to retail peak trading disruption.',
  },
];
