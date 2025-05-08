import React from 'react';
import { Sofa, Grid3X3, Save, FilePlus, View } from 'lucide-react';
import useLayoutStore from '../store/layoutStore';

const Header: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    createLayout, 
    saveLayout, 
    currentLayout 
  } = useLayoutStore();

  const handleCreateNew = () => {
    createLayout('New Layout');
  };

  const handleSaveLayout = () => {
    saveLayout();
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Sofa className="h-8 w-8 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-gray-800">FurniPlace</h1>
      </div>

      <div className="flex items-center">
        <div className="bg-gray-100 rounded-lg p-1 flex mr-4">
          <button
            onClick={() => setViewMode('3d')}
            className={`px-3 py-1.5 rounded-md flex items-center ${
              viewMode === '3d' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
            }`}
          >
            <View className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">3D</span>
          </button>
          <button
            onClick={() => setViewMode('2d')}
            className={`px-3 py-1.5 rounded-md flex items-center ${
              viewMode === '2d' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
            }`}
          >
            <Grid3X3 className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">2D</span>
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 rounded-md flex items-center ${
              viewMode === 'split' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
            }`}
          >
            <span className="text-sm font-medium">Split</span>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCreateNew}
            className="flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            <FilePlus className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">New</span>
          </button>
          
          <button
            onClick={handleSaveLayout}
            disabled={!currentLayout}
            className={`flex items-center px-3 py-1.5 ${
              currentLayout
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } rounded-md transition-colors`}
          >
            <Save className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Save</span>
          </button>
          
        </div>
      </div>
    </header>
  );
};

export default Header;