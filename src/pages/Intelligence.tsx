import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';

interface DetailedRecommendation {
  id: string;
  recNumber: string;
  title: string;
  confidence: string;
  basedOn: string[];
  currentSignal: string;
  retrievedMemories: { id: string; outcome: 'won' | 'lost'; client: string; note: string }[];
  pattern: string;
  specificRecommendation: string;
  targetSection: string;
  snippetToInject: string;
}

const canonicalRecommendations: DetailedRecommendation[] = [
  {
    id: 'rec-01',
    recNumber: '01',
    title: 'Lead with compliance and security credentials.',
    confidence: 'Supported by 3 winning precedents',
    basedOn: ['#PROP-021', '#PROP-073', '#PROP-093'],
    currentSignal: 'Northstar Global Financial mandates sub-50ms transaction latency and strict regulatory compliance.',
    retrievedMemories: [
      { id: '#PROP-021', outcome: 'won', client: 'Harbor Health Network', note: 'Early compliance proof built evaluator trust.' },
      { id: '#PROP-073', outcome: 'won', client: 'Beacon Financial Services', note: 'Connected audit controls to business risk.' },
      { id: '#PROP-093', outcome: 'won', client: 'Horizon Asset Management', note: 'Compliance front-loaded in executive summary.' },
      { id: '#PROP-014', outcome: 'lost', client: 'Northstar Bank', note: 'Failed to address regulatory cutover early.' },
    ],
    pattern: 'Regulated buyers prioritize verifiable audit credentials over speed promises.',
    specificRecommendation: 'Present SOC 2 Type II artifacts and zero-disruption SLAs in Section 1.',
    targetSection: 'executive-summary',
    snippetToInject: 'Our delivery model leads with upfront SOC 2 Type II audit artifacts, regulatory compliance evidence and an audited zero-disruption SLA guarantee.',
  },
  {
    id: 'rec-02',
    recNumber: '02',
    title: 'Structure delivery into three sequential phased cutover gates.',
    confidence: 'Supported by 3 wins and 1 loss debrief',
    basedOn: ['#PROP-093', '#PROP-052', '#PROP-044', '#PROP-014'],
    currentSignal: 'Evaluation committee penalizes downtime risk across 12 branch networks.',
    retrievedMemories: [
      { id: '#PROP-014', outcome: 'lost', client: 'Northstar Bank', note: 'Aggressive 12-month delivery rejected on execution risk.' },
      { id: '#PROP-044', outcome: 'won', client: 'Crestline Insurance Group', note: 'Rollback checkpoints praised as lowest-risk.' },
      { id: '#PROP-052', outcome: 'won', client: 'Summit Federal Bank', note: 'Staged implementation gave committee confidence.' },
      { id: '#PROP-093', outcome: 'won', client: 'Horizon Asset Management', note: 'Phased + rollback + compliance was decisive.' },
    ],
    pattern: 'Aggressive timelines create risk concerns; staged delivery with rollback wins.',
    specificRecommendation: 'Position delivery as 3 sequential pilot gates with rollback checkpoints.',
    targetSection: 'implementation',
    snippetToInject: 'Execution is structured into three sequential rollback-gated phases: Phase 1 (Non-clearing telemetry), Phase 2 (Secondary partition), Phase 3 (Primary ledger with rollback checkpoints).',
  },
  {
    id: 'rec-03',
    recNumber: '03',
    title: 'Provide transparent, capped monthly capacity pod pricing.',
    confidence: 'Supported by 2 precedents',
    basedOn: ['#PROP-044', '#PROP-061'],
    currentSignal: 'Procurement requested predictable 3-year TCO.',
    retrievedMemories: [
      { id: '#PROP-061', outcome: 'lost', client: 'Pioneer Retail Holdings', note: 'Technical architecture lacked store-level commercial ROI.' },
      { id: '#PROP-044', outcome: 'won', client: 'Crestline Insurance Group', note: 'Capped pods won pricing rubric.' },
    ],
    pattern: 'Enterprise procurement rejects open-ended retainers; prefers capped run-rates.',
    specificRecommendation: 'Structure Section 6 with fixed pod tiers and 3-year TCO projections.',
    targetSection: 'solution',
    snippetToInject: 'Commercial terms are structured with fixed-capacity operational pods, capping run-rate expenses with zero unanticipated escalation.',
  },
];

export default function Intelligence() {
  const navigate = useNavigate();
  const { injectRecommendation, rfps } = useMemory();
  const [selectedRfpId, setSelectedRfpId] = useState('rfp-001');
  const [expandedRecId, setExpandedRecId] = useState<string | null>(null);
  const [appliedRecs, setAppliedRecs] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedRfp = rfps.find(r => r.id === selectedRfpId) || rfps[0];

  const handleApply = (rec: DetailedRecommendation) => {
    injectRecommendation(rec.targetSection, rec.snippetToInject, rec.basedOn.join(' & '));
    setAppliedRecs(prev => [...prev, rec.id]);
    setToastMessage(`Recommendation ${rec.recNumber} applied`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="page fade-in">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-header-title">Intelligence</h1>
          <div className="page-subtitle">Memory-grounded recommendations from 4 historical experiences</div>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => navigate('/memory-in-action')}>Memory Engine →</button>
      </div>

      {toastMessage && (
        <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)', color: 'var(--accent-text)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeIn var(--t-fast)' }}>
          <span>✓ {toastMessage}</span>
          <button className="btn btn-outline btn-xs" onClick={() => navigate('/proposal')}>Open Editor →</button>
        </div>
      )}

      {/* RFP Scope */}
      <div style={{ display: 'flex', gap: 'var(--sp-4)', alignItems: 'center', padding: 'var(--sp-2) var(--sp-4)', background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-md)', marginBottom: 'var(--sp-4)', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <select className="field-input field-select" value={selectedRfpId} onChange={e => setSelectedRfpId(e.target.value)} style={{ width: '100%' }}>
            {rfps.map(r => (<option key={r.id} value={r.id}>{r.title} — {r.client} ({r.budget})</option>))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-4)', fontSize: 'var(--fs-small)', color: 'var(--text-3)' }}>
          <span>Client: <strong style={{ color: 'var(--text-1)' }}>{selectedRfp.client}</strong></span>
          <span>Sector: <strong style={{ color: 'var(--text-1)' }}>{selectedRfp.industry}</strong></span>
          <span>Value: <strong style={{ color: 'var(--text-1)' }}>{selectedRfp.budget}</strong></span>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
        {canonicalRecommendations.map(rec => {
          const isApplied = appliedRecs.includes(rec.id);
          const isExpanded = expandedRecId === rec.id;
          return (
            <div key={rec.id} className="panel" style={{ transition: 'all var(--t-fast)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: '2px' }}>
                    <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>REC-{rec.recNumber}</span>
                    <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)' }}>{rec.confidence}</span>
                  </div>
                  <h3 style={{ fontSize: 'var(--fs-card-title)', fontWeight: 500, color: 'var(--text-1)' }}>{rec.title}</h3>
                </div>
                <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                  <button className={`btn btn-sm ${isApplied ? 'btn-outline' : 'btn-primary'}`} onClick={() => handleApply(rec)}>
                    {isApplied ? '✓ Applied' : 'Apply to Proposal'}
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setExpandedRecId(prev => prev === rec.id ? null : rec.id)} style={{ color: isExpanded ? 'var(--text-1)' : 'var(--text-3)' }}>
                    {isExpanded ? 'Hide ↑' : 'Evidence →'}
                  </button>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-1)', flexWrap: 'wrap' }}>
                <span className="label" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-4)' }}>BASED ON:</span>
                {rec.basedOn.map(propId => (
                  <span key={propId} className="badge badge-neutral" style={{ color: propId === '#PROP-014' ? 'var(--negative-text)' : 'var(--positive-text)', cursor: 'pointer' }} onClick={() => navigate('/memory')}>
                    {propId} {propId === '#PROP-014' ? '· LOST' : '· WON'}
                  </span>
                ))}
              </div>
              {isExpanded && (
                <div className="flow" style={{ marginTop: 'var(--sp-3)', borderTop: '1px solid var(--border-1)', paddingTop: 'var(--sp-3)', animation: 'fadeIn var(--t-fast)' }}>
                  <div className="flow-step">
                    <div className="flow-step-label">Current RFP Signal</div>
                    <div className="flow-step-content" style={{ color: 'var(--text-1)' }}>{rec.currentSignal}</div>
                  </div>
                  <div className="flow-step">
                    <div className="flow-step-label">Retrieved Memory</div>
                    <div className="flow-step-content">
                      {rec.retrievedMemories.map(m => (
                        <div key={m.id} style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'baseline', marginBottom: '2px' }}>
                          <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: m.outcome === 'won' ? 'var(--positive-text)' : 'var(--negative-text)' }}>{m.id} ({m.outcome.toUpperCase()})</span>
                          <span style={{ color: 'var(--text-2)', fontSize: 'var(--fs-small)' }}><strong>{m.client}:</strong> {m.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flow-step">
                    <div className="flow-step-label">Observed Pattern</div>
                    <div className="flow-step-content">{rec.pattern}</div>
                  </div>
                  <div className="flow-step" style={{ paddingBottom: 0 }}>
                    <div className="flow-step-label">Recommendation</div>
                    <div className="flow-step-content" style={{ color: 'var(--text-1)', fontWeight: 500 }}>{rec.specificRecommendation}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
