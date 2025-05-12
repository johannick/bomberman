import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as Switch from '@radix-ui/react-switch';
import { Volume2, Sparkles, User } from 'lucide-react';

interface GameSettings {
    volume: number;
    effects: boolean;
    playerName: string;
}

interface GameSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-white mb-6">Game Settings</h2>
        
        {/* Volume Control */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Volume2 className="text-blue-400 mr-2" size={20} />
            <span className="text-white">Volume</span>
          </div>
          <Slider.Root
            className="relative flex items-center w-full h-5"
            value={[settings.volume]}
            max={100}
            step={1}
            onValueChange={(value) => onSettingsChange({ ...settings, volume: value[0] })}
          >
            <Slider.Track className="bg-gray-700 relative grow h-2 rounded-full">
              <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </Slider.Root>
          <div className="text-right text-sm text-gray-400 mt-1">
            {settings.volume}%
          </div>
        </div>

        {/* Visual Effects Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="text-blue-400 mr-2" size={20} />
              <span className="text-white">Visual Effects</span>
            </div>
            <Switch.Root
              checked={settings.effects}
              onCheckedChange={(checked) => 
                onSettingsChange({ ...settings, effects: checked })
              }
              className={`w-11 h-6 rounded-full transition-colors ${
                settings.effects ? 'bg-blue-500' : 'bg-gray-700'
              }`}
            >
              <Switch.Thumb 
                className={`block w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.effects ? 'translate-x-6' : 'translate-x-1'
                }`} 
              />
            </Switch.Root>
          </div>
        </div>

        {/* Player Name */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <User className="text-blue-400 mr-2" size={20} />
            <span className="text-white">Player Name</span>
          </div>
          <input
            type="text"
            value={settings.playerName}
            onChange={(e) => onSettingsChange({ ...settings, playerName: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-blue-500"
            maxLength={15}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;