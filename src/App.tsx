import { useEffect, useRef, useState } from 'react';
import GameOverlay from './components/GameOverlay';
import './styles/game.css';
import { INITIAL_GAME_STATE } from './types/game';
import { GameBoard } from './components/GameBoard';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const [gameState, setGameState] = useState({ ...INITIAL_GAME_STATE });
  const gameRef = useRef<HTMLDivElement>(null);
  const { handleKeyDown, gameBoard, playerPosition, score } = useGameLogic();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      players: [{ ...prev.players[0], score }]
    }));
  }, [score]);

  function pauseToggle() {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }

  function levelEnd() {
    setGameState(prev => ({ ...prev, isGameOver: true }));
  }

  return (
    <div className="game-container">
      <div className="game-content" ref={gameRef}>
        <GameBoard board={gameBoard} playerPosition={playerPosition} />
      </div>
      
      <GameOverlay 
        gameState={gameState}
        onPauseToggle={pauseToggle}
        onTimeEnd={levelEnd}
      />
    </div>
  );
}

export default App;