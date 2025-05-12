import { useState, useCallback, useEffect } from 'react';
import { CellType, PowerUpType } from '../types/game';

const BOARD_SIZE = 13;

const createInitialBoard = (): CellType[][] => {
  const board: CellType[][] = Array(BOARD_SIZE).fill(null)
    .map(() => Array(BOARD_SIZE).fill('empty'));

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

  board[1][1] = 'empty';
  board[1][2] = 'empty';
  board[2][1] = 'empty';

  return board;
};

const POWER_UP_TYPES: PowerUpType[] = ['speed', 'fire', 'bombCount', 'bombRange', 'bombPower', 'remoteControl'];

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
              // 30% chance to spawn a power-up
              if (Math.random() < 0.3) {
                const randomPowerUp = POWER_UP_TYPES[Math.floor(Math.random() * POWER_UP_TYPES.length)];
                newBoard[newY][newX] = 'powerUp';
              }
            }
            if (newBoard[newY][newX] !== 'powerUp') {
              newBoard[newY][newX] = 'explosion';
            }
          }
        });
        
        return newBoard;
      });

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

      const targetCell = gameBoard[newY][newX];
      if (targetCell === 'empty' || targetCell === 'powerUp') {
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