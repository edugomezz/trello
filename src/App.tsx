import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Plus, Layout, Search, Bell, Settings, LogOut } from 'lucide-react';
import { Column } from './components/Column';
import { TaskForm } from './components/TaskForm';
import { LoginForm } from './components/LoginForm';
import { Board, Task, User, DEMO_USER, DEMO_BOARD } from './types';
import { BoardHeader } from './components/BoardHeader';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [board, setBoard] = useState<Board>(DEMO_BOARD);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = findTask(active.id as string);
    if (!activeTask) return;

    const overColumnId = over.id as string;
    
    setBoard(prevBoard => ({
      ...prevBoard,
      columns: prevBoard.columns.map(col => ({
        ...col,
        tasks: col.id === overColumnId 
          ? [...col.tasks.filter(t => t.id !== activeTask.id), { ...activeTask, status: overColumnId }]
          : col.tasks.filter(t => t.id !== activeTask.id)
      }))
    }));
  };

  const findTask = (taskId: string): Task | undefined => {
    for (const column of board.columns) {
      const task = column.tasks.find(t => t.id === taskId);
      if (task) return task;
    }
    return undefined;
  };

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdBy' | 'createdAt' | 'updatedAt' | 'assignees' | 'labels' | 'attachments' | 'comments'>) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substr(2, 9),
      createdBy: user?.id || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignees: [],
      labels: [],
      attachments: [],
      comments: []
    };

    setBoard(prevBoard => ({
      ...prevBoard,
      columns: prevBoard.columns.map(col =>
        col.id === taskData.status
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col
      )
    }));
  };

  const handleEditTask = (taskData: Omit<Task, 'id' | 'createdBy' | 'createdAt' | 'updatedAt' | 'assignees' | 'labels' | 'attachments' | 'comments'>) => {
    if (!editingTask) return;

    setBoard(prevBoard => ({
      ...prevBoard,
      columns: prevBoard.columns.map(col => ({
        ...col,
        tasks: col.tasks.map(task =>
          task.id === editingTask.id
            ? { 
                ...task, 
                ...taskData,
                updatedAt: new Date().toISOString()
              }
            : task
        )
      }))
    }));

    setEditingTask(undefined);
  };

  const handleDeleteTask = (taskId: string) => {
    setBoard(prevBoard => ({
      ...prevBoard,
      columns: prevBoard.columns.map(col => ({
        ...col,
        tasks: col.tasks.filter(task => task.id !== taskId)
      }))
    }));
  };

  const handleLogin = (userData: { username: string; password: string }) => {
    // In a real app, this would validate against a backend
    if (userData.username === 'admin' && userData.password === 'admin123') {
      setUser(DEMO_USER);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Layout className="text-blue-500 w-8 h-8" />
              <span className="ml-2 text-white font-semibold text-lg">ProjectHub</span>
            </div>
            
            <div className="flex-1 max-w-xl px-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-gray-300 hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="ml-3 text-gray-300 hover:text-white"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BoardHeader board={board} />

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            {board.columns.map(column => (
              <Column
                key={column.id}
                column={column}
                onDeleteTask={handleDeleteTask}
                onEditTask={setEditingTask}
              />
            ))}
          </div>
        </DndContext>

        {(showTaskForm || editingTask) && (
          <TaskForm
            onSubmit={editingTask ? handleEditTask : handleCreateTask}
            onClose={() => {
              setShowTaskForm(false);
              setEditingTask(undefined);
            }}
            initialTask={editingTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;