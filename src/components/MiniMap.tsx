import React from 'react';

interface MiniMapProps {
  size?: number;
}

// This is a simplified version of a mini-map
// In a real game, you would get actual map data from the game state
const MiniMap: React.FC<MiniMapProps> = ({ size = 100 }) => {
  // Mock map data - in a real game, this would come from the game state
  const mapData = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1],
  ];
  
  // Player position - in a real game, this would come from the game state
  const playerPosition = { x: 1, y: 1 };
  
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
                cell === 1 ? 'bg-gray-700' : 'bg-gray-900'
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