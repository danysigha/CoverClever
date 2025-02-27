import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Home from './pages/Home';
import Score from './pages/Score';
// import Register from './pages/Register';
import Profile from './pages/Profile';

import { User } from './types/User';

import './App.css'

const App: React.FC = () =>  {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    return <>{children}</>;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <HashRouter>
      {/* {user && (
        <NavBar
          user={user}
          onLogout={handleLogout}
          title="Nextap"
        />
      )} */}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home setUser={setUser} />
          </ProtectedRoute>
        } />
        <Route path="/score" element={
          <ProtectedRoute>
            <Score />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile email={user?.email || ''} onLogout={() => setUser(null)} />
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  )
}

export default App
