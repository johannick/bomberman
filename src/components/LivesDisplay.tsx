import React from 'react';
import { Heart } from 'lucide-react';

interface LivesDisplayProps {
  lives: number;
  maxLives?: number;
}

const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives, maxLives = 3 }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-semibold text-white mr-1">LIVES</span>
      <div className="flex gap-1">
        {Array.from({ length: maxLives }).map((_, index) => (
          <Heart
            key={index}
            size={16}
            className={`transition-all duration-300 ${
              index < lives 
                ? 'text-red-500 fill-red-500' 
                : 'text-gray-600 fill-transparent opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LivesDisplay;