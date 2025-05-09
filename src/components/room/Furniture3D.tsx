import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Furniture } from '../../types';
import { useAppState } from '../../store/StateProvider';
import { defaultFurniture } from '../../data/defaultFurniture';

interface Furniture3DProps {
  furniture: Furniture;
}

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

export const Furniture3D: React.FC<Furniture3DProps> = ({ furniture }) => {
  const { selectedFurnitureId } = useAppState();
  const meshRef = useRef<THREE.Group>(null);
  const isSelected = selectedFurnitureId === furniture.id;
  
  const template = defaultFurniture.find(f => f.type === furniture.type);
  const height = getFurnitureHeight(furniture.type);

  const renderFurnitureModel = () => {
    const width = 100 * furniture.scale.x;
    const depth = 100 * furniture.scale.z;
    const color = furniture.color;

    switch (furniture.type) {
      case 'sofa':
        return (
          <group position={[0, 0, 0]}>
            {/* Base */}
            <mesh position={[0, height * 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.6, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Back rest */}
            <mesh position={[0, height * 0.65, depth * 0.35]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.7, depth * 0.3]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Arm rests */}
            <mesh position={[width * 0.4, height * 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.2, height * 0.5, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-width * 0.4, height * 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.2, height * 0.5, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </group>
        );

      case 'chair':
        return (
          <>
            {/* Seat */}
            <mesh position={[0, height * 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.1, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Back */}
            <mesh position={[0, height * 0.75, depth * 0.4]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.6, depth * 0.1]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Legs */}
            <mesh position={[width * 0.3, height * 0.2, depth * 0.3]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.4, depth * 0.05]} />
              <meshStandardMaterial color="#5d4037" />
            </mesh>
            <mesh position={[-width * 0.3, height * 0.2, depth * 0.3]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.4, depth * 0.05]} />
              <meshStandardMaterial color="#5d4037" />
            </mesh>
            <mesh position={[width * 0.3, height * 0.2, -depth * 0.3]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.4, depth * 0.05]} />
              <meshStandardMaterial color="#5d4037" />
            </mesh>
            <mesh position={[-width * 0.3, height * 0.2, -depth * 0.3]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.4, depth * 0.05]} />
              <meshStandardMaterial color="#5d4037" />
            </mesh>
          </>
        );

      case 'coffee_table':
      case 'dining_table':
        return (
          <>
            {/* Table top */}
            <mesh position={[0, height * 0.95, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.1, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Legs */}
            <mesh position={[width * 0.4, height * 0.45, depth * 0.4]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.9, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-width * 0.4, height * 0.45, depth * 0.4]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.9, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[width * 0.4, height * 0.45, -depth * 0.4]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.9, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-width * 0.4, height * 0.45, -depth * 0.4]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.9, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );

      case 'bookshelf':
        return (
          <>
            {/* Back panel */}
            <mesh position={[0, height * 0.5, -depth * 0.45]} castShadow receiveShadow>
              <boxGeometry args={[width, height, depth * 0.1]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Shelves */}
            <mesh position={[0, height * 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.1, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, height * 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.05, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, height * 0.65, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.05, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, height * 0.95, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.1, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Sides */}
            <mesh position={[width * 0.45, height * 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.1, height, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-width * 0.45, height * 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.1, height, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );

      case 'wardrobe':
        return (
          <>
            {/* Main body */}
            <mesh position={[0, height * 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Doors */}
            <mesh position={[width * 0.25, height * 0.5, depth * 0.51]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.48, height * 0.95, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-width * 0.25, height * 0.5, depth * 0.51]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.48, height * 0.95, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Handles */}
            <mesh position={[width * 0.02, height * 0.5, depth * 0.57]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.1, depth * 0.05]} />
              <meshStandardMaterial color="#9e9e9e" />
            </mesh>
            <mesh position={[-width * 0.02, height * 0.5, depth * 0.57]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.1, depth * 0.05]} />
              <meshStandardMaterial color="#9e9e9e" />
            </mesh>
          </>
        );

      case 'lamp':
        return (
          <>
            {/* Base */}
            <mesh position={[0, height * 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[width * 0.3, width * 0.4, height * 0.1, 16]} />
              <meshStandardMaterial color="#424242" />
            </mesh>
            
            {/* Stand */}
            <mesh position={[0, height * 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[width * 0.05, width * 0.05, height, 8]} />
              <meshStandardMaterial color="#757575" />
            </mesh>
            
            {/* Lamp shade */}
            <mesh position={[0, height * 0.85, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[width * 0.15, width * 0.3, height * 0.2, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Light source */}
            <pointLight
              position={[0, height * 0.85, 0]}
              intensity={0.5}
              distance={5}
              color="#fff9c4"
            />
          </>
        );

      case 'rug':
        return (
          <mesh position={[0, height * 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[width, depth]} />
            <meshStandardMaterial color={color} side={2} />
          </mesh>
        );

      case 'plant':
        return (
          <>
            {/* Pot */}
            <mesh position={[0, height * 0.15, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[width * 0.25, width * 0.2, height * 0.3, 16]} />
              <meshStandardMaterial color="#5d4037" />
            </mesh>
            
            {/* Plant */}
            <mesh position={[0, height * 0.5, 0]} castShadow receiveShadow>
              <sphereGeometry args={[width * 0.4, 16, 8]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );

      default:
        return (
          <mesh position={[0, height * 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
    }
  };

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
    <group
      ref={meshRef}
      position={[furniture.position.x, 0, furniture.position.z]}
      rotation={[0, furniture.rotation.y, 0]}
      scale={[furniture.scale.x, furniture.scale.y, furniture.scale.z]}
      userData={{ id: furniture.id, type: furniture.type, isFurniture: true }}
    >
      {renderFurnitureModel()}
      
      {isSelected && (
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(100, height, 100)]} />
          <lineBasicMaterial attach="material" color="blue" linewidth={1} />
        </lineSegments>
      )}
    </group>
  );
};