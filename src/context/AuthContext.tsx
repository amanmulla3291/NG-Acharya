import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type UserRole = 'student' | 'staff' | 'admin';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
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
 * Mock admin credentials for development.
 * Any email containing "admin" gets admin role.
 * All others get student role.
 */
function resolveRole(email: string): UserRole {
  if (email.toLowerCase().includes('admin')) return 'admin';
  if (email.toLowerCase().includes('staff')) return 'staff';
  return 'student';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  });

  const isAuthenticated = user !== null;

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // TODO: Replace with real API call
    const role = resolveRole(email);
    const mockUser: User = {
      id: crypto.randomUUID(),
      name: email.split('@')[0],
      email,
      role,
    };
    setUser(mockUser);
    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    return true;
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
