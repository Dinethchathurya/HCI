import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useAppState } from '../../store/StateProvider';
import { Furniture3D } from './Furniture3D';
import { Room3D } from './Room3D';
import { Sun } from 'lucide-react';

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
  const planeNormal = useRef(new THREE.Vector3());
  const intersectionPoint = useRef(new THREE.Vector3());
  const offset = useRef(new THREE.Vector3());
  const isDragging = useRef(false);
  const selectedObject = useRef<THREE.Object3D | null>(null);
  const lastValidPosition = useRef(new THREE.Vector3());
  const boundingBox = useRef(new THREE.Box3());
  const orbitControlsRef = useRef<any>(null);

  // Get orbit controls reference from parent
  useEffect(() => {
    const controls = scene.parent?.parent?.getObjectByName('orbit-controls');
    if (controls) {
      orbitControlsRef.current = controls;
    }
  }, [scene]);

  // Get furniture dimensions with rotation consideration
  const getFurnitureDimensions = (type: string, rotation: number, scale: THREE.Vector3) => {
    let width, depth;
    switch (type) {
      case 'sofa': width = 80; depth = 30; break;
      case 'chair': width = 40; depth = 40; break;
      case 'coffee_table': width = 60; depth = 60; break;
      case 'bookshelf': width = 80; depth = 30; break;
      case 'plant': width = 40; depth = 40; break;
      case 'wardrobe': width = 100; depth = 50; break;
      case 'rug': width = 120; depth = 180; break;
      case 'bed': width = 140; depth = 200; break;
      case 'dining_table': width = 100; depth = 100; break;
      case 'lamp': width = 30; depth = 30; break;
      default: width = 50; depth = 50;
    }

    width *= scale.x;
    depth *= scale.z;

    const cos = Math.abs(Math.cos(rotation));
    const sin = Math.abs(Math.sin(rotation));
    const rotatedWidth = width * cos + depth * sin;
    const rotatedDepth = width * sin + depth * cos;

    return { width: rotatedWidth, depth: rotatedDepth };
  };

  const checkCollision = (
    pos1: THREE.Vector3,
    type1: string,
    rotation1: number,
    scale1: THREE.Vector3,
    pos2: THREE.Vector3,
    type2: string,
    rotation2: number,
    scale2: THREE.Vector3
  ) => {
    const dim1 = getFurnitureDimensions(type1, rotation1, scale1);
    const dim2 = getFurnitureDimensions(type2, rotation2, scale2);

    const halfWidth1 = dim1.width / 2;
    const halfDepth1 = dim1.depth / 2;
    const halfWidth2 = dim2.width / 2;
    const halfDepth2 = dim2.depth / 2;

    const padding = 20;

    const box1 = new THREE.Box3();
    const box2 = new THREE.Box3();

    box1.setFromCenterAndSize(
      pos1,
      new THREE.Vector3(dim1.width + padding, 1, dim1.depth + padding)
    );

    box2.setFromCenterAndSize(
      pos2,
      new THREE.Vector3(dim2.width + padding, 1, dim2.depth + padding)
    );

    return box1.intersectsBox(box2);
  };

  const isValidPosition = (position: THREE.Vector3, currentFurniture: THREE.Object3D) => {
    const furnitureType = currentFurniture.userData.type;
    const rotation = currentFurniture.rotation.y;
    const scale = currentFurniture.scale;
    const dimensions = getFurnitureDimensions(furnitureType, rotation, scale);
    
    const padding = 20;
    const halfWidth = dimensions.width / 2 + padding;
    const halfDepth = dimensions.depth / 2 + padding;
    
    const roomHalfWidth = room.width / 2 - padding;
    const roomHalfLength = room.length / 2 - padding;
    
    if (
      position.x - halfWidth < -roomHalfWidth ||
      position.x + halfWidth > roomHalfWidth ||
      position.z - halfDepth < -roomHalfLength ||
      position.z + halfDepth > roomHalfLength
    ) {
      return false;
    }

    const currentId = currentFurniture.userData.id;
    const otherFurniture = furniture.filter(f => f.id !== currentId);
    
    for (const other of otherFurniture) {
      if (checkCollision(
        position,
        furnitureType,
        rotation,
        scale,
        new THREE.Vector3(other.position.x, other.position.y, other.position.z),
        other.type,
        other.rotation.y,
        new THREE.Vector3(other.scale.x, other.scale.y, other.scale.z)
      )) {
        return false;
      }
    }
    
    return true;
  };

  useEffect(() => {
    const canvasElement = gl.domElement;

    const handlePointerDown = (event: PointerEvent) => {
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
        
        offset.current.copy(intersectionPoint.current).sub(parentObject.position);
        lastValidPosition.current.copy(parentObject.position);
        
        isDragging.current = true;
        canvasElement.style.cursor = 'grabbing';

        // Disable orbit controls when starting to drag
        if (orbitControlsRef.current) {
          orbitControlsRef.current.enabled = false;
        }
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging.current || !selectedObject.current) return;
      
      const rect = canvasElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.current.setFromCamera(mouse.current, camera);
      raycaster.current.ray.intersectPlane(plane.current, intersectionPoint.current);
      
      const newPosition = new THREE.Vector3()
        .copy(intersectionPoint.current)
        .sub(offset.current);

      if (isValidPosition(newPosition, selectedObject.current)) {
        lastValidPosition.current.copy(newPosition);
        updateFurniture(selectedObject.current.userData.id, {
          position: {
            x: newPosition.x,
            y: 0,
            z: newPosition.z
          }
        });
      } else {
        updateFurniture(selectedObject.current.userData.id, {
          position: {
            x: lastValidPosition.current.x,
            y: 0,
            z: lastValidPosition.current.z
          }
        });
      }
    };

    const handlePointerUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvasElement.style.cursor = 'auto';
        
        // Re-enable orbit controls when done dragging
        if (orbitControlsRef.current) {
          orbitControlsRef.current.enabled = true;
        }
      }
    };

    const handlePointerCancel = () => {
      if (isDragging.current) {
        isDragging.current = false;
        canvasElement.style.cursor = 'auto';
        
        // Re-enable orbit controls when drag is cancelled
        if (orbitControlsRef.current) {
          orbitControlsRef.current.enabled = true;
        }
      }
    };

    canvasElement.addEventListener('pointerdown', handlePointerDown);
    canvasElement.addEventListener('pointermove', handlePointerMove);
    canvasElement.addEventListener('pointerup', handlePointerUp);
    canvasElement.addEventListener('pointercancel', handlePointerCancel);

    return () => {
      canvasElement.removeEventListener('pointerdown', handlePointerDown);
      canvasElement.removeEventListener('pointermove', handlePointerMove);
      canvasElement.removeEventListener('pointerup', handlePointerUp);
      canvasElement.removeEventListener('pointercancel', handlePointerCancel);
    };
  }, [camera, gl, scene, room, selectFurniture, updateFurniture, furniture]);

  return null;
};

const SunLight: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <directionalLight
      position={position}
      intensity={1}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-far={1500}
      shadow-camera-left={-500}
      shadow-camera-right={500}
      shadow-camera-top={500}
      shadow-camera-bottom={-500}
    />
  );
};

export const RoomEditor3D: React.FC = () => {
  const { room, furniture } = useAppState();
  const [sunEnabled, setSunEnabled] = useState(true);
  const [sunPosition, setSunPosition] = useState<[number, number, number]>([200, 400, 300]);
  const [sunAngle, setSunAngle] = useState(45);
  const [sunHeight, setSunHeight] = useState(400);
  
  const updateSunPosition = (angle: number, height: number) => {
    const radius = 300;
    const x = radius * Math.cos(angle * Math.PI / 180);
    const z = radius * Math.sin(angle * Math.PI / 180);
    setSunPosition([x, height, z]);
    setSunAngle(angle);
    setSunHeight(height);
  };
  
  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 300, 500]} fov={50} />
        <ambientLight intensity={0.3} />
        
        {sunEnabled && <SunLight position={sunPosition} />}
        
        <OrbitControls 
          name="orbit-controls"
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2 - 0.1}
          minDistance={200}
          maxDistance={1000}
        />
        
        <Room3D 
          width={room.width} 
          length={room.length} 
          height={room.height} 
          wallColor={room.wallColor}
          floorColor={room.floorColor}
          wallOpacity={room.wallOpacity}
        />
        
        {furniture.map(item => (
          <Furniture3D
            key={item.id}
            furniture={item}
          />
        ))}
        
        <DragControls />
      </Canvas>

      {/* Sun Controls */}
      <div className="absolute top-20 right-4 bg-white rounded-lg shadow-md p-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Sun Light</span>
          <button
            onClick={() => setSunEnabled(!sunEnabled)}
            className={`p-2 rounded-md ${
              sunEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Sun size={20} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-xs text-gray-600">Position</label>
          <input
            type="range"
            min="0"
            max="360"
            value={sunAngle}
            onChange={(e) => updateSunPosition(Number(e.target.value), sunHeight)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs text-gray-600">Height</label>
          <input
            type="range"
            min="100"
            max="800"
            value={sunHeight}
            onChange={(e) => updateSunPosition(sunAngle, Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};