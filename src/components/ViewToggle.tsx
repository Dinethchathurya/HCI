import React from 'react';
import { Cuboid as Cube, SquareStackIcon } from 'lucide-react';
import { useAppState } from '../store/StateProvider';

export const ViewToggle: React.FC = () => {
  const { viewMode, setViewMode } = useAppState();

  return (
    <div className="bg-white rounded-md shadow-md flex overflow-hidden">
      <button
        onClick={() => setViewMode('3D')}
        className={`flex items-center justify-center px-3 py-2 ${
          viewMode === '3D'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        title="3D View"
      >
        <Cube size={18} />
        <span className="ml-1.5 text-sm font-medium">3D</span>
      </button>
      
      <button
        onClick={() => setViewMode('2D')}
        className={`flex items-center justify-center px-3 py-2 ${
          viewMode === '2D'
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        title="2D View"
      >
        <SquareStackIcon size={18} />
        <span className="ml-1.5 text-sm font-medium">2D</span>
      </button>
    </div>
  );
};