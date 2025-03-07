import React from 'react';
import { Palette } from 'lucide-react';

const styles = [
  { id: 'blackAndWhite', name: 'Black & White', description: 'Classic monochrome style' },
  { id: 'colored', name: 'Colored', description: 'Vibrant, colorful design' },
  { id: 'sketch', name: 'Sketch', description: 'Hand-drawn sketch appearance' },
];

const StyleSelector = ({ selectedStyle, setSelectedStyle }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Palette className="mr-2 h-5 w-5" />
        Choose Color Style
      </h2>
      
      <div className="grid grid-cols-3 gap-2">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`option-card p-3 rounded-lg border transition-all ${
              selectedStyle === style.id
                ? 'border-purple-500 bg-purple-900 bg-opacity-20 selected'
                : 'border-gray-700 bg-gray-800 hover:border-gray-500'
            }`}
          >
            <h3 className="font-medium">{style.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{style.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
