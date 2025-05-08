import React, { useState } from 'react';
import { 
  LayoutGrid, 
  Sofa, 
  Sliders, 
  ChevronLeft, 
  ChevronRight,
  Layers
} from 'lucide-react';
import { FurnitureList } from './sidebar/FurnitureList';
import { RoomControls } from './sidebar/RoomControls';
import { SavedLayouts } from './sidebar/SavedLayouts';

type TabType = 'furniture' | 'room' | 'layouts';

export const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('furniture');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside 
      className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-72'
      }`}
    >
      <div className="flex border-b border-gray-200">
        <div className={`flex ${isCollapsed ? 'flex-col py-3' : 'flex-row py-2 px-2'}`}>
          <button
            onClick={() => !isCollapsed && setActiveTab('furniture')}
            className={`p-2 rounded-md flex items-center justify-center ${
              activeTab === 'furniture' && !isCollapsed 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Furniture"
          >
            <Sofa size={20} />
            {!isCollapsed && <span className="ml-2 text-sm font-medium">Furniture</span>}
          </button>
          
          <button
            onClick={() => !isCollapsed && setActiveTab('room')}
            className={`p-2 rounded-md flex items-center justify-center ${
              activeTab === 'room' && !isCollapsed 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Room Settings"
          >
            <Sliders size={20} />
            {!isCollapsed && <span className="ml-2 text-sm font-medium">Room</span>}
          </button>
          
          <button
            onClick={() => !isCollapsed && setActiveTab('layouts')}
            className={`p-2 rounded-md flex items-center justify-center ${
              activeTab === 'layouts' && !isCollapsed 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            title="Saved Layouts"
          >
            <Layers size={20} />
            {!isCollapsed && <span className="ml-2 text-sm font-medium">Layouts</span>}
          </button>
        </div>
        
        <button 
          onClick={toggleCollapse}
          className="p-2 ml-auto text-gray-500 hover:text-gray-800"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'furniture' && <FurnitureList />}
          {activeTab === 'room' && <RoomControls />}
          {activeTab === 'layouts' && <SavedLayouts />}
        </div>
      )}
    </aside>
  );
};