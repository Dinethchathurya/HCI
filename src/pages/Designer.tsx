import React from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { RoomEditor } from '../components/RoomEditor';
import { ViewToggle } from '../components/ViewToggle';

export const Designer: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 relative overflow-hidden">
          <RoomEditor />
          <div className="absolute top-4 right-4 z-10">
            <ViewToggle />
          </div>
        </main>
      </div>
    </div>
  );
};