import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

// Redirects unauthenticated users to /sign-in
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-app)',
        color: 'var(--text-3)',
        fontFamily: 'var(--sans)',
        fontSize: 'var(--fs-body)',
      }}>
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

// Redirects authenticated users away from auth pages  
export function PublicOnlyRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    // If user hasn't onboarded yet, send them to onboarding
    if (user && !user.onboarded) {
      return <Navigate to="/onboarding" replace />;
    }
    return <Navigate to="/overview" replace />;
  }

  return <>{children}</>;
}
