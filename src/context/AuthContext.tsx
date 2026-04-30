import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type UserRole = 'admin';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole }>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Mock accounts for development.
 */
const MOCK_ACCOUNTS: Record<string, { name: string, role: UserRole, password: string }> = {
  'admin@college.com': { name: 'System Admin', role: 'admin', password: 'admin123' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = user !== null;

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; role?: UserRole }> => {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const account = MOCK_ACCOUNTS[email.toLowerCase()];
    
    if (account && account.password === password) {
      const mockUser: User = {
        id: crypto.randomUUID(),
        name: account.name,
        email,
        role: account.role,
      };
      setUser(mockUser);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      return { success: true, role: account.role };
    }

    return { success: false };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth_user');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
