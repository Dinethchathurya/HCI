import React from 'react';
import { Cuboid as Cube, SquareStackIcon, Camera } from 'lucide-react';
import { useAppState } from '../store/StateProvider';
import { saveAs } from 'file-saver';

export const ViewToggle: React.FC = () => {
  const { viewMode, setViewMode } = useAppState();

  const takeScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        saveAs(blob, `ifurnish-${viewMode}-screenshot-${Date.now()}.png`);
      }
    });
  };

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

      <div className="w-px bg-gray-200"></div>

      <button
        onClick={takeScreenshot}
        className="flex items-center justify-center px-3 py-2 bg-white text-gray-700 hover:bg-gray-100"
        title="Take Screenshot"
      >
        <Camera size={18} />
      </button>
    </div>
  );
};