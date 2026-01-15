

import { useAuth } from '../auth/AuthContext';

export const useModules = (): string[] => {
  const { user } = useAuth();

  if (!user) return [];

  // SUPER ADMIN → access everything
  if (user.role === 'SUPER_ADMIN') {
    return ['BOOKING', 'SEVA', 'DONATION', 'STAFF', 'REPORT'];
  }

  // Temple Admin / Staff → from DB
  return user.modules ?? [];
};
