import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useMemory } from '../context/MemoryContext';
import { useAuth } from '../context/AuthContext';
import HindsightDebugPanel from './HindsightDebugPanel';

const routeLabels: Record<string, string> = {
  '/overview': 'Overview',
  '/rfps': 'RFPs',
  '/proposal': 'Proposals',
  '/proposals': 'Proposals',
  '/memory-in-action': 'Memory in Action',
  '/intelligence': 'Recommendations',
  '/recommendations': 'Recommendations',
  '/memory': 'Memory',
  '/insights': 'Insights',
  '/outcomes': 'Outcomes',
  '/documents': 'Documents',
  '/settings': 'Settings',
};

const notifications = [
  { id: 1, title: 'Memory Recall Complete', message: '4 precedents matched for Northstar Global Financial RFP', time: 'Retrieved in current analysis', unread: true, type: 'accent' },
  { id: 2, title: 'Deadline Alert', message: 'Northstar submission due in 17 days', time: 'Target: 2026-10-15', unread: true, type: 'caution' },
  { id: 3, title: 'Outcome Recorded', message: 'Omnichannel Commerce Modernization — WON ($1.8M)', time: 'Retained on 2026-09-26', unread: false, type: 'positive' },
  { id: 4, title: 'New RFP Received', message: 'Pioneer Retail Holdings — Enterprise Analytics & Data Infrastructure', time: 'Received 2026-09-25', unread: false, type: 'info' },
];

export default function TopBar() {
  const location = useLocation();
  const { memoryCount } = useMemory();
  const { user } = useAuth();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showInspector, setShowInspector] = useState(false);

  const userInitials = user?.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SC';

  const pathBase = '/' + location.pathname.split('/').filter(Boolean)[0];
  const currentLabel = routeLabels[pathBase] || routeLabels[location.pathname] || 'Workspace';

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <header className="topbar">
        {/* Breadcrumb */}
        <div className="topbar-breadcrumb">
          <span style={{ color: 'var(--text-3)', fontWeight: 500 }}>Apex Digital Systems</span>
          <span className="topbar-breadcrumb-sep">/</span>
          <span className="topbar-breadcrumb-current">{currentLabel}</span>
        </div>

        {/* Environment Badge */}
        <div className="topbar-env" title="Demonstration environment populated with synthetic enterprise proposal history">
          SYNTHETIC DATA
        </div>

        <div className="topbar-spacer" />

        {/* Global Search */}
        <div className="topbar-search">
          <span className="topbar-search-icon">⌕</span>
          <input placeholder="Search proposals, clients, memories…" aria-label="Search" />
        </div>

        {/* Actions & Profile */}
        <div className="topbar-actions">
          <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--text-3)' }}>
            {memoryCount} memories
          </span>

          <button
            className="topbar-icon-btn"
            onClick={() => setShowInspector(true)}
            title="Open Hindsight Memory Inspector"
            style={{ fontSize: 'var(--fs-micro)', padding: '3px 8px', width: 'auto', gap: '4px' }}
          >
            <span>⚡</span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-nano)' }}>HINDSIGHT</span>
          </button>

          <button
            className="topbar-icon-btn"
            onClick={() => setShowNotifs(!showNotifs)}
            title="Notifications"
          >
            ⚑
            {unreadCount > 0 && <span className="badge-dot" />}
          </button>

          <button
            className="topbar-icon-btn"
            onClick={() => setShowInspector(true)}
            title="Help & Architecture"
            style={{ fontSize: '13px' }}
          >
            ?
          </button>

          {/* User Avatar */}
          <div
            title={`${user?.fullName || 'Sarah Chen'} — ${user?.role || 'Lead Proposal Strategist'}`}
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'var(--surface-3)',
              border: '1px solid var(--border-2)',
              color: 'var(--text-1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: 'var(--sans)',
              cursor: 'pointer',
              marginLeft: '4px',
            }}
          >
            {userInitials}
          </div>
        </div>

        {showNotifs && (
          <div className="notif-panel">
            <div className="notif-panel-header">
              <span style={{ fontSize: 'var(--fs-small)', fontWeight: 600, color: 'var(--text-1)' }}>
                Notifications ({unreadCount} unread)
              </span>
              <button className="btn btn-ghost btn-xs" onClick={() => setShowNotifs(false)}>
                Dismiss
              </button>
            </div>
            <div className="notif-panel-list">
              {notifications.map(n => (
                <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                  <div className="notif-item-icon" style={{
                    color: n.type === 'accent' ? 'var(--accent)' : n.type === 'positive' ? 'var(--positive)' : n.type === 'caution' ? 'var(--caution)' : 'var(--info)',
                  }}>●</div>
                  <div>
                    <div className="notif-item-title">{n.title}</div>
                    <div className="notif-item-message">{n.message}</div>
                    <div className="notif-item-time">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Memory Inspector Drawer */}
      <HindsightDebugPanel isOpen={showInspector} onClose={() => setShowInspector(false)} />
    </>
  );
}
