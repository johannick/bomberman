import React from 'react';
import { CellType } from '../types/game';

interface GameBoardProps {
  board: CellType[][];
  playerPosition: { x: number; y: number };
}

export const GameBoard: React.FC<GameBoardProps> = ({ board, playerPosition }) => {
  return (
    <div className="game-board">
      {board.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                cell
                ${cell === 'wall' ? 'wall' : ''}
                ${cell === 'brick' ? 'brick' : ''}
                ${cell === 'bomb' ? 'bomb' : ''}
                ${cell === 'explosion' ? 'explosion' : ''}
                ${playerPosition.x === x && playerPosition.y === y ? 'player' : ''}
              `}
            />
          ))}
        </div>
      ))}
    </div>
  );
};