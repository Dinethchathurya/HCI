import React, { useRef, useEffect, useState } from 'react';
import { useAppState } from '../../store/StateProvider';
import { Furniture } from '../../types';
import { defaultFurniture } from '../../data/defaultFurniture';

export const RoomEditor2D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    room, 
    furniture, 
    selectedFurnitureId, 
    selectFurniture,
    updateFurniture
  } = useAppState();

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, z: 0 });
  const [scale, setScale] = useState(0.5);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
        
        const padding = 40;
        const scaleX = (canvas.width - padding * 2) / room.width;
        const scaleY = (canvas.height - padding * 2) / room.length;
        const newScale = Math.min(scaleX, scaleY);
        
        const offsetX = (canvas.width - room.width * newScale) / 2;
        const offsetY = (canvas.height - room.length * newScale) / 2;
        
        setScale(newScale);
        setOffset({ x: offsetX, y: offsetY });
      }
    });

    resizeObserver.observe(canvas.parentElement as Element);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [room.width, room.length]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw room background
    context.fillStyle = room.floorColor;
    context.fillRect(
      offset.x, 
      offset.y, 
      room.width * scale, 
      room.length * scale
    );
    
    // Draw grid
    context.strokeStyle = '#cccccc';
    context.lineWidth = 0.5;
    const gridSize = 50;
    
    for (let x = 0; x <= room.width; x += gridSize) {
      context.beginPath();
      context.moveTo(offset.x + x * scale, offset.y);
      context.lineTo(offset.x + x * scale, offset.y + room.length * scale);
      context.stroke();
    }
    
    for (let y = 0; y <= room.length; y += gridSize) {
      context.beginPath();
      context.moveTo(offset.x, offset.y + y * scale);
      context.lineTo(offset.x + room.width * scale, offset.y + y * scale);
      context.stroke();
    }

    // Draw walls with thickness
    const wallThickness = 10 * scale;
    context.fillStyle = room.wallColor;
    
    // Top wall
    context.fillRect(
      offset.x - wallThickness, 
      offset.y - wallThickness, 
      room.width * scale + wallThickness * 2, 
      wallThickness
    );
    
    // Bottom wall
    context.fillRect(
      offset.x - wallThickness, 
      offset.y + room.length * scale, 
      room.width * scale + wallThickness * 2, 
      wallThickness
    );
    
    // Left wall
    context.fillRect(
      offset.x - wallThickness, 
      offset.y - wallThickness, 
      wallThickness, 
      room.length * scale + wallThickness * 2
    );
    
    // Right wall
    context.fillRect(
      offset.x + room.width * scale, 
      offset.y - wallThickness, 
      wallThickness, 
      room.length * scale + wallThickness * 2
    );

    const coordsTo2D = (x: number, z: number) => {
      const canvasX = offset.x + (x + room.width / 2) * scale;
      const canvasY = offset.y + (z + room.length / 2) * scale;
      return { x: canvasX, y: canvasY };
    };
    
    furniture.forEach(item => {
      const isSelected = item.id === selectedFurnitureId;
      const pos = coordsTo2D(item.position.x, item.position.z);
      
      let width, depth;
      const template = defaultFurniture.find(f => f.type === item.type);
      
      switch (item.type) {
        case 'sofa':
          width = 80 * item.scale.x;
          depth = 30 * item.scale.z;
          break;
        case 'chair':
          width = 40 * item.scale.x;
          depth = 40 * item.scale.z;
          break;
        case 'coffee_table':
          width = 60 * item.scale.x;
          depth = 60 * item.scale.z;
          break;
        case 'bookshelf':
          width = 80 * item.scale.x;
          depth = 30 * item.scale.z;
          break;
        case 'plant':
          width = 40 * item.scale.x;
          depth = 40 * item.scale.z;
          break;
        case 'wardrobe':
          width = 100 * item.scale.x;
          depth = 50 * item.scale.z;
          break;
        case 'rug':
          width = 120 * item.scale.x;
          depth = 180 * item.scale.z;
          break;
        case 'bed':
          width = 140 * item.scale.x;
          depth = 200 * item.scale.z;
          break;
        case 'dining_table':
          width = 100 * item.scale.x;
          depth = 100 * item.scale.z;
          break;
        case 'lamp':
          width = 30 * item.scale.x;
          depth = 30 * item.scale.z;
          break;
        default:
          width = 50 * item.scale.x;
          depth = 50 * item.scale.z;
      }
      
      context.save();
      context.translate(pos.x, pos.y);
      context.rotate(item.rotation.y);
      
      context.fillStyle = item.color;
      context.fillRect(
        -width * scale / 2, 
        -depth * scale / 2, 
        width * scale, 
        depth * scale
      );
      
      if (isSelected) {
        context.strokeStyle = 'blue';
        context.lineWidth = 2;
        context.strokeRect(
          -width * scale / 2, 
          -depth * scale / 2, 
          width * scale, 
          depth * scale
        );
        
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -depth * scale / 2 - 20);
        context.strokeStyle = 'green';
        context.stroke();
        
        context.fillStyle = 'green';
        context.beginPath();
        context.arc(0, -depth * scale / 2 - 20, 5, 0, Math.PI * 2);
        context.fill();
      }
      
      context.fillStyle = isSelected ? 'white' : '#333';
      context.font = '10px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(template?.name || item.type, 0, 0);
      
      context.restore();
    });
  }, [room, furniture, selectedFurnitureId, scale, offset]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    const canvasToRoomCoords = (x: number, y: number) => {
      const roomX = (x - offset.x) / scale - room.width / 2;
      const roomZ = (y - offset.y) / scale - room.length / 2;
      return { x: roomX, z: roomZ };
    };
    
    const findFurnitureUnderMouse = (x: number, y: number) => {
      const roomCoords = canvasToRoomCoords(x, y);
      
      for (let i = furniture.length - 1; i >= 0; i--) {
        const item = furniture[i];
        
        let width, depth;
        switch (item.type) {
          case 'sofa':
            width = 80 * item.scale.x;
            depth = 30 * item.scale.z;
            break;
          case 'chair':
            width = 40 * item.scale.x;
            depth = 40 * item.scale.z;
            break;
          case 'coffee_table':
            width = 60 * item.scale.x;
            depth = 60 * item.scale.z;
            break;
          case 'bookshelf':
            width = 80 * item.scale.x;
            depth = 30 * item.scale.z;
            break;
          case 'plant':
            width = 40 * item.scale.x;
            depth = 40 * item.scale.z;
            break;
          case 'wardrobe':
            width = 100 * item.scale.x;
            depth = 50 * item.scale.z;
            break;
          case 'rug':
            width = 120 * item.scale.x;
            depth = 180 * item.scale.z;
            break;
          case 'bed':
            width = 140 * item.scale.x;
            depth = 200 * item.scale.z;
            break;
          case 'dining_table':
            width = 100 * item.scale.x;
            depth = 100 * item.scale.z;
            break;
          case 'lamp':
            width = 30 * item.scale.x;
            depth = 30 * item.scale.z;
            break;
          default:
            width = 50 * item.scale.x;
            depth = 50 * item.scale.z;
        }
        
        const halfWidth = width / 2;
        const halfDepth = depth / 2;
        
        const dx = roomCoords.x - item.position.x;
        const dz = roomCoords.z - item.position.z;
        const rotatedX = dx * Math.cos(-item.rotation.y) - dz * Math.sin(-item.rotation.y);
        const rotatedZ = dx * Math.sin(-item.rotation.y) + dz * Math.cos(-item.rotation.y);
        
        if (
          rotatedX >= -halfWidth && 
          rotatedX <= halfWidth && 
          rotatedZ >= -halfDepth && 
          rotatedZ <= halfDepth
        ) {
          return item;
        }
      }
      
      return null;
    };
    
    const isOverRotationHandle = (x: number, y: number) => {
      if (!selectedFurnitureId) return false;
      
      const selectedItem = furniture.find(item => item.id === selectedFurnitureId);
      if (!selectedItem) return false;
      
      let depth;
      switch (selectedItem.type) {
        case 'sofa': depth = 30 * selectedItem.scale.z; break;
        case 'chair': depth = 40 * selectedItem.scale.z; break;
        case 'coffee_table': depth = 60 * selectedItem.scale.z; break;
        case 'bookshelf': depth = 30 * selectedItem.scale.z; break;
        case 'plant': depth = 40 * selectedItem.scale.z; break;
        case 'wardrobe': depth = 50 * selectedItem.scale.z; break;
        case 'rug': depth = 180 * selectedItem.scale.z; break;
        case 'bed': depth = 200 * selectedItem.scale.z; break;
        case 'dining_table': depth = 100 * selectedItem.scale.z; break;
        case 'lamp': depth = 30 * selectedItem.scale.z; break;
        default: depth = 50 * selectedItem.scale.z;
      }
      
      const pos = {
        x: offset.x + (selectedItem.position.x + room.width / 2) * scale,
        y: offset.y + (selectedItem.position.z + room.length / 2) * scale
      };
      
      const handleDistance = depth * scale / 2 + 20;
      const handleX = pos.x + Math.sin(selectedItem.rotation.y) * handleDistance;
      const handleY = pos.y - Math.cos(selectedItem.rotation.y) * handleDistance;
      
      const distance = Math.sqrt(
        Math.pow(x - handleX, 2) + Math.pow(y - handleY, 2)
      );
      
      return distance <= 10;
    };
    
    let isRotating = false;
    let initialRotation = 0;
    
    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (isOverRotationHandle(x, y)) {
        isRotating = true;
        
        const selectedItem = furniture.find(item => item.id === selectedFurnitureId);
        if (selectedItem) {
          initialRotation = selectedItem.rotation.y;
        }
        
        return;
      }
      
      const clickedFurniture = findFurnitureUnderMouse(x, y);
      
      if (clickedFurniture) {
        selectFurniture(clickedFurniture.id);
        setIsDragging(true);
        
        const roomCoords = canvasToRoomCoords(x, y);
        setDragOffset({
          x: clickedFurniture.position.x - roomCoords.x,
          z: clickedFurniture.position.z - roomCoords.z
        });
      } else {
        selectFurniture(null);
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      if (isRotating && selectedFurnitureId) {
        const selectedItem = furniture.find(item => item.id === selectedFurnitureId);
        if (!selectedItem) return;
        
        const pos = {
          x: offset.x + (selectedItem.position.x + room.width / 2) * scale,
          y: offset.y + (selectedItem.position.z + room.length / 2) * scale
        };
        
        const angle = Math.atan2(x - pos.x, -(y - pos.y));
        
        updateFurniture(selectedFurnitureId, {
          rotation: { y: angle }
        });
        
        return;
      }
      
      if (isDragging && selectedFurnitureId) {
        const roomCoords = canvasToRoomCoords(x, y);
        
        const newX = roomCoords.x + dragOffset.x;
        const newZ = roomCoords.z + dragOffset.z;
        
        updateFurniture(selectedFurnitureId, {
          position: {
            x: newX,
            y: 0,
            z: newZ
          }
        });
      } else {
        if (isOverRotationHandle(x, y)) {
          canvas.style.cursor = 'grab';
        } else if (findFurnitureUnderMouse(x, y)) {
          canvas.style.cursor = 'move';
        } else {
          canvas.style.cursor = 'default';
        }
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      isRotating = false;
      canvas.style.cursor = 'default';
    };
    
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);
    
    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [furniture, room, scale, offset, selectedFurnitureId, selectFurniture, updateFurniture]);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};