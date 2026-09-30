import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';

export default function Memory() {
  const navigate = useNavigate();
  const { memories, memoryCount, rfps, injectRecommendation } = useMemory();
  const [selectedId, setSelectedId] = useState<string>(memories[0]?.id || 'prop-014');
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | 'won' | 'lost'>('all');
  const [search, setSearch] = useState('');
  const [applyToast, setApplyToast] = useState<string | null>(null);

  const selectedMemory = memories.find(m => m.id === selectedId) || memories[0];

  const filtered = memories.filter(m => {
    if (outcomeFilter !== 'all') {
      const memOutcome = m.outcome?.toLowerCase();
      if (memOutcome !== outcomeFilter) return false;
    }
    if (search) {
      const q = search.toLowerCase();
      return m.rfpTitle?.toLowerCase().includes(q) ||
             m.client?.toLowerCase().includes(q) ||
             m.industry?.toLowerCase().includes(q) ||
             m.id?.toLowerCase().includes(q);
    }
    return true;
  });

  const wonCount = memories.filter(m => m.outcome === 'won' || m.outcome === 'WON').length;
  const lostCount = memories.filter(m => m.outcome === 'lost' || m.outcome === 'LOST').length;

  const handleApplyMemory = () => {
    if (!selectedMemory) return;
    const lesson = selectedMemory.lessonLearned || selectedMemory.lessonsLearned?.[0] || selectedMemory.clientFeedback || 'Verified strategic guideline';
    injectRecommendation(
      'implementation',
      `[ORGANIZATIONAL MEMORY: #${selectedMemory.id.toUpperCase()}] Grounded in past tender outcome (${selectedMemory.outcome.toUpperCase()}): ${lesson}`,
      `#${selectedMemory.id.toUpperCase()} — ${selectedMemory.outcome.toUpperCase()}`
    );
    setApplyToast(`Applied memory #${selectedMemory.id.toUpperCase()} to active proposal draft`);
    setTimeout(() => setApplyToast(null), 3500);
  };

  const matchingRfp = selectedMemory
    ? rfps.find(r => r.industry === selectedMemory.industry) || rfps[0]
    : rfps[0];

  return (
    <div className="page fade-in">
      {/* Header (Section 6) */}
      <div className="page-header" style={{ marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-header-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: '4px' }}>
            <span className="badge badge-accent">ORGANIZATIONAL PRECEDENT</span>
            <span className="badge badge-neutral">SYNTHETIC DEMO DATA</span>
          </div>
          <h1 className="page-header-title">Organizational Memory</h1>
          <div className="page-subtitle">{memoryCount} indexed experiences · Codified institutional precedent</div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/memory-in-action')}>
            Memory in Action →
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/outcomes')}>
            + Record Experience
          </button>
        </div>
      </div>

      {applyToast && (
        <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)', color: 'var(--accent-text)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeIn var(--t-fast)' }}>
          <span>✓ {applyToast}</span>
          <button className="btn btn-outline btn-xs" onClick={() => navigate('/proposal')}>
            Open Editor →
          </button>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
        <div className="filter-pills">
          <button className={`filter-pill ${outcomeFilter === 'all' ? 'active' : ''}`} onClick={() => setOutcomeFilter('all')}>
            ALL ({memoryCount})
          </button>
          <button className={`filter-pill ${outcomeFilter === 'won' ? 'active' : ''}`} onClick={() => setOutcomeFilter('won')}>
            WON ({wonCount})
          </button>
          <button className={`filter-pill ${outcomeFilter === 'lost' ? 'active' : ''}`} onClick={() => setOutcomeFilter('lost')}>
            LOST ({lostCount})
          </button>
        </div>
        <div className="topbar-search" style={{ width: '280px' }}>
          <span className="topbar-search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search memories…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 2-Column Knowledge Management Layout (35% Left / 65% Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '35% 65%', gap: 'var(--sp-4)', minHeight: '620px' }}>
        {/* LEFT 35%: MEMORY LIST */}
        <div className="panel" style={{ padding: 0, display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 230px)', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--sp-3) var(--sp-4)', borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="label">INDEXED PRECEDENTS</span>
            <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)' }}>{filtered.length} MATCHES</span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map(mem => {
              const isWon = mem.outcome === 'won' || mem.outcome === 'WON';
              const isSelected = selectedId === mem.id;
              const primaryTag = mem.tags?.[0] || 'Technical Governance';

              return (
                <div
                  key={mem.id}
                  onClick={() => setSelectedId(mem.id)}
                  style={{
                    padding: 'var(--sp-3) var(--sp-4)',
                    borderBottom: '1px solid var(--border-1)',
                    background: isSelected ? 'var(--surface-2)' : 'transparent',
                    borderLeft: isSelected ? '2px solid var(--accent)' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'all var(--t-fast)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)', fontWeight: 600 }}>
                      #{mem.id.toUpperCase()}
                    </span>
                    <span className={`status ${isWon ? 'status-won' : 'status-lost'}`} style={{ fontSize: 'var(--fs-nano)' }}>
                      <span className="status-dot" />
                      {mem.outcome.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-1)', marginBottom: '3px' }}>
                    {mem.rfpTitle}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', fontSize: 'var(--fs-nano)', color: 'var(--text-3)', marginBottom: '4px' }}>
                    <span className="mono" style={{ color: 'var(--text-2)' }}>{mem.budget}</span>
                    <span>·</span>
                    <span>{mem.industry}</span>
                  </div>

                  <div style={{ fontSize: 'var(--fs-nano)', color: isWon ? 'var(--positive-text)' : 'var(--negative-text)', fontWeight: 500 }}>
                    ● {primaryTag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT 65%: DETAIL PANEL (Section 6) */}
        <div className="panel" style={{ padding: 'var(--sp-5)', maxHeight: 'calc(100vh - 230px)', overflowY: 'auto' }}>
          {selectedMemory ? (
            <div className="fade-in">
              {/* Header with Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--border-1)', marginBottom: 'var(--sp-4)' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: '2px' }}>
                    <span className="mono" style={{ fontSize: 'var(--fs-micro)', color: 'var(--accent-text)', fontWeight: 600 }}>
                      #{selectedMemory.id.toUpperCase()}
                    </span>
                    <span className="badge badge-neutral" style={{ fontSize: 'var(--fs-nano)' }}>
                      SOURCE: CANONICAL HISTORICAL PROPOSALS
                    </span>
                  </div>
                  <h2 style={{ fontSize: 'var(--fs-section-title)', fontWeight: 600, color: 'var(--text-1)', marginBottom: 'var(--sp-2)' }}>
                    {selectedMemory.rfpTitle}
                  </h2>
                  <div style={{ display: 'flex', gap: 'var(--sp-2)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className={`status ${(selectedMemory.outcome === 'won' || selectedMemory.outcome === 'WON') ? 'status-won' : 'status-lost'}`}>
                      <span className="status-dot" />
                      {selectedMemory.outcome.toUpperCase()}
                    </span>
                    <span className="badge badge-neutral">{selectedMemory.industry}</span>
                    <span className="cell-mono" style={{ color: 'var(--text-1)' }}>{selectedMemory.budget}</span>
                    <span className="meta">Client: <strong>{selectedMemory.client}</strong></span>
                  </div>
                </div>

                <button className="btn btn-primary btn-sm" onClick={handleApplyMemory}>
                  Apply Memory
                </button>
              </div>

              {/* 1. STRATEGY / APPROACH */}
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <div className="label" style={{ marginBottom: 'var(--sp-1)' }}>STRATEGY PROPOSED</div>
                <div style={{ fontSize: 'var(--fs-body)', color: 'var(--text-1)', lineHeight: 1.6, padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
                  {selectedMemory.strategy || selectedMemory.proposalApproach || 'Submitted architectural strategy recorded in canonical dataset.'}
                </div>
              </div>

              {/* 2. ROOT CAUSE */}
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <div className="label" style={{ marginBottom: 'var(--sp-1)' }}>ROOT CAUSE</div>
                <div style={{ fontSize: 'var(--fs-body)', color: 'var(--text-1)', lineHeight: 1.6 }}>
                  {selectedMemory.rootCause || 'Root cause debrief documented in canonical post-mortem.'}
                </div>
              </div>

              {/* 3. CLIENT FEEDBACK */}
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <div className="label" style={{ marginBottom: 'var(--sp-1)' }}>CLIENT EVALUATION FEEDBACK</div>
                <div className="evidence">
                  <div className="evidence-text">
                    "{selectedMemory.clientFeedback || 'Direct procurement evaluation feedback recorded.'}"
                  </div>
                </div>
              </div>

              {/* 4. LESSON LEARNED */}
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <div className="label" style={{ marginBottom: 'var(--sp-1)' }}>CAUSAL LESSON LEARNED</div>
                <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
                  <div style={{ fontSize: 'var(--fs-body)', color: 'var(--text-1)', fontWeight: 500, lineHeight: 1.5 }}>
                    {selectedMemory.lessonLearned || selectedMemory.lessonsLearned?.[0] || 'Causal lesson encoded into organizational memory.'}
                  </div>
                </div>
              </div>

              {/* 5. APPLICABLE CONDITIONS */}
              <div style={{ marginBottom: 'var(--sp-4)' }}>
                <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>MEMORY TAGS & TOPICS</div>
                <div style={{ display: 'flex', gap: 'var(--sp-1)', flexWrap: 'wrap' }}>
                  {(selectedMemory.tags || selectedMemory.memoryTags || []).map((tag: string, i: number) => (
                    <span key={i} className="badge badge-neutral" style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-nano)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 6. USED IN CURRENT RFPS */}
              {matchingRfp && (
                <div style={{ borderTop: '1px solid var(--border-1)', paddingTop: 'var(--sp-4)' }}>
                  <div className="label" style={{ marginBottom: 'var(--sp-2)' }}>COGNATE ACTIVE RFP</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--border-1)', borderRadius: 'var(--r-sm)' }}>
                    <div>
                      <div style={{ fontSize: 'var(--fs-small)', fontWeight: 500, color: 'var(--text-1)' }}>
                        {matchingRfp.title} — {matchingRfp.client}
                      </div>
                      <div className="meta">
                        Sector alignment: {matchingRfp.industry} · Budget: {matchingRfp.budget}
                      </div>
                    </div>
                    <button className="btn btn-outline btn-xs" onClick={() => navigate(`/rfps/${matchingRfp.id}`)}>
                      Inspect RFP →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-3)' }}>
              Select a memory from the index to view codified debrief
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
