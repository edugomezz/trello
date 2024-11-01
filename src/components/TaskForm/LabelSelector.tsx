import React from 'react';
import { Tag } from 'lucide-react';
import { Label } from '../../types';

interface LabelSelectorProps {
  labels: Label[];
  selectedLabels: string[];
  onToggleLabel: (labelId: string) => void;
}

export function LabelSelector({ labels, selectedLabels, onToggleLabel }: LabelSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <Tag size={16} />
        Labels
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 p-2 z-10">
          <div className="flex flex-wrap gap-2">
            {labels.map(label => (
              <button
                key={label.id}
                type="button"
                onClick={() => onToggleLabel(label.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedLabels.includes(label.id) ? 'ring-2 ring-offset-1' : ''
                }`}
                style={{ 
                  backgroundColor: `${label.color}20`,
                  color: label.color,
                  ringColor: label.color
                }}
              >
                {label.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}