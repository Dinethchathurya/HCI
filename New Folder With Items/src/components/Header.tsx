import React, { useState } from 'react';
import { Save, Loader2, Trash2, Download } from 'lucide-react';
import { useAppState } from '../store/StateProvider';

export const Header: React.FC = () => {
  const { 
    currentLayoutId, 
    saveCurrentLayout, 
    savedLayouts,
    deleteLayout
  } = useAppState();
  
  const [layoutName, setLayoutName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = () => {
    if (!layoutName.trim()) return;
    
    setIsSaving(true);
    // Simulate a brief delay for saving
    setTimeout(() => {
      saveCurrentLayout(layoutName);
      setLayoutName('');
      setIsSaving(false);
    }, 500);
  };

  const handleDelete = () => {
    if (!currentLayoutId) return;
    
    setIsDeleting(true);
    // Simulate a brief delay for deleting
    setTimeout(() => {
      deleteLayout(currentLayoutId);
      setIsDeleting(false);
    }, 500);
  };

  const exportLayout = () => {
    if (!currentLayoutId) return;
    
    const layout = savedLayouts.find(l => l.id === currentLayoutId);
    if (!layout) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(layout));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${layout.name}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const currentLayout = currentLayoutId 
    ? savedLayouts.find(l => l.id === currentLayoutId)
    : null;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-gray-800">Furniture Room Designer</h1>
        {currentLayout && (
          <span className="text-sm text-gray-500">
            - {currentLayout.name}
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Layout name"
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={layoutName}
          onChange={(e) => setLayoutName(e.target.value)}
        />
        
        <button
          onClick={handleSave}
          disabled={isSaving || !layoutName.trim()}
          className="bg-blue-600 text-white rounded-md px-3 py-1.5 text-sm font-medium flex items-center space-x-1 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSaving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>Save Layout</span>
            </>
          )}
        </button>
        
        {currentLayoutId && (
          <>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 border border-red-600 rounded-md px-3 py-1.5 text-sm font-medium flex items-center space-x-1 hover:bg-red-50 transition-colors"
            >
              {isDeleting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 size={16} />
                  <span>Delete</span>
                </>
              )}
            </button>
            
            <button
              onClick={exportLayout}
              className="text-gray-700 border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium flex items-center space-x-1 hover:bg-gray-50 transition-colors"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
};