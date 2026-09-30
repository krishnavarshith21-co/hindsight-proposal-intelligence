import { NavLink, useNavigate } from 'react-router-dom';
import { useMemory } from '../context/MemoryContext';
import { useAuth } from '../context/AuthContext';

export default function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const { rfps, memoryCount } = useMemory();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const activeCount = rfps.filter(r => r.status !== 'submitted').length;

  const workspaceLinks = [
    { to: '/overview', label: 'Overview', icon: '⊞', count: null },
    { to: '/rfps', label: 'RFPs', icon: '☰', count: activeCount },
    { to: '/proposal', label: 'Proposals', icon: '✎', count: null },
    { to: '/memory', label: 'Memory', icon: '◎', count: memoryCount },
    { to: '/insights', label: 'Insights', icon: '▤', count: null },
  ];

  const intelligenceLinks = [
    { to: '/memory-in-action', label: 'Memory in Action', icon: '⚡', count: null },
    { to: '/recommendations', label: 'Recommendations', icon: '◈', count: null },
  ];

  const operationsLinks = [
    { to: '/outcomes', label: 'Outcomes', icon: '◉', count: null },
    { to: '/documents', label: 'Documents', icon: '☷', count: null },
  ];

  const handleSignOut = () => {
    signOut();
    navigate('/', { replace: true });
  };

  return (
    <>
      {open && <div className="nav-backdrop" onClick={onClose} />}
      <nav className={`nav ${open ? 'open' : ''}`}>
        <div className="nav-brand">
          <div className="nav-brand-name">APEX DIGITAL SYSTEMS</div>
          <div className="nav-brand-label">Proposal Intelligence</div>
        </div>

        <div className="nav-links">
          <div className="nav-group-label">WORKSPACE</div>
          {workspaceLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', textAlign: 'center', fontSize: '12px', opacity: 0.7 }}>{link.icon}</span>
                {link.label}
              </span>
              {link.count !== null && <span className="nav-link-count">{link.count}</span>}
            </NavLink>
          ))}

          <div className="nav-separator" />
          <div className="nav-group-label">INTELLIGENCE</div>
          {intelligenceLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', textAlign: 'center', fontSize: '12px', opacity: 0.7 }}>{link.icon}</span>
                {link.label}
              </span>
              {link.count !== null && <span className="nav-link-count">{link.count}</span>}
            </NavLink>
          ))}

          <div className="nav-separator" />
          <div className="nav-group-label">OPERATIONS</div>
          {operationsLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '16px', textAlign: 'center', fontSize: '12px', opacity: 0.7 }}>{link.icon}</span>
                {link.label}
              </span>
              {link.count !== null && <span className="nav-link-count">{link.count}</span>}
            </NavLink>
          ))}

          <div className="nav-separator" />
          <NavLink
            to="/settings"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '16px', textAlign: 'center', fontSize: '12px', opacity: 0.7 }}>⚙</span>
              Settings
            </span>
          </NavLink>
        </div>

        <div className="nav-footer">
          <div className="nav-user-name">{user?.fullName || 'Sarah Chen'}</div>
          <div className="nav-user-role">{user?.role || 'Lead Proposal Strategist'}</div>
          <button
            className="nav-signout"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </nav>
    </>
  );
}
