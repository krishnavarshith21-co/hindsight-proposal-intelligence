import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';

export default function Outcomes() {
  const navigate = useNavigate();
  const { memories, memoryCount, rfps, addRetrospectiveMemory } = useMemory();

  // Selected outcome for side panel
  const [selectedOutcomeId, setSelectedOutcomeId] = useState<string | null>(memories[0]?.id || 'prop-014');

  // New debrief drawer state
  const [showNewDebrief, setShowNewDebrief] = useState(false);
  const [selectedRfpId, setSelectedRfpId] = useState(rfps[0]?.id || 'rfp-001');
  const [outcome, setOutcome] = useState<'won' | 'lost' | 'no-decision'>('won');
  const [whatHappened, setWhatHappened] = useState('Client selected our proposal over two incumbent competitors following secondary architectural defense.');
  const [clientFeedback, setClientFeedback] = useState('Phased cutover and rollback controls were critical to our decision.');
  const [whyOutcome, setWhyOutcome] = useState('Risk reduction matched procurement priorities; competitor proposed monolithic cutovers.');
  const [organizationalLesson, setOrganizationalLesson] = useState('For regulated cloud migrations, phased delivery and rollback controls reduce perceived execution risk.');

  const [learningStep, setLearningStep] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const selectedRfp = rfps.find(r => r.id === selectedRfpId) || rfps[0];
  const activeMemory = memories.find(m => m.id === selectedOutcomeId) || memories[0];

  const handleSaveToHindsight = () => {
    setIsSaving(true);
    setIsComplete(false);
    setLearningStep(1);
    const steps = [
      { step: 1, delay: 250 },
      { step: 2, delay: 500 },
      { step: 3, delay: 750 },
      { step: 4, delay: 1000 },
      { step: 5, delay: 1250 },
    ];
    steps.forEach(({ step, delay }) => {
      setTimeout(() => {
        setLearningStep(step);
        if (step === 5) {
          addRetrospectiveMemory({
            rfpId: selectedRfp.id,
            rfpTitle: selectedRfp.title,
            client: selectedRfp.client,
            industry: selectedRfp.industry,
            outcome,
            budget: selectedRfp.budget,
            whatHappened,
            clientFeedback,
            rootCause: whyOutcome,
            organizationalLesson,
            tags: ['cloud-migration', 'banking', 'financial-services', 'rollback', 'compliance', 'phased-delivery'],
          });
          setIsSaving(false);
          setIsComplete(true);
        }
      }, delay);
    });
  };

  const handleSaveExistingExperience = () => {
    setSavedToast(`Codified experience #${activeMemory.id.toUpperCase()} committed to persistent Hindsight graph.`);
    setTimeout(() => setSavedToast(null), 3500);
  };

  return (
    <div className="page fade-in">
      {/* Header (Section 11) */}
      <div className="page-header" style={{ marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-header-left">
          <h1 className="page-header-title">Proposal Outcomes & Debriefs</h1>
          <div className="page-subtitle">
            Operational post-mortem table · {memoryCount} historical records codified in organizational memory
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/memory')}>
            Knowledge Base →
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowNewDebrief(true)}>
            + Record New Debrief
          </button>
        </div>
      </div>

      {savedToast && (
        <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)', color: 'var(--accent-text)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-3)', animation: 'fadeIn var(--t-fast)' }}>
          ✓ {savedToast}
        </div>
      )}

      {/* Main Operational Table + Side Panel Split */}
      <div style={{ display: 'grid', gridTemplateColumns: activeMemory ? '62% 38%' : '100%', gap: 'var(--sp-4)', minHeight: '600px' }}>
        {/* Table (Section 11) */}
        <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: 'var(--sp-3) var(--sp-4)', borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="label">HISTORICAL OUTCOMES</span>
            <span className="meta">Click any row to inspect post-mortem</span>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Proposal</th>
                <th style={{ width: '16%' }}>Client</th>
                <th style={{ width: '11%' }}>Value</th>
                <th style={{ width: '11%' }}>Submitted</th>
                <th style={{ width: '11%' }}>Outcome</th>
                <th style={{ width: '14%' }}>Root Cause</th>
                <th style={{ width: '15%' }}>Memory</th>
              </tr>
            </thead>
            <tbody>
              {memories.map(p => {
                const isWon = p.outcome === 'won' || p.outcome === 'WON';
                const isSelected = selectedOutcomeId === p.id;
                const rootCausePreview = p.rootCause || 'Root cause recorded in debrief';
                const submittedDate = p.submittedDate || '2026-02-14';

                return (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedOutcomeId(p.id)}
                    style={{
                      cursor: 'pointer',
                      background: isSelected ? 'var(--surface-2)' : 'transparent',
                    }}
                  >
                    <td>
                      <div className="cell-primary" style={{ fontSize: 'var(--fs-small)' }}>
                        #{p.id.toUpperCase()}
                      </div>
                      <div className="meta" style={{ fontSize: 'var(--fs-nano)' }}>{p.rfpTitle}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)' }}>{p.client}</span>
                    </td>
                    <td>
                      <span className="cell-mono">{p.budget}</span>
                    </td>
                    <td>
                      <span className="cell-mono">{submittedDate}</span>
                    </td>
                    <td>
                      <div className={`status ${isWon ? 'status-won' : 'status-lost'}`}>
                        <span className="status-dot" />
                        <span style={{ fontSize: 'var(--fs-nano)' }}>{p.outcome.toUpperCase()}</span>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-2)' }}>
                        {rootCausePreview}
                      </span>
                    </td>
                    <td>
                      <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>
                        ✓ CODIFIED
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Side Panel (Section 11) */}
        {activeMemory && (
          <div className="panel fade-in" style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-1)', paddingBottom: 'var(--sp-3)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                  <span className="mono" style={{ fontSize: 'var(--fs-micro)', color: 'var(--accent-text)', fontWeight: 600 }}>
                    #{activeMemory.id.toUpperCase()}
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: 'var(--fs-nano)' }}>
                    CANONICAL RECORD
                  </span>
                </div>
                <div style={{ fontSize: 'var(--fs-card-title)', fontWeight: 600, color: 'var(--text-1)', marginTop: '2px' }}>
                  {activeMemory.rfpTitle}
                </div>
                <div className="meta" style={{ marginTop: '2px' }}>
                  {activeMemory.client} · {activeMemory.industry} · <span className="cell-mono">{activeMemory.budget}</span>
                </div>
              </div>

              <span className={`status ${(activeMemory.outcome === 'won' || activeMemory.outcome === 'WON') ? 'status-won' : 'status-lost'}`}>
                <span className="status-dot" />
                {activeMemory.outcome.toUpperCase()}
              </span>
            </div>

            {/* Root Cause */}
            <div>
              <div className="label" style={{ marginBottom: '4px' }}>Root Cause:</div>
              <div style={{ fontSize: 'var(--fs-body)', color: 'var(--text-1)', padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
                {activeMemory.rootCause || 'Root cause debrief recorded in canonical post-mortem.'}
              </div>
            </div>

            {/* Client Feedback */}
            <div>
              <div className="label" style={{ marginBottom: '4px' }}>Client Feedback:</div>
              <div className="evidence">
                <div className="evidence-text">
                  "{activeMemory.clientFeedback || 'Direct procurement evaluation debrief archived.'}"
                </div>
              </div>
            </div>

            {/* Lesson */}
            <div>
              <div className="label" style={{ marginBottom: '4px' }}>Causal Lesson Learned:</div>
              <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)', lineHeight: 1.5, fontWeight: 500 }}>
                  {activeMemory.lessonLearned || activeMemory.lessonsLearned?.[0] || 'Causal institutional lesson encoded into Hindsight memory.'}
                </div>
              </div>
            </div>

            {/* Context & Tags */}
            <div>
              <div className="label" style={{ marginBottom: '4px' }}>Memory Tags:</div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {(activeMemory.tags || ['cloud-migration', 'compliance', 'rollback']).map((tag, i) => (
                  <span key={i} className="badge badge-neutral" style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-nano)' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Document References if available */}
            {activeMemory.documentReferences && activeMemory.documentReferences.length > 0 && (
              <div>
                <div className="label" style={{ marginBottom: '4px' }}>Canonical Sourced Documents:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {activeMemory.documentReferences.map((doc, i) => (
                    <span key={i} className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)' }}>
                      📄 {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Save Experience Action */}
            <div style={{ marginTop: 'auto', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--border-1)', display: 'flex', gap: 'var(--sp-2)' }}>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSaveExistingExperience}
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Codify in Hindsight
              </button>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => navigate('/memory')}
                style={{ justifyContent: 'center' }}
              >
                View in Memory →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* NEW DEBRIEF MODAL / DRAWER */}
      {showNewDebrief && (
        <div
          className="overlay"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 'var(--sp-4)',
          }}
          onClick={() => setShowNewDebrief(false)}
        >
          <div
            className="panel fade-in"
            style={{
              width: '740px',
              maxWidth: '95vw',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'var(--surface-1)',
              border: '1px solid var(--border-2)',
              padding: 'var(--sp-5)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
              <div>
                <h2 style={{ fontSize: 'var(--fs-section-title)', fontWeight: 600, color: 'var(--text-1)' }}>
                  Record Tender Post-Mortem Debrief
                </h2>
                <div className="meta">Codify win/loss retrospective directly into Hindsight memory</div>
              </div>
              <button className="btn btn-ghost btn-xs" onClick={() => setShowNewDebrief(false)}>
                ✕ Close
              </button>
            </div>

            <div className="field">
              <label className="field-label">Concluded Tender</label>
              <select className="field-input field-select" value={selectedRfpId} onChange={e => setSelectedRfpId(e.target.value)}>
                {rfps.map(r => (<option key={r.id} value={r.id}>{r.title} — {r.client} ({r.budget})</option>))}
              </select>
            </div>

            <div className="field">
              <label className="field-label">Procurement Outcome</label>
              <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                {[
                  { value: 'won' as const, label: '● WON', color: '--positive', dimColor: '--positive-dim' },
                  { value: 'lost' as const, label: '● LOST', color: '--negative', dimColor: '--negative-dim' },
                  { value: 'no-decision' as const, label: '○ NO DECISION', color: '--accent', dimColor: '--accent-dim' },
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setOutcome(opt.value)}
                    style={{
                      flex: 1, padding: '6px', cursor: 'pointer', textAlign: 'center', borderRadius: 'var(--r-sm)',
                      border: outcome === opt.value ? `1.5px solid var(${opt.color})` : '1px solid var(--border-2)',
                      background: outcome === opt.value ? `var(${opt.dimColor})` : 'var(--surface-2)',
                      color: outcome === opt.value ? `var(${opt.color}-text)` : 'var(--text-3)',
                      fontFamily: 'var(--mono)', fontSize: 'var(--fs-micro)',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <label className="field-label">What Happened</label>
              <textarea className="field-textarea" value={whatHappened} onChange={e => setWhatHappened(e.target.value)} style={{ minHeight: '50px' }} />
            </div>

            <div className="field">
              <label className="field-label">Root Cause</label>
              <textarea className="field-textarea" value={whyOutcome} onChange={e => setWhyOutcome(e.target.value)} style={{ minHeight: '50px' }} />
            </div>

            <div className="field">
              <label className="field-label">Client Feedback</label>
              <textarea className="field-textarea" value={clientFeedback} onChange={e => setClientFeedback(e.target.value)} style={{ minHeight: '50px' }} />
            </div>

            <div className="field">
              <label className="field-label">Organizational Lesson Learned</label>
              <textarea className="field-textarea" value={organizationalLesson} onChange={e => setOrganizationalLesson(e.target.value)} style={{ minHeight: '50px' }} />
            </div>

            {/* Retention Pipeline Feedback */}
            {learningStep > 0 && (
              <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)', marginBottom: 'var(--sp-3)' }}>
                <div className="label-accent" style={{ marginBottom: 'var(--sp-2)' }}>
                  {isComplete ? 'Experience Codified Successfully' : 'Retaining into Hindsight Pipeline…'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {[
                    { step: 1, label: '01 // Experience captured' },
                    { step: 2, label: '02 // Structuring post-mortem record' },
                    { step: 3, label: '03 // Extracting causal behavioral lesson' },
                    { step: 4, label: '04 // Retaining into Hindsight memory graph' },
                    { step: 5, label: '05 // Available for future RFP recall' },
                  ].map(s => (
                    <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--fs-nano)', opacity: learningStep >= s.step ? 1 : 0.3 }}>
                      <span className="mono" style={{ color: learningStep >= s.step ? 'var(--positive-text)' : 'var(--text-4)' }}>✓</span>
                      <span style={{ color: 'var(--text-1)' }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 'var(--sp-2)', justifyContent: 'flex-end', marginTop: 'var(--sp-3)' }}>
              <button className="btn btn-outline" onClick={() => setShowNewDebrief(false)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSaveToHindsight}
                disabled={isSaving}
              >
                {isSaving ? 'Retaining into Hindsight…' : isComplete ? 'Saved ✓' : 'Save Experience to Hindsight →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
