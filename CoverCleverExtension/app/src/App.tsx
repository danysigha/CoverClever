import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation, useNavigate, Outlet } from "react-router-dom";

import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import theme from './theme';
import { Navbar } from './components/Navbar';

import { logoutUser } from "./services/authService";

import Login from "./pages/Login";
import Home from './pages/Home';
import Score from './pages/Score';
import Profile from './pages/Profile';

import { User } from './types/User';

import './App.css'

/**
 * Props interface for the NavBarLayout component
 * @property {User} user - The current authenticated user
 * @property {React.ReactNode} children - Child components to render inside the layout
 */
interface NavBarLayoutProps {
  user: User;
  children: React.ReactNode;
}

/**
 * Main content component that handles authentication state and routing
 * 
 * This component is separated from the main App to use router hooks
 * (useNavigate) which must be used inside the Router context (in this case, HashRouter).
 * 
 * @param {User | null} user - Current user object or null
 * @param {Function} setUser - State setter function for the user
 */
const AppContent: React.FC<{user: User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>}> = ({ user, setUser }) => {
  // Loading state for initial auth check
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing auth on mount
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    
    // If user data and token exist in localStorage, restore the session
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    // Mark loading as complete after auth check
    setIsLoading(false);
  }, []);

  
  /**
   * Higher-order component that protects routes requiring authentication
   * Shows loading indicator during auth check, redirects to login if not authenticated,
   * or renders children with NavBarLayout if authenticated
   * 
   * @param {React.ReactNode} children - Components to render when authenticated
   */
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    console.log("ProtectedRoute check:", isLoading, user); // Debugging line

    // Show loading spinner while checking authentication
    if (isLoading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </div>
      );
    }

    // Redirect to login page if user is not authenticated
    if (!user) {
      console.log("Redirecting to login"); // Debugging line
      return <Navigate to="/login" />;
    }

    // Render children inside NavBarLayout if authenticated
    return <>
      <NavBarLayout user={user} >
        {children}
      </NavBarLayout>
    </>;
  };
  
  /**
   * Handles user logout by clearing localStorage and app state
   */
  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <>
      <Routes>
        {/* Public route - login page */}
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Protected routes - require authentication */}
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
            <Profile user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        } />
      </Routes>

    </>
  );
};

/**
 * Layout component that adds a navigation bar above content
 * Used for authenticated pages
 */
function NavBarLayout({ user, children }: NavBarLayoutProps  ) {
  return (
    <>
      <Navbar user={user} title="Cover Clever" />
      <div style={{ paddingTop: '64px', height: "100%"}}>
        {children}
      </div>
    </>
  )
}

/**
 * Main App component that doesn't use router hooks directly
 * Provides theme context and router configuration
 * Manages user authentication state at the top level
 */
const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            width: "400px",  // Set full viewport width
            height: "600px", // Set full viewport height
            margin: "0px", // Prevent scrolling if needed
            "-ms-overflow-style": "none", // IE and Edge
            "scrollbar-width": "none", // Firefox
          },
          "::-webkit-scrollbar": {
            display: "none",
          },
          "#root": {
            margin: "0px",
            padding: "0px",
            width: "100%",
            height: "100%"
          },
        }}
      />
      <HashRouter>
        <AppContent user={user} setUser={setUser} />
      </HashRouter>
    </ThemeProvider>
  );
};

export default App