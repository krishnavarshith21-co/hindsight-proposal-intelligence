import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';

export default function RFPWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rfps, memories } = useMemory();
  const rfp = rfps.find(r => r.id === id) || rfps[0];

  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisStage, setSynthesisStage] = useState<number>(6);
  const [appliedInsights, setAppliedInsights] = useState<string[]>(['rec-1']);

  const relevantProposals = memories
    .filter(p => p.industry === rfp.industry || p.tags.some(t => rfp.tags.includes(t)))
    .slice(0, 3);

  const startMemoryRecall = () => {
    setIsSynthesizing(true);
    setSynthesisStage(1);
    const steps = [
      { step: 1, delay: 280 }, { step: 2, delay: 560 }, { step: 3, delay: 840 },
      { step: 4, delay: 1120 }, { step: 5, delay: 1400 }, { step: 6, delay: 1680 },
    ];
    steps.forEach(({ step, delay }) => {
      setTimeout(() => { setSynthesisStage(step); if (step === 6) setIsSynthesizing(false); }, delay);
    });
  };

  const handleApplyInsight = (recId: string) => {
    if (!appliedInsights.includes(recId)) setAppliedInsights([...appliedInsights, recId]);
  };

  return (
    <div className="page fade-in">
      {/* Header with Breadcrumbs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--sp-3)', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--border-1)', marginBottom: 'var(--sp-4)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 'var(--sp-2)' }}>
            <button onClick={() => navigate('/rfps')} style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: 'var(--fs-small)', cursor: 'pointer', padding: 0 }}>RFPs</button>
            <span style={{ color: 'var(--text-4)', fontSize: 'var(--fs-micro)' }}>/</span>
            <span className="badge badge-accent">{rfp.id.toUpperCase()}</span>
            <span style={{ color: 'var(--text-4)', fontSize: 'var(--fs-micro)' }}>/</span>
            <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)' }}>{rfp.client}</span>
          </div>
          <h1 className="page-header-title">{rfp.title}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--sp-3)', marginTop: 'var(--sp-2)', fontSize: 'var(--fs-small)', color: 'var(--text-3)' }}>
            <span>Value: <strong style={{ color: 'var(--text-1)' }}>{rfp.budget}</strong></span>
            <span>Deadline: <strong style={{ color: 'var(--text-1)' }}>{rfp.deadline}</strong></span>
            <span>Sector: <strong style={{ color: 'var(--text-1)' }}>{rfp.industry}</strong></span>
            <span>Strategist: <strong style={{ color: 'var(--text-1)' }}>{rfp.assignee || 'Sarah Chen'}</strong></span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button className="btn btn-outline btn-sm" onClick={startMemoryRecall} disabled={isSynthesizing}>
            {isSynthesizing ? 'Recalling…' : 'Recall Precedents'}
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/proposal')}>
            Proposal Editor ({appliedInsights.length}) →
          </button>
        </div>
      </div>

      {/* Recall Pipeline */}
      {isSynthesizing && (
        <div style={{ padding: 'var(--sp-3) var(--sp-4)', border: '1px solid var(--accent-border)', background: 'var(--surface-1)', borderRadius: 'var(--r-md)', marginBottom: 'var(--sp-4)', animation: 'fadeIn var(--t-fast)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-2)' }}>
            <span className="label-accent">HINDSIGHT RECALL</span>
            <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)' }}>STAGE {synthesisStage}/6</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span className="mono" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)' }}>
              {synthesisStage === 1 && '01 // Reading RFP requirements'}
              {synthesisStage === 2 && '02 // Recalling organizational experience'}
              {synthesisStage === 3 && '03 // 7 relevant memories matched'}
              {synthesisStage === 4 && '04 // Comparing win/loss outcomes'}
              {synthesisStage === 5 && '05 // 2 patterns detected'}
              {synthesisStage === 6 && '06 // Recommendation prepared'}
            </span>
            <div style={{ flex: 1, height: '3px', background: 'var(--surface-3)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(synthesisStage / 6) * 100}%`, background: 'var(--accent)', transition: 'width 200ms ease' }} />
            </div>
          </div>
        </div>
      )}

      {/* 3-Column Workspace */}
      <div className="workspace">
        {/* Zone 1: Tender Specification */}
        <section className="workspace-zone">
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>ZONE 01</div>
                <div className="panel-title">Tender Specification</div>
              </div>
              <span className="badge badge-neutral">{rfp.requirements.length} Req</span>
            </div>

            <div>
              <div className="label" style={{ marginBottom: 'var(--sp-1)' }}>SCOPE</div>
              <p style={{ color: 'var(--text-2)', fontSize: 'var(--fs-body)', lineHeight: 1.6 }}>{rfp.description}</p>
            </div>

            <div>
              <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>REQUIREMENTS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
                {rfp.requirements.map((req, idx) => (
                  <div key={idx} style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)', fontSize: 'var(--fs-small)' }}>
                    <span className="mono" style={{ color: 'var(--accent-text)', marginRight: 'var(--sp-2)', fontSize: 'var(--fs-micro)' }}>REQ-0{idx + 1}</span>
                    <span style={{ color: 'var(--text-1)' }}>{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>EVALUATION CRITERIA</div>
              {rfp.evaluationCriteria.map((crit, idx) => (
                <div key={idx} style={{ paddingBottom: 'var(--sp-2)', borderBottom: '1px solid var(--border-1)', marginBottom: 'var(--sp-2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-1)' }}>
                    <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)', fontWeight: 500 }}>{crit.name}</span>
                    <span className="mono" style={{ fontSize: 'var(--fs-micro)', color: 'var(--accent-text)' }}>{crit.weight}%</span>
                  </div>
                  <div className="meter-bar"><div className="meter-fill" style={{ width: `${crit.weight * 2}%` }} /></div>
                  <div className="meta" style={{ marginTop: 'var(--sp-1)' }}>{crit.description}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>TECH CONSTRAINTS</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-1)' }}>
                {rfp.technicalRequirements.map((tech, idx) => (
                  <span key={idx} className="badge badge-neutral">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Zone 2: Strategy Synthesis */}
        <section className="workspace-zone">
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
              <div>
                <div className="label-accent" style={{ marginBottom: '2px' }}>ZONE 02</div>
                <div className="panel-title">Strategy Synthesis</div>
              </div>
              <span className="badge badge-accent">2 Patterns</span>
            </div>

            <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
              <div className="label-accent" style={{ marginBottom: 'var(--sp-1)' }}>EXECUTIVE BRIEF</div>
              <p style={{ color: 'var(--text-1)', fontSize: 'var(--fs-body)', lineHeight: 1.5 }}>
                Historical tenders indicate this client profile penalizes monolithic cutovers but awards preference to rollback guarantees and governance checkpoints.
              </p>
            </div>

            {/* Chain 1 */}
            <div style={{ border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)', padding: 'var(--sp-3)', background: 'var(--surface-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-2)' }}>
                <span className="badge badge-positive">PROVENANCE: 3 HISTORICAL PRECEDENTS</span>
                <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>Grounded</span>
              </div>
              <div className="flow">
                <div className="flow-step"><div className="flow-step-label">EVIDENCE</div><div className="flow-step-content" style={{ fontSize: 'var(--fs-small)' }}><strong>3 past proposals</strong> in Financial Services (#PROP-021 Won, #PROP-044 Won, #PROP-014 Lost).</div></div>
                <div className="flow-step"><div className="flow-step-label">PATTERN</div><div className="flow-step-content" style={{ fontSize: 'var(--fs-small)' }}>Winning bids structured <strong>3 zero-downtime phases</strong> with rollback checkpoints (#PROP-044, #PROP-052).</div></div>
                <div className="flow-step"><div className="flow-step-label">RECOMMENDATION</div><div className="flow-step-content" style={{ color: 'var(--text-1)', fontSize: 'var(--fs-small)' }}><strong>Structure Section 4 as phased migration with quarterly verification gates.</strong></div></div>
                <div className="flow-step"><div className="flow-step-label">WHY</div><div className="flow-step-content" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)' }}>Directly addresses implementation risk weighting ({rfp.evaluationCriteria.find(c => c.name.includes('Timeline') || c.name.includes('Risk'))?.weight || 25}%).</div></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--sp-2)', borderTop: '1px solid var(--border-1)', marginTop: 'var(--sp-2)' }}>
                <button className={`btn btn-sm ${appliedInsights.includes('rec-1') ? 'btn-outline' : 'btn-primary'}`} onClick={() => handleApplyInsight('rec-1')}>
                  {appliedInsights.includes('rec-1') ? '✓ Injected' : 'Apply to Draft'}
                </button>
              </div>
            </div>

            {/* Chain 2 */}
            <div style={{ border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)', padding: 'var(--sp-3)', background: 'var(--surface-2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-2)' }}>
                <span className="badge badge-neutral">COMMERCIAL SAFEGUARD</span>
                <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>Grounded</span>
              </div>
              <div className="flow">
                <div className="flow-step"><div className="flow-step-label">EVIDENCE</div><div className="flow-step-content" style={{ fontSize: 'var(--fs-small)' }}>#PROP-061 (Lost) cited lack of store-level commercial ROI in technical platform architecture.</div></div>
                <div className="flow-step"><div className="flow-step-label">PATTERN</div><div className="flow-step-content" style={{ fontSize: 'var(--fs-small)' }}>Enterprise procurement mandates <strong>capped run-rate models</strong> over open-ended retainers.</div></div>
                <div className="flow-step"><div className="flow-step-label">RECOMMENDATION</div><div className="flow-step-content" style={{ color: 'var(--text-1)', fontSize: 'var(--fs-small)' }}><strong>Structure Section 5 with capped managed-service pods</strong> and transparent 3-year TCO projections.</div></div>
                <div className="flow-step"><div className="flow-step-label">WHY</div><div className="flow-step-content" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)' }}>Preempts competitor undercut on upfront implementation.</div></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--sp-2)', borderTop: '1px solid var(--border-1)', marginTop: 'var(--sp-2)' }}>
                <button className={`btn btn-sm ${appliedInsights.includes('rec-2') ? 'btn-outline' : 'btn-primary'}`} onClick={() => handleApplyInsight('rec-2')}>
                  {appliedInsights.includes('rec-2') ? '✓ Injected' : 'Apply to Draft'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Zone 3: Empirical Precedents */}
        <section className="workspace-zone">
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
              <div>
                <div className="label" style={{ marginBottom: '2px' }}>ZONE 03</div>
                <div className="panel-title">Precedents</div>
              </div>
              <span className="badge badge-neutral">{relevantProposals.length} Recalled</span>
            </div>

            <div className="meta">Relevant proposals matching industry and architecture:</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
              {relevantProposals.map(proposal => {
                const isWon = proposal.outcome === 'won' || proposal.outcome === 'WON';
                return (
                  <div key={proposal.id} style={{ border: '1px solid var(--border-1)', background: 'var(--surface-2)', padding: 'var(--sp-3)', borderRadius: 'var(--r-sm)', cursor: 'pointer', transition: 'all var(--t-fast)' }} onClick={() => navigate(`/memory?q=${proposal.id}`)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-1)' }}>
                      <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)', fontWeight: 500 }}>#{proposal.id.toUpperCase()}</span>
                      <span className={`status ${isWon ? 'status-won' : 'status-lost'}`} style={{ fontSize: 'var(--fs-nano)' }}>
                        <span className="status-dot" />{proposal.outcome.toUpperCase()} · {proposal.budget}
                      </span>
                    </div>
                    <div style={{ fontWeight: 500, color: 'var(--text-1)', fontSize: 'var(--fs-body)', marginBottom: '2px' }}>{proposal.rfpTitle}</div>
                    <div className="meta" style={{ marginBottom: 'var(--sp-2)' }}>{proposal.client} · {proposal.industry}</div>
                    <div style={{ padding: 'var(--sp-2)', background: 'var(--surface-3)', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-1)' }}>
                      <div className="label" style={{ color: isWon ? 'var(--positive-text)' : 'var(--negative-text)', marginBottom: '2px' }}>
                        {isWon ? 'WIN FACTOR' : 'POST-MORTEM'}
                      </div>
                      <div style={{ fontSize: 'var(--fs-micro)', color: 'var(--text-2)', lineHeight: 1.4 }}>
                        {proposal.clientFeedback || (isWon ? proposal.successReasons?.[0] : proposal.failureReasons?.[0])}
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--sp-2)', paddingTop: 'var(--sp-2)', borderTop: '1px solid var(--border-1)' }}>
                      <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>● MATCH: #{proposal.id.toUpperCase()}</span>
                      <span style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>Inspect →</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 'auto', padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
              <div className="label-accent" style={{ marginBottom: '2px' }}>MEMORY LOOP</div>
              <p className="meta" style={{ lineHeight: 1.5 }}>
                When this RFP concludes, logging outcome debriefs will update the memory graph.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
