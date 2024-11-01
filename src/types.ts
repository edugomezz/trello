export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
  password?: string;
}

export interface Board {
  id: string;
  title: string;
  description?: string;
  background?: string;
  owner: string;
  members: string[];
  columns: Column[];
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
  tasks: Task[];
  order: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: ColumnId;
  assignees: string[];
  dueDate?: string;
  labels: Label[];
  attachments: Attachment[];
  comments: Comment[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
}

export type ColumnId = 'todo' | 'in-progress' | 'done';

export const VALID_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    password: 'admin123',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces'
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    role: 'member',
    password: 'user123',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=faces'
  }
];

export const DEMO_USER: User = VALID_USERS[0];

export const DEMO_LABELS: Label[] = [
  { id: '1', name: 'Bug', color: '#EF4444' },
  { id: '2', name: 'Feature', color: '#3B82F6' },
  { id: '3', name: 'Enhancement', color: '#10B981' },
  { id: '4', name: 'Documentation', color: '#F59E0B' }
];

export const DEMO_BOARD: Board = {
  id: '1',
  title: 'Project Alpha',
  description: 'Main development board for Project Alpha',
  background: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1600&h=900&fit=crop',
  owner: '1',
  members: ['1'],
  columns: [
    { 
      id: 'todo', 
      title: 'To Do', 
      boardId: '1',
      tasks: [],
      order: 0
    },
    { 
      id: 'in-progress', 
      title: 'In Progress', 
      boardId: '1',
      tasks: [],
      order: 1
    },
    { 
      id: 'done', 
      title: 'Done', 
      boardId: '1',
      tasks: [],
      order: 2
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};