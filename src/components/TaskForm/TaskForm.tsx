import React, { useState, useEffect } from 'react';
import { X, Users, Paperclip } from 'lucide-react';
import { Task, DEMO_LABELS } from '../../types';
import { LabelSelector } from './LabelSelector';
import { DatePicker } from './DatePicker';
import { StatusSelect } from './StatusSelect';

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
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    initialTask?.labels.map(l => l.id) || []
  );

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setStatus(initialTask.status);
      setDueDate(initialTask.dueDate || '');
      setSelectedLabels(initialTask.labels.map(l => l.id));
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

  const toggleLabel = (labelId: string) => {
    setSelectedLabels(prev => 
      prev.includes(labelId)
        ? prev.filter(id => id !== labelId)
        : [...prev, labelId]
    );
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
            <StatusSelect value={status} onChange={setStatus} />
            <DatePicker 
              value={dueDate} 
              onChange={setDueDate}
              label="Due Date"
            />
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <LabelSelector
              labels={DEMO_LABELS}
              selectedLabels={selectedLabels}
              onToggleLabel={toggleLabel}
            />
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