import type { RFP, HistoricalProposal, MemoryInsight, Notification, DashboardMetrics, IntelligenceRecommendation, ProposalDraft } from '../types';

// ============================================================
// REALISTIC MOCK DATA
// ============================================================

export const dashboardMetrics: DashboardMetrics = {
  activeRfps: 7,
  proposalsSubmitted: 43,
  winRate: 62,
  avgRelevanceScore: 87,
  memoriesStored: 156,
  patternsIdentified: 34,
};

export const activeRfps: RFP[] = [
  {
    id: 'rfp-001',
    title: 'Enterprise Cloud Migration Platform',
    client: 'Meridian Financial Group',
    industry: 'Financial Services',
    status: 'analyzed',
    receivedDate: '2026-09-15',
    deadline: '2026-10-15',
    budget: '$2.4M – $3.1M',
    priority: 'high',
    assignee: 'Sarah Chen',
    tags: ['cloud', 'migration', 'fintech'],
    description: 'Meridian Financial Group seeks a comprehensive cloud migration platform to modernize their legacy infrastructure across 12 regional offices. The solution must comply with SOC 2 Type II, PCI DSS, and support real-time transaction processing with sub-50ms latency requirements.',
    requirements: [
      'Multi-cloud orchestration (AWS, Azure, GCP)',
      'Zero-downtime migration for critical banking systems',
      'Real-time transaction processing with sub-50ms latency',
      'SOC 2 Type II and PCI DSS compliance',
      'Automated rollback capabilities',
      'Comprehensive audit logging',
      'Integration with existing IBM mainframe systems',
      '24/7 monitoring and incident response',
    ],
    technicalRequirements: [
      'Kubernetes orchestration',
      'Event-driven microservices architecture',
      'End-to-end encryption (AES-256)',
      'Multi-region disaster recovery',
      'API gateway with rate limiting',
      'CI/CD pipeline integration',
    ],
    evaluationCriteria: [
      { name: 'Technical Capability', weight: 30, description: 'Demonstrated ability to deliver complex cloud migrations' },
      { name: 'Security & Compliance', weight: 25, description: 'Adherence to financial regulatory standards' },
      { name: 'Implementation Timeline', weight: 20, description: 'Realistic and efficient delivery schedule' },
      { name: 'Cost Effectiveness', weight: 15, description: 'Value for investment relative to scope' },
      { name: 'Team Experience', weight: 10, description: 'Relevant team credentials and past performance' },
    ],
    timeline: '18 months with 3 phased milestones',
  },
  {
    id: 'rfp-002',
    title: 'Cybersecurity Operations Center',
    client: 'Pacific Health Systems',
    industry: 'Healthcare',
    status: 'in-progress',
    receivedDate: '2026-09-18',
    deadline: '2026-10-22',
    budget: '$1.8M – $2.2M',
    priority: 'high',
    assignee: 'Marcus Webb',
    tags: ['cybersecurity', 'healthcare', 'SOC'],
    description: 'Pacific Health Systems requires a managed Security Operations Center to protect patient data, clinical systems, and medical IoT devices across 8 hospital facilities and 45 outpatient clinics.',
    requirements: [
      'HIPAA-compliant security monitoring',
      '24/7 SOC with < 15 min incident response',
      'Medical IoT device security',
      'Endpoint detection and response (EDR)',
      'SIEM implementation and tuning',
      'Threat intelligence integration',
      'Quarterly penetration testing',
      'Security awareness training program',
    ],
    technicalRequirements: [
      'SIEM platform (Splunk or equivalent)',
      'SOAR automation',
      'Network segmentation for medical devices',
      'Zero-trust architecture',
      'Encrypted data at rest and in transit',
    ],
    evaluationCriteria: [
      { name: 'Healthcare Experience', weight: 30, description: 'Proven track record in healthcare security' },
      { name: 'Response Capability', weight: 25, description: 'Speed and effectiveness of incident response' },
      { name: 'Compliance Knowledge', weight: 20, description: 'HIPAA and healthcare regulatory expertise' },
      { name: 'Technology Stack', weight: 15, description: 'Maturity and capability of security tools' },
      { name: 'Cost Structure', weight: 10, description: 'Transparent and competitive pricing' },
    ],
    timeline: '12 months initial deployment, 36-month managed service',
  },
  {
    id: 'rfp-003',
    title: 'Data Analytics & BI Platform',
    client: 'Northgate Retail Corporation',
    industry: 'Retail',
    status: 'new',
    receivedDate: '2026-09-25',
    deadline: '2026-11-01',
    budget: '$800K – $1.2M',
    priority: 'medium',
    assignee: undefined,
    tags: ['analytics', 'retail', 'BI'],
    description: 'Northgate Retail Corporation is seeking a modern data analytics and business intelligence platform to consolidate data from 200+ retail locations, e-commerce operations, and supply chain systems.',
    requirements: [
      'Real-time sales analytics across 200+ locations',
      'Inventory optimization and demand forecasting',
      'Customer behavior analysis and segmentation',
      'Supply chain visibility dashboards',
      'Executive reporting suite',
      'Self-service analytics for business users',
      'Mobile-accessible dashboards',
    ],
    technicalRequirements: [
      'Cloud-native data warehouse',
      'ETL/ELT pipeline automation',
      'Machine learning model serving',
      'API integration with POS systems',
      'Role-based access control',
    ],
    evaluationCriteria: [
      { name: 'Analytics Capability', weight: 30, description: 'Depth and breadth of analytical features' },
      { name: 'Scalability', weight: 25, description: 'Ability to handle growing data volumes' },
      { name: 'User Experience', weight: 20, description: 'Ease of use for non-technical users' },
      { name: 'Implementation Speed', weight: 15, description: 'Time to first value delivery' },
      { name: 'Total Cost', weight: 10, description: 'All-in cost over 3 years' },
    ],
    timeline: '9 months with quarterly releases',
  },
  {
    id: 'rfp-004',
    title: 'Digital Transformation Advisory',
    client: 'Commonwealth Insurance Ltd',
    industry: 'Insurance',
    status: 'proposal-ready',
    receivedDate: '2026-09-08',
    deadline: '2026-10-05',
    budget: '$1.5M – $2.0M',
    priority: 'medium',
    assignee: 'Sarah Chen',
    tags: ['digital-transformation', 'insurance', 'advisory'],
    description: 'Commonwealth Insurance is undergoing a multi-year digital transformation initiative and requires strategic advisory and implementation support for modernizing their policy administration, claims processing, and customer engagement platforms.',
    requirements: [
      'Digital transformation roadmap development',
      'Legacy system modernization strategy',
      'Customer portal redesign',
      'Claims automation implementation',
      'API-first architecture design',
      'Change management program',
      'Staff training and enablement',
    ],
    technicalRequirements: [
      'Microservices architecture',
      'Low-code/no-code integration',
      'Cloud-native deployment',
      'Event-driven processing',
      'DevOps and CI/CD practices',
    ],
    evaluationCriteria: [
      { name: 'Insurance Domain Expertise', weight: 35, description: 'Deep understanding of insurance operations' },
      { name: 'Transformation Track Record', weight: 25, description: 'Proven results in similar engagements' },
      { name: 'Methodology', weight: 20, description: 'Structured approach to transformation' },
      { name: 'Team Composition', weight: 10, description: 'Quality and experience of proposed team' },
      { name: 'Pricing', weight: 10, description: 'Value relative to scope of work' },
    ],
    timeline: '24 months with 6-month phases',
  },
  {
    id: 'rfp-005',
    title: 'AI-Powered Customer Service Platform',
    client: 'Velocity Telecom',
    industry: 'Telecommunications',
    status: 'analyzing',
    receivedDate: '2026-09-22',
    deadline: '2026-10-28',
    budget: '$3.0M – $4.5M',
    priority: 'high',
    assignee: 'Marcus Webb',
    tags: ['AI', 'customer-service', 'telecom'],
    description: 'Velocity Telecom requires an AI-powered customer service platform to handle 2M+ monthly customer interactions across voice, chat, email, and social media channels, reducing average handle time by 40% while maintaining CSAT above 4.5/5.',
    requirements: [
      'Multi-channel support (voice, chat, email, social)',
      'AI-powered intent recognition and routing',
      'Automated resolution for tier-1 issues',
      'Agent assist with real-time suggestions',
      'Sentiment analysis and escalation triggers',
      'Knowledge base integration',
      'CRM and billing system integration',
      'Multi-language support (English, Spanish, French)',
    ],
    technicalRequirements: [
      'Natural language processing engine',
      'Real-time speech-to-text',
      'Conversational AI framework',
      'High-availability architecture (99.99% SLA)',
      'PCI DSS compliance for payment handling',
    ],
    evaluationCriteria: [
      { name: 'AI Capability', weight: 30, description: 'Sophistication and accuracy of AI models' },
      { name: 'Scalability', weight: 25, description: 'Ability to handle 2M+ monthly interactions' },
      { name: 'Integration', weight: 20, description: 'Compatibility with existing systems' },
      { name: 'ROI Projections', weight: 15, description: 'Measurable cost savings and efficiency gains' },
      { name: 'Implementation Plan', weight: 10, description: 'Phased rollout and risk mitigation' },
    ],
    timeline: '15 months with pilot phase',
  },
];

export const historicalProposals: HistoricalProposal[] = [
  {
    id: 'prop-014',
    rfpTitle: 'Cloud Infrastructure Modernization',
    client: 'Atlas Banking Corporation',
    industry: 'Financial Services',
    outcome: 'lost',
    submittedDate: '2026-03-15',
    outcomeDate: '2026-04-22',
    budget: '$2.8M',
    keyFactors: ['Implementation timeline too aggressive', 'Insufficient legacy system migration experience cited', 'Competitor offered phased approach'],
    failureReasons: ['Timeline was 6 months shorter than realistic', 'Did not address mainframe integration concerns adequately', 'Pricing structure lacked flexibility'],
    lessonsLearned: [
      'Financial institutions require conservative timelines',
      'Always address legacy system concerns explicitly',
      'Offer phased pricing options for large engagements',
    ],
    clientFeedback: 'Strong technical proposal but implementation timeline raised concerns about execution risk.',
    competitorInfo: 'Accenture won with a 24-month phased approach at similar budget.',
    tags: ['cloud', 'migration', 'banking'],
    proposalStrength: 68,
  },
  {
    id: 'prop-021',
    rfpTitle: 'Enterprise Security Operations',
    client: 'Pinnacle Healthcare Network',
    industry: 'Healthcare',
    outcome: 'won',
    submittedDate: '2026-04-10',
    outcomeDate: '2026-05-18',
    budget: '$1.9M',
    keyFactors: ['Strong security credentials', 'Rapid deployment capability', 'Healthcare-specific compliance expertise'],
    successReasons: ['Demonstrated HIPAA expertise upfront', 'Proposed 30-day rapid assessment phase', 'Included 24/7 monitoring from day one'],
    lessonsLearned: [
      'Healthcare clients value compliance expertise above all',
      'Rapid initial deployment builds trust',
      'Include ongoing managed services to increase contract value',
    ],
    clientFeedback: 'Exceptional understanding of healthcare security requirements. Rapid assessment phase was a key differentiator.',
    tags: ['security', 'healthcare', 'managed-services'],
    proposalStrength: 91,
  },
  {
    id: 'prop-027',
    rfpTitle: 'Customer Analytics Platform',
    client: 'Sterling Retail Holdings',
    industry: 'Retail',
    outcome: 'won',
    submittedDate: '2026-05-20',
    outcomeDate: '2026-06-28',
    budget: '$1.1M',
    keyFactors: ['Strong ROI positioning', 'Proven retail analytics experience', 'Self-service BI emphasis'],
    successReasons: ['Clear ROI projections with retail benchmarks', 'Demo of similar retail implementation', 'Emphasized business user empowerment'],
    lessonsLearned: [
      'Retail clients respond to concrete ROI projections',
      'Live demos of similar implementations are highly effective',
      'Self-service capabilities are a key differentiator in retail',
    ],
    clientFeedback: 'ROI projections were well-researched and credible. The demo was decisive.',
    tags: ['analytics', 'retail', 'BI'],
    proposalStrength: 88,
  },
  {
    id: 'prop-032',
    rfpTitle: 'Digital Transformation Program',
    client: 'Pacific Mutual Insurance',
    industry: 'Insurance',
    outcome: 'won',
    submittedDate: '2026-06-05',
    outcomeDate: '2026-07-15',
    budget: '$2.2M',
    keyFactors: ['Comprehensive transformation methodology', 'Insurance domain expertise', 'Change management approach'],
    successReasons: ['Structured 4-phase methodology resonated', 'Team included former insurance executives', 'Strong change management framework'],
    lessonsLearned: [
      'Insurance industry values structured methodologies',
      'Domain expertise in team composition is critical for advisory',
      'Change management is often the deciding factor in transformation projects',
    ],
    clientFeedback: 'The team composition and methodology gave us confidence in execution capability.',
    tags: ['digital-transformation', 'insurance', 'advisory'],
    proposalStrength: 85,
  },
  {
    id: 'prop-036',
    rfpTitle: 'Unified Communications Platform',
    client: 'Metro Telecom Solutions',
    industry: 'Telecommunications',
    outcome: 'lost',
    submittedDate: '2026-07-01',
    outcomeDate: '2026-08-12',
    budget: '$3.5M',
    keyFactors: ['Pricing higher than competitors', 'Integration concerns', 'Timeline uncertainty'],
    failureReasons: ['Price was 20% above winning bid', 'Integration with legacy BSS/OSS systems was underestimated', 'Did not propose a pilot phase'],
    lessonsLearned: [
      'Telecom industry is highly price-sensitive for large contracts',
      'BSS/OSS integration complexity must be addressed with specifics',
      'Pilot phases reduce perceived risk for telecom clients',
    ],
    clientFeedback: 'Technical approach was strong but pricing and integration plan were not competitive.',
    competitorInfo: 'TCS won with lower pricing and a 60-day pilot commitment.',
    tags: ['telecom', 'communications', 'unified'],
    proposalStrength: 62,
  },
  {
    id: 'prop-041',
    rfpTitle: 'Supply Chain Optimization',
    client: 'Continental Manufacturing Group',
    industry: 'Manufacturing',
    outcome: 'lost',
    submittedDate: '2026-08-10',
    outcomeDate: '2026-09-05',
    budget: '$1.6M',
    keyFactors: ['Pricing mismatch', 'Limited manufacturing experience', 'Competitor had existing relationship'],
    failureReasons: ['Budget expectations were misaligned', 'Team lacked deep manufacturing expertise', 'Incumbent vendor leveraged existing relationship'],
    lessonsLearned: [
      'Verify budget expectations early in the process',
      'Manufacturing engagements require domain specialists',
      'Incumbent relationships are difficult to displace without significant differentiation',
    ],
    clientFeedback: 'Good proposal but we decided to expand scope with our existing vendor.',
    competitorInfo: 'Incumbent vendor (Deloitte) retained the engagement.',
    tags: ['manufacturing', 'supply-chain', 'optimization'],
    proposalStrength: 55,
  },
  {
    id: 'prop-044',
    rfpTitle: 'Data Center Consolidation',
    client: 'Federated Insurance Corp',
    industry: 'Insurance',
    outcome: 'won',
    submittedDate: '2026-08-25',
    outcomeDate: '2026-09-20',
    budget: '$4.1M',
    keyFactors: ['Detailed migration plan', 'Strong risk mitigation', 'Competitive pricing'],
    successReasons: ['Granular migration plan with rollback procedures', 'Risk matrix was highly detailed', 'Offered gain-sharing pricing model'],
    lessonsLearned: [
      'Detailed migration plans build confidence for infrastructure projects',
      'Risk mitigation plans are valued in insurance industry',
      'Gain-sharing pricing models can be a strong differentiator',
    ],
    clientFeedback: 'The migration plan and risk approach gave us the confidence to proceed.',
    tags: ['infrastructure', 'migration', 'insurance'],
    proposalStrength: 92,
  },
];

export const memoryInsights: MemoryInsight[] = [
  {
    id: 'insight-001',
    type: 'pattern',
    title: 'Financial services clients prefer phased timelines',
    description: 'Across 8 financial services proposals, phased implementation approaches with clear milestones had a 75% win rate, compared to 33% for aggressive single-phase timelines.',
    confidence: 87,
    sourceProposals: ['prop-014', 'prop-021', 'prop-044'],
    discoveredDate: '2026-08-15',
    category: 'Timeline Strategy',
  },
  {
    id: 'insight-002',
    type: 'pattern',
    title: 'Healthcare clients prioritize compliance credentials',
    description: 'In healthcare engagements, proposals that led with compliance expertise (HIPAA, HITRUST) in the executive summary had significantly higher win rates than those that positioned compliance as a secondary concern.',
    confidence: 92,
    sourceProposals: ['prop-021'],
    discoveredDate: '2026-06-20',
    category: 'Positioning Strategy',
  },
  {
    id: 'insight-003',
    type: 'risk',
    title: 'Pricing sensitivity in telecom sector',
    description: 'Telecom clients consistently selected lower-cost proposals when technical capabilities were comparable. Pricing must be competitive or justified with clear differentiation.',
    confidence: 78,
    sourceProposals: ['prop-036'],
    discoveredDate: '2026-08-20',
    category: 'Pricing Strategy',
  },
  {
    id: 'insight-004',
    type: 'opportunity',
    title: 'Pilot phases reduce decision friction',
    description: 'Proposals that included a defined pilot phase (30-90 days) had 68% higher win rates. Pilots reduce perceived risk and allow clients to validate capabilities before full commitment.',
    confidence: 84,
    sourceProposals: ['prop-021', 'prop-036'],
    discoveredDate: '2026-09-01',
    category: 'Engagement Strategy',
  },
  {
    id: 'insight-005',
    type: 'learning',
    title: 'ROI quantification drives retail decisions',
    description: 'Retail sector proposals with detailed ROI projections using industry-specific benchmarks won at 2x the rate of proposals with generic value propositions.',
    confidence: 81,
    sourceProposals: ['prop-027'],
    discoveredDate: '2026-07-10',
    category: 'Value Proposition',
  },
  {
    id: 'insight-006',
    type: 'pattern',
    title: 'Domain expertise in team composition is decisive',
    description: 'For advisory and transformation projects, proposals with team members who have direct industry experience were 3x more likely to win than those staffed with generalists.',
    confidence: 89,
    sourceProposals: ['prop-032', 'prop-041'],
    discoveredDate: '2026-09-10',
    category: 'Team Strategy',
  },
];

export const intelligenceRecommendations: IntelligenceRecommendation[] = [
  {
    id: 'rec-001',
    type: 'emphasize',
    title: 'Lead with compliance and security credentials',
    description: 'Historical evidence suggests that financial services clients assign disproportionate weight to security and compliance capabilities. Position SOC 2 and PCI DSS expertise prominently in the executive summary.',
    evidence: [
      'Proposal #021 won by leading with HIPAA compliance expertise',
      'Proposal #044 succeeded with detailed risk mitigation plans',
      '75% of regulated industry wins led with compliance positioning',
    ],
    confidence: 91,
    relatedProposals: [historicalProposals[1], historicalProposals[6]],
  },
  {
    id: 'rec-002',
    type: 'emphasize',
    title: 'Propose a phased implementation with a pilot',
    description: 'Relevant past outcomes indicate that phased approaches with defined pilot periods significantly reduce client risk perception. Consider a 60-day proof-of-concept phase.',
    evidence: [
      'Proposal #014 lost due to aggressive single-phase timeline',
      'Proposal #021 won with 30-day rapid assessment phase',
      'Phased proposals have 68% higher win rate in our data',
    ],
    confidence: 87,
    relatedProposals: [historicalProposals[0], historicalProposals[1]],
  },
  {
    id: 'rec-003',
    type: 'avoid',
    title: 'Do not underestimate legacy system integration',
    description: 'Observed pattern: Proposals that insufficiently addressed legacy system migration have consistently underperformed. Meridian\'s IBM mainframe integration requires detailed technical planning.',
    evidence: [
      'Proposal #014 cited insufficient legacy migration experience as key failure factor',
      'Proposal #036 lost partially due to BSS/OSS integration concerns',
      'Client RFP explicitly mentions IBM mainframe systems',
    ],
    confidence: 85,
    relatedProposals: [historicalProposals[0], historicalProposals[4]],
  },
  {
    id: 'rec-004',
    type: 'consider',
    title: 'Include gain-sharing or flexible pricing model',
    description: 'Potential opportunity: Financial services clients have responded positively to gain-sharing pricing models that align vendor incentives with client outcomes.',
    evidence: [
      'Proposal #044 differentiated with gain-sharing pricing and won',
      'Proposal #014 lacked pricing flexibility and lost',
      'Financial services evaluation criteria allocates 15% weight to cost effectiveness',
    ],
    confidence: 76,
    relatedProposals: [historicalProposals[6], historicalProposals[0]],
  },
  {
    id: 'rec-005',
    type: 'risk',
    title: 'Timeline may require conservative adjustment',
    description: 'Potential risk: The 18-month timeline aligns with client expectations, but historical data suggests adding buffer for mainframe integration phases. Consider 20-22 month projection with acceleration incentives.',
    evidence: [
      'Proposal #014 failed with timeline perceived as too aggressive',
      'Financial services clients prefer conservative timelines (87% confidence)',
      'Mainframe integration typically adds 2-4 months to projections',
    ],
    confidence: 82,
    relatedProposals: [historicalProposals[0]],
  },
];

export const proposalDraft: ProposalDraft = {
  id: 'draft-001',
  rfpId: 'rfp-001',
  version: 1,
  createdDate: '2026-09-26',
  lastModified: '2026-09-27',
  status: 'draft',
  sections: [
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      content: `Meridian Financial Group faces a critical inflection point as legacy infrastructure constraints limit operational agility and increase compliance risk across your 12 regional offices. Our proposal presents a comprehensive cloud migration platform built on proven methodologies refined through successful financial services engagements.

Our approach is grounded in three principles that historically drive successful outcomes in regulated financial environments: security-first architecture, phased risk mitigation, and measurable business value at each milestone.

We propose an 18-month engagement structured in three phases, beginning with a 60-day proof-of-concept that validates our approach against your most demanding workloads — including IBM mainframe integration — before committing to full-scale migration.

Our team brings direct experience in financial services cloud migrations, including SOC 2 Type II and PCI DSS compliant implementations. We have maintained 100% compliance continuity across all regulated migrations to date.

The expected outcome: a modern, resilient, multi-cloud infrastructure that reduces operational costs by 35-40% while improving transaction processing performance beyond your sub-50ms latency requirement.`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-014', 'prop-021', 'prop-044'],
      version: 1,
    },
    {
      id: 'understanding',
      title: 'Understanding of Requirements',
      content: `We have carefully analyzed Meridian Financial Group's requirements and understand the following critical needs:

**Core Infrastructure Challenge**
Your current infrastructure spans 12 regional offices with a mix of legacy systems, including IBM mainframe environments that process core banking transactions. The migration must maintain uninterrupted service for all customer-facing operations while systematically modernizing each layer of the technology stack.

**Performance Requirements**
Real-time transaction processing with sub-50ms latency is non-negotiable. Our architecture ensures that performance improvements are validated at each migration phase, with automated rollback capabilities if latency thresholds are breached.

**Regulatory Compliance**
SOC 2 Type II and PCI DSS compliance must be maintained throughout the migration process, not merely achieved at completion. Our compliance-continuous methodology ensures that every intermediate state meets regulatory requirements.

**Multi-Cloud Strategy**
The requirement for AWS, Azure, and GCP orchestration reflects a mature cloud strategy. Our platform provides unified control across all three providers with consistent security policies, cost optimization, and workload placement intelligence.

**Operational Continuity**
Zero-downtime migration requires careful orchestration of data replication, traffic routing, and validation procedures. Our proven blue-green migration patterns have achieved 100% uptime across 14 financial services migrations.`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-014'],
      version: 1,
    },
    {
      id: 'solution',
      title: 'Proposed Solution',
      content: `Our solution architecture addresses each dimension of your requirements through a unified cloud migration platform.

**Migration Platform Architecture**
A Kubernetes-based orchestration layer that manages workload assessment, migration execution, and validation across all three cloud providers. The platform includes intelligent workload placement that optimizes for performance, cost, and compliance requirements.

**Legacy System Integration**
Purpose-built connectors for IBM mainframe systems that enable gradual migration of transactions from legacy to cloud-native processing. Our strangler fig pattern ensures that mainframe workloads are migrated without disrupting dependent systems.

**Security Framework**
End-to-end AES-256 encryption with hardware security module (HSM) integration for key management. Multi-region disaster recovery with automated failover tested monthly. Comprehensive audit logging that meets and exceeds SOC 2 Type II requirements.

**Monitoring & Operations**
24/7 monitoring with intelligent alerting that correlates events across all cloud providers and legacy systems. Our NOC team includes specialists with financial services regulatory experience, ensuring that incident response procedures align with compliance requirements.`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-021', 'prop-044'],
      version: 1,
    },
    {
      id: 'implementation',
      title: 'Implementation Plan',
      content: `**Phase 1: Foundation & Proof of Concept (Months 1-3)**
- Cloud platform provisioning and security baseline
- 60-day proof of concept with selected non-critical workloads
- IBM mainframe connector development and testing
- Compliance framework validation

**Phase 2: Core Migration (Months 4-12)**
- Regional office migration in priority order
- Critical banking system migration with parallel processing
- Performance validation against sub-50ms requirement
- Continuous compliance monitoring and reporting

**Phase 3: Optimization & Transition (Months 13-18)**
- Legacy system decommissioning
- Cost optimization and right-sizing
- Knowledge transfer and operational handover
- Post-migration performance benchmarking`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-014', 'prop-044'],
      version: 1,
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      content: `Security is foundational to our approach, not an afterthought.

**Compliance Continuity**
Our compliance-continuous methodology ensures that SOC 2 Type II and PCI DSS requirements are met at every stage of migration. We maintain a real-time compliance dashboard that provides auditors with continuous evidence of control effectiveness.

**Data Protection**
- AES-256 encryption for data at rest and in transit
- Hardware Security Module (HSM) integration for key management
- Data loss prevention (DLP) controls across all cloud environments
- Automated data classification and handling procedures

**Access Control**
- Zero-trust network architecture
- Multi-factor authentication for all administrative access
- Privileged access management with session recording
- Role-based access control aligned with organizational structure

**Incident Response**
- 15-minute initial response SLA for critical security events
- Automated containment procedures for common threat patterns
- Integration with financial services threat intelligence feeds
- Quarterly tabletop exercises with client security team`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-021'],
      version: 1,
    },
    {
      id: 'timeline',
      title: 'Timeline & Milestones',
      content: `Our 18-month implementation timeline is structured around three major phases with defined milestones and decision gates.

**Month 1-2**: Project initiation, team onboarding, environment setup
**Month 2-3**: Proof of concept execution and validation
**Month 3**: Go/No-Go decision gate
**Month 4-6**: First regional office migration (pilot region)
**Month 7-9**: Core banking system migration
**Month 10-12**: Remaining regional offices (parallel tracks)
**Month 13-15**: Performance optimization and cost tuning
**Month 16-17**: Knowledge transfer and documentation
**Month 18**: Final validation and project closure

Each phase includes automated validation gates that verify performance, security, and compliance requirements before proceeding to the next stage.`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-014'],
      version: 1,
    },
    {
      id: 'pricing',
      title: 'Investment',
      content: `Our pricing structure reflects a commitment to aligned incentives and transparent value delivery.

**Base Investment**: $2.65M

**Phase 1 - Foundation & PoC**: $420,000
**Phase 2 - Core Migration**: $1,580,000
**Phase 3 - Optimization**: $650,000

**Gain-Sharing Component**
We propose a gain-sharing model where 15% of verified operational cost savings in the first year post-migration are shared between Meridian and our team. This aligns our incentives with your success and provides additional motivation for optimization.

**Payment Terms**
Monthly billing based on phase milestones with a 10% holdback released upon successful completion of each phase validation gate.`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-044', 'prop-014'],
      version: 1,
    },
    {
      id: 'roi',
      title: 'Return on Investment',
      content: `**Projected 3-Year ROI: 285%**

**Cost Reductions**
- Infrastructure operating costs: 35-40% reduction ($1.2M annually)
- Maintenance overhead: 50% reduction ($400K annually)
- Compliance audit costs: 30% reduction ($150K annually)

**Revenue Enablement**
- Faster time-to-market for new financial products
- Improved customer experience through performance improvements
- Reduced downtime and associated revenue loss

**Risk Reduction**
- Eliminated single points of failure
- Improved disaster recovery capabilities (RTO from 24hrs to 2hrs)
- Reduced security incident exposure

These projections are based on benchmarks from similar financial services cloud migrations and have been validated against industry research from Gartner and Forrester.`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-027'],
      version: 1,
    },
    {
      id: 'risk-management',
      title: 'Risk Management',
      content: `We have identified the following risks and corresponding mitigation strategies:

**High Priority**
- *Data migration integrity*: Automated checksum validation at every transfer point with parallel processing for verification
- *Performance degradation during migration*: Blue-green deployment pattern with instant rollback capability
- *Compliance gaps during transition*: Continuous compliance monitoring with real-time alerting

**Medium Priority**
- *Scope creep*: Defined change management process with impact assessment for all scope modifications
- *Resource availability*: Dedicated team with named backups for all critical roles
- *Vendor lock-in*: Multi-cloud architecture with abstraction layer to prevent provider dependency

**Low Priority**
- *Technology obsolescence*: Cloud-native architecture with regular technology refresh cycles
- *Knowledge retention*: Comprehensive documentation and training program`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: ['prop-044', 'prop-014'],
      version: 1,
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: `Meridian Financial Group's cloud migration represents a transformative opportunity to modernize infrastructure while strengthening security and compliance posture. Our proposal reflects not only technical capability but lessons learned from extensive experience in financial services engagements.

We believe the combination of our phased approach, compliance-continuous methodology, and gain-sharing pricing model positions this engagement for measurable success. The 60-day proof of concept provides Meridian with a low-risk entry point to validate our capabilities against your most demanding requirements.

We welcome the opportunity to discuss this proposal in detail and look forward to partnering with Meridian Financial Group on this critical initiative.`,
      aiGenerated: true,
      edited: false,
      evidenceUsed: [],
      version: 1,
    },
  ],
};

export const notifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'info',
    title: 'New RFP Received',
    message: 'Data Analytics & BI Platform from Northgate Retail Corporation',
    timestamp: '2026-09-25T14:30:00',
    read: false,
  },
  {
    id: 'notif-002',
    type: 'success',
    title: 'Analysis Complete',
    message: 'Enterprise Cloud Migration Platform analysis is ready for review',
    timestamp: '2026-09-25T10:15:00',
    read: true,
  },
  {
    id: 'notif-003',
    type: 'warning',
    title: 'Deadline Approaching',
    message: 'Digital Transformation Advisory proposal due in 7 days',
    timestamp: '2026-09-28T09:00:00',
    read: false,
  },
];

export const outcomeTimelineData = [
  { month: 'Jan', won: 1, lost: 1 },
  { month: 'Feb', won: 2, lost: 0 },
  { month: 'Mar', won: 1, lost: 1 },
  { month: 'Apr', won: 2, lost: 1 },
  { month: 'May', won: 1, lost: 0 },
  { month: 'Jun', won: 2, lost: 1 },
  { month: 'Jul', won: 1, lost: 1 },
  { month: 'Aug', won: 2, lost: 2 },
  { month: 'Sep', won: 1, lost: 0 },
];

export const industryWinRates = [
  { industry: 'Healthcare', winRate: 78, proposals: 9 },
  { industry: 'Financial Services', winRate: 64, proposals: 14 },
  { industry: 'Insurance', winRate: 71, proposals: 7 },
  { industry: 'Retail', winRate: 60, proposals: 5 },
  { industry: 'Telecommunications', winRate: 45, proposals: 4 },
  { industry: 'Manufacturing', winRate: 38, proposals: 4 },
];
