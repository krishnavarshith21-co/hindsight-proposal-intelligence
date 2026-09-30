import type { CanonicalDocument, RFP, HistoricalProposal } from '../types';
import { canonicalActiveRfps } from './rfps';
import { canonicalHistoricalProposals } from './proposals';
import { COMPANY_IDENTITY } from './organization';

// ============================================================
// CANONICAL DOCUMENTS DATASET
// Derived strictly from canonical RFPs, historical proposals and compliance artifacts.
// NO independent dates, NO "Official" fake claims.
// ============================================================

export function buildCanonicalDocuments(
  rfps: RFP[] = canonicalActiveRfps,
  proposals: HistoricalProposal[] = canonicalHistoricalProposals
): CanonicalDocument[] {
  // 1. Active RFP specifications — dates match receivedDate
  const rfpDocs: CanonicalDocument[] = rfps.map(rfp => ({
    id: `doc-${rfp.id}-spec`,
    name: `${rfp.title} — Synthetic RFP Specification.pdf`,
    type: 'RFP Specification',
    sourceId: rfp.id,
    sourceTitle: rfp.title,
    client: rfp.client,
    uploadedDate: rfp.receivedDate, // strictly derived from RFP
    status: 'Ready',
    indexedInHindsight: true,
    fileSizeFormatted: '2.4 MB',
  }));

  // 2. Historical proposal dossiers — dates match submittedDate
  const proposalDocs: CanonicalDocument[] = proposals.map(p => {
    const isWon = p.outcome === 'won' || p.outcome === 'WON';
    return {
      id: `doc-${p.id.toLowerCase()}-dossier`,
      name: `${p.title || p.rfpTitle} — Proposal Submission Dossier.pdf`,
      type: 'Proposal Dossier',
      sourceId: p.id,
      sourceTitle: p.title || p.rfpTitle,
      client: p.client,
      uploadedDate: p.submittedDate, // strictly derived from proposal
      status: isWon ? 'Awarded' : 'Archived',
      indexedInHindsight: true,
      fileSizeFormatted: '4.8 MB',
    };
  });

  // 3. Organization verified compliance artifacts — dates match attestation record
  const complianceDocs: CanonicalDocument[] = [
    {
      id: 'doc-soc2-attestation',
      name: 'SOC 2 Type II Independent Auditor Attestation Report.pdf',
      type: 'Compliance Artifact',
      sourceId: 'SOC2-2026-DELOITTE',
      sourceTitle: 'SOC 2 Type II Attestation',
      client: COMPANY_IDENTITY.name,
      uploadedDate: COMPANY_IDENTITY.complianceAttestation.attestationDate, // '2026-08-14'
      status: 'Verified',
      indexedInHindsight: true,
      fileSizeFormatted: '1.2 MB',
    },
    {
      id: 'doc-telemetry-blueprint',
      name: 'Cloud Telemetry & Rollback Checkpoint Architecture Blueprint.pdf',
      type: 'Technical Architecture',
      sourceId: 'rfp-001',
      sourceTitle: 'Enterprise Cloud Migration Platform',
      client: 'Northstar Global Financial',
      uploadedDate: rfps[0]?.receivedDate || '2026-09-15', // strictly matches RFP-001
      status: 'Verified',
      indexedInHindsight: true,
      fileSizeFormatted: '3.1 MB',
    },
  ];

  return [...rfpDocs, ...proposalDocs, ...complianceDocs];
}

export const canonicalDocuments: CanonicalDocument[] = buildCanonicalDocuments();
