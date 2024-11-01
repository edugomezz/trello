import React, { useState, useEffect } from 'react';
import { X, Calendar, Tag, Paperclip, Users } from 'lucide-react';
import { Task, DEMO_LABELS } from '../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdBy' | 'createdAt' | 'updatedAt' | 'assignees' | 'labels' | 'attachments' | 'comments'>) => void;
  onClose: () => void;
  initialTask?: Task;
}

export function TaskForm({ onSubmit, onClose, initialTask }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState<Task['status']>(initialTask?.status || 'todo');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || '');
  const [showLabels, setShowLabels] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setStatus(initialTask.status);
      setDueDate(initialTask.dueDate || '');
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ 
      title, 
      description, 
      status,
      dueDate: dueDate || undefined
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Task['status'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowLabels(!showLabels)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Tag size={16} />
              Labels
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Users size={16} />
              Assignees
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Paperclip size={16} />
              Attachments
            </button>
          </div>

          {showLabels && (
            <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-md">
              {DEMO_LABELS.map(label => (
                <button
                  key={label.id}
                  type="button"
                  className="px-3 py-1 rounded-full text-sm font-medium transition-colors"
                  style={{ 
                    backgroundColor: `${label.color}20`,
                    color: label.color 
                  }}
                >
                  {label.name}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              {initialTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}