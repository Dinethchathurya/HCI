import React, { useState } from 'react';
import { Clock, Edit, Eye, Trash2 } from 'lucide-react';
import { useAppState } from '../../store/StateProvider';

export const SavedLayouts: React.FC = () => {
  const { savedLayouts, loadLayout, currentLayoutId, deleteLayout } = useAppState();
  const [layoutToDelete, setLayoutToDelete] = useState<string | null>(null);

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

  const handleDelete = (layoutId: string) => {
    setLayoutToDelete(layoutId);
  };

  const confirmDelete = () => {
    if (layoutToDelete) {
      deleteLayout(layoutToDelete);
      setLayoutToDelete(null);
    }
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
                <div className="flex space-x-2">
                  <button
                    onClick={() => loadLayout(layout.id)}
                    className="text-blue-600 p-1 rounded-md hover:bg-blue-100"
                    title={currentLayoutId === layout.id ? "Current layout" : "Load layout"}
                  >
                    {currentLayoutId === layout.id ? <Edit size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => handleDelete(layout.id)}
                    className="text-red-600 p-1 rounded-md hover:bg-red-100"
                    title="Delete layout"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
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

      {/* Delete Confirmation Dialog */}
      {layoutToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Layout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this layout? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setLayoutToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};