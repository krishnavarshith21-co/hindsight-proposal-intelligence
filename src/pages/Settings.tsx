import { useState } from 'react';
import { COMPANY_IDENTITY } from '../data/organization';
import { canonicalUsers } from '../data/users';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'parameters' | 'profile' | 'security'>('parameters');
  const [similarityThreshold, setSimilarityThreshold] = useState(() => {
    return localStorage.getItem('hindsight_similarity_threshold') || '75';
  });
  const [autoIndexOutcomes, setAutoIndexOutcomes] = useState(() => {
    return localStorage.getItem('hindsight_auto_index') !== 'false';
  });
  const [requireComplianceSignoff, setRequireComplianceSignoff] = useState(() => {
    return localStorage.getItem('hindsight_compliance_signoff') !== 'false';
  });
  const [savedToast, setSavedToast] = useState(false);

  const currentUser = canonicalUsers[0];

  const handleSave = () => {
    localStorage.setItem('hindsight_similarity_threshold', similarityThreshold);
    localStorage.setItem('hindsight_auto_index', String(autoIndexOutcomes));
    localStorage.setItem('hindsight_compliance_signoff', String(requireComplianceSignoff));
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  return (
    <div className="page fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: '4px' }}>
            <span className="badge badge-accent">SYSTEM CONFIGURATION</span>
            <span className="badge badge-neutral">{COMPANY_IDENTITY.disclaimerBadge}</span>
          </div>
          <h1 className="display">Settings & Governance</h1>
          <div className="page-subtitle">Retrieval parameters, canonical team identity, and SOC-2 audit governance</div>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          {savedToast ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="tab-row">
        {[
          { key: 'parameters', label: 'Memory & Retrieval' },
          { key: 'profile', label: 'Team Profile' },
          { key: 'security', label: 'Security & Audit' },
        ].map(tab => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key as any)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'parameters' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', maxWidth: '720px' }}>
          <div className="panel">
            <div className="label-accent" style={{ marginBottom: '2px' }}>Retrieval Thresholds</div>
            <div className="heading" style={{ marginBottom: 'var(--sp-2)' }}>Local Retrieval Relevance Sensitivity</div>
            <p className="meta" style={{ lineHeight: '1.5', marginBottom: 'var(--sp-4)' }}>
              Local score filter for historical proposal retrospectives to qualify as active evidence when analyzing incoming tender requirements.
            </p>
            <div className="field" style={{ maxWidth: '360px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-1)' }}>
                <label className="field-label" style={{ margin: 0 }}>Minimum Matching Score</label>
                <span className="mono" style={{ color: 'var(--accent-text)' }}>{similarityThreshold}%</span>
              </div>
              <input
                type="range" min="50" max="90"
                value={similarityThreshold}
                onChange={e => setSimilarityThreshold(e.target.value)}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2px', fontSize: 'var(--fs-nano)', color: 'var(--text-4)' }}>
                <span>50% (Broad Precedent Recall)</span>
                <span>90% (Strict Domain Match)</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="label-accent" style={{ marginBottom: '2px' }}>Operational Governance</div>
            <div className="heading" style={{ marginBottom: 'var(--sp-3)' }}>Automated Experience Ingestion</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', cursor: 'pointer' }}>
                <input type="checkbox" checked={autoIndexOutcomes} onChange={e => setAutoIndexOutcomes(e.target.checked)} style={{ accentColor: 'var(--accent)' }} />
                <div>
                  <div style={{ color: 'var(--text-1)', fontSize: 'var(--fs-body)' }}>Auto-index outcome debriefs on submission</div>
                  <div className="meta">Immediately encodes win/loss root causes into the organizational memory graph for future RFP recall</div>
                </div>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', cursor: 'pointer' }}>
                <input type="checkbox" checked={requireComplianceSignoff} onChange={e => setRequireComplianceSignoff(e.target.checked)} style={{ accentColor: 'var(--accent)' }} />
                <div>
                  <div style={{ color: 'var(--text-1)', fontSize: 'var(--fs-body)' }}>Enforce compliance verification before proposal release</div>
                  <div className="meta">Verifies that executive summary claims reference certified corporate audit records</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="panel" style={{ maxWidth: '720px' }}>
          <div className="label-accent" style={{ marginBottom: '2px' }}>Strategist Profile</div>
          <div className="heading" style={{ marginBottom: 'var(--sp-4)' }}>Canonical Team Credentials</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
            <div className="field">
              <label className="field-label">Name</label>
              <input type="text" className="field-input" defaultValue={currentUser.name} />
            </div>
            <div className="field">
              <label className="field-label">Role</label>
              <input type="text" className="field-input" defaultValue={currentUser.role} />
            </div>
          </div>
          <div className="field" style={{ marginBottom: 'var(--sp-3)' }}>
            <label className="field-label">Email</label>
            <input type="email" className="field-input" defaultValue={currentUser.email} />
          </div>
          <div className="field">
            <label className="field-label">Organization</label>
            <input type="text" className="field-input" defaultValue={COMPANY_IDENTITY.name} />
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="panel" style={{ maxWidth: '720px' }}>
          <div className="label-accent" style={{ marginBottom: '2px' }}>Governance</div>
          <div className="heading" style={{ marginBottom: 'var(--sp-2)' }}>Data Isolation & Confidentiality</div>
          <p className="meta" style={{ lineHeight: '1.6', marginBottom: 'var(--sp-4)' }}>
            All historical tender specifications, competitor debriefs, and pricing records are cryptographically partitioned in isolated client tenant shards. Zero data is shared across external model training corpora.
          </p>
          <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: 'var(--sp-3)' }}>
            <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)' }}>
              ● {COMPANY_IDENTITY.complianceAttestation.standard}: {COMPANY_IDENTITY.complianceAttestation.status}
            </div>
            <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)', marginTop: '2px' }}>
              LAST ATTESTATION: {COMPANY_IDENTITY.complianceAttestation.attestationDate} · AUDITOR: {COMPANY_IDENTITY.complianceAttestation.auditor}
            </div>
            <div className="meta" style={{ marginTop: 'var(--sp-2)', fontSize: 'var(--fs-nano)' }}>
              Provenance: Attestation file stored in corporate compliance artifacts (valid through {COMPANY_IDENTITY.complianceAttestation.validThrough}).
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
