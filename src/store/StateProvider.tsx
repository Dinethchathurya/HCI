import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { defaultFurniture } from '../data/defaultFurniture';
import { RoomLayout, Furniture, ViewMode, Room } from '../types';

interface StateContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  room: Room;
  updateRoom: (updates: Partial<Room>) => void;
  furniture: Furniture[];
  selectedFurnitureId: string | null;
  selectFurniture: (id: string | null) => void;
  addFurniture: (type: string) => void;
  updateFurniture: (id: string, updates: Partial<Omit<Furniture, 'id' | 'type'>>) => void;
  deleteFurniture: (id: string) => void;
  savedLayouts: RoomLayout[];
  currentLayoutId: string | null;
  saveCurrentLayout: (name: string) => void;
  loadLayout: (id: string) => void;
  deleteLayout: (id: string) => void;
}

const defaultRoom: Room = {
  width: 400,
  length: 600,
  height: 250,
  wallColor: '#f5f5f5',
  floorColor: '#e0e0e0',
  wallOpacity: 0.4
};

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('3D');
  const [room, setRoom] = useState<Room>(defaultRoom);
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<string | null>(null);
  const [savedLayouts, setSavedLayouts] = useState<RoomLayout[]>([]);
  const [currentLayoutId, setCurrentLayoutId] = useState<string | null>(null);

  useEffect(() => {
    const savedLayoutsStr = localStorage.getItem('roomLayouts');
    if (savedLayoutsStr) {
      try {
        const layouts = JSON.parse(savedLayoutsStr);
        setSavedLayouts(layouts);
      } catch (error) {
        console.error('Failed to parse saved layouts:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('roomLayouts', JSON.stringify(savedLayouts));
  }, [savedLayouts]);

  const updateRoom = (updates: Partial<Room>) => {
    setRoom(prev => ({ ...prev, ...updates }));
  };

  const selectFurniture = (id: string | null) => {
    setSelectedFurnitureId(id);
  };

  const addFurniture = (type: string) => {
    const templateFurniture = defaultFurniture.find(f => f.type === type);
    
    if (!templateFurniture) return;

    const newFurniture: Furniture = {
      id: uuidv4(),
      type,
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      rotation: { y: 0 },
      scale: { ...templateFurniture.defaultScale },
      color: templateFurniture.defaultColor
    };
    
    setFurniture(prev => [...prev, newFurniture]);
    setSelectedFurnitureId(newFurniture.id);
  };

  const updateFurniture = (id: string, updates: Partial<Omit<Furniture, 'id' | 'type'>>) => {
    setFurniture(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const deleteFurniture = (id: string) => {
    setFurniture(prev => prev.filter(item => item.id !== id));
    if (selectedFurnitureId === id) {
      setSelectedFurnitureId(null);
    }
  };

  const saveCurrentLayout = (name: string) => {
    const newLayoutId = uuidv4();
    const layout: RoomLayout = {
      id: newLayoutId,
      name: `${name} (${new Date().toLocaleTimeString()})`,
      createdAt: new Date().toISOString(),
      room: { ...room },
      furniture: [...furniture]
    };

    setSavedLayouts(prev => {
      const newLayouts = [...prev, layout];
      if (newLayouts.length > 15) {
        return newLayouts
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          .slice(1);
      }
      return newLayouts;
    });
    
    setCurrentLayoutId(newLayoutId);
  };

  const loadLayout = (id: string) => {
    const layout = savedLayouts.find(l => l.id === id);
    if (layout) {
      setRoom(layout.room);
      setFurniture(layout.furniture);
      setCurrentLayoutId(layout.id);
    }
  };

  const deleteLayout = (id: string) => {
    setSavedLayouts(prev => prev.filter(l => l.id !== id));
    if (currentLayoutId === id) {
      setCurrentLayoutId(null);
    }
  };

  const value = {
    viewMode,
    setViewMode,
    room,
    updateRoom,
    furniture,
    selectedFurnitureId,
    selectFurniture,
    addFurniture,
    updateFurniture,
    deleteFurniture,
    savedLayouts,
    currentLayoutId,
    saveCurrentLayout,
    loadLayout,
    deleteLayout
  };

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};