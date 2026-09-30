// ============================================================
// CANONICAL DATASET: ORGANIZATION & AUDIT CREDENTIALS
// All organizational facts originate strictly from this file.
// ============================================================

export interface CompanyIdentity {
  name: string;
  legalEntity: string;
  tagline: string;
  description: string;
  disclaimerBadge: string;
  disclaimerNotice: string;
  complianceAttestation: {
    standard: string;
    status: string;
    auditor: string;
    attestationDate: string;
    validThrough: string;
  };
}

export const COMPANY_IDENTITY: CompanyIdentity = {
  name: 'Apex Digital Systems',
  legalEntity: 'Apex Digital Systems LLC',
  tagline: 'Enterprise B2B Technology & Infrastructure Services',
  description:
    'Apex Digital Systems is a synthetic enterprise technology company that responds to B2B RFPs for cloud modernization, cybersecurity, data infrastructure and enterprise software.',
  disclaimerBadge: 'SYNTHETIC DEMO DATA',
  disclaimerNotice:
    'All organizations, historical proposals, outcomes, budgets and debrief feedback in this demonstration are synthetic and designed for deterministic data provenance testing.',
  complianceAttestation: {
    standard: 'SOC 2 Type II & HIPAA Security Rule',
    status: 'CERTIFIED & AUDITED',
    auditor: 'Deloitte Risk Advisory LLP',
    attestationDate: '2026-08-14',
    validThrough: '2027-08-14',
  },
};

export const syntheticCompany = COMPANY_IDENTITY;
