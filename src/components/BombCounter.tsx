import React from 'react';
import { Bomb } from 'lucide-react';

interface BombCounterProps {
  count: number;
}

const BombCounter: React.FC<BombCounterProps> = ({ count }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-semibold text-white mr-1">BOMBS</span>
      <div className="relative">
        <Bomb size={18} className="text-red-500" />
        <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-xs font-bold px-1 rounded-full min-w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      </div>
    </div>
  );
};

export default BombCounter;