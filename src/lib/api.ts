import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchBoards = () => api.get('/boards').then(res => res.data);
export const fetchBoard = (id: string) => api.get(`/boards/${id}`).then(res => res.data);
export const createBoard = (data: any) => api.post('/boards', data).then(res => res.data);
export const updateBoard = (id: string, data: any) => api.put(`/boards/${id}`, data).then(res => res.data);
export const deleteBoard = (id: string) => api.delete(`/boards/${id}`).then(res => res.data);

export const createTask = (boardId: string, data: any) => 
  api.post(`/boards/${boardId}/tasks`, data).then(res => res.data);
export const updateTask = (boardId: string, taskId: string, data: any) => 
  api.put(`/boards/${boardId}/tasks/${taskId}`, data).then(res => res.data);
export const deleteTask = (boardId: string, taskId: string) => 
  api.delete(`/boards/${boardId}/tasks/${taskId}`).then(res => res.data);

export const login = (credentials: { email: string; password: string }) =>
  api.post('/auth/login', credentials).then(res => res.data);
export const register = (userData: { email: string; password: string; name: string }) =>
  api.post('/auth/register', userData).then(res => res.data);

export default api;