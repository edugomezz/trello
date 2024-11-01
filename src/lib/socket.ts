import { io } from 'socket.io-client';
import { getToken } from './auth';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL, {
  auth: {
    token: getToken
  },
  autoConnect: false
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// Board events
export const joinBoard = (boardId: string) => {
  socket.emit('board:join', boardId);
};

export const leaveBoard = (boardId: string) => {
  socket.emit('board:leave', boardId);
};

// Task events
export const onTaskCreated = (callback: (task: any) => void) => {
  socket.on('task:created', callback);
};

export const onTaskUpdated = (callback: (task: any) => void) => {
  socket.on('task:updated', callback);
};

export const onTaskDeleted = (callback: (taskId: string) => void) => {
  socket.on('task:deleted', callback);
};

// User presence events
export const onUserJoined = (callback: (user: any) => void) => {
  socket.on('user:joined', callback);
};

export const onUserLeft = (callback: (userId: string) => void) => {
  socket.on('user:left', callback);
};