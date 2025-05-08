import React from 'react';
import { Clock, Edit, Eye } from 'lucide-react';
import { useAppState } from '../../store/StateProvider';

export const SavedLayouts: React.FC = () => {
  const { savedLayouts, loadLayout, currentLayoutId } = useAppState();

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Saved Layouts</h2>
      
      {savedLayouts.length > 0 ? (
        <div className="space-y-3">
          {savedLayouts.map(layout => (
            <div 
              key={layout.id} 
              className={`border rounded-md p-3 ${
                currentLayoutId === layout.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              } transition-colors`}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-gray-800">{layout.name}</h3>
                <button
                  onClick={() => loadLayout(layout.id)}
                  className="text-blue-600 p-1 rounded-md hover:bg-blue-100"
                  title={currentLayoutId === layout.id ? "Current layout" : "Load layout"}
                >
                  {currentLayoutId === layout.id ? <Edit size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Clock size={14} className="mr-1" />
                <span>{formatDate(layout.createdAt)}</span>
              </div>
              
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <span className="mr-2">{layout.furniture.length} items</span>
                <span>Room: {layout.room.width}x{layout.room.length}cm</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No saved layouts yet.</p>
          <p className="text-sm mt-2">Design your room and save it to see it here.</p>
        </div>
      )}
    </div>
  );
};