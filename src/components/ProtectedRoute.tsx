import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'pemohon' | 'admin' | 'atasan';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    let redirectPath = '/pemohon/dashboard';
    if (role === 'admin') redirectPath = '/admin/dashboard';
    if (role === 'atasan') redirectPath = '/atasan/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
