import { Furniture } from '../types';

// Basic furniture templates (without IDs)
type FurnitureTemplate = Omit<Furniture, 'id'>;

export const furnitureCatalog: Record<string, FurnitureTemplate[]> = {
  seating: [
    {
      name: 'Modern Sofa',
      type: 'sofa',
      model: 'sofa',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#8a6f5c',
      dimensions: {
        width: 2.2,
        height: 0.8,
        depth: 0.9,
      },
    },
    {
      name: 'Lounge Chair',
      type: 'chair',
      model: 'chair',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#5c7f8a',
      dimensions: {
        width: 0.8,
        height: 0.75,
        depth: 0.8,
      },
    },
    {
      name: 'Dining Chair',
      type: 'chair',
      model: 'dining-chair',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#5d4037',
      dimensions: {
        width: 0.5,
        height: 0.9,
        depth: 0.5,
      },
    },
  ],
  tables: [
    {
      name: 'Coffee Table',
      type: 'table',
      model: 'coffee-table',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#8d6e63',
      dimensions: {
        width: 1.2,
        height: 0.4,
        depth: 0.6,
      },
    },
    {
      name: 'Dining Table',
      type: 'table',
      model: 'dining-table',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#795548',
      dimensions: {
        width: 1.6,
        height: 0.75,
        depth: 0.9,
      },
    },
    {
      name: 'Side Table',
      type: 'table',
      model: 'side-table',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#a1887f',
      dimensions: {
        width: 0.45,
        height: 0.55,
        depth: 0.45,
      },
    },
  ],
  storage: [
    {
      name: 'Bookshelf',
      type: 'storage',
      model: 'bookshelf',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#8d6e63',
      dimensions: {
        width: 1.2,
        height: 2,
        depth: 0.35,
      },
    },
    {
      name: 'TV Stand',
      type: 'storage',
      model: 'tv-stand',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#6d4c41',
      dimensions: {
        width: 1.6,
        height: 0.5,
        depth: 0.45,
      },
    },
    {
      name: 'Wardrobe',
      type: 'storage',
      model: 'wardrobe',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#5d4037',
      dimensions: {
        width: 1.2,
        height: 2,
        depth: 0.6,
      },
    },
  ],
  decor: [
    {
      name: 'Floor Lamp',
      type: 'lighting',
      model: 'floor-lamp',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#e0e0e0',
      dimensions: {
        width: 0.4,
        height: 1.5,
        depth: 0.4,
      },
    },
    {
      name: 'Rug',
      type: 'decor',
      model: 'rug',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#A52A2A',
      dimensions: {
        width: 2,
        height: 0.02,
        depth: 1.5,
      },
    },
    {
      name: 'Plant',
      type: 'decor',
      model: 'plant',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#4caf50',
      dimensions: {
        width: 0.5,
        height: 1.2,
        depth: 0.5,
      },
    },
  ],
};

export const furnitureCategories = Object.keys(furnitureCatalog);

export default furnitureCatalog;