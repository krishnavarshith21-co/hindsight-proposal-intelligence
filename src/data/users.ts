// ============================================================
// CANONICAL USERS & TEAM IDENTITY
// ============================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarInitials: string;
  assignedRfpIds: string[];
}

export const canonicalUsers: TeamMember[] = [
  {
    id: 'user-001',
    name: 'Sarah Chen',
    role: 'VP of Proposal Strategy',
    email: 'sarah.chen@apexdigital.demo',
    avatarInitials: 'SC',
    assignedRfpIds: ['rfp-001', 'rfp-003'],
  },
  {
    id: 'user-002',
    name: 'Marcus Webb',
    role: 'Lead Infrastructure Architect',
    email: 'marcus.webb@apexdigital.demo',
    avatarInitials: 'MW',
    assignedRfpIds: ['rfp-002', 'rfp-004'],
  },
];

export const defaultUser = canonicalUsers[0];
