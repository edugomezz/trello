import React from 'react';
import { ColumnId } from '../../types';

interface StatusSelectProps {
  value: ColumnId;
  onChange: (value: ColumnId) => void;
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Status
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as ColumnId)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}