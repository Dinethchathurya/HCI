import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useAppState } from '../../store/StateProvider';
import { categories, furnitureByCategory } from '../../data/defaultFurniture';

export const FurnitureList: React.FC = () => {
  const { addFurniture } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter furniture based on search query and selected category
  const filteredCategories = categories.filter(category => {
    if (selectedCategory && category !== selectedCategory) return false;
    
    // If search query exists, check if any furniture in this category matches
    if (searchQuery) {
      const hasFurnitureMatch = furnitureByCategory[category].some(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return hasFurnitureMatch;
    }
    
    return true;
  });

  const filteredFurniture = (category: string) => {
    return furnitureByCategory[category].filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search furniture..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`text-xs px-3 py-1 rounded-full ${
            selectedCategory === null 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            className={`text-xs px-3 py-1 rounded-full capitalize ${
              selectedCategory === category 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="space-y-4 pb-4">
        {filteredCategories.map(category => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-700 capitalize mb-2">{category}</h3>
            <div className="grid grid-cols-2 gap-2">
              {filteredFurniture(category).map(item => (
                <div
                  key={item.type}
                  className="border border-gray-200 rounded-md overflow-hidden bg-white hover:shadow-md transition-shadow group"
                >
                  <div className="h-20 bg-gray-100 flex items-center justify-center relative">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain p-1"
                    />
                    <button
                      onClick={() => addFurniture(item.type)}
                      className="absolute right-2 bottom-2 bg-blue-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Add to room"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="p-2">
                    <h4 className="text-xs font-medium text-gray-800 truncate">{item.name}</h4>
                    <p className="text-xs text-gray-500 truncate">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No furniture found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};