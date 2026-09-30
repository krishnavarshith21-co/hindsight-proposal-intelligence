import type { HistoricalProposal, MemoryExperience } from '../types';

// ============================================================
// CANONICAL HISTORICAL PROPOSALS (Exactly 10 Coherent Records)
// All historical proposal facts in the application originate here.
// ============================================================

export const canonicalHistoricalProposals: HistoricalProposal[] = [
  {
    id: 'PROP-014',
    title: 'Cloud Infrastructure Modernization',
    rfpTitle: 'Cloud Infrastructure Modernization',
    client: 'Northstar Bank',
    industry: 'Banking',
    value: '$2.8M',
    budget: '$2.8M',
    dealValue: 2800000,
    submittedDate: '2026-03-15',
    outcomeDate: '2026-04-22',
    outcome: 'LOST',
    requirements: ['Cloud migration', 'Minimal downtime', 'Regulatory compliance', 'Disaster recovery'],
    primaryRequirements: ['Cloud migration', 'Minimal downtime', 'Regulatory compliance', 'Disaster recovery'],
    strategy: 'Single-phase migration with aggressive 12-month implementation timeline.',
    proposalApproach: 'Single-phase migration with aggressive 12-month implementation timeline.',
    rootCause: "Timeline was approximately 6 months shorter than the client's realistic migration window.",
    clientFeedback: 'The proposed timeline created unacceptable execution risk.',
    lessonLearned: 'Financial-services cloud migrations require conservative timelines, staged deployment and rollback checkpoints.',
    lessonsLearned: [
      'Financial-services cloud migrations require conservative timelines, staged deployment and rollback checkpoints.',
    ],
    memoryTags: ['banking', 'cloud migration', 'execution risk', 'timeline', 'rollback', 'compliance'],
    tags: ['banking', 'cloud migration', 'execution risk', 'timeline', 'rollback', 'compliance'],
    documentReferences: [
      'Synthetic RFP Specification — Cloud Infrastructure Modernization.pdf',
      'Cloud Infrastructure Modernization — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 58,
    source: 'historical',
  },
  {
    id: 'PROP-021',
    title: 'Enterprise Security Operations',
    rfpTitle: 'Enterprise Security Operations',
    client: 'Harbor Health Network',
    industry: 'Healthcare',
    value: '$1.9M',
    budget: '$1.9M',
    dealValue: 1900000,
    submittedDate: '2026-04-10',
    outcomeDate: '2026-05-18',
    outcome: 'WON',
    requirements: ['Security operations', 'Compliance', 'Auditability', 'Incident response'],
    primaryRequirements: ['Security operations', 'Compliance', 'Auditability', 'Incident response'],
    strategy: 'Compliance evidence presented early in executive summary before technical specifications.',
    proposalApproach: 'Compliance evidence presented early in executive summary before technical specifications.',
    rootCause: 'Early compliance proof and HIPAA Type II audit artifacts built decisive trust.',
    clientFeedback: 'Early compliance evidence increased evaluator confidence.',
    lessonLearned: 'In regulated industries, demonstrate compliance evidence early rather than burying it later in the proposal.',
    lessonsLearned: [
      'In regulated industries, demonstrate compliance evidence early rather than burying it later in the proposal.',
    ],
    memoryTags: ['healthcare', 'compliance', 'security', 'regulated industry', 'trust'],
    tags: ['healthcare', 'compliance', 'security', 'regulated industry', 'trust'],
    documentReferences: [
      'Synthetic RFP Specification — Enterprise Security Operations.pdf',
      'Enterprise Security Operations — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 92,
    source: 'historical',
  },
  {
    id: 'PROP-044',
    title: 'Data Center Consolidation',
    rfpTitle: 'Data Center Consolidation',
    client: 'Crestline Insurance Group',
    industry: 'Insurance',
    value: '$4.1M',
    budget: '$4.1M',
    dealValue: 4100000,
    submittedDate: '2026-05-08',
    outcomeDate: '2026-06-15',
    outcome: 'WON',
    requirements: ['Infrastructure migration', 'Minimal downtime', 'Rollback capability', 'Business continuity'],
    primaryRequirements: ['Infrastructure migration', 'Minimal downtime', 'Rollback capability', 'Business continuity'],
    strategy: 'Granular migration plan, automated rollback checkpoints, and phased production cutover.',
    proposalApproach: 'Granular migration plan, automated rollback checkpoints, and phased production cutover.',
    rootCause: 'Explicit rollback procedures and phased execution eliminated migration downtime anxiety.',
    clientFeedback: 'The rollback controls significantly reduced migration risk.',
    lessonLearned: 'Explicit rollback procedures can reduce perceived execution risk in enterprise infrastructure proposals.',
    lessonsLearned: [
      'Explicit rollback procedures can reduce perceived execution risk in enterprise infrastructure proposals.',
    ],
    memoryTags: ['insurance', 'migration', 'rollback', 'risk', 'phased deployment'],
    tags: ['insurance', 'migration', 'rollback', 'risk', 'phased deployment'],
    documentReferences: [
      'Synthetic RFP Specification — Data Center Consolidation.pdf',
      'Data Center Consolidation — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 95,
    source: 'historical',
  },
  {
    id: 'PROP-052',
    title: 'Cloud Migration Program',
    rfpTitle: 'Cloud Migration Program',
    client: 'Summit Federal Bank',
    industry: 'Banking',
    value: '$3.4M',
    budget: '$3.4M',
    dealValue: 3400000,
    submittedDate: '2026-06-02',
    outcomeDate: '2026-07-10',
    outcome: 'WON',
    requirements: ['Cloud migration', 'Compliance', 'Business continuity', 'Low downtime'],
    primaryRequirements: ['Cloud migration', 'Compliance', 'Business continuity', 'Low downtime'],
    strategy: 'Phased migration, early compliance evidence, and automated rollback gates.',
    proposalApproach: 'Phased migration, early compliance evidence, and automated rollback gates.',
    rootCause: 'Prudent staging and upfront regulatory artifacts satisfied the bank risk committee.',
    clientFeedback: 'The staged implementation gave the committee confidence.',
    lessonLearned: 'Banking buyers respond positively to phased migration and explicit risk controls.',
    lessonsLearned: [
      'Banking buyers respond positively to phased migration and explicit risk controls.',
    ],
    memoryTags: ['banking', 'cloud', 'phased migration', 'compliance', 'rollback'],
    tags: ['banking', 'cloud', 'phased migration', 'compliance', 'rollback'],
    documentReferences: [
      'Synthetic RFP Specification — Cloud Migration Program.pdf',
      'Cloud Migration Program — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 94,
    source: 'historical',
  },
  {
    id: 'PROP-061',
    title: 'Enterprise Data Platform',
    rfpTitle: 'Enterprise Data Platform',
    client: 'Pioneer Retail Holdings',
    industry: 'Retail',
    value: '$1.6M',
    budget: '$1.6M',
    dealValue: 1600000,
    submittedDate: '2026-06-25',
    outcomeDate: '2026-07-30',
    outcome: 'LOST',
    requirements: ['Data modernization', 'Analytics', 'Integration'],
    primaryRequirements: ['Data modernization', 'Analytics', 'Integration'],
    strategy: 'Heavy architectural focus on cloud data lake without linking to store-level ROI.',
    proposalApproach: 'Heavy architectural focus on cloud data lake without linking to store-level ROI.',
    rootCause: 'Proposal focused heavily on architecture but did not clearly connect the solution to business outcomes.',
    clientFeedback: 'The technical solution was strong, but the business value was unclear.',
    lessonLearned: 'Technical proposals should connect architecture decisions to measurable business outcomes.',
    lessonsLearned: [
      'Technical proposals should connect architecture decisions to measurable business outcomes.',
    ],
    memoryTags: ['retail', 'data platform', 'business value', 'technical proposal'],
    tags: ['retail', 'data platform', 'business value', 'technical proposal'],
    documentReferences: [
      'Synthetic RFP Specification — Enterprise Data Platform.pdf',
      'Enterprise Data Platform — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 62,
    source: 'historical',
  },
  {
    id: 'PROP-073',
    title: 'Cybersecurity Transformation',
    rfpTitle: 'Cybersecurity Transformation',
    client: 'Beacon Financial Services',
    industry: 'Financial Services',
    value: '$2.6M',
    budget: '$2.6M',
    dealValue: 2600000,
    submittedDate: '2026-07-12',
    outcomeDate: '2026-08-20',
    outcome: 'WON',
    requirements: ['Security', 'Compliance', 'Risk reduction', 'Incident response'],
    primaryRequirements: ['Security', 'Compliance', 'Risk reduction', 'Incident response'],
    strategy: 'Compliance evidence, risk mapping, and executive summary focused on business risk.',
    proposalApproach: 'Compliance evidence, risk mapping, and executive summary focused on business risk.',
    rootCause: 'Connecting technical controls directly to institutional business risk aligned with board expectations.',
    clientFeedback: 'The proposal clearly connected security controls to business risk.',
    lessonLearned: 'For regulated clients, connect technical controls directly to business risk.',
    lessonsLearned: [
      'For regulated clients, connect technical controls directly to business risk.',
    ],
    memoryTags: ['financial services', 'security', 'compliance', 'risk'],
    tags: ['financial services', 'security', 'compliance', 'risk'],
    documentReferences: [
      'Synthetic RFP Specification — Cybersecurity Transformation.pdf',
      'Cybersecurity Transformation — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 91,
    source: 'historical',
  },
  {
    id: 'PROP-081',
    title: 'Enterprise Cloud Migration',
    rfpTitle: 'Enterprise Cloud Migration',
    client: 'Vanguard Trust Bank',
    industry: 'Banking',
    value: '$3.0M',
    budget: '$3.0M',
    dealValue: 3000000,
    submittedDate: '2026-08-01',
    outcomeDate: '2026-09-02',
    outcome: 'LOST',
    requirements: ['Cloud migration', 'Minimal downtime', 'Regulatory compliance'],
    primaryRequirements: ['Cloud migration', 'Minimal downtime', 'Regulatory compliance'],
    strategy: 'Offered a compressed 9-month migration timeline to win on schedule speed.',
    proposalApproach: 'Offered a compressed 9-month migration timeline to win on schedule speed.',
    rootCause: 'Proposal offered a compressed migration timeline without sufficient rollback planning.',
    clientFeedback: 'The migration schedule was considered too aggressive.',
    lessonLearned: 'Avoid compressed timelines for high-risk regulated migrations.',
    lessonsLearned: [
      'Avoid compressed timelines for high-risk regulated migrations.',
    ],
    memoryTags: ['banking', 'cloud migration', 'timeline', 'rollback', 'risk'],
    tags: ['banking', 'cloud migration', 'timeline', 'rollback', 'risk'],
    documentReferences: [
      'Synthetic RFP Specification — Enterprise Cloud Migration (Vanguard).pdf',
      'Enterprise Cloud Migration — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 54,
    source: 'historical',
  },
  {
    id: 'PROP-093',
    title: 'Hybrid Cloud Modernization',
    rfpTitle: 'Hybrid Cloud Modernization',
    client: 'Horizon Asset Management',
    industry: 'Financial Services',
    value: '$3.7M',
    budget: '$3.7M',
    dealValue: 3700000,
    submittedDate: '2026-08-15',
    outcomeDate: '2026-09-22',
    outcome: 'WON',
    requirements: ['Hybrid cloud', 'Compliance', 'Migration', 'Business continuity'],
    primaryRequirements: ['Hybrid cloud', 'Compliance', 'Migration', 'Business continuity'],
    strategy: 'Phased migration, rollback checkpoints, and compliance evidence front-loaded in executive summary.',
    proposalApproach: 'Phased migration, rollback checkpoints, and compliance evidence front-loaded in executive summary.',
    rootCause: 'Combining phased delivery, rollback controls and front-loaded compliance proof satisfied all stakeholder criteria.',
    clientFeedback: 'The staged migration and compliance evidence addressed our primary concerns.',
    lessonLearned: 'Combining phased delivery, rollback controls and early compliance evidence is effective for regulated cloud migrations.',
    lessonsLearned: [
      'Combining phased delivery, rollback controls and early compliance evidence is effective for regulated cloud migrations.',
    ],
    memoryTags: ['financial services', 'hybrid cloud', 'migration', 'compliance', 'rollback', 'phased delivery'],
    tags: ['financial services', 'hybrid cloud', 'migration', 'compliance', 'rollback', 'phased delivery'],
    documentReferences: [
      'Synthetic RFP Specification — Hybrid Cloud Modernization.pdf',
      'Hybrid Cloud Modernization — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 96,
    source: 'historical',
  },
  {
    id: 'PROP-104',
    title: 'Clinical Data Infrastructure',
    rfpTitle: 'Clinical Data Infrastructure',
    client: 'Cascade Healthcare Alliance',
    industry: 'Healthcare',
    value: '$2.2M',
    budget: '$2.2M',
    dealValue: 2200000,
    submittedDate: '2026-08-28',
    outcomeDate: '2026-09-25',
    outcome: 'WON',
    requirements: ['HIPAA compliance', 'Clinical data lineage', 'Sub-second telemetry'],
    primaryRequirements: ['HIPAA compliance', 'Clinical data lineage', 'Sub-second telemetry'],
    strategy: 'Front-loaded HIPAA Type II controls and data lineage isolation in Section 2.',
    proposalApproach: 'Front-loaded HIPAA Type II controls and data lineage isolation in Section 2.',
    rootCause: 'Verified HIPAA data lineage controls removed executive committee hesitation.',
    clientFeedback: 'Data governance and lineage evidence in Section 2 removed executive review hesitation.',
    lessonLearned: 'Healthcare procurement prioritizes verified data governance and audit trails upfront.',
    lessonsLearned: [
      'Healthcare procurement prioritizes verified data governance and audit trails upfront.',
    ],
    memoryTags: ['healthcare', 'compliance', 'governance', 'auditability'],
    tags: ['healthcare', 'compliance', 'governance', 'auditability'],
    documentReferences: [
      'Synthetic RFP Specification — Clinical Data Infrastructure.pdf',
      'Clinical Data Infrastructure — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 93,
    source: 'historical',
  },
  {
    id: 'PROP-112',
    title: 'Omnichannel Commerce Modernization',
    rfpTitle: 'Omnichannel Commerce Modernization',
    client: 'Atlas Commercial Retail',
    industry: 'Retail',
    value: '$1.8M',
    budget: '$1.8M',
    dealValue: 1800000,
    submittedDate: '2026-09-02',
    outcomeDate: '2026-09-26',
    outcome: 'WON',
    requirements: ['POS integration', 'Peak traffic resilience', 'Low-latency checkout'],
    primaryRequirements: ['POS integration', 'Peak traffic resilience', 'Low-latency checkout'],
    strategy: 'Phased store-by-store cutover with seasonal freeze windows during peak trading.',
    proposalApproach: 'Phased store-by-store cutover with seasonal freeze windows during peak trading.',
    rootCause: 'Operational freeze windows proved genuine domain understanding of holiday retail risks.',
    clientFeedback: 'Seasonal freeze windows showed practical understanding of retail risk.',
    lessonLearned: 'Retail infrastructure proposals must incorporate operational freeze windows during peak trading.',
    lessonsLearned: [
      'Retail infrastructure proposals must incorporate operational freeze windows during peak trading.',
    ],
    memoryTags: ['retail', 'infrastructure', 'omnichannel', 'phased cutover'],
    tags: ['retail', 'infrastructure', 'omnichannel', 'phased cutover'],
    documentReferences: [
      'Synthetic RFP Specification — Omnichannel Commerce Modernization.pdf',
      'Omnichannel Commerce Modernization — Proposal Submission Dossier.pdf',
    ],
    proposalStrength: 90,
    source: 'historical',
  },
];

// ============================================================
// CONVERT HISTORICAL PROPOSAL TO HINDSIGHT MEMORY EXPERIENCE
// ============================================================

export function proposalToMemoryExperience(p: HistoricalProposal): MemoryExperience {
  const isWon = p.outcome === 'won' || p.outcome === 'WON';
  const lesson = p.lessonLearned || p.lessonsLearned[0] || '';
  const feedback = p.clientFeedback || '';
  const rootCause = p.rootCause || '';

  return {
    memoryId: `MEM-${p.id.replace('PROP-', '')}`,
    sourceProposalId: p.id,
    sourceProposalTitle: p.rfpTitle || p.title || p.id,
    client: p.client,
    industry: p.industry,
    dealValue: p.budget || p.value,
    outcome: isWon ? 'WON' : 'LOST',
    context: `${p.industry} proposal for ${p.rfpTitle || p.title} (${p.budget || p.value})`,
    requirements: p.requirements || p.primaryRequirements || [],
    failedApproaches: !isWon && p.strategy ? [p.strategy] : undefined,
    successfulApproaches: isWon && p.strategy ? [p.strategy] : undefined,
    clientSignals: feedback,
    clientFeedback: feedback,
    rootCause: rootCause,
    lesson: lesson,
    tags: p.memoryTags || p.tags,
    applicability: `Applicable to future ${p.industry} tenders requiring risk mitigation and delivery governance.`,
    retainedAt: p.outcomeDate,
  };
}

export const initialHindsightCorpus: MemoryExperience[] = canonicalHistoricalProposals.map(proposalToMemoryExperience);

// ============================================================
// DETERMINISTIC HISTORICAL METRICS CALCULATION
// No hardcoding — calculated directly from canonical proposals array
// ============================================================

export function calculateHistoricalMetrics(proposals: HistoricalProposal[] = canonicalHistoricalProposals) {
  const total = proposals.length;
  const wonProposals = proposals.filter(p => p.outcome === 'won' || p.outcome === 'WON');
  const lostProposals = proposals.filter(p => p.outcome === 'lost' || p.outcome === 'LOST');

  const wonCount = wonProposals.length;
  const lostCount = lostProposals.length;
  const winRate = total > 0 ? Math.round((wonCount / total) * 100) : 0;

  // Exact sum of won deal values
  const totalWonValue = wonProposals.reduce((sum, p) => sum + (p.dealValue || 0), 0);
  const totalLostValue = lostProposals.reduce((sum, p) => sum + (p.dealValue || 0), 0);
  const totalHistoricalValue = totalWonValue + totalLostValue;

  return {
    total,
    wonCount,
    lostCount,
    winRate, // 70% with initial 10 proposals
    totalWonValue, // $19,700,000
    totalWonValueFormatted: `$${(totalWonValue / 1000000).toFixed(1)}M`, // "$19.7M"
    totalLostValue, // $7,400,000
    totalLostValueFormatted: `$${(totalLostValue / 1000000).toFixed(1)}M`, // "$7.4M"
    totalHistoricalValue, // $27,100,000
    totalHistoricalValueFormatted: `$${(totalHistoricalValue / 1000000).toFixed(1)}M`, // "$27.1M"
  };
}
