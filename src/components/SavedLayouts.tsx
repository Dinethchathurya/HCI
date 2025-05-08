import React from 'react';
import { X, Trash2, Edit, Calendar } from 'lucide-react';
import useLayoutStore from '../store/layoutStore';

interface SavedLayoutsProps {
  onClose: () => void;
}

const SavedLayouts: React.FC<SavedLayoutsProps> = ({ onClose }) => {
  const { layouts, loadLayout, deleteLayout } = useLayoutStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Saved Layouts</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 max-h-96 overflow-y-auto">
          {layouts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No saved layouts yet.</p>
              <p className="mt-2 text-sm">Create a new layout to get started.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {layouts.map((layout) => (
                <li key={layout.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{layout.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>Last modified: {formatDate(layout.updatedAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          loadLayout(layout.id);
                          onClose();
                        }}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Load layout"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteLayout(layout.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                        title="Delete layout"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedLayouts;