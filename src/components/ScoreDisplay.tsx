import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (score > displayScore) {
      setIsAnimating(true);
      
      // Animate the score counting up
      const difference = score - displayScore;
      const increment = Math.max(1, Math.floor(difference / 10));
      const duration = Math.min(1000, Math.max(200, difference * 10));
      const interval = Math.floor(duration / (difference / increment));
      
      let current = displayScore;
      const timer = setInterval(() => {
        current += increment;
        if (current >= score) {
          current = score;
          clearInterval(timer);
          setIsAnimating(false);
        }
        setDisplayScore(current);
      }, interval);
      
      return () => clearInterval(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, displayScore]);
  
  const formattedScore = displayScore.toString().padStart(6, '0');
  
  return (
    <div className="flex items-center gap-2">
      <Trophy size={16} className="text-yellow-500" />
      <span className={`font-mono font-bold text-lg text-white ${isAnimating ? 'scale-110 text-yellow-400' : ''} transition-all duration-300`}>
        {formattedScore}
      </span>
    </div>
  );
};

export default ScoreDisplay;