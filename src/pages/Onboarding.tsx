import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const INDUSTRY_OPTIONS = [
  'Financial Services',
  'Healthcare',
  'Insurance',
  'Technology',
  'Retail',
  'Government',
  'Energy',
  'Manufacturing',
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const [teamSize, setTeamSize] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const handleFinish = () => {
    completeOnboarding({
      teamSize: teamSize || undefined,
      industries: selectedIndustries.length > 0 ? selectedIndustries : undefined,
    });
    navigate('/overview', { replace: true });
  };

  const handleSkip = () => {
    completeOnboarding({});
    navigate('/overview', { replace: true });
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div className="onboarding-header">
          <span className="onboarding-logo">⬡</span>
          <div className="onboarding-brand">APEX DIGITAL SYSTEMS</div>
        </div>

        <h1 className="onboarding-title">Set up your proposal workspace</h1>
        <p className="onboarding-sub">
          Help us configure your workspace. You can change these later.
        </p>

        <div className="onboarding-form">
          <div className="onboarding-field">
            <label className="auth-label">Company</label>
            <div className="onboarding-readonly">{user?.company || 'Apex Digital Systems'}</div>
          </div>

          <div className="onboarding-field">
            <label className="auth-label">Role</label>
            <div className="onboarding-readonly">{user?.role || 'Proposal Strategist'}</div>
          </div>

          <div className="onboarding-field">
            <label className="auth-label" htmlFor="onboarding-team">Team size <span className="auth-optional">(optional)</span></label>
            <select
              id="onboarding-team"
              className="auth-input"
              value={teamSize}
              onChange={e => setTeamSize(e.target.value)}
            >
              <option value="">Select…</option>
              <option value="1-5">1–5</option>
              <option value="5-10">5–10</option>
              <option value="10-25">10–25</option>
              <option value="25-50">25–50</option>
              <option value="50+">50+</option>
            </select>
          </div>

          <div className="onboarding-field">
            <label className="auth-label">Primary industries</label>
            <div className="onboarding-industries">
              {INDUSTRY_OPTIONS.map(industry => (
                <button
                  key={industry}
                  type="button"
                  className={`onboarding-industry-btn ${selectedIndustries.includes(industry) ? 'selected' : ''}`}
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="onboarding-actions">
          <button className="btn btn-primary btn-lg btn-full" onClick={handleFinish}>
            Enter Workspace
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleSkip} style={{ marginTop: '8px' }}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
