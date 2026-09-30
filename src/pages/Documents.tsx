import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';
import { buildCanonicalDocuments } from '../data';
import type { CanonicalDocument } from '../types';

export default function Documents() {
  const navigate = useNavigate();
  const { rfps, memories } = useMemory();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const documents: CanonicalDocument[] = useMemo(() => {
    return buildCanonicalDocuments(rfps, memories);
  }, [rfps, memories]);

  const filtered = documents.filter(d => {
    if (typeFilter !== 'all' && d.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
    if (search) {
      const q = search.toLowerCase();
      return d.name.toLowerCase().includes(q) ||
             d.sourceTitle.toLowerCase().includes(q) ||
             d.type.toLowerCase().includes(q);
    }
    return true;
  });

  const handleAction = (actionName: string, doc: CanonicalDocument) => {
    if (actionName === 'Open') {
      setToastMessage(`Opening ${doc.name} in secure document viewer…`);
    } else if (actionName === 'Analyze') {
      navigate('/memory-in-action');
    } else if (actionName === 'View Memory') {
      navigate('/memory');
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUploadRfp = () => {
    setShowUploadModal(false);
    setToastMessage('RFP specification parsed and indexed into Hindsight memory graph.');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="page fade-in">
      {/* Header (Section 12) */}
      <div className="page-header" style={{ marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
        <div className="page-header-left">
          <h1 className="page-header-title">Documents</h1>
          <div className="page-subtitle">
            Enterprise document management · Tender specifications, proposals, and verified artifacts
          </div>
        </div>
        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
          <button className="btn btn-primary btn-sm" onClick={() => setShowUploadModal(true)}>
            [ Upload RFP ]
          </button>
        </div>
      </div>

      {toastMessage && (
        <div style={{ padding: 'var(--sp-2) var(--sp-3)', background: 'var(--surface-2)', border: '1px solid var(--accent-border)', borderRadius: 'var(--r-sm)', color: 'var(--accent-text)', fontSize: 'var(--fs-small)', marginBottom: 'var(--sp-4)', animation: 'fadeIn var(--t-fast)' }}>
          ✓ {toastMessage}
        </div>
      )}

      {/* Filters & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
        <div className="filter-pills">
          {[
            { key: 'all', label: 'ALL' },
            { key: 'RFP Specification', label: 'RFP SPECS' },
            { key: 'Proposal Submission', label: 'PROPOSALS' },
            { key: 'Compliance Artifact', label: 'COMPLIANCE' },
            { key: 'Technical Architecture', label: 'ARCHITECTURE' },
          ].map(tab => (
            <button
              key={tab.key}
              className={`filter-pill ${typeFilter === tab.key ? 'active' : ''}`}
              onClick={() => setTypeFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="topbar-search" style={{ width: '280px' }}>
          <span className="topbar-search-icon">⌕</span>
          <input
            type="text"
            placeholder="Search documents…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Dense Table (Section 12: Document, Type, RFP, Uploaded, Status, Indexed, Actions) */}
      <div className="panel" style={{ padding: 0 }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: '32%' }}>Document</th>
              <th style={{ width: '15%' }}>Type</th>
              <th style={{ width: '20%' }}>RFP</th>
              <th style={{ width: '10%' }}>Uploaded</th>
              <th style={{ width: '9%' }}>Status</th>
              <th style={{ width: '8%' }}>Indexed</th>
              <th style={{ width: '16%', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(doc => (
              <tr key={doc.id}>
                <td>
                  <div className="cell-primary" style={{ fontSize: 'var(--fs-small)' }}>{doc.name}</div>
                  <div className="meta" style={{ fontSize: 'var(--fs-nano)' }}>{doc.fileSizeFormatted} · {doc.id}</div>
                </td>
                <td>
                  <span className="badge badge-neutral" style={{ fontSize: 'var(--fs-nano)' }}>
                    {doc.type}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: 'var(--fs-small)', color: 'var(--text-1)' }}>{doc.sourceTitle}</span>
                </td>
                <td>
                  <span className="cell-mono">{doc.uploadedDate}</span>
                </td>
                <td>
                  <div className={`status ${doc.status === 'Ready' || doc.status === 'Verified' || doc.status === 'Awarded' ? 'status-won' : 'status-lost'}`}>
                    <span className="status-dot" />
                    <span style={{ fontSize: 'var(--fs-nano)' }}>{doc.status.toUpperCase()}</span>
                  </div>
                </td>
                <td>
                  <span className="mono" style={{ fontSize: 'var(--fs-nano)', color: 'var(--positive-text)' }}>
                    {doc.indexedInHindsight ? '✓ YES' : 'NO'}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleAction('Open', doc)}
                      title="Open document"
                    >
                      Open
                    </button>
                    <button
                      className="btn btn-ghost btn-xs"
                      style={{ color: 'var(--accent-text)' }}
                      onClick={() => handleAction('Analyze', doc)}
                      title="Analyze with Hindsight"
                    >
                      Analyze
                    </button>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleAction('View Memory', doc)}
                      title="View corresponding memory"
                    >
                      View Memory
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload RFP Modal */}
      {showUploadModal && (
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
          onClick={() => setShowUploadModal(false)}
        >
          <div
            className="panel fade-in"
            style={{
              width: '560px',
              maxWidth: '95vw',
              background: 'var(--surface-1)',
              border: '1px solid var(--border-2)',
              padding: 'var(--sp-5)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-4)', paddingBottom: 'var(--sp-3)', borderBottom: '1px solid var(--border-1)' }}>
              <div>
                <h2 style={{ fontSize: 'var(--fs-section-title)', fontWeight: 600, color: 'var(--text-1)' }}>
                  Upload RFP Document
                </h2>
                <div className="meta">Auto-extract requirements and match against historical precedents</div>
              </div>
              <button className="btn btn-ghost btn-xs" onClick={() => setShowUploadModal(false)}>
                ✕ Close
              </button>
            </div>

            <div
              style={{
                border: '2px dashed var(--border-2)',
                borderRadius: 'var(--r-md)',
                padding: 'var(--sp-6)',
                textAlign: 'center',
                background: 'var(--surface-2)',
                cursor: 'pointer',
                marginBottom: 'var(--sp-4)',
              }}
              onClick={handleUploadRfp}
            >
              <div style={{ fontSize: '2rem', marginBottom: 'var(--sp-2)' }}>📄</div>
              <div style={{ fontSize: 'var(--fs-body)', fontWeight: 500, color: 'var(--text-1)' }}>
                Drag and drop RFP specification PDF or DOCX
              </div>
              <div className="meta" style={{ marginTop: '4px' }}>
                Files up to 50MB supported · Optical layout extraction enabled
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--sp-2)' }}>
              <button className="btn btn-outline" onClick={() => setShowUploadModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUploadRfp}>
                Parse & Index Document →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
