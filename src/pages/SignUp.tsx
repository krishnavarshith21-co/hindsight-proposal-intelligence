import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const result = await signUp({ fullName, email, password, company, role });
    setLoading(false);

    if (result.success) {
      navigate('/onboarding', { replace: true });
    } else {
      setError(result.error || 'Sign up failed.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-left-brand">
            <span className="auth-left-logo">⬡</span>
            <div>
              <div className="auth-left-name">APEX DIGITAL SYSTEMS</div>
              <div className="auth-left-tagline">Proposal Intelligence</div>
            </div>
          </div>

          <div className="auth-left-quote">
            Build proposals backed by<br />
            organizational memory.
          </div>

          <div className="auth-left-visual">
            <div className="auth-visual-stats">
              <div className="auth-visual-stat">
                <div className="auth-visual-stat-value">70%</div>
                <div className="auth-visual-stat-label">Win Rate</div>
              </div>
              <div className="auth-visual-stat">
                <div className="auth-visual-stat-value">10</div>
                <div className="auth-visual-stat-label">Experiences</div>
              </div>
              <div className="auth-visual-stat">
                <div className="auth-visual-stat-value">6</div>
                <div className="auth-visual-stat-label">Patterns</div>
              </div>
            </div>
          </div>

          <div className="auth-left-footer">
            Synthetic demo environment
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Create your workspace</h1>
          <p className="auth-form-sub">Start building with organizational memory.</p>

          {error && (
            <div className="auth-error">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                type="text"
                className="auth-input"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                autoComplete="name"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-email">Work email</label>
              <input
                id="signup-email"
                type="email"
                className="auth-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                className="auth-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                required
                autoComplete="new-password"
                minLength={6}
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-company">Company</label>
              <input
                id="signup-company"
                type="text"
                className="auth-input"
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="Your organization"
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-role">Role</label>
              <input
                id="signup-role"
                type="text"
                className="auth-input"
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="e.g. Proposal Strategist"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Creating workspace…' : 'Create Workspace'}
            </button>
          </form>

          <div className="auth-footer-links">
            <span className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/sign-in" className="auth-footer-link">Sign in →</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
