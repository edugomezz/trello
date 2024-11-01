import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth_token';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface DecodedToken {
  user: User;
  exp: number;
}

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const getCurrentUser = (): User | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.user;
  } catch {
    return null;
  }
};