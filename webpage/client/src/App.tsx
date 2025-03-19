import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "../context/userContext";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnaire";
import PrivateRoute from "./components/PrivateRoute";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";


axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.baseURL = "https://cover-clever.onrender.com";
axios.defaults.withCredentials = true;

// Add interceptor to add token to all requests
axios.interceptors.request.use((config : InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add interceptor to handle token from login response
axios.interceptors.response.use((response : AxiosResponse) => {
    const authHeader = response.headers['authorization'];
    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        localStorage.setItem('token', token);
    }
    return response;
});

const App: React.FC = () => {
  return (
    <>
      <UserContextProvider>
        <Navbar />
        <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
        <Routes>
          <Route path="/" element={<Home />} />
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
