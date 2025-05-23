export interface Player {
  id: number;
  name: string;
  lives: number;
  bombs: number;
  score: number;
  powerUps: PowerUp[];
}

export interface GameState {
  currentLevel: number;
  timeRemaining: number;
  players: Player[];
  isGameOver: boolean;
  isPaused: boolean;
}

export type PowerUpType = 'speed' | 'bombCount' | 'bombRange' | 'bombPower' | 'remoteControl';

export interface PowerUp {
  type: PowerUpType;
  active: boolean;
  duration?: number;
}

export interface PowerUpCell {
  powerUpType: PowerUpType;
}

export type CellType = 'empty' | 'wall' | 'brick' | 'bomb' | 'explosion' | PowerUpCell;

export const DEFAULT_POWER_UPS: PowerUp[] = [
  { type: 'speed', active: false },
  { type: 'bombCount', active: false },
  { type: 'bombRange', active: false },
  { type: 'bombPower', active: false },
  { type: 'remoteControl', active: false },
];

export const INITIAL_GAME_STATE: GameState = {
  currentLevel: 1,
  timeRemaining: 180,
  players: [
    {
      id: 1,
      name: 'Player 1',
      lives: 3,
      bombs: 1,
      score: 0,
      powerUps: [...DEFAULT_POWER_UPS],
    }
  ],
  isGameOver: false,
  isPaused: false,
};