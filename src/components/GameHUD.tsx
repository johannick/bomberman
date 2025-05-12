import React from 'react';
import { GameState } from '../types/game';
import PlayerInfo from './PlayerInfo';
import GameTimer from './GameTimer';
import ScoreDisplay from './ScoreDisplay';
import LevelIndicator from './LevelIndicator';
import PowerUpIndicator from './PowerUpIndicator';
import MiniMap from './MiniMap';

interface GameHUDProps {
  gameState: GameState;
  onTimeEnd?: () => void;
  className?: string;
}

const GameHUD: React.FC<GameHUDProps> = ({ 
  gameState, 
  onTimeEnd,
  className = '' 
}) => {
  const mainPlayer = gameState.players[0]; // For simplicity, we'll focus on the first player
  
  return (
    <div className={`bg-black bg-opacity-75 text-white p-4 rounded-lg ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Section: Player Info */}
        <div className="flex flex-col gap-3">
          <PlayerInfo player={mainPlayer} />
          <PowerUpIndicator powerUps={mainPlayer.powerUps} />
        </div>
        
        {/* Center Section: Game Status */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center justify-center gap-6">
            <GameTimer 
              timeRemaining={gameState.timeRemaining} 
              isPaused={gameState.isPaused}
              onTimeEnd={onTimeEnd}
            />
            <LevelIndicator level={gameState.currentLevel} />
          </div>
          <ScoreDisplay score={mainPlayer.score} />
        </div>
        
        {/* Right Section: Mini Map */}
        <div className="flex justify-center md:justify-end">
          <MiniMap size={100} />
        </div>
      </div>
    </div>
  );
};

export default GameHUD;