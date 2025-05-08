import React from 'react';
import { useAppState } from '../store/StateProvider';
import { RoomEditor3D } from './room/RoomEditor3D';
import { RoomEditor2D } from './room/RoomEditor2D';
import { FurnitureControls } from './room/FurnitureControls';

export const RoomEditor: React.FC = () => {
  const { viewMode, selectedFurnitureId } = useAppState();

  return (
    <div className="relative h-full">
      {viewMode === '3D' ? <RoomEditor3D /> : <RoomEditor2D />}
      
      {selectedFurnitureId && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <FurnitureControls />
        </div>
      )}
    </div>
  );
};