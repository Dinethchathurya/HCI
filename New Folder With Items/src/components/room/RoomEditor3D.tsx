import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useAppState } from '../../store/StateProvider';
import { Furniture3D } from './Furniture3D';
import { Room3D } from './Room3D';

const DragControls: React.FC = () => {
  const { camera, gl, scene } = useThree();
  const { 
    furniture, 
    selectedFurnitureId, 
    updateFurniture, 
    selectFurniture,
    room
  } = useAppState();
  
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0)));
  const intersectionPoint = useRef(new THREE.Vector3());
  const isDragging = useRef(false);
  const selectedObject = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const canvasElement = gl.domElement;

    const handlePointerDown = (event: PointerEvent) => {
      // Only handle left mouse button
      if (event.button !== 0) return;

      const rect = canvasElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      
      const furnitureObjects = scene.children.filter(
        child => child.userData.isFurniture
      );
      
      const intersects = raycaster.current.intersectObjects(furnitureObjects, true);
      
      if (intersects.length > 0) {
        let parentObject = intersects[0].object;
        while (parentObject.parent && !parentObject.userData.isFurniture) {
          parentObject = parentObject.parent;
        }
        
        selectedObject.current = parentObject;
        selectFurniture(parentObject.userData.id);
        
        plane.current.normal.copy(new THREE.Vector3(0, 1, 0));
        raycaster.current.ray.intersectPlane(plane.current, intersectionPoint.current);
        
        isDragging.current = true;
        canvasElement.style.cursor = 'grabbing';
      } else {
        selectFurniture(null);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging.current || !selectedObject.current) return;
      
      const rect = canvasElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.current.setFromCamera(mouse.current, camera);
      raycaster.current.ray.intersectPlane(plane.current, intersectionPoint.current);
      
      const newPosition = intersectionPoint.current;
      
      // Constrain to room boundaries
      const halfWidth = room.width / 2;
      const halfLength = room.length / 2;
      const boundedX = Math.max(-halfWidth, Math.min(halfWidth, newPosition.x));
      const boundedZ = Math.max(-halfLength, Math.min(halfLength, newPosition.z));
      
      updateFurniture(selectedObject.current.userData.id, {
        position: {
          x: boundedX,
          y: 0,
          z: boundedZ
        }
      });
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      canvasElement.style.cursor = 'auto';
    };

    canvasElement.addEventListener('pointerdown', handlePointerDown);
    canvasElement.addEventListener('pointermove', handlePointerMove);
    canvasElement.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvasElement.removeEventListener('pointerdown', handlePointerDown);
      canvasElement.removeEventListener('pointermove', handlePointerMove);
      canvasElement.removeEventListener('pointerup', handlePointerUp);
    };
  }, [camera, gl, scene, room, selectFurniture, updateFurniture]);

  return null;
};

export const RoomEditor3D: React.FC = () => {
  const { room, furniture } = useAppState();
  
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 300, 500]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 250, 0]} intensity={0.8} castShadow />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={200}
          maxDistance={1000}
          mouseButtons={{
            LEFT: undefined, // Disable left click for orbit
            MIDDLE: undefined, // Disable middle button
            RIGHT: 2 // Enable right click for orbit
          }}
        />
        
        <Room3D 
          width={room.width} 
          length={room.length} 
          height={room.height} 
          wallColor={room.wallColor}
          floorColor={room.floorColor}
        />
        
        {furniture.map(item => (
          <Furniture3D
            key={item.id}
            furniture={item}
          />
        ))}
        
        <DragControls />
      </Canvas>
    </div>
  );
};