import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import RoomEditor from './RoomEditor';
import PropertyPanel from './PropertyPanel';
import SavedLayouts from './SavedLayouts';
import useLayoutStore from '../store/layoutStore';

const Layout: React.FC = () => {
  const { currentLayout } = useLayoutStore();
  const [showSavedLayouts, setShowSavedLayouts] = React.useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onShowSavedLayouts={() => setShowSavedLayouts(true)} />
        
        <main className="flex-1 flex relative">
          {currentLayout ? (
            <RoomEditor />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <div className="max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-2">Welcome to FurniPlace</h2>
                <p className="mb-6">
                  Create a new layout or load an existing one to get started designing your perfect room.
                </p>
                <button
                  onClick={() => useLayoutStore.getState().createLayout('New Layout')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Create New Layout
                </button>
                <button
                  onClick={() => setShowSavedLayouts(true)}
                  className="px-4 py-2 ml-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Load Existing Layout
                </button>
              </div>
            </div>
          )}
          
          {currentLayout && <PropertyPanel />}
        </main>
        
        {showSavedLayouts && (
          <SavedLayouts onClose={() => setShowSavedLayouts(false)} />
        )}
      </div>
    </div>
  );
};

export default Layout;