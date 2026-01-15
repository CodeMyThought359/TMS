import { Navigate } from 'react-router-dom';
import { Role } from '../types/auth';
import { useAuth } from './AuthContext';
import React from 'react';

interface Props {
  role: Role;
  children: React.ReactNode;
}

const ProtectedRoute = ({ role, children }: Props) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
