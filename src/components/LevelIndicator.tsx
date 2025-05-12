import React from 'react';
import { Map } from 'lucide-react';

interface LevelIndicatorProps {
  level: number;
}

const LevelIndicator: React.FC<LevelIndicatorProps> = ({ level }) => {
  return (
    <div className="flex items-center gap-2">
      <Map size={16} className="text-green-500" />
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-white">LEVEL</span>
        <span className="font-bold text-lg text-white">{level}</span>
      </div>
    </div>
  );
};

export default LevelIndicator;