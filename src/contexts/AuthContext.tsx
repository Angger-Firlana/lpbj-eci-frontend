import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type UserRole = 'pemohon' | 'admin' | 'atasan';

interface AuthContextType {
  isAuthenticated: boolean;
  role: UserRole | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_TOKEN_KEY = 'lpbj_auth_token';
const USER_ROLE_KEY = 'lpbj_user_role';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const savedRole = localStorage.getItem(USER_ROLE_KEY);

    if (token === 'true' && (savedRole === 'pemohon' || savedRole === 'admin' || savedRole === 'atasan')) {
      setIsAuthenticated(true);
      setRole(savedRole);
    }
  }, []);

  const login = (userRole: UserRole) => {
    localStorage.setItem(AUTH_TOKEN_KEY, 'true');
    localStorage.setItem(USER_ROLE_KEY, userRole);
    setIsAuthenticated(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
