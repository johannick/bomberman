import React from 'react';
import { CellType } from '../types/game';
import { Zap, Flame, Target, Rocket, Radio, Bomb } from 'lucide-react';

interface GameBoardProps {
  board: CellType[][];
  playerPosition: { x: number; y: number };
}

const PowerUpIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconProps = {
    size: 24,
    className: "text-yellow-500",
    strokeWidth: 2.5
  };

  switch (type) {
    case 'speed': return <Zap {...iconProps} />;
    case 'fire': return <Rocket {...iconProps} />;
    case 'bombCount': return <Bomb {...iconProps} />;
    case 'bombRange': return <Target {...iconProps} />;
    case 'bombPower': return <Flame {...iconProps} />;
    case 'remoteControl': return <Radio {...iconProps} />;
    default: return null;
  }
};

export const GameBoard: React.FC<GameBoardProps> = ({ board, playerPosition }) => {
  return (
    <div className="game-board">
      {board.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => {
            const isPowerUp = typeof cell === 'object' && 'powerUpType' in cell;
            
            return (
              <div
                key={`${x}-${y}`}
                className={`
                  cell relative flex items-center justify-center
                  ${cell === 'wall' ? 'wall' : ''}
                  ${cell === 'brick' ? 'brick' : ''}
                  ${cell === 'bomb' ? 'bomb' : ''}
                  ${cell === 'explosion' ? 'explosion' : ''}
                  ${isPowerUp ? 'powerUp' : ''}
                  ${playerPosition.x === x && playerPosition.y === y ? 'player' : ''}
                `}
              >
                {isPowerUp && <PowerUpIcon type={cell.powerUpType} />}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};