import React from 'react';
import { Trash2, RotateCw, RotateCcw, MinusCircle, PlusCircle, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { useAppState } from '../../store/StateProvider';
import { defaultFurniture } from '../../data/defaultFurniture';

export const FurnitureControls: React.FC = () => {
  const { 
    furniture, 
    selectedFurnitureId, 
    updateFurniture, 
    deleteFurniture,
    room 
  } = useAppState();
  
  const selectedFurniture = furniture.find(item => item.id === selectedFurnitureId);
  if (!selectedFurniture) return null;
  
  const template = defaultFurniture.find(f => f.type === selectedFurniture.type);
  if (!template) return null;
  
  const handleRotate = (direction: 'cw' | 'ccw') => {
    const currentRotation = selectedFurniture.rotation.y;
    const rotationAmount = Math.PI / 12;
    
    updateFurniture(selectedFurnitureId, {
      rotation: {
        y: direction === 'cw' 
          ? currentRotation + rotationAmount 
          : currentRotation - rotationAmount
      }
    });
  };
  
  const handleScale = (factor: number) => {
    const currentScale = selectedFurniture.scale;
    const newScale = {
      x: Math.max(0.5, Math.min(2, currentScale.x * factor)),
      y: Math.max(0.5, Math.min(2, currentScale.y * factor)),
      z: Math.max(0.5, Math.min(2, currentScale.z * factor))
    };
    
    updateFurniture(selectedFurnitureId, {
      scale: newScale
    });
  };
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFurniture(selectedFurnitureId, {
      color: e.target.value
    });
  };

  const handlePositionChange = (axis: 'x' | 'z', delta: number) => {
    const currentPosition = selectedFurniture.position;
    const halfWidth = room.width / 2;
    const halfLength = room.length / 2;
    
    let newX = currentPosition.x;
    let newZ = currentPosition.z;
    
    if (axis === 'x') {
      newX = Math.max(-halfWidth, Math.min(halfWidth, currentPosition.x + delta));
    } else {
      newZ = Math.max(-halfLength, Math.min(halfLength, currentPosition.z + delta));
    }
    
    updateFurniture(selectedFurnitureId, {
      position: {
        ...currentPosition,
        x: newX,
        z: newZ
      }
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <div className="flex flex-col items-center">
        <p className="text-xs text-gray-600 mb-1">Rotate</p>
        <div className="flex space-x-2">
          <button
            onClick={() => handleRotate('ccw')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Rotate counterclockwise"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={() => handleRotate('cw')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Rotate clockwise"
          >
            <RotateCw size={16} />
          </button>
        </div>
      </div>
      
      <div className="h-12 border-l border-gray-200"></div>
      
      <div className="flex flex-col items-center">
        <p className="text-xs text-gray-600 mb-1">Position</p>
        <div className="grid grid-cols-3 gap-1">
          <div></div>
          <button
            onClick={() => handlePositionChange('z', -10)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Move backward"
          >
            <ArrowUp size={16} />
          </button>
          <div></div>
          
          <button
            onClick={() => handlePositionChange('x', -10)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Move left"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="w-8 h-8"></div>
          <button
            onClick={() => handlePositionChange('x', 10)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Move right"
          >
            <ArrowRight size={16} />
          </button>
          
          <div></div>
          <button
            onClick={() => handlePositionChange('z', 10)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Move forward"
          >
            <ArrowDown size={16} />
          </button>
          <div></div>
        </div>
      </div>
      
      <div className="h-12 border-l border-gray-200"></div>
      
      <div className="flex flex-col items-center">
        <p className="text-xs text-gray-600 mb-1">Size</p>
        <div className="flex space-x-2">
          <button
            onClick={() => handleScale(0.9)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Decrease size"
          >
            <MinusCircle size={16} />
          </button>
          <button
            onClick={() => handleScale(1.1)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Increase size"
          >
            <PlusCircle size={16} />
          </button>
        </div>
      </div>
      
      <div className="h-12 border-l border-gray-200"></div>
      
      <div className="flex flex-col items-center">
        <p className="text-xs text-gray-600 mb-1">Color</p>
        <input
          type="color"
          value={selectedFurniture.color}
          onChange={handleColorChange}
          className="w-8 h-8 rounded overflow-hidden border border-gray-300 cursor-pointer"
        />
      </div>
      
      <div className="h-12 border-l border-gray-200"></div>
      
      <div className="flex flex-col items-center">
        <p className="text-xs text-gray-600 mb-1">Delete</p>
        <button
          onClick={() => deleteFurniture(selectedFurnitureId)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md"
          title="Delete furniture"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};