import React from 'react';
import { MapPin } from 'lucide-react';

const placements = [
  { id: 'arm', name: 'Arm', description: 'Upper or lower arm' },
  { id: 'forearm', name: 'Forearm', description: 'Inner or outer forearm' },
  { id: 'shoulder', name: 'Shoulder', description: 'Shoulder or upper back' },
  { id: 'chest', name: 'Chest', description: 'Chest or sternum area' },
  { id: 'back', name: 'Back', description: 'Upper, middle, or lower back' },
  { id: 'leg', name: 'Leg', description: 'Thigh, calf, or ankle' },
  { id: 'wrist', name: 'Wrist', description: 'Inner or outer wrist' },
  { id: 'neck', name: 'Neck', description: 'Side or back of neck' },
];

const PlacementSelector = ({ selectedPlacement, setSelectedPlacement }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <MapPin className="mr-2 h-5 w-5" />
        Choose Placement
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {placements.map((placement) => (
          <div
            key={placement.id}
            onClick={() => setSelectedPlacement(placement.id)}
            className={`option-card p-3 rounded-lg border transition-all ${
              selectedPlacement === placement.id
                ? 'border-purple-500 bg-purple-900 bg-opacity-20 selected'
                : 'border-gray-700 bg-gray-800 hover:border-gray-500'
            }`}
          >
            <h3 className="font-medium">{placement.name}</h3>
            <p className="text-xs text-gray-400 mt-1">{placement.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementSelector;
