import React from 'react';
import { User } from 'lucide-react';
import { Player } from '../types/game';
import LivesDisplay from './LivesDisplay';
import BombCounter from './BombCounter';

interface PlayerInfoProps {
  player: Player;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
        <span className="font-semibold text-white">{player.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <LivesDisplay lives={player.lives} />
        <BombCounter count={player.bombs} />
      </div>
    </div>
  );
};

export default PlayerInfo;