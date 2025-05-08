import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  TransformControls, 
  Grid, 
  Environment,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import useLayoutStore from '../../store/layoutStore';
import FurnitureModel from './FurnitureModel';

interface RoomProps {
  width: number;
  length: number;
  height: number;
  wallColor: string;
  floorColor: string;
}

const Room: React.FC<RoomProps> = ({ width, length, height, wallColor, floorColor }) => {
  // Create a room with walls and floor
  return (
    <group>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[width/2, 0, length/2]}
        receiveShadow
      >
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      
      {/* Back Wall */}
      <mesh 
        position={[width/2, height/2, 0]} 
        rotation={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Left Wall */}
      <mesh 
        position={[0, height/2, length/2]} 
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Grid on floor */}
      <Grid 
        position={[width/2, 0.01, length/2]} 
        args={[width, length, width, length]} 
        cellColor="#aaa" 
        sectionColor="#555"
      />
    </group>
  );
};

const FurnitureScene: React.FC = () => {
  const { currentLayout, selectedFurniture, selectFurniture, updateFurniturePosition, updateFurnitureRotation } = useLayoutStore();
  const transformControlsRef = useRef<any>(null);
  const { camera } = useThree();
  
  useFrame(() => {
    if (transformControlsRef.current && selectedFurniture) {
      const controls = transformControlsRef.current;
      
      // Update store when transform controls emit a 'change' event
      if (controls.object) {
        const position = controls.object.position.toArray() as [number, number, number];
        const rotation = controls.object.rotation.toArray().slice(0, 3) as [number, number, number];
        
        updateFurniturePosition(selectedFurniture.id, position);
        updateFurnitureRotation(selectedFurniture.id, rotation);
      }
    }
  });
  
  if (!currentLayout) return null;
  
  const { room } = currentLayout;
  
  return (
    <>
      <OrbitControls
        makeDefault
        target={[room.dimensions.width/2, 0, room.dimensions.length/2]}
        maxPolarAngle={Math.PI * 0.49} // Prevent going below the floor
      />
      
      {/* Ambient and directional light */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Room */}
      <Room
        width={room.dimensions.width}
        length={room.dimensions.length}
        height={room.dimensions.height}
        wallColor={room.wallColor}
        floorColor={room.floorColor}
      />
      
      {/* Furniture */}
      {room.furniture.map((item) => (
        <React.Fragment key={item.id}>
          <FurnitureModel
            furniture={item}
            isSelected={selectedFurniture?.id === item.id}
            onClick={() => selectFurniture(item.id)}
          />
          
          {selectedFurniture?.id === item.id && (
            <TransformControls
              ref={transformControlsRef}
              object={item}
              mode="translate"
              size={0.7}
            />
          )}
        </React.Fragment>
      ))}
      
      {/* Environment for reflections */}
      <Environment preset="city" />
      
 
    </>
  );
};

const Room3D: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [5, 5, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <FurnitureScene />
      </Canvas>
    </div>
  );
};

export default Room3D;