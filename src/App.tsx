import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { MemoryProvider } from './context/MemoryContext';

// Public pages
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Onboarding from './pages/Onboarding';

// Protected application pages
import Overview from './pages/Dashboard';
import RFPList from './pages/RFPList';
import RFPWorkspace from './pages/RFPWorkspace';
import Intelligence from './pages/Intelligence';
import Memory from './pages/Memory';
import Insights from './pages/Insights';
import Outcomes from './pages/Outcomes';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import ProposalEditor from './pages/ProposalEditor';
import MemoryInAction from './pages/MemoryInAction';

// ============================================================
// LAYOUT: Authenticated application shell with sidebar + topbar
// ============================================================
function AppShell({ children }: { children: React.ReactNode }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="shell">
      {/* Mobile Top Bar */}
      <header className="mobile-bar">
        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-1)' }}>
          APEX DIGITAL SYSTEMS
        </div>
        <button
          onClick={() => setNavOpen(!navOpen)}
          style={{
            padding: '4px 8px',
            fontSize: 'var(--fs-micro)',
            color: 'var(--text-2)',
            border: '1px solid var(--border-2)',
            borderRadius: 'var(--r-sm)',
            background: 'var(--surface-2)',
            cursor: 'pointer',
          }}
        >
          {navOpen ? '✕' : '☰'}
        </button>
      </header>

      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="app-body">
        <TopBar />
        <main className="main">
          {children}
        </main>
      </div>
    </div>
  );
}

// ============================================================
// PROTECTED WRAPPER — wraps content in auth guard + app shell
// ============================================================
function ProtectedPage({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AppShell>{children}</AppShell>
    </ProtectedRoute>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MemoryProvider>
          <Routes>
            {/* ─── PUBLIC ROUTES ─── */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in" element={<PublicOnlyRoute><SignIn /></PublicOnlyRoute>} />
            <Route path="/sign-up" element={<PublicOnlyRoute><SignUp /></PublicOnlyRoute>} />

            {/* ─── ONBOARDING (requires auth but not full shell) ─── */}
            <Route path="/onboarding" element={
              <ProtectedRoute><Onboarding /></ProtectedRoute>
            } />

            {/* ─── PROTECTED APPLICATION ROUTES ─── */}
            <Route path="/overview" element={<ProtectedPage><Overview /></ProtectedPage>} />
            <Route path="/rfps" element={<ProtectedPage><RFPList /></ProtectedPage>} />
            <Route path="/rfps/:id" element={<ProtectedPage><RFPWorkspace /></ProtectedPage>} />
            <Route path="/proposal" element={<ProtectedPage><ProposalEditor /></ProtectedPage>} />
            <Route path="/proposals" element={<ProtectedPage><ProposalEditor /></ProtectedPage>} />
            <Route path="/memory-in-action" element={<ProtectedPage><MemoryInAction /></ProtectedPage>} />
            <Route path="/intelligence" element={<ProtectedPage><Intelligence /></ProtectedPage>} />
            <Route path="/recommendations" element={<ProtectedPage><Intelligence /></ProtectedPage>} />
            <Route path="/memory" element={<ProtectedPage><Memory /></ProtectedPage>} />
            <Route path="/insights" element={<ProtectedPage><Insights /></ProtectedPage>} />
            <Route path="/outcomes" element={<ProtectedPage><Outcomes /></ProtectedPage>} />
            <Route path="/documents" element={<ProtectedPage><Documents /></ProtectedPage>} />
            <Route path="/settings" element={<ProtectedPage><Settings /></ProtectedPage>} />
          </Routes>
        </MemoryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
