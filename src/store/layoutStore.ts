import { create } from 'zustand';
import { Layout, Room, Furniture, ViewMode } from '../types';

interface LayoutState {
  layouts: Layout[];
  currentLayout: Layout | null;
  viewMode: ViewMode;
  selectedFurniture: Furniture | null;
  
  // Actions
  createLayout: (name: string) => void;
  saveLayout: () => void;
  loadLayout: (id: string) => void;
  deleteLayout: (id: string) => void;
  updateLayoutName: (name: string) => void;
  
  // Room actions
  updateRoomDimensions: (dimensions: Room['dimensions']) => void;
  updateRoomColors: (wallColor: string, floorColor: string) => void;
  
  // Furniture actions
  addFurniture: (furniture: Omit<Furniture, 'id'>) => void;
  removeFurniture: (id: string) => void;
  updateFurniturePosition: (id: string, position: [number, number, number]) => void;
  updateFurnitureRotation: (id: string, rotation: [number, number, number]) => void;
  updateFurnitureScale: (id: string, scale: [number, number, number]) => void;
  updateFurnitureColor: (id: string, color: string) => void;
  updateFurnitureDimensions: (id: string, dimensions: Furniture['dimensions']) => void;
  selectFurniture: (id: string | null) => void;
  
  // View actions
  setViewMode: (mode: ViewMode) => void;
}

// Default room setup
const defaultRoom: Room = {
  id: 'default-room',
  name: 'Default Room',
  dimensions: {
    width: 12,
    length: 12,
    height: 3,
  },
  wallColor: '#f5f5f5',
  floorColor: '#e0e0e0',
  furniture: [],
};

const useLayoutStore = create<LayoutState>((set, get) => ({
  layouts: [],
  currentLayout: null,
  viewMode: '3d',
  selectedFurniture: null,
  
  createLayout: (name) => {
    const newLayout: Layout = {
      id: `layout-${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      room: { ...defaultRoom, id: `room-${Date.now()}` },
    };
    
    set((state) => ({
      layouts: [...state.layouts, newLayout],
      currentLayout: newLayout,
    }));
  },
  
  saveLayout: () => {
    const { currentLayout, layouts } = get();
    
    if (!currentLayout) return;
    
    const updatedLayout = {
      ...currentLayout,
      updatedAt: new Date().toISOString(),
    };
    
    set(() => ({
      currentLayout: updatedLayout,
      layouts: layouts.map((layout) => 
        layout.id === updatedLayout.id ? updatedLayout : layout
      ),
    }));
    
    // In a real app, we'd save to localStorage or a backend here
    localStorage.setItem('furniture-layouts', JSON.stringify(get().layouts));
  },
  
  loadLayout: (id) => {
    const { layouts } = get();
    const layoutToLoad = layouts.find((layout) => layout.id === id);
    
    if (layoutToLoad) {
      set(() => ({ currentLayout: layoutToLoad }));
    }
  },
  
  deleteLayout: (id) => {
    set((state) => ({
      layouts: state.layouts.filter((layout) => layout.id !== id),
      currentLayout: state.currentLayout?.id === id ? null : state.currentLayout,
    }));
    
    // Update localStorage in a real app
    localStorage.setItem('furniture-layouts', JSON.stringify(get().layouts));
  },
  
  updateLayoutName: (name) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: { ...currentLayout, name },
    }));
  },
  
  updateRoomDimensions: (dimensions) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          dimensions,
        },
      },
    }));
  },
  
  updateRoomColors: (wallColor, floorColor) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          wallColor,
          floorColor,
        },
      },
    }));
  },
  
  addFurniture: (furniture) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    const newFurniture: Furniture = {
      ...furniture,
      id: `furniture-${Date.now()}`,
    };
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          furniture: [...currentLayout.room.furniture, newFurniture],
        },
      },
      selectedFurniture: newFurniture,
    }));
  },
  
  removeFurniture: (id) => {
    const { currentLayout, selectedFurniture } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          furniture: currentLayout.room.furniture.filter((item) => item.id !== id),
        },
      },
      selectedFurniture: selectedFurniture?.id === id ? null : selectedFurniture,
    }));
  },
  
  updateFurniturePosition: (id, position) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          furniture: currentLayout.room.furniture.map((item) => 
            item.id === id ? { ...item, position } : item
          ),
        },
      },
    }));
  },
  
  updateFurnitureRotation: (id, rotation) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          furniture: currentLayout.room.furniture.map((item) => 
            item.id === id ? { ...item, rotation } : item
          ),
        },
      },
    }));
  },
  
  updateFurnitureScale: (id, scale) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          furniture: currentLayout.room.furniture.map((item) => 
            item.id === id ? { ...item, scale } : item
          ),
        },
      },
    }));
  },
  
  updateFurnitureColor: (id, color) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          furniture: currentLayout.room.furniture.map((item) => 
            item.id === id ? { ...item, color } : item
          ),
        },
      },
    }));
  },
  
  updateFurnitureDimensions: (id, dimensions) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    set(() => ({
      currentLayout: {
        ...currentLayout,
        room: {
          ...currentLayout.room,
          furniture: currentLayout.room.furniture.map((item) => 
            item.id === id ? { ...item, dimensions } : item
          ),
        },
      },
    }));
  },
  
  selectFurniture: (id) => {
    const { currentLayout } = get();
    
    if (!currentLayout) return;
    
    if (id === null) {
      set(() => ({ selectedFurniture: null }));
      return;
    }
    
    const furniture = currentLayout.room.furniture.find((item) => item.id === id);
    
    if (furniture) {
      set(() => ({ selectedFurniture: furniture }));
    }
  },
  
  setViewMode: (mode) => {
    set(() => ({ viewMode: mode }));
  },
}));

export default useLayoutStore;