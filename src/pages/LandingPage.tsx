import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="landing">
      {/* ─── NAVIGATION ─── */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-nav-brand">
            <span className="landing-nav-logo">⬡</span>
            <span className="landing-nav-name">APEX DIGITAL SYSTEMS</span>
          </div>

          <div className="landing-nav-links">
            <a href="#product" className="landing-nav-link">Product</a>
            <a href="#how-it-works" className="landing-nav-link">How It Works</a>
            <a href="#memory" className="landing-nav-link">Memory</a>
            <a href="#features" className="landing-nav-link">Features</a>
          </div>

          <div className="landing-nav-actions">
            {isAuthenticated ? (
              <button className="btn btn-primary btn-sm" onClick={() => navigate('/overview')}>
                Enter Workspace
              </button>
            ) : (
              <>
                <button className="landing-nav-signin" onClick={() => navigate('/sign-in')}>
                  Sign In
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => navigate('/sign-up')}>
                  Start Free
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-badge">Proposal Intelligence · Powered by Hindsight</div>
          <h1 className="landing-hero-title">
            Your proposals should remember<br />
            what your organization already learned.
          </h1>
          <p className="landing-hero-sub">
            Proposal Intelligence uses organizational memory to connect previous wins, losses,
            client feedback and lessons to the RFPs your team is working on today.
          </p>
          <div className="landing-hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/sign-up')}>
              Start Free
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              See How Memory Works
            </button>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT VISUAL ─── */}
      <section id="product" className="landing-section">
        <div className="landing-section-inner">
          <div className="landing-product-flow">
            <div className="landing-flow-card">
              <div className="landing-flow-label">CURRENT RFP</div>
              <div className="landing-flow-title">Enterprise Cloud Migration</div>
              <div className="landing-flow-meta">Northstar Global Financial · Financial Services · $2.4M–$3.1M</div>
            </div>
            <div className="landing-flow-arrow">↓</div>
            <div className="landing-flow-card landing-flow-card--accent">
              <div className="landing-flow-label">HINDSIGHT RECALL</div>
              <div className="landing-flow-title">3 relevant experiences retrieved</div>
              <div className="landing-flow-items">
                <div className="landing-flow-item landing-flow-item--won">
                  <span className="landing-flow-dot landing-flow-dot--won">●</span>
                  PROP-044 · Won · Crestline Insurance · Rollback controls
                </div>
                <div className="landing-flow-item landing-flow-item--won">
                  <span className="landing-flow-dot landing-flow-dot--won">●</span>
                  PROP-021 · Won · Harbor Health · Early compliance evidence
                </div>
                <div className="landing-flow-item landing-flow-item--lost">
                  <span className="landing-flow-dot landing-flow-dot--lost">●</span>
                  PROP-014 · Lost · Northstar Bank · Aggressive timeline risk
                </div>
              </div>
            </div>
            <div className="landing-flow-arrow">↓</div>
            <div className="landing-flow-card">
              <div className="landing-flow-label">OBSERVED PATTERN</div>
              <div className="landing-flow-title">Phased delivery + rollback controls</div>
              <div className="landing-flow-meta">Regulated buyers disqualify compressed timelines</div>
            </div>
            <div className="landing-flow-arrow">↓</div>
            <div className="landing-flow-card landing-flow-card--positive">
              <div className="landing-flow-label">RECOMMENDATION</div>
              <div className="landing-flow-title">Lead with explicit risk controls and early compliance evidence</div>
              <div className="landing-flow-meta">Grounded in 3 historical outcomes</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" className="landing-section landing-section--alt">
        <div className="landing-section-inner">
          <h2 className="landing-section-title">How Hindsight Works</h2>
          <p className="landing-section-sub">
            Organizational memory that compounds over time.
          </p>
          <div className="landing-steps">
            <div className="landing-step">
              <div className="landing-step-num">1</div>
              <div className="landing-step-title">Capture Experience</div>
              <div className="landing-step-desc">
                Record proposal outcomes, client feedback, root causes, and lessons after every submission.
              </div>
            </div>
            <div className="landing-step">
              <div className="landing-step-num">2</div>
              <div className="landing-step-title">Remember Outcomes</div>
              <div className="landing-step-desc">
                Structure experiences into searchable organizational memory with industry, context, and outcome metadata.
              </div>
            </div>
            <div className="landing-step">
              <div className="landing-step-num">3</div>
              <div className="landing-step-title">Recall Relevant Evidence</div>
              <div className="landing-step-desc">
                When a new RFP arrives, Hindsight retrieves the most relevant historical precedents.
              </div>
            </div>
            <div className="landing-step">
              <div className="landing-step-num">4</div>
              <div className="landing-step-title">Improve the Next Proposal</div>
              <div className="landing-step-desc">
                Use grounded recommendations backed by real outcome data to write better proposals.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY HINDSIGHT ─── */}
      <section id="memory" className="landing-section">
        <div className="landing-section-inner">
          <h2 className="landing-section-title">Why Hindsight</h2>
          <p className="landing-section-sub">
            Generic AI generates. Hindsight remembers, reasons, and recommends.
          </p>

          <div className="landing-compare">
            <div className="landing-compare-col landing-compare-col--basic">
              <div className="landing-compare-heading">Normal AI</div>
              <div className="landing-compare-flow">
                <span className="landing-compare-node">RFP</span>
                <span className="landing-compare-arrow">→</span>
                <span className="landing-compare-node">Generate</span>
              </div>
              <p className="landing-compare-note">No memory. No outcomes. No learning.</p>
            </div>

            <div className="landing-compare-col landing-compare-col--apex">
              <div className="landing-compare-heading">Apex Hindsight</div>
              <div className="landing-compare-flow landing-compare-flow--vertical">
                {['RFP', 'Recall', 'Compare', 'Learn', 'Recommend', 'Proposal', 'Outcome', 'Remember'].map((step, i, arr) => (
                  <span key={step}>
                    <span className="landing-compare-node landing-compare-node--accent">{step}</span>
                    {i < arr.length - 1 && <span className="landing-compare-arrow-down">↓</span>}
                  </span>
                ))}
              </div>
              <p className="landing-compare-note">Continuous organizational learning loop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="landing-section landing-section--alt">
        <div className="landing-section-inner">
          <h2 className="landing-section-title">Product Features</h2>
          <div className="landing-features">
            {[
              { icon: '◎', title: 'Organizational Memory', desc: 'Persistent, searchable memory of every proposal outcome, client signal, and organizational lesson.' },
              { icon: '◈', title: 'Outcome Intelligence', desc: 'Track wins, losses, and no-decisions with structured root causes and client feedback.' },
              { icon: '☰', title: 'RFP Analysis', desc: 'Analyze new RFPs against your historical experience base to surface relevant precedents.' },
              { icon: '⚡', title: 'Evidence-Grounded Recommendations', desc: 'Every recommendation cites specific historical outcomes and client signals.' },
              { icon: '✎', title: 'Proposal Assistance', desc: 'Apply memory-grounded suggestions directly into proposal sections with source attribution.' },
              { icon: '⟲', title: 'Continuous Learning', desc: 'Every outcome feeds back into memory. The system gets smarter with every proposal.' },
            ].map((feat) => (
              <div key={feat.title} className="landing-feature">
                <div className="landing-feature-icon">{feat.icon}</div>
                <div className="landing-feature-title">{feat.title}</div>
                <div className="landing-feature-desc">{feat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="landing-section landing-cta">
        <div className="landing-section-inner" style={{ textAlign: 'center' }}>
          <h2 className="landing-section-title">
            Start building with organizational memory.
          </h2>
          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/sign-up')}>
              Create your workspace
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('/sign-in')}>
              Explore Demo
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div>
            <div className="landing-footer-brand">APEX DIGITAL SYSTEMS</div>
            <div className="landing-footer-tagline">Proposal Intelligence</div>
          </div>
          <div className="landing-footer-badge">
            Synthetic demo environment
          </div>
        </div>
      </footer>
    </div>
  );
}
