import type { RFP, ProposalDraft } from '../types';

// ============================================================
// CANONICAL ACTIVE RFPS UNDER MANAGEMENT
// All active tender records originate strictly from this file.
// ============================================================

export const canonicalActiveRfps: RFP[] = [
  {
    id: 'rfp-001',
    title: 'Enterprise Cloud Migration Platform',
    client: 'Northstar Global Financial',
    industry: 'Financial Services',
    status: 'analyzed',
    receivedDate: '2026-09-15',
    deadline: '2026-10-15',
    budget: '$2.4M – $3.1M',
    priority: 'high',
    assignee: 'Sarah Chen',
    tags: ['cloud', 'migration', 'financial-services', 'rollback'],
    description:
      'Northstar Global Financial seeks a comprehensive cloud migration platform to modernize core banking clearing systems across 12 regional branch offices. The solution must guarantee zero-downtime cutover, maintain sub-50ms latency, and comply with SOC 2 Type II and PCI DSS regulations with verified rollback capabilities.',
    requirements: [
      'Multi-cloud orchestration (AWS, Azure, GCP)',
      'Zero-downtime migration for critical banking clearing systems',
      'Real-time transaction processing with sub-50ms latency',
      'SOC 2 Type II and PCI DSS compliance',
      'Automated rollback capabilities with synthetic tests',
      'Comprehensive immutable audit logging',
      'Integration with existing IBM mainframe systems',
      '24/7 monitoring and automated incident response',
    ],
    technicalRequirements: [
      'Kubernetes orchestration',
      'Event-driven microservices architecture',
      'End-to-end encryption (AES-256)',
      'Multi-region active-active disaster recovery',
      'API gateway with rate limiting',
      'CI/CD pipeline with automated gate checks',
    ],
    evaluationCriteria: [
      { name: 'Technical Capability & Architecture', weight: 30, description: 'Demonstrated ability to deliver zero-downtime cloud migrations' },
      { name: 'Security & Regulatory Compliance', weight: 25, description: 'Adherence to financial regulatory standards and audit credentials' },
      { name: 'Implementation Timeline & Risk Controls', weight: 25, description: 'Realistic delivery schedule with explicit rollback safeguards' },
      { name: 'Cost Effectiveness & 3-Year TCO', weight: 10, description: 'Predictable pricing without open-ended retainer creep' },
      { name: 'Team Credentials & Past Performance', weight: 10, description: 'Documented track record in financial infrastructure' },
    ],
    timeline: '18 months with 3 phased cutover milestones',
  },
  {
    id: 'rfp-002',
    title: 'Cybersecurity Operations & Threat Intel',
    client: 'Harbor Health Network',
    industry: 'Healthcare',
    status: 'in-progress',
    receivedDate: '2026-09-18',
    deadline: '2026-10-22',
    budget: '$1.8M – $2.2M',
    priority: 'high',
    assignee: 'Marcus Webb',
    tags: ['cybersecurity', 'healthcare', 'SOC', 'compliance'],
    description:
      'Harbor Health Network requires a managed Security Operations Center to protect patient electronic records, clinical infrastructure, and medical IoT devices across 8 hospital facilities and 45 outpatient clinics.',
    requirements: [
      'HIPAA-compliant 24/7 security monitoring',
      '< 15 min incident response time SLA',
      'Medical IoT device network segmentation',
      'Endpoint detection and response (EDR)',
      'Zero-trust network architecture',
    ],
    technicalRequirements: [
      'SIEM platform with clinical telemetry integration',
      'SOAR automated containment scripts',
      'Encrypted immutable audit logs',
    ],
    evaluationCriteria: [
      { name: 'Healthcare Compliance Experience', weight: 35, description: 'Proven HIPAA track record' },
      { name: 'Incident Response SLA', weight: 30, description: 'Speed and effectiveness of mitigation' },
      { name: 'Technology Architecture', weight: 20, description: 'Maturity of security tools' },
      { name: 'Pricing Transparency', weight: 15, description: 'Predictable managed services cost' },
    ],
    timeline: '12 months initial deployment, 36-month managed service',
  },
  {
    id: 'rfp-003',
    title: 'Enterprise Analytics & Data Infrastructure',
    client: 'Pioneer Retail Holdings',
    industry: 'Retail',
    status: 'new',
    receivedDate: '2026-09-25',
    deadline: '2026-11-01',
    budget: '$1.2M – $1.5M',
    priority: 'medium',
    assignee: 'Sarah Chen',
    tags: ['analytics', 'retail', 'data-infrastructure'],
    description:
      'Pioneer Retail Holdings is seeking a modern business intelligence and data lake platform to consolidate inventory and point-of-sale data across 220 retail stores.',
    requirements: [
      'Near real-time inventory visibility',
      'Store-level POS transaction consolidation',
      'Predictable seasonal demand forecasting',
      'Self-service executive dashboards',
    ],
    technicalRequirements: [
      'Cloud data warehouse with automated ELT',
      'Zero production store disruption during holiday freeze',
    ],
    evaluationCriteria: [
      { name: 'Business Value & Store ROI', weight: 35, description: 'Clear impact on gross margin and inventory turn' },
      { name: 'Architecture Scalability', weight: 25, description: 'Capacity for peak holiday volumes' },
      { name: 'Implementation Speed', weight: 25, description: 'Time to initial production value' },
      { name: 'Total Cost of Ownership', weight: 15, description: '3-year software and cloud consumption' },
    ],
    timeline: '9 months with quarterly deliverables',
  },
  {
    id: 'rfp-004',
    title: 'Core Infrastructure Modernization',
    client: 'Crestline Insurance Group',
    industry: 'Insurance',
    status: 'proposal-ready',
    receivedDate: '2026-09-08',
    deadline: '2026-10-28',
    budget: '$3.2M – $3.8M',
    priority: 'high',
    assignee: 'Marcus Webb',
    tags: ['insurance', 'infrastructure', 'migration', 'rollback'],
    description:
      'Crestline Insurance Group requires modernization of legacy policy-administration infrastructure to improve claim throughput and guarantee automated disaster failover.',
    requirements: [
      'Policy ledger database modernization',
      'Automated rollback capabilities for actuarial calculations',
      'Zero data loss (RPO = 0, RTO < 5 min)',
      'High-availability claims processing portal',
    ],
    technicalRequirements: [
      'Multi-region active-active database clustering',
      'Automated health checks with partition testing',
    ],
    evaluationCriteria: [
      { name: 'Risk Mitigation & Rollback Controls', weight: 35, description: 'Proven failover mechanisms' },
      { name: 'Technical Architecture', weight: 30, description: 'Modern cloud-native design' },
      { name: 'Execution Timeline', weight: 20, description: 'Prudent, phased cutover plan' },
      { name: 'Commercial Terms', weight: 15, description: 'Capped operational pods' },
    ],
    timeline: '15 months across 3 distinct gates',
  },
];

// ============================================================
// CANONICAL PROPOSAL DRAFT (FOR RFP-001)
// ============================================================

export const canonicalProposalDraft: ProposalDraft = {
  id: 'draft-001',
  rfpId: 'rfp-001',
  version: 2,
  createdDate: '2026-09-20',
  lastModified: '2026-09-28',
  status: 'draft',
  sections: [
    {
      id: 'executive-summary',
      title: 'Executive Summary & Compliance Foundations',
      content: `Apex Digital Systems is pleased to submit this proposal to Northstar Global Financial for the Enterprise Cloud Migration Platform. Recognizing Northstar's operational mandate across 12 regional branch offices and strict clearing continuity requirements, our solution prioritizes operational reliability, regulatory compliance, and predictable execution.

Our engagement model leads with upfront SOC 2 Type II compliance artifacts and an audited zero-disruption SLA guarantee in advance of architectural cutover, directly addressing regulatory compliance parameters. By consolidating legacy compute tiers into dedicated elastic pods, projected infrastructure operational expenses are optimized while maintaining audited sub-50ms transaction latency.`,
      aiGenerated: false,
      edited: true,
      evidenceUsed: ['#PROP-021', '#PROP-093'],
      version: 2,
    },
    {
      id: 'understanding',
      title: 'Client Context & Operational Risk Profile',
      content: `Northstar Global Financial requires a zero-downtime migration of critical banking clearing infrastructure with continuous sub-50ms latency across 12 regional branch networks. The evaluation committee heavily penalizes execution volatility and unbuffered migration schedules.

Drawing from historical engagements in financial services, our solution explicitly separates risk-bearing transaction partitions from non-clearing telemetry, providing verifiable operational safety gates at every milestone.`,
      aiGenerated: false,
      edited: false,
      evidenceUsed: ['#PROP-014', '#PROP-073'],
      version: 1,
    },
    {
      id: 'solution',
      title: 'Technical Architecture & Disaster Recovery',
      content: `The proposed architecture is deployed across multi-cloud regions utilizing containerized microservices managed via Kubernetes. Active-active hot standbys undergo bi-weekly synthetic partition tests without production transaction impedance, providing verified failover proof.

Commercial terms are structured with fixed-capacity operational pods, capping post-launch run-rate expenses with zero unanticipated retainer escalation.`,
      aiGenerated: false,
      edited: false,
      evidenceUsed: ['#PROP-044', '#PROP-073'],
      version: 1,
    },
    {
      id: 'implementation',
      title: 'Implementation Methodology & Phased Cutover',
      content: `Our migration approach includes isolated staging, rollback gates, and phased production cutover: Phase 1 (Non-clearing telemetry), Phase 2 (Secondary book partition), and Phase 3 (Primary ledger cutover with automated rollback points).

Between each phase, a mandatory 45-day stabilization buffer allows full audit validation and transactional reconciliation before secondary systems are migrated. Automated rollback checkpoints guarantee that any unexpected telemetry drift triggers instant fallback with zero loss of financial transaction state.`,
      aiGenerated: false,
      edited: true,
      evidenceUsed: ['#PROP-044', '#PROP-052', '#PROP-093'],
      version: 2,
    },
    {
      id: 'pricing',
      title: 'Commercial Framework & 3-Year TCO',
      content: `Commercial terms are structured as fixed-capacity engineering pods with quarterly outcome gates, guaranteeing cost ceiling certainty across the 18-month lifecycle. Total investment is capped at $2.85M with no open-ended hourly billing exposure.`,
      aiGenerated: false,
      edited: false,
      evidenceUsed: ['#PROP-044'],
      version: 1,
    },
  ],
};

// ============================================================
// DETERMINISTIC PIPELINE VALUE CALCULATION
// Rule: Sum of midpoint values across active RFPs
// ============================================================

export function parseRfpBudget(budgetStr: string): { min: number; max: number; midpoint: number } {
  const matches = budgetStr.match(/(\d+\.?\d*)/g);
  if (!matches || matches.length === 0) {
    return { min: 0, max: 0, midpoint: 0 };
  }
  const nums = matches.map(Number);
  const min = nums[0] * 1000000;
  const max = nums.length > 1 ? nums[1] * 1000000 : min;
  const midpoint = (min + max) / 2;
  return { min, max, midpoint };
}

export function calculatePipelineMetrics(rfps: RFP[] = canonicalActiveRfps) {
  let sumMin = 0;
  let sumMax = 0;
  let sumMidpoint = 0;

  rfps.forEach(rfp => {
    const { min, max, midpoint } = parseRfpBudget(rfp.budget);
    sumMin += min;
    sumMax += max;
    sumMidpoint += midpoint;
  });

  return {
    activeRfpsCount: rfps.length,
    sumMin,
    sumMax,
    sumMidpoint,
    // Method chosen for single KPI display: Midpoint of active RFP budget ranges
    calculationMethod: 'Midpoint of active RFP budget ranges',
    pipelineValue: sumMidpoint, // $9,600,000
    pipelineValueFormatted: `$${(sumMidpoint / 1000000).toFixed(1)}M`, // "$9.6M"
    pipelineRangeFormatted: `$${(sumMin / 1000000).toFixed(1)}M – $${(sumMax / 1000000).toFixed(1)}M`, // "$8.6M – $10.6M"
  };
}
