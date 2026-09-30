import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// ============================================================
// AUTH TYPES
// ============================================================

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  company: string;
  role: string;
  createdAt: string;
  onboarded: boolean;
  teamSize?: string;
  industries?: string[];
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  completeOnboarding: (data: OnboardingData) => void;
}

export interface SignUpData {
  fullName: string;
  email: string;
  password: string;
  company: string;
  role: string;
}

export interface OnboardingData {
  teamSize?: string;
  industries?: string[];
}

// ============================================================
// STORAGE KEYS
// ============================================================

const AUTH_USER_KEY = 'apex_auth_user_v1';
const AUTH_ACCOUNTS_KEY = 'apex_auth_accounts_v1';

// ============================================================
// DEMO ACCOUNT — pre-seeded for reliable hackathon demo
// ============================================================

const DEMO_ACCOUNT = {
  id: 'user-demo-001',
  fullName: 'Sarah Chen',
  email: 'sarah.chen@apexdigital.demo',
  company: 'Apex Digital Systems',
  role: 'Lead Proposal Strategist',
  createdAt: '2026-09-01T00:00:00Z',
  onboarded: true,
  teamSize: '10-25',
  industries: ['Financial Services', 'Healthcare', 'Insurance'],
};

const DEMO_PASSWORD = 'demo2026';

// ============================================================
// CONTEXT
// ============================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  // Persist session changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [user]);

  // Ensure demo account exists in the accounts registry
  useEffect(() => {
    const accounts = getAccounts();
    if (!accounts[DEMO_ACCOUNT.email]) {
      accounts[DEMO_ACCOUNT.email] = {
        user: DEMO_ACCOUNT,
        passwordHash: simpleHash(DEMO_PASSWORD),
      };
      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
    }
  }, []);

  function getAccounts(): Record<string, { user: AuthUser; passwordHash: string }> {
    try {
      const raw = localStorage.getItem(AUTH_ACCOUNTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return 'h_' + Math.abs(hash).toString(36);
  }

  const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
    const accounts = getAccounts();

    if (accounts[data.email]) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser: AuthUser = {
      id: `user-${Date.now().toString(36)}`,
      fullName: data.fullName,
      email: data.email,
      company: data.company,
      role: data.role,
      createdAt: new Date().toISOString(),
      onboarded: false,
    };

    accounts[data.email] = {
      user: newUser,
      passwordHash: simpleHash(data.password),
    };

    localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
    setUser(newUser);
    return { success: true };
  };

  const signIn = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const accounts = getAccounts();
    const account = accounts[email];

    if (!account) {
      return { success: false, error: 'No account found with this email.' };
    }

    if (account.passwordHash !== simpleHash(password)) {
      return { success: false, error: 'Invalid password.' };
    }

    setUser(account.user);
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const completeOnboarding = (data: OnboardingData) => {
    if (!user) return;

    const updatedUser: AuthUser = {
      ...user,
      onboarded: true,
      teamSize: data.teamSize,
      industries: data.industries,
    };

    setUser(updatedUser);

    // Update in accounts registry too
    const accounts = getAccounts();
    if (accounts[user.email]) {
      accounts[user.email].user = updatedUser;
      localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signUp,
        signIn,
        signOut,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export demo credentials for the "Explore Demo" flow
export const DEMO_CREDENTIALS = {
  email: DEMO_ACCOUNT.email,
  password: DEMO_PASSWORD,
  userName: DEMO_ACCOUNT.fullName,
};
