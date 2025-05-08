import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, Minimize2, Maximize2, RotateCcw } from 'lucide-react';
import useLayoutStore from '../store/layoutStore';

const PropertyPanel: React.FC = () => {
  const { 
    currentLayout,
    selectedFurniture,
    updateRoomDimensions,
    updateRoomColors,
    updateFurniturePosition,
    updateFurnitureRotation,
    updateFurnitureScale,
    updateFurnitureColor,
    updateFurnitureDimensions,
    selectFurniture,
    updateLayoutName
  } = useLayoutStore();

  const [showColorPicker, setShowColorPicker] = React.useState<string | null>(null);

  if (!currentLayout) return null;

  const handleRoomDimensionChange = (dimension: keyof typeof currentLayout.room.dimensions, value: number) => {
    const newDimensions = { ...currentLayout.room.dimensions, [dimension]: value };
    updateRoomDimensions(newDimensions);
  };

  const handleFurniturePositionChange = (axis: number, value: number) => {
    if (!selectedFurniture) return;
    
    const newPosition = [...selectedFurniture.position] as [number, number, number];
    newPosition[axis] = value;
    updateFurniturePosition(selectedFurniture.id, newPosition);
  };

  const handleFurnitureRotationChange = (axis: number, value: number) => {
    if (!selectedFurniture) return;
    
    const newRotation = [...selectedFurniture.rotation] as [number, number, number];
    newRotation[axis] = value;
    updateFurnitureRotation(selectedFurniture.id, newRotation);
  };

  const handleFurnitureScaleChange = (value: number) => {
    if (!selectedFurniture) return;
    
    const newScale: [number, number, number] = [value, value, value];
    updateFurnitureScale(selectedFurniture.id, newScale);
  };

  const handleFurnitureDimensionChange = (dimension: keyof typeof selectedFurniture.dimensions, value: number) => {
    if (!selectedFurniture) return;
    
    const newDimensions = { ...selectedFurniture.dimensions, [dimension]: value };
    updateFurnitureDimensions(selectedFurniture.id, newDimensions);
  };

  return (
    <div className="w-72 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-700">Properties</h2>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-700 mb-2">Layout</h3>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            value={currentLayout.name}
            onChange={(e) => updateLayoutName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="font-medium text-gray-700 mb-2">Room</h3>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Width (m)</label>
            <input
              type="number"
              min={1}
              max={20}
              step={0.1}
              value={currentLayout.room.dimensions.width}
              onChange={(e) => handleRoomDimensionChange('width', parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Length (m)</label>
            <input
              type="number"
              min={1}
              max={20}
              step={0.1}
              value={currentLayout.room.dimensions.length}
              onChange={(e) => handleRoomDimensionChange('length', parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Height (m)</label>
            <input
              type="number"
              min={1}
              max={5}
              step={0.1}
              value={currentLayout.room.dimensions.height}
              onChange={(e) => handleRoomDimensionChange('height', parseFloat(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-3 relative">
            <label className="block text-sm text-gray-600 mb-1">Wall Color</label>
            <button
              onClick={() => setShowColorPicker(showColorPicker === 'wall' ? null : 'wall')}
              className="w-full p-2 border border-gray-300 rounded-md flex items-center"
            >
              <div 
                className="w-6 h-6 rounded mr-2" 
                style={{ backgroundColor: currentLayout.room.wallColor }}
              ></div>
              <span>{currentLayout.room.wallColor}</span>
            </button>
            
            {showColorPicker === 'wall' && (
              <div className="absolute z-10 mt-1">
                <HexColorPicker
                  color={currentLayout.room.wallColor}
                  onChange={(color) => updateRoomColors(color, currentLayout.room.floorColor)}
                />
                <button
                  onClick={() => setShowColorPicker(null)}
                  className="w-full mt-1 p-1 bg-white border border-gray-300 rounded text-sm text-gray-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
          
          <div className="mb-3 relative">
            <label className="block text-sm text-gray-600 mb-1">Floor Color</label>
            <button
              onClick={() => setShowColorPicker(showColorPicker === 'floor' ? null : 'floor')}
              className="w-full p-2 border border-gray-300 rounded-md flex items-center"
            >
              <div 
                className="w-6 h-6 rounded mr-2" 
                style={{ backgroundColor: currentLayout.room.floorColor }}
              ></div>
              <span>{currentLayout.room.floorColor}</span>
            </button>
            
            {showColorPicker === 'floor' && (
              <div className="absolute z-10 mt-1">
                <HexColorPicker
                  color={currentLayout.room.floorColor}
                  onChange={(color) => updateRoomColors(currentLayout.room.wallColor, color)}
                />
                <button
                  onClick={() => setShowColorPicker(null)}
                  className="w-full mt-1 p-1 bg-white border border-gray-300 rounded text-sm text-gray-700"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
        
        {selectedFurniture && (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-700">Selected Furniture</h3>
              <button 
                onClick={() => selectFurniture(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <div className="w-full p-2 bg-gray-100 rounded-md text-gray-700">
                {selectedFurniture.name}
              </div>
            </div>
            
            <div className="mb-3 relative">
              <label className="block text-sm text-gray-600 mb-1">Color</label>
              <button
                onClick={() => setShowColorPicker(showColorPicker === 'furniture' ? null : 'furniture')}
                className="w-full p-2 border border-gray-300 rounded-md flex items-center"
              >
                <div 
                  className="w-6 h-6 rounded mr-2" 
                  style={{ backgroundColor: selectedFurniture.color }}
                ></div>
                <span>{selectedFurniture.color}</span>
              </button>
              
              {showColorPicker === 'furniture' && (
                <div className="absolute z-10 mt-1">
                  <HexColorPicker
                    color={selectedFurniture.color}
                    onChange={(color) => updateFurnitureColor(selectedFurniture.id, color)}
                  />
                  <button
                    onClick={() => setShowColorPicker(null)}
                    className="w-full mt-1 p-1 bg-white border border-gray-300 rounded text-sm text-gray-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
            
            {/* Position Inputs (X, Y, Z) */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">X</label>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  step={0.1}
                  value={selectedFurniture.position[0]}
                  onChange={(e) => handleFurniturePositionChange(0, parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 text-right">{selectedFurniture.position[0].toFixed(1)}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Y</label>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  step={0.1}
                  value={selectedFurniture.position[1]}
                  onChange={(e) => handleFurniturePositionChange(1, parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 text-right">{selectedFurniture.position[1].toFixed(1)}</div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Z</label>
                <input
                  type="range"
                  min={-10}
                  max={10}
                  step={0.1}
                  value={selectedFurniture.position[2]}
                  onChange={(e) => handleFurniturePositionChange(2, parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 text-right">{selectedFurniture.position[2].toFixed(1)}</div>
              </div>
            </div>

            {/* Rotation Input */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Rotation Y</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0"
                  max="6.28"
                  step="0.01"
                  value={selectedFurniture.rotation[1]}
                  onChange={(e) => handleFurnitureRotationChange(1, parseFloat(e.target.value))}
                  className="flex-1 mr-2"
                />
                <button
                  onClick={() => handleFurnitureRotationChange(1, 0)}
                  className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  <RotateCcw className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Scale Input */}
            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Scale</label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={selectedFurniture.scale[0]}
                  onChange={(e) => handleFurnitureScaleChange(parseFloat(e.target.value))}
                  className="flex-1 mr-2"
                />
                <button
                  onClick={() => handleFurnitureScaleChange(0.5)}
                  className="p-1 bg-gray-100 rounded hover:bg-gray-200 mr-1"
                >
                  <Minimize2 className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleFurnitureScaleChange(1)}
                  className="p-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  <Maximize2 className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Dimension Inputs */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Width</label>
                <input
                  type="range"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={selectedFurniture.dimensions.width}
                  onChange={(e) => handleFurnitureDimensionChange('width', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 text-right">{selectedFurniture.dimensions.width.toFixed(1)} m</div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Height</label>
                <input
                  type="range"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={selectedFurniture.dimensions.height}
                  onChange={(e) => handleFurnitureDimensionChange('height', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 text-right">{selectedFurniture.dimensions.height.toFixed(1)} m</div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Depth</label>
                <input
                  type="range"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={selectedFurniture.dimensions.depth}
                  onChange={(e) => handleFurnitureDimensionChange('depth', parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 text-right">{selectedFurniture.dimensions.depth.toFixed(1)} m</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPanel;
