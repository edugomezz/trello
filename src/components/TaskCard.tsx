import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Pencil, 
  Trash2, 
  MessageSquare, 
  Paperclip,
  Calendar,
  CheckSquare
} from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getDueStatusColor = () => {
    if (!task.dueDate) return '';
    const due = new Date(task.dueDate);
    const now = new Date();
    const diff = due.getTime() - now.getTime();
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return 'text-red-600';
    if (daysLeft <= 2) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
    >
      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {task.labels.map(label => (
            <span
              key={label.id}
              className="px-2 py-1 rounded-full text-xs font-medium"
              style={{ 
                backgroundColor: `${label.color}20`,
                color: label.color 
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{task.description}</p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span>{task.comments.length}</span>
            </div>
          )}
          
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip size={14} />
              <span>{task.attachments.length}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {task.dueDate && (
            <div className={`flex items-center gap-1 ${getDueStatusColor()}`}>
              <Calendar size={14} />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}

          {task.assignees.length > 0 && (
            <div className="flex -space-x-2">
              {task.assignees.map((assignee, index) => (
                <img
                  key={assignee}
                  className="w-6 h-6 rounded-full border-2 border-white"
                  src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=24&h=24&fit=crop&crop=faces`}
                  alt={`Assignee ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}