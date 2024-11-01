import React from 'react';
import { Users, Star } from 'lucide-react';
import { Board } from '../types';

interface BoardHeaderProps {
  board: Board;
}

export function BoardHeader({ board }: BoardHeaderProps) {
  return (
    <div 
      className="relative rounded-xl overflow-hidden mb-8 bg-cover bg-center h-48"
      style={{ backgroundImage: `url(${board.background})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{board.title}</h1>
            {board.description && (
              <p className="text-gray-200">{board.description}</p>
            )}
          </div>
          <button className="text-yellow-400 hover:text-yellow-300">
            <Star className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {board.members.map((member, index) => (
                <img
                  key={member}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  src={`https://images.unsplash.com/photo-${1500000000000 + index}?w=32&h=32&fit=crop&crop=faces`}
                  alt={`Team member ${index + 1}`}
                />
              ))}
            </div>
            <button className="ml-2 flex items-center gap-1 text-white hover:text-gray-200">
              <Users size={16} />
              <span>Share</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-300">
            Last updated: {new Date(board.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}