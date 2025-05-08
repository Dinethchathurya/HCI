import React, { useRef, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Furniture } from '../../types';
import { useAppState } from '../../store/StateProvider';
import { defaultFurniture } from '../../data/defaultFurniture';

interface Furniture3DProps {
  furniture: Furniture;
}

// Get furniture height based on type
const getFurnitureHeight = (type: string): number => {
  switch (type) {
    case 'sofa': return 40;
    case 'chair': return 40;
    case 'coffee_table': return 20;
    case 'bookshelf': return 120;
    case 'plant': return 40;
    case 'wardrobe': return 180;
    case 'rug': return 1;
    case 'bed': return 30;
    case 'dining_table': return 30;
    case 'lamp': return 100;
    default: return 50;
  }
};

// Simple placeholder models for furniture
const createPlaceholderGeometry = (type: string): THREE.BufferGeometry => {
  switch (type) {
    case 'sofa':
      return new THREE.BoxGeometry(80, 40, 30);
    case 'chair':
      return new THREE.BoxGeometry(40, 40, 40);
    case 'coffee_table':
      return new THREE.BoxGeometry(60, 20, 60);
    case 'bookshelf':
      return new THREE.BoxGeometry(80, 120, 30);
    case 'plant':
      const geometry = new THREE.CylinderGeometry(20, 15, 40, 8);
      return geometry;
    case 'wardrobe':
      return new THREE.BoxGeometry(100, 180, 50);
    case 'rug':
      return new THREE.BoxGeometry(120, 1, 180);
    case 'bed':
      return new THREE.BoxGeometry(140, 30, 200);
    case 'dining_table':
      return new THREE.BoxGeometry(100, 30, 100);
    case 'lamp':
      return new THREE.CylinderGeometry(15, 25, 100, 8);
    default:
      return new THREE.BoxGeometry(50, 50, 50);
  }
};

export const Furniture3D: React.FC<Furniture3DProps> = ({ furniture }) => {
  const { selectedFurnitureId } = useAppState();
  const meshRef = useRef<THREE.Mesh>(null);
  const isSelected = selectedFurnitureId === furniture.id;
  
  // Get furniture template
  const template = defaultFurniture.find(f => f.type === furniture.type);
  
  // Get furniture height
  const height = getFurnitureHeight(furniture.type);
  
  // Calculate Y position to place furniture on floor
  const yPosition = height * furniture.scale.y / 2;
  
  // Apply scale from furniture item
  const scale = [
    furniture.scale.x,
    furniture.scale.y,
    furniture.scale.z
  ];
  
  // Create material
  const material = new THREE.MeshStandardMaterial({
    color: furniture.color,
    transparent: true,
    opacity: isSelected ? 0.7 : 1,
    roughness: 0.7,
    metalness: 0.2
  });
  
  // Create geometry
  const geometry = createPlaceholderGeometry(furniture.type);
  
  // Highlight if selected
  useEffect(() => {
    if (meshRef.current) {
      if (isSelected) {
        meshRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.emissive = new THREE.Color(0x555555);
          }
        });
      } else {
        meshRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material.emissive = new THREE.Color(0x000000);
          }
        });
      }
    }
  }, [isSelected]);

  return (
    <mesh
      ref={meshRef}
      position={[furniture.position.x, yPosition, furniture.position.z]}
      rotation={[0, furniture.rotation.y, 0]}
      scale={scale}
      castShadow
      receiveShadow
      userData={{ id: furniture.id, type: furniture.type, isFurniture: true }}
    >
      <primitive object={geometry} />
      <primitive object={material} />
      
      {isSelected && (
        <lineSegments>
          <edgesGeometry attach="geometry" args={[geometry]} />
          <lineBasicMaterial 
            attach="material" 
            color="blue" 
            linewidth={1} 
          />
        </lineSegments>
      )}
    </mesh>
  );
};