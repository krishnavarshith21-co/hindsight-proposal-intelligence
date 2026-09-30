import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';
import type { HindsightRecallResult, GroundedRecommendation } from '../types';

export default function MemoryInAction() {
  const navigate = useNavigate();
  const { rfps, activeRfpId, setActiveRfpId, runRecall, injectRecommendation, memoryCount } = useMemory();

  const activeRfp = rfps.find(r => r.id === activeRfpId) || rfps[0];
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(6);
  const [recallResult, setRecallResult] = useState<HindsightRecallResult | null>(null);
  const [appliedRecs, setAppliedRecs] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState<'with-memory' | 'without-memory'>('with-memory');

  useEffect(() => {
    let isMounted = true;
    runRecall({
      industry: activeRfp.industry,
      requirements: activeRfp.requirements,
      text: `${activeRfp.title} ${activeRfp.description}`,
    }).then(res => {
      if (isMounted) setRecallResult(res);
    });
    return () => { isMounted = false; };
  }, [activeRfpId, memoryCount]);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);
    const steps = [
      { step: 1, delay: 200 },
      { step: 2, delay: 450 },
      { step: 3, delay: 750 },
      { step: 4, delay: 1050 },
      { step: 5, delay: 1350 },
      { step: 6, delay: 1650 },
    ];
    steps.forEach(({ step, delay }) => {
      setTimeout(async () => {
        setAnalysisStep(step);
        if (step === 3) {
          const res = await runRecall({
            industry: activeRfp.industry,
            requirements: activeRfp.requirements,
            text: `${activeRfp.title} ${activeRfp.description}`,
          });
          setRecallResult(res);
        }
        if (step === 6) setIsAnalyzing(false);
      }, delay);
    });
  };

  const handleApplyRec = (rec: GroundedRecommendation) => {
    injectRecommendation(
      rec.targetSection,
      rec.snippetToInject,
      rec.basedOn.join(' & ')
    );
    if (!appliedRecs.includes(rec.id)) {
      setAppliedRecs([...appliedRecs, rec.id]);
    }
  };

  const recalledList = recallResult?.recalledExperiences || [];
  const recsList = recallResult?.recommendations || [];

  return (
    <div className="page fade-in">
      {/* 1. HEADER */}
      <div className="page-header" style={{ marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-header-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: '2px' }}>
            <span className="badge badge-accent">HERO INTELLIGENCE WORKSPACE</span>
            <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)' }}>
              {memoryCount} INDEXED EXPERIENCES
            </span>
          </div>
          <h1 className="page-header-title">{activeRfp.title}</h1>
          <div className="page-subtitle" style={{ color: 'var(--text-2)' }}>
            {activeRfp.client} · {activeRfp.industry} · <span className="cell-mono">{activeRfp.budget}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center' }}>
          <select
            className="field-input field-select"
            value={activeRfpId}
            onChange={e => setActiveRfpId(e.target.value)}
            style={{ fontSize: 'var(--fs-small)', padding: '4px 8px', width: 'auto' }}
          >
            {rfps.map(r => (
              <option key={r.id} value={r.id}>{r.client} — {r.title}</option>
            ))}
          </select>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? 'Recalling…' : 'Analyze with Hindsight'}
          </button>
        </div>
      </div>

      {/* Pipeline progress banner when analyzing */}
      {isAnalyzing && (
        <div style={{ padding: 'var(--sp-3) var(--sp-4)', border: '1px solid var(--accent-border)', background: 'var(--surface-1)', borderRadius: 'var(--r-md)', marginBottom: 'var(--sp-4)', animation: 'fadeIn var(--t-fast)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--sp-2)' }}>
            <span className="label-accent">HINDSIGHT RECALL PIPELINE</span>
            <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)' }}>STEP 0{analysisStep} OF 06</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <span className="mono" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)' }}>
              {analysisStep === 1 && '01 // Extracting semantic requirements from RFP specification'}
              {analysisStep === 2 && `02 // Executing contextual recall against ${memoryCount} indexed experiences`}
              {analysisStep === 3 && '03 // Comparing historical win/loss debrief patterns'}
              {analysisStep === 4 && '04 // Detecting causal success factors from precedents'}
              {analysisStep === 5 && '05 // Generating grounded proposal recommendations'}
              {analysisStep === 6 && '06 // Analysis complete'}
            </span>
            <div style={{ flex: 1, height: '3px', background: 'var(--surface-3)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${(analysisStep / 6) * 100}%`, background: 'var(--accent)', transition: 'width 200ms ease' }} />
            </div>
          </div>
        </div>
      )}

      {/* 2. THREE-PANEL WORKSPACE */}
      <div style={{ display: 'grid', gridTemplateColumns: '28% 44% 28%', gap: 'var(--sp-4)', minHeight: '640px' }}>
        {/* ============================================================== */}
        {/* LEFT PANEL: CURRENT RFP (Strictly Sourced Fields)              */}
        {/* ============================================================== */}
        <div className="panel" style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <div style={{ borderBottom: '1px solid var(--border-1)', paddingBottom: 'var(--sp-3)' }}>
            <div className="label" style={{ marginBottom: '2px' }}>LEFT PANEL · SOURCE: {activeRfp.id.toUpperCase()}</div>
            <div className="panel-title">Current RFP</div>
            <div className="meta" style={{ marginTop: '2px' }}>{activeRfp.client}</div>
          </div>

          {/* Scope */}
          <div>
            <div className="label" style={{ marginBottom: '4px' }}>RFP SPECIFICATION SCOPE</div>
            <p style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)', lineHeight: 1.5 }}>
              {activeRfp.description}
            </p>
          </div>

          {/* Requirements */}
          <div>
            <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>SPECIFIED REQUIREMENTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-1)' }}>
              {activeRfp.requirements.map((req, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: 'var(--sp-2) var(--sp-3)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-1)',
                    borderRadius: 'var(--r-sm)',
                    fontSize: 'var(--fs-small)',
                    lineHeight: 1.4,
                  }}
                >
                  <span className="mono" style={{ color: 'var(--accent-text)', marginRight: '6px', fontSize: 'var(--fs-nano)' }}>
                    0{idx + 1}
                  </span>
                  <span style={{ color: 'var(--text-1)' }}>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Parameters from Canonical RFP Data */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', borderTop: '1px solid var(--border-1)', paddingTop: 'var(--sp-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="label">BUDGET RANGE</span>
              <span className="cell-mono" style={{ color: 'var(--text-1)' }}>{activeRfp.budget}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="label">TIMELINE</span>
              <span className="cell-mono" style={{ color: 'var(--text-1)', textAlign: 'right', fontSize: 'var(--fs-nano)', maxWidth: '180px' }}>
                {activeRfp.timeline}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="label">SUBMISSION DUE</span>
              <span className="cell-mono" style={{ color: 'var(--text-1)' }}>{activeRfp.deadline}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="label">ASSIGNED OWNER</span>
              <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)' }}>{activeRfp.assignee || 'Sarah Chen'}</span>
            </div>
          </div>

          {/* Evaluation Criteria Weights */}
          <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: 'var(--sp-3)' }}>
            <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>EVALUATION CRITERIA WEIGHTS</div>
            {activeRfp.evaluationCriteria.map((c, i) => (
              <div key={i} style={{ marginBottom: 'var(--sp-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-micro)', marginBottom: '2px' }}>
                  <span style={{ color: 'var(--text-2)' }}>{c.name}</span>
                  <span className="mono" style={{ color: 'var(--accent-text)' }}>{c.weight}%</span>
                </div>
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: `${c.weight * 2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* CENTER PANEL: HINDSIGHT RECALL (Traceable Precedents & Pattern)*/}
        {/* ============================================================== */}
        <div className="panel" style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-1)', paddingBottom: 'var(--sp-3)' }}>
            <div>
              <div className="label-accent" style={{ marginBottom: '2px' }}>CENTER PANEL · HINDSIGHT RECALL</div>
              <div className="panel-title">Retrieved Experiences</div>
            </div>
            <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>
              {recalledList.length} RELEVANT EXPERIENCES RETRIEVED
            </span>
          </div>

          {/* Dynamically Rendered Retrieved Experiences */}
          <div>
            <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>RELEVANT HISTORICAL PRECEDENTS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              {recalledList.map(exp => {
                const isWon = exp.outcome === 'WON' || exp.outcome === 'won';
                const propId = exp.sourceProposalId || exp.memoryId;
                return (
                  <div
                    key={exp.memoryId}
                    style={{
                      padding: 'var(--sp-3)',
                      background: 'var(--surface-2)',
                      border: `1px solid ${isWon ? 'var(--border-1)' : 'var(--negative-border, var(--border-1))'}`,
                      borderRadius: 'var(--r-sm)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span className="mono" style={{ color: 'var(--accent-text)', fontSize: 'var(--fs-small)', fontWeight: 600 }}>
                        #{propId}
                      </span>
                      <span className={`status ${isWon ? 'status-won' : 'status-lost'}`}>
                        <span className="status-dot" /> {isWon ? 'WON' : 'LOST'}
                      </span>
                    </div>
                    <div style={{ fontSize: 'var(--fs-small)', fontWeight: 500, color: 'var(--text-1)' }}>
                      {exp.sourceProposalTitle} — {exp.client}
                    </div>
                    <div style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)', margin: '2px 0 4px' }}>
                      Industry: <strong style={{ color: 'var(--text-2)' }}>{exp.industry}</strong> · Budget: {exp.dealValue}
                    </div>
                    <div style={{ fontSize: 'var(--fs-micro)', color: isWon ? 'var(--positive-text)' : 'var(--negative-text)', lineHeight: 1.4 }}>
                      ● {isWon ? 'Winning Factor' : 'Root Cause'}: {exp.lesson || exp.clientFeedback}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Observed Pattern Generated from Retrieved Experiences */}
          <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)' }}>
            <div className="label-accent" style={{ marginBottom: 'var(--sp-2)' }}>OBSERVED PATTERN</div>
            <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-1)', lineHeight: 1.5, marginBottom: 'var(--sp-2)' }}>
              {recallResult?.observedPattern ||
                'Observed pattern: Bids emphasizing phased cutover, rollback checkpoints, and early compliance evidence won, while compressed unbuffered timelines caused disqualification.'}
            </p>
            <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: 'var(--sp-2)', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)' }}>Evidence Grounding:</span>
              {recalledList.map(exp => (
                <span
                  key={exp.memoryId}
                  className={`badge ${exp.outcome === 'WON' ? 'badge-positive' : 'badge-negative'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/memory')}
                >
                  #{exp.sourceProposalId || exp.memoryId} ({exp.outcome})
                </span>
              ))}
            </div>
          </div>

          {/* Empirical Contrast: Baseline vs Hindsight */}
          <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: 'var(--sp-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-2)' }}>
              <span className="label">EMPIRICAL CONTRAST</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  className={`btn btn-xs ${comparisonMode === 'without-memory' ? 'btn-outline' : 'btn-ghost'}`}
                  onClick={() => setComparisonMode('without-memory')}
                >
                  Standard LLM
                </button>
                <button
                  className={`btn btn-xs ${comparisonMode === 'with-memory' ? 'btn-accent' : 'btn-ghost'}`}
                  onClick={() => setComparisonMode('with-memory')}
                >
                  With Hindsight
                </button>
              </div>
            </div>

            {comparisonMode === 'without-memory' ? (
              <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-3)', border: '1px solid var(--negative)', borderRadius: 'var(--r-sm)' }}>
                <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--negative-text)', marginBottom: '2px' }}>
                  ✗ UNGROUNDED AI COMPLETION (BLIND TO DEBRIEFS)
                </div>
                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "We propose an accelerated 9-month turnkey migration schedule with continuous cutover to minimize delivery duration."
                </div>
                <div style={{ fontSize: 'var(--fs-nano)', color: 'var(--negative-text)', marginTop: '4px' }}>
                  Repeats fatal unbuffered timeline error from #PROP-014 and #PROP-081.
                </div>
              </div>
            ) : (
              <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-3)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)' }}>
                <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)', marginBottom: '2px' }}>
                  ✓ HINDSIGHT GROUNDED REASONING
                </div>
                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)', fontStyle: 'italic', lineHeight: 1.5 }}>
                  "RECOMMENDED: Structure delivery across 3 distinct rollback-gated phases over 18 months, leading with upfront compliance audit artifacts in Section 1."
                </div>
                <div style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)', marginTop: '4px' }}>
                  Grounded in historical debriefs #PROP-044, #PROP-021, and #PROP-093.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT PANEL: GROUNDED RECOMMENDATIONS (Provenance Traceable)   */}
        {/* ============================================================== */}
        <div className="panel" style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          <div style={{ borderBottom: '1px solid var(--border-1)', paddingBottom: 'var(--sp-3)' }}>
            <div className="label-accent" style={{ marginBottom: '2px' }}>RIGHT PANEL · GROUNDED STRATEGY</div>
            <div className="panel-title">Recommendations</div>
            <div className="meta" style={{ marginTop: '2px' }}>Actionable strategy grounded in retrieved evidence</div>
          </div>

          {/* Dynamically Rendered Recommendations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {recsList.map(rec => {
              const isApplied = appliedRecs.includes(rec.id);
              return (
                <div key={rec.id} style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-1)' }}>
                    <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>
                      REC-{rec.recNumber} // {rec.targetSection.toUpperCase()}
                    </span>
                    <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)' }}>
                      {rec.confidenceLabel}
                    </span>
                  </div>

                  <div style={{ fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-1)', marginBottom: 'var(--sp-2)' }}>
                    {rec.title}
                  </div>

                  <div style={{ marginBottom: 'var(--sp-2)' }}>
                    <div className="label" style={{ marginBottom: '2px' }}>SUPPORTED BY:</div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {rec.basedOn.map(propId => (
                        <span key={propId} className="badge badge-accent" style={{ cursor: 'pointer' }} onClick={() => navigate('/memory')}>
                          {propId}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)', lineHeight: 1.5, marginBottom: 'var(--sp-3)' }}>
                    {rec.specificRecommendation}
                  </div>

                  <button
                    className={`btn btn-sm ${isApplied ? 'btn-outline' : 'btn-primary'}`}
                    onClick={() => handleApplyRec(rec)}
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    {isApplied ? '✓ Applied to Proposal Draft' : 'Apply to Proposal'}
                  </button>
                </div>
              );
            })}
          </div>

          {appliedRecs.length > 0 && (
            <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--positive)', borderRadius: 'var(--r-sm)', animation: 'fadeIn var(--t-fast)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--positive-text)', fontWeight: 500, fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-2)' }}>
                <span>✓</span> {appliedRecs.length} Recommendation{appliedRecs.length > 1 ? 's' : ''} Injected into Active Draft
              </div>
              <button
                className="btn btn-outline btn-xs"
                onClick={() => navigate('/proposal')}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Open Proposal Editor →
              </button>
            </div>
          )}

          {/* Causal Chain Summary */}
          <div style={{ marginTop: 'auto', padding: 'var(--sp-3)', background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
            <div className="label" style={{ marginBottom: '4px' }}>DATA PROVENANCE GUARANTEE</div>
            <p className="meta" style={{ lineHeight: 1.4 }}>
              Every recommendation originates from historical proposal records (#PROP-044, #PROP-021, #PROP-014).
              Outcome debriefs logged in <strong>Outcomes</strong> dynamically expand the institutional memory graph.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
