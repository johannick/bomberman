import GameOverlay from './components/GameOverlay';
import './styles/game.css';
import { INITIAL_GAME_STATE } from './types/game';


function App() {

  const gameState = { ...INITIAL_GAME_STATE};

  function pauseToggle() {
    gameState.isPaused = !gameState.isPaused;
  }

  function levelEnd() {
    gameState.isGameOver = true;
  }

  return (
    <div className="game-container">
      {/* Game content */}
      <div className="game-content">
        <div className="game-placeholder">
          <div className="bomberman-sprite idle" />
          <h2 className="text-2xl font-bold mb-4">Bomberman</h2>
          <p>Game content would render here.</p>
          <p>This is just the HUD overlay demo.</p>
        </div>
      </div>
      
      {/* Game HUD Overlay */}
      <GameOverlay 
        gameState={gameState}
        onPauseToggle={pauseToggle}
        onTimeEnd={levelEnd}
      />
    </div>
  );
}

export default App;