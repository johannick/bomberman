import React from 'react';
import { Zap, Flame, Target, Rocket, Radio } from 'lucide-react';
import { PowerUp, PowerUpType } from '../types/game';

interface PowerUpIndicatorProps {
  powerUps: PowerUp[];
}

const PowerUpIcon: React.FC<{ type: PowerUpType; active: boolean }> = ({ type, active }) => {
  const baseClasses = "w-7 h-7 p-1 rounded transition-all duration-300";
  const activeClasses = active
    ? "bg-yellow-500 text-black shadow-glow"
    : "bg-gray-800 text-gray-500";
  
  const iconClasses = `${baseClasses} ${activeClasses}`;
  
  switch (type) {
    case 'speed':
      return <Zap className={iconClasses} size={20} />;
    case 'fire':
      return <Rocket className={iconClasses} size={20} />;
    case 'bombCount':
      return <Bomb className={iconClasses} size={20} />;
    case 'bombRange':
      return <Target className={iconClasses} size={20} />;
    case 'bombPower':
      return <Flame className={iconClasses} size={20} />;
    case 'remoteControl':
      return <Radio className={iconClasses} size={20} />;
    default:
      return null;
  }
};

const PowerUpIndicator: React.FC<PowerUpIndicatorProps> = ({ powerUps }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-semibold text-white mb-1">POWER-UPS</span>
      <div className="flex gap-2">
        {powerUps.map((powerUp) => (
          <PowerUpIcon 
            key={powerUp.type} 
            type={powerUp.type} 
            active={powerUp.active} 
          />
        ))}
      </div>
    </div>
  );
};

// Fix missing import
import { Bomb } from 'lucide-react';

export default PowerUpIndicator;