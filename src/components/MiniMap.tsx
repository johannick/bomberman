import React from 'react';
import { CellType } from '../types/game';

interface MiniMapProps {
  size?: number;
  mapData: CellType[][];
  playerPosition: { x: number; y: number };
}

const MiniMap: React.FC<MiniMapProps> = ({ size = 100, mapData, playerPosition }) => {
  const cellSize = size / mapData.length;
  
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-semibold text-white mb-1">MAP</span>
      <div 
        className="relative bg-gray-900 border border-gray-700 rounded overflow-hidden"
        style={{ width: size, height: size }}
      >
        {mapData.map((row, y) => (
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`absolute ${
                cell === 'wall' ? 'bg-gray-700' :
                cell === 'brick' ? 'bg-orange-700' :
                cell === 'powerUp' ? 'bg-yellow-500' :
                'bg-gray-900'
              }`}
              style={{
                left: x * cellSize,
                top: y * cellSize,
                width: cellSize,
                height: cellSize
              }}
            />
          ))
        ))}
        
        {/* Player dot */}
        <div 
          className="absolute bg-blue-500 rounded-full shadow-glow"
          style={{
            left: playerPosition.x * cellSize + cellSize / 4,
            top: playerPosition.y * cellSize + cellSize / 4,
            width: cellSize / 2,
            height: cellSize / 2
          }}
        />
      </div>
    </div>
  );
};

export default MiniMap;