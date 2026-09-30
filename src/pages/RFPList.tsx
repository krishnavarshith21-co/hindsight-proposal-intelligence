import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';

export default function RFPList() {
  const navigate = useNavigate();
  const { rfps, memories } = useMemory();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [showImportToast, setShowImportToast] = useState<string | null>(null);

  const filterOptions = ['All', 'New', 'Analyzing', 'In Progress', 'Proposal Ready', 'Submitted'];

  const filtered = rfps.filter(r => {
    if (statusFilter !== 'All') {
      const normalizedStatus = (r.status || 'new').toLowerCase().replace(/[-_ ]/g, '');
      const normalizedFilter = statusFilter.toLowerCase().replace(/[-_ ]/g, '');
      if (!normalizedStatus.includes(normalizedFilter) && !normalizedFilter.includes(normalizedStatus)) {
        return false;
      }
    }
    if (search) {
      const q = search.toLowerCase();
      return r.title.toLowerCase().includes(q) ||
             r.client.toLowerCase().includes(q) ||
             r.industry.toLowerCase().includes(q);
    }
    return true;
  });

  const handleImport = () => {
    setShowImportToast('Tender ingestion sync complete · 4 active RFPs indexed in pipeline');
    setTimeout(() => setShowImportToast(null), 4000);
  };

  return (
    <div className="page fade-in">
      {/* Header (Section 9) */}
      <div className="page-header" style={{ marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-header-left">
          <h1 className="page-header-title">Requests for Proposal</h1>
          <div className="page-subtitle">
            Enterprise opportunity pipeline · {rfps.length} tracked tenders
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button className="btn btn-outline btn-sm" onClick={handleImport}>
            Import
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/rfps/rfp-001')}>
            + New RFP
          </button>
        </div>
      </div>

      {showImportToast && (
        <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)', color: 'var(--accent-text)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-3)', animation: 'fadeIn var(--t-fast)' }}>
          ✓ {showImportToast}
        </div>
      )}

      {/* Filters & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
        <div className="filter-pills">
          {filterOptions.map(filter => (
            <button
              key={filter}
              className={`filter-pill ${statusFilter === filter ? 'active' : ''}`}
              onClick={() => setStatusFilter(filter)}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="topbar-search" style={{ width: '260px' }}>
          <span className="topbar-search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search RFPs…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Dense Table (Section 9) */}
      <div className="panel" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '26%' }}>RFP</th>
              <th style={{ width: '16%' }}>Client</th>
              <th style={{ width: '13%' }}>Industry</th>
              <th style={{ width: '11%' }}>Value</th>
              <th style={{ width: '11%' }}>Status</th>
              <th style={{ width: '9%' }}>Due</th>
              <th style={{ width: '11%' }}>Memory Match</th>
              <th style={{ width: '12%' }}>Owner</th>
              <th style={{ width: '8%', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(rfp => {
              const daysLeft = Math.ceil((new Date(rfp.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const isDueSoon = daysLeft <= 7;
              const matchingCount = memories.filter(m =>
                m.industry === rfp.industry ||
                (rfp.industry.includes('Financial') && m.industry.includes('Banking')) ||
                (rfp.industry.includes('Banking') && m.industry.includes('Financial')) ||
                (m.memoryTags || m.tags)?.some(t => rfp.tags?.includes(t))
              ).length;
              const memoryMatch = `${matchingCount} Precedents`;

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
                    <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)' }}>{rfp.client}</span>
                  </td>
                  <td>
                    <span className="badge badge-neutral">{rfp.industry}</span>
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
                  <td>
                    <span className="badge badge-accent" style={{ fontSize: 'var(--fs-nano)' }}>
                      {memoryMatch}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-2)' }}>
                      {rfp.assignee || 'Sarah Chen'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-ghost btn-xs"
                      style={{ color: 'var(--accent-text)' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/rfps/${rfp.id}`);
                      }}
                    >
                      Open →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
