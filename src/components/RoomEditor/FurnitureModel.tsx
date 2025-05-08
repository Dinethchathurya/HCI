import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Furniture } from '../../types';

interface FurnitureModelProps {
  furniture: Furniture;
  isSelected: boolean;
  onClick: () => void;
}

const FurnitureModel: React.FC<FurnitureModelProps> = ({ furniture, isSelected, onClick }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Simplified models based on furniture type
  const renderFurnitureModel = () => {
    const { width, height, depth } = furniture.dimensions;
    const color = furniture.color;
    
    switch (furniture.model) {
      case 'sofa':
        return (
          <>
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
          </>
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
        
      case 'dining-chair':
        return (
          <>
            {/* Seat */}
            <mesh position={[0, height * 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.05, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Back */}
            <mesh position={[0, height * 0.7, depth * 0.4]} castShadow receiveShadow>
              <boxGeometry args={[width, height * 0.45, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Legs */}
            <mesh position={[width * 0.2, height * 0.225, depth * 0.2]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.45, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-width * 0.2, height * 0.225, depth * 0.2]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.45, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[width * 0.2, height * 0.225, -depth * 0.2]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.45, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[-width * 0.2, height * 0.225, -depth * 0.2]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.05, height * 0.45, depth * 0.05]} />
              <meshStandardMaterial color={color} />
            </mesh>
          </>
        );
        
      case 'coffee-table':
      case 'dining-table':
      case 'side-table':
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
        
      case 'tv-stand':
        return (
          <>
            {/* Main body */}
            <mesh position={[0, height * 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[width, height, depth]} />
              <meshStandardMaterial color={color} />
            </mesh>
            
            {/* Shelves */}
            <mesh position={[0, height * 0.3, depth * 0.05]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.9, height * 0.05, depth]} />
              <meshStandardMaterial color="#212121" />
            </mesh>
            
            {/* TV Stand Details */}
            <mesh position={[0, height * 0.75, depth * 0.45]} castShadow receiveShadow>
              <boxGeometry args={[width * 0.8, height * 0.1, depth * 0.05]} />
              <meshStandardMaterial color="#212121" />
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
        
      case 'floor-lamp':
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
          <>
            {/* Simple rug */}
            <mesh position={[0, height * 0.01, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[width, depth]} />
              <meshStandardMaterial color={color} side={2} />
            </mesh>
          </>
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
        // Fallback for unknown models - simple box
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
    }
  };
  
  // Apply position, rotation and scale to the group
  useFrame(() => {
    if (groupRef.current) {
      // Apply position
      groupRef.current.position.set(
        furniture.position[0],
        furniture.position[1],
        furniture.position[2]
      );
      
      // Apply rotation
      groupRef.current.rotation.set(
        furniture.rotation[0],
        furniture.rotation[1],
        furniture.rotation[2]
      );
      
      // Apply scale
      groupRef.current.scale.set(
        furniture.scale[0],
        furniture.scale[1],
        furniture.scale[2]
      );
    }
  });
  
  return (
    <group 
      ref={groupRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {renderFurnitureModel()}
      
      {isSelected && (
        <mesh position={[0, furniture.dimensions.height + 0.2, 0]}>
          <sphereGeometry args={[0.1, 16, 8]} />
          <meshBasicMaterial color="#2196f3" />
        </mesh>
      )}
    </group>
  );
};

export default FurnitureModel;