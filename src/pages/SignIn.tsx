import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, DEMO_CREDENTIALS } from '../context/AuthContext';

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/overview', { replace: true });
    } else {
      setError(result.error || 'Sign in failed.');
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    const result = await signIn(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
    setLoading(false);
    if (result.success) {
      navigate('/overview', { replace: true });
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
            Turn proposal history into organizational intelligence.
          </div>

          <div className="auth-left-visual">
            <div className="auth-visual-flow">
              <div className="auth-visual-node">Experience</div>
              <div className="auth-visual-arrow">↓</div>
              <div className="auth-visual-node auth-visual-node--accent">Memory</div>
              <div className="auth-visual-arrow">↓</div>
              <div className="auth-visual-node">Recall</div>
              <div className="auth-visual-arrow">↓</div>
              <div className="auth-visual-node auth-visual-node--positive">Better Proposals</div>
            </div>
          </div>

          <div className="auth-left-footer">
            Synthetic demo environment
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <h1 className="auth-form-title">Welcome back</h1>
          <p className="auth-form-sub">Sign in to your proposal workspace.</p>

          {error && (
            <div className="auth-error">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-label" htmlFor="signin-email">Work email</label>
              <input
                id="signin-email"
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
              <label className="auth-label" htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                type="password"
                className="auth-input"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            className="btn btn-ghost btn-full"
            onClick={handleDemoLogin}
            disabled={loading}
            style={{ fontFamily: 'var(--mono)', fontSize: 'var(--fs-micro)' }}
          >
            Explore Demo as {DEMO_CREDENTIALS.userName}
          </button>

          <div className="auth-footer-links">
            <span className="auth-footer-text">
              Don't have an account?{' '}
              <Link to="/sign-up" className="auth-footer-link">Create account →</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
