import { FurnitureTemplate } from '../types';

export const defaultFurniture: FurnitureTemplate[] = [
  {
    type: 'sofa',
    name: 'Modern Sofa',
    defaultColor: '#8b5a2b',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/sofa.glb',
    thumbnail: '/thumbnails/sofa.png',
    category: 'seating',
    description: 'A comfortable modern sofa for your living room.'
  },
  {
    type: 'chair',
    name: 'Lounge Chair',
    defaultColor: '#6d4c41',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/chair.glb',
    thumbnail: '/thumbnails/chair.png',
    category: 'seating',
    description: 'A stylish lounge chair for relaxing.'
  },
  {
    type: 'coffee_table',
    name: 'Coffee Table',
    defaultColor: '#5d4037',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/coffee_table.glb',
    thumbnail: '/thumbnails/coffee_table.png',
    category: 'tables',
    description: 'A modern coffee table for your living room.'
  },
  {
    type: 'bookshelf',
    name: 'Bookshelf',
    defaultColor: '#795548',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/bookshelf.glb',
    thumbnail: '/thumbnails/bookshelf.png',
    category: 'storage',
    description: 'A spacious bookshelf for your books and decorations.'
  },
  {
    type: 'plant',
    name: 'Indoor Plant',
    defaultColor: '#4caf50',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/plant.glb',
    thumbnail: '/thumbnails/plant.png',
    category: 'decor',
    description: 'A beautiful indoor plant to add life to your space.'
  },
  {
    type: 'wardrobe',
    name: 'Wardrobe',
    defaultColor: '#8d6e63',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/wardrobe.glb',
    thumbnail: '/thumbnails/wardrobe.png',
    category: 'storage',
    description: 'A spacious wardrobe for your bedroom.'
  },
  {
    type: 'rug',
    name: 'Area Rug',
    defaultColor: '#b0bec5',
    defaultScale: { x: 1, y: 0.1, z: 1 },
    model: '/models/rug.glb',
    thumbnail: '/thumbnails/rug.png',
    category: 'decor',
    description: 'A soft area rug to define your space.'
  },
  {
    type: 'bed',
    name: 'Double Bed',
    defaultColor: '#9e9e9e',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/bed.glb',
    thumbnail: '/thumbnails/bed.png',
    category: 'bedroom',
    description: 'A comfortable double bed for your bedroom.'
  },
  {
    type: 'dining_table',
    name: 'Dining Table',
    defaultColor: '#8d6e63',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/dining_table.glb',
    thumbnail: '/thumbnails/dining_table.png',
    category: 'tables',
    description: 'A stylish dining table for your meals.'
  },
  {
    type: 'lamp',
    name: 'Floor Lamp',
    defaultColor: '#ffd54f',
    defaultScale: { x: 1, y: 1, z: 1 },
    model: '/models/lamp.glb',
    thumbnail: '/thumbnails/lamp.png',
    category: 'lighting',
    description: 'A modern floor lamp to illuminate your space.'
  }
];

// Group furniture by category
export const furnitureByCategory = defaultFurniture.reduce((acc, item) => {
  if (!acc[item.category]) {
    acc[item.category] = [];
  }
  acc[item.category].push(item);
  return acc;
}, {} as Record<string, FurnitureTemplate[]>);

// Get categories
export const categories = Object.keys(furnitureByCategory);