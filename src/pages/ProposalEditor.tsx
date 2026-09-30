import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';

interface GroundedSuggestion {
  historicalSource: string;
  isWon: boolean;
  historicalLesson: string;
  currentRfpSignal: string;
  suggestedLanguage: string;
}

export default function ProposalEditor() {
  const navigate = useNavigate();
  const { proposalSections, injectRecommendation, updateSectionContent, rfps, activeRfpId } = useMemory();
  const [activeSectionId, setActiveSectionId] = useState<string>('implementation');
  const [isEditing, setIsEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState('');
  const [showAppliedToast, setShowAppliedToast] = useState<string | null>(null);

  const activeRfp = rfps.find(r => r.id === activeRfpId) || rfps[0];
  const currentSection = proposalSections.find(s => s.id === activeSectionId) || proposalSections[0];

  const handleStartEdit = () => { setEditBuffer(currentSection.content); setIsEditing(true); };
  const handleSaveEdit = () => { updateSectionContent(activeSectionId, editBuffer); setIsEditing(false); };

  const handleInject = (suggestion: GroundedSuggestion) => {
    injectRecommendation(activeSectionId, suggestion.suggestedLanguage, suggestion.historicalSource);
    setShowAppliedToast(`Injected from ${suggestion.historicalSource}`);
    setTimeout(() => setShowAppliedToast(null), 3500);
  };

  const sectionIntelligence: Record<string, GroundedSuggestion[]> = {
    'implementation': [
      { historicalSource: 'PROP-093 — WON', isWon: true, historicalLesson: 'Combining phased delivery, rollback controls and early compliance evidence is effective for regulated cloud migrations.', currentRfpSignal: 'Client requires verified low-downtime execution and disaster recovery proof.', suggestedLanguage: 'Our migration approach uses phased production cutover, isolated staging environments and automated rollback checkpoints: Phase 1 (Non-clearing telemetry), Phase 2 (Secondary partition), and Phase 3 (Primary transaction ledger with automated rollback points).' },
      { historicalSource: 'PROP-044 — WON', isWon: true, historicalLesson: 'Explicit rollback procedures reduce perceived execution risk in enterprise infrastructure proposals.', currentRfpSignal: 'Client explicitly mandates rollback capability and business continuity.', suggestedLanguage: 'Automated rollback checkpoints are executed prior to every cutover window, backed by isolated pilot environments and real-time synthetic failover telemetry.' },
      { historicalSource: 'PROP-014 — LOST', isWon: false, historicalLesson: 'Avoid aggressively compressed timelines; financial-services migrations require conservative timelines with rollback checkpoints.', currentRfpSignal: 'Northstar Bank previously rejected 12-month contiguous schedules due to execution risk.', suggestedLanguage: 'Implementation timeline is structured across 18 conservative months with dedicated 4-week stabilization gates between deployment phases.' },
    ],
    'executive-summary': [
      { historicalSource: 'PROP-021 — WON', isWon: true, historicalLesson: 'In regulated industries, demonstrate compliance evidence early rather than burying it later in the proposal.', currentRfpSignal: 'Client requires explicit regulatory compliance and auditability.', suggestedLanguage: 'Our engagement model leads with audited SOC 2 Type II compliance artifacts, data sovereignty assurances and a verified zero-disruption SLA in advance of infrastructure cutover.' },
      { historicalSource: 'PROP-073 — WON', isWon: true, historicalLesson: 'For regulated clients, connect technical controls directly to business risk.', currentRfpSignal: 'Evaluation committee focuses on operational and institutional risk reduction.', suggestedLanguage: 'Security architecture maps every technical control directly to enterprise business risk categories, establishing verifiable governance before technical architecture review.' },
    ],
    'solution': [
      { historicalSource: 'PROP-052 — WON', isWon: true, historicalLesson: 'Banking buyers respond positively to phased migration and explicit risk controls.', currentRfpSignal: 'Sub-50ms latency across 12 branch networks required.', suggestedLanguage: 'Active-active hybrid cloud topologies utilize dedicated elastic gateway pods, maintaining sub-50ms transaction throughput with zero ledger discrepancy during live traffic shifts.' },
    ],
    'pricing': [
      { historicalSource: 'PROP-044 — WON', isWon: true, historicalLesson: 'Capped monthly capacity pods eliminated commercial friction.', currentRfpSignal: 'Procurement requested predictable 3-year TCO.', suggestedLanguage: 'Commercial structure is structured around capped engineering capacity pods with transparent 3-year TCO projections and quarterly milestone sign-offs.' },
    ],
  };

  const currentNotes = sectionIntelligence[activeSectionId] || sectionIntelligence['implementation'];

  const renderManuscriptContent = (content: string) => {
    const parts = content.split('\n\n');
    return parts.map((part, idx) => {
      if (part.includes('[MEMORY-GROUNDED SUGGESTION:') || part.includes('[ORGANIZATIONAL MEMORY:')) {
        return (
          <div key={idx} style={{ margin: 'var(--sp-3) 0', padding: 'var(--sp-3)', borderLeft: '2px solid var(--accent)', background: 'var(--surface-2)', borderRadius: '0 var(--r-sm) var(--r-sm) 0' }}>
            <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)', marginBottom: 'var(--sp-1)' }}>● MEMORY-GROUNDED REFINEMENT</div>
            <p style={{ color: 'var(--text-1)', lineHeight: 1.7, margin: 0, fontStyle: 'italic', fontSize: 'var(--fs-body)' }}>
              {part.replace(/\[.*?\]\n?/, '')}
            </p>
          </div>
        );
      }
      return <p key={idx} style={{ marginBottom: 'var(--sp-3)', lineHeight: 1.7, color: 'var(--text-1)', fontSize: 'var(--fs-body)' }}>{part}</p>;
    });
  };

  return (
    <div className="page fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: '2px' }}>
            <span className="label">Proposal Editor</span>
            <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-4)' }}>DRAFT v2.4</span>
            <span className="badge badge-accent">MEMORY GROUNDED</span>
          </div>
          <h1 style={{ fontSize: 'var(--fs-section-title)', fontWeight: 600, color: 'var(--text-1)' }}>
            {activeRfp.client} — {activeRfp.title}
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          {isEditing ? (
            <>
              <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleSaveEdit}>Save</button>
            </>
          ) : (
            <button className="btn btn-outline btn-sm" onClick={handleStartEdit}>Edit</button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/outcomes')}>Submit & Track →</button>
        </div>
      </div>

      {showAppliedToast && (
        <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)', color: 'var(--accent-text)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-3)', animation: 'fadeIn var(--t-fast)' }}>
          ✓ {showAppliedToast}
        </div>
      )}

      {/* 3-Column Editor Layout */}
      <div className="ws-grid ws-grid-3col-editor">
        {/* Left: Section TOC */}
        <aside>
          <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>Sections</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {proposalSections.map((section, idx) => {
              const isActive = section.id === activeSectionId;
              return (
                <button key={section.id} onClick={() => { setActiveSectionId(section.id); setIsEditing(false); }} className={`section-nav-item ${isActive ? 'active' : ''}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>0{idx + 1} {section.title}</span>
                    {section.edited && <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>●</span>}
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 'var(--sp-4)', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--border-1)' }}>
            <div className="label" style={{ marginBottom: 'var(--sp-1)' }}>Context</div>
            <div className="meta" style={{ lineHeight: 1.5 }}>
              Client: <strong>{activeRfp.client}</strong><br />
              Value: <strong>{activeRfp.budget}</strong>
            </div>
          </div>
        </aside>

        {/* Center: Manuscript */}
        <article className="panel" style={{ minHeight: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--sp-4)', borderBottom: '1px solid var(--border-1)', paddingBottom: 'var(--sp-3)' }}>
            <div>
              <div className="label" style={{ marginBottom: '2px' }}>Section</div>
              <h2 style={{ fontSize: 'var(--fs-section-title)', fontWeight: 600, color: 'var(--text-1)' }}>{currentSection.title}</h2>
            </div>
            <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-4)' }}>REV {currentSection.version}.0</span>
          </div>
          {isEditing ? (
            <textarea className="field-textarea" style={{ width: '100%', minHeight: '400px', lineHeight: 1.7, fontSize: 'var(--fs-body)' }} value={editBuffer} onChange={e => setEditBuffer(e.target.value)} />
          ) : (
            <div>{renderManuscriptContent(currentSection.content)}</div>
          )}
          {currentSection.evidenceUsed && currentSection.evidenceUsed.length > 0 && (
            <div style={{ marginTop: 'var(--sp-5)', paddingTop: 'var(--sp-3)', borderTop: '1px solid var(--border-1)' }}>
              <div className="label" style={{ marginBottom: 'var(--sp-1)' }}>Grounding Attributions</div>
              <div style={{ display: 'flex', gap: 'var(--sp-1)', flexWrap: 'wrap' }}>
                {currentSection.evidenceUsed.map((ev, i) => (
                  <span key={i} className="badge badge-neutral" style={{ color: 'var(--accent-text)' }}>{ev}</span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Right: Intelligence Panel */}
        <aside>
          <div className="label-accent" style={{ marginBottom: 'var(--sp-2)' }}>Intelligence</div>
          <p className="meta" style={{ marginBottom: 'var(--sp-3)', lineHeight: 1.4 }}>
            Recommendations grounded in past proposal outcomes:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            {currentNotes.map((note, idx) => (
              <div key={idx} className="panel panel-compact">
                <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)', marginBottom: 'var(--sp-2)' }}>MEMORY-GROUNDED</div>
                <div style={{ marginBottom: 'var(--sp-2)' }}>
                  <div className="flow-step-label">Source</div>
                  <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: note.isWon ? 'var(--positive-text)' : 'var(--negative-text)', fontWeight: 500 }}>{note.historicalSource}</span>
                </div>
                <div style={{ marginBottom: 'var(--sp-2)' }}>
                  <div className="flow-step-label">Lesson</div>
                  <p className="meta" style={{ color: 'var(--text-2)', lineHeight: 1.4, marginTop: '1px' }}>{note.historicalLesson}</p>
                </div>
                <div style={{ marginBottom: 'var(--sp-2)' }}>
                  <div className="flow-step-label">RFP Signal</div>
                  <p className="meta" style={{ color: 'var(--text-1)', lineHeight: 1.4, marginTop: '1px' }}>{note.currentRfpSignal}</p>
                </div>
                <div style={{ marginBottom: 'var(--sp-3)' }}>
                  <div className="flow-step-label">Suggested Language</div>
                  <div className="evidence" style={{ margin: 'var(--sp-1) 0 0' }}>
                    <div className="evidence-text">"{note.suggestedLanguage}"</div>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => handleInject(note)} style={{ width: '100%', justifyContent: 'center' }}>Inject into manuscript →</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'var(--sp-4)', padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
            <div className="label" style={{ marginBottom: '2px' }}>Grounding Notice</div>
            <p className="meta" style={{ lineHeight: 1.4 }}>
              These suggestions are strategic patterns from win/loss debriefs, not generic AI completions.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
