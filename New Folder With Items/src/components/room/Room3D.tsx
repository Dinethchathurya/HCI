import React from 'react';
import * as THREE from 'three';

interface Room3DProps {
  width: number;
  length: number;
  height: number;
  wallColor: string;
  floorColor: string;
}

export const Room3D: React.FC<Room3DProps> = ({ 
  width, 
  length, 
  height, 
  wallColor,
  floorColor
}) => {
  // Convert from cm to Three.js units
  const roomWidth = width;
  const roomLength = length;
  const roomHeight = height;
  
  // Create walls and floor materials
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: wallColor,
    side: THREE.BackSide
  });
  
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: floorColor,
    side: THREE.FrontSide
  });

  return (
    <group>
      {/* Floor */}
      <mesh 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[roomWidth, roomLength]} />
        <primitive object={floorMaterial} />
      </mesh>
      
      {/* Walls (rendered as a box with BackSide material) */}
      <mesh 
        position={[0, roomHeight / 2, 0]}
      >
        <boxGeometry args={[roomWidth, roomHeight, roomLength]} />
        <primitive object={wallMaterial} />
      </mesh>
      
      {/* Grid helper */}
      <gridHelper 
        args={[Math.max(roomWidth, roomLength), 20, '#888888', '#cccccc']} 
        position={[0, 0.1, 0]} 
        rotation={[0, 0, 0]}
      />
    </group>
  );
};