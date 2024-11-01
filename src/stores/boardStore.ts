import { create } from 'zustand';
import { 
  fetchBoards, 
  fetchBoard, 
  createBoard, 
  updateBoard, 
  deleteBoard,
  createTask,
  updateTask,
  deleteTask
} from '../lib/api';
import { Board, Task } from '../types';

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
  isLoading: boolean;
  error: string | null;
  fetchBoards: () => Promise<void>;
  fetchBoard: (id: string) => Promise<void>;
  createBoard: (data: Partial<Board>) => Promise<void>;
  updateBoard: (id: string, data: Partial<Board>) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  createTask: (boardId: string, data: Partial<Task>) => Promise<void>;
  updateTask: (boardId: string, taskId: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (boardId: string, taskId: string) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  currentBoard: null,
  isLoading: false,
  error: null,

  fetchBoards: async () => {
    set({ isLoading: true, error: null });
    try {
      const boards = await fetchBoards();
      set({ boards, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch boards', 
        isLoading: false 
      });
    }
  },

  fetchBoard: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const board = await fetchBoard(id);
      set({ currentBoard: board, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch board', 
        isLoading: false 
      });
    }
  },

  createBoard: async (data: Partial<Board>) => {
    set({ isLoading: true, error: null });
    try {
      const newBoard = await createBoard(data);
      set(state => ({ 
        boards: [...state.boards, newBoard], 
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create board', 
        isLoading: false 
      });
    }
  },

  updateBoard: async (id: string, data: Partial<Board>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedBoard = await updateBoard(id, data);
      set(state => ({
        boards: state.boards.map(b => b.id === id ? updatedBoard : b),
        currentBoard: state.currentBoard?.id === id ? updatedBoard : state.currentBoard,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update board', 
        isLoading: false 
      });
    }
  },

  deleteBoard: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteBoard(id);
      set(state => ({
        boards: state.boards.filter(b => b.id !== id),
        currentBoard: state.currentBoard?.id === id ? null : state.currentBoard,
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete board', 
        isLoading: false 
      });
    }
  },

  createTask: async (boardId: string, data: Partial<Task>) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await createTask(boardId, data);
      set(state => {
        if (!state.currentBoard) return state;
        return {
          currentBoard: {
            ...state.currentBoard,
            columns: state.currentBoard.columns.map(col =>
              col.id === data.status
                ? { ...col, tasks: [...col.tasks, newTask] }
                : col
            )
          },
          isLoading: false
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create task', 
        isLoading: false 
      });
    }
  },

  updateTask: async (boardId: string, taskId: string, data: Partial<Task>) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await updateTask(boardId, taskId, data);
      set(state => {
        if (!state.currentBoard) return state;
        return {
          currentBoard: {
            ...state.currentBoard,
            columns: state.currentBoard.columns.map(col => ({
              ...col,
              tasks: col.tasks.map(task =>
                task.id === taskId ? updatedTask : task
              )
            }))
          },
          isLoading: false
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update task', 
        isLoading: false 
      });
    }
  },

  deleteTask: async (boardId: string, taskId: string) => {
    set({ isLoading: true, error: null });
    try {
      await deleteTask(boardId, taskId);
      set(state => {
        if (!state.currentBoard) return state;
        return {
          currentBoard: {
            ...state.currentBoard,
            columns: state.currentBoard.columns.map(col => ({
              ...col,
              tasks: col.tasks.filter(task => task.id !== taskId)
            }))
          },
          isLoading: false
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete task', 
        isLoading: false 
      });
    }
  }
}));