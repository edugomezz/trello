import React from 'react';
import { useAuthStore } from '../stores/authStore';
import { LoginForm } from './LoginForm';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useAuthStore();

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
}