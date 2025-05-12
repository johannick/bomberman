import { useState, useCallback, useEffect } from 'react';
import { CellType } from '../types/game';

const BOARD_SIZE = 13;

const createInitialBoard = (): CellType[][] => {
  const board: CellType[][] = Array(BOARD_SIZE).fill(null)
    .map(() => Array(BOARD_SIZE).fill('empty'));

  // Add walls in a grid pattern
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      if (x % 2 === 1 && y % 2 === 1) {
        board[y][x] = 'wall';
      } else if (
        Math.random() < 0.4 && 
        !(x === 1 && y === 1) && 
        !(x === 2 && y === 1) && 
        !(x === 1 && y === 2)
      ) {
        board[y][x] = 'brick';
      }
    }
  }

  // Ensure starting area is clear
  board[1][1] = 'empty';
  board[1][2] = 'empty';
  board[2][1] = 'empty';

  return board;
};

export const useGameLogic = () => {
  const [gameBoard, setGameBoard] = useState<CellType[][]>(createInitialBoard());
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [score, setScore] = useState(0);

  const placeBomb = useCallback((x: number, y: number) => {
    setGameBoard(prev => {
      const newBoard = [...prev.map(row => [...row])];
      newBoard[y][x] = 'bomb';
      return newBoard;
    });

    // Bomb explosion after 2 seconds
    setTimeout(() => {
      setGameBoard(prev => {
        const newBoard = [...prev.map(row => [...row])];
        const directions = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]];
        
        directions.forEach(([dx, dy]) => {
          const newX = x + dx;
          const newY = y + dy;
          
          if (
            newX >= 0 && newX < BOARD_SIZE &&
            newY >= 0 && newY < BOARD_SIZE &&
            newBoard[newY][newX] !== 'wall'
          ) {
            if (newBoard[newY][newX] === 'brick') {
              setScore(s => s + 100);
            }
            newBoard[newY][newX] = 'explosion';
          }
        });
        
        return newBoard;
      });

      // Clear explosions after 0.5 seconds
      setTimeout(() => {
        setGameBoard(prev => {
          const newBoard = [...prev.map(row => [...row])];
          for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
              if (newBoard[y][x] === 'explosion') {
                newBoard[y][x] = 'empty';
              }
            }
          }
          return newBoard;
        });
      }, 500);
    }, 2000);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    
    setPlayerPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;

      switch (key) {
        case 'arrowup':
        case 'w':
          newY = Math.max(0, prev.y - 1);
          break;
        case 'arrowdown':
        case 's':
          newY = Math.min(BOARD_SIZE - 1, prev.y + 1);
          break;
        case 'arrowleft':
        case 'a':
          newX = Math.max(0, prev.x - 1);
          break;
        case 'arrowright':
        case 'd':
          newX = Math.min(BOARD_SIZE - 1, prev.x + 1);
          break;
        case ' ':
          placeBomb(prev.x, prev.y);
          return prev;
      }

      if (gameBoard[newY][newX] === 'empty') {
        return { x: newX, y: newY };
      }
      return prev;
    });
  }, [gameBoard, placeBomb]);

  return {
    gameBoard,
    playerPosition,
    handleKeyDown,
    score
  };
};