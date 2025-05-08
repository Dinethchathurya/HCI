export interface Furniture {
  id: string;
  name: string;
  type: string;
  model: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export interface Room {
  id: string;
  name: string;
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  wallColor: string;
  floorColor: string;
  furniture: Furniture[];
}

export interface Layout {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  room: Room;
}

export type ViewMode = '3d' | '2d' | 'split';