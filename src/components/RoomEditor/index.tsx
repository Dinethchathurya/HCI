import React from 'react';
import Room3D from './Room3D';
import Room2D from './Room2D';
import useLayoutStore from '../../store/layoutStore';

const RoomEditor: React.FC = () => {
  const { viewMode } = useLayoutStore();

  return (
    <div className="flex-1 relative">
      {viewMode === '3d' && <Room3D />}
      {viewMode === '2d' && <Room2D />}
      {viewMode === 'split' && (
        <div className="flex h-full">
          <div className="w-1/2 border-r border-gray-200">
            <Room3D />
          </div>
          <div className="w-1/2">
            <Room2D />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomEditor;