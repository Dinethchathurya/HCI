import React, { useEffect, useRef, useState } from 'react';
import useLayoutStore from '../../store/layoutStore';
import { Move, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const Room2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { currentLayout, selectedFurniture, selectFurniture, updateFurniturePosition, updateFurnitureRotation } = useLayoutStore();
  
  const [scale, setScale] = useState(40); // Pixels per meter
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [viewOffset, setViewOffset] = useState<{ x: number; y: number }>({ x: 20, y: 20 });
  
  // Redraw canvas when layout changes
  useEffect(() => {
    if (!canvasRef.current || !currentLayout) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const { width, length } = currentLayout.room.dimensions;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw room
    ctx.fillStyle = currentLayout.room.floorColor;
    ctx.fillRect(
      viewOffset.x, 
      viewOffset.y, 
      width * scale, 
      length * scale
    );
    
    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    // Draw vertical grid lines
    for (let x = 0; x <= width; x++) {
      ctx.beginPath();
      ctx.moveTo(viewOffset.x + x * scale, viewOffset.y);
      ctx.lineTo(viewOffset.x + x * scale, viewOffset.y + length * scale);
      ctx.stroke();
    }
    
    // Draw horizontal grid lines
    for (let y = 0; y <= length; y++) {
      ctx.beginPath();
      ctx.moveTo(viewOffset.x, viewOffset.y + y * scale);
      ctx.lineTo(viewOffset.x + width * scale, viewOffset.y + y * scale);
      ctx.stroke();
    }
    
    // Draw room outline
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      viewOffset.x, 
      viewOffset.y, 
      width * scale, 
      length * scale
    );
    
    // Draw furniture
    currentLayout.room.furniture.forEach((item) => {
      const x = viewOffset.x + item.position[0] * scale;
      const y = viewOffset.y + item.position[2] * scale; // Z position in 3D is Y in 2D top-down view
      const width = item.dimensions.width * scale * item.scale[0];
      const depth = item.dimensions.depth * scale * item.scale[2];
      
      ctx.save();
      
      // Translate to center of furniture
      ctx.translate(x, y);
      
      // Rotate around center
      ctx.rotate(item.rotation[1]); // Y rotation in 3D
      
      // Draw furniture - half width/depth back to center
      ctx.fillStyle = item.id === selectedFurniture?.id ? '#90caf9' : item.color;
      ctx.fillRect(-width/2, -depth/2, width, depth);
      
      // Draw outline
      ctx.strokeStyle = item.id === selectedFurniture?.id ? '#1976d2' : '#000';
      ctx.lineWidth = item.id === selectedFurniture?.id ? 2 : 1;
      ctx.strokeRect(-width/2, -depth/2, width, depth);
      
      // Draw direction indicator (front)
      ctx.beginPath();
      ctx.moveTo(0, -depth/2);
      ctx.lineTo(0, -depth/2 - 10);
      ctx.stroke();
      
      ctx.restore();
    });
    
  }, [canvasRef, currentLayout, selectedFurniture, scale, viewOffset]);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    const handleMouseDown = (e: MouseEvent) => {
      if (!currentLayout) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / canvas.offsetWidth * canvas.width;
      const y = (e.clientY - rect.top) / canvas.offsetHeight * canvas.height;
      
      // Calculate real-world coordinates
      const roomX = (x - viewOffset.x) / scale;
      const roomZ = (y - viewOffset.y) / scale;
      
      // Check if clicked on furniture
      for (const item of currentLayout.room.furniture) {
        // Calculate furniture bounds with rotation
        const furnitureX = item.position[0];
        const furnitureZ = item.position[2];
        
        // Create a bounding box (simple approach)
        const halfWidth = (item.dimensions.width * item.scale[0]) / 2;
        const halfDepth = (item.dimensions.depth * item.scale[2]) / 2;
        
        // Very simple check - doesn't account for rotation properly
        const dx = Math.abs(roomX - furnitureX);
        const dz = Math.abs(roomZ - furnitureZ);
        
        if (dx < halfWidth && dz < halfDepth) {
          selectFurniture(item.id);
          setDragging(item.id);
          setDragStart({ x, y });
          return;
        }
      }
      
      // If clicked outside any furniture, deselect
      selectFurniture(null);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !dragStart || !currentLayout) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / canvas.offsetWidth * canvas.width;
      const y = (e.clientY - rect.top) / canvas.offsetHeight * canvas.height;
      
      // Calculate delta in meters
      const deltaX = (x - dragStart.x) / scale;
      const deltaZ = (y - dragStart.y) / scale;
      
      // Find the furniture item
      const item = currentLayout.room.furniture.find(item => item.id === dragging);
      if (!item) return;
      
      // Update position
      const newPosition: [number, number, number] = [
        item.position[0] + deltaX,
        item.position[1],
        item.position[2] + deltaZ
      ];
      
      updateFurniturePosition(dragging, newPosition);
      
      // Update drag start
      setDragStart({ x, y });
    };
    
    const handleMouseUp = () => {
      setDragging(null);
      setDragStart(null);
    };
    
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [canvasRef, currentLayout, selectedFurniture, scale, viewOffset, dragging, dragStart]);
  
  // Resize canvas to parent
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const parent = canvas.parentElement;
      if (!parent) return;
      
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      
      // Redraw
      const event = new Event('resize');
      window.dispatchEvent(event);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [canvasRef]);
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 100));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev / 1.2, 10));
  };
  
  const handleRotate = () => {
    if (!selectedFurniture) return;
    
    // Rotate 90 degrees clockwise
    const newRotation: [number, number, number] = [
      selectedFurniture.rotation[0],
      (selectedFurniture.rotation[1] + Math.PI / 2) % (Math.PI * 2),
      selectedFurniture.rotation[2]
    ];
    
    updateFurnitureRotation(selectedFurniture.id, newRotation);
  };
  
  if (!currentLayout) return null;
  
  return (
    <div className="relative w-full h-full">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
      
      <div className="absolute top-4 right-4 bg-white rounded-md shadow-md p-1">
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-gray-100 rounded"
          title="Zoom In"
        >
          <ZoomIn className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-gray-100 rounded"
          title="Zoom Out"
        >
          <ZoomOut className="h-5 w-5 text-gray-700" />
        </button>
        <button
          onClick={handleRotate}
          disabled={!selectedFurniture}
          className={`p-2 rounded ${
            selectedFurniture ? 'hover:bg-gray-100 text-gray-700' : 'text-gray-400 cursor-not-allowed'
          }`}
          title="Rotate Selected Furniture"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
      
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-75 rounded-md p-2 text-sm text-gray-700">
        <div className="flex items-center">
          <Move className="h-4 w-4 mr-1" />
          <span>Click and drag furniture to move</span>
        </div>
      </div>
    </div>
  );
};

export default Room2D;