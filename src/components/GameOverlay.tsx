import React from 'react';
import { Play, Pause, Settings } from 'lucide-react';
import GameHUD from './GameHUD';
import GameSettings from './GameSettings';
import { GameState } from '../types/game';

interface GameOverlayProps {
  gameState: GameState;
  onPauseToggle: () => void;
  onTimeEnd?: () => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ 
  gameState, 
  onPauseToggle, 
  onTimeEnd 
}) => {
  const [showSettings, setShowSettings] = React.useState(false);
  const [settings, setSettings] = React.useState({
    volume: 100,
    effects: true,
    playerName: gameState.players[0].name
  });

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col">
      {/* Top HUD */}
      <div className="w-full p-4 pointer-events-auto">
        <GameHUD 
          gameState={gameState} 
          onTimeEnd={onTimeEnd}
          className="shadow-lg"
        />
      </div>
      
      {/* Control Buttons - Bottom Right */}
      <div className="absolute bottom-4 right-4 pointer-events-auto flex gap-2">
        <button 
          onClick={() => setShowSettings(true)}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
        >
          <Settings size={24} />
        </button>
        <button 
          onClick={onPauseToggle}
          className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
        >
          {gameState.isPaused ? (
            <Play size={24} />
          ) : (
            <Pause size={24} />
          )}
        </button>
      </div>
      
      {/* Pause Overlay */}
      {gameState.isPaused && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center pointer-events-auto">
          <div className="text-white text-4xl font-bold">PAUSED</div>
        </div>
      )}
      
      {/* Game Over Overlay */}
      {gameState.isGameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center pointer-events-auto">
          <div className="bg-gray-900 p-8 rounded-lg text-center">
            <h2 className="text-red-500 text-4xl font-bold mb-4">GAME OVER</h2>
            <p className="text-white text-xl mb-6">Final Score: {gameState.players[0].score}</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105">
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <GameSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={setSettings}
      />
    </div>
  );
};

export default GameOverlay;