import { create } from 'zustand';
import { login as apiLogin, register as apiRegister } from '../lib/api';
import { setToken, removeToken, getCurrentUser, User } from '../lib/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: getCurrentUser(),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { token } = await apiLogin({ email, password });
      setToken(token);
      set({ user: getCurrentUser(), isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to login', 
        isLoading: false 
      });
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      const { token } = await apiRegister({ email, password, name });
      setToken(token);
      set({ user: getCurrentUser(), isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to register', 
        isLoading: false 
      });
    }
  },

  logout: () => {
    removeToken();
    set({ user: null });
  },
}));