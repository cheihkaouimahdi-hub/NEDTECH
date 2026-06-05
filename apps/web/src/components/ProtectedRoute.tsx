import { Navigate } from 'react-router-dom';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../utils/constants';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = storage.get(STORAGE_KEYS.TOKEN);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
