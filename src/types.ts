export type ViewMode = '2D' | '3D';
export type UserRole = 'admin' | 'customer';

export interface User {
  username: string;
  role: UserRole;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Rotation {
  y: number;
}

export interface Scale {
  x: number;
  y: number;
  z: number;
}

export interface Furniture {
  id: string;
  type: string;
  position: Position;
  rotation: Rotation;
  scale: Scale;
  color: string;
}

export interface Room {
  width: number;
  length: number;
  height: number;
  wallColor: string;
  floorColor: string;
  wallOpacity: number;
}

export interface RoomLayout {
  id: string;
  name: string;
  createdAt: string;
  room: Room;
  furniture: Furniture[];
}

export interface FurnitureTemplate {
  type: string;
  name: string;
  defaultColor: string;
  defaultScale: Scale;
  model: string;
  thumbnail: string;
  category: string;
  description: string;
}