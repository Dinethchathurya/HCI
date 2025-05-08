import React, { useState } from 'react';
import { 
  Sofa, 
  Table, 
  Container, 
  Lamp, 
  ChevronRight, 
  ChevronDown,
  Save
} from 'lucide-react';
import useLayoutStore from '../store/layoutStore';
import furnitureCatalog, { furnitureCategories } from '../data/furnitureCatalog';

interface SidebarProps {
  onShowSavedLayouts: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onShowSavedLayouts }) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('seating');
  const { addFurniture, currentLayout } = useLayoutStore();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'seating':
        return <Sofa className="h-5 w-5" />;
      case 'tables':
        return <Table className="h-5 w-5" />;
      case 'storage':
        return <Container className="h-5 w-5" />;
      case 'decor':
        return <Lamp className="h-5 w-5" />;
      default:
        return <Table className="h-5 w-5" />;
    }
  };

  const handleAddFurniture = (category: string, index: number) => {
    if (!currentLayout) return;
    
    const furniture = furnitureCatalog[category][index];
    
    // Position the furniture in the center of the room
    const { width, length } = currentLayout.room.dimensions;
    const position: [number, number, number] = [width/2, 0, length/2];
    
    addFurniture({
      ...furniture,
      position,
    });
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-700">Furniture Catalog</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {furnitureCategories.map((category) => (
          <div key={category} className="border-b border-gray-100">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
              className="w-full flex items-center justify-between p-3 hover:bg-gray-50 text-left"
            >
              <div className="flex items-center">
                <span className="mr-2 text-gray-600">{getCategoryIcon(category)}</span>
                <span className="font-medium capitalize">{category}</span>
              </div>
              {expandedCategory === category ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {expandedCategory === category && (
              <div className="px-3 pb-2">
                {furnitureCatalog[category].map((item, index) => (
                  <button
                    key={`${category}-${index}`}
                    onClick={() => handleAddFurniture(category, index)}
                    disabled={!currentLayout}
                    className={`w-full text-left p-2 rounded-md my-1 text-sm ${
                      currentLayout 
                        ? 'hover:bg-indigo-50 text-gray-700' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onShowSavedLayouts}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          <span>Saved Layouts</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;