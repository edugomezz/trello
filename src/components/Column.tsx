import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Column as ColumnType, Task } from '../types';

interface ColumnProps {
  column: ColumnType;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
}

export function Column({ column, onDeleteTask, onEditTask }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="bg-gray-50 p-4 rounded-lg w-80">
      <h2 className="font-semibold text-gray-700 mb-4">{column.title}</h2>
      <div ref={setNodeRef} className="space-y-3">
        <SortableContext
          items={column.tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}