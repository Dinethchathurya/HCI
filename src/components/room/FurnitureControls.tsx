import React from 'react';
import { Trash2, RotateCw, RotateCcw, MinusCircle, PlusCircle } from 'lucide-react';
import { useAppState } from '../../store/StateProvider';
import { defaultFurniture } from '../../data/defaultFurniture';

export const FurnitureControls: React.FC = () => {
  const { 
    furniture, 
    selectedFurnitureId, 
    updateFurniture, 
    deleteFurniture 
  } = useAppState();
  
  // Get selected furniture
  const selectedFurniture = furniture.find(item => item.id === selectedFurnitureId);
  if (!selectedFurniture) return null;
  
  // Get furniture template
  const template = defaultFurniture.find(f => f.type === selectedFurniture.type);
  if (!template) return null;
  
  // Handle rotation
  const handleRotate = (direction: 'cw' | 'ccw') => {
    const currentRotation = selectedFurniture.rotation.y;
    const rotationAmount = Math.PI / 12; // 15 degrees
    
    updateFurniture(selectedFurnitureId, {
      rotation: {
        y: direction === 'cw' 
          ? currentRotation + rotationAmount 
          : currentRotation - rotationAmount
      }
    });
  };
  
  // Handle scale
  const handleScale = (factor: number) => {
    const currentScale = selectedFurniture.scale;
    
    // Limit scale to reasonable range
    const newScale = {
      x: Math.max(0.5, Math.min(2, currentScale.x * factor)),
      y: Math.max(0.5, Math.min(2, currentScale.y * factor)),
      z: Math.max(0.5, Math.min(2, currentScale.z * factor))
    };
    
    updateFurniture(selectedFurnitureId, {
      scale: newScale
    });
  };
  
  // Handle color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFurniture(selectedFurnitureId, {
      color: e.target.value
    });
  };
  
  // Calculate size scaling for display
  const scaleX = Math.round(selectedFurniture.scale.x * 100);
  const scaleY = Math.round(selectedFurniture.scale.y * 100);
  const scaleZ = Math.round(selectedFurniture.scale.z * 100);
  
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
        <p className="text-xs text-gray-600 mb-1">Size</p>
        <div className="flex space-x-2">
          <button
            onClick={() => handleScale(0.9)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            title="Decrease size"
          >
            <MinusCircle size={16} />
          </button>
          <div className="flex flex-col items-center justify-center">
            <span className="text-xs text-gray-800">{scaleX}%</span>
          </div>
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