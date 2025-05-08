import React, { useEffect } from 'react';
import Layout from './components/Layout';
import useLayoutStore from './store/layoutStore';

function App() {
  const { layouts, createLayout } = useLayoutStore();

  // Load saved layouts from localStorage on initial load
  useEffect(() => {
    const savedLayouts = localStorage.getItem('furniture-layouts');
    
    if (savedLayouts) {
      try {
        const parsedLayouts = JSON.parse(savedLayouts);
        if (Array.isArray(parsedLayouts) && parsedLayouts.length > 0) {
          useLayoutStore.setState({ layouts: parsedLayouts });
        } else {
          // Create a default layout if no saved layouts
          createLayout('My First Layout');
        }
      } catch (error) {
        console.error('Failed to parse saved layouts:', error);
        createLayout('My First Layout');
      }
    } else {
      // Create a default layout if no saved layouts
      createLayout('My First Layout');
    }
  }, []);

  return <Layout />;
}

export default App;