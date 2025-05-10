import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Designer } from './pages/Designer';
import { Landing } from './pages/Landing';
import { StateProvider } from './store/StateProvider';
import { AuthProvider } from './store/AuthProvider';
import { useAuth } from './store/AuthProvider';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter   basename="/HCI">
      <AuthProvider>
        <StateProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/designer"
              element={
                <ProtectedRoute>
                  <Designer />
                </ProtectedRoute>
              }
            />
          </Routes>
        </StateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;