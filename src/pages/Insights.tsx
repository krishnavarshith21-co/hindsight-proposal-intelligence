import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';
import { canonicalSourcedInsights } from '../data';

export default function Insights() {
  const navigate = useNavigate();
  const { memories, injectRecommendation } = useMemory();
  const [activeTab, setActiveTab] = useState<'decision-support' | 'strategy-shift' | 'common-factors'>('decision-support');
  const [appliedToast, setAppliedToast] = useState<string | null>(null);

  const wonProposals = memories.filter(p => p.outcome === 'won' || p.outcome === 'WON');
  const lostProposals = memories.filter(p => p.outcome === 'lost' || p.outcome === 'LOST');

  // Deterministic 2026 cohort calculations
  const early2026 = memories.filter(p => (p.submittedDate || '').localeCompare('2026-07-01') < 0);
  const earlyWon = early2026.filter(p => p.outcome === 'won' || p.outcome === 'WON').length;
  const earlyWinRate = early2026.length > 0 ? Math.round((earlyWon / early2026.length) * 100) : 0;

  const late2026 = memories.filter(p => (p.submittedDate || '').localeCompare('2026-07-01') >= 0);
  const lateWon = late2026.filter(p => p.outcome === 'won' || p.outcome === 'WON').length;
  const lateWinRate = late2026.length > 0 ? Math.round((lateWon / late2026.length) * 100) : 0;

  const handleApplyOpportunity = () => {
    injectRecommendation(
      'implementation',
      'Execution is structured into three sequential rollback-gated phases: Phase 1 (Non-clearing telemetry validation), Phase 2 (Secondary partition cutover), and Phase 3 (Primary ledger migration with guaranteed rollback checkpoints).',
      '#PROP-093 & #PROP-044 — Historical Precedent'
    );
    setAppliedToast('Applied phased deployment language to active proposal draft');
    setTimeout(() => setAppliedToast(null), 3500);
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-header-left">
          <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)', fontWeight: 600, marginBottom: '2px' }}>
            PROPOSAL INTELLIGENCE
          </div>
          <h1 className="page-header-title">Strategic Insights</h1>
          <div className="page-subtitle" style={{ fontStyle: 'italic', color: 'var(--text-2)' }}>
            "Where organizational memory is influencing current work"
          </div>
        </div>

        <div className="tab-row" style={{ margin: 0 }}>
          <button
            className={`tab-btn ${activeTab === 'decision-support' ? 'active' : ''}`}
            onClick={() => setActiveTab('decision-support')}
          >
            Decision Support
          </button>
          <button
            className={`tab-btn ${activeTab === 'strategy-shift' ? 'active' : ''}`}
            onClick={() => setActiveTab('strategy-shift')}
          >
            Strategy Evolution
          </button>
          <button
            className={`tab-btn ${activeTab === 'common-factors' ? 'active' : ''}`}
            onClick={() => setActiveTab('common-factors')}
          >
            Win / Loss Breakdown
          </button>
        </div>
      </div>

      {appliedToast && (
        <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)', color: 'var(--accent-text)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeIn var(--t-fast)' }}>
          <span>✓ {appliedToast}</span>
          <button className="btn btn-outline btn-xs" onClick={() => navigate('/proposal')}>
            Open Editor →
          </button>
        </div>
      )}

      {/* TAB 1: DECISION-SUPPORT WORKSPACE */}
      {activeTab === 'decision-support' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {/* Card 1: GOVERNANCE EVIDENCE */}
          <div className="panel" style={{ borderLeft: '3px solid var(--positive)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              <div>
                <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)', fontWeight: 600 }}>
                  EMPIRICAL PRECEDENT · 2 HISTORICAL WINS
                </span>
                <h3 style={{ fontSize: 'var(--fs-card-title)', fontWeight: 600, color: 'var(--text-1)', marginTop: '2px' }}>
                  Lead with compliance evidence
                </h3>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/memory')}>
                Inspect
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-3)', marginTop: 'var(--sp-2)', padding: 'var(--sp-3)', background: 'var(--surface-2)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-1)' }}>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>Evidence:</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="badge badge-positive" style={{ cursor: 'pointer' }} onClick={() => navigate('/memory')}>
                    #PROP-021 (Won)
                  </span>
                  <span className="badge badge-positive" style={{ cursor: 'pointer' }} onClick={() => navigate('/memory')}>
                    #PROP-044 (Won)
                  </span>
                </div>
              </div>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>Current RFP:</div>
                <div style={{ fontSize: 'var(--fs-small)', fontWeight: 500, color: 'var(--text-1)' }}>
                  Enterprise Cloud Migration — Northstar Global Financial (RFP-001)
                </div>
              </div>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>Observed Outcome:</div>
                <div className="meta" style={{ color: 'var(--text-1)' }}>
                  Supported by #PROP-021 and #PROP-044. Both proposals won in regulated sectors after placing compliance evidence upfront.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: RISK */}
          <div className="panel" style={{ borderLeft: '3px solid var(--negative)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              <div>
                <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--negative-text)', fontWeight: 600 }}>
                  RISK ALERT · 2 PREVIOUS LOSSES
                </span>
                <h3 style={{ fontSize: 'var(--fs-card-title)', fontWeight: 600, color: 'var(--text-1)', marginTop: '2px' }}>
                  Compressed timelines trigger execution risk disqualifications
                </h3>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('/memory-in-action')}>
                Review
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-3)', marginTop: 'var(--sp-2)', padding: 'var(--sp-3)', background: 'var(--surface-2)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-1)' }}>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>Historical Evidence:</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="badge badge-negative" style={{ cursor: 'pointer' }} onClick={() => navigate('/memory')}>
                    #PROP-014 (Lost)
                  </span>
                  <span className="badge badge-negative" style={{ cursor: 'pointer' }} onClick={() => navigate('/memory')}>
                    #PROP-081 (Lost)
                  </span>
                </div>
              </div>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>RFP-001 Schedule:</div>
                <div style={{ fontSize: 'var(--fs-small)', fontWeight: 500, color: 'var(--text-1)' }}>
                  18 months with 3 phased cutovers (avoids sub-12mo compressed risk)
                </div>
              </div>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>Remediation:</div>
                <div className="meta" style={{ color: 'var(--text-2)' }}>
                  Structure into 3 isolated phases with 45-day stabilization gates and rollback checkpoints.
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: OPPORTUNITY */}
          <div className="panel" style={{ borderLeft: '3px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--sp-2)', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              <div>
                <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)', fontWeight: 600 }}>
                  OPPORTUNITY · GROUNDED IN #PROP-093 & #PROP-052
                </span>
                <h3 style={{ fontSize: 'var(--fs-card-title)', fontWeight: 600, color: 'var(--text-1)', marginTop: '2px' }}>
                  Phased deployment language has strong historical support.
                </h3>
              </div>
              <button className="btn btn-primary btn-sm" onClick={handleApplyOpportunity}>
                Apply
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--sp-3)', marginTop: 'var(--sp-2)', padding: 'var(--sp-3)', background: 'var(--surface-2)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-1)' }}>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>Precedents:</div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="badge badge-neutral">#PROP-093 (Won)</span>
                  <span className="badge badge-neutral">#PROP-052 (Won)</span>
                </div>
              </div>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>Target Section:</div>
                <div style={{ fontSize: 'var(--fs-small)', fontWeight: 500, color: 'var(--text-1)' }}>
                  Section 4 — Implementation Methodology & Phased Cutover
                </div>
              </div>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>Strategic Rationale:</div>
                <div className="meta" style={{ color: 'var(--accent-text)' }}>
                  Addresses Northstar's 25% evaluation weighting on implementation risk.
                </div>
              </div>
            </div>
          </div>

          {/* Emerging Intelligence Feed */}
          <div style={{ marginTop: 'var(--sp-3)' }}>
            <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>EMERGING PATTERNS DETECTED ACROSS PREVIOUS DEBRIEFS</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-3)' }}>
              {canonicalSourcedInsights.slice(0, 2).map(item => (
                <div key={item.id} className="panel panel-compact">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>{item.category.toUpperCase()}</span>
                    <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)' }}>
                      Supported by {item.sourceProposals.length} experiences
                    </span>
                  </div>
                  <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-1)', marginBottom: '4px' }}>{item.insight}</div>
                  <p className="meta" style={{ lineHeight: 1.5, marginBottom: 'var(--sp-2)' }}>{item.derivedObservation}</p>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {item.sourceProposals.map(id => (
                      <span key={id} className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)' }}>{id}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STRATEGY EVOLUTION */}
      {activeTab === 'strategy-shift' && (
        <div className="panel">
          <div className="label" style={{ marginBottom: '2px' }}>CANONICAL DATASET SCOPE & HISTORICAL OBSERVATION</div>
          <div className="heading" style={{ marginBottom: 'var(--sp-2)' }}>
            Insufficient historical data for 2025 → 2026 longitudinal comparison
          </div>
          <p className="body" style={{ maxWidth: '780px', marginBottom: 'var(--sp-4)', color: 'var(--text-2)', lineHeight: 1.6 }}>
            The canonical dataset contains 10 historical proposal records submitted between March 2026 and September 2026.
            Because prior year (2025) records are not present in the canonical repository, multi-year trend percentages are not fabricated.
            Instead, below is the deterministically calculated evolution across the two 2026 cohorts:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--sp-4)', borderTop: '1px solid var(--border-1)', paddingTop: 'var(--sp-4)' }}>
            <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
              <div className="flow-step-label">EARLY 2026 COHORT (MARCH – JUNE 2026)</div>
              <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)', fontWeight: 600, margin: 'var(--sp-1) 0' }}>
                Initial 5 Bids (PROP-014 through PROP-061)
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-2)', marginBottom: 'var(--sp-2)' }}>
                <span className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--text-1)' }}>{earlyWinRate}% Win Rate</span>
                <span className="meta">({earlyWon} won / {early2026.length} total)</span>
              </div>
              <div className="meta" style={{ lineHeight: 1.5 }}>
                2 losses occurred (#PROP-014, #PROP-061) due to compressed unbuffered timelines and technical platform architecture disconnected from business ROI.
              </div>
            </div>

            <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
              <div className="flow-step-label" style={{ color: 'var(--positive-text)' }}>LATE 2026 COHORT (JULY – SEPTEMBER 2026)</div>
              <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)', fontWeight: 600, margin: 'var(--sp-1) 0' }}>
                Subsequent 5 Bids (PROP-073 through PROP-112)
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-2)', marginBottom: 'var(--sp-2)' }}>
                <span className="stat-value" style={{ fontSize: '1.25rem', color: 'var(--positive-text)' }}>{lateWinRate}% Win Rate</span>
                <span className="meta">({lateWon} won / {late2026.length} total)</span>
              </div>
              <div className="meta" style={{ lineHeight: 1.5 }}>
                4 of 5 bids won. Proposals systematically incorporated explicit rollback checkpoints (#PROP-073, #PROP-093), upfront compliance artifacts (#PROP-104), and retail operational freeze windows (#PROP-112).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMMON FACTORS */}
      {activeTab === 'common-factors' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
          <div className="panel">
            <div className="flow-step-label" style={{ color: 'var(--positive-text)' }}>Won Proposals ({wonProposals.length})</div>
            <div className="heading" style={{ marginTop: '2px', marginBottom: 'var(--sp-3)' }}>Correlated Win Factors</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {[
                { label: 'Dedicated Rollback Guarantees', tag: 'rollback', desc: 'Proposals with explicit fallback criteria scored highest on technical governance.' },
                { label: 'Upfront Compliance Evidence', tag: 'compliance', desc: 'Leading with audited regulatory artifacts established immediate trust.' },
                { label: 'Phased Cutover Architecture', tag: 'phased', desc: 'Multi-phase gates with stabilization buffers eliminated committee anxiety.' },
              ].map((item, i) => (
                <div key={i} style={{ paddingBottom: 'var(--sp-2)', borderBottom: i < 2 ? '1px solid var(--border-1)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)', fontWeight: 500 }}>{i + 1}. {item.label}</span>
                    <span className="mono" style={{ color: 'var(--positive-text)', fontSize: 'var(--fs-nano)' }}>
                      {wonProposals.filter(p => (p.memoryTags || p.tags)?.some(t => t.includes(item.tag))).length} of {wonProposals.length}
                    </span>
                  </div>
                  <p className="meta" style={{ lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel">
            <div className="flow-step-label" style={{ color: 'var(--negative-text)' }}>Lost Proposals ({lostProposals.length})</div>
            <div className="heading" style={{ marginTop: '2px', marginBottom: 'var(--sp-3)' }}>Recurring Defeat Factors</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {[
                { label: 'Aggressive Unbuffered Timelines', tags: ['timeline', 'execution risk'], desc: 'Sub-12-month delivery without buffers perceived as unacceptable risk.' },
                { label: 'Architecture Disconnected from ROI', tags: ['business value'], desc: 'Heavy architecture focus without clear store-level ROI caused disqualification.' },
                { label: 'Lack of Verified Rollback Planning', tags: ['rollback'], desc: 'Compressed migrations without fallback checkpoints triggered failure.' },
              ].map((item, i) => (
                <div key={i} style={{ paddingBottom: 'var(--sp-2)', borderBottom: i < 2 ? '1px solid var(--border-1)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)', fontWeight: 500 }}>{i + 1}. {item.label}</span>
                    <span className="mono" style={{ color: 'var(--negative-text)', fontSize: 'var(--fs-nano)' }}>
                      {lostProposals.filter(p => (p.memoryTags || p.tags)?.some(t => item.tags.some(tag => t.includes(tag)))).length} of {lostProposals.length}
                    </span>
                  </div>
                  <p className="meta" style={{ lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
