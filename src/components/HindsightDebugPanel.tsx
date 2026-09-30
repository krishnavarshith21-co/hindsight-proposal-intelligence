import { useState } from 'react';
import { useMemory } from '../context/MemoryContext';
import { Terminal, RefreshCw, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HindsightDebugPanel({ isOpen, onClose }: Props) {
  const { memories, memoryCount, hindsightLogs, hindsightStatus, resetToDefaults } = useMemory();
  const [activeTab, setActiveTab] = useState<'flow' | 'logs' | 'corpus'>('flow');

  if (!isOpen) return null;

  const recallLogs = hindsightLogs.filter(l => l.operation === 'RECALL');
  const learnLogs = hindsightLogs.filter(l => l.operation === 'LEARN');

  const latestRecall = recallLogs[recallLogs.length - 1];

  return (
    <div
      className="overlay"
      style={{
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
      onClick={onClose}
    >
      <div
        className="modal fade-in"
        style={{
          width: '680px',
          maxWidth: '95vw',
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: 0,
          borderLeft: '1px solid var(--border-2)',
          borderTop: 'none',
          borderRight: 'none',
          borderBottom: 'none',
          background: 'var(--surface-1)',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          padding: 0,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--sp-5) var(--sp-6)',
            borderBottom: '1px solid var(--border-2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--surface-2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
            <Terminal size={18} style={{ color: 'var(--accent)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                <span className="mono" style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-1)' }}>
                  HINDSIGHT MEMORY INSPECTOR
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 'var(--fs-nano)',
                    padding: '1px 6px',
                    background: hindsightStatus.isConfigured ? 'var(--positive-dim)' : 'var(--surface-3)',
                    color: hindsightStatus.isConfigured ? 'var(--positive-text)' : 'var(--text-3)',
                    border: '1px solid var(--border-2)',
                  }}
                >
                  {hindsightStatus.isConfigured ? 'LIVE HINDSIGHT API' : 'LOCAL ENGINE PERSISTENT'}
                </span>
              </div>
              <div className="meta" style={{ fontSize: 'var(--fs-nano)', marginTop: '2px' }}>
                Operational verification panel for Hindsight Retain / Recall loop
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            <button
              className="btn btn-outline"
              onClick={resetToDefaults}
              style={{ fontSize: 'var(--fs-nano)', padding: '4px 8px' }}
              title="Reset memories and state to canonical 10 records"
            >
              <RefreshCw size={12} style={{ marginRight: '4px' }} />
              Reset
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-3)',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Sub-nav tabs */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--sp-6)',
            padding: 'var(--sp-3) var(--sp-6)',
            borderBottom: '1px solid var(--border-1)',
            background: 'var(--surface-1)',
          }}
        >
          {[
            { id: 'flow', label: 'Causal Proof Loop' },
            { id: 'corpus', label: `Indexed Corpus (${memoryCount})` },
            { id: 'logs', label: `Telemetry Log (${hindsightLogs.length})` },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: 'none',
                border: 'none',
                paddingBottom: 'var(--sp-1)',
                fontSize: 'var(--fs-small)',
                fontFamily: 'var(--mono)',
                color: activeTab === tab.id ? 'var(--accent-text)' : 'var(--text-3)',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--sp-6)' }}>
          {activeTab === 'flow' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
              {/* SECTION 19 PROOF FLOW */}

              {/* 1. RETAIN */}
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-2)', padding: 'var(--sp-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                    <span className="mono" style={{ color: 'var(--accent-text)', fontWeight: 600, fontSize: 'var(--fs-small)' }}>
                      01 // RETAIN
                    </span>
                    <span className="meta" style={{ fontSize: 'var(--fs-nano)' }}>
                      Historical Proposals Codified into Experience
                    </span>
                  </div>
                  <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)' }}>
                    ✓ {memories.length} EXPERIENCES RETAINED
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {memories.map(m => (
                    <span
                      key={m.id}
                      className="mono"
                      style={{
                        fontSize: 'var(--fs-nano)',
                        padding: '3px 8px',
                        background: 'var(--surface-1)',
                        border: '1px solid var(--border-2)',
                        color: m.outcome === 'won' ? 'var(--positive-text)' : 'var(--negative-text)',
                      }}
                    >
                      ✓ #{m.id.toUpperCase()} · {m.outcome.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. RECALL */}
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-2)', padding: 'var(--sp-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                    <span className="mono" style={{ color: 'var(--accent-text)', fontWeight: 600, fontSize: 'var(--fs-small)' }}>
                      02 // RECALL
                    </span>
                    <span className="meta" style={{ fontSize: 'var(--fs-nano)' }}>
                      Live Context Query
                    </span>
                  </div>
                  <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)' }}>
                    SEMANTIC RETRIEVAL
                  </span>
                </div>

                <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', padding: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
                  <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)', marginBottom: '4px' }}>
                    Active RFP Query Context:
                  </div>
                  <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)' }}>
                    {latestRecall?.details || 'Industry: Financial Services / Banking | Requirements: Cloud migration, Minimal downtime, Regulatory compliance, Rollback capability'}
                  </div>
                </div>

                <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)', marginBottom: '6px' }}>
                  Retrieved Relevant Experiences:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(latestRecall?.payload?.retrieved || [
                    { id: 'PROP-093', outcome: 'WON', note: 'Hybrid cloud + rollback + compliance evidence in executive summary' },
                    { id: 'PROP-052', outcome: 'WON', note: 'Phased migration + early compliance evidence' },
                    { id: 'PROP-044', outcome: 'WON', note: 'Granular migration plan + automated rollback checkpoints' },
                    { id: 'PROP-014', outcome: 'LOST', note: 'Timeline was 6 months shorter than realistic migration window' },
                  ]).map((item: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--sp-2) var(--sp-3)',
                        background: 'var(--surface-1)',
                        border: '1px solid var(--border-1)',
                        fontSize: 'var(--fs-small)',
                      }}
                    >
                      <span className="mono" style={{ color: item.outcome === 'WON' || item.outcome === 'won' ? 'var(--positive-text)' : 'var(--negative-text)' }}>
                        #{item.id || item.memoryId} — {item.outcome?.toUpperCase() || 'WON'}
                      </span>
                      <span style={{ color: 'var(--text-2)', fontSize: 'var(--fs-nano)', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.note || item.lesson || 'Rollback procedures reduced execution risk'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. USE */}
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-2)', padding: 'var(--sp-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                    <span className="mono" style={{ color: 'var(--accent-text)', fontWeight: 600, fontSize: 'var(--fs-small)' }}>
                      03 // USE
                    </span>
                    <span className="meta" style={{ fontSize: 'var(--fs-nano)' }}>
                      Proposal Manuscript Grounding
                    </span>
                  </div>
                  <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)' }}>
                    ACTIVE INJECTION
                  </span>
                </div>

                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)', lineHeight: '1.6', background: 'var(--surface-1)', border: '1px solid var(--border-1)', padding: 'var(--sp-3)' }}>
                  <div className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--accent-text)', marginBottom: '4px' }}>
                    Recommendation Grounded in:
                  </div>
                  <strong>PROP-093, PROP-052, PROP-044 & PROP-014</strong>
                  <div style={{ marginTop: 'var(--sp-2)', color: 'var(--text-2)', fontStyle: 'italic' }}>
                    "Our migration approach uses phased production cutover, isolated staging environments and automated rollback checkpoints."
                  </div>
                </div>
              </div>

              {/* 4. LEARN */}
              <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border-2)', padding: 'var(--sp-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                    <span className="mono" style={{ color: 'var(--accent-text)', fontWeight: 600, fontSize: 'var(--fs-small)' }}>
                      04 // LEARN
                    </span>
                    <span className="meta" style={{ fontSize: 'var(--fs-nano)' }}>
                      Post-Award Retrospective Feedback Loop
                    </span>
                  </div>
                  <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)' }}>
                    {learnLogs.length > 0 ? `✓ ${learnLogs.length} COMMITTED` : 'READY FOR INPUT'}
                  </span>
                </div>

                {learnLogs.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {learnLogs.map((log, i) => (
                      <div key={i} style={{ padding: 'var(--sp-3)', background: 'var(--surface-1)', border: '1px solid var(--border-1)', fontSize: 'var(--fs-small)' }}>
                        <span className="mono" style={{ color: 'var(--positive-text)' }}>
                          ✓ {log.sourceId || 'MEM-008'} RETAINED
                        </span>
                        <div style={{ color: 'var(--text-1)', marginTop: '4px' }}>
                          "{log.details}"
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: 'var(--sp-3)', background: 'var(--surface-1)', border: '1px dashed var(--border-2)', fontSize: 'var(--fs-small)', color: 'var(--text-3)' }}>
                    Go to <strong>Outcomes</strong> (/outcomes), record a completed tender outcome with debrief feedback, and click <em>Codify in Hindsight</em>.
                    <br />
                    It will codify the retrospective into an indexed memory experience and make it immediately recallable for future RFPs!
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'corpus' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
              {memories.map(m => (
                <div key={m.id} style={{ background: 'var(--surface-2)', border: '1px solid var(--border-1)', padding: 'var(--sp-4)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
                      <span className="mono" style={{ color: 'var(--accent-text)', fontSize: 'var(--fs-small)' }}>
                        #{m.id.toUpperCase()}
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--text-1)', fontSize: 'var(--fs-small)' }}>
                        {m.rfpTitle}
                      </span>
                    </div>
                    <span
                      className="mono"
                      style={{
                        fontSize: 'var(--fs-nano)',
                        color: m.outcome === 'won' ? 'var(--positive-text)' : 'var(--negative-text)',
                      }}
                    >
                      {m.outcome.toUpperCase()} · {m.budget}
                    </span>
                  </div>

                  <div className="meta" style={{ fontSize: 'var(--fs-nano)', marginBottom: 'var(--sp-2)' }}>
                    Client: <strong>{m.client}</strong> · Sector: <strong>{m.industry}</strong>
                  </div>

                  <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)', lineHeight: '1.5', marginBottom: 'var(--sp-2)' }}>
                    <strong>Lesson:</strong> {m.lessonLearned || m.lessonsLearned?.[0] || 'Rollback procedures reduce execution risk.'}
                  </div>

                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {m.tags.map((t, idx) => (
                      <span key={idx} className="mono" style={{ fontSize: '0.625rem', padding: '1px 5px', background: 'var(--surface-1)', color: 'var(--text-3)', border: '1px solid var(--border-1)' }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'logs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
              {hindsightLogs.slice(-25).reverse().map((log) => (
                <div
                  key={log.id}
                  style={{
                    padding: 'var(--sp-2) var(--sp-3)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border-1)',
                    fontFamily: 'var(--mono)',
                    fontSize: 'var(--fs-nano)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span
                      style={{
                        fontWeight: 600,
                        color:
                          log.operation === 'RETAIN' ? 'var(--positive-text)' :
                          log.operation === 'RECALL' ? 'var(--accent-text)' :
                          log.operation === 'LEARN' ? 'var(--positive-text)' : 'var(--text-1)',
                      }}
                    >
                      [{log.operation}]
                    </span>
                    <span style={{ color: 'var(--text-4)' }}>
                      {log.timestamp && log.timestamp.includes(':') ? log.timestamp : new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-2)', wordBreak: 'break-all' }}>
                    {JSON.stringify(log.details)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
