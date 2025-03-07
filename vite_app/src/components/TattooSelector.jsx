import React from 'react';
import { Paintbrush } from 'lucide-react';

const tattooTypes = [
  { id: 'minimalist', name: 'Minimalist', description: 'Simple, clean lines with minimal detail' },
  { id: 'traditional', name: 'Traditional', description: 'Bold lines with vibrant colors' },
  { id: 'tribal', name: 'Tribal', description: 'Inspired by indigenous cultural patterns' },
  { id: 'geometric', name: 'Geometric', description: 'Precise shapes and patterns' },
  { id: 'realistic', name: 'Realistic', description: 'Detailed, lifelike representation' },
  { id: 'watercolor', name: 'Watercolor', description: 'Fluid, painterly aesthetic' },
];

const TattooSelector = ({ selectedTattooType, setSelectedTattooType }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Paintbrush className="mr-2 h-5 w-5" />
        Select Tattoo Style
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {tattooTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => setSelectedTattooType(type.id)}
            className={`option-card p-3 rounded-lg border transition-all ${
              selectedTattooType === type.id
                ? 'border-purple-500 bg-purple-900 bg-opacity-20 selected'
                : 'border-gray-700 bg-gray-800 hover:border-gray-500'
            }`}
          >
            <h3 className="font-medium">{type.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TattooSelector;
