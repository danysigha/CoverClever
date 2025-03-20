import React from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { Toaster } from "react-hot-toast"
import UserContextProvider from "../context/userContext"
import Dashboard from "./pages/Dashboard"
import Questionnaire from "./pages/Questionnaire"
import PrivateRoute from "./components/PrivateRoute"

const App: React.FC = () => {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/questionnaire" element={
            <PrivateRoute>
              <Questionnaire />
            </PrivateRoute>
          } />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
