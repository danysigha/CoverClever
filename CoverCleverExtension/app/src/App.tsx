import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from "@mui/material/CircularProgress";

import theme from './theme';
import { Navbar } from './components/Navbar';

import Login from "./pages/Login";
import Home from './pages/Home';
import Score from './pages/Score';
import Profile from './pages/Profile';

import { User } from './types/User';

import './App.css'

const AppContent: React.FC<{user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>}> = ({ user, setUser }) => {
  // const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowNavbar(location.pathname !== "/login");
  }, [location.pathname]);

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
    console.log("ProtectedRoute check:", isLoading, user); // Debugging line

    if (isLoading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </div>
      );
    }

    if (!user) {
      console.log("Redirecting to login"); // Debugging line
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      {showNavbar && <Navbar user={user} title="Cover Clever" />}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/score" element={
          <ProtectedRoute>
            <Score />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile email={user?.email || ''} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

// Main App component that doesn't use router hooks
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <HashRouter>
        <AppContent user={user} setUser={setUser} />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App


// return (
//   <ThemeProvider theme={theme}>
//     <CssBaseline />
//     <HashRouter>
//       {showNavbar && <Navbar user={user} title="Cover Clever" />}
//       <Routes>
//         <Route path="/login" element={<Login setUser={setUser} />} />
//         <Route path="/" element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         } />
//         <Route path="/score" element={
//           <ProtectedRoute>
//             <Score />
//           </ProtectedRoute>
//         } />
//         <Route path="/profile" element={
//           <ProtectedRoute>
//             <Profile email={user?.email || ''} onLogout={() => handleLogout() } />
//           </ProtectedRoute>
//         } />
//       </Routes>
//     </HashRouter>
//   </ThemeProvider>
// );