import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

interface GameTimerProps {
  timeRemaining: number; // in seconds
  isPaused: boolean;
  onTimeEnd?: () => void;
}

const GameTimer: React.FC<GameTimerProps> = ({ 
  timeRemaining: initialTime, 
  isPaused,
  onTimeEnd 
}) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  
  useEffect(() => {
    setTimeRemaining(initialTime);
  }, [initialTime]);
  
  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeEnd?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPaused, onTimeEnd, timeRemaining]);
  
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  const getTimerColor = () => {
    if (timeRemaining <= 30) return 'text-red-500';
    if (timeRemaining <= 60) return 'text-yellow-500';
    return 'text-white';
  };
  
  return (
    <div className="flex items-center gap-2">
      <Timer size={16} className="text-blue-400" />
      <span className={`font-mono font-bold text-lg ${getTimerColor()} transition-colors duration-300`}>
        {formattedTime}
      </span>
    </div>
  );
};

export default GameTimer;
