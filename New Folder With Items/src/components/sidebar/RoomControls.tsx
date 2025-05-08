import React from 'react';
import { useAppState } from '../../store/StateProvider';

export const RoomControls: React.FC = () => {
  const { room, updateRoom } = useAppState();
  
  const handleRoomChange = (
    property: keyof typeof room,
    value: number | string
  ) => {
    updateRoom({ [property]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Room Settings</h2>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Dimensions</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">Width (cm)</label>
              <span className="text-xs text-gray-500">{room.width}cm</span>
            </div>
            <input
              type="range"
              min="200"
              max="800"
              step="10"
              value={room.width}
              onChange={(e) => handleRoomChange('width', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">Length (cm)</label>
              <span className="text-xs text-gray-500">{room.length}cm</span>
            </div>
            <input
              type="range"
              min="200"
              max="1000"
              step="10"
              value={room.length}
              onChange={(e) => handleRoomChange('length', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">Height (cm)</label>
              <span className="text-xs text-gray-500">{room.height}cm</span>
            </div>
            <input
              type="range"
              min="200"
              max="400"
              step="10"
              value={room.height}
              onChange={(e) => handleRoomChange('height', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Colors</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">Wall Color</label>
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300 mr-1"
                  style={{ backgroundColor: room.wallColor }}
                ></div>
                <span className="text-xs text-gray-500">{room.wallColor}</span>
              </div>
            </div>
            <input
              type="color"
              value={room.wallColor}
              onChange={(e) => handleRoomChange('wallColor', e.target.value)}
              className="w-full h-8 rounded-md cursor-pointer"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">Floor Color</label>
              <div className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300 mr-1"
                  style={{ backgroundColor: room.floorColor }}
                ></div>
                <span className="text-xs text-gray-500">{room.floorColor}</span>
              </div>
            </div>
            <input
              type="color"
              value={room.floorColor}
              onChange={(e) => handleRoomChange('floorColor', e.target.value)}
              className="w-full h-8 rounded-md cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => updateRoom({
            width: 400,
            length: 600,
            height: 250,
            wallColor: '#f5f5f5',
            floorColor: '#e0e0e0'
          })}
          className="w-full py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Reset to Default
        </button>
      </div>
    </div>
  );
};