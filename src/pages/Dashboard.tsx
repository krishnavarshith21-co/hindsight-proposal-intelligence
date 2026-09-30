import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';

export default function Overview() {
  const navigate = useNavigate();
  const { rfps, memoryCount, metrics } = useMemory();

  const activeRfps = rfps.filter(r => r.status !== 'submitted');

  // Next Actions (Section 3 Column 2)
  const nextActions = [
    {
      type: 'REVIEW MEMORY',
      rfp: 'Enterprise Cloud Migration Platform',
      detail: '3 relevant precedents retrieved',
      btnLabel: 'Review',
      onClick: () => navigate('/memory-in-action'),
      badgeColor: 'var(--accent-text)',
    },
    {
      type: 'PROPOSAL READY',
      rfp: 'Core Infrastructure Modernization',
      detail: 'Rollback controls recommended',
      btnLabel: 'Open proposal',
      onClick: () => navigate('/proposal'),
      badgeColor: 'var(--positive-text)',
    },
    {
      type: 'OUTCOME REQUIRED',
      rfp: 'Enterprise Analytics & Data Infrastructure',
      detail: 'Record proposal outcome',
      btnLabel: 'Review',
      onClick: () => navigate('/outcomes'),
      badgeColor: 'var(--info-text)',
    },
  ];

  // Recent Intelligence events (Section 3 Column 3)
  const recentIntelligence = [
    {
      type: 'MEMORY RETRIEVED',
      source: '#PROP-044',
      text: 'Phased migration reduced execution risk in banking tenders.',
      time: 'Retrieved in current analysis',
      color: 'var(--accent-text)',
      onClick: () => navigate('/memory'),
    },
    {
      type: 'NEW PATTERN',
      source: 'Financial Services',
      text: 'Early compliance evidence correlated with successful technical evaluations.',
      time: 'Added from #PROP-021, #PROP-104',
      color: 'var(--positive-text)',
      onClick: () => navigate('/insights'),
    },
    {
      type: 'MEMORY UPDATED',
      source: '#PROP-093',
      text: 'Post-award debrief: Rollback checkpoint proof cited as decisive by evaluator.',
      time: 'Retained on 2026-09-22',
      color: 'var(--info-text)',
      onClick: () => navigate('/memory'),
    },
    {
      type: 'RETROSPECTIVE DEBRIEF',
      source: '#PROP-014',
      text: 'Risk caveat: Sub-12mo schedules triggered disqualification on execution risk.',
      time: 'Retained on 2026-04-22',
      color: 'var(--negative-text)',
      onClick: () => navigate('/memory'),
    },
  ];

  // My Work Queue (Section 5)
  const workQueueItems = [
    {
      priority: 'HIGH',
      priorityClass: 'priority-high',
      rfp: 'Enterprise Cloud Migration Platform',
      task: 'Review phased delivery recommendation',
      memory: '3 memories',
      due: 'Today',
      actionLabel: 'Review →',
      action: () => navigate('/memory-in-action'),
    },
    {
      priority: 'MEDIUM',
      priorityClass: 'priority-medium',
      rfp: 'Cybersecurity Operations & Threat Intel',
      task: 'Add early compliance evidence',
      memory: '2 memories',
      due: 'Tomorrow',
      actionLabel: 'Open →',
      action: () => navigate('/rfps/rfp-002'),
    },
    {
      priority: 'HIGH',
      priorityClass: 'priority-high',
      rfp: 'Core Infrastructure Modernization',
      task: 'Review rollback language in Section 4',
      memory: '1 memory',
      due: 'Oct 2',
      actionLabel: 'Open →',
      action: () => navigate('/proposal'),
    },
    {
      priority: 'MEDIUM',
      priorityClass: 'priority-medium',
      rfp: 'Enterprise Analytics & Data Infrastructure',
      task: 'Review store-level commercial ROI positioning',
      memory: '2 memories',
      due: 'Oct 8',
      actionLabel: 'Review →',
      action: () => navigate('/rfps/rfp-003'),
    },
  ];

  return (
    <div className="page fade-in">
      {/* 1. Header (Section 3) */}
      <div className="page-header" style={{ marginBottom: 'var(--sp-3)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-header-left">
          <h1 className="page-header-title">Proposal Intelligence</h1>
          <div className="page-subtitle">
            Your organization's proposal memory, active opportunities and next actions.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/rfps')}>
            + New RFP
          </button>
        </div>
      </div>

      {/* 2. Compact Metric Strip (Section 4) */}
      <div className="metric-strip" style={{ marginBottom: 'var(--sp-4)' }}>
        <div className="metric-item">
          <span className="metric-value" style={{ color: 'var(--positive-text)' }}>{metrics.winRate}%</span>
          <span className="metric-label">Win Rate ({metrics.wonCount}W / {metrics.lostCount}L)</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-item">
          <span className="metric-value" style={{ color: 'var(--accent-text)' }}>{memoryCount}</span>
          <span className="metric-label">Memories</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-item">
          <span className="metric-value">{activeRfps.length}</span>
          <span className="metric-label">Active RFPs</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-item">
          <span className="metric-value" style={{ color: 'var(--text-1)' }}>{metrics.activePipelineValueFormatted}</span>
          <span className="metric-label" title={metrics.pipelineCalculationMethod}>
            Pipeline Value (Midpoint)
          </span>
        </div>
      </div>

      {/* 3. Main Workspace 3-Column Structure (Section 3) */}
      <div className="ws-grid ws-grid-3col" style={{ marginBottom: 'var(--sp-5)' }}>
        {/* COLUMN 1 — ACTIVE WORK (~45% width) */}
        <div className="panel" style={{ padding: 0 }}>
          <div className="panel-header" style={{ padding: 'var(--sp-3) var(--sp-4)', borderBottom: '1px solid var(--border-1)' }}>
            <div>
              <div className="panel-title">Active RFPs</div>
              <div className="panel-subtitle">{activeRfps.length} opportunities in pipeline</div>
            </div>
            <button className="btn btn-ghost btn-xs" onClick={() => navigate('/rfps')}>
              View all RFPs →
            </button>
          </div>

          <table className="work-queue">
            <thead>
              <tr>
                <th>RFP</th>
                <th>Client</th>
                <th>Value</th>
                <th>Status</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              {rfps.slice(0, 5).map(rfp => {
                const daysLeft = Math.ceil((new Date(rfp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                const isDueSoon = daysLeft <= 7;
                return (
                  <tr
                    key={rfp.id}
                    onClick={() => navigate(`/rfps/${rfp.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div className="cell-primary" style={{ fontSize: 'var(--fs-small)' }}>{rfp.title}</div>
                      <div className="meta" style={{ fontSize: 'var(--fs-nano)' }}>{rfp.id.toUpperCase()}</div>
                    </td>
                    <td>
                      <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)' }}>{rfp.client}</span>
                    </td>
                    <td>
                      <span className="cell-mono">{rfp.budget}</span>
                    </td>
                    <td>
                      <div className={`status status-${(rfp.status || 'new').replace(/\s+/g, '-')}`}>
                        <span className="status-dot" />
                        <span style={{ fontSize: 'var(--fs-nano)' }}>{(rfp.status || 'NEW').toUpperCase()}</span>
                      </div>
                    </td>
                    <td>
                      <span className={isDueSoon ? 'priority-high' : 'cell-mono'}>
                        {rfp.deadline}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: 'var(--sp-2) var(--sp-4)', borderTop: '1px solid var(--border-1)', textAlign: 'right' }}>
            <span
              onClick={() => navigate('/rfps')}
              style={{ fontSize: 'var(--fs-small)', color: 'var(--accent-text)', cursor: 'pointer', fontWeight: 500 }}
            >
              View all RFPs →
            </span>
          </div>
        </div>

        {/* COLUMN 2 — NEXT ACTIONS (~25% width) */}
        <div className="panel" style={{ padding: 0 }}>
          <div className="panel-header" style={{ padding: 'var(--sp-3) var(--sp-4)', borderBottom: '1px solid var(--border-1)' }}>
            <div>
              <div className="panel-title">Next Actions</div>
              <div className="panel-subtitle">Prioritized operational steps</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {nextActions.map((action, idx) => (
              <div
                key={idx}
                className="action-item"
                style={{ padding: 'var(--sp-3) var(--sp-4)', borderBottom: idx < nextActions.length - 1 ? '1px solid var(--border-1)' : 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: action.badgeColor, fontWeight: 600 }}>
                    {action.type}
                  </span>
                  <button className="btn btn-outline btn-xs" onClick={action.onClick}>
                    {action.btnLabel}
                  </button>
                </div>
                <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-1)', marginBottom: '2px' }}>
                  {action.rfp}
                </div>
                <div className="meta" style={{ fontSize: 'var(--fs-small)', color: 'var(--text-3)' }}>
                  {action.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 3 — INTELLIGENCE (~30% width) */}
        <div className="panel" style={{ padding: 0 }}>
          <div className="panel-header" style={{ padding: 'var(--sp-3) var(--sp-4)', borderBottom: '1px solid var(--border-1)' }}>
            <div>
              <div className="panel-title">Recent Intelligence</div>
              <div className="panel-subtitle">Institutional memory events</div>
            </div>
            <button className="btn btn-ghost btn-xs" onClick={() => navigate('/memory')}>
              Explore
            </button>
          </div>

          <div style={{ padding: 'var(--sp-2) var(--sp-4)' }}>
            {recentIntelligence.map((intel, idx) => (
              <div
                key={idx}
                className="feed-item"
                onClick={intel.onClick}
                style={{ cursor: 'pointer', padding: 'var(--sp-3) 0', borderBottom: idx < recentIntelligence.length - 1 ? '1px solid var(--border-1)' : 'none' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: intel.color, fontWeight: 600 }}>
                    {intel.type}
                  </span>
                  <span className="meta" style={{ fontSize: 'var(--fs-nano)' }}>{intel.time}</span>
                </div>
                <div style={{ fontSize: 'var(--fs-small)', fontWeight: 500, color: 'var(--text-1)', marginBottom: '2px' }}>
                  {intel.source}
                </div>
                <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)', lineHeight: 1.4 }}>
                  {intel.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MY WORK QUEUE (Section 5) */}
      <div className="panel" style={{ padding: 0 }}>
        <div className="panel-header" style={{ padding: 'var(--sp-3) var(--sp-4)', borderBottom: '1px solid var(--border-1)' }}>
          <div>
            <div className="panel-title" style={{ letterSpacing: '0.04em' }}>MY WORK QUEUE</div>
            <div className="panel-subtitle">Active action items across assigned tenders</div>
          </div>
          <span className="badge badge-accent">4 Tasks Due</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Priority</th>
              <th style={{ width: '28%' }}>RFP</th>
              <th style={{ width: '30%' }}>Task</th>
              <th style={{ width: '12%' }}>Memory</th>
              <th style={{ width: '10%' }}>Due</th>
              <th style={{ width: '10%', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {workQueueItems.map((item, idx) => (
              <tr key={idx} onClick={item.action} style={{ cursor: 'pointer' }}>
                <td>
                  <span className={item.priorityClass}>{item.priority}</span>
                </td>
                <td>
                  <div className="cell-primary" style={{ fontSize: 'var(--fs-small)' }}>{item.rfp}</div>
                </td>
                <td>
                  <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)' }}>{item.task}</span>
                </td>
                <td>
                  <span className="badge badge-neutral" style={{ color: 'var(--accent-text)' }}>{item.memory}</span>
                </td>
                <td>
                  <span className="cell-mono" style={{ color: item.due === 'Today' ? 'var(--negative-text)' : 'var(--text-2)' }}>{item.due}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-ghost btn-xs" style={{ color: 'var(--accent-text)' }} onClick={(e) => { e.stopPropagation(); item.action(); }}>
                    {item.actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
