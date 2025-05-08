import React, { useMemo } from 'react';
import * as THREE from 'three';

interface Room3DProps {
  width: number;
  length: number;
  height: number;
  wallColor: string;
  floorColor: string;
  wallOpacity: number;
}

export const Room3D: React.FC<Room3DProps> = ({ 
  width, 
  length, 
  height, 
  wallColor,
  floorColor,
  wallOpacity
}) => {
  // Create shared materials using useMemo
  const materials = useMemo(() => {
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: wallColor,
      side: THREE.DoubleSide,
      roughness: 0.8,
      metalness: 0.2,
      transparent: true,
      opacity: wallOpacity
    });
    
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: floorColor,
      side: THREE.FrontSide,
      roughness: 0.9,
      metalness: 0.1
    });

    return { wallMaterial, floorMaterial };
  }, [wallColor, floorColor, wallOpacity]);

  return (
    <group>
      {/* Floor */}
      <mesh 
        position={[0, -0.5, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial {...materials.floorMaterial} />
      </mesh>
      
      {/* Walls */}
      <group position={[0, height / 2, 0]}>
        {/* Back wall */}
        <mesh position={[0, 0, -length/2]} receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial {...materials.wallMaterial} />
        </mesh>
        
        {/* Front wall */}
        <mesh position={[0, 0, length/2]} rotation={[0, Math.PI, 0]} receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial {...materials.wallMaterial} />
        </mesh>
        
        {/* Left wall */}
        <mesh position={[-width/2, 0, 0]} rotation={[0, Math.PI/2, 0]} receiveShadow>
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial {...materials.wallMaterial} />
        </mesh>
        
        {/* Right wall */}
        <mesh position={[width/2, 0, 0]} rotation={[0, -Math.PI/2, 0]} receiveShadow>
          <planeGeometry args={[length, height]} />
          <meshStandardMaterial {...materials.wallMaterial} />
        </mesh>
      </group>
    </group>
  );
};